var dom = require('dom-document'),
		decorators = require('./decorators'),
		namespaces = require('./namespaces'),
		is = require('./is'),
		parse = require('parse-element-selector')

var assign = Object.assign

module.exports = elementFactory

function elementFactory(config) {
	function create(/*[,sel][,opt][,cnt]*/) {
		var cfg = clone2({}, create)

		for (var i=0; i<arguments.length; ++i) {
			var arg = arguments[i]

			if (i === 0 && !cfg.element) {
				if (is.string(arg)) assign(cfg, parse(arg))
				else if (is.node(arg)) cfg.element = arg
				else if (is.function(arg)) cfg.element = arg(cfg)
				else if (Array.isArray(arg)) flatConcat(cfg.children, arg)
				else if (is.object(arg)) clone2(cfg, arg)
			}
			else {
				if (Array.isArray(arg) || is.stringlike(arg) || is.node(arg) || is.function(arg)) {
					cfg.children = flatConcat(cfg.children || [], arg)
				}
				else if (is.object(arg)) clone2(cfg, arg)
			}
		}
		if (!cfg.element && cfg.tag) {
			var xmlns = cfg.xmlns || namespaces[cfg.prefix],
					doc = dom.document,
					tag = cfg.tag
			cfg.element = xmlns ? doc.createElementNS(xmlns, tag) : doc.createElement(tag)
		}
		if (!cfg.partial && cfg.element) return decorate(cfg.element, cfg)
		cfg.partial = false
		return elementFactory(cfg)
	}
	return config ? assign(create, config) : create
}
function decorate(el, cfg) {
	for (var k in cfg) {
		if (decorators[k]) decorators[k].call(cfg, el, k, cfg[k])
	}
	return el
}
function flatConcat(arr, val) {
	if (Array.isArray(val)) for (var i=0; i<val.length; ++i) flatConcat(arr, val[i])
	else arr.push(val)
	return arr
}
function clone2(t, s) {
	for (var i=0, ks=Object.keys(s); i<ks.length; ++i) {
		var k = ks[i]
		t[k] = is.node(s[k]) ? s[k].cloneNode(false)
			: Array.isArray(s[k]) ? s[k].slice()
			: is.object(s[k]) ? assign({}, s[k])
			: s[k]
	}
	return t
}
