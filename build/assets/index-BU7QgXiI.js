(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function ff(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Sc={exports:{}},rs={},_c={exports:{}},Q={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Br=Symbol.for("react.element"),pf=Symbol.for("react.portal"),hf=Symbol.for("react.fragment"),mf=Symbol.for("react.strict_mode"),gf=Symbol.for("react.profiler"),yf=Symbol.for("react.provider"),vf=Symbol.for("react.context"),xf=Symbol.for("react.forward_ref"),wf=Symbol.for("react.suspense"),kf=Symbol.for("react.memo"),Sf=Symbol.for("react.lazy"),ia=Symbol.iterator;function _f(e){return e===null||typeof e!="object"?null:(e=ia&&e[ia]||e["@@iterator"],typeof e=="function"?e:null)}var Ec={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},jc=Object.assign,Cc={};function Xn(e,t,n){this.props=e,this.context=t,this.refs=Cc,this.updater=n||Ec}Xn.prototype.isReactComponent={};Xn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Xn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function zc(){}zc.prototype=Xn.prototype;function tl(e,t,n){this.props=e,this.context=t,this.refs=Cc,this.updater=n||Ec}var nl=tl.prototype=new zc;nl.constructor=tl;jc(nl,Xn.prototype);nl.isPureReactComponent=!0;var sa=Array.isArray,bc=Object.prototype.hasOwnProperty,rl={current:null},Pc={key:!0,ref:!0,__self:!0,__source:!0};function Nc(e,t,n){var r,i={},s=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(s=""+t.key),t)bc.call(t,r)&&!Pc.hasOwnProperty(r)&&(i[r]=t[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var c=Array(a),u=0;u<a;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:Br,type:e,key:s,ref:o,props:i,_owner:rl.current}}function Ef(e,t){return{$$typeof:Br,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function il(e){return typeof e=="object"&&e!==null&&e.$$typeof===Br}function jf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var oa=/\/+/g;function Cs(e,t){return typeof e=="object"&&e!==null&&e.key!=null?jf(""+e.key):t.toString(36)}function gi(e,t,n,r,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Br:case pf:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+Cs(o,0):r,sa(i)?(n="",e!=null&&(n=e.replace(oa,"$&/")+"/"),gi(i,t,n,"",function(u){return u})):i!=null&&(il(i)&&(i=Ef(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(oa,"$&/")+"/")+e)),t.push(i)),1;if(o=0,r=r===""?".":r+":",sa(e))for(var a=0;a<e.length;a++){s=e[a];var c=r+Cs(s,a);o+=gi(s,t,n,c,i)}else if(c=_f(e),typeof c=="function")for(e=c.call(e),a=0;!(s=e.next()).done;)s=s.value,c=r+Cs(s,a++),o+=gi(s,t,n,c,i);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Yr(e,t,n){if(e==null)return e;var r=[],i=0;return gi(e,r,"","",function(s){return t.call(n,s,i++)}),r}function Cf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Pe={current:null},yi={transition:null},zf={ReactCurrentDispatcher:Pe,ReactCurrentBatchConfig:yi,ReactCurrentOwner:rl};function Mc(){throw Error("act(...) is not supported in production builds of React.")}Q.Children={map:Yr,forEach:function(e,t,n){Yr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Yr(e,function(){t++}),t},toArray:function(e){return Yr(e,function(t){return t})||[]},only:function(e){if(!il(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Q.Component=Xn;Q.Fragment=hf;Q.Profiler=gf;Q.PureComponent=tl;Q.StrictMode=mf;Q.Suspense=wf;Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=zf;Q.act=Mc;Q.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=jc({},e.props),i=e.key,s=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,o=rl.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(c in t)bc.call(t,c)&&!Pc.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&a!==void 0?a[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){a=Array(c);for(var u=0;u<c;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:Br,type:e.type,key:i,ref:s,props:r,_owner:o}};Q.createContext=function(e){return e={$$typeof:vf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:yf,_context:e},e.Consumer=e};Q.createElement=Nc;Q.createFactory=function(e){var t=Nc.bind(null,e);return t.type=e,t};Q.createRef=function(){return{current:null}};Q.forwardRef=function(e){return{$$typeof:xf,render:e}};Q.isValidElement=il;Q.lazy=function(e){return{$$typeof:Sf,_payload:{_status:-1,_result:e},_init:Cf}};Q.memo=function(e,t){return{$$typeof:kf,type:e,compare:t===void 0?null:t}};Q.startTransition=function(e){var t=yi.transition;yi.transition={};try{e()}finally{yi.transition=t}};Q.unstable_act=Mc;Q.useCallback=function(e,t){return Pe.current.useCallback(e,t)};Q.useContext=function(e){return Pe.current.useContext(e)};Q.useDebugValue=function(){};Q.useDeferredValue=function(e){return Pe.current.useDeferredValue(e)};Q.useEffect=function(e,t){return Pe.current.useEffect(e,t)};Q.useId=function(){return Pe.current.useId()};Q.useImperativeHandle=function(e,t,n){return Pe.current.useImperativeHandle(e,t,n)};Q.useInsertionEffect=function(e,t){return Pe.current.useInsertionEffect(e,t)};Q.useLayoutEffect=function(e,t){return Pe.current.useLayoutEffect(e,t)};Q.useMemo=function(e,t){return Pe.current.useMemo(e,t)};Q.useReducer=function(e,t,n){return Pe.current.useReducer(e,t,n)};Q.useRef=function(e){return Pe.current.useRef(e)};Q.useState=function(e){return Pe.current.useState(e)};Q.useSyncExternalStore=function(e,t,n){return Pe.current.useSyncExternalStore(e,t,n)};Q.useTransition=function(){return Pe.current.useTransition()};Q.version="18.3.1";_c.exports=Q;var b=_c.exports;const bf=ff(b);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pf=b,Nf=Symbol.for("react.element"),Mf=Symbol.for("react.fragment"),Af=Object.prototype.hasOwnProperty,If=Pf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Tf={key:!0,ref:!0,__self:!0,__source:!0};function Ac(e,t,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)Af.call(t,r)&&!Tf.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:Nf,type:e,key:s,ref:o,props:i,_owner:If.current}}rs.Fragment=Mf;rs.jsx=Ac;rs.jsxs=Ac;Sc.exports=rs;var l=Sc.exports,to={},Ic={exports:{}},Ke={},Tc={exports:{}},$c={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(C,T){var L=C.length;C.push(T);e:for(;0<L;){var X=L-1>>>1,_=C[X];if(0<i(_,T))C[X]=T,C[L]=_,L=X;else break e}}function n(C){return C.length===0?null:C[0]}function r(C){if(C.length===0)return null;var T=C[0],L=C.pop();if(L!==T){C[0]=L;e:for(var X=0,_=C.length,P=_>>>1;X<P;){var V=2*(X+1)-1,Y=C[V],H=V+1,J=C[H];if(0>i(Y,L))H<_&&0>i(J,Y)?(C[X]=J,C[H]=L,X=H):(C[X]=Y,C[V]=L,X=V);else if(H<_&&0>i(J,L))C[X]=J,C[H]=L,X=H;else break e}}return T}function i(C,T){var L=C.sortIndex-T.sortIndex;return L!==0?L:C.id-T.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();e.unstable_now=function(){return o.now()-a}}var c=[],u=[],d=1,h=null,g=3,w=!1,y=!1,x=!1,v=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(C){for(var T=n(u);T!==null;){if(T.callback===null)r(u);else if(T.startTime<=C)r(u),T.sortIndex=T.expirationTime,t(c,T);else break;T=n(u)}}function k(C){if(x=!1,m(C),!y)if(n(c)!==null)y=!0,D(S);else{var T=n(u);T!==null&&B(k,T.startTime-C)}}function S(C,T){y=!1,x&&(x=!1,p(z),z=-1),w=!0;var L=g;try{for(m(T),h=n(c);h!==null&&(!(h.expirationTime>T)||C&&!W());){var X=h.callback;if(typeof X=="function"){h.callback=null,g=h.priorityLevel;var _=X(h.expirationTime<=T);T=e.unstable_now(),typeof _=="function"?h.callback=_:h===n(c)&&r(c),m(T)}else r(c);h=n(c)}if(h!==null)var P=!0;else{var V=n(u);V!==null&&B(k,V.startTime-T),P=!1}return P}finally{h=null,g=L,w=!1}}var E=!1,j=null,z=-1,A=5,M=-1;function W(){return!(e.unstable_now()-M<A)}function K(){if(j!==null){var C=e.unstable_now();M=C;var T=!0;try{T=j(!0,C)}finally{T?$():(E=!1,j=null)}}else E=!1}var $;if(typeof f=="function")$=function(){f(K)};else if(typeof MessageChannel<"u"){var I=new MessageChannel,R=I.port2;I.port1.onmessage=K,$=function(){R.postMessage(null)}}else $=function(){v(K,0)};function D(C){j=C,E||(E=!0,$())}function B(C,T){z=v(function(){C(e.unstable_now())},T)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(C){C.callback=null},e.unstable_continueExecution=function(){y||w||(y=!0,D(S))},e.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<C?Math.floor(1e3/C):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(C){switch(g){case 1:case 2:case 3:var T=3;break;default:T=g}var L=g;g=T;try{return C()}finally{g=L}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(C,T){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var L=g;g=C;try{return T()}finally{g=L}},e.unstable_scheduleCallback=function(C,T,L){var X=e.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?X+L:X):L=X,C){case 1:var _=-1;break;case 2:_=250;break;case 5:_=1073741823;break;case 4:_=1e4;break;default:_=5e3}return _=L+_,C={id:d++,callback:T,priorityLevel:C,startTime:L,expirationTime:_,sortIndex:-1},L>X?(C.sortIndex=L,t(u,C),n(c)===null&&C===n(u)&&(x?(p(z),z=-1):x=!0,B(k,L-X))):(C.sortIndex=_,t(c,C),y||w||(y=!0,D(S))),C},e.unstable_shouldYield=W,e.unstable_wrapCallback=function(C){var T=g;return function(){var L=g;g=T;try{return C.apply(this,arguments)}finally{g=L}}}})($c);Tc.exports=$c;var $f=Tc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Of=b,We=$f;function N(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Oc=new Set,Er={};function mn(e,t){Rn(e,t),Rn(e+"Capture",t)}function Rn(e,t){for(Er[e]=t,e=0;e<t.length;e++)Oc.add(t[e])}var _t=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),no=Object.prototype.hasOwnProperty,Lf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la={},aa={};function Ff(e){return no.call(aa,e)?!0:no.call(la,e)?!1:Lf.test(e)?aa[e]=!0:(la[e]=!0,!1)}function Rf(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Df(e,t,n,r){if(t===null||typeof t>"u"||Rf(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ne(e,t,n,r,i,s,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=o}var Se={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Se[e]=new Ne(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Se[t]=new Ne(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Se[e]=new Ne(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Se[e]=new Ne(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Se[e]=new Ne(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Se[e]=new Ne(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Se[e]=new Ne(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Se[e]=new Ne(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Se[e]=new Ne(e,5,!1,e.toLowerCase(),null,!1,!1)});var sl=/[\-:]([a-z])/g;function ol(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(sl,ol);Se[t]=new Ne(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(sl,ol);Se[t]=new Ne(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(sl,ol);Se[t]=new Ne(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Se[e]=new Ne(e,1,!1,e.toLowerCase(),null,!1,!1)});Se.xlinkHref=new Ne("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Se[e]=new Ne(e,1,!1,e.toLowerCase(),null,!0,!0)});function ll(e,t,n,r){var i=Se.hasOwnProperty(t)?Se[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Df(t,n,i,r)&&(n=null),r||i===null?Ff(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var zt=Of.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Xr=Symbol.for("react.element"),wn=Symbol.for("react.portal"),kn=Symbol.for("react.fragment"),al=Symbol.for("react.strict_mode"),ro=Symbol.for("react.profiler"),Lc=Symbol.for("react.provider"),Fc=Symbol.for("react.context"),cl=Symbol.for("react.forward_ref"),io=Symbol.for("react.suspense"),so=Symbol.for("react.suspense_list"),ul=Symbol.for("react.memo"),Nt=Symbol.for("react.lazy"),Rc=Symbol.for("react.offscreen"),ca=Symbol.iterator;function er(e){return e===null||typeof e!="object"?null:(e=ca&&e[ca]||e["@@iterator"],typeof e=="function"?e:null)}var le=Object.assign,zs;function ur(e){if(zs===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);zs=t&&t[1]||""}return`
`+zs+e}var bs=!1;function Ps(e,t){if(!e||bs)return"";bs=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,a=s.length-1;1<=o&&0<=a&&i[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==s[a]){var c=`
`+i[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=a);break}}}finally{bs=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?ur(e):""}function Bf(e){switch(e.tag){case 5:return ur(e.type);case 16:return ur("Lazy");case 13:return ur("Suspense");case 19:return ur("SuspenseList");case 0:case 2:case 15:return e=Ps(e.type,!1),e;case 11:return e=Ps(e.type.render,!1),e;case 1:return e=Ps(e.type,!0),e;default:return""}}function oo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case kn:return"Fragment";case wn:return"Portal";case ro:return"Profiler";case al:return"StrictMode";case io:return"Suspense";case so:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Fc:return(e.displayName||"Context")+".Consumer";case Lc:return(e._context.displayName||"Context")+".Provider";case cl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ul:return t=e.displayName||null,t!==null?t:oo(e.type)||"Memo";case Nt:t=e._payload,e=e._init;try{return oo(e(t))}catch{}}return null}function Uf(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return oo(t);case 8:return t===al?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Ht(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Dc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Wf(e){var t=Dc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Gr(e){e._valueTracker||(e._valueTracker=Wf(e))}function Bc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Dc(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Pi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function lo(e,t){var n=t.checked;return le({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ua(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Ht(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Uc(e,t){t=t.checked,t!=null&&ll(e,"checked",t,!1)}function ao(e,t){Uc(e,t);var n=Ht(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?co(e,t.type,n):t.hasOwnProperty("defaultValue")&&co(e,t.type,Ht(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function da(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function co(e,t,n){(t!=="number"||Pi(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var dr=Array.isArray;function In(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Ht(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function uo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(N(91));return le({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function fa(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(N(92));if(dr(n)){if(1<n.length)throw Error(N(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Ht(n)}}function Wc(e,t){var n=Ht(t.value),r=Ht(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function pa(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Kc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function fo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Kc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Qr,Hc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Qr=Qr||document.createElement("div"),Qr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Qr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function jr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var mr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Kf=["Webkit","ms","Moz","O"];Object.keys(mr).forEach(function(e){Kf.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),mr[t]=mr[e]})});function Vc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||mr.hasOwnProperty(e)&&mr[e]?(""+t).trim():t+"px"}function Yc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Vc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var Hf=le({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function po(e,t){if(t){if(Hf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(N(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(N(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(N(61))}if(t.style!=null&&typeof t.style!="object")throw Error(N(62))}}function ho(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var mo=null;function dl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var go=null,Tn=null,$n=null;function ha(e){if(e=Kr(e)){if(typeof go!="function")throw Error(N(280));var t=e.stateNode;t&&(t=as(t),go(e.stateNode,e.type,t))}}function Xc(e){Tn?$n?$n.push(e):$n=[e]:Tn=e}function Gc(){if(Tn){var e=Tn,t=$n;if($n=Tn=null,ha(e),t)for(e=0;e<t.length;e++)ha(t[e])}}function Qc(e,t){return e(t)}function Zc(){}var Ns=!1;function Jc(e,t,n){if(Ns)return e(t,n);Ns=!0;try{return Qc(e,t,n)}finally{Ns=!1,(Tn!==null||$n!==null)&&(Zc(),Gc())}}function Cr(e,t){var n=e.stateNode;if(n===null)return null;var r=as(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(N(231,t,typeof n));return n}var yo=!1;if(_t)try{var tr={};Object.defineProperty(tr,"passive",{get:function(){yo=!0}}),window.addEventListener("test",tr,tr),window.removeEventListener("test",tr,tr)}catch{yo=!1}function Vf(e,t,n,r,i,s,o,a,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(d){this.onError(d)}}var gr=!1,Ni=null,Mi=!1,vo=null,Yf={onError:function(e){gr=!0,Ni=e}};function Xf(e,t,n,r,i,s,o,a,c){gr=!1,Ni=null,Vf.apply(Yf,arguments)}function Gf(e,t,n,r,i,s,o,a,c){if(Xf.apply(this,arguments),gr){if(gr){var u=Ni;gr=!1,Ni=null}else throw Error(N(198));Mi||(Mi=!0,vo=u)}}function gn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function qc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ma(e){if(gn(e)!==e)throw Error(N(188))}function Qf(e){var t=e.alternate;if(!t){if(t=gn(e),t===null)throw Error(N(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return ma(i),e;if(s===r)return ma(i),t;s=s.sibling}throw Error(N(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,a=i.child;a;){if(a===n){o=!0,n=i,r=s;break}if(a===r){o=!0,r=i,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,r=i;break}if(a===r){o=!0,r=s,n=i;break}a=a.sibling}if(!o)throw Error(N(189))}}if(n.alternate!==r)throw Error(N(190))}if(n.tag!==3)throw Error(N(188));return n.stateNode.current===n?e:t}function eu(e){return e=Qf(e),e!==null?tu(e):null}function tu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=tu(e);if(t!==null)return t;e=e.sibling}return null}var nu=We.unstable_scheduleCallback,ga=We.unstable_cancelCallback,Zf=We.unstable_shouldYield,Jf=We.unstable_requestPaint,ue=We.unstable_now,qf=We.unstable_getCurrentPriorityLevel,fl=We.unstable_ImmediatePriority,ru=We.unstable_UserBlockingPriority,Ai=We.unstable_NormalPriority,ep=We.unstable_LowPriority,iu=We.unstable_IdlePriority,is=null,pt=null;function tp(e){if(pt&&typeof pt.onCommitFiberRoot=="function")try{pt.onCommitFiberRoot(is,e,void 0,(e.current.flags&128)===128)}catch{}}var st=Math.clz32?Math.clz32:ip,np=Math.log,rp=Math.LN2;function ip(e){return e>>>=0,e===0?32:31-(np(e)/rp|0)|0}var Zr=64,Jr=4194304;function fr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ii(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,s=e.pingedLanes,o=n&268435455;if(o!==0){var a=o&~i;a!==0?r=fr(a):(s&=o,s!==0&&(r=fr(s)))}else o=n&~i,o!==0?r=fr(o):s!==0&&(r=fr(s));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,s=t&-t,i>=s||i===16&&(s&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-st(t),i=1<<n,r|=e[n],t&=~i;return r}function sp(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function op(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var o=31-st(s),a=1<<o,c=i[o];c===-1?(!(a&n)||a&r)&&(i[o]=sp(a,t)):c<=t&&(e.expiredLanes|=a),s&=~a}}function xo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function su(){var e=Zr;return Zr<<=1,!(Zr&4194240)&&(Zr=64),e}function Ms(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ur(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-st(t),e[t]=n}function lp(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-st(n),s=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~s}}function pl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-st(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var ee=0;function ou(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var lu,hl,au,cu,uu,wo=!1,qr=[],Ot=null,Lt=null,Ft=null,zr=new Map,br=new Map,At=[],ap="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ya(e,t){switch(e){case"focusin":case"focusout":Ot=null;break;case"dragenter":case"dragleave":Lt=null;break;case"mouseover":case"mouseout":Ft=null;break;case"pointerover":case"pointerout":zr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":br.delete(t.pointerId)}}function nr(e,t,n,r,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},t!==null&&(t=Kr(t),t!==null&&hl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function cp(e,t,n,r,i){switch(t){case"focusin":return Ot=nr(Ot,e,t,n,r,i),!0;case"dragenter":return Lt=nr(Lt,e,t,n,r,i),!0;case"mouseover":return Ft=nr(Ft,e,t,n,r,i),!0;case"pointerover":var s=i.pointerId;return zr.set(s,nr(zr.get(s)||null,e,t,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,br.set(s,nr(br.get(s)||null,e,t,n,r,i)),!0}return!1}function du(e){var t=en(e.target);if(t!==null){var n=gn(t);if(n!==null){if(t=n.tag,t===13){if(t=qc(n),t!==null){e.blockedOn=t,uu(e.priority,function(){au(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function vi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ko(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);mo=r,n.target.dispatchEvent(r),mo=null}else return t=Kr(n),t!==null&&hl(t),e.blockedOn=n,!1;t.shift()}return!0}function va(e,t,n){vi(e)&&n.delete(t)}function up(){wo=!1,Ot!==null&&vi(Ot)&&(Ot=null),Lt!==null&&vi(Lt)&&(Lt=null),Ft!==null&&vi(Ft)&&(Ft=null),zr.forEach(va),br.forEach(va)}function rr(e,t){e.blockedOn===t&&(e.blockedOn=null,wo||(wo=!0,We.unstable_scheduleCallback(We.unstable_NormalPriority,up)))}function Pr(e){function t(i){return rr(i,e)}if(0<qr.length){rr(qr[0],e);for(var n=1;n<qr.length;n++){var r=qr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Ot!==null&&rr(Ot,e),Lt!==null&&rr(Lt,e),Ft!==null&&rr(Ft,e),zr.forEach(t),br.forEach(t),n=0;n<At.length;n++)r=At[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<At.length&&(n=At[0],n.blockedOn===null);)du(n),n.blockedOn===null&&At.shift()}var On=zt.ReactCurrentBatchConfig,Ti=!0;function dp(e,t,n,r){var i=ee,s=On.transition;On.transition=null;try{ee=1,ml(e,t,n,r)}finally{ee=i,On.transition=s}}function fp(e,t,n,r){var i=ee,s=On.transition;On.transition=null;try{ee=4,ml(e,t,n,r)}finally{ee=i,On.transition=s}}function ml(e,t,n,r){if(Ti){var i=ko(e,t,n,r);if(i===null)Bs(e,t,r,$i,n),ya(e,r);else if(cp(i,e,t,n,r))r.stopPropagation();else if(ya(e,r),t&4&&-1<ap.indexOf(e)){for(;i!==null;){var s=Kr(i);if(s!==null&&lu(s),s=ko(e,t,n,r),s===null&&Bs(e,t,r,$i,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Bs(e,t,r,null,n)}}var $i=null;function ko(e,t,n,r){if($i=null,e=dl(r),e=en(e),e!==null)if(t=gn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=qc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return $i=e,null}function fu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(qf()){case fl:return 1;case ru:return 4;case Ai:case ep:return 16;case iu:return 536870912;default:return 16}default:return 16}}var Tt=null,gl=null,xi=null;function pu(){if(xi)return xi;var e,t=gl,n=t.length,r,i="value"in Tt?Tt.value:Tt.textContent,s=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[s-r];r++);return xi=i.slice(e,1<r?1-r:void 0)}function wi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ei(){return!0}function xa(){return!1}function He(e){function t(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ei:xa,this.isPropagationStopped=xa,this}return le(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ei)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ei)},persist:function(){},isPersistent:ei}),t}var Gn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},yl=He(Gn),Wr=le({},Gn,{view:0,detail:0}),pp=He(Wr),As,Is,ir,ss=le({},Wr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ir&&(ir&&e.type==="mousemove"?(As=e.screenX-ir.screenX,Is=e.screenY-ir.screenY):Is=As=0,ir=e),As)},movementY:function(e){return"movementY"in e?e.movementY:Is}}),wa=He(ss),hp=le({},ss,{dataTransfer:0}),mp=He(hp),gp=le({},Wr,{relatedTarget:0}),Ts=He(gp),yp=le({},Gn,{animationName:0,elapsedTime:0,pseudoElement:0}),vp=He(yp),xp=le({},Gn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),wp=He(xp),kp=le({},Gn,{data:0}),ka=He(kp),Sp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_p={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ep={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function jp(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ep[e])?!!t[e]:!1}function vl(){return jp}var Cp=le({},Wr,{key:function(e){if(e.key){var t=Sp[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=wi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?_p[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vl,charCode:function(e){return e.type==="keypress"?wi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?wi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),zp=He(Cp),bp=le({},ss,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Sa=He(bp),Pp=le({},Wr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vl}),Np=He(Pp),Mp=le({},Gn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ap=He(Mp),Ip=le({},ss,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Tp=He(Ip),$p=[9,13,27,32],xl=_t&&"CompositionEvent"in window,yr=null;_t&&"documentMode"in document&&(yr=document.documentMode);var Op=_t&&"TextEvent"in window&&!yr,hu=_t&&(!xl||yr&&8<yr&&11>=yr),_a=" ",Ea=!1;function mu(e,t){switch(e){case"keyup":return $p.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function gu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Sn=!1;function Lp(e,t){switch(e){case"compositionend":return gu(t);case"keypress":return t.which!==32?null:(Ea=!0,_a);case"textInput":return e=t.data,e===_a&&Ea?null:e;default:return null}}function Fp(e,t){if(Sn)return e==="compositionend"||!xl&&mu(e,t)?(e=pu(),xi=gl=Tt=null,Sn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return hu&&t.locale!=="ko"?null:t.data;default:return null}}var Rp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ja(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Rp[e.type]:t==="textarea"}function yu(e,t,n,r){Xc(r),t=Oi(t,"onChange"),0<t.length&&(n=new yl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var vr=null,Nr=null;function Dp(e){bu(e,0)}function os(e){var t=jn(e);if(Bc(t))return e}function Bp(e,t){if(e==="change")return t}var vu=!1;if(_t){var $s;if(_t){var Os="oninput"in document;if(!Os){var Ca=document.createElement("div");Ca.setAttribute("oninput","return;"),Os=typeof Ca.oninput=="function"}$s=Os}else $s=!1;vu=$s&&(!document.documentMode||9<document.documentMode)}function za(){vr&&(vr.detachEvent("onpropertychange",xu),Nr=vr=null)}function xu(e){if(e.propertyName==="value"&&os(Nr)){var t=[];yu(t,Nr,e,dl(e)),Jc(Dp,t)}}function Up(e,t,n){e==="focusin"?(za(),vr=t,Nr=n,vr.attachEvent("onpropertychange",xu)):e==="focusout"&&za()}function Wp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return os(Nr)}function Kp(e,t){if(e==="click")return os(t)}function Hp(e,t){if(e==="input"||e==="change")return os(t)}function Vp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var lt=typeof Object.is=="function"?Object.is:Vp;function Mr(e,t){if(lt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!no.call(t,i)||!lt(e[i],t[i]))return!1}return!0}function ba(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Pa(e,t){var n=ba(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ba(n)}}function wu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?wu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ku(){for(var e=window,t=Pi();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Pi(e.document)}return t}function wl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Yp(e){var t=ku(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&wu(n.ownerDocument.documentElement,n)){if(r!==null&&wl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!e.extend&&s>r&&(i=r,r=s,s=i),i=Pa(n,s);var o=Pa(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),s>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Xp=_t&&"documentMode"in document&&11>=document.documentMode,_n=null,So=null,xr=null,_o=!1;function Na(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;_o||_n==null||_n!==Pi(r)||(r=_n,"selectionStart"in r&&wl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),xr&&Mr(xr,r)||(xr=r,r=Oi(So,"onSelect"),0<r.length&&(t=new yl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=_n)))}function ti(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var En={animationend:ti("Animation","AnimationEnd"),animationiteration:ti("Animation","AnimationIteration"),animationstart:ti("Animation","AnimationStart"),transitionend:ti("Transition","TransitionEnd")},Ls={},Su={};_t&&(Su=document.createElement("div").style,"AnimationEvent"in window||(delete En.animationend.animation,delete En.animationiteration.animation,delete En.animationstart.animation),"TransitionEvent"in window||delete En.transitionend.transition);function ls(e){if(Ls[e])return Ls[e];if(!En[e])return e;var t=En[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Su)return Ls[e]=t[n];return e}var _u=ls("animationend"),Eu=ls("animationiteration"),ju=ls("animationstart"),Cu=ls("transitionend"),zu=new Map,Ma="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Xt(e,t){zu.set(e,t),mn(t,[e])}for(var Fs=0;Fs<Ma.length;Fs++){var Rs=Ma[Fs],Gp=Rs.toLowerCase(),Qp=Rs[0].toUpperCase()+Rs.slice(1);Xt(Gp,"on"+Qp)}Xt(_u,"onAnimationEnd");Xt(Eu,"onAnimationIteration");Xt(ju,"onAnimationStart");Xt("dblclick","onDoubleClick");Xt("focusin","onFocus");Xt("focusout","onBlur");Xt(Cu,"onTransitionEnd");Rn("onMouseEnter",["mouseout","mouseover"]);Rn("onMouseLeave",["mouseout","mouseover"]);Rn("onPointerEnter",["pointerout","pointerover"]);Rn("onPointerLeave",["pointerout","pointerover"]);mn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));mn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mn("onBeforeInput",["compositionend","keypress","textInput","paste"]);mn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var pr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Zp=new Set("cancel close invalid load scroll toggle".split(" ").concat(pr));function Aa(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Gf(r,t,void 0,e),e.currentTarget=null}function bu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var s=void 0;if(t)for(var o=r.length-1;0<=o;o--){var a=r[o],c=a.instance,u=a.currentTarget;if(a=a.listener,c!==s&&i.isPropagationStopped())break e;Aa(i,a,u),s=c}else for(o=0;o<r.length;o++){if(a=r[o],c=a.instance,u=a.currentTarget,a=a.listener,c!==s&&i.isPropagationStopped())break e;Aa(i,a,u),s=c}}}if(Mi)throw e=vo,Mi=!1,vo=null,e}function ne(e,t){var n=t[bo];n===void 0&&(n=t[bo]=new Set);var r=e+"__bubble";n.has(r)||(Pu(t,e,2,!1),n.add(r))}function Ds(e,t,n){var r=0;t&&(r|=4),Pu(n,e,r,t)}var ni="_reactListening"+Math.random().toString(36).slice(2);function Ar(e){if(!e[ni]){e[ni]=!0,Oc.forEach(function(n){n!=="selectionchange"&&(Zp.has(n)||Ds(n,!1,e),Ds(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ni]||(t[ni]=!0,Ds("selectionchange",!1,t))}}function Pu(e,t,n,r){switch(fu(t)){case 1:var i=dp;break;case 4:i=fp;break;default:i=ml}n=i.bind(null,t,n,e),i=void 0,!yo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Bs(e,t,n,r,i){var s=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;o=o.return}for(;a!==null;){if(o=en(a),o===null)return;if(c=o.tag,c===5||c===6){r=s=o;continue e}a=a.parentNode}}r=r.return}Jc(function(){var u=s,d=dl(n),h=[];e:{var g=zu.get(e);if(g!==void 0){var w=yl,y=e;switch(e){case"keypress":if(wi(n)===0)break e;case"keydown":case"keyup":w=zp;break;case"focusin":y="focus",w=Ts;break;case"focusout":y="blur",w=Ts;break;case"beforeblur":case"afterblur":w=Ts;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=wa;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=mp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=Np;break;case _u:case Eu:case ju:w=vp;break;case Cu:w=Ap;break;case"scroll":w=pp;break;case"wheel":w=Tp;break;case"copy":case"cut":case"paste":w=wp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=Sa}var x=(t&4)!==0,v=!x&&e==="scroll",p=x?g!==null?g+"Capture":null:g;x=[];for(var f=u,m;f!==null;){m=f;var k=m.stateNode;if(m.tag===5&&k!==null&&(m=k,p!==null&&(k=Cr(f,p),k!=null&&x.push(Ir(f,k,m)))),v)break;f=f.return}0<x.length&&(g=new w(g,y,null,n,d),h.push({event:g,listeners:x}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",g&&n!==mo&&(y=n.relatedTarget||n.fromElement)&&(en(y)||y[Et]))break e;if((w||g)&&(g=d.window===d?d:(g=d.ownerDocument)?g.defaultView||g.parentWindow:window,w?(y=n.relatedTarget||n.toElement,w=u,y=y?en(y):null,y!==null&&(v=gn(y),y!==v||y.tag!==5&&y.tag!==6)&&(y=null)):(w=null,y=u),w!==y)){if(x=wa,k="onMouseLeave",p="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(x=Sa,k="onPointerLeave",p="onPointerEnter",f="pointer"),v=w==null?g:jn(w),m=y==null?g:jn(y),g=new x(k,f+"leave",w,n,d),g.target=v,g.relatedTarget=m,k=null,en(d)===u&&(x=new x(p,f+"enter",y,n,d),x.target=m,x.relatedTarget=v,k=x),v=k,w&&y)t:{for(x=w,p=y,f=0,m=x;m;m=vn(m))f++;for(m=0,k=p;k;k=vn(k))m++;for(;0<f-m;)x=vn(x),f--;for(;0<m-f;)p=vn(p),m--;for(;f--;){if(x===p||p!==null&&x===p.alternate)break t;x=vn(x),p=vn(p)}x=null}else x=null;w!==null&&Ia(h,g,w,x,!1),y!==null&&v!==null&&Ia(h,v,y,x,!0)}}e:{if(g=u?jn(u):window,w=g.nodeName&&g.nodeName.toLowerCase(),w==="select"||w==="input"&&g.type==="file")var S=Bp;else if(ja(g))if(vu)S=Hp;else{S=Wp;var E=Up}else(w=g.nodeName)&&w.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(S=Kp);if(S&&(S=S(e,u))){yu(h,S,n,d);break e}E&&E(e,g,u),e==="focusout"&&(E=g._wrapperState)&&E.controlled&&g.type==="number"&&co(g,"number",g.value)}switch(E=u?jn(u):window,e){case"focusin":(ja(E)||E.contentEditable==="true")&&(_n=E,So=u,xr=null);break;case"focusout":xr=So=_n=null;break;case"mousedown":_o=!0;break;case"contextmenu":case"mouseup":case"dragend":_o=!1,Na(h,n,d);break;case"selectionchange":if(Xp)break;case"keydown":case"keyup":Na(h,n,d)}var j;if(xl)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else Sn?mu(e,n)&&(z="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(z="onCompositionStart");z&&(hu&&n.locale!=="ko"&&(Sn||z!=="onCompositionStart"?z==="onCompositionEnd"&&Sn&&(j=pu()):(Tt=d,gl="value"in Tt?Tt.value:Tt.textContent,Sn=!0)),E=Oi(u,z),0<E.length&&(z=new ka(z,e,null,n,d),h.push({event:z,listeners:E}),j?z.data=j:(j=gu(n),j!==null&&(z.data=j)))),(j=Op?Lp(e,n):Fp(e,n))&&(u=Oi(u,"onBeforeInput"),0<u.length&&(d=new ka("onBeforeInput","beforeinput",null,n,d),h.push({event:d,listeners:u}),d.data=j))}bu(h,t)})}function Ir(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Oi(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=Cr(e,n),s!=null&&r.unshift(Ir(e,s,i)),s=Cr(e,t),s!=null&&r.push(Ir(e,s,i))),e=e.return}return r}function vn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ia(e,t,n,r,i){for(var s=t._reactName,o=[];n!==null&&n!==r;){var a=n,c=a.alternate,u=a.stateNode;if(c!==null&&c===r)break;a.tag===5&&u!==null&&(a=u,i?(c=Cr(n,s),c!=null&&o.unshift(Ir(n,c,a))):i||(c=Cr(n,s),c!=null&&o.push(Ir(n,c,a)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Jp=/\r\n?/g,qp=/\u0000|\uFFFD/g;function Ta(e){return(typeof e=="string"?e:""+e).replace(Jp,`
`).replace(qp,"")}function ri(e,t,n){if(t=Ta(t),Ta(e)!==t&&n)throw Error(N(425))}function Li(){}var Eo=null,jo=null;function Co(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var zo=typeof setTimeout=="function"?setTimeout:void 0,eh=typeof clearTimeout=="function"?clearTimeout:void 0,$a=typeof Promise=="function"?Promise:void 0,th=typeof queueMicrotask=="function"?queueMicrotask:typeof $a<"u"?function(e){return $a.resolve(null).then(e).catch(nh)}:zo;function nh(e){setTimeout(function(){throw e})}function Us(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Pr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Pr(t)}function Rt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Oa(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Qn=Math.random().toString(36).slice(2),dt="__reactFiber$"+Qn,Tr="__reactProps$"+Qn,Et="__reactContainer$"+Qn,bo="__reactEvents$"+Qn,rh="__reactListeners$"+Qn,ih="__reactHandles$"+Qn;function en(e){var t=e[dt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Et]||n[dt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Oa(e);e!==null;){if(n=e[dt])return n;e=Oa(e)}return t}e=n,n=e.parentNode}return null}function Kr(e){return e=e[dt]||e[Et],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function jn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(N(33))}function as(e){return e[Tr]||null}var Po=[],Cn=-1;function Gt(e){return{current:e}}function re(e){0>Cn||(e.current=Po[Cn],Po[Cn]=null,Cn--)}function te(e,t){Cn++,Po[Cn]=e.current,e.current=t}var Vt={},Ce=Gt(Vt),Le=Gt(!1),an=Vt;function Dn(e,t){var n=e.type.contextTypes;if(!n)return Vt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=t[s];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function Fe(e){return e=e.childContextTypes,e!=null}function Fi(){re(Le),re(Ce)}function La(e,t,n){if(Ce.current!==Vt)throw Error(N(168));te(Ce,t),te(Le,n)}function Nu(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(N(108,Uf(e)||"Unknown",i));return le({},n,r)}function Ri(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Vt,an=Ce.current,te(Ce,e),te(Le,Le.current),!0}function Fa(e,t,n){var r=e.stateNode;if(!r)throw Error(N(169));n?(e=Nu(e,t,an),r.__reactInternalMemoizedMergedChildContext=e,re(Le),re(Ce),te(Ce,e)):re(Le),te(Le,n)}var gt=null,cs=!1,Ws=!1;function Mu(e){gt===null?gt=[e]:gt.push(e)}function sh(e){cs=!0,Mu(e)}function Qt(){if(!Ws&&gt!==null){Ws=!0;var e=0,t=ee;try{var n=gt;for(ee=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}gt=null,cs=!1}catch(i){throw gt!==null&&(gt=gt.slice(e+1)),nu(fl,Qt),i}finally{ee=t,Ws=!1}}return null}var zn=[],bn=0,Di=null,Bi=0,Xe=[],Ge=0,cn=null,yt=1,vt="";function Jt(e,t){zn[bn++]=Bi,zn[bn++]=Di,Di=e,Bi=t}function Au(e,t,n){Xe[Ge++]=yt,Xe[Ge++]=vt,Xe[Ge++]=cn,cn=e;var r=yt;e=vt;var i=32-st(r)-1;r&=~(1<<i),n+=1;var s=32-st(t)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,yt=1<<32-st(t)+i|n<<i|r,vt=s+e}else yt=1<<s|n<<i|r,vt=e}function kl(e){e.return!==null&&(Jt(e,1),Au(e,1,0))}function Sl(e){for(;e===Di;)Di=zn[--bn],zn[bn]=null,Bi=zn[--bn],zn[bn]=null;for(;e===cn;)cn=Xe[--Ge],Xe[Ge]=null,vt=Xe[--Ge],Xe[Ge]=null,yt=Xe[--Ge],Xe[Ge]=null}var Ue=null,Be=null,ie=!1,it=null;function Iu(e,t){var n=Qe(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ra(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ue=e,Be=Rt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ue=e,Be=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=cn!==null?{id:yt,overflow:vt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Qe(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ue=e,Be=null,!0):!1;default:return!1}}function No(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Mo(e){if(ie){var t=Be;if(t){var n=t;if(!Ra(e,t)){if(No(e))throw Error(N(418));t=Rt(n.nextSibling);var r=Ue;t&&Ra(e,t)?Iu(r,n):(e.flags=e.flags&-4097|2,ie=!1,Ue=e)}}else{if(No(e))throw Error(N(418));e.flags=e.flags&-4097|2,ie=!1,Ue=e}}}function Da(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ue=e}function ii(e){if(e!==Ue)return!1;if(!ie)return Da(e),ie=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Co(e.type,e.memoizedProps)),t&&(t=Be)){if(No(e))throw Tu(),Error(N(418));for(;t;)Iu(e,t),t=Rt(t.nextSibling)}if(Da(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(N(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Be=Rt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Be=null}}else Be=Ue?Rt(e.stateNode.nextSibling):null;return!0}function Tu(){for(var e=Be;e;)e=Rt(e.nextSibling)}function Bn(){Be=Ue=null,ie=!1}function _l(e){it===null?it=[e]:it.push(e)}var oh=zt.ReactCurrentBatchConfig;function sr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(N(309));var r=n.stateNode}if(!r)throw Error(N(147,e));var i=r,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(o){var a=i.refs;o===null?delete a[s]:a[s]=o},t._stringRef=s,t)}if(typeof e!="string")throw Error(N(284));if(!n._owner)throw Error(N(290,e))}return e}function si(e,t){throw e=Object.prototype.toString.call(t),Error(N(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ba(e){var t=e._init;return t(e._payload)}function $u(e){function t(p,f){if(e){var m=p.deletions;m===null?(p.deletions=[f],p.flags|=16):m.push(f)}}function n(p,f){if(!e)return null;for(;f!==null;)t(p,f),f=f.sibling;return null}function r(p,f){for(p=new Map;f!==null;)f.key!==null?p.set(f.key,f):p.set(f.index,f),f=f.sibling;return p}function i(p,f){return p=Wt(p,f),p.index=0,p.sibling=null,p}function s(p,f,m){return p.index=m,e?(m=p.alternate,m!==null?(m=m.index,m<f?(p.flags|=2,f):m):(p.flags|=2,f)):(p.flags|=1048576,f)}function o(p){return e&&p.alternate===null&&(p.flags|=2),p}function a(p,f,m,k){return f===null||f.tag!==6?(f=Qs(m,p.mode,k),f.return=p,f):(f=i(f,m),f.return=p,f)}function c(p,f,m,k){var S=m.type;return S===kn?d(p,f,m.props.children,k,m.key):f!==null&&(f.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Nt&&Ba(S)===f.type)?(k=i(f,m.props),k.ref=sr(p,f,m),k.return=p,k):(k=zi(m.type,m.key,m.props,null,p.mode,k),k.ref=sr(p,f,m),k.return=p,k)}function u(p,f,m,k){return f===null||f.tag!==4||f.stateNode.containerInfo!==m.containerInfo||f.stateNode.implementation!==m.implementation?(f=Zs(m,p.mode,k),f.return=p,f):(f=i(f,m.children||[]),f.return=p,f)}function d(p,f,m,k,S){return f===null||f.tag!==7?(f=ln(m,p.mode,k,S),f.return=p,f):(f=i(f,m),f.return=p,f)}function h(p,f,m){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Qs(""+f,p.mode,m),f.return=p,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Xr:return m=zi(f.type,f.key,f.props,null,p.mode,m),m.ref=sr(p,null,f),m.return=p,m;case wn:return f=Zs(f,p.mode,m),f.return=p,f;case Nt:var k=f._init;return h(p,k(f._payload),m)}if(dr(f)||er(f))return f=ln(f,p.mode,m,null),f.return=p,f;si(p,f)}return null}function g(p,f,m,k){var S=f!==null?f.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return S!==null?null:a(p,f,""+m,k);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Xr:return m.key===S?c(p,f,m,k):null;case wn:return m.key===S?u(p,f,m,k):null;case Nt:return S=m._init,g(p,f,S(m._payload),k)}if(dr(m)||er(m))return S!==null?null:d(p,f,m,k,null);si(p,m)}return null}function w(p,f,m,k,S){if(typeof k=="string"&&k!==""||typeof k=="number")return p=p.get(m)||null,a(f,p,""+k,S);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Xr:return p=p.get(k.key===null?m:k.key)||null,c(f,p,k,S);case wn:return p=p.get(k.key===null?m:k.key)||null,u(f,p,k,S);case Nt:var E=k._init;return w(p,f,m,E(k._payload),S)}if(dr(k)||er(k))return p=p.get(m)||null,d(f,p,k,S,null);si(f,k)}return null}function y(p,f,m,k){for(var S=null,E=null,j=f,z=f=0,A=null;j!==null&&z<m.length;z++){j.index>z?(A=j,j=null):A=j.sibling;var M=g(p,j,m[z],k);if(M===null){j===null&&(j=A);break}e&&j&&M.alternate===null&&t(p,j),f=s(M,f,z),E===null?S=M:E.sibling=M,E=M,j=A}if(z===m.length)return n(p,j),ie&&Jt(p,z),S;if(j===null){for(;z<m.length;z++)j=h(p,m[z],k),j!==null&&(f=s(j,f,z),E===null?S=j:E.sibling=j,E=j);return ie&&Jt(p,z),S}for(j=r(p,j);z<m.length;z++)A=w(j,p,z,m[z],k),A!==null&&(e&&A.alternate!==null&&j.delete(A.key===null?z:A.key),f=s(A,f,z),E===null?S=A:E.sibling=A,E=A);return e&&j.forEach(function(W){return t(p,W)}),ie&&Jt(p,z),S}function x(p,f,m,k){var S=er(m);if(typeof S!="function")throw Error(N(150));if(m=S.call(m),m==null)throw Error(N(151));for(var E=S=null,j=f,z=f=0,A=null,M=m.next();j!==null&&!M.done;z++,M=m.next()){j.index>z?(A=j,j=null):A=j.sibling;var W=g(p,j,M.value,k);if(W===null){j===null&&(j=A);break}e&&j&&W.alternate===null&&t(p,j),f=s(W,f,z),E===null?S=W:E.sibling=W,E=W,j=A}if(M.done)return n(p,j),ie&&Jt(p,z),S;if(j===null){for(;!M.done;z++,M=m.next())M=h(p,M.value,k),M!==null&&(f=s(M,f,z),E===null?S=M:E.sibling=M,E=M);return ie&&Jt(p,z),S}for(j=r(p,j);!M.done;z++,M=m.next())M=w(j,p,z,M.value,k),M!==null&&(e&&M.alternate!==null&&j.delete(M.key===null?z:M.key),f=s(M,f,z),E===null?S=M:E.sibling=M,E=M);return e&&j.forEach(function(K){return t(p,K)}),ie&&Jt(p,z),S}function v(p,f,m,k){if(typeof m=="object"&&m!==null&&m.type===kn&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case Xr:e:{for(var S=m.key,E=f;E!==null;){if(E.key===S){if(S=m.type,S===kn){if(E.tag===7){n(p,E.sibling),f=i(E,m.props.children),f.return=p,p=f;break e}}else if(E.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Nt&&Ba(S)===E.type){n(p,E.sibling),f=i(E,m.props),f.ref=sr(p,E,m),f.return=p,p=f;break e}n(p,E);break}else t(p,E);E=E.sibling}m.type===kn?(f=ln(m.props.children,p.mode,k,m.key),f.return=p,p=f):(k=zi(m.type,m.key,m.props,null,p.mode,k),k.ref=sr(p,f,m),k.return=p,p=k)}return o(p);case wn:e:{for(E=m.key;f!==null;){if(f.key===E)if(f.tag===4&&f.stateNode.containerInfo===m.containerInfo&&f.stateNode.implementation===m.implementation){n(p,f.sibling),f=i(f,m.children||[]),f.return=p,p=f;break e}else{n(p,f);break}else t(p,f);f=f.sibling}f=Zs(m,p.mode,k),f.return=p,p=f}return o(p);case Nt:return E=m._init,v(p,f,E(m._payload),k)}if(dr(m))return y(p,f,m,k);if(er(m))return x(p,f,m,k);si(p,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,f!==null&&f.tag===6?(n(p,f.sibling),f=i(f,m),f.return=p,p=f):(n(p,f),f=Qs(m,p.mode,k),f.return=p,p=f),o(p)):n(p,f)}return v}var Un=$u(!0),Ou=$u(!1),Ui=Gt(null),Wi=null,Pn=null,El=null;function jl(){El=Pn=Wi=null}function Cl(e){var t=Ui.current;re(Ui),e._currentValue=t}function Ao(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Ln(e,t){Wi=e,El=Pn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&($e=!0),e.firstContext=null)}function Je(e){var t=e._currentValue;if(El!==e)if(e={context:e,memoizedValue:t,next:null},Pn===null){if(Wi===null)throw Error(N(308));Pn=e,Wi.dependencies={lanes:0,firstContext:e}}else Pn=Pn.next=e;return t}var tn=null;function zl(e){tn===null?tn=[e]:tn.push(e)}function Lu(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,zl(t)):(n.next=i.next,i.next=n),t.interleaved=n,jt(e,r)}function jt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Mt=!1;function bl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function St(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Dt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Z&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,jt(e,n)}return i=r.interleaved,i===null?(t.next=t,zl(r)):(t.next=i.next,i.next=t),r.interleaved=t,jt(e,n)}function ki(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,pl(e,n)}}function Ua(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=t:s=s.next=t}else i=s=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ki(e,t,n,r){var i=e.updateQueue;Mt=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var c=a,u=c.next;c.next=null,o===null?s=u:o.next=u,o=c;var d=e.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==o&&(a===null?d.firstBaseUpdate=u:a.next=u,d.lastBaseUpdate=c))}if(s!==null){var h=i.baseState;o=0,d=u=c=null,a=s;do{var g=a.lane,w=a.eventTime;if((r&g)===g){d!==null&&(d=d.next={eventTime:w,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var y=e,x=a;switch(g=t,w=n,x.tag){case 1:if(y=x.payload,typeof y=="function"){h=y.call(w,h,g);break e}h=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=x.payload,g=typeof y=="function"?y.call(w,h,g):y,g==null)break e;h=le({},h,g);break e;case 2:Mt=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,g=i.effects,g===null?i.effects=[a]:g.push(a))}else w={eventTime:w,lane:g,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(u=d=w,c=h):d=d.next=w,o|=g;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;g=a,a=g.next,g.next=null,i.lastBaseUpdate=g,i.shared.pending=null}}while(!0);if(d===null&&(c=h),i.baseState=c,i.firstBaseUpdate=u,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else s===null&&(i.shared.lanes=0);dn|=o,e.lanes=o,e.memoizedState=h}}function Wa(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(N(191,i));i.call(r)}}}var Hr={},ht=Gt(Hr),$r=Gt(Hr),Or=Gt(Hr);function nn(e){if(e===Hr)throw Error(N(174));return e}function Pl(e,t){switch(te(Or,t),te($r,e),te(ht,Hr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:fo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=fo(t,e)}re(ht),te(ht,t)}function Wn(){re(ht),re($r),re(Or)}function Ru(e){nn(Or.current);var t=nn(ht.current),n=fo(t,e.type);t!==n&&(te($r,e),te(ht,n))}function Nl(e){$r.current===e&&(re(ht),re($r))}var se=Gt(0);function Hi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ks=[];function Ml(){for(var e=0;e<Ks.length;e++)Ks[e]._workInProgressVersionPrimary=null;Ks.length=0}var Si=zt.ReactCurrentDispatcher,Hs=zt.ReactCurrentBatchConfig,un=0,oe=null,pe=null,ye=null,Vi=!1,wr=!1,Lr=0,lh=0;function _e(){throw Error(N(321))}function Al(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!lt(e[n],t[n]))return!1;return!0}function Il(e,t,n,r,i,s){if(un=s,oe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Si.current=e===null||e.memoizedState===null?dh:fh,e=n(r,i),wr){s=0;do{if(wr=!1,Lr=0,25<=s)throw Error(N(301));s+=1,ye=pe=null,t.updateQueue=null,Si.current=ph,e=n(r,i)}while(wr)}if(Si.current=Yi,t=pe!==null&&pe.next!==null,un=0,ye=pe=oe=null,Vi=!1,t)throw Error(N(300));return e}function Tl(){var e=Lr!==0;return Lr=0,e}function ut(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ye===null?oe.memoizedState=ye=e:ye=ye.next=e,ye}function qe(){if(pe===null){var e=oe.alternate;e=e!==null?e.memoizedState:null}else e=pe.next;var t=ye===null?oe.memoizedState:ye.next;if(t!==null)ye=t,pe=e;else{if(e===null)throw Error(N(310));pe=e,e={memoizedState:pe.memoizedState,baseState:pe.baseState,baseQueue:pe.baseQueue,queue:pe.queue,next:null},ye===null?oe.memoizedState=ye=e:ye=ye.next=e}return ye}function Fr(e,t){return typeof t=="function"?t(e):t}function Vs(e){var t=qe(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var r=pe,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var a=o=null,c=null,u=s;do{var d=u.lane;if((un&d)===d)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(a=c=h,o=r):c=c.next=h,oe.lanes|=d,dn|=d}u=u.next}while(u!==null&&u!==s);c===null?o=r:c.next=a,lt(r,t.memoizedState)||($e=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do s=i.lane,oe.lanes|=s,dn|=s,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ys(e){var t=qe(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,s=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=e(s,o.action),o=o.next;while(o!==i);lt(s,t.memoizedState)||($e=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function Du(){}function Bu(e,t){var n=oe,r=qe(),i=t(),s=!lt(r.memoizedState,i);if(s&&(r.memoizedState=i,$e=!0),r=r.queue,$l(Ku.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||ye!==null&&ye.memoizedState.tag&1){if(n.flags|=2048,Rr(9,Wu.bind(null,n,r,i,t),void 0,null),ve===null)throw Error(N(349));un&30||Uu(n,t,i)}return i}function Uu(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=oe.updateQueue,t===null?(t={lastEffect:null,stores:null},oe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Wu(e,t,n,r){t.value=n,t.getSnapshot=r,Hu(t)&&Vu(e)}function Ku(e,t,n){return n(function(){Hu(t)&&Vu(e)})}function Hu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!lt(e,n)}catch{return!0}}function Vu(e){var t=jt(e,1);t!==null&&ot(t,e,1,-1)}function Ka(e){var t=ut();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Fr,lastRenderedState:e},t.queue=e,e=e.dispatch=uh.bind(null,oe,e),[t.memoizedState,e]}function Rr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=oe.updateQueue,t===null?(t={lastEffect:null,stores:null},oe.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Yu(){return qe().memoizedState}function _i(e,t,n,r){var i=ut();oe.flags|=e,i.memoizedState=Rr(1|t,n,void 0,r===void 0?null:r)}function us(e,t,n,r){var i=qe();r=r===void 0?null:r;var s=void 0;if(pe!==null){var o=pe.memoizedState;if(s=o.destroy,r!==null&&Al(r,o.deps)){i.memoizedState=Rr(t,n,s,r);return}}oe.flags|=e,i.memoizedState=Rr(1|t,n,s,r)}function Ha(e,t){return _i(8390656,8,e,t)}function $l(e,t){return us(2048,8,e,t)}function Xu(e,t){return us(4,2,e,t)}function Gu(e,t){return us(4,4,e,t)}function Qu(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Zu(e,t,n){return n=n!=null?n.concat([e]):null,us(4,4,Qu.bind(null,t,e),n)}function Ol(){}function Ju(e,t){var n=qe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Al(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qu(e,t){var n=qe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Al(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function ed(e,t,n){return un&21?(lt(n,t)||(n=su(),oe.lanes|=n,dn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,$e=!0),e.memoizedState=n)}function ah(e,t){var n=ee;ee=n!==0&&4>n?n:4,e(!0);var r=Hs.transition;Hs.transition={};try{e(!1),t()}finally{ee=n,Hs.transition=r}}function td(){return qe().memoizedState}function ch(e,t,n){var r=Ut(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},nd(e))rd(t,n);else if(n=Lu(e,t,n,r),n!==null){var i=be();ot(n,e,r,i),id(n,t,r)}}function uh(e,t,n){var r=Ut(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(nd(e))rd(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var o=t.lastRenderedState,a=s(o,n);if(i.hasEagerState=!0,i.eagerState=a,lt(a,o)){var c=t.interleaved;c===null?(i.next=i,zl(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}finally{}n=Lu(e,t,i,r),n!==null&&(i=be(),ot(n,e,r,i),id(n,t,r))}}function nd(e){var t=e.alternate;return e===oe||t!==null&&t===oe}function rd(e,t){wr=Vi=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function id(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,pl(e,n)}}var Yi={readContext:Je,useCallback:_e,useContext:_e,useEffect:_e,useImperativeHandle:_e,useInsertionEffect:_e,useLayoutEffect:_e,useMemo:_e,useReducer:_e,useRef:_e,useState:_e,useDebugValue:_e,useDeferredValue:_e,useTransition:_e,useMutableSource:_e,useSyncExternalStore:_e,useId:_e,unstable_isNewReconciler:!1},dh={readContext:Je,useCallback:function(e,t){return ut().memoizedState=[e,t===void 0?null:t],e},useContext:Je,useEffect:Ha,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,_i(4194308,4,Qu.bind(null,t,e),n)},useLayoutEffect:function(e,t){return _i(4194308,4,e,t)},useInsertionEffect:function(e,t){return _i(4,2,e,t)},useMemo:function(e,t){var n=ut();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=ut();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=ch.bind(null,oe,e),[r.memoizedState,e]},useRef:function(e){var t=ut();return e={current:e},t.memoizedState=e},useState:Ka,useDebugValue:Ol,useDeferredValue:function(e){return ut().memoizedState=e},useTransition:function(){var e=Ka(!1),t=e[0];return e=ah.bind(null,e[1]),ut().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=oe,i=ut();if(ie){if(n===void 0)throw Error(N(407));n=n()}else{if(n=t(),ve===null)throw Error(N(349));un&30||Uu(r,t,n)}i.memoizedState=n;var s={value:n,getSnapshot:t};return i.queue=s,Ha(Ku.bind(null,r,s,e),[e]),r.flags|=2048,Rr(9,Wu.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=ut(),t=ve.identifierPrefix;if(ie){var n=vt,r=yt;n=(r&~(1<<32-st(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Lr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=lh++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},fh={readContext:Je,useCallback:Ju,useContext:Je,useEffect:$l,useImperativeHandle:Zu,useInsertionEffect:Xu,useLayoutEffect:Gu,useMemo:qu,useReducer:Vs,useRef:Yu,useState:function(){return Vs(Fr)},useDebugValue:Ol,useDeferredValue:function(e){var t=qe();return ed(t,pe.memoizedState,e)},useTransition:function(){var e=Vs(Fr)[0],t=qe().memoizedState;return[e,t]},useMutableSource:Du,useSyncExternalStore:Bu,useId:td,unstable_isNewReconciler:!1},ph={readContext:Je,useCallback:Ju,useContext:Je,useEffect:$l,useImperativeHandle:Zu,useInsertionEffect:Xu,useLayoutEffect:Gu,useMemo:qu,useReducer:Ys,useRef:Yu,useState:function(){return Ys(Fr)},useDebugValue:Ol,useDeferredValue:function(e){var t=qe();return pe===null?t.memoizedState=e:ed(t,pe.memoizedState,e)},useTransition:function(){var e=Ys(Fr)[0],t=qe().memoizedState;return[e,t]},useMutableSource:Du,useSyncExternalStore:Bu,useId:td,unstable_isNewReconciler:!1};function nt(e,t){if(e&&e.defaultProps){t=le({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Io(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:le({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ds={isMounted:function(e){return(e=e._reactInternals)?gn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=be(),i=Ut(e),s=St(r,i);s.payload=t,n!=null&&(s.callback=n),t=Dt(e,s,i),t!==null&&(ot(t,e,i,r),ki(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=be(),i=Ut(e),s=St(r,i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=Dt(e,s,i),t!==null&&(ot(t,e,i,r),ki(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=be(),r=Ut(e),i=St(n,r);i.tag=2,t!=null&&(i.callback=t),t=Dt(e,i,r),t!==null&&(ot(t,e,r,n),ki(t,e,r))}};function Va(e,t,n,r,i,s,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,s,o):t.prototype&&t.prototype.isPureReactComponent?!Mr(n,r)||!Mr(i,s):!0}function sd(e,t,n){var r=!1,i=Vt,s=t.contextType;return typeof s=="object"&&s!==null?s=Je(s):(i=Fe(t)?an:Ce.current,r=t.contextTypes,s=(r=r!=null)?Dn(e,i):Vt),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ds,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),t}function Ya(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ds.enqueueReplaceState(t,t.state,null)}function To(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},bl(e);var s=t.contextType;typeof s=="object"&&s!==null?i.context=Je(s):(s=Fe(t)?an:Ce.current,i.context=Dn(e,s)),i.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(Io(e,t,s,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&ds.enqueueReplaceState(i,i.state,null),Ki(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Kn(e,t){try{var n="",r=t;do n+=Bf(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:i,digest:null}}function Xs(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function $o(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var hh=typeof WeakMap=="function"?WeakMap:Map;function od(e,t,n){n=St(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Gi||(Gi=!0,Ho=r),$o(e,t)},n}function ld(e,t,n){n=St(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){$o(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){$o(e,t),typeof r!="function"&&(Bt===null?Bt=new Set([this]):Bt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Xa(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new hh;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=bh.bind(null,e,t,n),t.then(e,e))}function Ga(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Qa(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=St(-1,1),t.tag=2,Dt(n,t,1))),n.lanes|=1),e)}var mh=zt.ReactCurrentOwner,$e=!1;function ze(e,t,n,r){t.child=e===null?Ou(t,null,n,r):Un(t,e.child,n,r)}function Za(e,t,n,r,i){n=n.render;var s=t.ref;return Ln(t,i),r=Il(e,t,n,r,s,i),n=Tl(),e!==null&&!$e?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Ct(e,t,i)):(ie&&n&&kl(t),t.flags|=1,ze(e,t,r,i),t.child)}function Ja(e,t,n,r,i){if(e===null){var s=n.type;return typeof s=="function"&&!Kl(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,ad(e,t,s,r,i)):(e=zi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Mr,n(o,r)&&e.ref===t.ref)return Ct(e,t,i)}return t.flags|=1,e=Wt(s,r),e.ref=t.ref,e.return=t,t.child=e}function ad(e,t,n,r,i){if(e!==null){var s=e.memoizedProps;if(Mr(s,r)&&e.ref===t.ref)if($e=!1,t.pendingProps=r=s,(e.lanes&i)!==0)e.flags&131072&&($e=!0);else return t.lanes=e.lanes,Ct(e,t,i)}return Oo(e,t,n,r,i)}function cd(e,t,n){var r=t.pendingProps,i=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},te(Mn,De),De|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,te(Mn,De),De|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,te(Mn,De),De|=r}else s!==null?(r=s.baseLanes|n,t.memoizedState=null):r=n,te(Mn,De),De|=r;return ze(e,t,i,n),t.child}function ud(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Oo(e,t,n,r,i){var s=Fe(n)?an:Ce.current;return s=Dn(t,s),Ln(t,i),n=Il(e,t,n,r,s,i),r=Tl(),e!==null&&!$e?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Ct(e,t,i)):(ie&&r&&kl(t),t.flags|=1,ze(e,t,n,i),t.child)}function qa(e,t,n,r,i){if(Fe(n)){var s=!0;Ri(t)}else s=!1;if(Ln(t,i),t.stateNode===null)Ei(e,t),sd(t,n,r),To(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,a=t.memoizedProps;o.props=a;var c=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=Je(u):(u=Fe(n)?an:Ce.current,u=Dn(t,u));var d=n.getDerivedStateFromProps,h=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||c!==u)&&Ya(t,o,r,u),Mt=!1;var g=t.memoizedState;o.state=g,Ki(t,r,o,i),c=t.memoizedState,a!==r||g!==c||Le.current||Mt?(typeof d=="function"&&(Io(t,n,d,r),c=t.memoizedState),(a=Mt||Va(t,n,a,r,g,c,u))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=u,r=a):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Fu(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:nt(t.type,a),o.props=u,h=t.pendingProps,g=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=Je(c):(c=Fe(n)?an:Ce.current,c=Dn(t,c));var w=n.getDerivedStateFromProps;(d=typeof w=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==h||g!==c)&&Ya(t,o,r,c),Mt=!1,g=t.memoizedState,o.state=g,Ki(t,r,o,i);var y=t.memoizedState;a!==h||g!==y||Le.current||Mt?(typeof w=="function"&&(Io(t,n,w,r),y=t.memoizedState),(u=Mt||Va(t,n,u,r,g,y,c)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,y,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,y,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=y),o.props=r,o.state=y,o.context=c,r=u):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return Lo(e,t,n,r,s,i)}function Lo(e,t,n,r,i,s){ud(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return i&&Fa(t,n,!1),Ct(e,t,s);r=t.stateNode,mh.current=t;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Un(t,e.child,null,s),t.child=Un(t,null,a,s)):ze(e,t,a,s),t.memoizedState=r.state,i&&Fa(t,n,!0),t.child}function dd(e){var t=e.stateNode;t.pendingContext?La(e,t.pendingContext,t.pendingContext!==t.context):t.context&&La(e,t.context,!1),Pl(e,t.containerInfo)}function ec(e,t,n,r,i){return Bn(),_l(i),t.flags|=256,ze(e,t,n,r),t.child}var Fo={dehydrated:null,treeContext:null,retryLane:0};function Ro(e){return{baseLanes:e,cachePool:null,transitions:null}}function fd(e,t,n){var r=t.pendingProps,i=se.current,s=!1,o=(t.flags&128)!==0,a;if((a=o)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),te(se,i&1),e===null)return Mo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,s?(r=t.mode,s=t.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=hs(o,r,0,null),e=ln(e,r,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Ro(n),t.memoizedState=Fo,e):Ll(t,o));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return gh(e,t,o,r,a,i,n);if(s){s=r.fallback,o=t.mode,i=e.child,a=i.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Wt(i,c),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?s=Wt(a,s):(s=ln(s,o,n,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,o=e.child.memoizedState,o=o===null?Ro(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=e.childLanes&~n,t.memoizedState=Fo,r}return s=e.child,e=s.sibling,r=Wt(s,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Ll(e,t){return t=hs({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function oi(e,t,n,r){return r!==null&&_l(r),Un(t,e.child,null,n),e=Ll(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function gh(e,t,n,r,i,s,o){if(n)return t.flags&256?(t.flags&=-257,r=Xs(Error(N(422))),oi(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=r.fallback,i=t.mode,r=hs({mode:"visible",children:r.children},i,0,null),s=ln(s,i,o,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,t.mode&1&&Un(t,e.child,null,o),t.child.memoizedState=Ro(o),t.memoizedState=Fo,s);if(!(t.mode&1))return oi(e,t,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,s=Error(N(419)),r=Xs(s,r,void 0),oi(e,t,o,r)}if(a=(o&e.childLanes)!==0,$e||a){if(r=ve,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,jt(e,i),ot(r,e,i,-1))}return Wl(),r=Xs(Error(N(421))),oi(e,t,o,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=Ph.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,Be=Rt(i.nextSibling),Ue=t,ie=!0,it=null,e!==null&&(Xe[Ge++]=yt,Xe[Ge++]=vt,Xe[Ge++]=cn,yt=e.id,vt=e.overflow,cn=t),t=Ll(t,r.children),t.flags|=4096,t)}function tc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ao(e.return,t,n)}function Gs(e,t,n,r,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function pd(e,t,n){var r=t.pendingProps,i=r.revealOrder,s=r.tail;if(ze(e,t,r.children,n),r=se.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&tc(e,n,t);else if(e.tag===19)tc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(te(se,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Hi(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Gs(t,!1,i,n,s);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Hi(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Gs(t,!0,n,null,s);break;case"together":Gs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ei(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Ct(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),dn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(N(153));if(t.child!==null){for(e=t.child,n=Wt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Wt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function yh(e,t,n){switch(t.tag){case 3:dd(t),Bn();break;case 5:Ru(t);break;case 1:Fe(t.type)&&Ri(t);break;case 4:Pl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;te(Ui,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(te(se,se.current&1),t.flags|=128,null):n&t.child.childLanes?fd(e,t,n):(te(se,se.current&1),e=Ct(e,t,n),e!==null?e.sibling:null);te(se,se.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return pd(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),te(se,se.current),r)break;return null;case 22:case 23:return t.lanes=0,cd(e,t,n)}return Ct(e,t,n)}var hd,Do,md,gd;hd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Do=function(){};md=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,nn(ht.current);var s=null;switch(n){case"input":i=lo(e,i),r=lo(e,r),s=[];break;case"select":i=le({},i,{value:void 0}),r=le({},r,{value:void 0}),s=[];break;case"textarea":i=uo(e,i),r=uo(e,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Li)}po(n,r);var o;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var a=i[u];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Er.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in r){var c=r[u];if(a=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&c!==a&&(c!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&a[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(s||(s=[]),s.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,a=a?a.__html:void 0,c!=null&&a!==c&&(s=s||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Er.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&ne("scroll",e),s||a===c||(s=[])):(s=s||[]).push(u,c))}n&&(s=s||[]).push("style",n);var u=s;(t.updateQueue=u)&&(t.flags|=4)}};gd=function(e,t,n,r){n!==r&&(t.flags|=4)};function or(e,t){if(!ie)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ee(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function vh(e,t,n){var r=t.pendingProps;switch(Sl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ee(t),null;case 1:return Fe(t.type)&&Fi(),Ee(t),null;case 3:return r=t.stateNode,Wn(),re(Le),re(Ce),Ml(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ii(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,it!==null&&(Xo(it),it=null))),Do(e,t),Ee(t),null;case 5:Nl(t);var i=nn(Or.current);if(n=t.type,e!==null&&t.stateNode!=null)md(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(N(166));return Ee(t),null}if(e=nn(ht.current),ii(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[dt]=t,r[Tr]=s,e=(t.mode&1)!==0,n){case"dialog":ne("cancel",r),ne("close",r);break;case"iframe":case"object":case"embed":ne("load",r);break;case"video":case"audio":for(i=0;i<pr.length;i++)ne(pr[i],r);break;case"source":ne("error",r);break;case"img":case"image":case"link":ne("error",r),ne("load",r);break;case"details":ne("toggle",r);break;case"input":ua(r,s),ne("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},ne("invalid",r);break;case"textarea":fa(r,s),ne("invalid",r)}po(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?r.textContent!==a&&(s.suppressHydrationWarning!==!0&&ri(r.textContent,a,e),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&ri(r.textContent,a,e),i=["children",""+a]):Er.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ne("scroll",r)}switch(n){case"input":Gr(r),da(r,s,!0);break;case"textarea":Gr(r),pa(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Li)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Kc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[dt]=t,e[Tr]=r,hd(e,t,!1,!1),t.stateNode=e;e:{switch(o=ho(n,r),n){case"dialog":ne("cancel",e),ne("close",e),i=r;break;case"iframe":case"object":case"embed":ne("load",e),i=r;break;case"video":case"audio":for(i=0;i<pr.length;i++)ne(pr[i],e);i=r;break;case"source":ne("error",e),i=r;break;case"img":case"image":case"link":ne("error",e),ne("load",e),i=r;break;case"details":ne("toggle",e),i=r;break;case"input":ua(e,r),i=lo(e,r),ne("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=le({},r,{value:void 0}),ne("invalid",e);break;case"textarea":fa(e,r),i=uo(e,r),ne("invalid",e);break;default:i=r}po(n,i),a=i;for(s in a)if(a.hasOwnProperty(s)){var c=a[s];s==="style"?Yc(e,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Hc(e,c)):s==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&jr(e,c):typeof c=="number"&&jr(e,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Er.hasOwnProperty(s)?c!=null&&s==="onScroll"&&ne("scroll",e):c!=null&&ll(e,s,c,o))}switch(n){case"input":Gr(e),da(e,r,!1);break;case"textarea":Gr(e),pa(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Ht(r.value));break;case"select":e.multiple=!!r.multiple,s=r.value,s!=null?In(e,!!r.multiple,s,!1):r.defaultValue!=null&&In(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Li)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ee(t),null;case 6:if(e&&t.stateNode!=null)gd(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(N(166));if(n=nn(Or.current),nn(ht.current),ii(t)){if(r=t.stateNode,n=t.memoizedProps,r[dt]=t,(s=r.nodeValue!==n)&&(e=Ue,e!==null))switch(e.tag){case 3:ri(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ri(r.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[dt]=t,t.stateNode=r}return Ee(t),null;case 13:if(re(se),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ie&&Be!==null&&t.mode&1&&!(t.flags&128))Tu(),Bn(),t.flags|=98560,s=!1;else if(s=ii(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(N(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(N(317));s[dt]=t}else Bn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ee(t),s=!1}else it!==null&&(Xo(it),it=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||se.current&1?he===0&&(he=3):Wl())),t.updateQueue!==null&&(t.flags|=4),Ee(t),null);case 4:return Wn(),Do(e,t),e===null&&Ar(t.stateNode.containerInfo),Ee(t),null;case 10:return Cl(t.type._context),Ee(t),null;case 17:return Fe(t.type)&&Fi(),Ee(t),null;case 19:if(re(se),s=t.memoizedState,s===null)return Ee(t),null;if(r=(t.flags&128)!==0,o=s.rendering,o===null)if(r)or(s,!1);else{if(he!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Hi(e),o!==null){for(t.flags|=128,or(s,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,e=o.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return te(se,se.current&1|2),t.child}e=e.sibling}s.tail!==null&&ue()>Hn&&(t.flags|=128,r=!0,or(s,!1),t.lanes=4194304)}else{if(!r)if(e=Hi(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),or(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ie)return Ee(t),null}else 2*ue()-s.renderingStartTime>Hn&&n!==1073741824&&(t.flags|=128,r=!0,or(s,!1),t.lanes=4194304);s.isBackwards?(o.sibling=t.child,t.child=o):(n=s.last,n!==null?n.sibling=o:t.child=o,s.last=o)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=ue(),t.sibling=null,n=se.current,te(se,r?n&1|2:n&1),t):(Ee(t),null);case 22:case 23:return Ul(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?De&1073741824&&(Ee(t),t.subtreeFlags&6&&(t.flags|=8192)):Ee(t),null;case 24:return null;case 25:return null}throw Error(N(156,t.tag))}function xh(e,t){switch(Sl(t),t.tag){case 1:return Fe(t.type)&&Fi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Wn(),re(Le),re(Ce),Ml(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Nl(t),null;case 13:if(re(se),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(N(340));Bn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return re(se),null;case 4:return Wn(),null;case 10:return Cl(t.type._context),null;case 22:case 23:return Ul(),null;case 24:return null;default:return null}}var li=!1,je=!1,wh=typeof WeakSet=="function"?WeakSet:Set,O=null;function Nn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ae(e,t,r)}else n.current=null}function Bo(e,t,n){try{n()}catch(r){ae(e,t,r)}}var nc=!1;function kh(e,t){if(Eo=Ti,e=ku(),wl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,c=-1,u=0,d=0,h=e,g=null;t:for(;;){for(var w;h!==n||i!==0&&h.nodeType!==3||(a=o+i),h!==s||r!==0&&h.nodeType!==3||(c=o+r),h.nodeType===3&&(o+=h.nodeValue.length),(w=h.firstChild)!==null;)g=h,h=w;for(;;){if(h===e)break t;if(g===n&&++u===i&&(a=o),g===s&&++d===r&&(c=o),(w=h.nextSibling)!==null)break;h=g,g=h.parentNode}h=w}n=a===-1||c===-1?null:{start:a,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(jo={focusedElem:e,selectionRange:n},Ti=!1,O=t;O!==null;)if(t=O,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,O=e;else for(;O!==null;){t=O;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var x=y.memoizedProps,v=y.memoizedState,p=t.stateNode,f=p.getSnapshotBeforeUpdate(t.elementType===t.type?x:nt(t.type,x),v);p.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(N(163))}}catch(k){ae(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,O=e;break}O=t.return}return y=nc,nc=!1,y}function kr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&Bo(t,n,s)}i=i.next}while(i!==r)}}function fs(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Uo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function yd(e){var t=e.alternate;t!==null&&(e.alternate=null,yd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[dt],delete t[Tr],delete t[bo],delete t[rh],delete t[ih])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function vd(e){return e.tag===5||e.tag===3||e.tag===4}function rc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||vd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Wo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Li));else if(r!==4&&(e=e.child,e!==null))for(Wo(e,t,n),e=e.sibling;e!==null;)Wo(e,t,n),e=e.sibling}function Ko(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ko(e,t,n),e=e.sibling;e!==null;)Ko(e,t,n),e=e.sibling}var xe=null,rt=!1;function Pt(e,t,n){for(n=n.child;n!==null;)xd(e,t,n),n=n.sibling}function xd(e,t,n){if(pt&&typeof pt.onCommitFiberUnmount=="function")try{pt.onCommitFiberUnmount(is,n)}catch{}switch(n.tag){case 5:je||Nn(n,t);case 6:var r=xe,i=rt;xe=null,Pt(e,t,n),xe=r,rt=i,xe!==null&&(rt?(e=xe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):xe.removeChild(n.stateNode));break;case 18:xe!==null&&(rt?(e=xe,n=n.stateNode,e.nodeType===8?Us(e.parentNode,n):e.nodeType===1&&Us(e,n),Pr(e)):Us(xe,n.stateNode));break;case 4:r=xe,i=rt,xe=n.stateNode.containerInfo,rt=!0,Pt(e,t,n),xe=r,rt=i;break;case 0:case 11:case 14:case 15:if(!je&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Bo(n,t,o),i=i.next}while(i!==r)}Pt(e,t,n);break;case 1:if(!je&&(Nn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){ae(n,t,a)}Pt(e,t,n);break;case 21:Pt(e,t,n);break;case 22:n.mode&1?(je=(r=je)||n.memoizedState!==null,Pt(e,t,n),je=r):Pt(e,t,n);break;default:Pt(e,t,n)}}function ic(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new wh),t.forEach(function(r){var i=Nh.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function et(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=e,o=t,a=o;e:for(;a!==null;){switch(a.tag){case 5:xe=a.stateNode,rt=!1;break e;case 3:xe=a.stateNode.containerInfo,rt=!0;break e;case 4:xe=a.stateNode.containerInfo,rt=!0;break e}a=a.return}if(xe===null)throw Error(N(160));xd(s,o,i),xe=null,rt=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(u){ae(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)wd(t,e),t=t.sibling}function wd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(et(t,e),at(e),r&4){try{kr(3,e,e.return),fs(3,e)}catch(x){ae(e,e.return,x)}try{kr(5,e,e.return)}catch(x){ae(e,e.return,x)}}break;case 1:et(t,e),at(e),r&512&&n!==null&&Nn(n,n.return);break;case 5:if(et(t,e),at(e),r&512&&n!==null&&Nn(n,n.return),e.flags&32){var i=e.stateNode;try{jr(i,"")}catch(x){ae(e,e.return,x)}}if(r&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,o=n!==null?n.memoizedProps:s,a=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Uc(i,s),ho(a,o);var u=ho(a,s);for(o=0;o<c.length;o+=2){var d=c[o],h=c[o+1];d==="style"?Yc(i,h):d==="dangerouslySetInnerHTML"?Hc(i,h):d==="children"?jr(i,h):ll(i,d,h,u)}switch(a){case"input":ao(i,s);break;case"textarea":Wc(i,s);break;case"select":var g=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var w=s.value;w!=null?In(i,!!s.multiple,w,!1):g!==!!s.multiple&&(s.defaultValue!=null?In(i,!!s.multiple,s.defaultValue,!0):In(i,!!s.multiple,s.multiple?[]:"",!1))}i[Tr]=s}catch(x){ae(e,e.return,x)}}break;case 6:if(et(t,e),at(e),r&4){if(e.stateNode===null)throw Error(N(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(x){ae(e,e.return,x)}}break;case 3:if(et(t,e),at(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Pr(t.containerInfo)}catch(x){ae(e,e.return,x)}break;case 4:et(t,e),at(e);break;case 13:et(t,e),at(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Dl=ue())),r&4&&ic(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(je=(u=je)||d,et(t,e),je=u):et(t,e),at(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(O=e,d=e.child;d!==null;){for(h=O=d;O!==null;){switch(g=O,w=g.child,g.tag){case 0:case 11:case 14:case 15:kr(4,g,g.return);break;case 1:Nn(g,g.return);var y=g.stateNode;if(typeof y.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(x){ae(r,n,x)}}break;case 5:Nn(g,g.return);break;case 22:if(g.memoizedState!==null){oc(h);continue}}w!==null?(w.return=g,O=w):oc(h)}d=d.sibling}e:for(d=null,h=e;;){if(h.tag===5){if(d===null){d=h;try{i=h.stateNode,u?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=h.stateNode,c=h.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,a.style.display=Vc("display",o))}catch(x){ae(e,e.return,x)}}}else if(h.tag===6){if(d===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(x){ae(e,e.return,x)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:et(t,e),at(e),r&4&&ic(e);break;case 21:break;default:et(t,e),at(e)}}function at(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(vd(n)){var r=n;break e}n=n.return}throw Error(N(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(jr(i,""),r.flags&=-33);var s=rc(e);Ko(e,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=rc(e);Wo(e,a,o);break;default:throw Error(N(161))}}catch(c){ae(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Sh(e,t,n){O=e,kd(e)}function kd(e,t,n){for(var r=(e.mode&1)!==0;O!==null;){var i=O,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||li;if(!o){var a=i.alternate,c=a!==null&&a.memoizedState!==null||je;a=li;var u=je;if(li=o,(je=c)&&!u)for(O=i;O!==null;)o=O,c=o.child,o.tag===22&&o.memoizedState!==null?lc(i):c!==null?(c.return=o,O=c):lc(i);for(;s!==null;)O=s,kd(s),s=s.sibling;O=i,li=a,je=u}sc(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,O=s):sc(e)}}function sc(e){for(;O!==null;){var t=O;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:je||fs(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!je)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:nt(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&Wa(t,s,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Wa(t,o,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var h=d.dehydrated;h!==null&&Pr(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(N(163))}je||t.flags&512&&Uo(t)}catch(g){ae(t,t.return,g)}}if(t===e){O=null;break}if(n=t.sibling,n!==null){n.return=t.return,O=n;break}O=t.return}}function oc(e){for(;O!==null;){var t=O;if(t===e){O=null;break}var n=t.sibling;if(n!==null){n.return=t.return,O=n;break}O=t.return}}function lc(e){for(;O!==null;){var t=O;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{fs(4,t)}catch(c){ae(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(c){ae(t,i,c)}}var s=t.return;try{Uo(t)}catch(c){ae(t,s,c)}break;case 5:var o=t.return;try{Uo(t)}catch(c){ae(t,o,c)}}}catch(c){ae(t,t.return,c)}if(t===e){O=null;break}var a=t.sibling;if(a!==null){a.return=t.return,O=a;break}O=t.return}}var _h=Math.ceil,Xi=zt.ReactCurrentDispatcher,Fl=zt.ReactCurrentOwner,Ze=zt.ReactCurrentBatchConfig,Z=0,ve=null,de=null,ke=0,De=0,Mn=Gt(0),he=0,Dr=null,dn=0,ps=0,Rl=0,Sr=null,Te=null,Dl=0,Hn=1/0,mt=null,Gi=!1,Ho=null,Bt=null,ai=!1,$t=null,Qi=0,_r=0,Vo=null,ji=-1,Ci=0;function be(){return Z&6?ue():ji!==-1?ji:ji=ue()}function Ut(e){return e.mode&1?Z&2&&ke!==0?ke&-ke:oh.transition!==null?(Ci===0&&(Ci=su()),Ci):(e=ee,e!==0||(e=window.event,e=e===void 0?16:fu(e.type)),e):1}function ot(e,t,n,r){if(50<_r)throw _r=0,Vo=null,Error(N(185));Ur(e,n,r),(!(Z&2)||e!==ve)&&(e===ve&&(!(Z&2)&&(ps|=n),he===4&&It(e,ke)),Re(e,r),n===1&&Z===0&&!(t.mode&1)&&(Hn=ue()+500,cs&&Qt()))}function Re(e,t){var n=e.callbackNode;op(e,t);var r=Ii(e,e===ve?ke:0);if(r===0)n!==null&&ga(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ga(n),t===1)e.tag===0?sh(ac.bind(null,e)):Mu(ac.bind(null,e)),th(function(){!(Z&6)&&Qt()}),n=null;else{switch(ou(r)){case 1:n=fl;break;case 4:n=ru;break;case 16:n=Ai;break;case 536870912:n=iu;break;default:n=Ai}n=Pd(n,Sd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Sd(e,t){if(ji=-1,Ci=0,Z&6)throw Error(N(327));var n=e.callbackNode;if(Fn()&&e.callbackNode!==n)return null;var r=Ii(e,e===ve?ke:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Zi(e,r);else{t=r;var i=Z;Z|=2;var s=Ed();(ve!==e||ke!==t)&&(mt=null,Hn=ue()+500,on(e,t));do try{Ch();break}catch(a){_d(e,a)}while(!0);jl(),Xi.current=s,Z=i,de!==null?t=0:(ve=null,ke=0,t=he)}if(t!==0){if(t===2&&(i=xo(e),i!==0&&(r=i,t=Yo(e,i))),t===1)throw n=Dr,on(e,0),It(e,r),Re(e,ue()),n;if(t===6)It(e,r);else{if(i=e.current.alternate,!(r&30)&&!Eh(i)&&(t=Zi(e,r),t===2&&(s=xo(e),s!==0&&(r=s,t=Yo(e,s))),t===1))throw n=Dr,on(e,0),It(e,r),Re(e,ue()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(N(345));case 2:qt(e,Te,mt);break;case 3:if(It(e,r),(r&130023424)===r&&(t=Dl+500-ue(),10<t)){if(Ii(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){be(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=zo(qt.bind(null,e,Te,mt),t);break}qt(e,Te,mt);break;case 4:if(It(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var o=31-st(r);s=1<<o,o=t[o],o>i&&(i=o),r&=~s}if(r=i,r=ue()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*_h(r/1960))-r,10<r){e.timeoutHandle=zo(qt.bind(null,e,Te,mt),r);break}qt(e,Te,mt);break;case 5:qt(e,Te,mt);break;default:throw Error(N(329))}}}return Re(e,ue()),e.callbackNode===n?Sd.bind(null,e):null}function Yo(e,t){var n=Sr;return e.current.memoizedState.isDehydrated&&(on(e,t).flags|=256),e=Zi(e,t),e!==2&&(t=Te,Te=n,t!==null&&Xo(t)),e}function Xo(e){Te===null?Te=e:Te.push.apply(Te,e)}function Eh(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!lt(s(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function It(e,t){for(t&=~Rl,t&=~ps,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-st(t),r=1<<n;e[n]=-1,t&=~r}}function ac(e){if(Z&6)throw Error(N(327));Fn();var t=Ii(e,0);if(!(t&1))return Re(e,ue()),null;var n=Zi(e,t);if(e.tag!==0&&n===2){var r=xo(e);r!==0&&(t=r,n=Yo(e,r))}if(n===1)throw n=Dr,on(e,0),It(e,t),Re(e,ue()),n;if(n===6)throw Error(N(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,qt(e,Te,mt),Re(e,ue()),null}function Bl(e,t){var n=Z;Z|=1;try{return e(t)}finally{Z=n,Z===0&&(Hn=ue()+500,cs&&Qt())}}function fn(e){$t!==null&&$t.tag===0&&!(Z&6)&&Fn();var t=Z;Z|=1;var n=Ze.transition,r=ee;try{if(Ze.transition=null,ee=1,e)return e()}finally{ee=r,Ze.transition=n,Z=t,!(Z&6)&&Qt()}}function Ul(){De=Mn.current,re(Mn)}function on(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,eh(n)),de!==null)for(n=de.return;n!==null;){var r=n;switch(Sl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Fi();break;case 3:Wn(),re(Le),re(Ce),Ml();break;case 5:Nl(r);break;case 4:Wn();break;case 13:re(se);break;case 19:re(se);break;case 10:Cl(r.type._context);break;case 22:case 23:Ul()}n=n.return}if(ve=e,de=e=Wt(e.current,null),ke=De=t,he=0,Dr=null,Rl=ps=dn=0,Te=Sr=null,tn!==null){for(t=0;t<tn.length;t++)if(n=tn[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}tn=null}return e}function _d(e,t){do{var n=de;try{if(jl(),Si.current=Yi,Vi){for(var r=oe.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Vi=!1}if(un=0,ye=pe=oe=null,wr=!1,Lr=0,Fl.current=null,n===null||n.return===null){he=1,Dr=t,de=null;break}e:{var s=e,o=n.return,a=n,c=t;if(t=ke,a.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,d=a,h=d.tag;if(!(d.mode&1)&&(h===0||h===11||h===15)){var g=d.alternate;g?(d.updateQueue=g.updateQueue,d.memoizedState=g.memoizedState,d.lanes=g.lanes):(d.updateQueue=null,d.memoizedState=null)}var w=Ga(o);if(w!==null){w.flags&=-257,Qa(w,o,a,s,t),w.mode&1&&Xa(s,u,t),t=w,c=u;var y=t.updateQueue;if(y===null){var x=new Set;x.add(c),t.updateQueue=x}else y.add(c);break e}else{if(!(t&1)){Xa(s,u,t),Wl();break e}c=Error(N(426))}}else if(ie&&a.mode&1){var v=Ga(o);if(v!==null){!(v.flags&65536)&&(v.flags|=256),Qa(v,o,a,s,t),_l(Kn(c,a));break e}}s=c=Kn(c,a),he!==4&&(he=2),Sr===null?Sr=[s]:Sr.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var p=od(s,c,t);Ua(s,p);break e;case 1:a=c;var f=s.type,m=s.stateNode;if(!(s.flags&128)&&(typeof f.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(Bt===null||!Bt.has(m)))){s.flags|=65536,t&=-t,s.lanes|=t;var k=ld(s,a,t);Ua(s,k);break e}}s=s.return}while(s!==null)}Cd(n)}catch(S){t=S,de===n&&n!==null&&(de=n=n.return);continue}break}while(!0)}function Ed(){var e=Xi.current;return Xi.current=Yi,e===null?Yi:e}function Wl(){(he===0||he===3||he===2)&&(he=4),ve===null||!(dn&268435455)&&!(ps&268435455)||It(ve,ke)}function Zi(e,t){var n=Z;Z|=2;var r=Ed();(ve!==e||ke!==t)&&(mt=null,on(e,t));do try{jh();break}catch(i){_d(e,i)}while(!0);if(jl(),Z=n,Xi.current=r,de!==null)throw Error(N(261));return ve=null,ke=0,he}function jh(){for(;de!==null;)jd(de)}function Ch(){for(;de!==null&&!Zf();)jd(de)}function jd(e){var t=bd(e.alternate,e,De);e.memoizedProps=e.pendingProps,t===null?Cd(e):de=t,Fl.current=null}function Cd(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=xh(n,t),n!==null){n.flags&=32767,de=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{he=6,de=null;return}}else if(n=vh(n,t,De),n!==null){de=n;return}if(t=t.sibling,t!==null){de=t;return}de=t=e}while(t!==null);he===0&&(he=5)}function qt(e,t,n){var r=ee,i=Ze.transition;try{Ze.transition=null,ee=1,zh(e,t,n,r)}finally{Ze.transition=i,ee=r}return null}function zh(e,t,n,r){do Fn();while($t!==null);if(Z&6)throw Error(N(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(N(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(lp(e,s),e===ve&&(de=ve=null,ke=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ai||(ai=!0,Pd(Ai,function(){return Fn(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Ze.transition,Ze.transition=null;var o=ee;ee=1;var a=Z;Z|=4,Fl.current=null,kh(e,n),wd(n,e),Yp(jo),Ti=!!Eo,jo=Eo=null,e.current=n,Sh(n),Jf(),Z=a,ee=o,Ze.transition=s}else e.current=n;if(ai&&(ai=!1,$t=e,Qi=i),s=e.pendingLanes,s===0&&(Bt=null),tp(n.stateNode),Re(e,ue()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Gi)throw Gi=!1,e=Ho,Ho=null,e;return Qi&1&&e.tag!==0&&Fn(),s=e.pendingLanes,s&1?e===Vo?_r++:(_r=0,Vo=e):_r=0,Qt(),null}function Fn(){if($t!==null){var e=ou(Qi),t=Ze.transition,n=ee;try{if(Ze.transition=null,ee=16>e?16:e,$t===null)var r=!1;else{if(e=$t,$t=null,Qi=0,Z&6)throw Error(N(331));var i=Z;for(Z|=4,O=e.current;O!==null;){var s=O,o=s.child;if(O.flags&16){var a=s.deletions;if(a!==null){for(var c=0;c<a.length;c++){var u=a[c];for(O=u;O!==null;){var d=O;switch(d.tag){case 0:case 11:case 15:kr(8,d,s)}var h=d.child;if(h!==null)h.return=d,O=h;else for(;O!==null;){d=O;var g=d.sibling,w=d.return;if(yd(d),d===u){O=null;break}if(g!==null){g.return=w,O=g;break}O=w}}}var y=s.alternate;if(y!==null){var x=y.child;if(x!==null){y.child=null;do{var v=x.sibling;x.sibling=null,x=v}while(x!==null)}}O=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,O=o;else e:for(;O!==null;){if(s=O,s.flags&2048)switch(s.tag){case 0:case 11:case 15:kr(9,s,s.return)}var p=s.sibling;if(p!==null){p.return=s.return,O=p;break e}O=s.return}}var f=e.current;for(O=f;O!==null;){o=O;var m=o.child;if(o.subtreeFlags&2064&&m!==null)m.return=o,O=m;else e:for(o=f;O!==null;){if(a=O,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:fs(9,a)}}catch(S){ae(a,a.return,S)}if(a===o){O=null;break e}var k=a.sibling;if(k!==null){k.return=a.return,O=k;break e}O=a.return}}if(Z=i,Qt(),pt&&typeof pt.onPostCommitFiberRoot=="function")try{pt.onPostCommitFiberRoot(is,e)}catch{}r=!0}return r}finally{ee=n,Ze.transition=t}}return!1}function cc(e,t,n){t=Kn(n,t),t=od(e,t,1),e=Dt(e,t,1),t=be(),e!==null&&(Ur(e,1,t),Re(e,t))}function ae(e,t,n){if(e.tag===3)cc(e,e,n);else for(;t!==null;){if(t.tag===3){cc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Bt===null||!Bt.has(r))){e=Kn(n,e),e=ld(t,e,1),t=Dt(t,e,1),e=be(),t!==null&&(Ur(t,1,e),Re(t,e));break}}t=t.return}}function bh(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=be(),e.pingedLanes|=e.suspendedLanes&n,ve===e&&(ke&n)===n&&(he===4||he===3&&(ke&130023424)===ke&&500>ue()-Dl?on(e,0):Rl|=n),Re(e,t)}function zd(e,t){t===0&&(e.mode&1?(t=Jr,Jr<<=1,!(Jr&130023424)&&(Jr=4194304)):t=1);var n=be();e=jt(e,t),e!==null&&(Ur(e,t,n),Re(e,n))}function Ph(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),zd(e,n)}function Nh(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(N(314))}r!==null&&r.delete(t),zd(e,n)}var bd;bd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Le.current)$e=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return $e=!1,yh(e,t,n);$e=!!(e.flags&131072)}else $e=!1,ie&&t.flags&1048576&&Au(t,Bi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ei(e,t),e=t.pendingProps;var i=Dn(t,Ce.current);Ln(t,n),i=Il(null,t,r,e,i,n);var s=Tl();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Fe(r)?(s=!0,Ri(t)):s=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,bl(t),i.updater=ds,t.stateNode=i,i._reactInternals=t,To(t,r,e,n),t=Lo(null,t,r,!0,s,n)):(t.tag=0,ie&&s&&kl(t),ze(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ei(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=Ah(r),e=nt(r,e),i){case 0:t=Oo(null,t,r,e,n);break e;case 1:t=qa(null,t,r,e,n);break e;case 11:t=Za(null,t,r,e,n);break e;case 14:t=Ja(null,t,r,nt(r.type,e),n);break e}throw Error(N(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:nt(r,i),Oo(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:nt(r,i),qa(e,t,r,i,n);case 3:e:{if(dd(t),e===null)throw Error(N(387));r=t.pendingProps,s=t.memoizedState,i=s.element,Fu(e,t),Ki(t,r,null,n);var o=t.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){i=Kn(Error(N(423)),t),t=ec(e,t,r,n,i);break e}else if(r!==i){i=Kn(Error(N(424)),t),t=ec(e,t,r,n,i);break e}else for(Be=Rt(t.stateNode.containerInfo.firstChild),Ue=t,ie=!0,it=null,n=Ou(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Bn(),r===i){t=Ct(e,t,n);break e}ze(e,t,r,n)}t=t.child}return t;case 5:return Ru(t),e===null&&Mo(t),r=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,o=i.children,Co(r,i)?o=null:s!==null&&Co(r,s)&&(t.flags|=32),ud(e,t),ze(e,t,o,n),t.child;case 6:return e===null&&Mo(t),null;case 13:return fd(e,t,n);case 4:return Pl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Un(t,null,r,n):ze(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:nt(r,i),Za(e,t,r,i,n);case 7:return ze(e,t,t.pendingProps,n),t.child;case 8:return ze(e,t,t.pendingProps.children,n),t.child;case 12:return ze(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,s=t.memoizedProps,o=i.value,te(Ui,r._currentValue),r._currentValue=o,s!==null)if(lt(s.value,o)){if(s.children===i.children&&!Le.current){t=Ct(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var c=a.firstContext;c!==null;){if(c.context===r){if(s.tag===1){c=St(-1,n&-n),c.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),Ao(s.return,n,t),a.lanes|=n;break}c=c.next}}else if(s.tag===10)o=s.type===t.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(N(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Ao(o,n,t),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===t){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}ze(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Ln(t,n),i=Je(i),r=r(i),t.flags|=1,ze(e,t,r,n),t.child;case 14:return r=t.type,i=nt(r,t.pendingProps),i=nt(r.type,i),Ja(e,t,r,i,n);case 15:return ad(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:nt(r,i),Ei(e,t),t.tag=1,Fe(r)?(e=!0,Ri(t)):e=!1,Ln(t,n),sd(t,r,i),To(t,r,i,n),Lo(null,t,r,!0,e,n);case 19:return pd(e,t,n);case 22:return cd(e,t,n)}throw Error(N(156,t.tag))};function Pd(e,t){return nu(e,t)}function Mh(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qe(e,t,n,r){return new Mh(e,t,n,r)}function Kl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ah(e){if(typeof e=="function")return Kl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===cl)return 11;if(e===ul)return 14}return 2}function Wt(e,t){var n=e.alternate;return n===null?(n=Qe(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function zi(e,t,n,r,i,s){var o=2;if(r=e,typeof e=="function")Kl(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case kn:return ln(n.children,i,s,t);case al:o=8,i|=8;break;case ro:return e=Qe(12,n,t,i|2),e.elementType=ro,e.lanes=s,e;case io:return e=Qe(13,n,t,i),e.elementType=io,e.lanes=s,e;case so:return e=Qe(19,n,t,i),e.elementType=so,e.lanes=s,e;case Rc:return hs(n,i,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Lc:o=10;break e;case Fc:o=9;break e;case cl:o=11;break e;case ul:o=14;break e;case Nt:o=16,r=null;break e}throw Error(N(130,e==null?e:typeof e,""))}return t=Qe(o,n,t,i),t.elementType=e,t.type=r,t.lanes=s,t}function ln(e,t,n,r){return e=Qe(7,e,r,t),e.lanes=n,e}function hs(e,t,n,r){return e=Qe(22,e,r,t),e.elementType=Rc,e.lanes=n,e.stateNode={isHidden:!1},e}function Qs(e,t,n){return e=Qe(6,e,null,t),e.lanes=n,e}function Zs(e,t,n){return t=Qe(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Ih(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ms(0),this.expirationTimes=Ms(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ms(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Hl(e,t,n,r,i,s,o,a,c){return e=new Ih(e,t,n,a,c),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Qe(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},bl(s),e}function Th(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:wn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Nd(e){if(!e)return Vt;e=e._reactInternals;e:{if(gn(e)!==e||e.tag!==1)throw Error(N(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Fe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(N(171))}if(e.tag===1){var n=e.type;if(Fe(n))return Nu(e,n,t)}return t}function Md(e,t,n,r,i,s,o,a,c){return e=Hl(n,r,!0,e,i,s,o,a,c),e.context=Nd(null),n=e.current,r=be(),i=Ut(n),s=St(r,i),s.callback=t??null,Dt(n,s,i),e.current.lanes=i,Ur(e,i,r),Re(e,r),e}function ms(e,t,n,r){var i=t.current,s=be(),o=Ut(i);return n=Nd(n),t.context===null?t.context=n:t.pendingContext=n,t=St(s,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Dt(i,t,o),e!==null&&(ot(e,i,o,s),ki(e,i,o)),o}function Ji(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function uc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Vl(e,t){uc(e,t),(e=e.alternate)&&uc(e,t)}function $h(){return null}var Ad=typeof reportError=="function"?reportError:function(e){console.error(e)};function Yl(e){this._internalRoot=e}gs.prototype.render=Yl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(N(409));ms(e,t,null,null)};gs.prototype.unmount=Yl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;fn(function(){ms(null,e,null,null)}),t[Et]=null}};function gs(e){this._internalRoot=e}gs.prototype.unstable_scheduleHydration=function(e){if(e){var t=cu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<At.length&&t!==0&&t<At[n].priority;n++);At.splice(n,0,e),n===0&&du(e)}};function Xl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ys(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function dc(){}function Oh(e,t,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var u=Ji(o);s.call(u)}}var o=Md(t,r,e,0,null,!1,!1,"",dc);return e._reactRootContainer=o,e[Et]=o.current,Ar(e.nodeType===8?e.parentNode:e),fn(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var u=Ji(c);a.call(u)}}var c=Hl(e,0,!1,null,null,!1,!1,"",dc);return e._reactRootContainer=c,e[Et]=c.current,Ar(e.nodeType===8?e.parentNode:e),fn(function(){ms(t,c,n,r)}),c}function vs(e,t,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var a=i;i=function(){var c=Ji(o);a.call(c)}}ms(t,o,e,i)}else o=Oh(n,t,e,i,r);return Ji(o)}lu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=fr(t.pendingLanes);n!==0&&(pl(t,n|1),Re(t,ue()),!(Z&6)&&(Hn=ue()+500,Qt()))}break;case 13:fn(function(){var r=jt(e,1);if(r!==null){var i=be();ot(r,e,1,i)}}),Vl(e,1)}};hl=function(e){if(e.tag===13){var t=jt(e,134217728);if(t!==null){var n=be();ot(t,e,134217728,n)}Vl(e,134217728)}};au=function(e){if(e.tag===13){var t=Ut(e),n=jt(e,t);if(n!==null){var r=be();ot(n,e,t,r)}Vl(e,t)}};cu=function(){return ee};uu=function(e,t){var n=ee;try{return ee=e,t()}finally{ee=n}};go=function(e,t,n){switch(t){case"input":if(ao(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=as(r);if(!i)throw Error(N(90));Bc(r),ao(r,i)}}}break;case"textarea":Wc(e,n);break;case"select":t=n.value,t!=null&&In(e,!!n.multiple,t,!1)}};Qc=Bl;Zc=fn;var Lh={usingClientEntryPoint:!1,Events:[Kr,jn,as,Xc,Gc,Bl]},lr={findFiberByHostInstance:en,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Fh={bundleType:lr.bundleType,version:lr.version,rendererPackageName:lr.rendererPackageName,rendererConfig:lr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:zt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=eu(e),e===null?null:e.stateNode},findFiberByHostInstance:lr.findFiberByHostInstance||$h,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ci=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ci.isDisabled&&ci.supportsFiber)try{is=ci.inject(Fh),pt=ci}catch{}}Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Lh;Ke.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Xl(t))throw Error(N(200));return Th(e,t,null,n)};Ke.createRoot=function(e,t){if(!Xl(e))throw Error(N(299));var n=!1,r="",i=Ad;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Hl(e,1,!1,null,null,n,!1,r,i),e[Et]=t.current,Ar(e.nodeType===8?e.parentNode:e),new Yl(t)};Ke.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(N(188)):(e=Object.keys(e).join(","),Error(N(268,e)));return e=eu(t),e=e===null?null:e.stateNode,e};Ke.flushSync=function(e){return fn(e)};Ke.hydrate=function(e,t,n){if(!ys(t))throw Error(N(200));return vs(null,e,t,!0,n)};Ke.hydrateRoot=function(e,t,n){if(!Xl(e))throw Error(N(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=Ad;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Md(t,null,e,1,n??null,i,!1,s,o),e[Et]=t.current,Ar(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new gs(t)};Ke.render=function(e,t,n){if(!ys(t))throw Error(N(200));return vs(null,e,t,!1,n)};Ke.unmountComponentAtNode=function(e){if(!ys(e))throw Error(N(40));return e._reactRootContainer?(fn(function(){vs(null,null,e,!1,function(){e._reactRootContainer=null,e[Et]=null})}),!0):!1};Ke.unstable_batchedUpdates=Bl;Ke.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!ys(n))throw Error(N(200));if(e==null||e._reactInternals===void 0)throw Error(N(38));return vs(e,t,n,!1,r)};Ke.version="18.3.1-next-f1338f8080-20240426";function Id(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Id)}catch(e){console.error(e)}}Id(),Ic.exports=Ke;var Rh=Ic.exports,fc=Rh;to.createRoot=fc.createRoot,to.hydrateRoot=fc.hydrateRoot;function Dh(e){let t=0;return()=>`${e}-${++t}`}const pn=Dh("g");let Bh=0;function Uh(){return`g-im-${Date.now().toString(36)}-${++Bh}`}let Wh=0;function Td(){return`p-${Date.now().toString(36)}-${++Wh}`}function Kh(){return`bg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`}const Vn=1,xt=50,$d=200,Yn=e=>Math.max(Vn,Math.min(xt,Number.isFinite(e)?Math.floor(e):Vn));function Go(e=2,t=2,n=$d){const r=Yn(e),i=Yn(t),s=Array.from({length:r},(o,a)=>Array.from({length:i},(c,u)=>`r${a}c${u}-${pn()}`));return{rows:r,cols:i,cellSize:n,groups:s}}function Hh(e,t,n){const r=Yn(t),i=Yn(n);if(r===e.rows&&i===e.cols)return e;const s=Array.from({length:r},(a,c)=>Array.from({length:i},(u,d)=>c<e.rows&&d<e.cols?e.groups[c][d]:`r${c}c${d}-${pn()}`)),o=new Map;for(const a of s)for(const c of a)o.set(c,(o.get(c)||0)+1);for(let a=0;a<r;a++)for(let c=0;c<i;c++){const u=s[a][c];if(o.get(u)===1)continue;const d=[];for(let h=0;h<r;h++)for(let g=0;g<i;g++)s[h][g]===u&&d.push([h,g]);if(!Vr(d))for(const[h,g]of d)s[h][g]=`r${h}c${g}-${pn()}`}return{...e,rows:r,cols:i,groups:s}}function Vr(e){if(e.length===0)return!1;let t=1/0,n=-1/0,r=1/0,i=-1/0;for(const[a,c]of e)a<t&&(t=a),a>n&&(n=a),c<r&&(r=c),c>i&&(i=c);const s=(n-t+1)*(i-r+1);if(e.length!==s)return!1;const o=new Set(e.map(([a,c])=>`${a},${c}`));for(let a=t;a<=n;a++)for(let c=r;c<=i;c++)if(!o.has(`${a},${c}`))return!1;return!0}function Od(e){if(e.length===0)return[];let t=1/0,n=-1/0,r=1/0,i=-1/0;for(const[o,a]of e)o<t&&(t=o),o>n&&(n=o),a<r&&(r=a),a>i&&(i=a);const s=[];for(let o=t;o<=n;o++)for(let a=r;a<=i;a++)s.push([o,a]);return s}function Ld(e,t){if(!Vr(t))return e;const n=new Set(t.map(([o,a])=>`${o},${a}`)),r=new Set;for(const[o,a]of t)r.add(e.groups[o][a]);const i=e.groups.map(o=>o.slice()),s=pn();for(let o=0;o<e.rows;o++)for(let a=0;a<e.cols;a++)n.has(`${o},${a}`)||r.has(i[o][a])&&(i[o][a]=`r${o}c${a}-${pn()}`);for(const[o,a]of t)i[o][a]=s;return{...e,groups:i}}function Fd(e,t){const n=new Set;for(const[i,s]of t)n.add(e.groups[i][s]);const r=e.groups.map(i=>i.slice());for(let i=0;i<e.rows;i++)for(let s=0;s<e.cols;s++)n.has(r[i][s])&&(r[i][s]=`r${i}c${s}-${pn()}`);return{...e,groups:r}}function xs(e){const t=new Map;for(let n=0;n<e.rows;n++)for(let r=0;r<e.cols;r++){const i=e.groups[n][r],s=t.get(i);s?(n<s.rMin&&(s.rMin=n),n>s.rMax&&(s.rMax=n),r<s.cMin&&(s.cMin=r),r>s.cMax&&(s.cMax=r)):t.set(i,{rMin:n,rMax:n,cMin:r,cMax:r})}return t}function Vh(e,t){const n=new Set(t),r=e.groups.filter((s,o)=>!n.has(o));if(r.length<Vn)return null;const i={...e,rows:r.length,groups:r.map(s=>s.slice())};return Rd(i)}function Yh(e,t){const n=new Set(t),r=e.cols-n.size;if(r<Vn)return null;const i=e.groups.map(s=>s.filter((o,a)=>!n.has(a)));return Rd({...e,cols:r,groups:i})}function Rd(e){const t=new Map;for(const r of e.groups)for(const i of r)t.set(i,(t.get(i)||0)+1);const n=e.groups.map(r=>r.slice());for(let r=0;r<e.rows;r++)for(let i=0;i<e.cols;i++){const s=n[r][i];if(t.get(s)===1)continue;const o=[];for(let a=0;a<e.rows;a++)for(let c=0;c<e.cols;c++)n[a][c]===s&&o.push([a,c]);if(!Vr(o))for(const[a,c]of o)n[a][c]=`r${a}c${c}-${pn()}`}return{...e,groups:n}}function Qo(e,t){return e<t?`${e}||${t}`:`${t}||${e}`}function bi(e){return e.includes("||outer-")?[e.slice(0,e.indexOf("||outer-"))]:e.split("||")}function An(e){var n;if(!e)return null;if(e.effects)return e.effects;const t=e.hoverAnimation??((n=e.config)==null?void 0:n.hoverAnimation);return!t||t==="none"?null:{[`${t}:hover`]:{id:t,trigger:"hover",config:{}}}}function Dd(...e){const t={};for(const n of e)if(n)for(const[r,i]of Object.entries(n))i===null?delete t[r]:t[r]=i;return t}function Xh(e,t){var n,r,i;return Dd(An((n=e==null?void 0:e.cells)==null?void 0:n.default),An((i=(r=e==null?void 0:e.cells)==null?void 0:r.byPiece)==null?void 0:i[t]))}function Bd(e,t,n,r=[]){var o;const i=n==="inner"?e==null?void 0:e.inner:e==null?void 0:e.outer,s=r.map(a=>{var c;return An((c=e==null?void 0:e.byPiece)==null?void 0:c[a])});return Dd(An(e==null?void 0:e.default),An(i),...s,An((o=e==null?void 0:e.byEdge)==null?void 0:o[t]))}function Gh(e,t,n){if(!(e!=null&&e.length))return;const r=[];for(const i of e){const s=i.rect;s&&(s.rMax<t.rMin||s.rMin>t.rMax||s.cMax<t.cMin||s.cMin>t.cMax||r.push({id:i.id,src:i.src,fit:i.fit||"cover",x:s.cMin*n,y:s.rMin*n,w:(s.cMax-s.cMin+1)*n,h:(s.rMax-s.rMin+1)*n}))}return r.length?r:void 0}function Zo(e,t,n,r=[]){var c,u;const i=(c=e==null?void 0:e.byEdge)==null?void 0:c[t];let s=null;for(const d of r)if((u=e==null?void 0:e.byPiece)!=null&&u[d]){s=e.byPiece[d];break}const o=n==="inner"?e==null?void 0:e.inner:e==null?void 0:e.outer,a=e==null?void 0:e.default;return{effect:(i==null?void 0:i.effect)??(s==null?void 0:s.effect)??(o==null?void 0:o.effect)??(a==null?void 0:a.effect)??"puzzle",config:(i==null?void 0:i.config)??(s==null?void 0:s.config)??(o==null?void 0:o.config)??(a==null?void 0:a.config)}}function Zn(e){const{grid:t,edges:n,pieceColors:r,pieceContent:i,backgrounds:s}=e,o=t.cellSize,a=xs(t),c=[],u=new Map;for(const[d,h]of a){const g={id:d,x:h.cMin*o,y:h.rMin*o,w:(h.cMax-h.cMin+1)*o,h:(h.rMax-h.rMin+1)*o,label:qh(d),fill:r==null?void 0:r[d],content:i==null?void 0:i[d],backgrounds:Gh(s,h,o),cellEffects:Xh(e,d),sides:{},sideEffects:{},sideEffectConfigs:{},edgeEffects:{},edgeEffectConfigs:{}};c.push(g),u.set(d,g)}for(const d of c){const h=a.get(d.id);for(const g of Ud){const w=Qh(t,d.id,h,g);if(w.length===0){const y=`${d.id}||outer-${g}`,{effect:x,config:v}=Zo(n,y,"outer",[d.id]),p=Bd(n,y,"outer",[d.id]);if(x==="puzzle"){let m=g==="right"||g==="bottom"?"tab":"socket";v!=null&&v.inverted&&(m=m==="tab"?"socket":"tab"),d.sides[g]={count:1,type:m}}else d.sides[g]=x==="flat"?"flat":{count:1,type:"tab"};d.edgeEffects[g]=d.edgeEffects[g]||{},d.edgeEffectConfigs[g]=d.edgeEffectConfigs[g]||{},d.edgeEffects[g].__outer=x;const f={...v||{},effects:p};d.edgeEffectConfigs[g].__outer=f;continue}Jh(d,g,w,n)}}return c}const Gl={right:{start:e=>e.rMin,end:e=>e.rMax,atEdge:(e,t)=>e.cMax+1>=t.cols,peek:(e,t,n)=>n.groups[e][t.cMax+1]},left:{start:e=>e.rMin,end:e=>e.rMax,atEdge:e=>e.cMin===0,peek:(e,t,n)=>n.groups[e][t.cMin-1]},bottom:{start:e=>e.cMin,end:e=>e.cMax,atEdge:(e,t)=>e.rMax+1>=t.rows,peek:(e,t,n)=>n.groups[t.rMax+1][e]},top:{start:e=>e.cMin,end:e=>e.cMax,atEdge:e=>e.rMin===0,peek:(e,t,n)=>n.groups[t.rMin-1][e]}};function Qh(e,t,n,r){const i=Gl[r];if(i.atEdge(n,e))return[];const s=i.start(n),o=i.end(n),a=o-s+1,c=[];let u=s;for(;u<=o;){const d=i.peek(u,n,e);if(d===t){u++;continue}let h=u;for(;h+1<=o&&i.peek(h+1,n,e)===d;)h++;const g=(u-s)/a,w=(h-s+1)/a;c.push({neighborId:d,startPos:g,endPos:w,midPos:(g+w)/2}),u=h+1}return c}function Zh(e){return e==="right"||e==="bottom"?"tab":"socket"}function Jh(e,t,n,r){const i=Zh(t),s=n.map(o=>{const a=Qo(e.id,o.neighborId),{config:c}=Zo(r,a,"inner",[e.id,o.neighborId]);let u=i;return c!=null&&c.inverted&&(u=u==="tab"?"socket":"tab"),{pos:o.midPos,type:u}});s.length===1&&Math.abs(s[0].pos-.5)<1e-6?e.sides[t]={count:1,type:s[0].type}:e.sides[t]=s,e.edgeEffects[t]=e.edgeEffects[t]||{},e.edgeEffectConfigs[t]=e.edgeEffectConfigs[t]||{};for(const o of n){const a=Qo(e.id,o.neighborId),{effect:c,config:u}=Zo(r,a,"inner",[e.id,o.neighborId]),d=Bd(r,a,"inner",[e.id,o.neighborId]);e.edgeEffects[t][o.neighborId]=c;const h={...u||{},effects:d};e.edgeEffectConfigs[t][o.neighborId]=h}}function qh(e){return e.startsWith("g-")?`#${e.slice(2)}`:e.split("-")[0]}const em=[{side:"right",opposite:"left"},{side:"bottom",opposite:"top"}];function tm(e){const{grid:t}=e,n=xs(t),r=new Set,i=[];for(const[s,o]of n)for(const{side:a,opposite:c}of em){const u=Gl[a];if(u.atEdge(o,t))continue;const d=u.start(o),h=u.end(o);let g=d;for(;g<=h;){const w=u.peek(g,o,t);if(w===s){g++;continue}let y=g;for(;y+1<=h&&u.peek(y+1,o,t)===w;)y++;const x=Qo(s,w);r.has(x)||(r.add(x),i.push({pairKey:x,pieceAId:s,sideA:a,pieceBId:w,sideB:c})),g=y+1}}return i}const Ud=["top","right","bottom","left"];function Wd(e){const{grid:t}=e,n=xs(t),r=[];for(const[i,s]of n)for(const o of Ud)Gl[o].atEdge(s,t)&&r.push({pairKey:`${i}||outer-${o}`,pieceId:i,side:o,isOuter:!0});return r}function Jo(e="Untitled"){const t=Date.now();return{id:Td(),name:e,createdAt:t,updatedAt:t,grid:Go(2,2),edges:{default:{effect:"puzzle",effects:{"highlight:hover":{id:"highlight",trigger:"hover",config:{}}}},inner:null,outer:null,byPiece:{},byEdge:{}},cells:{default:{effects:{"highlight:hover":{id:"highlight",trigger:"hover",config:{}}}},byPiece:{}},pieceColors:{},pieceContent:{},backgrounds:[]}}const qi="hakoniwa:projects",es="hakoniwa:currentId",nm="puzzle-studio:projects",rm="puzzle-studio:currentId";function im(){try{if(!localStorage.getItem(qi)){const e=localStorage.getItem(nm);e&&localStorage.setItem(qi,e)}if(!localStorage.getItem(es)){const e=localStorage.getItem(rm);e&&localStorage.setItem(es,e)}}catch{}}im();function rn(){try{const e=localStorage.getItem(qi);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Kd(e){try{localStorage.setItem(qi,JSON.stringify(e))}catch{}}function sm(e){const t=rn(),n=t.findIndex(i=>i.id===e.id),r={...e,updatedAt:Date.now()};return n>=0?t[n]=r:t.push(r),Kd(t),r}function om(e){Kd(rn().filter(t=>t.id!==e))}function lm(){try{return localStorage.getItem(es)}catch{return null}}function pc(e){try{localStorage.setItem(es,e)}catch{}}function am(e){const t=JSON.stringify(e,null,2),n=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download=`${(e.name||"project").replace(/\s+/g,"-")}.json`,i.click(),URL.revokeObjectURL(r)}function cm(e){return new Promise((t,n)=>{const r=new FileReader;r.onload=i=>{var s;try{const o=JSON.parse(i.target.result);if(!((s=o==null?void 0:o.grid)!=null&&s.groups)||!Array.isArray(o.grid.groups))throw new Error("Invalid project file");t({...o,id:Td(),updatedAt:Date.now()})}catch(o){n(o)}},r.onerror=()=>n(r.error),r.readAsText(e)})}function um(e){const t=n=>e(r=>r&&{...r,grid:n(r.grid)});return{setGrid({rows:n,cols:r}){t(i=>Hh(i,n??i.rows,r??i.cols))},merge(n){t(r=>Ld(r,n))},unmerge(n){t(r=>Fd(r,n))},removeRows(n){n!=null&&n.length&&e(r=>{if(!r)return r;const i=Vh(r.grid,n);return i?{...r,grid:i}:r})},removeCols(n){n!=null&&n.length&&e(r=>{if(!r)return r;const i=Yh(r.grid,n);return i?{...r,grid:i}:r})},replaceGrid(n,r){e(i=>{var s;return i&&{...i,grid:n,edges:{default:((s=i.edges)==null?void 0:s.default)??{effect:"puzzle"},byEdge:{}},pieceColors:{},pieceContent:r||{}}})}}}function dm(e){const t=n=>e(r=>r&&{...r,edges:n(r.edges)});return{setDefaultEdgeEffect(n,r){t(i=>({...i,default:{effect:n,...r?{config:r}:{}}}))},setDefaultEdgeConfig(n){t(r=>({...r,default:{...r.default,config:{...r.default.config||{},...n}}}))},setEdgeEffect(n,r,i){t(s=>({...s,byEdge:{...s.byEdge,[n]:{effect:r,...i?{config:i}:{}}}}))},setEdgeConfig(n,r){t(i=>{const s=i.byEdge[n]||{effect:i.default.effect};return{...i,byEdge:{...i.byEdge,[n]:{...s,config:{...s.config||{},...r}}}}})},clearEdgeOverride(n){t(r=>{const i={...r.byEdge};return delete i[n],{...r,byEdge:i}})},resetEdgeOverrides(){t(n=>{const r={...n,byEdge:{},byPiece:{}};return r.default&&(r.default={...r.default,effects:{}}),r.inner&&(r.inner={...r.inner,effects:{}}),r.outer&&(r.outer={...r.outer,effects:{}}),r})},setLayerEffect(n,r,i){t(s=>({...s,[n]:{effect:r,...i?{config:i}:{}}}))},setLayerConfig(n,r){t(i=>{var o;const s=i[n]||{effect:((o=i.default)==null?void 0:o.effect)??"puzzle"};return{...i,[n]:{...s,config:{...s.config||{},...r}}}})},clearLayer(n){t(r=>({...r,[n]:null}))},setPieceEdgeEffect(n,r,i){t(s=>({...s,byPiece:{...s.byPiece||{},[n]:{effect:r,...i?{config:i}:{}}}}))},setPieceEdgeConfig(n,r){t(i=>{var o,a;const s=((o=i.byPiece)==null?void 0:o[n])||{effect:((a=i.default)==null?void 0:a.effect)??"puzzle"};return{...i,byPiece:{...i.byPiece||{},[n]:{...s,config:{...s.config||{},...r}}}}})},clearPieceEdgeOverride(n){t(r=>{const i={...r.byPiece||{}};return delete i[n],{...r,byPiece:i}})},setDefaultEdgeEffects(n){t(r=>({...r,default:{...r.default||{},effects:n||{}}}))},setLayerEffects(n,r){t(i=>{var o;const s=i[n]||{effect:((o=i.default)==null?void 0:o.effect)??"puzzle"};return{...i,[n]:{...s,effects:r||{}}}})},setPieceEdgeEffects(n,r){t(i=>{const s={...i.byPiece||{}},o=s[n]||{};return(!r||Object.keys(r).length===0)&&!o.effect&&!o.config?delete s[n]:s[n]={...o,effects:r||{}},{...i,byPiece:s}})},setEdgeEffects(n,r){t(i=>{const s={...i.byEdge||{}},o=s[n]||{};return(!r||Object.keys(r).length===0)&&!o.effect&&!o.config?delete s[n]:s[n]={...o,effects:r||{}},{...i,byEdge:s}})}}}function fm(e){return{setPieceColor(t,n){e(r=>{if(!r)return r;const i={...r.pieceColors||{}};return n==null?delete i[t]:i[t]=n,{...r,pieceColors:i}})},clearPieceColors(){e(t=>t&&{...t,pieceColors:{}})},setPieceContent(t,n){e(r=>{if(!r)return r;const i={...r.pieceContent||{}};return n==null?delete i[t]:i[t]=n,{...r,pieceContent:i}})},updatePieceContent(t,n){e(r=>{if(!r)return r;const i={...r.pieceContent||{}},s=i[t]||{};return i[t]={...s,...n},{...r,pieceContent:i}})},clearPieceContent(){e(t=>t&&{...t,pieceContent:{}})},setDefaultCellEffects(t){e(n=>{if(!n)return n;const r=n.cells||{default:{},byPiece:{}};return{...n,cells:{...r,default:{...r.default||{},effects:t||{}}}}})},setCellEffects(t,n){e(r=>{if(!r)return r;const i=r.cells||{default:{},byPiece:{}},s={...i.byPiece||{}};return!n||Object.keys(n).length===0?delete s[t]:s[t]={...s[t]||{},effects:n},{...r,cells:{...i,byPiece:s}}})},resetAllCellEffects(){e(t=>{var n;return t&&{...t,cells:{...t.cells||{},default:{...((n=t.cells)==null?void 0:n.default)||{},effects:{}},byPiece:{}}}})}}}function pm(e){return{addBackground({src:t,rect:n,fit:r="cover"}){e(i=>{if(!i)return i;const s=[...i.backgrounds||[],{id:Kh(),src:t,rect:n,fit:r}];return{...i,backgrounds:s}})},updateBackground(t,n){e(r=>{if(!r)return r;const i=(r.backgrounds||[]).map(s=>s.id===t?{...s,...n}:s);return{...r,backgrounds:i}})},removeBackground(t){e(n=>{if(!n)return n;const r=(n.backgrounds||[]).filter(i=>i.id!==t);return{...n,backgrounds:r}})}}}const hm=500;function mm(){const[e,t]=b.useState(gm),[n,r]=b.useState(()=>rn()),i=b.useRef(null);b.useEffect(()=>{if(e)return clearTimeout(i.current),i.current=setTimeout(()=>{const y=sm(e);r(rn()),pc(y.id)},hm),()=>clearTimeout(i.current)},[e]);const s=b.useMemo(()=>e?Zn(e):[],[e]),o=b.useMemo(()=>e?tm(e):[],[e]),a=b.useMemo(()=>({...um(t),...dm(t),...fm(t),...pm(t)}),[]),c=b.useCallback(y=>{t(x=>x&&{...x,name:y})},[]),u=b.useCallback(y=>{const v=rn().find(p=>p.id===y);v&&(t(v),pc(v.id))},[]),d=b.useCallback(()=>{t(Jo("Untitled"))},[]),h=b.useCallback(y=>{om(y);const x=rn();r(x),(e==null?void 0:e.id)===y&&(x.length>0?t(x[x.length-1]):t(Jo("Untitled")))},[e==null?void 0:e.id]),g=b.useCallback(()=>{e&&am(e)},[e]),w=b.useCallback(async y=>{const x=await cm(y);t(x)},[]);return{project:e,projects:n,pieces:s,sharedEdges:o,setName:c,...a,openProject:u,createNew:d,removeProject:h,exportCurrent:g,importFromFile:w}}function gm(){const e=rn(),t=lm();if(t){const n=e.find(r=>r.id===t);if(n)return n}return e.length>0?e[e.length-1]:Jo("Untitled")}const Hd={frequency:.025,amplitude:12,phase:0},ar=4;function ym(e,t,n,r,i){const{frequency:s,amplitude:o,phase:a}=i,c=Math.min(e,t),u=Math.max(e,t),d=u-c,h=Math.ceil(c/ar)*ar,g=Math.floor(u/ar)*ar,w=[e];for(let y=h;y<=g;y+=ar)y>c&&y<u&&w.push(y);return w.push(t),t<e?w.sort((y,x)=>x-y):w.sort((y,x)=>y-x),w.map(y=>{const x=d>0?(y-c)/d:0,p=Math.sin(x*Math.PI)*Math.sin(y*s+a)*o;return r==="x"?[y,n+p]:[n+p,y]})}function vm(e,t,n,r,i,s,o,a,c,u){const d={...Hd,...u||{}};return ym(e,t,n,r,d).slice(1).map(([g,w])=>`L ${g} ${w}`).join(" ")}const Vd={name:"wave",displayName:"Wave",defaultConfig:Hd,hidesKnobs:!0,buildSide:vm};function xm(e,t,n,r,i,s,o,a,c){const u=t>=e?1:-1,d=[],h=[...i].sort((g,w)=>(g.pos-w.pos)*u);for(const g of h){const w=e+g.pos*(t-e),y=r==="y"?g.type==="tab"?1:0:g.type==="tab"?0:1;if(r==="x"){const x=w;d.push(`L ${x-u*c} ${n}`),d.push(`A ${c} ${c} 0 0 ${y} ${x+u*c} ${n}`)}else{const x=w;d.push(`L ${n} ${x-u*c}`),d.push(`A ${c} ${c} 0 0 ${y} ${n} ${x+u*c}`)}}return r==="x"?d.push(`L ${t} ${n}`):d.push(`L ${n} ${t}`),d.join(" ")}const wm={name:"puzzle",displayName:"Puzzle",hidesKnobs:!1,buildSide:xm};function km(e,t,n,r,i,s,o,a,c,u){return r==="x"?`L ${t} ${n}`:`L ${n} ${t}`}const Sm={name:"straight",displayName:"Straight",hidesKnobs:!0,buildSide:km},Ve=.01;function _m(e,t,n){const r=t.id;if(n==="right"){const i=t.x+t.w;return e.filter(s=>s.id!==r&&Math.abs(s.x-i)<Ve&&s.y<t.y+t.h-Ve&&s.y+s.h>t.y+Ve)}if(n==="left"){const i=t.x;return e.filter(s=>s.id!==r&&Math.abs(s.x+s.w-i)<Ve&&s.y<t.y+t.h-Ve&&s.y+s.h>t.y+Ve)}if(n==="bottom"){const i=t.y+t.h;return e.filter(s=>s.id!==r&&Math.abs(s.y-i)<Ve&&s.x<t.x+t.w-Ve&&s.x+s.w>t.x+Ve)}if(n==="top"){const i=t.y;return e.filter(s=>s.id!==r&&Math.abs(s.y+s.h-i)<Ve&&s.x<t.x+t.w-Ve&&s.x+s.w>t.x+Ve)}return[]}function ws(e,t,n){const r=_m(e,t,n);if(r.length===0)return[{startPos:0,endPos:1,neighborId:null}];const i=n==="left"||n==="right",s=i?t.h:t.w,o=i?t.y:t.x,a=r.map(d=>{const h=i?d.y:d.x,g=i?d.y+d.h:d.x+d.w,w=Math.max(o,h),y=Math.min(o+s,g);return{startPos:(w-o)/s,endPos:(y-o)/s,neighborId:d.id}}).sort((d,h)=>d.startPos-h.startPos),c=[];let u=0;for(const d of a)d.startPos>u+1e-4&&c.push({startPos:u,endPos:d.startPos,neighborId:null}),c.push(d),u=d.endPos;return u<1-1e-4&&c.push({startPos:u,endPos:1,neighborId:null}),c}function ks(e,t,n,r="puzzle"){var s,o,a;const i=n||"__outer";return((o=(s=e==null?void 0:e.edgeEffects)==null?void 0:s[t])==null?void 0:o[i])??((a=e==null?void 0:e.sideEffects)==null?void 0:a[t])??(e==null?void 0:e.effect)??r}const hn=30,Em="flat",ts="tab",hc="socket",wt={puzzle:wm,wave:Vd,straight:Sm},Ss=Object.keys(wt),Kt=1e-4;function jm(e,t){return Array.from({length:e},(n,r)=>({pos:(2*r+1)/(2*e),type:t}))}function Oe(e){return!e||e===Em?[]:e===ts?[{pos:.5,type:ts}]:e===hc?[{pos:.5,type:hc}]:Array.isArray(e)?e.map(t=>({pos:t.pos,type:t.type})):typeof e=="object"&&e.count>0&&e.type?jm(e.count,e.type):[]}function Cm(e){return Oe(e).some(t=>t.type===ts)}function hr({piece:e,allPieces:t,sideName:n,startA:r,endA:i,fixed:s,axis:o,pieceStartA:a,pieceLength:c,knobs:u,outwardSign:d,defaultEffect:h,effectConfig:g}){var p,f,m,k;const w=i>=r?1:-1;if(!t){const S=((p=e.sideEffects)==null?void 0:p[n])||e.effect||h||"puzzle";return(wt[S]||wt.puzzle).buildSide(r,i,s,o,u,a,c,d,hn,g)}const y=ws(t,e,n),x=w>0?y:[...y].reverse(),v=[];for(const S of x){const E=ks(e,n,S.neighborId,h),j=wt[E]||wt.puzzle,z=((m=(f=e.edgeEffectConfigs)==null?void 0:f[n])==null?void 0:m[S.neighborId??"__outer"])??((k=e.sideEffectConfigs)==null?void 0:k[n])??g,A=a+S.startPos*c,M=a+S.endPos*c,W=w>0?A:M,K=w>0?M:A,$=Math.abs(K-W),I=u.filter(R=>R.pos>S.startPos+Kt&&R.pos<S.endPos-Kt).map(R=>({pos:(R.pos-S.startPos)/Math.max(Kt,S.endPos-S.startPos),type:R.type}));v.push(j.buildSide(W,K,s,o,I,W,$,d,hn,z))}return v.join(" ")}function _s(e,t,n="puzzle",r){var d,h,g,w;const{x:i,y:s,w:o,h:a}=e,c={top:Oe((d=e.sides)==null?void 0:d.top),right:Oe((h=e.sides)==null?void 0:h.right),bottom:Oe((g=e.sides)==null?void 0:g.bottom),left:Oe((w=e.sides)==null?void 0:w.left)},u=[`M ${i} ${s}`];return u.push(hr({piece:e,allPieces:t,sideName:"top",startA:i,endA:i+o,fixed:s,axis:"x",pieceStartA:i,pieceLength:o,knobs:c.top,outwardSign:-1,defaultEffect:n,effectConfig:r})),u.push(hr({piece:e,allPieces:t,sideName:"right",startA:s,endA:s+a,fixed:i+o,axis:"y",pieceStartA:s,pieceLength:a,knobs:c.right,outwardSign:1,defaultEffect:n,effectConfig:r})),u.push(hr({piece:e,allPieces:t,sideName:"bottom",startA:i+o,endA:i,fixed:s+a,axis:"x",pieceStartA:i,pieceLength:o,knobs:c.bottom,outwardSign:1,defaultEffect:n,effectConfig:r})),u.push(hr({piece:e,allPieces:t,sideName:"left",startA:s+a,endA:s,fixed:i,axis:"y",pieceStartA:s,pieceLength:a,knobs:c.left,outwardSign:-1,defaultEffect:n,effectConfig:r})),u.push("Z"),u.join(" ")}function zm(e){var o,a,c,u;const{x:t,y:n,w:r,h:i}=e,s=[];for(const d of Oe((o=e.sides)==null?void 0:o.top))s.push({side:"top",type:d.type,pos:d.pos,cx:t+d.pos*r,cy:n});for(const d of Oe((a=e.sides)==null?void 0:a.right))s.push({side:"right",type:d.type,pos:d.pos,cx:t+r,cy:n+d.pos*i});for(const d of Oe((c=e.sides)==null?void 0:c.bottom))s.push({side:"bottom",type:d.type,pos:d.pos,cx:t+d.pos*r,cy:n+i});for(const d of Oe((u=e.sides)==null?void 0:u.left))s.push({side:"left",type:d.type,pos:d.pos,cx:t,cy:n+d.pos*i});return s}function bm(e,t,n="puzzle"){return zm(e).filter(r=>{var a,c,u;if(!t){const d=((a=e.sideEffects)==null?void 0:a[r.side])||e.effect||n;return!((c=wt[d])!=null&&c.hidesKnobs)}const s=ws(t,e,r.side).find(d=>r.pos>=d.startPos-Kt&&r.pos<=d.endPos+Kt);if(!s)return!1;const o=ks(e,r.side,s.neighborId,n);return!((u=wt[o])!=null&&u.hidesKnobs)})}const ui=hn*.5;function Pm(e,t,n){return e==="top"?{hx:t,hy:n-ui}:e==="bottom"?{hx:t,hy:n+ui}:e==="left"?{hx:t-ui,hy:n}:{hx:t+ui,hy:n}}function mc(e,t,n,r="puzzle",i){var x,v,p,f;const{x:s,y:o,w:a,h:c}=e,u={top:Oe((x=e.sides)==null?void 0:x.top),right:Oe((v=e.sides)==null?void 0:v.right),bottom:Oe((p=e.sides)==null?void 0:p.bottom),left:Oe((f=e.sides)==null?void 0:f.left)},h={top:{startA:s,endA:s+a,fixed:o,axis:"x",pieceStartA:s,pieceLength:a,knobs:u.top,outwardSign:-1,startPoint:`${s} ${o}`},right:{startA:o,endA:o+c,fixed:s+a,axis:"y",pieceStartA:o,pieceLength:c,knobs:u.right,outwardSign:1,startPoint:`${s+a} ${o}`},bottom:{startA:s+a,endA:s,fixed:o+c,axis:"x",pieceStartA:s,pieceLength:a,knobs:u.bottom,outwardSign:1,startPoint:`${s+a} ${o+c}`},left:{startA:o+c,endA:o,fixed:s,axis:"y",pieceStartA:o,pieceLength:c,knobs:u.left,outwardSign:-1,startPoint:`${s} ${o+c}`}}[n];if(!h)return"";const{startPoint:g,...w}=h,y=hr({piece:e,allPieces:t,sideName:n,...w,defaultEffect:r,effectConfig:i});return`M ${g} ${y}`}function Ql(e,t,n,r="puzzle",i){var p,f,m,k;const{x:s,y:o,w:a,h:c}=e,u=Oe((p=e.sides)==null?void 0:p[n])||[],h={top:{startA:s,endA:s+a,fixed:o,axis:"x",pieceStartA:s,pieceLength:a,outwardSign:-1,startPoint:[s,o]},right:{startA:o,endA:o+c,fixed:s+a,axis:"y",pieceStartA:o,pieceLength:c,outwardSign:1,startPoint:[s+a,o]},bottom:{startA:s+a,endA:s,fixed:o+c,axis:"x",pieceStartA:s,pieceLength:a,outwardSign:1,startPoint:[s+a,o+c]},left:{startA:o+c,endA:o,fixed:s,axis:"y",pieceStartA:o,pieceLength:c,outwardSign:-1,startPoint:[s,o+c]}}[n];if(!h)return[];const g=h.endA>=h.startA?1:-1,w=t?ws(t,e,n):[{startPos:0,endPos:1,neighborId:null}],y=g>0?w:[...w].reverse(),x=[];let v=h.startA;for(const S of y){const E=ks(e,n,S.neighborId,r),j=wt[E]||wt.puzzle,z=((m=(f=e.edgeEffectConfigs)==null?void 0:f[n])==null?void 0:m[S.neighborId??"__outer"])??((k=e.sideEffectConfigs)==null?void 0:k[n])??i,A=h.pieceStartA+S.startPos*h.pieceLength,M=h.pieceStartA+S.endPos*h.pieceLength,W=g>0?A:M,K=g>0?M:A,$=Math.abs(K-W),I=u.filter(L=>L.pos>S.startPos+Kt&&L.pos<S.endPos-Kt).map(L=>({pos:(L.pos-S.startPos)/Math.max(Kt,S.endPos-S.startPos),type:L.type})),R=j.buildSide(W,K,h.fixed,h.axis,I,W,$,h.outwardSign,hn,z),D=h.axis==="x"?v:h.fixed,B=h.axis==="y"?v:h.fixed,C=`M ${D} ${B} ${R}`;v+=g*$;const T=S.neighborId?Nm(e.id,S.neighborId):`${e.id}||outer-${n}`;x.push({neighborId:S.neighborId,pairKey:T,d:C,style:Mm(z)})}return x}function Nm(e,t){return e<t?`${e}||${t}`:`${t}||${e}`}function Mm(e){if(!e)return;const t={};return e.color!=null&&(t.color=e.color),e.opacity!=null&&(t.opacity=e.opacity),e.strokeWidth!=null&&(t.strokeWidth=e.strokeWidth),e.effects&&Object.keys(e.effects).length&&(t.effects=e.effects),Object.keys(t).length?t:void 0}function Es(e,t,n="puzzle",r){const{x:i,y:s,w:o,h:a,sides:c={}}=e,u=d=>{let h=0;const g=t?ws(t,e,d):[{neighborId:null}];for(const w of g){const y=ks(e,d,w.neighborId,n);y==="wave"?h=Math.max(h,((r==null?void 0:r.amplitude)??12)+2):y==="puzzle"&&Cm(c[d])&&(h=Math.max(h,hn))}return h};return{minX:i-u("left"),minY:s-u("top"),maxX:i+o+u("right"),maxY:s+a+u("bottom")}}const Yd={hover:"Hover",click:"Click",idle:"Idle",always:"Always"},Xd={highlight:{label:"Highlight",group:"fill",triggers:["hover","click","always"],defaultTrigger:"hover",config:{}},lift:{label:"Lift",group:"transform",triggers:["hover","click","always"],defaultTrigger:"hover",config:{distance:{default:4,min:1,max:16,step:1,label:"Distance",unit:"px",cssVar:"--anim-lift-distance"}}},"scale-up":{label:"Scale up",group:"transform",triggers:["hover","click","always"],defaultTrigger:"hover",config:{amount:{default:.04,min:.01,max:.3,step:.01,label:"Amount",unit:"",cssVar:"--anim-scale-up-amount"}}},"scale-down":{label:"Scale down",group:"transform",triggers:["hover","click","always"],defaultTrigger:"hover",config:{amount:{default:.04,min:.01,max:.3,step:.01,label:"Amount",unit:"",cssVar:"--anim-scale-down-amount"}}},glow:{label:"Glow",group:"filter",triggers:["hover","click","idle","always"],defaultTrigger:"hover",config:{radius:{default:6,min:1,max:24,step:1,label:"Radius",unit:"px",cssVar:"--anim-glow-radius"}}},pulse:{label:"Pulse",group:"transform",triggers:["idle","always"],defaultTrigger:"idle",config:{speed:{default:2.6,min:.5,max:6,step:.1,label:"Speed",unit:"s",cssVar:"--anim-pulse-speed"}}}},cr=["piece","edge"],Gd={piece:"Cell",edge:"Edge"},Qd={highlight:{label:"Highlight",group:"stroke",triggers:["hover","click","always"],defaultTrigger:"hover",scopes:cr,defaultScope:"piece",config:{}},glow:{label:"Glow",group:"filter",triggers:["hover","click","idle","always"],defaultTrigger:"hover",scopes:cr,defaultScope:"piece",config:{radius:{default:4,min:1,max:16,step:1,label:"Radius",unit:"px",cssVar:"--anim-edge-glow-radius"}}},wiggle:{label:"Wiggle",group:"transform",triggers:["hover","click"],defaultTrigger:"hover",scopes:cr,defaultScope:"piece",config:{intensity:{default:.6,min:.1,max:2.5,step:.1,label:"Intensity",unit:"px",cssVar:"--anim-edge-wiggle-intensity"}}},thicken:{label:"Thicken",group:"stroke",triggers:["hover","click","always"],defaultTrigger:"hover",scopes:cr,defaultScope:"piece",config:{width:{default:3.5,min:1.5,max:8,step:.25,label:"Width",unit:"px",cssVar:"--anim-edge-thicken-width"}}},flash:{label:"Flash",group:"animate",triggers:["hover","click"],defaultTrigger:"click",scopes:cr,defaultScope:"piece",config:{duration:{default:700,min:100,max:2e3,step:50,label:"Duration",unit:"ms",cssVar:"--anim-edge-flash-duration"}}}};function Am(e,t,n,r){const i=e[t];if(!i)return null;const s=i.defaultTrigger??i.triggers[0],o={};for(const[a,c]of Object.entries(i.config||{}))o[a]=c.default;if(i.scopes){const a=i.defaultScope??i.scopes[0];return{id:t,trigger:s,scope:a,config:o}}return{id:t,trigger:s,config:o}}function xn(e,t,n){return n?`${e}:${t}:${n}`:`${e}:${t}`}function Zd(e,t,n){var o;if(!e)return{className:"",style:void 0,hasEdgeScope:!1};const r=[],i={};let s=!1;for(const a of Object.values(e)){if(!a||!a.id||!a.trigger)continue;const c=t[a.id],u=c!=null&&c.scopes?a.scope??c.defaultScope??"piece":null;u==="edge"&&(s=!0);const d=u?`${a.trigger}-on-${u}`:a.trigger;if(r.push(`${n}--anim-${a.id}--${d}`),!!c)for(const[h,g]of Object.entries(c.config||{})){if(!(g!=null&&g.cssVar))continue;const w=((o=a.config)==null?void 0:o[h])??g.default;i[g.cssVar]=`${w}${g.unit||""}`}}return{className:r.join(" "),style:Object.keys(i).length?i:void 0,hasEdgeScope:s}}function Jd(e){return Zd(e,Xd,"piece")}function qd(e){return Zd(e,Qd,"piece__edge")}const Im=["top","right","bottom","left"],Tm=hn*.75;function $m({piece:e,path:t,allPieces:n,effect:r="puzzle",isHovered:i,isSelected:s,onHoverStart:o,onHoverEnd:a,onSelect:c,onKnobClick:u}){const{id:d,x:h,y:g,w,h:y,label:x,fill:v,content:p,backgrounds:f,cellEffects:m}=e,k=bm(e,n,r),S=`pc-clip-${d}`,E=`pc-mask-${d}`,j=!!p&&(p.text||p.src),z=f&&f.length>0,A=j||z,M=Jd(m),W=Im.flatMap(I=>Ql(e,n,I,r)),K=W.filter(I=>I.style&&typeof I.style.opacity=="number"&&I.style.opacity<=.001),$=K.length>0;return l.jsxs("g",{className:`piece ${i?"piece--hover":""} ${s?"piece--selected":""} ${M.className}`.replace(/\s+/g," ").trim(),style:M.style,onMouseEnter:()=>o==null?void 0:o(d),onMouseLeave:()=>a==null?void 0:a(d),onClick:()=>c==null?void 0:c(d),children:[l.jsxs("defs",{children:[A&&l.jsx("clipPath",{id:S,children:l.jsx("path",{d:t})}),$&&l.jsxs("mask",{id:E,maskUnits:"userSpaceOnUse",children:[l.jsx("path",{d:t,fill:"white"}),K.map((I,R)=>{var D;return l.jsx("path",{d:I.d,fill:"none",stroke:"black",strokeWidth:((D=I.style)==null?void 0:D.strokeWidth)??1.25,strokeLinecap:"round",strokeLinejoin:"round"},`ko-${I.pairKey}-${R}`)})]})]}),l.jsxs("g",{...$?{mask:`url(#${E})`}:null,children:[l.jsx("path",{d:t,className:"piece__body",style:v?{fill:v}:void 0}),z&&l.jsx("g",{clipPath:`url(#${S})`,pointerEvents:"none",children:f.map(I=>l.jsx(Om,{bg:I},I.id))}),j&&l.jsx("g",{clipPath:`url(#${S})`,pointerEvents:"none",children:l.jsx(Lm,{piece:e})}),!j&&!z&&x&&l.jsx("text",{x:h+w/2,y:g+y/2,className:"piece__label",children:x})]}),(()=>{const I=W.map(D=>{var B;return qd((B=D.style)==null?void 0:B.effects)}),R=I.some(D=>D.hasEdgeScope);return l.jsx("g",{className:"piece__edges",pointerEvents:R?"stroke":"none",children:W.map((D,B)=>{const C=D.style,T=C?{...C.color!=null?{stroke:C.color}:null,...C.opacity!=null?{strokeOpacity:C.opacity}:null,...C.strokeWidth!=null?{strokeWidth:C.strokeWidth}:null}:void 0,L=I[B],X=L.style||T?{...T||{},...L.style||{}}:void 0;return l.jsx("path",{d:D.d,className:`piece__edge ${L.className}`.trim(),style:X},`${D.pairKey}-${B}`)})})})(),u&&k.filter(I=>I.type===ts).map(I=>{const{hx:R,hy:D}=Pm(I.side,I.cx,I.cy);return l.jsx("circle",{cx:R,cy:D,r:Tm,className:"piece__knob-hit",onClick:B=>{B.stopPropagation(),u(d,I.side,I.pos)}},`${I.side}-${I.pos}`)})]})}function Om({bg:e}){const t=e.fit==="cover"?"xMidYMid slice":e.fit==="contain"?"xMidYMid meet":e.fit==="fill"?"none":"xMidYMid slice";return l.jsx("image",{href:e.src,x:e.x,y:e.y,width:e.w,height:e.h,preserveAspectRatio:t})}function Lm({piece:e}){const{x:t,y:n,w:r,h:i,content:s}=e,o=18;if(s.type==="image"&&s.src){const f=s.fit||"cover",m=f==="cover"?"xMidYMid slice":f==="contain"?"xMidYMid meet":f==="fill"?"none":"xMidYMid meet";return l.jsx("image",{href:s.src,x:t,y:n,width:r,height:i,preserveAspectRatio:m})}const a=s.text||"",c=s.fontSize||Math.min(r,i)/8,u=s.align||"center",d=s.color||"var(--text, #e6edf3)",h=s.fontWeight||500,g=Fm(a,r-o*2,c),w=c*1.25,y=g.length*w,x=n+i/2-y/2+w*.7,v=u==="left"?t+o:u==="right"?t+r-o:t+r/2,p=u==="left"?"start":u==="right"?"end":"middle";return l.jsx("text",{className:"piece__content",style:{fontSize:c,fontWeight:h,fill:d},textAnchor:p,children:g.map((f,m)=>l.jsx("tspan",{x:v,y:x+m*w,children:f},m))})}function Fm(e,t,n){const r=n*.55,i=Math.max(1,Math.floor(t/r)),s=[];for(const o of e.split(`
`)){if(o===""){s.push("");continue}const a=o.split(/\s+/);let c="";for(const u of a){const d=c?c+" "+u:u;d.length<=i?c=d:(c&&s.push(c),c=u.length<=i?u:u.slice(0,i))}c&&s.push(c)}return s}const di=60;function Jn({pieces:e,selectedId:t,effect:n="puzzle",effectConfig:r,onSelect:i,onKnobClick:s}){const[o,a]=b.useState(null),c=b.useMemo(()=>e.map(f=>({...f,path:_s(f,e,n,r),bbox:Es(f,e,n,r)})),[e,n,r]),u=b.useMemo(()=>c.reduce((f,m)=>({minX:Math.min(f.minX,m.bbox.minX),minY:Math.min(f.minY,m.bbox.minY),maxX:Math.max(f.maxX,m.bbox.maxX),maxY:Math.max(f.maxY,m.bbox.maxY)}),{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}),[c]),d=u.minX-di,h=u.minY-di,g=u.maxX-u.minX+di*2,w=u.maxY-u.minY+di*2,y=b.useMemo(()=>{if(o==null&&t==null)return c;const f=[];t!=null&&f.push(t),o!=null&&o!==t&&f.push(o);const m=c.filter(k=>!f.includes(k.id));for(const k of f){const S=c.find(E=>E.id===k);S&&m.push(S)}return m},[c,o,t]),x=f=>a(f),v=f=>a(m=>m===f?null:m),p=s?(f,m,k)=>s(f,m,k):void 0;return l.jsx("svg",{className:"puzzle-board",viewBox:`${d} ${h} ${g} ${w}`,width:g,height:w,xmlns:"http://www.w3.org/2000/svg",children:y.map(f=>l.jsx($m,{piece:f,path:f.path,allPieces:e,effect:n,isHovered:o===f.id,isSelected:t===f.id,onHoverStart:x,onHoverEnd:v,onSelect:i,onKnobClick:p},f.id))})}function we({width:e=1200,height:t=24,frequency:n=.025,amplitude:r=6,strokeWidth:i=1.5,color:s,flip:o=!1,className:a=""}){const c=t/2,u=b.useMemo(()=>{const d=Vd.buildSide(0,e,c,"x",[],0,e,1,hn,{frequency:n,amplitude:r});return`M 0 ${c} ${d}`},[e,c,n,r]);return l.jsx("svg",{className:`wave-divider${o?" wave-divider--flip":""}${a?` ${a}`:""}`,viewBox:`0 0 ${e} ${t}`,width:"100%",height:t,preserveAspectRatio:"none","aria-hidden":"true",role:"presentation",children:l.jsx("path",{d:u,fill:"none",stroke:s||"var(--stroke-soft)",strokeWidth:i,strokeLinecap:"round",strokeLinejoin:"round",vectorEffect:"non-scaling-stroke"})})}const Rm=[{id:"landing",label:"Landing",icon:"⌂"},{id:"docs",label:"Docs",icon:"?"},{id:"projects",label:"Projects",icon:"⚏"},{id:"preview",label:"Preview",icon:"◇"},{id:"grid",label:"Grid",icon:"⊞"},{id:"edit",label:"Edit",icon:"✎"}];function Dm({page:e,onNav:t,projectName:n,theme:r,onToggleTheme:i}){const s=r==="dark";return l.jsxs(l.Fragment,{children:[l.jsxs("header",{className:"page-nav",children:[l.jsxs("div",{className:"page-nav__brand",children:[l.jsx("span",{className:"page-nav__mark","aria-hidden":!0,children:"箱"}),l.jsx("span",{className:"page-nav__title",children:"Hakoniwa"}),n&&l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"page-nav__sep","aria-hidden":!0,children:"·"}),l.jsx("span",{className:"page-nav__project",children:n})]})]}),l.jsx("button",{type:"button",className:"page-nav__theme",onClick:i,title:s?"Switch to light theme":"Switch to dark theme","aria-label":"Toggle theme",children:l.jsx("span",{"aria-hidden":!0,children:s?"☾":"☀"})}),l.jsx("nav",{className:"page-nav__tabs",children:Rm.map(o=>l.jsxs("button",{type:"button",className:`page-nav__tab ${e===o.id?"page-nav__tab--active":""}`,onClick:()=>t(o.id),children:[l.jsx("span",{className:"page-nav__icon","aria-hidden":!0,children:o.icon}),l.jsx("span",{children:o.label})]},o.id))})]}),l.jsx(we,{className:"page-nav-wave",height:10,amplitude:3,strokeWidth:1.25})]})}const gc={grid:{rows:1,cols:2,cellSize:100,groups:[["meta-hako","meta-niwa"]]},edges:{default:{effect:"wave",config:{frequency:.04,amplitude:14}},inner:null,outer:null,byPiece:{},byEdge:{}},pieceColors:{},pieceContent:{"meta-hako":{type:"text",text:"箱",fontSize:56},"meta-niwa":{type:"text",text:"庭",fontSize:56}},backgrounds:[]};function qn({size:e="md"}){const t=b.useMemo(()=>Zn(gc),[]);return l.jsx("div",{className:`wave-brand-mark wave-brand-mark--${e}`,"aria-hidden":"true",children:l.jsx(Jn,{pieces:t,effect:"wave",effectConfig:gc.edges.default.config})})}const Js={frequency:.022,amplitude:10},Bm=220;function Zl({cards:e,rows:t=1,cols:n}){const r=n??Math.ceil(e.length/t),i=b.useMemo(()=>{const w=Array.from({length:t},(y,x)=>Array.from({length:r},(v,p)=>{var m;const f=x*r+p;return((m=e[f])==null?void 0:m.id)??`meta-empty-${x}-${p}`}));return{grid:{rows:t,cols:r,cellSize:Bm,groups:w},edges:{default:{effect:"wave",config:Js},inner:null,outer:null,byPiece:{},byEdge:{}},pieceColors:{},pieceContent:{},backgrounds:[]}},[e,t,r]),s=b.useMemo(()=>Zn(i),[i]),o=60,a=b.useMemo(()=>{const w={minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};return s.reduce((y,x)=>{const v=Es(x,s,"wave",Js);return{minX:Math.min(y.minX,v.minX),minY:Math.min(y.minY,v.minY),maxX:Math.max(y.maxX,v.maxX),maxY:Math.max(y.maxY,v.maxY)}},w)},[s]),c=a.minX-o,u=a.minY-o,d=a.maxX-a.minX+o*2,h=a.maxY-a.minY+o*2,g=b.useMemo(()=>new Map(s.map(w=>[w.id,w])),[s]);return l.jsxs("div",{className:"meta-card-row","data-cols":r,"data-rows":t,children:[l.jsx("div",{className:"meta-card-row__svg",children:l.jsx(Jn,{pieces:s,effect:"wave",effectConfig:Js})}),l.jsx("div",{className:"meta-card-row__overlay",style:{aspectRatio:`${d} / ${h}`},children:e.map(w=>{const y=g.get(w.id);if(!y)return null;const x=(y.x-c)/d*100,v=(y.y-u)/h*100,p=y.w/d*100,f=y.h/h*100,m=w.onClick?"button":"div";return l.jsxs(m,{type:w.onClick?"button":void 0,onClick:w.onClick,className:`meta-card${w.onClick?" meta-card--clickable":""}`,style:{left:`${x}%`,top:`${v}%`,width:`${p}%`,height:`${f}%`},children:[w.icon&&l.jsx("span",{className:"meta-card__icon","aria-hidden":"true",children:w.icon}),l.jsx("span",{className:"meta-card__title",children:w.title}),w.body&&l.jsx("span",{className:"meta-card__body",children:w.body})]},w.id)})})]})}const Um=[{id:"feat-build",icon:"⚏",title:"Build with pieces",body:"Drag-select cells in a grid and merge them into custom pieces."},{id:"feat-edges",icon:"✎",title:"Style every edge",body:"Three connector styles — puzzle, wave, straight — with per-edge overrides for color, opacity, and width."},{id:"feat-export",icon:"⤓",title:"Export anywhere",body:"Ship as JSON, a single self-contained React file, or a drop-in module bundle."}];function Wm({onNav:e}){return l.jsxs("div",{className:"page-landing",children:[l.jsxs("section",{className:"landing-hero",children:[l.jsx(qn,{size:"lg"}),l.jsx("p",{className:"landing-hero__sub",children:"箱庭 · built with itself"}),l.jsx("h1",{className:"landing-hero__name",children:"Hakoniwa"}),l.jsx("p",{className:"landing-hero__tagline",children:"Design layouts that snap together — puzzle tabs & sockets, soft waves, or clean straight lines. Build a grid, merge cells into pieces, fill them with text or images, and export as JSON, a single React file, or a full module bundle."}),l.jsxs("div",{className:"landing-hero__ctas",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>e("projects"),children:"Open the app →"}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:()=>e("docs"),children:"Read the docs"})]})]}),l.jsx(we,{amplitude:8}),l.jsx("section",{className:"landing-features",children:l.jsx(Zl,{cards:Um})}),l.jsx(we,{amplitude:8,flip:!0}),l.jsx("section",{className:"landing-foot",children:l.jsxs("button",{type:"button",className:"landing-foot__cta",onClick:()=>e("docs"),children:[l.jsx("span",{children:"Continue to docs"}),l.jsx("span",{className:"landing-foot__arrow","aria-hidden":"true",children:"↓"})]})})]})}const Km=[{id:"tl",x:0,y:0,w:160,h:160,label:"TL",sides:{right:{count:1,type:"tab"},bottom:{count:1,type:"tab"}}},{id:"tr",x:160,y:0,w:160,h:160,label:"TR",sides:{left:{count:1,type:"socket"},bottom:{count:1,type:"tab"}}},{id:"bl",x:0,y:160,w:160,h:160,label:"BL",sides:{right:{count:1,type:"tab"},top:{count:1,type:"socket"}}},{id:"br",x:160,y:160,w:160,h:160,label:"BR",sides:{left:{count:1,type:"socket"},top:{count:1,type:"socket"}}}],Hm={frequency:.04,amplitude:14};function Vm(){const[e,t]=b.useState("puzzle"),n=b.useMemo(()=>e==="wave"?Hm:void 0,[e]);return l.jsxs("div",{className:"mini-puzzle",children:[l.jsx("div",{className:"mini-puzzle__chips",children:Ss.map(r=>l.jsx("button",{type:"button",className:`chip chip--sm ${e===r?"chip--active":""}`,onClick:()=>t(r),children:Ym(r)},r))}),l.jsx("div",{className:"mini-puzzle__stage",children:l.jsx(Jn,{pieces:Km,effect:e,effectConfig:n})})]})}const Ym=e=>e.charAt(0).toUpperCase()+e.slice(1);function Xm({onNav:e}){const t=[{id:"tile-projects",icon:"⚏",title:"Projects",body:"Browse, import, and switch between saved designs.",onClick:()=>e("projects")},{id:"tile-preview",icon:"◇",title:"Preview",body:"A big read-only view of what you've built.",onClick:()=>e("preview")},{id:"tile-grid",icon:"⊞",title:"Grid",body:"Lay out the cells: drag-select, merge, color, paste images.",onClick:()=>e("grid")},{id:"tile-edit",icon:"✎",title:"Edit",body:"Two modes in one canvas: style edges or fill content.",onClick:()=>e("edit")}];return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Hakoniwa · 箱庭"}),l.jsx("h1",{className:"doc__h1",children:"Design layouts that snap together."}),l.jsx("p",{className:"doc__lede",children:"Hakoniwa is a small visual studio for grid-based layouts where every section is separated by a stylized connector — puzzle tabs & sockets, soft waves, or clean straight lines. You build a grid, merge cells into pieces, fill them with text or images, and export the result as JSON, a single React file, or a full module bundle."})]}),l.jsx(we,{}),l.jsxs("div",{className:"doc__demo",children:[l.jsx(Vm,{}),l.jsx("p",{className:"doc__demo-caption",children:"↑ Click an effect to see the connectors change live."})]}),l.jsx(Zl,{cards:t,rows:2,cols:2}),l.jsxs("div",{className:"doc__note",children:[l.jsx("strong",{children:"Already designed something?"})," ",l.jsx("button",{type:"button",className:"link-btn",onClick:()=>e("projects"),children:"Jump straight to your projects →"})]})]})}function Gm({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Projects tab"}),l.jsx("h1",{className:"doc__h1",children:"Your library of designs."}),l.jsx("p",{className:"doc__lede",children:"Every project you build is auto-saved to your browser's local storage. The Projects tab lists them as tiles; click one to open it (you'll land on the Preview page automatically)."})]}),l.jsx(we,{}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"+ New project"})," — creates a fresh 2×2 grid."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"↑ Import JSON"})," — load a project file you (or someone else) exported earlier. Each import gets a fresh id so it won't collide with anything you already have."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Click a tile"})," — opens the project. Hover the tile to reveal a small ✕ for deletion."]}),l.jsx("li",{children:"The currently-open project gets a warm-amber ring so you can see what's active at a glance."})]}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("projects"),children:"Open Projects →"})})]})}function Qm({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Preview tab"}),l.jsx("h1",{className:"doc__h1",children:"A clean view of what you've built."}),l.jsx("p",{className:"doc__lede",children:'Preview is the read-only "look at it" view. Use it to step back from the editing canvas, rename the project, jump into Grid or Edit, and export.'})]}),l.jsx(we,{}),l.jsx("h3",{children:"What's here"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Big preview"})," on the left — same renderer as the editors, but no overlays or hit zones."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"↓ Export ▾"})," at the top of the side panel — the only place exports happen. See the ",l.jsx("button",{className:"link-btn",onClick:()=>e==null?void 0:e("docs"),children:"Exporting"})," doc for the full menu."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Click the project name"})," to rename it."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Edit grid / Edit pieces"})," jump straight into the corresponding editor."]})]}),l.jsx("div",{className:"doc__note",children:"Tip: when you open a project from the Projects tab, you land here automatically."}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("preview"),children:"Open Preview →"})})]})}const ge=56,ct=12,fi=3,pi=4;function Zm(){const[e,t]=b.useState(()=>Go(fi,pi,ge)),[n,r]=b.useState([]),i=b.useRef(null),s=b.useRef(null),o=(v,p)=>{const f=Math.floor((p-ct)/ge),m=Math.floor((v-ct)/ge);return f<0||f>=e.rows||m<0||m>=e.cols?null:[f,m]},a=(v,p,f)=>{var m,k;if(v.button===0){if(v.preventDefault(),v.shiftKey){const S=`${p},${f}`,E=new Set(n.map(([j,z])=>`${j},${z}`));E.has(S)?E.delete(S):E.add(S),r([...E].map(j=>j.split(",").map(Number)));return}s.current={start:[p,f],cur:[p,f]},r([[p,f]]),(k=(m=v.currentTarget).setPointerCapture)==null||k.call(m,v.pointerId)}};b.useEffect(()=>{const v=f=>{if(!s.current)return;const m=i.current.getBoundingClientRect(),k=o(f.clientX-m.left,f.clientY-m.top);k&&(k[0]===s.current.cur[0]&&k[1]===s.current.cur[1]||(s.current.cur=k,r(Od([s.current.start,k]))))},p=()=>{s.current=null};return window.addEventListener("pointermove",v),window.addEventListener("pointerup",p),()=>{window.removeEventListener("pointermove",v),window.removeEventListener("pointerup",p)}});const c=n.length>=2&&Vr(n),u=n.length>=1,d=()=>{c&&(t(v=>Ld(v,n)),r([]))},h=()=>{u&&(t(v=>Fd(v,n)),r([]))},g=()=>{t(Go(fi,pi,ge)),r([])},w=new Map;for(let v=0;v<e.rows;v++)for(let p=0;p<e.cols;p++){const f=e.groups[v][p],m=w.get(f);m?(v>m.rMax&&(m.rMax=v),p>m.cMax&&(m.cMax=p)):w.set(f,{rMin:v,rMax:v,cMin:p,cMax:p})}const y=pi*ge+ct*2,x=fi*ge+ct*2;return new Set(n.map(([v,p])=>`${v},${p}`)),l.jsxs("div",{className:"grid-demo",children:[l.jsxs("svg",{ref:i,className:"grid-demo__svg",width:y,height:x,viewBox:`0 0 ${y} ${x}`,children:[[...w.entries()].map(([v,p])=>{const f=p.cMax>p.cMin||p.rMax>p.rMin;return l.jsx("rect",{x:ct+p.cMin*ge,y:ct+p.rMin*ge,width:(p.cMax-p.cMin+1)*ge,height:(p.rMax-p.rMin+1)*ge,rx:"4",fill:f?"rgba(214, 139, 84, 0.18)":"var(--surface-2)",stroke:f?"var(--primary-2)":"var(--stroke-idle)",strokeWidth:"1.5"},v)}),n.map(([v,p])=>l.jsx("rect",{x:ct+p*ge+2,y:ct+v*ge+2,width:ge-4,height:ge-4,rx:"3",fill:"rgba(214, 139, 84, 0.28)",stroke:"var(--primary-2)",strokeWidth:"2",pointerEvents:"none"},`s-${v}-${p}`)),Array.from({length:fi}).flatMap((v,p)=>Array.from({length:pi},(f,m)=>l.jsx("rect",{x:ct+m*ge,y:ct+p*ge,width:ge,height:ge,fill:"transparent",style:{cursor:"pointer"},onPointerDown:k=>a(k,p,m)},`hit-${p}-${m}`)))]}),l.jsxs("div",{className:"grid-demo__controls",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:d,disabled:!c,children:"⊞ Merge"}),l.jsx("button",{type:"button",className:"action-btn",onClick:h,disabled:!u,children:"⊟ Unmerge"}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:g,children:"Reset"}),l.jsx("span",{className:"hint",children:n.length===0?"Drag across cells.":c?`${n.length} cells — ready to merge.`:`${n.length} cell${n.length===1?"":"s"} selected.`})]})]})}function Jm({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Grid tab"}),l.jsx("h1",{className:"doc__h1",children:"Lay out the cells."}),l.jsx("p",{className:"doc__lede",children:"Build the layout: drag-select cells, merge groups into one piece, import data from a spreadsheet, and place background images that span across pieces without merging them."})]}),l.jsx(we,{}),l.jsxs("div",{className:"doc__demo",children:[l.jsx(Zm,{}),l.jsxs("p",{className:"doc__demo-caption",children:["↑ Try it: drag across cells to select, then click ",l.jsx("strong",{children:"Merge"}),"."]})]}),l.jsx("h3",{children:"Selection"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Drag"})," across cells to box-select."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Shift / Ctrl + click"})," to add or remove individual cells."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Esc"})," clears the selection."]})]}),l.jsx("h3",{children:"Merging cells into pieces"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:["The ",l.jsx("strong",{children:"Merge"})," button lights up only when the selection is a complete rectangle."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Unmerge"})," splits the selected groups back into single cells."]}),l.jsxs("li",{children:["Merged groups show their dimensions (","2×3"," etc.) right in the canvas."]})]}),l.jsx("h3",{children:"Sizing and deleting"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:["The ",l.jsx("strong",{children:"Rows / Cols"})," sliders resize the grid (max 50×50). Click any number to type it."]}),l.jsxs("li",{children:["Click a ",l.jsx("strong",{children:"row or column number"})," to delete it. Drag across multiple to delete in bulk."]})]}),l.jsx("h3",{children:"Importing spreadsheet data"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:["Use ",l.jsx("strong",{children:"Paste data"})," to drop in TSV/CSV from Excel, Google Sheets, or anywhere else."]}),l.jsx("li",{children:"Each non-empty cell becomes a piece with text content."}),l.jsxs("li",{children:[l.jsx("strong",{children:"Auto-merge horizontal runs"})," (on by default) lets each non-empty cell extend rightward over the empty cells until the next non-empty cell — perfect for landing-page-style layouts."]})]}),l.jsx("h3",{children:"Background images (multi-piece)"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:["Select cells, then either ",l.jsx("strong",{children:"Upload image"})," or ",l.jsx("strong",{children:"paste an image (Ctrl+V)"}),"."]}),l.jsx("li",{children:"The image fills the bounding rect of your selection and is sliced naturally across whichever pieces it overlaps — pieces stay separate, edges remain editable."}),l.jsxs("li",{children:["Each background can be set to ",l.jsx("em",{children:"Cover"})," / ",l.jsx("em",{children:"Contain"})," / ",l.jsx("em",{children:"Stretch"})," from the side panel."]})]}),l.jsx("h3",{children:"Coloring pieces"}),l.jsx("ul",{className:"doc__list",children:l.jsxs("li",{children:["Select cells, then pick a swatch in the ",l.jsx("strong",{children:"Color"})," card. Use the rainbow swatch to open the OS color picker."]})}),l.jsx("h3",{children:"Navigation"}),l.jsx("ul",{className:"doc__list",children:l.jsxs("li",{children:[l.jsx("strong",{children:"Scroll"})," to zoom the canvas; ",l.jsx("strong",{children:"middle-drag"})," or ",l.jsx("strong",{children:"Ctrl-drag"})," to pan."]})}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("grid"),children:"Open Grid →"})})]})}const yc=["default",...Ss];function qm(){const[e,t]=b.useState("puzzle"),[n,r]=b.useState("default"),[i,s]=b.useState("default"),o=b.useMemo(()=>({grid:{rows:2,cols:2,cellSize:140,groups:[["a","b"],["c","d"]]},edges:{default:{effect:e,config:{amplitude:12,frequency:.04}},inner:n==="default"?null:{effect:n,config:{amplitude:12,frequency:.04}},outer:i==="default"?null:{effect:i,config:{amplitude:12,frequency:.04}},byEdge:{}},pieceColors:{},pieceContent:{},backgrounds:[]}),[e,n,i]),a=b.useMemo(()=>Zn(o),[o]);return l.jsxs("div",{className:"edge-demo",children:[l.jsxs("div",{className:"edge-demo__rows",children:[l.jsx(qs,{label:"Default",value:e,options:Ss,onChange:t}),l.jsx(qs,{label:"Inner",value:n,options:yc,onChange:r}),l.jsx(qs,{label:"Outer",value:i,options:yc,onChange:s})]}),l.jsx("div",{className:"edge-demo__stage",children:l.jsx(Jn,{pieces:a,effect:e,effectConfig:{amplitude:12,frequency:.04}})})]})}function qs({label:e,value:t,options:n,onChange:r}){return l.jsxs("div",{className:"edge-demo__row",children:[l.jsx("span",{className:"edge-demo__label",children:e}),l.jsx("div",{className:"effect-chips",children:n.map(i=>l.jsx("button",{type:"button",className:`chip chip--sm ${t===i?"chip--active":""}`,onClick:()=>r(i),children:eg(i)},i))})]})}const eg=e=>e.charAt(0).toUpperCase()+e.slice(1);function tg({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Edit tab"}),l.jsx("h1",{className:"doc__h1",children:"Same canvas, two modes."}),l.jsxs("p",{className:"doc__lede",children:["Edit hosts both ",l.jsx("strong",{children:"Edges"})," (style the connectors) and"," ",l.jsx("strong",{children:"Content"})," (fill pieces with text or images). The board underneath stays identical — only the side panel and the click target change as you switch modes."]})]}),l.jsx(we,{}),l.jsxs("div",{className:"doc__demo",children:[l.jsx(qm,{}),l.jsx("p",{className:"doc__demo-caption",children:"↑ Try the priority chain: pick a default, then override an inner or outer edge to see how the chain resolves."})]}),l.jsx("h3",{children:"Edges mode"}),l.jsxs("p",{children:["Edges resolve through a three-layer priority chain — ",l.jsx("em",{children:"highest priority first"}),":"]}),l.jsxs("ol",{className:"doc__list doc__list--ordered",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Per-edge override"})," — click an edge in the canvas to give it its own effect & config. Shift-click to multi-select and edit them together."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Inner edges"})," / ",l.jsx("strong",{children:"Outer edges"}),' — set a single override that applies to every shared (or every outer) edge unless a per-edge override wins. Use the "use default" link to clear the layer.']}),l.jsxs("li",{children:[l.jsx("strong",{children:"Default effect"})," — applied to every edge that has no override above. The starting point."]})]}),l.jsxs("p",{children:["Three effects ship: ",l.jsx("strong",{children:"Puzzle"})," (interlocking tabs/sockets — invertible),"," ",l.jsx("strong",{children:"Wave"})," (sinusoidal, with frequency + amplitude), and"," ",l.jsx("strong",{children:"Straight"})," (clean line)."]}),l.jsx("h3",{children:"Stroke styling"}),l.jsx("p",{children:"Every effect carries three style fields that cascade through the same Default → Inner/Outer → per-edge chain:"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Color"})," — any color from the picker. Hit ",l.jsx("em",{children:"reset"})," to fall back to the theme stroke."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Opacity"})," — 0 to 100%. ",l.jsx("em",{children:"Transparent ≠ no color:"})," a transparent stroke shows the page background through the gap, while a colorless stroke just inherits the theme."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Width"})," — 0 to 10px. Use 0 to hide the outline entirely without changing geometry."]})]}),l.jsx("h3",{children:"Content mode"}),l.jsxs("ul",{className:"doc__list",children:[l.jsx("li",{children:"Click any piece to select it."}),l.jsxs("li",{children:["Choose ",l.jsx("strong",{children:"Empty"}),", ",l.jsx("strong",{children:"Text"}),", or ",l.jsx("strong",{children:"Image"}),"."]}),l.jsxs("li",{children:["Text supports alignment, size, and color. Image supports ",l.jsx("em",{children:"Cover / Contain / Stretch"}),"."]}),l.jsx("li",{children:"Everything is clipped to the piece's outline — text and images respect the puzzle shape."})]}),l.jsx("h3",{children:"Navigation"}),l.jsxs("ul",{className:"doc__list",children:[l.jsxs("li",{children:[l.jsx("strong",{children:"Scroll"})," to zoom; ",l.jsx("strong",{children:"middle-drag"})," or ",l.jsx("strong",{children:"Ctrl-drag"})," to pan."]}),l.jsxs("li",{children:[l.jsx("strong",{children:"Esc"})," clears the selection in the active mode."]})]}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("edit"),children:"Open Edit →"})})]})}const ng=[{id:"export-json",title:"JSON",body:"Re-importable project state. Drop it back into Hakoniwa via Projects → Import to keep editing."},{id:"export-jsx",title:"Single-file React",body:"One self-contained .jsx with paths precomputed and content baked in. Drop into any React 18+ project — zero deps. Bundled with a README in a small ZIP."},{id:"export-zip",title:"Module bundle (ZIP)",body:"The whole portable puzzle/ folder, your project.json, a wrapper component, a standalone compileProject.js, and a README."}];function rg({onNav:e}){return l.jsxs("section",{className:"doc",children:[l.jsxs("header",{className:"doc__header",children:[l.jsx("span",{className:"doc__kicker",children:"Exporting"}),l.jsx("h1",{className:"doc__h1",children:"Three ways to ship your puzzle."}),l.jsxs("p",{className:"doc__lede",children:["Open the Preview page and click ",l.jsx("strong",{children:"↓ Export ▾"})," at the top of the side panel. You'll get a menu with three options."]})]}),l.jsx(we,{}),l.jsx(Zl,{cards:ng}),l.jsx("div",{className:"doc__note",children:"The ZIP encoder is hand-rolled (~80 lines, no compression) so the studio ships with no third-party dependencies."}),l.jsx("div",{className:"doc__cta-row",children:l.jsx("button",{className:"action-btn action-btn--primary",onClick:()=>e("preview"),children:"Open Preview to export →"})})]})}const eo=[{id:"intro",label:"Welcome",Comp:Xm},{id:"projects",label:"Projects tab",Comp:Gm},{id:"preview",label:"Preview tab",Comp:Qm},{id:"grid",label:"Grid tab",Comp:Jm},{id:"edit",label:"Edit tab",Comp:tg},{id:"export",label:"Exporting",Comp:rg}];function ig({onNav:e}){const[t,n]=b.useState("intro"),r=(eo.find(i=>i.id===t)||eo[0]).Comp;return l.jsxs("div",{className:"page-docs",children:[l.jsxs("aside",{className:"docs-nav",children:[l.jsx("div",{className:"docs-nav__brand",children:l.jsx(qn,{size:"sm"})}),l.jsx("h2",{className:"docs-nav__title",children:"Documentation"}),l.jsx("nav",{children:l.jsx("ul",{className:"docs-nav__list",children:eo.map(i=>l.jsx("li",{children:l.jsx("button",{type:"button",className:`docs-nav__item ${t===i.id?"docs-nav__item--active":""}`,onClick:()=>n(i.id),children:i.label})},i.id))})}),l.jsx("div",{className:"docs-nav__cta",children:l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>e("projects"),children:"Open the app →"})})]}),l.jsx("article",{className:"docs-body",children:l.jsx(r,{onNav:e})})]})}const sg=["top","right","bottom","left"],hi=60;function ef({project:e,maxSize:t=180}){const{vbX:n,vbY:r,vbW:i,vbH:s,items:o}=b.useMemo(()=>{var x,v,p,f;if(!e)return{vbX:0,vbY:0,vbW:1,vbH:1,items:[]};const d=Zn(e);if(d.length===0)return{vbX:0,vbY:0,vbW:1,vbH:1,items:[]};const h=((v=(x=e.edges)==null?void 0:x.default)==null?void 0:v.effect)??"puzzle",g=(f=(p=e.edges)==null?void 0:p.default)==null?void 0:f.config,w=d.map(m=>({...m,d:_s(m,d,h,g),bbox:Es(m,d,h,g),segments:sg.flatMap(k=>Ql(m,d,k,h,g))})),y=w.reduce((m,k)=>({minX:Math.min(m.minX,k.bbox.minX),minY:Math.min(m.minY,k.bbox.minY),maxX:Math.max(m.maxX,k.bbox.maxX),maxY:Math.max(m.maxY,k.bbox.maxY)}),{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0});return{vbX:y.minX-hi,vbY:y.minY-hi,vbW:y.maxX-y.minX+hi*2,vbH:y.maxY-y.minY+hi*2,items:w}},[e]);if(!e||o.length===0)return l.jsx("div",{className:"preview-svg preview-svg--empty",children:"empty"});const a=i/s,c=a>=1?t:t*a,u=a>=1?t/a:t;return l.jsxs("svg",{className:"preview-svg",width:c,height:u,viewBox:`${n} ${r} ${i} ${s}`,xmlns:"http://www.w3.org/2000/svg",children:[l.jsx("defs",{children:o.map(d=>d.backgrounds&&d.backgrounds.length>0||d.content&&(d.content.text||d.content.src)?l.jsx("clipPath",{id:`pv-clip-${nf(d.id)}`,children:l.jsx("path",{d:d.d})},d.id):null)}),o.map(d=>l.jsx(og,{piece:d},d.id))]})}function og({piece:e}){const{id:t,d:n,fill:r,content:i,backgrounds:s,segments:o,x:a,y:c,w:u,h:d,label:h}=e,g=s&&s.length>0,w=!!i&&(i.text||i.src),y=g||w?`url(#pv-clip-${nf(t)})`:void 0;return l.jsxs("g",{children:[l.jsx("path",{d:n,fill:r||"var(--surface-2)",stroke:"none"}),g&&l.jsx("g",{clipPath:y,children:s.map(x=>l.jsx("image",{href:x.src,x:x.x,y:x.y,width:x.w,height:x.h,preserveAspectRatio:tf(x.fit)},x.id))}),w&&l.jsx("g",{clipPath:y,children:l.jsx(lg,{x:a,y:c,w:u,h:d,content:i})}),!w&&!g&&h&&l.jsx("text",{x:a+u/2,y:c+d/2,textAnchor:"middle",dominantBaseline:"central",fill:"var(--text-dim)",fontSize:Math.max(10,Math.min(u,d)/8),fontFamily:"inherit",children:h}),(o||[]).map((x,v)=>{const p=x.style;return l.jsx("path",{d:x.d,fill:"none",stroke:(p==null?void 0:p.color)??"var(--stroke-soft)",strokeOpacity:(p==null?void 0:p.opacity)??1,strokeWidth:(p==null?void 0:p.strokeWidth)??1.5,strokeLinejoin:"round",strokeLinecap:"round"},`${x.pairKey}-${v}`)})]})}function lg({x:e,y:t,w:n,h:r,content:i}){if(i.type==="image"&&i.src)return l.jsx("image",{href:i.src,x:e,y:t,width:n,height:r,preserveAspectRatio:tf(i.fit)});const s=i.text||"",o=i.fontSize||Math.min(n,r)/8,a=i.align||"center",c=i.color||"var(--text)",u=i.fontWeight||500,d=18,h=ag(s,n-d*2,o),g=o*1.25,w=t+r/2-h.length*g/2+g*.7,y=a==="left"?e+d:a==="right"?e+n-d:e+n/2,x=a==="left"?"start":a==="right"?"end":"middle";return l.jsx("text",{textAnchor:x,fill:c,fontSize:o,fontWeight:u,fontFamily:"inherit",children:h.map((v,p)=>l.jsx("tspan",{x:y,y:w+p*g,children:v},p))})}function tf(e){return e==="cover"?"xMidYMid slice":e==="contain"?"xMidYMid meet":e==="fill"?"none":"xMidYMid slice"}function ag(e,t,n){const r=n*.55,i=Math.max(1,Math.floor(t/r)),s=[];for(const o of e.split(`
`)){if(o===""){s.push("");continue}const a=o.split(/\s+/);let c="";for(const u of a){const d=c?c+" "+u:u;d.length<=i?c=d:(c&&s.push(c),c=u.length<=i?u:u.slice(0,i))}c&&s.push(c)}return s}function nf(e){return String(e).replace(/[^a-zA-Z0-9_-]/g,"_")}function rf(e){const t=new Date(e),n=(Date.now()-e)/1e3;return n<60?"just now":n<3600?`${Math.floor(n/60)}m ago`:n<86400?`${Math.floor(n/3600)}h ago`:t.toLocaleDateString()}function cg({project:e,onNav:t}){const{project:n,projects:r,openProject:i,createNew:s,removeProject:o,importFromFile:a}=e,c=b.useRef(null),u=async h=>{var w;const g=(w=h.target.files)==null?void 0:w[0];if(h.target.value="",!!g)try{await a(g)}catch(y){alert("Could not import: "+y.message)}},d=h=>{i(h),t("preview")};return l.jsx("div",{className:"page-projects",children:l.jsxs("section",{className:"projects-section",children:[l.jsx("div",{className:"projects-section__brand",children:l.jsx(qn,{size:"md"})}),l.jsxs("div",{className:"projects-section__head",children:[l.jsx("h2",{className:"projects-section__title",children:"Your Projects"}),l.jsxs("div",{className:"projects-section__actions",children:[l.jsx("input",{ref:c,type:"file",accept:".json",hidden:!0,onChange:u}),l.jsx("button",{type:"button",className:"action-btn",onClick:()=>{var h;return(h=c.current)==null?void 0:h.click()},children:"↑ Import JSON"})]})]}),l.jsx(we,{amplitude:6}),l.jsxs("div",{className:"project-grid",children:[l.jsxs("button",{type:"button",className:"project-tile project-tile--new",onClick:()=>{s(),t("preview")},children:[l.jsx("div",{className:"project-tile__plus",children:"+"}),l.jsx("div",{className:"project-tile__name",children:"New project"})]}),[...r].sort((h,g)=>g.updatedAt-h.updatedAt).map(h=>{const g=h.id===(n==null?void 0:n.id);return l.jsxs("div",{className:`project-tile ${g?"project-tile--current":""}`,children:[l.jsxs("button",{type:"button",className:"project-tile__open",onClick:()=>d(h.id),children:[l.jsx("div",{className:"project-tile__preview",children:l.jsx(ef,{project:h,maxSize:140})}),l.jsx("div",{className:"project-tile__name",children:h.name||"Untitled"}),l.jsxs("div",{className:"project-tile__meta",children:[h.grid.rows,"×",h.grid.cols," · ",rf(h.updatedAt)]})]}),l.jsx("button",{type:"button",className:"project-tile__del",onClick:()=>{confirm(`Delete "${h.name}"?`)&&o(h.id)},title:"Delete",children:"✕"})]},h.id)})]})]})})}const ug="# src/puzzle — Rendering Module\n\nSelf-contained rendering module. **No imports from outside this folder.** Drop into any React 18+ project. Also shipped verbatim by the studio's \"Module bundle (ZIP)\" export.\n\n## Public API (`index.js`)\n- `PuzzleBoard` — root `<svg>` rendering all pieces.\n- `PuzzlePiece` — single piece as `<g>`. Body = fill-only `<path>`; outline = one `<path>` per segment (so each edge can carry its own color / opacity / width). Optional content (text/image) and backgrounds are clipped to the body path.\n- `computePiecePath(piece, allPieces, effect, config)` — full closed SVG path string (the body).\n- `computeSidePath(piece, allPieces, side, effect, config)` — one continuous side path (used by edge editor overlay).\n- `computeSideSegments(piece, allPieces, side, effect, config)` — `[{ pairKey, neighborId, d, style }]` per segment, each `d` is M-prefixed and standalone. Used by `PuzzlePiece` to render per-edge styled strokes.\n- `computePieceBbox(piece, allPieces, effect, config)` — bounding box including knob/wave extent.\n- `EFFECT_NAMES` — `['puzzle', 'wave', 'straight']`.\n- Exports `KNOB_R`, `EFFECTS`, `normalizeSide`, etc. for advanced use.\n\n## Key Constants\n- `KNOB_R = 30` — pieces need at least `2 * KNOB_R = 60px` per side.\n\n## Effects (`effects/`)\nEach effect exports `{ buildSide, hidesKnobs? }`. `buildSide` returns an SVG path fragment (no leading `M`). Currently: `puzzleEffect`, `waveEffect`, `straightEffect`.\n\n## Piece Shape (used by `PuzzleBoard`)\n```js\n{\n  id, x, y, w, h, label?,\n  fill?: string,                                // optional override fill color\n  content?: ContentSpec,                        // optional text/image content\n  backgrounds?: Array<{ id, src, fit, x, y, w, h }>,  // multi-piece images (px space)\n  sides: { top?, right?, bottom?, left? },      // Side = 'flat' | {count,type} | [{pos,type}]\n  edgeEffects:        { [side]: { [neighborId]: effectName } },\n  edgeEffectConfigs:  { [side]: { [neighborId]: config } },\n}\n```\n\n## Render layers (per piece, in z-order)\n1. **Body** (`.piece__body`) — fill-only closed path. The fill is the piece color (or theme `--puzzle-fill`).\n2. **Backgrounds** (optional) — multi-piece images, clipped to the body. Same image rendered in every overlapping piece; SVG clipping does the slicing for free.\n3. **Content** (optional) — text or image, clipped to the body.\n4. **Edges** (`.piece__edge`) — one `<path>` per segment, drawn last so the outline sits on top. Each segment carries its own resolved `{ color, opacity, strokeWidth }` from the edge config, with theme defaults via CSS vars.\n\nFor shared edges, both pieces render their own copy of the segment stroke. Because the resolution chain is symmetric (same `pairKey` resolves the same way from either side), the two copies overlap exactly — no visible double-stroke.\n\n## Content rendering details\n- `<defs><clipPath><path d={body}/></clipPath></defs>` per piece (created when content or backgrounds exist).\n- **Backgrounds**: `<image>` at the full background coords; clipPath cuts each to the piece's outline.\n- **Text**: greedy word-wrap + `<text><tspan>` per line.\n- **Image content**: `<image preserveAspectRatio>` mapped from `fit` (`cover` → `slice`, `contain`/`none` → `meet`, `fill` → `none`).\n",dg=`/*
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

/* Selection-state edge styling intentionally omitted: it competed with
 * user-configured edge effects (Highlight / Thicken) and made it
 * impossible to tell whether a configured effect was actually firing.
 * Selection signal stays via \`.piece--selected .piece__body\` (fill shift)
 * which targets a different paint layer entirely. */

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

/* Edge effects come in two trigger scopes:
     * \`--{trigger}-on-piece\` (default) — fires from the parent piece's
       :hover/:active. Bigger hit target; user feels "the whole piece".
     * \`--{trigger}-on-edge\` — fires from the edge stroke itself. Precise
       per-edge feel. Edges with this scope get \`pointer-events: stroke\`
       (set by PuzzlePiece) so the visible stroke region is hoverable. */

/* --- Edge · highlight (stroke recolour + thicken) ---------------------- */
.piece:hover  .piece__edge--anim-highlight--hover-on-piece,
.piece:active .piece__edge--anim-highlight--click-on-piece,
              .piece__edge--anim-highlight--always-on-piece,
.piece__edge--anim-highlight--hover-on-edge:hover,
.piece__edge--anim-highlight--click-on-edge:active,
.piece__edge--anim-highlight--always-on-edge {
  stroke: var(--puzzle-stroke-hover, var(--stroke-hover, #4285f4));
  stroke-width: 2.5;
}

/* --- Edge · glow ------------------------------------------------------- */
.piece:hover  .piece__edge--anim-glow--hover-on-piece,
.piece:active .piece__edge--anim-glow--click-on-piece,
              .piece__edge--anim-glow--always-on-piece,
.piece__edge--anim-glow--hover-on-edge:hover,
.piece__edge--anim-glow--click-on-edge:active,
.piece__edge--anim-glow--always-on-edge {
  filter: drop-shadow(0 0 var(--anim-edge-glow-radius, 4px) currentColor)
          drop-shadow(0 0 calc(var(--anim-edge-glow-radius, 4px) * 2) currentColor);
}
.piece:not(:hover) .piece__edge--anim-glow--idle-on-piece,
.piece__edge--anim-glow--idle-on-edge:not(:hover) {
  filter: drop-shadow(0 0 var(--anim-edge-glow-radius, 4px) currentColor);
}

/* --- Edge · thicken ---------------------------------------------------- */
.piece:hover  .piece__edge--anim-thicken--hover-on-piece,
.piece:active .piece__edge--anim-thicken--click-on-piece,
              .piece__edge--anim-thicken--always-on-piece,
.piece__edge--anim-thicken--hover-on-edge:hover,
.piece__edge--anim-thicken--click-on-edge:active,
.piece__edge--anim-thicken--always-on-edge {
  stroke-width: var(--anim-edge-thicken-width, 3.5px);
}

/* --- Edge · wiggle (transient transform shake) ------------------------- */
.piece:hover  .piece__edge--anim-wiggle--hover-on-piece,
.piece:active .piece__edge--anim-wiggle--click-on-piece,
.piece__edge--anim-wiggle--hover-on-edge:hover,
.piece__edge--anim-wiggle--click-on-edge:active {
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
.piece:hover  .piece__edge--anim-flash--hover-on-piece,
.piece:active .piece__edge--anim-flash--click-on-piece,
.piece__edge--anim-flash--hover-on-edge:hover,
.piece__edge--anim-flash--click-on-edge:active {
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
`,fg=`import { useMemo, useState } from 'react';
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
`,pg=`import { KNOB_R, TAB, computeActiveKnobs, computeSideSegments, knobHitCenter } from './geometry.js';
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
          mask above is what creates the visible transparent strip.

          The wrapper's pointer-events: when ANY segment carries an
          edge-scope effect we open it up to \`stroke\` so the stroke region
          can receive :hover/:active. Otherwise stays 'none' so clicks
          fall through to the parent piece (selection unaffected). */}
      {(() => {
        const segAttrs = segments.map((seg) => edgeEffectAttrs(seg.style?.effects));
        const anyEdgeScope = segAttrs.some((ea) => ea.hasEdgeScope);
        return (
          <g className="piece__edges" pointerEvents={anyEdgeScope ? 'stroke' : 'none'}>
            {segments.map((seg, i) => {
              const s = seg.style;
              const inlineStyle = s ? {
                ...(s.color != null       ? { stroke: s.color } : null),
                ...(s.opacity != null     ? { strokeOpacity: s.opacity } : null),
                ...(s.strokeWidth != null ? { strokeWidth: s.strokeWidth } : null),
              } : undefined;
              const ea = segAttrs[i];
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
        );
      })()}

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
`,hg=`// Minimal board helpers consumed by \`geometry.js\` for path building.
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
`,mg=`// Shared helper: turn an effects map (e.g. piece.cellEffects or seg.style.effects)
// into the className + style attrs the renderer needs:
//
//   className — one space-separated \`<scope>--anim-<id>--<trigger>\` per entry
//   style     — CSS custom properties from each entry's config bag
//
// Used by both \`PuzzlePiece\` (live studio) and \`export.js\` (single-file
// JSX export) so the deployed puzzle gets identical classes + vars.
import { CELL_EFFECTS, EDGE_EFFECTS } from './effects-catalog.js';

function computeAttrs(effects, catalogue, scopeClass) {
  if (!effects) return { className: '', style: undefined, hasEdgeScope: false };
  const classes = [];
  const style = {};
  let hasEdgeScope = false;
  for (const entry of Object.values(effects)) {
    if (!entry || !entry.id || !entry.trigger) continue;
    const def = catalogue[entry.id];
    // Edges grow a \`--{trigger}-on-{scope}\` suffix; cells stay scope-free.
    // Legacy entries without \`scope\` are treated as 'piece' (current default).
    const scope = def?.scopes ? (entry.scope ?? def.defaultScope ?? 'piece') : null;
    if (scope === 'edge') hasEdgeScope = true;
    const triggerSuffix = scope ? \`\${entry.trigger}-on-\${scope}\` : entry.trigger;
    classes.push(\`\${scopeClass}--anim-\${entry.id}--\${triggerSuffix}\`);
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
    hasEdgeScope,
  };
}

export function cellEffectAttrs(effects) {
  return computeAttrs(effects, CELL_EFFECTS, 'piece');
}

export function edgeEffectAttrs(effects) {
  return computeAttrs(effects, EDGE_EFFECTS, 'piece__edge');
}
`,gg=`// Effect catalogue — single source of truth for the studio panels, the
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

// Edge effects also declare \`scopes\`: where the trigger fires from. 'piece'
// means hovering anywhere on the parent piece activates the effect (current
// default — large hit target). 'edge' means hovering the edge stroke itself
// activates only that edge (precise but small target). Each entry below
// supports both; the picker exposes a "Where" pill on every active row.
const EDGE_SCOPES = ['piece', 'edge'];
export const EDGE_SCOPE_LABELS = { piece: 'Cell', edge: 'Edge' };

export const EDGE_EFFECTS = {
  highlight: {
    label: 'Highlight',
    group: 'stroke',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    scopes: EDGE_SCOPES,
    defaultScope: 'piece',
    config: {},
  },
  glow: {
    label: 'Glow',
    group: 'filter',
    triggers: ['hover', 'click', 'idle', 'always'],
    defaultTrigger: 'hover',
    scopes: EDGE_SCOPES,
    defaultScope: 'piece',
    config: {
      radius: { default: 4, min: 1, max: 16, step: 1, label: 'Radius', unit: 'px', cssVar: '--anim-edge-glow-radius' },
    },
  },
  wiggle: {
    label: 'Wiggle',
    group: 'transform',
    triggers: ['hover', 'click'],
    defaultTrigger: 'hover',
    scopes: EDGE_SCOPES,
    defaultScope: 'piece',
    config: {
      intensity: { default: 0.6, min: 0.1, max: 2.5, step: 0.1, label: 'Intensity', unit: 'px', cssVar: '--anim-edge-wiggle-intensity' },
    },
  },
  thicken: {
    label: 'Thicken',
    group: 'stroke',
    triggers: ['hover', 'click', 'always'],
    defaultTrigger: 'hover',
    scopes: EDGE_SCOPES,
    defaultScope: 'piece',
    config: {
      width: { default: 3.5, min: 1.5, max: 8, step: 0.25, label: 'Width', unit: 'px', cssVar: '--anim-edge-thicken-width' },
    },
  },
  flash: {
    label: 'Flash',
    group: 'animate',
    triggers: ['hover', 'click'],
    defaultTrigger: 'click',
    scopes: EDGE_SCOPES,
    defaultScope: 'piece',
    config: {
      duration: { default: 700, min: 100, max: 2000, step: 50, label: 'Duration', unit: 'ms', cssVar: '--anim-edge-flash-duration' },
    },
  },
};

// Stable id arrays — used to render chip rows in a deterministic order.
export const CELL_EFFECT_IDS = Object.keys(CELL_EFFECTS);
export const EDGE_EFFECT_IDS = Object.keys(EDGE_EFFECTS);

// Build a fresh effect entry from the catalogue with default trigger,
// scope (edges only), and config. Used by the picker when the user clicks
// a chip to add an effect.
export function makeEffectEntry(catalogue, id, trigger, scope) {
  const def = catalogue[id];
  if (!def) return null;
  const t = trigger ?? def.defaultTrigger ?? def.triggers[0];
  const config = {};
  for (const [field, schema] of Object.entries(def.config || {})) {
    config[field] = schema.default;
  }
  // Cells have no scope concept — only edges do.
  if (def.scopes) {
    const s = scope ?? def.defaultScope ?? def.scopes[0];
    return { id, trigger: t, scope: s, config };
  }
  return { id, trigger: t, config };
}

// Storage key for an entry — must uniquely identify (id, trigger, scope)
// so multiple variants of the same effect can coexist (e.g. glow on hover
// for the cell + glow on idle for the edge). Scope-less keys (id:trigger)
// are valid v1 storage and treated as piece-scope at read time.
export function effectKey(id, trigger, scope) {
  return scope ? \`\${id}:\${trigger}:\${scope}\` : \`\${id}:\${trigger}\`;
}
`,yg=`// Puzzle piece effect: classic interlocking tabs and sockets via SVG arcs.

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
`,vg=`// Straight effect: simple straight line, no knobs.

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
`,xg=`// Wave effect: pure continuous sine wave along an edge, no knobs.
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
`,wg=`// Pure geometry helpers for puzzle pieces.
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
`,kg=`// Public API for the puzzle rendering module.
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
  EDGE_SCOPE_LABELS,
  makeEffectEntry, effectKey,
} from './effects-catalog.js';

export { cellEffectAttrs, edgeEffectAttrs } from './effect-attrs.js';
`,Sg=(()=>{const e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n}return e})();function _g(e){let t=4294967295;for(let n=0;n<e.length;n++)t=Sg[(t^e[n])&255]^t>>>8;return(t^4294967295)>>>0}function sf(e){const t=new TextEncoder,n=[],r=[];let i=0;for(const u of e){const d=t.encode(u.name),h=typeof u.content=="string"?t.encode(u.content):u.content,g=_g(h),w=new Uint8Array(30+d.length),y=new DataView(w.buffer);y.setUint32(0,67324752,!0),y.setUint16(4,20,!0),y.setUint16(6,0,!0),y.setUint16(8,0,!0),y.setUint16(10,0,!0),y.setUint16(12,33,!0),y.setUint32(14,g,!0),y.setUint32(18,h.length,!0),y.setUint32(22,h.length,!0),y.setUint16(26,d.length,!0),y.setUint16(28,0,!0),w.set(d,30),n.push(w,h);const x=new Uint8Array(46+d.length),v=new DataView(x.buffer);v.setUint32(0,33639248,!0),v.setUint16(4,20,!0),v.setUint16(6,20,!0),v.setUint16(8,0,!0),v.setUint16(10,0,!0),v.setUint16(12,0,!0),v.setUint16(14,33,!0),v.setUint32(16,g,!0),v.setUint32(20,h.length,!0),v.setUint32(24,h.length,!0),v.setUint16(28,d.length,!0),v.setUint16(30,0,!0),v.setUint16(32,0,!0),v.setUint16(34,0,!0),v.setUint16(36,0,!0),v.setUint32(38,0,!0),v.setUint32(42,i,!0),x.set(d,46),r.push(x),i+=w.length+h.length}const s=r.reduce((u,d)=>u+d.length,0),o=i,a=new Uint8Array(22),c=new DataView(a.buffer);return c.setUint32(0,101010256,!0),c.setUint16(4,0,!0),c.setUint16(6,0,!0),c.setUint16(8,e.length,!0),c.setUint16(10,e.length,!0),c.setUint32(12,s,!0),c.setUint32(16,o,!0),c.setUint16(20,0,!0),new Blob([...n,...r,a],{type:"application/zip"})}const Eg=["top","right","bottom","left"],jg=Object.assign({"../puzzle/CLAUDE.md":ug,"../puzzle/PuzzleBoard.css":dg,"../puzzle/PuzzleBoard.jsx":fg,"../puzzle/PuzzlePiece.jsx":pg,"../puzzle/board.js":hg,"../puzzle/effect-attrs.js":mg,"../puzzle/effects-catalog.js":gg,"../puzzle/effects/puzzleEffect.js":yg,"../puzzle/effects/straightEffect.js":vg,"../puzzle/effects/waveEffect.js":xg,"../puzzle/geometry.js":wg,"../puzzle/index.js":kg});function of(e,t){const n=URL.createObjectURL(e),r=document.createElement("a");r.href=n,r.download=t,r.click(),URL.revokeObjectURL(n)}function Cg(e){var i,s,o,a;const t=Zn(e),n=((s=(i=e.edges)==null?void 0:i.default)==null?void 0:s.effect)??"puzzle",r=((a=(o=e.edges)==null?void 0:o.default)==null?void 0:a.config)??null;return t.map(c=>{const u=Jd(c.cellEffects),d=Eg.flatMap(h=>Ql(c,t,h,n,r)).map(h=>{var w;const g=qd((w=h.style)==null?void 0:w.effects);return{d:h.d,style:h.style?{color:h.style.color??null,opacity:h.style.opacity??null,strokeWidth:h.style.strokeWidth??null}:null,animClassName:g.className,animStyle:g.style??null,hasEdgeScope:g.hasEdgeScope}});return{id:c.id,x:c.x,y:c.y,w:c.w,h:c.h,label:c.label,fill:c.fill??null,content:c.content??null,backgrounds:c.backgrounds??null,animClassName:u.className,animStyle:u.style??null,d:_s(c,t,n,r),anyEdgeScope:d.some(h=>h.hasEdgeScope),segments:d}})}const zg=`
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
.hak-puzzle .piece:hover  .piece__edge--anim-highlight--hover-on-piece,
.hak-puzzle .piece:active .piece__edge--anim-highlight--click-on-piece,
.hak-puzzle              .piece__edge--anim-highlight--always-on-piece,
.hak-puzzle .piece__edge--anim-highlight--hover-on-edge:hover,
.hak-puzzle .piece__edge--anim-highlight--click-on-edge:active,
.hak-puzzle .piece__edge--anim-highlight--always-on-edge {
  stroke: #4285f4; stroke-width: 2.5;
}

/* Edge · glow */
.hak-puzzle .piece:hover  .piece__edge--anim-glow--hover-on-piece,
.hak-puzzle .piece:active .piece__edge--anim-glow--click-on-piece,
.hak-puzzle              .piece__edge--anim-glow--always-on-piece,
.hak-puzzle .piece__edge--anim-glow--hover-on-edge:hover,
.hak-puzzle .piece__edge--anim-glow--click-on-edge:active,
.hak-puzzle .piece__edge--anim-glow--always-on-edge {
  filter: drop-shadow(0 0 var(--anim-edge-glow-radius, 4px) currentColor)
          drop-shadow(0 0 calc(var(--anim-edge-glow-radius, 4px) * 2) currentColor);
}
.hak-puzzle .piece:not(:hover) .piece__edge--anim-glow--idle-on-piece,
.hak-puzzle .piece__edge--anim-glow--idle-on-edge:not(:hover) {
  filter: drop-shadow(0 0 var(--anim-edge-glow-radius, 4px) currentColor);
}

/* Edge · thicken */
.hak-puzzle .piece:hover  .piece__edge--anim-thicken--hover-on-piece,
.hak-puzzle .piece:active .piece__edge--anim-thicken--click-on-piece,
.hak-puzzle              .piece__edge--anim-thicken--always-on-piece,
.hak-puzzle .piece__edge--anim-thicken--hover-on-edge:hover,
.hak-puzzle .piece__edge--anim-thicken--click-on-edge:active,
.hak-puzzle .piece__edge--anim-thicken--always-on-edge { stroke-width: var(--anim-edge-thicken-width, 3.5px); }

/* Edge · wiggle */
.hak-puzzle .piece:hover  .piece__edge--anim-wiggle--hover-on-piece,
.hak-puzzle .piece:active .piece__edge--anim-wiggle--click-on-piece,
.hak-puzzle .piece__edge--anim-wiggle--hover-on-edge:hover,
.hak-puzzle .piece__edge--anim-wiggle--click-on-edge:active {
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
.hak-puzzle .piece:hover  .piece__edge--anim-flash--hover-on-piece,
.hak-puzzle .piece:active .piece__edge--anim-flash--click-on-piece,
.hak-puzzle .piece__edge--anim-flash--hover-on-edge:hover,
.hak-puzzle .piece__edge--anim-flash--click-on-edge:active {
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
}`.trim();function bg(e){const t=Cg(e),n=Math.min(...t.map(c=>c.x)),r=Math.min(...t.map(c=>c.y)),i=Math.max(...t.map(c=>c.x+c.w)),s=Math.max(...t.map(c=>c.y+c.h)),o=60,a={x:n-o,y:r-o,w:i-n+o*2,h:s-r+o*2};return`// Generated by Hakoniwa.
// Drop this file into any React 18+ project and import the default export:
//
//   import PuzzleExport from './${kt(e.name)}.jsx';
//   <PuzzleExport />
//
// No external dependencies beyond React. Hover/click animations are baked in
// via the <style> block below.

import React from 'react';

const PIECES = ${JSON.stringify(t,null,2)};
const VIEWBOX = "${a.x} ${a.y} ${a.w} ${a.h}";
const SIZE = { w: ${a.w}, h: ${a.h} };
const ANIM_CSS = ${JSON.stringify(zg)};

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
  const { id, x, y, w, h, label, fill, content, backgrounds, segments, d, animClassName, animStyle, anyEdgeScope } = piece;
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
          opacity / width / animation classes. Edge-scope hover triggers
          require the stroke to receive pointer events; piece-scope ones
          rely on the parent .piece:hover. */}
      <g className="piece__edges" pointerEvents={anyEdgeScope ? 'stroke' : 'none'}>
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
`}const Pg=e=>`# ${e.name||"Puzzle Export"}

Generated by Hakoniwa. A single self-contained React component you can drop into any React 18+ project.

## Install

Copy \`${kt(e.name)}.jsx\` into your project. No additional dependencies are required (just React).

## Usage

\`\`\`jsx
import PuzzleExport from './${kt(e.name)}.jsx';

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
`,Ng=e=>`# Hakoniwa Export — Module Bundle

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
${kt(e.name)}.jsx       — turn-key wrapper that compiles project.json + renders it
\`\`\`

## Quick start

1. Copy the \`puzzle/\` folder into your project (e.g. \`src/puzzle/\`).
2. Copy \`project.json\` and \`${kt(e.name)}.jsx\` next to it.
3. Adjust the import path in \`${kt(e.name)}.jsx\` if needed.
4. Use it:

\`\`\`jsx
import Puzzle from './${kt(e.name)}.jsx';

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
`,Mg=e=>`// Convenience wrapper: imports your project data + renders it with the puzzle module.
import React, { useMemo } from 'react';
import { PuzzleBoard } from './puzzle';
import projectData from './project.json';
import { compileProject } from './compileProject.js';

export default function ${Ig(e.name)||"Puzzle"}({ width = '100%' }) {
  const pieces = useMemo(() => compileProject(projectData), []);
  const effect = projectData.edges?.default?.effect ?? 'puzzle';
  const config = projectData.edges?.default?.config;
  return (
    <div style={{ width }}>
      <PuzzleBoard pieces={pieces} effect={effect} effectConfig={config} />
    </div>
  );
}
`,Ag=`// Standalone compileProject — no imports outside this file.
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
`;function kt(e){return(e||"puzzle").replace(/[^A-Za-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"puzzle"}function Ig(e){return e?e.replace(/[^A-Za-z0-9]+/g," ").trim().split(/\s+/).map(t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()).join(""):""}function Tg(e){const t=kt(e.name),n=bg(e),r=Pg(e),i=sf([{name:`${t}.jsx`,content:n},{name:"README.md",content:r}]);of(i,`${t}-component.zip`)}function $g(e){const t=kt(e.name),n=[];for(const[i,s]of Object.entries(jg)){const o=i.replace(/^\.\.\//,"");o.endsWith("CLAUDE.md")||n.push({name:o,content:s})}n.push({name:"project.json",content:JSON.stringify(e,null,2)}),n.push({name:`${t}.jsx`,content:Mg(e)}),n.push({name:"compileProject.js",content:Ag}),n.push({name:"README.md",content:Ng(e)});const r=sf(n);of(r,`${t}-module.zip`)}function Og({project:e,onNav:t}){const{project:n,setName:r,exportCurrent:i}=e,[s,o]=b.useState(!1),[a,c]=b.useState(!1);return n?l.jsxs("div",{className:"page-preview",children:[l.jsx("div",{className:"preview-stage",children:l.jsx("div",{className:"preview-stage__svg",children:l.jsx(ef,{project:n,maxSize:620})})}),l.jsxs("aside",{className:"preview-info",children:[l.jsx("div",{className:"preview-info__brand",children:l.jsx(qn,{size:"sm"})}),l.jsx("div",{className:"preview-info__export",children:l.jsxs("div",{className:"export-menu",children:[l.jsx("button",{type:"button",className:"action-btn",onClick:()=>c(u=>!u),children:"↓ Export ▾"}),a&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"export-menu__backdrop",onClick:()=>c(!1)}),l.jsxs("div",{className:"export-menu__panel",children:[l.jsxs("button",{type:"button",className:"export-menu__item",onClick:()=>{i(),c(!1)},children:[l.jsx("strong",{children:"JSON"}),l.jsx("span",{children:"Project file (re-importable)"})]}),l.jsxs("button",{type:"button",className:"export-menu__item",onClick:()=>{Tg(n),c(!1)},children:[l.jsx("strong",{children:"Single-file React"}),l.jsx("span",{children:"One .jsx + README — drop into any React 18+ project"})]}),l.jsxs("button",{type:"button",className:"export-menu__item",onClick:()=>{$g(n),c(!1)},children:[l.jsx("strong",{children:"Module bundle (ZIP)"}),l.jsx("span",{children:"Full puzzle/ folder + project.json + README"})]})]})]})]})}),l.jsx(we,{amplitude:4,height:14}),s?l.jsx("input",{className:"preview-info__name-input",autoFocus:!0,value:n.name??"",onChange:u=>r(u.target.value),onBlur:()=>o(!1),onKeyDown:u=>{u.key==="Enter"&&o(!1)}}):l.jsx("h1",{className:"preview-info__name",onClick:()=>o(!0),title:"Click to rename",children:n.name||"Untitled"}),l.jsxs("p",{className:"preview-info__meta",children:[l.jsxs("span",{children:[n.grid.rows,"×",n.grid.cols," grid"]}),l.jsx("span",{"aria-hidden":!0,children:" · "}),l.jsxs("span",{children:["last edited ",rf(n.updatedAt)]})]}),l.jsx(we,{amplitude:4,height:14}),l.jsxs("div",{className:"preview-info__actions",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>t("grid"),children:"⊞ Edit grid"}),l.jsx("button",{type:"button",className:"action-btn action-btn--primary",onClick:()=>t("edit"),children:"✎ Edit pieces"})]}),l.jsx("p",{className:"hint",children:"Edit the grid layout, or open the Edit page to style edges and fill cells with text/images."})]})]}):null}function Lg(e){const t=e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`);for(;t.length&&t[t.length-1].trim()==="";)t.pop();if(t.length===0)return[];const r=t.some(s=>s.includes("	"))?t.map(s=>s.split("	")):t.map(Fg),i=r.reduce((s,o)=>Math.max(s,o.length),0);for(const s of r)for(;s.length<i;)s.push("");return r.map(s=>s.map(o=>o.trim()))}function Fg(e){const t=[];let n="",r=!1;for(let i=0;i<e.length;i++){const s=e[i];r?s==='"'?e[i+1]==='"'?(n+='"',i++):r=!1:n+=s:s==='"'?r=!0:s===","?(t.push(n),n=""):n+=s}return t.push(n),t}function Rg(e,{autoMerge:t=!0,cellSize:n=$d}={}){var a,c,u;const r=Yn(e.length),i=Yn(((a=e[0])==null?void 0:a.length)??1),s=Array.from({length:r},(d,h)=>Array.from({length:i},(g,w)=>`r${h}c${w}-${Uh()}`)),o={};for(let d=0;d<r;d++){let h=0;for(;h<i;){const g=((c=e[d])==null?void 0:c[h])??"";if(g===""){h++;continue}let w=h;if(t)for(;w+1<i&&(((u=e[d])==null?void 0:u[w+1])??"")==="";)w++;const y=s[d][h];for(let x=h+1;x<=w;x++)s[d][x]=y;o[y]={type:"text",text:g},h=w+1}}return{grid:{rows:r,cols:i,cellSize:n,groups:s},pieceContent:o}}function Dg(e,t){const n=Lg(e);if(n.length===0)throw new Error("No data found in input");if(n.length>xt||n[0].length>xt)throw new Error(`Grid too large (max ${xt}×${xt}). Got ${n.length}×${n[0].length}.`);return Rg(n,t)}const q=64,Ye=22,Ie=16;function Bg({grid:e,selection:t,onSelectionChange:n,pieceColors:r,backgrounds:i,onDeleteRows:s,onDeleteCols:o}){var C,T,L,X;const a=b.useRef(null),[c,u]=b.useState(null),[d,h]=b.useState(null),[g,w]=b.useState(null),y=e.cols*q,x=e.rows*q,v=y+Ye+Ie*2,p=x+Ye+Ie*2,f=Ie+Ye,m=Ie+Ye,k=xs(e),S=new Set(t.map(([_,P])=>`${_},${P}`)),E=(_,P)=>{const V=a.current.getBoundingClientRect(),Y=_-V.left-f,H=P-V.top-m,J=Math.floor(Y/q),fe=Math.floor(H/q);return fe<0||fe>=e.rows||J<0||J>=e.cols?null:[fe,J]},j=(_,P,V)=>{var Y,H;if(_.button===0){if(_.preventDefault(),_.shiftKey||_.ctrlKey||_.metaKey){const J=`${P},${V}`,fe=new Set(S);fe.has(J)?fe.delete(J):fe.add(J),n([...fe].map(yn=>yn.split(",").map(Number)));return}u({startCell:[P,V],curCell:[P,V]}),n([[P,V]]),(H=(Y=_.currentTarget).setPointerCapture)==null||H.call(Y,_.pointerId)}};b.useEffect(()=>{if(!c)return;const _=V=>{const Y=E(V.clientX,V.clientY);Y&&(Y[0]===c.curCell[0]&&Y[1]===c.curCell[1]||(u(H=>H&&{...H,curCell:Y}),n(Od([c.startCell,Y]))))},P=()=>u(null);return window.addEventListener("pointermove",_),window.addEventListener("pointerup",P),()=>{window.removeEventListener("pointermove",_),window.removeEventListener("pointerup",P)}},[(C=c==null?void 0:c.startCell)==null?void 0:C[0],(T=c==null?void 0:c.startCell)==null?void 0:T[1],(L=c==null?void 0:c.curCell)==null?void 0:L[0],(X=c==null?void 0:c.curCell)==null?void 0:X[1]]);const z=(_,P)=>{const V=a.current.getBoundingClientRect(),Y=_-V.left,H=P-V.top;return Y>=Ie&&Y<Ie+Ye&&H>=m&&H<m+x?{axis:"row",idx:Math.floor((H-m)/q)}:H>=Ie&&H<Ie+Ye&&Y>=f&&Y<f+y?{axis:"col",idx:Math.floor((Y-f)/q)}:null},A=(_,P,V)=>{var Y,H;_.button===0&&(_.preventDefault(),_.stopPropagation(),h({axis:P,marks:new Set([V])}),(H=(Y=_.currentTarget).setPointerCapture)==null||H.call(Y,_.pointerId))};b.useEffect(()=>{if(!d)return;const _=V=>{const Y=z(V.clientX,V.clientY);!Y||Y.axis!==d.axis||h(H=>{if(!H||H.marks.has(Y.idx))return H;const J=new Set(H.marks);return J.add(Y.idx),{...H,marks:J}})},P=()=>{h(V=>{if(!V)return null;const Y=[...V.marks].sort((H,J)=>H-J);return V.axis==="row"?s==null||s(Y):o==null||o(Y),null})};return window.addEventListener("pointermove",_),window.addEventListener("pointerup",P),()=>{window.removeEventListener("pointermove",_),window.removeEventListener("pointerup",P)}},[d==null?void 0:d.axis]);const M=[];for(const[_,P]of k)M.push({id:_,x:f+P.cMin*q,y:m+P.rMin*q,w:(P.cMax-P.cMin+1)*q,h:(P.rMax-P.rMin+1)*q,isMerged:P.cMax>P.cMin||P.rMax>P.rMin,fill:r==null?void 0:r[_],label:P.cMax>P.cMin||P.rMax>P.rMin?`${P.cMax-P.cMin+1}×${P.rMax-P.rMin+1}`:""});const W=t.map(([_,P])=>({key:`${_},${P}`,x:f+P*q,y:m+_*q})),K=Array.from({length:e.rows},(_,P)=>P),$=Array.from({length:e.cols},(_,P)=>P),I=(_,P)=>d&&d.axis===_&&d.marks.has(P),R=(_,P)=>!d&&g&&g.axis===_&&g.idx===P,D=new Set,B=new Set;return d?d.axis==="row"?d.marks.forEach(_=>D.add(_)):d.marks.forEach(_=>B.add(_)):g&&(g.axis==="row"?D.add(g.idx):B.add(g.idx)),l.jsx("div",{className:"grid-canvas-wrap",children:l.jsxs("svg",{ref:a,className:"grid-canvas",width:v,height:p,viewBox:`0 0 ${v} ${p}`,children:[$.map(_=>{const P=f+_*q,V=I("col",_),Y=R("col",_),H=V||Y;return l.jsxs("g",{children:[l.jsx("rect",{x:P,y:Ie,width:q,height:Ye,className:`grid-canvas__header-hit ${V?"is-marked":""} ${Y?"is-hovered":""}`,onPointerDown:J=>A(J,"col",_),onPointerEnter:()=>!d&&w({axis:"col",idx:_}),onPointerLeave:()=>!d&&w(null),children:l.jsxs("title",{children:["Click to delete column ",_+1]})}),H?l.jsx("text",{x:P+q/2,y:Ie+Ye/2,className:"grid-canvas__header-x",pointerEvents:"none",children:"×"}):l.jsx("text",{x:P+q/2,y:Ie+Ye/2,className:"grid-canvas__header",pointerEvents:"none",children:_+1})]},`ch-${_}`)}),K.map(_=>{const P=m+_*q,V=I("row",_),Y=R("row",_),H=V||Y;return l.jsxs("g",{children:[l.jsx("rect",{x:Ie,y:P,width:Ye,height:q,className:`grid-canvas__header-hit ${V?"is-marked":""} ${Y?"is-hovered":""}`,onPointerDown:J=>A(J,"row",_),onPointerEnter:()=>!d&&w({axis:"row",idx:_}),onPointerLeave:()=>!d&&w(null),children:l.jsxs("title",{children:["Click to delete row ",_+1]})}),H?l.jsx("text",{x:Ie+Ye/2,y:P+q/2,className:"grid-canvas__header-x",pointerEvents:"none",children:"×"}):l.jsx("text",{x:Ie+Ye/2,y:P+q/2,className:"grid-canvas__header",pointerEvents:"none",children:_+1})]},`rh-${_}`)}),M.map(_=>l.jsx("rect",{x:_.x,y:_.y,width:_.w,height:_.h,className:`grid-canvas__group ${_.isMerged?"grid-canvas__group--merged":""}`,style:_.fill?{fill:_.fill}:void 0,rx:"6",ry:"6"},_.id)),(i||[]).map(_=>{const P=_.rect;if(!P)return null;const V=f+P.cMin*q,Y=m+P.rMin*q,H=(P.cMax-P.cMin+1)*q,J=(P.rMax-P.rMin+1)*q,fe=_.fit==="cover"?"xMidYMid slice":_.fit==="contain"?"xMidYMid meet":_.fit==="fill"?"none":"xMidYMid slice";return l.jsxs("g",{className:"grid-canvas__bg",pointerEvents:"none",children:[l.jsx("image",{href:_.src,x:V,y:Y,width:H,height:J,preserveAspectRatio:fe}),l.jsx("rect",{x:V,y:Y,width:H,height:J,className:"grid-canvas__bg-frame",rx:"4",ry:"4"})]},_.id)}),W.map(_=>l.jsx("rect",{x:_.x+2,y:_.y+2,width:q-4,height:q-4,className:"grid-canvas__selected",rx:"4",ry:"4",pointerEvents:"none"},_.key)),M.filter(_=>_.label).map(_=>l.jsx("text",{x:_.x+_.w/2,y:_.y+_.h/2,className:"grid-canvas__label",textAnchor:"middle",dominantBaseline:"central",pointerEvents:"none",children:_.label},`l-${_.id}`)),[...D].map(_=>l.jsx("rect",{x:f,y:m+_*q,width:y,height:q,className:`grid-canvas__doom ${d?"grid-canvas__doom--marked":""}`,pointerEvents:"none"},`doom-r-${_}`)),[...B].map(_=>l.jsx("rect",{x:f+_*q,y:m,width:q,height:x,className:`grid-canvas__doom ${d?"grid-canvas__doom--marked":""}`,pointerEvents:"none"},`doom-c-${_}`)),l.jsx("rect",{x:f,y:m,width:y,height:x,fill:"transparent",style:{cursor:"pointer"},onPointerDown:_=>{const P=E(_.clientX,_.clientY);P&&j(_,P[0],P[1])}})]})})}const lf=[{value:"cover",label:"Cover",hint:"Fill, may crop"},{value:"contain",label:"Contain",hint:"Fit whole image"},{value:"fill",label:"Stretch",hint:"Stretch to bounds"}];function Jl(e){const t=b.useRef(null);return{inputProps:{ref:t,onChange:i=>{var o;const s=(o=i.target.files)==null?void 0:o[0];i.target.value="",s&&e(s)}},open:()=>{var i;return(i=t.current)==null?void 0:i.click()}}}function Ug({backgrounds:e,selectionRect:t,onAddImage:n,onUpdate:r,onRemove:i}){const{inputProps:s,open:o}=Jl(n);return l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Backgrounds"}),l.jsx("p",{className:"hint",children:t?`Image will fill ${t.cMax-t.cMin+1}×${t.rMax-t.rMin+1} selected cells, sliced across the underlying pieces.`:"Select cells to choose where to place the image (defaults to the full grid)."}),l.jsx("input",{...s,type:"file",accept:"image/*",hidden:!0}),l.jsxs("div",{className:"action-stack",children:[l.jsx("button",{type:"button",className:"action-btn",onClick:o,children:"↑ Upload image"}),l.jsx("p",{className:"hint",children:"Or paste an image (Ctrl+V) — it goes into the current selection."})]}),e.length>0&&l.jsx("div",{className:"bg-list",children:e.map((a,c)=>{const u=`${a.rect.cMax-a.rect.cMin+1}×${a.rect.rMax-a.rect.rMin+1}`;return l.jsxs("div",{className:"bg-item",children:[l.jsx("img",{src:a.src,alt:"",className:"bg-item__thumb"}),l.jsxs("div",{className:"bg-item__body",children:[l.jsxs("div",{className:"bg-item__head",children:[l.jsxs("span",{className:"bg-item__label",children:["#",c+1," · ",u]}),l.jsx("button",{type:"button",className:"bg-item__del",onClick:()=>i(a.id),title:"Delete this background",children:"✕"})]}),l.jsx("div",{className:"effect-chips",children:lf.map(d=>l.jsx("button",{type:"button",className:`chip chip--sm ${(a.fit||"cover")===d.value?"chip--active":""}`,onClick:()=>r(a.id,{fit:d.value}),title:d.hint,children:d.label},d.value))})]})]},a.id)})})]})}const vc=`Logo		Theme	Language	About		How It Works		Sign In		Sign Up
Build Your Custom ERP								No Coding Required		
										
Step 1			Step 2			Step 3				`;function Wg({onClose:e,onImport:t}){const[n,r]=b.useState(""),[i,s]=b.useState(!0),o=()=>{n.trim()&&t(n,{autoMerge:i})};return l.jsx("div",{className:"modal-backdrop",onClick:e,children:l.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[l.jsxs("header",{className:"modal__head",children:[l.jsx("h2",{className:"modal__title",children:"Import grid data"}),l.jsx("button",{type:"button",className:"modal__close",onClick:e,"aria-label":"Close",children:"✕"})]}),l.jsxs("div",{className:"modal__body",children:[l.jsx("p",{className:"hint",children:"Paste tab-separated (from Excel/Google Sheets) or comma-separated data. Each non-empty cell becomes a piece."}),l.jsx("textarea",{className:"modal__textarea",placeholder:vc,value:n,onChange:a=>r(a.target.value),spellCheck:!1,autoFocus:!0}),l.jsxs("label",{className:"modal__check",children:[l.jsx("input",{type:"checkbox",checked:i,onChange:a=>s(a.target.checked)}),l.jsx("span",{children:"Auto-merge horizontal runs (extend each cell to the right over empties)"})]})]}),l.jsxs("footer",{className:"modal__foot",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:()=>r(vc),children:"Insert sample"}),l.jsx("div",{style:{flex:1}}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:e,children:"Cancel"}),l.jsx("button",{type:"button",className:"action-btn action-btn--primary",disabled:!n.trim(),onClick:o,children:"Import"})]})]})})}function Yt({label:e,min:t,max:n,step:r=1,value:i,onChange:s,format:o,parse:a}){const[c,u]=b.useState(!1),[d,h]=b.useState("");b.useEffect(()=>{c||h(o?o(i):String(i))},[i,c,o]);const g=()=>{const y=a?a(d):parseFloat(d);if(Number.isFinite(y)){const x=Math.min(n,Math.max(t,y));s(x)}u(!1)},w=()=>{h(o?o(i):String(i)),u(!1)};return l.jsxs("label",{className:"slider-control",children:[l.jsx("span",{className:"slider-control__label",children:e}),l.jsx("input",{type:"range",min:t,max:n,step:r,value:i,onChange:y=>s(Number(y.target.value))}),l.jsx("input",{type:"text",inputMode:"decimal",className:"slider-control__input",value:c?d:o?o(i):String(i),onFocus:y=>{u(!0),h(String(i)),y.target.select()},onChange:y=>h(y.target.value),onBlur:g,onKeyDown:y=>{y.key==="Enter"?y.currentTarget.blur():y.key==="Escape"?(w(),y.currentTarget.blur()):y.key==="ArrowUp"?(y.preventDefault(),s(Math.min(n,i+r))):y.key==="ArrowDown"&&(y.preventDefault(),s(Math.max(t,i-r)))}})]})}const Kg=.2,Hg=5,Vg=.0015;function af({children:e,...t}){const n=b.useRef(null),[r,i]=b.useState(1),[s,o]=b.useState(0),[a,c]=b.useState(0),u=b.useRef({active:!1,startX:0,startY:0,baseTx:0,baseTy:0}),d=b.useCallback(v=>{v.preventDefault();const p=n.current.getBoundingClientRect(),f=v.clientX-p.left,m=v.clientY-p.top,k=Math.exp(-v.deltaY*Vg);i(S=>{const E=Math.max(Kg,Math.min(Hg,S*k)),j=E/S;return o(z=>f-(f-z)*j),c(z=>m-(m-z)*j),E})},[]);b.useEffect(()=>{const v=n.current;if(v)return v.addEventListener("wheel",d,{passive:!1}),()=>v.removeEventListener("wheel",d)},[d]);const h=v=>{const p=v.button===1,f=v.button===0&&(v.ctrlKey||v.metaKey);!p&&!f||(v.preventDefault(),u.current={active:!0,startX:v.clientX,startY:v.clientY,baseTx:s,baseTy:a},v.currentTarget.setPointerCapture(v.pointerId))},g=v=>{if(!u.current.active)return;const{startX:p,startY:f,baseTx:m,baseTy:k}=u.current;o(m+(v.clientX-p)),c(k+(v.clientY-f))},w=v=>{if(u.current.active&&(v.button===1||v.button===0)){u.current.active=!1;try{v.currentTarget.releasePointerCapture(v.pointerId)}catch{}}},y=v=>{v.button===1&&v.preventDefault()},x=()=>{i(1),o(0),c(0)};return l.jsxs("section",{className:"view-panel",children:[l.jsxs("div",{className:"view-panel__hud",children:[l.jsxs("span",{className:"view-panel__zoom",children:[Math.round(r*100),"%"]}),l.jsx("button",{type:"button",className:"view-panel__reset",onClick:x,title:"Reset view",children:"Reset View"}),l.jsx("span",{className:"view-panel__hint",children:"Scroll to zoom · Middle-drag or Ctrl+drag to pan"})]}),l.jsx("div",{ref:n,className:`view-panel__surface ${u.current.active?"is-panning":""}`,onPointerDown:h,onPointerMove:g,onPointerUp:w,onPointerCancel:w,onAuxClick:y,children:l.jsx("div",{className:"view-panel__transform",style:{transform:`translate(${s}px, ${a}px) scale(${r})`,transformOrigin:"0 0"},children:e??l.jsx(Jn,{...t})})})]})}const Yg=["#d68b54","#e6a378","#c87070","#d4a056","#a98ec4","#5fb68f","#7fc9a6","#5b8c85","#6b9bd1","#a3a3a3"];function Xg({project:e}){const{project:t,setGrid:n,merge:r,unmerge:i,setPieceColor:s,replaceGrid:o,removeRows:a,removeCols:c,addBackground:u,updateBackground:d,removeBackground:h}=e,[g,w]=b.useState([]),[y,x]=b.useState(!1),v=b.useMemo(()=>{if(g.length===0)return null;let $=1/0,I=-1/0,R=1/0,D=-1/0;for(const[B,C]of g)B<$&&($=B),B>I&&(I=B),C<R&&(R=C),C>D&&(D=C);return{rMin:$,rMax:I,cMin:R,cMax:D}},[g]),p=$=>{if(!$)return;const I=new FileReader;I.onload=R=>{const D=v??{rMin:0,rMax:((t==null?void 0:t.grid.rows)??1)-1,cMin:0,cMax:((t==null?void 0:t.grid.cols)??1)-1};u({src:R.target.result,rect:D,fit:"cover"})},I.readAsDataURL($)};b.useEffect(()=>{const $=I=>{var D;const R=(D=I.clipboardData)==null?void 0:D.items;if(R){for(const B of R)if(B.type&&B.type.startsWith("image/")){I.preventDefault();const C=B.getAsFile();C&&p(C);return}}};return document.addEventListener("paste",$),()=>document.removeEventListener("paste",$)},[v,t==null?void 0:t.grid.rows,t==null?void 0:t.grid.cols]);const f=($,I)=>{try{const{grid:R,pieceContent:D}=Dg($,I);o(R,D),x(!1),w([])}catch(R){alert("Import failed: "+R.message)}},k=Jl(async $=>{if($)try{const I=await $.text();f(I,{autoMerge:!0})}catch(I){alert("Could not read file: "+I.message)}});if(!t)return null;const S=g.length>=2&&Vr(g),E=g.length>=1,j=b.useMemo(()=>{var I;const $=new Set;for(const[R,D]of g){const B=(I=t.grid.groups[R])==null?void 0:I[D];B&&$.add(B)}return[...$]},[g,t.grid.groups]),z=b.useMemo(()=>{var I;if(j.length===0)return null;const $=((I=t.pieceColors)==null?void 0:I[j[0]])??null;return j.every(R=>{var D;return(((D=t.pieceColors)==null?void 0:D[R])??null)===$})?$:null},[j,t.pieceColors]),A=$=>{for(const I of j)s(I,$)},M=()=>{S&&(r(g),w([]))},W=()=>{E&&(i(g),w([]))},K=()=>w([]);return l.jsxs("div",{className:"page-grid",children:[l.jsxs("aside",{className:"side-tools",children:[l.jsx("div",{className:"side-tools__brand",children:l.jsx(qn,{size:"sm"})}),l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Dimensions"}),l.jsx(Yt,{label:"Rows",min:Vn,max:xt,value:t.grid.rows,onChange:$=>n({rows:$})}),l.jsx(Yt,{label:"Cols",min:Vn,max:xt,value:t.grid.cols,onChange:$=>n({cols:$})}),l.jsxs("p",{className:"hint",children:[t.grid.rows," × ",t.grid.cols," cells (max ",xt,"×",xt,")."]})]}),l.jsx(we,{amplitude:3,height:10}),l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Import"}),l.jsx("p",{className:"hint",children:"Paste a spreadsheet, or import a CSV file."}),l.jsxs("div",{className:"action-stack",children:[l.jsx("button",{type:"button",className:"action-btn",onClick:()=>x(!0),children:"⎘ Paste data"}),l.jsx("input",{...k.inputProps,type:"file",accept:".csv,.tsv,.txt,text/csv",hidden:!0}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:k.open,children:"↑ Import CSV/TSV file"})]}),l.jsx("p",{className:"hint hint--warn",children:"Importing replaces the current grid."})]}),l.jsx(we,{amplitude:3,height:10}),l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Selection"}),l.jsx("p",{className:"hint",children:g.length===0?"Drag across cells, or click + Shift to add cells.":`${g.length} cell${g.length===1?"":"s"} selected.`}),l.jsxs("div",{className:"action-stack",children:[l.jsx("button",{type:"button",className:"action-btn action-btn--primary",disabled:!S,onClick:M,title:S?"Merge selected cells":"Selection must form a complete rectangle",children:"⊞ Merge"}),l.jsx("button",{type:"button",className:"action-btn",disabled:!E,onClick:W,children:"⊟ Unmerge"}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",disabled:g.length===0,onClick:K,children:"Clear selection"})]}),g.length>=2&&!S&&l.jsx("p",{className:"hint hint--warn",children:"Selection isn't rectangular — merge requires every cell in a complete rectangle."})]}),l.jsx(we,{amplitude:3,height:10}),j.length>0&&l.jsxs("section",{className:"card",children:[l.jsxs("h3",{className:"card__title",children:["Color ",j.length>1?`(${j.length} pieces)`:""]}),l.jsxs("div",{className:"color-grid",children:[l.jsx("button",{type:"button",className:`color-swatch color-swatch--clear ${z==null?"color-swatch--active":""}`,onClick:()=>A(null),title:"Clear color","aria-label":"Clear color"}),Yg.map($=>l.jsx("button",{type:"button",className:`color-swatch ${z===$?"color-swatch--active":""}`,style:{background:$},onClick:()=>A($),title:$,"aria-label":`Color ${$}`},$)),l.jsx("label",{className:"color-swatch color-swatch--custom",title:"Custom color",children:l.jsx("input",{type:"color",value:z||"#888888",onChange:$=>A($.target.value)})})]})]}),j.length>0&&l.jsx(we,{amplitude:3,height:10}),l.jsx(Ug,{backgrounds:t.backgrounds||[],selectionRect:v,onAddImage:p,onUpdate:d,onRemove:h}),l.jsx(we,{amplitude:3,height:10}),l.jsxs("section",{className:"card",children:[l.jsx("h3",{className:"card__title",children:"Tips"}),l.jsxs("ul",{className:"tip-list",children:[l.jsx("li",{children:"Drag from any cell to box-select."}),l.jsx("li",{children:"Shift-click to add or remove individual cells."}),l.jsxs("li",{children:[l.jsx("strong",{children:"Click a row/column number"})," to delete it. Drag across multiple to delete in bulk."]}),l.jsx("li",{children:"Merged groups show their dimensions."}),l.jsx("li",{children:"Click any number value to type it directly."}),l.jsxs("li",{children:[l.jsx("strong",{children:"Scroll"})," to zoom; middle-drag or Ctrl+drag to pan."]}),l.jsxs("li",{children:["Select cells, then ",l.jsx("strong",{children:"paste an image"})," (Ctrl+V) to span it across them."]})]})]})]}),l.jsx(af,{children:l.jsx(Bg,{grid:t.grid,selection:g,onSelectionChange:w,pieceColors:t.pieceColors,backgrounds:t.backgrounds,onDeleteRows:$=>{a($),w([])},onDeleteCols:$=>{c($),w([])}})}),y&&l.jsx(Wg,{onClose:()=>x(!1),onImport:f})]})}function Gg({states:e,currentTier:t,onSelectTier:n}){const i=[{id:"default",label:"Default"},{id:"inner",label:"Inner"},{id:"outer",label:"Outer"},{id:"piece",label:"Piece"},{id:"edge",label:"Edge"}].filter(s=>{var o;return s.id==="default"?!0:(o=e==null?void 0:e[s.id])==null?void 0:o.applicable});return l.jsx("nav",{className:"cascade-strip","aria-label":"Override cascade",children:i.map((s,o)=>{const a=(e==null?void 0:e[s.id])||{applicable:!1,hasOverride:!1},c=t===s.id,u=["cascade-strip__pill",a.applicable?"":"cascade-strip__pill--na",a.hasOverride&&a.applicable?"cascade-strip__pill--has":"",c?"cascade-strip__pill--current":""].filter(Boolean).join(" ");return l.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:4},children:[o>0&&l.jsx("span",{className:"cascade-strip__arrow","aria-hidden":!0,children:"›"}),l.jsxs("button",{type:"button",className:u,disabled:!a.applicable,onClick:()=>a.applicable&&(n==null?void 0:n(s.id)),title:a.applicable?a.hasOverride?`${s.label}: override set`:`${s.label}: inheriting`:`${s.label}: not applicable for this selection`,children:[l.jsx("span",{className:"cascade-strip__dot","aria-hidden":!0}),s.label]})]},s.id)})})}const sn={frequency:.025,amplitude:12,phase:0},ce="__mixed__",Qg=e=>e.charAt(0).toUpperCase()+e.slice(1);function Zg({config:e,onPatchConfig:t}){const n=(e==null?void 0:e.color)===ce,r=(e==null?void 0:e.opacity)===ce,i=(e==null?void 0:e.strokeWidth)===ce,s=typeof(e==null?void 0:e.color)=="string"&&e.color!==ce?e.color:"#888888",o=typeof(e==null?void 0:e.color)=="string"&&e.color!==ce;return l.jsxs("div",{className:"style-controls",children:[l.jsxs("div",{className:"form-row",children:[l.jsx("label",{className:"form-row__label",children:"Color"}),l.jsx("input",{type:"color",className:"form-row__color",value:s,onChange:a=>t({color:a.target.value})}),o?l.jsx("button",{type:"button",className:"link-btn",onClick:()=>t({color:void 0}),children:"reset"}):l.jsx("span",{className:"hint",style:{marginLeft:4},children:n?"mixed":"theme"})]}),l.jsx(Yt,{label:"Opacity",min:0,max:1,step:.01,value:r?1:(e==null?void 0:e.opacity)??1,format:a=>`${Math.round(a*100)}%`,onChange:a=>t({opacity:a})}),l.jsx(Yt,{label:"Width",min:0,max:10,step:.25,value:i?1.25:(e==null?void 0:e.strokeWidth)??1.25,format:a=>`${a}px`,onChange:a=>t({strokeWidth:a})})]})}function cf({catalogue:e,inheritedEffects:t={},ownEffects:n={},onChange:r,mixed:i=!1}){const s=Jg(t,n),o=new Map;for(const v of Object.values(s))v&&!o.has(v.id)&&o.set(v.id,v);const a=v=>o.has(v),[c,u]=b.useState(()=>new Set),d=b.useRef(null);b.useEffect(()=>{if(d.current!=null){const v=d.current;d.current=null,u(p=>{const f=new Set(p);return f.add(v),f})}});const h=(v,p=n)=>{var m;const f={...p};for(const k of Object.keys(f))f[k]&&f[k].id===v&&delete f[k];for(const k of Object.keys(t))((m=t[k])==null?void 0:m.id)===v&&(f[k]=null);return f},g=v=>{var S;if(a(v)){r(h(v));return}const p=e[v];if(!p)return;const f=Am(e,v),m=xn(v,f.trigger,f.scope);let k={...n};for(const E of o.values())((S=e[E.id])==null?void 0:S.group)===p.group&&(k=h(E.id,k));k[m]=f,d.current=v,r(k)},w=(v,p)=>{const f=xn(v.id,v.trigger,v.scope),m=xn(v.id,p,v.scope);if(f===m)return;const k=xc(n,t,f,m,{...v,trigger:p});r(k)},y=(v,p)=>{const f=xn(v.id,v.trigger,v.scope),m=xn(v.id,v.trigger,p);if(f===m)return;const k=xc(n,t,f,m,{...v,scope:p});r(k)},x=(v,p,f)=>{const m=xn(v.id,v.trigger,v.scope),k={...v.config||{},[p]:f};r({...n,[m]:{...v,config:k}})};return l.jsxs("div",{className:"effects-picker",children:[l.jsxs("div",{className:"effect-chips",children:[Object.entries(e).map(([v,p])=>l.jsx("button",{type:"button",title:p.label,className:`chip chip--sm ${a(v)&&!i?"chip--active":""}`,onClick:()=>g(v),children:p.label},v)),i&&l.jsx("span",{className:"chip chip--sm chip--mixed",children:"mixed"})]}),!i&&[...o.values()].map(v=>{const p=e[v.id];if(!p)return null;const f=(p.triggers||[]).length>1,m=(p.scopes||[]).length>1,k=Object.keys(p.config||{}).length>0;if(!(f||m||k))return l.jsxs("div",{className:"effect-active-row effect-active-row--bare",children:[l.jsx("span",{className:"effect-active-row__name",children:p.label}),l.jsx("button",{type:"button",className:"link-btn",onClick:()=>g(v.id),children:"remove"})]},v.id);const E=c.has(v.id);return l.jsxs("details",{className:"effect-active-row",open:E,onToggle:j=>{const z=j.currentTarget.open;u(A=>{const M=new Set(A);return z?M.add(v.id):M.delete(v.id),M})},children:[l.jsxs("summary",{className:"effect-active-row__summary",children:[l.jsx("span",{className:"effect-active-row__name",children:p.label}),l.jsx("span",{className:"effect-active-row__hint",children:qg(v,p)}),l.jsx("button",{type:"button",className:"link-btn",onClick:j=>{j.preventDefault(),g(v.id)},children:"remove"})]}),l.jsxs("div",{className:"effect-active-row__body",children:[f&&l.jsxs("div",{className:"form-row form-row--stack",children:[l.jsx("label",{className:"form-row__label",children:"When"}),l.jsx("div",{className:"effect-chips",children:p.triggers.map(j=>l.jsx("button",{type:"button",className:`chip chip--sm ${v.trigger===j?"chip--active":""}`,onClick:()=>w(v,j),children:Yd[j]||j},j))})]}),m&&l.jsxs("div",{className:"form-row form-row--stack",children:[l.jsx("label",{className:"form-row__label",children:"Where"}),l.jsx("div",{className:"effect-chips",children:p.scopes.map(j=>l.jsx("button",{type:"button",className:`chip chip--sm ${(v.scope||p.defaultScope)===j?"chip--active":""}`,onClick:()=>y(v,j),children:Gd[j]||j},j))})]}),Object.entries(p.config||{}).map(([j,z])=>{var A;return l.jsx(Yt,{label:z.label,min:z.min,max:z.max,step:z.step,value:((A=v.config)==null?void 0:A[j])??z.default,format:M=>`${M}${z.unit||""}`,onChange:M=>x(v,j,M)},j)})]})]},v.id)})]})}function Jg(e,t){const n={...e};for(const[r,i]of Object.entries(t||{}))i===null?delete n[r]:n[r]=i;return n}function xc(e,t,n,r,i){const s={...e};return t[n]&&s[n]===void 0?s[n]=null:delete s[n],s[r]=i,s}function qg(e,t){var r;const n=[];t.triggers&&t.triggers.length>1&&n.push(Yd[e.trigger]||e.trigger),t.scopes&&t.scopes.length>1&&n.push(Gd[e.scope||t.defaultScope]||e.scope);for(const[i,s]of Object.entries(t.config||{})){const o=((r=e.config)==null?void 0:r[i])??s.default;n.push(`${o}${s.unit||""}`)}return n.join(" · ")}function ns({title:e,accent:t=!1,actions:n,children:r}){return l.jsxs("section",{className:`inspector-subcard ${t?"inspector-subcard--accent":""}`,children:[l.jsxs("div",{className:"inspector-subcard__head",children:[l.jsx("h4",{className:"inspector-subcard__title",children:e}),n?l.jsx("div",{className:"inspector-subcard__actions",children:n}):null]}),l.jsx("div",{className:"inspector-subcard__body",children:r})]})}function ft({title:e,accent:t=!1,effect:n,config:r,ownEffects:i={},inheritedEffects:s={},mixed:o=!1,onSetEffect:a,onPatchConfig:c,onChangeEffects:u,onClear:d,onResetEffects:h,strokeHidden:g=!1}){const w=n==="puzzle"||n===ce&&(r==null?void 0:r.inverted)!==void 0,y=n==="wave"||n===ce&&((r==null?void 0:r.frequency)!=null||(r==null?void 0:r.amplitude)!=null);return l.jsxs(l.Fragment,{children:[!g&&l.jsxs(ns,{title:`${e} · Shape & stroke`,accent:t,actions:d?l.jsx("button",{type:"button",className:"link-btn",onClick:d,children:"reset"}):null,children:[l.jsxs("div",{className:"effect-chips",children:[Ss.map(x=>l.jsx("button",{type:"button",className:`chip chip--sm ${n===x?"chip--active":""}`,onClick:()=>a==null?void 0:a(x),children:Qg(x)},x)),n===ce&&l.jsx("span",{className:"chip chip--sm chip--mixed",children:"mixed"})]}),w&&l.jsx("div",{className:"puzzle-config",children:l.jsxs("button",{type:"button",className:`invert-tabs-btn ${(r==null?void 0:r.inverted)===!0?"invert-tabs-btn--active":""}`,onClick:()=>c==null?void 0:c({inverted:(r==null?void 0:r.inverted)!==!0}),title:"Toggle tab/socket orientation",children:[l.jsx("span",{className:"invert-tabs-btn__icon",children:"⟷"}),l.jsx("span",{children:"Invert"})]})}),y&&l.jsxs("div",{className:"wave-config",children:[l.jsx(Yt,{label:"Freq",min:.005,max:.1,step:.001,value:(r==null?void 0:r.frequency)===ce?sn.frequency:(r==null?void 0:r.frequency)??sn.frequency,format:x=>(r==null?void 0:r.frequency)===ce?`· ${x.toFixed(3)}`:x.toFixed(3),onChange:x=>c==null?void 0:c({frequency:x})}),l.jsx(Yt,{label:"Amp",min:0,max:40,step:1,value:(r==null?void 0:r.amplitude)===ce?sn.amplitude:(r==null?void 0:r.amplitude)??sn.amplitude,format:x=>(r==null?void 0:r.amplitude)===ce?`· ${x}`:`${x}`,onChange:x=>c==null?void 0:c({amplitude:x})})]}),l.jsx(Zg,{config:r,onPatchConfig:c})]}),l.jsx(ns,{title:`${e} · Animations`,accent:t,actions:h?l.jsx("button",{type:"button",className:"link-btn",onClick:h,children:"reset"}):null,children:l.jsx(cf,{catalogue:Qd,ownEffects:i,inheritedEffects:s,mixed:o,onChange:u})})]})}function qo({title:e,accent:t=!1,ownEffects:n={},inheritedEffects:r={},onChange:i,onReset:s}){return l.jsx(ns,{title:`${e} · Animations`,accent:t,actions:s?l.jsx("button",{type:"button",className:"link-btn",onClick:s,children:"reset"}):null,children:l.jsx(cf,{catalogue:Xd,ownEffects:n,inheritedEffects:r,onChange:i})})}function ey({project:e,expandedTier:t,setDefaultEdgeEffect:n,setDefaultEdgeConfig:r,setDefaultEdgeEffects:i,setLayerEffect:s,setLayerConfig:o,clearLayer:a,setLayerEffects:c,setDefaultCellEffects:u}){var p,f;const d=e.edges.default,h=d.effect,g=d.config??sn,w=d.effects||{},y=e.edges.inner,x=e.edges.outer,v=((f=(p=e==null?void 0:e.cells)==null?void 0:p.default)==null?void 0:f.effects)||{};return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"inspector-header",children:[l.jsx("h3",{className:"inspector-header__title",children:"Project defaults"}),l.jsx("span",{className:"inspector-header__sub",children:"applied to every piece unless overridden"})]}),l.jsx(ft,{title:"Default edges",accent:t==="default",effect:h,config:g,ownEffects:w,inheritedEffects:{},onSetEffect:m=>n(m,m==="wave"?g:void 0),onPatchConfig:r,onChangeEffects:i}),l.jsx(qo,{title:"Default body",accent:t==="default",ownEffects:v,inheritedEffects:{},onChange:u}),t==="inner"&&l.jsx(ft,{title:"Inner edges",accent:!0,effect:(y==null?void 0:y.effect)??h,config:(y==null?void 0:y.config)??g,ownEffects:(y==null?void 0:y.effects)||{},inheritedEffects:w,onSetEffect:m=>s("inner",m,m==="wave"?(y==null?void 0:y.config)??g:void 0),onPatchConfig:m=>o("inner",m),onChangeEffects:m=>c("inner",m),onClear:y?()=>a("inner"):null}),t==="outer"&&l.jsx(ft,{title:"Outer edges",accent:!0,effect:(x==null?void 0:x.effect)??h,config:(x==null?void 0:x.config)??g,ownEffects:(x==null?void 0:x.effects)||{},inheritedEffects:w,onSetEffect:m=>s("outer",m,m==="wave"?(x==null?void 0:x.config)??g:void 0),onPatchConfig:m=>o("outer",m),onChangeEffects:m=>c("outer",m),onClear:x?()=>a("outer"):null})]})}function ty({tabs:e,active:t,onPick:n}){return l.jsx("div",{className:"inspector-tabs",role:"tablist",children:e.map(r=>l.jsx("button",{type:"button",role:"tab","aria-selected":t===r.id,className:`inspector-tabs__btn ${t===r.id?"inspector-tabs__btn--active":""}`,onClick:()=>n(r.id),children:r.label},r.id))})}const ny=[{id:"content",label:"Content"},{id:"body",label:"Body"},{id:"edges",label:"Edges"}],ry=[{value:"left",label:"⇤"},{value:"center",label:"↔"},{value:"right",label:"⇥"}];function iy({piece:e,project:t,activeTab:n,onChangeTab:r,expandedTier:i,onClearSelection:s,setPieceContent:o,updatePieceContent:a,setCellEffects:c,setDefaultCellEffects:u,setPieceEdgeEffect:d,setPieceEdgeConfig:h,setPieceEdgeEffects:g,clearPieceEdgeOverride:w,setDefaultEdgeEffect:y,setDefaultEdgeConfig:x,setDefaultEdgeEffects:v,setLayerEffect:p,setLayerConfig:f,clearLayer:m,setLayerEffects:k}){var I,R,D,B,C,T,L,X,_;const S=t.edges,E=S.default.effect,j=S.default.config??sn,z=S.default.effects||{},A=((I=S.byPiece)==null?void 0:I[e.id])||null,M=(A==null?void 0:A.effect)??E,W=(A==null?void 0:A.config)??j,K=((D=(R=t==null?void 0:t.cells)==null?void 0:R.default)==null?void 0:D.effects)||{},$=((T=(C=(B=t==null?void 0:t.cells)==null?void 0:B.byPiece)==null?void 0:C[e.id])==null?void 0:T.effects)||{};return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"inspector-header",children:[l.jsxs("div",{children:[l.jsx("span",{className:"inspector-header__kind",children:"Piece"}),l.jsx("span",{className:"inspector-header__title",children:e.label||e.id})]}),l.jsx("button",{type:"button",className:"link-btn",onClick:s,children:"clear"})]}),l.jsx(ty,{tabs:ny,active:n,onPick:r}),n==="content"&&l.jsx(sy,{piece:e,setPieceContent:o,updatePieceContent:a}),n==="body"&&l.jsxs(l.Fragment,{children:[l.jsx(qo,{title:"This piece's body",accent:!0,ownEffects:$,inheritedEffects:K,onChange:P=>c(e.id,P)}),i==="default"&&l.jsx(qo,{title:"Default body",ownEffects:K,inheritedEffects:{},onChange:u})]}),n==="edges"&&l.jsxs(l.Fragment,{children:[l.jsx(ft,{title:"This piece's edges",accent:!0,effect:M,config:W,ownEffects:(A==null?void 0:A.effects)||{},inheritedEffects:z,onSetEffect:P=>d(e.id,P,P==="wave"?(A==null?void 0:A.config)??j:void 0),onPatchConfig:P=>h(e.id,P),onChangeEffects:P=>g(e.id,P),onClear:A?()=>w(e.id):null}),(i==="inner"||i==="outer")&&l.jsx(ft,{title:i==="inner"?"Inner edges":"Outer edges",effect:((L=S[i])==null?void 0:L.effect)??E,config:((X=S[i])==null?void 0:X.config)??j,ownEffects:((_=S[i])==null?void 0:_.effects)||{},inheritedEffects:z,onSetEffect:P=>{var V;return p(i,P,P==="wave"?((V=S[i])==null?void 0:V.config)??j:void 0)},onPatchConfig:P=>f(i,P),onChangeEffects:P=>k(i,P),onClear:S[i]?()=>m(i):null}),i==="default"&&l.jsx(ft,{title:"Default edges",effect:E,config:j,ownEffects:z,inheritedEffects:{},onSetEffect:P=>y(P,P==="wave"?j:void 0),onPatchConfig:x,onChangeEffects:v})]})]})}function sy({piece:e,setPieceContent:t,updatePieceContent:n}){const r=e.content||null,i=c=>{if(c==="none")return t(e.id,null);if(c==="text")return t(e.id,{type:"text",text:(r==null?void 0:r.text)||""});if(c==="image")return t(e.id,{type:"image",src:(r==null?void 0:r.src)||"",fit:(r==null?void 0:r.fit)||"cover"})},s=c=>{if(!c)return;const u=new FileReader;u.onload=d=>{n(e.id,{type:"image",src:d.target.result,fit:(r==null?void 0:r.fit)||"cover"})},u.readAsDataURL(c)},{inputProps:o,open:a}=Jl(s);return l.jsxs(ns,{title:"Content",accent:!0,actions:r?l.jsx("button",{type:"button",className:"link-btn",onClick:()=>t(e.id,null),children:"clear"}):null,children:[l.jsx("div",{className:"effect-chips",children:[{v:"none",l:"Empty"},{v:"text",l:"Text"},{v:"image",l:"Image"}].map(c=>l.jsx("button",{type:"button",className:`chip chip--sm ${((r==null?void 0:r.type)||"none")===c.v?"chip--active":""}`,onClick:()=>i(c.v),children:c.l},c.v))}),(r==null?void 0:r.type)==="text"&&l.jsxs("div",{className:"content-config",children:[l.jsx("textarea",{className:"modal__textarea",style:{minHeight:80},placeholder:"Enter text…",value:r.text||"",onChange:c=>n(e.id,{text:c.target.value})}),l.jsxs("div",{className:"form-row",children:[l.jsx("label",{className:"form-row__label",children:"Align"}),l.jsx("div",{className:"effect-chips",children:ry.map(c=>l.jsx("button",{type:"button",className:`chip chip--sm ${(r.align||"center")===c.value?"chip--active":""}`,onClick:()=>n(e.id,{align:c.value}),title:c.value,children:c.label},c.value))})]}),l.jsx(Yt,{label:"Size",min:8,max:64,step:1,value:Math.round(r.fontSize||Math.min(e.w,e.h)/8),onChange:c=>n(e.id,{fontSize:c})}),l.jsxs("div",{className:"form-row",children:[l.jsx("label",{className:"form-row__label",children:"Color"}),l.jsx("input",{type:"color",className:"form-row__color",value:r.color||"#ede8de",onChange:c=>n(e.id,{color:c.target.value})})]})]}),(r==null?void 0:r.type)==="image"&&l.jsxs("div",{className:"content-config",children:[l.jsx("input",{...o,type:"file",accept:"image/*",hidden:!0}),l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:a,children:r.src?"Replace image":"↑ Upload image"}),r.src&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"image-preview",children:l.jsx("img",{src:r.src,alt:"preview"})}),l.jsxs("div",{className:"form-row",children:[l.jsx("label",{className:"form-row__label",children:"Fit"}),l.jsx("div",{className:"effect-chips",children:lf.map(c=>l.jsx("button",{type:"button",className:`chip chip--sm ${(r.fit||"cover")===c.value?"chip--active":""}`,onClick:()=>n(e.id,{fit:c.value}),title:c.hint,children:c.label},c.value))})]})]})]})]})}function oy({selected:e,project:t,pieces:n,sharedEdges:r,expandedTier:i,onClearSelection:s,setEdgeEffect:o,setEdgeConfig:a,clearEdgeOverride:c,setEdgeEffects:u,setDefaultEdgeEffect:d,setDefaultEdgeConfig:h,setDefaultEdgeEffects:g,setLayerEffect:w,setLayerConfig:y,clearLayer:x,setLayerEffects:v,setPieceEdgeEffect:p,setPieceEdgeConfig:f,setPieceEdgeEffects:m,clearPieceEdgeOverride:k}){var H,J,fe,yn,js,Zt,ql,ea,ta,na,ra;const S=b.useMemo(()=>new Map(n.map(U=>[U.id,U])),[n]),E=t.edges,j=E.default,z=j.effect,A=j.config??sn,M=j.effects||{},W=b.useMemo(()=>[...e],[e]),K=W[0],$=K==null?void 0:K.includes("||outer-");E[$?"outer":"inner"];const R=b.useMemo(()=>{if(!K)return null;const[U]=bi(K);return S.get(U)||null},[K,S]),D=U=>{var G;const F=E.byEdge[U],Ae=U.includes("||outer-")?E.outer:E.inner;let me=null;for(const bt of bi(U))if((G=E.byPiece)!=null&&G[bt]){me=E.byPiece[bt];break}return{effect:(F==null?void 0:F.effect)??(me==null?void 0:me.effect)??(Ae==null?void 0:Ae.effect)??z,cfg:(F==null?void 0:F.config)??(me==null?void 0:me.config)??(Ae==null?void 0:Ae.config)??A}},B=b.useMemo(()=>{if(W.length===0)return null;let U=null,F=null,Me=!0;for(const Ae of W){const{effect:me,cfg:G}=D(Ae);Me?(U=me,F=G,Me=!1):(me!==U&&(U=ce),(F==null?void 0:F.frequency)!==(G==null?void 0:G.frequency)&&(F={...F,frequency:ce}),(F==null?void 0:F.amplitude)!==(G==null?void 0:G.amplitude)&&(F={...F,amplitude:ce}),(F==null?void 0:F.inverted)!==(G==null?void 0:G.inverted)&&(F={...F,inverted:ce}),(F==null?void 0:F.color)!==(G==null?void 0:G.color)&&(F={...F,color:ce}),(F==null?void 0:F.opacity)!==(G==null?void 0:G.opacity)&&(F={...F,opacity:ce}),(F==null?void 0:F.strokeWidth)!==(G==null?void 0:G.strokeWidth)&&(F={...F,strokeWidth:ce}))}return{effect:U,cfg:F}},[W,E.byEdge,E.byPiece,E.inner,E.outer,z,A]),C=((H=E.byEdge[K])==null?void 0:H.effects)||{},T=b.useMemo(()=>{var Ae;if(!K)return{};const U=$?E.outer:E.inner,F=bi(K).map(me=>{var G,bt;return(bt=(G=E.byPiece)==null?void 0:G[me])==null?void 0:bt.effects}).filter(Boolean),Me={};for(const me of[(Ae=E.default)==null?void 0:Ae.effects,U==null?void 0:U.effects,...F])if(me)for(const[G,bt]of Object.entries(me))bt===null?delete Me[G]:Me[G]=bt;return Me},[K,$,E]),L=W.length>1&&W.some(U=>{var F;return JSON.stringify(((F=E.byEdge[U])==null?void 0:F.effects)||{})!==JSON.stringify(C)}),X=U=>{const F=U==="wave"?B!=null&&B.cfg&&B.cfg.frequency!==ce&&B.cfg.amplitude!==ce?B.cfg:A:void 0;for(const Me of W)o(Me,U,F)},_=U=>{for(const F of W)a(F,U)},P=U=>{for(const F of W)u(F,U)},V=()=>{for(const U of W)c(U)},Y=(()=>{var Ae,me;if(W.length!==1)return`${W.length} edges`;if($){const G=R;return`Outer · ${(G==null?void 0:G.label)||(G==null?void 0:G.id)||""}`}const U=r.find(G=>G.pairKey===K);if(!U)return"";const F=((Ae=S.get(U.pieceAId))==null?void 0:Ae.label)||U.pieceAId,Me=((me=S.get(U.pieceBId))==null?void 0:me.label)||U.pieceBId;return`${F} ↔ ${Me}`})();return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"inspector-header",children:[l.jsxs("div",{children:[l.jsx("span",{className:"inspector-header__kind",children:"Edge"}),l.jsx("span",{className:"inspector-header__title",children:W.length===1?"Selected edge":`${W.length} edges`}),Y&&l.jsx("div",{className:"inspector-header__sub",children:Y})]}),l.jsx("button",{type:"button",className:"link-btn",onClick:s,children:"clear"})]}),l.jsx(ft,{title:"This edge",accent:!0,effect:B==null?void 0:B.effect,config:B==null?void 0:B.cfg,ownEffects:C,inheritedEffects:T,mixed:L,onSetEffect:X,onPatchConfig:_,onChangeEffects:P,onClear:V}),i==="piece"&&R&&l.jsx(ft,{title:`Piece · ${R.label||R.id}`,effect:((fe=(J=E.byPiece)==null?void 0:J[R.id])==null?void 0:fe.effect)??z,config:((js=(yn=E.byPiece)==null?void 0:yn[R.id])==null?void 0:js.config)??A,ownEffects:((ql=(Zt=E.byPiece)==null?void 0:Zt[R.id])==null?void 0:ql.effects)||{},inheritedEffects:M,onSetEffect:U=>{var F,Me;return p(R.id,U,U==="wave"?((Me=(F=E.byPiece)==null?void 0:F[R.id])==null?void 0:Me.config)??A:void 0)},onPatchConfig:U=>f(R.id,U),onChangeEffects:U=>m(R.id,U),onClear:(ea=E.byPiece)!=null&&ea[R.id]?()=>k(R.id):null}),(i==="inner"||i==="outer")&&l.jsx(ft,{title:i==="inner"?"Inner edges":"Outer edges",effect:((ta=E[i])==null?void 0:ta.effect)??z,config:((na=E[i])==null?void 0:na.config)??A,ownEffects:((ra=E[i])==null?void 0:ra.effects)||{},inheritedEffects:M,onSetEffect:U=>{var F;return w(i,U,U==="wave"?((F=E[i])==null?void 0:F.config)??A:void 0)},onPatchConfig:U=>y(i,U),onChangeEffects:U=>v(i,U),onClear:E[i]?()=>x(i):null}),i==="default"&&l.jsx(ft,{title:"Default edges",effect:z,config:A,ownEffects:M,inheritedEffects:{},onSetEffect:U=>d(U,U==="wave"?A:void 0),onPatchConfig:h,onChangeEffects:g})]})}const ly=["color","opacity","strokeWidth","frequency","amplitude","inverted"];function tt(e){if(!e)return!1;if(e.effect!=null)return!0;const t=e.config;if(t){for(const r of ly)if(t[r]!=null)return!0}const n=e.effects;return!!(n&&Object.keys(n).length>0)}function ay(e,t){var r,i;const n={default:{applicable:!0,hasOverride:tt(e==null?void 0:e.default)},inner:{applicable:!1,hasOverride:!1},outer:{applicable:!1,hasOverride:!1},piece:{applicable:!1,hasOverride:!1},edge:{applicable:!1,hasOverride:!1}};if(!t||t.type==="none")return n.inner={applicable:!0,hasOverride:tt(e==null?void 0:e.inner)},n.outer={applicable:!0,hasOverride:tt(e==null?void 0:e.outer)},n;if(t.type==="edge"){const s=t.pairKeys||[],o=s.some(h=>!h.includes("||outer-")),a=s.some(h=>h.includes("||outer-"));o&&(n.inner={applicable:!0,hasOverride:tt(e==null?void 0:e.inner)}),a&&(n.outer={applicable:!0,hasOverride:tt(e==null?void 0:e.outer)});const c=new Set;for(const h of s)for(const g of bi(h))c.add(g);let u=!1;for(const h of c)if(tt((r=e==null?void 0:e.byPiece)==null?void 0:r[h])){u=!0;break}n.piece={applicable:c.size>0,hasOverride:u};const d=s.some(h=>{var g;return tt((g=e==null?void 0:e.byEdge)==null?void 0:g[h])});return n.edge={applicable:!0,hasOverride:d},n}return t.type==="piece"&&(t.hasInner&&(n.inner={applicable:!0,hasOverride:tt(e==null?void 0:e.inner)}),t.hasOuter&&(n.outer={applicable:!0,hasOverride:tt(e==null?void 0:e.outer)}),n.piece={applicable:!0,hasOverride:tt((i=e==null?void 0:e.byPiece)==null?void 0:i[t.pieceId])}),n}function cy({project:e,pieces:t,sharedEdges:n,selectedEdges:r,selectedPieceId:i,onClearEdgeSelection:s,onClearPieceSelection:o,setDefaultEdgeEffect:a,setDefaultEdgeConfig:c,setDefaultEdgeEffects:u,setLayerEffect:d,setLayerConfig:h,clearLayer:g,setLayerEffects:w,setPieceEdgeEffect:y,setPieceEdgeConfig:x,setPieceEdgeEffects:v,clearPieceEdgeOverride:p,setEdgeEffect:f,setEdgeConfig:m,clearEdgeOverride:k,setEdgeEffects:S,setPieceContent:E,updatePieceContent:j,setDefaultCellEffects:z,setCellEffects:A,resetEdgeOverrides:M,resetAllCellEffects:W}){var Y,H,J;const[K,$]=b.useState(null),[I,R]=b.useState("edges"),D=r.size>0?"edge":i?"piece":"none",B=b.useMemo(()=>i?t.find(fe=>fe.id===i):null,[t,i]),C=b.useMemo(()=>{if(!B)return{hasInner:!1,hasOuter:!1};const yn=Wd(e).some(Zt=>Zt.pieceId===B.id);return{hasInner:n.some(Zt=>Zt.pieceAId===B.id||Zt.pieceBId===B.id),hasOuter:yn}},[B,e,n]),T=b.useMemo(()=>D==="edge"?{type:"edge",pairKeys:[...r]}:D==="piece"?{type:"piece",pieceId:i,hasInner:C.hasInner,hasOuter:C.hasOuter}:{type:"none"},[D,r,i,C]),L=b.useMemo(()=>ay(e.edges,T),[e.edges,T]);b.useEffect(()=>{$(null)},[D,i]);const X=D==="edge"?"edge":D==="piece"?"piece":"default",_=fe=>{if(fe===X){$(null);return}$(fe)};b.useEffect(()=>{D!=="piece"||!K||(K==="inner"||K==="outer"||K==="default")&&I==="content"&&R("edges")},[K,D,I]);const P=Object.keys(e.edges.byEdge||{}).length>0||Object.keys(e.edges.byPiece||{}).length>0,V=Object.keys(((H=(Y=e==null?void 0:e.cells)==null?void 0:Y.default)==null?void 0:H.effects)||{}).length>0||Object.keys(((J=e==null?void 0:e.cells)==null?void 0:J.byPiece)||{}).length>0;return l.jsxs("div",{className:"inspector",children:[l.jsx(Gg,{states:L,currentTier:K||X,onSelectTier:_}),D==="none"&&l.jsx(ey,{project:e,expandedTier:K,setDefaultEdgeEffect:a,setDefaultEdgeConfig:c,setDefaultEdgeEffects:u,setLayerEffect:d,setLayerConfig:h,clearLayer:g,setLayerEffects:w,setDefaultCellEffects:z}),D==="piece"&&B&&l.jsx(iy,{piece:B,project:e,activeTab:I,onChangeTab:R,expandedTier:K,onClearSelection:o,setPieceContent:E,updatePieceContent:j,setCellEffects:A,setDefaultCellEffects:z,setPieceEdgeEffect:y,setPieceEdgeConfig:x,setPieceEdgeEffects:v,clearPieceEdgeOverride:p,setDefaultEdgeEffect:a,setDefaultEdgeConfig:c,setDefaultEdgeEffects:u,setLayerEffect:d,setLayerConfig:h,clearLayer:g,setLayerEffects:w}),D==="edge"&&l.jsx(oy,{selected:r,project:e,pieces:t,sharedEdges:n,expandedTier:K,onClearSelection:s,setEdgeEffect:f,setEdgeConfig:m,clearEdgeOverride:k,setEdgeEffects:S,setDefaultEdgeEffect:a,setDefaultEdgeConfig:c,setDefaultEdgeEffects:u,setLayerEffect:d,setLayerConfig:h,clearLayer:g,setLayerEffects:w,setPieceEdgeEffect:y,setPieceEdgeConfig:x,setPieceEdgeEffects:v,clearPieceEdgeOverride:p}),(P||V)&&l.jsx("div",{className:"action-stack",children:l.jsx("button",{type:"button",className:"action-btn action-btn--ghost",onClick:()=>{M(),W()},children:"Clear all overrides"})})]})}const uy=60;function dy(e,t,n,r=uy){if(e.length===0)return{x:0,y:0,w:1,h:1};const i=e.reduce((s,o)=>{const a=Es(o,e,t,n);return{minX:Math.min(s.minX,a.minX),minY:Math.min(s.minY,a.minY),maxX:Math.max(s.maxX,a.maxX),maxY:Math.max(s.maxY,a.maxY)}},{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0});return{x:i.minX-r,y:i.minY-r,w:i.maxX-i.minX+r*2,h:i.maxY-i.minY+r*2}}const el=24,wc=el/2,mi=60,fy=["color","opacity","strokeWidth","frequency","amplitude","inverted"];function kc(e,t,n){if(n==="right"||n==="left"){const o=n==="right"?e.x+e.w:e.x,a=t?Math.max(e.y,t.y):e.y,c=t?Math.min(e.y+e.h,t.y+t.h):e.y+e.h;return{isVertical:!0,x:o-wc,y:a,w:el,h:c-a,lx1:o,ly1:a,lx2:o,ly2:c}}const r=n==="bottom"?e.y+e.h:e.y,i=t?Math.max(e.x,t.x):e.x,s=t?Math.min(e.x+e.w,t.x+t.w):e.x+e.w;return{isVertical:!1,x:i,y:r-wc,w:s-i,h:el,lx1:i,ly1:r,lx2:s,ly2:r}}function py(e){if(!e)return{style:!1,anim:!1};const t=e.effect!=null||fy.some(r=>{var i;return((i=e.config)==null?void 0:i[r])!=null}),n=e.effects&&Object.keys(e.effects).length>0;return{style:!!t,anim:!!n}}function hy({pieces:e,effect:t,effectConfig:n,allEdges:r,selectedEdgeIds:i,onSelectEdge:s,selectedPieceId:o,onSelectPiece:a,edgesByEdge:c,edgesByPiece:u}){const d=b.useMemo(()=>new Map(e.map(y=>[y.id,y])),[e]),h=b.useMemo(()=>dy(e,t,n),[e,t,n]),g=b.useMemo(()=>{const y=[];for(const x of r){const v=c==null?void 0:c[x.pairKey],{style:p,anim:f}=py(v);if(x.isOuter){const m=d.get(x.pieceId);if(!m)continue;y.push({pairKey:x.pairKey,...kc(m,null,x.side),styleOv:p,animOv:f,isOuter:!0,pieceId:x.pieceId,side:x.side})}else{const m=d.get(x.pieceAId),k=d.get(x.pieceBId);if(!m||!k)continue;y.push({pairKey:x.pairKey,...kc(m,k,x.sideA),styleOv:p,animOv:f,isOuter:!1,pieceAId:x.pieceAId,pieceBId:x.pieceBId,sideA:x.sideA})}}return y},[r,d,c]),w=b.useMemo(()=>u?e.filter(y=>tt(u[y.id])):[],[e,u]);return l.jsxs("div",{className:"edge-canvas edit-canvas--inspector",children:[l.jsx(Jn,{pieces:e,effect:t,effectConfig:n,selectedId:o,onSelect:a}),l.jsxs("svg",{className:"edge-canvas__overlay",viewBox:`${h.x} ${h.y} ${h.w} ${h.h}`,width:h.w,height:h.h,xmlns:"http://www.w3.org/2000/svg",children:[l.jsx("defs",{children:g.map(y=>{const x=y.isVertical?{x:y.lx1-mi,y:y.ly1,w:mi*2,h:y.ly2-y.ly1}:{x:y.lx1,y:y.ly1-mi,w:y.lx2-y.lx1,h:mi*2};return l.jsx("clipPath",{id:`ec-clip-${y.pairKey}`,children:l.jsx("rect",{x:x.x,y:x.y,width:x.w,height:x.h})},y.pairKey)})}),w.map(y=>l.jsx("path",{d:_s(y,e,t,n),className:"piece-override-outline"},`po-${y.id}`)),g.map(y=>{const x=i==null?void 0:i.has(y.pairKey),v=y.isOuter?mc(d.get(y.pieceId),e,y.side,t,n):mc(d.get(y.pieceAId),e,y.sideA,t,n),p=y.styleOv||y.animOv,f=y.styleOv&&y.animOv,m=(y.lx1+y.lx2)/2,k=(y.ly1+y.ly2)/2;return l.jsxs("g",{className:"edge-hit "+(x?"edge-hit--selected ":"")+(p?"edge-hit--override":""),onClick:S=>{S.stopPropagation(),s(y.pairKey,S)},children:[l.jsx("rect",{x:y.x,y:y.y,width:y.w,height:y.h,className:"edge-hit__hit"}),v&&l.jsx("path",{d:v,className:"edge-hit__line",fill:"none",clipPath:`url(#ec-clip-${y.pairKey})`}),p&&!x&&(f?l.jsxs(l.Fragment,{children:[l.jsx("circle",{cx:m-3,cy:k,r:3,className:"edge-override-dot edge-override-dot--combo-a"}),l.jsx("circle",{cx:m+3,cy:k,r:3,className:"edge-override-dot edge-override-dot--combo-b"})]}):l.jsx("circle",{cx:m,cy:k,r:3.5,className:`edge-override-dot ${y.styleOv?"edge-override-dot--style":"edge-override-dot--anim"}`}))]},y.pairKey)})]})]})}const my={frequency:.025,amplitude:12,phase:0};function gy({project:e}){const{project:t,pieces:n,sharedEdges:r,setDefaultEdgeEffect:i,setDefaultEdgeConfig:s,setEdgeEffect:o,setEdgeConfig:a,clearEdgeOverride:c,resetEdgeOverrides:u,setLayerEffect:d,setLayerConfig:h,clearLayer:g,setPieceEdgeEffect:w,setPieceEdgeConfig:y,clearPieceEdgeOverride:x,setPieceContent:v,updatePieceContent:p,setDefaultCellEffects:f,setCellEffects:m,resetAllCellEffects:k,setDefaultEdgeEffects:S,setLayerEffects:E,setPieceEdgeEffects:j,setEdgeEffects:z}=e,[A,M]=b.useState(()=>new Set),[W,K]=b.useState(null),$=b.useCallback((C,T)=>{K(null),M(L=>{const X=new Set(L);return T!=null&&T.shiftKey||T!=null&&T.ctrlKey||T!=null&&T.metaKey?X.has(C)?X.delete(C):X.add(C):X.size===1&&X.has(C)?X.clear():(X.clear(),X.add(C)),X})},[]),I=b.useCallback(C=>{M(new Set),K(C)},[]);b.useEffect(()=>{const C=T=>{T.key==="Escape"&&(M(new Set),K(null))};return window.addEventListener("keydown",C),()=>window.removeEventListener("keydown",C)},[]);const R=b.useMemo(()=>t?[...r,...Wd(t)]:[],[t,r]);if(!t)return null;const D=t.edges.default.effect,B=t.edges.default.config??my;return l.jsxs("div",{className:"page-edit",children:[l.jsxs("aside",{className:"side-tools",children:[l.jsx("div",{className:"side-tools__brand",children:l.jsx(qn,{size:"sm"})}),l.jsx(cy,{project:t,pieces:n,sharedEdges:r,selectedEdges:A,selectedPieceId:W,onClearEdgeSelection:()=>M(new Set),onClearPieceSelection:()=>K(null),setDefaultEdgeEffect:i,setDefaultEdgeConfig:s,setDefaultEdgeEffects:S,setLayerEffect:d,setLayerConfig:h,clearLayer:g,setLayerEffects:E,setPieceEdgeEffect:w,setPieceEdgeConfig:y,setPieceEdgeEffects:j,clearPieceEdgeOverride:x,setEdgeEffect:o,setEdgeConfig:a,clearEdgeOverride:c,setEdgeEffects:z,setPieceContent:v,updatePieceContent:p,setDefaultCellEffects:f,setCellEffects:m,resetEdgeOverrides:u,resetAllCellEffects:k})]}),l.jsx(af,{children:l.jsx(hy,{pieces:n,effect:D,effectConfig:B,allEdges:R,selectedEdgeIds:A,onSelectEdge:$,selectedPieceId:W,onSelectPiece:I,edgesByEdge:t.edges.byEdge,edgesByPiece:t.edges.byPiece})})]})}const uf="hakoniwa:theme",yy="puzzle-studio:theme";function vy(){try{return localStorage.getItem(uf)||localStorage.getItem(yy)||"dark"}catch{return"dark"}}const df="hakoniwa:lastPage";function xy(){try{const e=localStorage.getItem(df)||"landing";return e==="edges"||e==="cells"?"edit":e}catch{return"landing"}}function wy(){var o;const[e,t]=b.useState(xy),n=mm(),[r,i]=b.useState(vy);b.useEffect(()=>{try{localStorage.setItem(df,e)}catch{}},[e]),b.useEffect(()=>{document.documentElement.setAttribute("data-theme",r);try{localStorage.setItem(uf,r)}catch{}},[r]);const s=()=>i(a=>a==="dark"?"light":"dark");return l.jsxs("div",{className:"app",children:[l.jsx(Dm,{page:e,onNav:t,projectName:(o=n.project)==null?void 0:o.name,theme:r,onToggleTheme:s}),l.jsxs("main",{className:"app__page",children:[e==="landing"&&l.jsx(Wm,{onNav:t}),e==="docs"&&l.jsx(ig,{onNav:t}),e==="projects"&&l.jsx(cg,{project:n,onNav:t}),e==="preview"&&l.jsx(Og,{project:n,onNav:t}),e==="grid"&&l.jsx(Xg,{project:n}),e==="edit"&&l.jsx(gy,{project:n})]})]})}to.createRoot(document.getElementById("root")).render(l.jsx(bf.StrictMode,{children:l.jsx(wy,{})}));
