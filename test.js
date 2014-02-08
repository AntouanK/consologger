//	test.js for consologger

var log = require('./consologger');

log
.text('hello',' from','| consologger')
.warning('warning: careful...');
log.info({something: 'happened', I: ['guess']});
log.info('info: nothing serious happened');
log.verbose('calculating...')
log.data('1 + 2 = '+3);
log.strikethrough.data('3 + 2 = '+4);
log.error('that\'s wrong!');
log.bold.error('very wrong!');
log.bold.info([1,2,'3',{4: 5}]);

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
	return '['+Date().substr(0,24)+'] ';
});

log.text(function hello(again){ return 'back';});

setTimeout(function(){
	log.underline.text('click here');
	log.data('just kidding ( showing off underline )');
	log.info({ we: 'have', live: ['time','prefix']});
	//	set another color to a type of logging
	log
	.setColor('info', 'magenta')
	.info('info is now set to magenta');

	log.setPrefix(function() {
		return '';
	});

	log.text('back to normal again');
},1000);
