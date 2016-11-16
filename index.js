var global = require('dom-document'),
		createElement = require('./src/create-element'),
		createTree = require('./src/create-tree'),
		factory = require('./src/create-factory'),
		decorators = require('./src/decorators'),
		setChildren = require('./src/set-children'),
		decorate = require('./src/decorate'),
		namespaces = require('./src/namespaces'),
		mergeKeys = require('./src/merge-keys'),
		parseArgument = require('./src/parse-argument'),
		is = require('./src/is')

var el = factory(createTree)
el.svg = factory(createTree, {xmlns: 'http://www.w3.org/2000/svg'})

module.exports = {
	el: el,
	global: global,
	namespaces: namespaces,
	decorators: decorators,
	decorate: decorate,
	createElement: createElement,
	createTree: createTree,
	mergeKeys: mergeKeys,
	parseArgument: parseArgument,
	is: is,
	setChildren: setChildren
}
