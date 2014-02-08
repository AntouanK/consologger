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

	function addStyle(value, style){

		if(typeof value === 'string'){
			return styles[style][0] + value + styles[style][1];
		} else if(value === undefined || typeof value.length !== 'number' ){
			return value;
		} else {
			return [styles[style][0]].concat(value).concat([styles[style][1]]);
		}
	}
	//-------------------------------------------

	//	module variables
	//	
	var logger            = {},
		loggerAdditional  = {},
		on                = true,
		stylePrefix       = false,
		styles = {
			//====================== styles
			'bold'          : ['\x1B[1m',  '\x1B[22m'],
			'italic'        : ['\x1B[3m',  '\x1B[23m'],
			'underline'     : ['\x1B[4m',  '\x1B[24m'],
			'inverse'       : ['\x1B[7m',  '\x1B[27m'],
			'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
			//====================== text colors
			//grayscale
			'white'         : ['\x1B[37m', '\x1B[39m'],
			'grey'          : ['\x1B[90m', '\x1B[39m'],
			'black'         : ['\x1B[30m', '\x1B[39m'],
			'blue'          : ['\x1B[34m', '\x1B[39m'],
			'cyan'          : ['\x1B[36m', '\x1B[39m'],
			'green'         : ['\x1B[32m', '\x1B[39m'],
			'magenta'       : ['\x1B[35m', '\x1B[39m'],
			'red'           : ['\x1B[31m', '\x1B[39m'],
			'yellow'        : ['\x1B[33m', '\x1B[39m'],
			//====================== background colors
			//grayscale
			'whiteBG'       : ['\x1B[47m', '\x1B[49m'],
			'greyBG'        : ['\x1B[49;5;8m', '\x1B[49m'],
			'blackBG'       : ['\x1B[40m', '\x1B[49m'],
			'blueBG'        : ['\x1B[44m', '\x1B[49m'],
			'cyanBG'        : ['\x1B[46m', '\x1B[49m'],
			'greenBG'       : ['\x1B[42m', '\x1B[49m'],
			'magentaBG'     : ['\x1B[45m', '\x1B[49m'],
			'redBG'         : ['\x1B[41m', '\x1B[49m'],
			'yellowBG'      : ['\x1B[43m', '\x1B[49m']
		},
		palette = {
			verbose: 'cyan',
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

	//	example
	//	return Date().substr(0,24)+ ' ' ;
	logger.setPrefix = function(newPrefix){
		
		if(typeof newPrefix === 'function'){
			prefix = newPrefix;
		}

		return logger;
	};

	//	set a new color to a type of logging
	//	** carefull if color is not acceptable string...
	logger.setColor = function(name, color){

		if(typeof color !== 'string'){
			return logger;
		}

		palette[name] = color;

		makeFunction(name);

		return logger;
	};

	//	set the mode you want to use ( default is 1, open )
	//	0 to close the logger
	//	1 to open it
	logger.setMode = function(mode){

		if(mode === 0 || mode === 'off'){
			on = false;
		} else if (mode === 1 || mode === 'on'){
			on = true;
		} else if(mode === 'stylePrefix'){
			stylePrefix = true;
		} else if(mode === 'noStylePrefix'){
			stylePrefix = false;
		}
		//	add whatever modes you want here...

		return logger;
	};


	//	basic print function -------------------------
	var print = function(argsArray, type){

		var argsToPrint = [],
			lastArg,
			prefixResult = prefix(),
			style = palette[type],
			stylePrepend = '',
			styleAppend = '';

		//	if prefix is in style, and not '', push it in the args
		if(prefixResult !== '' && stylePrefix === true){
			argsToPrint.push(prefixResult);
			argsToPrint = argsToPrint.concat(argsArray);
		} else {
			argsToPrint = argsArray;
		}
		
		lastArg = argsToPrint.length-1;

		//	our 'extra' styles
		[
			'underline',
			'bold',
			'italic',
			'inverse',
			'strikethrough'
		]
		.some(function(mode){
			// check if print mode flag is on
			if(print[mode] === true){
				styleAppend += styles[mode][1];
				stylePrepend += styles[mode][0];
				print[mode] = false;
				//	exit loop
				return true;
			}
		});

		if(typeof argsToPrint[lastArg] === 'string'){
			argsToPrint[lastArg] = argsToPrint[lastArg] + styleAppend + styles[style][1];
		} else {
			argsToPrint.push(styleAppend + styles[style][1]);
		}

		if(typeof argsToPrint[0] === 'string'){
			argsToPrint[0] = styles[style][0] + stylePrepend + argsToPrint[0];
		} else {
			argsToPrint = [stylePrepend + styles[style][0]].concat(argsToPrint);
		}

		if(prefixResult !== '' && stylePrefix === false){
			argsToPrint = [prefixResult].concat(argsToPrint);
		}
		
		console.log.apply(this, argsToPrint);
		return logger;
	};

	var makeFunction = function(type){

		//	for each type we add function to logger
		logger[type] = function(){

			if(on){
				print(map(arguments), type);
			}

			return logger;
		};

		//	make the extra styling functions
		[
			'underline',
			'bold',
			'italic',
			'inverse',
			'strikethrough'
		]
		.forEach(function(extraStyle){

			//	make the extra style object...
			logger[extraStyle] = logger[extraStyle] || {};
			//	and attach the type functions as properties
			logger[extraStyle][type] = function(){

				// each time, they just turn a flag on, and call the classic print
				print[extraStyle] = true;
				logger[type].apply(this, map(arguments));
				return logger;
			};
		});
	};

	//	set up function modes
	Object.keys(palette)
	.forEach(makeFunction);

	return logger;
}());