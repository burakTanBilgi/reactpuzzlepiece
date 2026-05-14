(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function Hd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var lc={exports:{}},Hi={},ac={exports:{}},Y={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pr=Symbol.for("react.element"),Vd=Symbol.for("react.portal"),Yd=Symbol.for("react.fragment"),Xd=Symbol.for("react.strict_mode"),Gd=Symbol.for("react.profiler"),Qd=Symbol.for("react.provider"),Zd=Symbol.for("react.context"),Jd=Symbol.for("react.forward_ref"),qd=Symbol.for("react.suspense"),ef=Symbol.for("react.memo"),tf=Symbol.for("react.lazy"),Wl=Symbol.iterator;function nf(e){return e===null||typeof e!="object"?null:(e=Wl&&e[Wl]||e["@@iterator"],typeof e=="function"?e:null)}var cc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},uc=Object.assign,dc={};function On(e,t,n){this.props=e,this.context=t,this.refs=dc,this.updater=n||cc}On.prototype.isReactComponent={};On.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};On.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function fc(){}fc.prototype=On.prototype;function Bo(e,t,n){this.props=e,this.context=t,this.refs=dc,this.updater=n||cc}var Uo=Bo.prototype=new fc;Uo.constructor=Bo;uc(Uo,On.prototype);Uo.isPureReactComponent=!0;var Kl=Array.isArray,pc=Object.prototype.hasOwnProperty,Wo={current:null},hc={key:!0,ref:!0,__self:!0,__source:!0};function mc(e,t,n){var r,i={},s=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(s=""+t.key),t)pc.call(t,r)&&!hc.hasOwnProperty(r)&&(i[r]=t[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var c=Array(a),u=0;u<a;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:Pr,type:e,key:s,ref:o,props:i,_owner:Wo.current}}function rf(e,t){return{$$typeof:Pr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Ko(e){return typeof e=="object"&&e!==null&&e.$$typeof===Pr}function sf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Hl=/\/+/g;function fs(e,t){return typeof e=="object"&&e!==null&&e.key!=null?sf(""+e.key):t.toString(36)}function oi(e,t,n,r,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Pr:case Vd:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+fs(o,0):r,Kl(i)?(n="",e!=null&&(n=e.replace(Hl,"$&/")+"/"),oi(i,t,n,"",function(u){return u})):i!=null&&(Ko(i)&&(i=rf(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Hl,"$&/")+"/")+e)),t.push(i)),1;if(o=0,r=r===""?".":r+":",Kl(e))for(var a=0;a<e.length;a++){s=e[a];var c=r+fs(s,a);o+=oi(s,t,n,c,i)}else if(c=nf(e),typeof c=="function")for(e=c.call(e),a=0;!(s=e.next()).done;)s=s.value,c=r+fs(s,a++),o+=oi(s,t,n,c,i);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Lr(e,t,n){if(e==null)return e;var r=[],i=0;return oi(e,r,"","",function(s){return t.call(n,s,i++)}),r}function of(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var je={current:null},li={transition:null},lf={ReactCurrentDispatcher:je,ReactCurrentBatchConfig:li,ReactCurrentOwner:Wo};function gc(){throw Error("act(...) is not supported in production builds of React.")}Y.Children={map:Lr,forEach:function(e,t,n){Lr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Lr(e,function(){t++}),t},toArray:function(e){return Lr(e,function(t){return t})||[]},only:function(e){if(!Ko(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Y.Component=On;Y.Fragment=Yd;Y.Profiler=Gd;Y.PureComponent=Bo;Y.StrictMode=Xd;Y.Suspense=qd;Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=lf;Y.act=gc;Y.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=uc({},e.props),i=e.key,s=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,o=Wo.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(c in t)pc.call(t,c)&&!hc.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&a!==void 0?a[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){a=Array(c);for(var u=0;u<c;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:Pr,type:e.type,key:i,ref:s,props:r,_owner:o}};Y.createContext=function(e){return e={$$typeof:Zd,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Qd,_context:e},e.Consumer=e};Y.createElement=mc;Y.createFactory=function(e){var t=mc.bind(null,e);return t.type=e,t};Y.createRef=function(){return{current:null}};Y.forwardRef=function(e){return{$$typeof:Jd,render:e}};Y.isValidElement=Ko;Y.lazy=function(e){return{$$typeof:tf,_payload:{_status:-1,_result:e},_init:of}};Y.memo=function(e,t){return{$$typeof:ef,type:e,compare:t===void 0?null:t}};Y.startTransition=function(e){var t=li.transition;li.transition={};try{e()}finally{li.transition=t}};Y.unstable_act=gc;Y.useCallback=function(e,t){return je.current.useCallback(e,t)};Y.useContext=function(e){return je.current.useContext(e)};Y.useDebugValue=function(){};Y.useDeferredValue=function(e){return je.current.useDeferredValue(e)};Y.useEffect=function(e,t){return je.current.useEffect(e,t)};Y.useId=function(){return je.current.useId()};Y.useImperativeHandle=function(e,t,n){return je.current.useImperativeHandle(e,t,n)};Y.useInsertionEffect=function(e,t){return je.current.useInsertionEffect(e,t)};Y.useLayoutEffect=function(e,t){return je.current.useLayoutEffect(e,t)};Y.useMemo=function(e,t){return je.current.useMemo(e,t)};Y.useReducer=function(e,t,n){return je.current.useReducer(e,t,n)};Y.useRef=function(e){return je.current.useRef(e)};Y.useState=function(e){return je.current.useState(e)};Y.useSyncExternalStore=function(e,t,n){return je.current.useSyncExternalStore(e,t,n)};Y.useTransition=function(){return je.current.useTransition()};Y.version="18.3.1";ac.exports=Y;var M=ac.exports;const af=Hd(M);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cf=M,uf=Symbol.for("react.element"),df=Symbol.for("react.fragment"),ff=Object.prototype.hasOwnProperty,pf=cf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,hf={key:!0,ref:!0,__self:!0,__source:!0};function yc(e,t,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)ff.call(t,r)&&!hf.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:uf,type:e,key:s,ref:o,props:i,_owner:pf.current}}Hi.Fragment=df;Hi.jsx=yc;Hi.jsxs=yc;lc.exports=Hi;var l=lc.exports,Us={},vc={exports:{}},Fe={},xc={exports:{}},wc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(z,D){var O=z.length;z.push(D);e:for(;0<O;){var U=O-1>>>1,S=z[U];if(0<i(S,D))z[U]=D,z[O]=S,O=U;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var D=z[0],O=z.pop();if(O!==D){z[0]=O;e:for(var U=0,S=z.length,b=S>>>1;U<b;){var H=2*(U+1)-1,K=z[H],W=H+1,J=z[W];if(0>i(K,O))W<S&&0>i(J,K)?(z[U]=J,z[W]=O,U=W):(z[U]=K,z[H]=O,U=H);else if(W<S&&0>i(J,O))z[U]=J,z[W]=O,U=W;else break e}}return D}function i(z,D){var O=z.sortIndex-D.sortIndex;return O!==0?O:z.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();e.unstable_now=function(){return o.now()-a}}var c=[],u=[],d=1,h=null,p=3,v=!1,x=!1,w=!1,g=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(z){for(var D=n(u);D!==null;){if(D.callback===null)r(u);else if(D.startTime<=z)r(u),D.sortIndex=D.expirationTime,t(c,D);else break;D=n(u)}}function k(z){if(w=!1,y(z),!x)if(n(c)!==null)x=!0,I(_);else{var D=n(u);D!==null&&X(k,D.startTime-z)}}function _(z,D){x=!1,w&&(w=!1,m(A),A=-1),v=!0;var O=p;try{for(y(D),h=n(c);h!==null&&(!(h.expirationTime>D)||z&&!C());){var U=h.callback;if(typeof U=="function"){h.callback=null,p=h.priorityLevel;var S=U(h.expirationTime<=D);D=e.unstable_now(),typeof S=="function"?h.callback=S:h===n(c)&&r(c),y(D)}else r(c);h=n(c)}if(h!==null)var b=!0;else{var H=n(u);H!==null&&X(k,H.startTime-D),b=!1}return b}finally{h=null,p=O,v=!1}}var P=!1,j=null,A=-1,B=5,$=-1;function C(){return!(e.unstable_now()-$<B)}function N(){if(j!==null){var z=e.unstable_now();$=z;var D=!0;try{D=j(!0,z)}finally{D?L():(P=!1,j=null)}}else P=!1}var L;if(typeof f=="function")L=function(){f(N)};else if(typeof MessageChannel<"u"){var T=new MessageChannel,R=T.port2;T.port1.onmessage=N,L=function(){R.postMessage(null)}}else L=function(){g(N,0)};function I(z){j=z,P||(P=!0,L())}function X(z,D){A=g(function(){z(e.unstable_now())},D)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(z){z.callback=null},e.unstable_continueExecution=function(){x||v||(x=!0,I(_))},e.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<z?Math.floor(1e3/z):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(z){switch(p){case 1:case 2:case 3:var D=3;break;default:D=p}var O=p;p=D;try{return z()}finally{p=O}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(z,D){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var O=p;p=z;try{return D()}finally{p=O}},e.unstable_scheduleCallback=function(z,D,O){var U=e.unstable_now();switch(typeof O=="object"&&O!==null?(O=O.delay,O=typeof O=="number"&&0<O?U+O:U):O=U,z){case 1:var S=-1;break;case 2:S=250;break;case 5:S=1073741823;break;case 4:S=1e4;break;default:S=5e3}return S=O+S,z={id:d++,callback:D,priorityLevel:z,startTime:O,expirationTime:S,sortIndex:-1},O>U?(z.sortIndex=O,t(u,z),n(c)===null&&z===n(u)&&(w?(m(A),A=-1):w=!0,X(k,O-U))):(z.sortIndex=S,t(c,z),x||v||(x=!0,I(_))),z},e.unstable_shouldYield=C,e.unstable_wrapCallback=function(z){var D=p;return function(){var O=p;p=D;try{return z.apply(this,arguments)}finally{p=O}}}})(wc);xc.exports=wc;var mf=xc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gf=M,Oe=mf;function E(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var kc=new Set,fr={};function sn(e,t){zn(e,t),zn(e+"Capture",t)}function zn(e,t){for(fr[e]=t,e=0;e<t.length;e++)kc.add(t[e])}var yt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ws=Object.prototype.hasOwnProperty,yf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Vl={},Yl={};function vf(e){return Ws.call(Yl,e)?!0:Ws.call(Vl,e)?!1:yf.test(e)?Yl[e]=!0:(Vl[e]=!0,!1)}function xf(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function wf(e,t,n,r){if(t===null||typeof t>"u"||xf(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ce(e,t,n,r,i,s,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=o}var ve={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ve[e]=new Ce(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ve[t]=new Ce(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ve[e]=new Ce(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ve[e]=new Ce(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ve[e]=new Ce(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ve[e]=new Ce(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ve[e]=new Ce(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ve[e]=new Ce(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ve[e]=new Ce(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ho=/[\-:]([a-z])/g;function Vo(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ho,Vo);ve[t]=new Ce(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ho,Vo);ve[t]=new Ce(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ho,Vo);ve[t]=new Ce(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ve[e]=new Ce(e,1,!1,e.toLowerCase(),null,!1,!1)});ve.xlinkHref=new Ce("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ve[e]=new Ce(e,1,!1,e.toLowerCase(),null,!0,!0)});function Yo(e,t,n,r){var i=ve.hasOwnProperty(t)?ve[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(wf(t,n,i,r)&&(n=null),r||i===null?vf(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var kt=gf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Or=Symbol.for("react.element"),cn=Symbol.for("react.portal"),un=Symbol.for("react.fragment"),Xo=Symbol.for("react.strict_mode"),Ks=Symbol.for("react.profiler"),Sc=Symbol.for("react.provider"),_c=Symbol.for("react.context"),Go=Symbol.for("react.forward_ref"),Hs=Symbol.for("react.suspense"),Vs=Symbol.for("react.suspense_list"),Qo=Symbol.for("react.memo"),_t=Symbol.for("react.lazy"),Ec=Symbol.for("react.offscreen"),Xl=Symbol.iterator;function Wn(e){return e===null||typeof e!="object"?null:(e=Xl&&e[Xl]||e["@@iterator"],typeof e=="function"?e:null)}var se=Object.assign,ps;function Jn(e){if(ps===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ps=t&&t[1]||""}return`
`+ps+e}var hs=!1;function ms(e,t){if(!e||hs)return"";hs=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,a=s.length-1;1<=o&&0<=a&&i[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==s[a]){var c=`
`+i[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=a);break}}}finally{hs=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Jn(e):""}function kf(e){switch(e.tag){case 5:return Jn(e.type);case 16:return Jn("Lazy");case 13:return Jn("Suspense");case 19:return Jn("SuspenseList");case 0:case 2:case 15:return e=ms(e.type,!1),e;case 11:return e=ms(e.type.render,!1),e;case 1:return e=ms(e.type,!0),e;default:return""}}function Ys(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case un:return"Fragment";case cn:return"Portal";case Ks:return"Profiler";case Xo:return"StrictMode";case Hs:return"Suspense";case Vs:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case _c:return(e.displayName||"Context")+".Consumer";case Sc:return(e._context.displayName||"Context")+".Provider";case Go:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Qo:return t=e.displayName||null,t!==null?t:Ys(e.type)||"Memo";case _t:t=e._payload,e=e._init;try{return Ys(e(t))}catch{}}return null}function Sf(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ys(t);case 8:return t===Xo?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Ft(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function jc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function _f(e){var t=jc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Fr(e){e._valueTracker||(e._valueTracker=_f(e))}function Cc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=jc(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function vi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Xs(e,t){var n=t.checked;return se({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Gl(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Ft(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Nc(e,t){t=t.checked,t!=null&&Yo(e,"checked",t,!1)}function Gs(e,t){Nc(e,t);var n=Ft(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Qs(e,t.type,n):t.hasOwnProperty("defaultValue")&&Qs(e,t.type,Ft(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ql(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Qs(e,t,n){(t!=="number"||vi(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var qn=Array.isArray;function Sn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Ft(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Zs(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(E(91));return se({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Zl(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(E(92));if(qn(n)){if(1<n.length)throw Error(E(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Ft(n)}}function zc(e,t){var n=Ft(t.value),r=Ft(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Jl(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Pc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Js(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Pc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Rr,bc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Rr=Rr||document.createElement("div"),Rr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Rr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function pr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var rr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ef=["Webkit","ms","Moz","O"];Object.keys(rr).forEach(function(e){Ef.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),rr[t]=rr[e]})});function Mc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||rr.hasOwnProperty(e)&&rr[e]?(""+t).trim():t+"px"}function Ac(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Mc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var jf=se({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function qs(e,t){if(t){if(jf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(E(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(E(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(E(61))}if(t.style!=null&&typeof t.style!="object")throw Error(E(62))}}function eo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var to=null;function Zo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var no=null,_n=null,En=null;function ql(e){if(e=Ar(e)){if(typeof no!="function")throw Error(E(280));var t=e.stateNode;t&&(t=Qi(t),no(e.stateNode,e.type,t))}}function Tc(e){_n?En?En.push(e):En=[e]:_n=e}function Ic(){if(_n){var e=_n,t=En;if(En=_n=null,ql(e),t)for(e=0;e<t.length;e++)ql(t[e])}}function $c(e,t){return e(t)}function Lc(){}var gs=!1;function Oc(e,t,n){if(gs)return e(t,n);gs=!0;try{return $c(e,t,n)}finally{gs=!1,(_n!==null||En!==null)&&(Lc(),Ic())}}function hr(e,t){var n=e.stateNode;if(n===null)return null;var r=Qi(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(E(231,t,typeof n));return n}var ro=!1;if(yt)try{var Kn={};Object.defineProperty(Kn,"passive",{get:function(){ro=!0}}),window.addEventListener("test",Kn,Kn),window.removeEventListener("test",Kn,Kn)}catch{ro=!1}function Cf(e,t,n,r,i,s,o,a,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var ir=!1,xi=null,wi=!1,io=null,Nf={onError:function(e){ir=!0,xi=e}};function zf(e,t,n,r,i,s,o,a,c){ir=!1,xi=null,Cf.apply(Nf,arguments)}function Pf(e,t,n,r,i,s,o,a,c){if(zf.apply(this,arguments),ir){if(ir){var u=xi;ir=!1,xi=null}else throw Error(E(198));wi||(wi=!0,io=u)}}function on(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Fc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ea(e){if(on(e)!==e)throw Error(E(188))}function bf(e){var t=e.alternate;if(!t){if(t=on(e),t===null)throw Error(E(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return ea(i),e;if(s===r)return ea(i),t;s=s.sibling}throw Error(E(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,a=i.child;a;){if(a===n){o=!0,n=i,r=s;break}if(a===r){o=!0,r=i,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,r=i;break}if(a===r){o=!0,r=s,n=i;break}a=a.sibling}if(!o)throw Error(E(189))}}if(n.alternate!==r)throw Error(E(190))}if(n.tag!==3)throw Error(E(188));return n.stateNode.current===n?e:t}function Rc(e){return e=bf(e),e!==null?Dc(e):null}function Dc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Dc(e);if(t!==null)return t;e=e.sibling}return null}var Bc=Oe.unstable_scheduleCallback,ta=Oe.unstable_cancelCallback,Mf=Oe.unstable_shouldYield,Af=Oe.unstable_requestPaint,ae=Oe.unstable_now,Tf=Oe.unstable_getCurrentPriorityLevel,Jo=Oe.unstable_ImmediatePriority,Uc=Oe.unstable_UserBlockingPriority,ki=Oe.unstable_NormalPriority,If=Oe.unstable_LowPriority,Wc=Oe.unstable_IdlePriority,Vi=null,lt=null;function $f(e){if(lt&&typeof lt.onCommitFiberRoot=="function")try{lt.onCommitFiberRoot(Vi,e,void 0,(e.current.flags&128)===128)}catch{}}var et=Math.clz32?Math.clz32:Ff,Lf=Math.log,Of=Math.LN2;function Ff(e){return e>>>=0,e===0?32:31-(Lf(e)/Of|0)|0}var Dr=64,Br=4194304;function er(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Si(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,s=e.pingedLanes,o=n&268435455;if(o!==0){var a=o&~i;a!==0?r=er(a):(s&=o,s!==0&&(r=er(s)))}else o=n&~i,o!==0?r=er(o):s!==0&&(r=er(s));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,s=t&-t,i>=s||i===16&&(s&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-et(t),i=1<<n,r|=e[n],t&=~i;return r}function Rf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Df(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var o=31-et(s),a=1<<o,c=i[o];c===-1?(!(a&n)||a&r)&&(i[o]=Rf(a,t)):c<=t&&(e.expiredLanes|=a),s&=~a}}function so(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Kc(){var e=Dr;return Dr<<=1,!(Dr&4194240)&&(Dr=64),e}function ys(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function br(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-et(t),e[t]=n}function Bf(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-et(n),s=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~s}}function qo(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-et(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var Z=0;function Hc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Vc,el,Yc,Xc,Gc,oo=!1,Ur=[],Pt=null,bt=null,Mt=null,mr=new Map,gr=new Map,jt=[],Uf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function na(e,t){switch(e){case"focusin":case"focusout":Pt=null;break;case"dragenter":case"dragleave":bt=null;break;case"mouseover":case"mouseout":Mt=null;break;case"pointerover":case"pointerout":mr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":gr.delete(t.pointerId)}}function Hn(e,t,n,r,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},t!==null&&(t=Ar(t),t!==null&&el(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Wf(e,t,n,r,i){switch(t){case"focusin":return Pt=Hn(Pt,e,t,n,r,i),!0;case"dragenter":return bt=Hn(bt,e,t,n,r,i),!0;case"mouseover":return Mt=Hn(Mt,e,t,n,r,i),!0;case"pointerover":var s=i.pointerId;return mr.set(s,Hn(mr.get(s)||null,e,t,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,gr.set(s,Hn(gr.get(s)||null,e,t,n,r,i)),!0}return!1}function Qc(e){var t=Ht(e.target);if(t!==null){var n=on(t);if(n!==null){if(t=n.tag,t===13){if(t=Fc(n),t!==null){e.blockedOn=t,Gc(e.priority,function(){Yc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ai(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=lo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);to=r,n.target.dispatchEvent(r),to=null}else return t=Ar(n),t!==null&&el(t),e.blockedOn=n,!1;t.shift()}return!0}function ra(e,t,n){ai(e)&&n.delete(t)}function Kf(){oo=!1,Pt!==null&&ai(Pt)&&(Pt=null),bt!==null&&ai(bt)&&(bt=null),Mt!==null&&ai(Mt)&&(Mt=null),mr.forEach(ra),gr.forEach(ra)}function Vn(e,t){e.blockedOn===t&&(e.blockedOn=null,oo||(oo=!0,Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority,Kf)))}function yr(e){function t(i){return Vn(i,e)}if(0<Ur.length){Vn(Ur[0],e);for(var n=1;n<Ur.length;n++){var r=Ur[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Pt!==null&&Vn(Pt,e),bt!==null&&Vn(bt,e),Mt!==null&&Vn(Mt,e),mr.forEach(t),gr.forEach(t),n=0;n<jt.length;n++)r=jt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<jt.length&&(n=jt[0],n.blockedOn===null);)Qc(n),n.blockedOn===null&&jt.shift()}var jn=kt.ReactCurrentBatchConfig,_i=!0;function Hf(e,t,n,r){var i=Z,s=jn.transition;jn.transition=null;try{Z=1,tl(e,t,n,r)}finally{Z=i,jn.transition=s}}function Vf(e,t,n,r){var i=Z,s=jn.transition;jn.transition=null;try{Z=4,tl(e,t,n,r)}finally{Z=i,jn.transition=s}}function tl(e,t,n,r){if(_i){var i=lo(e,t,n,r);if(i===null)Ns(e,t,r,Ei,n),na(e,r);else if(Wf(i,e,t,n,r))r.stopPropagation();else if(na(e,r),t&4&&-1<Uf.indexOf(e)){for(;i!==null;){var s=Ar(i);if(s!==null&&Vc(s),s=lo(e,t,n,r),s===null&&Ns(e,t,r,Ei,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Ns(e,t,r,null,n)}}var Ei=null;function lo(e,t,n,r){if(Ei=null,e=Zo(r),e=Ht(e),e!==null)if(t=on(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Fc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ei=e,null}function Zc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Tf()){case Jo:return 1;case Uc:return 4;case ki:case If:return 16;case Wc:return 536870912;default:return 16}default:return 16}}var Nt=null,nl=null,ci=null;function Jc(){if(ci)return ci;var e,t=nl,n=t.length,r,i="value"in Nt?Nt.value:Nt.textContent,s=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[s-r];r++);return ci=i.slice(e,1<r?1-r:void 0)}function ui(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Wr(){return!0}function ia(){return!1}function Re(e){function t(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Wr:ia,this.isPropagationStopped=ia,this}return se(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Wr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Wr)},persist:function(){},isPersistent:Wr}),t}var Fn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rl=Re(Fn),Mr=se({},Fn,{view:0,detail:0}),Yf=Re(Mr),vs,xs,Yn,Yi=se({},Mr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:il,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Yn&&(Yn&&e.type==="mousemove"?(vs=e.screenX-Yn.screenX,xs=e.screenY-Yn.screenY):xs=vs=0,Yn=e),vs)},movementY:function(e){return"movementY"in e?e.movementY:xs}}),sa=Re(Yi),Xf=se({},Yi,{dataTransfer:0}),Gf=Re(Xf),Qf=se({},Mr,{relatedTarget:0}),ws=Re(Qf),Zf=se({},Fn,{animationName:0,elapsedTime:0,pseudoElement:0}),Jf=Re(Zf),qf=se({},Fn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ep=Re(qf),tp=se({},Fn,{data:0}),oa=Re(tp),np={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ip={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function sp(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=ip[e])?!!t[e]:!1}function il(){return sp}var op=se({},Mr,{key:function(e){if(e.key){var t=np[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ui(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?rp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:il,charCode:function(e){return e.type==="keypress"?ui(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ui(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),lp=Re(op),ap=se({},Yi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),la=Re(ap),cp=se({},Mr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:il}),up=Re(cp),dp=se({},Fn,{propertyName:0,elapsedTime:0,pseudoElement:0}),fp=Re(dp),pp=se({},Yi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),hp=Re(pp),mp=[9,13,27,32],sl=yt&&"CompositionEvent"in window,sr=null;yt&&"documentMode"in document&&(sr=document.documentMode);var gp=yt&&"TextEvent"in window&&!sr,qc=yt&&(!sl||sr&&8<sr&&11>=sr),aa=" ",ca=!1;function eu(e,t){switch(e){case"keyup":return mp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function tu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var dn=!1;function yp(e,t){switch(e){case"compositionend":return tu(t);case"keypress":return t.which!==32?null:(ca=!0,aa);case"textInput":return e=t.data,e===aa&&ca?null:e;default:return null}}function vp(e,t){if(dn)return e==="compositionend"||!sl&&eu(e,t)?(e=Jc(),ci=nl=Nt=null,dn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return qc&&t.locale!=="ko"?null:t.data;default:return null}}var xp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ua(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!xp[e.type]:t==="textarea"}function nu(e,t,n,r){Tc(r),t=ji(t,"onChange"),0<t.length&&(n=new rl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var or=null,vr=null;function wp(e){pu(e,0)}function Xi(e){var t=hn(e);if(Cc(t))return e}function kp(e,t){if(e==="change")return t}var ru=!1;if(yt){var ks;if(yt){var Ss="oninput"in document;if(!Ss){var da=document.createElement("div");da.setAttribute("oninput","return;"),Ss=typeof da.oninput=="function"}ks=Ss}else ks=!1;ru=ks&&(!document.documentMode||9<document.documentMode)}function fa(){or&&(or.detachEvent("onpropertychange",iu),vr=or=null)}function iu(e){if(e.propertyName==="value"&&Xi(vr)){var t=[];nu(t,vr,e,Zo(e)),Oc(wp,t)}}function Sp(e,t,n){e==="focusin"?(fa(),or=t,vr=n,or.attachEvent("onpropertychange",iu)):e==="focusout"&&fa()}function _p(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Xi(vr)}function Ep(e,t){if(e==="click")return Xi(t)}function jp(e,t){if(e==="input"||e==="change")return Xi(t)}function Cp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var nt=typeof Object.is=="function"?Object.is:Cp;function xr(e,t){if(nt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ws.call(t,i)||!nt(e[i],t[i]))return!1}return!0}function pa(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ha(e,t){var n=pa(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=pa(n)}}function su(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?su(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ou(){for(var e=window,t=vi();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=vi(e.document)}return t}function ol(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Np(e){var t=ou(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&su(n.ownerDocument.documentElement,n)){if(r!==null&&ol(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!e.extend&&s>r&&(i=r,r=s,s=i),i=ha(n,s);var o=ha(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),s>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var zp=yt&&"documentMode"in document&&11>=document.documentMode,fn=null,ao=null,lr=null,co=!1;function ma(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;co||fn==null||fn!==vi(r)||(r=fn,"selectionStart"in r&&ol(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),lr&&xr(lr,r)||(lr=r,r=ji(ao,"onSelect"),0<r.length&&(t=new rl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=fn)))}function Kr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var pn={animationend:Kr("Animation","AnimationEnd"),animationiteration:Kr("Animation","AnimationIteration"),animationstart:Kr("Animation","AnimationStart"),transitionend:Kr("Transition","TransitionEnd")},_s={},lu={};yt&&(lu=document.createElement("div").style,"AnimationEvent"in window||(delete pn.animationend.animation,delete pn.animationiteration.animation,delete pn.animationstart.animation),"TransitionEvent"in window||delete pn.transitionend.transition);function Gi(e){if(_s[e])return _s[e];if(!pn[e])return e;var t=pn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in lu)return _s[e]=t[n];return e}var au=Gi("animationend"),cu=Gi("animationiteration"),uu=Gi("animationstart"),du=Gi("transitionend"),fu=new Map,ga="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Dt(e,t){fu.set(e,t),sn(t,[e])}for(var Es=0;Es<ga.length;Es++){var js=ga[Es],Pp=js.toLowerCase(),bp=js[0].toUpperCase()+js.slice(1);Dt(Pp,"on"+bp)}Dt(au,"onAnimationEnd");Dt(cu,"onAnimationIteration");Dt(uu,"onAnimationStart");Dt("dblclick","onDoubleClick");Dt("focusin","onFocus");Dt("focusout","onBlur");Dt(du,"onTransitionEnd");zn("onMouseEnter",["mouseout","mouseover"]);zn("onMouseLeave",["mouseout","mouseover"]);zn("onPointerEnter",["pointerout","pointerover"]);zn("onPointerLeave",["pointerout","pointerover"]);sn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));sn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));sn("onBeforeInput",["compositionend","keypress","textInput","paste"]);sn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));sn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));sn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var tr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Mp=new Set("cancel close invalid load scroll toggle".split(" ").concat(tr));function ya(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Pf(r,t,void 0,e),e.currentTarget=null}function pu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var s=void 0;if(t)for(var o=r.length-1;0<=o;o--){var a=r[o],c=a.instance,u=a.currentTarget;if(a=a.listener,c!==s&&i.isPropagationStopped())break e;ya(i,a,u),s=c}else for(o=0;o<r.length;o++){if(a=r[o],c=a.instance,u=a.currentTarget,a=a.listener,c!==s&&i.isPropagationStopped())break e;ya(i,a,u),s=c}}}if(wi)throw e=io,wi=!1,io=null,e}function ee(e,t){var n=t[mo];n===void 0&&(n=t[mo]=new Set);var r=e+"__bubble";n.has(r)||(hu(t,e,2,!1),n.add(r))}function Cs(e,t,n){var r=0;t&&(r|=4),hu(n,e,r,t)}var Hr="_reactListening"+Math.random().toString(36).slice(2);function wr(e){if(!e[Hr]){e[Hr]=!0,kc.forEach(function(n){n!=="selectionchange"&&(Mp.has(n)||Cs(n,!1,e),Cs(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Hr]||(t[Hr]=!0,Cs("selectionchange",!1,t))}}function hu(e,t,n,r){switch(Zc(t)){case 1:var i=Hf;break;case 4:i=Vf;break;default:i=tl}n=i.bind(null,t,n,e),i=void 0,!ro||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Ns(e,t,n,r,i){var s=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;o=o.return}for(;a!==null;){if(o=Ht(a),o===null)return;if(c=o.tag,c===5||c===6){r=s=o;continue e}a=a.parentNode}}r=r.return}Oc(function(){var u=s,d=Zo(n),h=[];e:{var p=fu.get(e);if(p!==void 0){var v=rl,x=e;switch(e){case"keypress":if(ui(n)===0)break e;case"keydown":case"keyup":v=lp;break;case"focusin":x="focus",v=ws;break;case"focusout":x="blur",v=ws;break;case"beforeblur":case"afterblur":v=ws;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=sa;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Gf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=up;break;case au:case cu:case uu:v=Jf;break;case du:v=fp;break;case"scroll":v=Yf;break;case"wheel":v=hp;break;case"copy":case"cut":case"paste":v=ep;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=la}var w=(t&4)!==0,g=!w&&e==="scroll",m=w?p!==null?p+"Capture":null:p;w=[];for(var f=u,y;f!==null;){y=f;var k=y.stateNode;if(y.tag===5&&k!==null&&(y=k,m!==null&&(k=hr(f,m),k!=null&&w.push(kr(f,k,y)))),g)break;f=f.return}0<w.length&&(p=new v(p,x,null,n,d),h.push({event:p,listeners:w}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",p&&n!==to&&(x=n.relatedTarget||n.fromElement)&&(Ht(x)||x[vt]))break e;if((v||p)&&(p=d.window===d?d:(p=d.ownerDocument)?p.defaultView||p.parentWindow:window,v?(x=n.relatedTarget||n.toElement,v=u,x=x?Ht(x):null,x!==null&&(g=on(x),x!==g||x.tag!==5&&x.tag!==6)&&(x=null)):(v=null,x=u),v!==x)){if(w=sa,k="onMouseLeave",m="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(w=la,k="onPointerLeave",m="onPointerEnter",f="pointer"),g=v==null?p:hn(v),y=x==null?p:hn(x),p=new w(k,f+"leave",v,n,d),p.target=g,p.relatedTarget=y,k=null,Ht(d)===u&&(w=new w(m,f+"enter",x,n,d),w.target=y,w.relatedTarget=g,k=w),g=k,v&&x)t:{for(w=v,m=x,f=0,y=w;y;y=an(y))f++;for(y=0,k=m;k;k=an(k))y++;for(;0<f-y;)w=an(w),f--;for(;0<y-f;)m=an(m),y--;for(;f--;){if(w===m||m!==null&&w===m.alternate)break t;w=an(w),m=an(m)}w=null}else w=null;v!==null&&va(h,p,v,w,!1),x!==null&&g!==null&&va(h,g,x,w,!0)}}e:{if(p=u?hn(u):window,v=p.nodeName&&p.nodeName.toLowerCase(),v==="select"||v==="input"&&p.type==="file")var _=kp;else if(ua(p))if(ru)_=jp;else{_=_p;var P=Sp}else(v=p.nodeName)&&v.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(_=Ep);if(_&&(_=_(e,u))){nu(h,_,n,d);break e}P&&P(e,p,u),e==="focusout"&&(P=p._wrapperState)&&P.controlled&&p.type==="number"&&Qs(p,"number",p.value)}switch(P=u?hn(u):window,e){case"focusin":(ua(P)||P.contentEditable==="true")&&(fn=P,ao=u,lr=null);break;case"focusout":lr=ao=fn=null;break;case"mousedown":co=!0;break;case"contextmenu":case"mouseup":case"dragend":co=!1,ma(h,n,d);break;case"selectionchange":if(zp)break;case"keydown":case"keyup":ma(h,n,d)}var j;if(sl)e:{switch(e){case"compositionstart":var A="onCompositionStart";break e;case"compositionend":A="onCompositionEnd";break e;case"compositionupdate":A="onCompositionUpdate";break e}A=void 0}else dn?eu(e,n)&&(A="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(A="onCompositionStart");A&&(qc&&n.locale!=="ko"&&(dn||A!=="onCompositionStart"?A==="onCompositionEnd"&&dn&&(j=Jc()):(Nt=d,nl="value"in Nt?Nt.value:Nt.textContent,dn=!0)),P=ji(u,A),0<P.length&&(A=new oa(A,e,null,n,d),h.push({event:A,listeners:P}),j?A.data=j:(j=tu(n),j!==null&&(A.data=j)))),(j=gp?yp(e,n):vp(e,n))&&(u=ji(u,"onBeforeInput"),0<u.length&&(d=new oa("onBeforeInput","beforeinput",null,n,d),h.push({event:d,listeners:u}),d.data=j))}pu(h,t)})}function kr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ji(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=hr(e,n),s!=null&&r.unshift(kr(e,s,i)),s=hr(e,t),s!=null&&r.push(kr(e,s,i))),e=e.return}return r}function an(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function va(e,t,n,r,i){for(var s=t._reactName,o=[];n!==null&&n!==r;){var a=n,c=a.alternate,u=a.stateNode;if(c!==null&&c===r)break;a.tag===5&&u!==null&&(a=u,i?(c=hr(n,s),c!=null&&o.unshift(kr(n,c,a))):i||(c=hr(n,s),c!=null&&o.push(kr(n,c,a)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Ap=/\r\n?/g,Tp=/\u0000|\uFFFD/g;function xa(e){return(typeof e=="string"?e:""+e).replace(Ap,`
`).replace(Tp,"")}function Vr(e,t,n){if(t=xa(t),xa(e)!==t&&n)throw Error(E(425))}function Ci(){}var uo=null,fo=null;function po(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ho=typeof setTimeout=="function"?setTimeout:void 0,Ip=typeof clearTimeout=="function"?clearTimeout:void 0,wa=typeof Promise=="function"?Promise:void 0,$p=typeof queueMicrotask=="function"?queueMicrotask:typeof wa<"u"?function(e){return wa.resolve(null).then(e).catch(Lp)}:ho;function Lp(e){setTimeout(function(){throw e})}function zs(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),yr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);yr(t)}function At(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function ka(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Rn=Math.random().toString(36).slice(2),ot="__reactFiber$"+Rn,Sr="__reactProps$"+Rn,vt="__reactContainer$"+Rn,mo="__reactEvents$"+Rn,Op="__reactListeners$"+Rn,Fp="__reactHandles$"+Rn;function Ht(e){var t=e[ot];if(t)return t;for(var n=e.parentNode;n;){if(t=n[vt]||n[ot]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=ka(e);e!==null;){if(n=e[ot])return n;e=ka(e)}return t}e=n,n=e.parentNode}return null}function Ar(e){return e=e[ot]||e[vt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function hn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(E(33))}function Qi(e){return e[Sr]||null}var go=[],mn=-1;function Bt(e){return{current:e}}function te(e){0>mn||(e.current=go[mn],go[mn]=null,mn--)}function q(e,t){mn++,go[mn]=e.current,e.current=t}var Rt={},Se=Bt(Rt),Me=Bt(!1),Zt=Rt;function Pn(e,t){var n=e.type.contextTypes;if(!n)return Rt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=t[s];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function Ae(e){return e=e.childContextTypes,e!=null}function Ni(){te(Me),te(Se)}function Sa(e,t,n){if(Se.current!==Rt)throw Error(E(168));q(Se,t),q(Me,n)}function mu(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(E(108,Sf(e)||"Unknown",i));return se({},n,r)}function zi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Rt,Zt=Se.current,q(Se,e),q(Me,Me.current),!0}function _a(e,t,n){var r=e.stateNode;if(!r)throw Error(E(169));n?(e=mu(e,t,Zt),r.__reactInternalMemoizedMergedChildContext=e,te(Me),te(Se),q(Se,e)):te(Me),q(Me,n)}var ut=null,Zi=!1,Ps=!1;function gu(e){ut===null?ut=[e]:ut.push(e)}function Rp(e){Zi=!0,gu(e)}function Ut(){if(!Ps&&ut!==null){Ps=!0;var e=0,t=Z;try{var n=ut;for(Z=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ut=null,Zi=!1}catch(i){throw ut!==null&&(ut=ut.slice(e+1)),Bc(Jo,Ut),i}finally{Z=t,Ps=!1}}return null}var gn=[],yn=0,Pi=null,bi=0,Ue=[],We=0,Jt=null,dt=1,ft="";function Wt(e,t){gn[yn++]=bi,gn[yn++]=Pi,Pi=e,bi=t}function yu(e,t,n){Ue[We++]=dt,Ue[We++]=ft,Ue[We++]=Jt,Jt=e;var r=dt;e=ft;var i=32-et(r)-1;r&=~(1<<i),n+=1;var s=32-et(t)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,dt=1<<32-et(t)+i|n<<i|r,ft=s+e}else dt=1<<s|n<<i|r,ft=e}function ll(e){e.return!==null&&(Wt(e,1),yu(e,1,0))}function al(e){for(;e===Pi;)Pi=gn[--yn],gn[yn]=null,bi=gn[--yn],gn[yn]=null;for(;e===Jt;)Jt=Ue[--We],Ue[We]=null,ft=Ue[--We],Ue[We]=null,dt=Ue[--We],Ue[We]=null}var Le=null,$e=null,ne=!1,Je=null;function vu(e,t){var n=Ke(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ea(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Le=e,$e=At(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Le=e,$e=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Jt!==null?{id:dt,overflow:ft}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ke(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Le=e,$e=null,!0):!1;default:return!1}}function yo(e){return(e.mode&1)!==0&&(e.flags&128)===0}function vo(e){if(ne){var t=$e;if(t){var n=t;if(!Ea(e,t)){if(yo(e))throw Error(E(418));t=At(n.nextSibling);var r=Le;t&&Ea(e,t)?vu(r,n):(e.flags=e.flags&-4097|2,ne=!1,Le=e)}}else{if(yo(e))throw Error(E(418));e.flags=e.flags&-4097|2,ne=!1,Le=e}}}function ja(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Le=e}function Yr(e){if(e!==Le)return!1;if(!ne)return ja(e),ne=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!po(e.type,e.memoizedProps)),t&&(t=$e)){if(yo(e))throw xu(),Error(E(418));for(;t;)vu(e,t),t=At(t.nextSibling)}if(ja(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(E(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){$e=At(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}$e=null}}else $e=Le?At(e.stateNode.nextSibling):null;return!0}function xu(){for(var e=$e;e;)e=At(e.nextSibling)}function bn(){$e=Le=null,ne=!1}function cl(e){Je===null?Je=[e]:Je.push(e)}var Dp=kt.ReactCurrentBatchConfig;function Xn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(E(309));var r=n.stateNode}if(!r)throw Error(E(147,e));var i=r,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(o){var a=i.refs;o===null?delete a[s]:a[s]=o},t._stringRef=s,t)}if(typeof e!="string")throw Error(E(284));if(!n._owner)throw Error(E(290,e))}return e}function Xr(e,t){throw e=Object.prototype.toString.call(t),Error(E(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ca(e){var t=e._init;return t(e._payload)}function wu(e){function t(m,f){if(e){var y=m.deletions;y===null?(m.deletions=[f],m.flags|=16):y.push(f)}}function n(m,f){if(!e)return null;for(;f!==null;)t(m,f),f=f.sibling;return null}function r(m,f){for(m=new Map;f!==null;)f.key!==null?m.set(f.key,f):m.set(f.index,f),f=f.sibling;return m}function i(m,f){return m=Lt(m,f),m.index=0,m.sibling=null,m}function s(m,f,y){return m.index=y,e?(y=m.alternate,y!==null?(y=y.index,y<f?(m.flags|=2,f):y):(m.flags|=2,f)):(m.flags|=1048576,f)}function o(m){return e&&m.alternate===null&&(m.flags|=2),m}function a(m,f,y,k){return f===null||f.tag!==6?(f=Ls(y,m.mode,k),f.return=m,f):(f=i(f,y),f.return=m,f)}function c(m,f,y,k){var _=y.type;return _===un?d(m,f,y.props.children,k,y.key):f!==null&&(f.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===_t&&Ca(_)===f.type)?(k=i(f,y.props),k.ref=Xn(m,f,y),k.return=m,k):(k=yi(y.type,y.key,y.props,null,m.mode,k),k.ref=Xn(m,f,y),k.return=m,k)}function u(m,f,y,k){return f===null||f.tag!==4||f.stateNode.containerInfo!==y.containerInfo||f.stateNode.implementation!==y.implementation?(f=Os(y,m.mode,k),f.return=m,f):(f=i(f,y.children||[]),f.return=m,f)}function d(m,f,y,k,_){return f===null||f.tag!==7?(f=Qt(y,m.mode,k,_),f.return=m,f):(f=i(f,y),f.return=m,f)}function h(m,f,y){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Ls(""+f,m.mode,y),f.return=m,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Or:return y=yi(f.type,f.key,f.props,null,m.mode,y),y.ref=Xn(m,null,f),y.return=m,y;case cn:return f=Os(f,m.mode,y),f.return=m,f;case _t:var k=f._init;return h(m,k(f._payload),y)}if(qn(f)||Wn(f))return f=Qt(f,m.mode,y,null),f.return=m,f;Xr(m,f)}return null}function p(m,f,y,k){var _=f!==null?f.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return _!==null?null:a(m,f,""+y,k);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Or:return y.key===_?c(m,f,y,k):null;case cn:return y.key===_?u(m,f,y,k):null;case _t:return _=y._init,p(m,f,_(y._payload),k)}if(qn(y)||Wn(y))return _!==null?null:d(m,f,y,k,null);Xr(m,y)}return null}function v(m,f,y,k,_){if(typeof k=="string"&&k!==""||typeof k=="number")return m=m.get(y)||null,a(f,m,""+k,_);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Or:return m=m.get(k.key===null?y:k.key)||null,c(f,m,k,_);case cn:return m=m.get(k.key===null?y:k.key)||null,u(f,m,k,_);case _t:var P=k._init;return v(m,f,y,P(k._payload),_)}if(qn(k)||Wn(k))return m=m.get(y)||null,d(f,m,k,_,null);Xr(f,k)}return null}function x(m,f,y,k){for(var _=null,P=null,j=f,A=f=0,B=null;j!==null&&A<y.length;A++){j.index>A?(B=j,j=null):B=j.sibling;var $=p(m,j,y[A],k);if($===null){j===null&&(j=B);break}e&&j&&$.alternate===null&&t(m,j),f=s($,f,A),P===null?_=$:P.sibling=$,P=$,j=B}if(A===y.length)return n(m,j),ne&&Wt(m,A),_;if(j===null){for(;A<y.length;A++)j=h(m,y[A],k),j!==null&&(f=s(j,f,A),P===null?_=j:P.sibling=j,P=j);return ne&&Wt(m,A),_}for(j=r(m,j);A<y.length;A++)B=v(j,m,A,y[A],k),B!==null&&(e&&B.alternate!==null&&j.delete(B.key===null?A:B.key),f=s(B,f,A),P===null?_=B:P.sibling=B,P=B);return e&&j.forEach(function(C){return t(m,C)}),ne&&Wt(m,A),_}function w(m,f,y,k){var _=Wn(y);if(typeof _!="function")throw Error(E(150));if(y=_.call(y),y==null)throw Error(E(151));for(var P=_=null,j=f,A=f=0,B=null,$=y.next();j!==null&&!$.done;A++,$=y.next()){j.index>A?(B=j,j=null):B=j.sibling;var C=p(m,j,$.value,k);if(C===null){j===null&&(j=B);break}e&&j&&C.alternate===null&&t(m,j),f=s(C,f,A),P===null?_=C:P.sibling=C,P=C,j=B}if($.done)return n(m,j),ne&&Wt(m,A),_;if(j===null){for(;!$.done;A++,$=y.next())$=h(m,$.value,k),$!==null&&(f=s($,f,A),P===null?_=$:P.sibling=$,P=$);return ne&&Wt(m,A),_}for(j=r(m,j);!$.done;A++,$=y.next())$=v(j,m,A,$.value,k),$!==null&&(e&&$.alternate!==null&&j.delete($.key===null?A:$.key),f=s($,f,A),P===null?_=$:P.sibling=$,P=$);return e&&j.forEach(function(N){return t(m,N)}),ne&&Wt(m,A),_}function g(m,f,y,k){if(typeof y=="object"&&y!==null&&y.type===un&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case Or:e:{for(var _=y.key,P=f;P!==null;){if(P.key===_){if(_=y.type,_===un){if(P.tag===7){n(m,P.sibling),f=i(P,y.props.children),f.return=m,m=f;break e}}else if(P.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===_t&&Ca(_)===P.type){n(m,P.sibling),f=i(P,y.props),f.ref=Xn(m,P,y),f.return=m,m=f;break e}n(m,P);break}else t(m,P);P=P.sibling}y.type===un?(f=Qt(y.props.children,m.mode,k,y.key),f.return=m,m=f):(k=yi(y.type,y.key,y.props,null,m.mode,k),k.ref=Xn(m,f,y),k.return=m,m=k)}return o(m);case cn:e:{for(P=y.key;f!==null;){if(f.key===P)if(f.tag===4&&f.stateNode.containerInfo===y.containerInfo&&f.stateNode.implementation===y.implementation){n(m,f.sibling),f=i(f,y.children||[]),f.return=m,m=f;break e}else{n(m,f);break}else t(m,f);f=f.sibling}f=Os(y,m.mode,k),f.return=m,m=f}return o(m);case _t:return P=y._init,g(m,f,P(y._payload),k)}if(qn(y))return x(m,f,y,k);if(Wn(y))return w(m,f,y,k);Xr(m,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,f!==null&&f.tag===6?(n(m,f.sibling),f=i(f,y),f.return=m,m=f):(n(m,f),f=Ls(y,m.mode,k),f.return=m,m=f),o(m)):n(m,f)}return g}var Mn=wu(!0),ku=wu(!1),Mi=Bt(null),Ai=null,vn=null,ul=null;function dl(){ul=vn=Ai=null}function fl(e){var t=Mi.current;te(Mi),e._currentValue=t}function xo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Cn(e,t){Ai=e,ul=vn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Pe=!0),e.firstContext=null)}function Ve(e){var t=e._currentValue;if(ul!==e)if(e={context:e,memoizedValue:t,next:null},vn===null){if(Ai===null)throw Error(E(308));vn=e,Ai.dependencies={lanes:0,firstContext:e}}else vn=vn.next=e;return t}var Vt=null;function pl(e){Vt===null?Vt=[e]:Vt.push(e)}function Su(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,pl(t)):(n.next=i.next,i.next=n),t.interleaved=n,xt(e,r)}function xt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Et=!1;function hl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function _u(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function gt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Tt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,G&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,xt(e,n)}return i=r.interleaved,i===null?(t.next=t,pl(r)):(t.next=i.next,i.next=t),r.interleaved=t,xt(e,n)}function di(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,qo(e,n)}}function Na(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=t:s=s.next=t}else i=s=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ti(e,t,n,r){var i=e.updateQueue;Et=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var c=a,u=c.next;c.next=null,o===null?s=u:o.next=u,o=c;var d=e.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==o&&(a===null?d.firstBaseUpdate=u:a.next=u,d.lastBaseUpdate=c))}if(s!==null){var h=i.baseState;o=0,d=u=c=null,a=s;do{var p=a.lane,v=a.eventTime;if((r&p)===p){d!==null&&(d=d.next={eventTime:v,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var x=e,w=a;switch(p=t,v=n,w.tag){case 1:if(x=w.payload,typeof x=="function"){h=x.call(v,h,p);break e}h=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=w.payload,p=typeof x=="function"?x.call(v,h,p):x,p==null)break e;h=se({},h,p);break e;case 2:Et=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[a]:p.push(a))}else v={eventTime:v,lane:p,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(u=d=v,c=h):d=d.next=v,o|=p;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;p=a,a=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(d===null&&(c=h),i.baseState=c,i.firstBaseUpdate=u,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else s===null&&(i.shared.lanes=0);en|=o,e.lanes=o,e.memoizedState=h}}function za(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(E(191,i));i.call(r)}}}var Tr={},at=Bt(Tr),_r=Bt(Tr),Er=Bt(Tr);function Yt(e){if(e===Tr)throw Error(E(174));return e}function ml(e,t){switch(q(Er,t),q(_r,e),q(at,Tr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Js(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Js(t,e)}te(at),q(at,t)}function An(){te(at),te(_r),te(Er)}function Eu(e){Yt(Er.current);var t=Yt(at.current),n=Js(t,e.type);t!==n&&(q(_r,e),q(at,n))}function gl(e){_r.current===e&&(te(at),te(_r))}var re=Bt(0);function Ii(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var bs=[];function yl(){for(var e=0;e<bs.length;e++)bs[e]._workInProgressVersionPrimary=null;bs.length=0}var fi=kt.ReactCurrentDispatcher,Ms=kt.ReactCurrentBatchConfig,qt=0,ie=null,ue=null,pe=null,$i=!1,ar=!1,jr=0,Bp=0;function xe(){throw Error(E(321))}function vl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!nt(e[n],t[n]))return!1;return!0}function xl(e,t,n,r,i,s){if(qt=s,ie=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,fi.current=e===null||e.memoizedState===null?Hp:Vp,e=n(r,i),ar){s=0;do{if(ar=!1,jr=0,25<=s)throw Error(E(301));s+=1,pe=ue=null,t.updateQueue=null,fi.current=Yp,e=n(r,i)}while(ar)}if(fi.current=Li,t=ue!==null&&ue.next!==null,qt=0,pe=ue=ie=null,$i=!1,t)throw Error(E(300));return e}function wl(){var e=jr!==0;return jr=0,e}function st(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return pe===null?ie.memoizedState=pe=e:pe=pe.next=e,pe}function Ye(){if(ue===null){var e=ie.alternate;e=e!==null?e.memoizedState:null}else e=ue.next;var t=pe===null?ie.memoizedState:pe.next;if(t!==null)pe=t,ue=e;else{if(e===null)throw Error(E(310));ue=e,e={memoizedState:ue.memoizedState,baseState:ue.baseState,baseQueue:ue.baseQueue,queue:ue.queue,next:null},pe===null?ie.memoizedState=pe=e:pe=pe.next=e}return pe}function Cr(e,t){return typeof t=="function"?t(e):t}function As(e){var t=Ye(),n=t.queue;if(n===null)throw Error(E(311));n.lastRenderedReducer=e;var r=ue,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var a=o=null,c=null,u=s;do{var d=u.lane;if((qt&d)===d)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(a=c=h,o=r):c=c.next=h,ie.lanes|=d,en|=d}u=u.next}while(u!==null&&u!==s);c===null?o=r:c.next=a,nt(r,t.memoizedState)||(Pe=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do s=i.lane,ie.lanes|=s,en|=s,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ts(e){var t=Ye(),n=t.queue;if(n===null)throw Error(E(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,s=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=e(s,o.action),o=o.next;while(o!==i);nt(s,t.memoizedState)||(Pe=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function ju(){}function Cu(e,t){var n=ie,r=Ye(),i=t(),s=!nt(r.memoizedState,i);if(s&&(r.memoizedState=i,Pe=!0),r=r.queue,kl(Pu.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||pe!==null&&pe.memoizedState.tag&1){if(n.flags|=2048,Nr(9,zu.bind(null,n,r,i,t),void 0,null),me===null)throw Error(E(349));qt&30||Nu(n,t,i)}return i}function Nu(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ie.updateQueue,t===null?(t={lastEffect:null,stores:null},ie.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function zu(e,t,n,r){t.value=n,t.getSnapshot=r,bu(t)&&Mu(e)}function Pu(e,t,n){return n(function(){bu(t)&&Mu(e)})}function bu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!nt(e,n)}catch{return!0}}function Mu(e){var t=xt(e,1);t!==null&&tt(t,e,1,-1)}function Pa(e){var t=st();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Cr,lastRenderedState:e},t.queue=e,e=e.dispatch=Kp.bind(null,ie,e),[t.memoizedState,e]}function Nr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ie.updateQueue,t===null?(t={lastEffect:null,stores:null},ie.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Au(){return Ye().memoizedState}function pi(e,t,n,r){var i=st();ie.flags|=e,i.memoizedState=Nr(1|t,n,void 0,r===void 0?null:r)}function Ji(e,t,n,r){var i=Ye();r=r===void 0?null:r;var s=void 0;if(ue!==null){var o=ue.memoizedState;if(s=o.destroy,r!==null&&vl(r,o.deps)){i.memoizedState=Nr(t,n,s,r);return}}ie.flags|=e,i.memoizedState=Nr(1|t,n,s,r)}function ba(e,t){return pi(8390656,8,e,t)}function kl(e,t){return Ji(2048,8,e,t)}function Tu(e,t){return Ji(4,2,e,t)}function Iu(e,t){return Ji(4,4,e,t)}function $u(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Lu(e,t,n){return n=n!=null?n.concat([e]):null,Ji(4,4,$u.bind(null,t,e),n)}function Sl(){}function Ou(e,t){var n=Ye();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&vl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Fu(e,t){var n=Ye();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&vl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ru(e,t,n){return qt&21?(nt(n,t)||(n=Kc(),ie.lanes|=n,en|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Pe=!0),e.memoizedState=n)}function Up(e,t){var n=Z;Z=n!==0&&4>n?n:4,e(!0);var r=Ms.transition;Ms.transition={};try{e(!1),t()}finally{Z=n,Ms.transition=r}}function Du(){return Ye().memoizedState}function Wp(e,t,n){var r=$t(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Bu(e))Uu(t,n);else if(n=Su(e,t,n,r),n!==null){var i=Ee();tt(n,e,r,i),Wu(n,t,r)}}function Kp(e,t,n){var r=$t(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Bu(e))Uu(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var o=t.lastRenderedState,a=s(o,n);if(i.hasEagerState=!0,i.eagerState=a,nt(a,o)){var c=t.interleaved;c===null?(i.next=i,pl(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}finally{}n=Su(e,t,i,r),n!==null&&(i=Ee(),tt(n,e,r,i),Wu(n,t,r))}}function Bu(e){var t=e.alternate;return e===ie||t!==null&&t===ie}function Uu(e,t){ar=$i=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Wu(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,qo(e,n)}}var Li={readContext:Ve,useCallback:xe,useContext:xe,useEffect:xe,useImperativeHandle:xe,useInsertionEffect:xe,useLayoutEffect:xe,useMemo:xe,useReducer:xe,useRef:xe,useState:xe,useDebugValue:xe,useDeferredValue:xe,useTransition:xe,useMutableSource:xe,useSyncExternalStore:xe,useId:xe,unstable_isNewReconciler:!1},Hp={readContext:Ve,useCallback:function(e,t){return st().memoizedState=[e,t===void 0?null:t],e},useContext:Ve,useEffect:ba,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,pi(4194308,4,$u.bind(null,t,e),n)},useLayoutEffect:function(e,t){return pi(4194308,4,e,t)},useInsertionEffect:function(e,t){return pi(4,2,e,t)},useMemo:function(e,t){var n=st();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=st();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Wp.bind(null,ie,e),[r.memoizedState,e]},useRef:function(e){var t=st();return e={current:e},t.memoizedState=e},useState:Pa,useDebugValue:Sl,useDeferredValue:function(e){return st().memoizedState=e},useTransition:function(){var e=Pa(!1),t=e[0];return e=Up.bind(null,e[1]),st().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ie,i=st();if(ne){if(n===void 0)throw Error(E(407));n=n()}else{if(n=t(),me===null)throw Error(E(349));qt&30||Nu(r,t,n)}i.memoizedState=n;var s={value:n,getSnapshot:t};return i.queue=s,ba(Pu.bind(null,r,s,e),[e]),r.flags|=2048,Nr(9,zu.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=st(),t=me.identifierPrefix;if(ne){var n=ft,r=dt;n=(r&~(1<<32-et(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=jr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Bp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Vp={readContext:Ve,useCallback:Ou,useContext:Ve,useEffect:kl,useImperativeHandle:Lu,useInsertionEffect:Tu,useLayoutEffect:Iu,useMemo:Fu,useReducer:As,useRef:Au,useState:function(){return As(Cr)},useDebugValue:Sl,useDeferredValue:function(e){var t=Ye();return Ru(t,ue.memoizedState,e)},useTransition:function(){var e=As(Cr)[0],t=Ye().memoizedState;return[e,t]},useMutableSource:ju,useSyncExternalStore:Cu,useId:Du,unstable_isNewReconciler:!1},Yp={readContext:Ve,useCallback:Ou,useContext:Ve,useEffect:kl,useImperativeHandle:Lu,useInsertionEffect:Tu,useLayoutEffect:Iu,useMemo:Fu,useReducer:Ts,useRef:Au,useState:function(){return Ts(Cr)},useDebugValue:Sl,useDeferredValue:function(e){var t=Ye();return ue===null?t.memoizedState=e:Ru(t,ue.memoizedState,e)},useTransition:function(){var e=Ts(Cr)[0],t=Ye().memoizedState;return[e,t]},useMutableSource:ju,useSyncExternalStore:Cu,useId:Du,unstable_isNewReconciler:!1};function Qe(e,t){if(e&&e.defaultProps){t=se({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function wo(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:se({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var qi={isMounted:function(e){return(e=e._reactInternals)?on(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ee(),i=$t(e),s=gt(r,i);s.payload=t,n!=null&&(s.callback=n),t=Tt(e,s,i),t!==null&&(tt(t,e,i,r),di(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ee(),i=$t(e),s=gt(r,i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=Tt(e,s,i),t!==null&&(tt(t,e,i,r),di(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ee(),r=$t(e),i=gt(n,r);i.tag=2,t!=null&&(i.callback=t),t=Tt(e,i,r),t!==null&&(tt(t,e,r,n),di(t,e,r))}};function Ma(e,t,n,r,i,s,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,s,o):t.prototype&&t.prototype.isPureReactComponent?!xr(n,r)||!xr(i,s):!0}function Ku(e,t,n){var r=!1,i=Rt,s=t.contextType;return typeof s=="object"&&s!==null?s=Ve(s):(i=Ae(t)?Zt:Se.current,r=t.contextTypes,s=(r=r!=null)?Pn(e,i):Rt),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=qi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),t}function Aa(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&qi.enqueueReplaceState(t,t.state,null)}function ko(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},hl(e);var s=t.contextType;typeof s=="object"&&s!==null?i.context=Ve(s):(s=Ae(t)?Zt:Se.current,i.context=Pn(e,s)),i.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(wo(e,t,s,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&qi.enqueueReplaceState(i,i.state,null),Ti(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Tn(e,t){try{var n="",r=t;do n+=kf(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:i,digest:null}}function Is(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function So(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Xp=typeof WeakMap=="function"?WeakMap:Map;function Hu(e,t,n){n=gt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Fi||(Fi=!0,Ao=r),So(e,t)},n}function Vu(e,t,n){n=gt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){So(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){So(e,t),typeof r!="function"&&(It===null?It=new Set([this]):It.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Ta(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Xp;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=ah.bind(null,e,t,n),t.then(e,e))}function Ia(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function $a(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=gt(-1,1),t.tag=2,Tt(n,t,1))),n.lanes|=1),e)}var Gp=kt.ReactCurrentOwner,Pe=!1;function _e(e,t,n,r){t.child=e===null?ku(t,null,n,r):Mn(t,e.child,n,r)}function La(e,t,n,r,i){n=n.render;var s=t.ref;return Cn(t,i),r=xl(e,t,n,r,s,i),n=wl(),e!==null&&!Pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,wt(e,t,i)):(ne&&n&&ll(t),t.flags|=1,_e(e,t,r,i),t.child)}function Oa(e,t,n,r,i){if(e===null){var s=n.type;return typeof s=="function"&&!bl(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,Yu(e,t,s,r,i)):(e=yi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:xr,n(o,r)&&e.ref===t.ref)return wt(e,t,i)}return t.flags|=1,e=Lt(s,r),e.ref=t.ref,e.return=t,t.child=e}function Yu(e,t,n,r,i){if(e!==null){var s=e.memoizedProps;if(xr(s,r)&&e.ref===t.ref)if(Pe=!1,t.pendingProps=r=s,(e.lanes&i)!==0)e.flags&131072&&(Pe=!0);else return t.lanes=e.lanes,wt(e,t,i)}return _o(e,t,n,r,i)}function Xu(e,t,n){var r=t.pendingProps,i=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},q(wn,Ie),Ie|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,q(wn,Ie),Ie|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,q(wn,Ie),Ie|=r}else s!==null?(r=s.baseLanes|n,t.memoizedState=null):r=n,q(wn,Ie),Ie|=r;return _e(e,t,i,n),t.child}function Gu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function _o(e,t,n,r,i){var s=Ae(n)?Zt:Se.current;return s=Pn(t,s),Cn(t,i),n=xl(e,t,n,r,s,i),r=wl(),e!==null&&!Pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,wt(e,t,i)):(ne&&r&&ll(t),t.flags|=1,_e(e,t,n,i),t.child)}function Fa(e,t,n,r,i){if(Ae(n)){var s=!0;zi(t)}else s=!1;if(Cn(t,i),t.stateNode===null)hi(e,t),Ku(t,n,r),ko(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,a=t.memoizedProps;o.props=a;var c=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=Ve(u):(u=Ae(n)?Zt:Se.current,u=Pn(t,u));var d=n.getDerivedStateFromProps,h=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||c!==u)&&Aa(t,o,r,u),Et=!1;var p=t.memoizedState;o.state=p,Ti(t,r,o,i),c=t.memoizedState,a!==r||p!==c||Me.current||Et?(typeof d=="function"&&(wo(t,n,d,r),c=t.memoizedState),(a=Et||Ma(t,n,a,r,p,c,u))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=u,r=a):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,_u(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:Qe(t.type,a),o.props=u,h=t.pendingProps,p=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=Ve(c):(c=Ae(n)?Zt:Se.current,c=Pn(t,c));var v=n.getDerivedStateFromProps;(d=typeof v=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==h||p!==c)&&Aa(t,o,r,c),Et=!1,p=t.memoizedState,o.state=p,Ti(t,r,o,i);var x=t.memoizedState;a!==h||p!==x||Me.current||Et?(typeof v=="function"&&(wo(t,n,v,r),x=t.memoizedState),(u=Et||Ma(t,n,u,r,p,x,c)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,x,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,x,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),o.props=r,o.state=x,o.context=c,r=u):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return Eo(e,t,n,r,s,i)}function Eo(e,t,n,r,i,s){Gu(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return i&&_a(t,n,!1),wt(e,t,s);r=t.stateNode,Gp.current=t;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Mn(t,e.child,null,s),t.child=Mn(t,null,a,s)):_e(e,t,a,s),t.memoizedState=r.state,i&&_a(t,n,!0),t.child}function Qu(e){var t=e.stateNode;t.pendingContext?Sa(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Sa(e,t.context,!1),ml(e,t.containerInfo)}function Ra(e,t,n,r,i){return bn(),cl(i),t.flags|=256,_e(e,t,n,r),t.child}var jo={dehydrated:null,treeContext:null,retryLane:0};function Co(e){return{baseLanes:e,cachePool:null,transitions:null}}function Zu(e,t,n){var r=t.pendingProps,i=re.current,s=!1,o=(t.flags&128)!==0,a;if((a=o)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),q(re,i&1),e===null)return vo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,s?(r=t.mode,s=t.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=ns(o,r,0,null),e=Qt(e,r,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Co(n),t.memoizedState=jo,e):_l(t,o));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return Qp(e,t,o,r,a,i,n);if(s){s=r.fallback,o=t.mode,i=e.child,a=i.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Lt(i,c),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?s=Lt(a,s):(s=Qt(s,o,n,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,o=e.child.memoizedState,o=o===null?Co(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=e.childLanes&~n,t.memoizedState=jo,r}return s=e.child,e=s.sibling,r=Lt(s,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function _l(e,t){return t=ns({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Gr(e,t,n,r){return r!==null&&cl(r),Mn(t,e.child,null,n),e=_l(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Qp(e,t,n,r,i,s,o){if(n)return t.flags&256?(t.flags&=-257,r=Is(Error(E(422))),Gr(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=r.fallback,i=t.mode,r=ns({mode:"visible",children:r.children},i,0,null),s=Qt(s,i,o,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,t.mode&1&&Mn(t,e.child,null,o),t.child.memoizedState=Co(o),t.memoizedState=jo,s);if(!(t.mode&1))return Gr(e,t,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,s=Error(E(419)),r=Is(s,r,void 0),Gr(e,t,o,r)}if(a=(o&e.childLanes)!==0,Pe||a){if(r=me,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,xt(e,i),tt(r,e,i,-1))}return Pl(),r=Is(Error(E(421))),Gr(e,t,o,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=ch.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,$e=At(i.nextSibling),Le=t,ne=!0,Je=null,e!==null&&(Ue[We++]=dt,Ue[We++]=ft,Ue[We++]=Jt,dt=e.id,ft=e.overflow,Jt=t),t=_l(t,r.children),t.flags|=4096,t)}function Da(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),xo(e.return,t,n)}function $s(e,t,n,r,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function Ju(e,t,n){var r=t.pendingProps,i=r.revealOrder,s=r.tail;if(_e(e,t,r.children,n),r=re.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Da(e,n,t);else if(e.tag===19)Da(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(q(re,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Ii(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),$s(t,!1,i,n,s);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ii(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}$s(t,!0,n,null,s);break;case"together":$s(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function hi(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function wt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),en|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(E(153));if(t.child!==null){for(e=t.child,n=Lt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Lt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Zp(e,t,n){switch(t.tag){case 3:Qu(t),bn();break;case 5:Eu(t);break;case 1:Ae(t.type)&&zi(t);break;case 4:ml(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;q(Mi,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(q(re,re.current&1),t.flags|=128,null):n&t.child.childLanes?Zu(e,t,n):(q(re,re.current&1),e=wt(e,t,n),e!==null?e.sibling:null);q(re,re.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Ju(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),q(re,re.current),r)break;return null;case 22:case 23:return t.lanes=0,Xu(e,t,n)}return wt(e,t,n)}var qu,No,ed,td;qu=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};No=function(){};ed=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Yt(at.current);var s=null;switch(n){case"input":i=Xs(e,i),r=Xs(e,r),s=[];break;case"select":i=se({},i,{value:void 0}),r=se({},r,{value:void 0}),s=[];break;case"textarea":i=Zs(e,i),r=Zs(e,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Ci)}qs(n,r);var o;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var a=i[u];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(fr.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in r){var c=r[u];if(a=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&c!==a&&(c!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&a[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(s||(s=[]),s.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,a=a?a.__html:void 0,c!=null&&a!==c&&(s=s||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(fr.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&ee("scroll",e),s||a===c||(s=[])):(s=s||[]).push(u,c))}n&&(s=s||[]).push("style",n);var u=s;(t.updateQueue=u)&&(t.flags|=4)}};td=function(e,t,n,r){n!==r&&(t.flags|=4)};function Gn(e,t){if(!ne)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function we(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Jp(e,t,n){var r=t.pendingProps;switch(al(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return we(t),null;case 1:return Ae(t.type)&&Ni(),we(t),null;case 3:return r=t.stateNode,An(),te(Me),te(Se),yl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Yr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Je!==null&&($o(Je),Je=null))),No(e,t),we(t),null;case 5:gl(t);var i=Yt(Er.current);if(n=t.type,e!==null&&t.stateNode!=null)ed(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(E(166));return we(t),null}if(e=Yt(at.current),Yr(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[ot]=t,r[Sr]=s,e=(t.mode&1)!==0,n){case"dialog":ee("cancel",r),ee("close",r);break;case"iframe":case"object":case"embed":ee("load",r);break;case"video":case"audio":for(i=0;i<tr.length;i++)ee(tr[i],r);break;case"source":ee("error",r);break;case"img":case"image":case"link":ee("error",r),ee("load",r);break;case"details":ee("toggle",r);break;case"input":Gl(r,s),ee("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},ee("invalid",r);break;case"textarea":Zl(r,s),ee("invalid",r)}qs(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?r.textContent!==a&&(s.suppressHydrationWarning!==!0&&Vr(r.textContent,a,e),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Vr(r.textContent,a,e),i=["children",""+a]):fr.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ee("scroll",r)}switch(n){case"input":Fr(r),Ql(r,s,!0);break;case"textarea":Fr(r),Jl(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Ci)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Pc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[ot]=t,e[Sr]=r,qu(e,t,!1,!1),t.stateNode=e;e:{switch(o=eo(n,r),n){case"dialog":ee("cancel",e),ee("close",e),i=r;break;case"iframe":case"object":case"embed":ee("load",e),i=r;break;case"video":case"audio":for(i=0;i<tr.length;i++)ee(tr[i],e);i=r;break;case"source":ee("error",e),i=r;break;case"img":case"image":case"link":ee("error",e),ee("load",e),i=r;break;case"details":ee("toggle",e),i=r;break;case"input":Gl(e,r),i=Xs(e,r),ee("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=se({},r,{value:void 0}),ee("invalid",e);break;case"textarea":Zl(e,r),i=Zs(e,r),ee("invalid",e);break;default:i=r}qs(n,i),a=i;for(s in a)if(a.hasOwnProperty(s)){var c=a[s];s==="style"?Ac(e,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&bc(e,c)):s==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&pr(e,c):typeof c=="number"&&pr(e,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(fr.hasOwnProperty(s)?c!=null&&s==="onScroll"&&ee("scroll",e):c!=null&&Yo(e,s,c,o))}switch(n){case"input":Fr(e),Ql(e,r,!1);break;case"textarea":Fr(e),Jl(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Ft(r.value));break;case"select":e.multiple=!!r.multiple,s=r.value,s!=null?Sn(e,!!r.multiple,s,!1):r.defaultValue!=null&&Sn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Ci)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return we(t),null;case 6:if(e&&t.stateNode!=null)td(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(E(166));if(n=Yt(Er.current),Yt(at.current),Yr(t)){if(r=t.stateNode,n=t.memoizedProps,r[ot]=t,(s=r.nodeValue!==n)&&(e=Le,e!==null))switch(e.tag){case 3:Vr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Vr(r.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[ot]=t,t.stateNode=r}return we(t),null;case 13:if(te(re),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ne&&$e!==null&&t.mode&1&&!(t.flags&128))xu(),bn(),t.flags|=98560,s=!1;else if(s=Yr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(E(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(E(317));s[ot]=t}else bn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;we(t),s=!1}else Je!==null&&($o(Je),Je=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||re.current&1?de===0&&(de=3):Pl())),t.updateQueue!==null&&(t.flags|=4),we(t),null);case 4:return An(),No(e,t),e===null&&wr(t.stateNode.containerInfo),we(t),null;case 10:return fl(t.type._context),we(t),null;case 17:return Ae(t.type)&&Ni(),we(t),null;case 19:if(te(re),s=t.memoizedState,s===null)return we(t),null;if(r=(t.flags&128)!==0,o=s.rendering,o===null)if(r)Gn(s,!1);else{if(de!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Ii(e),o!==null){for(t.flags|=128,Gn(s,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,e=o.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return q(re,re.current&1|2),t.child}e=e.sibling}s.tail!==null&&ae()>In&&(t.flags|=128,r=!0,Gn(s,!1),t.lanes=4194304)}else{if(!r)if(e=Ii(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Gn(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ne)return we(t),null}else 2*ae()-s.renderingStartTime>In&&n!==1073741824&&(t.flags|=128,r=!0,Gn(s,!1),t.lanes=4194304);s.isBackwards?(o.sibling=t.child,t.child=o):(n=s.last,n!==null?n.sibling=o:t.child=o,s.last=o)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=ae(),t.sibling=null,n=re.current,q(re,r?n&1|2:n&1),t):(we(t),null);case 22:case 23:return zl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ie&1073741824&&(we(t),t.subtreeFlags&6&&(t.flags|=8192)):we(t),null;case 24:return null;case 25:return null}throw Error(E(156,t.tag))}function qp(e,t){switch(al(t),t.tag){case 1:return Ae(t.type)&&Ni(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return An(),te(Me),te(Se),yl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return gl(t),null;case 13:if(te(re),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(E(340));bn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return te(re),null;case 4:return An(),null;case 10:return fl(t.type._context),null;case 22:case 23:return zl(),null;case 24:return null;default:return null}}var Qr=!1,ke=!1,eh=typeof WeakSet=="function"?WeakSet:Set,F=null;function xn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){le(e,t,r)}else n.current=null}function zo(e,t,n){try{n()}catch(r){le(e,t,r)}}var Ba=!1;function th(e,t){if(uo=_i,e=ou(),ol(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,c=-1,u=0,d=0,h=e,p=null;t:for(;;){for(var v;h!==n||i!==0&&h.nodeType!==3||(a=o+i),h!==s||r!==0&&h.nodeType!==3||(c=o+r),h.nodeType===3&&(o+=h.nodeValue.length),(v=h.firstChild)!==null;)p=h,h=v;for(;;){if(h===e)break t;if(p===n&&++u===i&&(a=o),p===s&&++d===r&&(c=o),(v=h.nextSibling)!==null)break;h=p,p=h.parentNode}h=v}n=a===-1||c===-1?null:{start:a,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(fo={focusedElem:e,selectionRange:n},_i=!1,F=t;F!==null;)if(t=F,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,F=e;else for(;F!==null;){t=F;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var w=x.memoizedProps,g=x.memoizedState,m=t.stateNode,f=m.getSnapshotBeforeUpdate(t.elementType===t.type?w:Qe(t.type,w),g);m.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(E(163))}}catch(k){le(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,F=e;break}F=t.return}return x=Ba,Ba=!1,x}function cr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&zo(t,n,s)}i=i.next}while(i!==r)}}function es(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Po(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function nd(e){var t=e.alternate;t!==null&&(e.alternate=null,nd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ot],delete t[Sr],delete t[mo],delete t[Op],delete t[Fp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function rd(e){return e.tag===5||e.tag===3||e.tag===4}function Ua(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||rd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function bo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ci));else if(r!==4&&(e=e.child,e!==null))for(bo(e,t,n),e=e.sibling;e!==null;)bo(e,t,n),e=e.sibling}function Mo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Mo(e,t,n),e=e.sibling;e!==null;)Mo(e,t,n),e=e.sibling}var ge=null,Ze=!1;function St(e,t,n){for(n=n.child;n!==null;)id(e,t,n),n=n.sibling}function id(e,t,n){if(lt&&typeof lt.onCommitFiberUnmount=="function")try{lt.onCommitFiberUnmount(Vi,n)}catch{}switch(n.tag){case 5:ke||xn(n,t);case 6:var r=ge,i=Ze;ge=null,St(e,t,n),ge=r,Ze=i,ge!==null&&(Ze?(e=ge,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ge.removeChild(n.stateNode));break;case 18:ge!==null&&(Ze?(e=ge,n=n.stateNode,e.nodeType===8?zs(e.parentNode,n):e.nodeType===1&&zs(e,n),yr(e)):zs(ge,n.stateNode));break;case 4:r=ge,i=Ze,ge=n.stateNode.containerInfo,Ze=!0,St(e,t,n),ge=r,Ze=i;break;case 0:case 11:case 14:case 15:if(!ke&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&zo(n,t,o),i=i.next}while(i!==r)}St(e,t,n);break;case 1:if(!ke&&(xn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){le(n,t,a)}St(e,t,n);break;case 21:St(e,t,n);break;case 22:n.mode&1?(ke=(r=ke)||n.memoizedState!==null,St(e,t,n),ke=r):St(e,t,n);break;default:St(e,t,n)}}function Wa(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new eh),t.forEach(function(r){var i=uh.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Ge(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=e,o=t,a=o;e:for(;a!==null;){switch(a.tag){case 5:ge=a.stateNode,Ze=!1;break e;case 3:ge=a.stateNode.containerInfo,Ze=!0;break e;case 4:ge=a.stateNode.containerInfo,Ze=!0;break e}a=a.return}if(ge===null)throw Error(E(160));id(s,o,i),ge=null,Ze=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(u){le(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)sd(t,e),t=t.sibling}function sd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ge(t,e),rt(e),r&4){try{cr(3,e,e.return),es(3,e)}catch(w){le(e,e.return,w)}try{cr(5,e,e.return)}catch(w){le(e,e.return,w)}}break;case 1:Ge(t,e),rt(e),r&512&&n!==null&&xn(n,n.return);break;case 5:if(Ge(t,e),rt(e),r&512&&n!==null&&xn(n,n.return),e.flags&32){var i=e.stateNode;try{pr(i,"")}catch(w){le(e,e.return,w)}}if(r&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,o=n!==null?n.memoizedProps:s,a=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Nc(i,s),eo(a,o);var u=eo(a,s);for(o=0;o<c.length;o+=2){var d=c[o],h=c[o+1];d==="style"?Ac(i,h):d==="dangerouslySetInnerHTML"?bc(i,h):d==="children"?pr(i,h):Yo(i,d,h,u)}switch(a){case"input":Gs(i,s);break;case"textarea":zc(i,s);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var v=s.value;v!=null?Sn(i,!!s.multiple,v,!1):p!==!!s.multiple&&(s.defaultValue!=null?Sn(i,!!s.multiple,s.defaultValue,!0):Sn(i,!!s.multiple,s.multiple?[]:"",!1))}i[Sr]=s}catch(w){le(e,e.return,w)}}break;case 6:if(Ge(t,e),rt(e),r&4){if(e.stateNode===null)throw Error(E(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(w){le(e,e.return,w)}}break;case 3:if(Ge(t,e),rt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{yr(t.containerInfo)}catch(w){le(e,e.return,w)}break;case 4:Ge(t,e),rt(e);break;case 13:Ge(t,e),rt(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Cl=ae())),r&4&&Wa(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(ke=(u=ke)||d,Ge(t,e),ke=u):Ge(t,e),rt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(F=e,d=e.child;d!==null;){for(h=F=d;F!==null;){switch(p=F,v=p.child,p.tag){case 0:case 11:case 14:case 15:cr(4,p,p.return);break;case 1:xn(p,p.return);var x=p.stateNode;if(typeof x.componentWillUnmount=="function"){r=p,n=p.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(w){le(r,n,w)}}break;case 5:xn(p,p.return);break;case 22:if(p.memoizedState!==null){Ha(h);continue}}v!==null?(v.return=p,F=v):Ha(h)}d=d.sibling}e:for(d=null,h=e;;){if(h.tag===5){if(d===null){d=h;try{i=h.stateNode,u?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=h.stateNode,c=h.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,a.style.display=Mc("display",o))}catch(w){le(e,e.return,w)}}}else if(h.tag===6){if(d===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(w){le(e,e.return,w)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Ge(t,e),rt(e),r&4&&Wa(e);break;case 21:break;default:Ge(t,e),rt(e)}}function rt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(rd(n)){var r=n;break e}n=n.return}throw Error(E(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(pr(i,""),r.flags&=-33);var s=Ua(e);Mo(e,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=Ua(e);bo(e,a,o);break;default:throw Error(E(161))}}catch(c){le(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function nh(e,t,n){F=e,od(e)}function od(e,t,n){for(var r=(e.mode&1)!==0;F!==null;){var i=F,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||Qr;if(!o){var a=i.alternate,c=a!==null&&a.memoizedState!==null||ke;a=Qr;var u=ke;if(Qr=o,(ke=c)&&!u)for(F=i;F!==null;)o=F,c=o.child,o.tag===22&&o.memoizedState!==null?Va(i):c!==null?(c.return=o,F=c):Va(i);for(;s!==null;)F=s,od(s),s=s.sibling;F=i,Qr=a,ke=u}Ka(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,F=s):Ka(e)}}function Ka(e){for(;F!==null;){var t=F;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ke||es(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ke)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Qe(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&za(t,s,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}za(t,o,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var h=d.dehydrated;h!==null&&yr(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(E(163))}ke||t.flags&512&&Po(t)}catch(p){le(t,t.return,p)}}if(t===e){F=null;break}if(n=t.sibling,n!==null){n.return=t.return,F=n;break}F=t.return}}function Ha(e){for(;F!==null;){var t=F;if(t===e){F=null;break}var n=t.sibling;if(n!==null){n.return=t.return,F=n;break}F=t.return}}function Va(e){for(;F!==null;){var t=F;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{es(4,t)}catch(c){le(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(c){le(t,i,c)}}var s=t.return;try{Po(t)}catch(c){le(t,s,c)}break;case 5:var o=t.return;try{Po(t)}catch(c){le(t,o,c)}}}catch(c){le(t,t.return,c)}if(t===e){F=null;break}var a=t.sibling;if(a!==null){a.return=t.return,F=a;break}F=t.return}}var rh=Math.ceil,Oi=kt.ReactCurrentDispatcher,El=kt.ReactCurrentOwner,He=kt.ReactCurrentBatchConfig,G=0,me=null,ce=null,ye=0,Ie=0,wn=Bt(0),de=0,zr=null,en=0,ts=0,jl=0,ur=null,ze=null,Cl=0,In=1/0,ct=null,Fi=!1,Ao=null,It=null,Zr=!1,zt=null,Ri=0,dr=0,To=null,mi=-1,gi=0;function Ee(){return G&6?ae():mi!==-1?mi:mi=ae()}function $t(e){return e.mode&1?G&2&&ye!==0?ye&-ye:Dp.transition!==null?(gi===0&&(gi=Kc()),gi):(e=Z,e!==0||(e=window.event,e=e===void 0?16:Zc(e.type)),e):1}function tt(e,t,n,r){if(50<dr)throw dr=0,To=null,Error(E(185));br(e,n,r),(!(G&2)||e!==me)&&(e===me&&(!(G&2)&&(ts|=n),de===4&&Ct(e,ye)),Te(e,r),n===1&&G===0&&!(t.mode&1)&&(In=ae()+500,Zi&&Ut()))}function Te(e,t){var n=e.callbackNode;Df(e,t);var r=Si(e,e===me?ye:0);if(r===0)n!==null&&ta(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ta(n),t===1)e.tag===0?Rp(Ya.bind(null,e)):gu(Ya.bind(null,e)),$p(function(){!(G&6)&&Ut()}),n=null;else{switch(Hc(r)){case 1:n=Jo;break;case 4:n=Uc;break;case 16:n=ki;break;case 536870912:n=Wc;break;default:n=ki}n=hd(n,ld.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ld(e,t){if(mi=-1,gi=0,G&6)throw Error(E(327));var n=e.callbackNode;if(Nn()&&e.callbackNode!==n)return null;var r=Si(e,e===me?ye:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Di(e,r);else{t=r;var i=G;G|=2;var s=cd();(me!==e||ye!==t)&&(ct=null,In=ae()+500,Gt(e,t));do try{oh();break}catch(a){ad(e,a)}while(!0);dl(),Oi.current=s,G=i,ce!==null?t=0:(me=null,ye=0,t=de)}if(t!==0){if(t===2&&(i=so(e),i!==0&&(r=i,t=Io(e,i))),t===1)throw n=zr,Gt(e,0),Ct(e,r),Te(e,ae()),n;if(t===6)Ct(e,r);else{if(i=e.current.alternate,!(r&30)&&!ih(i)&&(t=Di(e,r),t===2&&(s=so(e),s!==0&&(r=s,t=Io(e,s))),t===1))throw n=zr,Gt(e,0),Ct(e,r),Te(e,ae()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(E(345));case 2:Kt(e,ze,ct);break;case 3:if(Ct(e,r),(r&130023424)===r&&(t=Cl+500-ae(),10<t)){if(Si(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Ee(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=ho(Kt.bind(null,e,ze,ct),t);break}Kt(e,ze,ct);break;case 4:if(Ct(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var o=31-et(r);s=1<<o,o=t[o],o>i&&(i=o),r&=~s}if(r=i,r=ae()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*rh(r/1960))-r,10<r){e.timeoutHandle=ho(Kt.bind(null,e,ze,ct),r);break}Kt(e,ze,ct);break;case 5:Kt(e,ze,ct);break;default:throw Error(E(329))}}}return Te(e,ae()),e.callbackNode===n?ld.bind(null,e):null}function Io(e,t){var n=ur;return e.current.memoizedState.isDehydrated&&(Gt(e,t).flags|=256),e=Di(e,t),e!==2&&(t=ze,ze=n,t!==null&&$o(t)),e}function $o(e){ze===null?ze=e:ze.push.apply(ze,e)}function ih(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!nt(s(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ct(e,t){for(t&=~jl,t&=~ts,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-et(t),r=1<<n;e[n]=-1,t&=~r}}function Ya(e){if(G&6)throw Error(E(327));Nn();var t=Si(e,0);if(!(t&1))return Te(e,ae()),null;var n=Di(e,t);if(e.tag!==0&&n===2){var r=so(e);r!==0&&(t=r,n=Io(e,r))}if(n===1)throw n=zr,Gt(e,0),Ct(e,t),Te(e,ae()),n;if(n===6)throw Error(E(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Kt(e,ze,ct),Te(e,ae()),null}function Nl(e,t){var n=G;G|=1;try{return e(t)}finally{G=n,G===0&&(In=ae()+500,Zi&&Ut())}}function tn(e){zt!==null&&zt.tag===0&&!(G&6)&&Nn();var t=G;G|=1;var n=He.transition,r=Z;try{if(He.transition=null,Z=1,e)return e()}finally{Z=r,He.transition=n,G=t,!(G&6)&&Ut()}}function zl(){Ie=wn.current,te(wn)}function Gt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Ip(n)),ce!==null)for(n=ce.return;n!==null;){var r=n;switch(al(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ni();break;case 3:An(),te(Me),te(Se),yl();break;case 5:gl(r);break;case 4:An();break;case 13:te(re);break;case 19:te(re);break;case 10:fl(r.type._context);break;case 22:case 23:zl()}n=n.return}if(me=e,ce=e=Lt(e.current,null),ye=Ie=t,de=0,zr=null,jl=ts=en=0,ze=ur=null,Vt!==null){for(t=0;t<Vt.length;t++)if(n=Vt[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}Vt=null}return e}function ad(e,t){do{var n=ce;try{if(dl(),fi.current=Li,$i){for(var r=ie.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}$i=!1}if(qt=0,pe=ue=ie=null,ar=!1,jr=0,El.current=null,n===null||n.return===null){de=1,zr=t,ce=null;break}e:{var s=e,o=n.return,a=n,c=t;if(t=ye,a.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,d=a,h=d.tag;if(!(d.mode&1)&&(h===0||h===11||h===15)){var p=d.alternate;p?(d.updateQueue=p.updateQueue,d.memoizedState=p.memoizedState,d.lanes=p.lanes):(d.updateQueue=null,d.memoizedState=null)}var v=Ia(o);if(v!==null){v.flags&=-257,$a(v,o,a,s,t),v.mode&1&&Ta(s,u,t),t=v,c=u;var x=t.updateQueue;if(x===null){var w=new Set;w.add(c),t.updateQueue=w}else x.add(c);break e}else{if(!(t&1)){Ta(s,u,t),Pl();break e}c=Error(E(426))}}else if(ne&&a.mode&1){var g=Ia(o);if(g!==null){!(g.flags&65536)&&(g.flags|=256),$a(g,o,a,s,t),cl(Tn(c,a));break e}}s=c=Tn(c,a),de!==4&&(de=2),ur===null?ur=[s]:ur.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var m=Hu(s,c,t);Na(s,m);break e;case 1:a=c;var f=s.type,y=s.stateNode;if(!(s.flags&128)&&(typeof f.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(It===null||!It.has(y)))){s.flags|=65536,t&=-t,s.lanes|=t;var k=Vu(s,a,t);Na(s,k);break e}}s=s.return}while(s!==null)}dd(n)}catch(_){t=_,ce===n&&n!==null&&(ce=n=n.return);continue}break}while(!0)}function cd(){var e=Oi.current;return Oi.current=Li,e===null?Li:e}function Pl(){(de===0||de===3||de===2)&&(de=4),me===null||!(en&268435455)&&!(ts&268435455)||Ct(me,ye)}function Di(e,t){var n=G;G|=2;var r=cd();(me!==e||ye!==t)&&(ct=null,Gt(e,t));do try{sh();break}catch(i){ad(e,i)}while(!0);if(dl(),G=n,Oi.current=r,ce!==null)throw Error(E(261));return me=null,ye=0,de}function sh(){for(;ce!==null;)ud(ce)}function oh(){for(;ce!==null&&!Mf();)ud(ce)}function ud(e){var t=pd(e.alternate,e,Ie);e.memoizedProps=e.pendingProps,t===null?dd(e):ce=t,El.current=null}function dd(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=qp(n,t),n!==null){n.flags&=32767,ce=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{de=6,ce=null;return}}else if(n=Jp(n,t,Ie),n!==null){ce=n;return}if(t=t.sibling,t!==null){ce=t;return}ce=t=e}while(t!==null);de===0&&(de=5)}function Kt(e,t,n){var r=Z,i=He.transition;try{He.transition=null,Z=1,lh(e,t,n,r)}finally{He.transition=i,Z=r}return null}function lh(e,t,n,r){do Nn();while(zt!==null);if(G&6)throw Error(E(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(E(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(Bf(e,s),e===me&&(ce=me=null,ye=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Zr||(Zr=!0,hd(ki,function(){return Nn(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=He.transition,He.transition=null;var o=Z;Z=1;var a=G;G|=4,El.current=null,th(e,n),sd(n,e),Np(fo),_i=!!uo,fo=uo=null,e.current=n,nh(n),Af(),G=a,Z=o,He.transition=s}else e.current=n;if(Zr&&(Zr=!1,zt=e,Ri=i),s=e.pendingLanes,s===0&&(It=null),$f(n.stateNode),Te(e,ae()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Fi)throw Fi=!1,e=Ao,Ao=null,e;return Ri&1&&e.tag!==0&&Nn(),s=e.pendingLanes,s&1?e===To?dr++:(dr=0,To=e):dr=0,Ut(),null}function Nn(){if(zt!==null){var e=Hc(Ri),t=He.transition,n=Z;try{if(He.transition=null,Z=16>e?16:e,zt===null)var r=!1;else{if(e=zt,zt=null,Ri=0,G&6)throw Error(E(331));var i=G;for(G|=4,F=e.current;F!==null;){var s=F,o=s.child;if(F.flags&16){var a=s.deletions;if(a!==null){for(var c=0;c<a.length;c++){var u=a[c];for(F=u;F!==null;){var d=F;switch(d.tag){case 0:case 11:case 15:cr(8,d,s)}var h=d.child;if(h!==null)h.return=d,F=h;else for(;F!==null;){d=F;var p=d.sibling,v=d.return;if(nd(d),d===u){F=null;break}if(p!==null){p.return=v,F=p;break}F=v}}}var x=s.alternate;if(x!==null){var w=x.child;if(w!==null){x.child=null;do{var g=w.sibling;w.sibling=null,w=g}while(w!==null)}}F=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,F=o;else e:for(;F!==null;){if(s=F,s.flags&2048)switch(s.tag){case 0:case 11:case 15:cr(9,s,s.return)}var m=s.sibling;if(m!==null){m.return=s.return,F=m;break e}F=s.return}}var f=e.current;for(F=f;F!==null;){o=F;var y=o.child;if(o.subtreeFlags&2064&&y!==null)y.return=o,F=y;else e:for(o=f;F!==null;){if(a=F,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:es(9,a)}}catch(_){le(a,a.return,_)}if(a===o){F=null;break e}var k=a.sibling;if(k!==null){k.return=a.return,F=k;break e}F=a.return}}if(G=i,Ut(),lt&&typeof lt.onPostCommitFiberRoot=="function")try{lt.onPostCommitFiberRoot(Vi,e)}catch{}r=!0}return r}finally{Z=n,He.transition=t}}return!1}function Xa(e,t,n){t=Tn(n,t),t=Hu(e,t,1),e=Tt(e,t,1),t=Ee(),e!==null&&(br(e,1,t),Te(e,t))}function le(e,t,n){if(e.tag===3)Xa(e,e,n);else for(;t!==null;){if(t.tag===3){Xa(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(It===null||!It.has(r))){e=Tn(n,e),e=Vu(t,e,1),t=Tt(t,e,1),e=Ee(),t!==null&&(br(t,1,e),Te(t,e));break}}t=t.return}}function ah(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ee(),e.pingedLanes|=e.suspendedLanes&n,me===e&&(ye&n)===n&&(de===4||de===3&&(ye&130023424)===ye&&500>ae()-Cl?Gt(e,0):jl|=n),Te(e,t)}function fd(e,t){t===0&&(e.mode&1?(t=Br,Br<<=1,!(Br&130023424)&&(Br=4194304)):t=1);var n=Ee();e=xt(e,t),e!==null&&(br(e,t,n),Te(e,n))}function ch(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),fd(e,n)}function uh(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(E(314))}r!==null&&r.delete(t),fd(e,n)}var pd;pd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Me.current)Pe=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Pe=!1,Zp(e,t,n);Pe=!!(e.flags&131072)}else Pe=!1,ne&&t.flags&1048576&&yu(t,bi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;hi(e,t),e=t.pendingProps;var i=Pn(t,Se.current);Cn(t,n),i=xl(null,t,r,e,i,n);var s=wl();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ae(r)?(s=!0,zi(t)):s=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,hl(t),i.updater=qi,t.stateNode=i,i._reactInternals=t,ko(t,r,e,n),t=Eo(null,t,r,!0,s,n)):(t.tag=0,ne&&s&&ll(t),_e(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(hi(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=fh(r),e=Qe(r,e),i){case 0:t=_o(null,t,r,e,n);break e;case 1:t=Fa(null,t,r,e,n);break e;case 11:t=La(null,t,r,e,n);break e;case 14:t=Oa(null,t,r,Qe(r.type,e),n);break e}throw Error(E(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Qe(r,i),_o(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Qe(r,i),Fa(e,t,r,i,n);case 3:e:{if(Qu(t),e===null)throw Error(E(387));r=t.pendingProps,s=t.memoizedState,i=s.element,_u(e,t),Ti(t,r,null,n);var o=t.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){i=Tn(Error(E(423)),t),t=Ra(e,t,r,n,i);break e}else if(r!==i){i=Tn(Error(E(424)),t),t=Ra(e,t,r,n,i);break e}else for($e=At(t.stateNode.containerInfo.firstChild),Le=t,ne=!0,Je=null,n=ku(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(bn(),r===i){t=wt(e,t,n);break e}_e(e,t,r,n)}t=t.child}return t;case 5:return Eu(t),e===null&&vo(t),r=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,o=i.children,po(r,i)?o=null:s!==null&&po(r,s)&&(t.flags|=32),Gu(e,t),_e(e,t,o,n),t.child;case 6:return e===null&&vo(t),null;case 13:return Zu(e,t,n);case 4:return ml(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Mn(t,null,r,n):_e(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Qe(r,i),La(e,t,r,i,n);case 7:return _e(e,t,t.pendingProps,n),t.child;case 8:return _e(e,t,t.pendingProps.children,n),t.child;case 12:return _e(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,s=t.memoizedProps,o=i.value,q(Mi,r._currentValue),r._currentValue=o,s!==null)if(nt(s.value,o)){if(s.children===i.children&&!Me.current){t=wt(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var c=a.firstContext;c!==null;){if(c.context===r){if(s.tag===1){c=gt(-1,n&-n),c.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),xo(s.return,n,t),a.lanes|=n;break}c=c.next}}else if(s.tag===10)o=s.type===t.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(E(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),xo(o,n,t),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===t){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}_e(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Cn(t,n),i=Ve(i),r=r(i),t.flags|=1,_e(e,t,r,n),t.child;case 14:return r=t.type,i=Qe(r,t.pendingProps),i=Qe(r.type,i),Oa(e,t,r,i,n);case 15:return Yu(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Qe(r,i),hi(e,t),t.tag=1,Ae(r)?(e=!0,zi(t)):e=!1,Cn(t,n),Ku(t,r,i),ko(t,r,i,n),Eo(null,t,r,!0,e,n);case 19:return Ju(e,t,n);case 22:return Xu(e,t,n)}throw Error(E(156,t.tag))};function hd(e,t){return Bc(e,t)}function dh(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ke(e,t,n,r){return new dh(e,t,n,r)}function bl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function fh(e){if(typeof e=="function")return bl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Go)return 11;if(e===Qo)return 14}return 2}function Lt(e,t){var n=e.alternate;return n===null?(n=Ke(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function yi(e,t,n,r,i,s){var o=2;if(r=e,typeof e=="function")bl(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case un:return Qt(n.children,i,s,t);case Xo:o=8,i|=8;break;case Ks:return e=Ke(12,n,t,i|2),e.elementType=Ks,e.lanes=s,e;case Hs:return e=Ke(13,n,t,i),e.elementType=Hs,e.lanes=s,e;case Vs:return e=Ke(19,n,t,i),e.elementType=Vs,e.lanes=s,e;case Ec:return ns(n,i,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Sc:o=10;break e;case _c:o=9;break e;case Go:o=11;break e;case Qo:o=14;break e;case _t:o=16,r=null;break e}throw Error(E(130,e==null?e:typeof e,""))}return t=Ke(o,n,t,i),t.elementType=e,t.type=r,t.lanes=s,t}function Qt(e,t,n,r){return e=Ke(7,e,r,t),e.lanes=n,e}function ns(e,t,n,r){return e=Ke(22,e,r,t),e.elementType=Ec,e.lanes=n,e.stateNode={isHidden:!1},e}function Ls(e,t,n){return e=Ke(6,e,null,t),e.lanes=n,e}function Os(e,t,n){return t=Ke(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function ph(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ys(0),this.expirationTimes=ys(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ys(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Ml(e,t,n,r,i,s,o,a,c){return e=new ph(e,t,n,a,c),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Ke(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},hl(s),e}function hh(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:cn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function md(e){if(!e)return Rt;e=e._reactInternals;e:{if(on(e)!==e||e.tag!==1)throw Error(E(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ae(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(E(171))}if(e.tag===1){var n=e.type;if(Ae(n))return mu(e,n,t)}return t}function gd(e,t,n,r,i,s,o,a,c){return e=Ml(n,r,!0,e,i,s,o,a,c),e.context=md(null),n=e.current,r=Ee(),i=$t(n),s=gt(r,i),s.callback=t??null,Tt(n,s,i),e.current.lanes=i,br(e,i,r),Te(e,r),e}function rs(e,t,n,r){var i=t.current,s=Ee(),o=$t(i);return n=md(n),t.context===null?t.context=n:t.pendingContext=n,t=gt(s,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Tt(i,t,o),e!==null&&(tt(e,i,o,s),di(e,i,o)),o}function Bi(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ga(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Al(e,t){Ga(e,t),(e=e.alternate)&&Ga(e,t)}function mh(){return null}var yd=typeof reportError=="function"?reportError:function(e){console.error(e)};function Tl(e){this._internalRoot=e}is.prototype.render=Tl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(E(409));rs(e,t,null,null)};is.prototype.unmount=Tl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;tn(function(){rs(null,e,null,null)}),t[vt]=null}};function is(e){this._internalRoot=e}is.prototype.unstable_scheduleHydration=function(e){if(e){var t=Xc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<jt.length&&t!==0&&t<jt[n].priority;n++);jt.splice(n,0,e),n===0&&Qc(e)}};function Il(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ss(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Qa(){}function gh(e,t,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var u=Bi(o);s.call(u)}}var o=gd(t,r,e,0,null,!1,!1,"",Qa);return e._reactRootContainer=o,e[vt]=o.current,wr(e.nodeType===8?e.parentNode:e),tn(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var u=Bi(c);a.call(u)}}var c=Ml(e,0,!1,null,null,!1,!1,"",Qa);return e._reactRootContainer=c,e[vt]=c.current,wr(e.nodeType===8?e.parentNode:e),tn(function(){rs(t,c,n,r)}),c}function os(e,t,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var a=i;i=function(){var c=Bi(o);a.call(c)}}rs(t,o,e,i)}else o=gh(n,t,e,i,r);return Bi(o)}Vc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=er(t.pendingLanes);n!==0&&(qo(t,n|1),Te(t,ae()),!(G&6)&&(In=ae()+500,Ut()))}break;case 13:tn(function(){var r=xt(e,1);if(r!==null){var i=Ee();tt(r,e,1,i)}}),Al(e,1)}};el=function(e){if(e.tag===13){var t=xt(e,134217728);if(t!==null){var n=Ee();tt(t,e,134217728,n)}Al(e,134217728)}};Yc=function(e){if(e.tag===13){var t=$t(e),n=xt(e,t);if(n!==null){var r=Ee();tt(n,e,t,r)}Al(e,t)}};Xc=function(){return Z};Gc=function(e,t){var n=Z;try{return Z=e,t()}finally{Z=n}};no=function(e,t,n){switch(t){case"input":if(Gs(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Qi(r);if(!i)throw Error(E(90));Cc(r),Gs(r,i)}}}break;case"textarea":zc(e,n);break;case"select":t=n.value,t!=null&&Sn(e,!!n.multiple,t,!1)}};$c=Nl;Lc=tn;var yh={usingClientEntryPoint:!1,Events:[Ar,hn,Qi,Tc,Ic,Nl]},Qn={findFiberByHostInstance:Ht,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},vh={bundleType:Qn.bundleType,version:Qn.version,rendererPackageName:Qn.rendererPackageName,rendererConfig:Qn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:kt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Rc(e),e===null?null:e.stateNode},findFiberByHostInstance:Qn.findFiberByHostInstance||mh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Jr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jr.isDisabled&&Jr.supportsFiber)try{Vi=Jr.inject(vh),lt=Jr}catch{}}Fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yh;Fe.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Il(t))throw Error(E(200));return hh(e,t,null,n)};Fe.createRoot=function(e,t){if(!Il(e))throw Error(E(299));var n=!1,r="",i=yd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Ml(e,1,!1,null,null,n,!1,r,i),e[vt]=t.current,wr(e.nodeType===8?e.parentNode:e),new Tl(t)};Fe.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(E(188)):(e=Object.keys(e).join(","),Error(E(268,e)));return e=Rc(t),e=e===null?null:e.stateNode,e};Fe.flushSync=function(e){return tn(e)};Fe.hydrate=function(e,t,n){if(!ss(t))throw Error(E(200));return os(null,e,t,!0,n)};Fe.hydrateRoot=function(e,t,n){if(!Il(e))throw Error(E(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=yd;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=gd(t,null,e,1,n??null,i,!1,s,o),e[vt]=t.current,wr(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new is(t)};Fe.render=function(e,t,n){if(!ss(t))throw Error(E(200));return os(null,e,t,!1,n)};Fe.unmountComponentAtNode=function(e){if(!ss(e))throw Error(E(40));return e._reactRootContainer?(tn(function(){os(null,null,e,!1,function(){e._reactRootContainer=null,e[vt]=null})}),!0):!1};Fe.unstable_batchedUpdates=Nl;Fe.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!ss(n))throw Error(E(200));if(e==null||e._reactInternals===void 0)throw Error(E(38));return os(e,t,n,!1,r)};Fe.version="18.3.1-next-f1338f8080-20240426";function vd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vd)}catch(e){console.error(e)}}vd(),vc.exports=Fe;var xh=vc.exports,Za=xh;Us.createRoot=Za.createRoot,Us.hydrateRoot=Za.hydrateRoot;function wh(e){let t=0;return()=>`${e}-${++t}`}const nn=wh("g");let kh=0;function Sh(){return`g-im-${Date.now().toString(36)}-${++kh}`}let _h=0;function xd(){return`p-${Date.now().toString(36)}-${++_h}`}function Eh(){return`bg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`}const $n=1,pt=50,wd=200,Ln=e=>Math.max($n,Math.min(pt,Number.isFinite(e)?Math.floor(e):$n));function Lo(e=2,t=2,n=wd){const r=Ln(e),i=Ln(t),s=Array.from({length:r},(o,a)=>Array.from({length:i},(c,u)=>`r${a}c${u}-${nn()}`));return{rows:r,cols:i,cellSize:n,groups:s}}function jh(e,t,n){const r=Ln(t),i=Ln(n);if(r===e.rows&&i===e.cols)return e;const s=Array.from({length:r},(a,c)=>Array.from({length:i},(u,d)=>c<e.rows&&d<e.cols?e.groups[c][d]:`r${c}c${d}-${nn()}`)),o=new Map;for(const a of s)for(const c of a)o.set(c,(o.get(c)||0)+1);for(let a=0;a<r;a++)for(let c=0;c<i;c++){const u=s[a][c];if(o.get(u)===1)continue;const d=[];for(let h=0;h<r;h++)for(let p=0;p<i;p++)s[h][p]===u&&d.push([h,p]);if(!Ir(d))for(const[h,p]of d)s[h][p]=`r${h}c${p}-${nn()}`}return{...e,rows:r,cols:i,groups:s}}function Ir(e){if(e.length===0)return!1;let t=1/0,n=-1/0,r=1/0,i=-1/0;for(const[a,c]of e)a<t&&(t=a),a>n&&(n=a),c<r&&(r=c),c>i&&(i=c);const s=(n-t+1)*(i-r+1);if(e.length!==s)return!1;const o=new Set(e.map(([a,c])=>`${a},${c}`));for(let a=t;a<=n;a++)for(let c=r;c<=i;c++)if(!o.has(`${a},${c}`))return!1;return!0}function kd(e){if(e.length===0)return[];let t=1/0,n=-1/0,r=1/0,i=-1/0;for(const[o,a]of e)o<t&&(t=o),o>n&&(n=o),a<r&&(r=a),a>i&&(i=a);const s=[];for(let o=t;o<=n;o++)for(let a=r;a<=i;a++)s.push([o,a]);return s}function Sd(e,t){if(!Ir(t))return e;const n=new Set(t.map(([o,a])=>`${o},${a}`)),r=new Set;for(const[o,a]of t)r.add(e.groups[o][a]);const i=e.groups.map(o=>o.slice()),s=nn();for(let o=0;o<e.rows;o++)for(let a=0;a<e.cols;a++)n.has(`${o},${a}`)||r.has(i[o][a])&&(i[o][a]=`r${o}c${a}-${nn()}`);for(const[o,a]of t)i[o][a]=s;return{...e,groups:i}}function _d(e,t){const n=new Set;for(const[i,s]of t)n.add(e.groups[i][s]);const r=e.groups.map(i=>i.slice());for(let i=0;i<e.rows;i++)for(let s=0;s<e.cols;s++)n.has(r[i][s])&&(r[i][s]=`r${i}c${s}-${nn()}`);return{...e,groups:r}}function ls(e){const t=new Map;for(let n=0;n<e.rows;n++)for(let r=0;r<e.cols;r++){const i=e.groups[n][r],s=t.get(i);s?(n<s.rMin&&(s.rMin=n),n>s.rMax&&(s.rMax=n),r<s.cMin&&(s.cMin=r),r>s.cMax&&(s.cMax=r)):t.set(i,{rMin:n,rMax:n,cMin:r,cMax:r})}return t}function Ch(e,t){const n=new Set(t),r=e.groups.filter((s,o)=>!n.has(o));if(r.length<$n)return null;const i={...e,rows:r.length,groups:r.map(s=>s.slice())};return Ed(i)}function Nh(e,t){const n=new Set(t),r=e.cols-n.size;if(r<$n)return null;const i=e.groups.map(s=>s.filter((o,a)=>!n.has(a)));return Ed({...e,cols:r,groups:i})}function Ed(e){const t=new Map;for(const r of e.groups)for(const i of r)t.set(i,(t.get(i)||0)+1);const n=e.groups.map(r=>r.slice());for(let r=0;r<e.rows;r++)for(let i=0;i<e.cols;i++){const s=n[r][i];if(t.get(s)===1)continue;const o=[];for(let a=0;a<e.rows;a++)for(let c=0;c<e.cols;c++)n[a][c]===s&&o.push([a,c]);if(!Ir(o))for(const[a,c]of o)n[a][c]=`r${a}c${c}-${nn()}`}return{...e,groups:n}}function Oo(e,t){return e<t?`${e}||${t}`:`${t}||${e}`}function Ja(e){return e.includes("||outer-")?[e.slice(0,e.indexOf("||outer-"))]:e.split("||")}function kn(e){var n;if(!e)return null;if(e.effects)return e.effects;const t=e.hoverAnimation??((n=e.config)==null?void 0:n.hoverAnimation);return!t||t==="none"?null:{[`${t}:hover`]:{id:t,trigger:"hover",config:{}}}}function jd(...e){const t={};for(const n of e)if(n)for(const[r,i]of Object.entries(n))i===null?delete t[r]:t[r]=i;return t}function zh(e,t){var n,r,i;return jd(kn((n=e==null?void 0:e.cells)==null?void 0:n.default),kn((i=(r=e==null?void 0:e.cells)==null?void 0:r.byPiece)==null?void 0:i[t]))}function Cd(e,t,n,r=[]){var o;const i=n==="inner"?e==null?void 0:e.inner:e==null?void 0:e.outer,s=r.map(a=>{var c;return kn((c=e==null?void 0:e.byPiece)==null?void 0:c[a])});return jd(kn(e==null?void 0:e.default),kn(i),...s,kn((o=e==null?void 0:e.byEdge)==null?void 0:o[t]))}function Ph(e,t,n){if(!(e!=null&&e.length))return;const r=[];for(const i of e){const s=i.rect;s&&(s.rMax<t.rMin||s.rMin>t.rMax||s.cMax<t.cMin||s.cMin>t.cMax||r.push({id:i.id,src:i.src,fit:i.fit||"cover",x:s.cMin*n,y:s.rMin*n,w:(s.cMax-s.cMin+1)*n,h:(s.rMax-s.rMin+1)*n}))}return r.length?r:void 0}function Fo(e,t,n,r=[]){var c,u;const i=(c=e==null?void 0:e.byEdge)==null?void 0:c[t];let s=null;for(const d of r)if((u=e==null?void 0:e.byPiece)!=null&&u[d]){s=e.byPiece[d];break}const o=n==="inner"?e==null?void 0:e.inner:e==null?void 0:e.outer,a=e==null?void 0:e.default;return{effect:(i==null?void 0:i.effect)??(s==null?void 0:s.effect)??(o==null?void 0:o.effect)??(a==null?void 0:a.effect)??"puzzle",config:(i==null?void 0:i.config)??(s==null?void 0:s.config)??(o==null?void 0:o.config)??(a==null?void 0:a.config)}}function Dn(e){const{grid:t,edges:n,pieceColors:r,pieceContent:i,backgrounds:s}=e,o=t.cellSize,a=ls(t),c=[],u=new Map;for(const[d,h]of a){const p={id:d,x:h.cMin*o,y:h.rMin*o,w:(h.cMax-h.cMin+1)*o,h:(h.rMax-h.rMin+1)*o,label:Th(d),fill:r==null?void 0:r[d],content:i==null?void 0:i[d],backgrounds:Ph(s,h,o),cellEffects:zh(e,d),sides:{},sideEffects:{},sideEffectConfigs:{},edgeEffects:{},edgeEffectConfigs:{}};c.push(p),u.set(d,p)}for(const d of c){const h=a.get(d.id);for(const p of Nd){const v=bh(t,d.id,h,p);if(v.length===0){const x=`${d.id}||outer-${p}`,{effect:w,config:g}=Fo(n,x,"outer",[d.id]),m=Cd(n,x,"outer",[d.id]);if(w==="puzzle"){let y=p==="right"||p==="bottom"?"tab":"socket";g!=null&&g.inverted&&(y=y==="tab"?"socket":"tab"),d.sides[p]={count:1,type:y}}else d.sides[p]=w==="flat"?"flat":{count:1,type:"tab"};d.edgeEffects[p]=d.edgeEffects[p]||{},d.edgeEffectConfigs[p]=d.edgeEffectConfigs[p]||{},d.edgeEffects[p].__outer=w;const f={...g||{},effects:m};d.edgeEffectConfigs[p].__outer=f;continue}Ah(d,p,v,n)}}return c}const $l={right:{start:e=>e.rMin,end:e=>e.rMax,atEdge:(e,t)=>e.cMax+1>=t.cols,peek:(e,t,n)=>n.groups[e][t.cMax+1]},left:{start:e=>e.rMin,end:e=>e.rMax,atEdge:e=>e.cMin===0,peek:(e,t,n)=>n.groups[e][t.cMin-1]},bottom:{start:e=>e.cMin,end:e=>e.cMax,atEdge:(e,t)=>e.rMax+1>=t.rows,peek:(e,t,n)=>n.groups[t.rMax+1][e]},top:{start:e=>e.cMin,end:e=>e.cMax,atEdge:e=>e.rMin===0,peek:(e,t,n)=>n.groups[t.rMin-1][e]}};function bh(e,t,n,r){const i=$l[r];if(i.atEdge(n,e))return[];const s=i.start(n),o=i.end(n),a=o-s+1,c=[];let u=s;for(;u<=o;){const d=i.peek(u,n,e);if(d===t){u++;continue}let h=u;for(;h+1<=o&&i.peek(h+1,n,e)===d;)h++;const p=(u-s)/a,v=(h-s+1)/a;c.push({neighborId:d,startPos:p,endPos:v,midPos:(p+v)/2}),u=h+1}return c}function Mh(e){return e==="right"||e==="bottom"?"tab":"socket"}function Ah(e,t,n,r){const i=Mh(t),s=n.map(o=>{const a=Oo(e.id,o.neighborId),{config:c}=Fo(r,a,"inner",[e.id,o.neighborId]);let u=i;return c!=null&&c.inverted&&(u=u==="tab"?"socket":"tab"),{pos:o.midPos,type:u}});s.length===1&&Math.abs(s[0].pos-.5)<1e-6?e.sides[t]={count:1,type:s[0].type}:e.sides[t]=s,e.edgeEffects[t]=e.edgeEffects[t]||{},e.edgeEffectConfigs[t]=e.edgeEffectConfigs[t]||{};for(const o of n){const a=Oo(e.id,o.neighborId),{effect:c,config:u}=Fo(r,a,"inner",[e.id,o.neighborId]),d=Cd(r,a,"inner",[e.id,o.neighborId]);e.edgeEffects[t][o.neighborId]=c;const h={...u||{},effects:d};e.edgeEffectConfigs[t][o.neighborId]=h}}function Th(e){return e.startsWith("g-")?`#${e.slice(2)}`:e.split("-")[0]}const Ih=[{side:"right",opposite:"left"},{side:"bottom",opposite:"top"}];function $h(e){const{grid:t}=e,n=ls(t),r=new Set,i=[];for(const[s,o]of n)for(const{side:a,opposite:c}of Ih){const u=$l[a];if(u.atEdge(o,t))continue;const d=u.start(o),h=u.end(o);let p=d;for(;p<=h;){const v=u.peek(p,o,t);if(v===s){p++;continue}let x=p;for(;x+1<=h&&u.peek(x+1,o,t)===v;)x++;const w=Oo(s,v);r.has(w)||(r.add(w),i.push({pairKey:w,pieceAId:s,sideA:a,pieceBId:v,sideB:c})),p=x+1}}return i}const Nd=["top","right","bottom","left"];function Lh(e){const{grid:t}=e,n=ls(t),r=[];for(const[i,s]of n)for(const o of Nd)$l[o].atEdge(s,t)&&r.push({pairKey:`${i}||outer-${o}`,pieceId:i,side:o,isOuter:!0});return r}function Ro(e="Untitled"){const t=Date.now();return{id:xd(),name:e,createdAt:t,updatedAt:t,grid:Lo(2,2),edges:{default:{effect:"puzzle",effects:{"highlight:hover":{id:"highlight",trigger:"hover",config:{}}}},inner:null,outer:null,byPiece:{},byEdge:{}},cells:{default:{effects:{"highlight:hover":{id:"highlight",trigger:"hover",config:{}}}},byPiece:{}},pieceColors:{},pieceContent:{},backgrounds:[]}}const Ui="hakoniwa:projects",Wi="hakoniwa:currentId",Oh="puzzle-studio:projects",Fh="puzzle-studio:currentId";function Rh(){try{if(!localStorage.getItem(Ui)){const e=localStorage.getItem(Oh);e&&localStorage.setItem(Ui,e)}if(!localStorage.getItem(Wi)){const e=localStorage.getItem(Fh);e&&localStorage.setItem(Wi,e)}}catch{}}Rh();function Xt(){try{const e=localStorage.getItem(Ui);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function zd(e){try{localStorage.setItem(Ui,JSON.stringify(e))}catch{}}function Dh(e){const t=Xt(),n=t.findIndex(i=>i.id===e.id),r={...e,updatedAt:Date.now()};return n>=0?t[n]=r:t.push(r),zd(t),r}function Bh(e){zd(Xt().filter(t=>t.id!==e))}function Uh(){try{return localStorage.getItem(Wi)}catch{return null}}function qa(e){try{localStorage.setItem(Wi,e)}catch{}}function Wh(e){const t=JSON.stringify(e,null,2),n=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download=`${(e.name||"project").replace(/\s+/g,"-")}.json`,i.click(),URL.revokeObjectURL(r)}function Kh(e){return new Promise((t,n)=>{const r=new FileReader;r.onload=i=>{var s;try{const o=JSON.parse(i.target.result);if(!((s=o==null?void 0:o.grid)!=null&&s.groups)||!Array.isArray(o.grid.groups))throw new Error("Invalid project file");t({...o,id:xd(),updatedAt:Date.now()})}catch(o){n(o)}},r.onerror=()=>n(r.error),r.readAsText(e)})}function Hh(e){const t=n=>e(r=>r&&{...r,grid:n(r.grid)});return{setGrid({rows:n,cols:r}){t(i=>jh(i,n??i.rows,r??i.cols))},merge(n){t(r=>Sd(r,n))},unmerge(n){t(r=>_d(r,n))},removeRows(n){n!=null&&n.length&&e(r=>{if(!r)return r;const i=Ch(r.grid,n);return i?{...r,grid:i}:r})},removeCols(n){n!=null&&n.length&&e(r=>{if(!r)return r;const i=Nh(r.grid,n);return i?{...r,grid:i}:r})},replaceGrid(n,r){e(i=>{var s;return i&&{...i,grid:n,edges:{default:((s=i.edges)==null?void 0:s.default)??{effect:"puzzle"},byEdge:{}},pieceColors:{},pieceContent:r||{}}})}}}function Vh(e){const t=n=>e(r=>r&&{...r,edges:n(r.edges)});return{setDefaultEdgeEffect(n,r){t(i=>({...i,default:{effect:n,...r?{config:r}:{}}}))},setDefaultEdgeConfig(n){t(r=>({...r,default:{...r.default,config:{...r.default.config||{},...n}}}))},setEdgeEffect(n,r,i){t(s=>({...s,byEdge:{...s.byEdge,[n]:{effect:r,...i?{config:i}:{}}}}))},setEdgeConfig(n,r){t(i=>{const s=i.byEdge[n]||{effect:i.default.effect};return{...i,byEdge:{...i.byEdge,[n]:{...s,config:{...s.config||{},...r}}}}})},clearEdgeOverride(n){t(r=>{const i={...r.byEdge};return delete i[n],{...r,byEdge:i}})},resetEdgeOverrides(){t(n=>({...n,byEdge:{},byPiece:{}}))},setLayerEffect(n,r,i){t(s=>({...s,[n]:{effect:r,...i?{config:i}:{}}}))},setLayerConfig(n,r){t(i=>{var o;const s=i[n]||{effect:((o=i.default)==null?void 0:o.effect)??"puzzle"};return{...i,[n]:{...s,config:{...s.config||{},...r}}}})},clearLayer(n){t(r=>({...r,[n]:null}))},setPieceEdgeEffect(n,r,i){t(s=>({...s,byPiece:{...s.byPiece||{},[n]:{effect:r,...i?{config:i}:{}}}}))},setPieceEdgeConfig(n,r){t(i=>{var o,a;const s=((o=i.byPiece)==null?void 0:o[n])||{effect:((a=i.default)==null?void 0:a.effect)??"puzzle"};return{...i,byPiece:{...i.byPiece||{},[n]:{...s,config:{...s.config||{},...r}}}}})},clearPieceEdgeOverride(n){t(r=>{const i={...r.byPiece||{}};return delete i[n],{...r,byPiece:i}})},setDefaultEdgeEffects(n){t(r=>({...r,default:{...r.default||{},effects:n||{}}}))},setLayerEffects(n,r){t(i=>{var o;const s=i[n]||{effect:((o=i.default)==null?void 0:o.effect)??"puzzle"};return{...i,[n]:{...s,effects:r||{}}}})},setPieceEdgeEffects(n,r){t(i=>{const s={...i.byPiece||{}},o=s[n]||{};return(!r||Object.keys(r).length===0)&&!o.effect&&!o.config?delete s[n]:s[n]={...o,effects:r||{}},{...i,byPiece:s}})},setEdgeEffects(n,r){t(i=>{const s={...i.byEdge||{}},o=s[n]||{};return(!r||Object.keys(r).length===0)&&!o.effect&&!o.config?delete s[n]:s[n]={...o,effects:r||{}},{...i,byEdge:s}})}}}function Yh(e){return{setPieceColor(t,n){e(r=>{if(!r)return r;const i={...r.pieceColors||{}};return n==null?delete i[t]:i[t]=n,{...r,pieceColors:i}})},clearPieceColors(){e(t=>t&&{...t,pieceColors:{}})},setPieceContent(t,n){e(r=>{if(!r)return r;const i={...r.pieceContent||{}};return n==null?delete i[t]:i[t]=n,{...r,pieceContent:i}})},updatePieceContent(t,n){e(r=>{if(!r)return r;const i={...r.pieceContent||{}},s=i[t]||{};return i[t]={...s,...n},{...r,pieceContent:i}})},clearPieceContent(){e(t=>t&&{...t,pieceContent:{}})},setDefaultCellEffects(t){e(n=>{if(!n)return n;const r=n.cells||{default:{},byPiece:{}};return{...n,cells:{...r,default:{...r.default||{},effects:t||{}}}}})},setCellEffects(t,n){e(r=>{if(!r)return r;const i=r.cells||{default:{},byPiece:{}},s={...i.byPiece||{}};return!n||Object.keys(n).length===0?delete s[t]:s[t]={...s[t]||{},effects:n},{...r,cells:{...i,byPiece:s}}})}}}function Xh(e){return{addBackground({src:t,rect:n,fit:r="cover"}){e(i=>{if(!i)return i;const s=[...i.backgrounds||[],{id:Eh(),src:t,rect:n,fit:r}];return{...i,backgrounds:s}})},updateBackground(t,n){e(r=>{if(!r)return r;const i=(r.backgrounds||[]).map(s=>s.id===t?{...s,...n}:s);return{...r,backgrounds:i}})},removeBackground(t){e(n=>{if(!n)return n;const r=(n.backgrounds||[]).filter(i=>i.id!==t);return{...n,backgrounds:r}})}}}const Gh=500;function Qh(){const[e,t]=M.useState(Zh),[n,r]=M.useState(()=>Xt()),i=M.useRef(null);M.useEffect(()=>{if(e)return clearTimeout(i.current),i.current=setTimeout(()=>{const x=Dh(e);r(Xt()),qa(x.id)},Gh),()=>clearTimeout(i.current)},[e]);const s=M.useMemo(()=>e?Dn(e):[],[e]),o=M.useMemo(()=>e?$h(e):[],[e]),a=M.useMemo(()=>({...Hh(t),...Vh(t),...Yh(t),...Xh(t)}),[]),c=M.useCallback(x=>{t(w=>w&&{...w,name:x})},[]),u=M.useCallback(x=>{const g=Xt().find(m=>m.id===x);g&&(t(g),qa(g.id))},[]),d=M.useCallback(()=>{t(Ro("Untitled"))},[]),h=M.useCallback(x=>{Bh(x);const w=Xt();r(w),(e==null?void 0:e.id)===x&&(w.length>0?t(w[w.length-1]):t(Ro("Untitled")))},[e==null?void 0:e.id]),p=M.useCallback(()=>{e&&Wh(e)},[e]),v=M.useCallback(async x=>{const w=await Kh(x);t(w)},[]);return{project:e,projects:n,pieces:s,sharedEdges:o,setName:c,...a,openProject:u,createNew:d,removeProject:h,exportCurrent:p,importFromFile:v}}function Zh(){const e=Xt(),t=Uh();if(t){const n=e.find(r=>r.id===t);if(n)return n}return e.length>0?e[e.length-1]:Ro("Untitled")}const Pd={frequency:.025,amplitude:12,phase:0},Zn=4;function Jh(e,t,n,r,i){const{frequency:s,amplitude:o,phase:a}=i,c=Math.min(e,t),u=Math.max(e,t),d=u-c,h=Math.ceil(c/Zn)*Zn,p=Math.floor(u/Zn)*Zn,v=[e];for(let x=h;x<=p;x+=Zn)x>c&&x<u&&v.push(x);return v.push(t),t<e?v.sort((x,w)=>w-x):v.sort((x,w)=>x-w),v.map(x=>{const w=d>0?(x-c)/d:0,m=Math.sin(w*Math.PI)*Math.sin(x*s+a)*o;return r==="x"?[x,n+m]:[n+m,x]})}function qh(e,t,n,r,i,s,o,a,c,u){const d={...Pd,...u||{}};return Jh(e,t,n,r,d).slice(1).map(([p,v])=>`L ${p} ${v}`).join(" ")}const bd={name:"wave",displayName:"Wave",defaultConfig:Pd,hidesKnobs:!0,buildSide:qh};function em(e,t,n,r,i,s,o,a,c){const u=t>=e?1:-1,d=[],h=[...i].sort((p,v)=>(p.pos-v.pos)*u);for(const p of h){const v=e+p.pos*(t-e),x=r==="y"?p.type==="tab"?1:0:p.type==="tab"?0:1;if(r==="x"){const w=v;d.push(`L ${w-u*c} ${n}`),d.push(`A ${c} ${c} 0 0 ${x} ${w+u*c} ${n}`)}else{const w=v;d.push(`L ${n} ${w-u*c}`),d.push(`A ${c} ${c} 0 0 ${x} ${n} ${w+u*c}`)}}return r==="x"?d.push(`L ${t} ${n}`):d.push(`L ${n} ${t}`),d.join(" ")}const tm={name:"puzzle",displayName:"Puzzle",hidesKnobs:!1,buildSide:em};function nm(e,t,n,r,i,s,o,a,c,u){return r==="x"?`L ${t} ${n}`:`L ${n} ${t}`}const rm={name:"straight",displayName:"Straight",hidesKnobs:!0,buildSide:nm},De=.01;function im(e,t,n){const r=t.id;if(n==="right"){const i=t.x+t.w;return e.filter(s=>s.id!==r&&Math.abs(s.x-i)<De&&s.y<t.y+t.h-De&&s.y+s.h>t.y+De)}if(n==="left"){const i=t.x;return e.filter(s=>s.id!==r&&Math.abs(s.x+s.w-i)<De&&s.y<t.y+t.h-De&&s.y+s.h>t.y+De)}if(n==="bottom"){const i=t.y+t.h;return e.filter(s=>s.id!==r&&Math.abs(s.y-i)<De&&s.x<t.x+t.w-De&&s.x+s.w>t.x+De)}if(n==="top"){const i=t.y;return e.filter(s=>s.id!==r&&Math.abs(s.y+s.h-i)<De&&s.x<t.x+t.w-De&&s.x+s.w>t.x+De)}return[]}function as(e,t,n){const r=im(e,t,n);if(r.length===0)return[{startPos:0,endPos:1,neighborId:null}];const i=n==="left"||n==="right",s=i?t.h:t.w,o=i?t.y:t.x,a=r.map(d=>{const h=i?d.y:d.x,p=i?d.y+d.h:d.x+d.w,v=Math.max(o,h),x=Math.min(o+s,p);return{startPos:(v-o)/s,endPos:(x-o)/s,neighborId:d.id}}).sort((d,h)=>d.startPos-h.startPos),c=[];let u=0;for(const d of a)d.startPos>u+1e-4&&c.push({startPos:u,endPos:d.startPos,neighborId:null}),c.push(d),u=d.endPos;return u<1-1e-4&&c.push({startPos:u,endPos:1,neighborId:null}),c}function cs(e,t,n,r="puzzle"){var s,o,a;const i=n||"__outer";return((o=(s=e==null?void 0:e.edgeEffects)==null?void 0:s[t])==null?void 0:o[i])??((a=e==null?void 0:e.sideEffects)==null?void 0:a[t])??(e==null?void 0:e.effect)??r}const rn=30,sm="flat",Ki="tab",ec="socket",ht={puzzle:tm,wave:bd,straight:rm},Bn=Object.keys(ht),Ot=1e-4;function om(e,t){return Array.from({length:e},(n,r)=>({pos:(2*r+1)/(2*e),type:t}))}function be(e){return!e||e===sm?[]:e===Ki?[{pos:.5,type:Ki}]:e===ec?[{pos:.5,type:ec}]:Array.isArray(e)?e.map(t=>({pos:t.pos,type:t.type})):typeof e=="object"&&e.count>0&&e.type?om(e.count,e.type):[]}function lm(e){return be(e).some(t=>t.type===Ki)}function nr({piece:e,allPieces:t,sideName:n,startA:r,endA:i,fixed:s,axis:o,pieceStartA:a,pieceLength:c,knobs:u,outwardSign:d,defaultEffect:h,effectConfig:p}){var m,f,y,k;const v=i>=r?1:-1;if(!t){const _=((m=e.sideEffects)==null?void 0:m[n])||e.effect||h||"puzzle";return(ht[_]||ht.puzzle).buildSide(r,i,s,o,u,a,c,d,rn,p)}const x=as(t,e,n),w=v>0?x:[...x].reverse(),g=[];for(const _ of w){const P=cs(e,n,_.neighborId,h),j=ht[P]||ht.puzzle,A=((y=(f=e.edgeEffectConfigs)==null?void 0:f[n])==null?void 0:y[_.neighborId??"__outer"])??((k=e.sideEffectConfigs)==null?void 0:k[n])??p,B=a+_.startPos*c,$=a+_.endPos*c,C=v>0?B:$,N=v>0?$:B,L=Math.abs(N-C),T=u.filter(R=>R.pos>_.startPos+Ot&&R.pos<_.endPos-Ot).map(R=>({pos:(R.pos-_.startPos)/Math.max(Ot,_.endPos-_.startPos),type:R.type}));g.push(j.buildSide(C,N,s,o,T,C,L,d,rn,A))}return g.join(" ")}function Ll(e,t,n="puzzle",r){var d,h,p,v;const{x:i,y:s,w:o,h:a}=e,c={top:be((d=e.sides)==null?void 0:d.top),right:be((h=e.sides)==null?void 0:h.right),bottom:be((p=e.sides)==null?void 0:p.bottom),left:be((v=e.sides)==null?void 0:v.left)},u=[`M ${i} ${s}`];return u.push(nr({piece:e,allPieces:t,sideName:"top",startA:i,endA:i+o,fixed:s,axis:"x",pieceStartA:i,pieceLength:o,knobs:c.top,outwardSign:-1,defaultEffect:n,effectConfig:r})),u.push(nr({piece:e,allPieces:t,sideName:"right",startA:s,endA:s+a,fixed:i+o,axis:"y",pieceStartA:s,pieceLength:a,knobs:c.right,outwardSign:1,defaultEffect:n,effectConfig:r})),u.push(nr({piece:e,allPieces:t,sideName:"bottom",startA:i+o,endA:i,fixed:s+a,axis:"x",pieceStartA:i,pieceLength:o,knobs:c.bottom,outwardSign:1,defaultEffect:n,effectConfig:r})),u.push(nr({piece:e,allPieces:t,sideName:"left",startA:s+a,endA:s,fixed:i,axis:"y",pieceStartA:s,pieceLength:a,knobs:c.left,outwardSign:-1,defaultEffect:n,effectConfig:r})),u.push("Z"),u.join(" ")}function am(e){var o,a,c,u;const{x:t,y:n,w:r,h:i}=e,s=[];for(const d of be((o=e.sides)==null?void 0:o.top))s.push({side:"top",type:d.type,pos:d.pos,cx:t+d.pos*r,cy:n});for(const d of be((a=e.sides)==null?void 0:a.right))s.push({side:"right",type:d.type,pos:d.pos,cx:t+r,cy:n+d.pos*i});for(const d of be((c=e.sides)==null?void 0:c.bottom))s.push({side:"bottom",type:d.type,pos:d.pos,cx:t+d.pos*r,cy:n+i});for(const d of be((u=e.sides)==null?void 0:u.left))s.push({side:"left",type:d.type,pos:d.pos,cx:t,cy:n+d.pos*i});return s}function cm(e,t,n="puzzle"){return am(e).filter(r=>{var a,c,u;if(!t){const d=((a=e.sideEffects)==null?void 0:a[r.side])||e.effect||n;return!((c=ht[d])!=null&&c.hidesKnobs)}const s=as(t,e,r.side).find(d=>r.pos>=d.startPos-Ot&&r.pos<=d.endPos+Ot);if(!s)return!1;const o=cs(e,r.side,s.neighborId,n);return!((u=ht[o])!=null&&u.hidesKnobs)})}const qr=rn*.5;function um(e,t,n){return e==="top"?{hx:t,hy:n-qr}:e==="bottom"?{hx:t,hy:n+qr}:e==="left"?{hx:t-qr,hy:n}:{hx:t+qr,hy:n}}function tc(e,t,n,r="puzzle",i){var w,g,m,f;const{x:s,y:o,w:a,h:c}=e,u={top:be((w=e.sides)==null?void 0:w.top),right:be((g=e.sides)==null?void 0:g.right),bottom:be((m=e.sides)==null?void 0:m.bottom),left:be((f=e.sides)==null?void 0:f.left)},h={top:{startA:s,endA:s+a,fixed:o,axis:"x",pieceStartA:s,pieceLength:a,knobs:u.top,outwardSign:-1,startPoint:`${s} ${o}`},right:{startA:o,endA:o+c,fixed:s+a,axis:"y",pieceStartA:o,pieceLength:c,knobs:u.right,outwardSign:1,startPoint:`${s+a} ${o}`},bottom:{startA:s+a,endA:s,fixed:o+c,axis:"x",pieceStartA:s,pieceLength:a,knobs:u.bottom,outwardSign:1,startPoint:`${s+a} ${o+c}`},left:{startA:o+c,endA:o,fixed:s,axis:"y",pieceStartA:o,pieceLength:c,knobs:u.left,outwardSign:-1,startPoint:`${s} ${o+c}`}}[n];if(!h)return"";const{startPoint:p,...v}=h,x=nr({piece:e,allPieces:t,sideName:n,...v,defaultEffect:r,effectConfig:i});return`M ${p} ${x}`}function Ol(e,t,n,r="puzzle",i){var m,f,y,k;const{x:s,y:o,w:a,h:c}=e,u=be((m=e.sides)==null?void 0:m[n])||[],h={top:{startA:s,endA:s+a,fixed:o,axis:"x",pieceStartA:s,pieceLength:a,outwardSign:-1,startPoint:[s,o]},right:{startA:o,endA:o+c,fixed:s+a,axis:"y",pieceStartA:o,pieceLength:c,outwardSign:1,startPoint:[s+a,o]},bottom:{startA:s+a,endA:s,fixed:o+c,axis:"x",pieceStartA:s,pieceLength:a,outwardSign:1,startPoint:[s+a,o+c]},left:{startA:o+c,endA:o,fixed:s,axis:"y",pieceStartA:o,pieceLength:c,outwardSign:-1,startPoint:[s,o+c]}}[n];if(!h)return[];const p=h.endA>=h.startA?1:-1,v=t?as(t,e,n):[{startPos:0,endPos:1,neighborId:null}],x=p>0?v:[...v].reverse(),w=[];let g=h.startA;for(const _ of x){const P=cs(e,n,_.neighborId,r),j=ht[P]||ht.puzzle,A=((y=(f=e.edgeEffectConfigs)==null?void 0:f[n])==null?void 0:y[_.neighborId??"__outer"])??((k=e.sideEffectConfigs)==null?void 0:k[n])??i,B=h.pieceStartA+_.startPos*h.pieceLength,$=h.pieceStartA+_.endPos*h.pieceLength,C=p>0?B:$,N=p>0?$:B,L=Math.abs(N-C),T=u.filter(O=>O.pos>_.startPos+Ot&&O.pos<_.endPos-Ot).map(O=>({pos:(O.pos-_.startPos)/Math.max(Ot,_.endPos-_.startPos),type:O.type})),R=j.buildSide(C,N,h.fixed,h.axis,T,C,L,h.outwardSign,rn,A),I=h.axis==="x"?g:h.fixed,X=h.axis==="y"?g:h.fixed,z=`M ${I} ${X} ${R}`;g+=p*L;const D=_.neighborId?dm(e.id,_.neighborId):`${e.id}||outer-${n}`;w.push({neighborId:_.neighborId,pairKey:D,d:z,style:fm(A)})}return w}function dm(e,t){return e<t?`${e}||${t}`:`${t}||${e}`}function fm(e){if(!e)return;const t={};return e.color!=null&&(t.color=e.color),e.opacity!=null&&(t.opacity=e.opacity),e.strokeWidth!=null&&(t.strokeWidth=e.strokeWidth),e.effects&&Object.keys(e.effects).length&&(t.effects=e.effects),Object.keys(t).length?t:void 0}function us(e,t,n="puzzle",r){const{x:i,y:s,w:o,h:a,sides:c={}}=e,u=d=>{let h=0;const p=t?as(t,e,d):[{neighborId:null}];for(const v of p){const x=cs(e,d,v.neighborId,n);x==="wave"?h=Math.max(h,((r==null?void 0:r.amplitude)??12)+2):x==="puzzle"&&lm(c[d])&&(h=Math.max(h,rn))}return h};return{minX:i-u("left"),minY:s-u("top"),maxX:i+o+u("right"),maxY:s+a+u("bottom")}}const pm={hover:"Hover",click:"Click",idle:"Idle",always:"Always"},Fl={highlight:{label:"Highlight",group:"fill",triggers:["hover","click","always"],defaultTrigger:"hover",config:{}},lift:{label:"Lift",group:"transform",triggers:["hover","click","always"],defaultTrigger:"hover",config:{distance:{default:4,min:1,max:16,step:1,label:"Distance",unit:"px",cssVar:"--anim-lift-distance"}}},"scale-up":{label:"Scale up",group:"transform",triggers:["hover","click","always"],defaultTrigger:"hover",config:{amount:{default:.04,min:.01,max:.3,step:.01,label:"Amount",unit:"",cssVar:"--anim-scale-up-amount"}}},"scale-down":{label:"Scale down",group:"transform",triggers:["hover","click","always"],defaultTrigger:"hover",config:{amount:{default:.04,min:.01,max:.3,step:.01,label:"Amount",unit:"",cssVar:"--anim-scale-down-amount"}}},glow:{label:"Glow",group:"filter",triggers:["hover","click","idle","always"],defaultTrigger:"hover",config:{radius:{default:6,min:1,max:24,step:1,label:"Radius",unit:"px",cssVar:"--anim-glow-radius"}}},pulse:{label:"Pulse",group:"transform",triggers:["idle","always"],defaultTrigger:"idle",config:{speed:{default:2.6,min:.5,max:6,step:.1,label:"Speed",unit:"s",cssVar:"--anim-pulse-speed"}}}},ds={highlight:{label:"Highlight",group:"stroke",triggers:["hover","click","always"],defaultTrigger:"hover",config:{}},glow:{label:"Glow",group:"filter",triggers:["hover","click","idle","always"],defaultTrigger:"hover",config:{radius:{default:4,min:1,max:16,step:1,label:"Radius",unit:"px",cssVar:"--anim-edge-glow-radius"}}},wiggle:{label:"Wiggle",group:"transform",triggers:["hover","click"],defaultTrigger:"hover",config:{intensity:{default:.6,min:.1,max:2.5,step:.1,label:"Intensity",unit:"px",cssVar:"--anim-edge-wiggle-intensity"}}},thicken:{label:"Thicken",group:"stroke",triggers:["hover","click","always"],defaultTrigger:"hover",config:{width:{default:3.5,min:1.5,max:8,step:.25,label:"Width",unit:"px",cssVar:"--anim-edge-thicken-width"}}},flash:{label:"Flash",group:"animate",triggers:["hover","click"],defaultTrigger:"click",config:{duration:{default:700,min:100,max:2e3,step:50,label:"Duration",unit:"ms",cssVar:"--anim-edge-flash-duration"}}}};function hm(e,t,n){const r=e[t];if(!r)return null;const i=r.defaultTrigger??r.triggers[0],s={};for(const[o,a]of Object.entries(r.config||{}))s[o]=a.default;return{id:t,trigger:i,config:s}}function ei(e,t){return`${e}:${t}`}function Md(e,t,n){var s;if(!e)return{className:"",style:void 0};const r=[],i={};for(const o of Object.values(e)){if(!o||!o.id||!o.trigger)continue;r.push(`${n}--anim-${o.id}--${o.trigger}`);const a=t[o.id];if(a)for(const[c,u]of Object.entries(a.config||{})){if(!(u!=null&&u.cssVar))continue;const d=((s=o.config)==null?void 0:s[c])??u.default;i[u.cssVar]=`${d}${u.unit||""}`}}return{className:r.join(" "),style:Object.keys(i).length?i:void 0}}function Ad(e){return Md(e,Fl,"piece")}function Td(e){return Md(e,ds,"piece__edge")}const mm=["top","right","bottom","left"],gm=rn*.75;function ym({piece:e,path:t,allPieces:n,effect:r="puzzle",isHovered:i,isSelected:s,onHoverStart:o,onHoverEnd:a,onSelect:c,onKnobClick:u}){const{id:d,x:h,y:p,w:v,h:x,label:w,fill:g,content:m,backgrounds:f,cellEffects:y}=e,k=cm(e,n,r),_=`pc-clip-${d}`,P=`pc-mask-${d}`,j=!!m&&(m.text||m.src),A=f&&f.length>0,B=j||A,$=Ad(y),C=mm.flatMap(T=>Ol(e,n,T,r)),N=C.filter(T=>T.style&&typeof T.style.opacity=="number"&&T.style.opacity<=.001),L=N.length>0;return l.jsxs("g",{className:`piece ${i?"piece--hover":""} ${s?"piece--selected":""} ${$.className}`.replace(/\s+/g," ").trim(),style:$.style,onMouseEnter:()=>o==null?void 0:o(d),onMouseLeave:()=>a==null?void 0:a(d),onClick:()=>c==null?void 0:c(d),children:[l.jsxs("defs",{children:[B&&l.jsx("clipPath",{id:_,children:l.jsx("path",{d:t})}),L&&l.jsxs("mask",{id:P,maskUnits:"userSpaceOnUse",children:[l.jsx("path",{d:t,fill:"white"}),N.map((T,R)=>{var I;return l.jsx("path",{d:T.d,fill:"none",stroke:"black",strokeWidth:((I=T.style)==null?void 0:I.strokeWidth)??1.25,strokeLinecap:"round",strokeLinejoin:"round"},`ko-${T.pairKey}-${R}`)})]})]}),l.jsxs("g",{...L?{mask:`url(#${P})`}:null,children:[l.jsx("path",{d:t,className:"piece__body",style:g?{fill:g}:void 0}),A&&l.jsx("g",{clipPath:`url(#${_})`,pointerEvents:"none",children:f.map(T=>l.jsx(vm,{bg:T},T.id))}),j&&l.jsx("g",{clipPath:`url(#${_})`,pointerEvents:"none",children:l.jsx(xm,{piece:e})}),!j&&!A&&w&&l.jsx("text",{x:h+v/2,y:p+x/2,className:"piece__label",children:w})]}),l.jsx("g",{className:"piece__edges",pointerEvents:"none",children:C.map((T,R)=>{const I=T.style,X=I?{...I.color!=null?{stroke:I.color}:null,...I.opacity!=null?{strokeOpacity:I.opacity}:null,...I.strokeWidth!=null?{strokeWidth:I.strokeWidth}:null}:void 0,z=Td(I==null?void 0:I.effects),D=z.style||X?{...X||{},...z.style||{}}:void 0;return l.jsx("path",{d:T.d,className:`piece__edge ${z.className}`.trim(),style:D},`${T.pairKey}-${R}`)})}),u&&k.filter(T=>T.type===Ki).map(T=>{const{hx:R,hy:I}=um(T.side,T.cx,T.cy);return l.jsx("circle",{cx:R,cy:I,r:gm,className:"piece__knob-hit",onClick:X=>{X.stopPropagation(),u(d,T.side,T.pos)}},`${T.side}-${T.pos}`)})]})}function vm({bg:e}){const t=e.fit==="cover"?"xMidYMid slice":e.fit==="contain"?"xMidYMid meet":e.fit==="fill"?"none":"xMidYMid slice";return l.jsx("image",{href:e.src,x:e.x,y:e.y,width:e.w,height:e.h,preserveAspectRatio:t})}function xm({piece:e}){const{x:t,y:n,w:r,h:i,content:s}=e,o=18;if(s.type==="image"&&s.src){const f=s.fit||"cover",y=f==="cover"?"xMidYMid slice":f==="contain"?"xMidYMid meet":f==="fill"?"none":"xMidYMid meet";return l.jsx("image",{href:s.src,x:t,y:n,width:r,height:i,preserveAspectRatio:y})}const a=s.text||"",c=s.fontSize||Math.min(r,i)/8,u=s.align||"center",d=s.color||"var(--text, #e6edf3)",h=s.fontWeight||500,p=wm(a,r-o*2,c),v=c*1.25,x=p.length*v,w=n+i/2-x/2+v*.7,g=u==="left"?t+o:u==="right"?t+r-o:t+r/2,m=u==="left"?"start":u==="right"?"end":"middle";return l.jsx("text",{className:"piece__content",style:{fontSize:c,fontWeight:h,fill:d},textAnchor:m,children:p.map((f,y)=>l.jsx("tspan",{x:g,y:w+y*v,children:f},y))})}function wm(e,t,n){const r=n*.55,i=Math.max(1,Math.floor(t/r)),s=[];for(const o of e.split(`
`)){if(o===""){s.push("");continue}const a=o.split(/\s+/);let c="";for(const u of a){const d=c?c+" "+u:u;d.length<=i?c=d:(c&&s.push(c),c=u.length<=i?u:u.slice(0,i))}c&&s.push(c)}return s}const ti=60;function ln({pieces:e,selectedId:t,effect:n="puzzle",effectConfig:r,onSelect:i,onKnobClick:s}){const[o,a]=M.useState(null),c=M.useMemo(()=>e.map(f=>({...f,path:Ll(f,e,n,r),bbox:us(f,e,n,r)})),[e,n,r]),u=M.useMemo(()=>c.reduce((f,y)=>({minX:Math.min(f.minX,y.bbox.minX),minY:Math.min(f.minY,y.bbox.minY),maxX:Math.max(f.maxX,y.bbox.maxX),maxY:Math.max(f.maxY,y.bbox.maxY)}),{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}),[c]),d=u.minX-ti,h=u.minY-ti,p=u.maxX-u.minX+ti*2,v=u.maxY-u.minY+ti*2,x=M.useMemo(()=>{if(o==null&&t==null)return c;const f=[];t!=null&&f.push(t),o!=null&&o!==t&&f.push(o);const y=c.filter(k=>!f.includes(k.id));for(const k of f){const _=c.find(P=>P.id===k);_&&y.push(_)}return y},[c,o,t]),w=f=>a(f),g=f=>a(y=>y===f?null:y),m=s?(f,y,k)=>s(f,y,k):void 0;return l.jsx("svg",{className:"puzzle-board",viewBox:`${d} ${h} ${p} ${v}`,width:p,height:v,xmlns:"http://www.w3.org/2000/svg",children:x.map(f=>l.jsx(ym,{piece:f,path:f.path,allPieces:e,effect:n,isHovered:o===f.id,isSelected:t===f.id,onHoverStart:w,onHoverEnd:g,onSelect:i,onKnobClick:m},f.id))})}function he({width:e=1200,height:t=24,frequency:n=.025,amplitude:r=6,strokeWidth:i=1.5,color:s,flip:o=!1,className:a=""}){const c=t/2,u=M.useMemo(()=>{const d=bd.buildSide(0,e,c,"x",[],0,e,1,rn,{frequency:n,amplitude:r});return`M 0 ${c} ${d}`},[e,c,n,r]);return l.jsx("svg",{className:`wave-divider${o?" wave-divider--flip":""}${a?` ${a}`:""}`,viewBox:`0 0 ${e} ${t}`,width:"100%",height:t,preserveAspectRatio:"none","aria-hidden":"true",role:"presentation",children:l.jsx("path",{d:u,fill:"none",stroke:s||"var(--stroke-soft)",strokeWidth:i,strokeLinecap:"round",strokeLinejoin:"round",vectorEffect:"non-scaling-stroke"})})}const km=[{id:"landing",label:"Landing",icon:"⌂"},{id:"docs",label:"Docs",icon:"?"},{id:"projects",label:"Projects",icon:"⚏"},{id:"preview",label:"Preview",icon:"◇"},{id:"grid",label:"Grid",icon:"⊞"},{id:"edges",label:"Edges",icon:"∿"},{id:"cells",label:"Cells",icon:"✎"}];function Sm({page:e,onNav:t,projectName:n,theme:r,onToggleTheme:i}){const s=r==="dark";return l.jsxs(l.Fragment,{children:[l.jsxs("header",{className:"page-nav",children:[l.jsxs("div",{className:"page-nav__brand",children:[l.jsx("span",{className:"page-nav__mark","aria-hidden":!0,children:"箱"}),l.jsx("span",{className:"page-nav__title",children:"Hakoniwa"}),n&&l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"page-nav__sep","aria-hidden":!0,children:"·"}),l.jsx("span",{className:"page-nav__project",children:n})]})]}),l.jsx("button",{type:"button",className:"page-nav__theme",onClick:i,title:s?"Switch to light theme":"Switch to dark theme","aria-label":"Toggle theme",children:l.jsx("span",{"aria-hidden":!0,children:s?"☾":"☀"})}),l.jsx("nav",{className:"page-nav__tabs",children:km.map(o=>l.jsxs("button",{type:"button",className:`page-nav__tab ${e===o.id?"page-nav__tab--active":""}`,onClick:()=>t(o.id),children:[l.jsx("span",{className:"page-nav__icon","aria-hidden":!0,children:o.icon}),l.jsx("span",{children:o.label})]},o.id))})]}),l.jsx(he,{className:"page-nav-wave",height:10,amplitude:3,strokeWidth:1.25})]})}const nc={grid:{rows:1,cols:2,cellSize:100,groups:[["meta-hako","meta-niwa"]]},edges:{default:{effect:"wave",config:{frequency:.04,amplitude:14}},inner:null,outer:null,byPiece:{},byEdge:{}},pieceColors:{},pieceContent:{"meta-hako":{type:"text",text:"箱",fontSize:56},"meta-niwa":{type:"text",text:"庭",fontSize:56}},backgrounds:[]};function Un({size:e="md"}){const t=M.useMemo(()=>Dn(nc),[]);return l.jsx("div",{className:`wave-brand-mark wave-brand-mark--${e}`,"aria-hidden":"true",children:l.jsx(ln,{pieces:t,effect:"wave",effectConfig:nc.edges.default.config})})}const Fs={frequency:.022,amplitude:10},_m=220;function Rl({cards:e,rows:t=1,cols:n}){const r=n??Math.ceil(e.length/t),i=M.useMemo(()=>{const v=Array.from({length:t},(x,w)=>Array.from({length:r},(g,m)=>{var y;const f=w*r+m;return((y=e[f])==null?void 0:y.id)??`meta-empty-${w}-${m}`}));return{grid:{rows:t,cols:r,cellSize:_m,groups:v},edges:{default:{effect:"wave",config:Fs},inner:null,outer:null,byPiece:{},byEdge:{}},pieceColors:{},pieceContent:{},backgrounds:[]}},[e,t,r]),s=M.useMemo(()=>Dn(i),[i]),o=60,a=M.useMemo(()=>{const v={minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};return s.reduce((x,w)=>{const g=us(w,s,"wave",Fs);return{minX:Math.min(x.minX,g.minX),minY:Math.min(x.minY,g.minY),maxX:Math.max(x.maxX,g.maxX),maxY:Math.max(x.maxY,g.maxY)}},v)},[s]),c=a.minX-o,u=a.minY-o,d=a.maxX-a.minX+o*2,h=a.maxY-a.minY+o*2,p=M.useMemo(()=>new Map(s.map(v=>[v.id,v])),[s]);return l.jsxs("div",{className:"meta-card-row","data-cols":r,"data-rows":t,children:[l.jsx("div",{className:"meta-card-row__svg",children:l.jsx(ln,{pieces:s,effect:"wave",effectConfig:Fs})}),l.jsx("div",{className:"meta-card-row__overlay",style:{aspectRatio:`${d} / ${h}`},children:e.map(v=>{const x=p.get(v.id);if(!x)return null;const w=(x.x-c)/d*100,g=(x.y-u)/h*100,m=x.w/d*100,f=x.h/h*100,y=v.onClick?"button":"div";return l.jsxs(y,{type:v.onClick?"button":void 0,onClick:v.onClick,className:`meta-card${v.onClick?" meta-card--clickable":""}`,style:{left:`${w}%`,top:`${g}%`,width:`${m}%`,height:`${f}%`},children:[v.icon&&l.jsx("span",{className:"meta-card__icon","aria-hidden":"true",children:v.icon}),l.jsx("span",{className:"meta-card__title",children:v.title}),v.body&&l.jsx("span",{className:"meta-card__body",children:v.body})]},v.id)})})]})}const Em=[{id:"feat-build",icon:"⚏",title:"Build with pieces",body:"Drag-select cells in a grid and merge them into custom pieces."},{id:"feat-edges",icon:"✎",title:"Style every edge",body:"Three connector styles — puzzle, wave, straight — with per-edge overrides for color, opacity, and width."},{id:"feat-export",icon:"⤓",title:"Export anywhere",body:"Ship as JSON, a single self-contained React file, or a drop-in module bundle."}];function jm({onNav:e}){return l.jsxs("div",{className:"page-landing",children:[l.jsxs("section",{className:"landing-hero",children:[l.jsx(Un,{size:"lg"}),l.jsx("p",{className:"landing-hero__sub",children:"箱庭 · built with itself"}),l.jsx("h1",{className:"landing-hero__name",children:"Hakoniwa"}),l.jsx("p",{className:"landing-hero__tagline",children:"Design layouts that snap together — puzzle tabs & sockets, soft waves, or clean straight lines. Build a grid, merge cells into pieces, fill them with text or images, and export as JSON, a single React file, or a full module bundle."}),l.jsxs("div",{className:"landing-hero__ctas",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>e("projects"),children:"Open the app →"}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:()=>e("docs"),children:"Read the docs"})]})]}),l.jsx(he,{amplitude:8}),l.jsx("section",{className:"landing-features",children:l.jsx(Rl,{cards:Em})}),l.jsx(he,{amplitude:8,flip:!0}),l.jsx("section",{className:"landing-foot",children:l.jsxs("button",{type:"button",className:"landing-foot__cta",onClick:()=>e("docs"),children:[l.jsx("span",{children:"Continue to docs"}),l.jsx("span",{className:"landing-foot__arrow","aria-hidden":"true",children:"↓"})]})})]})}const Cm=[{id:"tl",x:0,y:0,w:160,h:160,label:"TL",sides:{right:{count:1,type:"tab"},bottom:{count:1,type:"tab"}}},{id:"tr",x:160,y:0,w:160,h:160,label:"TR",sides:{left:{count:1,type:"socket"},bottom:{count:1,type:"tab"}}},{id:"bl",x:0,y:160,w:160,h:160,label:"BL",sides:{right:{count:1,type:"tab"},top:{count:1,type:"socket"}}},{id:"br",x:160,y:160,w:160,h:160,label:"BR",sides:{left:{count:1,type:"socket"},top:{count:1,type:"socket"}}}],Nm={frequency:.04,amplitude:14};function zm(){const[e,t]=M.useState("puzzle"),n=M.useMemo(()=>e==="wave"?Nm:void 0,[e]);return l.jsxs("div",{className:"mini-puzzle",children:[l.jsx("div",{className:"mini-puzzle__chips",children:Bn.map(r=>l.jsx("button",{type:"button",className:`chip chip--sm ${e===r?"chip--active":""}`,onClick:()=>t(r),children:Pm(r)},r))}),l.jsx("div",{className:"mini-puzzle__stage",children:l.jsx(ln,{pieces:Cm,effect:e,effectConfig:n})})]})}const Pm=e=>e.charAt(0).toUpperCase()+e.slice(1);function bm({onNav:e}){const t=[{id:"tile-projects",icon:"⚏",title:"Projects",body:"Browse, import, and switch between saved designs.",onClick:()=>e("projects")},{id:"tile-preview",icon:"◇",title:"Preview",body:"A big read-only view of what you've built.",onClick:()=>e("preview")},{id:"tile-grid",icon:"⊞",title:"Grid",body:"Lay out the cells: drag-select, merge, color, paste images.",onClick:()=>e("grid")},{id:"tile-edit",icon:"✎",title:"Edit",body:"Two modes in one canvas: style edges or fill content.",onClick:()=>e("edit")}];return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Hakoniwa · 箱庭"}),l.jsx("h1",{className:"doc__h1",children:"Design layouts that snap together."}),l.jsx("p",{className:"doc__lede",children:"Hakoniwa is a small visual studio for grid-based layouts where every section is separated by a stylized connector — puzzle tabs & sockets, soft waves, or clean straight lines. You build a grid, merge cells into pieces, fill them with text or images, and export the result as JSON, a single React file, or a full module bundle."})]}),l.jsx(he,{}),l.jsxs("div",{className:"doc__demo",children:[l.jsx(zm,{}),l.jsx("p",{className:"doc__demo-caption",children:"↑ Click an effect to see the connectors change live."})]}),l.jsx(Rl,{cards:t,rows:2,cols:2}),l.jsxs("div",{className:"doc__note",children:[l.jsx("strong",{children:"Already designed something?"})," ",l.jsx("button",{type:"button",className:"link-btn",onClick:()=>e("projects"),children:"Jump straight to your projects →"})]})]})}function Mm({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Projects tab"}),l.jsx("h1",{className:"doc__h1",children:"Your library of designs."}),l.jsx("p",{className:"doc__lede",children:"Every project you build is auto-saved to your browser's local storage. The Projects tab lists them as tiles; click one to open it (you'll land on the Preview page automatically)."})]}),l.jsx(he,{}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"+ New project"})," — creates a fresh 2×2 grid."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"↑ Import JSON"})," — load a project file you (or someone else) exported earlier. Each import gets a fresh id so it won't collide with anything you already have."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Click a tile"})," — opens the project. Hover the tile to reveal a small ✕ for deletion."]}),l.jsx("li",{children:"The currently-open project gets a warm-amber ring so you can see what's active at a glance."})]}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("projects"),children:"Open Projects →"})})]})}function Am({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Preview tab"}),l.jsx("h1",{className:"doc__h1",children:"A clean view of what you've built."}),l.jsx("p",{className:"doc__lede",children:'Preview is the read-only "look at it" view. Use it to step back from the editing canvas, rename the project, jump into Grid or Edit, and export.'})]}),l.jsx(he,{}),l.jsx("h3",{children:"What's here"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Big preview"})," on the left — same renderer as the editors, but no overlays or hit zones."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"↓ Export ▾"})," at the top of the side panel — the only place exports happen. See the ",l.jsx("button",{className:"link-btn",onClick:()=>e==null?void 0:e("docs"),children:"Exporting"})," doc for the full menu."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Click the project name"})," to rename it."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Edit grid / Edit pieces"})," jump straight into the corresponding editor."]})]}),l.jsx("div",{className:"doc__note",children:"Tip: when you open a project from the Projects tab, you land here automatically."}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("preview"),children:"Open Preview →"})})]})}const fe=56,it=12,ni=3,ri=4;function Tm(){const[e,t]=M.useState(()=>Lo(ni,ri,fe)),[n,r]=M.useState([]),i=M.useRef(null),s=M.useRef(null),o=(g,m)=>{const f=Math.floor((m-it)/fe),y=Math.floor((g-it)/fe);return f<0||f>=e.rows||y<0||y>=e.cols?null:[f,y]},a=(g,m,f)=>{var y,k;if(g.button===0){if(g.preventDefault(),g.shiftKey){const _=`${m},${f}`,P=new Set(n.map(([j,A])=>`${j},${A}`));P.has(_)?P.delete(_):P.add(_),r([...P].map(j=>j.split(",").map(Number)));return}s.current={start:[m,f],cur:[m,f]},r([[m,f]]),(k=(y=g.currentTarget).setPointerCapture)==null||k.call(y,g.pointerId)}};M.useEffect(()=>{const g=f=>{if(!s.current)return;const y=i.current.getBoundingClientRect(),k=o(f.clientX-y.left,f.clientY-y.top);k&&(k[0]===s.current.cur[0]&&k[1]===s.current.cur[1]||(s.current.cur=k,r(kd([s.current.start,k]))))},m=()=>{s.current=null};return window.addEventListener("pointermove",g),window.addEventListener("pointerup",m),()=>{window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",m)}});const c=n.length>=2&&Ir(n),u=n.length>=1,d=()=>{c&&(t(g=>Sd(g,n)),r([]))},h=()=>{u&&(t(g=>_d(g,n)),r([]))},p=()=>{t(Lo(ni,ri,fe)),r([])},v=new Map;for(let g=0;g<e.rows;g++)for(let m=0;m<e.cols;m++){const f=e.groups[g][m],y=v.get(f);y?(g>y.rMax&&(y.rMax=g),m>y.cMax&&(y.cMax=m)):v.set(f,{rMin:g,rMax:g,cMin:m,cMax:m})}const x=ri*fe+it*2,w=ni*fe+it*2;return new Set(n.map(([g,m])=>`${g},${m}`)),l.jsxs("div",{className:"grid-demo",children:[l.jsxs("svg",{ref:i,className:"grid-demo__svg",width:x,height:w,viewBox:`0 0 ${x} ${w}`,children:[[...v.entries()].map(([g,m])=>{const f=m.cMax>m.cMin||m.rMax>m.rMin;return l.jsx("rect",{x:it+m.cMin*fe,y:it+m.rMin*fe,width:(m.cMax-m.cMin+1)*fe,height:(m.rMax-m.rMin+1)*fe,rx:"4",fill:f?"rgba(214, 139, 84, 0.18)":"var(--surface-2)",stroke:f?"var(--primary-2)":"var(--stroke-idle)",strokeWidth:"1.5"},g)}),n.map(([g,m])=>l.jsx("rect",{x:it+m*fe+2,y:it+g*fe+2,width:fe-4,height:fe-4,rx:"3",fill:"rgba(214, 139, 84, 0.28)",stroke:"var(--primary-2)",strokeWidth:"2",pointerEvents:"none"},`s-${g}-${m}`)),Array.from({length:ni}).flatMap((g,m)=>Array.from({length:ri},(f,y)=>l.jsx("rect",{x:it+y*fe,y:it+m*fe,width:fe,height:fe,fill:"transparent",style:{cursor:"pointer"},onPointerDown:k=>a(k,m,y)},`hit-${m}-${y}`)))]}),l.jsxs("div",{className:"grid-demo__controls",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:d,disabled:!c,children:"⊞ Merge"}),l.jsx("button",{type:"button",className:"action-btn",onClick:h,disabled:!u,children:"⊟ Unmerge"}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:p,children:"Reset"}),l.jsx("span",{className:"hint",children:n.length===0?"Drag across cells.":c?`${n.length} cells — ready to merge.`:`${n.length} cell${n.length===1?"":"s"} selected.`})]})]})}function Im({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Grid tab"}),l.jsx("h1",{className:"doc__h1",children:"Lay out the cells."}),l.jsx("p",{className:"doc__lede",children:"Build the layout: drag-select cells, merge groups into one piece, import data from a spreadsheet, and place background images that span across pieces without merging them."})]}),l.jsx(he,{}),l.jsxs("div",{className:"doc__demo",children:[l.jsx(Tm,{}),l.jsxs("p",{className:"doc__demo-caption",children:["↑ Try it: drag across cells to select, then click ",l.jsx("strong",{children:"Merge"}),"."]})]}),l.jsx("h3",{children:"Selection"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Drag"})," across cells to box-select."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Shift / Ctrl + click"})," to add or remove individual cells."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Esc"})," clears the selection."]})]}),l.jsx("h3",{children:"Merging cells into pieces"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:["The ",l.jsx("strong",{children:"Merge"})," button lights up only when the selection is a complete rectangle."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Unmerge"})," splits the selected groups back into single cells."]}),l.jsxs("li",{children:["Merged groups show their dimensions (","2×3"," etc.) right in the canvas."]})]}),l.jsx("h3",{children:"Sizing and deleting"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:["The ",l.jsx("strong",{children:"Rows / Cols"})," sliders resize the grid (max 50×50). Click any number to type it."]}),l.jsxs("li",{children:["Click a ",l.jsx("strong",{children:"row or column number"})," to delete it. Drag across multiple to delete in bulk."]})]}),l.jsx("h3",{children:"Importing spreadsheet data"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:["Use ",l.jsx("strong",{children:"Paste data"})," to drop in TSV/CSV from Excel, Google Sheets, or anywhere else."]}),l.jsx("li",{children:"Each non-empty cell becomes a piece with text content."}),l.jsxs("li",{children:[l.jsx("strong",{children:"Auto-merge horizontal runs"})," (on by default) lets each non-empty cell extend rightward over the empty cells until the next non-empty cell — perfect for landing-page-style layouts."]})]}),l.jsx("h3",{children:"Background images (multi-piece)"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:["Select cells, then either ",l.jsx("strong",{children:"Upload image"})," or ",l.jsx("strong",{children:"paste an image (Ctrl+V)"}),"."]}),l.jsx("li",{children:"The image fills the bounding rect of your selection and is sliced naturally across whichever pieces it overlaps — pieces stay separate, edges remain editable."}),l.jsxs("li",{children:["Each background can be set to ",l.jsx("em",{children:"Cover"})," / ",l.jsx("em",{children:"Contain"})," / ",l.jsx("em",{children:"Stretch"})," from the side panel."]})]}),l.jsx("h3",{children:"Coloring pieces"}),l.jsx("ul",{className:"doc__list",children:l.jsxs("li",{children:["Select cells, then pick a swatch in the ",l.jsx("strong",{children:"Color"})," card. Use the rainbow swatch to open the OS color picker."]})}),l.jsx("h3",{children:"Navigation"}),l.jsx("ul",{className:"doc__list",children:l.jsxs("li",{children:[l.jsx("strong",{children:"Scroll"})," to zoom the canvas; ",l.jsx("strong",{children:"middle-drag"})," or ",l.jsx("strong",{children:"Ctrl-drag"})," to pan."]})}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("grid"),children:"Open Grid →"})})]})}const rc=["default",...Bn];function $m(){const[e,t]=M.useState("puzzle"),[n,r]=M.useState("default"),[i,s]=M.useState("default"),o=M.useMemo(()=>({grid:{rows:2,cols:2,cellSize:140,groups:[["a","b"],["c","d"]]},edges:{default:{effect:e,config:{amplitude:12,frequency:.04}},inner:n==="default"?null:{effect:n,config:{amplitude:12,frequency:.04}},outer:i==="default"?null:{effect:i,config:{amplitude:12,frequency:.04}},byEdge:{}},pieceColors:{},pieceContent:{},backgrounds:[]}),[e,n,i]),a=M.useMemo(()=>Dn(o),[o]);return l.jsxs("div",{className:"edge-demo",children:[l.jsxs("div",{className:"edge-demo__rows",children:[l.jsx(Rs,{label:"Default",value:e,options:Bn,onChange:t}),l.jsx(Rs,{label:"Inner",value:n,options:rc,onChange:r}),l.jsx(Rs,{label:"Outer",value:i,options:rc,onChange:s})]}),l.jsx("div",{className:"edge-demo__stage",children:l.jsx(ln,{pieces:a,effect:e,effectConfig:{amplitude:12,frequency:.04}})})]})}function Rs({label:e,value:t,options:n,onChange:r}){return l.jsxs("div",{className:"edge-demo__row",children:[l.jsx("span",{className:"edge-demo__label",children:e}),l.jsx("div",{className:"effect-chips",children:n.map(i=>l.jsx("button",{type:"button",className:`chip chip--sm ${t===i?"chip--active":""}`,onClick:()=>r(i),children:Lm(i)},i))})]})}const Lm=e=>e.charAt(0).toUpperCase()+e.slice(1);function Om({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Edit tab"}),l.jsx("h1",{className:"doc__h1",children:"Same canvas, two modes."}),l.jsxs("p",{className:"doc__lede",children:["Edit hosts both ",l.jsx("strong",{children:"Edges"})," (style the connectors) and"," ",l.jsx("strong",{children:"Content"})," (fill pieces with text or images). The board underneath stays identical — only the side panel and the click target change as you switch modes."]})]}),l.jsx(he,{}),l.jsxs("div",{className:"doc__demo",children:[l.jsx($m,{}),l.jsx("p",{className:"doc__demo-caption",children:"↑ Try the priority chain: pick a default, then override an inner or outer edge to see how the chain resolves."})]}),l.jsx("h3",{children:"Edges mode"}),l.jsxs("p",{children:["Edges resolve through a three-layer priority chain — ",l.jsx("em",{children:"highest priority first"}),":"]}),l.jsxs("ol",{className:"doc__list doc__list--ordered",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Per-edge override"})," — click an edge in the canvas to give it its own effect & config. Shift-click to multi-select and edit them together."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Inner edges"})," / ",l.jsx("strong",{children:"Outer edges"}),' — set a single override that applies to every shared (or every outer) edge unless a per-edge override wins. Use the "use default" link to clear the layer.']}),l.jsxs("li",{children:[l.jsx("strong",{children:"Default effect"})," — applied to every edge that has no override above. The starting point."]})]}),l.jsxs("p",{children:["Three effects ship: ",l.jsx("strong",{children:"Puzzle"})," (interlocking tabs/sockets — invertible),"," ",l.jsx("strong",{children:"Wave"})," (sinusoidal, with frequency + amplitude), and"," ",l.jsx("strong",{children:"Straight"})," (clean line)."]}),l.jsx("h3",{children:"Stroke styling"}),l.jsx("p",{children:"Every effect carries three style fields that cascade through the same Default → Inner/Outer → per-edge chain:"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Color"})," — any color from the picker. Hit ",l.jsx("em",{children:"reset"})," to fall back to the theme stroke."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Opacity"})," — 0 to 100%. ",l.jsx("em",{children:"Transparent ≠ no color:"})," a transparent stroke shows the page background through the gap, while a colorless stroke just inherits the theme."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Width"})," — 0 to 10px. Use 0 to hide the outline entirely without changing geometry."]})]}),l.jsx("h3",{children:"Content mode"}),l.jsxs("ul",{className:"doc__list",children:[l.jsx("li",{children:"Click any piece to select it."}),l.jsxs("li",{children:["Choose ",l.jsx("strong",{children:"Empty"}),", ",l.jsx("strong",{children:"Text"}),", or ",l.jsx("strong",{children:"Image"}),"."]}),l.jsxs("li",{children:["Text supports alignment, size, and color. Image supports ",l.jsx("em",{children:"Cover / Contain / Stretch"}),"."]}),l.jsx("li",{children:"Everything is clipped to the piece's outline — text and images respect the puzzle shape."})]}),l.jsx("h3",{children:"Navigation"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Scroll"})," to zoom; ",l.jsx("strong",{children:"middle-drag"})," or ",l.jsx("strong",{children:"Ctrl-drag"})," to pan."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Esc"})," clears the selection in the active mode."]})]}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("edit"),children:"Open Edit →"})})]})}const Fm=[{id:"export-json",title:"JSON",body:"Re-importable project state. Drop it back into Hakoniwa via Projects → Import to keep editing."},{id:"export-jsx",title:"Single-file React",body:"One self-contained .jsx with paths precomputed and content baked in. Drop into any React 18+ project — zero deps. Bundled with a README in a small ZIP."},{id:"export-zip",title:"Module bundle (ZIP)",body:"The whole portable puzzle/ folder, your project.json, a wrapper component, a standalone compileProject.js, and a README."}];function Rm({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Exporting"}),l.jsx("h1",{className:"doc__h1",children:"Three ways to ship your puzzle."}),l.jsxs("p",{className:"doc__lede",children:["Open the Preview page and click ",l.jsx("strong",{children:"↓ Export ▾"})," at the top of the side panel. You'll get a menu with three options."]})]}),l.jsx(he,{}),l.jsx(Rl,{cards:Fm}),l.jsx("div",{className:"doc__note",children:"The ZIP encoder is hand-rolled (~80 lines, no compression) so the studio ships with no third-party dependencies."}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("preview"),children:"Open Preview to export →"})})]})}const Ds=[{id:"intro",label:"Welcome",Comp:bm},{id:"projects",label:"Projects tab",Comp:Mm},{id:"preview",label:"Preview tab",Comp:Am},{id:"grid",label:"Grid tab",Comp:Im},{id:"edit",label:"Edit tab",Comp:Om},{id:"export",label:"Exporting",Comp:Rm}];function Dm({onNav:e}){const[t,n]=M.useState("intro"),r=(Ds.find(i=>i.id===t)||Ds[0]).Comp;return l.jsxs("div",{className:"page-docs",children:[l.jsxs("aside",{className:"docs-nav",children:[l.jsx("div",{className:"docs-nav__brand",children:l.jsx(Un,{size:"sm"})}),l.jsx("h2",{className:"docs-nav__title",children:"Documentation"}),l.jsx("nav",{children:l.jsx("ul",{className:"docs-nav__list",children:Ds.map(i=>l.jsx("li",{children:l.jsx("button",{type:"button",className:`docs-nav__item ${t===i.id?"docs-nav__item--active":""}`,onClick:()=>n(i.id),children:i.label})},i.id))})}),l.jsx("div",{className:"docs-nav__cta",children:l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>e("projects"),children:"Open the app →"})})]}),l.jsx("article",{className:"docs-body",children:l.jsx(r,{onNav:e})})]})}const Bm=["top","right","bottom","left"],ii=60;function Id({project:e,maxSize:t=180}){const{vbX:n,vbY:r,vbW:i,vbH:s,items:o}=M.useMemo(()=>{var w,g,m,f;if(!e)return{vbX:0,vbY:0,vbW:1,vbH:1,items:[]};const d=Dn(e);if(d.length===0)return{vbX:0,vbY:0,vbW:1,vbH:1,items:[]};const h=((g=(w=e.edges)==null?void 0:w.default)==null?void 0:g.effect)??"puzzle",p=(f=(m=e.edges)==null?void 0:m.default)==null?void 0:f.config,v=d.map(y=>({...y,d:Ll(y,d,h,p),bbox:us(y,d,h,p),segments:Bm.flatMap(k=>Ol(y,d,k,h,p))})),x=v.reduce((y,k)=>({minX:Math.min(y.minX,k.bbox.minX),minY:Math.min(y.minY,k.bbox.minY),maxX:Math.max(y.maxX,k.bbox.maxX),maxY:Math.max(y.maxY,k.bbox.maxY)}),{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0});return{vbX:x.minX-ii,vbY:x.minY-ii,vbW:x.maxX-x.minX+ii*2,vbH:x.maxY-x.minY+ii*2,items:v}},[e]);if(!e||o.length===0)return l.jsx("div",{className:"preview-svg preview-svg--empty",children:"empty"});const a=i/s,c=a>=1?t:t*a,u=a>=1?t/a:t;return l.jsxs("svg",{className:"preview-svg",width:c,height:u,viewBox:`${n} ${r} ${i} ${s}`,xmlns:"http://www.w3.org/2000/svg",children:[l.jsx("defs",{children:o.map(d=>d.backgrounds&&d.backgrounds.length>0||d.content&&(d.content.text||d.content.src)?l.jsx("clipPath",{id:`pv-clip-${Ld(d.id)}`,children:l.jsx("path",{d:d.d})},d.id):null)}),o.map(d=>l.jsx(Um,{piece:d},d.id))]})}function Um({piece:e}){const{id:t,d:n,fill:r,content:i,backgrounds:s,segments:o,x:a,y:c,w:u,h:d,label:h}=e,p=s&&s.length>0,v=!!i&&(i.text||i.src),x=p||v?`url(#pv-clip-${Ld(t)})`:void 0;return l.jsxs("g",{children:[l.jsx("path",{d:n,fill:r||"var(--surface-2)",stroke:"none"}),p&&l.jsx("g",{clipPath:x,children:s.map(w=>l.jsx("image",{href:w.src,x:w.x,y:w.y,width:w.w,height:w.h,preserveAspectRatio:$d(w.fit)},w.id))}),v&&l.jsx("g",{clipPath:x,children:l.jsx(Wm,{x:a,y:c,w:u,h:d,content:i})}),!v&&!p&&h&&l.jsx("text",{x:a+u/2,y:c+d/2,textAnchor:"middle",dominantBaseline:"central",fill:"var(--text-dim)",fontSize:Math.max(10,Math.min(u,d)/8),fontFamily:"inherit",children:h}),(o||[]).map((w,g)=>{const m=w.style;return l.jsx("path",{d:w.d,fill:"none",stroke:(m==null?void 0:m.color)??"var(--stroke-soft)",strokeOpacity:(m==null?void 0:m.opacity)??1,strokeWidth:(m==null?void 0:m.strokeWidth)??1.5,strokeLinejoin:"round",strokeLinecap:"round"},`${w.pairKey}-${g}`)})]})}function Wm({x:e,y:t,w:n,h:r,content:i}){if(i.type==="image"&&i.src)return l.jsx("image",{href:i.src,x:e,y:t,width:n,height:r,preserveAspectRatio:$d(i.fit)});const s=i.text||"",o=i.fontSize||Math.min(n,r)/8,a=i.align||"center",c=i.color||"var(--text)",u=i.fontWeight||500,d=18,h=Km(s,n-d*2,o),p=o*1.25,v=t+r/2-h.length*p/2+p*.7,x=a==="left"?e+d:a==="right"?e+n-d:e+n/2,w=a==="left"?"start":a==="right"?"end":"middle";return l.jsx("text",{textAnchor:w,fill:c,fontSize:o,fontWeight:u,fontFamily:"inherit",children:h.map((g,m)=>l.jsx("tspan",{x,y:v+m*p,children:g},m))})}function $d(e){return e==="cover"?"xMidYMid slice":e==="contain"?"xMidYMid meet":e==="fill"?"none":"xMidYMid slice"}function Km(e,t,n){const r=n*.55,i=Math.max(1,Math.floor(t/r)),s=[];for(const o of e.split(`
`)){if(o===""){s.push("");continue}const a=o.split(/\s+/);let c="";for(const u of a){const d=c?c+" "+u:u;d.length<=i?c=d:(c&&s.push(c),c=u.length<=i?u:u.slice(0,i))}c&&s.push(c)}return s}function Ld(e){return String(e).replace(/[^a-zA-Z0-9_-]/g,"_")}function Od(e){const t=new Date(e),n=(Date.now()-e)/1e3;return n<60?"just now":n<3600?`${Math.floor(n/60)}m ago`:n<86400?`${Math.floor(n/3600)}h ago`:t.toLocaleDateString()}function Hm({project:e,onNav:t}){const{project:n,projects:r,openProject:i,createNew:s,removeProject:o,importFromFile:a}=e,c=M.useRef(null),u=async h=>{var v;const p=(v=h.target.files)==null?void 0:v[0];if(h.target.value="",!!p)try{await a(p)}catch(x){alert("Could not import: "+x.message)}},d=h=>{i(h),t("preview")};return l.jsx("div",{className:"page-projects",children:l.jsxs("section",{className:"projects-section",children:[l.jsx("div",{className:"projects-section__brand",children:l.jsx(Un,{size:"md"})}),l.jsxs("div",{className:"projects-section__head",children:[l.jsx("h2",{className:"projects-section__title",children:"Your Projects"}),l.jsxs("div",{className:"projects-section__actions",children:[l.jsx("input",{ref:c,type:"file",accept:".json",hidden:!0,onChange:u}),l.jsx("button",{type:"button",className:"action-btn",onClick:()=>{var h;return(h=c.current)==null?void 0:h.click()},children:"↑ Import JSON"})]})]}),l.jsx(he,{amplitude:6}),l.jsxs("div",{className:"project-grid",children:[l.jsxs("button",{type:"button",className:"project-tile project-tile--new",onClick:()=>{s(),t("preview")},children:[l.jsx("div",{className:"project-tile__plus",children:"+"}),l.jsx("div",{className:"project-tile__name",children:"New project"})]}),[...r].sort((h,p)=>p.updatedAt-h.updatedAt).map(h=>{const p=h.id===(n==null?void 0:n.id);return l.jsxs("div",{className:`project-tile ${p?"project-tile--current":""}`,children:[l.jsxs("button",{type:"button",className:"project-tile__open",onClick:()=>d(h.id),children:[l.jsx("div",{className:"project-tile__preview",children:l.jsx(Id,{project:h,maxSize:140})}),l.jsx("div",{className:"project-tile__name",children:h.name||"Untitled"}),l.jsxs("div",{className:"project-tile__meta",children:[h.grid.rows,"×",h.grid.cols," · ",Od(h.updatedAt)]})]}),l.jsx("button",{type:"button",className:"project-tile__del",onClick:()=>{confirm(`Delete "${h.name}"?`)&&o(h.id)},title:"Delete",children:"✕"})]},h.id)})]})]})})}const Vm="# src/puzzle — Rendering Module\n\nSelf-contained rendering module. **No imports from outside this folder.** Drop into any React 18+ project. Also shipped verbatim by the studio's \"Module bundle (ZIP)\" export.\n\n## Public API (`index.js`)\n- `PuzzleBoard` — root `<svg>` rendering all pieces.\n- `PuzzlePiece` — single piece as `<g>`. Body = fill-only `<path>`; outline = one `<path>` per segment (so each edge can carry its own color / opacity / width). Optional content (text/image) and backgrounds are clipped to the body path.\n- `computePiecePath(piece, allPieces, effect, config)` — full closed SVG path string (the body).\n- `computeSidePath(piece, allPieces, side, effect, config)` — one continuous side path (used by edge editor overlay).\n- `computeSideSegments(piece, allPieces, side, effect, config)` — `[{ pairKey, neighborId, d, style }]` per segment, each `d` is M-prefixed and standalone. Used by `PuzzlePiece` to render per-edge styled strokes.\n- `computePieceBbox(piece, allPieces, effect, config)` — bounding box including knob/wave extent.\n- `EFFECT_NAMES` — `['puzzle', 'wave', 'straight']`.\n- Exports `KNOB_R`, `EFFECTS`, `normalizeSide`, etc. for advanced use.\n\n## Key Constants\n- `KNOB_R = 30` — pieces need at least `2 * KNOB_R = 60px` per side.\n\n## Effects (`effects/`)\nEach effect exports `{ buildSide, hidesKnobs? }`. `buildSide` returns an SVG path fragment (no leading `M`). Currently: `puzzleEffect`, `waveEffect`, `straightEffect`.\n\n## Piece Shape (used by `PuzzleBoard`)\n```js\n{\n  id, x, y, w, h, label?,\n  fill?: string,                                // optional override fill color\n  content?: ContentSpec,                        // optional text/image content\n  backgrounds?: Array<{ id, src, fit, x, y, w, h }>,  // multi-piece images (px space)\n  sides: { top?, right?, bottom?, left? },      // Side = 'flat' | {count,type} | [{pos,type}]\n  edgeEffects:        { [side]: { [neighborId]: effectName } },\n  edgeEffectConfigs:  { [side]: { [neighborId]: config } },\n}\n```\n\n## Render layers (per piece, in z-order)\n1. **Body** (`.piece__body`) — fill-only closed path. The fill is the piece color (or theme `--puzzle-fill`).\n2. **Backgrounds** (optional) — multi-piece images, clipped to the body. Same image rendered in every overlapping piece; SVG clipping does the slicing for free.\n3. **Content** (optional) — text or image, clipped to the body.\n4. **Edges** (`.piece__edge`) — one `<path>` per segment, drawn last so the outline sits on top. Each segment carries its own resolved `{ color, opacity, strokeWidth }` from the edge config, with theme defaults via CSS vars.\n\nFor shared edges, both pieces render their own copy of the segment stroke. Because the resolution chain is symmetric (same `pairKey` resolves the same way from either side), the two copies overlap exactly — no visible double-stroke.\n\n## Content rendering details\n- `<defs><clipPath><path d={body}/></clipPath></defs>` per piece (created when content or backgrounds exist).\n- **Backgrounds**: `<image>` at the full background coords; clipPath cuts each to the piece's outline.\n- **Text**: greedy word-wrap + `<text><tspan>` per line.\n- **Image content**: `<image preserveAspectRatio>` mapped from `fit` (`cover` → `slice`, `contain`/`none` → `meet`, `fill` → `none`).\n",Ym=`/*
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

/* Selected state — editor-only signal. NOT user-configurable; kept here
 * so the studio can show which piece is being edited. The hover signal,
 * by contrast, is now a user-pickable effect (\`highlight\`) — see the
 * effect block at the bottom of this file. */
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

.piece--selected .piece__edge {
  stroke: var(--puzzle-stroke-hover, var(--stroke-hover, #4285f4));
  stroke-width: 2.5;
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

/* === Interaction effects v2 ================================================
   Each entry in the effects catalogue (see src/puzzle/effects-catalog.js)
   maps to ONE class per supported trigger:

     .piece--anim-{id}--{trigger}            (cell tier — root <g>)
     .piece__edge--anim-{id}--{trigger}      (edge tier — segment <path>)

   Triggers:
     hover  — applies while the piece is :hover
     click  — applies while the piece is :active
     idle   — applies when the piece is NOT :hover (continuous)
     always — applies in every state (continuous)

   Per-effect intensity rides through CSS custom properties (--anim-*)
   that PuzzlePiece writes inline on each <g>/<path>. Effects in different
   exclusivity groups compose because they target different CSS properties
   (transform / filter / fill / stroke) so there's no overwrite war.
   Same-group effects (e.g., scale-up + scale-down) cannot coexist —
   the picker auto-swaps them.
*/

.piece[class*="piece--anim-"] {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 200ms ease, filter 200ms ease, opacity 200ms ease;
}

.piece__edge[class*="piece__edge--anim-"] {
  transition: stroke-width 200ms ease, filter 200ms ease, stroke 200ms ease;
}

/* --- Cell · highlight (fill shift) ------------------------------------- */
.piece--anim-highlight--hover:hover  .piece__body,
.piece--anim-highlight--click:active .piece__body,
.piece--anim-highlight--always       .piece__body {
  fill: var(--puzzle-fill-hover, var(--surface-2, #1b222d));
}

/* --- Cell · lift (translate up) ---------------------------------------- */
.piece--anim-lift--hover:hover  { transform: translate(0, calc(-1 * var(--anim-lift-distance, 4px))); }
.piece--anim-lift--click:active { transform: translate(0, calc(-1 * var(--anim-lift-distance, 4px))); }
.piece--anim-lift--always       { transform: translate(0, calc(-1 * var(--anim-lift-distance, 4px))); }

/* --- Cell · scale-up --------------------------------------------------- */
.piece--anim-scale-up--hover:hover  { transform: scale(calc(1 + var(--anim-scale-up-amount, 0.04))); }
.piece--anim-scale-up--click:active { transform: scale(calc(1 + var(--anim-scale-up-amount, 0.04))); }
.piece--anim-scale-up--always       { transform: scale(calc(1 + var(--anim-scale-up-amount, 0.04))); }

/* --- Cell · scale-down ------------------------------------------------- */
.piece--anim-scale-down--hover:hover  { transform: scale(calc(1 - var(--anim-scale-down-amount, 0.04))); }
.piece--anim-scale-down--click:active { transform: scale(calc(1 - var(--anim-scale-down-amount, 0.04))); }
.piece--anim-scale-down--always       { transform: scale(calc(1 - var(--anim-scale-down-amount, 0.04))); }

/* --- Cell · glow (drop-shadow on body) --------------------------------- */
.piece--anim-glow--hover:hover  .piece__body,
.piece--anim-glow--click:active .piece__body,
.piece--anim-glow--always       .piece__body {
  filter: drop-shadow(0 0 var(--anim-glow-radius, 6px) var(--primary-tint, rgba(214, 139, 84, 0.55)))
          drop-shadow(0 0 calc(var(--anim-glow-radius, 6px) * 2) var(--primary-tint, rgba(214, 139, 84, 0.4)));
}
.piece--anim-glow--idle:not(:hover) .piece__body {
  filter: drop-shadow(0 0 var(--anim-glow-radius, 6px) var(--primary-tint, rgba(214, 139, 84, 0.55)));
}

/* --- Cell · pulse (continuous breathing) ------------------------------- */
.piece--anim-pulse--idle,
.piece--anim-pulse--always {
  animation: piece-anim-pulse var(--anim-pulse-speed, 2.6s) ease-in-out infinite;
}
.piece--anim-pulse--idle:hover { animation-play-state: paused; }

@keyframes piece-anim-pulse {
  0%, 100% { opacity: 1;    transform: scale(1); }
  50%      { opacity: 0.92; transform: scale(0.985); }
}

/* --- Edge · highlight (stroke recolour + thicken) ---------------------- */
.piece:hover  .piece__edge--anim-highlight--hover,
.piece:active .piece__edge--anim-highlight--click,
              .piece__edge--anim-highlight--always {
  stroke: var(--puzzle-stroke-hover, var(--stroke-hover, #4285f4));
  stroke-width: 2.5;
}

/* --- Edge · glow ------------------------------------------------------- */
.piece:hover  .piece__edge--anim-glow--hover,
.piece:active .piece__edge--anim-glow--click,
              .piece__edge--anim-glow--always {
  filter: drop-shadow(0 0 var(--anim-edge-glow-radius, 4px) currentColor)
          drop-shadow(0 0 calc(var(--anim-edge-glow-radius, 4px) * 2) currentColor);
}
.piece:not(:hover) .piece__edge--anim-glow--idle {
  filter: drop-shadow(0 0 var(--anim-edge-glow-radius, 4px) currentColor);
}

/* --- Edge · thicken ---------------------------------------------------- */
.piece:hover  .piece__edge--anim-thicken--hover,
.piece:active .piece__edge--anim-thicken--click,
              .piece__edge--anim-thicken--always {
  stroke-width: var(--anim-edge-thicken-width, 3.5px);
}

/* --- Edge · wiggle (transient transform shake) ------------------------- */
.piece:hover  .piece__edge--anim-wiggle--hover,
.piece:active .piece__edge--anim-wiggle--click {
  animation: piece-edge-wiggle 320ms ease-in-out;
  transform-box: fill-box;
  transform-origin: center;
}
@keyframes piece-edge-wiggle {
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(var(--anim-edge-wiggle-intensity, 0.6px), calc(-1 * var(--anim-edge-wiggle-intensity, 0.6px))); }
  40%  { transform: translate(calc(-1 * var(--anim-edge-wiggle-intensity, 0.6px)), calc(0.7 * var(--anim-edge-wiggle-intensity, 0.6px))); }
  60%  { transform: translate(calc(0.7 * var(--anim-edge-wiggle-intensity, 0.6px)), var(--anim-edge-wiggle-intensity, 0.6px)); }
  80%  { transform: translate(calc(-0.6 * var(--anim-edge-wiggle-intensity, 0.6px)), calc(-0.6 * var(--anim-edge-wiggle-intensity, 0.6px))); }
  100% { transform: translate(0, 0); }
}

/* --- Edge · flash (transient stroke pulse) ----------------------------- */
.piece:hover  .piece__edge--anim-flash--hover,
.piece:active .piece__edge--anim-flash--click {
  animation: piece-edge-flash var(--anim-edge-flash-duration, 700ms) ease-out;
}
@keyframes piece-edge-flash {
  0%   { stroke: var(--primary-2, #d68b54);
         filter: drop-shadow(0 0 6px var(--primary-tint, rgba(214,139,84,0.6))); }
  100% { /* falls back to inline style / .piece__edge default */ }
}

/* Respect prefers-reduced-motion — collapse all transitions / animations
 * to no-ops. Static visuals (highlight fill shift, thicken width) still
 * work because they're not transitions. */
@media (prefers-reduced-motion: reduce) {
  .piece[class*="piece--anim-"],
  .piece__edge[class*="piece__edge--anim-"] {
    animation: none !important;
    transition: none !important;
  }
  .piece[class*="piece--anim-lift--"],
  .piece[class*="piece--anim-scale-up--"],
  .piece[class*="piece--anim-scale-down--"] { transform: none; }
}
`,Xm=`import { useMemo, useState } from 'react';
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
`,Gm=`import { KNOB_R, TAB, computeActiveKnobs, computeSideSegments, knobHitCenter } from './geometry.js';
import { cellEffectAttrs, edgeEffectAttrs } from './effect-attrs.js';

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
  const { id, x, y, w, h, label, fill, content, backgrounds, cellEffects } = piece;
  const knobs = computeActiveKnobs(piece, allPieces, effect);
  const clipId = \`pc-clip-\${id}\`;
  const maskId = \`pc-mask-\${id}\`;
  const hasContent = !!content && (content.text || content.src);
  const hasBackgrounds = backgrounds && backgrounds.length > 0;
  const needsClip = hasContent || hasBackgrounds;
  const cellAnim = cellEffectAttrs(cellEffects);

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
      className={\`piece \${isHovered ? 'piece--hover' : ''} \${isSelected ? 'piece--selected' : ''} \${cellAnim.className}\`.replace(/\\s+/g, ' ').trim()}
      style={cellAnim.style}
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
          const inlineStyle = s ? {
            ...(s.color != null       ? { stroke: s.color } : null),
            ...(s.opacity != null     ? { strokeOpacity: s.opacity } : null),
            ...(s.strokeWidth != null ? { strokeWidth: s.strokeWidth } : null),
          } : undefined;
          const ea = edgeEffectAttrs(s?.effects);
          const mergedStyle = ea.style || inlineStyle
            ? { ...(inlineStyle || {}), ...(ea.style || {}) }
            : undefined;
          return (
            <path
              key={\`\${seg.pairKey}-\${i}\`}
              d={seg.d}
              className={\`piece__edge \${ea.className}\`.trim()}
              style={mergedStyle}
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
`,Qm=`// Minimal board helpers consumed by \`geometry.js\` for path building.
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
`,Zm=`// Shared helper: turn an effects map (e.g. piece.cellEffects or seg.style.effects)
// into the className + style attrs the renderer needs:
//
//   className — one space-separated \`<scope>--anim-<id>--<trigger>\` per entry
//   style     — CSS custom properties from each entry's config bag
//
// Used by both \`PuzzlePiece\` (live studio) and \`export.js\` (single-file
// JSX export) so the deployed puzzle gets identical classes + vars.
import { CELL_EFFECTS, EDGE_EFFECTS } from './effects-catalog.js';

function computeAttrs(effects, catalogue, scopeClass) {
  if (!effects) return { className: '', style: undefined };
  const classes = [];
  const style = {};
  for (const entry of Object.values(effects)) {
    if (!entry || !entry.id || !entry.trigger) continue;
    classes.push(\`\${scopeClass}--anim-\${entry.id}--\${entry.trigger}\`);
    const def = catalogue[entry.id];
    if (!def) continue;
    for (const [field, schema] of Object.entries(def.config || {})) {
      if (!schema?.cssVar) continue;
      const raw = entry.config?.[field] ?? schema.default;
      style[schema.cssVar] = \`\${raw}\${schema.unit || ''}\`;
    }
  }
  return {
    className: classes.join(' '),
    style: Object.keys(style).length ? style : undefined,
  };
}

export function cellEffectAttrs(effects) {
  return computeAttrs(effects, CELL_EFFECTS, 'piece');
}

export function edgeEffectAttrs(effects) {
  return computeAttrs(effects, EDGE_EFFECTS, 'piece__edge');
}
`,Jm=`// Effect catalogue — single source of truth for the studio panels, the
// renderer, and the single-file JSX export. Each entry declares:
//
//   label    — display name shown on chips
//   group    — exclusivity group (effects in the same group can't coexist
//              on the same piece/edge tier; auto-swap on pick)
//   triggers — which trigger states the effect supports
//                'hover'  — applies while pointer is over the piece
//                'click'  — applies while pointer is pressed (:active)
//                'idle'   — applies when NOT hovered/pressed (continuous)
//                'always' — applies in every state (continuous)
//   defaultTrigger — pre-selected trigger when the user adds the effect
//   config   — schema for the per-effect intensity sliders. Each field:
//                { default, min, max, step, label, unit, cssVar }
//              \`cssVar\` is the CSS custom property the renderer writes
//              (e.g. '--anim-lift-distance'). \`unit\` (optional) suffixes
//              the value when emitting the var (px, %, s, ms).

export const TRIGGERS = ['hover', 'click', 'idle', 'always'];

export const TRIGGER_LABELS = {
  hover:  'Hover',
  click:  'Click',
  idle:   'Idle',
  always: 'Always',
};

export const CELL_EFFECTS = {
  highlight: {
    label: 'Highlight',
    group: 'fill',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    config: {},
  },
  lift: {
    label: 'Lift',
    group: 'transform',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    config: {
      distance: { default: 4, min: 1, max: 16, step: 1, label: 'Distance', unit: 'px', cssVar: '--anim-lift-distance' },
    },
  },
  'scale-up': {
    label: 'Scale up',
    group: 'transform',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    config: {
      amount: { default: 0.04, min: 0.01, max: 0.3, step: 0.01, label: 'Amount', unit: '', cssVar: '--anim-scale-up-amount' },
    },
  },
  'scale-down': {
    label: 'Scale down',
    group: 'transform',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    config: {
      amount: { default: 0.04, min: 0.01, max: 0.3, step: 0.01, label: 'Amount', unit: '', cssVar: '--anim-scale-down-amount' },
    },
  },
  glow: {
    label: 'Glow',
    group: 'filter',
    triggers: ['hover', 'click', 'idle', 'always'],
    defaultTrigger: 'hover',
    config: {
      radius: { default: 6, min: 1, max: 24, step: 1, label: 'Radius', unit: 'px', cssVar: '--anim-glow-radius' },
    },
  },
  pulse: {
    label: 'Pulse',
    group: 'transform',
    triggers: ['idle', 'always'],
    defaultTrigger: 'idle',
    config: {
      speed: { default: 2.6, min: 0.5, max: 6, step: 0.1, label: 'Speed', unit: 's', cssVar: '--anim-pulse-speed' },
    },
  },
};

export const EDGE_EFFECTS = {
  highlight: {
    label: 'Highlight',
    group: 'stroke',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    config: {},
  },
  glow: {
    label: 'Glow',
    group: 'filter',
    triggers: ['hover', 'click', 'idle', 'always'],
    defaultTrigger: 'hover',
    config: {
      radius: { default: 4, min: 1, max: 16, step: 1, label: 'Radius', unit: 'px', cssVar: '--anim-edge-glow-radius' },
    },
  },
  wiggle: {
    label: 'Wiggle',
    group: 'transform',
    triggers: ['hover', 'click'],
    defaultTrigger: 'hover',
    config: {
      intensity: { default: 0.6, min: 0.1, max: 2.5, step: 0.1, label: 'Intensity', unit: 'px', cssVar: '--anim-edge-wiggle-intensity' },
    },
  },
  thicken: {
    label: 'Thicken',
    group: 'stroke',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    config: {
      width: { default: 3.5, min: 1.5, max: 8, step: 0.25, label: 'Width', unit: 'px', cssVar: '--anim-edge-thicken-width' },
    },
  },
  flash: {
    label: 'Flash',
    group: 'animate',
    triggers: ['hover', 'click'],
    defaultTrigger: 'click',
    config: {
      duration: { default: 700, min: 100, max: 2000, step: 50, label: 'Duration', unit: 'ms', cssVar: '--anim-edge-flash-duration' },
    },
  },
};

// Stable id arrays — used to render chip rows in a deterministic order.
export const CELL_EFFECT_IDS = Object.keys(CELL_EFFECTS);
export const EDGE_EFFECT_IDS = Object.keys(EDGE_EFFECTS);

// Build a fresh effect entry from the catalogue with default trigger + config.
// Used by the picker when the user clicks a chip to add an effect.
export function makeEffectEntry(catalogue, id, trigger) {
  const def = catalogue[id];
  if (!def) return null;
  const t = trigger ?? def.defaultTrigger ?? def.triggers[0];
  const config = {};
  for (const [field, schema] of Object.entries(def.config || {})) {
    config[field] = schema.default;
  }
  return { id, trigger: t, config };
}

// Compose the unique key for an entry under (id, trigger). Same id with
// different triggers are independent entries that compose.
export function effectKey(id, trigger) {
  return \`\${id}:\${trigger}\`;
}
`,qm=`// Puzzle piece effect: classic interlocking tabs and sockets via SVG arcs.

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
`,eg=`// Straight effect: simple straight line, no knobs.

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
`,tg=`// Wave effect: pure continuous sine wave along an edge, no knobs.
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
`,ng=`// Pure geometry helpers for puzzle pieces.
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
  if (cfg.color != null)       out.color = cfg.color;
  if (cfg.opacity != null)     out.opacity = cfg.opacity;
  if (cfg.strokeWidth != null) out.strokeWidth = cfg.strokeWidth;
  // Effects map (v2): { 'glow:hover': { id, trigger, config }, ... }
  // Compiled in compile.js#assignSide via resolveEdgeEffects; the renderer
  // emits one class + matching CSS vars per entry.
  if (cfg.effects && Object.keys(cfg.effects).length) out.effects = cfg.effects;
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
`,rg=`// Public API for the puzzle rendering module.
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

// Interaction-effect catalogue + render helpers. Lives inside the puzzle
// module so the rendering pipeline stays self-contained / portable.
export {
  CELL_EFFECTS, EDGE_EFFECTS,
  CELL_EFFECT_IDS, EDGE_EFFECT_IDS,
  TRIGGERS, TRIGGER_LABELS,
  makeEffectEntry, effectKey,
} from './effects-catalog.js';

export { cellEffectAttrs, edgeEffectAttrs } from './effect-attrs.js';
`,ig=(()=>{const e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n}return e})();function sg(e){let t=4294967295;for(let n=0;n<e.length;n++)t=ig[(t^e[n])&255]^t>>>8;return(t^4294967295)>>>0}function Fd(e){const t=new TextEncoder,n=[],r=[];let i=0;for(const u of e){const d=t.encode(u.name),h=typeof u.content=="string"?t.encode(u.content):u.content,p=sg(h),v=new Uint8Array(30+d.length),x=new DataView(v.buffer);x.setUint32(0,67324752,!0),x.setUint16(4,20,!0),x.setUint16(6,0,!0),x.setUint16(8,0,!0),x.setUint16(10,0,!0),x.setUint16(12,33,!0),x.setUint32(14,p,!0),x.setUint32(18,h.length,!0),x.setUint32(22,h.length,!0),x.setUint16(26,d.length,!0),x.setUint16(28,0,!0),v.set(d,30),n.push(v,h);const w=new Uint8Array(46+d.length),g=new DataView(w.buffer);g.setUint32(0,33639248,!0),g.setUint16(4,20,!0),g.setUint16(6,20,!0),g.setUint16(8,0,!0),g.setUint16(10,0,!0),g.setUint16(12,0,!0),g.setUint16(14,33,!0),g.setUint32(16,p,!0),g.setUint32(20,h.length,!0),g.setUint32(24,h.length,!0),g.setUint16(28,d.length,!0),g.setUint16(30,0,!0),g.setUint16(32,0,!0),g.setUint16(34,0,!0),g.setUint16(36,0,!0),g.setUint32(38,0,!0),g.setUint32(42,i,!0),w.set(d,46),r.push(w),i+=v.length+h.length}const s=r.reduce((u,d)=>u+d.length,0),o=i,a=new Uint8Array(22),c=new DataView(a.buffer);return c.setUint32(0,101010256,!0),c.setUint16(4,0,!0),c.setUint16(6,0,!0),c.setUint16(8,e.length,!0),c.setUint16(10,e.length,!0),c.setUint32(12,s,!0),c.setUint32(16,o,!0),c.setUint16(20,0,!0),new Blob([...n,...r,a],{type:"application/zip"})}const og=["top","right","bottom","left"],lg=Object.assign({"../puzzle/CLAUDE.md":Vm,"../puzzle/PuzzleBoard.css":Ym,"../puzzle/PuzzleBoard.jsx":Xm,"../puzzle/PuzzlePiece.jsx":Gm,"../puzzle/board.js":Qm,"../puzzle/effect-attrs.js":Zm,"../puzzle/effects-catalog.js":Jm,"../puzzle/effects/puzzleEffect.js":qm,"../puzzle/effects/straightEffect.js":eg,"../puzzle/effects/waveEffect.js":tg,"../puzzle/geometry.js":ng,"../puzzle/index.js":rg});function Rd(e,t){const n=URL.createObjectURL(e),r=document.createElement("a");r.href=n,r.download=t,r.click(),URL.revokeObjectURL(n)}function ag(e){var i,s,o,a;const t=Dn(e),n=((s=(i=e.edges)==null?void 0:i.default)==null?void 0:s.effect)??"puzzle",r=((a=(o=e.edges)==null?void 0:o.default)==null?void 0:a.config)??null;return t.map(c=>{const u=Ad(c.cellEffects);return{id:c.id,x:c.x,y:c.y,w:c.w,h:c.h,label:c.label,fill:c.fill??null,content:c.content??null,backgrounds:c.backgrounds??null,animClassName:u.className,animStyle:u.style??null,d:Ll(c,t,n,r),segments:og.flatMap(d=>Ol(c,t,d,n,r)).map(d=>{var p;const h=Td((p=d.style)==null?void 0:p.effects);return{d:d.d,style:d.style?{color:d.style.color??null,opacity:d.style.opacity??null,strokeWidth:d.style.strokeWidth??null}:null,animClassName:h.className,animStyle:h.style??null}})}})}const cg=`
.hak-puzzle .piece { cursor: default; }
.hak-puzzle .piece[class*="piece--anim-"] {
  transform-box: fill-box; transform-origin: center;
  transition: transform 200ms ease, filter 200ms ease, opacity 200ms ease;
}
.hak-puzzle .piece__edge[class*="piece__edge--anim-"] {
  transition: stroke-width 200ms ease, filter 200ms ease, stroke 200ms ease;
}

/* Cell · highlight */
.hak-puzzle .piece--anim-highlight--hover:hover  .piece__body,
.hak-puzzle .piece--anim-highlight--click:active .piece__body,
.hak-puzzle .piece--anim-highlight--always       .piece__body { fill: #1b222d; }

/* Cell · lift */
.hak-puzzle .piece--anim-lift--hover:hover  { transform: translate(0, calc(-1 * var(--anim-lift-distance, 4px))); }
.hak-puzzle .piece--anim-lift--click:active { transform: translate(0, calc(-1 * var(--anim-lift-distance, 4px))); }
.hak-puzzle .piece--anim-lift--always       { transform: translate(0, calc(-1 * var(--anim-lift-distance, 4px))); }

/* Cell · scale-up */
.hak-puzzle .piece--anim-scale-up--hover:hover  { transform: scale(calc(1 + var(--anim-scale-up-amount, 0.04))); }
.hak-puzzle .piece--anim-scale-up--click:active { transform: scale(calc(1 + var(--anim-scale-up-amount, 0.04))); }
.hak-puzzle .piece--anim-scale-up--always       { transform: scale(calc(1 + var(--anim-scale-up-amount, 0.04))); }

/* Cell · scale-down */
.hak-puzzle .piece--anim-scale-down--hover:hover  { transform: scale(calc(1 - var(--anim-scale-down-amount, 0.04))); }
.hak-puzzle .piece--anim-scale-down--click:active { transform: scale(calc(1 - var(--anim-scale-down-amount, 0.04))); }
.hak-puzzle .piece--anim-scale-down--always       { transform: scale(calc(1 - var(--anim-scale-down-amount, 0.04))); }

/* Cell · glow */
.hak-puzzle .piece--anim-glow--hover:hover  .piece__body,
.hak-puzzle .piece--anim-glow--click:active .piece__body,
.hak-puzzle .piece--anim-glow--always       .piece__body {
  filter: drop-shadow(0 0 var(--anim-glow-radius, 6px) rgba(214, 139, 84, 0.55))
          drop-shadow(0 0 calc(var(--anim-glow-radius, 6px) * 2) rgba(214, 139, 84, 0.4));
}
.hak-puzzle .piece--anim-glow--idle:not(:hover) .piece__body {
  filter: drop-shadow(0 0 var(--anim-glow-radius, 6px) rgba(214, 139, 84, 0.55));
}

/* Cell · pulse */
.hak-puzzle .piece--anim-pulse--idle,
.hak-puzzle .piece--anim-pulse--always { animation: hak-piece-pulse var(--anim-pulse-speed, 2.6s) ease-in-out infinite; }
.hak-puzzle .piece--anim-pulse--idle:hover { animation-play-state: paused; }
@keyframes hak-piece-pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50%     { opacity: 0.92; transform: scale(0.985); }
}

/* Edge · highlight */
.hak-puzzle .piece:hover  .piece__edge--anim-highlight--hover,
.hak-puzzle .piece:active .piece__edge--anim-highlight--click,
.hak-puzzle              .piece__edge--anim-highlight--always {
  stroke: #4285f4; stroke-width: 2.5;
}

/* Edge · glow */
.hak-puzzle .piece:hover  .piece__edge--anim-glow--hover,
.hak-puzzle .piece:active .piece__edge--anim-glow--click,
.hak-puzzle              .piece__edge--anim-glow--always {
  filter: drop-shadow(0 0 var(--anim-edge-glow-radius, 4px) currentColor)
          drop-shadow(0 0 calc(var(--anim-edge-glow-radius, 4px) * 2) currentColor);
}
.hak-puzzle .piece:not(:hover) .piece__edge--anim-glow--idle {
  filter: drop-shadow(0 0 var(--anim-edge-glow-radius, 4px) currentColor);
}

/* Edge · thicken */
.hak-puzzle .piece:hover  .piece__edge--anim-thicken--hover,
.hak-puzzle .piece:active .piece__edge--anim-thicken--click,
.hak-puzzle              .piece__edge--anim-thicken--always { stroke-width: var(--anim-edge-thicken-width, 3.5px); }

/* Edge · wiggle */
.hak-puzzle .piece:hover  .piece__edge--anim-wiggle--hover,
.hak-puzzle .piece:active .piece__edge--anim-wiggle--click {
  animation: hak-edge-wiggle 320ms ease-in-out;
  transform-box: fill-box; transform-origin: center;
}
@keyframes hak-edge-wiggle {
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(var(--anim-edge-wiggle-intensity, 0.6px), calc(-1 * var(--anim-edge-wiggle-intensity, 0.6px))); }
  40%  { transform: translate(calc(-1 * var(--anim-edge-wiggle-intensity, 0.6px)), calc(0.7 * var(--anim-edge-wiggle-intensity, 0.6px))); }
  60%  { transform: translate(calc(0.7 * var(--anim-edge-wiggle-intensity, 0.6px)), var(--anim-edge-wiggle-intensity, 0.6px)); }
  80%  { transform: translate(calc(-0.6 * var(--anim-edge-wiggle-intensity, 0.6px)), calc(-0.6 * var(--anim-edge-wiggle-intensity, 0.6px))); }
  100% { transform: translate(0, 0); }
}

/* Edge · flash */
.hak-puzzle .piece:hover  .piece__edge--anim-flash--hover,
.hak-puzzle .piece:active .piece__edge--anim-flash--click {
  animation: hak-edge-flash var(--anim-edge-flash-duration, 700ms) ease-out;
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
  .hak-puzzle .piece[class*="piece--anim-lift--"],
  .hak-puzzle .piece[class*="piece--anim-scale-up--"],
  .hak-puzzle .piece[class*="piece--anim-scale-down--"] { transform: none; }
}`.trim();function ug(e){const t=ag(e),n=Math.min(...t.map(c=>c.x)),r=Math.min(...t.map(c=>c.y)),i=Math.max(...t.map(c=>c.x+c.w)),s=Math.max(...t.map(c=>c.y+c.h)),o=60,a={x:n-o,y:r-o,w:i-n+o*2,h:s-r+o*2};return`// Generated by Hakoniwa.
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
const ANIM_CSS = ${JSON.stringify(cg)};

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
  const { id, x, y, w, h, label, fill, content, backgrounds, segments, d, animClassName, animStyle } = piece;
  const clipId = 'pcx-' + id.replace(/[^a-zA-Z0-9]/g, '');
  const hasContent = content && (content.text || content.src);
  const hasBgs = backgrounds && backgrounds.length > 0;
  const needsClip = hasContent || hasBgs;
  return (
    <g className={('piece ' + (animClassName || '')).trim()} style={animStyle || undefined}>
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

      {/* Per-segment edge strokes — one path per edge with its own color /
          opacity / width / animation classes (each entry → one class +
          matching CSS vars from the piece's animStyle). Hover/click triggers
          fire from the parent .piece:hover / :active. */}
      {(segments || []).map((seg, i) => {
        const s = seg.style || {};
        const segStyle = { ...(seg.animStyle || {}) };
        return (
          <path
            key={i}
            d={seg.d}
            className={('piece__edge ' + (seg.animClassName || '')).trim()}
            fill="none"
            stroke={s.color || '#423a4f'}
            strokeOpacity={s.opacity != null ? s.opacity : 1}
            strokeWidth={s.strokeWidth != null ? s.strokeWidth : 1.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            style={Object.keys(segStyle).length ? segStyle : undefined}
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
`}const dg=e=>`# ${e.name||"Puzzle Export"}

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
`,fg=e=>`# Hakoniwa Export — Module Bundle

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
`,pg=e=>`// Convenience wrapper: imports your project data + renders it with the puzzle module.
import React, { useMemo } from 'react';
import { PuzzleBoard } from './puzzle';
import projectData from './project.json';
import { compileProject } from './compileProject.js';

export default function ${mg(e.name)||"Puzzle"}({ width = '100%' }) {
  const pieces = useMemo(() => compileProject(projectData), []);
  const effect = projectData.edges?.default?.effect ?? 'puzzle';
  const config = projectData.edges?.default?.config;
  return (
    <div style={{ width }}>
      <PuzzleBoard pieces={pieces} effect={effect} effectConfig={config} />
    </div>
  );
}
`,hg=`// Standalone compileProject — no imports outside this file.
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
`;function mt(e){return(e||"puzzle").replace(/[^A-Za-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"puzzle"}function mg(e){return e?e.replace(/[^A-Za-z0-9]+/g," ").trim().split(/\s+/).map(t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()).join(""):""}function gg(e){const t=mt(e.name),n=ug(e),r=dg(e),i=Fd([{name:`${t}.jsx`,content:n},{name:"README.md",content:r}]);Rd(i,`${t}-component.zip`)}function yg(e){const t=mt(e.name),n=[];for(const[i,s]of Object.entries(lg)){const o=i.replace(/^\.\.\//,"");o.endsWith("CLAUDE.md")||n.push({name:o,content:s})}n.push({name:"project.json",content:JSON.stringify(e,null,2)}),n.push({name:`${t}.jsx`,content:pg(e)}),n.push({name:"compileProject.js",content:hg}),n.push({name:"README.md",content:fg(e)});const r=Fd(n);Rd(r,`${t}-module.zip`)}function vg({project:e,onNav:t}){const{project:n,setName:r,exportCurrent:i}=e,[s,o]=M.useState(!1),[a,c]=M.useState(!1);return n?l.jsxs("div",{className:"page-preview",children:[l.jsx("div",{className:"preview-stage",children:l.jsx("div",{className:"preview-stage__svg",children:l.jsx(Id,{project:n,maxSize:620})})}),l.jsxs("aside",{className:"preview-info",children:[l.jsx("div",{className:"preview-info__brand",children:l.jsx(Un,{size:"sm"})}),l.jsx("div",{className:"preview-info__export",children:l.jsxs("div",{className:"export-menu",children:[l.jsx("button",{type:"button",className:"action-btn",onClick:()=>c(u=>!u),children:"↓ Export ▾"}),a&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"export-menu__backdrop",onClick:()=>c(!1)}),l.jsxs("div",{className:"export-menu__panel",children:[l.jsxs("button",{type:"button",className:"export-menu__item",onClick:()=>{i(),c(!1)},children:[l.jsx("strong",{children:"JSON"}),l.jsx("span",{children:"Project file (re-importable)"})]}),l.jsxs("button",{type:"button",className:"export-menu__item",onClick:()=>{gg(n),c(!1)},children:[l.jsx("strong",{children:"Single-file React"}),l.jsx("span",{children:"One .jsx + README — drop into any React 18+ project"})]}),l.jsxs("button",{type:"button",className:"export-menu__item",onClick:()=>{yg(n),c(!1)},children:[l.jsx("strong",{children:"Module bundle (ZIP)"}),l.jsx("span",{children:"Full puzzle/ folder + project.json + README"})]})]})]})]})}),l.jsx(he,{amplitude:4,height:14}),s?l.jsx("input",{className:"preview-info__name-input",autoFocus:!0,value:n.name??"",onChange:u=>r(u.target.value),onBlur:()=>o(!1),onKeyDown:u=>{u.key==="Enter"&&o(!1)}}):l.jsx("h1",{className:"preview-info__name",onClick:()=>o(!0),title:"Click to rename",children:n.name||"Untitled"}),l.jsxs("p",{className:"preview-info__meta",children:[l.jsxs("span",{children:[n.grid.rows,"×",n.grid.cols," grid"]}),l.jsx("span",{"aria-hidden":!0,children:" · "}),l.jsxs("span",{children:["last edited ",Od(n.updatedAt)]})]}),l.jsx(he,{amplitude:4,height:14}),l.jsxs("div",{className:"preview-info__actions",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>t("grid"),children:"⊞ Edit grid"}),l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>t("edit"),children:"✎ Edit pieces"})]}),l.jsx("p",{className:"hint",children:"Edit the grid layout, or open the Edit page to style edges and fill cells with text/images."})]})]}):null}function xg(e){const t=e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`);for(;t.length&&t[t.length-1].trim()==="";)t.pop();if(t.length===0)return[];const r=t.some(s=>s.includes("	"))?t.map(s=>s.split("	")):t.map(wg),i=r.reduce((s,o)=>Math.max(s,o.length),0);for(const s of r)for(;s.length<i;)s.push("");return r.map(s=>s.map(o=>o.trim()))}function wg(e){const t=[];let n="",r=!1;for(let i=0;i<e.length;i++){const s=e[i];r?s==='"'?e[i+1]==='"'?(n+='"',i++):r=!1:n+=s:s==='"'?r=!0:s===","?(t.push(n),n=""):n+=s}return t.push(n),t}function kg(e,{autoMerge:t=!0,cellSize:n=wd}={}){var a,c,u;const r=Ln(e.length),i=Ln(((a=e[0])==null?void 0:a.length)??1),s=Array.from({length:r},(d,h)=>Array.from({length:i},(p,v)=>`r${h}c${v}-${Sh()}`)),o={};for(let d=0;d<r;d++){let h=0;for(;h<i;){const p=((c=e[d])==null?void 0:c[h])??"";if(p===""){h++;continue}let v=h;if(t)for(;v+1<i&&(((u=e[d])==null?void 0:u[v+1])??"")==="";)v++;const x=s[d][h];for(let w=h+1;w<=v;w++)s[d][w]=x;o[x]={type:"text",text:p},h=v+1}}return{grid:{rows:r,cols:i,cellSize:n,groups:s},pieceContent:o}}function Sg(e,t){const n=xg(e);if(n.length===0)throw new Error("No data found in input");if(n.length>pt||n[0].length>pt)throw new Error(`Grid too large (max ${pt}×${pt}). Got ${n.length}×${n[0].length}.`);return kg(n,t)}const Q=64,Be=22,Ne=16;function _g({grid:e,selection:t,onSelectionChange:n,pieceColors:r,backgrounds:i,onDeleteRows:s,onDeleteCols:o}){var z,D,O,U;const a=M.useRef(null),[c,u]=M.useState(null),[d,h]=M.useState(null),[p,v]=M.useState(null),x=e.cols*Q,w=e.rows*Q,g=x+Be+Ne*2,m=w+Be+Ne*2,f=Ne+Be,y=Ne+Be,k=ls(e),_=new Set(t.map(([S,b])=>`${S},${b}`)),P=(S,b)=>{const H=a.current.getBoundingClientRect(),K=S-H.left-f,W=b-H.top-y,J=Math.floor(K/Q),V=Math.floor(W/Q);return V<0||V>=e.rows||J<0||J>=e.cols?null:[V,J]},j=(S,b,H)=>{var K,W;if(S.button===0){if(S.preventDefault(),S.shiftKey||S.ctrlKey||S.metaKey){const J=`${b},${H}`,V=new Set(_);V.has(J)?V.delete(J):V.add(J),n([...V].map(Kd=>Kd.split(",").map(Number)));return}u({startCell:[b,H],curCell:[b,H]}),n([[b,H]]),(W=(K=S.currentTarget).setPointerCapture)==null||W.call(K,S.pointerId)}};M.useEffect(()=>{if(!c)return;const S=H=>{const K=P(H.clientX,H.clientY);K&&(K[0]===c.curCell[0]&&K[1]===c.curCell[1]||(u(W=>W&&{...W,curCell:K}),n(kd([c.startCell,K]))))},b=()=>u(null);return window.addEventListener("pointermove",S),window.addEventListener("pointerup",b),()=>{window.removeEventListener("pointermove",S),window.removeEventListener("pointerup",b)}},[(z=c==null?void 0:c.startCell)==null?void 0:z[0],(D=c==null?void 0:c.startCell)==null?void 0:D[1],(O=c==null?void 0:c.curCell)==null?void 0:O[0],(U=c==null?void 0:c.curCell)==null?void 0:U[1]]);const A=(S,b)=>{const H=a.current.getBoundingClientRect(),K=S-H.left,W=b-H.top;return K>=Ne&&K<Ne+Be&&W>=y&&W<y+w?{axis:"row",idx:Math.floor((W-y)/Q)}:W>=Ne&&W<Ne+Be&&K>=f&&K<f+x?{axis:"col",idx:Math.floor((K-f)/Q)}:null},B=(S,b,H)=>{var K,W;S.button===0&&(S.preventDefault(),S.stopPropagation(),h({axis:b,marks:new Set([H])}),(W=(K=S.currentTarget).setPointerCapture)==null||W.call(K,S.pointerId))};M.useEffect(()=>{if(!d)return;const S=H=>{const K=A(H.clientX,H.clientY);!K||K.axis!==d.axis||h(W=>{if(!W||W.marks.has(K.idx))return W;const J=new Set(W.marks);return J.add(K.idx),{...W,marks:J}})},b=()=>{h(H=>{if(!H)return null;const K=[...H.marks].sort((W,J)=>W-J);return H.axis==="row"?s==null||s(K):o==null||o(K),null})};return window.addEventListener("pointermove",S),window.addEventListener("pointerup",b),()=>{window.removeEventListener("pointermove",S),window.removeEventListener("pointerup",b)}},[d==null?void 0:d.axis]);const $=[];for(const[S,b]of k)$.push({id:S,x:f+b.cMin*Q,y:y+b.rMin*Q,w:(b.cMax-b.cMin+1)*Q,h:(b.rMax-b.rMin+1)*Q,isMerged:b.cMax>b.cMin||b.rMax>b.rMin,fill:r==null?void 0:r[S],label:b.cMax>b.cMin||b.rMax>b.rMin?`${b.cMax-b.cMin+1}×${b.rMax-b.rMin+1}`:""});const C=t.map(([S,b])=>({key:`${S},${b}`,x:f+b*Q,y:y+S*Q})),N=Array.from({length:e.rows},(S,b)=>b),L=Array.from({length:e.cols},(S,b)=>b),T=(S,b)=>d&&d.axis===S&&d.marks.has(b),R=(S,b)=>!d&&p&&p.axis===S&&p.idx===b,I=new Set,X=new Set;return d?d.axis==="row"?d.marks.forEach(S=>I.add(S)):d.marks.forEach(S=>X.add(S)):p&&(p.axis==="row"?I.add(p.idx):X.add(p.idx)),l.jsx("div",{className:"grid-canvas-wrap",children:l.jsxs("svg",{ref:a,className:"grid-canvas",width:g,height:m,viewBox:`0 0 ${g} ${m}`,children:[L.map(S=>{const b=f+S*Q,H=T("col",S),K=R("col",S),W=H||K;return l.jsxs("g",{children:[l.jsx("rect",{x:b,y:Ne,width:Q,height:Be,className:`grid-canvas__header-hit ${H?"is-marked":""} ${K?"is-hovered":""}`,onPointerDown:J=>B(J,"col",S),onPointerEnter:()=>!d&&v({axis:"col",idx:S}),onPointerLeave:()=>!d&&v(null),children:l.jsxs("title",{children:["Click to delete column ",S+1]})}),W?l.jsx("text",{x:b+Q/2,y:Ne+Be/2,className:"grid-canvas__header-x",pointerEvents:"none",children:"×"}):l.jsx("text",{x:b+Q/2,y:Ne+Be/2,className:"grid-canvas__header",pointerEvents:"none",children:S+1})]},`ch-${S}`)}),N.map(S=>{const b=y+S*Q,H=T("row",S),K=R("row",S),W=H||K;return l.jsxs("g",{children:[l.jsx("rect",{x:Ne,y:b,width:Be,height:Q,className:`grid-canvas__header-hit ${H?"is-marked":""} ${K?"is-hovered":""}`,onPointerDown:J=>B(J,"row",S),onPointerEnter:()=>!d&&v({axis:"row",idx:S}),onPointerLeave:()=>!d&&v(null),children:l.jsxs("title",{children:["Click to delete row ",S+1]})}),W?l.jsx("text",{x:Ne+Be/2,y:b+Q/2,className:"grid-canvas__header-x",pointerEvents:"none",children:"×"}):l.jsx("text",{x:Ne+Be/2,y:b+Q/2,className:"grid-canvas__header",pointerEvents:"none",children:S+1})]},`rh-${S}`)}),$.map(S=>l.jsx("rect",{x:S.x,y:S.y,width:S.w,height:S.h,className:`grid-canvas__group ${S.isMerged?"grid-canvas__group--merged":""}`,style:S.fill?{fill:S.fill}:void 0,rx:"6",ry:"6"},S.id)),(i||[]).map(S=>{const b=S.rect;if(!b)return null;const H=f+b.cMin*Q,K=y+b.rMin*Q,W=(b.cMax-b.cMin+1)*Q,J=(b.rMax-b.rMin+1)*Q,V=S.fit==="cover"?"xMidYMid slice":S.fit==="contain"?"xMidYMid meet":S.fit==="fill"?"none":"xMidYMid slice";return l.jsxs("g",{className:"grid-canvas__bg",pointerEvents:"none",children:[l.jsx("image",{href:S.src,x:H,y:K,width:W,height:J,preserveAspectRatio:V}),l.jsx("rect",{x:H,y:K,width:W,height:J,className:"grid-canvas__bg-frame",rx:"4",ry:"4"})]},S.id)}),C.map(S=>l.jsx("rect",{x:S.x+2,y:S.y+2,width:Q-4,height:Q-4,className:"grid-canvas__selected",rx:"4",ry:"4",pointerEvents:"none"},S.key)),$.filter(S=>S.label).map(S=>l.jsx("text",{x:S.x+S.w/2,y:S.y+S.h/2,className:"grid-canvas__label",textAnchor:"middle",dominantBaseline:"central",pointerEvents:"none",children:S.label},`l-${S.id}`)),[...I].map(S=>l.jsx("rect",{x:f,y:y+S*Q,width:x,height:Q,className:`grid-canvas__doom ${d?"grid-canvas__doom--marked":""}`,pointerEvents:"none"},`doom-r-${S}`)),[...X].map(S=>l.jsx("rect",{x:f+S*Q,y,width:Q,height:w,className:`grid-canvas__doom ${d?"grid-canvas__doom--marked":""}`,pointerEvents:"none"},`doom-c-${S}`)),l.jsx("rect",{x:f,y,width:x,height:w,fill:"transparent",style:{cursor:"pointer"},onPointerDown:S=>{const b=P(S.clientX,S.clientY);b&&j(S,b[0],b[1])}})]})})}const Dd=[{value:"cover",label:"Cover",hint:"Fill, may crop"},{value:"contain",label:"Contain",hint:"Fit whole image"},{value:"fill",label:"Stretch",hint:"Stretch to bounds"}];function Dl(e){const t=M.useRef(null);return{inputProps:{ref:t,onChange:i=>{var o;const s=(o=i.target.files)==null?void 0:o[0];i.target.value="",s&&e(s)}},open:()=>{var i;return(i=t.current)==null?void 0:i.click()}}}function Eg({backgrounds:e,selectionRect:t,onAddImage:n,onUpdate:r,onRemove:i}){const{inputProps:s,open:o}=Dl(n);return l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Backgrounds"}),l.jsx("p",{className:"hint",children:t?`Image will fill ${t.cMax-t.cMin+1}×${t.rMax-t.rMin+1} selected cells, sliced across the underlying pieces.`:"Select cells to choose where to place the image (defaults to the full grid)."}),l.jsx("input",{...s,type:"file",accept:"image/*",hidden:!0}),l.jsxs("div",{className:"action-stack",children:[l.jsx("button",{type:"button",className:"action-btn",onClick:o,children:"↑ Upload image"}),l.jsx("p",{className:"hint",children:"Or paste an image (Ctrl+V) — it goes into the current selection."})]}),e.length>0&&l.jsx("div",{className:"bg-list",children:e.map((a,c)=>{const u=`${a.rect.cMax-a.rect.cMin+1}×${a.rect.rMax-a.rect.rMin+1}`;return l.jsxs("div",{className:"bg-item",children:[l.jsx("img",{src:a.src,alt:"",className:"bg-item__thumb"}),l.jsxs("div",{className:"bg-item__body",children:[l.jsxs("div",{className:"bg-item__head",children:[l.jsxs("span",{className:"bg-item__label",children:["#",c+1," · ",u]}),l.jsx("button",{type:"button",className:"bg-item__del",onClick:()=>i(a.id),title:"Delete this background",children:"✕"})]}),l.jsx("div",{className:"effect-chips",children:Dd.map(d=>l.jsx("button",{type:"button",className:`chip chip--sm ${(a.fit||"cover")===d.value?"chip--active":""}`,onClick:()=>r(a.id,{fit:d.value}),title:d.hint,children:d.label},d.value))})]})]},a.id)})})]})}const ic=`Logo		Theme	Language	About		How It Works		Sign In		Sign Up
Build Your Custom ERP								No Coding Required		
										
Step 1			Step 2			Step 3				`;function jg({onClose:e,onImport:t}){const[n,r]=M.useState(""),[i,s]=M.useState(!0),o=()=>{n.trim()&&t(n,{autoMerge:i})};return l.jsx("div",{className:"modal-backdrop",onClick:e,children:l.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[l.jsxs("header",{className:"modal__head",children:[l.jsx("h2",{className:"modal__title",children:"Import grid data"}),l.jsx("button",{type:"button",className:"modal__close",onClick:e,"aria-label":"Close",children:"✕"})]}),l.jsxs("div",{className:"modal__body",children:[l.jsx("p",{className:"hint",children:"Paste tab-separated (from Excel/Google Sheets) or comma-separated data. Each non-empty cell becomes a piece."}),l.jsx("textarea",{className:"modal__textarea",placeholder:ic,value:n,onChange:a=>r(a.target.value),spellCheck:!1,autoFocus:!0}),l.jsxs("label",{className:"modal__check",children:[l.jsx("input",{type:"checkbox",checked:i,onChange:a=>s(a.target.checked)}),l.jsx("span",{children:"Auto-merge horizontal runs (extend each cell to the right over empties)"})]})]}),l.jsxs("footer",{className:"modal__foot",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:()=>r(ic),children:"Insert sample"}),l.jsx("div",{style:{flex:1}}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:e,children:"Cancel"}),l.jsx("button",{type:"button",className:"action-btn action-btn--primary",disabled:!n.trim(),onClick:o,children:"Import"})]})]})})}function Xe({label:e,min:t,max:n,step:r=1,value:i,onChange:s,format:o,parse:a}){const[c,u]=M.useState(!1),[d,h]=M.useState("");M.useEffect(()=>{c||h(o?o(i):String(i))},[i,c,o]);const p=()=>{const x=a?a(d):parseFloat(d);if(Number.isFinite(x)){const w=Math.min(n,Math.max(t,x));s(w)}u(!1)},v=()=>{h(o?o(i):String(i)),u(!1)};return l.jsxs("label",{className:"slider-control",children:[l.jsx("span",{className:"slider-control__label",children:e}),l.jsx("input",{type:"range",min:t,max:n,step:r,value:i,onChange:x=>s(Number(x.target.value))}),l.jsx("input",{type:"text",inputMode:"decimal",className:"slider-control__input",value:c?d:o?o(i):String(i),onFocus:x=>{u(!0),h(String(i)),x.target.select()},onChange:x=>h(x.target.value),onBlur:p,onKeyDown:x=>{x.key==="Enter"?x.currentTarget.blur():x.key==="Escape"?(v(),x.currentTarget.blur()):x.key==="ArrowUp"?(x.preventDefault(),s(Math.min(n,i+r))):x.key==="ArrowDown"&&(x.preventDefault(),s(Math.max(t,i-r)))}})]})}const Cg=.2,Ng=5,zg=.0015;function Bd({children:e,...t}){const n=M.useRef(null),[r,i]=M.useState(1),[s,o]=M.useState(0),[a,c]=M.useState(0),u=M.useRef({active:!1,startX:0,startY:0,baseTx:0,baseTy:0}),d=M.useCallback(g=>{g.preventDefault();const m=n.current.getBoundingClientRect(),f=g.clientX-m.left,y=g.clientY-m.top,k=Math.exp(-g.deltaY*zg);i(_=>{const P=Math.max(Cg,Math.min(Ng,_*k)),j=P/_;return o(A=>f-(f-A)*j),c(A=>y-(y-A)*j),P})},[]);M.useEffect(()=>{const g=n.current;if(g)return g.addEventListener("wheel",d,{passive:!1}),()=>g.removeEventListener("wheel",d)},[d]);const h=g=>{const m=g.button===1,f=g.button===0&&(g.ctrlKey||g.metaKey);!m&&!f||(g.preventDefault(),u.current={active:!0,startX:g.clientX,startY:g.clientY,baseTx:s,baseTy:a},g.currentTarget.setPointerCapture(g.pointerId))},p=g=>{if(!u.current.active)return;const{startX:m,startY:f,baseTx:y,baseTy:k}=u.current;o(y+(g.clientX-m)),c(k+(g.clientY-f))},v=g=>{if(u.current.active&&(g.button===1||g.button===0)){u.current.active=!1;try{g.currentTarget.releasePointerCapture(g.pointerId)}catch{}}},x=g=>{g.button===1&&g.preventDefault()},w=()=>{i(1),o(0),c(0)};return l.jsxs("section",{className:"view-panel",children:[l.jsxs("div",{className:"view-panel__hud",children:[l.jsxs("span",{className:"view-panel__zoom",children:[Math.round(r*100),"%"]}),l.jsx("button",{type:"button",className:"view-panel__reset",onClick:w,title:"Reset view",children:"Reset View"}),l.jsx("span",{className:"view-panel__hint",children:"Scroll to zoom · Middle-drag or Ctrl+drag to pan"})]}),l.jsx("div",{ref:n,className:`view-panel__surface ${u.current.active?"is-panning":""}`,onPointerDown:h,onPointerMove:p,onPointerUp:v,onPointerCancel:v,onAuxClick:x,children:l.jsx("div",{className:"view-panel__transform",style:{transform:`translate(${s}px, ${a}px) scale(${r})`,transformOrigin:"0 0"},children:e??l.jsx(ln,{...t})})})]})}const Pg=["#d68b54","#e6a378","#c87070","#d4a056","#a98ec4","#5fb68f","#7fc9a6","#5b8c85","#6b9bd1","#a3a3a3"];function bg({project:e}){const{project:t,setGrid:n,merge:r,unmerge:i,setPieceColor:s,replaceGrid:o,removeRows:a,removeCols:c,addBackground:u,updateBackground:d,removeBackground:h}=e,[p,v]=M.useState([]),[x,w]=M.useState(!1),g=M.useMemo(()=>{if(p.length===0)return null;let L=1/0,T=-1/0,R=1/0,I=-1/0;for(const[X,z]of p)X<L&&(L=X),X>T&&(T=X),z<R&&(R=z),z>I&&(I=z);return{rMin:L,rMax:T,cMin:R,cMax:I}},[p]),m=L=>{if(!L)return;const T=new FileReader;T.onload=R=>{const I=g??{rMin:0,rMax:((t==null?void 0:t.grid.rows)??1)-1,cMin:0,cMax:((t==null?void 0:t.grid.cols)??1)-1};u({src:R.target.result,rect:I,fit:"cover"})},T.readAsDataURL(L)};M.useEffect(()=>{const L=T=>{var I;const R=(I=T.clipboardData)==null?void 0:I.items;if(R){for(const X of R)if(X.type&&X.type.startsWith("image/")){T.preventDefault();const z=X.getAsFile();z&&m(z);return}}};return document.addEventListener("paste",L),()=>document.removeEventListener("paste",L)},[g,t==null?void 0:t.grid.rows,t==null?void 0:t.grid.cols]);const f=(L,T)=>{try{const{grid:R,pieceContent:I}=Sg(L,T);o(R,I),w(!1),v([])}catch(R){alert("Import failed: "+R.message)}},k=Dl(async L=>{if(L)try{const T=await L.text();f(T,{autoMerge:!0})}catch(T){alert("Could not read file: "+T.message)}});if(!t)return null;const _=p.length>=2&&Ir(p),P=p.length>=1,j=M.useMemo(()=>{var T;const L=new Set;for(const[R,I]of p){const X=(T=t.grid.groups[R])==null?void 0:T[I];X&&L.add(X)}return[...L]},[p,t.grid.groups]),A=M.useMemo(()=>{var T;if(j.length===0)return null;const L=((T=t.pieceColors)==null?void 0:T[j[0]])??null;return j.every(R=>{var I;return(((I=t.pieceColors)==null?void 0:I[R])??null)===L})?L:null},[j,t.pieceColors]),B=L=>{for(const T of j)s(T,L)},$=()=>{_&&(r(p),v([]))},C=()=>{P&&(i(p),v([]))},N=()=>v([]);return l.jsxs("div",{className:"page-grid",children:[l.jsxs("aside",{className:"side-tools",children:[l.jsx("div",{className:"side-tools__brand",children:l.jsx(Un,{size:"sm"})}),l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Dimensions"}),l.jsx(Xe,{label:"Rows",min:$n,max:pt,value:t.grid.rows,onChange:L=>n({rows:L})}),l.jsx(Xe,{label:"Cols",min:$n,max:pt,value:t.grid.cols,onChange:L=>n({cols:L})}),l.jsxs("p",{className:"hint",children:[t.grid.rows," × ",t.grid.cols," cells (max ",pt,"×",pt,")."]})]}),l.jsx(he,{amplitude:3,height:10}),l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Import"}),l.jsx("p",{className:"hint",children:"Paste a spreadsheet, or import a CSV file."}),l.jsxs("div",{className:"action-stack",children:[l.jsx("button",{type:"button",className:"action-btn",onClick:()=>w(!0),children:"⎘ Paste data"}),l.jsx("input",{...k.inputProps,type:"file",accept:".csv,.tsv,.txt,text/csv",hidden:!0}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:k.open,children:"↑ Import CSV/TSV file"})]}),l.jsx("p",{className:"hint hint--warn",children:"Importing replaces the current grid."})]}),l.jsx(he,{amplitude:3,height:10}),l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Selection"}),l.jsx("p",{className:"hint",children:p.length===0?"Drag across cells, or click + Shift to add cells.":`${p.length} cell${p.length===1?"":"s"} selected.`}),l.jsxs("div",{className:"action-stack",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--primary",disabled:!_,onClick:$,title:_?"Merge selected cells":"Selection must form a complete rectangle",children:"⊞ Merge"}),l.jsx("button",{type:"button",className:"action-btn",disabled:!P,onClick:C,children:"⊟ Unmerge"}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",disabled:p.length===0,onClick:N,children:"Clear selection"})]}),p.length>=2&&!_&&l.jsx("p",{className:"hint hint--warn",children:"Selection isn't rectangular — merge requires every cell in a complete rectangle."})]}),l.jsx(he,{amplitude:3,height:10}),j.length>0&&l.jsxs("section",{className:"card",children:[l.jsxs("h3",{className:"card__title",children:["Color ",j.length>1?`(${j.length} pieces)`:""]}),l.jsxs("div",{className:"color-grid",children:[l.jsx("button",{type:"button",className:`color-swatch color-swatch--clear ${A==null?"color-swatch--active":""}`,onClick:()=>B(null),title:"Clear color","aria-label":"Clear color"}),Pg.map(L=>l.jsx("button",{type:"button",className:`color-swatch ${A===L?"color-swatch--active":""}`,style:{background:L},onClick:()=>B(L),title:L,"aria-label":`Color ${L}`},L)),l.jsx("label",{className:"color-swatch color-swatch--custom",title:"Custom color",children:l.jsx("input",{type:"color",value:A||"#888888",onChange:L=>B(L.target.value)})})]})]}),j.length>0&&l.jsx(he,{amplitude:3,height:10}),l.jsx(Eg,{backgrounds:t.backgrounds||[],selectionRect:g,onAddImage:m,onUpdate:d,onRemove:h}),l.jsx(he,{amplitude:3,height:10}),l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Tips"}),l.jsxs("ul",{className:"tip-list",children:[l.jsx("li",{children:"Drag from any cell to box-select."}),l.jsx("li",{children:"Shift-click to add or remove individual cells."}),l.jsxs("li",{children:[l.jsx("strong",{children:"Click a row/column number"})," to delete it. Drag across multiple to delete in bulk."]}),l.jsx("li",{children:"Merged groups show their dimensions."}),l.jsx("li",{children:"Click any number value to type it directly."}),l.jsxs("li",{children:[l.jsx("strong",{children:"Scroll"})," to zoom; middle-drag or Ctrl+drag to pan."]}),l.jsxs("li",{children:["Select cells, then ",l.jsx("strong",{children:"paste an image"})," (Ctrl+V) to span it across them."]})]})]})]}),l.jsx(Bd,{children:l.jsx(_g,{grid:t.grid,selection:p,onSelectionChange:v,pieceColors:t.pieceColors,backgrounds:t.backgrounds,onDeleteRows:L=>{a(L),v([])},onDeleteCols:L=>{c(L),v([])}})}),x&&l.jsx(jg,{onClose:()=>w(!1),onImport:f})]})}function Mg(){return l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Per-edge override"}),l.jsxs("p",{className:"hint",children:["Click an edge in the canvas to give it its own effect.",l.jsx("br",{}),"Shift-click to select multiple edges and edit them together."]})]})}const qe={frequency:.025,amplitude:12,phase:0},oe="__mixed__",Bl=e=>e.charAt(0).toUpperCase()+e.slice(1);function Ul({config:e,onPatchConfig:t}){const n=(e==null?void 0:e.color)===oe,r=(e==null?void 0:e.opacity)===oe,i=(e==null?void 0:e.strokeWidth)===oe,s=typeof(e==null?void 0:e.color)=="string"&&e.color!==oe?e.color:"#888888",o=typeof(e==null?void 0:e.color)=="string"&&e.color!==oe;return l.jsxs("div",{className:"style-controls",children:[l.jsxs("div",{className:"form-row",children:[l.jsx("label",{className:"form-row__label",children:"Color"}),l.jsx("input",{type:"color",className:"form-row__color",value:s,onChange:a=>t({color:a.target.value})}),o?l.jsx("button",{type:"button",className:"link-btn",onClick:()=>t({color:void 0}),children:"reset"}):l.jsx("span",{className:"hint",style:{marginLeft:4},children:n?"mixed":"theme"})]}),l.jsx(Xe,{label:"Opacity",min:0,max:1,step:.01,value:r?1:(e==null?void 0:e.opacity)??1,format:a=>`${Math.round(a*100)}%`,onChange:a=>t({opacity:a})}),l.jsx(Xe,{label:"Width",min:0,max:10,step:.25,value:i?1.25:(e==null?void 0:e.strokeWidth)??1.25,format:a=>`${a}px`,onChange:a=>t({strokeWidth:a})})]})}function $r({catalogue:e,inheritedEffects:t={},ownEffects:n={},onChange:r,mixed:i=!1}){const s=Ag(t,n),o=new Map;for(const p of Object.values(s))(!p||!o.has(p.id))&&p&&o.set(p.id,p);const a=p=>o.has(p),c=(p,v=n)=>{var w;const x={...v};for(const g of Object.keys(x))x[g]&&x[g].id===p&&delete x[g];for(const g of Object.keys(t))((w=t[g])==null?void 0:w.id)===p&&(x[g]=null);return x},u=p=>{var m;if(a(p)){r(c(p));return}const v=e[p];if(!v)return;const x=hm(e,p),w=ei(p,x.trigger);let g={...n};for(const f of o.values())((m=e[f.id])==null?void 0:m.group)===v.group&&(g=c(f.id,g));g[w]=x,r(g)},d=(p,v)=>{const x=ei(p.id,p.trigger),w=ei(p.id,v);if(x===w)return;const g={...n};t[x]?g[x]=null:delete g[x],g[w]={...p,trigger:v},r(g)},h=(p,v,x)=>{const w=ei(p.id,p.trigger),g={...p.config||{},[v]:x};r({...n,[w]:{...p,config:g}})};return l.jsxs("div",{className:"effects-picker",children:[l.jsxs("div",{className:"effect-chips",children:[Object.entries(e).map(([p,v])=>l.jsx("button",{type:"button",title:v.label,className:`chip chip--sm ${a(p)&&!i?"chip--active":""}`,onClick:()=>u(p),children:v.label},p)),i&&l.jsx("span",{className:"chip chip--sm chip--mixed",children:"mixed"})]}),!i&&[...o.values()].map(p=>{const v=e[p.id];if(!v)return null;const x=Object.keys(v.config||{}).length>0,w=(v.triggers||[]).length>1;return!w&&!x?null:l.jsxs("div",{className:"effect-active-row",children:[l.jsxs("div",{className:"effect-active-row__head",children:[l.jsx("span",{className:"effect-active-row__name",children:v.label}),l.jsx("button",{type:"button",className:"link-btn",onClick:()=>u(p.id),children:"remove"})]}),w&&l.jsxs("div",{className:"form-row form-row--stack",children:[l.jsx("label",{className:"form-row__label",children:"When"}),l.jsx("div",{className:"effect-chips",children:v.triggers.map(g=>l.jsx("button",{type:"button",className:`chip chip--sm ${p.trigger===g?"chip--active":""}`,onClick:()=>d(p,g),children:pm[g]||g},g))})]}),Object.entries(v.config||{}).map(([g,m])=>{var f;return l.jsx(Xe,{label:m.label,min:m.min,max:m.max,step:m.step,value:((f=p.config)==null?void 0:f[g])??m.default,format:y=>`${y}${m.unit||""}`,onChange:y=>h(p,g,y)},g)})]},p.id)})]})}function Ag(e,t){const n={...e};for(const[r,i]of Object.entries(t||{}))i===null?delete n[r]:n[r]=i;return n}function Bs({title:e,hint:t,effect:n,config:r,active:i,onSetEffect:s,onPatchConfig:o,onClear:a,ownEffects:c={},inheritedEffects:u={},onChangeEffects:d}){return l.jsxs("section",{className:`card ${i?"card--accent":""}`,children:[l.jsxs("div",{className:"card__row",children:[l.jsx("h3",{className:"card__title",children:e}),a&&l.jsx("button",{type:"button",className:"link-btn",onClick:a,children:"use default"})]}),t&&l.jsx("p",{className:"hint",children:t}),l.jsx("div",{className:"effect-chips",children:Bn.map(h=>l.jsx("button",{type:"button",className:`chip chip--sm ${n===h?"chip--active":""}`,onClick:()=>s(h),children:Bl(h)},h))}),n==="wave"&&l.jsxs("div",{className:"wave-config",children:[l.jsx(Xe,{label:"Freq",min:.005,max:.1,step:.001,value:(r==null?void 0:r.frequency)??qe.frequency,format:h=>h.toFixed(3),onChange:h=>o({frequency:h})}),l.jsx(Xe,{label:"Amp",min:0,max:40,step:1,value:(r==null?void 0:r.amplitude)??qe.amplitude,onChange:h=>o({amplitude:h})})]}),l.jsx(Ul,{config:r,onPatchConfig:o}),d&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"form-row form-row--stack",children:l.jsx("label",{className:"form-row__label",children:"Edge effects"})}),l.jsx($r,{catalogue:ds,ownEffects:c,inheritedEffects:u,onChange:d})]})]})}function Tg({selected:e,project:t,pieces:n,sharedEdges:r,onClearSelection:i,setEdgeEffect:s,setEdgeConfig:o,clearEdgeOverride:a,setEdgeEffects:c}){var P,j,A,B,$;const u=M.useMemo(()=>new Map(n.map(C=>[C.id,C])),[n]),d=t.edges.default.effect,h=t.edges.default.config??qe,p=t.edges.inner,v=t.edges.outer,x=t.edges.byPiece||{},w=C=>{const N=t.edges.byEdge[C],T=C.includes("||outer-")?v:p;let R=null;for(const I of Ja(C))if(x[I]){R=x[I];break}return{effect:(N==null?void 0:N.effect)??(R==null?void 0:R.effect)??(T==null?void 0:T.effect)??d,cfg:(N==null?void 0:N.config)??(R==null?void 0:R.config)??(T==null?void 0:T.config)??h}},g=M.useMemo(()=>{if(e.size===0)return null;let C=null,N=null,L=!0;for(const T of e){const{effect:R,cfg:I}=w(T);L?(C=R,N=I,L=!1):(R!==C&&(C=oe),(N==null?void 0:N.frequency)!==(I==null?void 0:I.frequency)&&(N={...N,frequency:oe}),(N==null?void 0:N.amplitude)!==(I==null?void 0:I.amplitude)&&(N={...N,amplitude:oe}),(N==null?void 0:N.inverted)!==(I==null?void 0:I.inverted)&&(N={...N,inverted:oe}),(N==null?void 0:N.color)!==(I==null?void 0:I.color)&&(N={...N,color:oe}),(N==null?void 0:N.opacity)!==(I==null?void 0:I.opacity)&&(N={...N,opacity:oe}),(N==null?void 0:N.strokeWidth)!==(I==null?void 0:I.strokeWidth)&&(N={...N,strokeWidth:oe}),(N==null?void 0:N.hoverAnimation)!==(I==null?void 0:I.hoverAnimation)&&(N={...N,hoverAnimation:oe}))}return{effect:C,cfg:N}},[e,t.edges.byEdge,x,d,h,p,v]),m=C=>{const N=C==="wave"?g!=null&&g.cfg&&g.cfg.frequency!==oe&&g.cfg.amplitude!==oe?g.cfg:h:void 0;for(const L of e)s(L,C,N)},f=C=>{for(const N of e)o(N,C)},y=()=>{for(const C of e)a(C)},k=(g==null?void 0:g.effect)==="puzzle"||(g==null?void 0:g.effect)===oe&&[...e].some(C=>w(C).effect==="puzzle"),_=(g==null?void 0:g.effect)==="wave"||(g==null?void 0:g.effect)===oe&&[...e].some(C=>w(C).effect==="wave");return l.jsxs("section",{className:"card card--accent",children:[l.jsxs("div",{className:"card__row",children:[l.jsx("h3",{className:"card__title",children:e.size===1?"Selected edge":`${e.size} edges selected`}),l.jsx("button",{type:"button",className:"link-btn",onClick:i,children:"clear"})]}),e.size===1&&(()=>{var L,T;const C=[...e][0],N=r.find(R=>R.pairKey===C);return N?l.jsxs("p",{className:"hint",children:[((L=u.get(N.pieceAId))==null?void 0:L.label)??N.pieceAId," ↔ ",((T=u.get(N.pieceBId))==null?void 0:T.label)??N.pieceBId]}):null})(),l.jsxs("div",{className:"effect-chips",children:[Bn.map(C=>l.jsx("button",{type:"button",className:`chip chip--sm ${(g==null?void 0:g.effect)===C?"chip--active":""}`,onClick:()=>m(C),children:Bl(C)},C)),(g==null?void 0:g.effect)===oe&&l.jsx("span",{className:"chip chip--sm chip--mixed",children:"mixed"})]}),k&&l.jsx("div",{className:"puzzle-config",children:l.jsxs("button",{type:"button",className:`invert-tabs-btn ${((P=g==null?void 0:g.cfg)==null?void 0:P.inverted)===!0?"invert-tabs-btn--active":""}`,onClick:()=>{var C;return f({inverted:((C=g==null?void 0:g.cfg)==null?void 0:C.inverted)!==!0})},title:"Toggle tab/socket orientation",children:[l.jsx("span",{className:"invert-tabs-btn__icon",children:"⟷"}),l.jsx("span",{children:"Invert"})]})}),_&&l.jsxs("div",{className:"wave-config",children:[l.jsx(Xe,{label:"Freq",min:.005,max:.1,step:.001,value:((j=g==null?void 0:g.cfg)==null?void 0:j.frequency)===oe?h.frequency??qe.frequency:((A=g==null?void 0:g.cfg)==null?void 0:A.frequency)??qe.frequency,format:C=>{var N;return((N=g==null?void 0:g.cfg)==null?void 0:N.frequency)===oe?`· ${C.toFixed(3)}`:C.toFixed(3)},onChange:C=>f({frequency:C})}),l.jsx(Xe,{label:"Amp",min:0,max:40,step:1,value:((B=g==null?void 0:g.cfg)==null?void 0:B.amplitude)===oe?h.amplitude??qe.amplitude:(($=g==null?void 0:g.cfg)==null?void 0:$.amplitude)??qe.amplitude,format:C=>{var N;return((N=g==null?void 0:g.cfg)==null?void 0:N.amplitude)===oe?`· ${C}`:`${C}`},onChange:C=>f({amplitude:C})})]}),l.jsx(Ul,{config:g==null?void 0:g.cfg,onPatchConfig:f}),c&&(()=>{var D,O;const C=[...e],N=C[0],L=N.includes("||outer-"),T=((D=t.edges.byEdge[N])==null?void 0:D.effects)||{},R=L?t.edges.outer:t.edges.inner,I=Ja(N).map(U=>{var S,b;return(b=(S=t.edges.byPiece)==null?void 0:S[U])==null?void 0:b.effects}).filter(Boolean),X=Ig((O=t.edges.default)==null?void 0:O.effects,R==null?void 0:R.effects,...I),z=C.length>1&&C.some(U=>{var S;return!$g(((S=t.edges.byEdge[U])==null?void 0:S.effects)||{},T)});return l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"form-row form-row--stack",children:l.jsx("label",{className:"form-row__label",children:"Edge effects"})}),l.jsx($r,{catalogue:ds,ownEffects:T,inheritedEffects:X,mixed:z,onChange:U=>{for(const S of C)c(S,U)}})]})})(),l.jsx("div",{className:"action-stack",children:l.jsxs("button",{type:"button",className:"action-btn action-btn--ghost",onClick:y,children:["Reset ",e.size===1?"this edge":`these ${e.size} edges`," to default"]})})]})}function Ig(...e){const t={};for(const n of e)if(n)for(const[r,i]of Object.entries(n))i===null?delete t[r]:t[r]=i;return t}function $g(e,t){return JSON.stringify(e)===JSON.stringify(t)}function Lg({piece:e,project:t,onClearSelection:n,setPieceEdgeEffect:r,setPieceEdgeConfig:i,clearPieceEdgeOverride:s,setPieceEdgeEffects:o}){var w;const a=t.edges.default.effect,c=t.edges.default.config??qe,u=((w=t.edges.byPiece)==null?void 0:w[e.id])||null,d=(u==null?void 0:u.effect)??a,h=(u==null?void 0:u.config)??c,p=g=>{const m=g==="wave"?(u==null?void 0:u.config)??c:void 0;r(e.id,g,m)},v=g=>i(e.id,g),x=()=>s(e.id);return l.jsxs("section",{className:"card card--accent",children:[l.jsxs("div",{className:"card__row",children:[l.jsx("h3",{className:"card__title",children:e.label||"Selected piece"}),l.jsx("button",{type:"button",className:"link-btn",onClick:n,children:"clear"})]}),l.jsx("p",{className:"hint",children:u?"Cell override applies to every edge of this piece. Per-edge picks still win.":"Pick an effect to override every edge of this piece at once."}),l.jsx("div",{className:"effect-chips",children:Bn.map(g=>l.jsx("button",{type:"button",className:`chip chip--sm ${d===g?"chip--active":""}`,onClick:()=>p(g),children:Bl(g)},g))}),d==="puzzle"&&l.jsx("div",{className:"puzzle-config",children:l.jsxs("button",{type:"button",className:`invert-tabs-btn ${(h==null?void 0:h.inverted)===!0?"invert-tabs-btn--active":""}`,onClick:()=>v({inverted:(h==null?void 0:h.inverted)!==!0}),title:"Toggle tab/socket orientation",children:[l.jsx("span",{className:"invert-tabs-btn__icon",children:"⟷"}),l.jsx("span",{children:"Invert"})]})}),d==="wave"&&l.jsxs("div",{className:"wave-config",children:[l.jsx(Xe,{label:"Freq",min:.005,max:.1,step:.001,value:(h==null?void 0:h.frequency)??qe.frequency,format:g=>g.toFixed(3),onChange:g=>v({frequency:g})}),l.jsx(Xe,{label:"Amp",min:0,max:40,step:1,value:(h==null?void 0:h.amplitude)??qe.amplitude,onChange:g=>v({amplitude:g})})]}),l.jsx(Ul,{config:h,onPatchConfig:v}),o&&(()=>{var f,y,k;const g=((y=(f=t.edges.byPiece)==null?void 0:f[e.id])==null?void 0:y.effects)||{},m=((k=t.edges.default)==null?void 0:k.effects)||{};return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"form-row form-row--stack",children:[l.jsx("label",{className:"form-row__label",children:"Edge effects"}),l.jsx("p",{className:"hint",style:{margin:0},children:"Applies to every edge of this piece. Per-edge picks still win."})]}),l.jsx($r,{catalogue:ds,ownEffects:g,inheritedEffects:m,onChange:_=>o(e.id,_)})]})})(),u&&l.jsx("div",{className:"action-stack",children:l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:x,children:"Reset this piece's edges to default"})})]})}function Og({project:e,pieces:t,sharedEdges:n,allEdges:r,selected:i,onClearEdgeSelection:s,setEdgeEffect:o,setEdgeConfig:a,clearEdgeOverride:c,resetEdgeOverrides:u,selectedPiece:d,onClearPieceSelection:h,setPieceEdgeEffect:p,setPieceEdgeConfig:v,clearPieceEdgeOverride:x,setDefaultEdgeEffect:w,setDefaultEdgeConfig:g,setLayerEffect:m,setLayerConfig:f,clearLayer:y,setDefaultEdgeEffects:k,setLayerEffects:_,setPieceEdgeEffects:P,setEdgeEffects:j}){var W,J;const A=e.edges.default.effect,B=e.edges.default.config??qe,$=e.edges.inner,C=e.edges.outer,N=Object.keys(e.edges.byEdge).length,L=Object.keys(e.edges.byPiece||{}).length,T=e.edges.default.effects||{},R=((W=e.edges.inner)==null?void 0:W.effects)||{},I=((J=e.edges.outer)==null?void 0:J.effects)||{},X=i.size>0,z=!!d,D=X?[...i].some(V=>!V.includes("||outer-")):z?r.some(V=>!V.isOuter&&(V.pieceAId===d.id||V.pieceBId===d.id)):!1,O=X?[...i].some(V=>V.includes("||outer-")):z?r.some(V=>V.isOuter&&V.pieceId===d.id):!1,U=l.jsx(Bs,{title:"Default effect",hint:"Applied to every edge unless overridden below.",effect:A,config:B,onSetEffect:V=>w(V,V==="wave"?B:void 0),onPatchConfig:g,ownEffects:T,inheritedEffects:{},onChangeEffects:k}),S=l.jsx(Bs,{title:"Inner edges",hint:$?"Override applied to every shared edge. Cell + per-edge picks still win.":"No override — inner edges follow the default. Pick an effect to override.",effect:($==null?void 0:$.effect)??A,config:($==null?void 0:$.config)??B,active:!!$,onSetEffect:V=>m("inner",V,V==="wave"?($==null?void 0:$.config)??B:void 0),onPatchConfig:V=>f("inner",V),onClear:$?()=>y("inner"):null,ownEffects:R,inheritedEffects:T,onChangeEffects:V=>_("inner",V)}),b=l.jsx(Bs,{title:"Outer edges",hint:C?"Override applied to every outer edge. Cell + per-edge picks still win.":"No override — outer edges follow the default. Pick an effect to override.",effect:(C==null?void 0:C.effect)??A,config:(C==null?void 0:C.config)??B,active:!!C,onSetEffect:V=>m("outer",V,V==="wave"?(C==null?void 0:C.config)??B:void 0),onPatchConfig:V=>f("outer",V),onClear:C?()=>y("outer"):null,ownEffects:I,inheritedEffects:T,onChangeEffects:V=>_("outer",V)}),H=X?l.jsx(Tg,{selected:i,project:e,pieces:t,sharedEdges:n,onClearSelection:s,setEdgeEffect:o,setEdgeConfig:a,clearEdgeOverride:c,setEdgeEffects:j}):z?l.jsx(Lg,{piece:d,project:e,onClearSelection:h,setPieceEdgeEffect:p,setPieceEdgeConfig:v,clearPieceEdgeOverride:x,setPieceEdgeEffects:P}):l.jsx(Mg,{}),K=N>0||L>0;return l.jsxs(l.Fragment,{children:[H,l.jsx(he,{amplitude:3,height:10}),!X&&!z&&U,D&&S,O&&b,(X||z)&&U,K&&l.jsx("div",{className:"action-stack",children:l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:u,children:"Clear all overrides"})})]})}const Fg=[{value:"left",label:"⇤"},{value:"center",label:"↔"},{value:"right",label:"⇥"}];function Rg({project:e,selectedPiece:t,onClearSelection:n,setPieceContent:r,updatePieceContent:i,setDefaultCellEffects:s,setCellEffects:o}){var c,u;const a=((u=(c=e==null?void 0:e.cells)==null?void 0:c.default)==null?void 0:u.effects)||{};return l.jsxs(l.Fragment,{children:[l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Default cell hover"}),l.jsx("p",{className:"hint",children:"Applied to every piece unless overridden in its own card."}),l.jsx($r,{catalogue:Fl,ownEffects:a,inheritedEffects:{},onChange:s})]}),t?l.jsx(Dg,{piece:t,project:e,onClearSelection:n,setPieceContent:r,updatePieceContent:i,setCellEffects:o}):l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Selected cell"}),l.jsx("p",{className:"hint",children:"Click a piece in the canvas to edit its content + cell effects."})]})]})}function Dg({piece:e,project:t,onClearSelection:n,setPieceContent:r,updatePieceContent:i,setCellEffects:s}){var v,x,w,g,m;const o=e.content||null,a=((x=(v=t==null?void 0:t.cells)==null?void 0:v.default)==null?void 0:x.effects)||{},c=((m=(g=(w=t==null?void 0:t.cells)==null?void 0:w.byPiece)==null?void 0:g[e.id])==null?void 0:m.effects)||{},u=f=>{if(f==="none")return r(e.id,null);if(f==="text")return r(e.id,{type:"text",text:(o==null?void 0:o.text)||""});if(f==="image")return r(e.id,{type:"image",src:(o==null?void 0:o.src)||"",fit:(o==null?void 0:o.fit)||"cover"})},d=f=>{if(!f)return;const y=new FileReader;y.onload=k=>{i(e.id,{type:"image",src:k.target.result,fit:(o==null?void 0:o.fit)||"cover"})},y.readAsDataURL(f)},{inputProps:h,open:p}=Dl(d);return l.jsxs("section",{className:"card card--accent",children:[l.jsxs("div",{className:"card__row",children:[l.jsx("h3",{className:"card__title",children:e.label||e.id}),l.jsx("button",{type:"button",className:"link-btn",onClick:n,children:"clear"})]}),l.jsx("div",{className:"effect-chips",children:[{v:"none",l:"Empty"},{v:"text",l:"Text"},{v:"image",l:"Image"}].map(f=>l.jsx("button",{type:"button",className:`chip chip--sm ${((o==null?void 0:o.type)||"none")===f.v?"chip--active":""}`,onClick:()=>u(f.v),children:f.l},f.v))}),(o==null?void 0:o.type)==="text"&&l.jsxs("div",{className:"content-config",children:[l.jsx("textarea",{className:"modal__textarea",style:{minHeight:80},placeholder:"Enter text…",value:o.text||"",onChange:f=>i(e.id,{text:f.target.value})}),l.jsxs("div",{className:"form-row",children:[l.jsx("label",{className:"form-row__label",children:"Align"}),l.jsx("div",{className:"effect-chips",children:Fg.map(f=>l.jsx("button",{type:"button",className:`chip chip--sm ${(o.align||"center")===f.value?"chip--active":""}`,onClick:()=>i(e.id,{align:f.value}),title:f.value,children:f.label},f.value))})]}),l.jsx(Xe,{label:"Size",min:8,max:64,step:1,value:Math.round(o.fontSize||Math.min(e.w,e.h)/8),onChange:f=>i(e.id,{fontSize:f})}),l.jsxs("div",{className:"form-row",children:[l.jsx("label",{className:"form-row__label",children:"Color"}),l.jsx("input",{type:"color",className:"form-row__color",value:o.color||"#ede8de",onChange:f=>i(e.id,{color:f.target.value})})]})]}),(o==null?void 0:o.type)==="image"&&l.jsxs("div",{className:"content-config",children:[l.jsx("input",{...h,type:"file",accept:"image/*",hidden:!0}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:p,children:o.src?"Replace image":"↑ Upload image"}),o.src&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"image-preview",children:l.jsx("img",{src:o.src,alt:"preview"})}),l.jsxs("div",{className:"form-row",children:[l.jsx("label",{className:"form-row__label",children:"Fit"}),l.jsx("div",{className:"effect-chips",children:Dd.map(f=>l.jsx("button",{type:"button",className:`chip chip--sm ${(o.fit||"cover")===f.value?"chip--active":""}`,onClick:()=>i(e.id,{fit:f.value}),title:f.hint,children:f.label},f.value))})]})]})]}),l.jsxs("div",{className:"form-row form-row--stack",children:[l.jsx("label",{className:"form-row__label",children:"Cell effects"}),l.jsx("p",{className:"hint",style:{margin:0},children:"Compose with the default tier above. Use chips to add / remove."})]}),l.jsx($r,{catalogue:Fl,inheritedEffects:a,ownEffects:c,onChange:f=>s(e.id,f)}),l.jsx("div",{className:"action-stack",children:l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:()=>r(e.id,null),disabled:!o,children:"Clear content"})})]})}const Bg=60;function Ug(e,t,n,r=Bg){if(e.length===0)return{x:0,y:0,w:1,h:1};const i=e.reduce((s,o)=>{const a=us(o,e,t,n);return{minX:Math.min(s.minX,a.minX),minY:Math.min(s.minY,a.minY),maxX:Math.max(s.maxX,a.maxX),maxY:Math.max(s.maxY,a.maxY)}},{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0});return{x:i.minX-r,y:i.minY-r,w:i.maxX-i.minX+r*2,h:i.maxY-i.minY+r*2}}const Do=24,sc=Do/2,si=60;function oc(e,t,n){if(n==="right"||n==="left"){const o=n==="right"?e.x+e.w:e.x,a=t?Math.max(e.y,t.y):e.y,c=t?Math.min(e.y+e.h,t.y+t.h):e.y+e.h;return{isVertical:!0,x:o-sc,y:a,w:Do,h:c-a,lx1:o,ly1:a,lx2:o,ly2:c}}const r=n==="bottom"?e.y+e.h:e.y,i=t?Math.max(e.x,t.x):e.x,s=t?Math.min(e.x+e.w,t.x+t.w):e.x+e.w;return{isVertical:!1,x:i,y:r-sc,w:s-i,h:Do,lx1:i,ly1:r,lx2:s,ly2:r}}function Wg({pieces:e,effect:t,effectConfig:n,allEdges:r,selectedEdgeIds:i,onSelectEdge:s,isOverridden:o,selectedPieceId:a,onSelectPiece:c}){const u=M.useMemo(()=>new Map(e.map(p=>[p.id,p])),[e]),d=M.useMemo(()=>Ug(e,t,n),[e,t,n]),h=M.useMemo(()=>{const p=[];for(const v of r){const x=(o==null?void 0:o(v.pairKey))??!1;if(v.isOuter){const w=u.get(v.pieceId);if(!w)continue;p.push({pairKey:v.pairKey,...oc(w,null,v.side),overridden:x,isOuter:!0,pieceId:v.pieceId,side:v.side})}else{const w=u.get(v.pieceAId),g=u.get(v.pieceBId);if(!w||!g)continue;p.push({pairKey:v.pairKey,...oc(w,g,v.sideA),overridden:x,isOuter:!1,pieceAId:v.pieceAId,pieceBId:v.pieceBId,sideA:v.sideA})}}return p},[r,u,o]);return l.jsxs("div",{className:"edge-canvas",children:[l.jsx(ln,{pieces:e,effect:t,effectConfig:n,selectedId:a,onSelect:c}),l.jsxs("svg",{className:"edge-canvas__overlay",viewBox:`${d.x} ${d.y} ${d.w} ${d.h}`,width:d.w,height:d.h,xmlns:"http://www.w3.org/2000/svg",children:[l.jsx("defs",{children:h.map(p=>{const v=p.isVertical?{x:p.lx1-si,y:p.ly1,w:si*2,h:p.ly2-p.ly1}:{x:p.lx1,y:p.ly1-si,w:p.lx2-p.lx1,h:si*2};return l.jsx("clipPath",{id:`ec-clip-${p.pairKey}`,children:l.jsx("rect",{x:v.x,y:v.y,width:v.w,height:v.h})},p.pairKey)})}),h.map(p=>{const v=i==null?void 0:i.has(p.pairKey),x=p.isOuter?tc(u.get(p.pieceId),e,p.side,t,n):tc(u.get(p.pieceAId),e,p.sideA,t,n);return l.jsxs("g",{className:"edge-hit "+(v?"edge-hit--selected ":"")+(p.overridden?"edge-hit--override":""),onClick:w=>{w.stopPropagation(),s(p.pairKey,w)},children:[l.jsx("rect",{x:p.x,y:p.y,width:p.w,height:p.h,className:"edge-hit__hit"}),x&&l.jsx("path",{d:x,className:"edge-hit__line",fill:"none",clipPath:`url(#ec-clip-${p.pairKey})`})]},p.pairKey)})]})]})}function Kg({pieces:e,effect:t,effectConfig:n,selectedId:r,onSelectPiece:i}){return l.jsx("div",{className:"cells-canvas",children:l.jsx(ln,{pieces:e,selectedId:r,effect:t,effectConfig:n,onSelect:i})})}function Hg({mode:e,pieces:t,effect:n,effectConfig:r,allEdges:i,selectedEdgeIds:s,onSelectEdge:o,isOverridden:a,selectedPieceId:c,onSelectPiece:u}){return e==="edges"?l.jsx(Wg,{pieces:t,effect:n,effectConfig:r,allEdges:i,selectedEdgeIds:s,onSelectEdge:o,isOverridden:a,selectedPieceId:c,onSelectPiece:u}):l.jsx(Kg,{pieces:t,effect:n,effectConfig:r,selectedId:c,onSelectPiece:u})}const Vg={frequency:.025,amplitude:12,phase:0};function Yg({project:e,mode:t="edges"}){const{project:n,pieces:r,sharedEdges:i,setDefaultEdgeEffect:s,setDefaultEdgeConfig:o,setEdgeEffect:a,setEdgeConfig:c,clearEdgeOverride:u,resetEdgeOverrides:d,setLayerEffect:h,setLayerConfig:p,clearLayer:v,setPieceEdgeEffect:x,setPieceEdgeConfig:w,clearPieceEdgeOverride:g,setPieceContent:m,updatePieceContent:f,setDefaultCellEffects:y,setCellEffects:k,setDefaultEdgeEffects:_,setLayerEffects:P,setPieceEdgeEffects:j,setEdgeEffects:A}=e,[B,$]=M.useState(()=>new Set),[C,N]=M.useState(null),L=M.useCallback(O=>!!(n!=null&&n.edges.byEdge[O]),[n==null?void 0:n.edges.byEdge]),T=M.useCallback((O,U)=>{N(null),$(S=>{const b=new Set(S);return U!=null&&U.shiftKey||U!=null&&U.ctrlKey||U!=null&&U.metaKey?b.has(O)?b.delete(O):b.add(O):b.size===1&&b.has(O)?b.clear():(b.clear(),b.add(O)),b})},[]),R=M.useCallback(O=>{$(new Set),N(O)},[]);M.useEffect(()=>{const O=U=>{U.key==="Escape"&&($(new Set),N(null))};return window.addEventListener("keydown",O),()=>window.removeEventListener("keydown",O)},[]);const I=M.useMemo(()=>n?[...i,...Lh(n)]:[],[n,i]);if(!n)return null;const X=n.edges.default.effect,z=n.edges.default.config??Vg,D=C?r.find(O=>O.id===C):null;return l.jsxs("div",{className:"page-edit",children:[l.jsxs("aside",{className:"side-tools",children:[l.jsx("div",{className:"side-tools__brand",children:l.jsx(Un,{size:"sm"})}),t==="edges"?l.jsx(Og,{project:n,pieces:r,sharedEdges:i,allEdges:I,selected:B,onClearEdgeSelection:()=>$(new Set),selectedPiece:D,onClearPieceSelection:()=>N(null),setDefaultEdgeEffect:s,setDefaultEdgeConfig:o,setEdgeEffect:a,setEdgeConfig:c,clearEdgeOverride:u,resetEdgeOverrides:d,setLayerEffect:h,setLayerConfig:p,clearLayer:v,setPieceEdgeEffect:x,setPieceEdgeConfig:w,clearPieceEdgeOverride:g,setDefaultEdgeEffects:_,setLayerEffects:P,setPieceEdgeEffects:j,setEdgeEffects:A}):l.jsx(Rg,{project:n,selectedPiece:D,onClearSelection:()=>N(null),setPieceContent:m,updatePieceContent:f,setDefaultCellEffects:y,setCellEffects:k})]}),l.jsx(Bd,{children:l.jsx(Hg,{mode:t,pieces:r,effect:X,effectConfig:z,allEdges:I,selectedEdgeIds:B,onSelectEdge:T,isOverridden:L,selectedPieceId:C,onSelectPiece:R})})]})}const Ud="hakoniwa:theme",Xg="puzzle-studio:theme";function Gg(){try{return localStorage.getItem(Ud)||localStorage.getItem(Xg)||"dark"}catch{return"dark"}}const Wd="hakoniwa:lastPage";function Qg(){try{const e=localStorage.getItem(Wd)||"landing";return e==="edit"?"edges":e}catch{return"landing"}}function Zg(){var o;const[e,t]=M.useState(Qg),n=Qh(),[r,i]=M.useState(Gg);M.useEffect(()=>{try{localStorage.setItem(Wd,e)}catch{}},[e]),M.useEffect(()=>{document.documentElement.setAttribute("data-theme",r);try{localStorage.setItem(Ud,r)}catch{}},[r]);const s=()=>i(a=>a==="dark"?"light":"dark");return l.jsxs("div",{className:"app",children:[l.jsx(Sm,{page:e,onNav:t,projectName:(o=n.project)==null?void 0:o.name,theme:r,onToggleTheme:s}),l.jsxs("main",{className:"app__page",children:[e==="landing"&&l.jsx(jm,{onNav:t}),e==="docs"&&l.jsx(Dm,{onNav:t}),e==="projects"&&l.jsx(Hm,{project:n,onNav:t}),e==="preview"&&l.jsx(vg,{project:n,onNav:t}),e==="grid"&&l.jsx(bg,{project:n}),(e==="edges"||e==="cells")&&l.jsx(Yg,{project:n,mode:e})]})]})}Us.createRoot(document.getElementById("root")).render(l.jsx(af.StrictMode,{children:l.jsx(Zg,{})}));
