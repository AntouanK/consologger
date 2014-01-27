consologger
===========

A simple logger so you can manage all your 'console.log()' from a main lib. Coloured output, dynamic prefixing, and on/off switch.

## Use example
```js
var log = require('./consologger');

log.text('hello from consologger');
log.warning('careful...');
log.info('something happened');
log.info('nothing serious happened');
log.verbose('doing some calculations...')
log.data('1 + 2 = '+3);
log.data('3 + 2 = '+4);
log.error("that's wrong!");

//	set a dynamic prefix for every line
log.setPrefix(function() {
	return '['+Date().substr(0,24)+'] ';
});

//	switch off the logger
log.setMode(0);
log.error(undefined);
log.data(null);
log.text('YOU ARE NOT SUPPOSED TO SEE THIS');
//	switch on again
log.setMode(1);

log.text('hello again');

setTimeout(function(){
	log.info('you can see live date time in the prefix');
	//	set another color to a type of logging
	log.setColor('info', 'magenta');
	log.info('info is now magenta');

	log.setPrefix(function() {
		return '';
	});

	log.text('back to normal again');
	log.silly('~~~~~~~~~~~~~');
	log.silly('enjoy logging');
	log.silly('~~~~~~~~~~~~~');
},1100);
```

<img src="http://i.imgur.com/KDB2RXA.png" border = "0"/>
