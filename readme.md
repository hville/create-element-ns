<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD032 MD036 -->

# create-element-ns

*dom `createElement` and `createElementNS` hyperscript with svg, namespace and selector support*

• [Example](#example) • [Features](#features) • [API](#api) • [License](#license)

## Example

```javascript
var createElementNS = require('create-element-ns')

var createHtmlEl = createElementNS.html.el,
    createHtmlFac = createElementNS.html.el,
    createSvgEl = createElementNS.svg.fn,
    createSvgFac = createElementNS.svg.fn,

// selectors or attributes
var divEl1 = createHtmlEl('div.c1#i1[style="color:blue"].c2', {onclick: function() {}}),
    divEl2 = createHtmlEl('.i1', {style: {color: 'blue'}, props:{className: 'c1 c2', , onclick: function() {}}})

// namespace in different ways
var circleEl1 = createHtmlEl('svg:circle'),
    circleEl2 = createSvgEl('svg:circle'),
    circleEl3 = createHtmlEl('circle[xmlns=http://www.w3.org/2000/svg]')

// elementfactories to create multiple modified clones
function dec(el) {
  el.textContent = 'x'
  return el
}
var pEl0 = pFac(dec),
    pEl1 = pFac({textContent: 'x'})
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
* `html.el(definition [, options][, content])` => DOM HTMLElement
* `svg.el(definition [, options][, content])` => DOM SVGElement

To create an element factory (methods that return an `elementFactory` that creates DOM Elements):
* `html.fn(definition [, options][, content])` => `elementFactory`
* `svg.fn(definition [, options][, content])` => `elementFactory`

Parameters and outputs
* `definition`: a string selector, `elementFactory` or DOM Element
* `options`: an optional `qualifier` object of attributes and properties or an optional `elementDecorator` function
  * `qualifier`: {properties:{}, attributes:{}, style:{}, dataset:{}}. Alias `s`, `a`, `p`, `d`, `props`, `attrs`
  * `elementDecorator(el) => el'` modifies an element directly
* `content`: optional series of string, Element and arrays of strings and Elements
* `elementFactory([elementDecorator|optionObject]) => el`

### Optional additional utilities

* `.api(documentAPI)` injects an external document API like `jsdom`. Uses the global `document` if not specified.
* `.ns(prefix, URI)` adds additional namespace prefix (svg is already defined). E.g. `.ns('xlink', 'http://www.w3.org/1999/xlink')`
* `.factory(nsDecorators, partial, URI)` to create additional namespace functions (html and svg are already defined)

# License

Released under the [MIT License](http://www.opensource.org/licenses/MIT)
