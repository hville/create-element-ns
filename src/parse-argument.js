var mergeKeys = require('./merge-keys'),
		is = require('./is'),
		parse = require('parse-element-selector'),
		flatConcat = require('./flat-concat')

module.exports = parseArgument

function parseArgument(arg, idx, definition) {
	var def = definition || {}
	switch (idx) { /* eslint no-fallthrough: 0 */
		case 0: // first optional argument is an element, element selector or element factory
			if (is.string(arg)) return parse(arg, def)
			if (is.node(arg) || is.function(arg)) {
				def.element = arg
				return def
			}
		case 1: // second optional argument is a configuration object
			if (is.object(arg)) return def ? mergeKeys(def, arg) : arg
	}
	// all arguments after the optional element and config are children
	if (Array.isArray(arg) || is.stringlike(arg) || is.node(arg) || is.function(arg)) {
		def.content = flatConcat(def.content || [], arg)
		return def
	}
	return {}
}
