var is = require('./is'),
		flatConcat = require('./flat-concat')

// shallow clone - 2 levels - to merge attributes, properties, elements and other options
module.exports = mergeKeys

function mergeKeys(t, s) {
	if(is.object(s)) for (var i=0, ks=Object.keys(s); i<ks.length; ++i) {
		var k = ks[i],
				v = s[k]
		t[k] = Array.isArray(v) ? flatConcat(t[k] || [], v)
			: is.node(v) ? v.cloneNode(true)
			: is.object(v) ? assign(t[k] || {}, v)
			: v
	}
	return t
}

function assign(tgt, src) {
	for (var i=0, ks=Object.keys(src); i<ks.length; ++i) tgt[ks[i]] = src[ks[i]]
	return tgt
}
