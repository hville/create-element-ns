var ct = require('cotest')
var sel = require('../sel')

ct('single tag', function(){
	ct('{==}', sel('div'), {tagName: 'div'})
	ct('{==}', sel(''), {})
})
ct('mixed classes and id', function(){
	ct('{==}', sel('.c1#i1.c2'), {id: 'i1', className: 'c1 c2'})
	ct('{==}', sel('div#i1.c1.c2'), {tagName: 'div', id: 'i1', className: 'c1 c2'})
	ct('{==}', sel('div.c1.c2#i1'), {tagName: 'div', id: 'i1', className: 'c1 c2'})
	ct('{==}', sel('..##..##'), {})

})
ct('mixed classes and id as attributes', function(){
	ct('{==}', sel('.c1#i1.c2[id=i2][className=c3]'), {id: 'i2', className: 'c3'})
	ct('{==}', sel('.c1#i1.c2[id="i2"][className="c3"]'), {id: 'i2', className: 'c3'})
	ct('{==}', sel('div#i1[class=c3].c1.c2'), {tagName: 'div', id: 'i1', className: 'c1 c2', class: 'c3'})
	ct('{==}', sel('div#i1[class="c3"].c1.c2'), {tagName: 'div', id: 'i1', className: 'c1 c2', class: 'c3'})
})
ct('tag namespace prefix', function(){
	ct('{==}', sel('svg:circle'), {prefix: 'svg', tagName: 'circle'})
})
ct('markers in attribute values', function() {
	ct('{==}', sel('[a=b.c]').a, 'b.c')
	ct('{==}', sel('[a:b=c]')['a:b'], 'c')
	ct('{==}', sel('[a:b=c.d]')['a:b'], 'c.d')
})
