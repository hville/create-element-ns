var global = require('dom-document'),
		factory = require('./elm'),
		decorators = require('./decorators'),
		namespaces = require('./namespaces')

var el = factory()
el.svg = factory({xmlns: 'http://www.w3.org/2000/svg'})

module.exports = {
	global: global,
	namespaces: namespaces,
	decorators: decorators,
	el: el
}
