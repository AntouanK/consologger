/*
	consologger module
	
	Antonis Karamitros - 24/1/2014
 */
//********************************************//
module.exports = (function(){

	'use strict';

	//	module requires console
	if(console === undefined){
		return undefined;
	}

	var logger = {},
		colors = require('colors'),
		on = true,
		palette = {
			silly: 'rainbow',
			verbose: 'cyan',
			info: 'green',
			data: 'grey',
			warn: 'yellow',
			error: 'red'
		};

	//	add new colors to use here
	colors.setTheme(palette);

	//	prefix fun, to return a dynamic prefix string
	var prefix = function(){
		return '';
	};

	//	make string check default for all functions
	var checkIfString = function(callback){

		return function(value){
			if(on){
				if(typeof value !== 'string'){
					console.log(value);
				} else {
					callback(value)
				}
			}
		};
	};

	//	set a new color to a type of logging
	//	** carefull if color is not acceptable string...
	logger.setColor = function(type, color){

		if(palette[type] !== undefined && typeof color === 'string'){
			palette[type] = color;
		}
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

	//	simple white text
	logger.text = checkIfString(function(text){
		if(on){
			console.log(prefix() + text);
		}
	});

	//	warning
	logger.warning = checkIfString(function(text){
		
		if(on){
			console.log(prefix() + text.warn);
		}
	});

	//	info
	logger.info = checkIfString(function(text){
		
		if(on){
			console.log(prefix() + text.info);
		}
	});

	//	error
	logger.error = checkIfString(function(text){
		
		if(on){
			console.log(prefix() + text.error);
		}
	});
	
	//	data
	logger.data = checkIfString(function(text){
		
		if(on){
			console.log(prefix() + text.data);
		}
	});

	//	verbose
	logger.verbose = checkIfString(function(text){
		
		if(on){
			console.log(prefix() + text.verbose);
		}
	});

	//	silly
	logger.silly = checkIfString(function(text){
		
		if(on){
			console.log(prefix() + text.silly);
		}
	});

	return logger;
}());