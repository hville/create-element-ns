var markers = {
	tag: {
		'#': {m: 'v', k: 'id', f: reset, x: 'tag'},
		'.': {m: 'v', k: 'className', f: append, x: 'tag'},
		'[': {m: 'k', k: '', f: replaceTrue, x: 'key'},
	},
	key: {
		'=': {m: 'v', x: 'val'},
		']': {x: 'tag'}
	},
	val: {
		'"': {},
		']': {x: 'tag'}
	}
}

module.exports = function parseSel(sel) {
	var att = {}
	var ctx = {
		x: markers.tag,
		m: 'v',
		k: 'tagName',
		v: '',
		f: reset
	}

	for (var i=0; i<sel.length; ++i) {
		var act = ctx.x[sel[i]]
		if (act) {
			if(act.f) {
				ctx.f(att, ctx.k, ctx.v)
				ctx.k = act.k
				ctx.f = act.f
				ctx.v = ''
			}
			if (act.m) ctx.m = act.m
			if (act.x) ctx.x = markers[act.x]
		}
		else ctx[ctx.m] += sel[i]
	}
	ctx.f(att, ctx.k, ctx.v)

	return checkTagPrefix(att)
}
function reset(att, k, v) {
	if (v) att[k] = v
}
function replaceTrue(att, k, v) {
	att[k] = v || true
}
function append(att, k, v) {
	if (v) att[k] = att[k] ? att[k] + ' ' + v : v
}
function checkTagPrefix(att) {
	var tagIndex = att.tagName && att.tagName.indexOf(':')
	if (tagIndex >= 0) {
		att.prefix = att.tagName.slice(0, tagIndex)
		att.tagName = att.tagName.slice(tagIndex+1)
	}
	return att
}
