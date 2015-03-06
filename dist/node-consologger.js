"use strict";

module.exports = (function () {

	"use strict";

	//	module requires console
	if (console === undefined) {
		throw new Error("console not found!");
	}

	//	make a map function to use for the 'arguments' conversion to Array
	function map(args) {

		var argsArray, i;

		if (args === undefined) {
			return [];
		}

		argsArray = [];

		for (i = 0; i < args.length; i += 1) {
			argsArray.push(args[i]);
		}

		return argsArray;
	};

	function addStyle(value, style) {

		if (typeof value === "string") {
			return styles[style][0] + value + styles[style][1];
		} else if (value === undefined || typeof value.length !== "number") {
			return value;
		} else {
			return [styles[style][0]].concat(value).concat([styles[style][1]]);
		}
	}
	//-------------------------------------------

	//	module variables
	//
	var logger = {},
	    loggerAdditional = {},
	    on = true,
	    stylePrefix = false,
	    styles = {
		//====================== styles
		bold: ["\u001b[1m", "\u001b[22m"],
		italic: ["\u001b[3m", "\u001b[23m"],
		underline: ["\u001b[4m", "\u001b[24m"],
		inverse: ["\u001b[7m", "\u001b[27m"],
		strikethrough: ["\u001b[9m", "\u001b[29m"],
		//====================== text colors
		//grayscale
		white: ["\u001b[37m", "\u001b[39m"],
		grey: ["\u001b[90m", "\u001b[39m"],
		black: ["\u001b[30m", "\u001b[39m"],
		blue: ["\u001b[34m", "\u001b[39m"],
		cyan: ["\u001b[36m", "\u001b[39m"],
		green: ["\u001b[32m", "\u001b[39m"],
		magenta: ["\u001b[35m", "\u001b[39m"],
		red: ["\u001b[31m", "\u001b[39m"],
		yellow: ["\u001b[33m", "\u001b[39m"],
		//====================== background colors
		//grayscale
		whiteBG: ["\u001b[47m", "\u001b[49m"],
		greyBG: ["\u001b[49;5;8m", "\u001b[49m"],
		blackBG: ["\u001b[40m", "\u001b[49m"],
		blueBG: ["\u001b[44m", "\u001b[49m"],
		cyanBG: ["\u001b[46m", "\u001b[49m"],
		greenBG: ["\u001b[42m", "\u001b[49m"],
		magentaBG: ["\u001b[45m", "\u001b[49m"],
		redBG: ["\u001b[41m", "\u001b[49m"],
		yellowBG: ["\u001b[43m", "\u001b[49m"]
	},
	    palette = {
		verbose: "cyan",
		info: "green",
		data: "grey",
		warning: "yellow",
		error: "red",
		text: "white"
	};

	//	prefix fun, to return a dynamic prefix string
	var prefix = function prefix() {
		return "";
	};

	//	example
	//	return Date().substr(0,24)+ ' ' ;
	logger.setPrefix = function (newPrefix) {

		if (typeof newPrefix === "function") {
			prefix = newPrefix;
		}

		return logger;
	};

	//	set a new color to a type of logging
	//	** carefull if color is not acceptable string...
	logger.setColor = function (name, color) {

		if (typeof color !== "string") {
			return logger;
		}

		palette[name] = color;

		makeFunction(name);

		return logger;
	};

	//	set the mode you want to use ( default is 1, open )
	//	0 to close the logger
	//	1 to open it
	logger.setMode = function (mode) {

		if (mode === 0 || mode === "off") {
			on = false;
		} else if (mode === 1 || mode === "on") {
			on = true;
		} else if (mode === "stylePrefix") {
			stylePrefix = true;
		} else if (mode === "noStylePrefix") {
			stylePrefix = false;
		}
		//	add whatever modes you want here...

		return logger;
	};

	//	basic print function -------------------------
	var print = (function (_print) {
		var _printWrapper = function print(_x, _x2) {
			return _print.apply(this, arguments);
		};

		_printWrapper.toString = function () {
			return _print.toString();
		};

		return _printWrapper;
	})(function (argsArray, type) {

		var argsToPrint = [],
		    lastArg,
		    prefixResult = prefix(),
		    style = palette[type],
		    stylePrepend = "",
		    styleAppend = "";

		//	if prefix is in style, and not '', push it in the args
		if (prefixResult !== "" && stylePrefix === true) {
			argsToPrint.push(prefixResult);
			argsToPrint = argsToPrint.concat(argsArray);
		} else {
			argsToPrint = argsArray;
		}

		lastArg = argsToPrint.length - 1;

		//	our 'extra' styles
		["underline", "bold", "italic", "inverse", "strikethrough"].some(function (mode) {
			// check if print mode flag is on
			if (print[mode] === true) {
				styleAppend += styles[mode][1];
				stylePrepend += styles[mode][0];
				print[mode] = false;
				//	exit loop
				return true;
			}
		});

		if (typeof argsToPrint[lastArg] === "string") {
			argsToPrint[lastArg] = argsToPrint[lastArg] + styleAppend + styles[style][1];
		} else {
			argsToPrint.push(styleAppend + styles[style][1]);
		}

		if (typeof argsToPrint[0] === "string") {
			argsToPrint[0] = styles[style][0] + stylePrepend + argsToPrint[0];
		} else {
			argsToPrint = [stylePrepend + styles[style][0]].concat(argsToPrint);
		}

		if (prefixResult !== "" && stylePrefix === false) {
			argsToPrint = [prefixResult].concat(argsToPrint);
		}

		console.log.apply(this, argsToPrint);
		return logger;
	});

	var makeFunction = function makeFunction(type) {

		//	for each type we add function to logger
		logger[type] = function () {

			if (on) {
				print(map(arguments), type);
			}

			return logger;
		};

		//	make the extra styling functions
		["underline", "bold", "italic", "inverse", "strikethrough"].forEach(function (extraStyle) {

			//	make the extra style object...
			logger[extraStyle] = logger[extraStyle] || {};
			//	and attach the type functions as properties
			logger[extraStyle][type] = function () {

				// each time, they just turn a flag on, and call the classic print
				print[extraStyle] = true;
				logger[type].apply(this, map(arguments));
				return logger;
			};
		});
	};

	//	set up function modes
	Object.keys(palette).forEach(makeFunction);

	return logger;
})();