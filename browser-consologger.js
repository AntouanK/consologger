
'use strict';

var Consologger,
    presets,
    generatePresets,
    build,
    applyStyle,
    consologgerProto;

//  Consologger contructor
Consologger = function(){
  return this;
};

presets = [
  {
    name: 'yellow',
    style: {
      color: '#F8D379'
    }
  },
  {
    name: 'red',
    style: {
      color: '#C9393B'
    }
  },
  {
    name: 'blue',
    style: {
      color: '#55B5DB'
    }
  },
  {
    name: 'green',
    style: {
      color: '#9FCA56'
    }
  },
  {
    name: 'grey',
    style: {
      color: '#41535B'
    }
  }
];


applyStyle = function(){

  // support varags, but simply cast to string in case there's only one arg
  var args = arguments;
  var argsLen = args.length;
  var str = argsLen !== 0 && String(arguments[0]);
  if (argsLen > 1) {
    // don't slice `arguments`, it prevents v8 optimizations
    for (var a = 1; a < argsLen; a++) {
      str += ' ' + args[a];
    }
  }

  console.info(this._styles);
};

build = function(_styles) {

  var builder = function builder() {
    return applyStyle.apply(builder, arguments);
  };

  if(this._styles === undefined){
    this._styles = [];
  }

  console.log('builder._styles', this._styles);
  this._styles.push(_styles);
  builder.enabled = this.enabled;
  // __proto__ is used because we must return a function, but there is
  // no way to create a function with a different prototype.
  builder.__proto__ = consologgerProto;
  return builder;
};

generatePresets = function(){

  var obj = {};

  presets
  .forEach(function(preset){

    var presetKey = preset.name;

    obj[presetKey] = {
      get: function(){
        console.log('-- getter of', presetKey);
        return build.call(this, [preset.style]);
      }
    };
  });

  return obj;
};

console.log('generatePresets', generatePresets());

consologgerProto = Object.defineProperties(Consologger, generatePresets());

Object.defineProperties(Consologger.prototype, generatePresets());

/*
console has:
.error
.warn
.info
.debug
.log

.table
.dir

.time
.timeEnd


'Menlo' font-family
*/

// consologger.warn    = printWithStyle('color: '+palette['warning']+';');
// consologger.err     = printWithStyle('color: '+palette['error']+';');
// consologger.ok      = printWithStyle('color: '+palette['success']+';');
// consologger.comment = printWithStyle('color: '+palette['comment']+';');
//
// consologger.mono = printWithStyle('font-family: monospace;');
// consologger.sans = printWithStyle('font-family: sans-serif;');
//
// consologger.shadow = printWithStyle('text-shadow: 1px 1px green;');

module.exports = new Consologger();
