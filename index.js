var global = require('dom-document'),
		factory = require('./elm'),
		decorators = require('./decorators'),
		namespaces = require('./namespaces'),
		mergeKeys = require('./merge-keys'),
		is = require('./is')

var el = factory()
el.svg = factory({xmlns: 'http://www.w3.org/2000/svg'})

module.exports = {
	el: el,
	global: global,
	namespaces: namespaces,
	decorators: decorators,
	mergeKeys: mergeKeys,
	is: is
}
