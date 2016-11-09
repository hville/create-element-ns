var parse = require('./sel'),
		is = require('./is'),
		api = require('./api')

module.exports = elementFactory

function elementFactory(config) {
	var decorators = api.decorators

	function create(sel /*[,opt][,cnt]*/) {
		var cfg = config ? copyKeys({}, config) : {},
				el = getElement(sel, cfg),
				cntIdx = 1

		if (is.function(arguments[1])) {
			++cntIdx
			el = arguments[1](el)
		}
		else if (is.object(arguments[1])) {
			++cntIdx
			decorate(el, arguments[1])
		}
		if (cntIdx < arguments.length) {
			var cnt = []
			for (var i = cntIdx; i<arguments.length; ++i) {
				var itm = arguments[i]
				if (itm || itm === 0) concatTo(cnt, itm)
			}
			if (cnt.length) decorators.children(el, null, cnt)
		}
		if (!cfg.partial) return el
		delete cfg.partial
		return function factory(d) { // TODO factories all the way down
			return is.function(d) ? d(el.cloneNode(true)) : decorate(el, d)
		}
	}
	return create
}
function getElement(sel, cfg) {
	if (is.node(sel)) return decorate(sel, cfg)
	if (is.function(sel)) return decorate(sel(), cfg)

	if (is.string(sel)) parse(sel, cfg)
	else if (is.object(sel)) copyKeys(cfg, sel)

	var xmlns = cfg.xmlns || api.namespaces[cfg.prefix],
			tag = cfg.tagName || 'div',
			doc = api.document,
			el = xmlns ? doc.createElementNS(xmlns, tag) : doc.createElement(tag)
	return decorate(el, cfg)
}
function decorate(el, cfg) {
	var decorators = api.decorators
	for (var k in cfg) {
		if (decorators[k]) decorators[k](el, k, cfg[k])
	}
	return el
}
function concatTo(arr, val) {
	if (Array.isArray(val)) for (var i=0; i<val.length; ++i) arr.push(val[i])
	else arr.push(val)
	return arr
}
function copyKeys(t, s) {
	for (var i=0, ks=Object.keys(s); i<ks.length; ++i) t[ks[i]] = s[ks[i]]
	return t
}
