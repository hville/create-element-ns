var parse = require('./sel'),
		is = require('./is'),
		api = require('./api')

module.exports = elementFactory

function elementFactory(decorators, isPartial, ns) {
	function create(def /*[,opt][,cnt]*/) {
		var el = getElement(decorators, def, ns),
				cntIdx = 1
		if (is.function(arguments[1])) {
			++cntIdx
			el = arguments[1](el)
		}
		else if (is.object(arguments[1])) {
			++cntIdx
			decorate(el, arguments[1], decorators)
		}
		if (cntIdx < arguments.length) {
			var cnt = []
			for (var i = cntIdx; i<arguments.length; ++i) {
				var itm = arguments[i]
				if (itm) concatTo(cnt, itm)
			}
			if (cnt.length) {
				if (cnt.length === 1 && is.stringlike(cnt[0]) && !el.childNodes.length) {
					el.textContent = cnt[0]
				}
				else decorators.children(el, null, cnt)
			}
		}
		if (isPartial) return function factory(d) {
			return is.function(d) ? d(el.cloneNode(true)) : decorate(el, d, decorators)
		}
		else return el
	}
	return create
}
function getElement(decorators, def, ns) {
	if (is.node(def)) return def
	if (is.function(def)) return def()

	var cfg = is.string(def) ? parse(def)
		: is.object(def) ? def
		: {}

	var xmlns = cfg.xmlns || api.namespaces[cfg.prefix] || ns,
			tag = cfg.tagName || 'div',
			doc = api.document,
			el = xmlns ? doc.createElementNS(xmlns, tag) : doc.createElement(tag)
	return decorate(el, cfg, decorators)
}
function decorate(el, cfg, decorators) {
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
