var mergeKeys = require('./merge-keys'),
		parseArgument = require('./parse-argument'),
		decorate = require('./decorate'),
		setChildren = require('./set-children'),
		createElement = require('./create-element')

module.exports = createFactory

/**
 * creator to inject settings applicable to many instances (namespace, ...)
 * @param {Object} defaults - shared settings
 * @returns {Function} defining function
 */
function createFactory(defaults) {
	/* definition for a given factory
	 * {string|Object|Function=} [element] - element selector, element or factory function
	 * {Object=} [config] - options
	 * {string|number|Object|Array=} [content] - child string, elements, factory or array of...
	 * {Function} factory function
	 */
	function define() {
		var context = [null, mergeKeys({}, defaults), []]
		for (var i=0; i<arguments.length; ++i) parseArgument(arguments[i], i, context)
		/**
		 * Factory function to produce instances of the defined Component
		 * @param {Object=} [opt] - optional additional individual configuration
		 * @returns {Function} individual view function
		 */
		function factory(opt) {
			var el = createElement(context)
			decorate(el, context[1])
			setChildren(el, context[2])
			return opt ? decorate(el, opt) : el
		}
		return factory
	}
	return define
}
