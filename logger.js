/*
	logger module
	
	Antonis Karamitros - 24/1/2014
 */
//********************************************//
module.exports = (function(){

	'use strict';

	if(console === undefined){
		return undefined;
	}

	var logger = {},
		colors = require('colors'),
		on = true;

	//	add new colors to use here
	colors.setTheme({
		silly: 'rainbow',
		verbose: 'cyan',
		info: 'green',
		data: 'grey',
		warn: 'yellow',
		error: 'red'
	});

	//	prefix fun, to return a dynamic prefix string
	var prefix = function(){
		return '';
	};

	//	set the mode you want to use ( default is 1, open )
	//	0 to close the logger
	//	1 to open it
	logger.setMode = function(mode){

		if(mode === 0){
			on = false;
		} else if (mode === 1){
			on = true;
		}
		//	add whatever mode you want here
	};

	//	example
	//	return Date().substr(0,24)+ ' ' ;
	logger.setPrefix = function(newPrefix){
		
		if(typeof newPrefix === 'function'){
			prefix = newPrefix;
		}
	};

	logger.text = function(text){
		if(on){
			console.log(prefix() + text);
		}
	};

	logger.warning = function(text){
		if(on){
			console.log(prefix() + text.warn);
		}
	};

	logger.info = function(text){
		if(on){
			console.log(prefix() + text.info);
		}
	};

	logger.error = function(text){
		if(on){
			console.log(prefix() + text.error);
		}
	};
	
	logger.data = function(text){
		if(on){
			console.log(prefix() + text.data);
		}
	};

	return logger;
}());