var dom = require('dom-document'),
		factory = require('./elm'),
		decorators = require('./decorators'),
		namespaces = require('./namespaces')

module.exports = {
	dom: dom,
	namespaces: namespaces,
	decorators: decorators,
	html: factory(),
	svg: factory({xmlns: 'http://www.w3.org/2000/svg'})
}
