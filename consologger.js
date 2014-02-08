/*
	consologger v 0.1.4
	
	Antonis Karamitros - 08 Feb 2014
	@antouank
 */
//********************************************//
module.exports = (function(){

	'use strict';

	//	module requires console
	if(console === undefined){
		return undefined;
	}

	//	make a map function to use for the 'arguments' conversion to Array
	function map(args){

		var argsArray,
			i;

		if(args === undefined){
			return [];
		}

		argsArray = [];

		for(i=0; i< args.length; i+=1){
			argsArray.push(args[i]);
		}

		return argsArray;
	};
	//-------------------------------------------

	//	module variables
	//	
	var logger = {},
		loggerAdditional = {},
		on     = true,
		styles = {
			//styles
			'bold'          : ['\x1B[1m',  '\x1B[22m'],
			'italic'        : ['\x1B[3m',  '\x1B[23m'],
			'underline'     : ['\x1B[4m',  '\x1B[24m'],
			'inverse'       : ['\x1B[7m',  '\x1B[27m'],
			'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
			//text colors
			//grayscale
			'white'         : ['\x1B[37m', '\x1B[39m'],
			'grey'          : ['\x1B[90m', '\x1B[39m'],
			'black'         : ['\x1B[30m', '\x1B[39m'],
			//colors
			'blue'          : ['\x1B[34m', '\x1B[39m'],
			'cyan'          : ['\x1B[36m', '\x1B[39m'],
			'green'         : ['\x1B[32m', '\x1B[39m'],
			'magenta'       : ['\x1B[35m', '\x1B[39m'],
			'red'           : ['\x1B[31m', '\x1B[39m'],
			'yellow'        : ['\x1B[33m', '\x1B[39m'],
			//background colors
			//grayscale
			'whiteBG'       : ['\x1B[47m', '\x1B[49m'],
			'greyBG'        : ['\x1B[49;5;8m', '\x1B[49m'],
			'blackBG'       : ['\x1B[40m', '\x1B[49m'],
			//colors
			'blueBG'        : ['\x1B[44m', '\x1B[49m'],
			'cyanBG'        : ['\x1B[46m', '\x1B[49m'],
			'greenBG'       : ['\x1B[42m', '\x1B[49m'],
			'magentaBG'     : ['\x1B[45m', '\x1B[49m'],
			'redBG'         : ['\x1B[41m', '\x1B[49m'],
			'yellowBG'      : ['\x1B[43m', '\x1B[49m']
		},
		palette = {
			// silly:   'rainbow',
			verbose: 'cyan',
			debug:   'cyan',
			info:    'green',
			data:    'grey',
			warning: 'yellow',
			error:   'red',
			text:    'white'
		};

	//	prefix fun, to return a dynamic prefix string
	var prefix = function(){
		return '';
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
		//	add whatever mode you want here...

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


	//	basic print function -------------------------
	var print = function(argsArray, type){

		var argsToPrint = [],
			prefixResult = prefix(),
			style = palette[type],
			stylePrepend = '',
			styleAppend = '';

		if(prefixResult !== ''){
			argsToPrint.push(prefixResult);
			argsToPrint = argsToPrint.concat(argsArray);
		} else {
			argsToPrint = argsArray;
		}
		
		//	our 'extra' styles
		[
			'underline',
			'bold',
			'inverse',
			'strikethrough'
		]
		.some(function(mode){
			// check if print mode flag is on
			if(print[mode] === true){
				//['\x1B[32m', '\x1B[39m']
				styleAppend += styles[mode][1];
				stylePrepend += styles[mode][0];
				print[mode] = false;
				//	exit loop
				return true;
			}
		});
		argsToPrint.push(styleAppend + styles[style][1]);
		argsToPrint = [stylePrepend + styles[style][0]].concat(argsToPrint);

		console.log.apply(this, argsToPrint);
	};


	//	set up function modes
	Object
	.keys(palette)
	.forEach(function(type){

		//	for each type we add function to logger
		logger[type] = function(){
			var argsArray = map(arguments);
			
			if(on){
				print(argsArray, type);
			} 

			return logger;
		};

		[
			'underline',
			'bold',
			'inverse',
			'strikethrough'
		]
		.forEach(function(style){

			//	make the extra style object...
			logger[style] = logger[style] || {};
			//	and attach the type functions as properties
			logger[style][type] = function(){

				// each time, they just turn a flag on, and call the classic print
				print[style] = true;
				logger[type].apply(this, map(arguments));
			};
		});
	});

	


	return logger;
}());