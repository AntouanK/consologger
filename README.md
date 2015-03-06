consologger
===========

[![NPM](https://nodei.co/npm/consologger.png?downloads=true)](https://npmjs.org/package/consologger)

A simple logger so you can manage all your 'console.log()' from a main lib.
Styled output, dynamic prefixing and custom presets.
Feel free to make requests, report bugs, and suggest ideas.

_prototypes were not harmed in making this library_


### Example for the browser version


Let's see a simple example.
( we assume you use browserify or something so you can use the module on the browser )


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

logger
.text('✅')
.green.lThrough('make a module to make logging awesome')
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
	.red('not this error again')
	.print();
};

setTimeout(foo, 500);

var logger = new Consologger();

logger
.red('not this error again')
.print();
```

## node.js version

For node there are some presets with terminal specific stuff.

`.addPreset` doesn't work because it makes no sense to add a new preset...

## API

### Consologger
contructor of a new consologger instance.
That new instance can hold prefix state.

### .*preset*
when using a preset ( see list of presets [here](https://github.com/AntouanK/consologger/blob/develop/dist/presets.json) ), you add the style of that preset to the current styles of the consologger instance.

### .*preset*(text)
when passing a text to a preset function, you apply the current styles to that text, and keep it in the consologger line buffer.
( for now, only strings are accepted )

### .print()
prints whatever the line buffer has, with the styles applied on each string separately.
If the consologger instance has a prefix set, that's going to be prepended to the line buffer.

### .prefix()
takes the line buffer and saves is as a prefix so that every next `.print()` will inlude the prefix value first.

### .addPreset(presetObject)
Adds a new preset.
`presetObject` must have a 'name' field with a string value, and a 'style' field that's an object and has the CSS values you want to apply.
( for now, you cannot override presets that already exist )
