var mergeKeys = require('./merge-keys'),
		parse = require('parse-element-selector'),
		flatConcat = require('./flat-concat'),
		cTyp = require('./typ')

module.exports = parseArgument

function parseArgument(arg, idx, ctx) {
	var typ = cTyp(arg)
	if (idx === 0) switch(typ) {
		case String:
			parse(arg, ctx[1])
			return ctx
		case Function: case 'N':
			ctx[0] = arg
			return ctx
	}
	else switch(typ) {
		// child-like
		case String: case Number: case Function: case 'N':
			ctx[2].push(arg)
			return ctx
		// config
		case Object:
			mergeKeys(ctx[1], arg)
			return ctx
		// children
		case Array:
			flatConcat(ctx[2], arg)
			return ctx
	}
	return ctx
}
