var mergeKeys = require('./merge-keys'),
		parse = require('parse-element-selector'),
		flatConcat = require('./flat-concat'),
		cTyp = require('./typ')

module.exports = createFactory

/**
 * creator to inject settings applicable to many instances (namespace, ...)
 * @param {Function} creator - (sel,opt,cnt)=>instance
 * @param {Object} defaults - shared settings
 * @returns {Function} defining function
 */
function createFactory(creator, defaults) {
	/* definition for a given factory
	 * {string|Object|Function=} [element] - element selector, element or factory function
	 * {Object=} [config] - options
	 * {string|number|Object|Array=} [content] - child string, elements, factory or array of...
	 * {Function} factory function
	 */
	function define(sel) {
		var dex = mergeKeys({}, defaults),
				cnt = [],
				elm

		switch(cTyp(sel)) {
			case String:
				parse(sel, dex)
				break
			case Function: case 'N':
				elm = sel
				break
			default:
				throw Error('slector must be a function, string or node, not '+ typeof sel)
		}

		for (var i=1; i<arguments.length; ++i) {
			var arg = arguments[i]
			switch(cTyp(arg)) {
				case Object: // config
					mergeKeys(dex, arg)
					break
				case Array: case String: case Number: case Function: case 'N': // child-like
					flatConcat(cnt, arg)
					break
			}
		}

		/**
		 * Factory function to produce instances of the defined Component
		 * @param {Object=} [opt] - optional additional individual configuration
		 * @returns {Function} individual view function
		 */
		function factory(opt) {
			return creator(elm, opt ? mergeKeys(dex, opt) : dex, cnt)
		}
		return factory
	}
	return define
}
