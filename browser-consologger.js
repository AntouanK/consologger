
'use strict';

var objectAssign = require('object-assign');

var Consologger,
    presets,
    generatePresets,
    build,
    stringify,
    styleToString;

//--------------------------------------------------------------------------

presets = require('./presets.json');

build = function(_styles) {

  this._styles.push(_styles);
};

generatePresets = function(){

  var obj = {};

  presets
  .forEach(function(preset){

    var presetKey = preset.name;

    obj[presetKey] = {
      get: function(){
        build.call(this, preset.style);
        return this;
      }
    };
  });

  return obj;
};

stringify = function(){

  var i = 0,
      str = '';

  for(; i<arguments.length; i+= 1){
    str += arguments[i];
  }

  return str;
};

styleToString = function(obj){

  var keyValues =
  Object.keys(obj)
  .map(function(key){
    return key + ': ' + obj[key];
  })
  .join(';');

  return keyValues + ';';
};

//  Consologger contructor
Consologger = function(){

  var print = function(){

    var args = stringify.apply(null, arguments);

    print._styles
    .forEach(function(thisStyle){
      objectAssign(print.style, thisStyle);
    });

    console.log.apply(console, ['%c'+args, styleToString(print.style)]);

    //  reset the state
    print._styles = [];
    print.style = {}
  };


  print._styles = [];
  print.style = {};

  Object.defineProperties(print, generatePresets());

  return print;
};


module.exports = Consologger;
