<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD032 MD036 -->

# create-element-ns

*dom `createElement` and `createElementNS` hyperscript with svg, namespace and selector support*

• [Example](#example) • [Features](#features) • [API](#api) • [License](#license)

## Example

```javascript
var createElementNS = require('create-element-ns')

var el = createElementNS.el,
    createHtmlFac = createElementNS.el({partial: true}),

// selectors or attributes
var divEl1 = el('div.c1#i1[style="color:blue"].c2', {onclick: function() {}}),
    divEl2 = el('div.i1', {style: {color: 'blue'}, props:{className: 'c1 c2', , onclick: function() {}}})

// namespace in different ways
var circleEl1 = el('svg:circle'),
    circleEl2 = el.svg('circle'),
    circleEl3 = el('circle[xmlns=http://www.w3.org/2000/svg]')
    circleEl3 = el('circle', {element: {xmlns : 'http://www.w3.org/2000/svg'}})

// partial application to reate multiple modified clones
var pFactory = el('p', {textContent: 'x', partial: true}),
    pEl1 = pFactory({textContent: 'x'})
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

To create an element (methods that return a DOM Element):
* `el(definition [, options][, content])` => `HTMLElement` || `elementFactory`
* `el.svg(definition [, options][, content])` => `SVGElement` || `elementFactory`

If there is no tagName defined or if there is a partial property `{partial: true}` in the arguments,
the function returns a factory instead of an element.

Parameters and outputs
* `definition`: a string selector, `elementFactory` or DOM Element
* `options`: an optional `qualifier` object of attributes and properties or an optional `elementDecorator` function
  * `qualifier`: {properties:{}, attributes:{}, style:{}, dataset:{}}. Alias: `props`, `attrs`
  * `elementDecorator(el) => el'` modifies an element directly
* `content`: optional series of string, Element and arrays of strings and Elements
* `elementFactory([elementDecorator|optionObject]) => el`

### Optional additional utilities
	dom: dom,
	namespaces: namespaces,
	decorators: decorators,
	html: factory(),
	svg: factory({xmlns: 'http://www.w3.org/2000/svg'})
}

* `.dom.document` injects an external document API like `jsdom`. Uses the global `document` if not specified.
* `.namespaces` adds additional namespace prefix (svg is already defined). E.g. `.namespaces.xlink: 'http://www.w3.org/1999/xlink'`
* `.factory(options)` to create additional preset functions E.g. `xlink = factory({xmlns: 'http://www.w3.org/1999/xlink'})`

# License

Released under the [MIT License](http://www.opensource.org/licenses/MIT)
