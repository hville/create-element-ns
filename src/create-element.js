var dom = require('dom-document'),
		namespaces = require('./namespaces'),
		cTyp = require('./typ')

module.exports = createElement

function createElement(cfg) {
	var elm = cfg[0],
			def = cfg[1]
	switch (cTyp(elm)) {
		case 'N': return elm.cloneNode(true)
		case Function: return elm(def)
	}
	var xmlns = def.xmlns || namespaces[def.prefix],
			doc = dom.document,
			tag = def.tag || 'div'
	return xmlns ? doc.createElementNS(xmlns, tag) : doc.createElement(tag)
}
