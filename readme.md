<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD032 MD036 -->

# create-element-ns

*dom `createElement` and `createElementNS` hyperscript with svg, namespace and selector support*

• [Example](#example) • [Features](#features) • [API](#api) • [License](#license)

## Example

```javascript
var CE = require('create-element-ns')
var el = CE.el

// selectors or attributes
var divEl1 = el('div.c1#i1[style="color:blue"].c2', {onclick: function() {}})(),
    divEl2 = el('div.i1', {style: {color: 'blue'}, props:{className: 'c1 c2', , onclick: function() {}}})(),
    divEl3 = el('div.c1#i1[style="color:blue"].c2')({onclick: function() {}}),

// namespace in different ways
var circleEl1 = el('svg:circle')(),
    circleEl2 = el.svg('circle')(),
    circleEl3 = el('circle[xmlns=http://www.w3.org/2000/svg]')
    circleEl3 = el('circle', {xmlns : 'http://www.w3.org/2000/svg'})

// partial application to create multiple modified clones
var pFn = el('p'),
    pEl = pFn({textContent: 'x'})

// factory functions can be nested, with or without arrays
var olFn = el('ol', el('li', 'one'), [el('li', 'two'), el('li', 'three')]),
    olEl = pFn()
```

## Features

* namespaced tag and namespaced attribute support
* svg namespace and utility functions pre-defined
* w3 string selector API, including attributes
* element decorators for element properties and attributes
* ability to inject a `document API` for server and/or testing (e.g. `jsdom`)
* ability to create an element or an element factory
* ability to create additional namespaces and utility namespaced functions

There are many hyperscript modules out there
(*docrel, create-element-from-selector, domator, makeelement, simpel* to name a few)
but they either don't support *namespaces*, like *svg* or are more oriented to virtual-dom applications.

## API

### Main methods

To create an element factory (function that return a DOM Element):
* `el(definition [, options][, content])` => `elementFactory`
* `el.svg(definition [, options][, content])` => `elementFactory`
* `elementFactory([optionObject])` => `DOM Element`

Parameters and outputs
* `definition`: a string selector, `elementFactory` or DOM Element
* `options`: `{properties:{}, attributes:{}, style:{}, dataset:{}}` or `{props:{}, attrs:{}, style:{}, dataset:{}}`
* `content`: optional series or array of string, `Element` or `elementFactory`

### Optional additional utilities

* `CE.global.document` injects an external document API like `jsdom`. Uses the global `document` if not specified.
* `CE.namespaces` adds additional namespace prefix (svg is already defined). E.g. `CE.namespaces.xlink: 'http://www.w3.org/1999/xlink'`
* `CE.decorators` to add element decorators E.g. `CE.decorators.a = CE.decorators.attributes`

## License

[MIT](http://www.opensource.org/licenses/MIT) © [Hugo Villeneuve](https://github.com/hville)
