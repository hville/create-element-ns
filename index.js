var dom = require('dom-document'),
		factory = require('./elm'),
		decorators = require('./decorators'),
		namespaces = require('./namespaces')

var el = factory()
el.svg = el({xmlns: 'http://www.w3.org/2000/svg'})

module.exports = {
	dom: dom,
	namespaces: namespaces,
	decorators: decorators,
	el: el
}
