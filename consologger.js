/*
	consologger v1.1.0

	Antonis Karamitros - 28 Oct 2015
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
