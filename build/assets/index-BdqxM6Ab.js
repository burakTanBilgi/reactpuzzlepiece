(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function Od(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ic={exports:{}},Wi={},oc={exports:{}},Y={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pr=Symbol.for("react.element"),Rd=Symbol.for("react.portal"),Fd=Symbol.for("react.fragment"),Dd=Symbol.for("react.strict_mode"),Bd=Symbol.for("react.profiler"),Ud=Symbol.for("react.provider"),Wd=Symbol.for("react.context"),Hd=Symbol.for("react.forward_ref"),Kd=Symbol.for("react.suspense"),Yd=Symbol.for("react.memo"),Vd=Symbol.for("react.lazy"),Bl=Symbol.iterator;function Xd(e){return e===null||typeof e!="object"?null:(e=Bl&&e[Bl]||e["@@iterator"],typeof e=="function"?e:null)}var sc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},lc=Object.assign,ac={};function Ln(e,t,n){this.props=e,this.context=t,this.refs=ac,this.updater=n||sc}Ln.prototype.isReactComponent={};Ln.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ln.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function cc(){}cc.prototype=Ln.prototype;function Fs(e,t,n){this.props=e,this.context=t,this.refs=ac,this.updater=n||sc}var Ds=Fs.prototype=new cc;Ds.constructor=Fs;lc(Ds,Ln.prototype);Ds.isPureReactComponent=!0;var Ul=Array.isArray,uc=Object.prototype.hasOwnProperty,Bs={current:null},dc={key:!0,ref:!0,__self:!0,__source:!0};function fc(e,t,n){var r,i={},o=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(o=""+t.key),t)uc.call(t,r)&&!dc.hasOwnProperty(r)&&(i[r]=t[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var c=Array(a),u=0;u<a;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:Pr,type:e,key:o,ref:s,props:i,_owner:Bs.current}}function Gd(e,t){return{$$typeof:Pr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Us(e){return typeof e=="object"&&e!==null&&e.$$typeof===Pr}function Qd(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Wl=/\/+/g;function uo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Qd(""+e.key):t.toString(36)}function ii(e,t,n,r,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Pr:case Rd:s=!0}}if(s)return s=e,i=i(s),e=r===""?"."+uo(s,0):r,Ul(i)?(n="",e!=null&&(n=e.replace(Wl,"$&/")+"/"),ii(i,t,n,"",function(u){return u})):i!=null&&(Us(i)&&(i=Gd(i,n+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(Wl,"$&/")+"/")+e)),t.push(i)),1;if(s=0,r=r===""?".":r+":",Ul(e))for(var a=0;a<e.length;a++){o=e[a];var c=r+uo(o,a);s+=ii(o,t,n,c,i)}else if(c=Xd(e),typeof c=="function")for(e=c.call(e),a=0;!(o=e.next()).done;)o=o.value,c=r+uo(o,a++),s+=ii(o,t,n,c,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function Tr(e,t,n){if(e==null)return e;var r=[],i=0;return ii(e,r,"","",function(o){return t.call(n,o,i++)}),r}function Zd(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var je={current:null},oi={transition:null},Jd={ReactCurrentDispatcher:je,ReactCurrentBatchConfig:oi,ReactCurrentOwner:Bs};function pc(){throw Error("act(...) is not supported in production builds of React.")}Y.Children={map:Tr,forEach:function(e,t,n){Tr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Tr(e,function(){t++}),t},toArray:function(e){return Tr(e,function(t){return t})||[]},only:function(e){if(!Us(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Y.Component=Ln;Y.Fragment=Fd;Y.Profiler=Bd;Y.PureComponent=Fs;Y.StrictMode=Dd;Y.Suspense=Kd;Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Jd;Y.act=pc;Y.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=lc({},e.props),i=e.key,o=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,s=Bs.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(c in t)uc.call(t,c)&&!dc.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&a!==void 0?a[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){a=Array(c);for(var u=0;u<c;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:Pr,type:e.type,key:i,ref:o,props:r,_owner:s}};Y.createContext=function(e){return e={$$typeof:Wd,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Ud,_context:e},e.Consumer=e};Y.createElement=fc;Y.createFactory=function(e){var t=fc.bind(null,e);return t.type=e,t};Y.createRef=function(){return{current:null}};Y.forwardRef=function(e){return{$$typeof:Hd,render:e}};Y.isValidElement=Us;Y.lazy=function(e){return{$$typeof:Vd,_payload:{_status:-1,_result:e},_init:Zd}};Y.memo=function(e,t){return{$$typeof:Yd,type:e,compare:t===void 0?null:t}};Y.startTransition=function(e){var t=oi.transition;oi.transition={};try{e()}finally{oi.transition=t}};Y.unstable_act=pc;Y.useCallback=function(e,t){return je.current.useCallback(e,t)};Y.useContext=function(e){return je.current.useContext(e)};Y.useDebugValue=function(){};Y.useDeferredValue=function(e){return je.current.useDeferredValue(e)};Y.useEffect=function(e,t){return je.current.useEffect(e,t)};Y.useId=function(){return je.current.useId()};Y.useImperativeHandle=function(e,t,n){return je.current.useImperativeHandle(e,t,n)};Y.useInsertionEffect=function(e,t){return je.current.useInsertionEffect(e,t)};Y.useLayoutEffect=function(e,t){return je.current.useLayoutEffect(e,t)};Y.useMemo=function(e,t){return je.current.useMemo(e,t)};Y.useReducer=function(e,t,n){return je.current.useReducer(e,t,n)};Y.useRef=function(e){return je.current.useRef(e)};Y.useState=function(e){return je.current.useState(e)};Y.useSyncExternalStore=function(e,t,n){return je.current.useSyncExternalStore(e,t,n)};Y.useTransition=function(){return je.current.useTransition()};Y.version="18.3.1";oc.exports=Y;var z=oc.exports;const qd=Od(z);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ef=z,tf=Symbol.for("react.element"),nf=Symbol.for("react.fragment"),rf=Object.prototype.hasOwnProperty,of=ef.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,sf={key:!0,ref:!0,__self:!0,__source:!0};function hc(e,t,n){var r,i={},o=null,s=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)rf.call(t,r)&&!sf.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:tf,type:e,key:o,ref:s,props:i,_owner:of.current}}Wi.Fragment=nf;Wi.jsx=hc;Wi.jsxs=hc;ic.exports=Wi;var l=ic.exports,Bo={},mc={exports:{}},Oe={},gc={exports:{}},yc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(M,b){var D=M.length;M.push(b);e:for(;0<D;){var q=D-1>>>1,j=M[q];if(0<i(j,b))M[q]=b,M[D]=j,D=q;else break e}}function n(M){return M.length===0?null:M[0]}function r(M){if(M.length===0)return null;var b=M[0],D=M.pop();if(D!==b){M[0]=D;e:for(var q=0,j=M.length,$=j>>>1;q<$;){var H=2*(q+1)-1,W=M[H],U=H+1,ee=M[U];if(0>i(W,D))U<j&&0>i(ee,W)?(M[q]=ee,M[U]=D,q=U):(M[q]=W,M[H]=D,q=H);else if(U<j&&0>i(ee,D))M[q]=ee,M[U]=D,q=U;else break e}}return b}function i(M,b){var D=M.sortIndex-b.sortIndex;return D!==0?D:M.id-b.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,a=s.now();e.unstable_now=function(){return s.now()-a}}var c=[],u=[],d=1,m=null,p=3,v=!1,x=!1,g=!1,w=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(M){for(var b=n(u);b!==null;){if(b.callback===null)r(u);else if(b.startTime<=M)r(u),b.sortIndex=b.expirationTime,t(c,b);else break;b=n(u)}}function k(M){if(g=!1,y(M),!x)if(n(c)!==null)x=!0,I(S);else{var b=n(u);b!==null&&O(k,b.startTime-M)}}function S(M,b){x=!1,g&&(g=!1,h(P),P=-1),v=!0;var D=p;try{for(y(b),m=n(c);m!==null&&(!(m.expirationTime>b)||M&&!K());){var q=m.callback;if(typeof q=="function"){m.callback=null,p=m.priorityLevel;var j=q(m.expirationTime<=b);b=e.unstable_now(),typeof j=="function"?m.callback=j:m===n(c)&&r(c),y(b)}else r(c);m=n(c)}if(m!==null)var $=!0;else{var H=n(u);H!==null&&O(k,H.startTime-b),$=!1}return $}finally{m=null,p=D,v=!1}}var C=!1,E=null,P=-1,B=5,R=-1;function K(){return!(e.unstable_now()-R<B)}function T(){if(E!==null){var M=e.unstable_now();R=M;var b=!0;try{b=E(!0,M)}finally{b?_():(C=!1,E=null)}}else C=!1}var _;if(typeof f=="function")_=function(){f(T)};else if(typeof MessageChannel<"u"){var A=new MessageChannel,F=A.port2;A.port1.onmessage=T,_=function(){F.postMessage(null)}}else _=function(){w(T,0)};function I(M){E=M,C||(C=!0,_())}function O(M,b){P=w(function(){M(e.unstable_now())},b)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(M){M.callback=null},e.unstable_continueExecution=function(){x||v||(x=!0,I(S))},e.unstable_forceFrameRate=function(M){0>M||125<M?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<M?Math.floor(1e3/M):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(M){switch(p){case 1:case 2:case 3:var b=3;break;default:b=p}var D=p;p=b;try{return M()}finally{p=D}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(M,b){switch(M){case 1:case 2:case 3:case 4:case 5:break;default:M=3}var D=p;p=M;try{return b()}finally{p=D}},e.unstable_scheduleCallback=function(M,b,D){var q=e.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?q+D:q):D=q,M){case 1:var j=-1;break;case 2:j=250;break;case 5:j=1073741823;break;case 4:j=1e4;break;default:j=5e3}return j=D+j,M={id:d++,callback:b,priorityLevel:M,startTime:D,expirationTime:j,sortIndex:-1},D>q?(M.sortIndex=D,t(u,M),n(c)===null&&M===n(u)&&(g?(h(P),P=-1):g=!0,O(k,D-q))):(M.sortIndex=j,t(c,M),x||v||(x=!0,I(S))),M},e.unstable_shouldYield=K,e.unstable_wrapCallback=function(M){var b=p;return function(){var D=p;p=b;try{return M.apply(this,arguments)}finally{p=D}}}})(yc);gc.exports=yc;var lf=gc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var af=z,Le=lf;function N(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var vc=new Set,dr={};function on(e,t){Nn(e,t),Nn(e+"Capture",t)}function Nn(e,t){for(dr[e]=t,e=0;e<t.length;e++)vc.add(t[e])}var yt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Uo=Object.prototype.hasOwnProperty,cf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Hl={},Kl={};function uf(e){return Uo.call(Kl,e)?!0:Uo.call(Hl,e)?!1:cf.test(e)?Kl[e]=!0:(Hl[e]=!0,!1)}function df(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function ff(e,t,n,r){if(t===null||typeof t>"u"||df(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ee(e,t,n,r,i,o,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var ye={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ye[e]=new Ee(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ye[t]=new Ee(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ye[e]=new Ee(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ye[e]=new Ee(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ye[e]=new Ee(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ye[e]=new Ee(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ye[e]=new Ee(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ye[e]=new Ee(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ye[e]=new Ee(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ws=/[\-:]([a-z])/g;function Hs(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ws,Hs);ye[t]=new Ee(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ws,Hs);ye[t]=new Ee(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ws,Hs);ye[t]=new Ee(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ye[e]=new Ee(e,1,!1,e.toLowerCase(),null,!1,!1)});ye.xlinkHref=new Ee("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ye[e]=new Ee(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ks(e,t,n,r){var i=ye.hasOwnProperty(t)?ye[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(ff(t,n,i,r)&&(n=null),r||i===null?uf(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var kt=af.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Lr=Symbol.for("react.element"),cn=Symbol.for("react.portal"),un=Symbol.for("react.fragment"),Ys=Symbol.for("react.strict_mode"),Wo=Symbol.for("react.profiler"),xc=Symbol.for("react.provider"),wc=Symbol.for("react.context"),Vs=Symbol.for("react.forward_ref"),Ho=Symbol.for("react.suspense"),Ko=Symbol.for("react.suspense_list"),Xs=Symbol.for("react.memo"),_t=Symbol.for("react.lazy"),kc=Symbol.for("react.offscreen"),Yl=Symbol.iterator;function Un(e){return e===null||typeof e!="object"?null:(e=Yl&&e[Yl]||e["@@iterator"],typeof e=="function"?e:null)}var oe=Object.assign,fo;function Zn(e){if(fo===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);fo=t&&t[1]||""}return`
`+fo+e}var po=!1;function ho(e,t){if(!e||po)return"";po=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),o=r.stack.split(`
`),s=i.length-1,a=o.length-1;1<=s&&0<=a&&i[s]!==o[a];)a--;for(;1<=s&&0<=a;s--,a--)if(i[s]!==o[a]){if(s!==1||a!==1)do if(s--,a--,0>a||i[s]!==o[a]){var c=`
`+i[s].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=s&&0<=a);break}}}finally{po=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Zn(e):""}function pf(e){switch(e.tag){case 5:return Zn(e.type);case 16:return Zn("Lazy");case 13:return Zn("Suspense");case 19:return Zn("SuspenseList");case 0:case 2:case 15:return e=ho(e.type,!1),e;case 11:return e=ho(e.type.render,!1),e;case 1:return e=ho(e.type,!0),e;default:return""}}function Yo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case un:return"Fragment";case cn:return"Portal";case Wo:return"Profiler";case Ys:return"StrictMode";case Ho:return"Suspense";case Ko:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case wc:return(e.displayName||"Context")+".Consumer";case xc:return(e._context.displayName||"Context")+".Provider";case Vs:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Xs:return t=e.displayName||null,t!==null?t:Yo(e.type)||"Memo";case _t:t=e._payload,e=e._init;try{return Yo(e(t))}catch{}}return null}function hf(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Yo(t);case 8:return t===Ys?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Rt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Sc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function mf(e){var t=Sc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(s){r=""+s,o.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Or(e){e._valueTracker||(e._valueTracker=mf(e))}function _c(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Sc(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function gi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Vo(e,t){var n=t.checked;return oe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Vl(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Rt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function jc(e,t){t=t.checked,t!=null&&Ks(e,"checked",t,!1)}function Xo(e,t){jc(e,t);var n=Rt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Go(e,t.type,n):t.hasOwnProperty("defaultValue")&&Go(e,t.type,Rt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Xl(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Go(e,t,n){(t!=="number"||gi(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Jn=Array.isArray;function kn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Rt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Qo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(N(91));return oe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Gl(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(N(92));if(Jn(n)){if(1<n.length)throw Error(N(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Rt(n)}}function Ec(e,t){var n=Rt(t.value),r=Rt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ql(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Cc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Zo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Cc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Rr,Nc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Rr=Rr||document.createElement("div"),Rr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Rr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function fr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var nr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},gf=["Webkit","ms","Moz","O"];Object.keys(nr).forEach(function(e){gf.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),nr[t]=nr[e]})});function Pc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||nr.hasOwnProperty(e)&&nr[e]?(""+t).trim():t+"px"}function zc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Pc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var yf=oe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Jo(e,t){if(t){if(yf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(N(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(N(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(N(61))}if(t.style!=null&&typeof t.style!="object")throw Error(N(62))}}function qo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var es=null;function Gs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ts=null,Sn=null,_n=null;function Zl(e){if(e=br(e)){if(typeof ts!="function")throw Error(N(280));var t=e.stateNode;t&&(t=Xi(t),ts(e.stateNode,e.type,t))}}function Mc(e){Sn?_n?_n.push(e):_n=[e]:Sn=e}function bc(){if(Sn){var e=Sn,t=_n;if(_n=Sn=null,Zl(e),t)for(e=0;e<t.length;e++)Zl(t[e])}}function Ac(e,t){return e(t)}function Ic(){}var mo=!1;function $c(e,t,n){if(mo)return e(t,n);mo=!0;try{return Ac(e,t,n)}finally{mo=!1,(Sn!==null||_n!==null)&&(Ic(),bc())}}function pr(e,t){var n=e.stateNode;if(n===null)return null;var r=Xi(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(N(231,t,typeof n));return n}var ns=!1;if(yt)try{var Wn={};Object.defineProperty(Wn,"passive",{get:function(){ns=!0}}),window.addEventListener("test",Wn,Wn),window.removeEventListener("test",Wn,Wn)}catch{ns=!1}function vf(e,t,n,r,i,o,s,a,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var rr=!1,yi=null,vi=!1,rs=null,xf={onError:function(e){rr=!0,yi=e}};function wf(e,t,n,r,i,o,s,a,c){rr=!1,yi=null,vf.apply(xf,arguments)}function kf(e,t,n,r,i,o,s,a,c){if(wf.apply(this,arguments),rr){if(rr){var u=yi;rr=!1,yi=null}else throw Error(N(198));vi||(vi=!0,rs=u)}}function sn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Tc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Jl(e){if(sn(e)!==e)throw Error(N(188))}function Sf(e){var t=e.alternate;if(!t){if(t=sn(e),t===null)throw Error(N(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return Jl(i),e;if(o===r)return Jl(i),t;o=o.sibling}throw Error(N(188))}if(n.return!==r.return)n=i,r=o;else{for(var s=!1,a=i.child;a;){if(a===n){s=!0,n=i,r=o;break}if(a===r){s=!0,r=i,n=o;break}a=a.sibling}if(!s){for(a=o.child;a;){if(a===n){s=!0,n=o,r=i;break}if(a===r){s=!0,r=o,n=i;break}a=a.sibling}if(!s)throw Error(N(189))}}if(n.alternate!==r)throw Error(N(190))}if(n.tag!==3)throw Error(N(188));return n.stateNode.current===n?e:t}function Lc(e){return e=Sf(e),e!==null?Oc(e):null}function Oc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Oc(e);if(t!==null)return t;e=e.sibling}return null}var Rc=Le.unstable_scheduleCallback,ql=Le.unstable_cancelCallback,_f=Le.unstable_shouldYield,jf=Le.unstable_requestPaint,le=Le.unstable_now,Ef=Le.unstable_getCurrentPriorityLevel,Qs=Le.unstable_ImmediatePriority,Fc=Le.unstable_UserBlockingPriority,xi=Le.unstable_NormalPriority,Cf=Le.unstable_LowPriority,Dc=Le.unstable_IdlePriority,Hi=null,lt=null;function Nf(e){if(lt&&typeof lt.onCommitFiberRoot=="function")try{lt.onCommitFiberRoot(Hi,e,void 0,(e.current.flags&128)===128)}catch{}}var Je=Math.clz32?Math.clz32:Mf,Pf=Math.log,zf=Math.LN2;function Mf(e){return e>>>=0,e===0?32:31-(Pf(e)/zf|0)|0}var Fr=64,Dr=4194304;function qn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function wi(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,s=n&268435455;if(s!==0){var a=s&~i;a!==0?r=qn(a):(o&=s,o!==0&&(r=qn(o)))}else s=n&~i,s!==0?r=qn(s):o!==0&&(r=qn(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Je(t),i=1<<n,r|=e[n],t&=~i;return r}function bf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-Je(o),a=1<<s,c=i[s];c===-1?(!(a&n)||a&r)&&(i[s]=bf(a,t)):c<=t&&(e.expiredLanes|=a),o&=~a}}function is(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Bc(){var e=Fr;return Fr<<=1,!(Fr&4194240)&&(Fr=64),e}function go(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function zr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Je(t),e[t]=n}function If(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Je(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}function Zs(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Je(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var G=0;function Uc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Wc,Js,Hc,Kc,Yc,os=!1,Br=[],zt=null,Mt=null,bt=null,hr=new Map,mr=new Map,Et=[],$f="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ea(e,t){switch(e){case"focusin":case"focusout":zt=null;break;case"dragenter":case"dragleave":Mt=null;break;case"mouseover":case"mouseout":bt=null;break;case"pointerover":case"pointerout":hr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":mr.delete(t.pointerId)}}function Hn(e,t,n,r,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},t!==null&&(t=br(t),t!==null&&Js(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tf(e,t,n,r,i){switch(t){case"focusin":return zt=Hn(zt,e,t,n,r,i),!0;case"dragenter":return Mt=Hn(Mt,e,t,n,r,i),!0;case"mouseover":return bt=Hn(bt,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return hr.set(o,Hn(hr.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,mr.set(o,Hn(mr.get(o)||null,e,t,n,r,i)),!0}return!1}function Vc(e){var t=Kt(e.target);if(t!==null){var n=sn(t);if(n!==null){if(t=n.tag,t===13){if(t=Tc(n),t!==null){e.blockedOn=t,Yc(e.priority,function(){Hc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function si(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ss(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);es=r,n.target.dispatchEvent(r),es=null}else return t=br(n),t!==null&&Js(t),e.blockedOn=n,!1;t.shift()}return!0}function ta(e,t,n){si(e)&&n.delete(t)}function Lf(){os=!1,zt!==null&&si(zt)&&(zt=null),Mt!==null&&si(Mt)&&(Mt=null),bt!==null&&si(bt)&&(bt=null),hr.forEach(ta),mr.forEach(ta)}function Kn(e,t){e.blockedOn===t&&(e.blockedOn=null,os||(os=!0,Le.unstable_scheduleCallback(Le.unstable_NormalPriority,Lf)))}function gr(e){function t(i){return Kn(i,e)}if(0<Br.length){Kn(Br[0],e);for(var n=1;n<Br.length;n++){var r=Br[n];r.blockedOn===e&&(r.blockedOn=null)}}for(zt!==null&&Kn(zt,e),Mt!==null&&Kn(Mt,e),bt!==null&&Kn(bt,e),hr.forEach(t),mr.forEach(t),n=0;n<Et.length;n++)r=Et[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Et.length&&(n=Et[0],n.blockedOn===null);)Vc(n),n.blockedOn===null&&Et.shift()}var jn=kt.ReactCurrentBatchConfig,ki=!0;function Of(e,t,n,r){var i=G,o=jn.transition;jn.transition=null;try{G=1,qs(e,t,n,r)}finally{G=i,jn.transition=o}}function Rf(e,t,n,r){var i=G,o=jn.transition;jn.transition=null;try{G=4,qs(e,t,n,r)}finally{G=i,jn.transition=o}}function qs(e,t,n,r){if(ki){var i=ss(e,t,n,r);if(i===null)Co(e,t,r,Si,n),ea(e,r);else if(Tf(i,e,t,n,r))r.stopPropagation();else if(ea(e,r),t&4&&-1<$f.indexOf(e)){for(;i!==null;){var o=br(i);if(o!==null&&Wc(o),o=ss(e,t,n,r),o===null&&Co(e,t,r,Si,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else Co(e,t,r,null,n)}}var Si=null;function ss(e,t,n,r){if(Si=null,e=Gs(r),e=Kt(e),e!==null)if(t=sn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Tc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Si=e,null}function Xc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ef()){case Qs:return 1;case Fc:return 4;case xi:case Cf:return 16;case Dc:return 536870912;default:return 16}default:return 16}}var Nt=null,el=null,li=null;function Gc(){if(li)return li;var e,t=el,n=t.length,r,i="value"in Nt?Nt.value:Nt.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===i[o-r];r++);return li=i.slice(e,1<r?1-r:void 0)}function ai(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ur(){return!0}function na(){return!1}function Re(e){function t(n,r,i,o,s){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Ur:na,this.isPropagationStopped=na,this}return oe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ur)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ur)},persist:function(){},isPersistent:Ur}),t}var On={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},tl=Re(On),Mr=oe({},On,{view:0,detail:0}),Ff=Re(Mr),yo,vo,Yn,Ki=oe({},Mr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Yn&&(Yn&&e.type==="mousemove"?(yo=e.screenX-Yn.screenX,vo=e.screenY-Yn.screenY):vo=yo=0,Yn=e),yo)},movementY:function(e){return"movementY"in e?e.movementY:vo}}),ra=Re(Ki),Df=oe({},Ki,{dataTransfer:0}),Bf=Re(Df),Uf=oe({},Mr,{relatedTarget:0}),xo=Re(Uf),Wf=oe({},On,{animationName:0,elapsedTime:0,pseudoElement:0}),Hf=Re(Wf),Kf=oe({},On,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Yf=Re(Kf),Vf=oe({},On,{data:0}),ia=Re(Vf),Xf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Qf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Zf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Qf[e])?!!t[e]:!1}function nl(){return Zf}var Jf=oe({},Mr,{key:function(e){if(e.key){var t=Xf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ai(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Gf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nl,charCode:function(e){return e.type==="keypress"?ai(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ai(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),qf=Re(Jf),ep=oe({},Ki,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),oa=Re(ep),tp=oe({},Mr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nl}),np=Re(tp),rp=oe({},On,{propertyName:0,elapsedTime:0,pseudoElement:0}),ip=Re(rp),op=oe({},Ki,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),sp=Re(op),lp=[9,13,27,32],rl=yt&&"CompositionEvent"in window,ir=null;yt&&"documentMode"in document&&(ir=document.documentMode);var ap=yt&&"TextEvent"in window&&!ir,Qc=yt&&(!rl||ir&&8<ir&&11>=ir),sa=" ",la=!1;function Zc(e,t){switch(e){case"keyup":return lp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Jc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var dn=!1;function cp(e,t){switch(e){case"compositionend":return Jc(t);case"keypress":return t.which!==32?null:(la=!0,sa);case"textInput":return e=t.data,e===sa&&la?null:e;default:return null}}function up(e,t){if(dn)return e==="compositionend"||!rl&&Zc(e,t)?(e=Gc(),li=el=Nt=null,dn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Qc&&t.locale!=="ko"?null:t.data;default:return null}}var dp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function aa(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!dp[e.type]:t==="textarea"}function qc(e,t,n,r){Mc(r),t=_i(t,"onChange"),0<t.length&&(n=new tl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var or=null,yr=null;function fp(e){uu(e,0)}function Yi(e){var t=hn(e);if(_c(t))return e}function pp(e,t){if(e==="change")return t}var eu=!1;if(yt){var wo;if(yt){var ko="oninput"in document;if(!ko){var ca=document.createElement("div");ca.setAttribute("oninput","return;"),ko=typeof ca.oninput=="function"}wo=ko}else wo=!1;eu=wo&&(!document.documentMode||9<document.documentMode)}function ua(){or&&(or.detachEvent("onpropertychange",tu),yr=or=null)}function tu(e){if(e.propertyName==="value"&&Yi(yr)){var t=[];qc(t,yr,e,Gs(e)),$c(fp,t)}}function hp(e,t,n){e==="focusin"?(ua(),or=t,yr=n,or.attachEvent("onpropertychange",tu)):e==="focusout"&&ua()}function mp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Yi(yr)}function gp(e,t){if(e==="click")return Yi(t)}function yp(e,t){if(e==="input"||e==="change")return Yi(t)}function vp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var et=typeof Object.is=="function"?Object.is:vp;function vr(e,t){if(et(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Uo.call(t,i)||!et(e[i],t[i]))return!1}return!0}function da(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function fa(e,t){var n=da(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=da(n)}}function nu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?nu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ru(){for(var e=window,t=gi();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=gi(e.document)}return t}function il(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function xp(e){var t=ru(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&nu(n.ownerDocument.documentElement,n)){if(r!==null&&il(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=fa(n,o);var s=fa(n,r);i&&s&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var wp=yt&&"documentMode"in document&&11>=document.documentMode,fn=null,ls=null,sr=null,as=!1;function pa(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;as||fn==null||fn!==gi(r)||(r=fn,"selectionStart"in r&&il(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),sr&&vr(sr,r)||(sr=r,r=_i(ls,"onSelect"),0<r.length&&(t=new tl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=fn)))}function Wr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var pn={animationend:Wr("Animation","AnimationEnd"),animationiteration:Wr("Animation","AnimationIteration"),animationstart:Wr("Animation","AnimationStart"),transitionend:Wr("Transition","TransitionEnd")},So={},iu={};yt&&(iu=document.createElement("div").style,"AnimationEvent"in window||(delete pn.animationend.animation,delete pn.animationiteration.animation,delete pn.animationstart.animation),"TransitionEvent"in window||delete pn.transitionend.transition);function Vi(e){if(So[e])return So[e];if(!pn[e])return e;var t=pn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in iu)return So[e]=t[n];return e}var ou=Vi("animationend"),su=Vi("animationiteration"),lu=Vi("animationstart"),au=Vi("transitionend"),cu=new Map,ha="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Dt(e,t){cu.set(e,t),on(t,[e])}for(var _o=0;_o<ha.length;_o++){var jo=ha[_o],kp=jo.toLowerCase(),Sp=jo[0].toUpperCase()+jo.slice(1);Dt(kp,"on"+Sp)}Dt(ou,"onAnimationEnd");Dt(su,"onAnimationIteration");Dt(lu,"onAnimationStart");Dt("dblclick","onDoubleClick");Dt("focusin","onFocus");Dt("focusout","onBlur");Dt(au,"onTransitionEnd");Nn("onMouseEnter",["mouseout","mouseover"]);Nn("onMouseLeave",["mouseout","mouseover"]);Nn("onPointerEnter",["pointerout","pointerover"]);Nn("onPointerLeave",["pointerout","pointerover"]);on("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));on("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));on("onBeforeInput",["compositionend","keypress","textInput","paste"]);on("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));on("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));on("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var er="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),_p=new Set("cancel close invalid load scroll toggle".split(" ").concat(er));function ma(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,kf(r,t,void 0,e),e.currentTarget=null}function uu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var s=r.length-1;0<=s;s--){var a=r[s],c=a.instance,u=a.currentTarget;if(a=a.listener,c!==o&&i.isPropagationStopped())break e;ma(i,a,u),o=c}else for(s=0;s<r.length;s++){if(a=r[s],c=a.instance,u=a.currentTarget,a=a.listener,c!==o&&i.isPropagationStopped())break e;ma(i,a,u),o=c}}}if(vi)throw e=rs,vi=!1,rs=null,e}function Z(e,t){var n=t[ps];n===void 0&&(n=t[ps]=new Set);var r=e+"__bubble";n.has(r)||(du(t,e,2,!1),n.add(r))}function Eo(e,t,n){var r=0;t&&(r|=4),du(n,e,r,t)}var Hr="_reactListening"+Math.random().toString(36).slice(2);function xr(e){if(!e[Hr]){e[Hr]=!0,vc.forEach(function(n){n!=="selectionchange"&&(_p.has(n)||Eo(n,!1,e),Eo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Hr]||(t[Hr]=!0,Eo("selectionchange",!1,t))}}function du(e,t,n,r){switch(Xc(t)){case 1:var i=Of;break;case 4:i=Rf;break;default:i=qs}n=i.bind(null,t,n,e),i=void 0,!ns||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Co(e,t,n,r,i){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(s===4)for(s=r.return;s!==null;){var c=s.tag;if((c===3||c===4)&&(c=s.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;s=s.return}for(;a!==null;){if(s=Kt(a),s===null)return;if(c=s.tag,c===5||c===6){r=o=s;continue e}a=a.parentNode}}r=r.return}$c(function(){var u=o,d=Gs(n),m=[];e:{var p=cu.get(e);if(p!==void 0){var v=tl,x=e;switch(e){case"keypress":if(ai(n)===0)break e;case"keydown":case"keyup":v=qf;break;case"focusin":x="focus",v=xo;break;case"focusout":x="blur",v=xo;break;case"beforeblur":case"afterblur":v=xo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=ra;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Bf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=np;break;case ou:case su:case lu:v=Hf;break;case au:v=ip;break;case"scroll":v=Ff;break;case"wheel":v=sp;break;case"copy":case"cut":case"paste":v=Yf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=oa}var g=(t&4)!==0,w=!g&&e==="scroll",h=g?p!==null?p+"Capture":null:p;g=[];for(var f=u,y;f!==null;){y=f;var k=y.stateNode;if(y.tag===5&&k!==null&&(y=k,h!==null&&(k=pr(f,h),k!=null&&g.push(wr(f,k,y)))),w)break;f=f.return}0<g.length&&(p=new v(p,x,null,n,d),m.push({event:p,listeners:g}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",p&&n!==es&&(x=n.relatedTarget||n.fromElement)&&(Kt(x)||x[vt]))break e;if((v||p)&&(p=d.window===d?d:(p=d.ownerDocument)?p.defaultView||p.parentWindow:window,v?(x=n.relatedTarget||n.toElement,v=u,x=x?Kt(x):null,x!==null&&(w=sn(x),x!==w||x.tag!==5&&x.tag!==6)&&(x=null)):(v=null,x=u),v!==x)){if(g=ra,k="onMouseLeave",h="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(g=oa,k="onPointerLeave",h="onPointerEnter",f="pointer"),w=v==null?p:hn(v),y=x==null?p:hn(x),p=new g(k,f+"leave",v,n,d),p.target=w,p.relatedTarget=y,k=null,Kt(d)===u&&(g=new g(h,f+"enter",x,n,d),g.target=y,g.relatedTarget=w,k=g),w=k,v&&x)t:{for(g=v,h=x,f=0,y=g;y;y=an(y))f++;for(y=0,k=h;k;k=an(k))y++;for(;0<f-y;)g=an(g),f--;for(;0<y-f;)h=an(h),y--;for(;f--;){if(g===h||h!==null&&g===h.alternate)break t;g=an(g),h=an(h)}g=null}else g=null;v!==null&&ga(m,p,v,g,!1),x!==null&&w!==null&&ga(m,w,x,g,!0)}}e:{if(p=u?hn(u):window,v=p.nodeName&&p.nodeName.toLowerCase(),v==="select"||v==="input"&&p.type==="file")var S=pp;else if(aa(p))if(eu)S=yp;else{S=mp;var C=hp}else(v=p.nodeName)&&v.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(S=gp);if(S&&(S=S(e,u))){qc(m,S,n,d);break e}C&&C(e,p,u),e==="focusout"&&(C=p._wrapperState)&&C.controlled&&p.type==="number"&&Go(p,"number",p.value)}switch(C=u?hn(u):window,e){case"focusin":(aa(C)||C.contentEditable==="true")&&(fn=C,ls=u,sr=null);break;case"focusout":sr=ls=fn=null;break;case"mousedown":as=!0;break;case"contextmenu":case"mouseup":case"dragend":as=!1,pa(m,n,d);break;case"selectionchange":if(wp)break;case"keydown":case"keyup":pa(m,n,d)}var E;if(rl)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else dn?Zc(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(Qc&&n.locale!=="ko"&&(dn||P!=="onCompositionStart"?P==="onCompositionEnd"&&dn&&(E=Gc()):(Nt=d,el="value"in Nt?Nt.value:Nt.textContent,dn=!0)),C=_i(u,P),0<C.length&&(P=new ia(P,e,null,n,d),m.push({event:P,listeners:C}),E?P.data=E:(E=Jc(n),E!==null&&(P.data=E)))),(E=ap?cp(e,n):up(e,n))&&(u=_i(u,"onBeforeInput"),0<u.length&&(d=new ia("onBeforeInput","beforeinput",null,n,d),m.push({event:d,listeners:u}),d.data=E))}uu(m,t)})}function wr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function _i(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=pr(e,n),o!=null&&r.unshift(wr(e,o,i)),o=pr(e,t),o!=null&&r.push(wr(e,o,i))),e=e.return}return r}function an(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ga(e,t,n,r,i){for(var o=t._reactName,s=[];n!==null&&n!==r;){var a=n,c=a.alternate,u=a.stateNode;if(c!==null&&c===r)break;a.tag===5&&u!==null&&(a=u,i?(c=pr(n,o),c!=null&&s.unshift(wr(n,c,a))):i||(c=pr(n,o),c!=null&&s.push(wr(n,c,a)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var jp=/\r\n?/g,Ep=/\u0000|\uFFFD/g;function ya(e){return(typeof e=="string"?e:""+e).replace(jp,`
`).replace(Ep,"")}function Kr(e,t,n){if(t=ya(t),ya(e)!==t&&n)throw Error(N(425))}function ji(){}var cs=null,us=null;function ds(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var fs=typeof setTimeout=="function"?setTimeout:void 0,Cp=typeof clearTimeout=="function"?clearTimeout:void 0,va=typeof Promise=="function"?Promise:void 0,Np=typeof queueMicrotask=="function"?queueMicrotask:typeof va<"u"?function(e){return va.resolve(null).then(e).catch(Pp)}:fs;function Pp(e){setTimeout(function(){throw e})}function No(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),gr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);gr(t)}function At(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function xa(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Rn=Math.random().toString(36).slice(2),st="__reactFiber$"+Rn,kr="__reactProps$"+Rn,vt="__reactContainer$"+Rn,ps="__reactEvents$"+Rn,zp="__reactListeners$"+Rn,Mp="__reactHandles$"+Rn;function Kt(e){var t=e[st];if(t)return t;for(var n=e.parentNode;n;){if(t=n[vt]||n[st]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=xa(e);e!==null;){if(n=e[st])return n;e=xa(e)}return t}e=n,n=e.parentNode}return null}function br(e){return e=e[st]||e[vt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function hn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(N(33))}function Xi(e){return e[kr]||null}var hs=[],mn=-1;function Bt(e){return{current:e}}function J(e){0>mn||(e.current=hs[mn],hs[mn]=null,mn--)}function Q(e,t){mn++,hs[mn]=e.current,e.current=t}var Ft={},ke=Bt(Ft),Me=Bt(!1),Zt=Ft;function Pn(e,t){var n=e.type.contextTypes;if(!n)return Ft;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function be(e){return e=e.childContextTypes,e!=null}function Ei(){J(Me),J(ke)}function wa(e,t,n){if(ke.current!==Ft)throw Error(N(168));Q(ke,t),Q(Me,n)}function fu(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(N(108,hf(e)||"Unknown",i));return oe({},n,r)}function Ci(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ft,Zt=ke.current,Q(ke,e),Q(Me,Me.current),!0}function ka(e,t,n){var r=e.stateNode;if(!r)throw Error(N(169));n?(e=fu(e,t,Zt),r.__reactInternalMemoizedMergedChildContext=e,J(Me),J(ke),Q(ke,e)):J(Me),Q(Me,n)}var ut=null,Gi=!1,Po=!1;function pu(e){ut===null?ut=[e]:ut.push(e)}function bp(e){Gi=!0,pu(e)}function Ut(){if(!Po&&ut!==null){Po=!0;var e=0,t=G;try{var n=ut;for(G=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ut=null,Gi=!1}catch(i){throw ut!==null&&(ut=ut.slice(e+1)),Rc(Qs,Ut),i}finally{G=t,Po=!1}}return null}var gn=[],yn=0,Ni=null,Pi=0,Be=[],Ue=0,Jt=null,dt=1,ft="";function Wt(e,t){gn[yn++]=Pi,gn[yn++]=Ni,Ni=e,Pi=t}function hu(e,t,n){Be[Ue++]=dt,Be[Ue++]=ft,Be[Ue++]=Jt,Jt=e;var r=dt;e=ft;var i=32-Je(r)-1;r&=~(1<<i),n+=1;var o=32-Je(t)+i;if(30<o){var s=i-i%5;o=(r&(1<<s)-1).toString(32),r>>=s,i-=s,dt=1<<32-Je(t)+i|n<<i|r,ft=o+e}else dt=1<<o|n<<i|r,ft=e}function ol(e){e.return!==null&&(Wt(e,1),hu(e,1,0))}function sl(e){for(;e===Ni;)Ni=gn[--yn],gn[yn]=null,Pi=gn[--yn],gn[yn]=null;for(;e===Jt;)Jt=Be[--Ue],Be[Ue]=null,ft=Be[--Ue],Be[Ue]=null,dt=Be[--Ue],Be[Ue]=null}var Te=null,$e=null,ne=!1,Qe=null;function mu(e,t){var n=We(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Sa(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Te=e,$e=At(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Te=e,$e=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Jt!==null?{id:dt,overflow:ft}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=We(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Te=e,$e=null,!0):!1;default:return!1}}function ms(e){return(e.mode&1)!==0&&(e.flags&128)===0}function gs(e){if(ne){var t=$e;if(t){var n=t;if(!Sa(e,t)){if(ms(e))throw Error(N(418));t=At(n.nextSibling);var r=Te;t&&Sa(e,t)?mu(r,n):(e.flags=e.flags&-4097|2,ne=!1,Te=e)}}else{if(ms(e))throw Error(N(418));e.flags=e.flags&-4097|2,ne=!1,Te=e}}}function _a(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Te=e}function Yr(e){if(e!==Te)return!1;if(!ne)return _a(e),ne=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ds(e.type,e.memoizedProps)),t&&(t=$e)){if(ms(e))throw gu(),Error(N(418));for(;t;)mu(e,t),t=At(t.nextSibling)}if(_a(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(N(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){$e=At(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}$e=null}}else $e=Te?At(e.stateNode.nextSibling):null;return!0}function gu(){for(var e=$e;e;)e=At(e.nextSibling)}function zn(){$e=Te=null,ne=!1}function ll(e){Qe===null?Qe=[e]:Qe.push(e)}var Ap=kt.ReactCurrentBatchConfig;function Vn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(N(309));var r=n.stateNode}if(!r)throw Error(N(147,e));var i=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(s){var a=i.refs;s===null?delete a[o]:a[o]=s},t._stringRef=o,t)}if(typeof e!="string")throw Error(N(284));if(!n._owner)throw Error(N(290,e))}return e}function Vr(e,t){throw e=Object.prototype.toString.call(t),Error(N(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ja(e){var t=e._init;return t(e._payload)}function yu(e){function t(h,f){if(e){var y=h.deletions;y===null?(h.deletions=[f],h.flags|=16):y.push(f)}}function n(h,f){if(!e)return null;for(;f!==null;)t(h,f),f=f.sibling;return null}function r(h,f){for(h=new Map;f!==null;)f.key!==null?h.set(f.key,f):h.set(f.index,f),f=f.sibling;return h}function i(h,f){return h=Lt(h,f),h.index=0,h.sibling=null,h}function o(h,f,y){return h.index=y,e?(y=h.alternate,y!==null?(y=y.index,y<f?(h.flags|=2,f):y):(h.flags|=2,f)):(h.flags|=1048576,f)}function s(h){return e&&h.alternate===null&&(h.flags|=2),h}function a(h,f,y,k){return f===null||f.tag!==6?(f=To(y,h.mode,k),f.return=h,f):(f=i(f,y),f.return=h,f)}function c(h,f,y,k){var S=y.type;return S===un?d(h,f,y.props.children,k,y.key):f!==null&&(f.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===_t&&ja(S)===f.type)?(k=i(f,y.props),k.ref=Vn(h,f,y),k.return=h,k):(k=mi(y.type,y.key,y.props,null,h.mode,k),k.ref=Vn(h,f,y),k.return=h,k)}function u(h,f,y,k){return f===null||f.tag!==4||f.stateNode.containerInfo!==y.containerInfo||f.stateNode.implementation!==y.implementation?(f=Lo(y,h.mode,k),f.return=h,f):(f=i(f,y.children||[]),f.return=h,f)}function d(h,f,y,k,S){return f===null||f.tag!==7?(f=Qt(y,h.mode,k,S),f.return=h,f):(f=i(f,y),f.return=h,f)}function m(h,f,y){if(typeof f=="string"&&f!==""||typeof f=="number")return f=To(""+f,h.mode,y),f.return=h,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Lr:return y=mi(f.type,f.key,f.props,null,h.mode,y),y.ref=Vn(h,null,f),y.return=h,y;case cn:return f=Lo(f,h.mode,y),f.return=h,f;case _t:var k=f._init;return m(h,k(f._payload),y)}if(Jn(f)||Un(f))return f=Qt(f,h.mode,y,null),f.return=h,f;Vr(h,f)}return null}function p(h,f,y,k){var S=f!==null?f.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return S!==null?null:a(h,f,""+y,k);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Lr:return y.key===S?c(h,f,y,k):null;case cn:return y.key===S?u(h,f,y,k):null;case _t:return S=y._init,p(h,f,S(y._payload),k)}if(Jn(y)||Un(y))return S!==null?null:d(h,f,y,k,null);Vr(h,y)}return null}function v(h,f,y,k,S){if(typeof k=="string"&&k!==""||typeof k=="number")return h=h.get(y)||null,a(f,h,""+k,S);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Lr:return h=h.get(k.key===null?y:k.key)||null,c(f,h,k,S);case cn:return h=h.get(k.key===null?y:k.key)||null,u(f,h,k,S);case _t:var C=k._init;return v(h,f,y,C(k._payload),S)}if(Jn(k)||Un(k))return h=h.get(y)||null,d(f,h,k,S,null);Vr(f,k)}return null}function x(h,f,y,k){for(var S=null,C=null,E=f,P=f=0,B=null;E!==null&&P<y.length;P++){E.index>P?(B=E,E=null):B=E.sibling;var R=p(h,E,y[P],k);if(R===null){E===null&&(E=B);break}e&&E&&R.alternate===null&&t(h,E),f=o(R,f,P),C===null?S=R:C.sibling=R,C=R,E=B}if(P===y.length)return n(h,E),ne&&Wt(h,P),S;if(E===null){for(;P<y.length;P++)E=m(h,y[P],k),E!==null&&(f=o(E,f,P),C===null?S=E:C.sibling=E,C=E);return ne&&Wt(h,P),S}for(E=r(h,E);P<y.length;P++)B=v(E,h,P,y[P],k),B!==null&&(e&&B.alternate!==null&&E.delete(B.key===null?P:B.key),f=o(B,f,P),C===null?S=B:C.sibling=B,C=B);return e&&E.forEach(function(K){return t(h,K)}),ne&&Wt(h,P),S}function g(h,f,y,k){var S=Un(y);if(typeof S!="function")throw Error(N(150));if(y=S.call(y),y==null)throw Error(N(151));for(var C=S=null,E=f,P=f=0,B=null,R=y.next();E!==null&&!R.done;P++,R=y.next()){E.index>P?(B=E,E=null):B=E.sibling;var K=p(h,E,R.value,k);if(K===null){E===null&&(E=B);break}e&&E&&K.alternate===null&&t(h,E),f=o(K,f,P),C===null?S=K:C.sibling=K,C=K,E=B}if(R.done)return n(h,E),ne&&Wt(h,P),S;if(E===null){for(;!R.done;P++,R=y.next())R=m(h,R.value,k),R!==null&&(f=o(R,f,P),C===null?S=R:C.sibling=R,C=R);return ne&&Wt(h,P),S}for(E=r(h,E);!R.done;P++,R=y.next())R=v(E,h,P,R.value,k),R!==null&&(e&&R.alternate!==null&&E.delete(R.key===null?P:R.key),f=o(R,f,P),C===null?S=R:C.sibling=R,C=R);return e&&E.forEach(function(T){return t(h,T)}),ne&&Wt(h,P),S}function w(h,f,y,k){if(typeof y=="object"&&y!==null&&y.type===un&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case Lr:e:{for(var S=y.key,C=f;C!==null;){if(C.key===S){if(S=y.type,S===un){if(C.tag===7){n(h,C.sibling),f=i(C,y.props.children),f.return=h,h=f;break e}}else if(C.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===_t&&ja(S)===C.type){n(h,C.sibling),f=i(C,y.props),f.ref=Vn(h,C,y),f.return=h,h=f;break e}n(h,C);break}else t(h,C);C=C.sibling}y.type===un?(f=Qt(y.props.children,h.mode,k,y.key),f.return=h,h=f):(k=mi(y.type,y.key,y.props,null,h.mode,k),k.ref=Vn(h,f,y),k.return=h,h=k)}return s(h);case cn:e:{for(C=y.key;f!==null;){if(f.key===C)if(f.tag===4&&f.stateNode.containerInfo===y.containerInfo&&f.stateNode.implementation===y.implementation){n(h,f.sibling),f=i(f,y.children||[]),f.return=h,h=f;break e}else{n(h,f);break}else t(h,f);f=f.sibling}f=Lo(y,h.mode,k),f.return=h,h=f}return s(h);case _t:return C=y._init,w(h,f,C(y._payload),k)}if(Jn(y))return x(h,f,y,k);if(Un(y))return g(h,f,y,k);Vr(h,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,f!==null&&f.tag===6?(n(h,f.sibling),f=i(f,y),f.return=h,h=f):(n(h,f),f=To(y,h.mode,k),f.return=h,h=f),s(h)):n(h,f)}return w}var Mn=yu(!0),vu=yu(!1),zi=Bt(null),Mi=null,vn=null,al=null;function cl(){al=vn=Mi=null}function ul(e){var t=zi.current;J(zi),e._currentValue=t}function ys(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function En(e,t){Mi=e,al=vn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Pe=!0),e.firstContext=null)}function Ke(e){var t=e._currentValue;if(al!==e)if(e={context:e,memoizedValue:t,next:null},vn===null){if(Mi===null)throw Error(N(308));vn=e,Mi.dependencies={lanes:0,firstContext:e}}else vn=vn.next=e;return t}var Yt=null;function dl(e){Yt===null?Yt=[e]:Yt.push(e)}function xu(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,dl(t)):(n.next=i.next,i.next=n),t.interleaved=n,xt(e,r)}function xt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var jt=!1;function fl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function wu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function gt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function It(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,V&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,xt(e,n)}return i=r.interleaved,i===null?(t.next=t,dl(r)):(t.next=i.next,i.next=t),r.interleaved=t,xt(e,n)}function ci(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Zs(e,n)}}function Ea(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=s:o=o.next=s,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function bi(e,t,n,r){var i=e.updateQueue;jt=!1;var o=i.firstBaseUpdate,s=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var c=a,u=c.next;c.next=null,s===null?o=u:s.next=u,s=c;var d=e.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==s&&(a===null?d.firstBaseUpdate=u:a.next=u,d.lastBaseUpdate=c))}if(o!==null){var m=i.baseState;s=0,d=u=c=null,a=o;do{var p=a.lane,v=a.eventTime;if((r&p)===p){d!==null&&(d=d.next={eventTime:v,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var x=e,g=a;switch(p=t,v=n,g.tag){case 1:if(x=g.payload,typeof x=="function"){m=x.call(v,m,p);break e}m=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=g.payload,p=typeof x=="function"?x.call(v,m,p):x,p==null)break e;m=oe({},m,p);break e;case 2:jt=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[a]:p.push(a))}else v={eventTime:v,lane:p,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(u=d=v,c=m):d=d.next=v,s|=p;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;p=a,a=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(d===null&&(c=m),i.baseState=c,i.firstBaseUpdate=u,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do s|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);en|=s,e.lanes=s,e.memoizedState=m}}function Ca(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(N(191,i));i.call(r)}}}var Ar={},at=Bt(Ar),Sr=Bt(Ar),_r=Bt(Ar);function Vt(e){if(e===Ar)throw Error(N(174));return e}function pl(e,t){switch(Q(_r,t),Q(Sr,e),Q(at,Ar),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Zo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Zo(t,e)}J(at),Q(at,t)}function bn(){J(at),J(Sr),J(_r)}function ku(e){Vt(_r.current);var t=Vt(at.current),n=Zo(t,e.type);t!==n&&(Q(Sr,e),Q(at,n))}function hl(e){Sr.current===e&&(J(at),J(Sr))}var re=Bt(0);function Ai(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var zo=[];function ml(){for(var e=0;e<zo.length;e++)zo[e]._workInProgressVersionPrimary=null;zo.length=0}var ui=kt.ReactCurrentDispatcher,Mo=kt.ReactCurrentBatchConfig,qt=0,ie=null,ce=null,fe=null,Ii=!1,lr=!1,jr=0,Ip=0;function ve(){throw Error(N(321))}function gl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!et(e[n],t[n]))return!1;return!0}function yl(e,t,n,r,i,o){if(qt=o,ie=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ui.current=e===null||e.memoizedState===null?Op:Rp,e=n(r,i),lr){o=0;do{if(lr=!1,jr=0,25<=o)throw Error(N(301));o+=1,fe=ce=null,t.updateQueue=null,ui.current=Fp,e=n(r,i)}while(lr)}if(ui.current=$i,t=ce!==null&&ce.next!==null,qt=0,fe=ce=ie=null,Ii=!1,t)throw Error(N(300));return e}function vl(){var e=jr!==0;return jr=0,e}function ot(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fe===null?ie.memoizedState=fe=e:fe=fe.next=e,fe}function Ye(){if(ce===null){var e=ie.alternate;e=e!==null?e.memoizedState:null}else e=ce.next;var t=fe===null?ie.memoizedState:fe.next;if(t!==null)fe=t,ce=e;else{if(e===null)throw Error(N(310));ce=e,e={memoizedState:ce.memoizedState,baseState:ce.baseState,baseQueue:ce.baseQueue,queue:ce.queue,next:null},fe===null?ie.memoizedState=fe=e:fe=fe.next=e}return fe}function Er(e,t){return typeof t=="function"?t(e):t}function bo(e){var t=Ye(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var r=ce,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var s=i.next;i.next=o.next,o.next=s}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var a=s=null,c=null,u=o;do{var d=u.lane;if((qt&d)===d)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var m={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(a=c=m,s=r):c=c.next=m,ie.lanes|=d,en|=d}u=u.next}while(u!==null&&u!==o);c===null?s=r:c.next=a,et(r,t.memoizedState)||(Pe=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do o=i.lane,ie.lanes|=o,en|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ao(e){var t=Ye(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var s=i=i.next;do o=e(o,s.action),s=s.next;while(s!==i);et(o,t.memoizedState)||(Pe=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Su(){}function _u(e,t){var n=ie,r=Ye(),i=t(),o=!et(r.memoizedState,i);if(o&&(r.memoizedState=i,Pe=!0),r=r.queue,xl(Cu.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||fe!==null&&fe.memoizedState.tag&1){if(n.flags|=2048,Cr(9,Eu.bind(null,n,r,i,t),void 0,null),he===null)throw Error(N(349));qt&30||ju(n,t,i)}return i}function ju(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ie.updateQueue,t===null?(t={lastEffect:null,stores:null},ie.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Eu(e,t,n,r){t.value=n,t.getSnapshot=r,Nu(t)&&Pu(e)}function Cu(e,t,n){return n(function(){Nu(t)&&Pu(e)})}function Nu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!et(e,n)}catch{return!0}}function Pu(e){var t=xt(e,1);t!==null&&qe(t,e,1,-1)}function Na(e){var t=ot();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Er,lastRenderedState:e},t.queue=e,e=e.dispatch=Lp.bind(null,ie,e),[t.memoizedState,e]}function Cr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ie.updateQueue,t===null?(t={lastEffect:null,stores:null},ie.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function zu(){return Ye().memoizedState}function di(e,t,n,r){var i=ot();ie.flags|=e,i.memoizedState=Cr(1|t,n,void 0,r===void 0?null:r)}function Qi(e,t,n,r){var i=Ye();r=r===void 0?null:r;var o=void 0;if(ce!==null){var s=ce.memoizedState;if(o=s.destroy,r!==null&&gl(r,s.deps)){i.memoizedState=Cr(t,n,o,r);return}}ie.flags|=e,i.memoizedState=Cr(1|t,n,o,r)}function Pa(e,t){return di(8390656,8,e,t)}function xl(e,t){return Qi(2048,8,e,t)}function Mu(e,t){return Qi(4,2,e,t)}function bu(e,t){return Qi(4,4,e,t)}function Au(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Iu(e,t,n){return n=n!=null?n.concat([e]):null,Qi(4,4,Au.bind(null,t,e),n)}function wl(){}function $u(e,t){var n=Ye();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&gl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Tu(e,t){var n=Ye();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&gl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Lu(e,t,n){return qt&21?(et(n,t)||(n=Bc(),ie.lanes|=n,en|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Pe=!0),e.memoizedState=n)}function $p(e,t){var n=G;G=n!==0&&4>n?n:4,e(!0);var r=Mo.transition;Mo.transition={};try{e(!1),t()}finally{G=n,Mo.transition=r}}function Ou(){return Ye().memoizedState}function Tp(e,t,n){var r=Tt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Ru(e))Fu(t,n);else if(n=xu(e,t,n,r),n!==null){var i=_e();qe(n,e,r,i),Du(n,t,r)}}function Lp(e,t,n){var r=Tt(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ru(e))Fu(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var s=t.lastRenderedState,a=o(s,n);if(i.hasEagerState=!0,i.eagerState=a,et(a,s)){var c=t.interleaved;c===null?(i.next=i,dl(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}finally{}n=xu(e,t,i,r),n!==null&&(i=_e(),qe(n,e,r,i),Du(n,t,r))}}function Ru(e){var t=e.alternate;return e===ie||t!==null&&t===ie}function Fu(e,t){lr=Ii=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Du(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Zs(e,n)}}var $i={readContext:Ke,useCallback:ve,useContext:ve,useEffect:ve,useImperativeHandle:ve,useInsertionEffect:ve,useLayoutEffect:ve,useMemo:ve,useReducer:ve,useRef:ve,useState:ve,useDebugValue:ve,useDeferredValue:ve,useTransition:ve,useMutableSource:ve,useSyncExternalStore:ve,useId:ve,unstable_isNewReconciler:!1},Op={readContext:Ke,useCallback:function(e,t){return ot().memoizedState=[e,t===void 0?null:t],e},useContext:Ke,useEffect:Pa,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,di(4194308,4,Au.bind(null,t,e),n)},useLayoutEffect:function(e,t){return di(4194308,4,e,t)},useInsertionEffect:function(e,t){return di(4,2,e,t)},useMemo:function(e,t){var n=ot();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=ot();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Tp.bind(null,ie,e),[r.memoizedState,e]},useRef:function(e){var t=ot();return e={current:e},t.memoizedState=e},useState:Na,useDebugValue:wl,useDeferredValue:function(e){return ot().memoizedState=e},useTransition:function(){var e=Na(!1),t=e[0];return e=$p.bind(null,e[1]),ot().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ie,i=ot();if(ne){if(n===void 0)throw Error(N(407));n=n()}else{if(n=t(),he===null)throw Error(N(349));qt&30||ju(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,Pa(Cu.bind(null,r,o,e),[e]),r.flags|=2048,Cr(9,Eu.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=ot(),t=he.identifierPrefix;if(ne){var n=ft,r=dt;n=(r&~(1<<32-Je(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=jr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Ip++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Rp={readContext:Ke,useCallback:$u,useContext:Ke,useEffect:xl,useImperativeHandle:Iu,useInsertionEffect:Mu,useLayoutEffect:bu,useMemo:Tu,useReducer:bo,useRef:zu,useState:function(){return bo(Er)},useDebugValue:wl,useDeferredValue:function(e){var t=Ye();return Lu(t,ce.memoizedState,e)},useTransition:function(){var e=bo(Er)[0],t=Ye().memoizedState;return[e,t]},useMutableSource:Su,useSyncExternalStore:_u,useId:Ou,unstable_isNewReconciler:!1},Fp={readContext:Ke,useCallback:$u,useContext:Ke,useEffect:xl,useImperativeHandle:Iu,useInsertionEffect:Mu,useLayoutEffect:bu,useMemo:Tu,useReducer:Ao,useRef:zu,useState:function(){return Ao(Er)},useDebugValue:wl,useDeferredValue:function(e){var t=Ye();return ce===null?t.memoizedState=e:Lu(t,ce.memoizedState,e)},useTransition:function(){var e=Ao(Er)[0],t=Ye().memoizedState;return[e,t]},useMutableSource:Su,useSyncExternalStore:_u,useId:Ou,unstable_isNewReconciler:!1};function Xe(e,t){if(e&&e.defaultProps){t=oe({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function vs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:oe({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Zi={isMounted:function(e){return(e=e._reactInternals)?sn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=_e(),i=Tt(e),o=gt(r,i);o.payload=t,n!=null&&(o.callback=n),t=It(e,o,i),t!==null&&(qe(t,e,i,r),ci(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=_e(),i=Tt(e),o=gt(r,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=It(e,o,i),t!==null&&(qe(t,e,i,r),ci(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=_e(),r=Tt(e),i=gt(n,r);i.tag=2,t!=null&&(i.callback=t),t=It(e,i,r),t!==null&&(qe(t,e,r,n),ci(t,e,r))}};function za(e,t,n,r,i,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,s):t.prototype&&t.prototype.isPureReactComponent?!vr(n,r)||!vr(i,o):!0}function Bu(e,t,n){var r=!1,i=Ft,o=t.contextType;return typeof o=="object"&&o!==null?o=Ke(o):(i=be(t)?Zt:ke.current,r=t.contextTypes,o=(r=r!=null)?Pn(e,i):Ft),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Zi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function Ma(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Zi.enqueueReplaceState(t,t.state,null)}function xs(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},fl(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=Ke(o):(o=be(t)?Zt:ke.current,i.context=Pn(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(vs(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&Zi.enqueueReplaceState(i,i.state,null),bi(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function An(e,t){try{var n="",r=t;do n+=pf(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function Io(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ws(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Dp=typeof WeakMap=="function"?WeakMap:Map;function Uu(e,t,n){n=gt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Li||(Li=!0,Ms=r),ws(e,t)},n}function Wu(e,t,n){n=gt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){ws(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){ws(e,t),typeof r!="function"&&($t===null?$t=new Set([this]):$t.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function ba(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Dp;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=eh.bind(null,e,t,n),t.then(e,e))}function Aa(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Ia(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=gt(-1,1),t.tag=2,It(n,t,1))),n.lanes|=1),e)}var Bp=kt.ReactCurrentOwner,Pe=!1;function Se(e,t,n,r){t.child=e===null?vu(t,null,n,r):Mn(t,e.child,n,r)}function $a(e,t,n,r,i){n=n.render;var o=t.ref;return En(t,i),r=yl(e,t,n,r,o,i),n=vl(),e!==null&&!Pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,wt(e,t,i)):(ne&&n&&ol(t),t.flags|=1,Se(e,t,r,i),t.child)}function Ta(e,t,n,r,i){if(e===null){var o=n.type;return typeof o=="function"&&!Pl(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Hu(e,t,o,r,i)):(e=mi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var s=o.memoizedProps;if(n=n.compare,n=n!==null?n:vr,n(s,r)&&e.ref===t.ref)return wt(e,t,i)}return t.flags|=1,e=Lt(o,r),e.ref=t.ref,e.return=t,t.child=e}function Hu(e,t,n,r,i){if(e!==null){var o=e.memoizedProps;if(vr(o,r)&&e.ref===t.ref)if(Pe=!1,t.pendingProps=r=o,(e.lanes&i)!==0)e.flags&131072&&(Pe=!0);else return t.lanes=e.lanes,wt(e,t,i)}return ks(e,t,n,r,i)}function Ku(e,t,n){var r=t.pendingProps,i=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Q(wn,Ie),Ie|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Q(wn,Ie),Ie|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,Q(wn,Ie),Ie|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,Q(wn,Ie),Ie|=r;return Se(e,t,i,n),t.child}function Yu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ks(e,t,n,r,i){var o=be(n)?Zt:ke.current;return o=Pn(t,o),En(t,i),n=yl(e,t,n,r,o,i),r=vl(),e!==null&&!Pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,wt(e,t,i)):(ne&&r&&ol(t),t.flags|=1,Se(e,t,n,i),t.child)}function La(e,t,n,r,i){if(be(n)){var o=!0;Ci(t)}else o=!1;if(En(t,i),t.stateNode===null)fi(e,t),Bu(t,n,r),xs(t,n,r,i),r=!0;else if(e===null){var s=t.stateNode,a=t.memoizedProps;s.props=a;var c=s.context,u=n.contextType;typeof u=="object"&&u!==null?u=Ke(u):(u=be(n)?Zt:ke.current,u=Pn(t,u));var d=n.getDerivedStateFromProps,m=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function";m||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==r||c!==u)&&Ma(t,s,r,u),jt=!1;var p=t.memoizedState;s.state=p,bi(t,r,s,i),c=t.memoizedState,a!==r||p!==c||Me.current||jt?(typeof d=="function"&&(vs(t,n,d,r),c=t.memoizedState),(a=jt||za(t,n,a,r,p,c,u))?(m||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),s.props=r,s.state=c,s.context=u,r=a):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,wu(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:Xe(t.type,a),s.props=u,m=t.pendingProps,p=s.context,c=n.contextType,typeof c=="object"&&c!==null?c=Ke(c):(c=be(n)?Zt:ke.current,c=Pn(t,c));var v=n.getDerivedStateFromProps;(d=typeof v=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==m||p!==c)&&Ma(t,s,r,c),jt=!1,p=t.memoizedState,s.state=p,bi(t,r,s,i);var x=t.memoizedState;a!==m||p!==x||Me.current||jt?(typeof v=="function"&&(vs(t,n,v,r),x=t.memoizedState),(u=jt||za(t,n,u,r,p,x,c)||!1)?(d||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,x,c),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,x,c)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),s.props=r,s.state=x,s.context=c,r=u):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return Ss(e,t,n,r,o,i)}function Ss(e,t,n,r,i,o){Yu(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return i&&ka(t,n,!1),wt(e,t,o);r=t.stateNode,Bp.current=t;var a=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=Mn(t,e.child,null,o),t.child=Mn(t,null,a,o)):Se(e,t,a,o),t.memoizedState=r.state,i&&ka(t,n,!0),t.child}function Vu(e){var t=e.stateNode;t.pendingContext?wa(e,t.pendingContext,t.pendingContext!==t.context):t.context&&wa(e,t.context,!1),pl(e,t.containerInfo)}function Oa(e,t,n,r,i){return zn(),ll(i),t.flags|=256,Se(e,t,n,r),t.child}var _s={dehydrated:null,treeContext:null,retryLane:0};function js(e){return{baseLanes:e,cachePool:null,transitions:null}}function Xu(e,t,n){var r=t.pendingProps,i=re.current,o=!1,s=(t.flags&128)!==0,a;if((a=s)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),Q(re,i&1),e===null)return gs(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=r.children,e=r.fallback,o?(r=t.mode,o=t.child,s={mode:"hidden",children:s},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=eo(s,r,0,null),e=Qt(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=js(n),t.memoizedState=_s,e):kl(t,s));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return Up(e,t,s,r,a,i,n);if(o){o=r.fallback,s=t.mode,i=e.child,a=i.sibling;var c={mode:"hidden",children:r.children};return!(s&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Lt(i,c),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?o=Lt(a,o):(o=Qt(o,s,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,s=e.child.memoizedState,s=s===null?js(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~n,t.memoizedState=_s,r}return o=e.child,e=o.sibling,r=Lt(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function kl(e,t){return t=eo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Xr(e,t,n,r){return r!==null&&ll(r),Mn(t,e.child,null,n),e=kl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Up(e,t,n,r,i,o,s){if(n)return t.flags&256?(t.flags&=-257,r=Io(Error(N(422))),Xr(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=eo({mode:"visible",children:r.children},i,0,null),o=Qt(o,i,s,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&Mn(t,e.child,null,s),t.child.memoizedState=js(s),t.memoizedState=_s,o);if(!(t.mode&1))return Xr(e,t,s,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,o=Error(N(419)),r=Io(o,r,void 0),Xr(e,t,s,r)}if(a=(s&e.childLanes)!==0,Pe||a){if(r=he,r!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|s)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,xt(e,i),qe(r,e,i,-1))}return Nl(),r=Io(Error(N(421))),Xr(e,t,s,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=th.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,$e=At(i.nextSibling),Te=t,ne=!0,Qe=null,e!==null&&(Be[Ue++]=dt,Be[Ue++]=ft,Be[Ue++]=Jt,dt=e.id,ft=e.overflow,Jt=t),t=kl(t,r.children),t.flags|=4096,t)}function Ra(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ys(e.return,t,n)}function $o(e,t,n,r,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function Gu(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(Se(e,t,r.children,n),r=re.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ra(e,n,t);else if(e.tag===19)Ra(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Q(re,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Ai(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),$o(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ai(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}$o(t,!0,n,null,o);break;case"together":$o(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function fi(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function wt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),en|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(N(153));if(t.child!==null){for(e=t.child,n=Lt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Lt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Wp(e,t,n){switch(t.tag){case 3:Vu(t),zn();break;case 5:ku(t);break;case 1:be(t.type)&&Ci(t);break;case 4:pl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;Q(zi,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Q(re,re.current&1),t.flags|=128,null):n&t.child.childLanes?Xu(e,t,n):(Q(re,re.current&1),e=wt(e,t,n),e!==null?e.sibling:null);Q(re,re.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Gu(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Q(re,re.current),r)break;return null;case 22:case 23:return t.lanes=0,Ku(e,t,n)}return wt(e,t,n)}var Qu,Es,Zu,Ju;Qu=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Es=function(){};Zu=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Vt(at.current);var o=null;switch(n){case"input":i=Vo(e,i),r=Vo(e,r),o=[];break;case"select":i=oe({},i,{value:void 0}),r=oe({},r,{value:void 0}),o=[];break;case"textarea":i=Qo(e,i),r=Qo(e,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ji)}Jo(n,r);var s;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var a=i[u];for(s in a)a.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(dr.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in r){var c=r[u];if(a=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&c!==a&&(c!=null||a!=null))if(u==="style")if(a){for(s in a)!a.hasOwnProperty(s)||c&&c.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in c)c.hasOwnProperty(s)&&a[s]!==c[s]&&(n||(n={}),n[s]=c[s])}else n||(o||(o=[]),o.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,a=a?a.__html:void 0,c!=null&&a!==c&&(o=o||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(dr.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&Z("scroll",e),o||a===c||(o=[])):(o=o||[]).push(u,c))}n&&(o=o||[]).push("style",n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};Ju=function(e,t,n,r){n!==r&&(t.flags|=4)};function Xn(e,t){if(!ne)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function xe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Hp(e,t,n){var r=t.pendingProps;switch(sl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return xe(t),null;case 1:return be(t.type)&&Ei(),xe(t),null;case 3:return r=t.stateNode,bn(),J(Me),J(ke),ml(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Yr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Qe!==null&&(Is(Qe),Qe=null))),Es(e,t),xe(t),null;case 5:hl(t);var i=Vt(_r.current);if(n=t.type,e!==null&&t.stateNode!=null)Zu(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(N(166));return xe(t),null}if(e=Vt(at.current),Yr(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[st]=t,r[kr]=o,e=(t.mode&1)!==0,n){case"dialog":Z("cancel",r),Z("close",r);break;case"iframe":case"object":case"embed":Z("load",r);break;case"video":case"audio":for(i=0;i<er.length;i++)Z(er[i],r);break;case"source":Z("error",r);break;case"img":case"image":case"link":Z("error",r),Z("load",r);break;case"details":Z("toggle",r);break;case"input":Vl(r,o),Z("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},Z("invalid",r);break;case"textarea":Gl(r,o),Z("invalid",r)}Jo(n,o),i=null;for(var s in o)if(o.hasOwnProperty(s)){var a=o[s];s==="children"?typeof a=="string"?r.textContent!==a&&(o.suppressHydrationWarning!==!0&&Kr(r.textContent,a,e),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&Kr(r.textContent,a,e),i=["children",""+a]):dr.hasOwnProperty(s)&&a!=null&&s==="onScroll"&&Z("scroll",r)}switch(n){case"input":Or(r),Xl(r,o,!0);break;case"textarea":Or(r),Ql(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=ji)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Cc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[st]=t,e[kr]=r,Qu(e,t,!1,!1),t.stateNode=e;e:{switch(s=qo(n,r),n){case"dialog":Z("cancel",e),Z("close",e),i=r;break;case"iframe":case"object":case"embed":Z("load",e),i=r;break;case"video":case"audio":for(i=0;i<er.length;i++)Z(er[i],e);i=r;break;case"source":Z("error",e),i=r;break;case"img":case"image":case"link":Z("error",e),Z("load",e),i=r;break;case"details":Z("toggle",e),i=r;break;case"input":Vl(e,r),i=Vo(e,r),Z("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=oe({},r,{value:void 0}),Z("invalid",e);break;case"textarea":Gl(e,r),i=Qo(e,r),Z("invalid",e);break;default:i=r}Jo(n,i),a=i;for(o in a)if(a.hasOwnProperty(o)){var c=a[o];o==="style"?zc(e,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Nc(e,c)):o==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&fr(e,c):typeof c=="number"&&fr(e,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(dr.hasOwnProperty(o)?c!=null&&o==="onScroll"&&Z("scroll",e):c!=null&&Ks(e,o,c,s))}switch(n){case"input":Or(e),Xl(e,r,!1);break;case"textarea":Or(e),Ql(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Rt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?kn(e,!!r.multiple,o,!1):r.defaultValue!=null&&kn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=ji)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return xe(t),null;case 6:if(e&&t.stateNode!=null)Ju(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(N(166));if(n=Vt(_r.current),Vt(at.current),Yr(t)){if(r=t.stateNode,n=t.memoizedProps,r[st]=t,(o=r.nodeValue!==n)&&(e=Te,e!==null))switch(e.tag){case 3:Kr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Kr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[st]=t,t.stateNode=r}return xe(t),null;case 13:if(J(re),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ne&&$e!==null&&t.mode&1&&!(t.flags&128))gu(),zn(),t.flags|=98560,o=!1;else if(o=Yr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(N(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(N(317));o[st]=t}else zn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;xe(t),o=!1}else Qe!==null&&(Is(Qe),Qe=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||re.current&1?ue===0&&(ue=3):Nl())),t.updateQueue!==null&&(t.flags|=4),xe(t),null);case 4:return bn(),Es(e,t),e===null&&xr(t.stateNode.containerInfo),xe(t),null;case 10:return ul(t.type._context),xe(t),null;case 17:return be(t.type)&&Ei(),xe(t),null;case 19:if(J(re),o=t.memoizedState,o===null)return xe(t),null;if(r=(t.flags&128)!==0,s=o.rendering,s===null)if(r)Xn(o,!1);else{if(ue!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=Ai(e),s!==null){for(t.flags|=128,Xn(o,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Q(re,re.current&1|2),t.child}e=e.sibling}o.tail!==null&&le()>In&&(t.flags|=128,r=!0,Xn(o,!1),t.lanes=4194304)}else{if(!r)if(e=Ai(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Xn(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!ne)return xe(t),null}else 2*le()-o.renderingStartTime>In&&n!==1073741824&&(t.flags|=128,r=!0,Xn(o,!1),t.lanes=4194304);o.isBackwards?(s.sibling=t.child,t.child=s):(n=o.last,n!==null?n.sibling=s:t.child=s,o.last=s)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=le(),t.sibling=null,n=re.current,Q(re,r?n&1|2:n&1),t):(xe(t),null);case 22:case 23:return Cl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ie&1073741824&&(xe(t),t.subtreeFlags&6&&(t.flags|=8192)):xe(t),null;case 24:return null;case 25:return null}throw Error(N(156,t.tag))}function Kp(e,t){switch(sl(t),t.tag){case 1:return be(t.type)&&Ei(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return bn(),J(Me),J(ke),ml(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return hl(t),null;case 13:if(J(re),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(N(340));zn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return J(re),null;case 4:return bn(),null;case 10:return ul(t.type._context),null;case 22:case 23:return Cl(),null;case 24:return null;default:return null}}var Gr=!1,we=!1,Yp=typeof WeakSet=="function"?WeakSet:Set,L=null;function xn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){se(e,t,r)}else n.current=null}function Cs(e,t,n){try{n()}catch(r){se(e,t,r)}}var Fa=!1;function Vp(e,t){if(cs=ki,e=ru(),il(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var s=0,a=-1,c=-1,u=0,d=0,m=e,p=null;t:for(;;){for(var v;m!==n||i!==0&&m.nodeType!==3||(a=s+i),m!==o||r!==0&&m.nodeType!==3||(c=s+r),m.nodeType===3&&(s+=m.nodeValue.length),(v=m.firstChild)!==null;)p=m,m=v;for(;;){if(m===e)break t;if(p===n&&++u===i&&(a=s),p===o&&++d===r&&(c=s),(v=m.nextSibling)!==null)break;m=p,p=m.parentNode}m=v}n=a===-1||c===-1?null:{start:a,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(us={focusedElem:e,selectionRange:n},ki=!1,L=t;L!==null;)if(t=L,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,L=e;else for(;L!==null;){t=L;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var g=x.memoizedProps,w=x.memoizedState,h=t.stateNode,f=h.getSnapshotBeforeUpdate(t.elementType===t.type?g:Xe(t.type,g),w);h.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(N(163))}}catch(k){se(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,L=e;break}L=t.return}return x=Fa,Fa=!1,x}function ar(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&Cs(t,n,o)}i=i.next}while(i!==r)}}function Ji(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ns(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function qu(e){var t=e.alternate;t!==null&&(e.alternate=null,qu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[st],delete t[kr],delete t[ps],delete t[zp],delete t[Mp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function ed(e){return e.tag===5||e.tag===3||e.tag===4}function Da(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||ed(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ps(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ji));else if(r!==4&&(e=e.child,e!==null))for(Ps(e,t,n),e=e.sibling;e!==null;)Ps(e,t,n),e=e.sibling}function zs(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(zs(e,t,n),e=e.sibling;e!==null;)zs(e,t,n),e=e.sibling}var me=null,Ge=!1;function St(e,t,n){for(n=n.child;n!==null;)td(e,t,n),n=n.sibling}function td(e,t,n){if(lt&&typeof lt.onCommitFiberUnmount=="function")try{lt.onCommitFiberUnmount(Hi,n)}catch{}switch(n.tag){case 5:we||xn(n,t);case 6:var r=me,i=Ge;me=null,St(e,t,n),me=r,Ge=i,me!==null&&(Ge?(e=me,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):me.removeChild(n.stateNode));break;case 18:me!==null&&(Ge?(e=me,n=n.stateNode,e.nodeType===8?No(e.parentNode,n):e.nodeType===1&&No(e,n),gr(e)):No(me,n.stateNode));break;case 4:r=me,i=Ge,me=n.stateNode.containerInfo,Ge=!0,St(e,t,n),me=r,Ge=i;break;case 0:case 11:case 14:case 15:if(!we&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&Cs(n,t,s),i=i.next}while(i!==r)}St(e,t,n);break;case 1:if(!we&&(xn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){se(n,t,a)}St(e,t,n);break;case 21:St(e,t,n);break;case 22:n.mode&1?(we=(r=we)||n.memoizedState!==null,St(e,t,n),we=r):St(e,t,n);break;default:St(e,t,n)}}function Ba(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Yp),t.forEach(function(r){var i=nh.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Ve(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,s=t,a=s;e:for(;a!==null;){switch(a.tag){case 5:me=a.stateNode,Ge=!1;break e;case 3:me=a.stateNode.containerInfo,Ge=!0;break e;case 4:me=a.stateNode.containerInfo,Ge=!0;break e}a=a.return}if(me===null)throw Error(N(160));td(o,s,i),me=null,Ge=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(u){se(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)nd(t,e),t=t.sibling}function nd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ve(t,e),rt(e),r&4){try{ar(3,e,e.return),Ji(3,e)}catch(g){se(e,e.return,g)}try{ar(5,e,e.return)}catch(g){se(e,e.return,g)}}break;case 1:Ve(t,e),rt(e),r&512&&n!==null&&xn(n,n.return);break;case 5:if(Ve(t,e),rt(e),r&512&&n!==null&&xn(n,n.return),e.flags&32){var i=e.stateNode;try{fr(i,"")}catch(g){se(e,e.return,g)}}if(r&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,s=n!==null?n.memoizedProps:o,a=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&jc(i,o),qo(a,s);var u=qo(a,o);for(s=0;s<c.length;s+=2){var d=c[s],m=c[s+1];d==="style"?zc(i,m):d==="dangerouslySetInnerHTML"?Nc(i,m):d==="children"?fr(i,m):Ks(i,d,m,u)}switch(a){case"input":Xo(i,o);break;case"textarea":Ec(i,o);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var v=o.value;v!=null?kn(i,!!o.multiple,v,!1):p!==!!o.multiple&&(o.defaultValue!=null?kn(i,!!o.multiple,o.defaultValue,!0):kn(i,!!o.multiple,o.multiple?[]:"",!1))}i[kr]=o}catch(g){se(e,e.return,g)}}break;case 6:if(Ve(t,e),rt(e),r&4){if(e.stateNode===null)throw Error(N(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(g){se(e,e.return,g)}}break;case 3:if(Ve(t,e),rt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{gr(t.containerInfo)}catch(g){se(e,e.return,g)}break;case 4:Ve(t,e),rt(e);break;case 13:Ve(t,e),rt(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(jl=le())),r&4&&Ba(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(we=(u=we)||d,Ve(t,e),we=u):Ve(t,e),rt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(L=e,d=e.child;d!==null;){for(m=L=d;L!==null;){switch(p=L,v=p.child,p.tag){case 0:case 11:case 14:case 15:ar(4,p,p.return);break;case 1:xn(p,p.return);var x=p.stateNode;if(typeof x.componentWillUnmount=="function"){r=p,n=p.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(g){se(r,n,g)}}break;case 5:xn(p,p.return);break;case 22:if(p.memoizedState!==null){Wa(m);continue}}v!==null?(v.return=p,L=v):Wa(m)}d=d.sibling}e:for(d=null,m=e;;){if(m.tag===5){if(d===null){d=m;try{i=m.stateNode,u?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=m.stateNode,c=m.memoizedProps.style,s=c!=null&&c.hasOwnProperty("display")?c.display:null,a.style.display=Pc("display",s))}catch(g){se(e,e.return,g)}}}else if(m.tag===6){if(d===null)try{m.stateNode.nodeValue=u?"":m.memoizedProps}catch(g){se(e,e.return,g)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;d===m&&(d=null),m=m.return}d===m&&(d=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Ve(t,e),rt(e),r&4&&Ba(e);break;case 21:break;default:Ve(t,e),rt(e)}}function rt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(ed(n)){var r=n;break e}n=n.return}throw Error(N(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(fr(i,""),r.flags&=-33);var o=Da(e);zs(e,o,i);break;case 3:case 4:var s=r.stateNode.containerInfo,a=Da(e);Ps(e,a,s);break;default:throw Error(N(161))}}catch(c){se(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Xp(e,t,n){L=e,rd(e)}function rd(e,t,n){for(var r=(e.mode&1)!==0;L!==null;){var i=L,o=i.child;if(i.tag===22&&r){var s=i.memoizedState!==null||Gr;if(!s){var a=i.alternate,c=a!==null&&a.memoizedState!==null||we;a=Gr;var u=we;if(Gr=s,(we=c)&&!u)for(L=i;L!==null;)s=L,c=s.child,s.tag===22&&s.memoizedState!==null?Ha(i):c!==null?(c.return=s,L=c):Ha(i);for(;o!==null;)L=o,rd(o),o=o.sibling;L=i,Gr=a,we=u}Ua(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,L=o):Ua(e)}}function Ua(e){for(;L!==null;){var t=L;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:we||Ji(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!we)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Xe(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Ca(t,o,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ca(t,s,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var m=d.dehydrated;m!==null&&gr(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(N(163))}we||t.flags&512&&Ns(t)}catch(p){se(t,t.return,p)}}if(t===e){L=null;break}if(n=t.sibling,n!==null){n.return=t.return,L=n;break}L=t.return}}function Wa(e){for(;L!==null;){var t=L;if(t===e){L=null;break}var n=t.sibling;if(n!==null){n.return=t.return,L=n;break}L=t.return}}function Ha(e){for(;L!==null;){var t=L;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ji(4,t)}catch(c){se(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(c){se(t,i,c)}}var o=t.return;try{Ns(t)}catch(c){se(t,o,c)}break;case 5:var s=t.return;try{Ns(t)}catch(c){se(t,s,c)}}}catch(c){se(t,t.return,c)}if(t===e){L=null;break}var a=t.sibling;if(a!==null){a.return=t.return,L=a;break}L=t.return}}var Gp=Math.ceil,Ti=kt.ReactCurrentDispatcher,Sl=kt.ReactCurrentOwner,He=kt.ReactCurrentBatchConfig,V=0,he=null,ae=null,ge=0,Ie=0,wn=Bt(0),ue=0,Nr=null,en=0,qi=0,_l=0,cr=null,Ne=null,jl=0,In=1/0,ct=null,Li=!1,Ms=null,$t=null,Qr=!1,Pt=null,Oi=0,ur=0,bs=null,pi=-1,hi=0;function _e(){return V&6?le():pi!==-1?pi:pi=le()}function Tt(e){return e.mode&1?V&2&&ge!==0?ge&-ge:Ap.transition!==null?(hi===0&&(hi=Bc()),hi):(e=G,e!==0||(e=window.event,e=e===void 0?16:Xc(e.type)),e):1}function qe(e,t,n,r){if(50<ur)throw ur=0,bs=null,Error(N(185));zr(e,n,r),(!(V&2)||e!==he)&&(e===he&&(!(V&2)&&(qi|=n),ue===4&&Ct(e,ge)),Ae(e,r),n===1&&V===0&&!(t.mode&1)&&(In=le()+500,Gi&&Ut()))}function Ae(e,t){var n=e.callbackNode;Af(e,t);var r=wi(e,e===he?ge:0);if(r===0)n!==null&&ql(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ql(n),t===1)e.tag===0?bp(Ka.bind(null,e)):pu(Ka.bind(null,e)),Np(function(){!(V&6)&&Ut()}),n=null;else{switch(Uc(r)){case 1:n=Qs;break;case 4:n=Fc;break;case 16:n=xi;break;case 536870912:n=Dc;break;default:n=xi}n=dd(n,id.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function id(e,t){if(pi=-1,hi=0,V&6)throw Error(N(327));var n=e.callbackNode;if(Cn()&&e.callbackNode!==n)return null;var r=wi(e,e===he?ge:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Ri(e,r);else{t=r;var i=V;V|=2;var o=sd();(he!==e||ge!==t)&&(ct=null,In=le()+500,Gt(e,t));do try{Jp();break}catch(a){od(e,a)}while(!0);cl(),Ti.current=o,V=i,ae!==null?t=0:(he=null,ge=0,t=ue)}if(t!==0){if(t===2&&(i=is(e),i!==0&&(r=i,t=As(e,i))),t===1)throw n=Nr,Gt(e,0),Ct(e,r),Ae(e,le()),n;if(t===6)Ct(e,r);else{if(i=e.current.alternate,!(r&30)&&!Qp(i)&&(t=Ri(e,r),t===2&&(o=is(e),o!==0&&(r=o,t=As(e,o))),t===1))throw n=Nr,Gt(e,0),Ct(e,r),Ae(e,le()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(N(345));case 2:Ht(e,Ne,ct);break;case 3:if(Ct(e,r),(r&130023424)===r&&(t=jl+500-le(),10<t)){if(wi(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){_e(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=fs(Ht.bind(null,e,Ne,ct),t);break}Ht(e,Ne,ct);break;case 4:if(Ct(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var s=31-Je(r);o=1<<s,s=t[s],s>i&&(i=s),r&=~o}if(r=i,r=le()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Gp(r/1960))-r,10<r){e.timeoutHandle=fs(Ht.bind(null,e,Ne,ct),r);break}Ht(e,Ne,ct);break;case 5:Ht(e,Ne,ct);break;default:throw Error(N(329))}}}return Ae(e,le()),e.callbackNode===n?id.bind(null,e):null}function As(e,t){var n=cr;return e.current.memoizedState.isDehydrated&&(Gt(e,t).flags|=256),e=Ri(e,t),e!==2&&(t=Ne,Ne=n,t!==null&&Is(t)),e}function Is(e){Ne===null?Ne=e:Ne.push.apply(Ne,e)}function Qp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!et(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ct(e,t){for(t&=~_l,t&=~qi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Je(t),r=1<<n;e[n]=-1,t&=~r}}function Ka(e){if(V&6)throw Error(N(327));Cn();var t=wi(e,0);if(!(t&1))return Ae(e,le()),null;var n=Ri(e,t);if(e.tag!==0&&n===2){var r=is(e);r!==0&&(t=r,n=As(e,r))}if(n===1)throw n=Nr,Gt(e,0),Ct(e,t),Ae(e,le()),n;if(n===6)throw Error(N(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ht(e,Ne,ct),Ae(e,le()),null}function El(e,t){var n=V;V|=1;try{return e(t)}finally{V=n,V===0&&(In=le()+500,Gi&&Ut())}}function tn(e){Pt!==null&&Pt.tag===0&&!(V&6)&&Cn();var t=V;V|=1;var n=He.transition,r=G;try{if(He.transition=null,G=1,e)return e()}finally{G=r,He.transition=n,V=t,!(V&6)&&Ut()}}function Cl(){Ie=wn.current,J(wn)}function Gt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Cp(n)),ae!==null)for(n=ae.return;n!==null;){var r=n;switch(sl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ei();break;case 3:bn(),J(Me),J(ke),ml();break;case 5:hl(r);break;case 4:bn();break;case 13:J(re);break;case 19:J(re);break;case 10:ul(r.type._context);break;case 22:case 23:Cl()}n=n.return}if(he=e,ae=e=Lt(e.current,null),ge=Ie=t,ue=0,Nr=null,_l=qi=en=0,Ne=cr=null,Yt!==null){for(t=0;t<Yt.length;t++)if(n=Yt[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var s=o.next;o.next=i,r.next=s}n.pending=r}Yt=null}return e}function od(e,t){do{var n=ae;try{if(cl(),ui.current=$i,Ii){for(var r=ie.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Ii=!1}if(qt=0,fe=ce=ie=null,lr=!1,jr=0,Sl.current=null,n===null||n.return===null){ue=1,Nr=t,ae=null;break}e:{var o=e,s=n.return,a=n,c=t;if(t=ge,a.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,d=a,m=d.tag;if(!(d.mode&1)&&(m===0||m===11||m===15)){var p=d.alternate;p?(d.updateQueue=p.updateQueue,d.memoizedState=p.memoizedState,d.lanes=p.lanes):(d.updateQueue=null,d.memoizedState=null)}var v=Aa(s);if(v!==null){v.flags&=-257,Ia(v,s,a,o,t),v.mode&1&&ba(o,u,t),t=v,c=u;var x=t.updateQueue;if(x===null){var g=new Set;g.add(c),t.updateQueue=g}else x.add(c);break e}else{if(!(t&1)){ba(o,u,t),Nl();break e}c=Error(N(426))}}else if(ne&&a.mode&1){var w=Aa(s);if(w!==null){!(w.flags&65536)&&(w.flags|=256),Ia(w,s,a,o,t),ll(An(c,a));break e}}o=c=An(c,a),ue!==4&&(ue=2),cr===null?cr=[o]:cr.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var h=Uu(o,c,t);Ea(o,h);break e;case 1:a=c;var f=o.type,y=o.stateNode;if(!(o.flags&128)&&(typeof f.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&($t===null||!$t.has(y)))){o.flags|=65536,t&=-t,o.lanes|=t;var k=Wu(o,a,t);Ea(o,k);break e}}o=o.return}while(o!==null)}ad(n)}catch(S){t=S,ae===n&&n!==null&&(ae=n=n.return);continue}break}while(!0)}function sd(){var e=Ti.current;return Ti.current=$i,e===null?$i:e}function Nl(){(ue===0||ue===3||ue===2)&&(ue=4),he===null||!(en&268435455)&&!(qi&268435455)||Ct(he,ge)}function Ri(e,t){var n=V;V|=2;var r=sd();(he!==e||ge!==t)&&(ct=null,Gt(e,t));do try{Zp();break}catch(i){od(e,i)}while(!0);if(cl(),V=n,Ti.current=r,ae!==null)throw Error(N(261));return he=null,ge=0,ue}function Zp(){for(;ae!==null;)ld(ae)}function Jp(){for(;ae!==null&&!_f();)ld(ae)}function ld(e){var t=ud(e.alternate,e,Ie);e.memoizedProps=e.pendingProps,t===null?ad(e):ae=t,Sl.current=null}function ad(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Kp(n,t),n!==null){n.flags&=32767,ae=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ue=6,ae=null;return}}else if(n=Hp(n,t,Ie),n!==null){ae=n;return}if(t=t.sibling,t!==null){ae=t;return}ae=t=e}while(t!==null);ue===0&&(ue=5)}function Ht(e,t,n){var r=G,i=He.transition;try{He.transition=null,G=1,qp(e,t,n,r)}finally{He.transition=i,G=r}return null}function qp(e,t,n,r){do Cn();while(Pt!==null);if(V&6)throw Error(N(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(N(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(If(e,o),e===he&&(ae=he=null,ge=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Qr||(Qr=!0,dd(xi,function(){return Cn(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=He.transition,He.transition=null;var s=G;G=1;var a=V;V|=4,Sl.current=null,Vp(e,n),nd(n,e),xp(us),ki=!!cs,us=cs=null,e.current=n,Xp(n),jf(),V=a,G=s,He.transition=o}else e.current=n;if(Qr&&(Qr=!1,Pt=e,Oi=i),o=e.pendingLanes,o===0&&($t=null),Nf(n.stateNode),Ae(e,le()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Li)throw Li=!1,e=Ms,Ms=null,e;return Oi&1&&e.tag!==0&&Cn(),o=e.pendingLanes,o&1?e===bs?ur++:(ur=0,bs=e):ur=0,Ut(),null}function Cn(){if(Pt!==null){var e=Uc(Oi),t=He.transition,n=G;try{if(He.transition=null,G=16>e?16:e,Pt===null)var r=!1;else{if(e=Pt,Pt=null,Oi=0,V&6)throw Error(N(331));var i=V;for(V|=4,L=e.current;L!==null;){var o=L,s=o.child;if(L.flags&16){var a=o.deletions;if(a!==null){for(var c=0;c<a.length;c++){var u=a[c];for(L=u;L!==null;){var d=L;switch(d.tag){case 0:case 11:case 15:ar(8,d,o)}var m=d.child;if(m!==null)m.return=d,L=m;else for(;L!==null;){d=L;var p=d.sibling,v=d.return;if(qu(d),d===u){L=null;break}if(p!==null){p.return=v,L=p;break}L=v}}}var x=o.alternate;if(x!==null){var g=x.child;if(g!==null){x.child=null;do{var w=g.sibling;g.sibling=null,g=w}while(g!==null)}}L=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,L=s;else e:for(;L!==null;){if(o=L,o.flags&2048)switch(o.tag){case 0:case 11:case 15:ar(9,o,o.return)}var h=o.sibling;if(h!==null){h.return=o.return,L=h;break e}L=o.return}}var f=e.current;for(L=f;L!==null;){s=L;var y=s.child;if(s.subtreeFlags&2064&&y!==null)y.return=s,L=y;else e:for(s=f;L!==null;){if(a=L,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Ji(9,a)}}catch(S){se(a,a.return,S)}if(a===s){L=null;break e}var k=a.sibling;if(k!==null){k.return=a.return,L=k;break e}L=a.return}}if(V=i,Ut(),lt&&typeof lt.onPostCommitFiberRoot=="function")try{lt.onPostCommitFiberRoot(Hi,e)}catch{}r=!0}return r}finally{G=n,He.transition=t}}return!1}function Ya(e,t,n){t=An(n,t),t=Uu(e,t,1),e=It(e,t,1),t=_e(),e!==null&&(zr(e,1,t),Ae(e,t))}function se(e,t,n){if(e.tag===3)Ya(e,e,n);else for(;t!==null;){if(t.tag===3){Ya(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&($t===null||!$t.has(r))){e=An(n,e),e=Wu(t,e,1),t=It(t,e,1),e=_e(),t!==null&&(zr(t,1,e),Ae(t,e));break}}t=t.return}}function eh(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=_e(),e.pingedLanes|=e.suspendedLanes&n,he===e&&(ge&n)===n&&(ue===4||ue===3&&(ge&130023424)===ge&&500>le()-jl?Gt(e,0):_l|=n),Ae(e,t)}function cd(e,t){t===0&&(e.mode&1?(t=Dr,Dr<<=1,!(Dr&130023424)&&(Dr=4194304)):t=1);var n=_e();e=xt(e,t),e!==null&&(zr(e,t,n),Ae(e,n))}function th(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),cd(e,n)}function nh(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(N(314))}r!==null&&r.delete(t),cd(e,n)}var ud;ud=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Me.current)Pe=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Pe=!1,Wp(e,t,n);Pe=!!(e.flags&131072)}else Pe=!1,ne&&t.flags&1048576&&hu(t,Pi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;fi(e,t),e=t.pendingProps;var i=Pn(t,ke.current);En(t,n),i=yl(null,t,r,e,i,n);var o=vl();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,be(r)?(o=!0,Ci(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,fl(t),i.updater=Zi,t.stateNode=i,i._reactInternals=t,xs(t,r,e,n),t=Ss(null,t,r,!0,o,n)):(t.tag=0,ne&&o&&ol(t),Se(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(fi(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=ih(r),e=Xe(r,e),i){case 0:t=ks(null,t,r,e,n);break e;case 1:t=La(null,t,r,e,n);break e;case 11:t=$a(null,t,r,e,n);break e;case 14:t=Ta(null,t,r,Xe(r.type,e),n);break e}throw Error(N(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Xe(r,i),ks(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Xe(r,i),La(e,t,r,i,n);case 3:e:{if(Vu(t),e===null)throw Error(N(387));r=t.pendingProps,o=t.memoizedState,i=o.element,wu(e,t),bi(t,r,null,n);var s=t.memoizedState;if(r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=An(Error(N(423)),t),t=Oa(e,t,r,n,i);break e}else if(r!==i){i=An(Error(N(424)),t),t=Oa(e,t,r,n,i);break e}else for($e=At(t.stateNode.containerInfo.firstChild),Te=t,ne=!0,Qe=null,n=vu(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(zn(),r===i){t=wt(e,t,n);break e}Se(e,t,r,n)}t=t.child}return t;case 5:return ku(t),e===null&&gs(t),r=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,s=i.children,ds(r,i)?s=null:o!==null&&ds(r,o)&&(t.flags|=32),Yu(e,t),Se(e,t,s,n),t.child;case 6:return e===null&&gs(t),null;case 13:return Xu(e,t,n);case 4:return pl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Mn(t,null,r,n):Se(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Xe(r,i),$a(e,t,r,i,n);case 7:return Se(e,t,t.pendingProps,n),t.child;case 8:return Se(e,t,t.pendingProps.children,n),t.child;case 12:return Se(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,s=i.value,Q(zi,r._currentValue),r._currentValue=s,o!==null)if(et(o.value,s)){if(o.children===i.children&&!Me.current){t=wt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var a=o.dependencies;if(a!==null){s=o.child;for(var c=a.firstContext;c!==null;){if(c.context===r){if(o.tag===1){c=gt(-1,n&-n),c.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ys(o.return,n,t),a.lanes|=n;break}c=c.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(N(341));s.lanes|=n,a=s.alternate,a!==null&&(a.lanes|=n),ys(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}Se(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,En(t,n),i=Ke(i),r=r(i),t.flags|=1,Se(e,t,r,n),t.child;case 14:return r=t.type,i=Xe(r,t.pendingProps),i=Xe(r.type,i),Ta(e,t,r,i,n);case 15:return Hu(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Xe(r,i),fi(e,t),t.tag=1,be(r)?(e=!0,Ci(t)):e=!1,En(t,n),Bu(t,r,i),xs(t,r,i,n),Ss(null,t,r,!0,e,n);case 19:return Gu(e,t,n);case 22:return Ku(e,t,n)}throw Error(N(156,t.tag))};function dd(e,t){return Rc(e,t)}function rh(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function We(e,t,n,r){return new rh(e,t,n,r)}function Pl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ih(e){if(typeof e=="function")return Pl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Vs)return 11;if(e===Xs)return 14}return 2}function Lt(e,t){var n=e.alternate;return n===null?(n=We(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function mi(e,t,n,r,i,o){var s=2;if(r=e,typeof e=="function")Pl(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case un:return Qt(n.children,i,o,t);case Ys:s=8,i|=8;break;case Wo:return e=We(12,n,t,i|2),e.elementType=Wo,e.lanes=o,e;case Ho:return e=We(13,n,t,i),e.elementType=Ho,e.lanes=o,e;case Ko:return e=We(19,n,t,i),e.elementType=Ko,e.lanes=o,e;case kc:return eo(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case xc:s=10;break e;case wc:s=9;break e;case Vs:s=11;break e;case Xs:s=14;break e;case _t:s=16,r=null;break e}throw Error(N(130,e==null?e:typeof e,""))}return t=We(s,n,t,i),t.elementType=e,t.type=r,t.lanes=o,t}function Qt(e,t,n,r){return e=We(7,e,r,t),e.lanes=n,e}function eo(e,t,n,r){return e=We(22,e,r,t),e.elementType=kc,e.lanes=n,e.stateNode={isHidden:!1},e}function To(e,t,n){return e=We(6,e,null,t),e.lanes=n,e}function Lo(e,t,n){return t=We(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function oh(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=go(0),this.expirationTimes=go(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=go(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function zl(e,t,n,r,i,o,s,a,c){return e=new oh(e,t,n,a,c),t===1?(t=1,o===!0&&(t|=8)):t=0,o=We(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},fl(o),e}function sh(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:cn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function fd(e){if(!e)return Ft;e=e._reactInternals;e:{if(sn(e)!==e||e.tag!==1)throw Error(N(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(be(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(N(171))}if(e.tag===1){var n=e.type;if(be(n))return fu(e,n,t)}return t}function pd(e,t,n,r,i,o,s,a,c){return e=zl(n,r,!0,e,i,o,s,a,c),e.context=fd(null),n=e.current,r=_e(),i=Tt(n),o=gt(r,i),o.callback=t??null,It(n,o,i),e.current.lanes=i,zr(e,i,r),Ae(e,r),e}function to(e,t,n,r){var i=t.current,o=_e(),s=Tt(i);return n=fd(n),t.context===null?t.context=n:t.pendingContext=n,t=gt(o,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=It(i,t,s),e!==null&&(qe(e,i,s,o),ci(e,i,s)),s}function Fi(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Va(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ml(e,t){Va(e,t),(e=e.alternate)&&Va(e,t)}function lh(){return null}var hd=typeof reportError=="function"?reportError:function(e){console.error(e)};function bl(e){this._internalRoot=e}no.prototype.render=bl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(N(409));to(e,t,null,null)};no.prototype.unmount=bl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;tn(function(){to(null,e,null,null)}),t[vt]=null}};function no(e){this._internalRoot=e}no.prototype.unstable_scheduleHydration=function(e){if(e){var t=Kc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Et.length&&t!==0&&t<Et[n].priority;n++);Et.splice(n,0,e),n===0&&Vc(e)}};function Al(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ro(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Xa(){}function ah(e,t,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var u=Fi(s);o.call(u)}}var s=pd(t,r,e,0,null,!1,!1,"",Xa);return e._reactRootContainer=s,e[vt]=s.current,xr(e.nodeType===8?e.parentNode:e),tn(),s}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var u=Fi(c);a.call(u)}}var c=zl(e,0,!1,null,null,!1,!1,"",Xa);return e._reactRootContainer=c,e[vt]=c.current,xr(e.nodeType===8?e.parentNode:e),tn(function(){to(t,c,n,r)}),c}function io(e,t,n,r,i){var o=n._reactRootContainer;if(o){var s=o;if(typeof i=="function"){var a=i;i=function(){var c=Fi(s);a.call(c)}}to(t,s,e,i)}else s=ah(n,t,e,i,r);return Fi(s)}Wc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=qn(t.pendingLanes);n!==0&&(Zs(t,n|1),Ae(t,le()),!(V&6)&&(In=le()+500,Ut()))}break;case 13:tn(function(){var r=xt(e,1);if(r!==null){var i=_e();qe(r,e,1,i)}}),Ml(e,1)}};Js=function(e){if(e.tag===13){var t=xt(e,134217728);if(t!==null){var n=_e();qe(t,e,134217728,n)}Ml(e,134217728)}};Hc=function(e){if(e.tag===13){var t=Tt(e),n=xt(e,t);if(n!==null){var r=_e();qe(n,e,t,r)}Ml(e,t)}};Kc=function(){return G};Yc=function(e,t){var n=G;try{return G=e,t()}finally{G=n}};ts=function(e,t,n){switch(t){case"input":if(Xo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Xi(r);if(!i)throw Error(N(90));_c(r),Xo(r,i)}}}break;case"textarea":Ec(e,n);break;case"select":t=n.value,t!=null&&kn(e,!!n.multiple,t,!1)}};Ac=El;Ic=tn;var ch={usingClientEntryPoint:!1,Events:[br,hn,Xi,Mc,bc,El]},Gn={findFiberByHostInstance:Kt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},uh={bundleType:Gn.bundleType,version:Gn.version,rendererPackageName:Gn.rendererPackageName,rendererConfig:Gn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:kt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Lc(e),e===null?null:e.stateNode},findFiberByHostInstance:Gn.findFiberByHostInstance||lh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Zr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Zr.isDisabled&&Zr.supportsFiber)try{Hi=Zr.inject(uh),lt=Zr}catch{}}Oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ch;Oe.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Al(t))throw Error(N(200));return sh(e,t,null,n)};Oe.createRoot=function(e,t){if(!Al(e))throw Error(N(299));var n=!1,r="",i=hd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=zl(e,1,!1,null,null,n,!1,r,i),e[vt]=t.current,xr(e.nodeType===8?e.parentNode:e),new bl(t)};Oe.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(N(188)):(e=Object.keys(e).join(","),Error(N(268,e)));return e=Lc(t),e=e===null?null:e.stateNode,e};Oe.flushSync=function(e){return tn(e)};Oe.hydrate=function(e,t,n){if(!ro(t))throw Error(N(200));return io(null,e,t,!0,n)};Oe.hydrateRoot=function(e,t,n){if(!Al(e))throw Error(N(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",s=hd;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=pd(t,null,e,1,n??null,i,!1,o,s),e[vt]=t.current,xr(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new no(t)};Oe.render=function(e,t,n){if(!ro(t))throw Error(N(200));return io(null,e,t,!1,n)};Oe.unmountComponentAtNode=function(e){if(!ro(e))throw Error(N(40));return e._reactRootContainer?(tn(function(){io(null,null,e,!1,function(){e._reactRootContainer=null,e[vt]=null})}),!0):!1};Oe.unstable_batchedUpdates=El;Oe.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!ro(n))throw Error(N(200));if(e==null||e._reactInternals===void 0)throw Error(N(38));return io(e,t,n,!1,r)};Oe.version="18.3.1-next-f1338f8080-20240426";function md(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(md)}catch(e){console.error(e)}}md(),mc.exports=Oe;var dh=mc.exports,Ga=dh;Bo.createRoot=Ga.createRoot,Bo.hydrateRoot=Ga.hydrateRoot;function fh(e){let t=0;return()=>`${e}-${++t}`}const nn=fh("g");let ph=0;function hh(){return`g-im-${Date.now().toString(36)}-${++ph}`}let mh=0;function gd(){return`p-${Date.now().toString(36)}-${++mh}`}function gh(){return`bg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`}const $n=1,pt=50,yd=200,Tn=e=>Math.max($n,Math.min(pt,Number.isFinite(e)?Math.floor(e):$n));function $s(e=2,t=2,n=yd){const r=Tn(e),i=Tn(t),o=Array.from({length:r},(s,a)=>Array.from({length:i},(c,u)=>`r${a}c${u}-${nn()}`));return{rows:r,cols:i,cellSize:n,groups:o}}function yh(e,t,n){const r=Tn(t),i=Tn(n);if(r===e.rows&&i===e.cols)return e;const o=Array.from({length:r},(a,c)=>Array.from({length:i},(u,d)=>c<e.rows&&d<e.cols?e.groups[c][d]:`r${c}c${d}-${nn()}`)),s=new Map;for(const a of o)for(const c of a)s.set(c,(s.get(c)||0)+1);for(let a=0;a<r;a++)for(let c=0;c<i;c++){const u=o[a][c];if(s.get(u)===1)continue;const d=[];for(let m=0;m<r;m++)for(let p=0;p<i;p++)o[m][p]===u&&d.push([m,p]);if(!Ir(d))for(const[m,p]of d)o[m][p]=`r${m}c${p}-${nn()}`}return{...e,rows:r,cols:i,groups:o}}function Ir(e){if(e.length===0)return!1;let t=1/0,n=-1/0,r=1/0,i=-1/0;for(const[a,c]of e)a<t&&(t=a),a>n&&(n=a),c<r&&(r=c),c>i&&(i=c);const o=(n-t+1)*(i-r+1);if(e.length!==o)return!1;const s=new Set(e.map(([a,c])=>`${a},${c}`));for(let a=t;a<=n;a++)for(let c=r;c<=i;c++)if(!s.has(`${a},${c}`))return!1;return!0}function vd(e){if(e.length===0)return[];let t=1/0,n=-1/0,r=1/0,i=-1/0;for(const[s,a]of e)s<t&&(t=s),s>n&&(n=s),a<r&&(r=a),a>i&&(i=a);const o=[];for(let s=t;s<=n;s++)for(let a=r;a<=i;a++)o.push([s,a]);return o}function xd(e,t){if(!Ir(t))return e;const n=new Set(t.map(([s,a])=>`${s},${a}`)),r=new Set;for(const[s,a]of t)r.add(e.groups[s][a]);const i=e.groups.map(s=>s.slice()),o=nn();for(let s=0;s<e.rows;s++)for(let a=0;a<e.cols;a++)n.has(`${s},${a}`)||r.has(i[s][a])&&(i[s][a]=`r${s}c${a}-${nn()}`);for(const[s,a]of t)i[s][a]=o;return{...e,groups:i}}function wd(e,t){const n=new Set;for(const[i,o]of t)n.add(e.groups[i][o]);const r=e.groups.map(i=>i.slice());for(let i=0;i<e.rows;i++)for(let o=0;o<e.cols;o++)n.has(r[i][o])&&(r[i][o]=`r${i}c${o}-${nn()}`);return{...e,groups:r}}function oo(e){const t=new Map;for(let n=0;n<e.rows;n++)for(let r=0;r<e.cols;r++){const i=e.groups[n][r],o=t.get(i);o?(n<o.rMin&&(o.rMin=n),n>o.rMax&&(o.rMax=n),r<o.cMin&&(o.cMin=r),r>o.cMax&&(o.cMax=r)):t.set(i,{rMin:n,rMax:n,cMin:r,cMax:r})}return t}function vh(e,t){const n=new Set(t),r=e.groups.filter((o,s)=>!n.has(s));if(r.length<$n)return null;const i={...e,rows:r.length,groups:r.map(o=>o.slice())};return kd(i)}function xh(e,t){const n=new Set(t),r=e.cols-n.size;if(r<$n)return null;const i=e.groups.map(o=>o.filter((s,a)=>!n.has(a)));return kd({...e,cols:r,groups:i})}function kd(e){const t=new Map;for(const r of e.groups)for(const i of r)t.set(i,(t.get(i)||0)+1);const n=e.groups.map(r=>r.slice());for(let r=0;r<e.rows;r++)for(let i=0;i<e.cols;i++){const o=n[r][i];if(t.get(o)===1)continue;const s=[];for(let a=0;a<e.rows;a++)for(let c=0;c<e.cols;c++)n[a][c]===o&&s.push([a,c]);if(!Ir(s))for(const[a,c]of s)n[a][c]=`r${a}c${c}-${nn()}`}return{...e,groups:n}}function Ts(e,t){return e<t?`${e}||${t}`:`${t}||${e}`}function wh(e){return e.includes("||outer-")?[e.slice(0,e.indexOf("||outer-"))]:e.split("||")}function kh(e,t){var n,r,i,o,s;return((i=(r=(n=e==null?void 0:e.cells)==null?void 0:n.byPiece)==null?void 0:r[t])==null?void 0:i.hoverAnimation)??((s=(o=e==null?void 0:e.cells)==null?void 0:o.default)==null?void 0:s.hoverAnimation)??null}function Sh(e,t,n){if(!(e!=null&&e.length))return;const r=[];for(const i of e){const o=i.rect;o&&(o.rMax<t.rMin||o.rMin>t.rMax||o.cMax<t.cMin||o.cMin>t.cMax||r.push({id:i.id,src:i.src,fit:i.fit||"cover",x:o.cMin*n,y:o.rMin*n,w:(o.cMax-o.cMin+1)*n,h:(o.rMax-o.rMin+1)*n}))}return r.length?r:void 0}function Ls(e,t,n,r=[]){var c,u;const i=(c=e==null?void 0:e.byEdge)==null?void 0:c[t];let o=null;for(const d of r)if((u=e==null?void 0:e.byPiece)!=null&&u[d]){o=e.byPiece[d];break}const s=n==="inner"?e==null?void 0:e.inner:e==null?void 0:e.outer,a=e==null?void 0:e.default;return{effect:(i==null?void 0:i.effect)??(o==null?void 0:o.effect)??(s==null?void 0:s.effect)??(a==null?void 0:a.effect)??"puzzle",config:(i==null?void 0:i.config)??(o==null?void 0:o.config)??(s==null?void 0:s.config)??(a==null?void 0:a.config)}}function Fn(e){const{grid:t,edges:n,pieceColors:r,pieceContent:i,backgrounds:o}=e,s=t.cellSize,a=oo(t),c=[],u=new Map;for(const[d,m]of a){const p={id:d,x:m.cMin*s,y:m.rMin*s,w:(m.cMax-m.cMin+1)*s,h:(m.rMax-m.rMin+1)*s,label:Ch(d),fill:r==null?void 0:r[d],content:i==null?void 0:i[d],backgrounds:Sh(o,m,s),cellAnimation:kh(e,d),sides:{},sideEffects:{},sideEffectConfigs:{},edgeEffects:{},edgeEffectConfigs:{}};c.push(p),u.set(d,p)}for(const d of c){const m=a.get(d.id);for(const p of Sd){const v=_h(t,d.id,m,p);if(v.length===0){const x=`${d.id}||outer-${p}`,{effect:g,config:w}=Ls(n,x,"outer",[d.id]);if(g==="puzzle"){let h=p==="right"||p==="bottom"?"tab":"socket";w!=null&&w.inverted&&(h=h==="tab"?"socket":"tab"),d.sides[p]={count:1,type:h}}else d.sides[p]=g==="flat"?"flat":{count:1,type:"tab"};d.edgeEffects[p]=d.edgeEffects[p]||{},d.edgeEffectConfigs[p]=d.edgeEffectConfigs[p]||{},d.edgeEffects[p].__outer=g,w&&(d.edgeEffectConfigs[p].__outer=w);continue}Eh(d,p,v,n)}}return c}const Il={right:{start:e=>e.rMin,end:e=>e.rMax,atEdge:(e,t)=>e.cMax+1>=t.cols,peek:(e,t,n)=>n.groups[e][t.cMax+1]},left:{start:e=>e.rMin,end:e=>e.rMax,atEdge:e=>e.cMin===0,peek:(e,t,n)=>n.groups[e][t.cMin-1]},bottom:{start:e=>e.cMin,end:e=>e.cMax,atEdge:(e,t)=>e.rMax+1>=t.rows,peek:(e,t,n)=>n.groups[t.rMax+1][e]},top:{start:e=>e.cMin,end:e=>e.cMax,atEdge:e=>e.rMin===0,peek:(e,t,n)=>n.groups[t.rMin-1][e]}};function _h(e,t,n,r){const i=Il[r];if(i.atEdge(n,e))return[];const o=i.start(n),s=i.end(n),a=s-o+1,c=[];let u=o;for(;u<=s;){const d=i.peek(u,n,e);if(d===t){u++;continue}let m=u;for(;m+1<=s&&i.peek(m+1,n,e)===d;)m++;const p=(u-o)/a,v=(m-o+1)/a;c.push({neighborId:d,startPos:p,endPos:v,midPos:(p+v)/2}),u=m+1}return c}function jh(e){return e==="right"||e==="bottom"?"tab":"socket"}function Eh(e,t,n,r){const i=jh(t),o=n.map(s=>{const a=Ts(e.id,s.neighborId),{config:c}=Ls(r,a,"inner",[e.id,s.neighborId]);let u=i;return c!=null&&c.inverted&&(u=u==="tab"?"socket":"tab"),{pos:s.midPos,type:u}});o.length===1&&Math.abs(o[0].pos-.5)<1e-6?e.sides[t]={count:1,type:o[0].type}:e.sides[t]=o,e.edgeEffects[t]=e.edgeEffects[t]||{},e.edgeEffectConfigs[t]=e.edgeEffectConfigs[t]||{};for(const s of n){const a=Ts(e.id,s.neighborId),{effect:c,config:u}=Ls(r,a,"inner",[e.id,s.neighborId]);e.edgeEffects[t][s.neighborId]=c,u&&(e.edgeEffectConfigs[t][s.neighborId]=u)}}function Ch(e){return e.startsWith("g-")?`#${e.slice(2)}`:e.split("-")[0]}const Nh=[{side:"right",opposite:"left"},{side:"bottom",opposite:"top"}];function Ph(e){const{grid:t}=e,n=oo(t),r=new Set,i=[];for(const[o,s]of n)for(const{side:a,opposite:c}of Nh){const u=Il[a];if(u.atEdge(s,t))continue;const d=u.start(s),m=u.end(s);let p=d;for(;p<=m;){const v=u.peek(p,s,t);if(v===o){p++;continue}let x=p;for(;x+1<=m&&u.peek(x+1,s,t)===v;)x++;const g=Ts(o,v);r.has(g)||(r.add(g),i.push({pairKey:g,pieceAId:o,sideA:a,pieceBId:v,sideB:c})),p=x+1}}return i}const Sd=["top","right","bottom","left"];function zh(e){const{grid:t}=e,n=oo(t),r=[];for(const[i,o]of n)for(const s of Sd)Il[s].atEdge(o,t)&&r.push({pairKey:`${i}||outer-${s}`,pieceId:i,side:s,isOuter:!0});return r}function Os(e="Untitled"){const t=Date.now();return{id:gd(),name:e,createdAt:t,updatedAt:t,grid:$s(2,2),edges:{default:{effect:"puzzle"},inner:null,outer:null,byPiece:{},byEdge:{}},cells:{default:{hoverAnimation:null},byPiece:{}},pieceColors:{},pieceContent:{},backgrounds:[]}}const Di="hakoniwa:projects",Bi="hakoniwa:currentId",Mh="puzzle-studio:projects",bh="puzzle-studio:currentId";function Ah(){try{if(!localStorage.getItem(Di)){const e=localStorage.getItem(Mh);e&&localStorage.setItem(Di,e)}if(!localStorage.getItem(Bi)){const e=localStorage.getItem(bh);e&&localStorage.setItem(Bi,e)}}catch{}}Ah();function Xt(){try{const e=localStorage.getItem(Di);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function _d(e){try{localStorage.setItem(Di,JSON.stringify(e))}catch{}}function Ih(e){const t=Xt(),n=t.findIndex(i=>i.id===e.id),r={...e,updatedAt:Date.now()};return n>=0?t[n]=r:t.push(r),_d(t),r}function $h(e){_d(Xt().filter(t=>t.id!==e))}function Th(){try{return localStorage.getItem(Bi)}catch{return null}}function Qa(e){try{localStorage.setItem(Bi,e)}catch{}}function Lh(e){const t=JSON.stringify(e,null,2),n=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download=`${(e.name||"project").replace(/\s+/g,"-")}.json`,i.click(),URL.revokeObjectURL(r)}function Oh(e){return new Promise((t,n)=>{const r=new FileReader;r.onload=i=>{var o;try{const s=JSON.parse(i.target.result);if(!((o=s==null?void 0:s.grid)!=null&&o.groups)||!Array.isArray(s.grid.groups))throw new Error("Invalid project file");t({...s,id:gd(),updatedAt:Date.now()})}catch(s){n(s)}},r.onerror=()=>n(r.error),r.readAsText(e)})}function Rh(e){const t=n=>e(r=>r&&{...r,grid:n(r.grid)});return{setGrid({rows:n,cols:r}){t(i=>yh(i,n??i.rows,r??i.cols))},merge(n){t(r=>xd(r,n))},unmerge(n){t(r=>wd(r,n))},removeRows(n){n!=null&&n.length&&e(r=>{if(!r)return r;const i=vh(r.grid,n);return i?{...r,grid:i}:r})},removeCols(n){n!=null&&n.length&&e(r=>{if(!r)return r;const i=xh(r.grid,n);return i?{...r,grid:i}:r})},replaceGrid(n,r){e(i=>{var o;return i&&{...i,grid:n,edges:{default:((o=i.edges)==null?void 0:o.default)??{effect:"puzzle"},byEdge:{}},pieceColors:{},pieceContent:r||{}}})}}}function Fh(e){const t=n=>e(r=>r&&{...r,edges:n(r.edges)});return{setDefaultEdgeEffect(n,r){t(i=>({...i,default:{effect:n,...r?{config:r}:{}}}))},setDefaultEdgeConfig(n){t(r=>({...r,default:{...r.default,config:{...r.default.config||{},...n}}}))},setEdgeEffect(n,r,i){t(o=>({...o,byEdge:{...o.byEdge,[n]:{effect:r,...i?{config:i}:{}}}}))},setEdgeConfig(n,r){t(i=>{const o=i.byEdge[n]||{effect:i.default.effect};return{...i,byEdge:{...i.byEdge,[n]:{...o,config:{...o.config||{},...r}}}}})},clearEdgeOverride(n){t(r=>{const i={...r.byEdge};return delete i[n],{...r,byEdge:i}})},resetEdgeOverrides(){t(n=>({...n,byEdge:{},byPiece:{}}))},setLayerEffect(n,r,i){t(o=>({...o,[n]:{effect:r,...i?{config:i}:{}}}))},setLayerConfig(n,r){t(i=>{var s;const o=i[n]||{effect:((s=i.default)==null?void 0:s.effect)??"puzzle"};return{...i,[n]:{...o,config:{...o.config||{},...r}}}})},clearLayer(n){t(r=>({...r,[n]:null}))},setPieceEdgeEffect(n,r,i){t(o=>({...o,byPiece:{...o.byPiece||{},[n]:{effect:r,...i?{config:i}:{}}}}))},setPieceEdgeConfig(n,r){t(i=>{var s,a;const o=((s=i.byPiece)==null?void 0:s[n])||{effect:((a=i.default)==null?void 0:a.effect)??"puzzle"};return{...i,byPiece:{...i.byPiece||{},[n]:{...o,config:{...o.config||{},...r}}}}})},clearPieceEdgeOverride(n){t(r=>{const i={...r.byPiece||{}};return delete i[n],{...r,byPiece:i}})}}}function Dh(e){return{setPieceColor(t,n){e(r=>{if(!r)return r;const i={...r.pieceColors||{}};return n==null?delete i[t]:i[t]=n,{...r,pieceColors:i}})},clearPieceColors(){e(t=>t&&{...t,pieceColors:{}})},setPieceContent(t,n){e(r=>{if(!r)return r;const i={...r.pieceContent||{}};return n==null?delete i[t]:i[t]=n,{...r,pieceContent:i}})},updatePieceContent(t,n){e(r=>{if(!r)return r;const i={...r.pieceContent||{}},o=i[t]||{};return i[t]={...o,...n},{...r,pieceContent:i}})},clearPieceContent(){e(t=>t&&{...t,pieceContent:{}})},setDefaultCellHoverAnimation(t){const n=t==="none"?null:t;e(r=>{if(!r)return r;const i=r.cells||{default:{},byPiece:{}};return{...r,cells:{...i,default:{...i.default||{},hoverAnimation:n}}}})},setCellHoverAnimation(t,n){const r=n==="none"?null:n;e(i=>{if(!i)return i;const o=i.cells||{default:{},byPiece:{}},s={...o.byPiece||{}};return r==null?delete s[t]:s[t]={...s[t]||{},hoverAnimation:r},{...i,cells:{...o,byPiece:s}}})}}}function Bh(e){return{addBackground({src:t,rect:n,fit:r="cover"}){e(i=>{if(!i)return i;const o=[...i.backgrounds||[],{id:gh(),src:t,rect:n,fit:r}];return{...i,backgrounds:o}})},updateBackground(t,n){e(r=>{if(!r)return r;const i=(r.backgrounds||[]).map(o=>o.id===t?{...o,...n}:o);return{...r,backgrounds:i}})},removeBackground(t){e(n=>{if(!n)return n;const r=(n.backgrounds||[]).filter(i=>i.id!==t);return{...n,backgrounds:r}})}}}const Uh=500;function Wh(){const[e,t]=z.useState(Hh),[n,r]=z.useState(()=>Xt()),i=z.useRef(null);z.useEffect(()=>{if(e)return clearTimeout(i.current),i.current=setTimeout(()=>{const x=Ih(e);r(Xt()),Qa(x.id)},Uh),()=>clearTimeout(i.current)},[e]);const o=z.useMemo(()=>e?Fn(e):[],[e]),s=z.useMemo(()=>e?Ph(e):[],[e]),a=z.useMemo(()=>({...Rh(t),...Fh(t),...Dh(t),...Bh(t)}),[]),c=z.useCallback(x=>{t(g=>g&&{...g,name:x})},[]),u=z.useCallback(x=>{const w=Xt().find(h=>h.id===x);w&&(t(w),Qa(w.id))},[]),d=z.useCallback(()=>{t(Os("Untitled"))},[]),m=z.useCallback(x=>{$h(x);const g=Xt();r(g),(e==null?void 0:e.id)===x&&(g.length>0?t(g[g.length-1]):t(Os("Untitled")))},[e==null?void 0:e.id]),p=z.useCallback(()=>{e&&Lh(e)},[e]),v=z.useCallback(async x=>{const g=await Oh(x);t(g)},[]);return{project:e,projects:n,pieces:o,sharedEdges:s,setName:c,...a,openProject:u,createNew:d,removeProject:m,exportCurrent:p,importFromFile:v}}function Hh(){const e=Xt(),t=Th();if(t){const n=e.find(r=>r.id===t);if(n)return n}return e.length>0?e[e.length-1]:Os("Untitled")}const jd={frequency:.025,amplitude:12,phase:0},Qn=4;function Kh(e,t,n,r,i){const{frequency:o,amplitude:s,phase:a}=i,c=Math.min(e,t),u=Math.max(e,t),d=u-c,m=Math.ceil(c/Qn)*Qn,p=Math.floor(u/Qn)*Qn,v=[e];for(let x=m;x<=p;x+=Qn)x>c&&x<u&&v.push(x);return v.push(t),t<e?v.sort((x,g)=>g-x):v.sort((x,g)=>x-g),v.map(x=>{const g=d>0?(x-c)/d:0,h=Math.sin(g*Math.PI)*Math.sin(x*o+a)*s;return r==="x"?[x,n+h]:[n+h,x]})}function Yh(e,t,n,r,i,o,s,a,c,u){const d={...jd,...u||{}};return Kh(e,t,n,r,d).slice(1).map(([p,v])=>`L ${p} ${v}`).join(" ")}const Ed={name:"wave",displayName:"Wave",defaultConfig:jd,hidesKnobs:!0,buildSide:Yh};function Vh(e,t,n,r,i,o,s,a,c){const u=t>=e?1:-1,d=[],m=[...i].sort((p,v)=>(p.pos-v.pos)*u);for(const p of m){const v=e+p.pos*(t-e),x=r==="y"?p.type==="tab"?1:0:p.type==="tab"?0:1;if(r==="x"){const g=v;d.push(`L ${g-u*c} ${n}`),d.push(`A ${c} ${c} 0 0 ${x} ${g+u*c} ${n}`)}else{const g=v;d.push(`L ${n} ${g-u*c}`),d.push(`A ${c} ${c} 0 0 ${x} ${n} ${g+u*c}`)}}return r==="x"?d.push(`L ${t} ${n}`):d.push(`L ${n} ${t}`),d.join(" ")}const Xh={name:"puzzle",displayName:"Puzzle",hidesKnobs:!1,buildSide:Vh};function Gh(e,t,n,r,i,o,s,a,c,u){return r==="x"?`L ${t} ${n}`:`L ${n} ${t}`}const Qh={name:"straight",displayName:"Straight",hidesKnobs:!0,buildSide:Gh},Fe=.01;function Zh(e,t,n){const r=t.id;if(n==="right"){const i=t.x+t.w;return e.filter(o=>o.id!==r&&Math.abs(o.x-i)<Fe&&o.y<t.y+t.h-Fe&&o.y+o.h>t.y+Fe)}if(n==="left"){const i=t.x;return e.filter(o=>o.id!==r&&Math.abs(o.x+o.w-i)<Fe&&o.y<t.y+t.h-Fe&&o.y+o.h>t.y+Fe)}if(n==="bottom"){const i=t.y+t.h;return e.filter(o=>o.id!==r&&Math.abs(o.y-i)<Fe&&o.x<t.x+t.w-Fe&&o.x+o.w>t.x+Fe)}if(n==="top"){const i=t.y;return e.filter(o=>o.id!==r&&Math.abs(o.y+o.h-i)<Fe&&o.x<t.x+t.w-Fe&&o.x+o.w>t.x+Fe)}return[]}function so(e,t,n){const r=Zh(e,t,n);if(r.length===0)return[{startPos:0,endPos:1,neighborId:null}];const i=n==="left"||n==="right",o=i?t.h:t.w,s=i?t.y:t.x,a=r.map(d=>{const m=i?d.y:d.x,p=i?d.y+d.h:d.x+d.w,v=Math.max(s,m),x=Math.min(s+o,p);return{startPos:(v-s)/o,endPos:(x-s)/o,neighborId:d.id}}).sort((d,m)=>d.startPos-m.startPos),c=[];let u=0;for(const d of a)d.startPos>u+1e-4&&c.push({startPos:u,endPos:d.startPos,neighborId:null}),c.push(d),u=d.endPos;return u<1-1e-4&&c.push({startPos:u,endPos:1,neighborId:null}),c}function lo(e,t,n,r="puzzle"){var o,s,a;const i=n||"__outer";return((s=(o=e==null?void 0:e.edgeEffects)==null?void 0:o[t])==null?void 0:s[i])??((a=e==null?void 0:e.sideEffects)==null?void 0:a[t])??(e==null?void 0:e.effect)??r}const rn=30,Jh="flat",Ui="tab",Za="socket",ht={puzzle:Xh,wave:Ed,straight:Qh},Dn=Object.keys(ht),Ot=1e-4;function qh(e,t){return Array.from({length:e},(n,r)=>({pos:(2*r+1)/(2*e),type:t}))}function ze(e){return!e||e===Jh?[]:e===Ui?[{pos:.5,type:Ui}]:e===Za?[{pos:.5,type:Za}]:Array.isArray(e)?e.map(t=>({pos:t.pos,type:t.type})):typeof e=="object"&&e.count>0&&e.type?qh(e.count,e.type):[]}function em(e){return ze(e).some(t=>t.type===Ui)}function tr({piece:e,allPieces:t,sideName:n,startA:r,endA:i,fixed:o,axis:s,pieceStartA:a,pieceLength:c,knobs:u,outwardSign:d,defaultEffect:m,effectConfig:p}){var h,f,y,k;const v=i>=r?1:-1;if(!t){const S=((h=e.sideEffects)==null?void 0:h[n])||e.effect||m||"puzzle";return(ht[S]||ht.puzzle).buildSide(r,i,o,s,u,a,c,d,rn,p)}const x=so(t,e,n),g=v>0?x:[...x].reverse(),w=[];for(const S of g){const C=lo(e,n,S.neighborId,m),E=ht[C]||ht.puzzle,P=((y=(f=e.edgeEffectConfigs)==null?void 0:f[n])==null?void 0:y[S.neighborId??"__outer"])??((k=e.sideEffectConfigs)==null?void 0:k[n])??p,B=a+S.startPos*c,R=a+S.endPos*c,K=v>0?B:R,T=v>0?R:B,_=Math.abs(T-K),A=u.filter(F=>F.pos>S.startPos+Ot&&F.pos<S.endPos-Ot).map(F=>({pos:(F.pos-S.startPos)/Math.max(Ot,S.endPos-S.startPos),type:F.type}));w.push(E.buildSide(K,T,o,s,A,K,_,d,rn,P))}return w.join(" ")}function $l(e,t,n="puzzle",r){var d,m,p,v;const{x:i,y:o,w:s,h:a}=e,c={top:ze((d=e.sides)==null?void 0:d.top),right:ze((m=e.sides)==null?void 0:m.right),bottom:ze((p=e.sides)==null?void 0:p.bottom),left:ze((v=e.sides)==null?void 0:v.left)},u=[`M ${i} ${o}`];return u.push(tr({piece:e,allPieces:t,sideName:"top",startA:i,endA:i+s,fixed:o,axis:"x",pieceStartA:i,pieceLength:s,knobs:c.top,outwardSign:-1,defaultEffect:n,effectConfig:r})),u.push(tr({piece:e,allPieces:t,sideName:"right",startA:o,endA:o+a,fixed:i+s,axis:"y",pieceStartA:o,pieceLength:a,knobs:c.right,outwardSign:1,defaultEffect:n,effectConfig:r})),u.push(tr({piece:e,allPieces:t,sideName:"bottom",startA:i+s,endA:i,fixed:o+a,axis:"x",pieceStartA:i,pieceLength:s,knobs:c.bottom,outwardSign:1,defaultEffect:n,effectConfig:r})),u.push(tr({piece:e,allPieces:t,sideName:"left",startA:o+a,endA:o,fixed:i,axis:"y",pieceStartA:o,pieceLength:a,knobs:c.left,outwardSign:-1,defaultEffect:n,effectConfig:r})),u.push("Z"),u.join(" ")}function tm(e){var s,a,c,u;const{x:t,y:n,w:r,h:i}=e,o=[];for(const d of ze((s=e.sides)==null?void 0:s.top))o.push({side:"top",type:d.type,pos:d.pos,cx:t+d.pos*r,cy:n});for(const d of ze((a=e.sides)==null?void 0:a.right))o.push({side:"right",type:d.type,pos:d.pos,cx:t+r,cy:n+d.pos*i});for(const d of ze((c=e.sides)==null?void 0:c.bottom))o.push({side:"bottom",type:d.type,pos:d.pos,cx:t+d.pos*r,cy:n+i});for(const d of ze((u=e.sides)==null?void 0:u.left))o.push({side:"left",type:d.type,pos:d.pos,cx:t,cy:n+d.pos*i});return o}function nm(e,t,n="puzzle"){return tm(e).filter(r=>{var a,c,u;if(!t){const d=((a=e.sideEffects)==null?void 0:a[r.side])||e.effect||n;return!((c=ht[d])!=null&&c.hidesKnobs)}const o=so(t,e,r.side).find(d=>r.pos>=d.startPos-Ot&&r.pos<=d.endPos+Ot);if(!o)return!1;const s=lo(e,r.side,o.neighborId,n);return!((u=ht[s])!=null&&u.hidesKnobs)})}const Jr=rn*.5;function rm(e,t,n){return e==="top"?{hx:t,hy:n-Jr}:e==="bottom"?{hx:t,hy:n+Jr}:e==="left"?{hx:t-Jr,hy:n}:{hx:t+Jr,hy:n}}function Ja(e,t,n,r="puzzle",i){var g,w,h,f;const{x:o,y:s,w:a,h:c}=e,u={top:ze((g=e.sides)==null?void 0:g.top),right:ze((w=e.sides)==null?void 0:w.right),bottom:ze((h=e.sides)==null?void 0:h.bottom),left:ze((f=e.sides)==null?void 0:f.left)},m={top:{startA:o,endA:o+a,fixed:s,axis:"x",pieceStartA:o,pieceLength:a,knobs:u.top,outwardSign:-1,startPoint:`${o} ${s}`},right:{startA:s,endA:s+c,fixed:o+a,axis:"y",pieceStartA:s,pieceLength:c,knobs:u.right,outwardSign:1,startPoint:`${o+a} ${s}`},bottom:{startA:o+a,endA:o,fixed:s+c,axis:"x",pieceStartA:o,pieceLength:a,knobs:u.bottom,outwardSign:1,startPoint:`${o+a} ${s+c}`},left:{startA:s+c,endA:s,fixed:o,axis:"y",pieceStartA:s,pieceLength:c,knobs:u.left,outwardSign:-1,startPoint:`${o} ${s+c}`}}[n];if(!m)return"";const{startPoint:p,...v}=m,x=tr({piece:e,allPieces:t,sideName:n,...v,defaultEffect:r,effectConfig:i});return`M ${p} ${x}`}function Tl(e,t,n,r="puzzle",i){var h,f,y,k;const{x:o,y:s,w:a,h:c}=e,u=ze((h=e.sides)==null?void 0:h[n])||[],m={top:{startA:o,endA:o+a,fixed:s,axis:"x",pieceStartA:o,pieceLength:a,outwardSign:-1,startPoint:[o,s]},right:{startA:s,endA:s+c,fixed:o+a,axis:"y",pieceStartA:s,pieceLength:c,outwardSign:1,startPoint:[o+a,s]},bottom:{startA:o+a,endA:o,fixed:s+c,axis:"x",pieceStartA:o,pieceLength:a,outwardSign:1,startPoint:[o+a,s+c]},left:{startA:s+c,endA:s,fixed:o,axis:"y",pieceStartA:s,pieceLength:c,outwardSign:-1,startPoint:[o,s+c]}}[n];if(!m)return[];const p=m.endA>=m.startA?1:-1,v=t?so(t,e,n):[{startPos:0,endPos:1,neighborId:null}],x=p>0?v:[...v].reverse(),g=[];let w=m.startA;for(const S of x){const C=lo(e,n,S.neighborId,r),E=ht[C]||ht.puzzle,P=((y=(f=e.edgeEffectConfigs)==null?void 0:f[n])==null?void 0:y[S.neighborId??"__outer"])??((k=e.sideEffectConfigs)==null?void 0:k[n])??i,B=m.pieceStartA+S.startPos*m.pieceLength,R=m.pieceStartA+S.endPos*m.pieceLength,K=p>0?B:R,T=p>0?R:B,_=Math.abs(T-K),A=u.filter(D=>D.pos>S.startPos+Ot&&D.pos<S.endPos-Ot).map(D=>({pos:(D.pos-S.startPos)/Math.max(Ot,S.endPos-S.startPos),type:D.type})),F=E.buildSide(K,T,m.fixed,m.axis,A,K,_,m.outwardSign,rn,P),I=m.axis==="x"?w:m.fixed,O=m.axis==="y"?w:m.fixed,M=`M ${I} ${O} ${F}`;w+=p*_;const b=S.neighborId?im(e.id,S.neighborId):`${e.id}||outer-${n}`;g.push({neighborId:S.neighborId,pairKey:b,d:M,style:om(P)})}return g}function im(e,t){return e<t?`${e}||${t}`:`${t}||${e}`}function om(e){if(!e)return;const t={};return e.color!=null&&(t.color=e.color),e.opacity!=null&&(t.opacity=e.opacity),e.strokeWidth!=null&&(t.strokeWidth=e.strokeWidth),e.hoverAnimation!=null&&(t.hoverAnimation=e.hoverAnimation),Object.keys(t).length?t:void 0}function ao(e,t,n="puzzle",r){const{x:i,y:o,w:s,h:a,sides:c={}}=e,u=d=>{let m=0;const p=t?so(t,e,d):[{neighborId:null}];for(const v of p){const x=lo(e,d,v.neighborId,n);x==="wave"?m=Math.max(m,((r==null?void 0:r.amplitude)??12)+2):x==="puzzle"&&em(c[d])&&(m=Math.max(m,rn))}return m};return{minX:i-u("left"),minY:o-u("top"),maxX:i+s+u("right"),maxY:o+a+u("bottom")}}const sm=["top","right","bottom","left"],lm=rn*.75;function am({piece:e,path:t,allPieces:n,effect:r="puzzle",isHovered:i,isSelected:o,onHoverStart:s,onHoverEnd:a,onSelect:c,onKnobClick:u}){const{id:d,x:m,y:p,w:v,h:x,label:g,fill:w,content:h,backgrounds:f,cellAnimation:y}=e,k=nm(e,n,r),S=`pc-clip-${d}`,C=`pc-mask-${d}`,E=!!h&&(h.text||h.src),P=f&&f.length>0,B=E||P,R=y&&y!=="none"?`piece--anim-${y}`:"",K=sm.flatMap(A=>Tl(e,n,A,r)),T=K.filter(A=>A.style&&typeof A.style.opacity=="number"&&A.style.opacity<=.001),_=T.length>0;return l.jsxs("g",{className:`piece ${i?"piece--hover":""} ${o?"piece--selected":""} ${R}`.trim(),onMouseEnter:()=>s==null?void 0:s(d),onMouseLeave:()=>a==null?void 0:a(d),onClick:()=>c==null?void 0:c(d),children:[l.jsxs("defs",{children:[B&&l.jsx("clipPath",{id:S,children:l.jsx("path",{d:t})}),_&&l.jsxs("mask",{id:C,maskUnits:"userSpaceOnUse",children:[l.jsx("path",{d:t,fill:"white"}),T.map((A,F)=>{var I;return l.jsx("path",{d:A.d,fill:"none",stroke:"black",strokeWidth:((I=A.style)==null?void 0:I.strokeWidth)??1.25,strokeLinecap:"round",strokeLinejoin:"round"},`ko-${A.pairKey}-${F}`)})]})]}),l.jsxs("g",{..._?{mask:`url(#${C})`}:null,children:[l.jsx("path",{d:t,className:"piece__body",style:w?{fill:w}:void 0}),P&&l.jsx("g",{clipPath:`url(#${S})`,pointerEvents:"none",children:f.map(A=>l.jsx(cm,{bg:A},A.id))}),E&&l.jsx("g",{clipPath:`url(#${S})`,pointerEvents:"none",children:l.jsx(um,{piece:e})}),!E&&!P&&g&&l.jsx("text",{x:m+v/2,y:p+x/2,className:"piece__label",children:g})]}),l.jsx("g",{className:"piece__edges",pointerEvents:"none",children:K.map((A,F)=>{const I=A.style,O=I?{...I.color!=null?{stroke:I.color}:null,...I.opacity!=null?{strokeOpacity:I.opacity}:null,...I.strokeWidth!=null?{strokeWidth:I.strokeWidth}:null}:void 0,M=I!=null&&I.hoverAnimation&&I.hoverAnimation!=="none"?` piece__edge--anim-${I.hoverAnimation}`:"";return l.jsx("path",{d:A.d,className:`piece__edge${M}`,style:O},`${A.pairKey}-${F}`)})}),u&&k.filter(A=>A.type===Ui).map(A=>{const{hx:F,hy:I}=rm(A.side,A.cx,A.cy);return l.jsx("circle",{cx:F,cy:I,r:lm,className:"piece__knob-hit",onClick:O=>{O.stopPropagation(),u(d,A.side,A.pos)}},`${A.side}-${A.pos}`)})]})}function cm({bg:e}){const t=e.fit==="cover"?"xMidYMid slice":e.fit==="contain"?"xMidYMid meet":e.fit==="fill"?"none":"xMidYMid slice";return l.jsx("image",{href:e.src,x:e.x,y:e.y,width:e.w,height:e.h,preserveAspectRatio:t})}function um({piece:e}){const{x:t,y:n,w:r,h:i,content:o}=e,s=18;if(o.type==="image"&&o.src){const f=o.fit||"cover",y=f==="cover"?"xMidYMid slice":f==="contain"?"xMidYMid meet":f==="fill"?"none":"xMidYMid meet";return l.jsx("image",{href:o.src,x:t,y:n,width:r,height:i,preserveAspectRatio:y})}const a=o.text||"",c=o.fontSize||Math.min(r,i)/8,u=o.align||"center",d=o.color||"var(--text, #e6edf3)",m=o.fontWeight||500,p=dm(a,r-s*2,c),v=c*1.25,x=p.length*v,g=n+i/2-x/2+v*.7,w=u==="left"?t+s:u==="right"?t+r-s:t+r/2,h=u==="left"?"start":u==="right"?"end":"middle";return l.jsx("text",{className:"piece__content",style:{fontSize:c,fontWeight:m,fill:d},textAnchor:h,children:p.map((f,y)=>l.jsx("tspan",{x:w,y:g+y*v,children:f},y))})}function dm(e,t,n){const r=n*.55,i=Math.max(1,Math.floor(t/r)),o=[];for(const s of e.split(`
`)){if(s===""){o.push("");continue}const a=s.split(/\s+/);let c="";for(const u of a){const d=c?c+" "+u:u;d.length<=i?c=d:(c&&o.push(c),c=u.length<=i?u:u.slice(0,i))}c&&o.push(c)}return o}const qr=60;function ln({pieces:e,selectedId:t,effect:n="puzzle",effectConfig:r,onSelect:i,onKnobClick:o}){const[s,a]=z.useState(null),c=z.useMemo(()=>e.map(f=>({...f,path:$l(f,e,n,r),bbox:ao(f,e,n,r)})),[e,n,r]),u=z.useMemo(()=>c.reduce((f,y)=>({minX:Math.min(f.minX,y.bbox.minX),minY:Math.min(f.minY,y.bbox.minY),maxX:Math.max(f.maxX,y.bbox.maxX),maxY:Math.max(f.maxY,y.bbox.maxY)}),{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}),[c]),d=u.minX-qr,m=u.minY-qr,p=u.maxX-u.minX+qr*2,v=u.maxY-u.minY+qr*2,x=z.useMemo(()=>{if(s==null&&t==null)return c;const f=[];t!=null&&f.push(t),s!=null&&s!==t&&f.push(s);const y=c.filter(k=>!f.includes(k.id));for(const k of f){const S=c.find(C=>C.id===k);S&&y.push(S)}return y},[c,s,t]),g=f=>a(f),w=f=>a(y=>y===f?null:y),h=o?(f,y,k)=>o(f,y,k):void 0;return l.jsx("svg",{className:"puzzle-board",viewBox:`${d} ${m} ${p} ${v}`,width:p,height:v,xmlns:"http://www.w3.org/2000/svg",children:x.map(f=>l.jsx(am,{piece:f,path:f.path,allPieces:e,effect:n,isHovered:s===f.id,isSelected:t===f.id,onHoverStart:g,onHoverEnd:w,onSelect:i,onKnobClick:h},f.id))})}function pe({width:e=1200,height:t=24,frequency:n=.025,amplitude:r=6,strokeWidth:i=1.5,color:o,flip:s=!1,className:a=""}){const c=t/2,u=z.useMemo(()=>{const d=Ed.buildSide(0,e,c,"x",[],0,e,1,rn,{frequency:n,amplitude:r});return`M 0 ${c} ${d}`},[e,c,n,r]);return l.jsx("svg",{className:`wave-divider${s?" wave-divider--flip":""}${a?` ${a}`:""}`,viewBox:`0 0 ${e} ${t}`,width:"100%",height:t,preserveAspectRatio:"none","aria-hidden":"true",role:"presentation",children:l.jsx("path",{d:u,fill:"none",stroke:o||"var(--stroke-soft)",strokeWidth:i,strokeLinecap:"round",strokeLinejoin:"round",vectorEffect:"non-scaling-stroke"})})}const fm=[{id:"landing",label:"Landing",icon:"⌂"},{id:"docs",label:"Docs",icon:"?"},{id:"projects",label:"Projects",icon:"⚏"},{id:"preview",label:"Preview",icon:"◇"},{id:"grid",label:"Grid",icon:"⊞"},{id:"edges",label:"Edges",icon:"∿"},{id:"cells",label:"Cells",icon:"✎"}];function pm({page:e,onNav:t,projectName:n,theme:r,onToggleTheme:i}){const o=r==="dark";return l.jsxs(l.Fragment,{children:[l.jsxs("header",{className:"page-nav",children:[l.jsxs("div",{className:"page-nav__brand",children:[l.jsx("span",{className:"page-nav__mark","aria-hidden":!0,children:"箱"}),l.jsx("span",{className:"page-nav__title",children:"Hakoniwa"}),n&&l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"page-nav__sep","aria-hidden":!0,children:"·"}),l.jsx("span",{className:"page-nav__project",children:n})]})]}),l.jsx("button",{type:"button",className:"page-nav__theme",onClick:i,title:o?"Switch to light theme":"Switch to dark theme","aria-label":"Toggle theme",children:l.jsx("span",{"aria-hidden":!0,children:o?"☾":"☀"})}),l.jsx("nav",{className:"page-nav__tabs",children:fm.map(s=>l.jsxs("button",{type:"button",className:`page-nav__tab ${e===s.id?"page-nav__tab--active":""}`,onClick:()=>t(s.id),children:[l.jsx("span",{className:"page-nav__icon","aria-hidden":!0,children:s.icon}),l.jsx("span",{children:s.label})]},s.id))})]}),l.jsx(pe,{className:"page-nav-wave",height:10,amplitude:3,strokeWidth:1.25})]})}const qa={grid:{rows:1,cols:2,cellSize:100,groups:[["meta-hako","meta-niwa"]]},edges:{default:{effect:"wave",config:{frequency:.04,amplitude:14}},inner:null,outer:null,byPiece:{},byEdge:{}},pieceColors:{},pieceContent:{"meta-hako":{type:"text",text:"箱",fontSize:56},"meta-niwa":{type:"text",text:"庭",fontSize:56}},backgrounds:[]};function Bn({size:e="md"}){const t=z.useMemo(()=>Fn(qa),[]);return l.jsx("div",{className:`wave-brand-mark wave-brand-mark--${e}`,"aria-hidden":"true",children:l.jsx(ln,{pieces:t,effect:"wave",effectConfig:qa.edges.default.config})})}const Oo={frequency:.022,amplitude:10},hm=220;function Ll({cards:e,rows:t=1,cols:n}){const r=n??Math.ceil(e.length/t),i=z.useMemo(()=>{const v=Array.from({length:t},(x,g)=>Array.from({length:r},(w,h)=>{var y;const f=g*r+h;return((y=e[f])==null?void 0:y.id)??`meta-empty-${g}-${h}`}));return{grid:{rows:t,cols:r,cellSize:hm,groups:v},edges:{default:{effect:"wave",config:Oo},inner:null,outer:null,byPiece:{},byEdge:{}},pieceColors:{},pieceContent:{},backgrounds:[]}},[e,t,r]),o=z.useMemo(()=>Fn(i),[i]),s=60,a=z.useMemo(()=>{const v={minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};return o.reduce((x,g)=>{const w=ao(g,o,"wave",Oo);return{minX:Math.min(x.minX,w.minX),minY:Math.min(x.minY,w.minY),maxX:Math.max(x.maxX,w.maxX),maxY:Math.max(x.maxY,w.maxY)}},v)},[o]),c=a.minX-s,u=a.minY-s,d=a.maxX-a.minX+s*2,m=a.maxY-a.minY+s*2,p=z.useMemo(()=>new Map(o.map(v=>[v.id,v])),[o]);return l.jsxs("div",{className:"meta-card-row","data-cols":r,"data-rows":t,children:[l.jsx("div",{className:"meta-card-row__svg",children:l.jsx(ln,{pieces:o,effect:"wave",effectConfig:Oo})}),l.jsx("div",{className:"meta-card-row__overlay",style:{aspectRatio:`${d} / ${m}`},children:e.map(v=>{const x=p.get(v.id);if(!x)return null;const g=(x.x-c)/d*100,w=(x.y-u)/m*100,h=x.w/d*100,f=x.h/m*100,y=v.onClick?"button":"div";return l.jsxs(y,{type:v.onClick?"button":void 0,onClick:v.onClick,className:`meta-card${v.onClick?" meta-card--clickable":""}`,style:{left:`${g}%`,top:`${w}%`,width:`${h}%`,height:`${f}%`},children:[v.icon&&l.jsx("span",{className:"meta-card__icon","aria-hidden":"true",children:v.icon}),l.jsx("span",{className:"meta-card__title",children:v.title}),v.body&&l.jsx("span",{className:"meta-card__body",children:v.body})]},v.id)})})]})}const mm=[{id:"feat-build",icon:"⚏",title:"Build with pieces",body:"Drag-select cells in a grid and merge them into custom pieces."},{id:"feat-edges",icon:"✎",title:"Style every edge",body:"Three connector styles — puzzle, wave, straight — with per-edge overrides for color, opacity, and width."},{id:"feat-export",icon:"⤓",title:"Export anywhere",body:"Ship as JSON, a single self-contained React file, or a drop-in module bundle."}];function gm({onNav:e}){return l.jsxs("div",{className:"page-landing",children:[l.jsxs("section",{className:"landing-hero",children:[l.jsx(Bn,{size:"lg"}),l.jsx("p",{className:"landing-hero__sub",children:"箱庭 · built with itself"}),l.jsx("h1",{className:"landing-hero__name",children:"Hakoniwa"}),l.jsx("p",{className:"landing-hero__tagline",children:"Design layouts that snap together — puzzle tabs & sockets, soft waves, or clean straight lines. Build a grid, merge cells into pieces, fill them with text or images, and export as JSON, a single React file, or a full module bundle."}),l.jsxs("div",{className:"landing-hero__ctas",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>e("projects"),children:"Open the app →"}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:()=>e("docs"),children:"Read the docs"})]})]}),l.jsx(pe,{amplitude:8}),l.jsx("section",{className:"landing-features",children:l.jsx(Ll,{cards:mm})}),l.jsx(pe,{amplitude:8,flip:!0}),l.jsx("section",{className:"landing-foot",children:l.jsxs("button",{type:"button",className:"landing-foot__cta",onClick:()=>e("docs"),children:[l.jsx("span",{children:"Continue to docs"}),l.jsx("span",{className:"landing-foot__arrow","aria-hidden":"true",children:"↓"})]})})]})}const ym=[{id:"tl",x:0,y:0,w:160,h:160,label:"TL",sides:{right:{count:1,type:"tab"},bottom:{count:1,type:"tab"}}},{id:"tr",x:160,y:0,w:160,h:160,label:"TR",sides:{left:{count:1,type:"socket"},bottom:{count:1,type:"tab"}}},{id:"bl",x:0,y:160,w:160,h:160,label:"BL",sides:{right:{count:1,type:"tab"},top:{count:1,type:"socket"}}},{id:"br",x:160,y:160,w:160,h:160,label:"BR",sides:{left:{count:1,type:"socket"},top:{count:1,type:"socket"}}}],vm={frequency:.04,amplitude:14};function xm(){const[e,t]=z.useState("puzzle"),n=z.useMemo(()=>e==="wave"?vm:void 0,[e]);return l.jsxs("div",{className:"mini-puzzle",children:[l.jsx("div",{className:"mini-puzzle__chips",children:Dn.map(r=>l.jsx("button",{type:"button",className:`chip chip--sm ${e===r?"chip--active":""}`,onClick:()=>t(r),children:wm(r)},r))}),l.jsx("div",{className:"mini-puzzle__stage",children:l.jsx(ln,{pieces:ym,effect:e,effectConfig:n})})]})}const wm=e=>e.charAt(0).toUpperCase()+e.slice(1);function km({onNav:e}){const t=[{id:"tile-projects",icon:"⚏",title:"Projects",body:"Browse, import, and switch between saved designs.",onClick:()=>e("projects")},{id:"tile-preview",icon:"◇",title:"Preview",body:"A big read-only view of what you've built.",onClick:()=>e("preview")},{id:"tile-grid",icon:"⊞",title:"Grid",body:"Lay out the cells: drag-select, merge, color, paste images.",onClick:()=>e("grid")},{id:"tile-edit",icon:"✎",title:"Edit",body:"Two modes in one canvas: style edges or fill content.",onClick:()=>e("edit")}];return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Hakoniwa · 箱庭"}),l.jsx("h1",{className:"doc__h1",children:"Design layouts that snap together."}),l.jsx("p",{className:"doc__lede",children:"Hakoniwa is a small visual studio for grid-based layouts where every section is separated by a stylized connector — puzzle tabs & sockets, soft waves, or clean straight lines. You build a grid, merge cells into pieces, fill them with text or images, and export the result as JSON, a single React file, or a full module bundle."})]}),l.jsx(pe,{}),l.jsxs("div",{className:"doc__demo",children:[l.jsx(xm,{}),l.jsx("p",{className:"doc__demo-caption",children:"↑ Click an effect to see the connectors change live."})]}),l.jsx(Ll,{cards:t,rows:2,cols:2}),l.jsxs("div",{className:"doc__note",children:[l.jsx("strong",{children:"Already designed something?"})," ",l.jsx("button",{type:"button",className:"link-btn",onClick:()=>e("projects"),children:"Jump straight to your projects →"})]})]})}function Sm({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Projects tab"}),l.jsx("h1",{className:"doc__h1",children:"Your library of designs."}),l.jsx("p",{className:"doc__lede",children:"Every project you build is auto-saved to your browser's local storage. The Projects tab lists them as tiles; click one to open it (you'll land on the Preview page automatically)."})]}),l.jsx(pe,{}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"+ New project"})," — creates a fresh 2×2 grid."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"↑ Import JSON"})," — load a project file you (or someone else) exported earlier. Each import gets a fresh id so it won't collide with anything you already have."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Click a tile"})," — opens the project. Hover the tile to reveal a small ✕ for deletion."]}),l.jsx("li",{children:"The currently-open project gets a warm-amber ring so you can see what's active at a glance."})]}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("projects"),children:"Open Projects →"})})]})}function _m({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Preview tab"}),l.jsx("h1",{className:"doc__h1",children:"A clean view of what you've built."}),l.jsx("p",{className:"doc__lede",children:'Preview is the read-only "look at it" view. Use it to step back from the editing canvas, rename the project, jump into Grid or Edit, and export.'})]}),l.jsx(pe,{}),l.jsx("h3",{children:"What's here"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Big preview"})," on the left — same renderer as the editors, but no overlays or hit zones."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"↓ Export ▾"})," at the top of the side panel — the only place exports happen. See the ",l.jsx("button",{className:"link-btn",onClick:()=>e==null?void 0:e("docs"),children:"Exporting"})," doc for the full menu."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Click the project name"})," to rename it."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Edit grid / Edit pieces"})," jump straight into the corresponding editor."]})]}),l.jsx("div",{className:"doc__note",children:"Tip: when you open a project from the Projects tab, you land here automatically."}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("preview"),children:"Open Preview →"})})]})}const de=56,it=12,ei=3,ti=4;function jm(){const[e,t]=z.useState(()=>$s(ei,ti,de)),[n,r]=z.useState([]),i=z.useRef(null),o=z.useRef(null),s=(w,h)=>{const f=Math.floor((h-it)/de),y=Math.floor((w-it)/de);return f<0||f>=e.rows||y<0||y>=e.cols?null:[f,y]},a=(w,h,f)=>{var y,k;if(w.button===0){if(w.preventDefault(),w.shiftKey){const S=`${h},${f}`,C=new Set(n.map(([E,P])=>`${E},${P}`));C.has(S)?C.delete(S):C.add(S),r([...C].map(E=>E.split(",").map(Number)));return}o.current={start:[h,f],cur:[h,f]},r([[h,f]]),(k=(y=w.currentTarget).setPointerCapture)==null||k.call(y,w.pointerId)}};z.useEffect(()=>{const w=f=>{if(!o.current)return;const y=i.current.getBoundingClientRect(),k=s(f.clientX-y.left,f.clientY-y.top);k&&(k[0]===o.current.cur[0]&&k[1]===o.current.cur[1]||(o.current.cur=k,r(vd([o.current.start,k]))))},h=()=>{o.current=null};return window.addEventListener("pointermove",w),window.addEventListener("pointerup",h),()=>{window.removeEventListener("pointermove",w),window.removeEventListener("pointerup",h)}});const c=n.length>=2&&Ir(n),u=n.length>=1,d=()=>{c&&(t(w=>xd(w,n)),r([]))},m=()=>{u&&(t(w=>wd(w,n)),r([]))},p=()=>{t($s(ei,ti,de)),r([])},v=new Map;for(let w=0;w<e.rows;w++)for(let h=0;h<e.cols;h++){const f=e.groups[w][h],y=v.get(f);y?(w>y.rMax&&(y.rMax=w),h>y.cMax&&(y.cMax=h)):v.set(f,{rMin:w,rMax:w,cMin:h,cMax:h})}const x=ti*de+it*2,g=ei*de+it*2;return new Set(n.map(([w,h])=>`${w},${h}`)),l.jsxs("div",{className:"grid-demo",children:[l.jsxs("svg",{ref:i,className:"grid-demo__svg",width:x,height:g,viewBox:`0 0 ${x} ${g}`,children:[[...v.entries()].map(([w,h])=>{const f=h.cMax>h.cMin||h.rMax>h.rMin;return l.jsx("rect",{x:it+h.cMin*de,y:it+h.rMin*de,width:(h.cMax-h.cMin+1)*de,height:(h.rMax-h.rMin+1)*de,rx:"4",fill:f?"rgba(214, 139, 84, 0.18)":"var(--surface-2)",stroke:f?"var(--primary-2)":"var(--stroke-idle)",strokeWidth:"1.5"},w)}),n.map(([w,h])=>l.jsx("rect",{x:it+h*de+2,y:it+w*de+2,width:de-4,height:de-4,rx:"3",fill:"rgba(214, 139, 84, 0.28)",stroke:"var(--primary-2)",strokeWidth:"2",pointerEvents:"none"},`s-${w}-${h}`)),Array.from({length:ei}).flatMap((w,h)=>Array.from({length:ti},(f,y)=>l.jsx("rect",{x:it+y*de,y:it+h*de,width:de,height:de,fill:"transparent",style:{cursor:"pointer"},onPointerDown:k=>a(k,h,y)},`hit-${h}-${y}`)))]}),l.jsxs("div",{className:"grid-demo__controls",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:d,disabled:!c,children:"⊞ Merge"}),l.jsx("button",{type:"button",className:"action-btn",onClick:m,disabled:!u,children:"⊟ Unmerge"}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:p,children:"Reset"}),l.jsx("span",{className:"hint",children:n.length===0?"Drag across cells.":c?`${n.length} cells — ready to merge.`:`${n.length} cell${n.length===1?"":"s"} selected.`})]})]})}function Em({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Grid tab"}),l.jsx("h1",{className:"doc__h1",children:"Lay out the cells."}),l.jsx("p",{className:"doc__lede",children:"Build the layout: drag-select cells, merge groups into one piece, import data from a spreadsheet, and place background images that span across pieces without merging them."})]}),l.jsx(pe,{}),l.jsxs("div",{className:"doc__demo",children:[l.jsx(jm,{}),l.jsxs("p",{className:"doc__demo-caption",children:["↑ Try it: drag across cells to select, then click ",l.jsx("strong",{children:"Merge"}),"."]})]}),l.jsx("h3",{children:"Selection"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Drag"})," across cells to box-select."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Shift / Ctrl + click"})," to add or remove individual cells."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Esc"})," clears the selection."]})]}),l.jsx("h3",{children:"Merging cells into pieces"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:["The ",l.jsx("strong",{children:"Merge"})," button lights up only when the selection is a complete rectangle."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Unmerge"})," splits the selected groups back into single cells."]}),l.jsxs("li",{children:["Merged groups show their dimensions (","2×3"," etc.) right in the canvas."]})]}),l.jsx("h3",{children:"Sizing and deleting"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:["The ",l.jsx("strong",{children:"Rows / Cols"})," sliders resize the grid (max 50×50). Click any number to type it."]}),l.jsxs("li",{children:["Click a ",l.jsx("strong",{children:"row or column number"})," to delete it. Drag across multiple to delete in bulk."]})]}),l.jsx("h3",{children:"Importing spreadsheet data"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:["Use ",l.jsx("strong",{children:"Paste data"})," to drop in TSV/CSV from Excel, Google Sheets, or anywhere else."]}),l.jsx("li",{children:"Each non-empty cell becomes a piece with text content."}),l.jsxs("li",{children:[l.jsx("strong",{children:"Auto-merge horizontal runs"})," (on by default) lets each non-empty cell extend rightward over the empty cells until the next non-empty cell — perfect for landing-page-style layouts."]})]}),l.jsx("h3",{children:"Background images (multi-piece)"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:["Select cells, then either ",l.jsx("strong",{children:"Upload image"})," or ",l.jsx("strong",{children:"paste an image (Ctrl+V)"}),"."]}),l.jsx("li",{children:"The image fills the bounding rect of your selection and is sliced naturally across whichever pieces it overlaps — pieces stay separate, edges remain editable."}),l.jsxs("li",{children:["Each background can be set to ",l.jsx("em",{children:"Cover"})," / ",l.jsx("em",{children:"Contain"})," / ",l.jsx("em",{children:"Stretch"})," from the side panel."]})]}),l.jsx("h3",{children:"Coloring pieces"}),l.jsx("ul",{className:"doc__list",children:l.jsxs("li",{children:["Select cells, then pick a swatch in the ",l.jsx("strong",{children:"Color"})," card. Use the rainbow swatch to open the OS color picker."]})}),l.jsx("h3",{children:"Navigation"}),l.jsx("ul",{className:"doc__list",children:l.jsxs("li",{children:[l.jsx("strong",{children:"Scroll"})," to zoom the canvas; ",l.jsx("strong",{children:"middle-drag"})," or ",l.jsx("strong",{children:"Ctrl-drag"})," to pan."]})}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("grid"),children:"Open Grid →"})})]})}const ec=["default",...Dn];function Cm(){const[e,t]=z.useState("puzzle"),[n,r]=z.useState("default"),[i,o]=z.useState("default"),s=z.useMemo(()=>({grid:{rows:2,cols:2,cellSize:140,groups:[["a","b"],["c","d"]]},edges:{default:{effect:e,config:{amplitude:12,frequency:.04}},inner:n==="default"?null:{effect:n,config:{amplitude:12,frequency:.04}},outer:i==="default"?null:{effect:i,config:{amplitude:12,frequency:.04}},byEdge:{}},pieceColors:{},pieceContent:{},backgrounds:[]}),[e,n,i]),a=z.useMemo(()=>Fn(s),[s]);return l.jsxs("div",{className:"edge-demo",children:[l.jsxs("div",{className:"edge-demo__rows",children:[l.jsx(Ro,{label:"Default",value:e,options:Dn,onChange:t}),l.jsx(Ro,{label:"Inner",value:n,options:ec,onChange:r}),l.jsx(Ro,{label:"Outer",value:i,options:ec,onChange:o})]}),l.jsx("div",{className:"edge-demo__stage",children:l.jsx(ln,{pieces:a,effect:e,effectConfig:{amplitude:12,frequency:.04}})})]})}function Ro({label:e,value:t,options:n,onChange:r}){return l.jsxs("div",{className:"edge-demo__row",children:[l.jsx("span",{className:"edge-demo__label",children:e}),l.jsx("div",{className:"effect-chips",children:n.map(i=>l.jsx("button",{type:"button",className:`chip chip--sm ${t===i?"chip--active":""}`,onClick:()=>r(i),children:Nm(i)},i))})]})}const Nm=e=>e.charAt(0).toUpperCase()+e.slice(1);function Pm({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Edit tab"}),l.jsx("h1",{className:"doc__h1",children:"Same canvas, two modes."}),l.jsxs("p",{className:"doc__lede",children:["Edit hosts both ",l.jsx("strong",{children:"Edges"})," (style the connectors) and"," ",l.jsx("strong",{children:"Content"})," (fill pieces with text or images). The board underneath stays identical — only the side panel and the click target change as you switch modes."]})]}),l.jsx(pe,{}),l.jsxs("div",{className:"doc__demo",children:[l.jsx(Cm,{}),l.jsx("p",{className:"doc__demo-caption",children:"↑ Try the priority chain: pick a default, then override an inner or outer edge to see how the chain resolves."})]}),l.jsx("h3",{children:"Edges mode"}),l.jsxs("p",{children:["Edges resolve through a three-layer priority chain — ",l.jsx("em",{children:"highest priority first"}),":"]}),l.jsxs("ol",{className:"doc__list doc__list--ordered",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Per-edge override"})," — click an edge in the canvas to give it its own effect & config. Shift-click to multi-select and edit them together."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Inner edges"})," / ",l.jsx("strong",{children:"Outer edges"}),' — set a single override that applies to every shared (or every outer) edge unless a per-edge override wins. Use the "use default" link to clear the layer.']}),l.jsxs("li",{children:[l.jsx("strong",{children:"Default effect"})," — applied to every edge that has no override above. The starting point."]})]}),l.jsxs("p",{children:["Three effects ship: ",l.jsx("strong",{children:"Puzzle"})," (interlocking tabs/sockets — invertible),"," ",l.jsx("strong",{children:"Wave"})," (sinusoidal, with frequency + amplitude), and"," ",l.jsx("strong",{children:"Straight"})," (clean line)."]}),l.jsx("h3",{children:"Stroke styling"}),l.jsx("p",{children:"Every effect carries three style fields that cascade through the same Default → Inner/Outer → per-edge chain:"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Color"})," — any color from the picker. Hit ",l.jsx("em",{children:"reset"})," to fall back to the theme stroke."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Opacity"})," — 0 to 100%. ",l.jsx("em",{children:"Transparent ≠ no color:"})," a transparent stroke shows the page background through the gap, while a colorless stroke just inherits the theme."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Width"})," — 0 to 10px. Use 0 to hide the outline entirely without changing geometry."]})]}),l.jsx("h3",{children:"Content mode"}),l.jsxs("ul",{className:"doc__list",children:[l.jsx("li",{children:"Click any piece to select it."}),l.jsxs("li",{children:["Choose ",l.jsx("strong",{children:"Empty"}),", ",l.jsx("strong",{children:"Text"}),", or ",l.jsx("strong",{children:"Image"}),"."]}),l.jsxs("li",{children:["Text supports alignment, size, and color. Image supports ",l.jsx("em",{children:"Cover / Contain / Stretch"}),"."]}),l.jsx("li",{children:"Everything is clipped to the piece's outline — text and images respect the puzzle shape."})]}),l.jsx("h3",{children:"Navigation"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Scroll"})," to zoom; ",l.jsx("strong",{children:"middle-drag"})," or ",l.jsx("strong",{children:"Ctrl-drag"})," to pan."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Esc"})," clears the selection in the active mode."]})]}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("edit"),children:"Open Edit →"})})]})}const zm=[{id:"export-json",title:"JSON",body:"Re-importable project state. Drop it back into Hakoniwa via Projects → Import to keep editing."},{id:"export-jsx",title:"Single-file React",body:"One self-contained .jsx with paths precomputed and content baked in. Drop into any React 18+ project — zero deps. Bundled with a README in a small ZIP."},{id:"export-zip",title:"Module bundle (ZIP)",body:"The whole portable puzzle/ folder, your project.json, a wrapper component, a standalone compileProject.js, and a README."}];function Mm({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Exporting"}),l.jsx("h1",{className:"doc__h1",children:"Three ways to ship your puzzle."}),l.jsxs("p",{className:"doc__lede",children:["Open the Preview page and click ",l.jsx("strong",{children:"↓ Export ▾"})," at the top of the side panel. You'll get a menu with three options."]})]}),l.jsx(pe,{}),l.jsx(Ll,{cards:zm}),l.jsx("div",{className:"doc__note",children:"The ZIP encoder is hand-rolled (~80 lines, no compression) so the studio ships with no third-party dependencies."}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("preview"),children:"Open Preview to export →"})})]})}const Fo=[{id:"intro",label:"Welcome",Comp:km},{id:"projects",label:"Projects tab",Comp:Sm},{id:"preview",label:"Preview tab",Comp:_m},{id:"grid",label:"Grid tab",Comp:Em},{id:"edit",label:"Edit tab",Comp:Pm},{id:"export",label:"Exporting",Comp:Mm}];function bm({onNav:e}){const[t,n]=z.useState("intro"),r=(Fo.find(i=>i.id===t)||Fo[0]).Comp;return l.jsxs("div",{className:"page-docs",children:[l.jsxs("aside",{className:"docs-nav",children:[l.jsx("div",{className:"docs-nav__brand",children:l.jsx(Bn,{size:"sm"})}),l.jsx("h2",{className:"docs-nav__title",children:"Documentation"}),l.jsx("nav",{children:l.jsx("ul",{className:"docs-nav__list",children:Fo.map(i=>l.jsx("li",{children:l.jsx("button",{type:"button",className:`docs-nav__item ${t===i.id?"docs-nav__item--active":""}`,onClick:()=>n(i.id),children:i.label})},i.id))})}),l.jsx("div",{className:"docs-nav__cta",children:l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>e("projects"),children:"Open the app →"})})]}),l.jsx("article",{className:"docs-body",children:l.jsx(r,{onNav:e})})]})}const Am=["top","right","bottom","left"],ni=60;function Cd({project:e,maxSize:t=180}){const{vbX:n,vbY:r,vbW:i,vbH:o,items:s}=z.useMemo(()=>{var g,w,h,f;if(!e)return{vbX:0,vbY:0,vbW:1,vbH:1,items:[]};const d=Fn(e);if(d.length===0)return{vbX:0,vbY:0,vbW:1,vbH:1,items:[]};const m=((w=(g=e.edges)==null?void 0:g.default)==null?void 0:w.effect)??"puzzle",p=(f=(h=e.edges)==null?void 0:h.default)==null?void 0:f.config,v=d.map(y=>({...y,d:$l(y,d,m,p),bbox:ao(y,d,m,p),segments:Am.flatMap(k=>Tl(y,d,k,m,p))})),x=v.reduce((y,k)=>({minX:Math.min(y.minX,k.bbox.minX),minY:Math.min(y.minY,k.bbox.minY),maxX:Math.max(y.maxX,k.bbox.maxX),maxY:Math.max(y.maxY,k.bbox.maxY)}),{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0});return{vbX:x.minX-ni,vbY:x.minY-ni,vbW:x.maxX-x.minX+ni*2,vbH:x.maxY-x.minY+ni*2,items:v}},[e]);if(!e||s.length===0)return l.jsx("div",{className:"preview-svg preview-svg--empty",children:"empty"});const a=i/o,c=a>=1?t:t*a,u=a>=1?t/a:t;return l.jsxs("svg",{className:"preview-svg",width:c,height:u,viewBox:`${n} ${r} ${i} ${o}`,xmlns:"http://www.w3.org/2000/svg",children:[l.jsx("defs",{children:s.map(d=>d.backgrounds&&d.backgrounds.length>0||d.content&&(d.content.text||d.content.src)?l.jsx("clipPath",{id:`pv-clip-${Pd(d.id)}`,children:l.jsx("path",{d:d.d})},d.id):null)}),s.map(d=>l.jsx(Im,{piece:d},d.id))]})}function Im({piece:e}){const{id:t,d:n,fill:r,content:i,backgrounds:o,segments:s,x:a,y:c,w:u,h:d,label:m}=e,p=o&&o.length>0,v=!!i&&(i.text||i.src),x=p||v?`url(#pv-clip-${Pd(t)})`:void 0;return l.jsxs("g",{children:[l.jsx("path",{d:n,fill:r||"var(--surface-2)",stroke:"none"}),p&&l.jsx("g",{clipPath:x,children:o.map(g=>l.jsx("image",{href:g.src,x:g.x,y:g.y,width:g.w,height:g.h,preserveAspectRatio:Nd(g.fit)},g.id))}),v&&l.jsx("g",{clipPath:x,children:l.jsx($m,{x:a,y:c,w:u,h:d,content:i})}),!v&&!p&&m&&l.jsx("text",{x:a+u/2,y:c+d/2,textAnchor:"middle",dominantBaseline:"central",fill:"var(--text-dim)",fontSize:Math.max(10,Math.min(u,d)/8),fontFamily:"inherit",children:m}),(s||[]).map((g,w)=>{const h=g.style;return l.jsx("path",{d:g.d,fill:"none",stroke:(h==null?void 0:h.color)??"var(--stroke-soft)",strokeOpacity:(h==null?void 0:h.opacity)??1,strokeWidth:(h==null?void 0:h.strokeWidth)??1.5,strokeLinejoin:"round",strokeLinecap:"round"},`${g.pairKey}-${w}`)})]})}function $m({x:e,y:t,w:n,h:r,content:i}){if(i.type==="image"&&i.src)return l.jsx("image",{href:i.src,x:e,y:t,width:n,height:r,preserveAspectRatio:Nd(i.fit)});const o=i.text||"",s=i.fontSize||Math.min(n,r)/8,a=i.align||"center",c=i.color||"var(--text)",u=i.fontWeight||500,d=18,m=Tm(o,n-d*2,s),p=s*1.25,v=t+r/2-m.length*p/2+p*.7,x=a==="left"?e+d:a==="right"?e+n-d:e+n/2,g=a==="left"?"start":a==="right"?"end":"middle";return l.jsx("text",{textAnchor:g,fill:c,fontSize:s,fontWeight:u,fontFamily:"inherit",children:m.map((w,h)=>l.jsx("tspan",{x,y:v+h*p,children:w},h))})}function Nd(e){return e==="cover"?"xMidYMid slice":e==="contain"?"xMidYMid meet":e==="fill"?"none":"xMidYMid slice"}function Tm(e,t,n){const r=n*.55,i=Math.max(1,Math.floor(t/r)),o=[];for(const s of e.split(`
`)){if(s===""){o.push("");continue}const a=s.split(/\s+/);let c="";for(const u of a){const d=c?c+" "+u:u;d.length<=i?c=d:(c&&o.push(c),c=u.length<=i?u:u.slice(0,i))}c&&o.push(c)}return o}function Pd(e){return String(e).replace(/[^a-zA-Z0-9_-]/g,"_")}function zd(e){const t=new Date(e),n=(Date.now()-e)/1e3;return n<60?"just now":n<3600?`${Math.floor(n/60)}m ago`:n<86400?`${Math.floor(n/3600)}h ago`:t.toLocaleDateString()}function Lm({project:e,onNav:t}){const{project:n,projects:r,openProject:i,createNew:o,removeProject:s,importFromFile:a}=e,c=z.useRef(null),u=async m=>{var v;const p=(v=m.target.files)==null?void 0:v[0];if(m.target.value="",!!p)try{await a(p)}catch(x){alert("Could not import: "+x.message)}},d=m=>{i(m),t("preview")};return l.jsx("div",{className:"page-projects",children:l.jsxs("section",{className:"projects-section",children:[l.jsx("div",{className:"projects-section__brand",children:l.jsx(Bn,{size:"md"})}),l.jsxs("div",{className:"projects-section__head",children:[l.jsx("h2",{className:"projects-section__title",children:"Your Projects"}),l.jsxs("div",{className:"projects-section__actions",children:[l.jsx("input",{ref:c,type:"file",accept:".json",hidden:!0,onChange:u}),l.jsx("button",{type:"button",className:"action-btn",onClick:()=>{var m;return(m=c.current)==null?void 0:m.click()},children:"↑ Import JSON"})]})]}),l.jsx(pe,{amplitude:6}),l.jsxs("div",{className:"project-grid",children:[l.jsxs("button",{type:"button",className:"project-tile project-tile--new",onClick:()=>{o(),t("preview")},children:[l.jsx("div",{className:"project-tile__plus",children:"+"}),l.jsx("div",{className:"project-tile__name",children:"New project"})]}),[...r].sort((m,p)=>p.updatedAt-m.updatedAt).map(m=>{const p=m.id===(n==null?void 0:n.id);return l.jsxs("div",{className:`project-tile ${p?"project-tile--current":""}`,children:[l.jsxs("button",{type:"button",className:"project-tile__open",onClick:()=>d(m.id),children:[l.jsx("div",{className:"project-tile__preview",children:l.jsx(Cd,{project:m,maxSize:140})}),l.jsx("div",{className:"project-tile__name",children:m.name||"Untitled"}),l.jsxs("div",{className:"project-tile__meta",children:[m.grid.rows,"×",m.grid.cols," · ",zd(m.updatedAt)]})]}),l.jsx("button",{type:"button",className:"project-tile__del",onClick:()=>{confirm(`Delete "${m.name}"?`)&&s(m.id)},title:"Delete",children:"✕"})]},m.id)})]})]})})}const Om="# src/puzzle — Rendering Module\n\nSelf-contained rendering module. **No imports from outside this folder.** Drop into any React 18+ project. Also shipped verbatim by the studio's \"Module bundle (ZIP)\" export.\n\n## Public API (`index.js`)\n- `PuzzleBoard` — root `<svg>` rendering all pieces.\n- `PuzzlePiece` — single piece as `<g>`. Body = fill-only `<path>`; outline = one `<path>` per segment (so each edge can carry its own color / opacity / width). Optional content (text/image) and backgrounds are clipped to the body path.\n- `computePiecePath(piece, allPieces, effect, config)` — full closed SVG path string (the body).\n- `computeSidePath(piece, allPieces, side, effect, config)` — one continuous side path (used by edge editor overlay).\n- `computeSideSegments(piece, allPieces, side, effect, config)` — `[{ pairKey, neighborId, d, style }]` per segment, each `d` is M-prefixed and standalone. Used by `PuzzlePiece` to render per-edge styled strokes.\n- `computePieceBbox(piece, allPieces, effect, config)` — bounding box including knob/wave extent.\n- `EFFECT_NAMES` — `['puzzle', 'wave', 'straight']`.\n- Exports `KNOB_R`, `EFFECTS`, `normalizeSide`, etc. for advanced use.\n\n## Key Constants\n- `KNOB_R = 30` — pieces need at least `2 * KNOB_R = 60px` per side.\n\n## Effects (`effects/`)\nEach effect exports `{ buildSide, hidesKnobs? }`. `buildSide` returns an SVG path fragment (no leading `M`). Currently: `puzzleEffect`, `waveEffect`, `straightEffect`.\n\n## Piece Shape (used by `PuzzleBoard`)\n```js\n{\n  id, x, y, w, h, label?,\n  fill?: string,                                // optional override fill color\n  content?: ContentSpec,                        // optional text/image content\n  backgrounds?: Array<{ id, src, fit, x, y, w, h }>,  // multi-piece images (px space)\n  sides: { top?, right?, bottom?, left? },      // Side = 'flat' | {count,type} | [{pos,type}]\n  edgeEffects:        { [side]: { [neighborId]: effectName } },\n  edgeEffectConfigs:  { [side]: { [neighborId]: config } },\n}\n```\n\n## Render layers (per piece, in z-order)\n1. **Body** (`.piece__body`) — fill-only closed path. The fill is the piece color (or theme `--puzzle-fill`).\n2. **Backgrounds** (optional) — multi-piece images, clipped to the body. Same image rendered in every overlapping piece; SVG clipping does the slicing for free.\n3. **Content** (optional) — text or image, clipped to the body.\n4. **Edges** (`.piece__edge`) — one `<path>` per segment, drawn last so the outline sits on top. Each segment carries its own resolved `{ color, opacity, strokeWidth }` from the edge config, with theme defaults via CSS vars.\n\nFor shared edges, both pieces render their own copy of the segment stroke. Because the resolution chain is symmetric (same `pairKey` resolves the same way from either side), the two copies overlap exactly — no visible double-stroke.\n\n## Content rendering details\n- `<defs><clipPath><path d={body}/></clipPath></defs>` per piece (created when content or backgrounds exist).\n- **Backgrounds**: `<image>` at the full background coords; clipPath cuts each to the piece's outline.\n- **Text**: greedy word-wrap + `<text><tspan>` per line.\n- **Image content**: `<image preserveAspectRatio>` mapped from `fit` (`cover` → `slice`, `contain`/`none` → `meet`, `fill` → `none`).\n",Rm=`/*
 * Puzzle board styles.
 *
 * These rules use a few CSS custom properties so the module blends into
 * whatever design system is consuming it. Each one has a fallback, so it
 * works unmodified in a vanilla React app too. Override any variable on
 * \`:root\` (or an ancestor) to re-theme:
 *
 *   --puzzle-fill, --puzzle-fill-hover, --puzzle-fill-selected
 *   --puzzle-stroke, --puzzle-stroke-hover
 *   --puzzle-label, --puzzle-label-selected
 *
 * Each piece is rendered as:
 *   .piece__body  — fill only (the closed outline, no stroke)
 *   .piece__edge  — stroke only, one path per segment, so each segment can
 *                   have its own color / opacity / stroke-width via inline
 *                   style. Falls back to --puzzle-stroke when nothing is set.
 *
 * Legacy \`.piece__path\` is kept for backward compat with anyone styling the
 * old single-path piece.
 */

.puzzle-board {
  display: block;
  overflow: visible;
}

.piece {
  cursor: pointer;
}

/* Body: fill only. The visible outline comes from .piece__edge. */
.piece__body {
  fill: var(--puzzle-fill, var(--surface, #161b22));
  stroke: none;
  transition: fill 150ms ease;
}

.piece--hover .piece__body {
  fill: var(--puzzle-fill-hover, var(--surface-2, #1b222d));
}

.piece--selected .piece__body {
  fill: var(--puzzle-fill-selected, var(--surface-3, #232b38));
}

/* One path per segment — drawn on top of the body so the outline can be
 * styled independently per edge. Inline style overrides take precedence. */
.piece__edge {
  fill: none;
  stroke: var(--puzzle-stroke, var(--stroke-soft, #3a414d));
  stroke-width: 1.25;
  stroke-linejoin: round;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
  transition: stroke 150ms ease, stroke-width 150ms ease;
}

.piece--hover .piece__edge {
  stroke: var(--puzzle-stroke-hover, var(--stroke-hover, #4285f4));
  stroke-width: 2.5;
}

.piece--selected .piece__edge {
  stroke: var(--puzzle-stroke-hover, var(--stroke-hover, #4285f4));
  stroke-width: 2.5;
}

.piece--selected.piece--hover .piece__edge {
  stroke-width: 3;
}

/* Backward-compat: anything still using .piece__path keeps working. */
.piece__path {
  fill: var(--puzzle-fill, var(--surface, #161b22));
  stroke: var(--puzzle-stroke, var(--stroke-soft, #3a414d));
  stroke-width: 1.25;
  stroke-linejoin: round;
  transition: stroke 150ms ease, stroke-width 150ms ease, fill 150ms ease;
}

.piece__label {
  fill: var(--puzzle-label, var(--text-muted, #8a94a6));
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-anchor: middle;
  dominant-baseline: central;
  user-select: none;
  pointer-events: none;
  font-family: inherit;
}

.piece--selected .piece__label {
  fill: var(--puzzle-label-selected, var(--text, #e6edf3));
}

/* Invisible hit region placed over each tab. Clicking navigates to the
 * neighbor across the connection. A subtle tint appears on hover so the
 * interaction is discoverable. */
.piece__knob-hit {
  fill: transparent;
  cursor: pointer;
  transition: fill 120ms ease;
}

.piece__knob-hit:hover {
  fill: var(
    --puzzle-knob-hit-hover,
    var(--stroke-hover-soft, rgba(66, 133, 244, 0.25))
  );
}

.piece__content {
  fill: var(--puzzle-content, var(--text, #e6edf3));
  font-family: inherit;
  user-select: none;
  pointer-events: none;
}

/* === Cell + edge interaction effects ========================================
   Per-piece hover/click animations. Each effect maps to a single class:
     .piece--anim-{id}            (cell-tier — applied on the root <g>)
     .piece__edge--anim-{id}      (edge-tier — applied on each segment <path>)
   Class ids match the catalogue in \`src/ui/components/interactions/animations.js\`
   and are baked into the single-file JSX export verbatim. Effects are CSS-only
   (no JS animation loop) and use only existing CSS vars so themes Just Work.
*/

/* --- Cell effects (root <g>) --- */
.piece[class*="piece--anim-"] {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 200ms ease, filter 200ms ease;
}

.piece--anim-lift:hover       { transform: translate(0, -4px); }
.piece--anim-scale-up:hover   { transform: scale(1.04); }
.piece--anim-scale-down:hover { transform: scale(0.96); }

.piece--anim-glow:hover .piece__body {
  filter: drop-shadow(0 0 6px var(--primary-tint, rgba(214, 139, 84, 0.55)))
          drop-shadow(0 0 12px var(--primary-tint, rgba(214, 139, 84, 0.4)));
}

.piece--anim-pulse {
  animation: piece-anim-pulse 2.6s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}
@keyframes piece-anim-pulse {
  0%, 100% { opacity: 1;    transform: scale(1); }
  50%      { opacity: 0.92; transform: scale(0.985); }
}

/* --- Edge effects (per-segment <path>) — trigger on piece hover --- */
.piece__edge[class*="piece__edge--anim-"] {
  transition: stroke-width 200ms ease, filter 200ms ease, stroke 200ms ease;
}

.piece:hover .piece__edge--anim-glow {
  filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 8px currentColor);
}

.piece:hover .piece__edge--anim-thicken {
  stroke-width: var(--puzzle-edge-thicken-w, 3.5px);
}

.piece:hover .piece__edge--anim-wiggle {
  animation: piece-edge-wiggle 320ms ease-in-out;
  transform-box: fill-box;
  transform-origin: center;
}
@keyframes piece-edge-wiggle {
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(0.6px, -0.6px); }
  40%  { transform: translate(-0.6px, 0.4px); }
  60%  { transform: translate(0.4px, 0.6px); }
  80%  { transform: translate(-0.4px, -0.4px); }
  100% { transform: translate(0, 0); }
}

.piece:hover .piece__edge--anim-flash {
  animation: piece-edge-flash 700ms ease-out;
}
@keyframes piece-edge-flash {
  0%   { stroke: var(--primary-2, #d68b54);
         filter: drop-shadow(0 0 6px var(--primary-tint, rgba(214,139,84,0.6))); }
  100% { /* falls back to inline style / .piece__edge default */ }
}

/* Respect prefers-reduced-motion — collapse to no-ops. */
@media (prefers-reduced-motion: reduce) {
  .piece[class*="piece--anim-"],
  .piece__edge[class*="piece__edge--anim-"] {
    animation: none !important;
    transition: none !important;
  }
  .piece--anim-lift:hover,
  .piece--anim-scale-up:hover,
  .piece--anim-scale-down:hover { transform: none; }
}
`,Fm=`import { useMemo, useState } from 'react';
import PuzzlePiece from './PuzzlePiece.jsx';
import { computePieceBbox, computePiecePath } from './geometry.js';
import './PuzzleBoard.css';

const STROKE_PAD = 60;  // padding for wave effects (max amplitude ~40 + margin)

// Renders every piece as a <path> inside a single <svg>, so the outlines
// stay seamless and hover/selection can control z-order trivially.
//
// Props:
//   pieces       — Piece[] from the board state
//   selectedId   — id of the currently-selected piece (optional)
//   effect       — connector effect name: 'puzzle' | 'wave' | 'straight' (default: 'puzzle')
//   onSelect     — called with a piece id when its body is clicked
//   onKnobClick  — called with (pieceId, side, pos) when a tab is clicked.
//                  Typical handler is \`board.flipKnob\` from usePuzzleBoard,
//                  which flips tab/socket ownership across the connection.
export default function PuzzleBoard({
  pieces,
  selectedId,
  effect = 'puzzle',
  effectConfig,
  onSelect,
  onKnobClick,
}) {
  const [hoveredId, setHoveredId] = useState(null);

  const enriched = useMemo(
    () =>
      pieces.map((p) => ({
        ...p,
        path: computePiecePath(p, pieces, effect, effectConfig),
        bbox: computePieceBbox(p, pieces, effect, effectConfig),
      })),
    [pieces, effect, effectConfig]
  );

  const bbox = useMemo(() => {
    return enriched.reduce(
      (acc, p) => ({
        minX: Math.min(acc.minX, p.bbox.minX),
        minY: Math.min(acc.minY, p.bbox.minY),
        maxX: Math.max(acc.maxX, p.bbox.maxX),
        maxY: Math.max(acc.maxY, p.bbox.maxY),
      }),
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
    );
  }, [enriched]);

  const vbX = bbox.minX - STROKE_PAD;
  const vbY = bbox.minY - STROKE_PAD;
  const vbW = bbox.maxX - bbox.minX + STROKE_PAD * 2;
  const vbH = bbox.maxY - bbox.minY + STROKE_PAD * 2;

  // Selected + hovered pieces render last so their stroke sits on top.
  const ordered = useMemo(() => {
    if (hoveredId == null && selectedId == null) return enriched;
    const promoteIds = [];
    if (selectedId != null) promoteIds.push(selectedId);
    if (hoveredId != null && hoveredId !== selectedId) promoteIds.push(hoveredId);
    const out = enriched.filter((p) => !promoteIds.includes(p.id));
    for (const id of promoteIds) {
      const top = enriched.find((p) => p.id === id);
      if (top) out.push(top);
    }
    return out;
  }, [enriched, hoveredId, selectedId]);

  const handleHoverStart = (id) => setHoveredId(id);
  const handleHoverEnd = (id) =>
    setHoveredId((current) => (current === id ? null : current));

  const handleKnobClick = onKnobClick
    ? (ownerId, side, pos) => onKnobClick(ownerId, side, pos)
    : undefined;

  return (
    <svg
      className="puzzle-board"
      viewBox={\`\${vbX} \${vbY} \${vbW} \${vbH}\`}
      width={vbW}
      height={vbH}
      xmlns="http://www.w3.org/2000/svg"
    >
      {ordered.map((p) => (
        <PuzzlePiece
          key={p.id}
          piece={p}
          path={p.path}
          allPieces={pieces}
          effect={effect}
          isHovered={hoveredId === p.id}
          isSelected={selectedId === p.id}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          onSelect={onSelect}
          onKnobClick={handleKnobClick}
        />
      ))}
    </svg>
  );
}
`,Dm=`import { KNOB_R, TAB, computeActiveKnobs, computeSideSegments, knobHitCenter } from './geometry.js';

const SIDES = ['top', 'right', 'bottom', 'left'];

// Single puzzle piece rendered as <g> with one <path> for the outline,
// plus optional content (text/image) clipped to that path.

const HIT_R = KNOB_R * 0.75;

export default function PuzzlePiece({
  piece,
  path,
  allPieces,
  effect = 'puzzle',
  isHovered,
  isSelected,
  onHoverStart,
  onHoverEnd,
  onSelect,
  onKnobClick,
}) {
  const { id, x, y, w, h, label, fill, content, backgrounds, cellAnimation } = piece;
  const knobs = computeActiveKnobs(piece, allPieces, effect);
  const clipId = \`pc-clip-\${id}\`;
  const maskId = \`pc-mask-\${id}\`;
  const hasContent = !!content && (content.text || content.src);
  const hasBackgrounds = backgrounds && backgrounds.length > 0;
  const needsClip = hasContent || hasBackgrounds;
  const cellAnimClass = cellAnimation && cellAnimation !== 'none' ? \`piece--anim-\${cellAnimation}\` : '';

  // Per-segment edge strokes. Compute once per side so each segment can carry
  // its own color / opacity / stroke-width while the body stays one path.
  const segments = SIDES.flatMap((side) =>
    computeSideSegments(piece, allPieces, side, effect)
  );

  // Knockout pass: any segment whose user-set opacity is 0 should remove the
  // body where it sits — i.e. a transparent strip the same width as the
  // (otherwise invisible) stroke would have been. Without this, opacity:0
  // looks identical to width:0 (the body fills the slot anyway).
  //
  // Implemented as an SVG <mask>: the body path is white (= keep) and each
  // knockout segment paints a black stroke at its width (= punch through).
  const knockoutSegments = segments.filter(
    (seg) => seg.style && typeof seg.style.opacity === 'number' && seg.style.opacity <= 0.001
  );
  const hasKnockout = knockoutSegments.length > 0;

  return (
    <g
      className={\`piece \${isHovered ? 'piece--hover' : ''} \${isSelected ? 'piece--selected' : ''} \${cellAnimClass}\`.trim()}
      onMouseEnter={() => onHoverStart?.(id)}
      onMouseLeave={() => onHoverEnd?.(id)}
      onClick={() => onSelect?.(id)}
    >
      <defs>
        {needsClip && (
          <clipPath id={clipId}>
            <path d={path} />
          </clipPath>
        )}
        {hasKnockout && (
          <mask id={maskId} maskUnits="userSpaceOnUse">
            {/* Start fully opaque inside the body, then carve out each
                opacity-0 segment with a black stroke at its width. */}
            <path d={path} fill="white" />
            {knockoutSegments.map((seg, i) => (
              <path
                key={\`ko-\${seg.pairKey}-\${i}\`}
                d={seg.d}
                fill="none"
                stroke="black"
                strokeWidth={seg.style?.strokeWidth ?? 1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </mask>
        )}
      </defs>

      {/* Body + visual layers wrapped in the knockout mask when any segment
          requested opacity:0 — the mask leaves transparent strips along
          those edges so the page background shows through. */}
      <g {...(hasKnockout ? { mask: \`url(#\${maskId})\` } : null)}>
        {/* Body: fill only — the visible stroke comes from per-segment paths
            rendered on top, so each edge can be styled independently. */}
        <path d={path} className="piece__body" style={fill ? { fill } : undefined} />

        {hasBackgrounds && (
          <g clipPath={\`url(#\${clipId})\`} pointerEvents="none">
            {backgrounds.map((bg) => (
              <BackgroundImage key={bg.id} bg={bg} />
            ))}
          </g>
        )}

        {hasContent && (
          <g clipPath={\`url(#\${clipId})\`} pointerEvents="none">
            <PieceContent piece={piece} />
          </g>
        )}

        {!hasContent && !hasBackgrounds && label && (
          <text x={x + w / 2} y={y + h / 2} className="piece__label">
            {label}
          </text>
        )}
      </g>

      {/* Per-segment edge strokes (rendered after content so the outline sits
          on top). Opacity:0 strokes are still emitted but don't paint — the
          mask above is what creates the visible transparent strip. */}
      <g className="piece__edges" pointerEvents="none">
        {segments.map((seg, i) => {
          const s = seg.style;
          const style = s ? {
            ...(s.color != null       ? { stroke: s.color } : null),
            ...(s.opacity != null     ? { strokeOpacity: s.opacity } : null),
            ...(s.strokeWidth != null ? { strokeWidth: s.strokeWidth } : null),
          } : undefined;
          const animClass = s?.hoverAnimation && s.hoverAnimation !== 'none'
            ? \` piece__edge--anim-\${s.hoverAnimation}\`
            : '';
          return (
            <path
              key={\`\${seg.pairKey}-\${i}\`}
              d={seg.d}
              className={\`piece__edge\${animClass}\`}
              style={style}
            />
          );
        })}
      </g>

      {onKnobClick &&
        knobs
          .filter((k) => k.type === TAB)
          .map((k) => {
            const { hx, hy } = knobHitCenter(k.side, k.cx, k.cy);
            return (
              <circle
                key={\`\${k.side}-\${k.pos}\`}
                cx={hx}
                cy={hy}
                r={HIT_R}
                className="piece__knob-hit"
                onClick={(e) => {
                  e.stopPropagation();
                  onKnobClick(id, k.side, k.pos);
                }}
              />
            );
          })}
    </g>
  );
}

// Render a multi-piece background image. The same image is rendered in every
// overlapping piece at the full background coordinates, and each piece's
// clipPath cuts it to that piece's outline — so the image appears spanned and
// sliced naturally across pieces.
function BackgroundImage({ bg }) {
  const par =
    bg.fit === 'cover'   ? 'xMidYMid slice' :
    bg.fit === 'contain' ? 'xMidYMid meet'  :
    bg.fit === 'fill'    ? 'none'           :
                           'xMidYMid slice';
  return (
    <image
      href={bg.src}
      x={bg.x} y={bg.y} width={bg.w} height={bg.h}
      preserveAspectRatio={par}
    />
  );
}

// Render text or image content inside a piece. Image fit options mirror
// the SVG \`preserveAspectRatio\` attribute:
//   cover → xMidYMid slice  · fills, may crop
//   contain → xMidYMid meet · fits whole image, may letterbox
//   fill → none             · stretches to bounds
//   none → xMidYMid meet at natural size (we still meet for safety)
function PieceContent({ piece }) {
  const { x, y, w, h, content } = piece;
  const PAD = 18;

  if (content.type === 'image' && content.src) {
    const fit = content.fit || 'cover';
    const par =
      fit === 'cover'   ? 'xMidYMid slice' :
      fit === 'contain' ? 'xMidYMid meet'  :
      fit === 'fill'    ? 'none'           :
                          'xMidYMid meet';
    return (
      <image
        href={content.src}
        x={x} y={y} width={w} height={h}
        preserveAspectRatio={par}
      />
    );
  }

  // Text content. Wrap manually since SVG <text> doesn't auto-wrap.
  const text = content.text || '';
  const fontSize = content.fontSize || Math.min(w, h) / 8;
  const align = content.align || 'center';
  const color = content.color || 'var(--text, #e6edf3)';
  const fontWeight = content.fontWeight || 500;

  const lines = wrapText(text, w - PAD * 2, fontSize);
  const lineH = fontSize * 1.25;
  const totalH = lines.length * lineH;
  const startY = y + h / 2 - totalH / 2 + lineH * 0.7;
  const tx = align === 'left' ? x + PAD : align === 'right' ? x + w - PAD : x + w / 2;
  const anchor = align === 'left' ? 'start' : align === 'right' ? 'end' : 'middle';

  return (
    <text
      className="piece__content"
      style={{ fontSize, fontWeight, fill: color }}
      textAnchor={anchor}
    >
      {lines.map((line, i) => (
        <tspan key={i} x={tx} y={startY + i * lineH}>{line}</tspan>
      ))}
    </text>
  );
}

// Greedy word wrap — approximate width using fontSize * 0.55 per char.
function wrapText(text, maxWidth, fontSize) {
  const charW = fontSize * 0.55;
  const maxChars = Math.max(1, Math.floor(maxWidth / charW));
  const out = [];
  for (const para of text.split('\\n')) {
    if (para === '') { out.push(''); continue; }
    const words = para.split(/\\s+/);
    let line = '';
    for (const word of words) {
      const next = line ? line + ' ' + word : word;
      if (next.length <= maxChars) line = next;
      else {
        if (line) out.push(line);
        line = word.length <= maxChars ? word : word.slice(0, maxChars);
      }
    }
    if (line) out.push(line);
  }
  return out;
}
`,Bm=`// Minimal board helpers consumed by \`geometry.js\` for path building.
// (The high-level state model now lives in \`src/grid/\`; pieces are derived
// from a Project via \`compileProject\`.)

export const EPS = 0.01;

// All pieces that share the given side of \`piece\`.
export function findNeighbors(pieces, piece, side) {
  const pid = piece.id;
  if (side === 'right') {
    const x = piece.x + piece.w;
    return pieces.filter((p) => p.id !== pid && Math.abs(p.x - x) < EPS &&
      p.y < piece.y + piece.h - EPS && p.y + p.h > piece.y + EPS);
  }
  if (side === 'left') {
    const x = piece.x;
    return pieces.filter((p) => p.id !== pid && Math.abs(p.x + p.w - x) < EPS &&
      p.y < piece.y + piece.h - EPS && p.y + p.h > piece.y + EPS);
  }
  if (side === 'bottom') {
    const y = piece.y + piece.h;
    return pieces.filter((p) => p.id !== pid && Math.abs(p.y - y) < EPS &&
      p.x < piece.x + piece.w - EPS && p.x + p.w > piece.x + EPS);
  }
  if (side === 'top') {
    const y = piece.y;
    return pieces.filter((p) => p.id !== pid && Math.abs(p.y + p.h - y) < EPS &&
      p.x < piece.x + piece.w - EPS && p.x + p.w > piece.x + EPS);
  }
  return [];
}

// Sub-edges of a side, one per neighbor (or one outer span).
export function findEdgeSegments(pieces, piece, side) {
  const neighbors = findNeighbors(pieces, piece, side);
  if (neighbors.length === 0) return [{ startPos: 0, endPos: 1, neighborId: null }];

  const isVertical = side === 'left' || side === 'right';
  const sideLen = isVertical ? piece.h : piece.w;
  const sideStart = isVertical ? piece.y : piece.x;

  const ranges = neighbors
    .map((nb) => {
      const nbStart = isVertical ? nb.y : nb.x;
      const nbEnd = isVertical ? nb.y + nb.h : nb.x + nb.w;
      const overlapStart = Math.max(sideStart, nbStart);
      const overlapEnd = Math.min(sideStart + sideLen, nbEnd);
      return {
        startPos: (overlapStart - sideStart) / sideLen,
        endPos: (overlapEnd - sideStart) / sideLen,
        neighborId: nb.id,
      };
    })
    .sort((a, b) => a.startPos - b.startPos);

  const segments = [];
  let cursor = 0;
  for (const r of ranges) {
    if (r.startPos > cursor + 1e-4) {
      segments.push({ startPos: cursor, endPos: r.startPos, neighborId: null });
    }
    segments.push(r);
    cursor = r.endPos;
  }
  if (cursor < 1 - 1e-4) {
    segments.push({ startPos: cursor, endPos: 1, neighborId: null });
  }
  return segments;
}

// Effect lookup chain for a single segment.
export function effectForSegment(piece, side, neighborId, defaultEffect = 'puzzle') {
  const key = neighborId || '__outer';
  return (
    piece?.edgeEffects?.[side]?.[key] ??
    piece?.sideEffects?.[side] ??
    piece?.effect ??
    defaultEffect
  );
}
`,Um=`// Puzzle piece effect: classic interlocking tabs and sockets via SVG arcs.

// Build the path commands for ONE side of a piece.
//   startA, endA: absolute coords along the side's axis
//   fixed:        perpendicular coord of the edge (constant along this side)
//   axis:         'x' for horizontal edges (top/bottom), 'y' for vertical
//   knobs:        normalized knob list [{ pos, type }] in piece-relative pos [0,1]
//   pieceStartA:  absolute coord at pos=0 (so pos*pieceLength gives offset)
//   pieceLength:  length of the side
//   outwardSign:  +1 if outward direction along perpendicular axis is positive
//   KNOB_R:       knob radius
//
// Returns SVG path commands (string), starting with an L command and ending
// at (endA, fixed) — the caller has already moved to (startA, fixed).
function buildSide(startA, endA, fixed, axis, knobs, pieceStartA, pieceLength, outwardSign, KNOB_R) {
  const dir = endA >= startA ? 1 : -1;
  const parts = [];

  // Sort knobs by traversal direction (ascending pos for forward, descending for reverse)
  const sortedKnobs = [...knobs].sort((a, b) => (a.pos - b.pos) * dir);

  for (const k of sortedKnobs) {
    // Use signed delta so the position is correct for both forward (dir=+1)
    // and reverse (dir=-1) traversal. pieceStartA + k.pos*pieceLength goes the
    // wrong direction when startA > endA.
    const knobAxisPos = startA + k.pos * (endA - startA);

    // SVG sweep=1 (CW) curves to the RIGHT of the direction of travel.
    // For a tab (outward bulge):
    //   axis='y' (vertical edge, going down or up): CW curves right (+x) for
    //     downward travel = outward for right edge, and CW curves left (-x) for
    //     upward travel = outward for left edge. Formula: tab → sweep=1. ✓
    //   axis='x' (horizontal edge, going right or left): CW curves down (+y)
    //     for rightward travel = inward for top edge, and CW curves up (-y) for
    //     leftward travel = inward for bottom edge. Formula: tab → sweep=0.
    const sweep = axis === 'y'
      ? (k.type === 'tab' ? 1 : 0)
      : (k.type === 'tab' ? 0 : 1);

    if (axis === 'x') {
      const cx = knobAxisPos;
      parts.push(\`L \${cx - dir * KNOB_R} \${fixed}\`);
      parts.push(\`A \${KNOB_R} \${KNOB_R} 0 0 \${sweep} \${cx + dir * KNOB_R} \${fixed}\`);
    } else {
      const cy = knobAxisPos;
      parts.push(\`L \${fixed} \${cy - dir * KNOB_R}\`);
      parts.push(\`A \${KNOB_R} \${KNOB_R} 0 0 \${sweep} \${fixed} \${cy + dir * KNOB_R}\`);
    }
  }

  // Final segment to side end
  if (axis === 'x') {
    parts.push(\`L \${endA} \${fixed}\`);
  } else {
    parts.push(\`L \${fixed} \${endA}\`);
  }

  return parts.join(' ');
}

export const puzzleEffect = {
  name: 'puzzle',
  displayName: 'Puzzle',
  hidesKnobs: false,
  buildSide,
};
`,Wm=`// Straight effect: simple straight line, no knobs.

function buildSide(startA, endA, fixed, axis, knobs, pieceStartA, pieceLength, outwardSign, KNOB_R, config) {
  if (axis === 'x') return \`L \${endA} \${fixed}\`;
  return \`L \${fixed} \${endA}\`;
}

export const straightEffect = {
  name: 'straight',
  displayName: 'Straight',
  hidesKnobs: true,
  buildSide,
};
`,Hm=`// Wave effect: pure continuous sine wave along an edge, no knobs.
//
// Alignment guarantee:
//   The wave's vertices are sampled at fixed absolute coordinates anchored to
//   the origin (0, 0). A vertex exists at every multiple of SAMPLE_STEP along
//   the active axis, plus the edge endpoints. Two adjacent pieces sharing an
//   edge will compute the SAME vertex set on that shared edge, regardless of
//   the wave's frequency, because the sample anchors are independent of piece
//   coordinates.

const DEFAULT_CONFIG = {
  frequency: 0.025,   // radians per pixel
  amplitude: 12,      // wave bulge in pixels
  phase: 0,           // global phase shift in radians (rotation)
};

const SAMPLE_STEP = 4; // pixels between samples — anchored to absolute origin

function sampleWave(startA, endA, fixed, axis, config) {
  const { frequency, amplitude, phase } = config;
  const lo = Math.min(startA, endA);
  const hi = Math.max(startA, endA);
  const sideLen = hi - lo;

  const firstAnchor = Math.ceil(lo / SAMPLE_STEP) * SAMPLE_STEP;
  const lastAnchor = Math.floor(hi / SAMPLE_STEP) * SAMPLE_STEP;

  const samples = [startA];
  for (let a = firstAnchor; a <= lastAnchor; a += SAMPLE_STEP) {
    if (a > lo && a < hi) samples.push(a);
  }
  samples.push(endA);

  if (endA < startA) samples.sort((a, b) => b - a);
  else samples.sort((a, b) => a - b);

  // Envelope: tapers to 0 at side endpoints so corners stay anchored.
  // This guarantees the path closes cleanly at piece corners. Two adjacent
  // pieces sharing an edge of the same length and same endpoints will have
  // identical envelopes anchored to identical absolute coordinates, so they
  // produce identical wave curves on the shared edge.
  return samples.map((a) => {
    const t = sideLen > 0 ? (a - lo) / sideLen : 0;
    const envelope = Math.sin(t * Math.PI);
    const offset = envelope * Math.sin(a * frequency + phase) * amplitude;
    return axis === 'x' ? [a, fixed + offset] : [fixed + offset, a];
  });
}

function buildSide(startA, endA, fixed, axis, knobs, pieceStartA, pieceLength, outwardSign, KNOB_R, config) {
  const cfg = { ...DEFAULT_CONFIG, ...(config || {}) };
  const pts = sampleWave(startA, endA, fixed, axis, cfg);
  // Skip first point (caller already at start) and emit lines to remaining points.
  return pts.slice(1).map(([px, py]) => \`L \${px} \${py}\`).join(' ');
}

export const waveEffect = {
  name: 'wave',
  displayName: 'Wave',
  defaultConfig: DEFAULT_CONFIG,
  hidesKnobs: true,
  buildSide,
};
`,Km=`// Pure geometry helpers for puzzle pieces.
// No React in this file — it can be used anywhere (tests, SSR, workers…).

import { puzzleEffect } from './effects/puzzleEffect.js';
import { waveEffect } from './effects/waveEffect.js';
import { straightEffect } from './effects/straightEffect.js';
import { effectForSegment, findEdgeSegments } from './board.js';

export const KNOB_R = 30;
export const KNOB_D = KNOB_R * 2;

export const FLAT = 'flat';
export const TAB = 'tab';
export const SOCKET = 'socket';

export const EFFECTS = {
  puzzle: puzzleEffect,
  wave: waveEffect,
  straight: straightEffect,
};

export const EFFECT_NAMES = Object.keys(EFFECTS);

const POS_EPS = 1e-4;

export function evenlySpaced(count, type) {
  return Array.from({ length: count }, (_, i) => ({
    pos: (2 * i + 1) / (2 * count),
    type,
  }));
}

export function normalizeSide(side) {
  if (!side || side === FLAT) return [];
  if (side === TAB) return [{ pos: 0.5, type: TAB }];
  if (side === SOCKET) return [{ pos: 0.5, type: SOCKET }];
  if (Array.isArray(side)) {
    return side.map((k) => ({ pos: k.pos, type: k.type }));
  }
  if (typeof side === 'object' && side.count > 0 && side.type) {
    return evenlySpaced(side.count, side.type);
  }
  return [];
}

function hasTab(side) {
  return normalizeSide(side).some((k) => k.type === TAB);
}

// Build the path for one side, splitting into segments based on neighbors and
// applying the effect configured for each segment.
function buildSidePath({
  piece,
  allPieces,
  sideName,
  startA,
  endA,
  fixed,
  axis,
  pieceStartA,
  pieceLength,
  knobs,
  outwardSign,
  defaultEffect,
  effectConfig,
}) {
  const dir = endA >= startA ? 1 : -1;

  // Without pieces context, treat as one segment with the whole-side effect.
  if (!allPieces) {
    const effect = piece.sideEffects?.[sideName] || piece.effect || defaultEffect || 'puzzle';
    const fx = EFFECTS[effect] || EFFECTS.puzzle;
    return fx.buildSide(startA, endA, fixed, axis, knobs, pieceStartA, pieceLength, outwardSign, KNOB_R, effectConfig);
  }

  const segments = findEdgeSegments(allPieces, piece, sideName);
  const ordered = dir > 0 ? segments : [...segments].reverse();
  const parts = [];

  for (const seg of ordered) {
    const effect = effectForSegment(piece, sideName, seg.neighborId, defaultEffect);
    const fx = EFFECTS[effect] || EFFECTS.puzzle;

    // Per-segment config shadows per-side, which shadows global.
    const segConfig =
      piece.edgeEffectConfigs?.[sideName]?.[seg.neighborId ?? '__outer'] ??
      piece.sideEffectConfigs?.[sideName] ??
      effectConfig;

    const segStartAbs = pieceStartA + seg.startPos * pieceLength;
    const segEndAbs = pieceStartA + seg.endPos * pieceLength;
    const segStart = dir > 0 ? segStartAbs : segEndAbs;
    const segEnd = dir > 0 ? segEndAbs : segStartAbs;
    const segLen = Math.abs(segEnd - segStart);

    // Pick the knob whose position is INSIDE this segment (strict, no epsilon
    // on segment boundaries — boundary-point knobs are an artifact of single
    // whole-side knobs and would render twice).
    const segKnobs = knobs
      .filter((k) =>
        k.pos > seg.startPos + POS_EPS &&
        k.pos < seg.endPos - POS_EPS
      )
      .map((k) => ({
        pos: (k.pos - seg.startPos) / Math.max(POS_EPS, seg.endPos - seg.startPos),
        type: k.type,
      }));

    parts.push(
      fx.buildSide(segStart, segEnd, fixed, axis, segKnobs, segStart, segLen, outwardSign, KNOB_R, segConfig)
    );
  }
  return parts.join(' ');
}

// Build a single SVG \`d\` attribute for a piece. Each side may be split into
// segments (one per neighbor), and each segment can use a different effect.
export function computePiecePath(piece, allPieces, defaultEffect = 'puzzle', effectConfig) {
  const { x, y, w, h } = piece;
  const sidesNorm = {
    top: normalizeSide(piece.sides?.top),
    right: normalizeSide(piece.sides?.right),
    bottom: normalizeSide(piece.sides?.bottom),
    left: normalizeSide(piece.sides?.left),
  };

  const parts = [\`M \${x} \${y}\`];

  parts.push(buildSidePath({
    piece, allPieces, sideName: 'top',
    startA: x, endA: x + w, fixed: y, axis: 'x',
    pieceStartA: x, pieceLength: w, knobs: sidesNorm.top,
    outwardSign: -1, defaultEffect, effectConfig,
  }));
  parts.push(buildSidePath({
    piece, allPieces, sideName: 'right',
    startA: y, endA: y + h, fixed: x + w, axis: 'y',
    pieceStartA: y, pieceLength: h, knobs: sidesNorm.right,
    outwardSign: +1, defaultEffect, effectConfig,
  }));
  parts.push(buildSidePath({
    piece, allPieces, sideName: 'bottom',
    startA: x + w, endA: x, fixed: y + h, axis: 'x',
    pieceStartA: x, pieceLength: w, knobs: sidesNorm.bottom,
    outwardSign: +1, defaultEffect, effectConfig,
  }));
  parts.push(buildSidePath({
    piece, allPieces, sideName: 'left',
    startA: y + h, endA: y, fixed: x, axis: 'y',
    pieceStartA: y, pieceLength: h, knobs: sidesNorm.left,
    outwardSign: -1, defaultEffect, effectConfig,
  }));

  parts.push('Z');
  return parts.join(' ');
}

export function computeKnobs(piece) {
  const { x, y, w, h } = piece;
  const knobs = [];
  for (const k of normalizeSide(piece.sides?.top)) {
    knobs.push({ side: 'top', type: k.type, pos: k.pos, cx: x + k.pos * w, cy: y });
  }
  for (const k of normalizeSide(piece.sides?.right)) {
    knobs.push({ side: 'right', type: k.type, pos: k.pos, cx: x + w, cy: y + k.pos * h });
  }
  for (const k of normalizeSide(piece.sides?.bottom)) {
    knobs.push({ side: 'bottom', type: k.type, pos: k.pos, cx: x + k.pos * w, cy: y + h });
  }
  for (const k of normalizeSide(piece.sides?.left)) {
    knobs.push({ side: 'left', type: k.type, pos: k.pos, cx: x, cy: y + k.pos * h });
  }
  return knobs;
}

// Active knobs respect per-segment effect: a knob sitting in a wave/straight
// segment is hidden, but a knob in a puzzle segment on the same side stays.
export function computeActiveKnobs(piece, allPieces, defaultEffect = 'puzzle') {
  return computeKnobs(piece).filter((k) => {
    if (!allPieces) {
      const effect = piece.sideEffects?.[k.side] || piece.effect || defaultEffect;
      return !EFFECTS[effect]?.hidesKnobs;
    }
    const segments = findEdgeSegments(allPieces, piece, k.side);
    const seg = segments.find((s) => k.pos >= s.startPos - POS_EPS && k.pos <= s.endPos + POS_EPS);
    if (!seg) return false;
    const effect = effectForSegment(piece, k.side, seg.neighborId, defaultEffect);
    return !EFFECTS[effect]?.hidesKnobs;
  });
}

const HIT_OFFSET = KNOB_R * 0.5;

export function knobHitCenter(side, cx, cy) {
  if (side === 'top') return { hx: cx, hy: cy - HIT_OFFSET };
  if (side === 'bottom') return { hx: cx, hy: cy + HIT_OFFSET };
  if (side === 'left') return { hx: cx - HIT_OFFSET, hy: cy };
  return { hx: cx + HIT_OFFSET, hy: cy };
}

// Bounding box including effect-specific extents.
// Export buildSidePath for use in overlays that need to render edge paths.
export { buildSidePath };

// Compute the SVG path for a single side of a piece (for edge highlighting overlays).
export function computeSidePath(piece, allPieces, sideName, defaultEffect = 'puzzle', effectConfig) {
  const { x, y, w, h } = piece;
  const sidesNorm = {
    top: normalizeSide(piece.sides?.top),
    right: normalizeSide(piece.sides?.right),
    bottom: normalizeSide(piece.sides?.bottom),
    left: normalizeSide(piece.sides?.left),
  };

  const sideConfigs = {
    top: { startA: x, endA: x + w, fixed: y, axis: 'x', pieceStartA: x, pieceLength: w, knobs: sidesNorm.top, outwardSign: -1, startPoint: \`\${x} \${y}\` },
    right: { startA: y, endA: y + h, fixed: x + w, axis: 'y', pieceStartA: y, pieceLength: h, knobs: sidesNorm.right, outwardSign: +1, startPoint: \`\${x + w} \${y}\` },
    bottom: { startA: x + w, endA: x, fixed: y + h, axis: 'x', pieceStartA: x, pieceLength: w, knobs: sidesNorm.bottom, outwardSign: +1, startPoint: \`\${x + w} \${y + h}\` },
    left: { startA: y + h, endA: y, fixed: x, axis: 'y', pieceStartA: y, pieceLength: h, knobs: sidesNorm.left, outwardSign: -1, startPoint: \`\${x} \${y + h}\` },
  };

  const cfg = sideConfigs[sideName];
  if (!cfg) return '';

  const { startPoint, ...buildCfg } = cfg;
  const sidePath = buildSidePath({
    piece, allPieces, sideName,
    ...buildCfg,
    defaultEffect, effectConfig,
  });

  return \`M \${startPoint} \${sidePath}\`;
}


// Per-segment paths for one side. Each entry is a self-contained \`<path d>\`
// so it can be stroked independently (with its own color/opacity/width).
//
//   [{ neighborId, pairKey, d, style: { color?, opacity?, strokeWidth? } }]
//
// \`pairKey\` is the same key the project's edge map uses, so callers don't have
// to know whether the segment is a shared edge or an outer one.
export function computeSideSegments(piece, allPieces, sideName, defaultEffect = 'puzzle', effectConfig) {
  const { x, y, w, h } = piece;
  const sidesNorm = normalizeSide(piece.sides?.[sideName]) || [];

  const sideConfigs = {
    top:    { startA: x,     endA: x + w, fixed: y,     axis: 'x', pieceStartA: x, pieceLength: w, outwardSign: -1, startPoint: [x, y] },
    right:  { startA: y,     endA: y + h, fixed: x + w, axis: 'y', pieceStartA: y, pieceLength: h, outwardSign: +1, startPoint: [x + w, y] },
    bottom: { startA: x + w, endA: x,     fixed: y + h, axis: 'x', pieceStartA: x, pieceLength: w, outwardSign: +1, startPoint: [x + w, y + h] },
    left:   { startA: y + h, endA: y,     fixed: x,     axis: 'y', pieceStartA: y, pieceLength: h, outwardSign: -1, startPoint: [x, y + h] },
  };
  const cfg = sideConfigs[sideName];
  if (!cfg) return [];

  const dir = cfg.endA >= cfg.startA ? 1 : -1;
  const segments = allPieces
    ? findEdgeSegments(allPieces, piece, sideName)
    : [{ startPos: 0, endPos: 1, neighborId: null }];
  const ordered = dir > 0 ? segments : [...segments].reverse();

  const out = [];
  let cursorA = cfg.startA;          // current position along the side axis
  for (const seg of ordered) {
    const effect = effectForSegment(piece, sideName, seg.neighborId, defaultEffect);
    const fx = EFFECTS[effect] || EFFECTS.puzzle;

    const segConfig =
      piece.edgeEffectConfigs?.[sideName]?.[seg.neighborId ?? '__outer'] ??
      piece.sideEffectConfigs?.[sideName] ??
      effectConfig;

    const segStartAbs = cfg.pieceStartA + seg.startPos * cfg.pieceLength;
    const segEndAbs   = cfg.pieceStartA + seg.endPos   * cfg.pieceLength;
    const segStart = dir > 0 ? segStartAbs : segEndAbs;
    const segEnd   = dir > 0 ? segEndAbs   : segStartAbs;
    const segLen = Math.abs(segEnd - segStart);

    const segKnobs = sidesNorm
      .filter((k) => k.pos > seg.startPos + POS_EPS && k.pos < seg.endPos - POS_EPS)
      .map((k) => ({
        pos: (k.pos - seg.startPos) / Math.max(POS_EPS, seg.endPos - seg.startPos),
        type: k.type,
      }));

    const inner = fx.buildSide(
      segStart, segEnd, cfg.fixed, cfg.axis,
      segKnobs, segStart, segLen, cfg.outwardSign, KNOB_R, segConfig
    );

    // Build the M command for the start of THIS segment along the axis.
    const sx = cfg.axis === 'x' ? cursorA : cfg.fixed;
    const sy = cfg.axis === 'y' ? cursorA : cfg.fixed;
    const d = \`M \${sx} \${sy} \${inner}\`;

    cursorA += dir * segLen;

    const pairKey = seg.neighborId
      ? edgeKeyOf(piece.id, seg.neighborId)
      : \`\${piece.id}||outer-\${sideName}\`;

    out.push({
      neighborId: seg.neighborId,
      pairKey,
      d,
      style: pickStyle(segConfig),
    });
  }

  return out;
}

// Lightweight edge-key helper (compile.js owns the canonical version).
function edgeKeyOf(a, b) { return a < b ? \`\${a}||\${b}\` : \`\${b}||\${a}\`; }

// Extract stroke-styling fields from a config object. Returns undefined if
// nothing is set so the renderer can know to fall back to CSS defaults.
function pickStyle(cfg) {
  if (!cfg) return undefined;
  const out = {};
  if (cfg.color != null)          out.color = cfg.color;
  if (cfg.opacity != null)        out.opacity = cfg.opacity;
  if (cfg.strokeWidth != null)    out.strokeWidth = cfg.strokeWidth;
  if (cfg.hoverAnimation != null) out.hoverAnimation = cfg.hoverAnimation;
  return Object.keys(out).length ? out : undefined;
}

export function computePieceBbox(piece, allPieces, defaultEffect = 'puzzle', effectConfig) {
  const { x, y, w, h, sides = {} } = piece;
  const padForSide = (side) => {
    let pad = 0;
    const segments = allPieces
      ? findEdgeSegments(allPieces, piece, side)
      : [{ neighborId: null }];
    for (const seg of segments) {
      const effect = effectForSegment(piece, side, seg.neighborId, defaultEffect);
      if (effect === 'wave') pad = Math.max(pad, (effectConfig?.amplitude ?? 12) + 2);
      else if (effect === 'puzzle' && hasTab(sides[side])) pad = Math.max(pad, KNOB_R);
    }
    return pad;
  };
  return {
    minX: x - padForSide('left'),
    minY: y - padForSide('top'),
    maxX: x + w + padForSide('right'),
    maxY: y + h + padForSide('bottom'),
  };
}
`,Ym=`// Public API for the puzzle rendering module.
// State + project management lives in \`src/grid/\`.

export { default as PuzzleBoard } from './PuzzleBoard.jsx';
export { default as PuzzlePiece } from './PuzzlePiece.jsx';

export {
  computePiecePath,
  computeSidePath,
  computeSideSegments,
  computePieceBbox,
  computeKnobs,
  computeActiveKnobs,
  knobHitCenter,
  evenlySpaced,
  normalizeSide,
  buildSidePath,
  KNOB_R,
  KNOB_D,
  FLAT,
  TAB,
  SOCKET,
  EFFECTS,
  EFFECT_NAMES,
} from './geometry.js';
`,Vm=(()=>{const e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n}return e})();function Xm(e){let t=4294967295;for(let n=0;n<e.length;n++)t=Vm[(t^e[n])&255]^t>>>8;return(t^4294967295)>>>0}function Md(e){const t=new TextEncoder,n=[],r=[];let i=0;for(const u of e){const d=t.encode(u.name),m=typeof u.content=="string"?t.encode(u.content):u.content,p=Xm(m),v=new Uint8Array(30+d.length),x=new DataView(v.buffer);x.setUint32(0,67324752,!0),x.setUint16(4,20,!0),x.setUint16(6,0,!0),x.setUint16(8,0,!0),x.setUint16(10,0,!0),x.setUint16(12,33,!0),x.setUint32(14,p,!0),x.setUint32(18,m.length,!0),x.setUint32(22,m.length,!0),x.setUint16(26,d.length,!0),x.setUint16(28,0,!0),v.set(d,30),n.push(v,m);const g=new Uint8Array(46+d.length),w=new DataView(g.buffer);w.setUint32(0,33639248,!0),w.setUint16(4,20,!0),w.setUint16(6,20,!0),w.setUint16(8,0,!0),w.setUint16(10,0,!0),w.setUint16(12,0,!0),w.setUint16(14,33,!0),w.setUint32(16,p,!0),w.setUint32(20,m.length,!0),w.setUint32(24,m.length,!0),w.setUint16(28,d.length,!0),w.setUint16(30,0,!0),w.setUint16(32,0,!0),w.setUint16(34,0,!0),w.setUint16(36,0,!0),w.setUint32(38,0,!0),w.setUint32(42,i,!0),g.set(d,46),r.push(g),i+=v.length+m.length}const o=r.reduce((u,d)=>u+d.length,0),s=i,a=new Uint8Array(22),c=new DataView(a.buffer);return c.setUint32(0,101010256,!0),c.setUint16(4,0,!0),c.setUint16(6,0,!0),c.setUint16(8,e.length,!0),c.setUint16(10,e.length,!0),c.setUint32(12,o,!0),c.setUint32(16,s,!0),c.setUint16(20,0,!0),new Blob([...n,...r,a],{type:"application/zip"})}const Gm=["top","right","bottom","left"],Qm=Object.assign({"../puzzle/CLAUDE.md":Om,"../puzzle/PuzzleBoard.css":Rm,"../puzzle/PuzzleBoard.jsx":Fm,"../puzzle/PuzzlePiece.jsx":Dm,"../puzzle/board.js":Bm,"../puzzle/effects/puzzleEffect.js":Um,"../puzzle/effects/straightEffect.js":Wm,"../puzzle/effects/waveEffect.js":Hm,"../puzzle/geometry.js":Km,"../puzzle/index.js":Ym});function bd(e,t){const n=URL.createObjectURL(e),r=document.createElement("a");r.href=n,r.download=t,r.click(),URL.revokeObjectURL(n)}function Zm(e){var i,o,s,a;const t=Fn(e),n=((o=(i=e.edges)==null?void 0:i.default)==null?void 0:o.effect)??"puzzle",r=((a=(s=e.edges)==null?void 0:s.default)==null?void 0:a.config)??null;return t.map(c=>({id:c.id,x:c.x,y:c.y,w:c.w,h:c.h,label:c.label,fill:c.fill??null,content:c.content??null,backgrounds:c.backgrounds??null,cellAnimation:c.cellAnimation??null,d:$l(c,t,n,r),segments:Gm.flatMap(u=>Tl(c,t,u,n,r)).map(u=>({d:u.d,style:u.style??null}))}))}const Jm=`
.hak-puzzle .piece { cursor: default; }
.hak-puzzle .piece[class*="piece--anim-"] {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 200ms ease, filter 200ms ease;
}
.hak-puzzle .piece--anim-lift:hover       { transform: translate(0, -4px); }
.hak-puzzle .piece--anim-scale-up:hover   { transform: scale(1.04); }
.hak-puzzle .piece--anim-scale-down:hover { transform: scale(0.96); }
.hak-puzzle .piece--anim-glow:hover .piece__body {
  filter: drop-shadow(0 0 6px rgba(214,139,84,0.55))
          drop-shadow(0 0 12px rgba(214,139,84,0.4));
}
.hak-puzzle .piece--anim-pulse {
  animation: hak-piece-pulse 2.6s ease-in-out infinite;
  transform-box: fill-box; transform-origin: center;
}
@keyframes hak-piece-pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50%     { opacity: 0.92; transform: scale(0.985); }
}
.hak-puzzle .piece__edge[class*="piece__edge--anim-"] {
  transition: stroke-width 200ms ease, filter 200ms ease, stroke 200ms ease;
}
.hak-puzzle .piece:hover .piece__edge--anim-glow {
  filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 8px currentColor);
}
.hak-puzzle .piece:hover .piece__edge--anim-thicken { stroke-width: 3.5px; }
.hak-puzzle .piece:hover .piece__edge--anim-wiggle {
  animation: hak-edge-wiggle 320ms ease-in-out;
  transform-box: fill-box; transform-origin: center;
}
@keyframes hak-edge-wiggle {
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(0.6px, -0.6px); }
  40%  { transform: translate(-0.6px, 0.4px); }
  60%  { transform: translate(0.4px, 0.6px); }
  80%  { transform: translate(-0.4px, -0.4px); }
  100% { transform: translate(0, 0); }
}
.hak-puzzle .piece:hover .piece__edge--anim-flash {
  animation: hak-edge-flash 700ms ease-out;
}
@keyframes hak-edge-flash {
  0%   { stroke: #d68b54; filter: drop-shadow(0 0 6px rgba(214,139,84,0.6)); }
  100% { /* falls back to inline stroke */ }
}
@media (prefers-reduced-motion: reduce) {
  .hak-puzzle .piece[class*="piece--anim-"],
  .hak-puzzle .piece__edge[class*="piece__edge--anim-"] {
    animation: none !important;
    transition: none !important;
  }
  .hak-puzzle .piece--anim-lift:hover,
  .hak-puzzle .piece--anim-scale-up:hover,
  .hak-puzzle .piece--anim-scale-down:hover { transform: none; }
}`.trim();function qm(e){const t=Zm(e),n=Math.min(...t.map(c=>c.x)),r=Math.min(...t.map(c=>c.y)),i=Math.max(...t.map(c=>c.x+c.w)),o=Math.max(...t.map(c=>c.y+c.h)),s=60,a={x:n-s,y:r-s,w:i-n+s*2,h:o-r+s*2};return`// Generated by Hakoniwa.
// Drop this file into any React 18+ project and import the default export:
//
//   import PuzzleExport from './${mt(e.name)}.jsx';
//   <PuzzleExport />
//
// No external dependencies beyond React. Hover/click animations are baked in
// via the <style> block below.

import React from 'react';

const PIECES = ${JSON.stringify(t,null,2)};
const VIEWBOX = "${a.x} ${a.y} ${a.w} ${a.h}";
const SIZE = { w: ${a.w}, h: ${a.h} };
const ANIM_CSS = ${JSON.stringify(Jm)};

export default function PuzzleExport({ width = '100%', height = 'auto', style }) {
  return (
    <svg
      className="hak-puzzle"
      viewBox={VIEWBOX}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', maxWidth: '100%', ...style }}
    >
      <style>{ANIM_CSS}</style>
      {PIECES.map((p) => (
        <Piece key={p.id} piece={p} />
      ))}
    </svg>
  );
}

function Piece({ piece }) {
  const { id, x, y, w, h, label, fill, content, backgrounds, segments, d, cellAnimation } = piece;
  const clipId = 'pcx-' + id.replace(/[^a-zA-Z0-9]/g, '');
  const hasContent = content && (content.text || content.src);
  const hasBgs = backgrounds && backgrounds.length > 0;
  const needsClip = hasContent || hasBgs;
  const cellClass = cellAnimation && cellAnimation !== 'none'
    ? ' piece--anim-' + cellAnimation
    : '';
  return (
    <g className={'piece' + cellClass}>
      {needsClip && (
        <defs>
          <clipPath id={clipId}><path d={d} /></clipPath>
        </defs>
      )}
      <path d={d} className="piece__body" fill={fill || '#1f1d28'} stroke="none" />

      {hasBgs && (
        <g clipPath={\`url(#\${clipId})\`}>
          {backgrounds.map((bg, i) => {
            const fit = bg.fit || 'cover';
            const par = fit === 'cover' ? 'xMidYMid slice'
                      : fit === 'contain' ? 'xMidYMid meet'
                      : fit === 'fill' ? 'none' : 'xMidYMid slice';
            return <image key={i} href={bg.src} x={bg.x} y={bg.y} width={bg.w} height={bg.h} preserveAspectRatio={par} />;
          })}
        </g>
      )}

      {hasContent ? (
        <g clipPath={\`url(#\${clipId})\`}>
          <Content x={x} y={y} w={w} h={h} content={content} />
        </g>
      ) : (!hasBgs && label && (
        <text x={x + w / 2} y={y + h / 2} textAnchor="middle" dominantBaseline="central"
          fill="#9d96a8" fontSize={14} fontFamily="system-ui, sans-serif">
          {label}
        </text>
      ))}

      {/* Per-segment edge strokes — one path per edge so each can carry its
          own color / opacity / width / hover-animation baked in at export
          time. The hover-animation triggers on the parent .piece:hover. */}
      {(segments || []).map((seg, i) => {
        const s = seg.style || {};
        const animClass = s.hoverAnimation && s.hoverAnimation !== 'none'
          ? ' piece__edge--anim-' + s.hoverAnimation
          : '';
        return (
          <path
            key={i}
            d={seg.d}
            className={'piece__edge' + animClass}
            fill="none"
            stroke={s.color || '#423a4f'}
            strokeOpacity={s.opacity != null ? s.opacity : 1}
            strokeWidth={s.strokeWidth != null ? s.strokeWidth : 1.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

function Content({ x, y, w, h, content }) {
  if (content.type === 'image' && content.src) {
    const fit = content.fit || 'cover';
    const par = fit === 'cover' ? 'xMidYMid slice'
              : fit === 'contain' ? 'xMidYMid meet'
              : fit === 'fill' ? 'none'
              : 'xMidYMid meet';
    return <image href={content.src} x={x} y={y} width={w} height={h} preserveAspectRatio={par} />;
  }
  const text = content.text || '';
  const fontSize = content.fontSize || Math.min(w, h) / 8;
  const align = content.align || 'center';
  const color = content.color || '#ede8de';
  const fontWeight = content.fontWeight || 500;
  const PAD = 18;
  const charW = fontSize * 0.55;
  const maxChars = Math.max(1, Math.floor((w - PAD * 2) / charW));
  const lines = [];
  for (const para of text.split('\\n')) {
    if (para === '') { lines.push(''); continue; }
    const words = para.split(/\\s+/);
    let line = '';
    for (const word of words) {
      const next = line ? line + ' ' + word : word;
      if (next.length <= maxChars) line = next;
      else { if (line) lines.push(line); line = word.length <= maxChars ? word : word.slice(0, maxChars); }
    }
    if (line) lines.push(line);
  }
  const lineH = fontSize * 1.25;
  const startY = y + h / 2 - (lines.length * lineH) / 2 + lineH * 0.7;
  const tx = align === 'left' ? x + PAD : align === 'right' ? x + w - PAD : x + w / 2;
  const anchor = align === 'left' ? 'start' : align === 'right' ? 'end' : 'middle';
  return (
    <text textAnchor={anchor} fill={color} fontSize={fontSize} fontWeight={fontWeight}
      fontFamily="system-ui, sans-serif">
      {lines.map((line, i) => (
        <tspan key={i} x={tx} y={startY + i * lineH}>{line}</tspan>
      ))}
    </text>
  );
}
`}const eg=e=>`# ${e.name||"Puzzle Export"}

Generated by Hakoniwa. A single self-contained React component you can drop into any React 18+ project.

## Install

Copy \`${mt(e.name)}.jsx\` into your project. No additional dependencies are required (just React).

## Usage

\`\`\`jsx
import PuzzleExport from './${mt(e.name)}.jsx';

export default function App() {
  return (
    <div>
      <PuzzleExport width="100%" />
    </div>
  );
}
\`\`\`

## Props

| Prop     | Type      | Default      | Description                          |
| -------- | --------- | ------------ | ------------------------------------ |
| \`width\`  | number/string | \`'100%'\`     | SVG width attribute.                 |
| \`height\` | number/string | \`'auto'\`     | SVG height attribute.                |
| \`style\`  | object    | —            | Inline style applied to the \`<svg>\`. |

## Notes

- The SVG path geometry is precomputed; the runtime does no math.
- Colors and content (text/images) are baked into the file.
- To re-edit, open the original project JSON in Hakoniwa.
`,tg=e=>`# Hakoniwa Export — Module Bundle

This bundle contains everything needed to render and re-edit your puzzle in your own React app.

## Files

\`\`\`
puzzle/                 ← portable rendering module (drop-in)
  PuzzleBoard.jsx       — root SVG component
  PuzzlePiece.jsx       — individual piece
  geometry.js           — pure path math
  effects/              — connector strategies (puzzle, wave, straight)
  index.js              — public API
project.json            — your project data (re-importable into Hakoniwa)
README.md               — this file
${mt(e.name)}.jsx       — turn-key wrapper that compiles project.json + renders it
\`\`\`

## Quick start

1. Copy the \`puzzle/\` folder into your project (e.g. \`src/puzzle/\`).
2. Copy \`project.json\` and \`${mt(e.name)}.jsx\` next to it.
3. Adjust the import path in \`${mt(e.name)}.jsx\` if needed.
4. Use it:

\`\`\`jsx
import Puzzle from './${mt(e.name)}.jsx';

export default function App() {
  return <Puzzle />;
}
\`\`\`

## API (puzzle module)

\`\`\`js
import {
  PuzzleBoard,        // <PuzzleBoard pieces={pieces} effect="puzzle" />
  computePiecePath,   // (piece, allPieces, effect, config) → SVG d
  computePieceBbox,   // (piece, allPieces, effect, config) → {minX,minY,maxX,maxY}
  EFFECT_NAMES,       // ['puzzle', 'wave', 'straight']
} from './puzzle';
\`\`\`

The \`puzzle/\` folder has no imports outside itself. It works in any React 18+ project, with no other dependencies.

## Re-editing

Drop \`project.json\` into Hakoniwa (Projects → Import) to continue editing.
`,ng=e=>`// Convenience wrapper: imports your project data + renders it with the puzzle module.
import React, { useMemo } from 'react';
import { PuzzleBoard } from './puzzle';
import projectData from './project.json';
import { compileProject } from './compileProject.js';

export default function ${ig(e.name)||"Puzzle"}({ width = '100%' }) {
  const pieces = useMemo(() => compileProject(projectData), []);
  const effect = projectData.edges?.default?.effect ?? 'puzzle';
  const config = projectData.edges?.default?.config;
  return (
    <div style={{ width }}>
      <PuzzleBoard pieces={pieces} effect={effect} effectConfig={config} />
    </div>
  );
}
`,rg=`// Standalone compileProject — no imports outside this file.
// Builds piece array from a Project { grid, edges, pieceColors, pieceContent }.
function edgeKey(a, b) { return a < b ? a + '||' + b : b + '||' + a; }

function groupBoundsMap(grid) {
  const map = new Map();
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      const id = grid.groups[r][c];
      const b = map.get(id);
      if (!b) map.set(id, { rMin: r, rMax: r, cMin: c, cMax: c });
      else {
        if (r < b.rMin) b.rMin = r; if (r > b.rMax) b.rMax = r;
        if (c < b.cMin) b.cMin = c; if (c > b.cMax) b.cMax = c;
      }
    }
  }
  return map;
}

export function compileProject(project) {
  const { grid, edges, pieceColors = {}, pieceContent = {} } = project;
  const cellSize = grid.cellSize;
  const bounds = groupBoundsMap(grid);
  const pieces = [];
  for (const [id, b] of bounds) {
    pieces.push({
      id,
      x: b.cMin * cellSize, y: b.rMin * cellSize,
      w: (b.cMax - b.cMin + 1) * cellSize, h: (b.rMax - b.rMin + 1) * cellSize,
      label: id.startsWith('g-') ? '#' + id.slice(2) : id.split('-')[0],
      fill: pieceColors[id],
      content: pieceContent[id],
      sides: {}, edgeEffects: {}, edgeEffectConfigs: {},
    });
  }
  // The full edge resolution lives in the puzzle module; for export we let
  // PuzzleBoard receive these pieces and compute paths from neighbors.
  return pieces;
}
`;function mt(e){return(e||"puzzle").replace(/[^A-Za-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"puzzle"}function ig(e){return e?e.replace(/[^A-Za-z0-9]+/g," ").trim().split(/\s+/).map(t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()).join(""):""}function og(e){const t=mt(e.name),n=qm(e),r=eg(e),i=Md([{name:`${t}.jsx`,content:n},{name:"README.md",content:r}]);bd(i,`${t}-component.zip`)}function sg(e){const t=mt(e.name),n=[];for(const[i,o]of Object.entries(Qm)){const s=i.replace(/^\.\.\//,"");s.endsWith("CLAUDE.md")||n.push({name:s,content:o})}n.push({name:"project.json",content:JSON.stringify(e,null,2)}),n.push({name:`${t}.jsx`,content:ng(e)}),n.push({name:"compileProject.js",content:rg}),n.push({name:"README.md",content:tg(e)});const r=Md(n);bd(r,`${t}-module.zip`)}function lg({project:e,onNav:t}){const{project:n,setName:r,exportCurrent:i}=e,[o,s]=z.useState(!1),[a,c]=z.useState(!1);return n?l.jsxs("div",{className:"page-preview",children:[l.jsx("div",{className:"preview-stage",children:l.jsx("div",{className:"preview-stage__svg",children:l.jsx(Cd,{project:n,maxSize:620})})}),l.jsxs("aside",{className:"preview-info",children:[l.jsx("div",{className:"preview-info__brand",children:l.jsx(Bn,{size:"sm"})}),l.jsx("div",{className:"preview-info__export",children:l.jsxs("div",{className:"export-menu",children:[l.jsx("button",{type:"button",className:"action-btn",onClick:()=>c(u=>!u),children:"↓ Export ▾"}),a&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"export-menu__backdrop",onClick:()=>c(!1)}),l.jsxs("div",{className:"export-menu__panel",children:[l.jsxs("button",{type:"button",className:"export-menu__item",onClick:()=>{i(),c(!1)},children:[l.jsx("strong",{children:"JSON"}),l.jsx("span",{children:"Project file (re-importable)"})]}),l.jsxs("button",{type:"button",className:"export-menu__item",onClick:()=>{og(n),c(!1)},children:[l.jsx("strong",{children:"Single-file React"}),l.jsx("span",{children:"One .jsx + README — drop into any React 18+ project"})]}),l.jsxs("button",{type:"button",className:"export-menu__item",onClick:()=>{sg(n),c(!1)},children:[l.jsx("strong",{children:"Module bundle (ZIP)"}),l.jsx("span",{children:"Full puzzle/ folder + project.json + README"})]})]})]})]})}),l.jsx(pe,{amplitude:4,height:14}),o?l.jsx("input",{className:"preview-info__name-input",autoFocus:!0,value:n.name??"",onChange:u=>r(u.target.value),onBlur:()=>s(!1),onKeyDown:u=>{u.key==="Enter"&&s(!1)}}):l.jsx("h1",{className:"preview-info__name",onClick:()=>s(!0),title:"Click to rename",children:n.name||"Untitled"}),l.jsxs("p",{className:"preview-info__meta",children:[l.jsxs("span",{children:[n.grid.rows,"×",n.grid.cols," grid"]}),l.jsx("span",{"aria-hidden":!0,children:" · "}),l.jsxs("span",{children:["last edited ",zd(n.updatedAt)]})]}),l.jsx(pe,{amplitude:4,height:14}),l.jsxs("div",{className:"preview-info__actions",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>t("grid"),children:"⊞ Edit grid"}),l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>t("edit"),children:"✎ Edit pieces"})]}),l.jsx("p",{className:"hint",children:"Edit the grid layout, or open the Edit page to style edges and fill cells with text/images."})]})]}):null}function ag(e){const t=e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`);for(;t.length&&t[t.length-1].trim()==="";)t.pop();if(t.length===0)return[];const r=t.some(o=>o.includes("	"))?t.map(o=>o.split("	")):t.map(cg),i=r.reduce((o,s)=>Math.max(o,s.length),0);for(const o of r)for(;o.length<i;)o.push("");return r.map(o=>o.map(s=>s.trim()))}function cg(e){const t=[];let n="",r=!1;for(let i=0;i<e.length;i++){const o=e[i];r?o==='"'?e[i+1]==='"'?(n+='"',i++):r=!1:n+=o:o==='"'?r=!0:o===","?(t.push(n),n=""):n+=o}return t.push(n),t}function ug(e,{autoMerge:t=!0,cellSize:n=yd}={}){var a,c,u;const r=Tn(e.length),i=Tn(((a=e[0])==null?void 0:a.length)??1),o=Array.from({length:r},(d,m)=>Array.from({length:i},(p,v)=>`r${m}c${v}-${hh()}`)),s={};for(let d=0;d<r;d++){let m=0;for(;m<i;){const p=((c=e[d])==null?void 0:c[m])??"";if(p===""){m++;continue}let v=m;if(t)for(;v+1<i&&(((u=e[d])==null?void 0:u[v+1])??"")==="";)v++;const x=o[d][m];for(let g=m+1;g<=v;g++)o[d][g]=x;s[x]={type:"text",text:p},m=v+1}}return{grid:{rows:r,cols:i,cellSize:n,groups:o},pieceContent:s}}function dg(e,t){const n=ag(e);if(n.length===0)throw new Error("No data found in input");if(n.length>pt||n[0].length>pt)throw new Error(`Grid too large (max ${pt}×${pt}). Got ${n.length}×${n[0].length}.`);return ug(n,t)}const X=64,De=22,Ce=16;function fg({grid:e,selection:t,onSelectionChange:n,pieceColors:r,backgrounds:i,onDeleteRows:o,onDeleteCols:s}){var M,b,D,q;const a=z.useRef(null),[c,u]=z.useState(null),[d,m]=z.useState(null),[p,v]=z.useState(null),x=e.cols*X,g=e.rows*X,w=x+De+Ce*2,h=g+De+Ce*2,f=Ce+De,y=Ce+De,k=oo(e),S=new Set(t.map(([j,$])=>`${j},${$}`)),C=(j,$)=>{const H=a.current.getBoundingClientRect(),W=j-H.left-f,U=$-H.top-y,ee=Math.floor(W/X),nt=Math.floor(U/X);return nt<0||nt>=e.rows||ee<0||ee>=e.cols?null:[nt,ee]},E=(j,$,H)=>{var W,U;if(j.button===0){if(j.preventDefault(),j.shiftKey||j.ctrlKey||j.metaKey){const ee=`${$},${H}`,nt=new Set(S);nt.has(ee)?nt.delete(ee):nt.add(ee),n([...nt].map(Ld=>Ld.split(",").map(Number)));return}u({startCell:[$,H],curCell:[$,H]}),n([[$,H]]),(U=(W=j.currentTarget).setPointerCapture)==null||U.call(W,j.pointerId)}};z.useEffect(()=>{if(!c)return;const j=H=>{const W=C(H.clientX,H.clientY);W&&(W[0]===c.curCell[0]&&W[1]===c.curCell[1]||(u(U=>U&&{...U,curCell:W}),n(vd([c.startCell,W]))))},$=()=>u(null);return window.addEventListener("pointermove",j),window.addEventListener("pointerup",$),()=>{window.removeEventListener("pointermove",j),window.removeEventListener("pointerup",$)}},[(M=c==null?void 0:c.startCell)==null?void 0:M[0],(b=c==null?void 0:c.startCell)==null?void 0:b[1],(D=c==null?void 0:c.curCell)==null?void 0:D[0],(q=c==null?void 0:c.curCell)==null?void 0:q[1]]);const P=(j,$)=>{const H=a.current.getBoundingClientRect(),W=j-H.left,U=$-H.top;return W>=Ce&&W<Ce+De&&U>=y&&U<y+g?{axis:"row",idx:Math.floor((U-y)/X)}:U>=Ce&&U<Ce+De&&W>=f&&W<f+x?{axis:"col",idx:Math.floor((W-f)/X)}:null},B=(j,$,H)=>{var W,U;j.button===0&&(j.preventDefault(),j.stopPropagation(),m({axis:$,marks:new Set([H])}),(U=(W=j.currentTarget).setPointerCapture)==null||U.call(W,j.pointerId))};z.useEffect(()=>{if(!d)return;const j=H=>{const W=P(H.clientX,H.clientY);!W||W.axis!==d.axis||m(U=>{if(!U||U.marks.has(W.idx))return U;const ee=new Set(U.marks);return ee.add(W.idx),{...U,marks:ee}})},$=()=>{m(H=>{if(!H)return null;const W=[...H.marks].sort((U,ee)=>U-ee);return H.axis==="row"?o==null||o(W):s==null||s(W),null})};return window.addEventListener("pointermove",j),window.addEventListener("pointerup",$),()=>{window.removeEventListener("pointermove",j),window.removeEventListener("pointerup",$)}},[d==null?void 0:d.axis]);const R=[];for(const[j,$]of k)R.push({id:j,x:f+$.cMin*X,y:y+$.rMin*X,w:($.cMax-$.cMin+1)*X,h:($.rMax-$.rMin+1)*X,isMerged:$.cMax>$.cMin||$.rMax>$.rMin,fill:r==null?void 0:r[j],label:$.cMax>$.cMin||$.rMax>$.rMin?`${$.cMax-$.cMin+1}×${$.rMax-$.rMin+1}`:""});const K=t.map(([j,$])=>({key:`${j},${$}`,x:f+$*X,y:y+j*X})),T=Array.from({length:e.rows},(j,$)=>$),_=Array.from({length:e.cols},(j,$)=>$),A=(j,$)=>d&&d.axis===j&&d.marks.has($),F=(j,$)=>!d&&p&&p.axis===j&&p.idx===$,I=new Set,O=new Set;return d?d.axis==="row"?d.marks.forEach(j=>I.add(j)):d.marks.forEach(j=>O.add(j)):p&&(p.axis==="row"?I.add(p.idx):O.add(p.idx)),l.jsx("div",{className:"grid-canvas-wrap",children:l.jsxs("svg",{ref:a,className:"grid-canvas",width:w,height:h,viewBox:`0 0 ${w} ${h}`,children:[_.map(j=>{const $=f+j*X,H=A("col",j),W=F("col",j),U=H||W;return l.jsxs("g",{children:[l.jsx("rect",{x:$,y:Ce,width:X,height:De,className:`grid-canvas__header-hit ${H?"is-marked":""} ${W?"is-hovered":""}`,onPointerDown:ee=>B(ee,"col",j),onPointerEnter:()=>!d&&v({axis:"col",idx:j}),onPointerLeave:()=>!d&&v(null),children:l.jsxs("title",{children:["Click to delete column ",j+1]})}),U?l.jsx("text",{x:$+X/2,y:Ce+De/2,className:"grid-canvas__header-x",pointerEvents:"none",children:"×"}):l.jsx("text",{x:$+X/2,y:Ce+De/2,className:"grid-canvas__header",pointerEvents:"none",children:j+1})]},`ch-${j}`)}),T.map(j=>{const $=y+j*X,H=A("row",j),W=F("row",j),U=H||W;return l.jsxs("g",{children:[l.jsx("rect",{x:Ce,y:$,width:De,height:X,className:`grid-canvas__header-hit ${H?"is-marked":""} ${W?"is-hovered":""}`,onPointerDown:ee=>B(ee,"row",j),onPointerEnter:()=>!d&&v({axis:"row",idx:j}),onPointerLeave:()=>!d&&v(null),children:l.jsxs("title",{children:["Click to delete row ",j+1]})}),U?l.jsx("text",{x:Ce+De/2,y:$+X/2,className:"grid-canvas__header-x",pointerEvents:"none",children:"×"}):l.jsx("text",{x:Ce+De/2,y:$+X/2,className:"grid-canvas__header",pointerEvents:"none",children:j+1})]},`rh-${j}`)}),R.map(j=>l.jsx("rect",{x:j.x,y:j.y,width:j.w,height:j.h,className:`grid-canvas__group ${j.isMerged?"grid-canvas__group--merged":""}`,style:j.fill?{fill:j.fill}:void 0,rx:"6",ry:"6"},j.id)),(i||[]).map(j=>{const $=j.rect;if(!$)return null;const H=f+$.cMin*X,W=y+$.rMin*X,U=($.cMax-$.cMin+1)*X,ee=($.rMax-$.rMin+1)*X,nt=j.fit==="cover"?"xMidYMid slice":j.fit==="contain"?"xMidYMid meet":j.fit==="fill"?"none":"xMidYMid slice";return l.jsxs("g",{className:"grid-canvas__bg",pointerEvents:"none",children:[l.jsx("image",{href:j.src,x:H,y:W,width:U,height:ee,preserveAspectRatio:nt}),l.jsx("rect",{x:H,y:W,width:U,height:ee,className:"grid-canvas__bg-frame",rx:"4",ry:"4"})]},j.id)}),K.map(j=>l.jsx("rect",{x:j.x+2,y:j.y+2,width:X-4,height:X-4,className:"grid-canvas__selected",rx:"4",ry:"4",pointerEvents:"none"},j.key)),R.filter(j=>j.label).map(j=>l.jsx("text",{x:j.x+j.w/2,y:j.y+j.h/2,className:"grid-canvas__label",textAnchor:"middle",dominantBaseline:"central",pointerEvents:"none",children:j.label},`l-${j.id}`)),[...I].map(j=>l.jsx("rect",{x:f,y:y+j*X,width:x,height:X,className:`grid-canvas__doom ${d?"grid-canvas__doom--marked":""}`,pointerEvents:"none"},`doom-r-${j}`)),[...O].map(j=>l.jsx("rect",{x:f+j*X,y,width:X,height:g,className:`grid-canvas__doom ${d?"grid-canvas__doom--marked":""}`,pointerEvents:"none"},`doom-c-${j}`)),l.jsx("rect",{x:f,y,width:x,height:g,fill:"transparent",style:{cursor:"pointer"},onPointerDown:j=>{const $=C(j.clientX,j.clientY);$&&E(j,$[0],$[1])}})]})})}const Ad=[{value:"cover",label:"Cover",hint:"Fill, may crop"},{value:"contain",label:"Contain",hint:"Fit whole image"},{value:"fill",label:"Stretch",hint:"Stretch to bounds"}];function Ol(e){const t=z.useRef(null);return{inputProps:{ref:t,onChange:i=>{var s;const o=(s=i.target.files)==null?void 0:s[0];i.target.value="",o&&e(o)}},open:()=>{var i;return(i=t.current)==null?void 0:i.click()}}}function pg({backgrounds:e,selectionRect:t,onAddImage:n,onUpdate:r,onRemove:i}){const{inputProps:o,open:s}=Ol(n);return l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Backgrounds"}),l.jsx("p",{className:"hint",children:t?`Image will fill ${t.cMax-t.cMin+1}×${t.rMax-t.rMin+1} selected cells, sliced across the underlying pieces.`:"Select cells to choose where to place the image (defaults to the full grid)."}),l.jsx("input",{...o,type:"file",accept:"image/*",hidden:!0}),l.jsxs("div",{className:"action-stack",children:[l.jsx("button",{type:"button",className:"action-btn",onClick:s,children:"↑ Upload image"}),l.jsx("p",{className:"hint",children:"Or paste an image (Ctrl+V) — it goes into the current selection."})]}),e.length>0&&l.jsx("div",{className:"bg-list",children:e.map((a,c)=>{const u=`${a.rect.cMax-a.rect.cMin+1}×${a.rect.rMax-a.rect.rMin+1}`;return l.jsxs("div",{className:"bg-item",children:[l.jsx("img",{src:a.src,alt:"",className:"bg-item__thumb"}),l.jsxs("div",{className:"bg-item__body",children:[l.jsxs("div",{className:"bg-item__head",children:[l.jsxs("span",{className:"bg-item__label",children:["#",c+1," · ",u]}),l.jsx("button",{type:"button",className:"bg-item__del",onClick:()=>i(a.id),title:"Delete this background",children:"✕"})]}),l.jsx("div",{className:"effect-chips",children:Ad.map(d=>l.jsx("button",{type:"button",className:`chip chip--sm ${(a.fit||"cover")===d.value?"chip--active":""}`,onClick:()=>r(a.id,{fit:d.value}),title:d.hint,children:d.label},d.value))})]})]},a.id)})})]})}const tc=`Logo		Theme	Language	About		How It Works		Sign In		Sign Up
Build Your Custom ERP								No Coding Required		
										
Step 1			Step 2			Step 3				`;function hg({onClose:e,onImport:t}){const[n,r]=z.useState(""),[i,o]=z.useState(!0),s=()=>{n.trim()&&t(n,{autoMerge:i})};return l.jsx("div",{className:"modal-backdrop",onClick:e,children:l.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[l.jsxs("header",{className:"modal__head",children:[l.jsx("h2",{className:"modal__title",children:"Import grid data"}),l.jsx("button",{type:"button",className:"modal__close",onClick:e,"aria-label":"Close",children:"✕"})]}),l.jsxs("div",{className:"modal__body",children:[l.jsx("p",{className:"hint",children:"Paste tab-separated (from Excel/Google Sheets) or comma-separated data. Each non-empty cell becomes a piece."}),l.jsx("textarea",{className:"modal__textarea",placeholder:tc,value:n,onChange:a=>r(a.target.value),spellCheck:!1,autoFocus:!0}),l.jsxs("label",{className:"modal__check",children:[l.jsx("input",{type:"checkbox",checked:i,onChange:a=>o(a.target.checked)}),l.jsx("span",{children:"Auto-merge horizontal runs (extend each cell to the right over empties)"})]})]}),l.jsxs("footer",{className:"modal__foot",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:()=>r(tc),children:"Insert sample"}),l.jsx("div",{style:{flex:1}}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:e,children:"Cancel"}),l.jsx("button",{type:"button",className:"action-btn action-btn--primary",disabled:!n.trim(),onClick:s,children:"Import"})]})]})})}function tt({label:e,min:t,max:n,step:r=1,value:i,onChange:o,format:s,parse:a}){const[c,u]=z.useState(!1),[d,m]=z.useState("");z.useEffect(()=>{c||m(s?s(i):String(i))},[i,c,s]);const p=()=>{const x=a?a(d):parseFloat(d);if(Number.isFinite(x)){const g=Math.min(n,Math.max(t,x));o(g)}u(!1)},v=()=>{m(s?s(i):String(i)),u(!1)};return l.jsxs("label",{className:"slider-control",children:[l.jsx("span",{className:"slider-control__label",children:e}),l.jsx("input",{type:"range",min:t,max:n,step:r,value:i,onChange:x=>o(Number(x.target.value))}),l.jsx("input",{type:"text",inputMode:"decimal",className:"slider-control__input",value:c?d:s?s(i):String(i),onFocus:x=>{u(!0),m(String(i)),x.target.select()},onChange:x=>m(x.target.value),onBlur:p,onKeyDown:x=>{x.key==="Enter"?x.currentTarget.blur():x.key==="Escape"?(v(),x.currentTarget.blur()):x.key==="ArrowUp"?(x.preventDefault(),o(Math.min(n,i+r))):x.key==="ArrowDown"&&(x.preventDefault(),o(Math.max(t,i-r)))}})]})}const mg=.2,gg=5,yg=.0015;function Id({children:e,...t}){const n=z.useRef(null),[r,i]=z.useState(1),[o,s]=z.useState(0),[a,c]=z.useState(0),u=z.useRef({active:!1,startX:0,startY:0,baseTx:0,baseTy:0}),d=z.useCallback(w=>{w.preventDefault();const h=n.current.getBoundingClientRect(),f=w.clientX-h.left,y=w.clientY-h.top,k=Math.exp(-w.deltaY*yg);i(S=>{const C=Math.max(mg,Math.min(gg,S*k)),E=C/S;return s(P=>f-(f-P)*E),c(P=>y-(y-P)*E),C})},[]);z.useEffect(()=>{const w=n.current;if(w)return w.addEventListener("wheel",d,{passive:!1}),()=>w.removeEventListener("wheel",d)},[d]);const m=w=>{const h=w.button===1,f=w.button===0&&(w.ctrlKey||w.metaKey);!h&&!f||(w.preventDefault(),u.current={active:!0,startX:w.clientX,startY:w.clientY,baseTx:o,baseTy:a},w.currentTarget.setPointerCapture(w.pointerId))},p=w=>{if(!u.current.active)return;const{startX:h,startY:f,baseTx:y,baseTy:k}=u.current;s(y+(w.clientX-h)),c(k+(w.clientY-f))},v=w=>{if(u.current.active&&(w.button===1||w.button===0)){u.current.active=!1;try{w.currentTarget.releasePointerCapture(w.pointerId)}catch{}}},x=w=>{w.button===1&&w.preventDefault()},g=()=>{i(1),s(0),c(0)};return l.jsxs("section",{className:"view-panel",children:[l.jsxs("div",{className:"view-panel__hud",children:[l.jsxs("span",{className:"view-panel__zoom",children:[Math.round(r*100),"%"]}),l.jsx("button",{type:"button",className:"view-panel__reset",onClick:g,title:"Reset view",children:"Reset View"}),l.jsx("span",{className:"view-panel__hint",children:"Scroll to zoom · Middle-drag or Ctrl+drag to pan"})]}),l.jsx("div",{ref:n,className:`view-panel__surface ${u.current.active?"is-panning":""}`,onPointerDown:m,onPointerMove:p,onPointerUp:v,onPointerCancel:v,onAuxClick:x,children:l.jsx("div",{className:"view-panel__transform",style:{transform:`translate(${o}px, ${a}px) scale(${r})`,transformOrigin:"0 0"},children:e??l.jsx(ln,{...t})})})]})}const vg=["#d68b54","#e6a378","#c87070","#d4a056","#a98ec4","#5fb68f","#7fc9a6","#5b8c85","#6b9bd1","#a3a3a3"];function xg({project:e}){const{project:t,setGrid:n,merge:r,unmerge:i,setPieceColor:o,replaceGrid:s,removeRows:a,removeCols:c,addBackground:u,updateBackground:d,removeBackground:m}=e,[p,v]=z.useState([]),[x,g]=z.useState(!1),w=z.useMemo(()=>{if(p.length===0)return null;let _=1/0,A=-1/0,F=1/0,I=-1/0;for(const[O,M]of p)O<_&&(_=O),O>A&&(A=O),M<F&&(F=M),M>I&&(I=M);return{rMin:_,rMax:A,cMin:F,cMax:I}},[p]),h=_=>{if(!_)return;const A=new FileReader;A.onload=F=>{const I=w??{rMin:0,rMax:((t==null?void 0:t.grid.rows)??1)-1,cMin:0,cMax:((t==null?void 0:t.grid.cols)??1)-1};u({src:F.target.result,rect:I,fit:"cover"})},A.readAsDataURL(_)};z.useEffect(()=>{const _=A=>{var I;const F=(I=A.clipboardData)==null?void 0:I.items;if(F){for(const O of F)if(O.type&&O.type.startsWith("image/")){A.preventDefault();const M=O.getAsFile();M&&h(M);return}}};return document.addEventListener("paste",_),()=>document.removeEventListener("paste",_)},[w,t==null?void 0:t.grid.rows,t==null?void 0:t.grid.cols]);const f=(_,A)=>{try{const{grid:F,pieceContent:I}=dg(_,A);s(F,I),g(!1),v([])}catch(F){alert("Import failed: "+F.message)}},k=Ol(async _=>{if(_)try{const A=await _.text();f(A,{autoMerge:!0})}catch(A){alert("Could not read file: "+A.message)}});if(!t)return null;const S=p.length>=2&&Ir(p),C=p.length>=1,E=z.useMemo(()=>{var A;const _=new Set;for(const[F,I]of p){const O=(A=t.grid.groups[F])==null?void 0:A[I];O&&_.add(O)}return[..._]},[p,t.grid.groups]),P=z.useMemo(()=>{var A;if(E.length===0)return null;const _=((A=t.pieceColors)==null?void 0:A[E[0]])??null;return E.every(F=>{var I;return(((I=t.pieceColors)==null?void 0:I[F])??null)===_})?_:null},[E,t.pieceColors]),B=_=>{for(const A of E)o(A,_)},R=()=>{S&&(r(p),v([]))},K=()=>{C&&(i(p),v([]))},T=()=>v([]);return l.jsxs("div",{className:"page-grid",children:[l.jsxs("aside",{className:"side-tools",children:[l.jsx("div",{className:"side-tools__brand",children:l.jsx(Bn,{size:"sm"})}),l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Dimensions"}),l.jsx(tt,{label:"Rows",min:$n,max:pt,value:t.grid.rows,onChange:_=>n({rows:_})}),l.jsx(tt,{label:"Cols",min:$n,max:pt,value:t.grid.cols,onChange:_=>n({cols:_})}),l.jsxs("p",{className:"hint",children:[t.grid.rows," × ",t.grid.cols," cells (max ",pt,"×",pt,")."]})]}),l.jsx(pe,{amplitude:3,height:10}),l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Import"}),l.jsx("p",{className:"hint",children:"Paste a spreadsheet, or import a CSV file."}),l.jsxs("div",{className:"action-stack",children:[l.jsx("button",{type:"button",className:"action-btn",onClick:()=>g(!0),children:"⎘ Paste data"}),l.jsx("input",{...k.inputProps,type:"file",accept:".csv,.tsv,.txt,text/csv",hidden:!0}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:k.open,children:"↑ Import CSV/TSV file"})]}),l.jsx("p",{className:"hint hint--warn",children:"Importing replaces the current grid."})]}),l.jsx(pe,{amplitude:3,height:10}),l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Selection"}),l.jsx("p",{className:"hint",children:p.length===0?"Drag across cells, or click + Shift to add cells.":`${p.length} cell${p.length===1?"":"s"} selected.`}),l.jsxs("div",{className:"action-stack",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--primary",disabled:!S,onClick:R,title:S?"Merge selected cells":"Selection must form a complete rectangle",children:"⊞ Merge"}),l.jsx("button",{type:"button",className:"action-btn",disabled:!C,onClick:K,children:"⊟ Unmerge"}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",disabled:p.length===0,onClick:T,children:"Clear selection"})]}),p.length>=2&&!S&&l.jsx("p",{className:"hint hint--warn",children:"Selection isn't rectangular — merge requires every cell in a complete rectangle."})]}),l.jsx(pe,{amplitude:3,height:10}),E.length>0&&l.jsxs("section",{className:"card",children:[l.jsxs("h3",{className:"card__title",children:["Color ",E.length>1?`(${E.length} pieces)`:""]}),l.jsxs("div",{className:"color-grid",children:[l.jsx("button",{type:"button",className:`color-swatch color-swatch--clear ${P==null?"color-swatch--active":""}`,onClick:()=>B(null),title:"Clear color","aria-label":"Clear color"}),vg.map(_=>l.jsx("button",{type:"button",className:`color-swatch ${P===_?"color-swatch--active":""}`,style:{background:_},onClick:()=>B(_),title:_,"aria-label":`Color ${_}`},_)),l.jsx("label",{className:"color-swatch color-swatch--custom",title:"Custom color",children:l.jsx("input",{type:"color",value:P||"#888888",onChange:_=>B(_.target.value)})})]})]}),E.length>0&&l.jsx(pe,{amplitude:3,height:10}),l.jsx(pg,{backgrounds:t.backgrounds||[],selectionRect:w,onAddImage:h,onUpdate:d,onRemove:m}),l.jsx(pe,{amplitude:3,height:10}),l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Tips"}),l.jsxs("ul",{className:"tip-list",children:[l.jsx("li",{children:"Drag from any cell to box-select."}),l.jsx("li",{children:"Shift-click to add or remove individual cells."}),l.jsxs("li",{children:[l.jsx("strong",{children:"Click a row/column number"})," to delete it. Drag across multiple to delete in bulk."]}),l.jsx("li",{children:"Merged groups show their dimensions."}),l.jsx("li",{children:"Click any number value to type it directly."}),l.jsxs("li",{children:[l.jsx("strong",{children:"Scroll"})," to zoom; middle-drag or Ctrl+drag to pan."]}),l.jsxs("li",{children:["Select cells, then ",l.jsx("strong",{children:"paste an image"})," (Ctrl+V) to span it across them."]})]})]})]}),l.jsx(Id,{children:l.jsx(fg,{grid:t.grid,selection:p,onSelectionChange:v,pieceColors:t.pieceColors,backgrounds:t.backgrounds,onDeleteRows:_=>{a(_),v([])},onDeleteCols:_=>{c(_),v([])}})}),x&&l.jsx(hg,{onClose:()=>g(!1),onImport:f})]})}function wg(){return l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Per-edge override"}),l.jsxs("p",{className:"hint",children:["Click an edge in the canvas to give it its own effect.",l.jsx("br",{}),"Shift-click to select multiple edges and edit them together."]})]})}const Ze={frequency:.025,amplitude:12,phase:0},te="__mixed__",Rl=e=>e.charAt(0).toUpperCase()+e.slice(1);function Fl({config:e,onPatchConfig:t}){const n=(e==null?void 0:e.color)===te,r=(e==null?void 0:e.opacity)===te,i=(e==null?void 0:e.strokeWidth)===te,o=typeof(e==null?void 0:e.color)=="string"&&e.color!==te?e.color:"#888888",s=typeof(e==null?void 0:e.color)=="string"&&e.color!==te;return l.jsxs("div",{className:"style-controls",children:[l.jsxs("div",{className:"form-row",children:[l.jsx("label",{className:"form-row__label",children:"Color"}),l.jsx("input",{type:"color",className:"form-row__color",value:o,onChange:a=>t({color:a.target.value})}),s?l.jsx("button",{type:"button",className:"link-btn",onClick:()=>t({color:void 0}),children:"reset"}):l.jsx("span",{className:"hint",style:{marginLeft:4},children:n?"mixed":"theme"})]}),l.jsx(tt,{label:"Opacity",min:0,max:1,step:.01,value:r?1:(e==null?void 0:e.opacity)??1,format:a=>`${Math.round(a*100)}%`,onChange:a=>t({opacity:a})}),l.jsx(tt,{label:"Width",min:0,max:10,step:.25,value:i?1.25:(e==null?void 0:e.strokeWidth)??1.25,format:a=>`${a}px`,onChange:a=>t({strokeWidth:a})})]})}function $r({options:e,active:t,onSelect:n,mixed:r=!1}){return l.jsxs("div",{className:"effect-chips",children:[e.map(i=>l.jsx("button",{type:"button",title:i.hint,className:`chip chip--sm ${t===i.id&&!r?"chip--active":""}`,onClick:()=>n(i.id),children:i.label},i.id)),r&&l.jsx("span",{className:"chip chip--sm chip--mixed",children:"mixed"})]})}const Dl=[{id:"none",label:"None",hint:"No effect."},{id:"lift",label:"Lift",hint:"Floats up on hover."},{id:"scale-up",label:"Scale up",hint:"Grows on hover."},{id:"scale-down",label:"Scale down",hint:"Shrinks on hover."},{id:"glow",label:"Glow",hint:"Soft amber halo on hover."},{id:"pulse",label:"Pulse",hint:"Slow ambient breathing (always on)."}],co=[{id:"none",label:"None",hint:"No effect."},{id:"glow",label:"Glow",hint:"Stroke glows when piece is hovered."},{id:"wiggle",label:"Wiggle",hint:"Tiny shake when piece is hovered."},{id:"thicken",label:"Thicken",hint:"Stroke widens when piece is hovered."},{id:"flash",label:"Flash",hint:"Amber pulse when piece is hovered."}];Dl.map(e=>e.id);co.map(e=>e.id);function Do({title:e,hint:t,effect:n,config:r,active:i,onSetEffect:o,onPatchConfig:s,onClear:a}){return l.jsxs("section",{className:`card ${i?"card--accent":""}`,children:[l.jsxs("div",{className:"card__row",children:[l.jsx("h3",{className:"card__title",children:e}),a&&l.jsx("button",{type:"button",className:"link-btn",onClick:a,children:"use default"})]}),t&&l.jsx("p",{className:"hint",children:t}),l.jsx("div",{className:"effect-chips",children:Dn.map(c=>l.jsx("button",{type:"button",className:`chip chip--sm ${n===c?"chip--active":""}`,onClick:()=>o(c),children:Rl(c)},c))}),n==="wave"&&l.jsxs("div",{className:"wave-config",children:[l.jsx(tt,{label:"Freq",min:.005,max:.1,step:.001,value:(r==null?void 0:r.frequency)??Ze.frequency,format:c=>c.toFixed(3),onChange:c=>s({frequency:c})}),l.jsx(tt,{label:"Amp",min:0,max:40,step:1,value:(r==null?void 0:r.amplitude)??Ze.amplitude,onChange:c=>s({amplitude:c})})]}),l.jsx(Fl,{config:r,onPatchConfig:s}),l.jsxs("div",{className:"form-row form-row--stack",children:[l.jsx("label",{className:"form-row__label",children:"Hover"}),l.jsx($r,{options:co,active:(r==null?void 0:r.hoverAnimation)||"none",onSelect:c=>s({hoverAnimation:c==="none"?null:c})})]})]})}function kg({selected:e,project:t,pieces:n,sharedEdges:r,onClearSelection:i,setEdgeEffect:o,setEdgeConfig:s,clearEdgeOverride:a}){var S,C,E,P,B,R,K;const c=z.useMemo(()=>new Map(n.map(T=>[T.id,T])),[n]),u=t.edges.default.effect,d=t.edges.default.config??Ze,m=t.edges.inner,p=t.edges.outer,v=t.edges.byPiece||{},x=T=>{const _=t.edges.byEdge[T],F=T.includes("||outer-")?p:m;let I=null;for(const O of wh(T))if(v[O]){I=v[O];break}return{effect:(_==null?void 0:_.effect)??(I==null?void 0:I.effect)??(F==null?void 0:F.effect)??u,cfg:(_==null?void 0:_.config)??(I==null?void 0:I.config)??(F==null?void 0:F.config)??d}},g=z.useMemo(()=>{if(e.size===0)return null;let T=null,_=null,A=!0;for(const F of e){const{effect:I,cfg:O}=x(F);A?(T=I,_=O,A=!1):(I!==T&&(T=te),(_==null?void 0:_.frequency)!==(O==null?void 0:O.frequency)&&(_={..._,frequency:te}),(_==null?void 0:_.amplitude)!==(O==null?void 0:O.amplitude)&&(_={..._,amplitude:te}),(_==null?void 0:_.inverted)!==(O==null?void 0:O.inverted)&&(_={..._,inverted:te}),(_==null?void 0:_.color)!==(O==null?void 0:O.color)&&(_={..._,color:te}),(_==null?void 0:_.opacity)!==(O==null?void 0:O.opacity)&&(_={..._,opacity:te}),(_==null?void 0:_.strokeWidth)!==(O==null?void 0:O.strokeWidth)&&(_={..._,strokeWidth:te}),(_==null?void 0:_.hoverAnimation)!==(O==null?void 0:O.hoverAnimation)&&(_={..._,hoverAnimation:te}))}return{effect:T,cfg:_}},[e,t.edges.byEdge,v,u,d,m,p]),w=T=>{const _=T==="wave"?g!=null&&g.cfg&&g.cfg.frequency!==te&&g.cfg.amplitude!==te?g.cfg:d:void 0;for(const A of e)o(A,T,_)},h=T=>{for(const _ of e)s(_,T)},f=()=>{for(const T of e)a(T)},y=(g==null?void 0:g.effect)==="puzzle"||(g==null?void 0:g.effect)===te&&[...e].some(T=>x(T).effect==="puzzle"),k=(g==null?void 0:g.effect)==="wave"||(g==null?void 0:g.effect)===te&&[...e].some(T=>x(T).effect==="wave");return l.jsxs("section",{className:"card card--accent",children:[l.jsxs("div",{className:"card__row",children:[l.jsx("h3",{className:"card__title",children:e.size===1?"Selected edge":`${e.size} edges selected`}),l.jsx("button",{type:"button",className:"link-btn",onClick:i,children:"clear"})]}),e.size===1&&(()=>{var A,F;const T=[...e][0],_=r.find(I=>I.pairKey===T);return _?l.jsxs("p",{className:"hint",children:[((A=c.get(_.pieceAId))==null?void 0:A.label)??_.pieceAId," ↔ ",((F=c.get(_.pieceBId))==null?void 0:F.label)??_.pieceBId]}):null})(),l.jsxs("div",{className:"effect-chips",children:[Dn.map(T=>l.jsx("button",{type:"button",className:`chip chip--sm ${(g==null?void 0:g.effect)===T?"chip--active":""}`,onClick:()=>w(T),children:Rl(T)},T)),(g==null?void 0:g.effect)===te&&l.jsx("span",{className:"chip chip--sm chip--mixed",children:"mixed"})]}),y&&l.jsx("div",{className:"puzzle-config",children:l.jsxs("button",{type:"button",className:`invert-tabs-btn ${((S=g==null?void 0:g.cfg)==null?void 0:S.inverted)===!0?"invert-tabs-btn--active":""}`,onClick:()=>{var T;return h({inverted:((T=g==null?void 0:g.cfg)==null?void 0:T.inverted)!==!0})},title:"Toggle tab/socket orientation",children:[l.jsx("span",{className:"invert-tabs-btn__icon",children:"⟷"}),l.jsx("span",{children:"Invert"})]})}),k&&l.jsxs("div",{className:"wave-config",children:[l.jsx(tt,{label:"Freq",min:.005,max:.1,step:.001,value:((C=g==null?void 0:g.cfg)==null?void 0:C.frequency)===te?d.frequency??Ze.frequency:((E=g==null?void 0:g.cfg)==null?void 0:E.frequency)??Ze.frequency,format:T=>{var _;return((_=g==null?void 0:g.cfg)==null?void 0:_.frequency)===te?`· ${T.toFixed(3)}`:T.toFixed(3)},onChange:T=>h({frequency:T})}),l.jsx(tt,{label:"Amp",min:0,max:40,step:1,value:((P=g==null?void 0:g.cfg)==null?void 0:P.amplitude)===te?d.amplitude??Ze.amplitude:((B=g==null?void 0:g.cfg)==null?void 0:B.amplitude)??Ze.amplitude,format:T=>{var _;return((_=g==null?void 0:g.cfg)==null?void 0:_.amplitude)===te?`· ${T}`:`${T}`},onChange:T=>h({amplitude:T})})]}),l.jsx(Fl,{config:g==null?void 0:g.cfg,onPatchConfig:h}),l.jsxs("div",{className:"form-row form-row--stack",children:[l.jsx("label",{className:"form-row__label",children:"Hover"}),l.jsx($r,{options:co,active:(R=g==null?void 0:g.cfg)!=null&&R.hoverAnimation&&g.cfg.hoverAnimation!==te?g.cfg.hoverAnimation:"none",mixed:((K=g==null?void 0:g.cfg)==null?void 0:K.hoverAnimation)===te,onSelect:T=>h({hoverAnimation:T==="none"?null:T})})]}),l.jsx("div",{className:"action-stack",children:l.jsxs("button",{type:"button",className:"action-btn action-btn--ghost",onClick:f,children:["Reset ",e.size===1?"this edge":`these ${e.size} edges`," to default"]})})]})}function Sg({piece:e,project:t,onClearSelection:n,setPieceEdgeEffect:r,setPieceEdgeConfig:i,clearPieceEdgeOverride:o}){var x;const s=t.edges.default.effect,a=t.edges.default.config??Ze,c=((x=t.edges.byPiece)==null?void 0:x[e.id])||null,u=(c==null?void 0:c.effect)??s,d=(c==null?void 0:c.config)??a,m=g=>{const w=g==="wave"?(c==null?void 0:c.config)??a:void 0;r(e.id,g,w)},p=g=>i(e.id,g),v=()=>o(e.id);return l.jsxs("section",{className:"card card--accent",children:[l.jsxs("div",{className:"card__row",children:[l.jsx("h3",{className:"card__title",children:e.label||"Selected piece"}),l.jsx("button",{type:"button",className:"link-btn",onClick:n,children:"clear"})]}),l.jsx("p",{className:"hint",children:c?"Cell override applies to every edge of this piece. Per-edge picks still win.":"Pick an effect to override every edge of this piece at once."}),l.jsx("div",{className:"effect-chips",children:Dn.map(g=>l.jsx("button",{type:"button",className:`chip chip--sm ${u===g?"chip--active":""}`,onClick:()=>m(g),children:Rl(g)},g))}),u==="puzzle"&&l.jsx("div",{className:"puzzle-config",children:l.jsxs("button",{type:"button",className:`invert-tabs-btn ${(d==null?void 0:d.inverted)===!0?"invert-tabs-btn--active":""}`,onClick:()=>p({inverted:(d==null?void 0:d.inverted)!==!0}),title:"Toggle tab/socket orientation",children:[l.jsx("span",{className:"invert-tabs-btn__icon",children:"⟷"}),l.jsx("span",{children:"Invert"})]})}),u==="wave"&&l.jsxs("div",{className:"wave-config",children:[l.jsx(tt,{label:"Freq",min:.005,max:.1,step:.001,value:(d==null?void 0:d.frequency)??Ze.frequency,format:g=>g.toFixed(3),onChange:g=>p({frequency:g})}),l.jsx(tt,{label:"Amp",min:0,max:40,step:1,value:(d==null?void 0:d.amplitude)??Ze.amplitude,onChange:g=>p({amplitude:g})})]}),l.jsx(Fl,{config:d,onPatchConfig:p}),l.jsxs("div",{className:"form-row form-row--stack",children:[l.jsx("label",{className:"form-row__label",children:"Hover"}),l.jsx($r,{options:co,active:(d==null?void 0:d.hoverAnimation)||"none",onSelect:g=>p({hoverAnimation:g==="none"?null:g})})]}),c&&l.jsx("div",{className:"action-stack",children:l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:v,children:"Reset this piece's edges to default"})})]})}function _g({project:e,pieces:t,sharedEdges:n,allEdges:r,selected:i,onClearEdgeSelection:o,setEdgeEffect:s,setEdgeConfig:a,clearEdgeOverride:c,resetEdgeOverrides:u,selectedPiece:d,onClearPieceSelection:m,setPieceEdgeEffect:p,setPieceEdgeConfig:v,clearPieceEdgeOverride:x,setDefaultEdgeEffect:g,setDefaultEdgeConfig:w,setLayerEffect:h,setLayerConfig:f,clearLayer:y}){const k=e.edges.default.effect,S=e.edges.default.config??Ze,C=e.edges.inner,E=e.edges.outer,P=Object.keys(e.edges.byEdge).length,B=Object.keys(e.edges.byPiece||{}).length,R=i.size>0,K=!!d,T=R?[...i].some(b=>!b.includes("||outer-")):K?r.some(b=>!b.isOuter&&(b.pieceAId===d.id||b.pieceBId===d.id)):!1,_=R?[...i].some(b=>b.includes("||outer-")):K?r.some(b=>b.isOuter&&b.pieceId===d.id):!1,A=l.jsx(Do,{title:"Default effect",hint:"Applied to every edge unless overridden below.",effect:k,config:S,onSetEffect:b=>g(b,b==="wave"?S:void 0),onPatchConfig:w}),F=l.jsx(Do,{title:"Inner edges",hint:C?"Override applied to every shared edge. Cell + per-edge picks still win.":"No override — inner edges follow the default. Pick an effect to override.",effect:(C==null?void 0:C.effect)??k,config:(C==null?void 0:C.config)??S,active:!!C,onSetEffect:b=>h("inner",b,b==="wave"?(C==null?void 0:C.config)??S:void 0),onPatchConfig:b=>f("inner",b),onClear:C?()=>y("inner"):null}),I=l.jsx(Do,{title:"Outer edges",hint:E?"Override applied to every outer edge. Cell + per-edge picks still win.":"No override — outer edges follow the default. Pick an effect to override.",effect:(E==null?void 0:E.effect)??k,config:(E==null?void 0:E.config)??S,active:!!E,onSetEffect:b=>h("outer",b,b==="wave"?(E==null?void 0:E.config)??S:void 0),onPatchConfig:b=>f("outer",b),onClear:E?()=>y("outer"):null}),O=R?l.jsx(kg,{selected:i,project:e,pieces:t,sharedEdges:n,onClearSelection:o,setEdgeEffect:s,setEdgeConfig:a,clearEdgeOverride:c}):K?l.jsx(Sg,{piece:d,project:e,onClearSelection:m,setPieceEdgeEffect:p,setPieceEdgeConfig:v,clearPieceEdgeOverride:x}):l.jsx(wg,{}),M=P>0||B>0;return l.jsxs(l.Fragment,{children:[O,l.jsx(pe,{amplitude:3,height:10}),!R&&!K&&A,T&&F,_&&I,(R||K)&&A,M&&l.jsx("div",{className:"action-stack",children:l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:u,children:"Clear all overrides"})})]})}const jg=[{value:"left",label:"⇤"},{value:"center",label:"↔"},{value:"right",label:"⇥"}];function Eg({project:e,selectedPiece:t,onClearSelection:n,setPieceContent:r,updatePieceContent:i,setDefaultCellHoverAnimation:o,setCellHoverAnimation:s}){var c,u;const a=((u=(c=e==null?void 0:e.cells)==null?void 0:c.default)==null?void 0:u.hoverAnimation)??"none";return l.jsxs(l.Fragment,{children:[l.jsx(Cg,{animation:a,onSetAnimation:o}),t?l.jsx(Ng,{piece:t,project:e,onClearSelection:n,setPieceContent:r,updatePieceContent:i,setCellHoverAnimation:s}):l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Selected cell"}),l.jsx("p",{className:"hint",children:"Click a piece in the canvas to edit its content and hover effect."})]})]})}function Cg({animation:e,onSetAnimation:t}){return l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Default cell hover"}),l.jsx("p",{className:"hint",children:"Applied to every piece unless it has its own hover effect below."}),l.jsx($r,{options:Dl,active:e||"none",onSelect:t})]})}function Ng({piece:e,project:t,onClearSelection:n,setPieceContent:r,updatePieceContent:i,setCellHoverAnimation:o}){var v,x,g,w,h;const s=e.content||null,a=((g=(x=(v=t==null?void 0:t.cells)==null?void 0:v.byPiece)==null?void 0:x[e.id])==null?void 0:g.hoverAnimation)??null,c=((h=(w=t==null?void 0:t.cells)==null?void 0:w.default)==null?void 0:h.hoverAnimation)??null,u=f=>{if(f==="none")return r(e.id,null);if(f==="text")return r(e.id,{type:"text",text:(s==null?void 0:s.text)||""});if(f==="image")return r(e.id,{type:"image",src:(s==null?void 0:s.src)||"",fit:(s==null?void 0:s.fit)||"cover"})},d=f=>{if(!f)return;const y=new FileReader;y.onload=k=>{i(e.id,{type:"image",src:k.target.result,fit:(s==null?void 0:s.fit)||"cover"})},y.readAsDataURL(f)},{inputProps:m,open:p}=Ol(d);return l.jsxs("section",{className:"card card--accent",children:[l.jsxs("div",{className:"card__row",children:[l.jsx("h3",{className:"card__title",children:e.label||e.id}),l.jsx("button",{type:"button",className:"link-btn",onClick:n,children:"clear"})]}),l.jsx("div",{className:"effect-chips",children:[{v:"none",l:"Empty"},{v:"text",l:"Text"},{v:"image",l:"Image"}].map(f=>l.jsx("button",{type:"button",className:`chip chip--sm ${((s==null?void 0:s.type)||"none")===f.v?"chip--active":""}`,onClick:()=>u(f.v),children:f.l},f.v))}),(s==null?void 0:s.type)==="text"&&l.jsxs("div",{className:"content-config",children:[l.jsx("textarea",{className:"modal__textarea",style:{minHeight:80},placeholder:"Enter text…",value:s.text||"",onChange:f=>i(e.id,{text:f.target.value})}),l.jsxs("div",{className:"form-row",children:[l.jsx("label",{className:"form-row__label",children:"Align"}),l.jsx("div",{className:"effect-chips",children:jg.map(f=>l.jsx("button",{type:"button",className:`chip chip--sm ${(s.align||"center")===f.value?"chip--active":""}`,onClick:()=>i(e.id,{align:f.value}),title:f.value,children:f.label},f.value))})]}),l.jsx(tt,{label:"Size",min:8,max:64,step:1,value:Math.round(s.fontSize||Math.min(e.w,e.h)/8),onChange:f=>i(e.id,{fontSize:f})}),l.jsxs("div",{className:"form-row",children:[l.jsx("label",{className:"form-row__label",children:"Color"}),l.jsx("input",{type:"color",className:"form-row__color",value:s.color||"#ede8de",onChange:f=>i(e.id,{color:f.target.value})})]})]}),(s==null?void 0:s.type)==="image"&&l.jsxs("div",{className:"content-config",children:[l.jsx("input",{...m,type:"file",accept:"image/*",hidden:!0}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:p,children:s.src?"Replace image":"↑ Upload image"}),s.src&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"image-preview",children:l.jsx("img",{src:s.src,alt:"preview"})}),l.jsxs("div",{className:"form-row",children:[l.jsx("label",{className:"form-row__label",children:"Fit"}),l.jsx("div",{className:"effect-chips",children:Ad.map(f=>l.jsx("button",{type:"button",className:`chip chip--sm ${(s.fit||"cover")===f.value?"chip--active":""}`,onClick:()=>i(e.id,{fit:f.value}),title:f.hint,children:f.label},f.value))})]})]})]}),l.jsxs("div",{className:"form-row",style:{flexDirection:"column",alignItems:"flex-start",gap:4},children:[l.jsx("label",{className:"form-row__label",children:"Hover effect"}),l.jsx("p",{className:"hint",style:{margin:0},children:a?`Overriding default${c?` (${c})`:""}.`:`Following default${c?` (${c})`:" (none)"}.`})]}),l.jsx($r,{options:Dl,active:a||"none",onSelect:f=>o(e.id,f)}),l.jsx("div",{className:"action-stack",children:l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:()=>r(e.id,null),disabled:!s,children:"Clear content"})})]})}const Pg=60;function zg(e,t,n,r=Pg){if(e.length===0)return{x:0,y:0,w:1,h:1};const i=e.reduce((o,s)=>{const a=ao(s,e,t,n);return{minX:Math.min(o.minX,a.minX),minY:Math.min(o.minY,a.minY),maxX:Math.max(o.maxX,a.maxX),maxY:Math.max(o.maxY,a.maxY)}},{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0});return{x:i.minX-r,y:i.minY-r,w:i.maxX-i.minX+r*2,h:i.maxY-i.minY+r*2}}const Rs=24,nc=Rs/2,ri=60;function rc(e,t,n){if(n==="right"||n==="left"){const s=n==="right"?e.x+e.w:e.x,a=t?Math.max(e.y,t.y):e.y,c=t?Math.min(e.y+e.h,t.y+t.h):e.y+e.h;return{isVertical:!0,x:s-nc,y:a,w:Rs,h:c-a,lx1:s,ly1:a,lx2:s,ly2:c}}const r=n==="bottom"?e.y+e.h:e.y,i=t?Math.max(e.x,t.x):e.x,o=t?Math.min(e.x+e.w,t.x+t.w):e.x+e.w;return{isVertical:!1,x:i,y:r-nc,w:o-i,h:Rs,lx1:i,ly1:r,lx2:o,ly2:r}}function Mg({pieces:e,effect:t,effectConfig:n,allEdges:r,selectedEdgeIds:i,onSelectEdge:o,isOverridden:s,selectedPieceId:a,onSelectPiece:c}){const u=z.useMemo(()=>new Map(e.map(p=>[p.id,p])),[e]),d=z.useMemo(()=>zg(e,t,n),[e,t,n]),m=z.useMemo(()=>{const p=[];for(const v of r){const x=(s==null?void 0:s(v.pairKey))??!1;if(v.isOuter){const g=u.get(v.pieceId);if(!g)continue;p.push({pairKey:v.pairKey,...rc(g,null,v.side),overridden:x,isOuter:!0,pieceId:v.pieceId,side:v.side})}else{const g=u.get(v.pieceAId),w=u.get(v.pieceBId);if(!g||!w)continue;p.push({pairKey:v.pairKey,...rc(g,w,v.sideA),overridden:x,isOuter:!1,pieceAId:v.pieceAId,pieceBId:v.pieceBId,sideA:v.sideA})}}return p},[r,u,s]);return l.jsxs("div",{className:"edge-canvas",children:[l.jsx(ln,{pieces:e,effect:t,effectConfig:n,selectedId:a,onSelect:c}),l.jsxs("svg",{className:"edge-canvas__overlay",viewBox:`${d.x} ${d.y} ${d.w} ${d.h}`,width:d.w,height:d.h,xmlns:"http://www.w3.org/2000/svg",children:[l.jsx("defs",{children:m.map(p=>{const v=p.isVertical?{x:p.lx1-ri,y:p.ly1,w:ri*2,h:p.ly2-p.ly1}:{x:p.lx1,y:p.ly1-ri,w:p.lx2-p.lx1,h:ri*2};return l.jsx("clipPath",{id:`ec-clip-${p.pairKey}`,children:l.jsx("rect",{x:v.x,y:v.y,width:v.w,height:v.h})},p.pairKey)})}),m.map(p=>{const v=i==null?void 0:i.has(p.pairKey),x=p.isOuter?Ja(u.get(p.pieceId),e,p.side,t,n):Ja(u.get(p.pieceAId),e,p.sideA,t,n);return l.jsxs("g",{className:"edge-hit "+(v?"edge-hit--selected ":"")+(p.overridden?"edge-hit--override":""),onClick:g=>{g.stopPropagation(),o(p.pairKey,g)},children:[l.jsx("rect",{x:p.x,y:p.y,width:p.w,height:p.h,className:"edge-hit__hit"}),x&&l.jsx("path",{d:x,className:"edge-hit__line",fill:"none",clipPath:`url(#ec-clip-${p.pairKey})`})]},p.pairKey)})]})]})}function bg({pieces:e,effect:t,effectConfig:n,selectedId:r,onSelectPiece:i}){return l.jsx("div",{className:"cells-canvas",children:l.jsx(ln,{pieces:e,selectedId:r,effect:t,effectConfig:n,onSelect:i})})}function Ag({mode:e,pieces:t,effect:n,effectConfig:r,allEdges:i,selectedEdgeIds:o,onSelectEdge:s,isOverridden:a,selectedPieceId:c,onSelectPiece:u}){return e==="edges"?l.jsx(Mg,{pieces:t,effect:n,effectConfig:r,allEdges:i,selectedEdgeIds:o,onSelectEdge:s,isOverridden:a,selectedPieceId:c,onSelectPiece:u}):l.jsx(bg,{pieces:t,effect:n,effectConfig:r,selectedId:c,onSelectPiece:u})}const Ig={frequency:.025,amplitude:12,phase:0};function $g({project:e,mode:t="edges"}){const{project:n,pieces:r,sharedEdges:i,setDefaultEdgeEffect:o,setDefaultEdgeConfig:s,setEdgeEffect:a,setEdgeConfig:c,clearEdgeOverride:u,resetEdgeOverrides:d,setLayerEffect:m,setLayerConfig:p,clearLayer:v,setPieceEdgeEffect:x,setPieceEdgeConfig:g,clearPieceEdgeOverride:w,setPieceContent:h,updatePieceContent:f,setDefaultCellHoverAnimation:y,setCellHoverAnimation:k}=e,[S,C]=z.useState(()=>new Set),[E,P]=z.useState(null),B=z.useCallback(I=>!!(n!=null&&n.edges.byEdge[I]),[n==null?void 0:n.edges.byEdge]),R=z.useCallback((I,O)=>{P(null),C(M=>{const b=new Set(M);return O!=null&&O.shiftKey||O!=null&&O.ctrlKey||O!=null&&O.metaKey?b.has(I)?b.delete(I):b.add(I):b.size===1&&b.has(I)?b.clear():(b.clear(),b.add(I)),b})},[]),K=z.useCallback(I=>{C(new Set),P(I)},[]);z.useEffect(()=>{const I=O=>{O.key==="Escape"&&(C(new Set),P(null))};return window.addEventListener("keydown",I),()=>window.removeEventListener("keydown",I)},[]);const T=z.useMemo(()=>n?[...i,...zh(n)]:[],[n,i]);if(!n)return null;const _=n.edges.default.effect,A=n.edges.default.config??Ig,F=E?r.find(I=>I.id===E):null;return l.jsxs("div",{className:"page-edit",children:[l.jsxs("aside",{className:"side-tools",children:[l.jsx("div",{className:"side-tools__brand",children:l.jsx(Bn,{size:"sm"})}),t==="edges"?l.jsx(_g,{project:n,pieces:r,sharedEdges:i,allEdges:T,selected:S,onClearEdgeSelection:()=>C(new Set),selectedPiece:F,onClearPieceSelection:()=>P(null),setDefaultEdgeEffect:o,setDefaultEdgeConfig:s,setEdgeEffect:a,setEdgeConfig:c,clearEdgeOverride:u,resetEdgeOverrides:d,setLayerEffect:m,setLayerConfig:p,clearLayer:v,setPieceEdgeEffect:x,setPieceEdgeConfig:g,clearPieceEdgeOverride:w}):l.jsx(Eg,{project:n,selectedPiece:F,onClearSelection:()=>P(null),setPieceContent:h,updatePieceContent:f,setDefaultCellHoverAnimation:y,setCellHoverAnimation:k})]}),l.jsx(Id,{children:l.jsx(Ag,{mode:t,pieces:r,effect:_,effectConfig:A,allEdges:T,selectedEdgeIds:S,onSelectEdge:R,isOverridden:B,selectedPieceId:E,onSelectPiece:K})})]})}const $d="hakoniwa:theme",Tg="puzzle-studio:theme";function Lg(){try{return localStorage.getItem($d)||localStorage.getItem(Tg)||"dark"}catch{return"dark"}}const Td="hakoniwa:lastPage";function Og(){try{const e=localStorage.getItem(Td)||"landing";return e==="edit"?"edges":e}catch{return"landing"}}function Rg(){var s;const[e,t]=z.useState(Og),n=Wh(),[r,i]=z.useState(Lg);z.useEffect(()=>{try{localStorage.setItem(Td,e)}catch{}},[e]),z.useEffect(()=>{document.documentElement.setAttribute("data-theme",r);try{localStorage.setItem($d,r)}catch{}},[r]);const o=()=>i(a=>a==="dark"?"light":"dark");return l.jsxs("div",{className:"app",children:[l.jsx(pm,{page:e,onNav:t,projectName:(s=n.project)==null?void 0:s.name,theme:r,onToggleTheme:o}),l.jsxs("main",{className:"app__page",children:[e==="landing"&&l.jsx(gm,{onNav:t}),e==="docs"&&l.jsx(bm,{onNav:t}),e==="projects"&&l.jsx(Lm,{project:n,onNav:t}),e==="preview"&&l.jsx(lg,{project:n,onNav:t}),e==="grid"&&l.jsx(xg,{project:n}),(e==="edges"||e==="cells")&&l.jsx($g,{project:n,mode:e})]})]})}Bo.createRoot(document.getElementById("root")).render(l.jsx(qd.StrictMode,{children:l.jsx(Rg,{})}));
