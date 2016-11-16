var global = require('dom-document'),
		create = require('./src/create'),
		factory = require('./src/create-factory'),
		decorators = require('./src/decorators'),
		decorate = require('./src/decorate'),
		namespaces = require('./src/namespaces'),
		mergeKeys = require('./src/merge-keys'),
		parseArgument = require('./src/parse-argument'),
		is = require('./src/is')

var el = factory(create)
el.svg = factory(create, {xmlns: 'http://www.w3.org/2000/svg'})

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
