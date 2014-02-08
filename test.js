//	test.js for consologger

var log = require('./consologger');

log
.text('hello', { 'from': 'consologger'})
.warning('warning: careful...');
log.info({something: 'happened', I: ['guess']}, null, undefined);
//	set our favorite colours if we don't like the defaults
log
.setColor('debug', 'blue')
.setColor('info', 'magenta')
.setColor('invertError', 'redBG');

log.info('info: nothing serious happened', 'just a color change');
log.debug('foo blue');
log.verbose('calculating...')
log.data('1 + 2 = '+3);
log.strikethrough.data('3 + 2 = '+4);
log.error('that\'s wrong!');
log.bold.error('very wrong!');
log.invertError(['crazy', 'inverted', 'error'])
log.bold.info(["let 's add",{a: 'prefix now'}]);

log
//	switch off the logger
.setMode(0)
.data('blah blah blah');

log.text('YOU ARE NOT SUPPOSED TO SEE THIS');
log.error(undefined);

log
//	switch on again
.setMode(1)
//	set a dynamic prefix for every line
.setPrefix(function() {
	return '['+Date().substr(0,24)+']';
});

log.text(function hello(again){ return 'back';});

setTimeout(function(){
	log.setMode('noStylePrefix');
	log.underline.text('click here');
	log.setMode('stylePrefix');
	log.data('just kidding ( showing off underline )');
	log.info({ we: 'have', live: ['time','prefix']});

	log.setPrefix(function() {
		return '';
	});

	log.text('keep logging...');
},1000);

//	add indentation levels