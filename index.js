var elm = require('./elm'),
		api = require('./api'),
		is = require('./is'),
		sel = require('./sel')

module.exports = {
	api: setDocument,
	ns: setNs,
	sel: sel,
	is: is,
	factory: elm,
	decorators: api.decorators,
	html: {
		el: elm(),
		fn: elm({partial: true})
	},
	svg: {
		el: elm({xmlns: api.namespaces.svg}),
		fn: elm({xmlns: api.namespaces.svg, partial: true})
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
