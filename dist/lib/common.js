
'use strict';

var common = {};

common.addStyle = function (style) {
  this._curStyles.push(style);
};

//  returns one string that represents the arguments joined with a space
common.stringify = function () {
  return Array.prototype.join.call(arguments, ' ');
};

module.exports = common;