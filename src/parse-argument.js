var is = require('./is'),
		parse = require('parse-element-selector')

module.exports = parseArgument

function parseArgument(arg, idx) {
	switch (idx) { /* eslint no-fallthrough: 0 */
		case 0: // first optional argument is an element, element selector or element factory
			if (is.string(arg)) return parse(arg)
			if (is.node(arg) || is.function(arg)) return {element: arg}
		case 1: // second optional argument is a configuration object
			if (is.object(arg)) return arg
	}
	// all arguments after the optional element and config are children
	if (Array.isArray(arg)) return {content: arg}
	if (is.stringlike(arg) || is.node(arg) || is.function(arg)) return {content: [arg]}
	return {}
}
