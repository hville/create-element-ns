var common = require('./common')

var is = common.is,
		parse = common.parseSelector,
		namespaces = common.namespaces

module.exports = elementFactory

function elementFactory(config) {
	function create(/*[,sel][,opt][,cnt]*/) {
		var cfg = assignL2({}, create)

		for (var i=0; i<arguments.length; ++i) {
			var arg = arguments[i]
			if (i === 0 && !is.node(cfg.element)) {
				if (is.string(arg)) parse(arg, cfg)
				else if (is.node(arg)) cfg.element = arg
				else if (is.function(arg)) cfg.element = arg(cfg)
				else if (Array.isArray(arg)) concatTo(cfg.children, arg)
				else if (is.object(arg)) assignL2(cfg, arg)
			}
			else {
				if (Array.isArray(arg) || is.stringlike(arg) || is.node(arg) || is.function(arg)) {
					cfg.children = concatTo(cfg.children || [], arg)
				}
				else if (is.object(arg)) assignL2(cfg, arg)
			}
		}

		if (cfg.element && cfg.element.tagName && !is.node(cfg.element)) {
			var xmlns = cfg.element.xmlns || namespaces[cfg.element.prefix],
					doc = common.document,
					tag = cfg.element.tagName
			cfg.element = xmlns ? doc.createElementNS(xmlns, tag) : doc.createElement(tag)
		}
		if (!cfg.partial && is.node(cfg.element)) return decorate(cfg.element, cfg)
		cfg.partial = false
		return elementFactory(cfg)
	}
	return config ? assignL1(create, config) : create
}
function decorate(el, cfg) {
	var decorators = common.decorators
	for (var k in cfg) {
		if (decorators[k]) decorators[k].call(cfg, el, k, cfg[k])
	}
	return el
}
function concatTo(arr, val) {
	if (Array.isArray(val)) for (var i=0; i<val.length; ++i) arr.push(val[i])
	else arr.push(val)
	return arr
}
function assignL1(t, s) {
	for (var i=0, ks=Object.keys(s); i<ks.length; ++i) t[ks[i]] = s[ks[i]]
	return t
}
function assignL2(t, s) {
	for (var i=0, ks=Object.keys(s); i<ks.length; ++i) {
		var k = ks[i]
		t[k] = is.node(s[k]) ? s[k].cloneNode(false)
			: Array.isArray(s[k]) ? s[k].slice()
			: is.object(s[k]) ? assignL1({}, s[k])
			: s[k]
	}
	return t
}
