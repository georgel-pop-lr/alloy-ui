YUI.add("aui-datatable-highlight",function(e,t){var n=e.Lang,r=n.isArray,i=n.isString,s=n.isBoolean,o=function(t){var s=0,o;i(t)?t=n.trim(t).replace(/\s+/g," ").split(" "):r(t)||(t=e.Array(t));for(o=4-t.length;s<o;s++)t.push(t[s]);return e.Array.map(t,parseFloat)},u=e.Base.create("datatable-highlight",e.Plugin.Base,[],{CLASS_NAMES:null,TPL_FRAME:'<div class="{overlay}"><div class="{border}"></div><div class="{border}"></div><div class="{border}"></div><div class="{border}"></div></div>',_lastActiveRow:null,_nodes:null,initializer:function(){var t=this,n=t.get("host");t.CLASS_NAMES={active:n.getClassName("active"),border:n.getClassName("highlight","border"),highlight:n.getClassName("highlight"),overlay:n.getClassName("highlight","overlay"),overlayActive:n.getClassName("highlight","overlay","active")},t.afterHostEvent("activeCoordChange",t._afterActiveCoordChange),t.afterHostEvent("blur",t._afterBlur),t.afterHostEvent("dataChange",t._afterDataChange),t.afterHostEvent("selectionChange",t._afterSelectionChange),e.on("windowresize",e.bind(t._afterWindowResize,t))},clear:function(){var e=this,t=e.get("host"),n=t.get("activeCell");n&&n.removeClass(e.CLASS_NAMES.active),e._clearBorders(),e._clearHighlights()},getActiveRegion:function(){var e=this,t=e.get("host"),n=e.get("type"),r=null,i;return n==="rows"?i=t.get("activeRow"):i=t.get("activeCell"),i&&(r=i.get("region")),r},getSelectionRegion:function(){var e=this,t=e._nodes,n=t[0].get("region"),r=t[t.length-1].get("region");return{0:n.top,1:n.left,bottom:r.bottom,height:r.bottom-n.top,left:n.left,right:r.right,top:n.top,width:r.right-n.left}},_afterActiveCoordChange:function(){var e=this,t=e.get("host"),n=e.get("activeBorderWidth"),r=e.get("overlayActiveNode"),i=e.CLASS_NAMES,s=t.get("activeRow"),o=e._lastActiveRow;if(!e.get("type"))return;e.clear(),o&&o.removeClass(i.active),s&&(e._alignBorder(r,e.getActiveRegion(),n),s.addClass(i.active)),e._lastActiveRow=s},_afterBlur:function(){this.clear()},_afterDataChange:function(){this._afterBlur()},_afterSelectionChange:function(t){var n=this,r,i=n.get("highlightRange"),s=n.get("overlayNode"),o=n.get("rangeBorderWidth");if(!n.get("type"))return;n._clearHighlights(),r=n._collectNodes(t.newVal),i&&r&&r.length>1&&(n._alignBorder(s,n.getSelectionRegion(),o),e.Array.each(r,function(e){e.addClass(n.CLASS_NAMES.highlight)}))},_afterWindowResize:function(){var e=this,t=e.get("activeBorderWidth"),n=e.get("overlayActiveNode"),r=e.get("overlayNode"),i=e.get("rangeBorderWidth");n.inDoc()&&e._alignBorder(n,e.getActiveRegion(),t),r.inDoc()&&e._alignBorder(r,e.getSelectionRegion(),i)},_alignBorder:function(e,t,n){var r=this,i=r.get("host");i._tableNode.ancestor().appendChild(e);if(t){var s=e.get("children"),o=s.item(0),u=s.item(1),a=s.item(2),f=s.item(3);e.setXY([t.left,t.top]),o.sizeTo(t.width,n[0]),f.sizeTo(n[3],t.height-n[2]),a.sizeTo(t.width,n[2]),u.sizeTo(n[1],t.height-n[2]),o.setXY([t.left,t.top]),f.setXY([t.left,t.top]),a.setXY([t.left,t.bottom-n[2]]),u.setXY([t.right-n[1],t.top])}},_collectNodes:function(e){var t=this,n=t.get("type");return!n||!e?null:t._nodes=e[n]},_clearBorders:function(){var e=this;e.get("overlayNode").remove(),e.get("overlayActiveNode").remove()},_clearHighlights:function(){var t=this;e.Array.each(t._nodes,function(e){e&&e.removeClass(t.CLASS_NAMES.highlight)})},_validateType:function(e){return e==="cells"||e==="rows"||e===null}},{NS:"highlight",NAME:"datatable-highlight",ATTRS:{activeBorderWidth:{setter:o,value:2},overlayActiveNode:{setter:function(t){var r=this,i=r.CLASS_NAMES;return t||(t=e.Node.create(n.sub(r.TPL_FRAME,i)),t.addClass(i.overlayActive)),t},value:null},overlayNode:{setter:function(t){var r=this;return t||(t=e.Node.create(n.sub(r.TPL_FRAME,r.CLASS_NAMES))),t},value:null},highlightRange:{validator:s,value:!0},rangeBorderWidth:{setter:o,value:1},type:{validator:"_validateType",value:"cells"}}});e.namespace("Plugin").DataTableHighlight=u},"3.1.0-deprecated.64",{requires:["aui-datatable-selection"],skinnable:!0});
