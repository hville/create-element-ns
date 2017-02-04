var flatConcat = require('./flat-concat'),
		cTyp = require('./typ')

// shallow clone - 2 levels - to merge attributes, properties, elements and other options
module.exports = function mergeKeys(tgt, src) {
	if(cTyp(src) === Object) for (var i=0, ks=Object.keys(src); i<ks.length; ++i) {
		var key = ks[i]
		tgt[key] = merge(tgt[key], src[key])
	}
	return tgt
}
function merge(tgt, src) {
	switch(cTyp(src)) {
		case Array:
			return flatConcat(tgt || [], src)
		case 'N':
			return src.cloneNode(true)
		case Object:
			return assign(tgt || {}, src)
		default:
			return src
	}
}
function assign(tgt, src) {
	for (var i=0, ks=Object.keys(src); i<ks.length; ++i) tgt[ks[i]] = src[ks[i]]
	return tgt
}
