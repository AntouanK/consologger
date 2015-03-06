/*
	consologger v1.0.0

	Antonis Karamitros - 08 Feb 2014
	@antouank
 */
//********************************************//
var consologger;

if(process.browser === true){
  (function(){
    consologger = require('./dist/browser-consologger');
  })();
} else {
  (function(){
    consologger = require('./dist/node-consologger');
  })();
}

module.exports = consologger;
