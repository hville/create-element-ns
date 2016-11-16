var dom = require('dom-document'),
		namespaces = require('./namespaces'),
		is = require('./is')

module.exports = createElement

function createElement(cfg) {
	if (is.node(cfg.element)) return cfg.element.cloneNode(true)
	if (is.function(cfg.element)) return cfg.element()
	var xmlns = cfg.xmlns || namespaces[cfg.prefix],
			doc = dom.document,
			tag = cfg.tag || 'div'
	return xmlns ? doc.createElementNS(xmlns, tag) : doc.createElement(tag)
}
