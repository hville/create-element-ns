var global = require('dom-document'),
		factory = require('./src/create-factory'),
		decorators = require('./src/decorators'),
		namespaces = require('./src/namespaces'),
		getElement = require('./src/get-element')

var el = factory(getElement)
el.svg = factory(getElement, {xmlns: 'http://www.w3.org/2000/svg'})

module.exports = {
	el: el,
	global: global,
	namespaces: namespaces,
	decorators: decorators
}
