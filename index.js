var elm = require('./elm'),
		api = require('./api')

module.exports = {
	api: setDocument,
	ns: setNs,
	factory: elm,
	decorators: api.decorators,
	html: {
		el: elm(api.decorators),
		fn: elm(api.decorators, true)
	},
	svg: {
		el: elm(api.decorators, false, api.namespaces.svg),
		fn: elm(api.decorators, true, api.namespaces.svg)
	}
}
function setDocument(doc) {
	if (!doc) return api.document
	api.document = doc
}
function setNs(pre, uri) {
	switch(arguments.length) {
		case 0: return api.namespaces
		case 2: {
			if (!uri) delete api.namespaces[pre]
			api.namespaces[pre] = uri
		}
	}
	return api.namespaces[pre]
}
