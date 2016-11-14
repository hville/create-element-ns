var dom = require('dom-document'),
		decorators = require('./decorators'),
		namespaces = require('./namespaces'),
		is = require('./is'),
		parse = require('parse-element-selector')

var assign = Object.assign

module.exports = elementFactory

function elementFactory(config) {
	function create(/*[,sel][,opt][,cnt]*/) {
		var cfg = merge({}, create.config)
		for (var i=0; i<arguments.length; ++i) merge(cfg, parseArgument(arguments[i], i))

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
	create.config = config ? assign(create, config) : {}
	return create
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
function merge(t, s) {
	for (var i=0, ks=Object.keys(s); i<ks.length; ++i) {
		var k = ks[i]
		t[k] = is.node(s[k]) ? s[k].cloneNode(false)
			: Array.isArray(s[k]) ? flatConcat(t[k] || [], s[k])
			: is.object(s[k]) ? assign({}, s[k])
			: s[k]
	}
	return t
}
function parseArgument(arg, idx) {
	switch (idx) { /* eslint no-fallthrough: 0 */
		case 0: // first optional argument is an element, element selector or element factory
			if (is.string(arg)) return parse(arg)
			if (is.function(arg)) return {element: arg()}
			if (is.node(arg)) return {element: arg}
		case 1: // second optional argument is an configuration object
			if (is.object(arg)) return arg
		default: // all arguments after the optional element and config are children
			if (Array.isArray(arg)) return {children: arg}
			if (is.stringlike(arg) || is.node(arg) || is.function(arg)) return {children: [arg]}
	}
	return {}
}
