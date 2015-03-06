/*
	consologger v1.0.0

	Antonis Karamitros - 08 Feb 2014
	@antouank
 */
//********************************************//
var consologger;

if(process.browser === true){
	consologger = require('./dist/browser-consologger');
} else {
	consologger = require('./dist/node-consologger');
}

module.exports = consologger;
