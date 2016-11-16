var dom = require('dom-document'),
		decorate = require('./decorate'),
		namespaces = require('./namespaces'),
		is = require('./is')

module.exports = create

function create(cfg, arg) {
	var el = getElement(cfg)
	decorate(el, cfg)
	return arg ? decorate(el, arg) : el
}
function getElement(cfg) {
	if (is.node(cfg.element)) return cfg.element.cloneNode(true)
	var xmlns = cfg.xmlns || namespaces[cfg.prefix],
			doc = dom.document,
			tag = cfg.tag
	return xmlns ? doc.createElementNS(xmlns, tag) : doc.createElement(tag)
}
