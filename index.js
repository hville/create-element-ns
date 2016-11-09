var factory = require('./elm'),
		common = require('./common')

module.exports = {
	common: common,
	html: factory(),
	svg: factory({element: {xmlns: common.namespaces.svg}})
}
