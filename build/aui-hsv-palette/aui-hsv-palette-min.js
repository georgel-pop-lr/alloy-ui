YUI.add("aui-hsv-palette",function(e,t){var n=e.Color,r=e.Widget,i=e.Lang,s=e.getClassName,o=6,u=360,a=100,f=100,l=100,c=0,h=0,p=0,d=".form-group.has-error",v=".form-group",m=".hsv-value",g=s("hsv-container"),y=s("hsv-container-controls"),b=s("hsv-default-size"),w=s("hsv-view-container"),E=s("hsv-image-container"),S=s("hsv-image-wrapper"),x=s("hsv-image-backdrop"),T=s("hsv-view-backdrop"),N=s("hsv-hs-container"),C=s("hsv-hs-thumb"),k=s("hsv-value-container"),L=s("hsv-value-slider-container"),A=s("hsv-value-slider-wrapper"),O=s("hsv-value-canvas"),M=s("hsv-value-thumb"),_=s("hsv-value-image"),D=s("hsv-result-view"),P=s("hsv-controls-wrapper"),H=s("hsv-hex-wrapper"),B=s("hsv-result-wrapper"),j=s("hsv-label-value-container"),F=s("hsv-label-value-hsv-container"),I=s("hsv-label-value-rgb-container"),q=s("hsv-label-value-hex-container"),R=s("hsv-label-value"),U=s("hsv-label-value-hex"),z=s("hsv-label-hidden"),W=s("hsv-label"),X=s("hsv-value"),V=/^([a-f0-9]{6}|[a-f0-9]{3})$/i,$=/^([0-9]|[1-9][0-9]|100)$/,J=/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/,K=/^([0]{0,2}[1-9]|[0]?[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|360)$/,Q=e.Base.create("hsv-palette",e.Widget,[e.WidgetCssClass,e.WidgetToggle],{TPL_CONTAINER:'<div class="'+g+' {subClass}"></div>',TPL_VIEW_CONTAINER:'<div class="autofit-float autofit-row '+w+'"></div>',TPL_IMAGE_BACKDROP:'<div class="'+x+'"></div>',TPL_IMAGE_WRAPPER:'<div class="autofit-col '+S+'"><div class="'+E+'"></div></div>',TPL_VIEW_BACKDROP:'<div class="'+T+'"></div>',TPL_HS_CONTAINER:'<div class="'+N+'"></div>',TPL_HS_THUMB:'<div class="'+C+'"></div>',TPL_VALUE_CONTAINER:'<div class="autofit-col autofit-col-expand '+k+'"><div class="autofit-row"></div></div>',TPL_VALUE_RIGHT_SIDE_CONTAINER:'<div class="autofit-col autofit-col-expand"><div class="autofit-row"><div class="autofit-col '+B+'"></div>'+'<div class="autofit-col autofit-col-expand '+H+'"></div></div><div class="autofit-row '+P+'"></div></div>',TPL_VALUE_SLIDER_WRAPPER:'<div class="autofit-col '+A+'"><div class="'+L+'"></div></div>',TPL_VALUE_CANVAS:'<span class="'+O+'"></span>',TPL_VALUE_THUMB:'<span class="'+M+'"><span class="'+_+'"></span></span>',TPL_RESULT_VIEW:'<div class="'+D+'"></div>',TPL_LABEL_VALUE_CONTAINER:'<div class="'+j+' {subClass}"></div>',TPL_OUTPUT:'<div class="form-group '+R+" "+U+'">'+"<label>{label}</label>"+'<input class="form-control '+X+'" data-type="{type}" type="text" maxlength="{maxlength}" value="{value}">'+"</div>",TPL_LABEL_VALUE:'<div class="form-group input-group"><label class="add-on input-group-item input-group-item-shrink">{label}</label><div class="input-group-item input-group-item-shrink"><input class="form-control '+X+'" data-type="{type}" type="number" max="{max}" maxlength="{maxlength}" min="{min}" value="{value}"></div>'+'<label class="input-group-item input-group-item-shrink '+W+'">{labelUnit}</label>'+"</div>",_outputType:"hex",initializer:function(){var e=this;e.on("selectedChange",e._onSelectedChange,e)},bindUI:function(){var e=this;e._hsContainer.after("mousedown",e._afterPaletteMousedown,e),e._paletteContainer.delegate("input",e._afterInputChange,m,e),e._bindDD()},destructor:function(){var e=this;e._dd.destroy()},renderUI:function(){var e=this;e._renderContainer(),e.get("contentBox").appendChild(e._paletteContainer),e._colorThumbGutter=Math.floor(e._colorThumb.get("offsetHeight")/2),e._hsContainerWidth=e._hsContainer.get("offsetWidth"),e._hsContainerHeight=e._hsContainer.get("offsetHeight"),this._createSliders()},_afterInputChange:function(e){var t=this,n,r,i;n=e.currentTarget,t._validateFieldValue(n)?(i=n.get("value"),r=n.getAttribute("data-type"),n.ancestor(v).removeClass("has-error")):n.ancestor(v).addClass("has-error"),t._paletteContainer.one(d)||t._updateViewFromInput(n)},_afterHSThumbChange:function(e,t){var i=this,s,o,u,a,l,c,h;u=i._calculateHue(e),c=i._calculateSaturation(t),h=f-i._valueSlider.get("value"),a=i._calculateRGBColor(u,c,h),l=n.toArray(a),s=n.toHex(a),o=i._getHexValue(s,l),i._resultView.setStyle("backgroundColor",s),i._setValueSliderContainerStyle(u,c),i._setFieldValue(i._outputContainer,o),i._setFieldValue(i._hContainer,Math.round(u)),i._setFieldValue(i._sContainer,Math.round(c)),i._setFieldValue(i._rContainer,l[0]),i._setFieldValue(i._gContainer,l[1]),i._setFieldValue(i._bContainer,l[2]),i.fire("hsThumbChange",{x:e,y:t,hexColor:s}),i.set("selected",o,{src:r.UI_SRC})},_afterPaletteMousedown:function(e){var t=this,n,r,i,s;t._updatePaletteThumbPosition([e.pageX,e.pageY]),n=t._hsContainer.getXY(),r=t._colorThumb.getXY(),i=r[0]-n[0]+t._colorThumbGutter,s=r[1]-n[1]+t._colorThumbGutter,t._afterHSThumbChange(i,s),e.target=t._colorThumb,t._dd._handleMouseDownEvent(e)},_afterPaletteDragStart:function(){var e=this;e._setHSContainerXY()},_afterPaletteThumbDrag:function(e){var t=this,n,r;n=e.pageX-t._hsContainerXY[0]+t._colorThumbGutter,r=e.pageY-t._hsContainerXY[1]+t._colorThumbGutter,t._afterHSThumbChange(n,r)},_bindDD:function(){var t=this,n;n=(new e.DD.Drag({node:t._colorThumb})).plug(e.Plugin.DDConstrained,{constrain2node:t._hsContainer,gutter:"-"+t._colorThumbGutter}),n.after("start",t._afterPaletteDragStart,t),n.after("drag",t._afterPaletteThumbDrag,t),t._dd=n},_calculateRGBColor:function(e,t,n){var r=this;return r._calculateRGB(e,t,n)},_calculateHue:function(e){var t=this,n;return e<=c?n=c:e>=t._hsContainerWidth-1?n=u:n=e/t._hsContainerWidth*u,Math.round(n)},_calculateRGB:function(e,t,r){var s="rgb(255, 0, 0)",o;if(i.toInt(e)!==u||i.toInt(t)!==a||i.toInt(r)!==f)o="hsva("+(e===u?u-1:e)+", "+t+"%, "+r+"%"+")",s=n.toRGB(o);return s},_calculateRGBArray:function(e,t,r){return n.fromArray([e,t,r],"RGB")},_calculateSaturation:function(e){var t=this,n;return e<=h?n=a:e>=t._hsContainerHeight?n=h:n=a-e/t._hsContainerHeight*a,Math.round(n)},_calculateX:function(e){var t=this,n=this._colorThumbGutter*-1;return e<=c?n+=c:e>=u?n+=t._hsContainerWidth:n+=e/u*t._hsContainerWidth,n},_calculateY:function(e){var t=this,n=this._colorThumbGutter*-1;return e<=h?n+=t.
_hsContainerHeight:e>=a?n+=h:n+=t._hsContainerHeight/a*(a-e),n},_createSliders:function(){var e=this;e._createValueSlider()},_createValueSlider:function(){var t=this,n,r,i;n=t.get("contentBox"),r=new e.Slider({axis:"y",min:p,max:f}),r.RAIL_TEMPLATE=t.TPL_VALUE_CANVAS,r.THUMB_TEMPLATE=t.TPL_VALUE_THUMB,r.render(t._valueSliderContainer),i=n.one("."+_).get("offsetHeight"),r.set("length",t._valueSliderContainer.get("offsetHeight")+i/2),r.on(["slideStart","railMouseDown"],t._setHSContainerXY,t),r.on("valueChange",t._onValueChange,t),t._valueSlider=r},_getContainerClassName:function(){return y},_getFieldValue:function(e){return e.one("."+X).get("value")},_getHexValue:function(e){return e.substring(1)},_getHexContainerConfig:function(){var e=this;return{label:e.get("strings").hex,maxlength:o,type:"hex",unit:"",value:"ff0000"}},_getHSVArray:function(e){return n.toArray(e,"HSV")},_getXYFromHueSaturation:function(e,t){var n=this,r,i;return r=n._calculateX(e),i=n._calculateY(t),[r,i]},_normalizeHexValue:function(e){var t="";return e.indexOf("#")===0&&(e=e.substring(1)),e.length===3&&(t="fff"),(e+=t).toUpperCase()},_onSelectedChange:function(e){var t=this;e.src!==r.UI_SRC&&t._updateViewByHEX(e.newVal)},_onValueChange:function(e){var t=this,i,s,o,u,a,l,c,h,p,d;e.src!==r.UI_SRC&&(h=e.newVal,t._hsContainer.setStyle("opacity",1-h/f),c=t._colorThumb.getXY(),p=c[0]-t._hsContainerXY[0]+t._colorThumbGutter,d=c[1]-t._hsContainerXY[1]+t._colorThumbGutter,o=t._calculateHue(p),l=t._calculateSaturation(d),h=f-h,u=t._calculateRGBColor(o,l,h),a=n.toArray(u),i=n.toHex(u),s=t._getHexValue(i,a),t._resultView.setStyle("backgroundColor",i),t._setFieldValue(t._outputContainer,s),t._setFieldValue(t._vContainer,h),t._setFieldValue(t._rContainer,a[0]),t._setFieldValue(t._gContainer,a[1]),t._setFieldValue(t._bContainer,a[2]),t.fire("valueChange",{value:h,hexColor:i}),t.set("selected",s,{src:r.UI_SRC}))},_renderContainer:function(){var t=this,n;n=t._getContainerClassName(),t._paletteContainer=e.Node.create(i.sub(t.TPL_CONTAINER,{subClass:n})),t._renderViewContainer()},_renderViewContainer:function(){var t=this;t._viewContainer=e.Node.create(t.TPL_VIEW_CONTAINER),t._renderViewContainerContent(),t._paletteContainer.appendChild(t._viewContainer)},_renderViewContainerContent:function(){var e=this;e._renderImageContainer(),e._renderValueContainer()},_renderField:function(e,t){var n=this;return e.appendChild(i.sub(n.TPL_LABEL_VALUE,{classLabel:t.classLabel||"",label:t.label,labelUnit:t.unit,max:t.max,maxlength:t.maxlength,min:t.min,type:t.type,value:t.value}))},_renderOutputField:function(e,t){var n=this;return e.appendChild(i.sub(n.TPL_OUTPUT,{label:t.label,maxlength:t.maxlength,type:t.type,value:t.value}))},_renderHexNode:function(t){var n=this,r,s;r=e.Node.create(i.sub(n.TPL_LABEL_VALUE_CONTAINER,{subClass:q})),s=n._getHexContainerConfig(),n._outputContainer=n._renderOutputField(r,s),t.appendChild(r),n._labelValueRGBContainer=r},_renderFields:function(t){var n=this,r,s;r=e.Node.create(i.sub(n.TPL_LABEL_VALUE_CONTAINER,{subClass:F+" autofit-col"})),s=e.Node.create(i.sub(n.TPL_LABEL_VALUE_CONTAINER,{subClass:I+" autofit-col"})),n._hContainer=n._renderField(r,{label:n.get("strings").h,max:360,maxlength:3,min:0,type:"hue",unit:"&#176;",value:c}),n._sContainer=n._renderField(r,{label:n.get("strings").s,max:a,maxlength:3,min:0,type:"saturation",unit:"%",value:a}),n._vContainer=n._renderField(r,{label:n.get("strings").v,max:f,maxlength:3,min:0,type:"value",unit:"%",value:f}),n._rContainer=n._renderField(s,{classLabel:z,label:n.get("strings").r,max:255,maxlength:3,min:0,type:"r",unit:"",value:255}),n._gContainer=n._renderField(s,{classLabel:z,label:n.get("strings").g,max:255,maxlength:3,min:0,type:"g",unit:"",value:0}),n._bContainer=n._renderField(s,{classLabel:z,label:n.get("strings").b,max:255,maxlength:3,min:0,type:"b",unit:"",value:0}),t.appendChild(r),t.appendChild(s),n._labelValueHSVContainer=r,n._labelValueRGBContainer=s},_renderImageBackdrop:function(){var e=this;e._hsImageBackdrop=e._hsImageContainer.appendChild(e.TPL_IMAGE_BACKDROP)},_renderImageContainer:function(){var e;e=this._viewContainer.appendChild(this.TPL_IMAGE_WRAPPER),this._hsImageContainer=e.one("."+E),this._renderImageBackdrop(),this._renderHSContainer(),this._renderThumb()},_renderHSContainer:function(){var e=this;e._hsContainer=e._hsImageContainer.appendChild(e.TPL_HS_CONTAINER)},_renderValueContainer:function(){this._valueContainer=this._viewContainer.appendChild(this.TPL_VALUE_CONTAINER),this._valueContainer=this._valueContainer.one(".autofit-row"),this._renderValueSliderContainer(),this._renderValueRightSideContainer()},_renderValueRightSideContainer:function(){var e,t,n,r;r=this._valueContainer.appendChild(this.TPL_VALUE_RIGHT_SIDE_CONTAINER),n=r.one("."+B),this._renderResultBackdrop(n),this._renderResultView(n),t=r.one("."+H),this._renderHexNode(t),e=r.one("."+P),this._renderFields(e),this.get("controls")||e.hide()},_renderValueSliderContainer:function(){this._valueSliderWrapper=this._valueContainer.appendChild(this.TPL_VALUE_SLIDER_WRAPPER),this._valueSliderContainer=this._valueSliderWrapper.one("."+L)},_renderResultBackdrop:function(e){var t=this;t._resultViewBackdrop=e.appendChild(t.TPL_VIEW_BACKDROP)},_renderResultView:function(e){var t=this;t._resultView=e.appendChild(t.TPL_RESULT_VIEW)},_renderThumb:function(){var e=this;e._colorThumb=e._hsContainer.appendChild(e.TPL_HS_THUMB)},_setHSContainerXY:function(){var e=this;e._hsContainerXY=e._hsContainer.getXY()},_setFieldValue:function(e,t){e.one("."+X).set("value",t)},_setValueSliderContainerStyle:function(e,t){var n=this,r;r=n._calculateRGBColor(e,t,100),n._valueSliderContainer.setStyle("backgroundColor",r)},_uiSetWidth:function(e){e=i.isNumber(e)?e+this.DEF_UNIT:e,e?(this._paletteContainer.setStyle("width",e),this._paletteContainer.removeClass(b)):(this._paletteContainer.setStyle("width",""),this._paletteContainer.addClass(b)),this._updateViewByHEX(this.get("selected"))},_updatePaletteThumbPosition:function(
e){var t=this;t._colorThumb.setXY([e[0]-t._colorThumbGutter,e[1]-t._colorThumbGutter])},_updateViewFromInput:function(e){var t=this,n;n=e.getAttribute("data-type"),n==="hue"||n==="saturation"||n==="value"||n==="alpha"?t._updateViewByHSVA(e):n==="r"||n==="g"||n==="b"?t._updateViewByRGB(e):n==="hex"&&t._updateViewByHEXNode(e)},_updateViewByHSVA:function(e){var t=this,i,s,o,u,a,c,h,p;o=t._getFieldValue(t._hContainer),h=t._getFieldValue(t._sContainer),p=t._getFieldValue(t._vContainer),u=t._getXYFromHueSaturation(o,h),t._colorThumb.setStyles({left:u[0],top:u[1]}),t._valueSlider.set("value",f-p,{src:r.UI_SRC}),a=t._calculateRGBColor(o,h,p),c=n.toArray(a),i=n.toHex(a),s=t._getHexValue(i,c),t._resultView.setStyle("backgroundColor",i),t._setValueSliderContainerStyle(o,h),t._hsContainer.setStyle("opacity",1-(l-p)/l),t._setFieldValue(t._outputContainer,s),t._setFieldValue(t._rContainer,c[0]),t._setFieldValue(t._gContainer,c[1]),t._setFieldValue(t._bContainer,c[2]),t.fire("hsvaInputChange",{hexColor:i,node:e}),t.set("selected",s,{src:r.UI_SRC})},_updateViewByRGB:function(e){var t=this,i,s,o,u,a,c,h,p,d,v,m,g,y,b;d=t._getFieldValue(t._rContainer),s=t._getFieldValue(t._gContainer),i=t._getFieldValue(t._bContainer),v=t._calculateRGBArray(d,s,i),a=n.toHSV(v),c=t._getHSVArray(a),h=c[0],y=c[1],b=c[2],m=t._calculateRGBColor(h,y,b),g=n.toArray(m),o=n.toHex(m),u=t._getHexValue(o,g),p=t._getXYFromHueSaturation(h,y),t._colorThumb.setStyles({left:p[0],top:p[1]}),t._valueSlider.set("value",f-b,{src:r.UI_SRC}),t._resultView.setStyle("backgroundColor",o),t._setValueSliderContainerStyle(h,y),t._hsContainer.setStyle("opacity",1-(l-b)/l),t._setFieldValue(t._outputContainer,u),t._setFieldValue(t._hContainer,h),t._setFieldValue(t._sContainer,y),t._setFieldValue(t._vContainer,b),t.fire("rgbInputChange",{hexColor:o,node:e}),t.set("selected",u,{src:r.UI_SRC})},_updateViewByHEXNode:function(e){var t=this,n;n=e.get("value"),t._updateViewByHEX(n),t.fire("hexInputChange",{hexColor:n,fieldNode:e}),t.set("selected",n,{src:r.UI_SRC})},_updateViewByHEX:function(e){var t=this,i,s,o,u,a,c,h,p,d,v,m,g,y,b;u=t._normalizeHexValue(e),u=u.substr(0,6),c=n.toHSV(u),h=n.toArray(c,"HSV"),p=h[0],y=h[1],b=h[2],m=n.toRGBA(c),g=n.toArray(m),v=g[0],o=g[1],i=g[2],d=t._getXYFromHueSaturation(h[0],h[1]),t._colorThumb.setStyles({left:d[0],top:d[1]}),t._valueSlider.set("value",f-b,{src:r.UI_SRC}),a="#"+u,t._resultView.setStyle("backgroundColor",a),t._setValueSliderContainerStyle(p,y),t._hsContainer.setStyle("opacity",1-(l-b)/l),s=t._getFieldValue(t._outputContainer),e.toLowerCase()!==s.toLowerCase()&&t._setFieldValue(t._outputContainer,e),t._setFieldValue(t._hContainer,p),t._setFieldValue(t._sContainer,y),t._setFieldValue(t._vContainer,b),t._setFieldValue(t._rContainer,v),t._setFieldValue(t._gContainer,o),t._setFieldValue(t._bContainer,i)},_validateFieldValue:function(e){var t=this,n,r,i,s;return n=t.get("fieldValidator"),i=n[e.getAttribute("data-type")],r=!1,s=e.get("value"),i&&i.test(s)&&(r=!0),r}},{CSS_PREFIX:s("hsv-palette"),ATTRS:{controls:{validator:i.isBoolean,value:!0,writeOnce:!0},fieldValidator:{validator:i.isObject,value:{alpha:J,b:J,g:J,hex:V,hue:K,r:J,saturation:$,value:$}},selected:{validator:i.isString,value:"ff0000ff"},strings:{value:{a:"A",b:"B",g:"G",h:"H",r:"R",hex:"Hex",s:"S",v:"V"}}},NAME:"hsv-palette",NS:"hsv-palette"});e.HSVPalette=Q},"3.1.0-deprecated.64",{requires:["aui-classnamemanager","aui-widget-cssclass","aui-widget-toggle","aui-event-input","base-build","clickable-rail","color-hsv","dd-constrain","slider","widget"],skinnable:!0});
