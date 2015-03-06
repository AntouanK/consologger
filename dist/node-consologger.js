"use strict";

var objectAssign = require("object-assign");

var Consologger, defaultPresets, generatePresets, mergeStyles, addStyle, stringify, convertInputsToStrings;

//--------------------------------------------------------------------------

defaultPresets = require("./node-presets.json");

addStyle = function (style) {

  this._curStyles.push(style);
};

mergeStyles = function (styles) {

  var mergedStyle = [];

  mergedStyle.push(styles.map(function (style) {
    return style[0];
  }).join(""));

  mergedStyle.push(styles.map(function (style) {
    return style[1];
  }).join(""));

  return mergedStyle;
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

//  returns one string that represents the arguments joined with a space
stringify = function () {
  return Array.prototype.join.call(arguments, " ");
};

//  given some input objects ( they have `arg` and `style` ),
//  we get back an array of strings that works for `console.log`
convertInputsToStrings = function (inputs) {

  var argStrings;

  argStrings = inputs.map(function (input) {
    return input.style[0] + input.arg + input.style[1];
  });

  return argStrings;
};

//  -------------------------------------------------------------------------
//  Consologger contructor
Consologger = function (defaults) {

  //  if a default style is not given, make an empty one
  if (!defaults || defaults.style === null || typeof defaults.style !== "object") {
    defaults = { style: {} };
  }

  var loggerInstance = this;

  loggerInstance._inputsBuffer = [];

  //  the main builder function
  //  that's what we return, and all the presets are properties of this
  var builder = (function (_builder) {
    var _builderWrapper = function builder() {
      return _builder.apply(this, arguments);
    };

    _builderWrapper.toString = function () {
      return _builder.toString();
    };

    return _builderWrapper;
  })(function () {

    //  make the arguments one string
    var args = stringify.apply(null, arguments);

    builder._curStyle = mergeStyles(builder._curStyles);

    loggerInstance._inputsBuffer.push({
      arg: args,
      style: builder._curStyle
    });

    //  reset the state
    builder._curStyle = objectAssign({}, defaults.style);
    builder._curStyles = [];

    return builder;
  });

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

    console.log.apply(console, finalArg);

    //  reset the instance's buffer array
    loggerInstance._inputsBuffer = [];
  };

  builder.prefix = function () {
    loggerInstance._prefix = loggerInstance._inputsBuffer.slice();
    loggerInstance._inputsBuffer = [];
  };

  return builder;
};

module.exports = Consologger;