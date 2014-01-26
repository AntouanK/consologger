var logger = require('./consologger');

logger.text('hello');
logger.warning('careful...');
logger.info('something happened');
logger.data('1 + 2 = '+4);
logger.error("that's wrong!");

logger.setPrefix(function() {
	return 'my_prefix-';
});

logger.text('hello again');
logger.info('time to go');

logger.setMode(0);

logger.text('YOU ARE NOT SUPPOSED TO SEE THIS');

logger.setMode(1);

logger.setPrefix(function() {
	return '';
});

logger.text('ok now, back again');