var global = require('dom-document'),
		factory = require('./elm'),
		decorators = require('./decorators'),
		decorate = require('./decorate'),
		namespaces = require('./namespaces'),
		mergeKeys = require('./merge-keys'),
		parseArgument = require('./parse-argument'),
		is = require('./is')

var el = factory()
el.svg = factory({xmlns: 'http://www.w3.org/2000/svg'})

module.exports = {
	el: el,
	global: global,
	namespaces: namespaces,
	decorators: decorators,
	decorate: decorate,
	mergeKeys: mergeKeys,
	parseArgument: parseArgument,
	is: is
}
