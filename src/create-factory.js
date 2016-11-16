var mergeKeys = require('./merge-keys'),
		parseArgument = require('./parse-argument'),
		decorate = require('./decorate'),
		setChildren = require('./set-children'),
		createElement = require('./create-element')

module.exports = createFactory

/**
 * creator to inject settings applicable to many instances (namespace, ...)
 * @param {Object} defaults - shared settings
 * @returns {function} defining function
 */
function createFactory(defaults) {
	/**
	 * definition for a given factory
	 * @param {string|Object|function} [element] - element selector, element or factory function
	 * @param {Object} [config] - options
	 * @param {string|number|Object|Array} [content] - child string, elements, factory or array of...
	 * @returns {function} factory function
	 */
	return function define(/*element, config, content*/) {
		var context = mergeKeys({}, defaults)
		for (var i=0; i<arguments.length; ++i) mergeKeys(context, parseArgument(arguments[i], i))
		/**
		 * Factory function to produce instances of the defined Component
		 * @param {any} [opt] - optional additional individual configuration
		 * @returns {function} individual view function
		 */
		function factory(opt) {
			var el = createElement(context)
			decorate(el, context)
			if (context.content) setChildren(el, context.content)
			return opt ? decorate(el, opt) : el
		}
		factory.isFactory = true
		return factory
	}
}
