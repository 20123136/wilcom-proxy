(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2c9e"],{FRYs:function(t,e,n){"use strict";"function"==typeof Symbol&&Symbol.iterator;var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}!function(){Array.from||(Array.from=function(t){return[].slice.call(t)});var e=n("U/5H");t.exports=function(t){function e(t){t.parentElement.removeChild(t)}function n(t,e,n){var i=0===n?t.children[0]:t.children[n-1].nextSibling;t.insertBefore(e,i)}function o(t,e){var n=this;this.$nextTick(function(){return n.$emit(t.toLowerCase(),e)})}var s=["Start","Add","Remove","Update","End"],a=["Choose","Sort","Filter","Clone"],l=["Move"].concat(s,a).map(function(t){return"on"+t}),u=null;return{name:"draggable",props:{options:Object,list:{type:Array,required:!1,default:null},value:{type:Array,required:!1,default:null},noTransitionOnDrag:{type:Boolean,default:!1},clone:{type:Function,default:function(t){return t}},element:{type:String,default:"div"},move:{type:Function,default:null},componentData:{type:Object,required:!1,default:null}},data:function(){return{transitionMode:!1,noneFunctionalComponentMode:!1,init:!1}},render:function(t){var e=this.$slots.default;if(e&&1===e.length){var n=e[0];n.componentOptions&&"transition-group"===n.componentOptions.tag&&(this.transitionMode=!0)}var i=0,o=e,s=this.$slots,a=s.header,l=s.footer;a&&(i=a.length,o=o?[].concat(r(a),r(o)):[].concat(r(a))),l&&(o=o?[].concat(r(o),r(l)):[].concat(r(l))),this.headerOffset=i;var u=null,c=function(t,e){u=function(t,e,n){return void 0==n?t:((t=null==t?{}:t)[e]=n,t)}(u,t,e)};if(c("attrs",this.$attrs),this.componentData){var d=this.componentData,h=d.on,f=d.props;c("on",h),c("props",f)}return t(this.element,u,o)},mounted:function(){var e=this;if(this.noneFunctionalComponentMode=this.element.toLowerCase()!==this.$el.nodeName.toLowerCase(),this.noneFunctionalComponentMode&&this.transitionMode)throw new Error("Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: "+this.element);var n={};s.forEach(function(t){n["on"+t]=function(t){var e=this;return function(n){null!==e.realList&&e["onDrag"+t](n),o.call(e,t,n)}}.call(e,t)}),a.forEach(function(t){n["on"+t]=o.bind(e,t)});var r=i({},this.options,n,{onMove:function(t,n){return e.onDragMove(t,n)}});!("draggable"in r)&&(r.draggable=">*"),this._sortable=new t(this.rootContainer,r),this.computeIndexes()},beforeDestroy:function(){void 0!==this._sortable&&this._sortable.destroy()},computed:{rootContainer:function(){return this.transitionMode?this.$el.children[0]:this.$el},isCloning:function(){return!!this.options&&!!this.options.group&&"clone"===this.options.group.pull},realList:function(){return this.list?this.list:this.value}},watch:{options:{handler:function(t){for(var e in t)-1==l.indexOf(e)&&this._sortable.option(e,t[e])},deep:!0},realList:function(){this.computeIndexes()}},methods:{getChildrenNodes:function(){if(this.init||(this.noneFunctionalComponentMode=this.noneFunctionalComponentMode&&1==this.$children.length,this.init=!0),this.noneFunctionalComponentMode)return this.$children[0].$slots.default;var t=this.$slots.default;return this.transitionMode?t[0].child.$slots.default:t},computeIndexes:function(){var t=this;this.$nextTick(function(){t.visibleIndexes=function(t,e,n){if(!t)return[];var i=t.map(function(t){return t.elm}),o=[].concat(r(e)).map(function(t){return i.indexOf(t)});return n?o.filter(function(t){return-1!==t}):o}(t.getChildrenNodes(),t.rootContainer.children,t.transitionMode)})},getUnderlyingVm:function(t){var e=function(t,e){return t.map(function(t){return t.elm}).indexOf(e)}(this.getChildrenNodes()||[],t);return-1===e?null:{index:e,element:this.realList[e]}},getUnderlyingPotencialDraggableComponent:function(t){var e=t.__vue__;return e&&e.$options&&"transition-group"===e.$options._componentTag?e.$parent:e},emitChanges:function(t){var e=this;this.$nextTick(function(){e.$emit("change",t)})},alterList:function(t){if(this.list)t(this.list);else{var e=[].concat(r(this.value));t(e),this.$emit("input",e)}},spliceList:function(){var t=arguments,e=function(e){return e.splice.apply(e,t)};this.alterList(e)},updatePosition:function(t,e){var n=function(n){return n.splice(e,0,n.splice(t,1)[0])};this.alterList(n)},getRelatedContextFromMoveEvent:function(t){var e=t.to,n=t.related,r=this.getUnderlyingPotencialDraggableComponent(e);if(!r)return{component:r};var o=r.realList,s={list:o,component:r};if(e!==n&&o&&r.getUnderlyingVm){var a=r.getUnderlyingVm(n);if(a)return i(a,s)}return s},getVmIndex:function(t){var e=this.visibleIndexes,n=e.length;return t>n-1?n:e[t]},getComponent:function(){return this.$slots.default[0].componentInstance},resetTransitionData:function(t){if(this.noTransitionOnDrag&&this.transitionMode){this.getChildrenNodes()[t].data=null;var e=this.getComponent();e.children=[],e.kept=void 0}},onDragStart:function(t){this.context=this.getUnderlyingVm(t.item),t.item._underlying_vm_=this.clone(this.context.element),u=t.item},onDragAdd:function(t){this.updateEvenemt(t);var n=t.item._underlying_vm_;if(void 0!==n){e(t.item);var i=this.getVmIndex(t.newIndex);this.spliceList(i,0,n),this.computeIndexes();var r={element:n,newIndex:i};this.emitChanges({added:r})}},onDragRemove:function(t){if(this.updateEvenemt(t),n(this.rootContainer,t.item,t.oldIndex),this.isCloning)e(t.clone);else{var i=this.context.index;this.spliceList(i,1);var r={element:this.context.element,oldIndex:i};this.resetTransitionData(i),this.emitChanges({removed:r})}},onDragUpdate:function(t){this.updateEvenemt(t),e(t.item),n(t.from,t.item,t.oldIndex);var i=this.context.index,r=this.getVmIndex(t.newIndex);this.updatePosition(i,r);var o={element:this.context.element,oldIndex:i,newIndex:r};this.emitChanges({moved:o})},updateEvenemt:function(t){this.updateProperty(t,"newIndex"),this.updateProperty(t,"oldIndex")},updateProperty:function(t,e){t.hasOwnProperty(e)&&(t[e]+=this.headerOffset)},computeFutureIndex:function(t,e){if(!t.element)return 0;var n=[].concat(r(e.to.children)).filter(function(t){return"none"!==t.style.display}),i=n.indexOf(e.related),o=t.component.getVmIndex(i);return-1==n.indexOf(u)&&e.willInsertAfter?o+1:o},onDragMove:function(t,e){var n=this.move;if(!n||!this.realList)return!0;var r=this.getRelatedContextFromMoveEvent(t),o=this.context,s=this.computeFutureIndex(r,t);return i(o,{futureIndex:s}),i(t,{relatedContext:r,draggedContext:o}),n(t,e)},onDragEnd:function(t){this.computeIndexes(),u=null}}}}(e)}()},JCNI:function(t,e,n){"use strict";n.d(e,"c",function(){return r}),n.d(e,"b",function(){return o}),n.d(e,"d",function(){return s}),n.d(e,"a",function(){return a}),n.d(e,"e",function(){return l});var i=n("t3Un");function r(t){return Object(i.a)({url:"/article/list",method:"get",params:t})}function o(t){return Object(i.a)({url:"/article/detail",method:"get",params:{id:t}})}function s(t){return Object(i.a)({url:"/article/pv",method:"get",params:{pv:t}})}function a(t){return Object(i.a)({url:"/article/create",method:"post",data:t})}function l(t){return Object(i.a)({url:"/article/update",method:"post",data:t})}},aG2W:function(t,e,n){},nhSP:function(t,e,n){"use strict";n.r(e);var i=n("FyfS"),r=n.n(i),o=n("FRYs"),s={name:"DndList",components:{draggable:n.n(o).a},props:{list1:{type:Array,default:function(){return[]}},list2:{type:Array,default:function(){return[]}},list1Title:{type:String,default:"list1"},list2Title:{type:String,default:"list2"},width1:{type:String,default:"48%"},width2:{type:String,default:"48%"}},computed:{filterList2:function(){var t=this;return this.list2.filter(function(e){return!!t.isNotInList1(e)&&e})}},methods:{isNotInList1:function(t){return this.list1.every(function(e){return t.id!==e.id})},isNotInList2:function(t){return this.list2.every(function(e){return t.id!==e.id})},deleteEle:function(t){var e=!0,n=!1,i=void 0;try{for(var o,s=r()(this.list1);!(e=(o=s.next()).done);e=!0){var a=o.value;if(a.id===t.id){var l=this.list1.indexOf(a);this.list1.splice(l,1);break}}}catch(t){n=!0,i=t}finally{try{!e&&s.return&&s.return()}finally{if(n)throw i}}this.isNotInList2(t)&&this.list2.unshift(t)},pushEle:function(t){this.list1.push(t)}}},a=(n("wdUZ"),n("KHd+")),l=Object(a.a)(s,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dndList"},[n("div",{staticClass:"dndList-list",style:{width:t.width1}},[n("h3",[t._v(t._s(t.list1Title))]),t._v(" "),n("draggable",{staticClass:"dragArea",attrs:{list:t.list1,options:{group:"article"}}},t._l(t.list1,function(e){return n("div",{key:e.id,staticClass:"list-complete-item"},[n("div",{staticClass:"list-complete-item-handle"},[t._v("["+t._s(e.author)+"] "+t._s(e.title))]),t._v(" "),n("div",{staticStyle:{position:"absolute",right:"0px"}},[n("span",{staticStyle:{float:"right","margin-top":"-20px","margin-right":"5px"},on:{click:function(n){t.deleteEle(e)}}},[n("i",{staticClass:"el-icon-delete",staticStyle:{color:"#ff4949"}})])])])}))],1),t._v(" "),n("div",{staticClass:"dndList-list",style:{width:t.width2}},[n("h3",[t._v(t._s(t.list2Title))]),t._v(" "),n("draggable",{staticClass:"dragArea",attrs:{list:t.filterList2,options:{group:"article"}}},t._l(t.filterList2,function(e){return n("div",{key:e.id,staticClass:"list-complete-item"},[n("div",{staticClass:"list-complete-item-handle2",on:{click:function(n){t.pushEle(e)}}},[t._v(" ["+t._s(e.author)+"] "+t._s(e.title))])])}))],1)])},[],!1,null,"009f9285",null);l.options.__file="index.vue";var u=l.exports,c=n("JCNI"),d={name:"DndListDemo",components:{DndList:u},data:function(){return{list1:[],list2:[]}},created:function(){this.getData()},methods:{getData:function(){var t=this;this.listLoading=!0,Object(c.c)().then(function(e){t.list1=e.data.items.splice(0,5),t.list2=e.data.items})}}},h=Object(a.a)(d,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"components-container"},[this._m(0),this._v(" "),e("div",{staticClass:"editor-container"},[e("dnd-list",{attrs:{list1:this.list1,list2:this.list2,"list1-title":"List","list2-title":"Article pool"}})],1)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("code",[this._v("drag-list base on\n    "),e("a",{attrs:{href:"https://github.com/SortableJS/Vue.Draggable",target:"_blank"}},[this._v("Vue.Draggable")])])}],!1,null,null,null);h.options.__file="dndList.vue";e.default=h.exports},wdUZ:function(t,e,n){"use strict";var i=n("aG2W");n.n(i).a}}]);