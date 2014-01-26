consologger
===========

A simple logger so you can manage all your 'console.log()' from a main lib. Coloured output, dynamic prefixing, and on/off switch.

## Use example
```
var logger = require('consologger');

//  print normal text
logger.text('hello');
//  print a warning
logger.warning('careful...');
//  print info
logger.info('something happened');
//  print data
logger.data('1 + 2 = '+4);
//  print an error
logger.error("that's wrong!");

//  set a prefix for the log
logger.setPrefix(function() {
	return 'my_prefix-';
});

//  print prefixed lines
logger.text('hello again');
logger.info('time to go');

//  turn logger off
logger.setMode(0);

logger.text('YOU ARE NOT SUPPOSED TO SEE THIS');

//  turn logger on
logger.setMode(1);

//  clear prefix
logger.setPrefix(function() {
	return '';
});

logger.text('ok now, back again');
```

<img src="http://i.imgur.com/KDB2RXA.png" border = "0"/>
