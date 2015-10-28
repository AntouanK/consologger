
'use strict';

var objectAssign = require('object-assign');

var Consologger, defaultPresets, generatePreset, generatePresets, addStyle, stringify, styleToString, addPreset, convertInputsToStrings;

//--------------------------------------------------------------------------

defaultPresets = require('./presets.json');

addStyle = function (style) {
  this._curStyles.push(style);
};

//  generate the presets getter functions
//  returns an object of them
generatePresets = function (presets) {

  var obj = {};

  presets.forEach(function (preset) {

    obj[preset.name] = {
      //  the getter will append the style to the current ones when chaining
      get: function get() {
        addStyle.call(this, preset.style);
        return this;
      }
    };
  });

  return obj;
};

generatePreset = function (preset) {
  var obj = {};

  obj[preset.name] = {
    //  the getter will append the style to the current ones when chaining
    get: function get() {

      addStyle.call(this, preset.style);
      return this;
    }
  };

  return obj;
};

//  adds a given preset to the `presets` array
addPreset = function (preset) {

  if (preset === null || typeof preset !== 'object') {
    throw new Error('.addPreset takes an object as argument');
  }

  if (typeof preset.name !== 'string' || preset.name === '') {
    throw new Error('the preset given does not have a valid name property');
  }

  if (preset.style === null || typeof preset.style !== 'object') {
    throw new Error('the preset given does not have a valid style property');
  }

  defaultPresets.push(preset);

  var builder = this;

  Object.defineProperties(builder, generatePreset(preset));
};

//  returns one string that represents the arguments joined with a space
stringify = function () {
  return Array.prototype.join.call(arguments, ' ');
};

//  converts a style object to a string just like the console.log expects
styleToString = function (obj) {

  var keyValues = Object.keys(obj).map(function (key) {
    return key + ': ' + obj[key];
  }).join(';');

  return keyValues + ';';
};

//  given some input objects ( they have `arg` and `style` ),
//  we get back an array of strings that works for `console.log`
convertInputsToStrings = function (inputs) {

  var styles = [],
      argString;

  argString = inputs.map(function (input) {
    return '%c' + input.arg;
  }).join('');

  styles = inputs.map(function (input) {
    return styleToString(input.style);
  });

  return [argString].concat(styles);
};

//  -------------------------------------------------------------------------
//  Consologger contructor
Consologger = function (defaults) {

  //  if a default style is not given, make an empty one
  if (!defaults || defaults.style === null || typeof defaults.style !== 'object') {
    defaults = { style: {} };
  }

  var loggerInstance = this;

  loggerInstance._inputsBuffer = [];
  loggerInstance._isActive = true;

  //  the main builder function
  //  that's what we return, and all the presets are properties of this
  var builder = function builder() {

    //  make the arguments one string
    var args = stringify.apply(null, arguments);

    //  make the final styles object
    builder._curStyles.forEach(function (thisStyle) {
      objectAssign(builder._curStyle, thisStyle);
    });

    loggerInstance._inputsBuffer.push({
      arg: args,
      style: builder._curStyle
    });

    //  reset the state
    builder._curStyle = objectAssign({}, defaults.style);
    builder._curStyles = [];

    return builder;
  };

  builder._curStyle = objectAssign({}, defaults.style);
  builder._curStyles = [];

  //  for every preset, make a property on builder
  //  the getter is going to add that style before running builder
  Object.defineProperties(builder, generatePresets(defaultPresets));

  //  main print function
  builder.print = function () {

    if (loggerInstance._prefix !== undefined) {
      loggerInstance._inputsBuffer = loggerInstance._prefix.concat(loggerInstance._inputsBuffer);
    }

    var finalArg = convertInputsToStrings(loggerInstance._inputsBuffer);

    //  print only if the logger is active
    if (loggerInstance._isActive === true) {
      console.log.apply(console, finalArg);
    }

    //  reset the instance's buffer array
    loggerInstance._inputsBuffer = [];
  };

  builder.prefix = function () {
    loggerInstance._prefix = loggerInstance._inputsBuffer.slice();
    loggerInstance._inputsBuffer = [];
  };

  //  a function to turn print function off
  builder.switchOff = function () {
    loggerInstance._isActive = false;
  };
  //  a function to turn print function off
  builder.switchOn = function () {
    loggerInstance._isActive = true;
  };

  builder.addPreset = addPreset.bind(builder);

  return builder;
};

//  ----------------------------------------------- export -----------------
module.exports = Consologger;