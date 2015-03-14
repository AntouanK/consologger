"use strict";

var presetUtils = {};

//  generate the presets getter functions
//  returns an object of them
presetUtils.generatePresets = function (presets, fn) {

  var obj = {};

  presets.forEach(function (preset) {

    obj[preset.name] = {
      //  the getter will append the style to the current ones when chaining
      get: function get() {

        fn.call(this, preset.style);
        return this;
      }
    };
  });

  return obj;
};

presetUtils.generatePreset = function (preset, fn) {
  var obj = {};

  obj[preset.name] = {
    //  the getter will append the style to the current ones when chaining
    get: function get() {

      fn.call(this, preset.style);
      return this;
    }
  };

  return obj;
};

module.exports = presetUtils;