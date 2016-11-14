//master: 1844 char,3.9kbm,1.6kbz
//factory: 3109 char,4,25kbm,1.8kbz
//refac: 2024, 4.0,1.6kbz
var dom = require('dom-document'),
		decorators = require('./decorators'),
		namespaces = require('./namespaces'),
		is = require('./is'),
		parse = require('parse-element-selector'),
		mergeKeys = require('./merge-keys')

module.exports = elementFactory

function elementFactory(config) {
	function create(/*[,sel][,opt][,cnt]*/) {
		var cfg = mergeKeys({}, create.defaults)
		for (var i=0; i<arguments.length; ++i) mergeKeys(cfg, parseArgument(arguments[i], i))

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
	create.defaults = config || {}
	return create
}
function decorate(el, cfg) {
	for (var k in cfg) {
		if (decorators[k]) decorators[k].call(cfg, el, k, cfg[k])
	}
	return el
}
function parseArgument(arg, idx) {
	switch (idx) { /* eslint no-fallthrough: 0 */
		case 0: // first optional argument is an element, element selector or element factory
			if (is.string(arg)) return parse(arg)
			if (is.function(arg)) return {element: arg()}
			if (is.node(arg)) return {element: arg}
		case 1: // second optional argument is a configuration object
			if (is.object(arg)) return arg
		default: // all arguments after the optional element and config are children
			if (Array.isArray(arg)) return {children: arg}
			if (is.stringlike(arg) || is.node(arg) || is.function(arg)) return {children: [arg]}
	}
	return {}
}
