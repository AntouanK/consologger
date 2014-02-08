//	test.js for consologger

var log = require('./consologger'),
	i   = 0;

//	chaining supported ( will try to implement same line appending later... )
log
.text('hello', { 'from': 'consologger', 'version': '0.1.4'})
.warning('warning: this is a work in progress...')
.info('we can print everything now. objects, functions, whatever');

log.info({and: {colors: 'package', is: ['not needed now']}});

//	set our favorite colours if we don't like the defaults
log
.setColor('debug', 'blue')
.setColor('info', 'magenta')
.setColor('invertError', 'redBG')
//	let's print some stuff
.info('info: nothing serious happened', 'just a color change')
.debug('log.debug()', 'is now blue!')
.verbose('calculating...')
.data('1 + 2 = '+3)
.strikethrough.data('3 + 2 = '+4)
.error('that\'s wrong!')
.bold.error('very wrong!')
.invertError(['crazy', 'inverted', 'error']);

log
//	switch off the logger
.setMode('off')
.data('logger is now off so you can switch it off in a big project and avoid useless printing')
.text('YOU ARE NOT SUPPOSED TO SEE THIS')
.error(undefined)
//	switch on again
.setMode('on')
.bold.info({"let 's add": {a: 'prefix now'}})
//	set a dynamic prefix for every line
.setPrefix(function() {
	return '['+Date().substr(0,24)+']['+(i+=1)+']';
});

//	print functions
log.text(function hello(again){ return 'back';});

//	remove prefix styling
log.setMode('noStylePrefix');

log.underline.text('click here');

//	revert to have prefix styled
log.setMode('stylePrefix');

log
.data('just kidding ( showing off underline )')
.info({ we: 'have', live: ['time','prefix']});

//	set prefix off
log.setPrefix(function() {
	return '';
});

log.text('keep logging...');
log.underline.text('npmjs.org/package/consologger');

//	TODO: add indentation levels
//	TODO: add same line identing