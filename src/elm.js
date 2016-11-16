var dom = require('dom-document'),
		decorate = require('./decorate'),
		namespaces = require('./namespaces'),
		parseArgument = require('./parse-argument'),
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
