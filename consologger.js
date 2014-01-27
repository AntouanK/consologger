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
			warning: 'yellow',
			error: 'red',
			text: 'white'
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
					callback(value);
				}
			}
		};
	};

	var print = function(value, type){

		[
			'underline',
			'bold',
			'inverse',
			'strikethrough'
		]
		.forEach(function(mode){
			if(print[mode] === true){
				value = value[mode];
				print[mode] = false;
			}
		});

		if(on){
			console.log(prefix() + value[type]);
		}
	};

	//	set a new color to a type of logging
	//	** carefull if color is not acceptable string...
	logger.setColor = function(type, color){

		if(palette[type] !== undefined && typeof color === 'string'){
			palette[type] = color;
		}

		return logger;
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

		return logger;
	};

	//	example
	//	return Date().substr(0,24)+ ' ' ;
	logger.setPrefix = function(newPrefix){
		
		if(typeof newPrefix === 'function'){
			prefix = newPrefix;
		}

		return logger;
	};

	//	set up modes functions
	[
		'text',
		'warning',
		'info',
		'error',
		'data',
		'verbose',
		'silly'
	]
	.forEach(function(mode){

		logger[mode] = function(text){
			print(text, mode);
		};

		[
			'underline',
			'bold',
			'inverse',
			'strikethrough'
		]
		.forEach(function(style){
			logger[style] = logger[style] || {};
			logger[style][mode] = function(text){
				print[style] = true;

				print(text, mode);
			};
		});
	});

	return logger;
}());