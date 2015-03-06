consologger
===========

[![NPM](https://nodei.co/npm/consologger.png?downloads=true)](https://npmjs.org/package/consologger)

A simple logger so you can manage all your 'console.log()' from a main lib.
Styled output, dynamic prefixing and custom presets.
Feel free to make requests, report bugs, and suggest ideas.

_prototypes were not harmed in making this library_


### Example for the browser version


Let's see a simple example.
( we assume we use browserify so you can use the module on the browser )


```js
//	Get the module, which is a constructor.
var Consologger = require('consologger');

//	Make a new instance for logging.
var logger = new Consologger();

//	Let's start logging.
//	We make some green text.
logger.green('Here\'s some green text');

//	And then we print it.
logger.print();
```
You should have some green text in the console!
Big deal.

### Chaining

You can chain those calls.

So the above would become
```js
logger
.green('Here\'s some green text')
.print();
```
Now, you can also chain presets ( styles basically ).
For example, `u` is the preset for underline and `mono` is the preset for monospace font.
```js
logger
.u.mono.red('red monospace for retro errors')
.print();
```

And you can add more text/presets before hitting print, so that will result in a line with those combined.
```js
logger
.red('[ERROR] ')
.mono.bgRed('Ln 0 Col 0')
//	text is the "plain" preset, without any styles
.text(' Some error happened there (go fix it!)')
.print();
```

### Presets

There are some presets coming with the module, covering the most common and simple use cases.
you can see them in the `presets.json` file.

But it's very easy to add your own presets.
Here's an example

```js
var Consologger = require('consologger');
var logger = new Consologger();
var myNewStyle;

myNewStyle = {
	name: 'cyanItalic',
	//	style is basically CSS
	style: {
		color: 'cyan',
		'font-style': 'italic'
	}
};

logger
.addPreset(myNewStyle);

logger
.cyanItalic('my fancy cyan text')
.print();
```

### Prefix

You can add a prefix on a consologger instance.
Let's say I'm in a context in my code where I want to separate visually whether the logging I see comes from that context or not.
```js
var foo = function(){

	var fooLogger = new Consologger();
	fooLogger
  .bgRed.mono('[ foo() ]')
  .prefix();

	// ...
	fooLogger
  .red('some error happened')
  .print();
};

setTimeout(foo, 500);

var logger = new Consologger();

logger
.red('some error happened')
.print();
```
