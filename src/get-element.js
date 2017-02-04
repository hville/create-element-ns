var dom = require('dom-document'),
		namespaces = require('./namespaces'),
		typ = require('./typ'),
		setChildren = require('./set-children'),
		decorators = require('./decorators')

module.exports = getElement

function getElement(elmx, defx, cntx) {
	var el = element(elmx, defx)
	if (defx) for (var k in decorators) {
		if (defx[k]) decorators[k](el, k, defx[k])
	}
	if (cntx && cntx.length) setChildren(el, cntx)
	return el
}
function element(elm, def) {
	switch (typ(elm)) {
		case typ.E:
			return elm.cloneNode(true)
		case typ.F:
			return elm(def)
		default:
			var xmlns = def.xmlns || namespaces[def.prefix],
					doc = dom.document,
					tag = def.tag || 'div'
			return xmlns ? doc.createElementNS(xmlns, tag) : doc.createElement(tag)
	}
}
