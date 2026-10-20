(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var Jv={exports:{}},Tu={},ex={exports:{}},nt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var il=Symbol.for("react.element"),z1=Symbol.for("react.portal"),B1=Symbol.for("react.fragment"),j1=Symbol.for("react.strict_mode"),V1=Symbol.for("react.profiler"),H1=Symbol.for("react.provider"),G1=Symbol.for("react.context"),W1=Symbol.for("react.forward_ref"),X1=Symbol.for("react.suspense"),$1=Symbol.for("react.memo"),q1=Symbol.for("react.lazy"),$m=Symbol.iterator;function Y1(t){return t===null||typeof t!="object"?null:(t=$m&&t[$m]||t["@@iterator"],typeof t=="function"?t:null)}var tx={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},nx=Object.assign,ix={};function La(t,e,n){this.props=t,this.context=e,this.refs=ix,this.updater=n||tx}La.prototype.isReactComponent={};La.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};La.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function rx(){}rx.prototype=La.prototype;function xp(t,e,n){this.props=t,this.context=e,this.refs=ix,this.updater=n||tx}var _p=xp.prototype=new rx;_p.constructor=xp;nx(_p,La.prototype);_p.isPureReactComponent=!0;var qm=Array.isArray,sx=Object.prototype.hasOwnProperty,yp={current:null},ax={key:!0,ref:!0,__self:!0,__source:!0};function ox(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)sx.call(e,i)&&!ax.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:il,type:t,key:s,ref:a,props:r,_owner:yp.current}}function K1(t,e){return{$$typeof:il,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Sp(t){return typeof t=="object"&&t!==null&&t.$$typeof===il}function Z1(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Ym=/\/+/g;function nd(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Z1(""+t.key):e.toString(36)}function hc(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case il:case z1:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+nd(a,0):i,qm(r)?(n="",t!=null&&(n=t.replace(Ym,"$&/")+"/"),hc(r,e,n,"",function(c){return c})):r!=null&&(Sp(r)&&(r=K1(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(Ym,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",qm(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+nd(s,o);a+=hc(s,e,n,l,r)}else if(l=Y1(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+nd(s,o++),a+=hc(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function hl(t,e,n){if(t==null)return t;var i=[],r=0;return hc(t,i,"","",function(s){return e.call(n,s,r++)}),i}function Q1(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var yn={current:null},fc={transition:null},J1={ReactCurrentDispatcher:yn,ReactCurrentBatchConfig:fc,ReactCurrentOwner:yp};function lx(){throw Error("act(...) is not supported in production builds of React.")}nt.Children={map:hl,forEach:function(t,e,n){hl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return hl(t,function(){e++}),e},toArray:function(t){return hl(t,function(e){return e})||[]},only:function(t){if(!Sp(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};nt.Component=La;nt.Fragment=B1;nt.Profiler=V1;nt.PureComponent=xp;nt.StrictMode=j1;nt.Suspense=X1;nt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=J1;nt.act=lx;nt.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=nx({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=yp.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)sx.call(e,l)&&!ax.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:il,type:t.type,key:r,ref:s,props:i,_owner:a}};nt.createContext=function(t){return t={$$typeof:G1,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:H1,_context:t},t.Consumer=t};nt.createElement=ox;nt.createFactory=function(t){var e=ox.bind(null,t);return e.type=t,e};nt.createRef=function(){return{current:null}};nt.forwardRef=function(t){return{$$typeof:W1,render:t}};nt.isValidElement=Sp;nt.lazy=function(t){return{$$typeof:q1,_payload:{_status:-1,_result:t},_init:Q1}};nt.memo=function(t,e){return{$$typeof:$1,type:t,compare:e===void 0?null:e}};nt.startTransition=function(t){var e=fc.transition;fc.transition={};try{t()}finally{fc.transition=e}};nt.unstable_act=lx;nt.useCallback=function(t,e){return yn.current.useCallback(t,e)};nt.useContext=function(t){return yn.current.useContext(t)};nt.useDebugValue=function(){};nt.useDeferredValue=function(t){return yn.current.useDeferredValue(t)};nt.useEffect=function(t,e){return yn.current.useEffect(t,e)};nt.useId=function(){return yn.current.useId()};nt.useImperativeHandle=function(t,e,n){return yn.current.useImperativeHandle(t,e,n)};nt.useInsertionEffect=function(t,e){return yn.current.useInsertionEffect(t,e)};nt.useLayoutEffect=function(t,e){return yn.current.useLayoutEffect(t,e)};nt.useMemo=function(t,e){return yn.current.useMemo(t,e)};nt.useReducer=function(t,e,n){return yn.current.useReducer(t,e,n)};nt.useRef=function(t){return yn.current.useRef(t)};nt.useState=function(t){return yn.current.useState(t)};nt.useSyncExternalStore=function(t,e,n){return yn.current.useSyncExternalStore(t,e,n)};nt.useTransition=function(){return yn.current.useTransition()};nt.version="18.3.1";ex.exports=nt;var X=ex.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var eS=X,tS=Symbol.for("react.element"),nS=Symbol.for("react.fragment"),iS=Object.prototype.hasOwnProperty,rS=eS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,sS={key:!0,ref:!0,__self:!0,__source:!0};function cx(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)iS.call(e,i)&&!sS.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:tS,type:t,key:s,ref:a,props:r,_owner:rS.current}}Tu.Fragment=nS;Tu.jsx=cx;Tu.jsxs=cx;Jv.exports=Tu;var u=Jv.exports,ux={exports:{}},Hn={},dx={exports:{}},hx={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(I,H){var J=I.length;I.push(H);e:for(;0<J;){var de=J-1>>>1,Ae=I[de];if(0<r(Ae,H))I[de]=H,I[J]=Ae,J=de;else break e}}function n(I){return I.length===0?null:I[0]}function i(I){if(I.length===0)return null;var H=I[0],J=I.pop();if(J!==H){I[0]=J;e:for(var de=0,Ae=I.length,We=Ae>>>1;de<We;){var Z=2*(de+1)-1,ae=I[Z],xe=Z+1,fe=I[xe];if(0>r(ae,J))xe<Ae&&0>r(fe,ae)?(I[de]=fe,I[xe]=J,de=xe):(I[de]=ae,I[Z]=J,de=Z);else if(xe<Ae&&0>r(fe,J))I[de]=fe,I[xe]=J,de=xe;else break e}}return H}function r(I,H){var J=I.sortIndex-H.sortIndex;return J!==0?J:I.id-H.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],d=1,p=null,f=3,m=!1,y=!1,x=!1,g=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function S(I){for(var H=n(c);H!==null;){if(H.callback===null)i(c);else if(H.startTime<=I)i(c),H.sortIndex=H.expirationTime,e(l,H);else break;H=n(c)}}function _(I){if(x=!1,S(I),!y)if(n(l)!==null)y=!0,Q(M);else{var H=n(c);H!==null&&K(_,H.startTime-I)}}function M(I,H){y=!1,x&&(x=!1,h(b),b=-1),m=!0;var J=f;try{for(S(H),p=n(l);p!==null&&(!(p.expirationTime>H)||I&&!N());){var de=p.callback;if(typeof de=="function"){p.callback=null,f=p.priorityLevel;var Ae=de(p.expirationTime<=H);H=t.unstable_now(),typeof Ae=="function"?p.callback=Ae:p===n(l)&&i(l),S(H)}else i(l);p=n(l)}if(p!==null)var We=!0;else{var Z=n(c);Z!==null&&K(_,Z.startTime-H),We=!1}return We}finally{p=null,f=J,m=!1}}var T=!1,A=null,b=-1,w=5,E=-1;function N(){return!(t.unstable_now()-E<w)}function V(){if(A!==null){var I=t.unstable_now();E=I;var H=!0;try{H=A(!0,I)}finally{H?z():(T=!1,A=null)}}else T=!1}var z;if(typeof v=="function")z=function(){v(V)};else if(typeof MessageChannel<"u"){var Y=new MessageChannel,ne=Y.port2;Y.port1.onmessage=V,z=function(){ne.postMessage(null)}}else z=function(){g(V,0)};function Q(I){A=I,T||(T=!0,z())}function K(I,H){b=g(function(){I(t.unstable_now())},H)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(I){I.callback=null},t.unstable_continueExecution=function(){y||m||(y=!0,Q(M))},t.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w=0<I?Math.floor(1e3/I):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(I){switch(f){case 1:case 2:case 3:var H=3;break;default:H=f}var J=f;f=H;try{return I()}finally{f=J}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(I,H){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var J=f;f=I;try{return H()}finally{f=J}},t.unstable_scheduleCallback=function(I,H,J){var de=t.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?de+J:de):J=de,I){case 1:var Ae=-1;break;case 2:Ae=250;break;case 5:Ae=1073741823;break;case 4:Ae=1e4;break;default:Ae=5e3}return Ae=J+Ae,I={id:d++,callback:H,priorityLevel:I,startTime:J,expirationTime:Ae,sortIndex:-1},J>de?(I.sortIndex=J,e(c,I),n(l)===null&&I===n(c)&&(x?(h(b),b=-1):x=!0,K(_,J-de))):(I.sortIndex=Ae,e(l,I),y||m||(y=!0,Q(M))),I},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(I){var H=f;return function(){var J=f;f=H;try{return I.apply(this,arguments)}finally{f=J}}}})(hx);dx.exports=hx;var aS=dx.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oS=X,Vn=aS;function oe(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var fx=new Set,Io={};function _s(t,e){ga(t,e),ga(t+"Capture",e)}function ga(t,e){for(Io[t]=e,t=0;t<e.length;t++)fx.add(e[t])}var nr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_h=Object.prototype.hasOwnProperty,lS=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Km={},Zm={};function cS(t){return _h.call(Zm,t)?!0:_h.call(Km,t)?!1:lS.test(t)?Zm[t]=!0:(Km[t]=!0,!1)}function uS(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function dS(t,e,n,i){if(e===null||typeof e>"u"||uS(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Sn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var tn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){tn[t]=new Sn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];tn[e]=new Sn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){tn[t]=new Sn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){tn[t]=new Sn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){tn[t]=new Sn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){tn[t]=new Sn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){tn[t]=new Sn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){tn[t]=new Sn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){tn[t]=new Sn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Mp=/[\-:]([a-z])/g;function Ep(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Mp,Ep);tn[e]=new Sn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Mp,Ep);tn[e]=new Sn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Mp,Ep);tn[e]=new Sn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){tn[t]=new Sn(t,1,!1,t.toLowerCase(),null,!1,!1)});tn.xlinkHref=new Sn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){tn[t]=new Sn(t,1,!1,t.toLowerCase(),null,!0,!0)});function wp(t,e,n,i){var r=tn.hasOwnProperty(e)?tn[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(dS(e,n,r,i)&&(n=null),i||r===null?cS(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var lr=oS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,fl=Symbol.for("react.element"),Xs=Symbol.for("react.portal"),$s=Symbol.for("react.fragment"),Tp=Symbol.for("react.strict_mode"),yh=Symbol.for("react.profiler"),px=Symbol.for("react.provider"),mx=Symbol.for("react.context"),Cp=Symbol.for("react.forward_ref"),Sh=Symbol.for("react.suspense"),Mh=Symbol.for("react.suspense_list"),Ap=Symbol.for("react.memo"),Sr=Symbol.for("react.lazy"),gx=Symbol.for("react.offscreen"),Qm=Symbol.iterator;function Wa(t){return t===null||typeof t!="object"?null:(t=Qm&&t[Qm]||t["@@iterator"],typeof t=="function"?t:null)}var Nt=Object.assign,id;function fo(t){if(id===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);id=e&&e[1]||""}return`
`+id+t}var rd=!1;function sd(t,e){if(!t||rd)return"";rd=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{rd=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?fo(t):""}function hS(t){switch(t.tag){case 5:return fo(t.type);case 16:return fo("Lazy");case 13:return fo("Suspense");case 19:return fo("SuspenseList");case 0:case 2:case 15:return t=sd(t.type,!1),t;case 11:return t=sd(t.type.render,!1),t;case 1:return t=sd(t.type,!0),t;default:return""}}function Eh(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case $s:return"Fragment";case Xs:return"Portal";case yh:return"Profiler";case Tp:return"StrictMode";case Sh:return"Suspense";case Mh:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case mx:return(t.displayName||"Context")+".Consumer";case px:return(t._context.displayName||"Context")+".Provider";case Cp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Ap:return e=t.displayName||null,e!==null?e:Eh(t.type)||"Memo";case Sr:e=t._payload,t=t._init;try{return Eh(t(e))}catch{}}return null}function fS(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Eh(e);case 8:return e===Tp?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Fr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function vx(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function pS(t){var e=vx(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function pl(t){t._valueTracker||(t._valueTracker=pS(t))}function xx(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=vx(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Ic(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function wh(t,e){var n=e.checked;return Nt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Jm(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Fr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function _x(t,e){e=e.checked,e!=null&&wp(t,"checked",e,!1)}function Th(t,e){_x(t,e);var n=Fr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Ch(t,e.type,n):e.hasOwnProperty("defaultValue")&&Ch(t,e.type,Fr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function eg(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Ch(t,e,n){(e!=="number"||Ic(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var po=Array.isArray;function sa(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Fr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Ah(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(oe(91));return Nt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function tg(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(oe(92));if(po(n)){if(1<n.length)throw Error(oe(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Fr(n)}}function yx(t,e){var n=Fr(e.value),i=Fr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function ng(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Sx(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function bh(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Sx(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ml,Mx=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ml=ml||document.createElement("div"),ml.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ml.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Do(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var So={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},mS=["Webkit","ms","Moz","O"];Object.keys(So).forEach(function(t){mS.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),So[e]=So[t]})});function Ex(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||So.hasOwnProperty(t)&&So[t]?(""+e).trim():e+"px"}function wx(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Ex(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var gS=Nt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Rh(t,e){if(e){if(gS[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(oe(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(oe(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(oe(61))}if(e.style!=null&&typeof e.style!="object")throw Error(oe(62))}}function Ph(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Nh=null;function bp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Lh=null,aa=null,oa=null;function ig(t){if(t=al(t)){if(typeof Lh!="function")throw Error(oe(280));var e=t.stateNode;e&&(e=Pu(e),Lh(t.stateNode,t.type,e))}}function Tx(t){aa?oa?oa.push(t):oa=[t]:aa=t}function Cx(){if(aa){var t=aa,e=oa;if(oa=aa=null,ig(t),e)for(t=0;t<e.length;t++)ig(e[t])}}function Ax(t,e){return t(e)}function bx(){}var ad=!1;function Rx(t,e,n){if(ad)return t(e,n);ad=!0;try{return Ax(t,e,n)}finally{ad=!1,(aa!==null||oa!==null)&&(bx(),Cx())}}function Uo(t,e){var n=t.stateNode;if(n===null)return null;var i=Pu(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(oe(231,e,typeof n));return n}var Ih=!1;if(nr)try{var Xa={};Object.defineProperty(Xa,"passive",{get:function(){Ih=!0}}),window.addEventListener("test",Xa,Xa),window.removeEventListener("test",Xa,Xa)}catch{Ih=!1}function vS(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var Mo=!1,Dc=null,Uc=!1,Dh=null,xS={onError:function(t){Mo=!0,Dc=t}};function _S(t,e,n,i,r,s,a,o,l){Mo=!1,Dc=null,vS.apply(xS,arguments)}function yS(t,e,n,i,r,s,a,o,l){if(_S.apply(this,arguments),Mo){if(Mo){var c=Dc;Mo=!1,Dc=null}else throw Error(oe(198));Uc||(Uc=!0,Dh=c)}}function ys(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Px(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function rg(t){if(ys(t)!==t)throw Error(oe(188))}function SS(t){var e=t.alternate;if(!e){if(e=ys(t),e===null)throw Error(oe(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return rg(r),t;if(s===i)return rg(r),e;s=s.sibling}throw Error(oe(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(oe(189))}}if(n.alternate!==i)throw Error(oe(190))}if(n.tag!==3)throw Error(oe(188));return n.stateNode.current===n?t:e}function Nx(t){return t=SS(t),t!==null?Lx(t):null}function Lx(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Lx(t);if(e!==null)return e;t=t.sibling}return null}var Ix=Vn.unstable_scheduleCallback,sg=Vn.unstable_cancelCallback,MS=Vn.unstable_shouldYield,ES=Vn.unstable_requestPaint,It=Vn.unstable_now,wS=Vn.unstable_getCurrentPriorityLevel,Rp=Vn.unstable_ImmediatePriority,Dx=Vn.unstable_UserBlockingPriority,kc=Vn.unstable_NormalPriority,TS=Vn.unstable_LowPriority,Ux=Vn.unstable_IdlePriority,Cu=null,bi=null;function CS(t){if(bi&&typeof bi.onCommitFiberRoot=="function")try{bi.onCommitFiberRoot(Cu,t,void 0,(t.current.flags&128)===128)}catch{}}var gi=Math.clz32?Math.clz32:RS,AS=Math.log,bS=Math.LN2;function RS(t){return t>>>=0,t===0?32:31-(AS(t)/bS|0)|0}var gl=64,vl=4194304;function mo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Fc(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=mo(o):(s&=a,s!==0&&(i=mo(s)))}else a=n&~r,a!==0?i=mo(a):s!==0&&(i=mo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-gi(e),r=1<<n,i|=t[n],e&=~r;return i}function PS(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function NS(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-gi(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=PS(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function Uh(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function kx(){var t=gl;return gl<<=1,!(gl&4194240)&&(gl=64),t}function od(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function rl(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-gi(e),t[e]=n}function LS(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-gi(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Pp(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-gi(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var yt=0;function Fx(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Ox,Np,zx,Bx,jx,kh=!1,xl=[],br=null,Rr=null,Pr=null,ko=new Map,Fo=new Map,Er=[],IS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ag(t,e){switch(t){case"focusin":case"focusout":br=null;break;case"dragenter":case"dragleave":Rr=null;break;case"mouseover":case"mouseout":Pr=null;break;case"pointerover":case"pointerout":ko.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fo.delete(e.pointerId)}}function $a(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=al(e),e!==null&&Np(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function DS(t,e,n,i,r){switch(e){case"focusin":return br=$a(br,t,e,n,i,r),!0;case"dragenter":return Rr=$a(Rr,t,e,n,i,r),!0;case"mouseover":return Pr=$a(Pr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return ko.set(s,$a(ko.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Fo.set(s,$a(Fo.get(s)||null,t,e,n,i,r)),!0}return!1}function Vx(t){var e=rs(t.target);if(e!==null){var n=ys(e);if(n!==null){if(e=n.tag,e===13){if(e=Px(n),e!==null){t.blockedOn=e,jx(t.priority,function(){zx(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function pc(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Fh(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Nh=i,n.target.dispatchEvent(i),Nh=null}else return e=al(n),e!==null&&Np(e),t.blockedOn=n,!1;e.shift()}return!0}function og(t,e,n){pc(t)&&n.delete(e)}function US(){kh=!1,br!==null&&pc(br)&&(br=null),Rr!==null&&pc(Rr)&&(Rr=null),Pr!==null&&pc(Pr)&&(Pr=null),ko.forEach(og),Fo.forEach(og)}function qa(t,e){t.blockedOn===e&&(t.blockedOn=null,kh||(kh=!0,Vn.unstable_scheduleCallback(Vn.unstable_NormalPriority,US)))}function Oo(t){function e(r){return qa(r,t)}if(0<xl.length){qa(xl[0],t);for(var n=1;n<xl.length;n++){var i=xl[n];i.blockedOn===t&&(i.blockedOn=null)}}for(br!==null&&qa(br,t),Rr!==null&&qa(Rr,t),Pr!==null&&qa(Pr,t),ko.forEach(e),Fo.forEach(e),n=0;n<Er.length;n++)i=Er[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Er.length&&(n=Er[0],n.blockedOn===null);)Vx(n),n.blockedOn===null&&Er.shift()}var la=lr.ReactCurrentBatchConfig,Oc=!0;function kS(t,e,n,i){var r=yt,s=la.transition;la.transition=null;try{yt=1,Lp(t,e,n,i)}finally{yt=r,la.transition=s}}function FS(t,e,n,i){var r=yt,s=la.transition;la.transition=null;try{yt=4,Lp(t,e,n,i)}finally{yt=r,la.transition=s}}function Lp(t,e,n,i){if(Oc){var r=Fh(t,e,n,i);if(r===null)vd(t,e,i,zc,n),ag(t,i);else if(DS(r,t,e,n,i))i.stopPropagation();else if(ag(t,i),e&4&&-1<IS.indexOf(t)){for(;r!==null;){var s=al(r);if(s!==null&&Ox(s),s=Fh(t,e,n,i),s===null&&vd(t,e,i,zc,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else vd(t,e,i,null,n)}}var zc=null;function Fh(t,e,n,i){if(zc=null,t=bp(i),t=rs(t),t!==null)if(e=ys(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Px(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return zc=t,null}function Hx(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(wS()){case Rp:return 1;case Dx:return 4;case kc:case TS:return 16;case Ux:return 536870912;default:return 16}default:return 16}}var Cr=null,Ip=null,mc=null;function Gx(){if(mc)return mc;var t,e=Ip,n=e.length,i,r="value"in Cr?Cr.value:Cr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return mc=r.slice(t,1<i?1-i:void 0)}function gc(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function _l(){return!0}function lg(){return!1}function Gn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?_l:lg,this.isPropagationStopped=lg,this}return Nt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=_l)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=_l)},persist:function(){},isPersistent:_l}),e}var Ia={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Dp=Gn(Ia),sl=Nt({},Ia,{view:0,detail:0}),OS=Gn(sl),ld,cd,Ya,Au=Nt({},sl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Up,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ya&&(Ya&&t.type==="mousemove"?(ld=t.screenX-Ya.screenX,cd=t.screenY-Ya.screenY):cd=ld=0,Ya=t),ld)},movementY:function(t){return"movementY"in t?t.movementY:cd}}),cg=Gn(Au),zS=Nt({},Au,{dataTransfer:0}),BS=Gn(zS),jS=Nt({},sl,{relatedTarget:0}),ud=Gn(jS),VS=Nt({},Ia,{animationName:0,elapsedTime:0,pseudoElement:0}),HS=Gn(VS),GS=Nt({},Ia,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),WS=Gn(GS),XS=Nt({},Ia,{data:0}),ug=Gn(XS),$S={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},qS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},YS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function KS(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=YS[t])?!!e[t]:!1}function Up(){return KS}var ZS=Nt({},sl,{key:function(t){if(t.key){var e=$S[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=gc(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?qS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Up,charCode:function(t){return t.type==="keypress"?gc(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?gc(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),QS=Gn(ZS),JS=Nt({},Au,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),dg=Gn(JS),eM=Nt({},sl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Up}),tM=Gn(eM),nM=Nt({},Ia,{propertyName:0,elapsedTime:0,pseudoElement:0}),iM=Gn(nM),rM=Nt({},Au,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),sM=Gn(rM),aM=[9,13,27,32],kp=nr&&"CompositionEvent"in window,Eo=null;nr&&"documentMode"in document&&(Eo=document.documentMode);var oM=nr&&"TextEvent"in window&&!Eo,Wx=nr&&(!kp||Eo&&8<Eo&&11>=Eo),hg=" ",fg=!1;function Xx(t,e){switch(t){case"keyup":return aM.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $x(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var qs=!1;function lM(t,e){switch(t){case"compositionend":return $x(e);case"keypress":return e.which!==32?null:(fg=!0,hg);case"textInput":return t=e.data,t===hg&&fg?null:t;default:return null}}function cM(t,e){if(qs)return t==="compositionend"||!kp&&Xx(t,e)?(t=Gx(),mc=Ip=Cr=null,qs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Wx&&e.locale!=="ko"?null:e.data;default:return null}}var uM={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pg(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!uM[t.type]:e==="textarea"}function qx(t,e,n,i){Tx(i),e=Bc(e,"onChange"),0<e.length&&(n=new Dp("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var wo=null,zo=null;function dM(t){s_(t,0)}function bu(t){var e=Zs(t);if(xx(e))return t}function hM(t,e){if(t==="change")return e}var Yx=!1;if(nr){var dd;if(nr){var hd="oninput"in document;if(!hd){var mg=document.createElement("div");mg.setAttribute("oninput","return;"),hd=typeof mg.oninput=="function"}dd=hd}else dd=!1;Yx=dd&&(!document.documentMode||9<document.documentMode)}function gg(){wo&&(wo.detachEvent("onpropertychange",Kx),zo=wo=null)}function Kx(t){if(t.propertyName==="value"&&bu(zo)){var e=[];qx(e,zo,t,bp(t)),Rx(dM,e)}}function fM(t,e,n){t==="focusin"?(gg(),wo=e,zo=n,wo.attachEvent("onpropertychange",Kx)):t==="focusout"&&gg()}function pM(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return bu(zo)}function mM(t,e){if(t==="click")return bu(e)}function gM(t,e){if(t==="input"||t==="change")return bu(e)}function vM(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var xi=typeof Object.is=="function"?Object.is:vM;function Bo(t,e){if(xi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!_h.call(e,r)||!xi(t[r],e[r]))return!1}return!0}function vg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function xg(t,e){var n=vg(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=vg(n)}}function Zx(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Zx(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Qx(){for(var t=window,e=Ic();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ic(t.document)}return e}function Fp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function xM(t){var e=Qx(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Zx(n.ownerDocument.documentElement,n)){if(i!==null&&Fp(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=xg(n,s);var a=xg(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var _M=nr&&"documentMode"in document&&11>=document.documentMode,Ys=null,Oh=null,To=null,zh=!1;function _g(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;zh||Ys==null||Ys!==Ic(i)||(i=Ys,"selectionStart"in i&&Fp(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),To&&Bo(To,i)||(To=i,i=Bc(Oh,"onSelect"),0<i.length&&(e=new Dp("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Ys)))}function yl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ks={animationend:yl("Animation","AnimationEnd"),animationiteration:yl("Animation","AnimationIteration"),animationstart:yl("Animation","AnimationStart"),transitionend:yl("Transition","TransitionEnd")},fd={},Jx={};nr&&(Jx=document.createElement("div").style,"AnimationEvent"in window||(delete Ks.animationend.animation,delete Ks.animationiteration.animation,delete Ks.animationstart.animation),"TransitionEvent"in window||delete Ks.transitionend.transition);function Ru(t){if(fd[t])return fd[t];if(!Ks[t])return t;var e=Ks[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Jx)return fd[t]=e[n];return t}var e_=Ru("animationend"),t_=Ru("animationiteration"),n_=Ru("animationstart"),i_=Ru("transitionend"),r_=new Map,yg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function jr(t,e){r_.set(t,e),_s(e,[t])}for(var pd=0;pd<yg.length;pd++){var md=yg[pd],yM=md.toLowerCase(),SM=md[0].toUpperCase()+md.slice(1);jr(yM,"on"+SM)}jr(e_,"onAnimationEnd");jr(t_,"onAnimationIteration");jr(n_,"onAnimationStart");jr("dblclick","onDoubleClick");jr("focusin","onFocus");jr("focusout","onBlur");jr(i_,"onTransitionEnd");ga("onMouseEnter",["mouseout","mouseover"]);ga("onMouseLeave",["mouseout","mouseover"]);ga("onPointerEnter",["pointerout","pointerover"]);ga("onPointerLeave",["pointerout","pointerover"]);_s("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));_s("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));_s("onBeforeInput",["compositionend","keypress","textInput","paste"]);_s("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));_s("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));_s("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var go="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),MM=new Set("cancel close invalid load scroll toggle".split(" ").concat(go));function Sg(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,yS(i,e,void 0,t),t.currentTarget=null}function s_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;Sg(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;Sg(r,o,c),s=l}}}if(Uc)throw t=Dh,Uc=!1,Dh=null,t}function Ct(t,e){var n=e[Gh];n===void 0&&(n=e[Gh]=new Set);var i=t+"__bubble";n.has(i)||(a_(e,t,2,!1),n.add(i))}function gd(t,e,n){var i=0;e&&(i|=4),a_(n,t,i,e)}var Sl="_reactListening"+Math.random().toString(36).slice(2);function jo(t){if(!t[Sl]){t[Sl]=!0,fx.forEach(function(n){n!=="selectionchange"&&(MM.has(n)||gd(n,!1,t),gd(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Sl]||(e[Sl]=!0,gd("selectionchange",!1,e))}}function a_(t,e,n,i){switch(Hx(e)){case 1:var r=kS;break;case 4:r=FS;break;default:r=Lp}n=r.bind(null,e,n,t),r=void 0,!Ih||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function vd(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=rs(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}Rx(function(){var c=s,d=bp(n),p=[];e:{var f=r_.get(t);if(f!==void 0){var m=Dp,y=t;switch(t){case"keypress":if(gc(n)===0)break e;case"keydown":case"keyup":m=QS;break;case"focusin":y="focus",m=ud;break;case"focusout":y="blur",m=ud;break;case"beforeblur":case"afterblur":m=ud;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=cg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=BS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=tM;break;case e_:case t_:case n_:m=HS;break;case i_:m=iM;break;case"scroll":m=OS;break;case"wheel":m=sM;break;case"copy":case"cut":case"paste":m=WS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=dg}var x=(e&4)!==0,g=!x&&t==="scroll",h=x?f!==null?f+"Capture":null:f;x=[];for(var v=c,S;v!==null;){S=v;var _=S.stateNode;if(S.tag===5&&_!==null&&(S=_,h!==null&&(_=Uo(v,h),_!=null&&x.push(Vo(v,_,S)))),g)break;v=v.return}0<x.length&&(f=new m(f,y,null,n,d),p.push({event:f,listeners:x}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",f&&n!==Nh&&(y=n.relatedTarget||n.fromElement)&&(rs(y)||y[ir]))break e;if((m||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,m?(y=n.relatedTarget||n.toElement,m=c,y=y?rs(y):null,y!==null&&(g=ys(y),y!==g||y.tag!==5&&y.tag!==6)&&(y=null)):(m=null,y=c),m!==y)){if(x=cg,_="onMouseLeave",h="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(x=dg,_="onPointerLeave",h="onPointerEnter",v="pointer"),g=m==null?f:Zs(m),S=y==null?f:Zs(y),f=new x(_,v+"leave",m,n,d),f.target=g,f.relatedTarget=S,_=null,rs(d)===c&&(x=new x(h,v+"enter",y,n,d),x.target=S,x.relatedTarget=g,_=x),g=_,m&&y)t:{for(x=m,h=y,v=0,S=x;S;S=Ts(S))v++;for(S=0,_=h;_;_=Ts(_))S++;for(;0<v-S;)x=Ts(x),v--;for(;0<S-v;)h=Ts(h),S--;for(;v--;){if(x===h||h!==null&&x===h.alternate)break t;x=Ts(x),h=Ts(h)}x=null}else x=null;m!==null&&Mg(p,f,m,x,!1),y!==null&&g!==null&&Mg(p,g,y,x,!0)}}e:{if(f=c?Zs(c):window,m=f.nodeName&&f.nodeName.toLowerCase(),m==="select"||m==="input"&&f.type==="file")var M=hM;else if(pg(f))if(Yx)M=gM;else{M=pM;var T=fM}else(m=f.nodeName)&&m.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(M=mM);if(M&&(M=M(t,c))){qx(p,M,n,d);break e}T&&T(t,f,c),t==="focusout"&&(T=f._wrapperState)&&T.controlled&&f.type==="number"&&Ch(f,"number",f.value)}switch(T=c?Zs(c):window,t){case"focusin":(pg(T)||T.contentEditable==="true")&&(Ys=T,Oh=c,To=null);break;case"focusout":To=Oh=Ys=null;break;case"mousedown":zh=!0;break;case"contextmenu":case"mouseup":case"dragend":zh=!1,_g(p,n,d);break;case"selectionchange":if(_M)break;case"keydown":case"keyup":_g(p,n,d)}var A;if(kp)e:{switch(t){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else qs?Xx(t,n)&&(b="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(Wx&&n.locale!=="ko"&&(qs||b!=="onCompositionStart"?b==="onCompositionEnd"&&qs&&(A=Gx()):(Cr=d,Ip="value"in Cr?Cr.value:Cr.textContent,qs=!0)),T=Bc(c,b),0<T.length&&(b=new ug(b,t,null,n,d),p.push({event:b,listeners:T}),A?b.data=A:(A=$x(n),A!==null&&(b.data=A)))),(A=oM?lM(t,n):cM(t,n))&&(c=Bc(c,"onBeforeInput"),0<c.length&&(d=new ug("onBeforeInput","beforeinput",null,n,d),p.push({event:d,listeners:c}),d.data=A))}s_(p,e)})}function Vo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Bc(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Uo(t,n),s!=null&&i.unshift(Vo(t,s,r)),s=Uo(t,e),s!=null&&i.push(Vo(t,s,r))),t=t.return}return i}function Ts(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Mg(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=Uo(n,s),l!=null&&a.unshift(Vo(n,l,o))):r||(l=Uo(n,s),l!=null&&a.push(Vo(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var EM=/\r\n?/g,wM=/\u0000|\uFFFD/g;function Eg(t){return(typeof t=="string"?t:""+t).replace(EM,`
`).replace(wM,"")}function Ml(t,e,n){if(e=Eg(e),Eg(t)!==e&&n)throw Error(oe(425))}function jc(){}var Bh=null,jh=null;function Vh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Hh=typeof setTimeout=="function"?setTimeout:void 0,TM=typeof clearTimeout=="function"?clearTimeout:void 0,wg=typeof Promise=="function"?Promise:void 0,CM=typeof queueMicrotask=="function"?queueMicrotask:typeof wg<"u"?function(t){return wg.resolve(null).then(t).catch(AM)}:Hh;function AM(t){setTimeout(function(){throw t})}function xd(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Oo(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Oo(e)}function Nr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Tg(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Da=Math.random().toString(36).slice(2),Ei="__reactFiber$"+Da,Ho="__reactProps$"+Da,ir="__reactContainer$"+Da,Gh="__reactEvents$"+Da,bM="__reactListeners$"+Da,RM="__reactHandles$"+Da;function rs(t){var e=t[Ei];if(e)return e;for(var n=t.parentNode;n;){if(e=n[ir]||n[Ei]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Tg(t);t!==null;){if(n=t[Ei])return n;t=Tg(t)}return e}t=n,n=t.parentNode}return null}function al(t){return t=t[Ei]||t[ir],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Zs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(oe(33))}function Pu(t){return t[Ho]||null}var Wh=[],Qs=-1;function Vr(t){return{current:t}}function At(t){0>Qs||(t.current=Wh[Qs],Wh[Qs]=null,Qs--)}function Et(t,e){Qs++,Wh[Qs]=t.current,t.current=e}var Or={},dn=Vr(Or),bn=Vr(!1),ds=Or;function va(t,e){var n=t.type.contextTypes;if(!n)return Or;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function Rn(t){return t=t.childContextTypes,t!=null}function Vc(){At(bn),At(dn)}function Cg(t,e,n){if(dn.current!==Or)throw Error(oe(168));Et(dn,e),Et(bn,n)}function o_(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(oe(108,fS(t)||"Unknown",r));return Nt({},n,i)}function Hc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Or,ds=dn.current,Et(dn,t),Et(bn,bn.current),!0}function Ag(t,e,n){var i=t.stateNode;if(!i)throw Error(oe(169));n?(t=o_(t,e,ds),i.__reactInternalMemoizedMergedChildContext=t,At(bn),At(dn),Et(dn,t)):At(bn),Et(bn,n)}var Xi=null,Nu=!1,_d=!1;function l_(t){Xi===null?Xi=[t]:Xi.push(t)}function PM(t){Nu=!0,l_(t)}function Hr(){if(!_d&&Xi!==null){_d=!0;var t=0,e=yt;try{var n=Xi;for(yt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Xi=null,Nu=!1}catch(r){throw Xi!==null&&(Xi=Xi.slice(t+1)),Ix(Rp,Hr),r}finally{yt=e,_d=!1}}return null}var Js=[],ea=0,Gc=null,Wc=0,Yn=[],Kn=0,hs=null,qi=1,Yi="";function Qr(t,e){Js[ea++]=Wc,Js[ea++]=Gc,Gc=t,Wc=e}function c_(t,e,n){Yn[Kn++]=qi,Yn[Kn++]=Yi,Yn[Kn++]=hs,hs=t;var i=qi;t=Yi;var r=32-gi(i)-1;i&=~(1<<r),n+=1;var s=32-gi(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,qi=1<<32-gi(e)+r|n<<r|i,Yi=s+t}else qi=1<<s|n<<r|i,Yi=t}function Op(t){t.return!==null&&(Qr(t,1),c_(t,1,0))}function zp(t){for(;t===Gc;)Gc=Js[--ea],Js[ea]=null,Wc=Js[--ea],Js[ea]=null;for(;t===hs;)hs=Yn[--Kn],Yn[Kn]=null,Yi=Yn[--Kn],Yn[Kn]=null,qi=Yn[--Kn],Yn[Kn]=null}var zn=null,Fn=null,bt=!1,hi=null;function u_(t,e){var n=Zn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function bg(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,zn=t,Fn=Nr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,zn=t,Fn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=hs!==null?{id:qi,overflow:Yi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Zn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,zn=t,Fn=null,!0):!1;default:return!1}}function Xh(t){return(t.mode&1)!==0&&(t.flags&128)===0}function $h(t){if(bt){var e=Fn;if(e){var n=e;if(!bg(t,e)){if(Xh(t))throw Error(oe(418));e=Nr(n.nextSibling);var i=zn;e&&bg(t,e)?u_(i,n):(t.flags=t.flags&-4097|2,bt=!1,zn=t)}}else{if(Xh(t))throw Error(oe(418));t.flags=t.flags&-4097|2,bt=!1,zn=t}}}function Rg(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;zn=t}function El(t){if(t!==zn)return!1;if(!bt)return Rg(t),bt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Vh(t.type,t.memoizedProps)),e&&(e=Fn)){if(Xh(t))throw d_(),Error(oe(418));for(;e;)u_(t,e),e=Nr(e.nextSibling)}if(Rg(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(oe(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Fn=Nr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Fn=null}}else Fn=zn?Nr(t.stateNode.nextSibling):null;return!0}function d_(){for(var t=Fn;t;)t=Nr(t.nextSibling)}function xa(){Fn=zn=null,bt=!1}function Bp(t){hi===null?hi=[t]:hi.push(t)}var NM=lr.ReactCurrentBatchConfig;function Ka(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(oe(309));var i=n.stateNode}if(!i)throw Error(oe(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(oe(284));if(!n._owner)throw Error(oe(290,t))}return t}function wl(t,e){throw t=Object.prototype.toString.call(e),Error(oe(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Pg(t){var e=t._init;return e(t._payload)}function h_(t){function e(h,v){if(t){var S=h.deletions;S===null?(h.deletions=[v],h.flags|=16):S.push(v)}}function n(h,v){if(!t)return null;for(;v!==null;)e(h,v),v=v.sibling;return null}function i(h,v){for(h=new Map;v!==null;)v.key!==null?h.set(v.key,v):h.set(v.index,v),v=v.sibling;return h}function r(h,v){return h=Ur(h,v),h.index=0,h.sibling=null,h}function s(h,v,S){return h.index=S,t?(S=h.alternate,S!==null?(S=S.index,S<v?(h.flags|=2,v):S):(h.flags|=2,v)):(h.flags|=1048576,v)}function a(h){return t&&h.alternate===null&&(h.flags|=2),h}function o(h,v,S,_){return v===null||v.tag!==6?(v=Cd(S,h.mode,_),v.return=h,v):(v=r(v,S),v.return=h,v)}function l(h,v,S,_){var M=S.type;return M===$s?d(h,v,S.props.children,_,S.key):v!==null&&(v.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===Sr&&Pg(M)===v.type)?(_=r(v,S.props),_.ref=Ka(h,v,S),_.return=h,_):(_=Ec(S.type,S.key,S.props,null,h.mode,_),_.ref=Ka(h,v,S),_.return=h,_)}function c(h,v,S,_){return v===null||v.tag!==4||v.stateNode.containerInfo!==S.containerInfo||v.stateNode.implementation!==S.implementation?(v=Ad(S,h.mode,_),v.return=h,v):(v=r(v,S.children||[]),v.return=h,v)}function d(h,v,S,_,M){return v===null||v.tag!==7?(v=us(S,h.mode,_,M),v.return=h,v):(v=r(v,S),v.return=h,v)}function p(h,v,S){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Cd(""+v,h.mode,S),v.return=h,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case fl:return S=Ec(v.type,v.key,v.props,null,h.mode,S),S.ref=Ka(h,null,v),S.return=h,S;case Xs:return v=Ad(v,h.mode,S),v.return=h,v;case Sr:var _=v._init;return p(h,_(v._payload),S)}if(po(v)||Wa(v))return v=us(v,h.mode,S,null),v.return=h,v;wl(h,v)}return null}function f(h,v,S,_){var M=v!==null?v.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return M!==null?null:o(h,v,""+S,_);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case fl:return S.key===M?l(h,v,S,_):null;case Xs:return S.key===M?c(h,v,S,_):null;case Sr:return M=S._init,f(h,v,M(S._payload),_)}if(po(S)||Wa(S))return M!==null?null:d(h,v,S,_,null);wl(h,S)}return null}function m(h,v,S,_,M){if(typeof _=="string"&&_!==""||typeof _=="number")return h=h.get(S)||null,o(v,h,""+_,M);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case fl:return h=h.get(_.key===null?S:_.key)||null,l(v,h,_,M);case Xs:return h=h.get(_.key===null?S:_.key)||null,c(v,h,_,M);case Sr:var T=_._init;return m(h,v,S,T(_._payload),M)}if(po(_)||Wa(_))return h=h.get(S)||null,d(v,h,_,M,null);wl(v,_)}return null}function y(h,v,S,_){for(var M=null,T=null,A=v,b=v=0,w=null;A!==null&&b<S.length;b++){A.index>b?(w=A,A=null):w=A.sibling;var E=f(h,A,S[b],_);if(E===null){A===null&&(A=w);break}t&&A&&E.alternate===null&&e(h,A),v=s(E,v,b),T===null?M=E:T.sibling=E,T=E,A=w}if(b===S.length)return n(h,A),bt&&Qr(h,b),M;if(A===null){for(;b<S.length;b++)A=p(h,S[b],_),A!==null&&(v=s(A,v,b),T===null?M=A:T.sibling=A,T=A);return bt&&Qr(h,b),M}for(A=i(h,A);b<S.length;b++)w=m(A,h,b,S[b],_),w!==null&&(t&&w.alternate!==null&&A.delete(w.key===null?b:w.key),v=s(w,v,b),T===null?M=w:T.sibling=w,T=w);return t&&A.forEach(function(N){return e(h,N)}),bt&&Qr(h,b),M}function x(h,v,S,_){var M=Wa(S);if(typeof M!="function")throw Error(oe(150));if(S=M.call(S),S==null)throw Error(oe(151));for(var T=M=null,A=v,b=v=0,w=null,E=S.next();A!==null&&!E.done;b++,E=S.next()){A.index>b?(w=A,A=null):w=A.sibling;var N=f(h,A,E.value,_);if(N===null){A===null&&(A=w);break}t&&A&&N.alternate===null&&e(h,A),v=s(N,v,b),T===null?M=N:T.sibling=N,T=N,A=w}if(E.done)return n(h,A),bt&&Qr(h,b),M;if(A===null){for(;!E.done;b++,E=S.next())E=p(h,E.value,_),E!==null&&(v=s(E,v,b),T===null?M=E:T.sibling=E,T=E);return bt&&Qr(h,b),M}for(A=i(h,A);!E.done;b++,E=S.next())E=m(A,h,b,E.value,_),E!==null&&(t&&E.alternate!==null&&A.delete(E.key===null?b:E.key),v=s(E,v,b),T===null?M=E:T.sibling=E,T=E);return t&&A.forEach(function(V){return e(h,V)}),bt&&Qr(h,b),M}function g(h,v,S,_){if(typeof S=="object"&&S!==null&&S.type===$s&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case fl:e:{for(var M=S.key,T=v;T!==null;){if(T.key===M){if(M=S.type,M===$s){if(T.tag===7){n(h,T.sibling),v=r(T,S.props.children),v.return=h,h=v;break e}}else if(T.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===Sr&&Pg(M)===T.type){n(h,T.sibling),v=r(T,S.props),v.ref=Ka(h,T,S),v.return=h,h=v;break e}n(h,T);break}else e(h,T);T=T.sibling}S.type===$s?(v=us(S.props.children,h.mode,_,S.key),v.return=h,h=v):(_=Ec(S.type,S.key,S.props,null,h.mode,_),_.ref=Ka(h,v,S),_.return=h,h=_)}return a(h);case Xs:e:{for(T=S.key;v!==null;){if(v.key===T)if(v.tag===4&&v.stateNode.containerInfo===S.containerInfo&&v.stateNode.implementation===S.implementation){n(h,v.sibling),v=r(v,S.children||[]),v.return=h,h=v;break e}else{n(h,v);break}else e(h,v);v=v.sibling}v=Ad(S,h.mode,_),v.return=h,h=v}return a(h);case Sr:return T=S._init,g(h,v,T(S._payload),_)}if(po(S))return y(h,v,S,_);if(Wa(S))return x(h,v,S,_);wl(h,S)}return typeof S=="string"&&S!==""||typeof S=="number"?(S=""+S,v!==null&&v.tag===6?(n(h,v.sibling),v=r(v,S),v.return=h,h=v):(n(h,v),v=Cd(S,h.mode,_),v.return=h,h=v),a(h)):n(h,v)}return g}var _a=h_(!0),f_=h_(!1),Xc=Vr(null),$c=null,ta=null,jp=null;function Vp(){jp=ta=$c=null}function Hp(t){var e=Xc.current;At(Xc),t._currentValue=e}function qh(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function ca(t,e){$c=t,jp=ta=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(An=!0),t.firstContext=null)}function ni(t){var e=t._currentValue;if(jp!==t)if(t={context:t,memoizedValue:e,next:null},ta===null){if($c===null)throw Error(oe(308));ta=t,$c.dependencies={lanes:0,firstContext:t}}else ta=ta.next=t;return e}var ss=null;function Gp(t){ss===null?ss=[t]:ss.push(t)}function p_(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Gp(e)):(n.next=r.next,r.next=n),e.interleaved=n,rr(t,i)}function rr(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Mr=!1;function Wp(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function m_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Qi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Lr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,ot&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,rr(t,n)}return r=i.interleaved,r===null?(e.next=e,Gp(i)):(e.next=r.next,r.next=e),i.interleaved=e,rr(t,n)}function vc(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Pp(t,n)}}function Ng(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function qc(t,e,n,i){var r=t.updateQueue;Mr=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var d=t.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==a&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(s!==null){var p=r.baseState;a=0,d=c=l=null,o=s;do{var f=o.lane,m=o.eventTime;if((i&f)===f){d!==null&&(d=d.next={eventTime:m,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var y=t,x=o;switch(f=e,m=n,x.tag){case 1:if(y=x.payload,typeof y=="function"){p=y.call(m,p,f);break e}p=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=x.payload,f=typeof y=="function"?y.call(m,p,f):y,f==null)break e;p=Nt({},p,f);break e;case 2:Mr=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[o]:f.push(o))}else m={eventTime:m,lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=m,l=p):d=d.next=m,a|=f;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;f=o,o=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(d===null&&(l=p),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=d,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);ps|=a,t.lanes=a,t.memoizedState=p}}function Lg(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(oe(191,r));r.call(i)}}}var ol={},Ri=Vr(ol),Go=Vr(ol),Wo=Vr(ol);function as(t){if(t===ol)throw Error(oe(174));return t}function Xp(t,e){switch(Et(Wo,e),Et(Go,t),Et(Ri,ol),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:bh(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=bh(e,t)}At(Ri),Et(Ri,e)}function ya(){At(Ri),At(Go),At(Wo)}function g_(t){as(Wo.current);var e=as(Ri.current),n=bh(e,t.type);e!==n&&(Et(Go,t),Et(Ri,n))}function $p(t){Go.current===t&&(At(Ri),At(Go))}var Rt=Vr(0);function Yc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var yd=[];function qp(){for(var t=0;t<yd.length;t++)yd[t]._workInProgressVersionPrimary=null;yd.length=0}var xc=lr.ReactCurrentDispatcher,Sd=lr.ReactCurrentBatchConfig,fs=0,Pt=null,Bt=null,$t=null,Kc=!1,Co=!1,Xo=0,LM=0;function nn(){throw Error(oe(321))}function Yp(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!xi(t[n],e[n]))return!1;return!0}function Kp(t,e,n,i,r,s){if(fs=s,Pt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,xc.current=t===null||t.memoizedState===null?kM:FM,t=n(i,r),Co){s=0;do{if(Co=!1,Xo=0,25<=s)throw Error(oe(301));s+=1,$t=Bt=null,e.updateQueue=null,xc.current=OM,t=n(i,r)}while(Co)}if(xc.current=Zc,e=Bt!==null&&Bt.next!==null,fs=0,$t=Bt=Pt=null,Kc=!1,e)throw Error(oe(300));return t}function Zp(){var t=Xo!==0;return Xo=0,t}function Si(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return $t===null?Pt.memoizedState=$t=t:$t=$t.next=t,$t}function ii(){if(Bt===null){var t=Pt.alternate;t=t!==null?t.memoizedState:null}else t=Bt.next;var e=$t===null?Pt.memoizedState:$t.next;if(e!==null)$t=e,Bt=t;else{if(t===null)throw Error(oe(310));Bt=t,t={memoizedState:Bt.memoizedState,baseState:Bt.baseState,baseQueue:Bt.baseQueue,queue:Bt.queue,next:null},$t===null?Pt.memoizedState=$t=t:$t=$t.next=t}return $t}function $o(t,e){return typeof e=="function"?e(t):e}function Md(t){var e=ii(),n=e.queue;if(n===null)throw Error(oe(311));n.lastRenderedReducer=t;var i=Bt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var d=c.lane;if((fs&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var p={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=p,a=i):l=l.next=p,Pt.lanes|=d,ps|=d}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,xi(i,e.memoizedState)||(An=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Pt.lanes|=s,ps|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Ed(t){var e=ii(),n=e.queue;if(n===null)throw Error(oe(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);xi(s,e.memoizedState)||(An=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function v_(){}function x_(t,e){var n=Pt,i=ii(),r=e(),s=!xi(i.memoizedState,r);if(s&&(i.memoizedState=r,An=!0),i=i.queue,Qp(S_.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||$t!==null&&$t.memoizedState.tag&1){if(n.flags|=2048,qo(9,y_.bind(null,n,i,r,e),void 0,null),qt===null)throw Error(oe(349));fs&30||__(n,e,r)}return r}function __(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Pt.updateQueue,e===null?(e={lastEffect:null,stores:null},Pt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function y_(t,e,n,i){e.value=n,e.getSnapshot=i,M_(e)&&E_(t)}function S_(t,e,n){return n(function(){M_(e)&&E_(t)})}function M_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!xi(t,n)}catch{return!0}}function E_(t){var e=rr(t,1);e!==null&&vi(e,t,1,-1)}function Ig(t){var e=Si();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:$o,lastRenderedState:t},e.queue=t,t=t.dispatch=UM.bind(null,Pt,t),[e.memoizedState,t]}function qo(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Pt.updateQueue,e===null?(e={lastEffect:null,stores:null},Pt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function w_(){return ii().memoizedState}function _c(t,e,n,i){var r=Si();Pt.flags|=t,r.memoizedState=qo(1|e,n,void 0,i===void 0?null:i)}function Lu(t,e,n,i){var r=ii();i=i===void 0?null:i;var s=void 0;if(Bt!==null){var a=Bt.memoizedState;if(s=a.destroy,i!==null&&Yp(i,a.deps)){r.memoizedState=qo(e,n,s,i);return}}Pt.flags|=t,r.memoizedState=qo(1|e,n,s,i)}function Dg(t,e){return _c(8390656,8,t,e)}function Qp(t,e){return Lu(2048,8,t,e)}function T_(t,e){return Lu(4,2,t,e)}function C_(t,e){return Lu(4,4,t,e)}function A_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function b_(t,e,n){return n=n!=null?n.concat([t]):null,Lu(4,4,A_.bind(null,e,t),n)}function Jp(){}function R_(t,e){var n=ii();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Yp(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function P_(t,e){var n=ii();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Yp(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function N_(t,e,n){return fs&21?(xi(n,e)||(n=kx(),Pt.lanes|=n,ps|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,An=!0),t.memoizedState=n)}function IM(t,e){var n=yt;yt=n!==0&&4>n?n:4,t(!0);var i=Sd.transition;Sd.transition={};try{t(!1),e()}finally{yt=n,Sd.transition=i}}function L_(){return ii().memoizedState}function DM(t,e,n){var i=Dr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},I_(t))D_(e,n);else if(n=p_(t,e,n,i),n!==null){var r=xn();vi(n,t,i,r),U_(n,e,i)}}function UM(t,e,n){var i=Dr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(I_(t))D_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,xi(o,a)){var l=e.interleaved;l===null?(r.next=r,Gp(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=p_(t,e,r,i),n!==null&&(r=xn(),vi(n,t,i,r),U_(n,e,i))}}function I_(t){var e=t.alternate;return t===Pt||e!==null&&e===Pt}function D_(t,e){Co=Kc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function U_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Pp(t,n)}}var Zc={readContext:ni,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useInsertionEffect:nn,useLayoutEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useMutableSource:nn,useSyncExternalStore:nn,useId:nn,unstable_isNewReconciler:!1},kM={readContext:ni,useCallback:function(t,e){return Si().memoizedState=[t,e===void 0?null:e],t},useContext:ni,useEffect:Dg,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,_c(4194308,4,A_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return _c(4194308,4,t,e)},useInsertionEffect:function(t,e){return _c(4,2,t,e)},useMemo:function(t,e){var n=Si();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Si();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=DM.bind(null,Pt,t),[i.memoizedState,t]},useRef:function(t){var e=Si();return t={current:t},e.memoizedState=t},useState:Ig,useDebugValue:Jp,useDeferredValue:function(t){return Si().memoizedState=t},useTransition:function(){var t=Ig(!1),e=t[0];return t=IM.bind(null,t[1]),Si().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Pt,r=Si();if(bt){if(n===void 0)throw Error(oe(407));n=n()}else{if(n=e(),qt===null)throw Error(oe(349));fs&30||__(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Dg(S_.bind(null,i,s,t),[t]),i.flags|=2048,qo(9,y_.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Si(),e=qt.identifierPrefix;if(bt){var n=Yi,i=qi;n=(i&~(1<<32-gi(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Xo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=LM++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},FM={readContext:ni,useCallback:R_,useContext:ni,useEffect:Qp,useImperativeHandle:b_,useInsertionEffect:T_,useLayoutEffect:C_,useMemo:P_,useReducer:Md,useRef:w_,useState:function(){return Md($o)},useDebugValue:Jp,useDeferredValue:function(t){var e=ii();return N_(e,Bt.memoizedState,t)},useTransition:function(){var t=Md($o)[0],e=ii().memoizedState;return[t,e]},useMutableSource:v_,useSyncExternalStore:x_,useId:L_,unstable_isNewReconciler:!1},OM={readContext:ni,useCallback:R_,useContext:ni,useEffect:Qp,useImperativeHandle:b_,useInsertionEffect:T_,useLayoutEffect:C_,useMemo:P_,useReducer:Ed,useRef:w_,useState:function(){return Ed($o)},useDebugValue:Jp,useDeferredValue:function(t){var e=ii();return Bt===null?e.memoizedState=t:N_(e,Bt.memoizedState,t)},useTransition:function(){var t=Ed($o)[0],e=ii().memoizedState;return[t,e]},useMutableSource:v_,useSyncExternalStore:x_,useId:L_,unstable_isNewReconciler:!1};function ui(t,e){if(t&&t.defaultProps){e=Nt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Yh(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Nt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Iu={isMounted:function(t){return(t=t._reactInternals)?ys(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=xn(),r=Dr(t),s=Qi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Lr(t,s,r),e!==null&&(vi(e,t,r,i),vc(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=xn(),r=Dr(t),s=Qi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Lr(t,s,r),e!==null&&(vi(e,t,r,i),vc(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=xn(),i=Dr(t),r=Qi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Lr(t,r,i),e!==null&&(vi(e,t,i,n),vc(e,t,i))}};function Ug(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!Bo(n,i)||!Bo(r,s):!0}function k_(t,e,n){var i=!1,r=Or,s=e.contextType;return typeof s=="object"&&s!==null?s=ni(s):(r=Rn(e)?ds:dn.current,i=e.contextTypes,s=(i=i!=null)?va(t,r):Or),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Iu,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function kg(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Iu.enqueueReplaceState(e,e.state,null)}function Kh(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Wp(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=ni(s):(s=Rn(e)?ds:dn.current,r.context=va(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Yh(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Iu.enqueueReplaceState(r,r.state,null),qc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Sa(t,e){try{var n="",i=e;do n+=hS(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function wd(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Zh(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var zM=typeof WeakMap=="function"?WeakMap:Map;function F_(t,e,n){n=Qi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Jc||(Jc=!0,lf=i),Zh(t,e)},n}function O_(t,e,n){n=Qi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Zh(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Zh(t,e),typeof i!="function"&&(Ir===null?Ir=new Set([this]):Ir.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Fg(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new zM;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=JM.bind(null,t,e,n),e.then(t,t))}function Og(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function zg(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Qi(-1,1),e.tag=2,Lr(n,e,1))),n.lanes|=1),t)}var BM=lr.ReactCurrentOwner,An=!1;function gn(t,e,n,i){e.child=t===null?f_(e,null,n,i):_a(e,t.child,n,i)}function Bg(t,e,n,i,r){n=n.render;var s=e.ref;return ca(e,r),i=Kp(t,e,n,i,s,r),n=Zp(),t!==null&&!An?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,sr(t,e,r)):(bt&&n&&Op(e),e.flags|=1,gn(t,e,i,r),e.child)}function jg(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!om(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,z_(t,e,s,i,r)):(t=Ec(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Bo,n(a,i)&&t.ref===e.ref)return sr(t,e,r)}return e.flags|=1,t=Ur(s,i),t.ref=e.ref,t.return=e,e.child=t}function z_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Bo(s,i)&&t.ref===e.ref)if(An=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(An=!0);else return e.lanes=t.lanes,sr(t,e,r)}return Qh(t,e,n,i,r)}function B_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Et(ia,Dn),Dn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,Et(ia,Dn),Dn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,Et(ia,Dn),Dn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,Et(ia,Dn),Dn|=i;return gn(t,e,r,n),e.child}function j_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Qh(t,e,n,i,r){var s=Rn(n)?ds:dn.current;return s=va(e,s),ca(e,r),n=Kp(t,e,n,i,s,r),i=Zp(),t!==null&&!An?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,sr(t,e,r)):(bt&&i&&Op(e),e.flags|=1,gn(t,e,n,r),e.child)}function Vg(t,e,n,i,r){if(Rn(n)){var s=!0;Hc(e)}else s=!1;if(ca(e,r),e.stateNode===null)yc(t,e),k_(e,n,i),Kh(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=ni(c):(c=Rn(n)?ds:dn.current,c=va(e,c));var d=n.getDerivedStateFromProps,p=typeof d=="function"||typeof a.getSnapshotBeforeUpdate=="function";p||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&kg(e,a,i,c),Mr=!1;var f=e.memoizedState;a.state=f,qc(e,i,a,r),l=e.memoizedState,o!==i||f!==l||bn.current||Mr?(typeof d=="function"&&(Yh(e,n,d,i),l=e.memoizedState),(o=Mr||Ug(e,n,o,i,f,l,c))?(p||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,m_(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:ui(e.type,o),a.props=c,p=e.pendingProps,f=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=ni(l):(l=Rn(n)?ds:dn.current,l=va(e,l));var m=n.getDerivedStateFromProps;(d=typeof m=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==p||f!==l)&&kg(e,a,i,l),Mr=!1,f=e.memoizedState,a.state=f,qc(e,i,a,r);var y=e.memoizedState;o!==p||f!==y||bn.current||Mr?(typeof m=="function"&&(Yh(e,n,m,i),y=e.memoizedState),(c=Mr||Ug(e,n,c,i,f,y,l)||!1)?(d||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,y,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,y,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=y),a.props=i,a.state=y,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return Jh(t,e,n,i,s,r)}function Jh(t,e,n,i,r,s){j_(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&Ag(e,n,!1),sr(t,e,s);i=e.stateNode,BM.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=_a(e,t.child,null,s),e.child=_a(e,null,o,s)):gn(t,e,o,s),e.memoizedState=i.state,r&&Ag(e,n,!0),e.child}function V_(t){var e=t.stateNode;e.pendingContext?Cg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Cg(t,e.context,!1),Xp(t,e.containerInfo)}function Hg(t,e,n,i,r){return xa(),Bp(r),e.flags|=256,gn(t,e,n,i),e.child}var ef={dehydrated:null,treeContext:null,retryLane:0};function tf(t){return{baseLanes:t,cachePool:null,transitions:null}}function H_(t,e,n){var i=e.pendingProps,r=Rt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),Et(Rt,r&1),t===null)return $h(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=ku(a,i,0,null),t=us(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=tf(n),e.memoizedState=ef,t):em(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return jM(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Ur(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=Ur(o,s):(s=us(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?tf(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=ef,i}return s=t.child,t=s.sibling,i=Ur(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function em(t,e){return e=ku({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Tl(t,e,n,i){return i!==null&&Bp(i),_a(e,t.child,null,n),t=em(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function jM(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=wd(Error(oe(422))),Tl(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=ku({mode:"visible",children:i.children},r,0,null),s=us(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&_a(e,t.child,null,a),e.child.memoizedState=tf(a),e.memoizedState=ef,s);if(!(e.mode&1))return Tl(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(oe(419)),i=wd(s,i,void 0),Tl(t,e,a,i)}if(o=(a&t.childLanes)!==0,An||o){if(i=qt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,rr(t,r),vi(i,t,r,-1))}return am(),i=wd(Error(oe(421))),Tl(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=eE.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Fn=Nr(r.nextSibling),zn=e,bt=!0,hi=null,t!==null&&(Yn[Kn++]=qi,Yn[Kn++]=Yi,Yn[Kn++]=hs,qi=t.id,Yi=t.overflow,hs=e),e=em(e,i.children),e.flags|=4096,e)}function Gg(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),qh(t.return,e,n)}function Td(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function G_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(gn(t,e,i.children,n),i=Rt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Gg(t,n,e);else if(t.tag===19)Gg(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(Et(Rt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Yc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Td(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Yc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Td(e,!0,n,null,s);break;case"together":Td(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function yc(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function sr(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ps|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(oe(153));if(e.child!==null){for(t=e.child,n=Ur(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ur(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function VM(t,e,n){switch(e.tag){case 3:V_(e),xa();break;case 5:g_(e);break;case 1:Rn(e.type)&&Hc(e);break;case 4:Xp(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;Et(Xc,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(Et(Rt,Rt.current&1),e.flags|=128,null):n&e.child.childLanes?H_(t,e,n):(Et(Rt,Rt.current&1),t=sr(t,e,n),t!==null?t.sibling:null);Et(Rt,Rt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return G_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),Et(Rt,Rt.current),i)break;return null;case 22:case 23:return e.lanes=0,B_(t,e,n)}return sr(t,e,n)}var W_,nf,X_,$_;W_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};nf=function(){};X_=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,as(Ri.current);var s=null;switch(n){case"input":r=wh(t,r),i=wh(t,i),s=[];break;case"select":r=Nt({},r,{value:void 0}),i=Nt({},i,{value:void 0}),s=[];break;case"textarea":r=Ah(t,r),i=Ah(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=jc)}Rh(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Io.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Io.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&Ct("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};$_=function(t,e,n,i){n!==i&&(e.flags|=4)};function Za(t,e){if(!bt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function rn(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function HM(t,e,n){var i=e.pendingProps;switch(zp(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return rn(e),null;case 1:return Rn(e.type)&&Vc(),rn(e),null;case 3:return i=e.stateNode,ya(),At(bn),At(dn),qp(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(El(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,hi!==null&&(df(hi),hi=null))),nf(t,e),rn(e),null;case 5:$p(e);var r=as(Wo.current);if(n=e.type,t!==null&&e.stateNode!=null)X_(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(oe(166));return rn(e),null}if(t=as(Ri.current),El(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Ei]=e,i[Ho]=s,t=(e.mode&1)!==0,n){case"dialog":Ct("cancel",i),Ct("close",i);break;case"iframe":case"object":case"embed":Ct("load",i);break;case"video":case"audio":for(r=0;r<go.length;r++)Ct(go[r],i);break;case"source":Ct("error",i);break;case"img":case"image":case"link":Ct("error",i),Ct("load",i);break;case"details":Ct("toggle",i);break;case"input":Jm(i,s),Ct("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},Ct("invalid",i);break;case"textarea":tg(i,s),Ct("invalid",i)}Rh(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&Ml(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&Ml(i.textContent,o,t),r=["children",""+o]):Io.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&Ct("scroll",i)}switch(n){case"input":pl(i),eg(i,s,!0);break;case"textarea":pl(i),ng(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=jc)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Sx(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[Ei]=e,t[Ho]=i,W_(t,e,!1,!1),e.stateNode=t;e:{switch(a=Ph(n,i),n){case"dialog":Ct("cancel",t),Ct("close",t),r=i;break;case"iframe":case"object":case"embed":Ct("load",t),r=i;break;case"video":case"audio":for(r=0;r<go.length;r++)Ct(go[r],t);r=i;break;case"source":Ct("error",t),r=i;break;case"img":case"image":case"link":Ct("error",t),Ct("load",t),r=i;break;case"details":Ct("toggle",t),r=i;break;case"input":Jm(t,i),r=wh(t,i),Ct("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Nt({},i,{value:void 0}),Ct("invalid",t);break;case"textarea":tg(t,i),r=Ah(t,i),Ct("invalid",t);break;default:r=i}Rh(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?wx(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Mx(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Do(t,l):typeof l=="number"&&Do(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Io.hasOwnProperty(s)?l!=null&&s==="onScroll"&&Ct("scroll",t):l!=null&&wp(t,s,l,a))}switch(n){case"input":pl(t),eg(t,i,!1);break;case"textarea":pl(t),ng(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Fr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?sa(t,!!i.multiple,s,!1):i.defaultValue!=null&&sa(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=jc)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return rn(e),null;case 6:if(t&&e.stateNode!=null)$_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(oe(166));if(n=as(Wo.current),as(Ri.current),El(e)){if(i=e.stateNode,n=e.memoizedProps,i[Ei]=e,(s=i.nodeValue!==n)&&(t=zn,t!==null))switch(t.tag){case 3:Ml(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ml(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Ei]=e,e.stateNode=i}return rn(e),null;case 13:if(At(Rt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(bt&&Fn!==null&&e.mode&1&&!(e.flags&128))d_(),xa(),e.flags|=98560,s=!1;else if(s=El(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(oe(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(oe(317));s[Ei]=e}else xa(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;rn(e),s=!1}else hi!==null&&(df(hi),hi=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Rt.current&1?Vt===0&&(Vt=3):am())),e.updateQueue!==null&&(e.flags|=4),rn(e),null);case 4:return ya(),nf(t,e),t===null&&jo(e.stateNode.containerInfo),rn(e),null;case 10:return Hp(e.type._context),rn(e),null;case 17:return Rn(e.type)&&Vc(),rn(e),null;case 19:if(At(Rt),s=e.memoizedState,s===null)return rn(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)Za(s,!1);else{if(Vt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=Yc(t),a!==null){for(e.flags|=128,Za(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return Et(Rt,Rt.current&1|2),e.child}t=t.sibling}s.tail!==null&&It()>Ma&&(e.flags|=128,i=!0,Za(s,!1),e.lanes=4194304)}else{if(!i)if(t=Yc(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Za(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!bt)return rn(e),null}else 2*It()-s.renderingStartTime>Ma&&n!==1073741824&&(e.flags|=128,i=!0,Za(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=It(),e.sibling=null,n=Rt.current,Et(Rt,i?n&1|2:n&1),e):(rn(e),null);case 22:case 23:return sm(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Dn&1073741824&&(rn(e),e.subtreeFlags&6&&(e.flags|=8192)):rn(e),null;case 24:return null;case 25:return null}throw Error(oe(156,e.tag))}function GM(t,e){switch(zp(e),e.tag){case 1:return Rn(e.type)&&Vc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ya(),At(bn),At(dn),qp(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return $p(e),null;case 13:if(At(Rt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(oe(340));xa()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return At(Rt),null;case 4:return ya(),null;case 10:return Hp(e.type._context),null;case 22:case 23:return sm(),null;case 24:return null;default:return null}}var Cl=!1,on=!1,WM=typeof WeakSet=="function"?WeakSet:Set,Te=null;function na(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Lt(t,e,i)}else n.current=null}function rf(t,e,n){try{n()}catch(i){Lt(t,e,i)}}var Wg=!1;function XM(t,e){if(Bh=Oc,t=Qx(),Fp(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,d=0,p=t,f=null;t:for(;;){for(var m;p!==n||r!==0&&p.nodeType!==3||(o=a+r),p!==s||i!==0&&p.nodeType!==3||(l=a+i),p.nodeType===3&&(a+=p.nodeValue.length),(m=p.firstChild)!==null;)f=p,p=m;for(;;){if(p===t)break t;if(f===n&&++c===r&&(o=a),f===s&&++d===i&&(l=a),(m=p.nextSibling)!==null)break;p=f,f=p.parentNode}p=m}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(jh={focusedElem:t,selectionRange:n},Oc=!1,Te=e;Te!==null;)if(e=Te,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Te=t;else for(;Te!==null;){e=Te;try{var y=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var x=y.memoizedProps,g=y.memoizedState,h=e.stateNode,v=h.getSnapshotBeforeUpdate(e.elementType===e.type?x:ui(e.type,x),g);h.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var S=e.stateNode.containerInfo;S.nodeType===1?S.textContent="":S.nodeType===9&&S.documentElement&&S.removeChild(S.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(oe(163))}}catch(_){Lt(e,e.return,_)}if(t=e.sibling,t!==null){t.return=e.return,Te=t;break}Te=e.return}return y=Wg,Wg=!1,y}function Ao(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&rf(e,n,s)}r=r.next}while(r!==i)}}function Du(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function sf(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function q_(t){var e=t.alternate;e!==null&&(t.alternate=null,q_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Ei],delete e[Ho],delete e[Gh],delete e[bM],delete e[RM])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Y_(t){return t.tag===5||t.tag===3||t.tag===4}function Xg(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Y_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function af(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=jc));else if(i!==4&&(t=t.child,t!==null))for(af(t,e,n),t=t.sibling;t!==null;)af(t,e,n),t=t.sibling}function of(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(of(t,e,n),t=t.sibling;t!==null;)of(t,e,n),t=t.sibling}var Qt=null,di=!1;function pr(t,e,n){for(n=n.child;n!==null;)K_(t,e,n),n=n.sibling}function K_(t,e,n){if(bi&&typeof bi.onCommitFiberUnmount=="function")try{bi.onCommitFiberUnmount(Cu,n)}catch{}switch(n.tag){case 5:on||na(n,e);case 6:var i=Qt,r=di;Qt=null,pr(t,e,n),Qt=i,di=r,Qt!==null&&(di?(t=Qt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Qt.removeChild(n.stateNode));break;case 18:Qt!==null&&(di?(t=Qt,n=n.stateNode,t.nodeType===8?xd(t.parentNode,n):t.nodeType===1&&xd(t,n),Oo(t)):xd(Qt,n.stateNode));break;case 4:i=Qt,r=di,Qt=n.stateNode.containerInfo,di=!0,pr(t,e,n),Qt=i,di=r;break;case 0:case 11:case 14:case 15:if(!on&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&rf(n,e,a),r=r.next}while(r!==i)}pr(t,e,n);break;case 1:if(!on&&(na(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Lt(n,e,o)}pr(t,e,n);break;case 21:pr(t,e,n);break;case 22:n.mode&1?(on=(i=on)||n.memoizedState!==null,pr(t,e,n),on=i):pr(t,e,n);break;default:pr(t,e,n)}}function $g(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new WM),e.forEach(function(i){var r=tE.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function ai(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Qt=o.stateNode,di=!1;break e;case 3:Qt=o.stateNode.containerInfo,di=!0;break e;case 4:Qt=o.stateNode.containerInfo,di=!0;break e}o=o.return}if(Qt===null)throw Error(oe(160));K_(s,a,r),Qt=null,di=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Lt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Z_(e,t),e=e.sibling}function Z_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(ai(e,t),yi(t),i&4){try{Ao(3,t,t.return),Du(3,t)}catch(x){Lt(t,t.return,x)}try{Ao(5,t,t.return)}catch(x){Lt(t,t.return,x)}}break;case 1:ai(e,t),yi(t),i&512&&n!==null&&na(n,n.return);break;case 5:if(ai(e,t),yi(t),i&512&&n!==null&&na(n,n.return),t.flags&32){var r=t.stateNode;try{Do(r,"")}catch(x){Lt(t,t.return,x)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&_x(r,s),Ph(o,a);var c=Ph(o,s);for(a=0;a<l.length;a+=2){var d=l[a],p=l[a+1];d==="style"?wx(r,p):d==="dangerouslySetInnerHTML"?Mx(r,p):d==="children"?Do(r,p):wp(r,d,p,c)}switch(o){case"input":Th(r,s);break;case"textarea":yx(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?sa(r,!!s.multiple,m,!1):f!==!!s.multiple&&(s.defaultValue!=null?sa(r,!!s.multiple,s.defaultValue,!0):sa(r,!!s.multiple,s.multiple?[]:"",!1))}r[Ho]=s}catch(x){Lt(t,t.return,x)}}break;case 6:if(ai(e,t),yi(t),i&4){if(t.stateNode===null)throw Error(oe(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(x){Lt(t,t.return,x)}}break;case 3:if(ai(e,t),yi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Oo(e.containerInfo)}catch(x){Lt(t,t.return,x)}break;case 4:ai(e,t),yi(t);break;case 13:ai(e,t),yi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(im=It())),i&4&&$g(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(on=(c=on)||d,ai(e,t),on=c):ai(e,t),yi(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(Te=t,d=t.child;d!==null;){for(p=Te=d;Te!==null;){switch(f=Te,m=f.child,f.tag){case 0:case 11:case 14:case 15:Ao(4,f,f.return);break;case 1:na(f,f.return);var y=f.stateNode;if(typeof y.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,y.props=e.memoizedProps,y.state=e.memoizedState,y.componentWillUnmount()}catch(x){Lt(i,n,x)}}break;case 5:na(f,f.return);break;case 22:if(f.memoizedState!==null){Yg(p);continue}}m!==null?(m.return=f,Te=m):Yg(p)}d=d.sibling}e:for(d=null,p=t;;){if(p.tag===5){if(d===null){d=p;try{r=p.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=p.stateNode,l=p.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=Ex("display",a))}catch(x){Lt(t,t.return,x)}}}else if(p.tag===6){if(d===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(x){Lt(t,t.return,x)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;d===p&&(d=null),p=p.return}d===p&&(d=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:ai(e,t),yi(t),i&4&&$g(t);break;case 21:break;default:ai(e,t),yi(t)}}function yi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Y_(n)){var i=n;break e}n=n.return}throw Error(oe(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Do(r,""),i.flags&=-33);var s=Xg(t);of(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=Xg(t);af(t,o,a);break;default:throw Error(oe(161))}}catch(l){Lt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function $M(t,e,n){Te=t,Q_(t)}function Q_(t,e,n){for(var i=(t.mode&1)!==0;Te!==null;){var r=Te,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||Cl;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||on;o=Cl;var c=on;if(Cl=a,(on=l)&&!c)for(Te=r;Te!==null;)a=Te,l=a.child,a.tag===22&&a.memoizedState!==null?Kg(r):l!==null?(l.return=a,Te=l):Kg(r);for(;s!==null;)Te=s,Q_(s),s=s.sibling;Te=r,Cl=o,on=c}qg(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Te=s):qg(t)}}function qg(t){for(;Te!==null;){var e=Te;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:on||Du(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!on)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:ui(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Lg(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Lg(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var p=d.dehydrated;p!==null&&Oo(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(oe(163))}on||e.flags&512&&sf(e)}catch(f){Lt(e,e.return,f)}}if(e===t){Te=null;break}if(n=e.sibling,n!==null){n.return=e.return,Te=n;break}Te=e.return}}function Yg(t){for(;Te!==null;){var e=Te;if(e===t){Te=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Te=n;break}Te=e.return}}function Kg(t){for(;Te!==null;){var e=Te;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Du(4,e)}catch(l){Lt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Lt(e,r,l)}}var s=e.return;try{sf(e)}catch(l){Lt(e,s,l)}break;case 5:var a=e.return;try{sf(e)}catch(l){Lt(e,a,l)}}}catch(l){Lt(e,e.return,l)}if(e===t){Te=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Te=o;break}Te=e.return}}var qM=Math.ceil,Qc=lr.ReactCurrentDispatcher,tm=lr.ReactCurrentOwner,Jn=lr.ReactCurrentBatchConfig,ot=0,qt=null,Ot=null,en=0,Dn=0,ia=Vr(0),Vt=0,Yo=null,ps=0,Uu=0,nm=0,bo=null,Cn=null,im=0,Ma=1/0,Wi=null,Jc=!1,lf=null,Ir=null,Al=!1,Ar=null,eu=0,Ro=0,cf=null,Sc=-1,Mc=0;function xn(){return ot&6?It():Sc!==-1?Sc:Sc=It()}function Dr(t){return t.mode&1?ot&2&&en!==0?en&-en:NM.transition!==null?(Mc===0&&(Mc=kx()),Mc):(t=yt,t!==0||(t=window.event,t=t===void 0?16:Hx(t.type)),t):1}function vi(t,e,n,i){if(50<Ro)throw Ro=0,cf=null,Error(oe(185));rl(t,n,i),(!(ot&2)||t!==qt)&&(t===qt&&(!(ot&2)&&(Uu|=n),Vt===4&&wr(t,en)),Pn(t,i),n===1&&ot===0&&!(e.mode&1)&&(Ma=It()+500,Nu&&Hr()))}function Pn(t,e){var n=t.callbackNode;NS(t,e);var i=Fc(t,t===qt?en:0);if(i===0)n!==null&&sg(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&sg(n),e===1)t.tag===0?PM(Zg.bind(null,t)):l_(Zg.bind(null,t)),CM(function(){!(ot&6)&&Hr()}),n=null;else{switch(Fx(i)){case 1:n=Rp;break;case 4:n=Dx;break;case 16:n=kc;break;case 536870912:n=Ux;break;default:n=kc}n=ay(n,J_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function J_(t,e){if(Sc=-1,Mc=0,ot&6)throw Error(oe(327));var n=t.callbackNode;if(ua()&&t.callbackNode!==n)return null;var i=Fc(t,t===qt?en:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=tu(t,i);else{e=i;var r=ot;ot|=2;var s=ty();(qt!==t||en!==e)&&(Wi=null,Ma=It()+500,cs(t,e));do try{ZM();break}catch(o){ey(t,o)}while(!0);Vp(),Qc.current=s,ot=r,Ot!==null?e=0:(qt=null,en=0,e=Vt)}if(e!==0){if(e===2&&(r=Uh(t),r!==0&&(i=r,e=uf(t,r))),e===1)throw n=Yo,cs(t,0),wr(t,i),Pn(t,It()),n;if(e===6)wr(t,i);else{if(r=t.current.alternate,!(i&30)&&!YM(r)&&(e=tu(t,i),e===2&&(s=Uh(t),s!==0&&(i=s,e=uf(t,s))),e===1))throw n=Yo,cs(t,0),wr(t,i),Pn(t,It()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(oe(345));case 2:Jr(t,Cn,Wi);break;case 3:if(wr(t,i),(i&130023424)===i&&(e=im+500-It(),10<e)){if(Fc(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){xn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Hh(Jr.bind(null,t,Cn,Wi),e);break}Jr(t,Cn,Wi);break;case 4:if(wr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-gi(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=It()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*qM(i/1960))-i,10<i){t.timeoutHandle=Hh(Jr.bind(null,t,Cn,Wi),i);break}Jr(t,Cn,Wi);break;case 5:Jr(t,Cn,Wi);break;default:throw Error(oe(329))}}}return Pn(t,It()),t.callbackNode===n?J_.bind(null,t):null}function uf(t,e){var n=bo;return t.current.memoizedState.isDehydrated&&(cs(t,e).flags|=256),t=tu(t,e),t!==2&&(e=Cn,Cn=n,e!==null&&df(e)),t}function df(t){Cn===null?Cn=t:Cn.push.apply(Cn,t)}function YM(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!xi(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function wr(t,e){for(e&=~nm,e&=~Uu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-gi(e),i=1<<n;t[n]=-1,e&=~i}}function Zg(t){if(ot&6)throw Error(oe(327));ua();var e=Fc(t,0);if(!(e&1))return Pn(t,It()),null;var n=tu(t,e);if(t.tag!==0&&n===2){var i=Uh(t);i!==0&&(e=i,n=uf(t,i))}if(n===1)throw n=Yo,cs(t,0),wr(t,e),Pn(t,It()),n;if(n===6)throw Error(oe(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Jr(t,Cn,Wi),Pn(t,It()),null}function rm(t,e){var n=ot;ot|=1;try{return t(e)}finally{ot=n,ot===0&&(Ma=It()+500,Nu&&Hr())}}function ms(t){Ar!==null&&Ar.tag===0&&!(ot&6)&&ua();var e=ot;ot|=1;var n=Jn.transition,i=yt;try{if(Jn.transition=null,yt=1,t)return t()}finally{yt=i,Jn.transition=n,ot=e,!(ot&6)&&Hr()}}function sm(){Dn=ia.current,At(ia)}function cs(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,TM(n)),Ot!==null)for(n=Ot.return;n!==null;){var i=n;switch(zp(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Vc();break;case 3:ya(),At(bn),At(dn),qp();break;case 5:$p(i);break;case 4:ya();break;case 13:At(Rt);break;case 19:At(Rt);break;case 10:Hp(i.type._context);break;case 22:case 23:sm()}n=n.return}if(qt=t,Ot=t=Ur(t.current,null),en=Dn=e,Vt=0,Yo=null,nm=Uu=ps=0,Cn=bo=null,ss!==null){for(e=0;e<ss.length;e++)if(n=ss[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}ss=null}return t}function ey(t,e){do{var n=Ot;try{if(Vp(),xc.current=Zc,Kc){for(var i=Pt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Kc=!1}if(fs=0,$t=Bt=Pt=null,Co=!1,Xo=0,tm.current=null,n===null||n.return===null){Vt=1,Yo=e,Ot=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=en,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=o,p=d.tag;if(!(d.mode&1)&&(p===0||p===11||p===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var m=Og(a);if(m!==null){m.flags&=-257,zg(m,a,o,s,e),m.mode&1&&Fg(s,c,e),e=m,l=c;var y=e.updateQueue;if(y===null){var x=new Set;x.add(l),e.updateQueue=x}else y.add(l);break e}else{if(!(e&1)){Fg(s,c,e),am();break e}l=Error(oe(426))}}else if(bt&&o.mode&1){var g=Og(a);if(g!==null){!(g.flags&65536)&&(g.flags|=256),zg(g,a,o,s,e),Bp(Sa(l,o));break e}}s=l=Sa(l,o),Vt!==4&&(Vt=2),bo===null?bo=[s]:bo.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var h=F_(s,l,e);Ng(s,h);break e;case 1:o=l;var v=s.type,S=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||S!==null&&typeof S.componentDidCatch=="function"&&(Ir===null||!Ir.has(S)))){s.flags|=65536,e&=-e,s.lanes|=e;var _=O_(s,o,e);Ng(s,_);break e}}s=s.return}while(s!==null)}iy(n)}catch(M){e=M,Ot===n&&n!==null&&(Ot=n=n.return);continue}break}while(!0)}function ty(){var t=Qc.current;return Qc.current=Zc,t===null?Zc:t}function am(){(Vt===0||Vt===3||Vt===2)&&(Vt=4),qt===null||!(ps&268435455)&&!(Uu&268435455)||wr(qt,en)}function tu(t,e){var n=ot;ot|=2;var i=ty();(qt!==t||en!==e)&&(Wi=null,cs(t,e));do try{KM();break}catch(r){ey(t,r)}while(!0);if(Vp(),ot=n,Qc.current=i,Ot!==null)throw Error(oe(261));return qt=null,en=0,Vt}function KM(){for(;Ot!==null;)ny(Ot)}function ZM(){for(;Ot!==null&&!MS();)ny(Ot)}function ny(t){var e=sy(t.alternate,t,Dn);t.memoizedProps=t.pendingProps,e===null?iy(t):Ot=e,tm.current=null}function iy(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=GM(n,e),n!==null){n.flags&=32767,Ot=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Vt=6,Ot=null;return}}else if(n=HM(n,e,Dn),n!==null){Ot=n;return}if(e=e.sibling,e!==null){Ot=e;return}Ot=e=t}while(e!==null);Vt===0&&(Vt=5)}function Jr(t,e,n){var i=yt,r=Jn.transition;try{Jn.transition=null,yt=1,QM(t,e,n,i)}finally{Jn.transition=r,yt=i}return null}function QM(t,e,n,i){do ua();while(Ar!==null);if(ot&6)throw Error(oe(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(oe(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(LS(t,s),t===qt&&(Ot=qt=null,en=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Al||(Al=!0,ay(kc,function(){return ua(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Jn.transition,Jn.transition=null;var a=yt;yt=1;var o=ot;ot|=4,tm.current=null,XM(t,n),Z_(n,t),xM(jh),Oc=!!Bh,jh=Bh=null,t.current=n,$M(n),ES(),ot=o,yt=a,Jn.transition=s}else t.current=n;if(Al&&(Al=!1,Ar=t,eu=r),s=t.pendingLanes,s===0&&(Ir=null),CS(n.stateNode),Pn(t,It()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Jc)throw Jc=!1,t=lf,lf=null,t;return eu&1&&t.tag!==0&&ua(),s=t.pendingLanes,s&1?t===cf?Ro++:(Ro=0,cf=t):Ro=0,Hr(),null}function ua(){if(Ar!==null){var t=Fx(eu),e=Jn.transition,n=yt;try{if(Jn.transition=null,yt=16>t?16:t,Ar===null)var i=!1;else{if(t=Ar,Ar=null,eu=0,ot&6)throw Error(oe(331));var r=ot;for(ot|=4,Te=t.current;Te!==null;){var s=Te,a=s.child;if(Te.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(Te=c;Te!==null;){var d=Te;switch(d.tag){case 0:case 11:case 15:Ao(8,d,s)}var p=d.child;if(p!==null)p.return=d,Te=p;else for(;Te!==null;){d=Te;var f=d.sibling,m=d.return;if(q_(d),d===c){Te=null;break}if(f!==null){f.return=m,Te=f;break}Te=m}}}var y=s.alternate;if(y!==null){var x=y.child;if(x!==null){y.child=null;do{var g=x.sibling;x.sibling=null,x=g}while(x!==null)}}Te=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Te=a;else e:for(;Te!==null;){if(s=Te,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ao(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,Te=h;break e}Te=s.return}}var v=t.current;for(Te=v;Te!==null;){a=Te;var S=a.child;if(a.subtreeFlags&2064&&S!==null)S.return=a,Te=S;else e:for(a=v;Te!==null;){if(o=Te,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:Du(9,o)}}catch(M){Lt(o,o.return,M)}if(o===a){Te=null;break e}var _=o.sibling;if(_!==null){_.return=o.return,Te=_;break e}Te=o.return}}if(ot=r,Hr(),bi&&typeof bi.onPostCommitFiberRoot=="function")try{bi.onPostCommitFiberRoot(Cu,t)}catch{}i=!0}return i}finally{yt=n,Jn.transition=e}}return!1}function Qg(t,e,n){e=Sa(n,e),e=F_(t,e,1),t=Lr(t,e,1),e=xn(),t!==null&&(rl(t,1,e),Pn(t,e))}function Lt(t,e,n){if(t.tag===3)Qg(t,t,n);else for(;e!==null;){if(e.tag===3){Qg(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ir===null||!Ir.has(i))){t=Sa(n,t),t=O_(e,t,1),e=Lr(e,t,1),t=xn(),e!==null&&(rl(e,1,t),Pn(e,t));break}}e=e.return}}function JM(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=xn(),t.pingedLanes|=t.suspendedLanes&n,qt===t&&(en&n)===n&&(Vt===4||Vt===3&&(en&130023424)===en&&500>It()-im?cs(t,0):nm|=n),Pn(t,e)}function ry(t,e){e===0&&(t.mode&1?(e=vl,vl<<=1,!(vl&130023424)&&(vl=4194304)):e=1);var n=xn();t=rr(t,e),t!==null&&(rl(t,e,n),Pn(t,n))}function eE(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),ry(t,n)}function tE(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(oe(314))}i!==null&&i.delete(e),ry(t,n)}var sy;sy=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||bn.current)An=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return An=!1,VM(t,e,n);An=!!(t.flags&131072)}else An=!1,bt&&e.flags&1048576&&c_(e,Wc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;yc(t,e),t=e.pendingProps;var r=va(e,dn.current);ca(e,n),r=Kp(null,e,i,t,r,n);var s=Zp();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Rn(i)?(s=!0,Hc(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Wp(e),r.updater=Iu,e.stateNode=r,r._reactInternals=e,Kh(e,i,t,n),e=Jh(null,e,i,!0,s,n)):(e.tag=0,bt&&s&&Op(e),gn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(yc(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=iE(i),t=ui(i,t),r){case 0:e=Qh(null,e,i,t,n);break e;case 1:e=Vg(null,e,i,t,n);break e;case 11:e=Bg(null,e,i,t,n);break e;case 14:e=jg(null,e,i,ui(i.type,t),n);break e}throw Error(oe(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ui(i,r),Qh(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ui(i,r),Vg(t,e,i,r,n);case 3:e:{if(V_(e),t===null)throw Error(oe(387));i=e.pendingProps,s=e.memoizedState,r=s.element,m_(t,e),qc(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Sa(Error(oe(423)),e),e=Hg(t,e,i,n,r);break e}else if(i!==r){r=Sa(Error(oe(424)),e),e=Hg(t,e,i,n,r);break e}else for(Fn=Nr(e.stateNode.containerInfo.firstChild),zn=e,bt=!0,hi=null,n=f_(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(xa(),i===r){e=sr(t,e,n);break e}gn(t,e,i,n)}e=e.child}return e;case 5:return g_(e),t===null&&$h(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,Vh(i,r)?a=null:s!==null&&Vh(i,s)&&(e.flags|=32),j_(t,e),gn(t,e,a,n),e.child;case 6:return t===null&&$h(e),null;case 13:return H_(t,e,n);case 4:return Xp(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=_a(e,null,i,n):gn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ui(i,r),Bg(t,e,i,r,n);case 7:return gn(t,e,e.pendingProps,n),e.child;case 8:return gn(t,e,e.pendingProps.children,n),e.child;case 12:return gn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,Et(Xc,i._currentValue),i._currentValue=a,s!==null)if(xi(s.value,a)){if(s.children===r.children&&!bn.current){e=sr(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Qi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),qh(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(oe(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),qh(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}gn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,ca(e,n),r=ni(r),i=i(r),e.flags|=1,gn(t,e,i,n),e.child;case 14:return i=e.type,r=ui(i,e.pendingProps),r=ui(i.type,r),jg(t,e,i,r,n);case 15:return z_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ui(i,r),yc(t,e),e.tag=1,Rn(i)?(t=!0,Hc(e)):t=!1,ca(e,n),k_(e,i,r),Kh(e,i,r,n),Jh(null,e,i,!0,t,n);case 19:return G_(t,e,n);case 22:return B_(t,e,n)}throw Error(oe(156,e.tag))};function ay(t,e){return Ix(t,e)}function nE(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Zn(t,e,n,i){return new nE(t,e,n,i)}function om(t){return t=t.prototype,!(!t||!t.isReactComponent)}function iE(t){if(typeof t=="function")return om(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Cp)return 11;if(t===Ap)return 14}return 2}function Ur(t,e){var n=t.alternate;return n===null?(n=Zn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ec(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")om(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case $s:return us(n.children,r,s,e);case Tp:a=8,r|=8;break;case yh:return t=Zn(12,n,e,r|2),t.elementType=yh,t.lanes=s,t;case Sh:return t=Zn(13,n,e,r),t.elementType=Sh,t.lanes=s,t;case Mh:return t=Zn(19,n,e,r),t.elementType=Mh,t.lanes=s,t;case gx:return ku(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case px:a=10;break e;case mx:a=9;break e;case Cp:a=11;break e;case Ap:a=14;break e;case Sr:a=16,i=null;break e}throw Error(oe(130,t==null?t:typeof t,""))}return e=Zn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function us(t,e,n,i){return t=Zn(7,t,i,e),t.lanes=n,t}function ku(t,e,n,i){return t=Zn(22,t,i,e),t.elementType=gx,t.lanes=n,t.stateNode={isHidden:!1},t}function Cd(t,e,n){return t=Zn(6,t,null,e),t.lanes=n,t}function Ad(t,e,n){return e=Zn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function rE(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=od(0),this.expirationTimes=od(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=od(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function lm(t,e,n,i,r,s,a,o,l){return t=new rE(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Zn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Wp(s),t}function sE(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Xs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function oy(t){if(!t)return Or;t=t._reactInternals;e:{if(ys(t)!==t||t.tag!==1)throw Error(oe(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Rn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(oe(171))}if(t.tag===1){var n=t.type;if(Rn(n))return o_(t,n,e)}return e}function ly(t,e,n,i,r,s,a,o,l){return t=lm(n,i,!0,t,r,s,a,o,l),t.context=oy(null),n=t.current,i=xn(),r=Dr(n),s=Qi(i,r),s.callback=e??null,Lr(n,s,r),t.current.lanes=r,rl(t,r,i),Pn(t,i),t}function Fu(t,e,n,i){var r=e.current,s=xn(),a=Dr(r);return n=oy(n),e.context===null?e.context=n:e.pendingContext=n,e=Qi(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Lr(r,e,a),t!==null&&(vi(t,r,a,s),vc(t,r,a)),a}function nu(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Jg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function cm(t,e){Jg(t,e),(t=t.alternate)&&Jg(t,e)}function aE(){return null}var cy=typeof reportError=="function"?reportError:function(t){console.error(t)};function um(t){this._internalRoot=t}Ou.prototype.render=um.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(oe(409));Fu(t,e,null,null)};Ou.prototype.unmount=um.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ms(function(){Fu(null,t,null,null)}),e[ir]=null}};function Ou(t){this._internalRoot=t}Ou.prototype.unstable_scheduleHydration=function(t){if(t){var e=Bx();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Er.length&&e!==0&&e<Er[n].priority;n++);Er.splice(n,0,t),n===0&&Vx(t)}};function dm(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function zu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function e0(){}function oE(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=nu(a);s.call(c)}}var a=ly(e,i,t,0,null,!1,!1,"",e0);return t._reactRootContainer=a,t[ir]=a.current,jo(t.nodeType===8?t.parentNode:t),ms(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=nu(l);o.call(c)}}var l=lm(t,0,!1,null,null,!1,!1,"",e0);return t._reactRootContainer=l,t[ir]=l.current,jo(t.nodeType===8?t.parentNode:t),ms(function(){Fu(e,l,n,i)}),l}function Bu(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=nu(a);o.call(l)}}Fu(e,a,t,r)}else a=oE(n,e,t,r,i);return nu(a)}Ox=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=mo(e.pendingLanes);n!==0&&(Pp(e,n|1),Pn(e,It()),!(ot&6)&&(Ma=It()+500,Hr()))}break;case 13:ms(function(){var i=rr(t,1);if(i!==null){var r=xn();vi(i,t,1,r)}}),cm(t,1)}};Np=function(t){if(t.tag===13){var e=rr(t,134217728);if(e!==null){var n=xn();vi(e,t,134217728,n)}cm(t,134217728)}};zx=function(t){if(t.tag===13){var e=Dr(t),n=rr(t,e);if(n!==null){var i=xn();vi(n,t,e,i)}cm(t,e)}};Bx=function(){return yt};jx=function(t,e){var n=yt;try{return yt=t,e()}finally{yt=n}};Lh=function(t,e,n){switch(e){case"input":if(Th(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Pu(i);if(!r)throw Error(oe(90));xx(i),Th(i,r)}}}break;case"textarea":yx(t,n);break;case"select":e=n.value,e!=null&&sa(t,!!n.multiple,e,!1)}};Ax=rm;bx=ms;var lE={usingClientEntryPoint:!1,Events:[al,Zs,Pu,Tx,Cx,rm]},Qa={findFiberByHostInstance:rs,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},cE={bundleType:Qa.bundleType,version:Qa.version,rendererPackageName:Qa.rendererPackageName,rendererConfig:Qa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:lr.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Nx(t),t===null?null:t.stateNode},findFiberByHostInstance:Qa.findFiberByHostInstance||aE,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var bl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!bl.isDisabled&&bl.supportsFiber)try{Cu=bl.inject(cE),bi=bl}catch{}}Hn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=lE;Hn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!dm(e))throw Error(oe(200));return sE(t,e,null,n)};Hn.createRoot=function(t,e){if(!dm(t))throw Error(oe(299));var n=!1,i="",r=cy;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=lm(t,1,!1,null,null,n,!1,i,r),t[ir]=e.current,jo(t.nodeType===8?t.parentNode:t),new um(e)};Hn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(oe(188)):(t=Object.keys(t).join(","),Error(oe(268,t)));return t=Nx(e),t=t===null?null:t.stateNode,t};Hn.flushSync=function(t){return ms(t)};Hn.hydrate=function(t,e,n){if(!zu(e))throw Error(oe(200));return Bu(null,t,e,!0,n)};Hn.hydrateRoot=function(t,e,n){if(!dm(t))throw Error(oe(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=cy;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=ly(e,null,t,1,n??null,r,!1,s,a),t[ir]=e.current,jo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Ou(e)};Hn.render=function(t,e,n){if(!zu(e))throw Error(oe(200));return Bu(null,t,e,!1,n)};Hn.unmountComponentAtNode=function(t){if(!zu(t))throw Error(oe(40));return t._reactRootContainer?(ms(function(){Bu(null,null,t,!1,function(){t._reactRootContainer=null,t[ir]=null})}),!0):!1};Hn.unstable_batchedUpdates=rm;Hn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!zu(n))throw Error(oe(200));if(t==null||t._reactInternals===void 0)throw Error(oe(38));return Bu(t,e,n,!1,i)};Hn.version="18.3.1-next-f1338f8080-20240426";function uy(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(uy)}catch(t){console.error(t)}}uy(),ux.exports=Hn;var hm=ux.exports,dy,t0=hm;dy=t0.createRoot,t0.hydrateRoot;var hy={exports:{}},fy={};/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ll=X;function uE(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var dE=typeof Object.is=="function"?Object.is:uE,hE=ll.useSyncExternalStore,fE=ll.useRef,pE=ll.useEffect,mE=ll.useMemo,gE=ll.useDebugValue;fy.useSyncExternalStoreWithSelector=function(t,e,n,i,r){var s=fE(null);if(s.current===null){var a={hasValue:!1,value:null};s.current=a}else a=s.current;s=mE(function(){function l(m){if(!c){if(c=!0,d=m,m=i(m),r!==void 0&&a.hasValue){var y=a.value;if(r(y,m))return p=y}return p=m}if(y=p,dE(d,m))return y;var x=i(m);return r!==void 0&&r(y,x)?(d=m,y):(d=m,p=x)}var c=!1,d,p,f=n===void 0?null:n;return[function(){return l(e())},f===null?void 0:function(){return l(f())}]},[e,n,i,r]);var o=hE(t,s[0],s[1]);return pE(function(){a.hasValue=!0,a.value=o},[o]),gE(o),o};hy.exports=fy;var vE=hy.exports;function xE(t){t()}function _E(){let t=null,e=null;return{clear(){t=null,e=null},notify(){xE(()=>{let n=t;for(;n;)n.callback(),n=n.next})},get(){const n=[];let i=t;for(;i;)n.push(i),i=i.next;return n},subscribe(n){let i=!0;const r=e={callback:n,next:null,prev:e};return r.prev?r.prev.next=r:t=r,function(){!i||t===null||(i=!1,r.next?r.next.prev=r.prev:e=r.prev,r.prev?r.prev.next=r.next:t=r.next)}}}}var n0={notify(){},get:()=>[]};function yE(t,e){let n,i=n0,r=0,s=!1;function a(x){d();const g=i.subscribe(x);let h=!1;return()=>{h||(h=!0,g(),p())}}function o(){i.notify()}function l(){y.onStateChange&&y.onStateChange()}function c(){return s}function d(){r++,n||(n=t.subscribe(l),i=_E())}function p(){r--,n&&r===0&&(n(),n=void 0,i.clear(),i=n0)}function f(){s||(s=!0,d())}function m(){s&&(s=!1,p())}const y={addNestedSub:a,notifyNestedSubs:o,handleChangeWrapper:l,isSubscribed:c,trySubscribe:f,tryUnsubscribe:m,getListeners:()=>i};return y}var SE=()=>typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",ME=SE(),EE=()=>typeof navigator<"u"&&navigator.product==="ReactNative",wE=EE(),TE=()=>ME||wE?X.useLayoutEffect:X.useEffect,CE=TE(),bd=Symbol.for("react-redux-context"),Rd=typeof globalThis<"u"?globalThis:{};function AE(){if(!X.createContext)return{};const t=Rd[bd]??(Rd[bd]=new Map);let e=t.get(X.createContext);return e||(e=X.createContext(null),t.set(X.createContext,e)),e}var zr=AE();function bE(t){const{children:e,context:n,serverState:i,store:r}=t,s=X.useMemo(()=>{const l=yE(r);return{store:r,subscription:l,getServerState:i?()=>i:void 0}},[r,i]),a=X.useMemo(()=>r.getState(),[r]);CE(()=>{const{subscription:l}=s;return l.onStateChange=l.notifyNestedSubs,l.trySubscribe(),a!==r.getState()&&l.notifyNestedSubs(),()=>{l.tryUnsubscribe(),l.onStateChange=void 0}},[s,a]);const o=n||zr;return X.createElement(o.Provider,{value:s},e)}var RE=bE;function fm(t=zr){return function(){return X.useContext(t)}}var py=fm();function my(t=zr){const e=t===zr?py:fm(t),n=()=>{const{store:i}=e();return i};return Object.assign(n,{withTypes:()=>n}),n}var PE=my();function NE(t=zr){const e=t===zr?PE:my(t),n=()=>e().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var Kt=NE(),LE=(t,e)=>t===e;function IE(t=zr){const e=t===zr?py:fm(t),n=(i,r={})=>{const{equalityFn:s=LE}=typeof r=="function"?{equalityFn:r}:r,a=e(),{store:o,subscription:l,getServerState:c}=a;X.useRef(!0);const d=X.useCallback({[i.name](f){return i(f)}}[i.name],[i]),p=vE.useSyncExternalStoreWithSelector(l.addNestedSub,o.getState,c||o.getState,d,s);return X.useDebugValue(p),p};return Object.assign(n,{withTypes:()=>n}),n}var Yt=IE();function Zt(t){return`Minified Redux error #${t}; visit https://redux.js.org/Errors?code=${t} for the full message or use the non-minified dev environment for full errors. `}var DE=typeof Symbol=="function"&&Symbol.observable||"@@observable",i0=DE,Pd=()=>Math.random().toString(36).substring(7).split("").join("."),UE={INIT:`@@redux/INIT${Pd()}`,REPLACE:`@@redux/REPLACE${Pd()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${Pd()}`},iu=UE;function pm(t){if(typeof t!="object"||t===null)return!1;let e=t;for(;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e||Object.getPrototypeOf(t)===null}function gy(t,e,n){if(typeof t!="function")throw new Error(Zt(2));if(typeof e=="function"&&typeof n=="function"||typeof n=="function"&&typeof arguments[3]=="function")throw new Error(Zt(0));if(typeof e=="function"&&typeof n>"u"&&(n=e,e=void 0),typeof n<"u"){if(typeof n!="function")throw new Error(Zt(1));return n(gy)(t,e)}let i=t,r=e,s=new Map,a=s,o=0,l=!1;function c(){a===s&&(a=new Map,s.forEach((g,h)=>{a.set(h,g)}))}function d(){if(l)throw new Error(Zt(3));return r}function p(g){if(typeof g!="function")throw new Error(Zt(4));if(l)throw new Error(Zt(5));let h=!0;c();const v=o++;return a.set(v,g),function(){if(h){if(l)throw new Error(Zt(6));h=!1,c(),a.delete(v),s=null}}}function f(g){if(!pm(g))throw new Error(Zt(7));if(typeof g.type>"u")throw new Error(Zt(8));if(typeof g.type!="string")throw new Error(Zt(17));if(l)throw new Error(Zt(9));try{l=!0,r=i(r,g)}finally{l=!1}return(s=a).forEach(v=>{v()}),g}function m(g){if(typeof g!="function")throw new Error(Zt(10));i=g,f({type:iu.REPLACE})}function y(){const g=p;return{subscribe(h){if(typeof h!="object"||h===null)throw new Error(Zt(11));function v(){const _=h;_.next&&_.next(d())}return v(),{unsubscribe:g(v)}},[i0](){return this}}}return f({type:iu.INIT}),{dispatch:f,subscribe:p,getState:d,replaceReducer:m,[i0]:y}}function kE(t){Object.keys(t).forEach(e=>{const n=t[e];if(typeof n(void 0,{type:iu.INIT})>"u")throw new Error(Zt(12));if(typeof n(void 0,{type:iu.PROBE_UNKNOWN_ACTION()})>"u")throw new Error(Zt(13))})}function FE(t){const e=Object.keys(t),n={};for(let s=0;s<e.length;s++){const a=e[s];typeof t[a]=="function"&&(n[a]=t[a])}const i=Object.keys(n);let r;try{kE(n)}catch(s){r=s}return function(a={},o){if(r)throw r;let l=!1;const c={};for(let d=0;d<i.length;d++){const p=i[d],f=n[p],m=a[p],y=f(m,o);if(typeof y>"u")throw o&&o.type,new Error(Zt(14));c[p]=y,l=l||y!==m}return l=l||i.length!==Object.keys(a).length,l?c:a}}function ru(...t){return t.length===0?e=>e:t.length===1?t[0]:t.reduce((e,n)=>(...i)=>e(n(...i)))}function OE(...t){return e=>(n,i)=>{const r=e(n,i);let s=()=>{throw new Error(Zt(15))};const a={getState:r.getState,dispatch:(l,...c)=>s(l,...c)},o=t.map(l=>l(a));return s=ru(...o)(r.dispatch),{...r,dispatch:s}}}function zE(t){return pm(t)&&"type"in t&&typeof t.type=="string"}var vy=Symbol.for("immer-nothing"),r0=Symbol.for("immer-draftable"),hn=Symbol.for("immer-state");function fi(t,...e){throw new Error(`[Immer] minified error nr: ${t}. Full error at: https://bit.ly/3cXEKWf`)}var On=Object,Ea=On.getPrototypeOf,su="constructor",ju="prototype",hf="configurable",au="enumerable",wc="writable",Ko="value",ar=t=>!!t&&!!t[hn];function ri(t){var e;return t?xy(t)||Hu(t)||!!t[r0]||!!((e=t[su])!=null&&e[r0])||Gu(t)||Wu(t):!1}var BE=On[ju][su].toString(),s0=new WeakMap;function xy(t){if(!t||!mm(t))return!1;const e=Ea(t);if(e===null||e===On[ju])return!0;const n=On.hasOwnProperty.call(e,su)&&e[su];if(n===Object)return!0;if(!Ws(n))return!1;let i=s0.get(n);return i===void 0&&(i=Function.toString.call(n),s0.set(n,i)),i===BE}function Vu(t,e,n=!0){cl(t)===0?(n?Reflect.ownKeys(t):On.keys(t)).forEach(r=>{e(r,t[r],t)}):t.forEach((i,r)=>e(r,i,t))}function cl(t){const e=t[hn];return e?e.type_:Hu(t)?1:Gu(t)?2:Wu(t)?3:0}var Nd=(t,e,n=cl(t))=>n===2?t.has(e):On[ju].hasOwnProperty.call(t,e),ff=(t,e,n=cl(t))=>n===2?t.get(e):t[e],ou=(t,e,n,i=cl(t))=>{i===2?t.set(e,n):i===3?t.add(n):t[e]=n};function jE(t,e){return t===e?t!==0||1/t===1/e:t!==t&&e!==e}var Hu=Array.isArray,Gu=t=>t instanceof Map,Wu=t=>t instanceof Set,mm=t=>typeof t=="object",Ws=t=>typeof t=="function",Ld=t=>typeof t=="boolean";function VE(t){const e=+t;return Number.isInteger(e)&&String(e)===t}var $i=t=>t.copy_||t.base_,gm=t=>t.modified_?t.copy_:t.base_;function pf(t,e){if(Gu(t))return new Map(t);if(Wu(t))return new Set(t);if(Hu(t))return Array[ju].slice.call(t);const n=xy(t);if(e===!0||e==="class_only"&&!n){const i=On.getOwnPropertyDescriptors(t);delete i[hn];let r=Reflect.ownKeys(i);for(let s=0;s<r.length;s++){const a=r[s],o=i[a];o[wc]===!1&&(o[wc]=!0,o[hf]=!0),(o.get||o.set)&&(i[a]={[hf]:!0,[wc]:!0,[au]:o[au],[Ko]:t[a]})}return On.create(Ea(t),i)}else{const i=Ea(t);if(i!==null&&n)return{...t};const r=On.create(i);return On.assign(r,t)}}function vm(t,e=!1){return Xu(t)||ar(t)||!ri(t)||(cl(t)>1&&On.defineProperties(t,{set:Rl,add:Rl,clear:Rl,delete:Rl}),On.freeze(t),e&&Vu(t,(n,i)=>{vm(i,!0)},!1)),t}function HE(){fi(2)}var Rl={[Ko]:HE};function Xu(t){return t===null||!mm(t)?!0:On.isFrozen(t)}var lu="MapSet",mf="Patches",a0="ArrayMethods",_y={};function gs(t){const e=_y[t];return e||fi(0,t),e}var o0=t=>!!_y[t],Zo,yy=()=>Zo,GE=(t,e)=>({drafts_:[],parent_:t,immer_:e,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:o0(lu)?gs(lu):void 0,arrayMethodsPlugin_:o0(a0)?gs(a0):void 0});function l0(t,e){e&&(t.patchPlugin_=gs(mf),t.patches_=[],t.inversePatches_=[],t.patchListener_=e)}function gf(t){vf(t),t.drafts_.forEach(WE),t.drafts_=null}function vf(t){t===Zo&&(Zo=t.parent_)}var c0=t=>Zo=GE(Zo,t);function WE(t){const e=t[hn];e.type_===0||e.type_===1?e.revoke_():e.revoked_=!0}function u0(t,e){e.unfinalizedDrafts_=e.drafts_.length;const n=e.drafts_[0];if(t!==void 0&&t!==n){n[hn].modified_&&(gf(e),fi(4)),ri(t)&&(t=d0(e,t));const{patchPlugin_:r}=e;r&&r.generateReplacementPatches_(n[hn].base_,t,e)}else t=d0(e,n);return XE(e,t,!0),gf(e),e.patches_&&e.patchListener_(e.patches_,e.inversePatches_),t!==vy?t:void 0}function d0(t,e){if(Xu(e))return e;const n=e[hn];if(!n)return cu(e,t.handledSet_,t);if(!$u(n,t))return e;if(!n.modified_)return n.base_;if(!n.finalized_){const{callbacks_:i}=n;if(i)for(;i.length>0;)i.pop()(t);Ey(n,t)}return n.copy_}function XE(t,e,n=!1){!t.parent_&&t.immer_.autoFreeze_&&t.canAutoFreeze_&&vm(e,n)}function Sy(t){t.finalized_=!0,t.scope_.unfinalizedDrafts_--}var $u=(t,e)=>t.scope_===e,$E=[];function My(t,e,n,i){const r=$i(t),s=t.type_;if(i!==void 0&&ff(r,i,s)===e){ou(r,i,n,s);return}if(!t.draftLocations_){const o=t.draftLocations_=new Map;Vu(r,(l,c)=>{if(ar(c)){const d=o.get(c)||[];d.push(l),o.set(c,d)}})}const a=t.draftLocations_.get(e)??$E;for(const o of a)ou(r,o,n,s)}function qE(t,e,n){t.callbacks_.push(function(r){var o;const s=e;if(!s||!$u(s,r))return;(o=r.mapSetPlugin_)==null||o.fixSetContents(s);const a=gm(s);My(t,s.draft_??s,a,n),Ey(s,r)})}function Ey(t,e){var i;if(t.modified_&&!t.finalized_&&(t.type_===3||t.type_===1&&t.allIndicesReassigned_||(((i=t.assigned_)==null?void 0:i.size)??0)>0)){const{patchPlugin_:r}=e;if(r){const s=r.getPath(t);s&&r.generatePatches_(t,s,e)}Sy(t)}}function YE(t,e,n){const{scope_:i}=t;if(ar(n)){const r=n[hn];$u(r,i)&&r.callbacks_.push(function(){Tc(t);const a=gm(r);My(t,n,a,e)})}else ri(n)&&t.callbacks_.push(function(){const s=$i(t);t.type_===3?s.has(n)&&cu(n,i.handledSet_,i):ff(s,e,t.type_)===n&&i.drafts_.length>1&&(t.assigned_.get(e)??!1)===!0&&t.copy_&&cu(ff(t.copy_,e,t.type_),i.handledSet_,i)})}function cu(t,e,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||ar(t)||e.has(t)||!ri(t)||Xu(t)||(e.add(t),Vu(t,(i,r)=>{if(ar(r)){const s=r[hn];if($u(s,n)){const a=gm(s);ou(t,i,a,t.type_),Sy(s)}}else ri(r)&&cu(r,e,n)})),t}function KE(t,e){const n=Hu(t),i={type_:n?1:0,scope_:e?e.scope_:yy(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:e,base_:t,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0};let r=i,s=uu;n&&(r=[i],s=Qo);const{revoke:a,proxy:o}=Proxy.revocable(r,s);return i.draft_=o,i.revoke_=a,[o,i]}var uu={get(t,e){if(e===hn)return t;let n=t.scope_.arrayMethodsPlugin_;const i=t.type_===1&&typeof e=="string";if(i&&n!=null&&n.isArrayOperationMethod(e))return n.createMethodInterceptor(t,e);const r=$i(t);if(!Nd(r,e,t.type_))return QE(t,r,e);const s=r[e];if(t.finalized_||!ri(s)||i&&t.operationMethod&&(n!=null&&n.isMutatingArrayMethod(t.operationMethod))&&VE(e))return s;if(s===Id(t.base_,e)||ZE(t,e,s)){Tc(t);const a=t.type_===1?+e:e,o=_f(t.scope_,s,t,a);return t.copy_[a]=o}return s},has(t,e){return e in $i(t)},ownKeys(t){return Reflect.ownKeys($i(t))},set(t,e,n){const i=wy($i(t),e);if(i!=null&&i.set)return i.set.call(t.draft_,n),!0;if(!t.modified_){const r=Id($i(t),e),s=r==null?void 0:r[hn];if(s&&s.base_===n)return t.copy_[e]=n,t.assigned_.delete(e),!0;if(jE(n,r)&&(n!==void 0||Nd(t.base_,e,t.type_)))return!0;Tc(t),xf(t)}return t.copy_[e]===n&&(n!==void 0||Nd(t.copy_,e,t.type_))||Number.isNaN(n)&&Number.isNaN(t.copy_[e])||(t.copy_[e]=n,t.assigned_.set(e,!0),YE(t,e,n)),!0},deleteProperty(t,e){return Tc(t),Id(t.base_,e)!==void 0||e in t.base_?(t.assigned_.set(e,!1),xf(t)):t.assigned_.delete(e),t.copy_&&delete t.copy_[e],!0},getOwnPropertyDescriptor(t,e){const n=$i(t),i=Reflect.getOwnPropertyDescriptor(n,e);return i&&{[wc]:!0,[hf]:t.type_!==1||e!=="length",[au]:i[au],[Ko]:n[e]}},defineProperty(){fi(11)},getPrototypeOf(t){return Ea(t.base_)},setPrototypeOf(){fi(12)}},Qo={};for(let t in uu){let e=uu[t];Qo[t]=function(){const n=arguments;return n[0]=n[0][0],e.apply(this,n)}}Qo.deleteProperty=function(t,e){return Qo.set.call(this,t,e,void 0)};Qo.set=function(t,e,n){return uu.set.call(this,t[0],e,n,t[0])};function Id(t,e){const n=t[hn];return(n?$i(n):t)[e]}function ZE(t,e,n){var i;return t.type_!==1||!t.allIndicesReassigned_||(i=t.assigned_)!=null&&i.get(e)||!ri(n)||n[hn]?!1:t.baseRefs_.has(n)}function QE(t,e,n){var r;const i=wy(e,n);return i?Ko in i?i[Ko]:(r=i.get)==null?void 0:r.call(t.draft_):void 0}function wy(t,e){if(!(e in t))return;let n=Ea(t);for(;n;){const i=Object.getOwnPropertyDescriptor(n,e);if(i)return i;n=Ea(n)}}function xf(t){t.modified_||(t.modified_=!0,t.parent_&&xf(t.parent_))}function Tc(t){t.copy_||(t.assigned_=new Map,t.copy_=pf(t.base_,t.scope_.immer_.useStrictShallowCopy_))}var JE=class{constructor(t){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,n,i)=>{if(Ws(e)&&!Ws(n)){const s=n;n=e;const a=this;return function(l=s,...c){return a.produce(l,d=>n.call(this,d,...c))}}Ws(n)||fi(6),i!==void 0&&!Ws(i)&&fi(7);let r;if(ri(e)){const s=c0(this),a=_f(s,e,void 0);let o=!0;try{r=n(a),o=!1}finally{o?gf(s):vf(s)}return l0(s,i),u0(r,s)}else if(!e||!mm(e)){if(r=n(e),r===void 0&&(r=e),r===vy&&(r=void 0),this.autoFreeze_&&vm(r,!0),i){const s=[],a=[];gs(mf).generateReplacementPatches_(e,r,{patches_:s,inversePatches_:a}),i(s,a)}return r}else fi(1,e)},this.produceWithPatches=(e,n)=>{if(Ws(e))return(a,...o)=>this.produceWithPatches(a,l=>e(l,...o));let i,r;return[this.produce(e,n,(a,o)=>{i=a,r=o}),i,r]},Ld(t==null?void 0:t.autoFreeze)&&this.setAutoFreeze(t.autoFreeze),Ld(t==null?void 0:t.useStrictShallowCopy)&&this.setUseStrictShallowCopy(t.useStrictShallowCopy),Ld(t==null?void 0:t.useStrictIteration)&&this.setUseStrictIteration(t.useStrictIteration)}createDraft(t){ri(t)||fi(8),ar(t)&&(t=ew(t));const e=c0(this),n=_f(e,t,void 0);return n[hn].isManual_=!0,vf(e),n}finishDraft(t,e){const n=t&&t[hn];(!n||!n.isManual_)&&fi(9);const{scope_:i}=n;return l0(i,e),u0(void 0,i)}setAutoFreeze(t){this.autoFreeze_=t}setUseStrictShallowCopy(t){this.useStrictShallowCopy_=t}setUseStrictIteration(t){this.useStrictIteration_=t}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(t,e){let n;for(n=e.length-1;n>=0;n--){const r=e[n];if(r.path.length===0&&r.op==="replace"){t=r.value;break}}n>-1&&(e=e.slice(n+1));const i=gs(mf).applyPatches_;return ar(t)?i(t,e):this.produce(t,r=>i(r,e))}};function _f(t,e,n,i){const[r,s]=Gu(e)?gs(lu).proxyMap_(e,n):Wu(e)?gs(lu).proxySet_(e,n):KE(e,n);return((n==null?void 0:n.scope_)??yy()).drafts_.push(r),s.callbacks_=(n==null?void 0:n.callbacks_)??[],s.key_=i,n&&i!==void 0?qE(n,s,i):s.callbacks_.push(function(l){var d;(d=l.mapSetPlugin_)==null||d.fixSetContents(s);const{patchPlugin_:c}=l;s.modified_&&c&&c.generatePatches_(s,[],l)}),r}function ew(t){return ar(t)||fi(10,t),Ty(t)}function Ty(t){if(!ri(t)||Xu(t))return t;const e=t[hn];let n,i=!0;if(e){if(!e.modified_)return e.base_;e.finalized_=!0,n=pf(t,e.scope_.immer_.useStrictShallowCopy_),i=e.scope_.immer_.shouldUseStrictIteration()}else n=pf(t,!0);return Vu(n,(r,s)=>{ou(n,r,Ty(s))},i),e&&(e.finalized_=!1),n}var Dd=globalThis.Iterator;Dd==null||Dd.from;var tw=new JE,Cy=tw.produce;function Ay(t){return({dispatch:n,getState:i})=>r=>s=>typeof s=="function"?s(n,i,t):r(s)}var nw=Ay(),iw=Ay;const rw=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?ru:ru.apply(null,arguments)};function h0(t,e){function n(...i){if(e){let r=e(...i);if(!r)throw new Error(Pi(0));return{type:t,payload:r.payload,..."meta"in r&&{meta:r.meta},..."error"in r&&{error:r.error}}}return{type:t,payload:i[0]}}return n.toString=()=>`${t}`,n.type=t,n.match=i=>zE(i)&&i.type===t,n}var by=class vo extends Array{constructor(...e){super(...e),Object.setPrototypeOf(this,vo.prototype)}static get[Symbol.species](){return vo}concat(...e){return super.concat.apply(this,e)}prepend(...e){return e.length===1&&Array.isArray(e[0])?new vo(...e[0].concat(this)):new vo(...e.concat(this))}};function f0(t){return ri(t)?Cy(t,()=>{}):t}function Pl(t,e,n){return t.has(e)?t.get(e):t.set(e,n(e)).get(e)}function sw(t){return typeof t=="boolean"}const aw=()=>function(e){const{thunk:n=!0,immutableCheck:i=!0,serializableCheck:r=!0,actionCreatorCheck:s=!0}=e??{};let a=new by;return n&&(sw(n)?a.push(nw):a.push(iw(n.extraArgument))),a},ow="RTK_autoBatch",p0=t=>e=>{setTimeout(e,t)},lw=(t,e)=>n=>{let i=!1,r,s;const a=()=>{i||(i=!0,cancelAnimationFrame(r),clearTimeout(s),n())};r=t(a),s=setTimeout(a,e)},cw=(t={type:"raf"})=>e=>(...n)=>{const i=e(...n);let r=!0,s=!1,a=!1;const o=new Set,l=t.type==="tick"?queueMicrotask:t.type==="raf"?typeof window<"u"&&window.requestAnimationFrame?lw(window.requestAnimationFrame,100):p0(10):t.type==="callback"?t.queueNotification:p0(t.timeout),c=()=>{a=!1,s&&(s=!1,o.forEach(d=>d()))};return Object.assign({},i,{subscribe(d){const p=()=>r&&d(),f=i.subscribe(p);return o.add(d),()=>{f(),o.delete(d)}},dispatch(d){var p;try{return r=!((p=d==null?void 0:d.meta)!=null&&p[ow]),s=!r,s&&(a||(a=!0,l(c))),i.dispatch(d)}finally{r=!0}}})},uw=t=>function(n){const{autoBatch:i=!0}=n??{};let r=new by(t);return i&&r.push(cw(typeof i=="object"?i:void 0)),r};function dw(t){const e=aw(),{reducer:n=void 0,middleware:i,devTools:r=!0,preloadedState:s=void 0,enhancers:a=void 0}=t||{};let o;if(typeof n=="function")o=n;else if(pm(n))o=FE(n);else throw new Error(Pi(1));let l;typeof i=="function"?l=i(e):l=e();let c=ru;r&&(c=rw({trace:!1,...typeof r=="object"&&r}));const d=OE(...l),p=uw(d);let f=typeof a=="function"?a(p):p();const m=c(...f);return gy(o,s,m)}function Ry(t){const e={},n=[];let i;const r={addCase(s,a){const o=typeof s=="string"?s:s.type;if(!o)throw new Error(Pi(28));if(o in e)throw new Error(Pi(29));return e[o]=a,r},addAsyncThunk(s,a){return a.pending&&(e[s.pending.type]=a.pending),a.rejected&&(e[s.rejected.type]=a.rejected),a.fulfilled&&(e[s.fulfilled.type]=a.fulfilled),a.settled&&n.push({matcher:s.settled,reducer:a.settled}),r},addMatcher(s,a){return n.push({matcher:s,reducer:a}),r},addDefaultCase(s){return i=s,r}};return t(r),[e,n,i]}function hw(t){return typeof t=="function"}function fw(t,e){let[n,i,r]=Ry(e),s;if(hw(t))s=()=>f0(t());else{const o=f0(t);s=()=>o}function a(o=s(),l){let c=[n[l.type],...i.filter(({matcher:d})=>d(l)).map(({reducer:d})=>d)];return c.filter(d=>!!d).length===0&&(c=[r]),c.reduce((d,p)=>{if(p)if(ar(d)){const f=p(d,l);return f===void 0?d:f}else{if(ri(d))return Cy(d,f=>p(f,l));{const f=p(d,l);if(f===void 0){if(d===null)return d;throw new Error(Pi(9))}return f}}return d},o)}return a.getInitialState=s,a}const pw=Symbol.for("rtk-slice-createasyncthunk");function mw(t,e){return`${t}/${e}`}function gw({creators:t}={}){var n;const e=(n=t==null?void 0:t.asyncThunk)==null?void 0:n[pw];return function(r){const{name:s,reducerPath:a=s}=r;if(!s)throw new Error(Pi(11));const o=(typeof r.reducers=="function"?r.reducers(_w()):r.reducers)||{},l=Object.keys(o),c={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},d={addCase(_,M){const T=typeof _=="string"?_:_.type;if(!T)throw new Error(Pi(12));if(T in c.sliceCaseReducersByType)throw new Error(Pi(13));return c.sliceCaseReducersByType[T]=M,d},addMatcher(_,M){return c.sliceMatchers.push({matcher:_,reducer:M}),d},exposeAction(_,M){return c.actionCreators[_]=M,d},exposeCaseReducer(_,M){return c.sliceCaseReducersByName[_]=M,d}};l.forEach(_=>{const M=o[_],T={reducerName:_,type:mw(s,_),createNotation:typeof r.reducers=="function"};Sw(M)?Ew(T,M,d,e):yw(T,M,d)});function p(){const[_={},M=[],T=void 0]=typeof r.extraReducers=="function"?Ry(r.extraReducers):[r.extraReducers],A={..._,...c.sliceCaseReducersByType};return fw(r.initialState,b=>{for(let w in A)b.addCase(w,A[w]);for(let w of c.sliceMatchers)b.addMatcher(w.matcher,w.reducer);for(let w of M)b.addMatcher(w.matcher,w.reducer);T&&b.addDefaultCase(T)})}const f=_=>_,m=new Map,y=new WeakMap;let x;function g(_,M){return x||(x=p()),x(_,M)}function h(){return x||(x=p()),x.getInitialState()}function v(_,M=!1){function T(b){let w=b[_];return typeof w>"u"&&M&&(w=Pl(y,T,h)),w}function A(b=f){return Pl(Pl(m,M,()=>new WeakMap),b,()=>{const w={};for(const[E,N]of Object.entries(r.selectors??{}))w[E]=vw(N,b,()=>Pl(y,b,h),M);return w})}return{reducerPath:_,getSelectors:A,get selectors(){return A(T)},selectSlice:T}}const S={name:s,reducer:g,actions:c.actionCreators,caseReducers:c.sliceCaseReducersByName,getInitialState:h,...v(a),injectInto(_,{reducerPath:M,...T}={}){const A=M??a;return _.inject({reducerPath:A,reducer:g},T),{...S,...v(A,!0)}}};return S}}function vw(t,e,n,i){function r(s,...a){let o=e(s);return typeof o>"u"&&i&&(o=n()),t(o,...a)}return r.unwrapped=t,r}const xw=gw();function _w(){function t(e,n){return{_reducerDefinitionType:"asyncThunk",payloadCreator:e,...n}}return t.withTypes=()=>t,{reducer(e){return Object.assign({[e.name](...n){return e(...n)}}[e.name],{_reducerDefinitionType:"reducer"})},preparedReducer(e,n){return{_reducerDefinitionType:"reducerWithPrepare",prepare:e,reducer:n}},asyncThunk:t}}function yw({type:t,reducerName:e,createNotation:n},i,r){let s,a;if("reducer"in i){if(n&&!Mw(i))throw new Error(Pi(17));s=i.reducer,a=i.prepare}else s=i;r.addCase(t,s).exposeCaseReducer(e,s).exposeAction(e,a?h0(t,a):h0(t))}function Sw(t){return t._reducerDefinitionType==="asyncThunk"}function Mw(t){return t._reducerDefinitionType==="reducerWithPrepare"}function Ew({type:t,reducerName:e},n,i,r){if(!r)throw new Error(Pi(18));const{payloadCreator:s,fulfilled:a,pending:o,rejected:l,settled:c,options:d}=n,p=r(t,s,d);i.exposeAction(e,p),a&&i.addCase(p.fulfilled,a),o&&i.addCase(p.pending,o),l&&i.addCase(p.rejected,l),c&&i.addMatcher(p.settled,c),i.exposeCaseReducer(e,{fulfilled:a||Nl,pending:o||Nl,rejected:l||Nl,settled:c||Nl})}function Nl(){}function Pi(t){return`Minified Redux Toolkit error #${t}; visit https://redux-toolkit.js.org/Errors?code=${t} for the full message or use the non-minified dev environment for full errors. `}const Py=xw({name:"game",initialState:{auth:null,charId:null,me:null,entities:[],panel:null,hover:null,selected:null,toast:null},reducers:{setAuth:(t,{payload:e})=>{t.auth=e},setChar:(t,{payload:e})=>{t.charId=e},setMe:(t,{payload:e})=>{t.me=e},setEntities:(t,{payload:e})=>{t.entities=e},setPanel:(t,{payload:e})=>{t.panel=t.panel===e?null:e},setHover:(t,{payload:e})=>{t.hover=e},setSelected:(t,{payload:e})=>{t.selected=e},toast:(t,{payload:e})=>{t.toast=e}}}),tt=Py.actions,ww=dw({reducer:{game:Py.reducer}});/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tw=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ny=(...t)=>t.filter((e,n,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Cw={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Aw=X.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:i,className:r="",children:s,iconNode:a,...o},l)=>X.createElement("svg",{ref:l,...Cw,width:e,height:e,stroke:t,strokeWidth:i?Number(n)*24/Number(e):n,className:Ny("lucide",r),...o},[...a.map(([c,d])=>X.createElement(c,d)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=(t,e)=>{const n=X.forwardRef(({className:i,...r},s)=>X.createElement(Aw,{ref:s,iconNode:e,className:Ny(`lucide-${Tw(t)}`,i),...r}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m0=ke("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bw=ke("ArrowRightLeft",[["path",{d:"m16 3 4 4-4 4",key:"1x1c3m"}],["path",{d:"M20 7H4",key:"zbl0bi"}],["path",{d:"m8 21-4-4 4-4",key:"h9nckh"}],["path",{d:"M4 17h16",key:"g4d7ey"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rw=ke("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pw=ke("Backpack",[["path",{d:"M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",key:"1ol0lm"}],["path",{d:"M8 10h8",key:"c7uz4u"}],["path",{d:"M8 18h8",key:"1no2b1"}],["path",{d:"M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6",key:"1fr6do"}],["path",{d:"M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2",key:"donm21"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nw=ke("Ban",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m4.9 4.9 14.2 14.2",key:"1m5liu"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lw=ke("Castle",[["path",{d:"M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z",key:"109fe4"}],["path",{d:"M18 11V4H6v7",key:"mon5oj"}],["path",{d:"M15 22v-4a3 3 0 0 0-3-3a3 3 0 0 0-3 3v4",key:"1k4jtn"}],["path",{d:"M22 11V9",key:"3zbp94"}],["path",{d:"M2 11V9",key:"1x5rnq"}],["path",{d:"M6 4V2",key:"1rsq15"}],["path",{d:"M18 4V2",key:"1jsdo1"}],["path",{d:"M10 4V2",key:"75d9ly"}],["path",{d:"M14 4V2",key:"8nj3z6"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iw=ke("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dw=ke("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uw=ke("CirclePlus",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kw=ke("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fw=ke("Coins",[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ow=ke("Compass",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const du=ke("Crosshair",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ly=ke("Dices",[["rect",{width:"12",height:"12",x:"2",y:"10",rx:"2",ry:"2",key:"6agr2n"}],["path",{d:"m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6",key:"1o487t"}],["path",{d:"M6 18h.01",key:"uhywen"}],["path",{d:"M10 14h.01",key:"ssrbsk"}],["path",{d:"M15 6h.01",key:"cblpky"}],["path",{d:"M18 9h.01",key:"2061c0"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yf=ke("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zw=ke("Feather",[["path",{d:"M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z",key:"18jl4k"}],["path",{d:"M16 8 2 22",key:"vp34q"}],["path",{d:"M17.5 15H9",key:"1oz8nu"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bw=ke("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jw=ke("Hammer",[["path",{d:"m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9",key:"eefl8a"}],["path",{d:"m18 15 4-4",key:"16gjal"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",key:"b7pghm"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vw=ke("Handshake",[["path",{d:"m11 17 2 2a1 1 0 1 0 3-3",key:"efffak"}],["path",{d:"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",key:"9pr0kb"}],["path",{d:"m21 3 1 11h-2",key:"1tisrp"}],["path",{d:"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",key:"1uvwmv"}],["path",{d:"M3 4h8",key:"1ep09j"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g0=ke("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iy=ke("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xm=ke("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hw=ke("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gw=ke("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ww=ke("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xw=ke("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $w=ke("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dy=ke("Package",[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["path",{d:"m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7",key:"yx3hmr"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v0=ke("PawPrint",[["circle",{cx:"11",cy:"4",r:"2",key:"vol9p0"}],["circle",{cx:"18",cy:"8",r:"2",key:"17gozi"}],["circle",{cx:"20",cy:"16",r:"2",key:"1v9bxh"}],["path",{d:"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",key:"1ydw1z"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cc=ke("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qw=ke("Pickaxe",[["path",{d:"M14.531 12.469 6.619 20.38a1 1 0 1 1-3-3l7.912-7.912",key:"we99rg"}],["path",{d:"M15.686 4.314A12.5 12.5 0 0 0 5.461 2.958 1 1 0 0 0 5.58 4.71a22 22 0 0 1 6.318 3.393",key:"1w6hck"}],["path",{d:"M17.7 3.7a1 1 0 0 0-1.4 0l-4.6 4.6a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4z",key:"15hgfx"}],["path",{d:"M19.686 8.314a12.501 12.501 0 0 1 1.356 10.225 1 1 0 0 1-1.751-.119 22 22 0 0 0-3.393-6.319",key:"452b4h"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qu=ke("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x0=ke("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uy=ke("ScrollText",[["path",{d:"M15 12h-5",key:"r7krc0"}],["path",{d:"M15 8h-5",key:"1khuty"}],["path",{d:"M19 17V5a2 2 0 0 0-2-2H4",key:"zz82l3"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",key:"1ph1d7"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ky=ke("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yw=ke("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _0=ke("ShieldHalf",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 22V2",key:"zs6s6o"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _m=ke("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kw=ke("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sf=ke("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zw=ke("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qw=ke("Store",[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",key:"ztvudi"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",key:"2ebpfo"}],["path",{d:"M2 7h20",key:"1fcdvo"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7",key:"6c3vgh"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mf=ke("Swords",[["polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5",key:"1hfsw2"}],["line",{x1:"13",x2:"19",y1:"19",y2:"13",key:"1vrmhu"}],["line",{x1:"16",x2:"20",y1:"16",y2:"20",key:"1bron3"}],["line",{x1:"19",x2:"21",y1:"21",y2:"19",key:"13pww6"}],["polyline",{points:"14.5 6.5 18 3 21 3 21 6 17.5 9.5",key:"hbey2j"}],["line",{x1:"5",x2:"9",y1:"14",y2:"18",key:"1hf58s"}],["line",{x1:"7",x2:"4",y1:"17",y2:"20",key:"pidxm4"}],["line",{x1:"3",x2:"5",y1:"19",y2:"21",key:"1pehsh"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jw=ke("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e2=ke("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fy=ke("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t2=ke("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n2=ke("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y0=ke("Wind",[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2",key:"148xed"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2",key:"1u4tom"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2",key:"75valh"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oy=ke("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S0=ke("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i2=ke("ZoomIn",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r2=ke("ZoomOut",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);let hu=localStorage.getItem("token");const ym=t=>{hu=t,t?localStorage.setItem("token",t):localStorage.removeItem("token")},M0=()=>!!hu;async function se(t,e,n){let i;try{i=await fetch("/api"+t,{method:n??(e?"POST":"GET"),headers:{"Content-Type":"application/json",...hu?{Authorization:"Bearer "+hu}:{}},body:e?JSON.stringify(e):void 0})}catch{throw new Error("Serveur injoignable")}const r=await i.json().catch(()=>null);if(!i.ok)throw new Error(typeof(r==null?void 0:r.error)=="string"?r.error:`Erreur ${i.status}`);return r}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sm="170",s2=0,E0=1,a2=2,zy=1,By=2,Vi=3,Br=0,_n=1,wi=2,Ji=0,da=1,fu=2,w0=3,T0=4,o2=5,ns=100,l2=101,c2=102,u2=103,d2=104,h2=200,f2=201,p2=202,m2=203,Ef=204,wf=205,g2=206,v2=207,x2=208,_2=209,y2=210,S2=211,M2=212,E2=213,w2=214,Tf=0,Cf=1,Af=2,wa=3,bf=4,Rf=5,Pf=6,Nf=7,jy=0,T2=1,C2=2,kr=0,Vy=1,Hy=2,Gy=3,Mm=4,A2=5,Wy=6,Xy=7,$y=300,Ta=301,Ca=302,Lf=303,If=304,Yu=306,pu=1e3,os=1001,Df=1002,Bn=1003,b2=1004,Ll=1005,Ti=1006,Ud=1007,ls=1008,or=1009,qy=1010,Yy=1011,Jo=1012,Em=1013,vs=1014,Ci=1015,Ni=1016,wm=1017,Tm=1018,Aa=1020,Ky=35902,Zy=1021,Qy=1022,mi=1023,Jy=1024,e1=1025,ha=1026,ba=1027,Cm=1028,Am=1029,t1=1030,bm=1031,Rm=1033,Ac=33776,bc=33777,Rc=33778,Pc=33779,Uf=35840,kf=35841,Ff=35842,Of=35843,zf=36196,Bf=37492,jf=37496,Vf=37808,Hf=37809,Gf=37810,Wf=37811,Xf=37812,$f=37813,qf=37814,Yf=37815,Kf=37816,Zf=37817,Qf=37818,Jf=37819,ep=37820,tp=37821,Nc=36492,np=36494,ip=36495,n1=36283,rp=36284,sp=36285,ap=36286,R2=3200,P2=3201,i1=0,N2=1,Tr="",vn="srgb",Ua="srgb-linear",Ku="linear",vt="srgb",Cs=7680,C0=519,L2=512,I2=513,D2=514,r1=515,U2=516,k2=517,F2=518,O2=519,op=35044,A0="300 es",Ki=2e3,mu=2001;class ka{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let b0=1234567;const fa=Math.PI/180,el=180/Math.PI;function er(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(sn[t&255]+sn[t>>8&255]+sn[t>>16&255]+sn[t>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[n&63|128]+sn[n>>8&255]+"-"+sn[n>>16&255]+sn[n>>24&255]+sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]).toLowerCase()}function jt(t,e,n){return Math.max(e,Math.min(n,t))}function Pm(t,e){return(t%e+e)%e}function z2(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function B2(t,e,n){return t!==e?(n-t)/(e-t):0}function Po(t,e,n){return(1-n)*t+n*e}function j2(t,e,n,i){return Po(t,e,1-Math.exp(-n*i))}function V2(t,e=1){return e-Math.abs(Pm(t,e*2)-e)}function H2(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function G2(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function W2(t,e){return t+Math.floor(Math.random()*(e-t+1))}function X2(t,e){return t+Math.random()*(e-t)}function $2(t){return t*(.5-Math.random())}function q2(t){t!==void 0&&(b0=t);let e=b0+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Y2(t){return t*fa}function K2(t){return t*el}function Z2(t){return(t&t-1)===0&&t!==0}function Q2(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function J2(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function eT(t,e,n,i,r){const s=Math.cos,a=Math.sin,o=s(n/2),l=a(n/2),c=s((e+i)/2),d=a((e+i)/2),p=s((e-i)/2),f=a((e-i)/2),m=s((i-e)/2),y=a((i-e)/2);switch(r){case"XYX":t.set(o*d,l*p,l*f,o*c);break;case"YZY":t.set(l*f,o*d,l*p,o*c);break;case"ZXZ":t.set(l*p,l*f,o*d,o*c);break;case"XZX":t.set(o*d,l*y,l*m,o*c);break;case"YXY":t.set(l*m,o*d,l*y,o*c);break;case"ZYZ":t.set(l*y,l*m,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function pi(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function xt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const ki={DEG2RAD:fa,RAD2DEG:el,generateUUID:er,clamp:jt,euclideanModulo:Pm,mapLinear:z2,inverseLerp:B2,lerp:Po,damp:j2,pingpong:V2,smoothstep:H2,smootherstep:G2,randInt:W2,randFloat:X2,randFloatSpread:$2,seededRandom:q2,degToRad:Y2,radToDeg:K2,isPowerOfTwo:Z2,ceilPowerOfTwo:Q2,floorPowerOfTwo:J2,setQuaternionFromProperEuler:eT,normalize:xt,denormalize:pi};class pe{constructor(e=0,n=0){pe.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(jt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,n,i,r,s,a,o,l,c){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],p=i[7],f=i[2],m=i[5],y=i[8],x=r[0],g=r[3],h=r[6],v=r[1],S=r[4],_=r[7],M=r[2],T=r[5],A=r[8];return s[0]=a*x+o*v+l*M,s[3]=a*g+o*S+l*T,s[6]=a*h+o*_+l*A,s[1]=c*x+d*v+p*M,s[4]=c*g+d*S+p*T,s[7]=c*h+d*_+p*A,s[2]=f*x+m*v+y*M,s[5]=f*g+m*S+y*T,s[8]=f*h+m*_+y*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return n*a*d-n*o*c-i*s*d+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],p=d*a-o*c,f=o*l-d*s,m=c*s-a*l,y=n*p+i*f+r*m;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/y;return e[0]=p*x,e[1]=(r*c-d*i)*x,e[2]=(o*i-r*a)*x,e[3]=f*x,e[4]=(d*n-r*l)*x,e[5]=(r*s-o*n)*x,e[6]=m*x,e[7]=(i*l-c*n)*x,e[8]=(a*n-i*s)*x,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(kd.makeScale(e,n)),this}rotate(e){return this.premultiply(kd.makeRotation(-e)),this}translate(e,n){return this.premultiply(kd.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const kd=new Ke;function s1(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function gu(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function tT(){const t=gu("canvas");return t.style.display="block",t}const R0={};function xo(t){t in R0||(R0[t]=!0,console.warn(t))}function nT(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function iT(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function rT(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const st={enabled:!0,workingColorSpace:Ua,spaces:{},convert:function(t,e,n){return this.enabled===!1||e===n||!e||!n||(this.spaces[e].transfer===vt&&(t.r=tr(t.r),t.g=tr(t.g),t.b=tr(t.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(t.applyMatrix3(this.spaces[e].toXYZ),t.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===vt&&(t.r=pa(t.r),t.g=pa(t.g),t.b=pa(t.b))),t},fromWorkingColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this.workingColorSpace)},getPrimaries:function(t){return this.spaces[t].primaries},getTransfer:function(t){return t===Tr?Ku:this.spaces[t].transfer},getLuminanceCoefficients:function(t,e=this.workingColorSpace){return t.fromArray(this.spaces[e].luminanceCoefficients)},define:function(t){Object.assign(this.spaces,t)},_getMatrix:function(t,e,n){return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(t){return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(t=this.workingColorSpace){return this.spaces[t].workingColorSpaceConfig.unpackColorSpace}};function tr(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function pa(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}const P0=[.64,.33,.3,.6,.15,.06],N0=[.2126,.7152,.0722],L0=[.3127,.329],I0=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),D0=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);st.define({[Ua]:{primaries:P0,whitePoint:L0,transfer:Ku,toXYZ:I0,fromXYZ:D0,luminanceCoefficients:N0,workingColorSpaceConfig:{unpackColorSpace:vn},outputColorSpaceConfig:{drawingBufferColorSpace:vn}},[vn]:{primaries:P0,whitePoint:L0,transfer:vt,toXYZ:I0,fromXYZ:D0,luminanceCoefficients:N0,outputColorSpaceConfig:{drawingBufferColorSpace:vn}}});let As;class sT{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{As===void 0&&(As=gu("canvas")),As.width=e.width,As.height=e.height;const i=As.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=As}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=gu("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=tr(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(tr(n[i]/255)*255):n[i]=tr(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let aT=0;class a1{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:aT++}),this.uuid=er(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Fd(r[a].image)):s.push(Fd(r[a]))}else s=Fd(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Fd(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?sT.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let oT=0;class un extends ka{constructor(e=un.DEFAULT_IMAGE,n=un.DEFAULT_MAPPING,i=os,r=os,s=Ti,a=ls,o=mi,l=or,c=un.DEFAULT_ANISOTROPY,d=Tr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:oT++}),this.uuid=er(),this.name="",this.source=new a1(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$y)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case pu:e.x=e.x-Math.floor(e.x);break;case os:e.x=e.x<0?0:1;break;case Df:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case pu:e.y=e.y-Math.floor(e.y);break;case os:e.y=e.y<0?0:1;break;case Df:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=$y;un.DEFAULT_ANISOTROPY=1;class St{constructor(e=0,n=0,i=0,r=1){St.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],d=l[4],p=l[8],f=l[1],m=l[5],y=l[9],x=l[2],g=l[6],h=l[10];if(Math.abs(d-f)<.01&&Math.abs(p-x)<.01&&Math.abs(y-g)<.01){if(Math.abs(d+f)<.1&&Math.abs(p+x)<.1&&Math.abs(y+g)<.1&&Math.abs(c+m+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const S=(c+1)/2,_=(m+1)/2,M=(h+1)/2,T=(d+f)/4,A=(p+x)/4,b=(y+g)/4;return S>_&&S>M?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=T/i,s=A/i):_>M?_<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),i=T/r,s=b/r):M<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),i=A/s,r=b/s),this.set(i,r,s,n),this}let v=Math.sqrt((g-y)*(g-y)+(p-x)*(p-x)+(f-d)*(f-d));return Math.abs(v)<.001&&(v=1),this.x=(g-y)/v,this.y=(p-x)/v,this.z=(f-d)/v,this.w=Math.acos((c+m+h-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class lT extends ka{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new St(0,0,e,n),this.scissorTest=!1,this.viewport=new St(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ti,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new un(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new a1(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ei extends lT{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class o1 extends un{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class cT extends un{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ul{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],d=i[r+2],p=i[r+3];const f=s[a+0],m=s[a+1],y=s[a+2],x=s[a+3];if(o===0){e[n+0]=l,e[n+1]=c,e[n+2]=d,e[n+3]=p;return}if(o===1){e[n+0]=f,e[n+1]=m,e[n+2]=y,e[n+3]=x;return}if(p!==x||l!==f||c!==m||d!==y){let g=1-o;const h=l*f+c*m+d*y+p*x,v=h>=0?1:-1,S=1-h*h;if(S>Number.EPSILON){const M=Math.sqrt(S),T=Math.atan2(M,h*v);g=Math.sin(g*T)/M,o=Math.sin(o*T)/M}const _=o*v;if(l=l*g+f*_,c=c*g+m*_,d=d*g+y*_,p=p*g+x*_,g===1-o){const M=1/Math.sqrt(l*l+c*c+d*d+p*p);l*=M,c*=M,d*=M,p*=M}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=p}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],d=i[r+3],p=s[a],f=s[a+1],m=s[a+2],y=s[a+3];return e[n]=o*y+d*p+l*m-c*f,e[n+1]=l*y+d*f+c*p-o*m,e[n+2]=c*y+d*m+o*f-l*p,e[n+3]=d*y-o*p-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(r/2),p=o(s/2),f=l(i/2),m=l(r/2),y=l(s/2);switch(a){case"XYZ":this._x=f*d*p+c*m*y,this._y=c*m*p-f*d*y,this._z=c*d*y+f*m*p,this._w=c*d*p-f*m*y;break;case"YXZ":this._x=f*d*p+c*m*y,this._y=c*m*p-f*d*y,this._z=c*d*y-f*m*p,this._w=c*d*p+f*m*y;break;case"ZXY":this._x=f*d*p-c*m*y,this._y=c*m*p+f*d*y,this._z=c*d*y+f*m*p,this._w=c*d*p-f*m*y;break;case"ZYX":this._x=f*d*p-c*m*y,this._y=c*m*p+f*d*y,this._z=c*d*y-f*m*p,this._w=c*d*p+f*m*y;break;case"YZX":this._x=f*d*p+c*m*y,this._y=c*m*p+f*d*y,this._z=c*d*y-f*m*p,this._w=c*d*p-f*m*y;break;case"XZY":this._x=f*d*p-c*m*y,this._y=c*m*p-f*d*y,this._z=c*d*y+f*m*p,this._w=c*d*p+f*m*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],d=n[6],p=n[10],f=i+o+p;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(d-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(i>o&&i>p){const m=2*Math.sqrt(1+i-o-p);this._w=(d-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>p){const m=2*Math.sqrt(1+o-i-p);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+p-i-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(jt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-i*c,this._z=s*d+a*c+i*l-r*o,this._w=a*d-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-n;return this._w=m*a+n*this._w,this._x=m*i+n*this._x,this._y=m*r+n*this._y,this._z=m*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),p=Math.sin((1-n)*d)/c,f=Math.sin(n*d)/c;return this._w=a*p+this._w*f,this._x=i*p+this._x*f,this._y=r*p+this._y*f,this._z=s*p+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,n=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(U0.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(U0.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),d=2*(o*n-s*r),p=2*(s*i-a*n);return this.x=n+l*c+a*p-o*d,this.y=i+l*d+o*c-s*p,this.z=r+l*p+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Od.copy(this).projectOnVector(e),this.sub(Od)}reflect(e){return this.sub(Od.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(jt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Od=new L,U0=new ul;class Ss{constructor(e=new L(1/0,1/0,1/0),n=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(oi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(oi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=oi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,oi):oi.fromBufferAttribute(s,a),oi.applyMatrix4(e.matrixWorld),this.expandByPoint(oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Il.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Il.copy(i.boundingBox)),Il.applyMatrix4(e.matrixWorld),this.union(Il)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,oi),oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ja),Dl.subVectors(this.max,Ja),bs.subVectors(e.a,Ja),Rs.subVectors(e.b,Ja),Ps.subVectors(e.c,Ja),mr.subVectors(Rs,bs),gr.subVectors(Ps,Rs),Wr.subVectors(bs,Ps);let n=[0,-mr.z,mr.y,0,-gr.z,gr.y,0,-Wr.z,Wr.y,mr.z,0,-mr.x,gr.z,0,-gr.x,Wr.z,0,-Wr.x,-mr.y,mr.x,0,-gr.y,gr.x,0,-Wr.y,Wr.x,0];return!zd(n,bs,Rs,Ps,Dl)||(n=[1,0,0,0,1,0,0,0,1],!zd(n,bs,Rs,Ps,Dl))?!1:(Ul.crossVectors(mr,gr),n=[Ul.x,Ul.y,Ul.z],zd(n,bs,Rs,Ps,Dl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Fi=[new L,new L,new L,new L,new L,new L,new L,new L],oi=new L,Il=new Ss,bs=new L,Rs=new L,Ps=new L,mr=new L,gr=new L,Wr=new L,Ja=new L,Dl=new L,Ul=new L,Xr=new L;function zd(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Xr.fromArray(t,s);const o=r.x*Math.abs(Xr.x)+r.y*Math.abs(Xr.y)+r.z*Math.abs(Xr.z),l=e.dot(Xr),c=n.dot(Xr),d=i.dot(Xr);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const uT=new Ss,eo=new L,Bd=new L;class Fa{constructor(e=new L,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):uT.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;eo.subVectors(e,this.center);const n=eo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(eo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(eo.copy(e.center).add(Bd)),this.expandByPoint(eo.copy(e.center).sub(Bd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Oi=new L,jd=new L,kl=new L,vr=new L,Vd=new L,Fl=new L,Hd=new L;class Nm{constructor(e=new L,n=new L(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Oi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Oi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Oi.copy(this.origin).addScaledVector(this.direction,n),Oi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){jd.copy(e).add(n).multiplyScalar(.5),kl.copy(n).sub(e).normalize(),vr.copy(this.origin).sub(jd);const s=e.distanceTo(n)*.5,a=-this.direction.dot(kl),o=vr.dot(this.direction),l=-vr.dot(kl),c=vr.lengthSq(),d=Math.abs(1-a*a);let p,f,m,y;if(d>0)if(p=a*l-o,f=a*o-l,y=s*d,p>=0)if(f>=-y)if(f<=y){const x=1/d;p*=x,f*=x,m=p*(p+a*f+2*o)+f*(a*p+f+2*l)+c}else f=s,p=Math.max(0,-(a*f+o)),m=-p*p+f*(f+2*l)+c;else f=-s,p=Math.max(0,-(a*f+o)),m=-p*p+f*(f+2*l)+c;else f<=-y?(p=Math.max(0,-(-a*s+o)),f=p>0?-s:Math.min(Math.max(-s,-l),s),m=-p*p+f*(f+2*l)+c):f<=y?(p=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(p=Math.max(0,-(a*s+o)),f=p>0?s:Math.min(Math.max(-s,-l),s),m=-p*p+f*(f+2*l)+c);else f=a>0?-s:s,p=Math.max(0,-(a*f+o)),m=-p*p+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(jd).addScaledVector(kl,f),m}intersectSphere(e,n){Oi.subVectors(e.center,this.origin);const i=Oi.dot(this.direction),r=Oi.dot(Oi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),d>=0?(s=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(s=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-f.z)*p,l=(e.max.z-f.z)*p):(o=(e.max.z-f.z)*p,l=(e.min.z-f.z)*p),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Oi)!==null}intersectTriangle(e,n,i,r,s){Vd.subVectors(n,e),Fl.subVectors(i,e),Hd.crossVectors(Vd,Fl);let a=this.direction.dot(Hd),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;vr.subVectors(this.origin,e);const l=o*this.direction.dot(Fl.crossVectors(vr,Fl));if(l<0)return null;const c=o*this.direction.dot(Vd.cross(vr));if(c<0||l+c>a)return null;const d=-o*vr.dot(Hd);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pt{constructor(e,n,i,r,s,a,o,l,c,d,p,f,m,y,x,g){pt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,d,p,f,m,y,x,g)}set(e,n,i,r,s,a,o,l,c,d,p,f,m,y,x,g){const h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=d,h[10]=p,h[14]=f,h[3]=m,h[7]=y,h[11]=x,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Ns.setFromMatrixColumn(e,0).length(),s=1/Ns.setFromMatrixColumn(e,1).length(),a=1/Ns.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const f=a*d,m=a*p,y=o*d,x=o*p;n[0]=l*d,n[4]=-l*p,n[8]=c,n[1]=m+y*c,n[5]=f-x*c,n[9]=-o*l,n[2]=x-f*c,n[6]=y+m*c,n[10]=a*l}else if(e.order==="YXZ"){const f=l*d,m=l*p,y=c*d,x=c*p;n[0]=f+x*o,n[4]=y*o-m,n[8]=a*c,n[1]=a*p,n[5]=a*d,n[9]=-o,n[2]=m*o-y,n[6]=x+f*o,n[10]=a*l}else if(e.order==="ZXY"){const f=l*d,m=l*p,y=c*d,x=c*p;n[0]=f-x*o,n[4]=-a*p,n[8]=y+m*o,n[1]=m+y*o,n[5]=a*d,n[9]=x-f*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const f=a*d,m=a*p,y=o*d,x=o*p;n[0]=l*d,n[4]=y*c-m,n[8]=f*c+x,n[1]=l*p,n[5]=x*c+f,n[9]=m*c-y,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const f=a*l,m=a*c,y=o*l,x=o*c;n[0]=l*d,n[4]=x-f*p,n[8]=y*p+m,n[1]=p,n[5]=a*d,n[9]=-o*d,n[2]=-c*d,n[6]=m*p+y,n[10]=f-x*p}else if(e.order==="XZY"){const f=a*l,m=a*c,y=o*l,x=o*c;n[0]=l*d,n[4]=-p,n[8]=c*d,n[1]=f*p+x,n[5]=a*d,n[9]=m*p-y,n[2]=y*p-m,n[6]=o*d,n[10]=x*p+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(dT,e,hT)}lookAt(e,n,i){const r=this.elements;return Ln.subVectors(e,n),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),xr.crossVectors(i,Ln),xr.lengthSq()===0&&(Math.abs(i.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),xr.crossVectors(i,Ln)),xr.normalize(),Ol.crossVectors(Ln,xr),r[0]=xr.x,r[4]=Ol.x,r[8]=Ln.x,r[1]=xr.y,r[5]=Ol.y,r[9]=Ln.y,r[2]=xr.z,r[6]=Ol.z,r[10]=Ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],p=i[5],f=i[9],m=i[13],y=i[2],x=i[6],g=i[10],h=i[14],v=i[3],S=i[7],_=i[11],M=i[15],T=r[0],A=r[4],b=r[8],w=r[12],E=r[1],N=r[5],V=r[9],z=r[13],Y=r[2],ne=r[6],Q=r[10],K=r[14],I=r[3],H=r[7],J=r[11],de=r[15];return s[0]=a*T+o*E+l*Y+c*I,s[4]=a*A+o*N+l*ne+c*H,s[8]=a*b+o*V+l*Q+c*J,s[12]=a*w+o*z+l*K+c*de,s[1]=d*T+p*E+f*Y+m*I,s[5]=d*A+p*N+f*ne+m*H,s[9]=d*b+p*V+f*Q+m*J,s[13]=d*w+p*z+f*K+m*de,s[2]=y*T+x*E+g*Y+h*I,s[6]=y*A+x*N+g*ne+h*H,s[10]=y*b+x*V+g*Q+h*J,s[14]=y*w+x*z+g*K+h*de,s[3]=v*T+S*E+_*Y+M*I,s[7]=v*A+S*N+_*ne+M*H,s[11]=v*b+S*V+_*Q+M*J,s[15]=v*w+S*z+_*K+M*de,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],p=e[6],f=e[10],m=e[14],y=e[3],x=e[7],g=e[11],h=e[15];return y*(+s*l*p-r*c*p-s*o*f+i*c*f+r*o*m-i*l*m)+x*(+n*l*m-n*c*f+s*a*f-r*a*m+r*c*d-s*l*d)+g*(+n*c*p-n*o*m-s*a*p+i*a*m+s*o*d-i*c*d)+h*(-r*o*d-n*l*p+n*o*f+r*a*p-i*a*f+i*l*d)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],p=e[9],f=e[10],m=e[11],y=e[12],x=e[13],g=e[14],h=e[15],v=p*g*c-x*f*c+x*l*m-o*g*m-p*l*h+o*f*h,S=y*f*c-d*g*c-y*l*m+a*g*m+d*l*h-a*f*h,_=d*x*c-y*p*c+y*o*m-a*x*m-d*o*h+a*p*h,M=y*p*l-d*x*l-y*o*f+a*x*f+d*o*g-a*p*g,T=n*v+i*S+r*_+s*M;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=v*A,e[1]=(x*f*s-p*g*s-x*r*m+i*g*m+p*r*h-i*f*h)*A,e[2]=(o*g*s-x*l*s+x*r*c-i*g*c-o*r*h+i*l*h)*A,e[3]=(p*l*s-o*f*s-p*r*c+i*f*c+o*r*m-i*l*m)*A,e[4]=S*A,e[5]=(d*g*s-y*f*s+y*r*m-n*g*m-d*r*h+n*f*h)*A,e[6]=(y*l*s-a*g*s-y*r*c+n*g*c+a*r*h-n*l*h)*A,e[7]=(a*f*s-d*l*s+d*r*c-n*f*c-a*r*m+n*l*m)*A,e[8]=_*A,e[9]=(y*p*s-d*x*s-y*i*m+n*x*m+d*i*h-n*p*h)*A,e[10]=(a*x*s-y*o*s+y*i*c-n*x*c-a*i*h+n*o*h)*A,e[11]=(d*o*s-a*p*s-d*i*c+n*p*c+a*i*m-n*o*m)*A,e[12]=M*A,e[13]=(d*x*r-y*p*r+y*i*f-n*x*f-d*i*g+n*p*g)*A,e[14]=(y*o*r-a*x*r-y*i*l+n*x*l+a*i*g-n*o*g)*A,e[15]=(a*p*r-d*o*r+d*i*l-n*p*l-a*i*f+n*o*f)*A,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,d=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+i,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,d=a+a,p=o+o,f=s*c,m=s*d,y=s*p,x=a*d,g=a*p,h=o*p,v=l*c,S=l*d,_=l*p,M=i.x,T=i.y,A=i.z;return r[0]=(1-(x+h))*M,r[1]=(m+_)*M,r[2]=(y-S)*M,r[3]=0,r[4]=(m-_)*T,r[5]=(1-(f+h))*T,r[6]=(g+v)*T,r[7]=0,r[8]=(y+S)*A,r[9]=(g-v)*A,r[10]=(1-(f+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Ns.set(r[0],r[1],r[2]).length();const a=Ns.set(r[4],r[5],r[6]).length(),o=Ns.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],li.copy(this);const c=1/s,d=1/a,p=1/o;return li.elements[0]*=c,li.elements[1]*=c,li.elements[2]*=c,li.elements[4]*=d,li.elements[5]*=d,li.elements[6]*=d,li.elements[8]*=p,li.elements[9]*=p,li.elements[10]*=p,n.setFromRotationMatrix(li),i.x=s,i.y=a,i.z=o,this}makePerspective(e,n,i,r,s,a,o=Ki){const l=this.elements,c=2*s/(n-e),d=2*s/(i-r),p=(n+e)/(n-e),f=(i+r)/(i-r);let m,y;if(o===Ki)m=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===mu)m=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=Ki){const l=this.elements,c=1/(n-e),d=1/(i-r),p=1/(a-s),f=(n+e)*c,m=(i+r)*d;let y,x;if(o===Ki)y=(a+s)*p,x=-2*p;else if(o===mu)y=s*p,x=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=x,l[14]=-y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Ns=new L,li=new pt,dT=new L(0,0,0),hT=new L(1,1,1),xr=new L,Ol=new L,Ln=new L,k0=new pt,F0=new ul;class Ii{constructor(e=0,n=0,i=0,r=Ii.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],p=r[2],f=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(jt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-jt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return k0.makeRotationFromQuaternion(e),this.setFromRotationMatrix(k0,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return F0.setFromEuler(this),this.setFromQuaternion(F0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ii.DEFAULT_ORDER="XYZ";class Lm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let fT=0;const O0=new L,Ls=new ul,zi=new pt,zl=new L,to=new L,pT=new L,mT=new ul,z0=new L(1,0,0),B0=new L(0,1,0),j0=new L(0,0,1),V0={type:"added"},gT={type:"removed"},Is={type:"childadded",child:null},Gd={type:"childremoved",child:null};class zt extends ka{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fT++}),this.uuid=er(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new L,n=new Ii,i=new ul,r=new L(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new pt},normalMatrix:{value:new Ke}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,n){return Ls.setFromAxisAngle(e,n),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis(z0,e)}rotateY(e){return this.rotateOnAxis(B0,e)}rotateZ(e){return this.rotateOnAxis(j0,e)}translateOnAxis(e,n){return O0.copy(e).applyQuaternion(this.quaternion),this.position.add(O0.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(z0,e)}translateY(e){return this.translateOnAxis(B0,e)}translateZ(e){return this.translateOnAxis(j0,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?zl.copy(e):zl.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),to.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zi.lookAt(to,zl,this.up):zi.lookAt(zl,to,this.up),this.quaternion.setFromRotationMatrix(zi),r&&(zi.extractRotation(r.matrixWorld),Ls.setFromRotationMatrix(zi),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(V0),Is.child=e,this.dispatchEvent(Is),Is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(gT),Gd.child=e,this.dispatchEvent(Gd),Gd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zi.multiply(e.parent.matrixWorld)),e.applyMatrix4(zi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(V0),Is.child=e,this.dispatchEvent(Is),Is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(to,e,pT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(to,mT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const p=l[c];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),p=a(e.shapes),f=a(e.skeletons),m=a(e.animations),y=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),p.length>0&&(i.shapes=p),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),y.length>0&&(i.nodes=y)}return i.object=r,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}zt.DEFAULT_UP=new L(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ci=new L,Bi=new L,Wd=new L,ji=new L,Ds=new L,Us=new L,H0=new L,Xd=new L,$d=new L,qd=new L,Yd=new St,Kd=new St,Zd=new St;class kn{constructor(e=new L,n=new L,i=new L){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),ci.subVectors(e,n),r.cross(ci);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){ci.subVectors(r,n),Bi.subVectors(i,n),Wd.subVectors(e,n);const a=ci.dot(ci),o=ci.dot(Bi),l=ci.dot(Wd),c=Bi.dot(Bi),d=Bi.dot(Wd),p=a*c-o*o;if(p===0)return s.set(0,0,0),null;const f=1/p,m=(c*l-o*d)*f,y=(a*d-o*l)*f;return s.set(1-m-y,y,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,ji)===null?!1:ji.x>=0&&ji.y>=0&&ji.x+ji.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,ji)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ji.x),l.addScaledVector(a,ji.y),l.addScaledVector(o,ji.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return Yd.setScalar(0),Kd.setScalar(0),Zd.setScalar(0),Yd.fromBufferAttribute(e,n),Kd.fromBufferAttribute(e,i),Zd.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Yd,s.x),a.addScaledVector(Kd,s.y),a.addScaledVector(Zd,s.z),a}static isFrontFacing(e,n,i,r){return ci.subVectors(i,n),Bi.subVectors(e,n),ci.cross(Bi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ci.subVectors(this.c,this.b),Bi.subVectors(this.a,this.b),ci.cross(Bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return kn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return kn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return kn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return kn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return kn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;Ds.subVectors(r,i),Us.subVectors(s,i),Xd.subVectors(e,i);const l=Ds.dot(Xd),c=Us.dot(Xd);if(l<=0&&c<=0)return n.copy(i);$d.subVectors(e,r);const d=Ds.dot($d),p=Us.dot($d);if(d>=0&&p<=d)return n.copy(r);const f=l*p-d*c;if(f<=0&&l>=0&&d<=0)return a=l/(l-d),n.copy(i).addScaledVector(Ds,a);qd.subVectors(e,s);const m=Ds.dot(qd),y=Us.dot(qd);if(y>=0&&m<=y)return n.copy(s);const x=m*c-l*y;if(x<=0&&c>=0&&y<=0)return o=c/(c-y),n.copy(i).addScaledVector(Us,o);const g=d*y-m*p;if(g<=0&&p-d>=0&&m-y>=0)return H0.subVectors(s,r),o=(p-d)/(p-d+(m-y)),n.copy(r).addScaledVector(H0,o);const h=1/(g+x+f);return a=x*h,o=f*h,n.copy(i).addScaledVector(Ds,a).addScaledVector(Us,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const l1={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_r={h:0,s:0,l:0},Bl={h:0,s:0,l:0};function Qd(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Be{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=vn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=st.workingColorSpace){return this.r=e,this.g=n,this.b=i,st.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=st.workingColorSpace){if(e=Pm(e,1),n=jt(n,0,1),i=jt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Qd(a,s,e+1/3),this.g=Qd(a,s,e),this.b=Qd(a,s,e-1/3)}return st.toWorkingColorSpace(this,r),this}setStyle(e,n=vn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=vn){const i=l1[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=tr(e.r),this.g=tr(e.g),this.b=tr(e.b),this}copyLinearToSRGB(e){return this.r=pa(e.r),this.g=pa(e.g),this.b=pa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vn){return st.fromWorkingColorSpace(an.copy(this),e),Math.round(jt(an.r*255,0,255))*65536+Math.round(jt(an.g*255,0,255))*256+Math.round(jt(an.b*255,0,255))}getHexString(e=vn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=st.workingColorSpace){st.fromWorkingColorSpace(an.copy(this),n);const i=an.r,r=an.g,s=an.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const p=a-o;switch(c=d<=.5?p/(a+o):p/(2-a-o),a){case i:l=(r-s)/p+(r<s?6:0);break;case r:l=(s-i)/p+2;break;case s:l=(i-r)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=st.workingColorSpace){return st.fromWorkingColorSpace(an.copy(this),n),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=vn){st.fromWorkingColorSpace(an.copy(this),e);const n=an.r,i=an.g,r=an.b;return e!==vn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(_r),this.setHSL(_r.h+e,_r.s+n,_r.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(_r),e.getHSL(Bl);const i=Po(_r.h,Bl.h,n),r=Po(_r.s,Bl.s,n),s=Po(_r.l,Bl.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new Be;Be.NAMES=l1;let vT=0;class Ms extends ka{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vT++}),this.uuid=er(),this.name="",this.blending=da,this.side=Br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ef,this.blendDst=wf,this.blendEquation=ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=wa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=C0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cs,this.stencilZFail=Cs,this.stencilZPass=Cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==da&&(i.blending=this.blending),this.side!==Br&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ef&&(i.blendSrc=this.blendSrc),this.blendDst!==wf&&(i.blendDst=this.blendDst),this.blendEquation!==ns&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==wa&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==C0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Cs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Cs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Cs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Oa extends Ms{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ii,this.combine=jy,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ut=new L,jl=new pe;class jn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=op,this.updateRanges=[],this.gpuType=Ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)jl.fromBufferAttribute(this,n),jl.applyMatrix3(e),this.setXY(n,jl.x,jl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyMatrix3(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyMatrix4(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyNormalMatrix(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.transformDirection(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=pi(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=xt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=pi(n,this.array)),n}setX(e,n){return this.normalized&&(n=xt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=pi(n,this.array)),n}setY(e,n){return this.normalized&&(n=xt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=pi(n,this.array)),n}setZ(e,n){return this.normalized&&(n=xt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=pi(n,this.array)),n}setW(e,n){return this.normalized&&(n=xt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=xt(n,this.array),i=xt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=xt(n,this.array),i=xt(i,this.array),r=xt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=xt(n,this.array),i=xt(i,this.array),r=xt(r,this.array),s=xt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==op&&(e.usage=this.usage),e}}class c1 extends jn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class u1 extends jn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class ct extends jn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let xT=0;const $n=new pt,Jd=new zt,ks=new L,In=new Ss,no=new Ss,Xt=new L;class Ht extends ka{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xT++}),this.uuid=er(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(s1(e)?u1:c1)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $n.makeRotationFromQuaternion(e),this.applyMatrix4($n),this}rotateX(e){return $n.makeRotationX(e),this.applyMatrix4($n),this}rotateY(e){return $n.makeRotationY(e),this.applyMatrix4($n),this}rotateZ(e){return $n.makeRotationZ(e),this.applyMatrix4($n),this}translate(e,n,i){return $n.makeTranslation(e,n,i),this.applyMatrix4($n),this}scale(e,n,i){return $n.makeScale(e,n,i),this.applyMatrix4($n),this}lookAt(e){return Jd.lookAt(e),Jd.updateMatrix(),this.applyMatrix4(Jd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ks).negate(),this.translate(ks.x,ks.y,ks.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ct(i,3))}else{for(let i=0,r=n.count;i<r;i++){const s=e[i];n.setXYZ(i,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ss);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];In.setFromBufferAttribute(s),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fa);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(In.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];no.setFromBufferAttribute(o),this.morphTargetsRelative?(Xt.addVectors(In.min,no.min),In.expandByPoint(Xt),Xt.addVectors(In.max,no.max),In.expandByPoint(Xt)):(In.expandByPoint(no.min),In.expandByPoint(no.max))}In.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Xt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Xt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Xt.fromBufferAttribute(o,c),l&&(ks.fromBufferAttribute(e,c),Xt.add(ks)),r=Math.max(r,i.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let b=0;b<i.count;b++)o[b]=new L,l[b]=new L;const c=new L,d=new L,p=new L,f=new pe,m=new pe,y=new pe,x=new L,g=new L;function h(b,w,E){c.fromBufferAttribute(i,b),d.fromBufferAttribute(i,w),p.fromBufferAttribute(i,E),f.fromBufferAttribute(s,b),m.fromBufferAttribute(s,w),y.fromBufferAttribute(s,E),d.sub(c),p.sub(c),m.sub(f),y.sub(f);const N=1/(m.x*y.y-y.x*m.y);isFinite(N)&&(x.copy(d).multiplyScalar(y.y).addScaledVector(p,-m.y).multiplyScalar(N),g.copy(p).multiplyScalar(m.x).addScaledVector(d,-y.x).multiplyScalar(N),o[b].add(x),o[w].add(x),o[E].add(x),l[b].add(g),l[w].add(g),l[E].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let b=0,w=v.length;b<w;++b){const E=v[b],N=E.start,V=E.count;for(let z=N,Y=N+V;z<Y;z+=3)h(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const S=new L,_=new L,M=new L,T=new L;function A(b){M.fromBufferAttribute(r,b),T.copy(M);const w=o[b];S.copy(w),S.sub(M.multiplyScalar(M.dot(w))).normalize(),_.crossVectors(T,w);const N=_.dot(l[b])<0?-1:1;a.setXYZW(b,S.x,S.y,S.z,N)}for(let b=0,w=v.length;b<w;++b){const E=v[b],N=E.start,V=E.count;for(let z=N,Y=N+V;z<Y;z+=3)A(e.getX(z+0)),A(e.getX(z+1)),A(e.getX(z+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new jn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const r=new L,s=new L,a=new L,o=new L,l=new L,c=new L,d=new L,p=new L;if(e)for(let f=0,m=e.count;f<m;f+=3){const y=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(n,y),s.fromBufferAttribute(n,x),a.fromBufferAttribute(n,g),d.subVectors(a,s),p.subVectors(r,s),d.cross(p),o.fromBufferAttribute(i,y),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),o.add(d),l.add(d),c.add(d),i.setXYZ(y,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,m=n.count;f<m;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),a.fromBufferAttribute(n,f+2),d.subVectors(a,s),p.subVectors(r,s),d.cross(p),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Xt.fromBufferAttribute(e,n),Xt.normalize(),e.setXYZ(n,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,p=o.normalized,f=new c.constructor(l.length*d);let m=0,y=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?m=l[x]*o.data.stride+o.offset:m=l[x]*d;for(let h=0;h<d;h++)f[y++]=c[m++]}return new jn(f,d,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Ht,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,p=c.length;d<p;d++){const f=c[d],m=e(f,i);l.push(m)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let p=0,f=c.length;p<f;p++){const m=c[p];d.push(m.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(n))}const s=e.morphAttributes;for(const c in s){const d=[],p=s[c];for(let f=0,m=p.length;f<m;f++)d.push(p[f].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const G0=new pt,$r=new Nm,Vl=new Fa,W0=new L,Hl=new L,Gl=new L,Wl=new L,eh=new L,Xl=new L,X0=new L,$l=new L;class Jt extends zt{constructor(e=new Ht,n=new Oa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Xl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],p=s[l];d!==0&&(eh.fromBufferAttribute(p,e),a?Xl.addScaledVector(eh,d):Xl.addScaledVector(eh.sub(n),d))}n.add(Xl)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Vl.copy(i.boundingSphere),Vl.applyMatrix4(s),$r.copy(e.ray).recast(e.near),!(Vl.containsPoint($r.origin)===!1&&($r.intersectSphere(Vl,W0)===null||$r.origin.distanceToSquared(W0)>(e.far-e.near)**2))&&(G0.copy(s).invert(),$r.copy(e.ray).applyMatrix4(G0),!(i.boundingBox!==null&&$r.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,$r)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,p=s.attributes.normal,f=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let y=0,x=f.length;y<x;y++){const g=f[y],h=a[g.materialIndex],v=Math.max(g.start,m.start),S=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let _=v,M=S;_<M;_+=3){const T=o.getX(_),A=o.getX(_+1),b=o.getX(_+2);r=ql(this,h,e,i,c,d,p,T,A,b),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const y=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let g=y,h=x;g<h;g+=3){const v=o.getX(g),S=o.getX(g+1),_=o.getX(g+2);r=ql(this,a,e,i,c,d,p,v,S,_),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let y=0,x=f.length;y<x;y++){const g=f[y],h=a[g.materialIndex],v=Math.max(g.start,m.start),S=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let _=v,M=S;_<M;_+=3){const T=_,A=_+1,b=_+2;r=ql(this,h,e,i,c,d,p,T,A,b),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const y=Math.max(0,m.start),x=Math.min(l.count,m.start+m.count);for(let g=y,h=x;g<h;g+=3){const v=g,S=g+1,_=g+2;r=ql(this,a,e,i,c,d,p,v,S,_),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function _T(t,e,n,i,r,s,a,o){let l;if(e.side===_n?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Br,o),l===null)return null;$l.copy(o),$l.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo($l);return c<n.near||c>n.far?null:{distance:c,point:$l.clone(),object:t}}function ql(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,Hl),t.getVertexPosition(l,Gl),t.getVertexPosition(c,Wl);const d=_T(t,e,n,i,Hl,Gl,Wl,X0);if(d){const p=new L;kn.getBarycoord(X0,Hl,Gl,Wl,p),r&&(d.uv=kn.getInterpolatedAttribute(r,o,l,c,p,new pe)),s&&(d.uv1=kn.getInterpolatedAttribute(s,o,l,c,p,new pe)),a&&(d.normal=kn.getInterpolatedAttribute(a,o,l,c,p,new L),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new L,materialIndex:0};kn.getNormal(Hl,Gl,Wl,f.normal),d.face=f,d.barycoord=p}return d}class Ft extends Ht{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],p=[];let f=0,m=0;y("z","y","x",-1,-1,i,n,e,a,s,0),y("z","y","x",1,-1,i,n,-e,a,s,1),y("x","z","y",1,1,e,i,n,r,a,2),y("x","z","y",1,-1,e,i,-n,r,a,3),y("x","y","z",1,-1,e,n,i,r,s,4),y("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(d,3)),this.setAttribute("uv",new ct(p,2));function y(x,g,h,v,S,_,M,T,A,b,w){const E=_/A,N=M/b,V=_/2,z=M/2,Y=T/2,ne=A+1,Q=b+1;let K=0,I=0;const H=new L;for(let J=0;J<Q;J++){const de=J*N-z;for(let Ae=0;Ae<ne;Ae++){const We=Ae*E-V;H[x]=We*v,H[g]=de*S,H[h]=Y,c.push(H.x,H.y,H.z),H[x]=0,H[g]=0,H[h]=T>0?1:-1,d.push(H.x,H.y,H.z),p.push(Ae/A),p.push(1-J/b),K+=1}}for(let J=0;J<b;J++)for(let de=0;de<A;de++){const Ae=f+de+ne*J,We=f+de+ne*(J+1),Z=f+(de+1)+ne*(J+1),ae=f+(de+1)+ne*J;l.push(Ae,We,ae),l.push(We,Z,ae),I+=6}o.addGroup(m,I,w),m+=I,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ft(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ra(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function mn(t){const e={};for(let n=0;n<t.length;n++){const i=Ra(t[n]);for(const r in i)e[r]=i[r]}return e}function yT(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function d1(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const Pa={clone:Ra,merge:mn};var ST=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,MT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class cn extends Ms{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ST,this.fragmentShader=MT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ra(e.uniforms),this.uniformsGroups=yT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class h1 extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=Ki}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const yr=new L,$0=new pe,q0=new pe;class Un extends h1{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=el*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return el*2*Math.atan(Math.tan(fa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){yr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yr.x,yr.y).multiplyScalar(-e/yr.z),yr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(yr.x,yr.y).multiplyScalar(-e/yr.z)}getViewSize(e,n){return this.getViewBounds(e,$0,q0),n.subVectors(q0,$0)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(fa*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Fs=-90,Os=1;class ET extends zt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Un(Fs,Os,e,n);r.layers=this.layers,this.add(r);const s=new Un(Fs,Os,e,n);s.layers=this.layers,this.add(s);const a=new Un(Fs,Os,e,n);a.layers=this.layers,this.add(a);const o=new Un(Fs,Os,e,n);o.layers=this.layers,this.add(o);const l=new Un(Fs,Os,e,n);l.layers=this.layers,this.add(l);const c=new Un(Fs,Os,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===Ki)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===mu)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,p=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,a),e.setRenderTarget(i,2,r),e.render(n,o),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(n,d),e.setRenderTarget(p,f,m),e.xr.enabled=y,i.texture.needsPMREMUpdate=!0}}class f1 extends un{constructor(e,n,i,r,s,a,o,l,c,d){e=e!==void 0?e:[],n=n!==void 0?n:Ta,super(e,n,i,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wT extends ei{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new f1(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Ti}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ft(5,5,5),s=new cn({name:"CubemapFromEquirect",uniforms:Ra(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:_n,blending:Ji});s.uniforms.tEquirect.value=n;const a=new Jt(r,s),o=n.minFilter;return n.minFilter===ls&&(n.minFilter=Ti),new ET(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}const th=new L,TT=new L,CT=new Ke;class es{constructor(e=new L(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=th.subVectors(i,n).cross(TT.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(th),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||CT.getNormalMatrix(e),r=this.coplanarPoint(th).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qr=new Fa,Yl=new L;class Im{constructor(e=new es,n=new es,i=new es,r=new es,s=new es,a=new es){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Ki){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],d=r[5],p=r[6],f=r[7],m=r[8],y=r[9],x=r[10],g=r[11],h=r[12],v=r[13],S=r[14],_=r[15];if(i[0].setComponents(l-s,f-c,g-m,_-h).normalize(),i[1].setComponents(l+s,f+c,g+m,_+h).normalize(),i[2].setComponents(l+a,f+d,g+y,_+v).normalize(),i[3].setComponents(l-a,f-d,g-y,_-v).normalize(),i[4].setComponents(l-o,f-p,g-x,_-S).normalize(),n===Ki)i[5].setComponents(l+o,f+p,g+x,_+S).normalize();else if(n===mu)i[5].setComponents(o,p,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qr)}intersectsSprite(e){return qr.center.set(0,0,0),qr.radius=.7071067811865476,qr.applyMatrix4(e.matrixWorld),this.intersectsSphere(qr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Yl.x=r.normal.x>0?e.max.x:e.min.x,Yl.y=r.normal.y>0?e.max.y:e.min.y,Yl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Yl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function p1(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function AT(t){const e=new WeakMap;function n(o,l){const c=o.array,d=o.usage,p=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,d),o.onUploadCallback();let m;if(c instanceof Float32Array)m=t.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=t.SHORT;else if(c instanceof Uint32Array)m=t.UNSIGNED_INT;else if(c instanceof Int32Array)m=t.INT;else if(c instanceof Int8Array)m=t.BYTE;else if(c instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){const d=l.array,p=l.updateRanges;if(t.bindBuffer(c,o),p.length===0)t.bufferSubData(c,0,d);else{p.sort((m,y)=>m.start-y.start);let f=0;for(let m=1;m<p.length;m++){const y=p[f],x=p[m];x.start<=y.start+y.count+1?y.count=Math.max(y.count,x.start+x.count-y.start):(++f,p[f]=x)}p.length=f+1;for(let m=0,y=p.length;m<y;m++){const x=p[m];t.bufferSubData(c,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class Zi extends Ht{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,d=l+1,p=e/o,f=n/l,m=[],y=[],x=[],g=[];for(let h=0;h<d;h++){const v=h*f-a;for(let S=0;S<c;S++){const _=S*p-s;y.push(_,-v,0),x.push(0,0,1),g.push(S/o),g.push(1-h/l)}}for(let h=0;h<l;h++)for(let v=0;v<o;v++){const S=v+c*h,_=v+c*(h+1),M=v+1+c*(h+1),T=v+1+c*h;m.push(S,_,T),m.push(_,M,T)}this.setIndex(m),this.setAttribute("position",new ct(y,3)),this.setAttribute("normal",new ct(x,3)),this.setAttribute("uv",new ct(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zi(e.width,e.height,e.widthSegments,e.heightSegments)}}var bT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,RT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,PT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,NT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,LT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,IT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,DT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,UT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kT=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,FT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,OT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,BT=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,jT=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,VT=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,HT=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,GT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,WT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,XT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$T=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,YT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,KT=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ZT=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,QT=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,JT=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,eC=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tC=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nC=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,iC=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rC="gl_FragColor = linearToOutputTexel( gl_FragColor );",sC=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,aC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,oC=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,lC=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cC=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,uC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dC=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hC=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fC=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pC=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mC=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gC=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vC=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xC=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_C=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,yC=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,SC=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,MC=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,EC=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wC=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,TC=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,CC=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,AC=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bC=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,RC=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,PC=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,NC=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,LC=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,IC=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,DC=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,UC=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kC=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,FC=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,OC=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zC=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,BC=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jC=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,VC=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,HC=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,GC=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,WC=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,XC=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$C=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qC=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,YC=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,KC=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ZC=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,QC=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,JC=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,eA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,iA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,aA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,oA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,uA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,hA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,vA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_A=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,SA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,MA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,EA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,TA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,CA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const AA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,PA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,LA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,IA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,DA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,UA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,kA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,FA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,OA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,BA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,VA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,XA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$A=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,YA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,KA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,QA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,nb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ib=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ab=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:bT,alphahash_pars_fragment:RT,alphamap_fragment:PT,alphamap_pars_fragment:NT,alphatest_fragment:LT,alphatest_pars_fragment:IT,aomap_fragment:DT,aomap_pars_fragment:UT,batching_pars_vertex:kT,batching_vertex:FT,begin_vertex:OT,beginnormal_vertex:zT,bsdfs:BT,iridescence_fragment:jT,bumpmap_pars_fragment:VT,clipping_planes_fragment:HT,clipping_planes_pars_fragment:GT,clipping_planes_pars_vertex:WT,clipping_planes_vertex:XT,color_fragment:$T,color_pars_fragment:qT,color_pars_vertex:YT,color_vertex:KT,common:ZT,cube_uv_reflection_fragment:QT,defaultnormal_vertex:JT,displacementmap_pars_vertex:eC,displacementmap_vertex:tC,emissivemap_fragment:nC,emissivemap_pars_fragment:iC,colorspace_fragment:rC,colorspace_pars_fragment:sC,envmap_fragment:aC,envmap_common_pars_fragment:oC,envmap_pars_fragment:lC,envmap_pars_vertex:cC,envmap_physical_pars_fragment:yC,envmap_vertex:uC,fog_vertex:dC,fog_pars_vertex:hC,fog_fragment:fC,fog_pars_fragment:pC,gradientmap_pars_fragment:mC,lightmap_pars_fragment:gC,lights_lambert_fragment:vC,lights_lambert_pars_fragment:xC,lights_pars_begin:_C,lights_toon_fragment:SC,lights_toon_pars_fragment:MC,lights_phong_fragment:EC,lights_phong_pars_fragment:wC,lights_physical_fragment:TC,lights_physical_pars_fragment:CC,lights_fragment_begin:AC,lights_fragment_maps:bC,lights_fragment_end:RC,logdepthbuf_fragment:PC,logdepthbuf_pars_fragment:NC,logdepthbuf_pars_vertex:LC,logdepthbuf_vertex:IC,map_fragment:DC,map_pars_fragment:UC,map_particle_fragment:kC,map_particle_pars_fragment:FC,metalnessmap_fragment:OC,metalnessmap_pars_fragment:zC,morphinstance_vertex:BC,morphcolor_vertex:jC,morphnormal_vertex:VC,morphtarget_pars_vertex:HC,morphtarget_vertex:GC,normal_fragment_begin:WC,normal_fragment_maps:XC,normal_pars_fragment:$C,normal_pars_vertex:qC,normal_vertex:YC,normalmap_pars_fragment:KC,clearcoat_normal_fragment_begin:ZC,clearcoat_normal_fragment_maps:QC,clearcoat_pars_fragment:JC,iridescence_pars_fragment:eA,opaque_fragment:tA,packing:nA,premultiplied_alpha_fragment:iA,project_vertex:rA,dithering_fragment:sA,dithering_pars_fragment:aA,roughnessmap_fragment:oA,roughnessmap_pars_fragment:lA,shadowmap_pars_fragment:cA,shadowmap_pars_vertex:uA,shadowmap_vertex:dA,shadowmask_pars_fragment:hA,skinbase_vertex:fA,skinning_pars_vertex:pA,skinning_vertex:mA,skinnormal_vertex:gA,specularmap_fragment:vA,specularmap_pars_fragment:xA,tonemapping_fragment:_A,tonemapping_pars_fragment:yA,transmission_fragment:SA,transmission_pars_fragment:MA,uv_pars_fragment:EA,uv_pars_vertex:wA,uv_vertex:TA,worldpos_vertex:CA,background_vert:AA,background_frag:bA,backgroundCube_vert:RA,backgroundCube_frag:PA,cube_vert:NA,cube_frag:LA,depth_vert:IA,depth_frag:DA,distanceRGBA_vert:UA,distanceRGBA_frag:kA,equirect_vert:FA,equirect_frag:OA,linedashed_vert:zA,linedashed_frag:BA,meshbasic_vert:jA,meshbasic_frag:VA,meshlambert_vert:HA,meshlambert_frag:GA,meshmatcap_vert:WA,meshmatcap_frag:XA,meshnormal_vert:$A,meshnormal_frag:qA,meshphong_vert:YA,meshphong_frag:KA,meshphysical_vert:ZA,meshphysical_frag:QA,meshtoon_vert:JA,meshtoon_frag:eb,points_vert:tb,points_frag:nb,shadow_vert:ib,shadow_frag:rb,sprite_vert:sb,sprite_frag:ab},ge={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Mi={basic:{uniforms:mn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:mn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Be(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:mn([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:mn([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:mn([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Be(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:mn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:mn([ge.points,ge.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:mn([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:mn([ge.common,ge.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:mn([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:mn([ge.sprite,ge.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:mn([ge.common,ge.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:mn([ge.lights,ge.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Mi.physical={uniforms:mn([Mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const Kl={r:0,b:0,g:0},Yr=new Ii,ob=new pt;function lb(t,e,n,i,r,s,a){const o=new Be(0);let l=s===!0?0:1,c,d,p=null,f=0,m=null;function y(v){let S=v.isScene===!0?v.background:null;return S&&S.isTexture&&(S=(v.backgroundBlurriness>0?n:e).get(S)),S}function x(v){let S=!1;const _=y(v);_===null?h(o,l):_&&_.isColor&&(h(_,1),S=!0);const M=t.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(t.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function g(v,S){const _=y(S);_&&(_.isCubeTexture||_.mapping===Yu)?(d===void 0&&(d=new Jt(new Ft(1,1,1),new cn({name:"BackgroundCubeMaterial",uniforms:Ra(Mi.backgroundCube.uniforms),vertexShader:Mi.backgroundCube.vertexShader,fragmentShader:Mi.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(M,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),Yr.copy(S.backgroundRotation),Yr.x*=-1,Yr.y*=-1,Yr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Yr.y*=-1,Yr.z*=-1),d.material.uniforms.envMap.value=_,d.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(ob.makeRotationFromEuler(Yr)),d.material.toneMapped=st.getTransfer(_.colorSpace)!==vt,(p!==_||f!==_.version||m!==t.toneMapping)&&(d.material.needsUpdate=!0,p=_,f=_.version,m=t.toneMapping),d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Jt(new Zi(2,2),new cn({name:"BackgroundMaterial",uniforms:Ra(Mi.background.uniforms),vertexShader:Mi.background.vertexShader,fragmentShader:Mi.background.fragmentShader,side:Br,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=st.getTransfer(_.colorSpace)!==vt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(p!==_||f!==_.version||m!==t.toneMapping)&&(c.material.needsUpdate=!0,p=_,f=_.version,m=t.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function h(v,S){v.getRGB(Kl,d1(t)),i.buffers.color.setClear(Kl.r,Kl.g,Kl.b,S,a)}return{getClearColor:function(){return o},setClearColor:function(v,S=1){o.set(v),l=S,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,h(o,l)},render:x,addToRenderList:g}}function cb(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(E,N,V,z,Y){let ne=!1;const Q=p(z,V,N);s!==Q&&(s=Q,c(s.object)),ne=m(E,z,V,Y),ne&&y(E,z,V,Y),Y!==null&&e.update(Y,t.ELEMENT_ARRAY_BUFFER),(ne||a)&&(a=!1,_(E,N,V,z),Y!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return t.createVertexArray()}function c(E){return t.bindVertexArray(E)}function d(E){return t.deleteVertexArray(E)}function p(E,N,V){const z=V.wireframe===!0;let Y=i[E.id];Y===void 0&&(Y={},i[E.id]=Y);let ne=Y[N.id];ne===void 0&&(ne={},Y[N.id]=ne);let Q=ne[z];return Q===void 0&&(Q=f(l()),ne[z]=Q),Q}function f(E){const N=[],V=[],z=[];for(let Y=0;Y<n;Y++)N[Y]=0,V[Y]=0,z[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:V,attributeDivisors:z,object:E,attributes:{},index:null}}function m(E,N,V,z){const Y=s.attributes,ne=N.attributes;let Q=0;const K=V.getAttributes();for(const I in K)if(K[I].location>=0){const J=Y[I];let de=ne[I];if(de===void 0&&(I==="instanceMatrix"&&E.instanceMatrix&&(de=E.instanceMatrix),I==="instanceColor"&&E.instanceColor&&(de=E.instanceColor)),J===void 0||J.attribute!==de||de&&J.data!==de.data)return!0;Q++}return s.attributesNum!==Q||s.index!==z}function y(E,N,V,z){const Y={},ne=N.attributes;let Q=0;const K=V.getAttributes();for(const I in K)if(K[I].location>=0){let J=ne[I];J===void 0&&(I==="instanceMatrix"&&E.instanceMatrix&&(J=E.instanceMatrix),I==="instanceColor"&&E.instanceColor&&(J=E.instanceColor));const de={};de.attribute=J,J&&J.data&&(de.data=J.data),Y[I]=de,Q++}s.attributes=Y,s.attributesNum=Q,s.index=z}function x(){const E=s.newAttributes;for(let N=0,V=E.length;N<V;N++)E[N]=0}function g(E){h(E,0)}function h(E,N){const V=s.newAttributes,z=s.enabledAttributes,Y=s.attributeDivisors;V[E]=1,z[E]===0&&(t.enableVertexAttribArray(E),z[E]=1),Y[E]!==N&&(t.vertexAttribDivisor(E,N),Y[E]=N)}function v(){const E=s.newAttributes,N=s.enabledAttributes;for(let V=0,z=N.length;V<z;V++)N[V]!==E[V]&&(t.disableVertexAttribArray(V),N[V]=0)}function S(E,N,V,z,Y,ne,Q){Q===!0?t.vertexAttribIPointer(E,N,V,Y,ne):t.vertexAttribPointer(E,N,V,z,Y,ne)}function _(E,N,V,z){x();const Y=z.attributes,ne=V.getAttributes(),Q=N.defaultAttributeValues;for(const K in ne){const I=ne[K];if(I.location>=0){let H=Y[K];if(H===void 0&&(K==="instanceMatrix"&&E.instanceMatrix&&(H=E.instanceMatrix),K==="instanceColor"&&E.instanceColor&&(H=E.instanceColor)),H!==void 0){const J=H.normalized,de=H.itemSize,Ae=e.get(H);if(Ae===void 0)continue;const We=Ae.buffer,Z=Ae.type,ae=Ae.bytesPerElement,xe=Z===t.INT||Z===t.UNSIGNED_INT||H.gpuType===Em;if(H.isInterleavedBufferAttribute){const fe=H.data,De=fe.stride,je=H.offset;if(fe.isInstancedInterleavedBuffer){for(let ve=0;ve<I.locationSize;ve++)h(I.location+ve,fe.meshPerAttribute);E.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ve=0;ve<I.locationSize;ve++)g(I.location+ve);t.bindBuffer(t.ARRAY_BUFFER,We);for(let ve=0;ve<I.locationSize;ve++)S(I.location+ve,de/I.locationSize,Z,J,De*ae,(je+de/I.locationSize*ve)*ae,xe)}else{if(H.isInstancedBufferAttribute){for(let fe=0;fe<I.locationSize;fe++)h(I.location+fe,H.meshPerAttribute);E.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let fe=0;fe<I.locationSize;fe++)g(I.location+fe);t.bindBuffer(t.ARRAY_BUFFER,We);for(let fe=0;fe<I.locationSize;fe++)S(I.location+fe,de/I.locationSize,Z,J,de*ae,de/I.locationSize*fe*ae,xe)}}else if(Q!==void 0){const J=Q[K];if(J!==void 0)switch(J.length){case 2:t.vertexAttrib2fv(I.location,J);break;case 3:t.vertexAttrib3fv(I.location,J);break;case 4:t.vertexAttrib4fv(I.location,J);break;default:t.vertexAttrib1fv(I.location,J)}}}}v()}function M(){b();for(const E in i){const N=i[E];for(const V in N){const z=N[V];for(const Y in z)d(z[Y].object),delete z[Y];delete N[V]}delete i[E]}}function T(E){if(i[E.id]===void 0)return;const N=i[E.id];for(const V in N){const z=N[V];for(const Y in z)d(z[Y].object),delete z[Y];delete N[V]}delete i[E.id]}function A(E){for(const N in i){const V=i[N];if(V[E.id]===void 0)continue;const z=V[E.id];for(const Y in z)d(z[Y].object),delete z[Y];delete V[E.id]}}function b(){w(),a=!0,s!==r&&(s=r,c(s.object))}function w(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:b,resetDefaultState:w,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function ub(t,e,n){let i;function r(c){i=c}function s(c,d){t.drawArrays(i,c,d),n.update(d,i,1)}function a(c,d,p){p!==0&&(t.drawArraysInstanced(i,c,d,p),n.update(d,i,p))}function o(c,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,p);let m=0;for(let y=0;y<p;y++)m+=d[y];n.update(m,i,1)}function l(c,d,p,f){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let y=0;y<c.length;y++)a(c[y],d[y],f[y]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,d,0,f,0,p);let y=0;for(let x=0;x<p;x++)y+=d[x]*f[x];n.update(y,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function db(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==mi&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const b=A===Ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==or&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ci&&!b)}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const p=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),v=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),S=t.getParameter(t.MAX_VARYING_VECTORS),_=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),M=y>0,T=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:y,maxTextureSize:x,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:v,maxVaryings:S,maxFragmentUniforms:_,vertexTextures:M,maxSamples:T}}function hb(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new es,o=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,f){const m=p.length!==0||f||i!==0||r;return r=f,i=p.length,m},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,f){n=d(p,f,0)},this.setState=function(p,f,m){const y=p.clippingPlanes,x=p.clipIntersection,g=p.clipShadows,h=t.get(p);if(!r||y===null||y.length===0||s&&!g)s?d(null):c();else{const v=s?0:i,S=v*4;let _=h.clippingState||null;l.value=_,_=d(y,f,S,m);for(let M=0;M!==S;++M)_[M]=n[M];h.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(p,f,m,y){const x=p!==null?p.length:0;let g=null;if(x!==0){if(g=l.value,y!==!0||g===null){const h=m+x*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<h)&&(g=new Float32Array(h));for(let S=0,_=m;S!==x;++S,_+=4)a.copy(p[S]).applyMatrix4(v,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function fb(t){let e=new WeakMap;function n(a,o){return o===Lf?a.mapping=Ta:o===If&&(a.mapping=Ca),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Lf||o===If)if(e.has(a)){const l=e.get(a).texture;return n(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new wT(l.height);return c.fromEquirectangularTexture(t,a),e.set(a,c),a.addEventListener("dispose",r),n(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Dm extends h1{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ra=4,Y0=[.125,.215,.35,.446,.526,.582],is=20,nh=new Dm,K0=new Be;let ih=null,rh=0,sh=0,ah=!1;const ts=(1+Math.sqrt(5))/2,zs=1/ts,Z0=[new L(-ts,zs,0),new L(ts,zs,0),new L(-zs,0,ts),new L(zs,0,ts),new L(0,ts,-zs),new L(0,ts,zs),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class lp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){ih=this._renderer.getRenderTarget(),rh=this._renderer.getActiveCubeFace(),sh=this._renderer.getActiveMipmapLevel(),ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ev(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=J0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ih,rh,sh),this._renderer.xr.enabled=ah,e.scissorTest=!1,Zl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ta||e.mapping===Ca?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ih=this._renderer.getRenderTarget(),rh=this._renderer.getActiveCubeFace(),sh=this._renderer.getActiveMipmapLevel(),ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Ti,minFilter:Ti,generateMipmaps:!1,type:Ni,format:mi,colorSpace:Ua,depthBuffer:!1},r=Q0(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Q0(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=pb(s)),this._blurMaterial=mb(s,e,n)}return r}_compileMaterial(e){const n=new Jt(this._lodPlanes[0],e);this._renderer.compile(n,nh)}_sceneToCubeUV(e,n,i,r){const o=new Un(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,p=d.autoClear,f=d.toneMapping;d.getClearColor(K0),d.toneMapping=kr,d.autoClear=!1;const m=new Oa({name:"PMREM.Background",side:_n,depthWrite:!1,depthTest:!1}),y=new Jt(new Ft,m);let x=!1;const g=e.background;g?g.isColor&&(m.color.copy(g),e.background=null,x=!0):(m.color.copy(K0),x=!0);for(let h=0;h<6;h++){const v=h%3;v===0?(o.up.set(0,l[h],0),o.lookAt(c[h],0,0)):v===1?(o.up.set(0,0,l[h]),o.lookAt(0,c[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,c[h]));const S=this._cubeSize;Zl(r,v*S,h>2?S:0,S,S),d.setRenderTarget(r),x&&d.render(y,o),d.render(e,o)}y.geometry.dispose(),y.material.dispose(),d.toneMapping=f,d.autoClear=p,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Ta||e.mapping===Ca;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ev()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=J0());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Jt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Zl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,nh)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Z0[(r-s-1)%Z0.length];this._blur(e,s-1,s,a,o)}n.autoClear=i}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,p=new Jt(this._lodPlanes[r],c),f=c.uniforms,m=this._sizeLods[i]-1,y=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*is-1),x=s/y,g=isFinite(s)?1+Math.floor(d*x):is;g>is&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${is}`);const h=[];let v=0;for(let A=0;A<is;++A){const b=A/x,w=Math.exp(-b*b/2);h.push(w),A===0?v+=w:A<g&&(v+=2*w)}for(let A=0;A<h.length;A++)h[A]=h[A]/v;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=h,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=y,f.mipInt.value=S-i;const _=this._sizeLods[r],M=3*_*(r>S-ra?r-S+ra:0),T=4*(this._cubeSize-_);Zl(n,M,T,3*_,2*_),l.setRenderTarget(n),l.render(p,nh)}}function pb(t){const e=[],n=[],i=[];let r=t;const s=t-ra+1+Y0.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);n.push(o);let l=1/o;a>t-ra?l=Y0[a-t+ra-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),d=-c,p=1+c,f=[d,d,p,d,p,p,d,d,p,p,d,p],m=6,y=6,x=3,g=2,h=1,v=new Float32Array(x*y*m),S=new Float32Array(g*y*m),_=new Float32Array(h*y*m);for(let T=0;T<m;T++){const A=T%3*2/3-1,b=T>2?0:-1,w=[A,b,0,A+2/3,b,0,A+2/3,b+1,0,A,b,0,A+2/3,b+1,0,A,b+1,0];v.set(w,x*y*T),S.set(f,g*y*T);const E=[T,T,T,T,T,T];_.set(E,h*y*T)}const M=new Ht;M.setAttribute("position",new jn(v,x)),M.setAttribute("uv",new jn(S,g)),M.setAttribute("faceIndex",new jn(_,h)),e.push(M),r>ra&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Q0(t,e,n){const i=new ei(t,e,n);return i.texture.mapping=Yu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Zl(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function mb(t,e,n){const i=new Float32Array(is),r=new L(0,1,0);return new cn({name:"SphericalGaussianBlur",defines:{n:is,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Um(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function J0(){return new cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Um(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function ev(){return new cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Um(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function Um(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function gb(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Lf||l===If,d=l===Ta||l===Ca;if(c||d){let p=e.get(o);const f=p!==void 0?p.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return n===null&&(n=new lp(t)),p=c?n.fromEquirectangular(o,p):n.fromCubemap(o,p),p.texture.pmremVersion=o.pmremVersion,e.set(o,p),p.texture;if(p!==void 0)return p.texture;{const m=o.image;return c&&m&&m.height>0||d&&m&&r(m)?(n===null&&(n=new lp(t)),p=c?n.fromEquirectangular(o):n.fromCubemap(o),p.texture.pmremVersion=o.pmremVersion,e.set(o,p),o.addEventListener("dispose",s),p.texture):null}}}return o}function r(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function vb(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&xo("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function xb(t,e,n,i){const r={},s=new WeakMap;function a(p){const f=p.target;f.index!==null&&e.remove(f.index);for(const y in f.attributes)e.remove(f.attributes[y]);for(const y in f.morphAttributes){const x=f.morphAttributes[y];for(let g=0,h=x.length;g<h;g++)e.remove(x[g])}f.removeEventListener("dispose",a),delete r[f.id];const m=s.get(f);m&&(e.remove(m),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function o(p,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,n.memory.geometries++),f}function l(p){const f=p.attributes;for(const y in f)e.update(f[y],t.ARRAY_BUFFER);const m=p.morphAttributes;for(const y in m){const x=m[y];for(let g=0,h=x.length;g<h;g++)e.update(x[g],t.ARRAY_BUFFER)}}function c(p){const f=[],m=p.index,y=p.attributes.position;let x=0;if(m!==null){const v=m.array;x=m.version;for(let S=0,_=v.length;S<_;S+=3){const M=v[S+0],T=v[S+1],A=v[S+2];f.push(M,T,T,A,A,M)}}else if(y!==void 0){const v=y.array;x=y.version;for(let S=0,_=v.length/3-1;S<_;S+=3){const M=S+0,T=S+1,A=S+2;f.push(M,T,T,A,A,M)}}else return;const g=new(s1(f)?u1:c1)(f,1);g.version=x;const h=s.get(p);h&&e.remove(h),s.set(p,g)}function d(p){const f=s.get(p);if(f){const m=p.index;m!==null&&f.version<m.version&&c(p)}else c(p);return s.get(p)}return{get:o,update:l,getWireframeAttribute:d}}function _b(t,e,n){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,m){t.drawElements(i,m,s,f*a),n.update(m,i,1)}function c(f,m,y){y!==0&&(t.drawElementsInstanced(i,m,s,f*a,y),n.update(m,i,y))}function d(f,m,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,f,0,y);let g=0;for(let h=0;h<y;h++)g+=m[h];n.update(g,i,1)}function p(f,m,y,x){if(y===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let h=0;h<f.length;h++)c(f[h]/a,m[h],x[h]);else{g.multiDrawElementsInstancedWEBGL(i,m,0,s,f,0,x,0,y);let h=0;for(let v=0;v<y;v++)h+=m[v]*x[v];n.update(h,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function yb(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Sb(t,e,n){const i=new WeakMap,r=new St;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=d!==void 0?d.length:0;let f=i.get(o);if(f===void 0||f.count!==p){let E=function(){b.dispose(),i.delete(o),o.removeEventListener("dispose",E)};var m=E;f!==void 0&&f.texture.dispose();const y=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let _=0;y===!0&&(_=1),x===!0&&(_=2),g===!0&&(_=3);let M=o.attributes.position.count*_,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const A=new Float32Array(M*T*4*p),b=new o1(A,M,T,p);b.type=Ci,b.needsUpdate=!0;const w=_*4;for(let N=0;N<p;N++){const V=h[N],z=v[N],Y=S[N],ne=M*T*4*N;for(let Q=0;Q<V.count;Q++){const K=Q*w;y===!0&&(r.fromBufferAttribute(V,Q),A[ne+K+0]=r.x,A[ne+K+1]=r.y,A[ne+K+2]=r.z,A[ne+K+3]=0),x===!0&&(r.fromBufferAttribute(z,Q),A[ne+K+4]=r.x,A[ne+K+5]=r.y,A[ne+K+6]=r.z,A[ne+K+7]=0),g===!0&&(r.fromBufferAttribute(Y,Q),A[ne+K+8]=r.x,A[ne+K+9]=r.y,A[ne+K+10]=r.z,A[ne+K+11]=Y.itemSize===4?r.w:1)}}f={count:p,texture:b,size:new pe(M,T)},i.set(o,f),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let y=0;for(let g=0;g<c.length;g++)y+=c[g];const x=o.morphTargetsRelative?1:1-y;l.getUniforms().setValue(t,"morphTargetBaseInfluence",x),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function Mb(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,d=l.geometry,p=e.get(l,d);if(r.get(p)!==c&&(e.update(p),r.set(p,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return p}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:a}}class m1 extends un{constructor(e,n,i,r,s,a,o,l,c,d=ha){if(d!==ha&&d!==ba)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===ha&&(i=vs),i===void 0&&d===ba&&(i=Aa),super(null,r,s,a,o,l,d,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=o!==void 0?o:Bn,this.minFilter=l!==void 0?l:Bn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const g1=new un,tv=new m1(1,1),v1=new o1,x1=new cT,_1=new f1,nv=[],iv=[],rv=new Float32Array(16),sv=new Float32Array(9),av=new Float32Array(4);function za(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=nv[r];if(s===void 0&&(s=new Float32Array(r),nv[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Gt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Wt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Zu(t,e){let n=iv[e];n===void 0&&(n=new Int32Array(e),iv[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Eb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function wb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Gt(n,e))return;t.uniform2fv(this.addr,e),Wt(n,e)}}function Tb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Gt(n,e))return;t.uniform3fv(this.addr,e),Wt(n,e)}}function Cb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Gt(n,e))return;t.uniform4fv(this.addr,e),Wt(n,e)}}function Ab(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Gt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Wt(n,e)}else{if(Gt(n,i))return;av.set(i),t.uniformMatrix2fv(this.addr,!1,av),Wt(n,i)}}function bb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Gt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Wt(n,e)}else{if(Gt(n,i))return;sv.set(i),t.uniformMatrix3fv(this.addr,!1,sv),Wt(n,i)}}function Rb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Gt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Wt(n,e)}else{if(Gt(n,i))return;rv.set(i),t.uniformMatrix4fv(this.addr,!1,rv),Wt(n,i)}}function Pb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Nb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Gt(n,e))return;t.uniform2iv(this.addr,e),Wt(n,e)}}function Lb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Gt(n,e))return;t.uniform3iv(this.addr,e),Wt(n,e)}}function Ib(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Gt(n,e))return;t.uniform4iv(this.addr,e),Wt(n,e)}}function Db(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function Ub(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Gt(n,e))return;t.uniform2uiv(this.addr,e),Wt(n,e)}}function kb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Gt(n,e))return;t.uniform3uiv(this.addr,e),Wt(n,e)}}function Fb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Gt(n,e))return;t.uniform4uiv(this.addr,e),Wt(n,e)}}function Ob(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(tv.compareFunction=r1,s=tv):s=g1,n.setTexture2D(e||s,r)}function zb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||x1,r)}function Bb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||_1,r)}function jb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||v1,r)}function Vb(t){switch(t){case 5126:return Eb;case 35664:return wb;case 35665:return Tb;case 35666:return Cb;case 35674:return Ab;case 35675:return bb;case 35676:return Rb;case 5124:case 35670:return Pb;case 35667:case 35671:return Nb;case 35668:case 35672:return Lb;case 35669:case 35673:return Ib;case 5125:return Db;case 36294:return Ub;case 36295:return kb;case 36296:return Fb;case 35678:case 36198:case 36298:case 36306:case 35682:return Ob;case 35679:case 36299:case 36307:return zb;case 35680:case 36300:case 36308:case 36293:return Bb;case 36289:case 36303:case 36311:case 36292:return jb}}function Hb(t,e){t.uniform1fv(this.addr,e)}function Gb(t,e){const n=za(e,this.size,2);t.uniform2fv(this.addr,n)}function Wb(t,e){const n=za(e,this.size,3);t.uniform3fv(this.addr,n)}function Xb(t,e){const n=za(e,this.size,4);t.uniform4fv(this.addr,n)}function $b(t,e){const n=za(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function qb(t,e){const n=za(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function Yb(t,e){const n=za(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function Kb(t,e){t.uniform1iv(this.addr,e)}function Zb(t,e){t.uniform2iv(this.addr,e)}function Qb(t,e){t.uniform3iv(this.addr,e)}function Jb(t,e){t.uniform4iv(this.addr,e)}function eR(t,e){t.uniform1uiv(this.addr,e)}function tR(t,e){t.uniform2uiv(this.addr,e)}function nR(t,e){t.uniform3uiv(this.addr,e)}function iR(t,e){t.uniform4uiv(this.addr,e)}function rR(t,e,n){const i=this.cache,r=e.length,s=Zu(n,r);Gt(i,s)||(t.uniform1iv(this.addr,s),Wt(i,s));for(let a=0;a!==r;++a)n.setTexture2D(e[a]||g1,s[a])}function sR(t,e,n){const i=this.cache,r=e.length,s=Zu(n,r);Gt(i,s)||(t.uniform1iv(this.addr,s),Wt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||x1,s[a])}function aR(t,e,n){const i=this.cache,r=e.length,s=Zu(n,r);Gt(i,s)||(t.uniform1iv(this.addr,s),Wt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||_1,s[a])}function oR(t,e,n){const i=this.cache,r=e.length,s=Zu(n,r);Gt(i,s)||(t.uniform1iv(this.addr,s),Wt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||v1,s[a])}function lR(t){switch(t){case 5126:return Hb;case 35664:return Gb;case 35665:return Wb;case 35666:return Xb;case 35674:return $b;case 35675:return qb;case 35676:return Yb;case 5124:case 35670:return Kb;case 35667:case 35671:return Zb;case 35668:case 35672:return Qb;case 35669:case 35673:return Jb;case 5125:return eR;case 36294:return tR;case 36295:return nR;case 36296:return iR;case 35678:case 36198:case 36298:case 36306:case 35682:return rR;case 35679:case 36299:case 36307:return sR;case 35680:case 36300:case 36308:case 36293:return aR;case 36289:case 36303:case 36311:case 36292:return oR}}class cR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Vb(n.type)}}class uR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=lR(n.type)}}class dR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const oh=/(\w+)(\])?(\[|\.)?/g;function ov(t,e){t.seq.push(e),t.map[e.id]=e}function hR(t,e,n){const i=t.name,r=i.length;for(oh.lastIndex=0;;){const s=oh.exec(i),a=oh.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){ov(n,c===void 0?new cR(o,t,e):new uR(o,t,e));break}else{let p=n.map[o];p===void 0&&(p=new dR(o),ov(n,p)),n=p}}}class Lc{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),a=e.getUniformLocation(n,s.name);hR(s,a,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function lv(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const fR=37297;let pR=0;function mR(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const cv=new Ke;function gR(t){st._getMatrix(cv,st.workingColorSpace,t);const e=`mat3( ${cv.elements.map(n=>n.toFixed(4))} )`;switch(st.getTransfer(t)){case Ku:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function uv(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+mR(t.getShaderSource(e),a)}else return r}function vR(t,e){const n=gR(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function xR(t,e){let n;switch(e){case Vy:n="Linear";break;case Hy:n="Reinhard";break;case Gy:n="Cineon";break;case Mm:n="ACESFilmic";break;case Wy:n="AgX";break;case Xy:n="Neutral";break;case A2:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ql=new L;function _R(){st.getLuminanceCoefficients(Ql);const t=Ql.x.toFixed(4),e=Ql.y.toFixed(4),n=Ql.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yR(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_o).join(`
`)}function SR(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function MR(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function _o(t){return t!==""}function dv(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function hv(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ER=/^[ \t]*#include +<([\w\d./]+)>/gm;function cp(t){return t.replace(ER,TR)}const wR=new Map;function TR(t,e){let n=Qe[e];if(n===void 0){const i=wR.get(e);if(i!==void 0)n=Qe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return cp(n)}const CR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fv(t){return t.replace(CR,AR)}function AR(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function pv(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function bR(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===zy?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===By?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Vi&&(e="SHADOWMAP_TYPE_VSM"),e}function RR(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ta:case Ca:e="ENVMAP_TYPE_CUBE";break;case Yu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function PR(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Ca:e="ENVMAP_MODE_REFRACTION";break}return e}function NR(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case jy:e="ENVMAP_BLENDING_MULTIPLY";break;case T2:e="ENVMAP_BLENDING_MIX";break;case C2:e="ENVMAP_BLENDING_ADD";break}return e}function LR(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function IR(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=bR(n),c=RR(n),d=PR(n),p=NR(n),f=LR(n),m=yR(n),y=SR(s),x=r.createProgram();let g,h,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(_o).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(_o).join(`
`),h.length>0&&(h+=`
`)):(g=[pv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_o).join(`
`),h=[pv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+p:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==kr?"#define TONE_MAPPING":"",n.toneMapping!==kr?Qe.tonemapping_pars_fragment:"",n.toneMapping!==kr?xR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,vR("linearToOutputTexel",n.outputColorSpace),_R(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(_o).join(`
`)),a=cp(a),a=dv(a,n),a=hv(a,n),o=cp(o),o=dv(o,n),o=hv(o,n),a=fv(a),o=fv(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",n.glslVersion===A0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===A0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const S=v+g+a,_=v+h+o,M=lv(r,r.VERTEX_SHADER,S),T=lv(r,r.FRAGMENT_SHADER,_);r.attachShader(x,M),r.attachShader(x,T),n.index0AttributeName!==void 0?r.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(N){if(t.debug.checkShaderErrors){const V=r.getProgramInfoLog(x).trim(),z=r.getShaderInfoLog(M).trim(),Y=r.getShaderInfoLog(T).trim();let ne=!0,Q=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(ne=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,x,M,T);else{const K=uv(r,M,"vertex"),I=uv(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+V+`
`+K+`
`+I)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(z===""||Y==="")&&(Q=!1);Q&&(N.diagnostics={runnable:ne,programLog:V,vertexShader:{log:z,prefix:g},fragmentShader:{log:Y,prefix:h}})}r.deleteShader(M),r.deleteShader(T),b=new Lc(r,x),w=MR(r,x)}let b;this.getUniforms=function(){return b===void 0&&A(this),b};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(x,fR)),E},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=pR++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=M,this.fragmentShader=T,this}let DR=0;class UR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new kR(e),n.set(e,i)),i}}class kR{constructor(e){this.id=DR++,this.code=e,this.usedTimes=0}}function FR(t,e,n,i,r,s,a){const o=new Lm,l=new UR,c=new Set,d=[],p=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return c.add(w),w===0?"uv":`uv${w}`}function g(w,E,N,V,z){const Y=V.fog,ne=z.geometry,Q=w.isMeshStandardMaterial?V.environment:null,K=(w.isMeshStandardMaterial?n:e).get(w.envMap||Q),I=K&&K.mapping===Yu?K.image.height:null,H=y[w.type];w.precision!==null&&(m=r.getMaxPrecision(w.precision),m!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",m,"instead."));const J=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,de=J!==void 0?J.length:0;let Ae=0;ne.morphAttributes.position!==void 0&&(Ae=1),ne.morphAttributes.normal!==void 0&&(Ae=2),ne.morphAttributes.color!==void 0&&(Ae=3);let We,Z,ae,xe;if(H){const Oe=Mi[H];We=Oe.vertexShader,Z=Oe.fragmentShader}else We=w.vertexShader,Z=w.fragmentShader,l.update(w),ae=l.getVertexShaderID(w),xe=l.getFragmentShaderID(w);const fe=t.getRenderTarget(),De=t.state.buffers.depth.getReversed(),je=z.isInstancedMesh===!0,ve=z.isBatchedMesh===!0,it=!!w.map,$e=!!w.matcap,ut=!!K,U=!!w.aoMap,Ce=!!w.lightMap,Me=!!w.bumpMap,Ue=!!w.normalMap,le=!!w.displacementMap,Ve=!!w.emissiveMap,be=!!w.metalnessMap,P=!!w.roughnessMap,C=w.anisotropy>0,j=w.clearcoat>0,ie=w.dispersion>0,re=w.iridescence>0,ee=w.sheen>0,Re=w.transmission>0,me=C&&!!w.anisotropyMap,Se=j&&!!w.clearcoatMap,et=j&&!!w.clearcoatNormalMap,ce=j&&!!w.clearcoatRoughnessMap,Ee=re&&!!w.iridescenceMap,Fe=re&&!!w.iridescenceThicknessMap,ze=ee&&!!w.sheenColorMap,we=ee&&!!w.sheenRoughnessMap,Xe=!!w.specularMap,Ge=!!w.specularColorMap,mt=!!w.specularIntensityMap,k=Re&&!!w.transmissionMap,q=Re&&!!w.thicknessMap,D=!!w.gradientMap,B=!!w.alphaMap,G=w.alphaTest>0,te=!!w.alphaHash,ue=!!w.extensions;let _e=kr;w.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(_e=t.toneMapping);const Ze={shaderID:H,shaderType:w.type,shaderName:w.name,vertexShader:We,fragmentShader:Z,defines:w.defines,customVertexShaderID:ae,customFragmentShaderID:xe,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:m,batching:ve,batchingColor:ve&&z._colorsTexture!==null,instancing:je,instancingColor:je&&z.instanceColor!==null,instancingMorph:je&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:fe===null?t.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:Ua,alphaToCoverage:!!w.alphaToCoverage,map:it,matcap:$e,envMap:ut,envMapMode:ut&&K.mapping,envMapCubeUVHeight:I,aoMap:U,lightMap:Ce,bumpMap:Me,normalMap:Ue,displacementMap:f&&le,emissiveMap:Ve,normalMapObjectSpace:Ue&&w.normalMapType===N2,normalMapTangentSpace:Ue&&w.normalMapType===i1,metalnessMap:be,roughnessMap:P,anisotropy:C,anisotropyMap:me,clearcoat:j,clearcoatMap:Se,clearcoatNormalMap:et,clearcoatRoughnessMap:ce,dispersion:ie,iridescence:re,iridescenceMap:Ee,iridescenceThicknessMap:Fe,sheen:ee,sheenColorMap:ze,sheenRoughnessMap:we,specularMap:Xe,specularColorMap:Ge,specularIntensityMap:mt,transmission:Re,transmissionMap:k,thicknessMap:q,gradientMap:D,opaque:w.transparent===!1&&w.blending===da&&w.alphaToCoverage===!1,alphaMap:B,alphaTest:G,alphaHash:te,combine:w.combine,mapUv:it&&x(w.map.channel),aoMapUv:U&&x(w.aoMap.channel),lightMapUv:Ce&&x(w.lightMap.channel),bumpMapUv:Me&&x(w.bumpMap.channel),normalMapUv:Ue&&x(w.normalMap.channel),displacementMapUv:le&&x(w.displacementMap.channel),emissiveMapUv:Ve&&x(w.emissiveMap.channel),metalnessMapUv:be&&x(w.metalnessMap.channel),roughnessMapUv:P&&x(w.roughnessMap.channel),anisotropyMapUv:me&&x(w.anisotropyMap.channel),clearcoatMapUv:Se&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:et&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:Fe&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:we&&x(w.sheenRoughnessMap.channel),specularMapUv:Xe&&x(w.specularMap.channel),specularColorMapUv:Ge&&x(w.specularColorMap.channel),specularIntensityMapUv:mt&&x(w.specularIntensityMap.channel),transmissionMapUv:k&&x(w.transmissionMap.channel),thicknessMapUv:q&&x(w.thicknessMap.channel),alphaMapUv:B&&x(w.alphaMap.channel),vertexTangents:!!ne.attributes.tangent&&(Ue||C),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!ne.attributes.uv&&(it||B),fog:!!Y,useFog:w.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:De,skinning:z.isSkinnedMesh===!0,morphTargets:ne.morphAttributes.position!==void 0,morphNormals:ne.morphAttributes.normal!==void 0,morphColors:ne.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Ae,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:t.shadowMap.enabled&&N.length>0,shadowMapType:t.shadowMap.type,toneMapping:_e,decodeVideoTexture:it&&w.map.isVideoTexture===!0&&st.getTransfer(w.map.colorSpace)===vt,decodeVideoTextureEmissive:Ve&&w.emissiveMap.isVideoTexture===!0&&st.getTransfer(w.emissiveMap.colorSpace)===vt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===wi,flipSided:w.side===_n,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:ue&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ue&&w.extensions.multiDraw===!0||ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ze.vertexUv1s=c.has(1),Ze.vertexUv2s=c.has(2),Ze.vertexUv3s=c.has(3),c.clear(),Ze}function h(w){const E=[];if(w.shaderID?E.push(w.shaderID):(E.push(w.customVertexShaderID),E.push(w.customFragmentShaderID)),w.defines!==void 0)for(const N in w.defines)E.push(N),E.push(w.defines[N]);return w.isRawShaderMaterial===!1&&(v(E,w),S(E,w),E.push(t.outputColorSpace)),E.push(w.customProgramCacheKey),E.join()}function v(w,E){w.push(E.precision),w.push(E.outputColorSpace),w.push(E.envMapMode),w.push(E.envMapCubeUVHeight),w.push(E.mapUv),w.push(E.alphaMapUv),w.push(E.lightMapUv),w.push(E.aoMapUv),w.push(E.bumpMapUv),w.push(E.normalMapUv),w.push(E.displacementMapUv),w.push(E.emissiveMapUv),w.push(E.metalnessMapUv),w.push(E.roughnessMapUv),w.push(E.anisotropyMapUv),w.push(E.clearcoatMapUv),w.push(E.clearcoatNormalMapUv),w.push(E.clearcoatRoughnessMapUv),w.push(E.iridescenceMapUv),w.push(E.iridescenceThicknessMapUv),w.push(E.sheenColorMapUv),w.push(E.sheenRoughnessMapUv),w.push(E.specularMapUv),w.push(E.specularColorMapUv),w.push(E.specularIntensityMapUv),w.push(E.transmissionMapUv),w.push(E.thicknessMapUv),w.push(E.combine),w.push(E.fogExp2),w.push(E.sizeAttenuation),w.push(E.morphTargetsCount),w.push(E.morphAttributeCount),w.push(E.numDirLights),w.push(E.numPointLights),w.push(E.numSpotLights),w.push(E.numSpotLightMaps),w.push(E.numHemiLights),w.push(E.numRectAreaLights),w.push(E.numDirLightShadows),w.push(E.numPointLightShadows),w.push(E.numSpotLightShadows),w.push(E.numSpotLightShadowsWithMaps),w.push(E.numLightProbes),w.push(E.shadowMapType),w.push(E.toneMapping),w.push(E.numClippingPlanes),w.push(E.numClipIntersection),w.push(E.depthPacking)}function S(w,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reverseDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),w.push(o.mask)}function _(w){const E=y[w.type];let N;if(E){const V=Mi[E];N=Pa.clone(V.uniforms)}else N=w.uniforms;return N}function M(w,E){let N;for(let V=0,z=d.length;V<z;V++){const Y=d[V];if(Y.cacheKey===E){N=Y,++N.usedTimes;break}}return N===void 0&&(N=new IR(t,E,w,s),d.push(N)),N}function T(w){if(--w.usedTimes===0){const E=d.indexOf(w);d[E]=d[d.length-1],d.pop(),w.destroy()}}function A(w){l.remove(w)}function b(){l.dispose()}return{getParameters:g,getProgramCacheKey:h,getUniforms:_,acquireProgram:M,releaseProgram:T,releaseShaderCache:A,programs:d,dispose:b}}function OR(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function zR(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function mv(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function gv(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(p,f,m,y,x,g){let h=t[e];return h===void 0?(h={id:p.id,object:p,geometry:f,material:m,groupOrder:y,renderOrder:p.renderOrder,z:x,group:g},t[e]=h):(h.id=p.id,h.object=p,h.geometry=f,h.material=m,h.groupOrder=y,h.renderOrder=p.renderOrder,h.z=x,h.group=g),e++,h}function o(p,f,m,y,x,g){const h=a(p,f,m,y,x,g);m.transmission>0?i.push(h):m.transparent===!0?r.push(h):n.push(h)}function l(p,f,m,y,x,g){const h=a(p,f,m,y,x,g);m.transmission>0?i.unshift(h):m.transparent===!0?r.unshift(h):n.unshift(h)}function c(p,f){n.length>1&&n.sort(p||zR),i.length>1&&i.sort(f||mv),r.length>1&&r.sort(f||mv)}function d(){for(let p=e,f=t.length;p<f;p++){const m=t[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:d,sort:c}}function BR(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new gv,t.set(i,[a])):r>=s.length?(a=new gv,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function jR(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new L,color:new Be};break;case"SpotLight":n={position:new L,direction:new L,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new L,color:new Be,distance:0,decay:0};break;case"HemisphereLight":n={direction:new L,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":n={color:new Be,position:new L,halfWidth:new L,halfHeight:new L};break}return t[e.id]=n,n}}}function VR(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let HR=0;function GR(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function WR(t){const e=new jR,n=VR(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const r=new L,s=new pt,a=new pt;function o(c){let d=0,p=0,f=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let m=0,y=0,x=0,g=0,h=0,v=0,S=0,_=0,M=0,T=0,A=0;c.sort(GR);for(let w=0,E=c.length;w<E;w++){const N=c[w],V=N.color,z=N.intensity,Y=N.distance,ne=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)d+=V.r*z,p+=V.g*z,f+=V.b*z;else if(N.isLightProbe){for(let Q=0;Q<9;Q++)i.probe[Q].addScaledVector(N.sh.coefficients[Q],z);A++}else if(N.isDirectionalLight){const Q=e.get(N);if(Q.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const K=N.shadow,I=n.get(N);I.shadowIntensity=K.intensity,I.shadowBias=K.bias,I.shadowNormalBias=K.normalBias,I.shadowRadius=K.radius,I.shadowMapSize=K.mapSize,i.directionalShadow[m]=I,i.directionalShadowMap[m]=ne,i.directionalShadowMatrix[m]=N.shadow.matrix,v++}i.directional[m]=Q,m++}else if(N.isSpotLight){const Q=e.get(N);Q.position.setFromMatrixPosition(N.matrixWorld),Q.color.copy(V).multiplyScalar(z),Q.distance=Y,Q.coneCos=Math.cos(N.angle),Q.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Q.decay=N.decay,i.spot[x]=Q;const K=N.shadow;if(N.map&&(i.spotLightMap[M]=N.map,M++,K.updateMatrices(N),N.castShadow&&T++),i.spotLightMatrix[x]=K.matrix,N.castShadow){const I=n.get(N);I.shadowIntensity=K.intensity,I.shadowBias=K.bias,I.shadowNormalBias=K.normalBias,I.shadowRadius=K.radius,I.shadowMapSize=K.mapSize,i.spotShadow[x]=I,i.spotShadowMap[x]=ne,_++}x++}else if(N.isRectAreaLight){const Q=e.get(N);Q.color.copy(V).multiplyScalar(z),Q.halfWidth.set(N.width*.5,0,0),Q.halfHeight.set(0,N.height*.5,0),i.rectArea[g]=Q,g++}else if(N.isPointLight){const Q=e.get(N);if(Q.color.copy(N.color).multiplyScalar(N.intensity),Q.distance=N.distance,Q.decay=N.decay,N.castShadow){const K=N.shadow,I=n.get(N);I.shadowIntensity=K.intensity,I.shadowBias=K.bias,I.shadowNormalBias=K.normalBias,I.shadowRadius=K.radius,I.shadowMapSize=K.mapSize,I.shadowCameraNear=K.camera.near,I.shadowCameraFar=K.camera.far,i.pointShadow[y]=I,i.pointShadowMap[y]=ne,i.pointShadowMatrix[y]=N.shadow.matrix,S++}i.point[y]=Q,y++}else if(N.isHemisphereLight){const Q=e.get(N);Q.skyColor.copy(N.color).multiplyScalar(z),Q.groundColor.copy(N.groundColor).multiplyScalar(z),i.hemi[h]=Q,h++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=f;const b=i.hash;(b.directionalLength!==m||b.pointLength!==y||b.spotLength!==x||b.rectAreaLength!==g||b.hemiLength!==h||b.numDirectionalShadows!==v||b.numPointShadows!==S||b.numSpotShadows!==_||b.numSpotMaps!==M||b.numLightProbes!==A)&&(i.directional.length=m,i.spot.length=x,i.rectArea.length=g,i.point.length=y,i.hemi.length=h,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=_+M-T,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=A,b.directionalLength=m,b.pointLength=y,b.spotLength=x,b.rectAreaLength=g,b.hemiLength=h,b.numDirectionalShadows=v,b.numPointShadows=S,b.numSpotShadows=_,b.numSpotMaps=M,b.numLightProbes=A,i.version=HR++)}function l(c,d){let p=0,f=0,m=0,y=0,x=0;const g=d.matrixWorldInverse;for(let h=0,v=c.length;h<v;h++){const S=c[h];if(S.isDirectionalLight){const _=i.directional[p];_.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(g),p++}else if(S.isSpotLight){const _=i.spot[m];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(g),m++}else if(S.isRectAreaLight){const _=i.rectArea[y];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(g),a.identity(),s.copy(S.matrixWorld),s.premultiply(g),a.extractRotation(s),_.halfWidth.set(S.width*.5,0,0),_.halfHeight.set(0,S.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),y++}else if(S.isPointLight){const _=i.point[f];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(g),f++}else if(S.isHemisphereLight){const _=i.hemi[x];_.direction.setFromMatrixPosition(S.matrixWorld),_.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:i}}function vv(t){const e=new WR(t),n=[],i=[];function r(d){c.camera=d,n.length=0,i.length=0}function s(d){n.push(d)}function a(d){i.push(d)}function o(){e.setup(n)}function l(d){e.setupView(n,d)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function XR(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new vv(t),e.set(r,[o])):s>=a.length?(o=new vv(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}class $R extends Ms{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=R2,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qR extends Ms{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const YR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,KR=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ZR(t,e,n){let i=new Im;const r=new pe,s=new pe,a=new St,o=new $R({depthPacking:P2}),l=new qR,c={},d=n.maxTextureSize,p={[Br]:_n,[_n]:Br,[wi]:wi},f=new cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:YR,fragmentShader:KR}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const y=new Ht;y.setAttribute("position",new jn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Jt(y,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zy;let h=this.type;this.render=function(T,A,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const w=t.getRenderTarget(),E=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),V=t.state;V.setBlending(Ji),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const z=h!==Vi&&this.type===Vi,Y=h===Vi&&this.type!==Vi;for(let ne=0,Q=T.length;ne<Q;ne++){const K=T[ne],I=K.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;r.copy(I.mapSize);const H=I.getFrameExtents();if(r.multiply(H),s.copy(I.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/H.x),r.x=s.x*H.x,I.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/H.y),r.y=s.y*H.y,I.mapSize.y=s.y)),I.map===null||z===!0||Y===!0){const de=this.type!==Vi?{minFilter:Bn,magFilter:Bn}:{};I.map!==null&&I.map.dispose(),I.map=new ei(r.x,r.y,de),I.map.texture.name=K.name+".shadowMap",I.camera.updateProjectionMatrix()}t.setRenderTarget(I.map),t.clear();const J=I.getViewportCount();for(let de=0;de<J;de++){const Ae=I.getViewport(de);a.set(s.x*Ae.x,s.y*Ae.y,s.x*Ae.z,s.y*Ae.w),V.viewport(a),I.updateMatrices(K,de),i=I.getFrustum(),_(A,b,I.camera,K,this.type)}I.isPointLightShadow!==!0&&this.type===Vi&&v(I,b),I.needsUpdate=!1}h=this.type,g.needsUpdate=!1,t.setRenderTarget(w,E,N)};function v(T,A){const b=e.update(x);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ei(r.x,r.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,t.setRenderTarget(T.mapPass),t.clear(),t.renderBufferDirect(A,null,b,f,x,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,t.setRenderTarget(T.map),t.clear(),t.renderBufferDirect(A,null,b,m,x,null)}function S(T,A,b,w){let E=null;const N=b.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)E=N;else if(E=b.isPointLight===!0?l:o,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const V=E.uuid,z=A.uuid;let Y=c[V];Y===void 0&&(Y={},c[V]=Y);let ne=Y[z];ne===void 0&&(ne=E.clone(),Y[z]=ne,A.addEventListener("dispose",M)),E=ne}if(E.visible=A.visible,E.wireframe=A.wireframe,w===Vi?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:p[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,b.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const V=t.properties.get(E);V.light=b}return E}function _(T,A,b,w,E){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===Vi)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,T.matrixWorld);const z=e.update(T),Y=T.material;if(Array.isArray(Y)){const ne=z.groups;for(let Q=0,K=ne.length;Q<K;Q++){const I=ne[Q],H=Y[I.materialIndex];if(H&&H.visible){const J=S(T,H,w,E);T.onBeforeShadow(t,T,A,b,z,J,I),t.renderBufferDirect(b,null,z,J,T,I),T.onAfterShadow(t,T,A,b,z,J,I)}}}else if(Y.visible){const ne=S(T,Y,w,E);T.onBeforeShadow(t,T,A,b,z,ne,null),t.renderBufferDirect(b,null,z,ne,T,null),T.onAfterShadow(t,T,A,b,z,ne,null)}}const V=T.children;for(let z=0,Y=V.length;z<Y;z++)_(V[z],A,b,w,E)}function M(T){T.target.removeEventListener("dispose",M);for(const b in c){const w=c[b],E=T.target.uuid;E in w&&(w[E].dispose(),delete w[E])}}}const QR={[Tf]:Cf,[Af]:Pf,[bf]:Nf,[wa]:Rf,[Cf]:Tf,[Pf]:Af,[Nf]:bf,[Rf]:wa};function JR(t,e){function n(){let k=!1;const q=new St;let D=null;const B=new St(0,0,0,0);return{setMask:function(G){D!==G&&!k&&(t.colorMask(G,G,G,G),D=G)},setLocked:function(G){k=G},setClear:function(G,te,ue,_e,Ze){Ze===!0&&(G*=_e,te*=_e,ue*=_e),q.set(G,te,ue,_e),B.equals(q)===!1&&(t.clearColor(G,te,ue,_e),B.copy(q))},reset:function(){k=!1,D=null,B.set(-1,0,0,0)}}}function i(){let k=!1,q=!1,D=null,B=null,G=null;return{setReversed:function(te){if(q!==te){const ue=e.get("EXT_clip_control");q?ue.clipControlEXT(ue.LOWER_LEFT_EXT,ue.ZERO_TO_ONE_EXT):ue.clipControlEXT(ue.LOWER_LEFT_EXT,ue.NEGATIVE_ONE_TO_ONE_EXT);const _e=G;G=null,this.setClear(_e)}q=te},getReversed:function(){return q},setTest:function(te){te?fe(t.DEPTH_TEST):De(t.DEPTH_TEST)},setMask:function(te){D!==te&&!k&&(t.depthMask(te),D=te)},setFunc:function(te){if(q&&(te=QR[te]),B!==te){switch(te){case Tf:t.depthFunc(t.NEVER);break;case Cf:t.depthFunc(t.ALWAYS);break;case Af:t.depthFunc(t.LESS);break;case wa:t.depthFunc(t.LEQUAL);break;case bf:t.depthFunc(t.EQUAL);break;case Rf:t.depthFunc(t.GEQUAL);break;case Pf:t.depthFunc(t.GREATER);break;case Nf:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}B=te}},setLocked:function(te){k=te},setClear:function(te){G!==te&&(q&&(te=1-te),t.clearDepth(te),G=te)},reset:function(){k=!1,D=null,B=null,G=null,q=!1}}}function r(){let k=!1,q=null,D=null,B=null,G=null,te=null,ue=null,_e=null,Ze=null;return{setTest:function(Oe){k||(Oe?fe(t.STENCIL_TEST):De(t.STENCIL_TEST))},setMask:function(Oe){q!==Oe&&!k&&(t.stencilMask(Oe),q=Oe)},setFunc:function(Oe,rt,at){(D!==Oe||B!==rt||G!==at)&&(t.stencilFunc(Oe,rt,at),D=Oe,B=rt,G=at)},setOp:function(Oe,rt,at){(te!==Oe||ue!==rt||_e!==at)&&(t.stencilOp(Oe,rt,at),te=Oe,ue=rt,_e=at)},setLocked:function(Oe){k=Oe},setClear:function(Oe){Ze!==Oe&&(t.clearStencil(Oe),Ze=Oe)},reset:function(){k=!1,q=null,D=null,B=null,G=null,te=null,ue=null,_e=null,Ze=null}}}const s=new n,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let d={},p={},f=new WeakMap,m=[],y=null,x=!1,g=null,h=null,v=null,S=null,_=null,M=null,T=null,A=new Be(0,0,0),b=0,w=!1,E=null,N=null,V=null,z=null,Y=null;const ne=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,K=0;const I=t.getParameter(t.VERSION);I.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(I)[1]),Q=K>=1):I.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),Q=K>=2);let H=null,J={};const de=t.getParameter(t.SCISSOR_BOX),Ae=t.getParameter(t.VIEWPORT),We=new St().fromArray(de),Z=new St().fromArray(Ae);function ae(k,q,D,B){const G=new Uint8Array(4),te=t.createTexture();t.bindTexture(k,te),t.texParameteri(k,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(k,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let ue=0;ue<D;ue++)k===t.TEXTURE_3D||k===t.TEXTURE_2D_ARRAY?t.texImage3D(q,0,t.RGBA,1,1,B,0,t.RGBA,t.UNSIGNED_BYTE,G):t.texImage2D(q+ue,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,G);return te}const xe={};xe[t.TEXTURE_2D]=ae(t.TEXTURE_2D,t.TEXTURE_2D,1),xe[t.TEXTURE_CUBE_MAP]=ae(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[t.TEXTURE_2D_ARRAY]=ae(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),xe[t.TEXTURE_3D]=ae(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),fe(t.DEPTH_TEST),a.setFunc(wa),Me(!1),Ue(E0),fe(t.CULL_FACE),U(Ji);function fe(k){d[k]!==!0&&(t.enable(k),d[k]=!0)}function De(k){d[k]!==!1&&(t.disable(k),d[k]=!1)}function je(k,q){return p[k]!==q?(t.bindFramebuffer(k,q),p[k]=q,k===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=q),k===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=q),!0):!1}function ve(k,q){let D=m,B=!1;if(k){D=f.get(q),D===void 0&&(D=[],f.set(q,D));const G=k.textures;if(D.length!==G.length||D[0]!==t.COLOR_ATTACHMENT0){for(let te=0,ue=G.length;te<ue;te++)D[te]=t.COLOR_ATTACHMENT0+te;D.length=G.length,B=!0}}else D[0]!==t.BACK&&(D[0]=t.BACK,B=!0);B&&t.drawBuffers(D)}function it(k){return y!==k?(t.useProgram(k),y=k,!0):!1}const $e={[ns]:t.FUNC_ADD,[l2]:t.FUNC_SUBTRACT,[c2]:t.FUNC_REVERSE_SUBTRACT};$e[u2]=t.MIN,$e[d2]=t.MAX;const ut={[h2]:t.ZERO,[f2]:t.ONE,[p2]:t.SRC_COLOR,[Ef]:t.SRC_ALPHA,[y2]:t.SRC_ALPHA_SATURATE,[x2]:t.DST_COLOR,[g2]:t.DST_ALPHA,[m2]:t.ONE_MINUS_SRC_COLOR,[wf]:t.ONE_MINUS_SRC_ALPHA,[_2]:t.ONE_MINUS_DST_COLOR,[v2]:t.ONE_MINUS_DST_ALPHA,[S2]:t.CONSTANT_COLOR,[M2]:t.ONE_MINUS_CONSTANT_COLOR,[E2]:t.CONSTANT_ALPHA,[w2]:t.ONE_MINUS_CONSTANT_ALPHA};function U(k,q,D,B,G,te,ue,_e,Ze,Oe){if(k===Ji){x===!0&&(De(t.BLEND),x=!1);return}if(x===!1&&(fe(t.BLEND),x=!0),k!==o2){if(k!==g||Oe!==w){if((h!==ns||_!==ns)&&(t.blendEquation(t.FUNC_ADD),h=ns,_=ns),Oe)switch(k){case da:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case fu:t.blendFunc(t.ONE,t.ONE);break;case w0:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case T0:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case da:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case fu:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case w0:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case T0:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}v=null,S=null,M=null,T=null,A.set(0,0,0),b=0,g=k,w=Oe}return}G=G||q,te=te||D,ue=ue||B,(q!==h||G!==_)&&(t.blendEquationSeparate($e[q],$e[G]),h=q,_=G),(D!==v||B!==S||te!==M||ue!==T)&&(t.blendFuncSeparate(ut[D],ut[B],ut[te],ut[ue]),v=D,S=B,M=te,T=ue),(_e.equals(A)===!1||Ze!==b)&&(t.blendColor(_e.r,_e.g,_e.b,Ze),A.copy(_e),b=Ze),g=k,w=!1}function Ce(k,q){k.side===wi?De(t.CULL_FACE):fe(t.CULL_FACE);let D=k.side===_n;q&&(D=!D),Me(D),k.blending===da&&k.transparent===!1?U(Ji):U(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),s.setMask(k.colorWrite);const B=k.stencilWrite;o.setTest(B),B&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ve(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?fe(t.SAMPLE_ALPHA_TO_COVERAGE):De(t.SAMPLE_ALPHA_TO_COVERAGE)}function Me(k){E!==k&&(k?t.frontFace(t.CW):t.frontFace(t.CCW),E=k)}function Ue(k){k!==s2?(fe(t.CULL_FACE),k!==N&&(k===E0?t.cullFace(t.BACK):k===a2?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):De(t.CULL_FACE),N=k}function le(k){k!==V&&(Q&&t.lineWidth(k),V=k)}function Ve(k,q,D){k?(fe(t.POLYGON_OFFSET_FILL),(z!==q||Y!==D)&&(t.polygonOffset(q,D),z=q,Y=D)):De(t.POLYGON_OFFSET_FILL)}function be(k){k?fe(t.SCISSOR_TEST):De(t.SCISSOR_TEST)}function P(k){k===void 0&&(k=t.TEXTURE0+ne-1),H!==k&&(t.activeTexture(k),H=k)}function C(k,q,D){D===void 0&&(H===null?D=t.TEXTURE0+ne-1:D=H);let B=J[D];B===void 0&&(B={type:void 0,texture:void 0},J[D]=B),(B.type!==k||B.texture!==q)&&(H!==D&&(t.activeTexture(D),H=D),t.bindTexture(k,q||xe[k]),B.type=k,B.texture=q)}function j(){const k=J[H];k!==void 0&&k.type!==void 0&&(t.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ie(){try{t.compressedTexImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function re(){try{t.compressedTexImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ee(){try{t.texSubImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Re(){try{t.texSubImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function me(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Se(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function et(){try{t.texStorage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ce(){try{t.texStorage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ee(){try{t.texImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Fe(){try{t.texImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ze(k){We.equals(k)===!1&&(t.scissor(k.x,k.y,k.z,k.w),We.copy(k))}function we(k){Z.equals(k)===!1&&(t.viewport(k.x,k.y,k.z,k.w),Z.copy(k))}function Xe(k,q){let D=c.get(q);D===void 0&&(D=new WeakMap,c.set(q,D));let B=D.get(k);B===void 0&&(B=t.getUniformBlockIndex(q,k.name),D.set(k,B))}function Ge(k,q){const B=c.get(q).get(k);l.get(q)!==B&&(t.uniformBlockBinding(q,B,k.__bindingPointIndex),l.set(q,B))}function mt(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),d={},H=null,J={},p={},f=new WeakMap,m=[],y=null,x=!1,g=null,h=null,v=null,S=null,_=null,M=null,T=null,A=new Be(0,0,0),b=0,w=!1,E=null,N=null,V=null,z=null,Y=null,We.set(0,0,t.canvas.width,t.canvas.height),Z.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:fe,disable:De,bindFramebuffer:je,drawBuffers:ve,useProgram:it,setBlending:U,setMaterial:Ce,setFlipSided:Me,setCullFace:Ue,setLineWidth:le,setPolygonOffset:Ve,setScissorTest:be,activeTexture:P,bindTexture:C,unbindTexture:j,compressedTexImage2D:ie,compressedTexImage3D:re,texImage2D:Ee,texImage3D:Fe,updateUBOMapping:Xe,uniformBlockBinding:Ge,texStorage2D:et,texStorage3D:ce,texSubImage2D:ee,texSubImage3D:Re,compressedTexSubImage2D:me,compressedTexSubImage3D:Se,scissor:ze,viewport:we,reset:mt}}function xv(t,e,n,i){const r=eP(i);switch(n){case Zy:return t*e;case Jy:return t*e;case e1:return t*e*2;case Cm:return t*e/r.components*r.byteLength;case Am:return t*e/r.components*r.byteLength;case t1:return t*e*2/r.components*r.byteLength;case bm:return t*e*2/r.components*r.byteLength;case Qy:return t*e*3/r.components*r.byteLength;case mi:return t*e*4/r.components*r.byteLength;case Rm:return t*e*4/r.components*r.byteLength;case Ac:case bc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Rc:case Pc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case kf:case Of:return Math.max(t,16)*Math.max(e,8)/4;case Uf:case Ff:return Math.max(t,8)*Math.max(e,8)/2;case zf:case Bf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case jf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Vf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Hf:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Gf:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Wf:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Xf:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case $f:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case qf:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Yf:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Kf:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Zf:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Qf:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Jf:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case ep:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case tp:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Nc:case np:case ip:return Math.ceil(t/4)*Math.ceil(e/4)*16;case n1:case rp:return Math.ceil(t/4)*Math.ceil(e/4)*8;case sp:case ap:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function eP(t){switch(t){case or:case qy:return{byteLength:1,components:1};case Jo:case Yy:case Ni:return{byteLength:2,components:1};case wm:case Tm:return{byteLength:2,components:4};case vs:case Em:case Ci:return{byteLength:4,components:1};case Ky:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function tP(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new pe,d=new WeakMap;let p;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(P,C){return m?new OffscreenCanvas(P,C):gu("canvas")}function x(P,C,j){let ie=1;const re=be(P);if((re.width>j||re.height>j)&&(ie=j/Math.max(re.width,re.height)),ie<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ee=Math.floor(ie*re.width),Re=Math.floor(ie*re.height);p===void 0&&(p=y(ee,Re));const me=C?y(ee,Re):p;return me.width=ee,me.height=Re,me.getContext("2d").drawImage(P,0,0,ee,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+ee+"x"+Re+")."),me}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),P;return P}function g(P){return P.generateMipmaps}function h(P){t.generateMipmap(P)}function v(P){return P.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?t.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function S(P,C,j,ie,re=!1){if(P!==null){if(t[P]!==void 0)return t[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ee=C;if(C===t.RED&&(j===t.FLOAT&&(ee=t.R32F),j===t.HALF_FLOAT&&(ee=t.R16F),j===t.UNSIGNED_BYTE&&(ee=t.R8)),C===t.RED_INTEGER&&(j===t.UNSIGNED_BYTE&&(ee=t.R8UI),j===t.UNSIGNED_SHORT&&(ee=t.R16UI),j===t.UNSIGNED_INT&&(ee=t.R32UI),j===t.BYTE&&(ee=t.R8I),j===t.SHORT&&(ee=t.R16I),j===t.INT&&(ee=t.R32I)),C===t.RG&&(j===t.FLOAT&&(ee=t.RG32F),j===t.HALF_FLOAT&&(ee=t.RG16F),j===t.UNSIGNED_BYTE&&(ee=t.RG8)),C===t.RG_INTEGER&&(j===t.UNSIGNED_BYTE&&(ee=t.RG8UI),j===t.UNSIGNED_SHORT&&(ee=t.RG16UI),j===t.UNSIGNED_INT&&(ee=t.RG32UI),j===t.BYTE&&(ee=t.RG8I),j===t.SHORT&&(ee=t.RG16I),j===t.INT&&(ee=t.RG32I)),C===t.RGB_INTEGER&&(j===t.UNSIGNED_BYTE&&(ee=t.RGB8UI),j===t.UNSIGNED_SHORT&&(ee=t.RGB16UI),j===t.UNSIGNED_INT&&(ee=t.RGB32UI),j===t.BYTE&&(ee=t.RGB8I),j===t.SHORT&&(ee=t.RGB16I),j===t.INT&&(ee=t.RGB32I)),C===t.RGBA_INTEGER&&(j===t.UNSIGNED_BYTE&&(ee=t.RGBA8UI),j===t.UNSIGNED_SHORT&&(ee=t.RGBA16UI),j===t.UNSIGNED_INT&&(ee=t.RGBA32UI),j===t.BYTE&&(ee=t.RGBA8I),j===t.SHORT&&(ee=t.RGBA16I),j===t.INT&&(ee=t.RGBA32I)),C===t.RGB&&j===t.UNSIGNED_INT_5_9_9_9_REV&&(ee=t.RGB9_E5),C===t.RGBA){const Re=re?Ku:st.getTransfer(ie);j===t.FLOAT&&(ee=t.RGBA32F),j===t.HALF_FLOAT&&(ee=t.RGBA16F),j===t.UNSIGNED_BYTE&&(ee=Re===vt?t.SRGB8_ALPHA8:t.RGBA8),j===t.UNSIGNED_SHORT_4_4_4_4&&(ee=t.RGBA4),j===t.UNSIGNED_SHORT_5_5_5_1&&(ee=t.RGB5_A1)}return(ee===t.R16F||ee===t.R32F||ee===t.RG16F||ee===t.RG32F||ee===t.RGBA16F||ee===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function _(P,C){let j;return P?C===null||C===vs||C===Aa?j=t.DEPTH24_STENCIL8:C===Ci?j=t.DEPTH32F_STENCIL8:C===Jo&&(j=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===vs||C===Aa?j=t.DEPTH_COMPONENT24:C===Ci?j=t.DEPTH_COMPONENT32F:C===Jo&&(j=t.DEPTH_COMPONENT16),j}function M(P,C){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Bn&&P.minFilter!==Ti?Math.log2(Math.max(C.width,C.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?C.mipmaps.length:1}function T(P){const C=P.target;C.removeEventListener("dispose",T),b(C),C.isVideoTexture&&d.delete(C)}function A(P){const C=P.target;C.removeEventListener("dispose",A),E(C)}function b(P){const C=i.get(P);if(C.__webglInit===void 0)return;const j=P.source,ie=f.get(j);if(ie){const re=ie[C.__cacheKey];re.usedTimes--,re.usedTimes===0&&w(P),Object.keys(ie).length===0&&f.delete(j)}i.remove(P)}function w(P){const C=i.get(P);t.deleteTexture(C.__webglTexture);const j=P.source,ie=f.get(j);delete ie[C.__cacheKey],a.memory.textures--}function E(P){const C=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(C.__webglFramebuffer[ie]))for(let re=0;re<C.__webglFramebuffer[ie].length;re++)t.deleteFramebuffer(C.__webglFramebuffer[ie][re]);else t.deleteFramebuffer(C.__webglFramebuffer[ie]);C.__webglDepthbuffer&&t.deleteRenderbuffer(C.__webglDepthbuffer[ie])}else{if(Array.isArray(C.__webglFramebuffer))for(let ie=0;ie<C.__webglFramebuffer.length;ie++)t.deleteFramebuffer(C.__webglFramebuffer[ie]);else t.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&t.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&t.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let ie=0;ie<C.__webglColorRenderbuffer.length;ie++)C.__webglColorRenderbuffer[ie]&&t.deleteRenderbuffer(C.__webglColorRenderbuffer[ie]);C.__webglDepthRenderbuffer&&t.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const j=P.textures;for(let ie=0,re=j.length;ie<re;ie++){const ee=i.get(j[ie]);ee.__webglTexture&&(t.deleteTexture(ee.__webglTexture),a.memory.textures--),i.remove(j[ie])}i.remove(P)}let N=0;function V(){N=0}function z(){const P=N;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),N+=1,P}function Y(P){const C=[];return C.push(P.wrapS),C.push(P.wrapT),C.push(P.wrapR||0),C.push(P.magFilter),C.push(P.minFilter),C.push(P.anisotropy),C.push(P.internalFormat),C.push(P.format),C.push(P.type),C.push(P.generateMipmaps),C.push(P.premultiplyAlpha),C.push(P.flipY),C.push(P.unpackAlignment),C.push(P.colorSpace),C.join()}function ne(P,C){const j=i.get(P);if(P.isVideoTexture&&le(P),P.isRenderTargetTexture===!1&&P.version>0&&j.__version!==P.version){const ie=P.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(j,P,C);return}}n.bindTexture(t.TEXTURE_2D,j.__webglTexture,t.TEXTURE0+C)}function Q(P,C){const j=i.get(P);if(P.version>0&&j.__version!==P.version){Z(j,P,C);return}n.bindTexture(t.TEXTURE_2D_ARRAY,j.__webglTexture,t.TEXTURE0+C)}function K(P,C){const j=i.get(P);if(P.version>0&&j.__version!==P.version){Z(j,P,C);return}n.bindTexture(t.TEXTURE_3D,j.__webglTexture,t.TEXTURE0+C)}function I(P,C){const j=i.get(P);if(P.version>0&&j.__version!==P.version){ae(j,P,C);return}n.bindTexture(t.TEXTURE_CUBE_MAP,j.__webglTexture,t.TEXTURE0+C)}const H={[pu]:t.REPEAT,[os]:t.CLAMP_TO_EDGE,[Df]:t.MIRRORED_REPEAT},J={[Bn]:t.NEAREST,[b2]:t.NEAREST_MIPMAP_NEAREST,[Ll]:t.NEAREST_MIPMAP_LINEAR,[Ti]:t.LINEAR,[Ud]:t.LINEAR_MIPMAP_NEAREST,[ls]:t.LINEAR_MIPMAP_LINEAR},de={[L2]:t.NEVER,[O2]:t.ALWAYS,[I2]:t.LESS,[r1]:t.LEQUAL,[D2]:t.EQUAL,[F2]:t.GEQUAL,[U2]:t.GREATER,[k2]:t.NOTEQUAL};function Ae(P,C){if(C.type===Ci&&e.has("OES_texture_float_linear")===!1&&(C.magFilter===Ti||C.magFilter===Ud||C.magFilter===Ll||C.magFilter===ls||C.minFilter===Ti||C.minFilter===Ud||C.minFilter===Ll||C.minFilter===ls)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(P,t.TEXTURE_WRAP_S,H[C.wrapS]),t.texParameteri(P,t.TEXTURE_WRAP_T,H[C.wrapT]),(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)&&t.texParameteri(P,t.TEXTURE_WRAP_R,H[C.wrapR]),t.texParameteri(P,t.TEXTURE_MAG_FILTER,J[C.magFilter]),t.texParameteri(P,t.TEXTURE_MIN_FILTER,J[C.minFilter]),C.compareFunction&&(t.texParameteri(P,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(P,t.TEXTURE_COMPARE_FUNC,de[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===Bn||C.minFilter!==Ll&&C.minFilter!==ls||C.type===Ci&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||i.get(C).__currentAnisotropy){const j=e.get("EXT_texture_filter_anisotropic");t.texParameterf(P,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,r.getMaxAnisotropy())),i.get(C).__currentAnisotropy=C.anisotropy}}}function We(P,C){let j=!1;P.__webglInit===void 0&&(P.__webglInit=!0,C.addEventListener("dispose",T));const ie=C.source;let re=f.get(ie);re===void 0&&(re={},f.set(ie,re));const ee=Y(C);if(ee!==P.__cacheKey){re[ee]===void 0&&(re[ee]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,j=!0),re[ee].usedTimes++;const Re=re[P.__cacheKey];Re!==void 0&&(re[P.__cacheKey].usedTimes--,Re.usedTimes===0&&w(C)),P.__cacheKey=ee,P.__webglTexture=re[ee].texture}return j}function Z(P,C,j){let ie=t.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(ie=t.TEXTURE_2D_ARRAY),C.isData3DTexture&&(ie=t.TEXTURE_3D);const re=We(P,C),ee=C.source;n.bindTexture(ie,P.__webglTexture,t.TEXTURE0+j);const Re=i.get(ee);if(ee.version!==Re.__version||re===!0){n.activeTexture(t.TEXTURE0+j);const me=st.getPrimaries(st.workingColorSpace),Se=C.colorSpace===Tr?null:st.getPrimaries(C.colorSpace),et=C.colorSpace===Tr||me===Se?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,C.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,C.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);let ce=x(C.image,!1,r.maxTextureSize);ce=Ve(C,ce);const Ee=s.convert(C.format,C.colorSpace),Fe=s.convert(C.type);let ze=S(C.internalFormat,Ee,Fe,C.colorSpace,C.isVideoTexture);Ae(ie,C);let we;const Xe=C.mipmaps,Ge=C.isVideoTexture!==!0,mt=Re.__version===void 0||re===!0,k=ee.dataReady,q=M(C,ce);if(C.isDepthTexture)ze=_(C.format===ba,C.type),mt&&(Ge?n.texStorage2D(t.TEXTURE_2D,1,ze,ce.width,ce.height):n.texImage2D(t.TEXTURE_2D,0,ze,ce.width,ce.height,0,Ee,Fe,null));else if(C.isDataTexture)if(Xe.length>0){Ge&&mt&&n.texStorage2D(t.TEXTURE_2D,q,ze,Xe[0].width,Xe[0].height);for(let D=0,B=Xe.length;D<B;D++)we=Xe[D],Ge?k&&n.texSubImage2D(t.TEXTURE_2D,D,0,0,we.width,we.height,Ee,Fe,we.data):n.texImage2D(t.TEXTURE_2D,D,ze,we.width,we.height,0,Ee,Fe,we.data);C.generateMipmaps=!1}else Ge?(mt&&n.texStorage2D(t.TEXTURE_2D,q,ze,ce.width,ce.height),k&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ce.width,ce.height,Ee,Fe,ce.data)):n.texImage2D(t.TEXTURE_2D,0,ze,ce.width,ce.height,0,Ee,Fe,ce.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Ge&&mt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,q,ze,Xe[0].width,Xe[0].height,ce.depth);for(let D=0,B=Xe.length;D<B;D++)if(we=Xe[D],C.format!==mi)if(Ee!==null)if(Ge){if(k)if(C.layerUpdates.size>0){const G=xv(we.width,we.height,C.format,C.type);for(const te of C.layerUpdates){const ue=we.data.subarray(te*G/we.data.BYTES_PER_ELEMENT,(te+1)*G/we.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,D,0,0,te,we.width,we.height,1,Ee,ue)}C.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,D,0,0,0,we.width,we.height,ce.depth,Ee,we.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,D,ze,we.width,we.height,ce.depth,0,we.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?k&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,D,0,0,0,we.width,we.height,ce.depth,Ee,Fe,we.data):n.texImage3D(t.TEXTURE_2D_ARRAY,D,ze,we.width,we.height,ce.depth,0,Ee,Fe,we.data)}else{Ge&&mt&&n.texStorage2D(t.TEXTURE_2D,q,ze,Xe[0].width,Xe[0].height);for(let D=0,B=Xe.length;D<B;D++)we=Xe[D],C.format!==mi?Ee!==null?Ge?k&&n.compressedTexSubImage2D(t.TEXTURE_2D,D,0,0,we.width,we.height,Ee,we.data):n.compressedTexImage2D(t.TEXTURE_2D,D,ze,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?k&&n.texSubImage2D(t.TEXTURE_2D,D,0,0,we.width,we.height,Ee,Fe,we.data):n.texImage2D(t.TEXTURE_2D,D,ze,we.width,we.height,0,Ee,Fe,we.data)}else if(C.isDataArrayTexture)if(Ge){if(mt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,q,ze,ce.width,ce.height,ce.depth),k)if(C.layerUpdates.size>0){const D=xv(ce.width,ce.height,C.format,C.type);for(const B of C.layerUpdates){const G=ce.data.subarray(B*D/ce.data.BYTES_PER_ELEMENT,(B+1)*D/ce.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,B,ce.width,ce.height,1,Ee,Fe,G)}C.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Ee,Fe,ce.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,ze,ce.width,ce.height,ce.depth,0,Ee,Fe,ce.data);else if(C.isData3DTexture)Ge?(mt&&n.texStorage3D(t.TEXTURE_3D,q,ze,ce.width,ce.height,ce.depth),k&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Ee,Fe,ce.data)):n.texImage3D(t.TEXTURE_3D,0,ze,ce.width,ce.height,ce.depth,0,Ee,Fe,ce.data);else if(C.isFramebufferTexture){if(mt)if(Ge)n.texStorage2D(t.TEXTURE_2D,q,ze,ce.width,ce.height);else{let D=ce.width,B=ce.height;for(let G=0;G<q;G++)n.texImage2D(t.TEXTURE_2D,G,ze,D,B,0,Ee,Fe,null),D>>=1,B>>=1}}else if(Xe.length>0){if(Ge&&mt){const D=be(Xe[0]);n.texStorage2D(t.TEXTURE_2D,q,ze,D.width,D.height)}for(let D=0,B=Xe.length;D<B;D++)we=Xe[D],Ge?k&&n.texSubImage2D(t.TEXTURE_2D,D,0,0,Ee,Fe,we):n.texImage2D(t.TEXTURE_2D,D,ze,Ee,Fe,we);C.generateMipmaps=!1}else if(Ge){if(mt){const D=be(ce);n.texStorage2D(t.TEXTURE_2D,q,ze,D.width,D.height)}k&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Ee,Fe,ce)}else n.texImage2D(t.TEXTURE_2D,0,ze,Ee,Fe,ce);g(C)&&h(ie),Re.__version=ee.version,C.onUpdate&&C.onUpdate(C)}P.__version=C.version}function ae(P,C,j){if(C.image.length!==6)return;const ie=We(P,C),re=C.source;n.bindTexture(t.TEXTURE_CUBE_MAP,P.__webglTexture,t.TEXTURE0+j);const ee=i.get(re);if(re.version!==ee.__version||ie===!0){n.activeTexture(t.TEXTURE0+j);const Re=st.getPrimaries(st.workingColorSpace),me=C.colorSpace===Tr?null:st.getPrimaries(C.colorSpace),Se=C.colorSpace===Tr||Re===me?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,C.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,C.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const et=C.isCompressedTexture||C.image[0].isCompressedTexture,ce=C.image[0]&&C.image[0].isDataTexture,Ee=[];for(let B=0;B<6;B++)!et&&!ce?Ee[B]=x(C.image[B],!0,r.maxCubemapSize):Ee[B]=ce?C.image[B].image:C.image[B],Ee[B]=Ve(C,Ee[B]);const Fe=Ee[0],ze=s.convert(C.format,C.colorSpace),we=s.convert(C.type),Xe=S(C.internalFormat,ze,we,C.colorSpace),Ge=C.isVideoTexture!==!0,mt=ee.__version===void 0||ie===!0,k=re.dataReady;let q=M(C,Fe);Ae(t.TEXTURE_CUBE_MAP,C);let D;if(et){Ge&&mt&&n.texStorage2D(t.TEXTURE_CUBE_MAP,q,Xe,Fe.width,Fe.height);for(let B=0;B<6;B++){D=Ee[B].mipmaps;for(let G=0;G<D.length;G++){const te=D[G];C.format!==mi?ze!==null?Ge?k&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+B,G,0,0,te.width,te.height,ze,te.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+B,G,Xe,te.width,te.height,0,te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?k&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+B,G,0,0,te.width,te.height,ze,we,te.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+B,G,Xe,te.width,te.height,0,ze,we,te.data)}}}else{if(D=C.mipmaps,Ge&&mt){D.length>0&&q++;const B=be(Ee[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,q,Xe,B.width,B.height)}for(let B=0;B<6;B++)if(ce){Ge?k&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+B,0,0,0,Ee[B].width,Ee[B].height,ze,we,Ee[B].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+B,0,Xe,Ee[B].width,Ee[B].height,0,ze,we,Ee[B].data);for(let G=0;G<D.length;G++){const ue=D[G].image[B].image;Ge?k&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+B,G+1,0,0,ue.width,ue.height,ze,we,ue.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+B,G+1,Xe,ue.width,ue.height,0,ze,we,ue.data)}}else{Ge?k&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+B,0,0,0,ze,we,Ee[B]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+B,0,Xe,ze,we,Ee[B]);for(let G=0;G<D.length;G++){const te=D[G];Ge?k&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+B,G+1,0,0,ze,we,te.image[B]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+B,G+1,Xe,ze,we,te.image[B])}}}g(C)&&h(t.TEXTURE_CUBE_MAP),ee.__version=re.version,C.onUpdate&&C.onUpdate(C)}P.__version=C.version}function xe(P,C,j,ie,re,ee){const Re=s.convert(j.format,j.colorSpace),me=s.convert(j.type),Se=S(j.internalFormat,Re,me,j.colorSpace),et=i.get(C),ce=i.get(j);if(ce.__renderTarget=C,!et.__hasExternalTextures){const Ee=Math.max(1,C.width>>ee),Fe=Math.max(1,C.height>>ee);re===t.TEXTURE_3D||re===t.TEXTURE_2D_ARRAY?n.texImage3D(re,ee,Se,Ee,Fe,C.depth,0,Re,me,null):n.texImage2D(re,ee,Se,Ee,Fe,0,Re,me,null)}n.bindFramebuffer(t.FRAMEBUFFER,P),Ue(C)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ie,re,ce.__webglTexture,0,Me(C)):(re===t.TEXTURE_2D||re>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ie,re,ce.__webglTexture,ee),n.bindFramebuffer(t.FRAMEBUFFER,null)}function fe(P,C,j){if(t.bindRenderbuffer(t.RENDERBUFFER,P),C.depthBuffer){const ie=C.depthTexture,re=ie&&ie.isDepthTexture?ie.type:null,ee=_(C.stencilBuffer,re),Re=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,me=Me(C);Ue(C)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,me,ee,C.width,C.height):j?t.renderbufferStorageMultisample(t.RENDERBUFFER,me,ee,C.width,C.height):t.renderbufferStorage(t.RENDERBUFFER,ee,C.width,C.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Re,t.RENDERBUFFER,P)}else{const ie=C.textures;for(let re=0;re<ie.length;re++){const ee=ie[re],Re=s.convert(ee.format,ee.colorSpace),me=s.convert(ee.type),Se=S(ee.internalFormat,Re,me,ee.colorSpace),et=Me(C);j&&Ue(C)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,et,Se,C.width,C.height):Ue(C)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,et,Se,C.width,C.height):t.renderbufferStorage(t.RENDERBUFFER,Se,C.width,C.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function De(P,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,P),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ie=i.get(C.depthTexture);ie.__renderTarget=C,(!ie.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),ne(C.depthTexture,0);const re=ie.__webglTexture,ee=Me(C);if(C.depthTexture.format===ha)Ue(C)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,re,0,ee):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,re,0);else if(C.depthTexture.format===ba)Ue(C)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,re,0,ee):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function je(P){const C=i.get(P),j=P.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==P.depthTexture){const ie=P.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),ie){const re=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,ie.removeEventListener("dispose",re)};ie.addEventListener("dispose",re),C.__depthDisposeCallback=re}C.__boundDepthTexture=ie}if(P.depthTexture&&!C.__autoAllocateDepthBuffer){if(j)throw new Error("target.depthTexture not supported in Cube render targets");De(C.__webglFramebuffer,P)}else if(j){C.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(n.bindFramebuffer(t.FRAMEBUFFER,C.__webglFramebuffer[ie]),C.__webglDepthbuffer[ie]===void 0)C.__webglDepthbuffer[ie]=t.createRenderbuffer(),fe(C.__webglDepthbuffer[ie],P,!1);else{const re=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ee=C.__webglDepthbuffer[ie];t.bindRenderbuffer(t.RENDERBUFFER,ee),t.framebufferRenderbuffer(t.FRAMEBUFFER,re,t.RENDERBUFFER,ee)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=t.createRenderbuffer(),fe(C.__webglDepthbuffer,P,!1);else{const ie=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,re=C.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,re),t.framebufferRenderbuffer(t.FRAMEBUFFER,ie,t.RENDERBUFFER,re)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function ve(P,C,j){const ie=i.get(P);C!==void 0&&xe(ie.__webglFramebuffer,P,P.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),j!==void 0&&je(P)}function it(P){const C=P.texture,j=i.get(P),ie=i.get(C);P.addEventListener("dispose",A);const re=P.textures,ee=P.isWebGLCubeRenderTarget===!0,Re=re.length>1;if(Re||(ie.__webglTexture===void 0&&(ie.__webglTexture=t.createTexture()),ie.__version=C.version,a.memory.textures++),ee){j.__webglFramebuffer=[];for(let me=0;me<6;me++)if(C.mipmaps&&C.mipmaps.length>0){j.__webglFramebuffer[me]=[];for(let Se=0;Se<C.mipmaps.length;Se++)j.__webglFramebuffer[me][Se]=t.createFramebuffer()}else j.__webglFramebuffer[me]=t.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){j.__webglFramebuffer=[];for(let me=0;me<C.mipmaps.length;me++)j.__webglFramebuffer[me]=t.createFramebuffer()}else j.__webglFramebuffer=t.createFramebuffer();if(Re)for(let me=0,Se=re.length;me<Se;me++){const et=i.get(re[me]);et.__webglTexture===void 0&&(et.__webglTexture=t.createTexture(),a.memory.textures++)}if(P.samples>0&&Ue(P)===!1){j.__webglMultisampledFramebuffer=t.createFramebuffer(),j.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let me=0;me<re.length;me++){const Se=re[me];j.__webglColorRenderbuffer[me]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,j.__webglColorRenderbuffer[me]);const et=s.convert(Se.format,Se.colorSpace),ce=s.convert(Se.type),Ee=S(Se.internalFormat,et,ce,Se.colorSpace,P.isXRRenderTarget===!0),Fe=Me(P);t.renderbufferStorageMultisample(t.RENDERBUFFER,Fe,Ee,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,j.__webglColorRenderbuffer[me])}t.bindRenderbuffer(t.RENDERBUFFER,null),P.depthBuffer&&(j.__webglDepthRenderbuffer=t.createRenderbuffer(),fe(j.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ee){n.bindTexture(t.TEXTURE_CUBE_MAP,ie.__webglTexture),Ae(t.TEXTURE_CUBE_MAP,C);for(let me=0;me<6;me++)if(C.mipmaps&&C.mipmaps.length>0)for(let Se=0;Se<C.mipmaps.length;Se++)xe(j.__webglFramebuffer[me][Se],P,C,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+me,Se);else xe(j.__webglFramebuffer[me],P,C,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);g(C)&&h(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Re){for(let me=0,Se=re.length;me<Se;me++){const et=re[me],ce=i.get(et);n.bindTexture(t.TEXTURE_2D,ce.__webglTexture),Ae(t.TEXTURE_2D,et),xe(j.__webglFramebuffer,P,et,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,0),g(et)&&h(t.TEXTURE_2D)}n.unbindTexture()}else{let me=t.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(me=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(me,ie.__webglTexture),Ae(me,C),C.mipmaps&&C.mipmaps.length>0)for(let Se=0;Se<C.mipmaps.length;Se++)xe(j.__webglFramebuffer[Se],P,C,t.COLOR_ATTACHMENT0,me,Se);else xe(j.__webglFramebuffer,P,C,t.COLOR_ATTACHMENT0,me,0);g(C)&&h(me),n.unbindTexture()}P.depthBuffer&&je(P)}function $e(P){const C=P.textures;for(let j=0,ie=C.length;j<ie;j++){const re=C[j];if(g(re)){const ee=v(P),Re=i.get(re).__webglTexture;n.bindTexture(ee,Re),h(ee),n.unbindTexture()}}}const ut=[],U=[];function Ce(P){if(P.samples>0){if(Ue(P)===!1){const C=P.textures,j=P.width,ie=P.height;let re=t.COLOR_BUFFER_BIT;const ee=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Re=i.get(P),me=C.length>1;if(me)for(let Se=0;Se<C.length;Se++)n.bindFramebuffer(t.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Re.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let Se=0;Se<C.length;Se++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(re|=t.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(re|=t.STENCIL_BUFFER_BIT)),me){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Re.__webglColorRenderbuffer[Se]);const et=i.get(C[Se]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,et,0)}t.blitFramebuffer(0,0,j,ie,0,0,j,ie,re,t.NEAREST),l===!0&&(ut.length=0,U.length=0,ut.push(t.COLOR_ATTACHMENT0+Se),P.depthBuffer&&P.resolveDepthBuffer===!1&&(ut.push(ee),U.push(ee),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,U)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ut))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),me)for(let Se=0;Se<C.length;Se++){n.bindFramebuffer(t.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,Re.__webglColorRenderbuffer[Se]);const et=i.get(C[Se]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Re.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,et,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const C=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[C])}}}function Me(P){return Math.min(r.maxSamples,P.samples)}function Ue(P){const C=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function le(P){const C=a.render.frame;d.get(P)!==C&&(d.set(P,C),P.update())}function Ve(P,C){const j=P.colorSpace,ie=P.format,re=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||j!==Ua&&j!==Tr&&(st.getTransfer(j)===vt?(ie!==mi||re!==or)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",j)),C}function be(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=V,this.setTexture2D=ne,this.setTexture2DArray=Q,this.setTexture3D=K,this.setTextureCube=I,this.rebindTextures=ve,this.setupRenderTarget=it,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=Ue}function nP(t,e){function n(i,r=Tr){let s;const a=st.getTransfer(r);if(i===or)return t.UNSIGNED_BYTE;if(i===wm)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Tm)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Ky)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===qy)return t.BYTE;if(i===Yy)return t.SHORT;if(i===Jo)return t.UNSIGNED_SHORT;if(i===Em)return t.INT;if(i===vs)return t.UNSIGNED_INT;if(i===Ci)return t.FLOAT;if(i===Ni)return t.HALF_FLOAT;if(i===Zy)return t.ALPHA;if(i===Qy)return t.RGB;if(i===mi)return t.RGBA;if(i===Jy)return t.LUMINANCE;if(i===e1)return t.LUMINANCE_ALPHA;if(i===ha)return t.DEPTH_COMPONENT;if(i===ba)return t.DEPTH_STENCIL;if(i===Cm)return t.RED;if(i===Am)return t.RED_INTEGER;if(i===t1)return t.RG;if(i===bm)return t.RG_INTEGER;if(i===Rm)return t.RGBA_INTEGER;if(i===Ac||i===bc||i===Rc||i===Pc)if(a===vt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ac)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===bc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Rc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Pc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ac)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===bc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Rc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Pc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Uf||i===kf||i===Ff||i===Of)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Uf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===kf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ff)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Of)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===zf||i===Bf||i===jf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===zf||i===Bf)return a===vt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===jf)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Vf||i===Hf||i===Gf||i===Wf||i===Xf||i===$f||i===qf||i===Yf||i===Kf||i===Zf||i===Qf||i===Jf||i===ep||i===tp)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Vf)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Hf)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Gf)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Wf)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Xf)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===$f)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===qf)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Yf)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Kf)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Zf)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Qf)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Jf)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ep)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===tp)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Nc||i===np||i===ip)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Nc)return a===vt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===np)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ip)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===n1||i===rp||i===sp||i===ap)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Nc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===rp)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===sp)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ap)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Aa?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class iP extends Un{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Qn extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rP={type:"move"};class lh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const g=n.getJointPose(x,i),h=this._getHandJoint(c,x);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}const d=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],f=d.position.distanceTo(p.position),m=.02,y=.005;c.inputState.pinching&&f>m+y?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-y&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rP)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Qn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const sP=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,aP=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class oP{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new un,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new cn({vertexShader:sP,fragmentShader:aP,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Jt(new Zi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lP extends ka{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,p=null,f=null,m=null,y=null;const x=new oP,g=n.getContextAttributes();let h=null,v=null;const S=[],_=[],M=new pe;let T=null;const A=new Un;A.viewport=new St;const b=new Un;b.viewport=new St;const w=[A,b],E=new iP;let N=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ae=S[Z];return ae===void 0&&(ae=new lh,S[Z]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(Z){let ae=S[Z];return ae===void 0&&(ae=new lh,S[Z]=ae),ae.getGripSpace()},this.getHand=function(Z){let ae=S[Z];return ae===void 0&&(ae=new lh,S[Z]=ae),ae.getHandSpace()};function z(Z){const ae=_.indexOf(Z.inputSource);if(ae===-1)return;const xe=S[ae];xe!==void 0&&(xe.update(Z.inputSource,Z.frame,c||a),xe.dispatchEvent({type:Z.type,data:Z.inputSource}))}function Y(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",ne);for(let Z=0;Z<S.length;Z++){const ae=_[Z];ae!==null&&(_[Z]=null,S[Z].disconnect(ae))}N=null,V=null,x.reset(),e.setRenderTarget(h),m=null,f=null,p=null,r=null,v=null,We.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(M.width,M.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return p},this.getFrame=function(){return y},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(h=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",ne),g.xrCompatible!==!0&&await n.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(M),r.renderState.layers===void 0){const ae={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,ae),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),v=new ei(m.framebufferWidth,m.framebufferHeight,{format:mi,type:or,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ae=null,xe=null,fe=null;g.depth&&(fe=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ae=g.stencil?ba:ha,xe=g.stencil?Aa:vs);const De={colorFormat:n.RGBA8,depthFormat:fe,scaleFactor:s};p=new XRWebGLBinding(r,n),f=p.createProjectionLayer(De),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new ei(f.textureWidth,f.textureHeight,{format:mi,type:or,depthTexture:new m1(f.textureWidth,f.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),We.setContext(r),We.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function ne(Z){for(let ae=0;ae<Z.removed.length;ae++){const xe=Z.removed[ae],fe=_.indexOf(xe);fe>=0&&(_[fe]=null,S[fe].disconnect(xe))}for(let ae=0;ae<Z.added.length;ae++){const xe=Z.added[ae];let fe=_.indexOf(xe);if(fe===-1){for(let je=0;je<S.length;je++)if(je>=_.length){_.push(xe),fe=je;break}else if(_[je]===null){_[je]=xe,fe=je;break}if(fe===-1)break}const De=S[fe];De&&De.connect(xe)}}const Q=new L,K=new L;function I(Z,ae,xe){Q.setFromMatrixPosition(ae.matrixWorld),K.setFromMatrixPosition(xe.matrixWorld);const fe=Q.distanceTo(K),De=ae.projectionMatrix.elements,je=xe.projectionMatrix.elements,ve=De[14]/(De[10]-1),it=De[14]/(De[10]+1),$e=(De[9]+1)/De[5],ut=(De[9]-1)/De[5],U=(De[8]-1)/De[0],Ce=(je[8]+1)/je[0],Me=ve*U,Ue=ve*Ce,le=fe/(-U+Ce),Ve=le*-U;if(ae.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ve),Z.translateZ(le),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),De[10]===-1)Z.projectionMatrix.copy(ae.projectionMatrix),Z.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const be=ve+le,P=it+le,C=Me-Ve,j=Ue+(fe-Ve),ie=$e*it/P*be,re=ut*it/P*be;Z.projectionMatrix.makePerspective(C,j,ie,re,be,P),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function H(Z,ae){ae===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ae.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let ae=Z.near,xe=Z.far;x.texture!==null&&(x.depthNear>0&&(ae=x.depthNear),x.depthFar>0&&(xe=x.depthFar)),E.near=b.near=A.near=ae,E.far=b.far=A.far=xe,(N!==E.near||V!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),N=E.near,V=E.far),A.layers.mask=Z.layers.mask|2,b.layers.mask=Z.layers.mask|4,E.layers.mask=A.layers.mask|b.layers.mask;const fe=Z.parent,De=E.cameras;H(E,fe);for(let je=0;je<De.length;je++)H(De[je],fe);De.length===2?I(E,A,b):E.projectionMatrix.copy(A.projectionMatrix),J(Z,E,fe)};function J(Z,ae,xe){xe===null?Z.matrix.copy(ae.matrixWorld):(Z.matrix.copy(xe.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ae.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ae.projectionMatrix),Z.projectionMatrixInverse.copy(ae.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=el*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Z)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(E)};let de=null;function Ae(Z,ae){if(d=ae.getViewerPose(c||a),y=ae,d!==null){const xe=d.views;m!==null&&(e.setRenderTargetFramebuffer(v,m.framebuffer),e.setRenderTarget(v));let fe=!1;xe.length!==E.cameras.length&&(E.cameras.length=0,fe=!0);for(let je=0;je<xe.length;je++){const ve=xe[je];let it=null;if(m!==null)it=m.getViewport(ve);else{const ut=p.getViewSubImage(f,ve);it=ut.viewport,je===0&&(e.setRenderTargetTextures(v,ut.colorTexture,f.ignoreDepthValues?void 0:ut.depthStencilTexture),e.setRenderTarget(v))}let $e=w[je];$e===void 0&&($e=new Un,$e.layers.enable(je),$e.viewport=new St,w[je]=$e),$e.matrix.fromArray(ve.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(ve.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(it.x,it.y,it.width,it.height),je===0&&(E.matrix.copy($e.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),fe===!0&&E.cameras.push($e)}const De=r.enabledFeatures;if(De&&De.includes("depth-sensing")){const je=p.getDepthInformation(xe[0]);je&&je.isValid&&je.texture&&x.init(e,je,r.renderState)}}for(let xe=0;xe<S.length;xe++){const fe=_[xe],De=S[xe];fe!==null&&De!==void 0&&De.update(fe,ae,c||a)}de&&de(Z,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),y=null}const We=new p1;We.setAnimationLoop(Ae),this.setAnimationLoop=function(Z){de=Z},this.dispose=function(){}}}const Kr=new Ii,cP=new pt;function uP(t,e){function n(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,d1(t)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function r(g,h,v,S,_){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(g,h):h.isMeshToonMaterial?(s(g,h),p(g,h)):h.isMeshPhongMaterial?(s(g,h),d(g,h)):h.isMeshStandardMaterial?(s(g,h),f(g,h),h.isMeshPhysicalMaterial&&m(g,h,_)):h.isMeshMatcapMaterial?(s(g,h),y(g,h)):h.isMeshDepthMaterial?s(g,h):h.isMeshDistanceMaterial?(s(g,h),x(g,h)):h.isMeshNormalMaterial?s(g,h):h.isLineBasicMaterial?(a(g,h),h.isLineDashedMaterial&&o(g,h)):h.isPointsMaterial?l(g,h,v,S):h.isSpriteMaterial?c(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,n(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===_n&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,n(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===_n&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,n(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,n(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);const v=e.get(h),S=v.envMap,_=v.envMapRotation;S&&(g.envMap.value=S,Kr.copy(_),Kr.x*=-1,Kr.y*=-1,Kr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Kr.y*=-1,Kr.z*=-1),g.envMapRotation.value.setFromMatrix4(cP.makeRotationFromEuler(Kr)),g.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,g.aoMapTransform))}function a(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform))}function o(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function l(g,h,v,S){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*v,g.scale.value=S*.5,h.map&&(g.map.value=h.map,n(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function c(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function d(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function p(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function f(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function m(g,h,v){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===_n&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,g.specularIntensityMapTransform))}function y(g,h){h.matcap&&(g.matcap.value=h.matcap)}function x(g,h){const v=e.get(h).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function dP(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,S){const _=S.program;i.uniformBlockBinding(v,_)}function c(v,S){let _=r[v.id];_===void 0&&(y(v),_=d(v),r[v.id]=_,v.addEventListener("dispose",g));const M=S.program;i.updateUBOMapping(v,M);const T=e.render.frame;s[v.id]!==T&&(f(v),s[v.id]=T)}function d(v){const S=p();v.__bindingPointIndex=S;const _=t.createBuffer(),M=v.__size,T=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,_),t.bufferData(t.UNIFORM_BUFFER,M,T),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,S,_),_}function p(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const S=r[v.id],_=v.uniforms,M=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,S);for(let T=0,A=_.length;T<A;T++){const b=Array.isArray(_[T])?_[T]:[_[T]];for(let w=0,E=b.length;w<E;w++){const N=b[w];if(m(N,T,w,M)===!0){const V=N.__offset,z=Array.isArray(N.value)?N.value:[N.value];let Y=0;for(let ne=0;ne<z.length;ne++){const Q=z[ne],K=x(Q);typeof Q=="number"||typeof Q=="boolean"?(N.__data[0]=Q,t.bufferSubData(t.UNIFORM_BUFFER,V+Y,N.__data)):Q.isMatrix3?(N.__data[0]=Q.elements[0],N.__data[1]=Q.elements[1],N.__data[2]=Q.elements[2],N.__data[3]=0,N.__data[4]=Q.elements[3],N.__data[5]=Q.elements[4],N.__data[6]=Q.elements[5],N.__data[7]=0,N.__data[8]=Q.elements[6],N.__data[9]=Q.elements[7],N.__data[10]=Q.elements[8],N.__data[11]=0):(Q.toArray(N.__data,Y),Y+=K.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,V,N.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(v,S,_,M){const T=v.value,A=S+"_"+_;if(M[A]===void 0)return typeof T=="number"||typeof T=="boolean"?M[A]=T:M[A]=T.clone(),!0;{const b=M[A];if(typeof T=="number"||typeof T=="boolean"){if(b!==T)return M[A]=T,!0}else if(b.equals(T)===!1)return b.copy(T),!0}return!1}function y(v){const S=v.uniforms;let _=0;const M=16;for(let A=0,b=S.length;A<b;A++){const w=Array.isArray(S[A])?S[A]:[S[A]];for(let E=0,N=w.length;E<N;E++){const V=w[E],z=Array.isArray(V.value)?V.value:[V.value];for(let Y=0,ne=z.length;Y<ne;Y++){const Q=z[Y],K=x(Q),I=_%M,H=I%K.boundary,J=I+H;_+=H,J!==0&&M-J<K.storage&&(_+=M-J),V.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=_,_+=K.storage}}}const T=_%M;return T>0&&(_+=M-T),v.__size=_,v.__cache={},this}function x(v){const S={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=48,S.storage=48):v.isMatrix4?(S.boundary=64,S.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),S}function g(v){const S=v.target;S.removeEventListener("dispose",g);const _=a.indexOf(S.__bindingPointIndex);a.splice(_,1),t.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function h(){for(const v in r)t.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:l,update:c,dispose:h}}class hP{constructor(e={}){const{canvas:n=tT(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const y=new Uint32Array(4),x=new Int32Array(4);let g=null,h=null;const v=[],S=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=vn,this.toneMapping=kr,this.toneMappingExposure=1;const _=this;let M=!1,T=0,A=0,b=null,w=-1,E=null;const N=new St,V=new St;let z=null;const Y=new Be(0);let ne=0,Q=n.width,K=n.height,I=1,H=null,J=null;const de=new St(0,0,Q,K),Ae=new St(0,0,Q,K);let We=!1;const Z=new Im;let ae=!1,xe=!1;const fe=new pt,De=new pt,je=new L,ve=new St,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $e=!1;function ut(){return b===null?I:1}let U=i;function Ce(R,F){return n.getContext(R,F)}try{const R={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Sm}`),n.addEventListener("webglcontextlost",B,!1),n.addEventListener("webglcontextrestored",G,!1),n.addEventListener("webglcontextcreationerror",te,!1),U===null){const F="webgl2";if(U=Ce(F,R),U===null)throw Ce(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Me,Ue,le,Ve,be,P,C,j,ie,re,ee,Re,me,Se,et,ce,Ee,Fe,ze,we,Xe,Ge,mt,k;function q(){Me=new vb(U),Me.init(),Ge=new nP(U,Me),Ue=new db(U,Me,e,Ge),le=new JR(U,Me),Ue.reverseDepthBuffer&&f&&le.buffers.depth.setReversed(!0),Ve=new yb(U),be=new OR,P=new tP(U,Me,le,be,Ue,Ge,Ve),C=new fb(_),j=new gb(_),ie=new AT(U),mt=new cb(U,ie),re=new xb(U,ie,Ve,mt),ee=new Mb(U,re,ie,Ve),ze=new Sb(U,Ue,P),ce=new hb(be),Re=new FR(_,C,j,Me,Ue,mt,ce),me=new uP(_,be),Se=new BR,et=new XR(Me),Fe=new lb(_,C,j,le,ee,m,l),Ee=new ZR(_,ee,Ue),k=new dP(U,Ve,Ue,le),we=new ub(U,Me,Ve),Xe=new _b(U,Me,Ve),Ve.programs=Re.programs,_.capabilities=Ue,_.extensions=Me,_.properties=be,_.renderLists=Se,_.shadowMap=Ee,_.state=le,_.info=Ve}q();const D=new lP(_,U);this.xr=D,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const R=Me.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Me.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(R){R!==void 0&&(I=R,this.setSize(Q,K,!1))},this.getSize=function(R){return R.set(Q,K)},this.setSize=function(R,F,W=!0){if(D.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=R,K=F,n.width=Math.floor(R*I),n.height=Math.floor(F*I),W===!0&&(n.style.width=R+"px",n.style.height=F+"px"),this.setViewport(0,0,R,F)},this.getDrawingBufferSize=function(R){return R.set(Q*I,K*I).floor()},this.setDrawingBufferSize=function(R,F,W){Q=R,K=F,I=W,n.width=Math.floor(R*W),n.height=Math.floor(F*W),this.setViewport(0,0,R,F)},this.getCurrentViewport=function(R){return R.copy(N)},this.getViewport=function(R){return R.copy(de)},this.setViewport=function(R,F,W,$){R.isVector4?de.set(R.x,R.y,R.z,R.w):de.set(R,F,W,$),le.viewport(N.copy(de).multiplyScalar(I).round())},this.getScissor=function(R){return R.copy(Ae)},this.setScissor=function(R,F,W,$){R.isVector4?Ae.set(R.x,R.y,R.z,R.w):Ae.set(R,F,W,$),le.scissor(V.copy(Ae).multiplyScalar(I).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(R){le.setScissorTest(We=R)},this.setOpaqueSort=function(R){H=R},this.setTransparentSort=function(R){J=R},this.getClearColor=function(R){return R.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor.apply(Fe,arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha.apply(Fe,arguments)},this.clear=function(R=!0,F=!0,W=!0){let $=0;if(R){let O=!1;if(b!==null){const he=b.texture.format;O=he===Rm||he===bm||he===Am}if(O){const he=b.texture.type,ye=he===or||he===vs||he===Jo||he===Aa||he===wm||he===Tm,Pe=Fe.getClearColor(),Ne=Fe.getClearAlpha(),He=Pe.r,Ye=Pe.g,Le=Pe.b;ye?(y[0]=He,y[1]=Ye,y[2]=Le,y[3]=Ne,U.clearBufferuiv(U.COLOR,0,y)):(x[0]=He,x[1]=Ye,x[2]=Le,x[3]=Ne,U.clearBufferiv(U.COLOR,0,x))}else $|=U.COLOR_BUFFER_BIT}F&&($|=U.DEPTH_BUFFER_BIT),W&&($|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",B,!1),n.removeEventListener("webglcontextrestored",G,!1),n.removeEventListener("webglcontextcreationerror",te,!1),Se.dispose(),et.dispose(),be.dispose(),C.dispose(),j.dispose(),ee.dispose(),mt.dispose(),k.dispose(),Re.dispose(),D.dispose(),D.removeEventListener("sessionstart",Mn),D.removeEventListener("sessionend",En),dt.stop()};function B(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function G(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const R=Ve.autoReset,F=Ee.enabled,W=Ee.autoUpdate,$=Ee.needsUpdate,O=Ee.type;q(),Ve.autoReset=R,Ee.enabled=F,Ee.autoUpdate=W,Ee.needsUpdate=$,Ee.type=O}function te(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ue(R){const F=R.target;F.removeEventListener("dispose",ue),_e(F)}function _e(R){Ze(R),be.remove(R)}function Ze(R){const F=be.get(R).programs;F!==void 0&&(F.forEach(function(W){Re.releaseProgram(W)}),R.isShaderMaterial&&Re.releaseShaderCache(R))}this.renderBufferDirect=function(R,F,W,$,O,he){F===null&&(F=it);const ye=O.isMesh&&O.matrixWorld.determinant()<0,Pe=k1(R,F,W,$,O);le.setMaterial($,ye);let Ne=W.index,He=1;if($.wireframe===!0){if(Ne=re.getWireframeAttribute(W),Ne===void 0)return;He=2}const Ye=W.drawRange,Le=W.attributes.position;let lt=Ye.start*He,Mt=(Ye.start+Ye.count)*He;he!==null&&(lt=Math.max(lt,he.start*He),Mt=Math.min(Mt,(he.start+he.count)*He)),Ne!==null?(lt=Math.max(lt,0),Mt=Math.min(Mt,Ne.count)):Le!=null&&(lt=Math.max(lt,0),Mt=Math.min(Mt,Le.count));const wt=Mt-lt;if(wt<0||wt===1/0)return;mt.setup(O,$,Pe,W,Ne);let wn,ht=we;if(Ne!==null&&(wn=ie.get(Ne),ht=Xe,ht.setIndex(wn)),O.isMesh)$.wireframe===!0?(le.setLineWidth($.wireframeLinewidth*ut()),ht.setMode(U.LINES)):ht.setMode(U.TRIANGLES);else if(O.isLine){let Ie=$.linewidth;Ie===void 0&&(Ie=1),le.setLineWidth(Ie*ut()),O.isLineSegments?ht.setMode(U.LINES):O.isLineLoop?ht.setMode(U.LINE_LOOP):ht.setMode(U.LINE_STRIP)}else O.isPoints?ht.setMode(U.POINTS):O.isSprite&&ht.setMode(U.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ht.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Me.get("WEBGL_multi_draw"))ht.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ie=O._multiDrawStarts,Ui=O._multiDrawCounts,ft=O._multiDrawCount,si=Ne?ie.get(Ne).bytesPerElement:1,ws=be.get($).currentProgram.getUniforms();for(let Nn=0;Nn<ft;Nn++)ws.setValue(U,"_gl_DrawID",Nn),ht.render(Ie[Nn]/si,Ui[Nn])}else if(O.isInstancedMesh)ht.renderInstances(lt,wt,O.count);else if(W.isInstancedBufferGeometry){const Ie=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Ui=Math.min(W.instanceCount,Ie);ht.renderInstances(lt,wt,Ui)}else ht.render(lt,wt)};function Oe(R,F,W){R.transparent===!0&&R.side===wi&&R.forceSinglePass===!1?(R.side=_n,R.needsUpdate=!0,Gr(R,F,W),R.side=Br,R.needsUpdate=!0,Gr(R,F,W),R.side=wi):Gr(R,F,W)}this.compile=function(R,F,W=null){W===null&&(W=R),h=et.get(W),h.init(F),S.push(h),W.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(h.pushLight(O),O.castShadow&&h.pushShadow(O))}),R!==W&&R.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(h.pushLight(O),O.castShadow&&h.pushShadow(O))}),h.setupLights();const $=new Set;return R.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const he=O.material;if(he)if(Array.isArray(he))for(let ye=0;ye<he.length;ye++){const Pe=he[ye];Oe(Pe,W,O),$.add(Pe)}else Oe(he,W,O),$.add(he)}),S.pop(),h=null,$},this.compileAsync=function(R,F,W=null){const $=this.compile(R,F,W);return new Promise(O=>{function he(){if($.forEach(function(ye){be.get(ye).currentProgram.isReady()&&$.delete(ye)}),$.size===0){O(R);return}setTimeout(he,10)}Me.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let rt=null;function at(R){rt&&rt(R)}function Mn(){dt.stop()}function En(){dt.start()}const dt=new p1;dt.setAnimationLoop(at),typeof self<"u"&&dt.setContext(self),this.setAnimationLoop=function(R){rt=R,D.setAnimationLoop(R),R===null?dt.stop():dt.start()},D.addEventListener("sessionstart",Mn),D.addEventListener("sessionend",En),this.render=function(R,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),D.enabled===!0&&D.isPresenting===!0&&(D.cameraAutoUpdate===!0&&D.updateCamera(F),F=D.getCamera()),R.isScene===!0&&R.onBeforeRender(_,R,F,b),h=et.get(R,S.length),h.init(F),S.push(h),De.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Z.setFromProjectionMatrix(De),xe=this.localClippingEnabled,ae=ce.init(this.clippingPlanes,xe),g=Se.get(R,v.length),g.init(),v.push(g),D.enabled===!0&&D.isPresenting===!0){const he=_.xr.getDepthSensingMesh();he!==null&&qe(he,F,-1/0,_.sortObjects)}qe(R,F,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(H,J),$e=D.enabled===!1||D.isPresenting===!1||D.hasDepthSensing()===!1,$e&&Fe.addToRenderList(g,R),this.info.render.frame++,ae===!0&&ce.beginShadows();const W=h.state.shadowsArray;Ee.render(W,R,F),ae===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=g.opaque,O=g.transmissive;if(h.setupLights(),F.isArrayCamera){const he=F.cameras;if(O.length>0)for(let ye=0,Pe=he.length;ye<Pe;ye++){const Ne=he[ye];Dt($,O,R,Ne)}$e&&Fe.render(R);for(let ye=0,Pe=he.length;ye<Pe;ye++){const Ne=he[ye];gt(g,R,Ne,Ne.viewport)}}else O.length>0&&Dt($,O,R,F),$e&&Fe.render(R),gt(g,R,F);b!==null&&(P.updateMultisampleRenderTarget(b),P.updateRenderTargetMipmap(b)),R.isScene===!0&&R.onAfterRender(_,R,F),mt.resetDefaultState(),w=-1,E=null,S.pop(),S.length>0?(h=S[S.length-1],ae===!0&&ce.setGlobalState(_.clippingPlanes,h.state.camera)):h=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function qe(R,F,W,$){if(R.visible===!1)return;if(R.layers.test(F.layers)){if(R.isGroup)W=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(F);else if(R.isLight)h.pushLight(R),R.castShadow&&h.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Z.intersectsSprite(R)){$&&ve.setFromMatrixPosition(R.matrixWorld).applyMatrix4(De);const ye=ee.update(R),Pe=R.material;Pe.visible&&g.push(R,ye,Pe,W,ve.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Z.intersectsObject(R))){const ye=ee.update(R),Pe=R.material;if($&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ve.copy(R.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),ve.copy(ye.boundingSphere.center)),ve.applyMatrix4(R.matrixWorld).applyMatrix4(De)),Array.isArray(Pe)){const Ne=ye.groups;for(let He=0,Ye=Ne.length;He<Ye;He++){const Le=Ne[He],lt=Pe[Le.materialIndex];lt&&lt.visible&&g.push(R,ye,lt,W,ve.z,Le)}}else Pe.visible&&g.push(R,ye,Pe,W,ve.z,null)}}const he=R.children;for(let ye=0,Pe=he.length;ye<Pe;ye++)qe(he[ye],F,W,$)}function gt(R,F,W,$){const O=R.opaque,he=R.transmissive,ye=R.transparent;h.setupLightsView(W),ae===!0&&ce.setGlobalState(_.clippingPlanes,W),$&&le.viewport(N.copy($)),O.length>0&&fn(O,F,W),he.length>0&&fn(he,F,W),ye.length>0&&fn(ye,F,W),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function Dt(R,F,W,$){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[$.id]===void 0&&(h.state.transmissionRenderTarget[$.id]=new ei(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")||Me.has("EXT_color_buffer_float")?Ni:or,minFilter:ls,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));const he=h.state.transmissionRenderTarget[$.id],ye=$.viewport||N;he.setSize(ye.z,ye.w);const Pe=_.getRenderTarget();_.setRenderTarget(he),_.getClearColor(Y),ne=_.getClearAlpha(),ne<1&&_.setClearColor(16777215,.5),_.clear(),$e&&Fe.render(W);const Ne=_.toneMapping;_.toneMapping=kr;const He=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),h.setupLightsView($),ae===!0&&ce.setGlobalState(_.clippingPlanes,$),fn(R,W,$),P.updateMultisampleRenderTarget(he),P.updateRenderTargetMipmap(he),Me.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let Le=0,lt=F.length;Le<lt;Le++){const Mt=F[Le],wt=Mt.object,wn=Mt.geometry,ht=Mt.material,Ie=Mt.group;if(ht.side===wi&&wt.layers.test($.layers)){const Ui=ht.side;ht.side=_n,ht.needsUpdate=!0,Wn(wt,W,$,wn,ht,Ie),ht.side=Ui,ht.needsUpdate=!0,Ye=!0}}Ye===!0&&(P.updateMultisampleRenderTarget(he),P.updateRenderTargetMipmap(he))}_.setRenderTarget(Pe),_.setClearColor(Y,ne),He!==void 0&&($.viewport=He),_.toneMapping=Ne}function fn(R,F,W){const $=F.isScene===!0?F.overrideMaterial:null;for(let O=0,he=R.length;O<he;O++){const ye=R[O],Pe=ye.object,Ne=ye.geometry,He=$===null?ye.material:$,Ye=ye.group;Pe.layers.test(W.layers)&&Wn(Pe,F,W,Ne,He,Ye)}}function Wn(R,F,W,$,O,he){R.onBeforeRender(_,F,W,$,O,he),R.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),O.onBeforeRender(_,F,W,$,R,he),O.transparent===!0&&O.side===wi&&O.forceSinglePass===!1?(O.side=_n,O.needsUpdate=!0,_.renderBufferDirect(W,F,$,O,R,he),O.side=Br,O.needsUpdate=!0,_.renderBufferDirect(W,F,$,O,R,he),O.side=wi):_.renderBufferDirect(W,F,$,O,R,he),R.onAfterRender(_,F,W,$,O,he)}function Gr(R,F,W){F.isScene!==!0&&(F=it);const $=be.get(R),O=h.state.lights,he=h.state.shadowsArray,ye=O.state.version,Pe=Re.getParameters(R,O.state,he,F,W),Ne=Re.getProgramCacheKey(Pe);let He=$.programs;$.environment=R.isMeshStandardMaterial?F.environment:null,$.fog=F.fog,$.envMap=(R.isMeshStandardMaterial?j:C).get(R.envMap||$.environment),$.envMapRotation=$.environment!==null&&R.envMap===null?F.environmentRotation:R.envMapRotation,He===void 0&&(R.addEventListener("dispose",ue),He=new Map,$.programs=He);let Ye=He.get(Ne);if(Ye!==void 0){if($.currentProgram===Ye&&$.lightsStateVersion===ye)return Va(R,Pe),Ye}else Pe.uniforms=Re.getUniforms(R),R.onBeforeCompile(Pe,_),Ye=Re.acquireProgram(Pe,Ne),He.set(Ne,Ye),$.uniforms=Pe.uniforms;const Le=$.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Le.clippingPlanes=ce.uniform),Va(R,Pe),$.needsLights=O1(R),$.lightsStateVersion=ye,$.needsLights&&(Le.ambientLightColor.value=O.state.ambient,Le.lightProbe.value=O.state.probe,Le.directionalLights.value=O.state.directional,Le.directionalLightShadows.value=O.state.directionalShadow,Le.spotLights.value=O.state.spot,Le.spotLightShadows.value=O.state.spotShadow,Le.rectAreaLights.value=O.state.rectArea,Le.ltc_1.value=O.state.rectAreaLTC1,Le.ltc_2.value=O.state.rectAreaLTC2,Le.pointLights.value=O.state.point,Le.pointLightShadows.value=O.state.pointShadow,Le.hemisphereLights.value=O.state.hemi,Le.directionalShadowMap.value=O.state.directionalShadowMap,Le.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Le.spotShadowMap.value=O.state.spotShadowMap,Le.spotLightMatrix.value=O.state.spotLightMatrix,Le.spotLightMap.value=O.state.spotLightMap,Le.pointShadowMap.value=O.state.pointShadowMap,Le.pointShadowMatrix.value=O.state.pointShadowMatrix),$.currentProgram=Ye,$.uniformsList=null,Ye}function ja(R){if(R.uniformsList===null){const F=R.currentProgram.getUniforms();R.uniformsList=Lc.seqWithValue(F.seq,R.uniforms)}return R.uniformsList}function Va(R,F){const W=be.get(R);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function k1(R,F,W,$,O){F.isScene!==!0&&(F=it),P.resetTextureUnits();const he=F.fog,ye=$.isMeshStandardMaterial?F.environment:null,Pe=b===null?_.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Ua,Ne=($.isMeshStandardMaterial?j:C).get($.envMap||ye),He=$.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ye=!!W.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Le=!!W.morphAttributes.position,lt=!!W.morphAttributes.normal,Mt=!!W.morphAttributes.color;let wt=kr;$.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(wt=_.toneMapping);const wn=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ht=wn!==void 0?wn.length:0,Ie=be.get($),Ui=h.state.lights;if(ae===!0&&(xe===!0||R!==E)){const Xn=R===E&&$.id===w;ce.setState($,R,Xn)}let ft=!1;$.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==Ui.state.version||Ie.outputColorSpace!==Pe||O.isBatchedMesh&&Ie.batching===!1||!O.isBatchedMesh&&Ie.batching===!0||O.isBatchedMesh&&Ie.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ie.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ie.instancing===!1||!O.isInstancedMesh&&Ie.instancing===!0||O.isSkinnedMesh&&Ie.skinning===!1||!O.isSkinnedMesh&&Ie.skinning===!0||O.isInstancedMesh&&Ie.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ie.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ie.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ie.instancingMorph===!1&&O.morphTexture!==null||Ie.envMap!==Ne||$.fog===!0&&Ie.fog!==he||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==ce.numPlanes||Ie.numIntersection!==ce.numIntersection)||Ie.vertexAlphas!==He||Ie.vertexTangents!==Ye||Ie.morphTargets!==Le||Ie.morphNormals!==lt||Ie.morphColors!==Mt||Ie.toneMapping!==wt||Ie.morphTargetsCount!==ht)&&(ft=!0):(ft=!0,Ie.__version=$.version);let si=Ie.currentProgram;ft===!0&&(si=Gr($,F,O));let ws=!1,Nn=!1,Ha=!1;const Tt=si.getUniforms(),_i=Ie.uniforms;if(le.useProgram(si.program)&&(ws=!0,Nn=!0,Ha=!0),$.id!==w&&(w=$.id,Nn=!0),ws||E!==R){le.buffers.depth.getReversed()?(fe.copy(R.projectionMatrix),iT(fe),rT(fe),Tt.setValue(U,"projectionMatrix",fe)):Tt.setValue(U,"projectionMatrix",R.projectionMatrix),Tt.setValue(U,"viewMatrix",R.matrixWorldInverse);const hr=Tt.map.cameraPosition;hr!==void 0&&hr.setValue(U,je.setFromMatrixPosition(R.matrixWorld)),Ue.logarithmicDepthBuffer&&Tt.setValue(U,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Tt.setValue(U,"isOrthographic",R.isOrthographicCamera===!0),E!==R&&(E=R,Nn=!0,Ha=!0)}if(O.isSkinnedMesh){Tt.setOptional(U,O,"bindMatrix"),Tt.setOptional(U,O,"bindMatrixInverse");const Xn=O.skeleton;Xn&&(Xn.boneTexture===null&&Xn.computeBoneTexture(),Tt.setValue(U,"boneTexture",Xn.boneTexture,P))}O.isBatchedMesh&&(Tt.setOptional(U,O,"batchingTexture"),Tt.setValue(U,"batchingTexture",O._matricesTexture,P),Tt.setOptional(U,O,"batchingIdTexture"),Tt.setValue(U,"batchingIdTexture",O._indirectTexture,P),Tt.setOptional(U,O,"batchingColorTexture"),O._colorsTexture!==null&&Tt.setValue(U,"batchingColorTexture",O._colorsTexture,P));const Ga=W.morphAttributes;if((Ga.position!==void 0||Ga.normal!==void 0||Ga.color!==void 0)&&ze.update(O,W,si),(Nn||Ie.receiveShadow!==O.receiveShadow)&&(Ie.receiveShadow=O.receiveShadow,Tt.setValue(U,"receiveShadow",O.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(_i.envMap.value=Ne,_i.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&F.environment!==null&&(_i.envMapIntensity.value=F.environmentIntensity),Nn&&(Tt.setValue(U,"toneMappingExposure",_.toneMappingExposure),Ie.needsLights&&F1(_i,Ha),he&&$.fog===!0&&me.refreshFogUniforms(_i,he),me.refreshMaterialUniforms(_i,$,I,K,h.state.transmissionRenderTarget[R.id]),Lc.upload(U,ja(Ie),_i,P)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Lc.upload(U,ja(Ie),_i,P),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Tt.setValue(U,"center",O.center),Tt.setValue(U,"modelViewMatrix",O.modelViewMatrix),Tt.setValue(U,"normalMatrix",O.normalMatrix),Tt.setValue(U,"modelMatrix",O.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Xn=$.uniformsGroups;for(let hr=0,fr=Xn.length;hr<fr;hr++){const Xm=Xn[hr];k.update(Xm,si),k.bind(Xm,si)}}return si}function F1(R,F){R.ambientLightColor.needsUpdate=F,R.lightProbe.needsUpdate=F,R.directionalLights.needsUpdate=F,R.directionalLightShadows.needsUpdate=F,R.pointLights.needsUpdate=F,R.pointLightShadows.needsUpdate=F,R.spotLights.needsUpdate=F,R.spotLightShadows.needsUpdate=F,R.rectAreaLights.needsUpdate=F,R.hemisphereLights.needsUpdate=F}function O1(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(R,F,W){be.get(R.texture).__webglTexture=F,be.get(R.depthTexture).__webglTexture=W;const $=be.get(R);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=W===void 0,$.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,F){const W=be.get(R);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(R,F=0,W=0){b=R,T=F,A=W;let $=!0,O=null,he=!1,ye=!1;if(R){const Ne=be.get(R);if(Ne.__useDefaultFramebuffer!==void 0)le.bindFramebuffer(U.FRAMEBUFFER,null),$=!1;else if(Ne.__webglFramebuffer===void 0)P.setupRenderTarget(R);else if(Ne.__hasExternalTextures)P.rebindTextures(R,be.get(R.texture).__webglTexture,be.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Le=R.depthTexture;if(Ne.__boundDepthTexture!==Le){if(Le!==null&&be.has(Le)&&(R.width!==Le.image.width||R.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(R)}}const He=R.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(ye=!0);const Ye=be.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ye[F])?O=Ye[F][W]:O=Ye[F],he=!0):R.samples>0&&P.useMultisampledRTT(R)===!1?O=be.get(R).__webglMultisampledFramebuffer:Array.isArray(Ye)?O=Ye[W]:O=Ye,N.copy(R.viewport),V.copy(R.scissor),z=R.scissorTest}else N.copy(de).multiplyScalar(I).floor(),V.copy(Ae).multiplyScalar(I).floor(),z=We;if(le.bindFramebuffer(U.FRAMEBUFFER,O)&&$&&le.drawBuffers(R,O),le.viewport(N),le.scissor(V),le.setScissorTest(z),he){const Ne=be.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ne.__webglTexture,W)}else if(ye){const Ne=be.get(R.texture),He=F||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ne.__webglTexture,W||0,He)}w=-1},this.readRenderTargetPixels=function(R,F,W,$,O,he,ye){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=be.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ye!==void 0&&(Pe=Pe[ye]),Pe){le.bindFramebuffer(U.FRAMEBUFFER,Pe);try{const Ne=R.texture,He=Ne.format,Ye=Ne.type;if(!Ue.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ue.textureTypeReadable(Ye)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=R.width-$&&W>=0&&W<=R.height-O&&U.readPixels(F,W,$,O,Ge.convert(He),Ge.convert(Ye),he)}finally{const Ne=b!==null?be.get(b).__webglFramebuffer:null;le.bindFramebuffer(U.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(R,F,W,$,O,he,ye){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=be.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ye!==void 0&&(Pe=Pe[ye]),Pe){const Ne=R.texture,He=Ne.format,Ye=Ne.type;if(!Ue.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ue.textureTypeReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=R.width-$&&W>=0&&W<=R.height-O){le.bindFramebuffer(U.FRAMEBUFFER,Pe);const Le=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Le),U.bufferData(U.PIXEL_PACK_BUFFER,he.byteLength,U.STREAM_READ),U.readPixels(F,W,$,O,Ge.convert(He),Ge.convert(Ye),0);const lt=b!==null?be.get(b).__webglFramebuffer:null;le.bindFramebuffer(U.FRAMEBUFFER,lt);const Mt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await nT(U,Mt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Le),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,he),U.deleteBuffer(Le),U.deleteSync(Mt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,F=null,W=0){R.isTexture!==!0&&(xo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,R=arguments[1]);const $=Math.pow(2,-W),O=Math.floor(R.image.width*$),he=Math.floor(R.image.height*$),ye=F!==null?F.x:0,Pe=F!==null?F.y:0;P.setTexture2D(R,0),U.copyTexSubImage2D(U.TEXTURE_2D,W,0,0,ye,Pe,O,he),le.unbindTexture()},this.copyTextureToTexture=function(R,F,W=null,$=null,O=0){R.isTexture!==!0&&(xo("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,R=arguments[1],F=arguments[2],O=arguments[3]||0,W=null);let he,ye,Pe,Ne,He,Ye,Le,lt,Mt;const wt=R.isCompressedTexture?R.mipmaps[O]:R.image;W!==null?(he=W.max.x-W.min.x,ye=W.max.y-W.min.y,Pe=W.isBox3?W.max.z-W.min.z:1,Ne=W.min.x,He=W.min.y,Ye=W.isBox3?W.min.z:0):(he=wt.width,ye=wt.height,Pe=wt.depth||1,Ne=0,He=0,Ye=0),$!==null?(Le=$.x,lt=$.y,Mt=$.z):(Le=0,lt=0,Mt=0);const wn=Ge.convert(F.format),ht=Ge.convert(F.type);let Ie;F.isData3DTexture?(P.setTexture3D(F,0),Ie=U.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(P.setTexture2DArray(F,0),Ie=U.TEXTURE_2D_ARRAY):(P.setTexture2D(F,0),Ie=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);const Ui=U.getParameter(U.UNPACK_ROW_LENGTH),ft=U.getParameter(U.UNPACK_IMAGE_HEIGHT),si=U.getParameter(U.UNPACK_SKIP_PIXELS),ws=U.getParameter(U.UNPACK_SKIP_ROWS),Nn=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,wt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,wt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ne),U.pixelStorei(U.UNPACK_SKIP_ROWS,He),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ye);const Ha=R.isDataArrayTexture||R.isData3DTexture,Tt=F.isDataArrayTexture||F.isData3DTexture;if(R.isRenderTargetTexture||R.isDepthTexture){const _i=be.get(R),Ga=be.get(F),Xn=be.get(_i.__renderTarget),hr=be.get(Ga.__renderTarget);le.bindFramebuffer(U.READ_FRAMEBUFFER,Xn.__webglFramebuffer),le.bindFramebuffer(U.DRAW_FRAMEBUFFER,hr.__webglFramebuffer);for(let fr=0;fr<Pe;fr++)Ha&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,be.get(R).__webglTexture,O,Ye+fr),R.isDepthTexture?(Tt&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,be.get(F).__webglTexture,O,Mt+fr),U.blitFramebuffer(Ne,He,he,ye,Le,lt,he,ye,U.DEPTH_BUFFER_BIT,U.NEAREST)):Tt?U.copyTexSubImage3D(Ie,O,Le,lt,Mt+fr,Ne,He,he,ye):U.copyTexSubImage2D(Ie,O,Le,lt,Mt+fr,Ne,He,he,ye);le.bindFramebuffer(U.READ_FRAMEBUFFER,null),le.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Tt?R.isDataTexture||R.isData3DTexture?U.texSubImage3D(Ie,O,Le,lt,Mt,he,ye,Pe,wn,ht,wt.data):F.isCompressedArrayTexture?U.compressedTexSubImage3D(Ie,O,Le,lt,Mt,he,ye,Pe,wn,wt.data):U.texSubImage3D(Ie,O,Le,lt,Mt,he,ye,Pe,wn,ht,wt):R.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,O,Le,lt,he,ye,wn,ht,wt.data):R.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,O,Le,lt,wt.width,wt.height,wn,wt.data):U.texSubImage2D(U.TEXTURE_2D,O,Le,lt,he,ye,wn,ht,wt);U.pixelStorei(U.UNPACK_ROW_LENGTH,Ui),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ft),U.pixelStorei(U.UNPACK_SKIP_PIXELS,si),U.pixelStorei(U.UNPACK_SKIP_ROWS,ws),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Nn),O===0&&F.generateMipmaps&&U.generateMipmap(Ie),le.unbindTexture()},this.copyTextureToTexture3D=function(R,F,W=null,$=null,O=0){return R.isTexture!==!0&&(xo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,$=arguments[1]||null,R=arguments[2],F=arguments[3],O=arguments[4]||0),xo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,F,W,$,O)},this.initRenderTarget=function(R){be.get(R).__webglFramebuffer===void 0&&P.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?P.setTextureCube(R,0):R.isData3DTexture?P.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?P.setTexture2DArray(R,0):P.setTexture2D(R,0),le.unbindTexture()},this.resetState=function(){T=0,A=0,b=null,le.reset(),mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=st._getDrawingBufferColorSpace(e),n.unpackColorSpace=st._getUnpackColorSpace()}}class km{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new Be(e),this.density=n}clone(){return new km(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class _v extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ii,this.environmentIntensity=1,this.environmentRotation=new Ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class fP{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=op,this.updateRanges=[],this.version=0,this.uuid=er()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=n.array[i+r];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=er()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=er()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const pn=new L;class vu{constructor(e,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)pn.fromBufferAttribute(this,n),pn.applyMatrix4(e),this.setXYZ(n,pn.x,pn.y,pn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)pn.fromBufferAttribute(this,n),pn.applyNormalMatrix(e),this.setXYZ(n,pn.x,pn.y,pn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)pn.fromBufferAttribute(this,n),pn.transformDirection(e),this.setXYZ(n,pn.x,pn.y,pn.z);return this}getComponent(e,n){let i=this.array[e*this.data.stride+this.offset+n];return this.normalized&&(i=pi(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=xt(i,this.array)),this.data.array[e*this.data.stride+this.offset+n]=i,this}setX(e,n){return this.normalized&&(n=xt(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=xt(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=xt(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=xt(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=pi(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=pi(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=pi(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=pi(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=xt(n,this.array),i=xt(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=xt(n,this.array),i=xt(i,this.array),r=xt(r,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=xt(n,this.array),i=xt(i,this.array),r=xt(r,this.array),s=xt(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new jn(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new vu(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class y1 extends Ms{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Bs;const io=new L,js=new L,Vs=new L,Hs=new pe,ro=new pe,S1=new pt,Jl=new L,so=new L,ec=new L,yv=new pe,ch=new pe,Sv=new pe;class pP extends zt{constructor(e=new y1){if(super(),this.isSprite=!0,this.type="Sprite",Bs===void 0){Bs=new Ht;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new fP(n,5);Bs.setIndex([0,1,2,0,2,3]),Bs.setAttribute("position",new vu(i,3,0,!1)),Bs.setAttribute("uv",new vu(i,2,3,!1))}this.geometry=Bs,this.material=e,this.center=new pe(.5,.5)}raycast(e,n){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),js.setFromMatrixScale(this.matrixWorld),S1.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Vs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&js.multiplyScalar(-Vs.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;tc(Jl.set(-.5,-.5,0),Vs,a,js,r,s),tc(so.set(.5,-.5,0),Vs,a,js,r,s),tc(ec.set(.5,.5,0),Vs,a,js,r,s),yv.set(0,0),ch.set(1,0),Sv.set(1,1);let o=e.ray.intersectTriangle(Jl,so,ec,!1,io);if(o===null&&(tc(so.set(-.5,.5,0),Vs,a,js,r,s),ch.set(0,1),o=e.ray.intersectTriangle(Jl,ec,so,!1,io),o===null))return;const l=e.ray.origin.distanceTo(io);l<e.near||l>e.far||n.push({distance:l,point:io.clone(),uv:kn.getInterpolation(io,Jl,so,ec,yv,ch,Sv,new pe),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function tc(t,e,n,i,r,s){Hs.subVectors(t,n).addScalar(.5).multiply(i),r!==void 0?(ro.x=s*Hs.x-r*Hs.y,ro.y=r*Hs.x+s*Hs.y):ro.copy(Hs),t.copy(e),t.x+=ro.x,t.y+=ro.y,t.applyMatrix4(S1)}class mP extends un{constructor(e=null,n=1,i=1,r,s,a,o,l,c=Bn,d=Bn,p,f){super(null,a,o,l,c,d,r,s,p,f),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mv extends jn{constructor(e,n,i,r=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Gs=new pt,Ev=new pt,nc=[],wv=new Ss,gP=new pt,ao=new Jt,oo=new Fa;class vP extends Jt{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new Mv(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,gP)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Ss),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Gs),wv.copy(e.boundingBox).applyMatrix4(Gs),this.boundingBox.union(wv)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fa),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Gs),oo.copy(e.boundingSphere).applyMatrix4(Gs),this.boundingSphere.union(oo)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,n){const i=this.matrixWorld,r=this.count;if(ao.geometry=this.geometry,ao.material=this.material,ao.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),oo.copy(this.boundingSphere),oo.applyMatrix4(i),e.ray.intersectsSphere(oo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Gs),Ev.multiplyMatrices(i,Gs),ao.matrixWorld=Ev,ao.raycast(e,nc);for(let a=0,o=nc.length;a<o;a++){const l=nc[a];l.instanceId=s,l.object=this,n.push(l)}nc.length=0}}setColorAt(e,n){this.instanceColor===null&&(this.instanceColor=new Mv(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,n){n.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,n){const i=n.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new mP(new Float32Array(r*this.count),r,this.count,Cm,Ci));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class up extends Ms{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const xu=new L,_u=new L,Tv=new pt,lo=new Nm,ic=new Fa,uh=new L,Cv=new L;class xP extends zt{constructor(e=new Ht,n=new up){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)xu.fromBufferAttribute(n,r-1),_u.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=xu.distanceTo(_u);e.setAttribute("lineDistance",new ct(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ic.copy(i.boundingSphere),ic.applyMatrix4(r),ic.radius+=s,e.ray.intersectsSphere(ic)===!1)return;Tv.copy(r).invert(),lo.copy(e.ray).applyMatrix4(Tv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,f=i.attributes.position;if(d!==null){const m=Math.max(0,a.start),y=Math.min(d.count,a.start+a.count);for(let x=m,g=y-1;x<g;x+=c){const h=d.getX(x),v=d.getX(x+1),S=rc(this,e,lo,l,h,v);S&&n.push(S)}if(this.isLineLoop){const x=d.getX(y-1),g=d.getX(m),h=rc(this,e,lo,l,x,g);h&&n.push(h)}}else{const m=Math.max(0,a.start),y=Math.min(f.count,a.start+a.count);for(let x=m,g=y-1;x<g;x+=c){const h=rc(this,e,lo,l,x,x+1);h&&n.push(h)}if(this.isLineLoop){const x=rc(this,e,lo,l,y-1,m);x&&n.push(x)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function rc(t,e,n,i,r,s){const a=t.geometry.attributes.position;if(xu.fromBufferAttribute(a,r),_u.fromBufferAttribute(a,s),n.distanceSqToSegment(xu,_u,uh,Cv)>i)return;uh.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(uh);if(!(l<e.near||l>e.far))return{distance:l,point:Cv.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const Av=new L,bv=new L;class Rv extends xP{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Av.fromBufferAttribute(n,r),bv.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Av.distanceTo(bv);e.setAttribute("lineDistance",new ct(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class M1 extends un{constructor(e,n,i,r,s,a,o,l,c){super(e,n,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Di{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const i=this.getLengths();let r=0;const s=i.length;let a;n?a=n:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const d=i[r],f=i[r+1]-d,m=(a-d)/f;return(r+m)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=n||(a.isVector2?new pe:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n){const i=new L,r=[],s=[],a=[],o=new L,l=new pt;for(let m=0;m<=e;m++){const y=m/e;r[m]=this.getTangentAt(y,new L)}s[0]=new L,a[0]=new L;let c=Number.MAX_VALUE;const d=Math.abs(r[0].x),p=Math.abs(r[0].y),f=Math.abs(r[0].z);d<=c&&(c=d,i.set(1,0,0)),p<=c&&(c=p,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let m=1;m<=e;m++){if(s[m]=s[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(r[m-1],r[m]),o.length()>Number.EPSILON){o.normalize();const y=Math.acos(jt(r[m-1].dot(r[m]),-1,1));s[m].applyMatrix4(l.makeRotationAxis(o,y))}a[m].crossVectors(r[m],s[m])}if(n===!0){let m=Math.acos(jt(s[0].dot(s[e]),-1,1));m/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(m=-m);for(let y=1;y<=e;y++)s[y].applyMatrix4(l.makeRotationAxis(r[y],m*y)),a[y].crossVectors(r[y],s[y])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Fm extends Di{constructor(e=0,n=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,n=new pe){const i=n,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const d=Math.cos(this.aRotation),p=Math.sin(this.aRotation),f=l-this.aX,m=c-this.aY;l=f*d-m*p+this.aX,c=f*p+m*d+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class _P extends Fm{constructor(e,n,i,r,s,a){super(e,n,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Om(){let t=0,e=0,n=0,i=0;function r(s,a,o,l){t=s,e=o,n=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,d,p){let f=(a-s)/c-(o-s)/(c+d)+(o-a)/d,m=(o-a)/d-(l-a)/(d+p)+(l-o)/p;f*=d,m*=d,r(a,o,f,m)},calc:function(s){const a=s*s,o=a*s;return t+e*s+n*a+i*o}}}const sc=new L,dh=new Om,hh=new Om,fh=new Om;class yP extends Di{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new L){const i=n,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,d;this.closed||o>0?c=r[(o-1)%s]:(sc.subVectors(r[0],r[1]).add(r[0]),c=sc);const p=r[o%s],f=r[(o+1)%s];if(this.closed||o+2<s?d=r[(o+2)%s]:(sc.subVectors(r[s-1],r[s-2]).add(r[s-1]),d=sc),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let y=Math.pow(c.distanceToSquared(p),m),x=Math.pow(p.distanceToSquared(f),m),g=Math.pow(f.distanceToSquared(d),m);x<1e-4&&(x=1),y<1e-4&&(y=x),g<1e-4&&(g=x),dh.initNonuniformCatmullRom(c.x,p.x,f.x,d.x,y,x,g),hh.initNonuniformCatmullRom(c.y,p.y,f.y,d.y,y,x,g),fh.initNonuniformCatmullRom(c.z,p.z,f.z,d.z,y,x,g)}else this.curveType==="catmullrom"&&(dh.initCatmullRom(c.x,p.x,f.x,d.x,this.tension),hh.initCatmullRom(c.y,p.y,f.y,d.y,this.tension),fh.initCatmullRom(c.z,p.z,f.z,d.z,this.tension));return i.set(dh.calc(l),hh.calc(l),fh.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new L().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Pv(t,e,n,i,r){const s=(i-e)*.5,a=(r-n)*.5,o=t*t,l=t*o;return(2*n-2*i+s+a)*l+(-3*n+3*i-2*s-a)*o+s*t+n}function SP(t,e){const n=1-t;return n*n*e}function MP(t,e){return 2*(1-t)*t*e}function EP(t,e){return t*t*e}function No(t,e,n,i){return SP(t,e)+MP(t,n)+EP(t,i)}function wP(t,e){const n=1-t;return n*n*n*e}function TP(t,e){const n=1-t;return 3*n*n*t*e}function CP(t,e){return 3*(1-t)*t*t*e}function AP(t,e){return t*t*t*e}function Lo(t,e,n,i,r){return wP(t,e)+TP(t,n)+CP(t,i)+AP(t,r)}class E1 extends Di{constructor(e=new pe,n=new pe,i=new pe,r=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new pe){const i=n,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Lo(e,r.x,s.x,a.x,o.x),Lo(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class bP extends Di{constructor(e=new L,n=new L,i=new L,r=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new L){const i=n,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Lo(e,r.x,s.x,a.x,o.x),Lo(e,r.y,s.y,a.y,o.y),Lo(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class w1 extends Di{constructor(e=new pe,n=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new pe){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new pe){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class RP extends Di{constructor(e=new L,n=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new L){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new L){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class T1 extends Di{constructor(e=new pe,n=new pe,i=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new pe){const i=n,r=this.v0,s=this.v1,a=this.v2;return i.set(No(e,r.x,s.x,a.x),No(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class PP extends Di{constructor(e=new L,n=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new L){const i=n,r=this.v0,s=this.v1,a=this.v2;return i.set(No(e,r.x,s.x,a.x),No(e,r.y,s.y,a.y),No(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class C1 extends Di{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new pe){const i=n,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],d=r[a>r.length-2?r.length-1:a+1],p=r[a>r.length-3?r.length-1:a+2];return i.set(Pv(o,l.x,c.x,d.x,p.x),Pv(o,l.y,c.y,d.y,p.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new pe().fromArray(r))}return this}}var Nv=Object.freeze({__proto__:null,ArcCurve:_P,CatmullRomCurve3:yP,CubicBezierCurve:E1,CubicBezierCurve3:bP,EllipseCurve:Fm,LineCurve:w1,LineCurve3:RP,QuadraticBezierCurve:T1,QuadraticBezierCurve3:PP,SplineCurve:C1});class NP extends Di{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Nv[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const d=l[c];i&&i.equals(d)||(n.push(d),i=d)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new Nv[r.type]().fromJSON(r))}return this}}class LP extends NP{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new w1(this.currentPoint.clone(),new pe(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new T1(this.currentPoint.clone(),new pe(e,n),new pe(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,a){const o=new E1(this.currentPoint.clone(),new pe(e,n),new pe(i,r),new pe(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new C1(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,n+l,i,r,s,a),this}absarc(e,n,i,r,s,a){return this.absellipse(e,n,i,i,r,s,a),this}ellipse(e,n,i,r,s,a,o,l){const c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,n+d,i,r,s,a,o,l),this}absellipse(e,n,i,r,s,a,o,l){const c=new Fm(e,n,i,r,s,a,o,l);if(this.curves.length>0){const p=c.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(c);const d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class zm extends Ht{constructor(e=[new pe(0,-.5),new pe(.5,0),new pe(0,.5)],n=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:n,phiStart:i,phiLength:r},n=Math.floor(n),r=jt(r,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],d=1/n,p=new L,f=new pe,m=new L,y=new L,x=new L;let g=0,h=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:g=e[v+1].x-e[v].x,h=e[v+1].y-e[v].y,m.x=h*1,m.y=-g,m.z=h*0,x.copy(m),m.normalize(),l.push(m.x,m.y,m.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:g=e[v+1].x-e[v].x,h=e[v+1].y-e[v].y,m.x=h*1,m.y=-g,m.z=h*0,y.copy(m),m.x+=x.x,m.y+=x.y,m.z+=x.z,m.normalize(),l.push(m.x,m.y,m.z),x.copy(y)}for(let v=0;v<=n;v++){const S=i+v*d*r,_=Math.sin(S),M=Math.cos(S);for(let T=0;T<=e.length-1;T++){p.x=e[T].x*_,p.y=e[T].y,p.z=e[T].x*M,a.push(p.x,p.y,p.z),f.x=v/n,f.y=T/(e.length-1),o.push(f.x,f.y);const A=l[3*T+0]*_,b=l[3*T+1],w=l[3*T+0]*M;c.push(A,b,w)}}for(let v=0;v<n;v++)for(let S=0;S<e.length-1;S++){const _=S+v*e.length,M=_,T=_+e.length,A=_+e.length+1,b=_+1;s.push(M,T,b),s.push(A,b,T)}this.setIndex(s),this.setAttribute("position",new ct(a,3)),this.setAttribute("uv",new ct(o,2)),this.setAttribute("normal",new ct(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zm(e.points,e.segments,e.phiStart,e.phiLength)}}class Bm extends zm{constructor(e=1,n=1,i=4,r=8){const s=new LP;s.absarc(0,-n/2,e,Math.PI*1.5,0),s.absarc(0,n/2,e,0,Math.PI*.5),super(s.getPoints(i),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:n,capSegments:i,radialSegments:r}}static fromJSON(e){return new Bm(e.radius,e.length,e.capSegments,e.radialSegments)}}class Li extends Ht{constructor(e=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const d=[],p=[],f=[],m=[];let y=0;const x=[],g=i/2;let h=0;v(),a===!1&&(e>0&&S(!0),n>0&&S(!1)),this.setIndex(d),this.setAttribute("position",new ct(p,3)),this.setAttribute("normal",new ct(f,3)),this.setAttribute("uv",new ct(m,2));function v(){const _=new L,M=new L;let T=0;const A=(n-e)/i;for(let b=0;b<=s;b++){const w=[],E=b/s,N=E*(n-e)+e;for(let V=0;V<=r;V++){const z=V/r,Y=z*l+o,ne=Math.sin(Y),Q=Math.cos(Y);M.x=N*ne,M.y=-E*i+g,M.z=N*Q,p.push(M.x,M.y,M.z),_.set(ne,A,Q).normalize(),f.push(_.x,_.y,_.z),m.push(z,1-E),w.push(y++)}x.push(w)}for(let b=0;b<r;b++)for(let w=0;w<s;w++){const E=x[w][b],N=x[w+1][b],V=x[w+1][b+1],z=x[w][b+1];(e>0||w!==0)&&(d.push(E,N,z),T+=3),(n>0||w!==s-1)&&(d.push(N,V,z),T+=3)}c.addGroup(h,T,0),h+=T}function S(_){const M=y,T=new pe,A=new L;let b=0;const w=_===!0?e:n,E=_===!0?1:-1;for(let V=1;V<=r;V++)p.push(0,g*E,0),f.push(0,E,0),m.push(.5,.5),y++;const N=y;for(let V=0;V<=r;V++){const Y=V/r*l+o,ne=Math.cos(Y),Q=Math.sin(Y);A.x=w*Q,A.y=g*E,A.z=w*ne,p.push(A.x,A.y,A.z),f.push(0,E,0),T.x=ne*.5+.5,T.y=Q*.5*E+.5,m.push(T.x,T.y),y++}for(let V=0;V<r;V++){const z=M+V,Y=N+V;_===!0?d.push(Y,Y+1,z):d.push(Y+1,Y,z),b+=3}c.addGroup(h,b,_===!0?1:2),h+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Li(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ai extends Li{constructor(e=1,n=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,n,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ai(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class dl extends Ht{constructor(e=[],n=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:i,detail:r};const s=[],a=[];o(r),c(i),d(),this.setAttribute("position",new ct(s,3)),this.setAttribute("normal",new ct(s.slice(),3)),this.setAttribute("uv",new ct(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const S=new L,_=new L,M=new L;for(let T=0;T<n.length;T+=3)m(n[T+0],S),m(n[T+1],_),m(n[T+2],M),l(S,_,M,v)}function l(v,S,_,M){const T=M+1,A=[];for(let b=0;b<=T;b++){A[b]=[];const w=v.clone().lerp(_,b/T),E=S.clone().lerp(_,b/T),N=T-b;for(let V=0;V<=N;V++)V===0&&b===T?A[b][V]=w:A[b][V]=w.clone().lerp(E,V/N)}for(let b=0;b<T;b++)for(let w=0;w<2*(T-b)-1;w++){const E=Math.floor(w/2);w%2===0?(f(A[b][E+1]),f(A[b+1][E]),f(A[b][E])):(f(A[b][E+1]),f(A[b+1][E+1]),f(A[b+1][E]))}}function c(v){const S=new L;for(let _=0;_<s.length;_+=3)S.x=s[_+0],S.y=s[_+1],S.z=s[_+2],S.normalize().multiplyScalar(v),s[_+0]=S.x,s[_+1]=S.y,s[_+2]=S.z}function d(){const v=new L;for(let S=0;S<s.length;S+=3){v.x=s[S+0],v.y=s[S+1],v.z=s[S+2];const _=g(v)/2/Math.PI+.5,M=h(v)/Math.PI+.5;a.push(_,1-M)}y(),p()}function p(){for(let v=0;v<a.length;v+=6){const S=a[v+0],_=a[v+2],M=a[v+4],T=Math.max(S,_,M),A=Math.min(S,_,M);T>.9&&A<.1&&(S<.2&&(a[v+0]+=1),_<.2&&(a[v+2]+=1),M<.2&&(a[v+4]+=1))}}function f(v){s.push(v.x,v.y,v.z)}function m(v,S){const _=v*3;S.x=e[_+0],S.y=e[_+1],S.z=e[_+2]}function y(){const v=new L,S=new L,_=new L,M=new L,T=new pe,A=new pe,b=new pe;for(let w=0,E=0;w<s.length;w+=9,E+=6){v.set(s[w+0],s[w+1],s[w+2]),S.set(s[w+3],s[w+4],s[w+5]),_.set(s[w+6],s[w+7],s[w+8]),T.set(a[E+0],a[E+1]),A.set(a[E+2],a[E+3]),b.set(a[E+4],a[E+5]),M.copy(v).add(S).add(_).divideScalar(3);const N=g(M);x(T,E+0,v,N),x(A,E+2,S,N),x(b,E+4,_,N)}}function x(v,S,_,M){M<0&&v.x===1&&(a[S]=v.x-1),_.x===0&&_.z===0&&(a[S]=M/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function h(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dl(e.vertices,e.indices,e.radius,e.details)}}class jm extends dl{constructor(e=1,n=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,n),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new jm(e.radius,e.detail)}}const ac=new L,oc=new L,ph=new L,lc=new kn;class IP extends Ht{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const r=Math.pow(10,4),s=Math.cos(fa*n),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],d=["a","b","c"],p=new Array(3),f={},m=[];for(let y=0;y<l;y+=3){a?(c[0]=a.getX(y),c[1]=a.getX(y+1),c[2]=a.getX(y+2)):(c[0]=y,c[1]=y+1,c[2]=y+2);const{a:x,b:g,c:h}=lc;if(x.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),h.fromBufferAttribute(o,c[2]),lc.getNormal(ph),p[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,p[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,p[2]=`${Math.round(h.x*r)},${Math.round(h.y*r)},${Math.round(h.z*r)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let v=0;v<3;v++){const S=(v+1)%3,_=p[v],M=p[S],T=lc[d[v]],A=lc[d[S]],b=`${_}_${M}`,w=`${M}_${_}`;w in f&&f[w]?(ph.dot(f[w].normal)<=s&&(m.push(T.x,T.y,T.z),m.push(A.x,A.y,A.z)),f[w]=null):b in f||(f[b]={index0:c[v],index1:c[S],normal:ph.clone()})}}for(const y in f)if(f[y]){const{index0:x,index1:g}=f[y];ac.fromBufferAttribute(o,x),oc.fromBufferAttribute(o,g),m.push(ac.x,ac.y,ac.z),m.push(oc.x,oc.y,oc.z)}this.setAttribute("position",new ct(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Vm extends dl{constructor(e=1,n=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,n),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new Vm(e.radius,e.detail)}}class tl extends dl{constructor(e=1,n=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,n),this.type="OctahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new tl(e.radius,e.detail)}}class Hm extends Ht{constructor(e=.5,n=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],d=[];let p=e;const f=(n-e)/r,m=new L,y=new pe;for(let x=0;x<=r;x++){for(let g=0;g<=i;g++){const h=s+g/i*a;m.x=p*Math.cos(h),m.y=p*Math.sin(h),l.push(m.x,m.y,m.z),c.push(0,0,1),y.x=(m.x/n+1)/2,y.y=(m.y/n+1)/2,d.push(y.x,y.y)}p+=f}for(let x=0;x<r;x++){const g=x*(i+1);for(let h=0;h<i;h++){const v=h+g,S=v,_=v+i+1,M=v+i+2,T=v+1;o.push(S,_,T),o.push(_,M,T)}}this.setIndex(o),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(c,3)),this.setAttribute("uv",new ct(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hm(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ti extends Ht{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const d=[],p=new L,f=new L,m=[],y=[],x=[],g=[];for(let h=0;h<=i;h++){const v=[],S=h/i;let _=0;h===0&&a===0?_=.5/n:h===i&&l===Math.PI&&(_=-.5/n);for(let M=0;M<=n;M++){const T=M/n;p.x=-e*Math.cos(r+T*s)*Math.sin(a+S*o),p.y=e*Math.cos(a+S*o),p.z=e*Math.sin(r+T*s)*Math.sin(a+S*o),y.push(p.x,p.y,p.z),f.copy(p).normalize(),x.push(f.x,f.y,f.z),g.push(T+_,1-S),v.push(c++)}d.push(v)}for(let h=0;h<i;h++)for(let v=0;v<n;v++){const S=d[h][v+1],_=d[h][v],M=d[h+1][v],T=d[h+1][v+1];(h!==0||a>0)&&m.push(S,_,T),(h!==i-1||l<Math.PI)&&m.push(_,M,T)}this.setIndex(m),this.setAttribute("position",new ct(y,3)),this.setAttribute("normal",new ct(x,3)),this.setAttribute("uv",new ct(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ti(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class yu extends Ht{constructor(e=1,n=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],l=[],c=[],d=new L,p=new L,f=new L;for(let m=0;m<=i;m++)for(let y=0;y<=r;y++){const x=y/r*s,g=m/i*Math.PI*2;p.x=(e+n*Math.cos(g))*Math.cos(x),p.y=(e+n*Math.cos(g))*Math.sin(x),p.z=n*Math.sin(g),o.push(p.x,p.y,p.z),d.x=e*Math.cos(x),d.y=e*Math.sin(x),f.subVectors(p,d).normalize(),l.push(f.x,f.y,f.z),c.push(y/r),c.push(m/i)}for(let m=1;m<=i;m++)for(let y=1;y<=r;y++){const x=(r+1)*m+y-1,g=(r+1)*(m-1)+y-1,h=(r+1)*(m-1)+y,v=(r+1)*m+y;a.push(x,g,v),a.push(g,h,v)}this.setIndex(a),this.setAttribute("position",new ct(o,3)),this.setAttribute("normal",new ct(l,3)),this.setAttribute("uv",new ct(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yu(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class DP extends cn{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class Su extends Ms{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=i1,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ii,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class UP extends Su{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return jt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Gm extends zt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class kP extends Gm{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const mh=new pt,Lv=new L,Iv=new L;class A1{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Im,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Lv.setFromMatrixPosition(e.matrixWorld),n.position.copy(Lv),Iv.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Iv),n.updateMatrixWorld(),mh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mh),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(mh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Dv=new pt,co=new L,gh=new L;class FP extends A1{constructor(){super(new Un(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new pe(4,2),this._viewportCount=6,this._viewports=[new St(2,1,1,1),new St(0,1,1,1),new St(3,1,1,1),new St(1,1,1,1),new St(3,0,1,1),new St(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),co.setFromMatrixPosition(e.matrixWorld),i.position.copy(co),gh.copy(i.position),gh.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(gh),i.updateMatrixWorld(),r.makeTranslation(-co.x,-co.y,-co.z),Dv.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dv)}}class Mu extends Gm{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new FP}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class OP extends A1{constructor(){super(new Dm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zP extends Gm{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new OP}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class BP{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Uv(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Uv();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function Uv(){return performance.now()}const kv=new pt;class jP{constructor(e,n,i=0,r=1/0){this.ray=new Nm(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Lm,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return kv.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kv),this}intersectObject(e,n=!0,i=[]){return dp(e,this,i,n),i.sort(Fv),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)dp(e[r],this,i,n);return i.sort(Fv),i}}function Fv(t,e){return t.distance-e.distance}function dp(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let a=0,o=s.length;a<o;a++)dp(s[a],e,n,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sm}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sm);class Qu extends Jt{constructor(){const e=Qu.SkyShader,n=new cn({name:e.name,uniforms:Pa.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:_n,depthWrite:!1});super(new Ft(1,1,1),n),this.isSky=!0}}Qu.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new L},up:{value:new L(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};const b1={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ba{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const VP=new Dm(-1,1,1,-1,0,1);class HP extends Ht{constructor(){super(),this.setAttribute("position",new ct([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ct([0,2,0,0,2,0],2))}}const GP=new HP;class Wm{constructor(e){this._mesh=new Jt(GP,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,VP)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class WP extends Ba{constructor(e,n){super(),this.textureID=n!==void 0?n:"tDiffuse",e instanceof cn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Pa.clone(e.uniforms),this.material=new cn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Wm(this.material)}render(e,n,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ov extends Ba{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,i){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class XP extends Ba{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class $P{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){const i=e.getSize(new pe);this._width=i.width,this._height=i.height,n=new ei(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ni}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new WP(b1),this.copyPass.material.blending=Ji,this.clock=new BP}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const n=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Ov!==void 0&&(a instanceof Ov?i=!0:a instanceof XP&&(i=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){const n=this.renderer.getSize(new pe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class qP extends Ba{constructor(e,n,i=null,r=null,s=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Be}render(e,n,i){const r=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}}const YP={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Be(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Na extends Ba{constructor(e,n,i,r){super(),this.strength=n!==void 0?n:1,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new pe(e.x,e.y):new pe(256,256),this.clearColor=new Be(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new ei(s,a,{type:Ni}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let p=0;p<this.nMips;p++){const f=new ei(s,a,{type:Ni});f.texture.name="UnrealBloomPass.h"+p,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const m=new ei(s,a,{type:Ni});m.texture.name="UnrealBloomPass.v"+p,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),s=Math.round(s/2),a=Math.round(a/2)}const o=YP;this.highPassUniforms=Pa.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new cn({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let p=0;p<this.nMips;p++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[p])),this.separableBlurMaterials[p].uniforms.invSize.value=new pe(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const d=b1;this.copyUniforms=Pa.clone(d.uniforms),this.blendMaterial=new cn({uniforms:this.copyUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader,blending:fu,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Be,this.oldClearAlpha=1,this.basic=new Oa,this.fsQuad=new Wm(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,n){let i=Math.round(e/2),r=Math.round(n/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new pe(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,n,i,r,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Na.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Na.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const n=[];for(let i=0;i<e;i++)n.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new cn({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new pe(.5,.5)},direction:{value:new pe(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new cn({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Na.BlurDirectionX=new pe(1,0);Na.BlurDirectionY=new pe(0,1);const KP={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class ZP extends Ba{constructor(){super();const e=KP;this.uniforms=Pa.clone(e.uniforms),this.material=new DP({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Wm(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,n,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},st.getTransfer(this._outputColorSpace)===vt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Vy?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Hy?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Gy?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Mm?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Wy?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Xy&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const cc=(t,e)=>{const n=Math.sin(t*12.9898+e*78.233)*43758.5453;return n-Math.floor(n)};function xs(t,e){const i=Math.floor(t/8),r=Math.floor(e/8),s=t/8-i,a=e/8-r,o=s*s*(3-2*s),l=a*a*(3-2*a);return cc(i,r)*(1-o)*(1-l)+cc(i+1,r)*o*(1-l)+cc(i,r+1)*(1-o)*l+cc(i+1,r+1)*o*l}function ma(t,e){const n=xs(t,e);return n<.14?{kind:"deep",cost:99,resource:"perle"}:n<.22?{kind:"shallow",cost:4,resource:"eau"}:n<.58?{kind:"plain",cost:1,resource:"herbe"}:n<.74?{kind:"forest",cost:2,resource:"bois"}:{kind:"mountain",cost:3,resource:"pierre"}}const R1=t=>t<.22?(.22-.34)*1.6-(.22-t)*5.5:(t-.34)*1.6+Math.max(0,t-.58)**2*34,uc=R1(.22),Hi=(t,e,n)=>{const i=Math.min(1,Math.max(0,(n-t)/(e-t)));return i*i*(3-2*i)},P1=(t,e)=>(xs(t*2.7+50,e*2.7+50)-.5)*.09+(xs(t*6.3+9,e*6.3+9)-.5)*.04,N1=(t,e)=>1-Math.abs(xs(t*1.9+7,e*1.9+3)*2-1),qn=(t,e)=>{const n=xs(t,e);return R1(n)+P1(t,e)*(n>.22?1:.3)+N1(t,e)*.55*Hi(.7,.86,n)},cr=(t,e,n)=>new Be().setRGB(t,e,n,vn),QP=cr(.03,.09,.18),JP=cr(.2,.5,.55),e3=cr(.74,.66,.45),t3=cr(.25,.43,.15),n3=cr(.37,.5,.18),i3=cr(.1,.24,.09),r3=cr(.42,.4,.39),s3=cr(.3,.29,.3),a3=cr(.93,.95,.98),zv=new Be;function o3(t,e,n,i){const r=xs(t,e),s=P1(t,e);return i.copy(QP),i.lerp(JP,Hi(.1,.16,r)),i.lerp(e3,Hi(.2,.225,r)),i.lerp(zv.copy(t3).lerp(n3,Hi(-.05,.07,s)),Hi(.235,.27,r)),i.lerp(i3,Hi(.56,.62,r)),i.lerp(zv.copy(r3).lerp(s3,Hi(.4,.75,N1(t,e))),Hi(.72,.78,r)),i.lerp(a3,Hi(2.4,3.2,n)),i.multiplyScalar(.9+s*1.2),i}const kt=(t,e)=>{const n=Math.sin(t*127.1+e*311.7)*43758.5453;return n-Math.floor(n)},_t=(t,e={})=>new Su({color:t,roughness:.75,metalness:0,...e}),Zr=()=>_t(9078399,{roughness:.95}),Je=(t,e,n=0,i=0,r=0)=>{const s=new Jt(t,e);return s.position.set(n,i,r),s.castShadow=s.receiveShadow=!0,s};function l3(t,e="#fff"){const n=document.createElement("canvas");n.width=256,n.height=64;const i=n.getContext("2d");i.font='600 30px "Alegreya Sans", system-ui, sans-serif',i.textAlign="center",i.lineWidth=6,i.strokeStyle="rgba(8,8,16,.85)",i.strokeText(t,128,40),i.fillStyle=e,i.fillText(t,128,40);const r=new M1(n);r.colorSpace=vn;const s=new pP(new y1({map:r,depthTest:!1,transparent:!0}));return s.scale.set(1.9,.48,1),s.renderOrder=20,s}function c3(t,e){const n=new Qn,i={human:8018490,demon:3870482,angel:15659515}[t]??2184;if(n.add(Je(new Bm(.2,.5,6,14),_t(i,{roughness:.6}),0,.55,0),Je(new ti(.13,20,16),_t(14264190,{roughness:.55}),0,1.13,0),Je(new yu(.2,.025,8,20),_t(2760728),0,.62,0)),n.children[2].rotation.x=Math.PI/2,t==="angel"){for(const s of[-1,1]){const a=Je(new ti(.4,18,12),_t(16777215,{roughness:.4,emissive:10467583,emissiveIntensity:.25}),s*.3,.85,-.18);a.scale.set(.09,1.05,.55),a.rotation.z=s*.35,n.add(a)}n.add(Je(new yu(.13,.015,8,28),_t(16770720,{emissive:16765802,emissiveIntensity:2.2}),0,1.42,0)),n.children.at(-1).rotation.x=Math.PI/2}if(t==="demon")for(const s of[-1,1]){const a=Je(new Ai(.035,.24,8),_t(1707020,{roughness:.4}),s*.09,1.3,0);a.rotation.z=-s*.5,n.add(a);const o=Je(new ti(.018,8,8),_t(16726810,{emissive:16726810,emissiveIntensity:4}),s*.05,1.15,.12);n.add(o)}if(t==="human"&&n.add(Je(new Ft(.34,.5,.04),_t(2375787,{roughness:.9}),0,.62,-.2)),e){const s=Je(new Hm(.34,.4,36).rotateX(-Math.PI/2),new Oa({color:15782538,transparent:!0,opacity:.9}),0,.03,0);s.castShadow=!1,n.add(s)}return n}const u3={Léviathan:[1923192,2871551],Balrog:[3804936,16734751],Minotaure:[5978916,16760928]};function d3(t){const[e,n]=u3[t]??[4473924,16711680],i=new Qn,r=Je(new ti(.5,20,16),_t(e,{roughness:.55}),0,.85,0);r.scale.set(1,.85,1.5),i.add(r);for(const[s,a]of[[-.3,.45],[.3,.45],[-.3,-.45],[.3,-.45]])i.add(Je(new Li(.12,.09,.7,8),_t(e),s,.35,a));i.add(Je(new ti(.28,18,14),_t(e,{roughness:.5}),0,1.25,.8));for(const s of[-1,1]){const a=Je(new Ai(.07,.55,8),_t(15327951,{roughness:.4}),s*.22,1.6,.8);a.rotation.z=-s*.7,i.add(a),i.add(Je(new ti(.04,8,8),_t(n,{emissive:n,emissiveIntensity:5}),s*.1,1.3,1.04))}return i.add(new Mu(n,3,4)),i.scale.setScalar(1.7),i}function h3(t){const e=new Qn,n=t.building_kind;if(n==="capital"){e.add(Je(new Ft(1.5,1.2,1.5),Zr(),0,.6,0));for(const[i,r]of[[-.8,-.8],[.8,-.8],[-.8,.8],[.8,.8]])e.add(Je(new Li(.28,.32,1.8,12),Zr(),i,.9,r)),e.add(Je(new Ai(.4,.7,12),_t(7023140,{roughness:.7}),i,2.15,r));e.add(Je(new Ft(.4,.7,.05),_t(2759182),0,.35,.76),Je(new Ft(.1,.15,.05),_t(16765562,{emissive:16757575,emissiveIntensity:2}),.4,.9,.76)),e.scale.setScalar(1.1)}else if(n==="door"){for(const r of[-1,1])e.add(Je(new Ft(.28,2.2,.4),Zr(),r*.5,1.1,0));e.add(Je(new Ft(1.3,.3,.45),Zr(),0,2.25,0));const i=Je(new Zi(.75,2),new Oa({color:11041791,transparent:!0,opacity:.55,side:wi}),0,1.1,0);i.castShadow=!1,e.add(i),e.add(new Mu(11041791,4,5).translateY(1.2)),e.userData.tick=r=>{i.material.opacity=.45+Math.sin(r*2)*.12}}else n==="tower"?e.add(Je(new Li(.4,.5,2.2,14),Zr(),0,1.1,0),Je(new Ai(.58,.8,14),_t(5650218,{roughness:.8}),0,2.6,0)):n==="factory"?e.add(Je(new Ft(.9,.7,.9),_t(8018496,{roughness:.9}),0,.35,0),Je(new Li(.1,.13,.8,8),Zr(),.25,1,.2),Je(new Ft(.2,.18,.04),_t(16757575,{emissive:16747546,emissiveIntensity:2.5}),-.2,.4,.46)):n==="totem"?(e.add(Je(new Ft(.34,1.6,.34),_t(4012613,{roughness:.8}),0,.8,0),Je(new tl(.2),_t(8118527,{emissive:3721471,emissiveIntensity:3}),0,1.9,0)),e.add(new Mu(3721471,2.5,4).translateY(1.9)),e.userData.tick=i=>{e.children[1].rotation.y=i,e.children[1].position.y=1.9+Math.sin(i*2)*.06}):e.add(Je(new Ft(.98,1,.98),Zr(),0,.5,0));return e}function f3(t){const e=new Qn,n=t?10690588:15328988,i=Je(new ti(.34,18,14),_t(n,{roughness:.5}),0,.5,0);i.scale.set(.9,.8,1.5),e.add(i);const r=Je(new Li(.08,.12,.45,8),_t(n),0,.82,.42);if(r.rotation.x=.6,e.add(r,Je(new ti(.13,14,12),_t(n),0,1.05,.6)),t){for(const s of[-1,1]){const a=Je(new ti(.5,16,10),_t(12857386,{roughness:.6,emissive:5901320,emissiveIntensity:.4}),s*.55,.78,-.05);a.scale.set(1,.06,.55),a.rotation.z=s*.25,e.add(a)}e.userData.tick=s=>e.children.slice(3).forEach((a,o)=>{a.rotation.z=(o?-1:1)*(.25+Math.sin(s*5)*.28)})}else for(const[s,a]of[[-.16,.3],[.16,.3],[-.16,-.3],[.16,-.3]])e.add(Je(new Li(.05,.04,.45,6),_t(n),s,.22,a));return e}function p3(){const t=new Qn,e=_t(6122362,{roughness:.9});t.add(Je(new Ft(.62,.7,.4),e,0,.7,0),Je(new Ft(.36,.3,.32),e,0,1.18,0));for(const n of[-1,1])t.add(Je(new Ft(.2,.7,.22),e,n*.45,.65,0),Je(new Ft(.22,.5,.26),e,n*.17,.25,0),Je(new ti(.035,8,8),_t(6285567,{emissive:6285567,emissiveIntensity:5}),n*.08,1.2,.17));return t.add(new Mu(6285567,1.5,3).translateY(1.2)),t}const m3={human:"#e8c89a",demon:"#ff8a70",angel:"#cfeaff"};function g3(t,e){let n=t.kind==="monster"?d3(t.name):t.kind==="building"?h3(t):t.kind==="summon"?p3():c3(t.race,e);if(t.kind==="character"&&t.mount_name){const a=f3(t.mount_flying),o=n;o.position.y=.42,a.add(o),a.userData.tick=a.userData.tick,n=a}const i=t.mount_name?2.2:t.kind==="summon"?1.9:t.kind==="monster"?3.3:t.kind==="building"?t.building_kind==="capital"?3.3:2.9:1.75,r=new Qn;r.add(n),r.userData.tick=n.userData.tick;const s=l3(t.name??"",t.kind==="character"?m3[t.race]??"#fff":t.kind==="monster"?"#ff9a8a":t.kind==="summon"?"#8fe9ff":"#f0d28a");return s.position.y=i,r.add(s),r}const v3=()=>{const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d");e.fillStyle="#d8d8d8",e.fillRect(0,0,256,256);for(const[i,r]of[[8,.3],[32,.25],[128,.15],[256,.1]]){const s=document.createElement("canvas");s.width=s.height=i;const a=s.getContext("2d"),o=a.createImageData(i,i);for(let l=0;l<i*i;l++){const c=Math.random()*255;o.data.set([c,c,c,255],l*4)}a.putImageData(o,0,0),e.globalAlpha=r,e.drawImage(s,0,0,256,256)}const n=new M1(t);return n.wrapS=n.wrapT=pu,n.colorSpace=vn,n.anisotropy=8,n};function L1(t,{onClick:e=()=>{},onHover:n=()=>{},orbit:i=!1}={}){const r=()=>t.clientWidth||innerWidth,s=()=>t.clientHeight||innerHeight,a=new hP({antialias:!1,powerPreference:"high-performance"});a.setPixelRatio(Math.min(devicePixelRatio,2)),a.setSize(r(),s()),a.shadowMap.enabled=!0,a.shadowMap.type=By,a.toneMapping=Mm,t.appendChild(a.domElement);const o=new _v,l=new Un(38,r()/s(),.1,400),c=new km(11125468,.02);o.fog=c;const d=new kP(13624575,3813154,.6),p=new zP(16773590,2.4);o.add(d,p,p.target),p.castShadow=!0,p.shadow.mapSize.set(2048,2048),p.shadow.bias=-6e-4,p.shadow.normalBias=.04,p.shadow.radius=4;const f=new ei(r(),s(),{samples:4,type:Ni}),m=new $P(a,f),y=new Na(new pe(r(),s()),.3,.6,.92);m.addPass(new qP(o,l)),m.addPass(y),m.addPass(new ZP);const x=new _v,g=new Qu;g.scale.setScalar(1e3),x.add(g);const h=new lp(a);let v=null,S=30;const _=new Be(2766936),M=new Be(9071224),T=new Be(11124952);function A(){const q=new Date,D=q.getHours()+q.getMinutes()/60;S=Math.max(-6,58*Math.sin(Math.PI*(D-6)/12));const B=ki.lerp,G=ki.smoothstep,te=G(S,-3,12),ue=1-G(S,4,24),_e=g.material.uniforms,Ze=new L().setFromSphericalCoords(1,ki.degToRad(90-Math.max(S,3)),ki.degToRad(150));_e.sunPosition.value.copy(Ze),_e.turbidity.value=4+ue*4,_e.rayleigh.value=1.4+ue*1.6,_e.mieCoefficient.value=.004,_e.mieDirectionalG.value=.85,v==null||v.dispose(),v=h.fromScene(x),o.environment=v.texture,o.background=v.texture,o.backgroundBlurriness=.03,o.backgroundIntensity=B(.75,.85,te),o.environmentIntensity=B(.7,1,te),p.userData.dir=new L().setFromSphericalCoords(1,ki.degToRad(90-Math.max(S,34)),ki.degToRad(150)),p.intensity=B(1.7,3.1,te)*(1-ue*.15),p.color.set(te<.45?11124991:ue>.3?16763024:16773590),d.intensity=B(1,.95,te),d.color.set(te<.45?9348070:14675711),d.groundColor.set(te<.45?3488860:7035461),a.toneMappingExposure=B(1.25,1.3,te),c.color.copy(_).lerp(M,G(S,-4,6)).lerp(T,G(S,8,28)),c.density=.009+(1-te)*.003,y.strength=.22+(1-te)*.1,z&&Ue()}let b=0,w=0,E,N,V,z=null;const Y=v3(),ne=new Su({vertexColors:!0,map:Y,roughness:.95,metalness:0}),Q=new Zi(1,1,56,56).rotateX(-Math.PI/2),K=new Jt(Q,new UP({color:2785187,roughness:.04,metalness:0,transparent:!0,opacity:.6,clearcoat:1,envMapIntensity:1.3}));K.receiveShadow=!0,o.add(K);const I=(q,D,B)=>{const G=new vP(q,D,B);return G.castShadow=G.receiveShadow=!0,G.frustumCulled=!1,G.count=0,o.add(G),G},H=(q,D={})=>new Su({color:q,roughness:.9,...D}),J=I(new Li(.05,.085,.55,6).translate(0,.27,0),H(4862754,{roughness:1}),6e3),de=I(new Ai(.34,.8,8).translate(0,.85,0),H(1919522),6e3),Ae=I(new Ai(.24,.6,8).translate(0,1.3,0),H(2776360),6e3),We=I(new Vm(.34,1).translate(0,.78,0),H(4160042,{flatShading:!0}),3e3),Z=I(new Ai(.045,.24,4).translate(0,.12,0),H(6265397),9e3),ae=I(new jm(.3,1),H(7828333,{flatShading:!0,map:Y}),3e3),xe=I(new Ai(.34,1,6).translate(0,.5,0),H(7236200,{flatShading:!0,map:Y}),3e3),fe=I(new tl(.12).scale(1,1.9,1).translate(0,.12,0),H(16765514,{emissive:16752640,emissiveIntensity:1.6,roughness:.25}),1500),De=I(new tl(.12).scale(1,1.9,1).translate(0,.12,0),H(7334143,{emissive:1619199,emissiveIntensity:1.8,roughness:.25}),1500),je=[J,de,Ae,We,Z,ae,xe,fe,De],ve={x:0,y:0},it=new L,$e=new Be,ut=new zt;let U=5;function Ce(q){U=q,b=Math.min(q+3,22),w=b*2*3,E==null||E.dispose(),E=new Zi(b*2,b*2,w,w).rotateX(-Math.PI/2),V=E.attributes.position.array.slice(),E.setAttribute("color",new jn(new Float32Array(E.attributes.position.count*3),3)),N&&o.remove(N),N=new Jt(E,ne),N.receiveShadow=!0,N.castShadow=!0,o.add(N),Q.scale(1,1,1),K.scale.set(b*2+8,1,b*2+8)}const Me=(q,D,B)=>ki.smoothstep(B,q,D);function Ue(){const q=E.attributes.position.array,D=E.attributes.color.array,B=E.attributes.uv.array;for(let G=0,te=0;G<q.length;G+=3,te+=2){const ue=ve.x+V[G],_e=ve.y+V[G+2],Ze=qn(ue,_e);q[G]=ue,q[G+1]=Ze,q[G+2]=_e,B[te]=ue*.35,B[te+1]=_e*.35,o3(ue,_e,Ze,$e);const Oe=Math.max(Math.abs(ue-ve.x),Math.abs(_e-ve.y));$e.lerp(c.color,Me(U+.4,U+2.4,Oe)),D[G]=$e.r,D[G+1]=$e.g,D[G+2]=$e.b}E.attributes.position.needsUpdate=E.attributes.color.needsUpdate=E.attributes.uv.needsUpdate=!0,E.computeVertexNormals(),E.computeBoundingSphere(),E.computeBoundingBox(),K.position.set(ve.x,uc,ve.y)}function le(q){const D={t:0,p:0,o:0,g:0,b:0,s:0,og:0,ob:0},B=(G,te,ue,_e,Ze,Oe,rt,at=Oe)=>{ut.position.set(ue,_e,Ze),ut.rotation.set(0,rt,0),ut.scale.set(Oe,at,Oe),ut.updateMatrix(),G.setMatrixAt(te,ut.matrix)};for(let G=-U-1;G<=U+1;G++)for(let te=-U-1;te<=U+1;te++){const ue=ve.x+G,_e=ve.y+te;if(q.has(ue+","+_e))continue;const Ze=xs(ue,_e),Oe=1-Me(U-.5,U+1.2,Math.max(Math.abs(G),Math.abs(te)));if(Oe<=.05||Ze<.235)continue;const rt=(dt,qe)=>(kt(ue*3+dt,_e*5+qe)-.5)*.86,at=Ze>=.58&&Ze<.74,Mn=Ze>=.74,En=at?5:Ze>=.7&&Ze<.74?2:Ze<.58&&kt(ue,_e)<.07?1:0;for(let dt=0;dt<En&&D.t<6e3;dt++){const qe=ue+rt(dt,1),gt=_e+rt(dt,2),Dt=qn(qe,gt),fn=(.7+kt(ue+dt,_e*7)*.8)*Oe,Wn=!at||kt(ue+dt*9,_e)<.7;B(J,D.t++,qe,Dt,gt,fn,kt(qe,gt)*6),Wn?(B(de,D.p,qe,Dt,gt,fn,0),B(Ae,D.p++,qe,Dt,gt,fn,0)):B(We,D.o++,qe,Dt,gt,fn*1.1,kt(gt,qe)*6)}if(Ze<.58)for(let dt=0;dt<3&&D.g<9e3;dt++){const qe=ue+rt(dt,3),gt=_e+rt(dt,4);B(Z,D.g++,qe,qn(qe,gt),gt,(.7+kt(qe,gt)*.8)*Oe,kt(gt,qe)*6,(.8+kt(qe,gt*2))*Oe)}if(Mn){const dt=1+(Ze-.74)*7;for(let qe=0;qe<2&&D.s<3e3;qe++){const gt=ue+rt(qe,5)*.8,Dt=_e+rt(qe,6)*.8,fn=(.7+kt(ue+qe,_e+3)*.9)*Oe;B(xe,D.s++,gt,qn(gt,Dt)-.1,Dt,fn,kt(gt,Dt)*6,fn*(1.1+kt(Dt,gt)*1.3)*dt)}for(let qe=0;qe<2&&D.b<3e3;qe++){const gt=ue+rt(qe,7),Dt=_e+rt(qe,8);B(ae,D.b++,gt,qn(gt,Dt)+.1,Dt,(.5+kt(gt,Dt)*1.1)*Oe,kt(Dt,gt)*6)}if(kt(ue,_e*2)<.6){const qe=kt(_e,ue)<.5,gt=ue+rt(1,9)*.6,Dt=_e+rt(2,9)*.6,fn=qn(gt,Dt);for(let Wn=0;Wn<3;Wn++){const Gr=gt+(Wn-1)*.1,ja=Dt+(Wn%2?.08:-.08),Va=(.8+kt(Wn,ue)*.8)*Oe;qe?D.ob<1500&&B(De,D.ob++,Gr,fn,ja,Va,Wn):D.og<1500&&B(fe,D.og++,Gr,fn,ja,Va,Wn)}}}else if(Ze<.5&&kt(ue+4,_e)<.04&&D.b<3e3){const dt=ue+rt(0,7),qe=_e+rt(1,8);B(ae,D.b++,dt,qn(dt,qe)+.08,qe,(.4+kt(dt,qe)*.5)*Oe,kt(qe,dt)*6)}}J.count=D.t,de.count=Ae.count=D.p,We.count=D.o,Z.count=D.g,ae.count=D.b,xe.count=D.s,fe.count=D.og,De.count=D.ob;for(const G of je)G.instanceMatrix.needsUpdate=!0}const Ve=new Rv(new Ht,new up({vertexColors:!0,transparent:!0,blending:fu,depthWrite:!1}));Ve.frustumCulled=!1,Ve.renderOrder=2,o.add(Ve);function be(){const q=[],D=[],B=U,G=(te,ue,_e,Ze)=>{const Oe=Math.max(1,Math.round(Math.hypot(_e-te,Ze-ue)/.5));for(let rt=0;rt<Oe;rt++)for(const at of[rt/Oe,(rt+1)/Oe]){const Mn=te+(_e-te)*at,En=ue+(Ze-ue)*at,dt=1-Me(B-.4,B+.6,Math.max(Math.abs(Mn-ve.x),Math.abs(En-ve.y))),qe=.2*dt;q.push(Mn,Math.max(qn(Mn,En),uc)+.04,En),D.push(qe,qe,qe*.92)}};for(let te=0;te<=2*B+1;te++){const ue=-B-.5+te;G(ve.x+ue,ve.y-B-.5,ve.x+ue,ve.y+B+.5),G(ve.x-B-.5,ve.y+ue,ve.x+B+.5,ve.y+ue)}Ve.geometry.dispose(),Ve.geometry=new Ht,Ve.geometry.setAttribute("position",new ct(q,3)),Ve.geometry.setAttribute("color",new ct(D,3))}const P=(q,D)=>{const B=new Qn,G=new Oa({color:q,transparent:!0,opacity:D,depthTest:!1});return B.add(new Jt(new Zi(.96,.96).rotateX(-Math.PI/2),G)),B.add(new Rv(new IP(new Zi(.96,.96).rotateX(-Math.PI/2)),new up({color:q,depthTest:!1}))),B.renderOrder=10,B.visible=!1,o.add(B),B},C=P(15782538,.16),j=P(16777215,.28),ie=(q,D)=>{q.visible=!!D,D&&q.position.set(D.x,Math.max(qn(D.x,D.y),uc)+.06,D.y)},re=new Map,ee=new Qn;o.add(ee);function Re(q,D){const B=new Set;for(const G of D){if(Math.max(Math.abs(G.x-q.pos.x),Math.abs(G.y-q.pos.y))>U)continue;const te=`${G.kind}:${G.char_id??G.monster_id??G.summon_id??G.building_id??G.x+","+G.y}:${G.mount_name??""}`;B.add(te);const ue=Math.max(qn(G.x,G.y),uc);let _e=re.get(te);_e||(_e={g:g3(G,G.char_id===q.id),t:new L(G.x,ue,G.y)},_e.g.position.copy(_e.t),ee.add(_e.g),re.set(te,_e)),_e.t.set(G.x,ue,G.y),_e.g.userData.cell={x:G.x,y:G.y}}for(const[G,te]of re)B.has(G)||(ee.remove(te.g),re.delete(G))}let me=.35,Se=1,et=!1,ce=0,Ee=performance.now();const Fe=new jP,ze=new pe,we=q=>{const D=a.domElement.getBoundingClientRect();ze.set((q.clientX-D.left)/D.width*2-1,-((q.clientY-D.top)/D.height)*2+1),Fe.setFromCamera(ze,l);const B=Fe.intersectObjects([...ee.children,N],!0)[0];if(!B)return null;let G=B.object;for(;G&&!G.userData.cell;)G=G.parent;const te=(G==null?void 0:G.userData.cell)??{x:Math.round(B.point.x),y:Math.round(B.point.z)};return Math.max(Math.abs(te.x-ve.x),Math.abs(te.y-ve.y))<=U?te:null},Xe=a.domElement;Xe.oncontextmenu=q=>q.preventDefault(),Xe.onwheel=q=>{Se=ki.clamp(Se*(q.deltaY>0?1.08:.92),.55,1.7)},Xe.onpointerdown=q=>{q.button===2&&(et=!0)},addEventListener("pointerup",()=>{et=!1}),i||(Xe.onpointermove=q=>{if(et){me-=q.movementX*.005;return}const D=we(q);ie(C,D),n(D,q.clientX,q.clientY)},Xe.onpointerleave=()=>{ie(C,null),n(null)},Xe.onclick=q=>{const D=we(q);ie(j,D),D&&e(D,q.clientX,q.clientY)});const Ge=()=>{a.setSize(r(),s()),m.setSize(r(),s()),l.aspect=r()/s(),l.updateProjectionMatrix()};addEventListener("resize",Ge);function mt(q){var Oe,rt;ce=requestAnimationFrame(mt);const D=Math.min(.05,(q-Ee)/1e3);Ee=q;const B=q/1e3;i&&(me+=D*.06);for(const at of re.values()){const Mn=at.t.x-at.g.position.x,En=at.t.z-at.g.position.z;Mn*Mn+En*En>1e-4&&(at.g.rotation.y=ki.lerp(at.g.rotation.y,Math.atan2(Mn,En),.2)),at.g.position.lerp(at.t,1-Math.exp(-D*8)),(rt=(Oe=at.g.userData).tick)==null||rt.call(Oe,B)}it.lerp(new L(ve.x,qn(ve.x,ve.y),ve.y),1-Math.exp(-D*6));const G=(U*.85+6)*Se,te=.92;l.position.set(it.x+Math.sin(me)*Math.cos(te)*G,it.y+Math.sin(te)*G,it.z+Math.cos(me)*Math.cos(te)*G),l.lookAt(it),p.position.copy(it).addScaledVector(p.userData.dir??new L(.5,1,.3),30),p.target.position.copy(it);const ue=U+4;Object.assign(p.shadow.camera,{left:-ue,right:ue,top:ue,bottom:-ue,near:1,far:80}),p.shadow.camera.updateProjectionMatrix();const _e=Q.attributes.position,Ze=b*2+8;for(let at=0;at<_e.count;at++){const Mn=_e.getX(at)*Ze+ve.x,En=_e.getZ(at)*Ze+ve.y;_e.setY(at,Math.sin(Mn*1.3+B*1.1)*.018+Math.cos(En*1.7+B*.9)*.014)}_e.needsUpdate=!0,Q.computeVertexNormals(),m.render()}A();const k=setInterval(A,6e4);return ce=requestAnimationFrame(mt),{update(q,D){q={...q,pos:q.actor.pos,see_eff:q.actor.see};const B=q.see_eff;(B!==U||!E)&&Ce(B),(!z||q.pos.x!==ve.x||q.pos.y!==ve.y||B!==z.s)&&(ve.x=q.pos.x,ve.y=q.pos.y,z||it.set(ve.x,qn(ve.x,ve.y),ve.y),z={s:B},Ue(),be()),Re(q,D),le(new Set(D.map(te=>te.x+","+te.y)))},setSelected:q=>ie(j,q),dispose(){cancelAnimationFrame(ce),clearInterval(k),removeEventListener("resize",Ge),m.dispose(),a.dispose(),v==null||v.dispose(),Xe.remove()}}}function I1(){const t=X.useRef();return X.useEffect(()=>{const e=L1(t.current,{orbit:!0});return e.update({id:0,actor:{see:18,pos:{x:104,y:96}}},[]),()=>e.dispose()},[]),u.jsx("div",{ref:t,className:"canvas","aria-hidden":!0})}const D1=()=>u.jsx("h1",{className:"wordmark",children:"Angemoniaque"});function x3(){const t=Kt(),[e,n]=X.useState("login"),[i,r]=X.useState({email:"",password:"",confirm:""}),[s,a]=X.useState(""),[o,l]=X.useState(!1),c=e==="register",d=async m=>{if(m.preventDefault(),a(""),!/^\S+@\S+\.\S+$/.test(i.email))return a("Adresse email invalide");if(c&&i.password.length<8)return a("Mot de passe : 8 caractères minimum");if(c&&i.password!==i.confirm)return a("Les mots de passe ne correspondent pas");l(!0);try{const y=await se(c?"/auth/register":"/auth/login",{email:i.email,password:i.password});ym(y.token),t(tt.setAuth({admin:y.admin,email:i.email}))}catch(y){a(y.message)}finally{l(!1)}},p=m=>({value:i[m],onChange:y=>r({...i,[m]:y.target.value})}),f=m=>()=>{n(m),a("")};return u.jsxs(u.Fragment,{children:[u.jsx(I1,{}),u.jsx("main",{className:"stage",children:u.jsxs("form",{className:"glass auth",onSubmit:d,children:[u.jsx(D1,{}),u.jsx("p",{className:"tag",children:"Anges, Démons et Hommes se disputent trois mondes."}),u.jsxs("div",{className:"seg",role:"tablist",children:[u.jsx("button",{type:"button",role:"tab","aria-selected":!c,className:c?"":"on",onClick:f("login"),children:"Connexion"}),u.jsx("button",{type:"button",role:"tab","aria-selected":c,className:c?"on":"",onClick:f("register"),children:"Inscription"})]}),u.jsxs("label",{children:["Email",u.jsx("input",{type:"email",autoComplete:"email",...p("email")})]}),u.jsxs("label",{children:["Mot de passe",c&&u.jsx("small",{children:" (8 caractères minimum)"}),u.jsx("input",{type:"password",autoComplete:c?"new-password":"current-password",...p("password")})]}),c&&u.jsxs("label",{children:["Confirmer le mot de passe",u.jsx("input",{type:"password",autoComplete:"new-password",...p("confirm")})]}),u.jsx("button",{className:"primary",disabled:o,children:o?"Un instant…":c?"Créer mon compte":"Se connecter"}),s&&u.jsx("p",{className:"err",role:"alert",children:s})]})})]})}const Bv=[["human","Humain",t2,"Forgerons et fidèles. Un seul pacte, des Artefacts à conquérir."],["demon","Démon",Bw,"Puissance brute, pactes multiples. Gardien des Arcanes."],["angel","Ange",zw,"Porteur des Reliques, il guide les mortels par ses pactes."]];function _3({admin:t}){var f;const e=Kt(),[n,i]=X.useState(null),[r,s]=X.useState({pseudo:"",race:"human"}),[a,o]=X.useState(""),l=()=>se("/characters").then(i);n||l();const c=(f=n==null?void 0:n[0])==null?void 0:f.race,d=c??r.race,p=async m=>{m.preventDefault();try{o(""),await se("/characters",{pseudo:r.pseudo,race:d}),s({...r,pseudo:""}),l()}catch(y){o(y.message)}};return u.jsxs(u.Fragment,{children:[u.jsx(I1,{}),u.jsx("main",{className:"stage",children:u.jsxs("div",{className:"glass auth wide",children:[u.jsx(D1,{}),u.jsxs("h2",{children:["Vos personnages ",u.jsxs("small",{children:[(n==null?void 0:n.length)??0," sur 3"]})]}),u.jsx("div",{className:"chars",children:n==null?void 0:n.map(m=>{const[,y,x]=Bv.find(g=>g[0]===m.race);return u.jsxs("button",{className:`char race-${m.race}`,onClick:()=>e(tt.setChar(m.id)),children:[u.jsx(x,{size:22}),m.pseudo,u.jsxs("small",{children:[y," · Jouer"]})]},m.id)})}),((n==null?void 0:n.length)??0)<3&&u.jsxs("form",{onSubmit:p,children:[u.jsx("h3",{children:"Nouveau personnage"}),u.jsx("div",{className:"races",children:Bv.map(([m,y,x,g])=>u.jsxs("button",{type:"button",disabled:!!c&&c!==m,className:`race race-${m}${d===m?" on":""}`,onClick:()=>s({...r,race:m}),children:[u.jsx(x,{size:26}),u.jsx("b",{children:y}),u.jsx("small",{children:g})]},m))}),c&&u.jsx("small",{className:"note",children:"Tous vos personnages partagent la même race."}),u.jsxs("label",{children:["Pseudo ",u.jsx("small",{children:"(définitif)"}),u.jsx("input",{value:r.pseudo,onChange:m=>s({...r,pseudo:m.target.value}),maxLength:20})]}),u.jsx("button",{className:"primary",children:"Créer le personnage"})]}),a&&u.jsx("p",{className:"err",role:"alert",children:a}),t&&u.jsx("a",{className:"link",href:"#admin",children:"Espace administrateur"})]})})]})}function ur(){const t=Kt(),e=Yt(n=>n.game.charId);return async()=>{const n=await se(`/characters/${e}`);t(tt.setMe(n));const i=n.actor.pos,r=await se(`/map/${i.map_id}/area?x=${i.x}&y=${i.y}&r=${n.actor.see}`);return t(tt.setEntities(r)),n}}function y3(){const t=X.useRef(),e=X.useRef(),n=Kt(),{me:i,entities:r}=Yt(l=>l.game),s=ur(),a=i==null?void 0:i.actor.pos.map_id;X.useEffect(()=>(e.current=L1(t.current,{onClick:(l,c,d)=>n(tt.setSelected({...l,sx:c,sy:d})),onHover:(l,c,d)=>n(tt.setHover(l&&{...l,sx:c,sy:d}))}),()=>e.current.dispose()),[]),X.useEffect(()=>{s();const l=setInterval(s,8e3);return()=>clearInterval(l)},[]),X.useEffect(()=>{if(!a)return;const l=new WebSocket(`${location.protocol==="https:"?"wss":"ws"}://${location.host}/api/ws?map=${a}`);return l.onmessage=()=>s(),()=>l.close()},[a]);const o=Yt(l=>l.game.selected);return X.useEffect(()=>{var l;o||(l=e.current)==null||l.setSelected(null)},[o]),X.useEffect(()=>{i&&e.current.update(i,r)},[i,r]),u.jsx("div",{ref:t,className:"canvas"})}function ln(t,e=[]){const[n,i]=X.useState(null),r=()=>se(t).then(i).catch(()=>i(null));return X.useEffect(()=>{r()},e),[n,r]}function Es(){const t=Kt();return async(e,n)=>{try{const i=await e();n==null||n(i)}catch(i){t(tt.toast(i.message))}}}const S3=(t,e)=>e?Math.min(100,t/e*100):0,M3=[[0,-1,0,"Nord"],[1,-1,45,"Nord-Est"],[1,0,90,"Est"],[1,1,135,"Sud-Est"],[0,1,180,"Sud"],[-1,1,225,"Sud-Ouest"],[-1,0,270,"Ouest"],[-1,-1,315,"Nord-Ouest"]];function E3(){const{me:t}=Yt(s=>s.game),e=Kt(),n=ur(),i=t.actor.pos,r=(s,a)=>async()=>{try{await se("/actions/move",{characterId:t.id,x:i.x+s,y:i.y+a}),await n()}catch(o){e(tt.toast(o.message))}};return u.jsxs("div",{className:"wheel",children:[M3.map(([s,a,o,l])=>u.jsx("button",{className:"arrow",style:{"--a":o+"deg"},"aria-label":`Aller ${l}`,onClick:r(s,a),children:u.jsx(Rw,{size:30,strokeWidth:2.6})},o)),u.jsx("button",{className:"core",title:"Actions autour du personnage","aria-label":"Actions autour du personnage",onClick:()=>e(tt.setPanel("actions")),children:u.jsx(Ow,{size:62,strokeWidth:1.4})})]})}const uo=({I:t,v:e,m:n,c:i,label:r})=>u.jsxs("div",{className:"gauge",style:{"--c":i,"--p":S3(e,n)},title:`${r} ${e}/${n}`,children:[u.jsx(t,{size:16}),u.jsx("div",{className:"track",children:u.jsx("i",{})}),u.jsxs("b",{children:[e,u.jsxs("small",{children:["/",n]})]})]}),Tn=({I:t,v:e,t:n})=>u.jsxs("span",{className:"chip",title:n,children:[u.jsx(t,{size:15}),e]});function w3(){const{me:t,panel:e}=Yt(o=>o.game),n=Kt(),i=(o,l,c)=>u.jsx("button",{className:"mainico"+(e===o?" on":""),title:c,"aria-label":c,onClick:()=>n(tt.setPanel(o)),children:u.jsx(l,{size:46,strokeWidth:1.5})},o),r=t==null?void 0:t.actor,s=(r==null?void 0:r.kind)==="hero",a=s?t.mount:null;return u.jsxs(u.Fragment,{children:[u.jsx("a",{className:"logo",href:"/",children:"Angemoniaque"}),u.jsxs("header",{className:"hud",children:[u.jsxs("nav",{className:"mainnav",children:[i("faith",Vw,"Pactes & Fidèles"),i("mounts",v0,"Invocations & Montures"),t?u.jsx(E3,{}):u.jsx("span",{className:"wheel"}),i("guild",_m,"Guilde"),i("world",Ww,"Carte du monde")]}),t&&u.jsxs("div",{className:"glass gauges"+(s?"":" summoned"),children:[!s&&u.jsxs("span",{className:"tagline",children:[u.jsx(Sf,{size:15})," Invocation : ",r.name]}),u.jsxs("div",{className:"grp",children:[u.jsx(uo,{I:g0,v:r.hp_current,m:r.hp_max,c:"var(--hp)",label:"Points de vie"}),u.jsx(uo,{I:S0,v:r.energy_current,m:r.energy_max,c:"var(--en)",label:"Énergie"}),s&&t.hasDivine&&u.jsx(uo,{I:Sf,v:t.divine_energy_current,m:t.divine_energy_max,c:"var(--div)",label:"Énergie divine"})]}),u.jsxs("div",{className:"grp",children:[u.jsx(Tn,{I:x0,v:`+${r.recovery}/h`,t:"Régénération unique (Vie, Énergie et Énergie divine)"}),u.jsx(Tn,{I:yf,v:r.see,t:"Vision (cases)"}),u.jsx(Tn,{I:y0,v:r.agility,t:"Agilité — chance de toucher = (votre agilité + 5) ÷ (votre agilité + celle de la cible + 10), entre 10 % et 95 %"}),u.jsx(Tn,{I:Mf,v:r.strength,t:"Force"}),u.jsx(Tn,{I:du,v:r.damage,t:"Dégâts = arme × (Force − Force requise des équipements), réduits de l'armure de la cible"}),u.jsx(Tn,{I:_0,v:`${r.armor}/${r.magic_armor??0}`,t:"Armure physique / magique — réduit directement les dégâts reçus"}),s&&u.jsxs(u.Fragment,{children:[u.jsx(Tn,{I:Zw,v:t.xp,t:"Expérience"}),u.jsx(Tn,{I:Fw,v:t.gold,t:"Or"})]})]})]}),a&&u.jsxs("div",{className:"glass gauges mountbar",children:[u.jsxs("span",{className:"tagline",children:[u.jsx(v0,{size:15})," ",a.name]}),u.jsxs("div",{className:"grp",children:[u.jsx(uo,{I:g0,v:a.hp_current,m:a.hp_max,c:"var(--hp)",label:"Vie de la monture"}),u.jsx(uo,{I:S0,v:a.energy_current,m:a.energy_max,c:"var(--en)",label:"Énergie de la monture"})]}),u.jsxs("div",{className:"grp",children:[u.jsx(Tn,{I:x0,v:`+${a.recovery}/h`,t:"Régénération unique (Vie et Énergie)"}),u.jsx(Tn,{I:yf,v:`+${a.bonus_see}`,t:"Bonus de vision"}),u.jsx(Tn,{I:y0,v:a.agility,t:"Agilité"}),u.jsx(Tn,{I:Mf,v:a.strength,t:"Force"}),u.jsx(Tn,{I:du,v:a.special_attack_damage,t:a.special_attack_name??"Dégâts"}),u.jsx(Tn,{I:_0,v:`${a.armor}/0`,t:"Armure physique / magique"})]})]})]})]})}function dr({onClose:t,className:e="inv",label:n,children:i}){return X.useEffect(()=>{const r=s=>s.key==="Escape"&&t();return addEventListener("keydown",r),()=>removeEventListener("keydown",r)},[t]),hm.createPortal(u.jsx("div",{className:"modal",onClick:t,children:u.jsx("div",{className:e,role:"dialog","aria-modal":"true","aria-label":n,onClick:r=>r.stopPropagation(),children:i})}),document.body)}const T3=t=>t==="shallow"||t==="deep";function C3(t,e,{flying:n=!1,aquatic:i=!1,stopAt:r=0}={}){let{x:s,y:a}=t,o=0;for(;(s!==e.x||a!==e.y)&&!(Math.max(Math.abs(s-e.x),Math.abs(a-e.y))<=r);){s+=Math.sign(e.x-s),a+=Math.sign(e.y-a);const l=ma(s,a),c=n?1:i?T3(l.kind)?1:1/0:l.kind==="deep"?1/0:l.cost;if(!isFinite(c))return 1/0;o+=c}return o}const A3={plain:4880966,forest:2972208,mountain:7829375,shallow:4890800,deep:1785722},dc=new Map,b3={"En pleine forme":"#5fd08a","Bon état":"#b6dd6a",Blessé:"#f2b84b",Souffrant:"#e5545a"},hp={plain:"Plaine",forest:"Forêt",mountain:"Massif rocheux",shallow:"Eau peu profonde",deep:"Eau profonde"};function jv(t,e,n=""){const[i,r]=X.useState(null);return X.useEffect(()=>{if(!t)return r(null);const s=`${e}:${t.x},${t.y}${n}`;if(dc.has(s)&&Date.now()-dc.get(s).at<3e3)return r(dc.get(s).v);se(`/map/${e}/cell?x=${t.x}&y=${t.y}${n}`).then(a=>{dc.set(s,{v:a,at:Date.now()}),r(a)}).catch(()=>{})},[t==null?void 0:t.x,t==null?void 0:t.y]),i}function Vv({e:t}){return t?t.kind==="character"?u.jsxs("div",{className:"ent",children:[u.jsx("b",{children:t.name})," ",u.jsxs("small",{children:[t.race," · ",t.rank_name]}),u.jsx("br",{}),u.jsxs("small",{children:["Guilde : ",t.guild??"Aucune guilde"]})]}):t.kind==="summon"?u.jsxs("div",{className:"ent",children:[u.jsxs("b",{children:["🔮 ",t.name]})," ",u.jsx("small",{children:"Invocation"}),u.jsx("br",{}),u.jsxs("small",{children:["Invoquée par : ",t.owner]})]}):t.kind==="monster"?u.jsxs("div",{className:"ent",children:[u.jsx("b",{children:t.name})," ",u.jsx("small",{children:"Monstre"}),u.jsx("br",{}),u.jsxs("small",{children:["PV : ",t.mhp,"/",t.mhpmax," · Armure : ",t.marmor,"/",t.mmarmor??0]})]}):u.jsxs("div",{className:"ent",children:[u.jsx("b",{children:t.name})," ",u.jsx("small",{children:"Structure"})]}):u.jsx("span",{children:"Case libre"})}function R3({cell:t,close:e}){var i;const n=t.entity;return u.jsxs(dr,{onClose:e,className:"inv small",label:"",children:[u.jsxs("h3",{children:["Case (",t.x,", ",t.y,") — ",hp[t.terrain.kind]]}),(n==null?void 0:n.kind)==="character"?u.jsxs(u.Fragment,{children:[u.jsxs("p",{children:[u.jsx("b",{children:n.name})," · ",n.race," · ",n.rank_name,u.jsx("br",{}),"Guilde : ",n.guild??"Aucune guilde"]}),u.jsxs("p",{children:["État de forme : ",u.jsx("b",{style:{color:b3[n.health]},children:n.health})]}),u.jsx("h4",{children:"Équipements visibles"}),u.jsx("div",{className:"gear",children:((i=n.visibleGear)!=null&&i.length?n.visibleGear:["Aucun équipement visible"]).map(r=>u.jsx("span",{className:"pill",children:r},r))})]}):n?u.jsxs("p",{children:[u.jsx("b",{children:n.name}),n.kind==="monster"&&u.jsxs(u.Fragment,{children:[u.jsx("br",{}),"PV : ",n.mhp,"/",n.mhpmax," · Armure : ",n.marmor,"/",n.mmarmor??0]})]}):u.jsxs("p",{children:["Case libre. Ressource : ",t.terrain.resource??"aucune","."]})]})}function P3(){const{hover:t,selected:e,me:n}=Yt(b=>b.game),i=Kt(),r=ur(),s=n==null?void 0:n.actor.pos.map_id,a=jv(!e&&t,s),o=jv(e,s),[l,c]=X.useState(""),[d,p]=X.useState("wall"),[f,m]=X.useState(null),[y,x]=X.useState(null);if(X.useEffect(()=>{c("")},[e==null?void 0:e.x,e==null?void 0:e.y]),X.useEffect(()=>{const b=o==null?void 0:o.entity;m(null),e&&b&&["character","monster","summon"].includes(b.kind)&&b.char_id!==n.id&&se(`/combat/preview/${n.id}/${e.x}/${e.y}`).then(m).catch(()=>{})},[o]),!n)return null;const g=n.actor.pos,h=n.actor.kind==="hero",v=h?n.mount:null,S=!!(v!=null&&v.flying),_=!!(v!=null&&v.aquatic),M=(b,w={})=>C3(g,b,{flying:S,aquatic:_,...w}),T=Object.keys(n.scrolls??{}).filter(b=>b!=="ship"&&n.scrolls[b]>0),A=(b,w=0)=>b===1/0?"∞":v&&b?`⚡${b} monture${w?` + ⚡${w}`:""}`:`⚡${b+w}`;if(e){const b=o==null?void 0:o.entity,w={x:e.x,y:e.y},E=Math.max(Math.abs(w.x-g.x),Math.abs(w.y-g.y)),N=n.range_eff,V=b&&["character","monster","summon"].includes(b.kind)&&b.char_id!==n.id,z=o==null?void 0:o.terrain,Y=[];!b&&(w.x!==g.x||w.y!==g.y)&&Y.push(["go","S'y rendre",M(w),0]),b&&E>1&&b.char_id!==n.id&&Y.push(["approach",`S'approcher à côté de ${b.name}`,M(w,{stopAt:1}),0]),V&&(Y.push(["attack",`Attaquer ${b.name}`,M(w,{stopAt:N}),5]),v!=null&&v.special_attack_name&&Y.push(["breath",`${v.special_attack_name} (${v.special_attack_damage} dég.)`,M(w,{stopAt:N}),0,v.special_attack_energy])),(b==null?void 0:b.kind)==="building"&&Y.push(["interact",b.building_kind==="door"?`Franchir ${b.name}`:`Interagir avec ${b.name}`,0,0]),!b&&(z!=null&&z.resource)&&!(z.kind==="deep"&&!S&&!_)&&Y.push(["harvest",`Récolter ${z.resource}`,M(w),4]),!b&&T.length&&Y.push(["build","Poser un élément",M(w,{stopAt:1}),10]),Y.push(["info","Plus d'informations (état de forme & équipement)",0,0]);const ne={characterId:n.id,targetCharacterId:b==null?void 0:b.char_id,targetMonsterId:b==null?void 0:b.monster_id,targetSummonId:b==null?void 0:b.summon_id},Q=async()=>{try{if(l==="info"){x(await se(`/map/${s}/cell?x=${w.x}&y=${w.y}&details=1`));return}let K=null;if(l==="go"&&await se("/actions/move",{characterId:n.id,...w}),l==="approach"&&await se("/actions/approach",{characterId:n.id,...w}),l==="build"&&await se("/buildings/place",{characterId:n.id,kind:T.includes(d)?d:T[0],...w}),l==="harvest"&&await se("/actions/gather",{characterId:n.id,...w}),l==="attack"||l==="breath"){const I=await se("/combat/attack",{...ne,useMountBreath:l==="breath"});K=I.missed?`Raté ! (${I.hitChance}% de chances de toucher)`:`Touché : -${I.dmg} PV${I.killed?" — cible vaincue !":""}`}if(l==="interact"){const I=await se(`/buildings/${b.building_id}/interact`,{characterId:n.id});I.kind==="door"?await se("/divine/door",{characterId:n.id,buildingId:I.id}):I.kind==="capital"?i(tt.setPanel("capital")):K=I.name}K&&i(tt.toast(K)),await r(),i(tt.setSelected(null))}catch(K){i(tt.toast(K.message))}};return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"card",style:{left:e.sx+14,top:e.sy+14},children:[u.jsx("button",{className:"x","aria-label":"Fermer",onClick:()=>i(tt.setSelected(null)),children:"×"}),u.jsxs("div",{children:[u.jsx("b",{children:hp[z==null?void 0:z.kind]??"…"})," ",u.jsxs("small",{children:["(",w.x,", ",w.y,")"]})," · ",u.jsxs("small",{children:["⚡ ",z?z.cost>=99?"∞":z.cost:"…","/case · ",(z==null?void 0:z.resource)??"aucune ressource"]})]}),u.jsx(Vv,{e:b}),b&&E===1&&!V&&b.kind!=="building"&&u.jsxs("div",{className:"note",children:[u.jsx(Nw,{size:14})," Case occupée (vous êtes juste à côté)."]}),(f==null?void 0:f.hitChance)!=null&&u.jsxs("div",{className:"hit",children:[u.jsx(Ly,{size:14})," Chance de toucher (agilité) : ",u.jsxs("b",{children:[f.hitChance,"%"]})," ",u.jsxs("small",{children:["esquive ",f.dodge,"%"]})]}),u.jsxs("select",{value:l,onChange:K=>c(K.target.value),children:[u.jsx("option",{value:"",children:"— Actions possibles —"}),Y.map(([K,I,H,J,de])=>u.jsxs("option",{value:K,disabled:H===1/0,children:[I,K!=="info"?` — ${de?`⚡${de} monture`+(H?` + ${A(H)}`:""):A(H,J)}`:""]},K))]}),l==="build"&&u.jsx("select",{value:T.includes(d)?d:T[0],onChange:K=>p(K.target.value),children:[["wall","Muraille de pierre"],["tower","Tour de garde"],["factory","Usine de production"],["totem","Totem de zone"]].filter(([K])=>T.includes(K)).map(([K,I])=>u.jsxs("option",{value:K,children:[I," (×",n.scrolls[K],")"]},K))}),u.jsx("button",{className:"primary",disabled:!l,onClick:Q,children:l==="info"?u.jsxs(u.Fragment,{children:[u.jsx(Iy,{size:14})," Voir"]}):"Valider"})]}),y&&u.jsx(R3,{cell:y,close:()=>x(null)})]})}return t?u.jsx("div",{className:"card hover",style:{left:t.sx+14,top:t.sy+14},children:a?u.jsxs(u.Fragment,{children:[u.jsxs("div",{children:[u.jsx("b",{children:hp[a.terrain.kind]})," ",u.jsxs("small",{children:["(",a.x,", ",a.y,") · ⚡ ",a.terrain.cost>=99?"∞":a.terrain.cost,"/case · ",a.terrain.resource??"aucune ressource"]})]}),u.jsx(Vv,{e:a.entity}),u.jsxs("small",{children:["Trajet : ",A(M(t))]})]}):"…"}):null}function ho({title:t,children:e,size:n=14}){const i=X.useRef(),[r,s]=X.useState(null),a=()=>{const o=i.current.getBoundingClientRect(),l=Math.min(340,innerWidth-24),c=Math.min(Math.max(12,o.left+o.width/2-l/2),innerWidth-l-12),d=o.bottom+240>innerHeight&&o.top>240;s({left:c,w:l,y:d?o.top-8:o.bottom+8,up:d})};return u.jsxs(u.Fragment,{children:[u.jsx("button",{type:"button",ref:i,className:"info","aria-label":`Informations : ${t}`,onMouseEnter:a,onMouseLeave:()=>s(null),onFocus:a,onBlur:()=>s(null),onClick:o=>{o.stopPropagation(),r?s(null):a()},children:u.jsx(Iy,{size:n})}),r&&hm.createPortal(u.jsxs("div",{className:"tip",role:"tooltip",style:{left:r.left,width:r.w,top:r.y,transform:r.up?"translateY(-100%)":"none"},children:[u.jsx("b",{children:t}),e]}),document.body)]})}const N3="data:image/svg+xml;utf8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#2b2842"/><circle cx="48" cy="38" r="18" fill="#8a85a8"/><rect x="20" y="62" width="56" height="30" rx="14" fill="#8a85a8"/></svg>'),L3={hp_max:"Vie max",energy_max:"Énergie max",divine_energy_max:"Énergie divine max",recovery:"Régénération (Vie, Énergie & Énergie divine /h)",see:"Vision (cases)",agility:"Agilité (toucher / esquive)",strength:"Force"},I3={human:"Humain",demon:"Démon",angel:"Ange"},Hv=t=>/PV|Attaque|Attaqué|ratée/.test(t)?"combat":/Déplacement|Franchit|approche/.test(t)?"move":"other",D3=[["all","Tout"],["combat","Combats & attaques"],["move","Déplacements"],["other","Pactes, sorts & bâtiments"]];function U3({id:t,close:e}){const[n]=ln(`/characters/${t}/history`),[i,r]=X.useState("all"),s=(n??[]).filter(a=>i==="all"||Hv(a.action)===i);return u.jsxs(dr,{onClose:e,className:"scroll",label:"Historique",children:[u.jsxs("h3",{children:[u.jsx(Uy,{size:18})," Parchemin d'historique"]}),u.jsxs("small",{children:["Journal des ",u.jsxs("b",{children:[(n==null?void 0:n.length)??0," / 100"]})," dernières actions réalisées ou attaques subies"]}),u.jsx("div",{className:"seg filters",children:D3.map(([a,o])=>u.jsx("button",{className:i===a?"on":"",onClick:()=>r(a),children:o},a))}),u.jsx("div",{className:"log",children:s.map((a,o)=>u.jsxs("div",{className:"k-"+Hv(a.action),children:[u.jsx("small",{children:new Date(a.created_at).toLocaleTimeString()})," ",a.action]},o))})]})}const k3=[["head","Tête",60,7.7],["amulet","Collier",60,41],["chest","Plastron",60,56],["foot","Chaussures",60,90],["weapon_main","Arme (main G.)",11,20.5],["ring_l","Bague G.",11,45.5],["weapon_off","Bouclier / 2ᵉ arme",109,20.5],["ring_r","Bague D.",109,45.5],["bracelet_l","Bracelet G.",33,17],["bracelet_r","Bracelet D.",87,17],["bow","Arc / flèches",96,70]],F3=[[60,15.3,60,17],[33,24,24,33],[87,24,96,33],[60,83,36,95],[60,83,84,95],[86,64,66,54]],O3={weapon:["weapon_main","weapon_off"],shield:["weapon_off"],bow:["bow"],head:["head"],chest:["chest"],foot:["foot"],amulet:["amulet"],ring:["ring_l","ring_r"],bracelet:["bracelet_l","bracelet_r"],special:[1,2,3,4,5].map(t=>"special_"+t)},vh={weapon:"Arme",shield:"Bouclier",bow:"Arc",head:"Casque",chest:"Plastron",foot:"Chaussures",amulet:"Collier",ring:"Bague",bracelet:"Bracelet",special:"Objet spécial",scroll:"Parchemin",tool:"Outil"},xh=t=>[t.weapon_damage?`Arme ×${t.weapon_damage}`:null,t.armor||t.magic_armor?`Armure ${t.armor}/${t.magic_armor}`:null,t.strength_bonus?`+${t.strength_bonus} Force`:null,t.agility_bonus?`+${t.agility_bonus} Agilité`:null,t.req_strength?`Force req. ${t.req_strength}`:null].filter(Boolean).join(" · "),Gv=t=>{const e=Math.floor(t/3600),n=Math.ceil(t%3600/60);return e?`${e} h ${String(n).padStart(2,"0")}`:`${n} min`};function z3({close:t}){const{me:e}=Yt(M=>M.game),n=ur(),i=Es(),[r,s]=ln(`/inventory/${e.id}`),[a,o]=ln(`/characters/${e.id}/upgrades`,[e.xp]),[l,c]=X.useState(null),[d,p]=X.useState("equip"),f=e.stats,m=M=>i(M,()=>{s(),o(),n()}),y=M=>r==null?void 0:r.items.find(T=>T.equipped_slot===M),x=(r==null?void 0:r.items.filter(M=>!M.equipped_slot))??[],g=x.find(M=>M.id===l),h=g?O3[g.slot]??[]:[],v=M=>m(async()=>{const T=y(M);T?await se("/inventory/equip",{characterId:e.id,itemId:T.id,slot:null}):l&&(await se("/inventory/equip",{characterId:e.id,itemId:l,slot:M}),c(null))}),S=({k:M,label:T,x:A,y:b,flow:w})=>{const E=y(M),N=(E==null?void 0:E.lock_seconds)>0;return u.jsxs("button",{type:"button",className:"slot2"+(E?" full":"")+(N?" locked":"")+(!E&&h.includes(M)?" ok":"")+(w?" flow":""),style:w?void 0:{left:`${A/1.2}%`,top:`${b}%`},onClick:()=>v(M),title:E?`${E.name} — ${xh(E)||vh[E.slot]}${N?` — verrouillé encore ${Gv(E.lock_seconds)}`:""}`:`${T} : vide`,"aria-label":`${T} : ${(E==null?void 0:E.name)??"vide"}`,children:[u.jsxs("span",{className:"sl-label",children:[T,N&&u.jsxs("em",{className:"lk",children:[u.jsx(xm,{size:11}),Gv(E.lock_seconds)]})]}),u.jsx("b",{className:"sl-item"+(E?"":" none"),children:(E==null?void 0:E.name)??"Vide"})]})},_=[["Vie",`${e.hp_current}/${e.hp_max}`,"var(--hp)"],["Énergie",`${e.energy_current}/${e.energy_max}`,"var(--en)"],...e.hasDivine?[["Én. divine",`${e.divine_energy_current}/${e.divine_energy_max}`,"var(--div)"]]:[],["Régénération",`+${e.recovery}/h`,"#b6dd6a",null,u.jsxs(ho,{title:"Régénération unique",children:["Une seule statistique restaure chaque heure votre ",u.jsx("b",{children:"Vie"}),", votre ",u.jsx("b",{children:"Énergie"})," et votre ",u.jsx("b",{children:"Énergie divine"}),". Elle vaut pour tous : joueurs, montures, invocations et monstres."]})],["Vision",e.see_eff,"#7fe0ff"],["Agilité",f.agility,"var(--ok)",null,u.jsxs(ho,{title:"Agilité : toucher et esquiver",children:["Elle détermine vos chances de toucher et d'esquiver.",u.jsx("br",{}),"Chance de toucher = (votre agilité + 5) ÷ (votre agilité + celle de la cible + 10), bornée entre 10 % et 95 %. À agilité égale : 50 %. L'esquive est le complément.",u.jsx("br",{}),u.jsxs("em",{children:["Actuellement : ",f.agility," (base ",e.agility,", équipement ",f.agility-e.agility>=0?"+":"",f.agility-e.agility,")."]})]})],["Force",f.strength,"#ff9a5a",`req. ${f.reqStrength}`],["Dégâts",f.damage,"var(--hp)",null,u.jsxs(ho,{title:"Dégâts infligés",children:["Dégâts = dégâts de l'arme × (votre Force − la Force requise par ",u.jsx("b",{children:"tous"})," vos équipements). À mains nues : 1.",u.jsx("br",{}),"Exemple : Force 10, épée 5 dégâts et 2 Force requise → 5 × (10 − 2) = ",u.jsx("b",{children:"40"}),". Avec une armure demandant 5 Force en plus : 5 × (10 − 7) = ",u.jsx("b",{children:"15"}),".",u.jsx("br",{}),"Ces dégâts sont ensuite réduits de l'armure de la cible.",u.jsx("br",{}),u.jsxs("em",{children:["Actuellement : ",f.weaponDamage?`${f.weaponDamage} × (${f.strength} − ${f.reqStrength}) = ${f.damage}`:"mains nues = 1","."]})]})],["Armure",`${f.armor}/${f.magicArmor}`,"#8fc2ff",null,u.jsxs(ho,{title:"Armure physique / magique",children:["L'armure ",u.jsx("b",{children:"réduit directement les dégâts reçus"})," : dégâts subis = dégâts − armure (minimum 1).",u.jsx("br",{}),"Elle est affichée ",u.jsx("b",{children:"physique/magique"})," : « 5/0 » = 5 contre les attaques physiques, 0 contre la magie (sorts).",u.jsx("br",{}),u.jsxs("em",{children:["Actuellement : ",f.armor," physique, ",f.magicArmor," magique."]})]})]];return u.jsxs(dr,{onClose:t,className:"inv big",label:"Inventaire",children:[u.jsxs("div",{className:"seg tabs4",children:[u.jsxs("button",{className:d==="equip"?"on":"",onClick:()=>p("equip"),children:[u.jsx(Dy,{size:15})," 1. Équipement & sac"]}),u.jsxs("button",{className:d==="up"?"on":"",onClick:()=>p("up"),children:[u.jsx(Jw,{size:15})," 2. Amélioration (",e.xp," XP)"]})]}),u.jsx("div",{className:"sumgrid",style:{"--n":_.length},children:_.map(([M,T,A,b,w])=>u.jsxs("div",{className:"sumc",style:{"--c":A},children:[u.jsx("small",{children:M}),u.jsx("b",{children:T}),b&&u.jsx("em",{children:b}),w&&u.jsx("span",{className:"corner",children:w})]},M))}),d==="equip"&&u.jsxs(u.Fragment,{children:[u.jsxs("p",{className:"formula",children:[f.weaponName?u.jsxs(u.Fragment,{children:["Dégâts = ",u.jsx("b",{children:f.weaponDamage})," (arme « ",f.weaponName," ») × (Force ",u.jsx("b",{children:f.strength})," − Force requise ",u.jsx("b",{children:f.reqStrength}),") = ",u.jsx("b",{children:f.damage})]}):u.jsxs(u.Fragment,{children:["Dégâts = mains nues : ",u.jsx("b",{children:"1"})]})," · réduits de l'armure de la cible · Limite d'invocations : ",u.jsx("b",{children:e.maxSummons})]}),u.jsxs("div",{className:"invbody2",children:[u.jsxs("div",{children:[u.jsxs("div",{className:"eqtitle",children:[u.jsx("h4",{children:"Équipement"}),u.jsxs(ho,{title:"Un équipement posé est verrouillé 12 h",children:["Une fois un équipement mis en place, vous ne pouvez ",u.jsx("b",{children:"ni le retirer ni le remplacer pendant 12 heures"})," : un cadenas indique le temps restant sur l'emplacement.",u.jsx("br",{}),"Poser un objet sur un emplacement vide reste immédiat. Choisissez bien votre équipement !"]})]}),u.jsxs("div",{className:"star2",children:[u.jsxs("svg",{className:"body",viewBox:"0 0 120 100","aria-hidden":"true",children:[u.jsxs("g",{className:"limbs",children:[u.jsx("circle",{cx:"60",cy:"22",r:"6.5"}),u.jsx("path",{d:"M50 29 L70 29 L66 66 L54 66 Z"}),u.jsx("line",{x1:"52",y1:"31",x2:"11",y2:"33"}),u.jsx("line",{x1:"68",y1:"31",x2:"109",y2:"33"}),u.jsx("line",{x1:"56",y1:"66",x2:"36",y2:"96"}),u.jsx("line",{x1:"64",y1:"66",x2:"84",y2:"96"})]}),F3.map((M,T)=>u.jsx("line",{className:"leader",x1:M[0],y1:M[1],x2:M[2],y2:M[3]},T)),u.jsx("circle",{className:"hand",cx:"11",cy:"33",r:"3.4"}),u.jsx("circle",{className:"hand",cx:"109",cy:"33",r:"3.4"})]}),k3.map(([M,T,A,b])=>u.jsx(S,{k:M,label:T,x:A,y:b},M))]}),u.jsxs("h4",{children:["Objets spéciaux ",u.jsxs("small",{children:["(",(r==null?void 0:r.specialSlots)??4," emplacements pour ",e.race==="human"?"un Humain":"un Ange / Démon",")"]})]}),u.jsx("div",{className:"specials2",style:{"--n":(r==null?void 0:r.specialSlots)??4},children:Array.from({length:(r==null?void 0:r.specialSlots)??4},(M,T)=>u.jsx(S,{k:`special_${T+1}`,label:`Spécial ${T+1}`,flow:!0},T))}),u.jsx("small",{className:"hint",children:"Cliquez un objet du sac (les emplacements compatibles s'illuminent) puis l'emplacement ; cliquez un emplacement pour déséquiper (si le verrou de 12 h est écoulé)."})]}),u.jsxs("div",{children:[u.jsxs("h4",{children:["Sac à dos ",u.jsxs("small",{children:[x.length,"/20"]})]}),u.jsx("div",{className:"bag2",children:Array.from({length:20},(M,T)=>{const A=x[T];return u.jsx("button",{type:"button",className:"bagcell"+(A?" full":"")+(A&&A.id===l?" sel":""),onClick:()=>A&&c(A.id===l?null:A.id),title:A?`${A.name} — ${xh(A)||vh[A.slot]}`:"Emplacement libre",children:A?u.jsxs(u.Fragment,{children:[u.jsx("b",{children:A.name}),u.jsx("small",{children:xh(A)||vh[A.slot]||""})]}):u.jsx("span",{className:"free",children:T+1})},T)})})]})]})]}),d==="up"&&u.jsxs("div",{className:"upgrades",children:[u.jsx("small",{children:"Le coût en XP suit les paliers de la table (×1, ×2, ×3). Chaque amélioration donne +1."}),a==null?void 0:a.filter(M=>!M.needsDivine||e.hasDivine).map(M=>u.jsxs("div",{className:"item row2",children:[u.jsxs("div",{children:[u.jsx("b",{children:L3[M.stat]})," ",u.jsx("span",{className:"pill",children:M.value})," ",u.jsxs("span",{className:"pill",children:["Palier ×",M.tier]}),u.jsx("br",{}),u.jsxs("small",{children:[M.untilNextTier," amélioration(s) avant le palier suivant · ",M.count," effectuée(s)"]})]}),u.jsxs("button",{className:"primary",disabled:e.xp<M.nextCost,onClick:()=>m(()=>se(`/characters/${e.id}/upgrade/${M.stat}`,void 0,"POST")),children:["+1 (",M.nextCost," XP)"]})]},M.stat))]})]})}function B3(){const{me:t}=Yt(l=>l.game),e=Kt(),n=ur(),[i,r]=X.useState(null),[s]=ln("/characters",[t==null?void 0:t.id]),[a]=ln(`/characters/${t==null?void 0:t.id}/history`,[t==null?void 0:t.xp,t==null?void 0:t.energy_current]);if(!t)return null;const o=l=>{const c=l.target.files[0];if(!c)return;const d=new Image;d.onload=async()=>{const p=document.createElement("canvas");p.width=p.height=128,p.getContext("2d").drawImage(d,0,0,128,128),await se(`/characters/${t.id}/portrait`,{data:p.toDataURL("image/jpeg",.8)}),n()},d.src=URL.createObjectURL(c)};return u.jsxs("aside",{className:`glass portrait race-${t.race}`,children:[u.jsx("button",{className:"ring","aria-label":"Ouvrir l'inventaire",onClick:()=>r("inv"),children:u.jsx("img",{alt:"",src:t.portrait??N3})}),u.jsxs("label",{className:"chg",children:["Changer l'image (2 Mo max)",u.jsx("input",{type:"file",accept:"image/*",hidden:!0,onChange:o})]}),u.jsxs("div",{className:"pseudo",title:"Le pseudo ne peut pas être modifié",children:[t.pseudo," ",u.jsx(xm,{size:12})]}),u.jsxs("div",{className:"rank",children:[I3[t.race]," · ",t.rank.rank_name]}),u.jsx("small",{children:t.actor.kind==="summon"?`Contrôle : ${t.actor.name}`:"Héros principal"}),u.jsxs("div",{className:"tools",children:[u.jsx("button",{className:"ico sm",title:"Inventaire en étoile",onClick:()=>r("inv"),children:u.jsx(Pw,{size:18})}),u.jsxs("button",{className:"ico sm histbtn",title:"Parchemin d'historique",onClick:()=>r("hist"),children:[u.jsx(Uy,{size:18}),u.jsx("i",{className:"badge",children:(a==null?void 0:a.length)??0})]})]}),u.jsxs("div",{className:"chars-mini",children:[u.jsxs("small",{children:["Personnages (",(s==null?void 0:s.length)??0,"/3)"]}),s==null?void 0:s.map(l=>u.jsxs("button",{className:l.id===t.id?"on":"",onClick:()=>{e(tt.setMe(null)),e(tt.setChar(l.id))},children:[u.jsx("span",{children:l.pseudo}),u.jsxs("small",{children:["(",l.x,",",l.y,")"]})]},l.id))]}),i==="hist"&&u.jsx(U3,{id:t.id,close:()=>r(null)}),i==="inv"&&u.jsx(z3,{close:()=>r(null)})]})}const j3={1:"Monde des Hommes",2:"Monde des Anges et des Démons",3:"Monde des Morts"},V3={plain:"Plaine",forest:"Forêt",mountain:"Montagne",shallow:"Eau peu profonde",deep:"Eau profonde"};function H3(){const t=Yt(i=>i.game.me);if(!t)return null;const e=t.actor.pos,n=ma(e.x,e.y);return u.jsxs("section",{className:"glass place",children:[u.jsx(Gw,{size:18}),u.jsxs("div",{children:[u.jsx("b",{children:j3[e.map_id]}),u.jsxs("small",{children:["Case ",e.x,", ",e.y," · ",V3[n.kind]," · Vision ",t.actor.see,t.actor.kind==="summon"?" · "+t.actor.name:""]})]})]})}const G3=[["vision","Vision","#4aa3ff"],["guild","Guilde","#4cd07d"],["mail","Messagerie","#ccc"]];function W3(){const{me:t}=Yt(h=>h.game),[e,n]=X.useState(!1),[i,r]=X.useState("vision"),[s,a]=X.useState([]),[o,l]=X.useState({vision:0,guild:0,mail:0}),[c,d]=X.useState(""),[p,f]=X.useState(""),[m,y]=X.useState(""),x=async()=>{t&&(l(await se(`/messages/${t.id}/unread/count`)),e&&(a(await se(`/messages/${t.id}/${i}`)),se(`/messages/${t.id}/read`,{channel:i})))};if(X.useEffect(()=>{x();const h=setInterval(x,6e3);return()=>clearInterval(h)},[e,i,t==null?void 0:t.id]),!t)return null;const g=async()=>{await se("/messages",{characterId:t.id,channel:i,body:c,to:i==="mail"?p:void 0,subject:i==="mail"?m:void 0}).catch(h=>alert(h.message)),d(""),x()};return u.jsxs("div",{className:"chat",children:[e&&u.jsxs("div",{className:"chatbox",children:[u.jsx("div",{className:"tabs",children:G3.map(([h,v,S])=>u.jsx("button",{style:{borderColor:S},className:i===h?"on":"",onClick:()=>r(h),children:v},h))}),u.jsx("div",{className:"msgs",children:s.map((h,v)=>u.jsxs("div",{children:[u.jsx("b",{children:h.pseudo})," ",h.subject&&u.jsx("u",{children:h.subject})," ",h.body,i==="vision"&&u.jsx("small",{children:" · expire 12 h"})]},v))}),i==="mail"&&u.jsxs(u.Fragment,{children:[u.jsx("input",{placeholder:"Destinataire",value:p,onChange:h=>f(h.target.value)}),u.jsx("input",{placeholder:"Objet",value:m,onChange:h=>y(h.target.value)})]}),u.jsxs("div",{className:"row",children:[u.jsx("input",{value:c,onChange:h=>d(h.target.value),onKeyDown:h=>h.key==="Enter"&&g()}),u.jsx("button",{onClick:g,children:"➤"})]})]}),u.jsxs("button",{className:"ico chatbtn",onClick:()=>n(!e),children:["💬",o.vision>0&&u.jsx("i",{className:"dot",style:{background:"#4aa3ff",right:2}}),o.guild>0&&u.jsx("i",{className:"dot",style:{background:"#4cd07d",right:14}}),o.mail>0&&u.jsx("i",{className:"badge",children:o.mail})]})]})}const Ju=({title:t,wide:e,children:n})=>{const i=Kt();return u.jsxs("div",{className:"panel"+(e?" wide":""),role:"dialog","aria-label":t,children:[u.jsx("button",{className:"x","aria-label":"Fermer",onClick:()=>i(tt.setPanel(null)),children:u.jsx(Oy,{size:14})}),u.jsx("h3",{children:t}),n]})},Wv=({items:t})=>u.jsx("div",{className:"kv",children:t.map(([e,n])=>u.jsxs("span",{children:[e," ",u.jsx("b",{children:n})]},e))});function X3(){const t=Kt(),{me:e}=Yt(x=>x.game),n=Es(),[i,r]=ln(`/pacts/${e.id}`),[s,a]=ln(`/faiths/${e.id}`),[o,l]=X.useState(""),[c,d]=X.useState(""),p=()=>{r(),a()},f=e.race==="human",m=e.rank.current_rank>=5,y=x=>f?x.ethereal:x.human;return u.jsxs(Ju,{title:"Pactes & Fidèles",wide:!0,children:[u.jsxs("h4",{children:["Demander un pacte ",f?"(1 pacte maximum)":"(3 de base, selon le rang)"]}),u.jsxs("small",{children:[f?"Nommez l'Ange ou le Démon avec qui vous voulez vous lier":"Nommez l'Humain avec qui vous voulez vous lier"," : l'autre partie doit accepter pour que le pacte soit conclu. Vous pouvez envoyer et recevoir plusieurs demandes."]}),u.jsxs("div",{className:"row",children:[u.jsx("input",{placeholder:f?"Nom de l'Ange ou du Démon":"Nom de l'Humain",value:o,onChange:x=>l(x.target.value)}),u.jsx("button",{className:"primary",onClick:()=>n(()=>se("/pacts/request",{characterId:e.id,targetPseudo:o}),()=>{l(""),p(),t(tt.toast("Demande envoyée"))}),children:"Envoyer"})]}),u.jsxs("h4",{children:["Demandes reçues (",(i==null?void 0:i.incoming.length)??0,")"]}),!(i!=null&&i.incoming.length)&&u.jsx("p",{className:"empty",children:"Aucune demande reçue."}),i==null?void 0:i.incoming.map(x=>u.jsxs("div",{className:"item row2",children:[u.jsxs("span",{children:[u.jsx("b",{children:y(x)})," souhaite conclure un pacte avec vous"]}),u.jsxs("span",{className:"row",children:[u.jsx("button",{className:"primary",onClick:()=>n(()=>se(`/pacts/${x.id}/answer`,{characterId:e.id,accept:!0}),()=>{p(),t(tt.toast("Pacte conclu"))}),children:"Accepter"}),u.jsx("button",{onClick:()=>n(()=>se(`/pacts/${x.id}/answer`,{characterId:e.id,accept:!1}),p),children:"Refuser"})]})]},x.id)),u.jsxs("h4",{children:["Demandes envoyées (",(i==null?void 0:i.outgoing.length)??0,")"]}),!(i!=null&&i.outgoing.length)&&u.jsx("p",{className:"empty",children:"Aucune demande en attente."}),i==null?void 0:i.outgoing.map(x=>u.jsxs("div",{className:"item row2",children:[u.jsxs("span",{children:["En attente de ",u.jsx("b",{children:y(x)})]}),u.jsx("button",{onClick:()=>n(()=>se(`/pacts/${x.id}/${e.id}`,void 0,"DELETE"),p),children:"Annuler"})]},x.id)),u.jsxs("h4",{children:["Pactes conclus (",(i==null?void 0:i.active.length)??0,")"]}),f&&u.jsx("small",{children:"Activer le pacte donne temporairement 50 % de la Force et de l'Agilité de l'être lié ; celui-ci perd moitié moins que votre gain."}),!(i!=null&&i.active.length)&&u.jsx("p",{className:"empty",children:"Aucun pacte conclu."}),i==null?void 0:i.active.map(x=>u.jsxs("div",{className:"item row2",children:[u.jsxs("span",{children:[x.ethereal," ⇄ ",x.human]}),u.jsxs("span",{className:"row",children:[f&&u.jsx("button",{onClick:()=>n(()=>se(`/pacts/${x.id}/activate`,{characterId:e.id}),()=>t(tt.toast("Bonus de pacte actif (1 h)"))),children:"Activer le bonus"}),u.jsx("button",{className:"danger",onClick:()=>n(()=>se(`/pacts/${x.id}/${e.id}`,void 0,"DELETE"),p),children:"Résilier"})]})]},x.id)),u.jsx("h4",{children:"Foi & prières de bénédiction (toutes les 72 h)"}),s==null?void 0:s.asFollower.map(x=>u.jsxs("div",{className:"item row2",children:[u.jsxs("span",{children:["Dieu : ",u.jsx("b",{children:x.god})," (",x.status,")"]}),x.status==="accepted"&&u.jsxs("select",{defaultValue:"",onChange:g=>g.target.value&&n(()=>se(`/faiths/${x.id}/request`,{characterId:e.id,choice:g.target.value}),p),children:[u.jsx("option",{value:"",children:"Requête…"}),u.jsx("option",{value:"strength",children:"Force +1"}),u.jsx("option",{value:"agility",children:"Agilité +1"}),u.jsx("option",{value:"hp_max",children:"PV max +1"}),u.jsx("option",{value:"recovery",children:"Régénération +1"}),u.jsx("option",{value:"heal",children:"Soin complet"})]}),x.request_choice&&u.jsxs("small",{children:["en attente : ",x.request_choice]})]},x.id)),u.jsxs("div",{className:"row",children:[u.jsx("input",{placeholder:"Devenir fidèle de…",value:c,onChange:x=>d(x.target.value)}),u.jsx("button",{onClick:()=>n(()=>se("/faiths/join",{characterId:e.id,godPseudo:c}),p),children:"Demander"})]}),m&&u.jsxs(u.Fragment,{children:[u.jsxs("h4",{children:["Autel du Dieu — mes fidèles ",u.jsxs("small",{children:["ÉD ",e.divine_energy_current,"/",e.divine_energy_max]})]}),s==null?void 0:s.asGod.map(x=>u.jsxs("div",{className:"item row2",children:[u.jsxs("span",{children:[x.follower," (",x.status,")"]}),x.status==="pending"&&u.jsxs(u.Fragment,{children:[u.jsx("button",{onClick:()=>n(()=>se(`/faiths/${x.id}/accept`,{characterId:e.id,accept:!0}),p),children:"Accepter"}),u.jsx("button",{onClick:()=>n(()=>se(`/faiths/${x.id}/accept`,{characterId:e.id,accept:!1}),p),children:"Refuser"})]}),x.request_choice&&u.jsxs("button",{onClick:()=>n(()=>se(`/faiths/${x.id}/answer`,{characterId:e.id}),p),children:["Exaucer « ",x.request_choice," » (−5 ÉD)"]})]},x.id))]})]})}function $3(){const{me:t}=Yt(a=>a.game),e=Es(),n=ur(),[i,r]=ln(`/mounts/${t.id}`),s=a=>e(a,()=>{r(),n()});return u.jsxs(Ju,{title:"Invocations & Montures",wide:!0,children:[u.jsxs("h4",{children:["Montures ",u.jsx("small",{children:"(invoquée = chevauchée d'office ; seuls vos déplacements consomment son énergie)"})]}),i!=null&&i.length?i.map(a=>u.jsxs("div",{className:"item",children:[u.jsxs("div",{className:"head",children:[u.jsxs("b",{children:["🐉 ",a.name]}),u.jsxs("small",{children:[a.flying?"vole · ":"",a.aquatic?"aquatique · ":"",a.active?"Invoquée (sur la monture)":"Au repos"]})]}),u.jsx(Wv,{items:[["Vie",`${a.hp_current}/${a.hp_max}`],["Énergie",`${a.energy_current}/${a.energy_max}`],["Régénération (Vie & Énergie)",`+${a.recovery} /h`],["Vision",`+${a.bonus_see}`],["Portée",`+${a.bonus_range}`],["Agilité",a.agility],["Force",a.strength],["Armure",`${a.armor}/0`],...a.special_attack_name?[[a.special_attack_name,`${a.special_attack_damage} dég. · ⚡${a.special_attack_energy}`]]:[]]}),u.jsx("button",{className:a.active?"danger":"primary",onClick:()=>s(()=>a.active?se("/mounts/dismount",{characterId:t.id}):se("/mounts/summon",{characterId:t.id,mountId:a.id})),children:a.active?"Renvoyer la monture":"Invoquer & monter dessus"})]},a.id)):u.jsx("p",{children:"Aucune monture."}),u.jsxs("h4",{children:["Invocations contrôlables ",u.jsxs("span",{className:"pill",children:["Actives : ",t.summons.length," / ",t.maxSummons]})]}),u.jsx("small",{children:"Limite de base : 1 invocation (augmentable par le sort « Lien d'Invocateur » ou des objets spéciaux). Prendre le contrôle déplace la caméra et affiche ses caractéristiques."}),t.summons.map(a=>{const o=t.actor.kind==="summon"&&t.actor.id===a.id;return u.jsxs("div",{className:"item",children:[u.jsxs("div",{className:"head",children:[u.jsxs("b",{children:["🔮 ",a.name]}),u.jsxs("small",{children:["(",a.x,", ",a.y,")"]})]}),u.jsx(Wv,{items:[["Vie",`${a.hp_current}/${a.hp_max}`],["Énergie",`${a.energy_current}/${a.energy_max}`],["Régén.",`+${a.recovery}/h`],["Vision",a.see],["Agilité",a.agility],["Force",a.strength],["Dégâts",a.damage],["Armure",`${a.armor}/${a.magic_armor??0}`]]}),u.jsxs("div",{className:"row",children:[u.jsx("button",{className:"primary",onClick:()=>s(()=>se("/summons/control",{characterId:t.id,summonId:o?null:a.id})),children:o?`Revenir sur ${t.pseudo}`:`Prendre le contrôle de ${a.name}`}),u.jsx("button",{className:"danger",onClick:()=>s(()=>se(`/summons/${a.id}/dismiss`,{characterId:t.id},"POST")),children:"Renvoyer"})]})]},a.id)})]})}const Xv=[[-1,-1,"NO"],[0,-1,"N"],[1,-1,"NE"],[-1,0,"O"],[0,0,""],[1,0,"E"],[-1,1,"SO"],[0,1,"S"],[1,1,"SE"]],$v=[["wall","Muraille de pierre"],["tower","Tour de garde"],["factory","Usine de production"],["totem","Totem de zone"],["ship","Navire (monture aquatique)"]];function q3(){const{me:t,entities:e}=Yt(M=>M.game),n=Kt(),i=t.actor.pos,r=Es(),s=ur(),[a,o]=ln(`/spells/${t.id}`,[t.summons.length,t.maxSummons]),l=(M,T)=>e.find(A=>A.x===M&&A.y===T&&!(A.char_id===t.id&&t.actor.kind==="hero")),c=(M,T)=>l(M,T)||ma(M,T).kind==="deep",d=Xv.filter(M=>M[0]||M[1]).map(M=>({x:i.x+M[0],y:i.y+M[1]})).find(M=>!c(M.x,M.y))??{x:i.x+1,y:i.y},[p,f]=X.useState(d);X.useEffect(()=>f(d),[i.x,i.y]);const m=l(p.x,p.y)||ma(p.x,p.y).kind==="deep"&&{name:"terrain infranchissable"},y=M=>Math.max(Math.abs(M.x-i.x),Math.abs(M.y-i.y)),x=()=>{s(),o()},g=e.filter(M=>["character","monster","summon"].includes(M.kind)&&M.char_id!==t.id&&y(M)<=Math.max(2,t.range_eff)),h=e.filter(M=>M.kind==="building"&&y(M)<=1),[v,S]=X.useState({});X.useEffect(()=>{g.forEach(M=>se(`/combat/preview/${t.id}/${M.x}/${M.y}`).then(T=>S(A=>({...A,[`${M.x},${M.y}`]:T.hitChance}))).catch(()=>{}))},[e.length,i.x,i.y]);const _=(M,T)=>r(async()=>{const A=await se("/combat/attack",{characterId:t.id,targetCharacterId:M.char_id,targetMonsterId:M.monster_id,targetSummonId:M.summon_id,useMountBreath:T});n(tt.toast(A.missed?`Raté ! (${A.hitChance}%)`:`Touché : -${A.dmg} PV${A.killed?" — vaincu !":""}`))},x);return u.jsxs(Ju,{title:"Actions autour du personnage",wide:!0,children:[u.jsxs("h4",{children:[u.jsx(Lw,{size:14})," 1. Case adjacente ciblée"]}),u.jsx("small",{children:"Les cases occupées sont interdites pour bâtir ou invoquer."}),u.jsx("div",{className:"grid33",children:Xv.map(([M,T,A])=>{const b=i.x+M,w=i.y+T;if(!M&&!T)return u.jsxs("div",{className:"cell you",children:[u.jsx("b",{children:"Vous"}),u.jsxs("small",{children:["(",b,",",w,")"]})]},"c");const E=l(b,w)||ma(b,w).kind==="deep";return u.jsxs("button",{className:"cell"+(p.x===b&&p.y===w?" on":"")+(E?" busy":""),onClick:()=>f({x:b,y:w}),children:[u.jsx("b",{children:A}),u.jsx("small",{children:E?"Occupée":"Libre"})]},A)})}),u.jsxs("p",{className:"status",children:["Case (",p.x,", ",p.y,") — ",m?u.jsxs("span",{className:"err",children:["occupée par ",m.name]}):u.jsx("span",{style:{color:"var(--ok)"},children:"libre"})]}),u.jsxs("h4",{children:[u.jsx(jw,{size:14})," Poser une structure ",u.jsx("small",{children:"(parchemin requis · ⚡10)"})]}),$v.filter(([M])=>{var T;return((T=t.scrolls)==null?void 0:T[M])>0}).length?u.jsx("div",{className:"grid2",children:$v.filter(([M])=>{var T;return((T=t.scrolls)==null?void 0:T[M])>0}).map(([M,T])=>u.jsxs("button",{disabled:M!=="ship"&&!!m,onClick:()=>r(()=>se("/buildings/place",M==="ship"?{characterId:t.id,kind:M}:{characterId:t.id,kind:M,x:p.x,y:p.y}),x),children:[T," ",u.jsxs("small",{children:["×",t.scrolls[M]]})]},M))}):u.jsx("p",{className:"empty",children:"Nécessite un parchemin de construction."}),u.jsxs("h4",{children:[u.jsx(Sf,{size:14})," 2. Sorts & invocations ",u.jsxs("span",{className:"pill",children:[(a==null?void 0:a.active)??0,"/",(a==null?void 0:a.maxSummons)??1," invoc."]})]}),a&&!a.spells.length&&u.jsx("p",{className:"empty",children:"Aucun sort appris. Les sorts de base s'apprennent à la boutique de la capitale."}),a==null?void 0:a.spells.map(M=>{const T=M.kind==="summon"&&(!!m||a.active>=a.maxSummons)||M.kind==="attack"&&!l(p.x,p.y);return u.jsxs("div",{className:"item row2",children:[u.jsxs("div",{children:[u.jsx("b",{children:M.name}),u.jsx("br",{}),u.jsx("small",{children:M.description})]}),u.jsxs("button",{disabled:T,onClick:()=>r(()=>se("/spells/cast",{characterId:t.id,spellId:M.id,x:p.x,y:p.y}),x),children:["Lancer ⚡",M.energy_cost]})]},M.id)}),u.jsxs("h4",{children:[u.jsx(qw,{size:14})," 3. Bâtiments adjacents & récolte"]}),h.map(M=>u.jsxs("div",{className:"item row2",children:[u.jsx("span",{children:M.name}),u.jsx("button",{onClick:()=>r(async()=>{const T=await se(`/buildings/${M.building_id}/interact`,{characterId:t.id});T.kind==="door"?await se("/divine/door",{characterId:t.id,buildingId:T.id}):T.kind==="capital"?n(tt.setPanel("capital")):n(tt.toast(T.name))},s),children:"Interagir ⚡0"})]},M.building_id)),u.jsx("button",{className:"wide",onClick:()=>r(()=>se("/actions/gather",{characterId:t.id}),s),children:"Récolter la ressource sous vos pieds — ⚡4"}),u.jsxs("h4",{children:[u.jsx(Mf,{size:14})," 4. Cibles à portée d'attaque (",g.length,")"]}),!g.length&&u.jsx("small",{children:"Aucun adversaire à portée immédiate."}),g.map(M=>{var T;return u.jsxs("div",{className:"item row2",children:[u.jsxs("span",{children:[M.name," ",u.jsxs("small",{className:"hit",children:[u.jsx(Ly,{size:12})," ",v[`${M.x},${M.y}`]??"…","%"]})]}),u.jsxs("span",{className:"row",children:[u.jsx("button",{className:"danger",onClick:()=>_(M,!1),children:"Attaquer ⚡5"}),((T=t.mount)==null?void 0:T.special_attack_name)&&t.actor.kind==="hero"&&u.jsxs("button",{onClick:()=>_(M,!0),children:[u.jsx(du,{size:13})," ",t.mount.special_attack_name]})]})]},M.x+","+M.y)})]})}function Y3(){const{me:t}=Yt(x=>x.game),e=Kt(),n=t.actor.pos,[i]=ln(`/map/${n.map_id}/landmarks`),r=X.useRef(),s=X.useRef(),[a,o]=X.useState({z:1,x:0,y:0}),l=X.useRef(null),c=720;X.useEffect(()=>{const x=document.createElement("canvas");x.width=n.width,x.height=n.height;const g=x.getContext("2d"),h=g.createImageData(n.width,n.height);for(let v=0;v<n.width;v++)for(let S=0;S<n.height;S++){const _=A3[ma(v,S).kind],M=(S*n.width+v)*4;h.data.set([_>>16,_>>8&255,_&255,255],M)}g.putImageData(h,0,0),s.current=x,o(v=>({...v}))},[n.map_id]),X.useEffect(()=>{const x=r.current,g=x==null?void 0:x.getContext("2d");if(!g||!s.current)return;const h=c/n.width*a.z;g.setTransform(1,0,0,1,0,0),g.fillStyle="#0b0e18",g.fillRect(0,0,c,c),g.imageSmoothingEnabled=!1,g.drawImage(s.current,a.x,a.y,n.width*h,n.height*h);const v=M=>a.x+M*h,S=M=>a.y+M*h;g.strokeStyle="rgba(255,255,255,.14)",g.strokeRect(v(0),S(0),n.width*h,n.height*h);const _=t.actor.see;g.strokeStyle="rgba(111,208,255,.95)",g.lineWidth=2,g.strokeRect(v(n.x-_-.5),S(n.y-_-.5),(2*_+1)*h,(2*_+1)*h);for(const M of i??[])g.fillStyle=M.kind==="door"?"#b070ff":"#ffd166",g.fillRect(v(M.x)-4,S(M.y)-4,9,9),g.strokeStyle="#000",g.lineWidth=1,g.strokeRect(v(M.x)-4,S(M.y)-4,9,9);g.fillStyle="#ff4d4d",g.beginPath(),g.arc(v(n.x),S(n.y),5,0,7),g.fill(),g.strokeStyle="#fff",g.lineWidth=2,g.stroke()},[a,i,n.x,n.y]);const d=(x,g=c/2,h=c/2)=>o(v=>{const S=Math.min(14,Math.max(.5,v.z*x)),_=S/v.z;return{z:S,x:g-(g-v.x)*_,y:h-(h-v.y)*_}}),p=x=>{const g=r.current.getBoundingClientRect();return[(x.clientX-g.left)*c/g.width,(x.clientY-g.top)*c/g.height]},f=x=>{x.preventDefault();const[g,h]=p(x);d(x.deltaY<0?1.25:.8,g,h)};X.useEffect(()=>{const x=r.current;return x.addEventListener("wheel",f,{passive:!1}),()=>x.removeEventListener("wheel",f)},[]);const m=({c:x,t:g})=>u.jsxs("span",{className:"leg",children:[u.jsx("i",{style:{background:x}}),g]}),y=()=>o(x=>{const g=c/n.width*x.z;return{...x,x:c/2-n.x*g,y:c/2-n.y*g}});return u.jsxs(dr,{onClose:()=>e(tt.setPanel(null)),className:"inv worldmap",label:"Carte du monde",children:[u.jsxs("div",{className:"banner",children:[u.jsx("h3",{children:"Carte globale du monde"}),u.jsxs("span",{className:"row",children:[u.jsx("button",{onClick:()=>d(.8),title:"Dézoomer","aria-label":"Dézoomer",children:u.jsx(r2,{size:16})}),u.jsx("button",{onClick:()=>d(1.25),title:"Zoomer","aria-label":"Zoomer",children:u.jsx(i2,{size:16})}),u.jsxs("button",{onClick:()=>o({z:1,x:0,y:0}),children:[u.jsx(Xw,{size:14})," Tout voir"]}),u.jsxs("button",{onClick:y,children:[u.jsx(du,{size:14})," Me centrer"]}),u.jsx("button",{className:"x2",onClick:()=>e(tt.setPanel(null)),"aria-label":"Fermer",children:u.jsx(Oy,{size:14})})]})]}),u.jsx("canvas",{ref:r,width:c,height:c,className:"wmcanvas",onPointerDown:x=>{l.current={p:p(x),v:a},x.currentTarget.setPointerCapture(x.pointerId)},onPointerMove:x=>{if(l.current){const[g,h]=p(x);o({...l.current.v,x:l.current.v.x+g-l.current.p[0],y:l.current.v.y+h-l.current.p[1]})}},onPointerUp:()=>{l.current=null}}),u.jsxs("div",{className:"legend",children:[u.jsx(m,{c:"#77777f",t:"Massifs"}),u.jsx(m,{c:"#2d5a30",t:"Forêts"}),u.jsx(m,{c:"#4aa0b0",t:"Eau peu profonde"}),u.jsx(m,{c:"#1b3f7a",t:"Eau profonde"}),u.jsx(m,{c:"#ffd166",t:"Capitale"}),u.jsx(m,{c:"#b070ff",t:"Portes"}),u.jsx(m,{c:"#ff4d4d",t:"Vous"})]}),u.jsxs("small",{children:["Molette : zoom · glisser : déplacer · cadre bleu : votre vision (",t.actor.see," cases) autour de (",n.x,", ",n.y,")."]})]})}const fp=t=>t.me.leader&&t.members.filter(e=>{var n;return(n=t.ranks.find(i=>i.id===e.rank_id))==null?void 0:n.is_leader}).length===1,nl=(t,e)=>{const n=Math.max(0,Math.min(e??t.length,t.length));return[...t.slice(0,n).map(i=>({id:i})),{add:!0},...t.slice(n).map(i=>({id:i}))]},yo=(t,e,n,i)=>{const r=nl(t,e),s=n+i;if(s<0||s>=r.length)return{ids:t,addPos:e};const a=[...r];return[a[n],a[s]]=[a[s],a[n]],{ids:a.filter(o=>!o.add).map(o=>o.id),addPos:a.findIndex(o=>o.add)}},pp=(t,e,n,i)=>{const r=nl(t,e),[s]=r.splice(n,1);return r.splice(Math.max(0,Math.min(i>n?i-1:i,r.length)),0,s),{ids:r.filter(a=>!a.add).map(a=>a.id),addPos:r.findIndex(a=>a.add)}},mp=(t,e,n,i)=>{const r=e??t.length,s=Math.max(0,Math.min(r+(i?1:0),t.length+1)),a=[...t];return a.splice(Math.min(s,a.length),0,n),a},K3=(t,e)=>t.write_ranks===null?e.write_ranks??[]:t.write_ranks??[],qv=(t,e,n,i)=>{var r;return n.leader||t.author_id===i||!!((r=n.permissions)!=null&&r.create_topics)||(e.write_ranks??[]).includes(n.rank)},Z3=(t,e,n)=>{const i=X.useRef(null),r=X.useRef(null),s=X.useRef(!1),a=X.useRef([]),[o,l]=X.useState(null),[c,d]=X.useState(0),p=m=>{var x;if(!((x=n.current)==null?void 0:x.getBoundingClientRect()))return t;for(let g=0;g<t;g++){const h=a.current[g];if(!h)continue;const v=h.getBoundingClientRect();if(m<v.top+v.height/2)return g}return t};return{rowProps:m=>({ref:y=>a.current[m]=y,onPointerDown:y=>{var x,g;y.target.closest("button,input,select,label,a,textarea")||(i.current={from:m,startY:y.clientY,active:!1},(g=(x=y.currentTarget).setPointerCapture)==null||g.call(x,y.pointerId))},onPointerMove:y=>{var _;const x=i.current;if(!x)return;if(!x.active){if(Math.abs(y.clientY-x.startY)<8)return;x.active=!0,l({from:x.from})}y.preventDefault();const g=p(y.clientY);r.current=g;const h=(_=n.current)==null?void 0:_.getBoundingClientRect(),v=g>0?a.current[g-1]:a.current[g];if(!h||!v)return;const S=v.getBoundingClientRect();d((g>0?S.bottom:S.top)-h.top)},onPointerUp:y=>{const x=i.current;i.current=null,l(null),x!=null&&x.active&&(s.current=!0,setTimeout(()=>s.current=!1,0),e(x.from,r.current??p(y.clientY)))},onPointerCancel:()=>{i.current=null,l(null)}}),drag:o,lineY:c,justDrag:s}},Gi=t=>(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\*\*([^*\n]+)\*\*/g,"<b>$1</b>").replace(/\*([^*\n]+)\*/g,"<i>$1</i>").replace(/(^|\s)#([0-9a-fA-F]{6})(?=\s|$)/g,'$1<span style="color:#$2">#$2</span>').replace(/\n/g,"<br>"),Q3=(t,e,n,i,r=i)=>{const s=t.slice(e,n);return{text:t.slice(0,e)+i+s+r+t.slice(n),cursor:e+i.length+s.length+r.length}},J3=(t,e,n,i)=>{const r=t.slice(e,n),s=r?" ":"",a=r?`${s}${i}`:i;return{text:t.slice(0,e)+r+a+t.slice(n),cursor:e+r.length+a.length}},U1=[["accept_applicants","Accepter des postulants"],["send_invites","Envoyer des invitations"],["create_topics","Créer catégories et sujets"],["assign_ranks","Attribuer des rangs"]],Yv=t=>t.trim()?t.trim().split(/\s+/).length:0,Eu=({ranks:t,value:e,onChange:n})=>u.jsx("div",{className:"gear",children:t.map(i=>u.jsx("button",{type:"button",className:"pill"+(e.includes(i.name)?" on":""),onClick:()=>n(e.includes(i.name)?e.filter(r=>r!==i.name):[...e,i.name]),children:i.name},i.id))});function eN({g:t,me:e,run:n,load:i,leave:r}){const s=t.me.leader,[a,o]=X.useState(t.guild.mantra||""),[l,c]=X.useState(t.guild.description||""),d=Kt(),p=f=>{const m=f.target.files[0];if(!m)return;if(m.size>2*1024*1024)return d(tt.toast("Image trop lourde (2 Mo maximum)"));const y=new FileReader;y.onload=()=>n(()=>se("/guilds/presentation",{characterId:e.id,logo:y.result}),i),y.readAsDataURL(m)};return u.jsxs("div",{className:"cols",children:[u.jsxs("div",{className:"emblem",children:[t.guild.logo?u.jsx("img",{alt:"",src:t.guild.logo}):u.jsx(_m,{size:64}),u.jsx("h3",{children:t.guild.name}),u.jsxs("span",{className:"pill",children:["[",t.guild.tag,"]"]}),s&&u.jsxs("label",{className:"btnlike",children:[u.jsx(e2,{size:14})," Modifier le logo (2 Mo max)",u.jsx("input",{type:"file",accept:"image/*",hidden:!0,onChange:p})]})]}),u.jsxs("div",{className:"form",children:[u.jsxs("label",{children:["Mantra de la guilde ",u.jsxs("small",{children:[a.length," / 120 caractères"]}),u.jsx("input",{maxLength:120,readOnly:!s,value:a,onChange:f=>o(f.target.value.slice(0,120))})]}),u.jsxs("label",{children:["Histoire & description ",u.jsxs("small",{children:[Yv(l)," / 1000 mots"]}),u.jsx("textarea",{rows:8,readOnly:!s,value:l,onChange:f=>Yv(f.target.value)<=1e3&&c(f.target.value)})]}),s&&u.jsx("button",{className:"primary",onClick:()=>n(()=>se("/guilds/presentation",{characterId:e.id,mantra:a,description:l}),()=>{i(),d(tt.toast("Présentation enregistrée"))}),children:"Enregistrer"}),fp(t)?u.jsx("small",{children:"Le dernier Chef ne peut pas quitter la guilde tant qu'un autre membre n'a pas ce rang."}):u.jsx("button",{className:"danger",onClick:r,children:"Quitter la guilde"})]})]})}function tN({g:t,me:e,run:n,load:i}){const r=t.me.permissions,[s,a]=X.useState("");return u.jsxs("div",{className:"cols",children:[u.jsxs("div",{className:"form",children:[u.jsxs("h4",{children:["Membres (",t.members.length,") ",u.jsx("small",{children:r.assign_ranks?"Vous pouvez attribuer des rangs":"Lecture seule"})]}),t.members.map(o=>u.jsxs("div",{className:"item row2",children:[u.jsxs("span",{children:[u.jsx("b",{children:o.pseudo})," ",u.jsx("small",{children:o.race})]}),r.assign_ranks?u.jsx("select",{value:o.rank_id,disabled:o.id===e.id&&fp(t),title:o.id===e.id&&fp(t)?"Le dernier Chef ne peut pas changer de rang":"",onChange:l=>n(()=>se("/guilds/members/rank",{characterId:e.id,memberId:o.id,rankId:+l.target.value}),i),children:t.ranks.map(l=>u.jsx("option",{value:l.id,children:l.name},l.id))}):u.jsx("span",{className:"pill",children:o.rank})]},o.id))]}),u.jsxs("div",{className:"form",children:[u.jsxs("h4",{children:[u.jsx(Fy,{size:14})," Inviter un joueur"]}),r.send_invites?u.jsxs("div",{className:"row",children:[u.jsx("input",{placeholder:"Pseudo du joueur…",value:s,onChange:o=>a(o.target.value)}),u.jsx("button",{onClick:()=>n(()=>se("/guilds/invite",{characterId:e.id,pseudo:s}),()=>a("")),children:"Inviter"})]}):u.jsx("small",{children:"Votre rang ne permet pas d'envoyer des invitations."}),u.jsxs("h4",{children:["Postulants en attente (",t.applicants.length,")"]}),!r.accept_applicants&&u.jsx("small",{children:"Droit requis pour voir et accepter les postulants."}),t.applicants.map(o=>u.jsxs("div",{className:"item row2",children:[u.jsxs("span",{children:[o.pseudo," ",u.jsx("small",{children:o.race})]}),u.jsxs("span",{className:"row",children:[u.jsx("button",{className:"primary",onClick:()=>n(()=>se(`/guilds/applicants/${o.id}/answer`,{characterId:e.id,accept:!0}),i),children:"Accepter"}),u.jsx("button",{onClick:()=>n(()=>se(`/guilds/applicants/${o.id}/answer`,{characterId:e.id,accept:!1}),i),children:"Refuser"})]})]},o.id))]})]})}const Kv=["#c8a24a","#7fa8d9","#9d7fce","#7fce9d","#d98f7f","#69c9c9"],nN=({p:t})=>u.jsx("span",{className:"avatar",style:{background:Kv[[...t].reduce((e,n)=>e+n.charCodeAt(0),0)%Kv.length]},children:(t[0]||"?").toUpperCase()}),iN=({p:t})=>u.jsxs("div",{className:"post",children:[u.jsxs("div",{className:"pauthor",children:[u.jsx(nN,{p:t.pseudo}),t.rank&&u.jsx("span",{className:"prank",children:t.rank}),u.jsx("b",{children:t.pseudo})]}),u.jsx("div",{className:"postbody",dangerouslySetInnerHTML:{__html:Gi(t.body)}}),u.jsx("small",{className:"ptime",children:new Date(t.created_at).toLocaleString("fr-FR")})]});function rN({g:t,me:e,run:n,load:i,onClose:r,onCreated:s}){const[a,o]=X.useState(""),[l,c]=X.useState(""),[d,p]=X.useState(t.ranks.map(x=>x.name)),[f,m]=X.useState(t.ranks.map(x=>x.name)),y=td();return u.jsx(dr,{onClose:r,className:"inv guild",label:"Nouvelle catégorie",children:u.jsxs("div",{className:"form",children:[u.jsxs("h4",{children:[u.jsx(qu,{size:14})," Nouvelle catégorie"]}),u.jsx(ed,{onFmt:y.fmt,onColor:y.color}),u.jsx("input",{...y.bind(o),placeholder:"Titre…",value:a,onChange:x=>o(x.target.value)}),u.jsx("textarea",{...y.bind(c),rows:2,placeholder:"Description (facultative) (formattable : **gras**, *italique*, #rrggbb)…",value:l,onChange:x=>c(x.target.value)}),u.jsx("small",{children:"Qui peut VOIR :"}),u.jsx(Eu,{ranks:t.ranks,value:d,onChange:p}),u.jsx("small",{children:"Qui peut ÉCRIRE (créer des sujets) :"}),u.jsx(Eu,{ranks:t.ranks,value:f,onChange:m}),u.jsx("button",{className:"primary",disabled:!a.trim(),onClick:()=>n(()=>se("/guilds/folders",{characterId:e.id,name:a.trim(),description:l.trim()||void 0,visibleRanks:d,writeRanks:f}),()=>{r(),(s??i)()}),children:"Créer la catégorie"})]})})}function sN({g:t,folder:e,me:n,run:i,load:r,onClose:s,onCreated:a}){const[o,l]=X.useState({title:"",body:"",description:""}),[c,d]=X.useState([]),[p,f]=X.useState([]),[m,y]=X.useState(!0),[x,g]=X.useState(!0),h=td(),v=S=>_=>l(M=>({...M,[S]:_}));return u.jsx(dr,{onClose:s,className:"inv guild",label:"Nouveau sujet",children:u.jsxs("div",{className:"form",children:[u.jsxs("h4",{children:[u.jsx(qu,{size:14})," Nouveau sujet — ",e.name]}),u.jsx(ed,{onFmt:h.fmt,onColor:h.color}),u.jsx("input",{...h.bind(v("title")),placeholder:"Titre du sujet…",value:o.title,onChange:S=>l({...o,title:S.target.value})}),u.jsx("textarea",{rows:4,...h.bind(v("body")),placeholder:"Contenu… (**gras** · *italique* · #rrggbb)",value:o.body,onChange:S=>l({...o,body:S.target.value})}),u.jsx("textarea",{rows:2,...h.bind(v("description")),placeholder:"Description (facultative, formattable)…",value:o.description,onChange:S=>l({...o,description:S.target.value})}),u.jsxs("label",{className:"chk",children:[u.jsx("input",{type:"checkbox",checked:m,onChange:S=>y(S.target.checked)})," Lecture héritée de la catégorie"]}),!m&&u.jsxs(u.Fragment,{children:[u.jsx("small",{children:"Qui peut VOIR :"}),u.jsx(Eu,{ranks:t.ranks,value:c,onChange:d})]}),u.jsxs("label",{className:"chk",children:[u.jsx("input",{type:"checkbox",checked:x,onChange:S=>g(S.target.checked)})," Écriture héritée de la catégorie"]}),!x&&u.jsxs(u.Fragment,{children:[u.jsx("small",{children:"Qui peut ÉCRIRE :"}),u.jsx(Eu,{ranks:t.ranks,value:p,onChange:f})]}),u.jsx("button",{className:"primary",disabled:!o.title.trim()||!o.body.trim(),onClick:()=>i(()=>se("/guilds/topics",{characterId:n.id,folderId:e.id,title:o.title.trim(),body:o.body,description:o.description.trim()||void 0,visibleRanks:m?[]:c,writeRanks:x?void 0:p}),()=>{s(),(a??r)()}),children:"Publier le sujet"})]})})}function Zv({kind:t,g:e,target:n,me:i,run:r,onDone:s}){const a=t==="topics"&&(n.visible_ranks??[]).length===0,o=n.write_ranks===null,[l,c]=X.useState({read:[...n.visible_ranks??[]],write:[...n.write_ranks??[]]}),[d,p]=X.useState(a),[f,m]=X.useState(o),y=(S,_)=>c(M=>_?{...M,read:M.read.includes(S)?M.read:[...M.read,S]}:{read:M.read.filter(T=>T!==S),write:M.write.filter(T=>T!==S)}),x=(S,_)=>c(M=>_?{write:M.write.includes(S)?M.write:[...M.write,S],read:M.read.includes(S)?M.read:[...M.read,S]}:{...M,write:M.write.filter(T=>T!==S)}),g=()=>r(()=>se(`/guilds/${t}/${n.id}/perms`,{characterId:i.id,readRanks:d?null:l.read,writeRanks:f?null:l.write}),s),h=d?[]:l.read,v=f?[]:l.write;return u.jsxs("div",{className:"ppanel",children:[t==="topics"&&u.jsxs("div",{className:"row",children:[u.jsxs("label",{className:"chk",children:[u.jsx("input",{type:"checkbox",checked:d,onChange:S=>p(S.target.checked)})," Lecture héritée de la catégorie"]}),u.jsxs("label",{className:"chk",children:[u.jsx("input",{type:"checkbox",checked:f,onChange:S=>m(S.target.checked)})," Écriture héritée de la catégorie"]})]}),u.jsx("div",{className:"pgrid",children:e.ranks.map(S=>u.jsxs("div",{className:"pp",children:[u.jsx("input",{type:"checkbox",disabled:t==="topics"&&d,checked:h.includes(S.name),onChange:_=>y(S.name,_.target.checked)}),u.jsx("input",{type:"checkbox",disabled:t==="topics"&&f,checked:v.includes(S.name),onChange:_=>x(S.name,_.target.checked)}),u.jsx("b",{children:S.name}),S.is_leader&&u.jsx("small",{children:" (tous droits)"})]},S.id))}),u.jsxs("div",{className:"row",children:[u.jsx("button",{className:"primary",onClick:g,children:"Enregistrer les droits"}),u.jsx("small",{children:"Le Chef dépasse toujours ces droits ; écrire est limité à « voir »."})]})]})}function ed({onFmt:t,onColor:e}){const[n,i]=X.useState("#c8a24a");return u.jsxs("span",{className:"fmtbar",children:[u.jsx("button",{type:"button",title:"Gras : entoure la sélection de **",onClick:()=>t("**"),children:u.jsx("b",{children:"B"})}),u.jsx("button",{type:"button",title:"Italique : entoure la sélection de *",onClick:()=>t("*"),children:u.jsx("i",{children:"I"})}),u.jsx("label",{title:"Couleur : insère le code #rrggbb à la suite de la sélection",children:u.jsx("input",{type:"color",value:n,onChange:r=>i(r.target.value),onMouseUp:()=>e(n),onTouchEnd:()=>e(n)})})]})}const td=()=>{const t=X.useRef(null),e=i=>({onFocus:r=>{t.current={el:r.target,set:i}}}),n=i=>{const r=t.current;if(!r)return;const s=r.el.selectionStart??0,a=r.el.selectionEnd??0,o=i(r.el.value,s,a);r.set(o.text),requestAnimationFrame(()=>{var l,c;return(c=(l=r.el).setSelectionRange)==null?void 0:c.call(l,o.cursor,o.cursor)})};return{bind:e,fmt:i=>n((r,s,a)=>Q3(r,s,a,i)),color:i=>n((r,s,a)=>J3(r,s,a,i))}};function gp({i:t,len:e,onOpen:n,dnd:i,below:r,setBelow:s,label:a,canMove:o,onMove:l}){var c;return u.jsxs("div",{className:"item radd"+(((c=i.drag)==null?void 0:c.from)===t?" rkdr":""),title:a,onClick:()=>{i.justDrag.current||n()},...i.rowProps(t),children:[u.jsx("span",{}),u.jsx("button",{className:"plus","aria-label":a,onClick:n,children:u.jsx(qu,{size:26,strokeWidth:2.5})}),u.jsxs("span",{className:"aacts",children:[u.jsxs("label",{className:"tgl",title:"Position d'insertion de la nouvelle entrée",onClick:d=>d.stopPropagation(),children:[u.jsx("span",{children:r?"insertion en dessous":"insertion au-dessus"}),u.jsxs("span",{className:"trk",children:[u.jsx("input",{type:"checkbox",checked:r,onChange:d=>s(d.target.checked)}),u.jsx("span",{className:"knob"})]})]}),o&&u.jsx(wu,{i:t,len:e,onMove:l})]})]})}function vp({rows:t,onReorder:e,renderRow:n,className:i="dlist"}){const r=X.useRef(null),s=Z3(t.length,e,r);return u.jsxs("div",{className:i,ref:r,children:[s.drag&&u.jsx("div",{className:"inl",style:{top:s.lineY+"px"}}),t.map((a,o)=>u.jsx(X.Fragment,{children:n(a,o,s)},a.add?"add":a.id))]})}function Qv({label:t,title:e,desc:n,save:i,onDone:r}){const[s,a]=X.useState({title:e,desc:n}),o=td();return u.jsxs("div",{className:"edbox",children:[u.jsx(ed,{onFmt:o.fmt,onColor:o.color}),u.jsxs("div",{className:"edrow",children:[u.jsx("input",{...o.bind(l=>a(c=>({...c,title:l}))),value:s.title,placeholder:t}),u.jsx("textarea",{rows:2,...o.bind(l=>a(c=>({...c,desc:l}))),placeholder:"Description…",value:s.desc}),u.jsx("button",{className:"primary",onClick:()=>i(s,r),children:"Enregistrer"})]})]})}function aN({g:t,me:e,run:n,load:i}){var U;const r=t.me.permissions.create_topics,s=t.me.leader,[a,o]=X.useState(null),[l,c]=X.useState(null),[d,p]=X.useState([]),[f,m]=X.useState(""),[y,x]=X.useState(!1),[g,h]=X.useState(!1),[v,S]=X.useState(null),[_,M]=X.useState(!1),[T,A]=X.useState(null),[b,w]=X.useState(!1),[E,N]=X.useState(null),[V,z]=X.useState(null),[Y,ne]=X.useState(null),[Q,K]=X.useState(null),I=td(),H=t.folders.find(Ce=>Ce.id===a),J=H==null?void 0:H.topics.find(Ce=>Ce.id===l),de=async Ce=>{c(Ce.id),p(await se(`/guilds/topics/${e.id}/${Ce.id}`).catch(()=>[])),i()},Ae=()=>l!==null?c(null):o(null),We=t.folders.map(Ce=>Ce.id),Z=((H==null?void 0:H.topics)??[]).map(Ce=>Ce.id),ae=nl(We,v),xe=nl(Z,T),fe=Ce=>{S(Ce.addPos),Ce.ids.join()!==We.join()&&n(()=>se("/guilds/reorder",{characterId:e.id,kind:"folders",ids:Ce.ids}),i)},De=Ce=>{A(Ce.addPos),Ce.ids.join()!==Z.join()&&n(()=>se("/guilds/reorder",{characterId:e.id,kind:"topics",folderId:a,ids:Ce.ids}),i)},je=()=>se(`/guilds/${e.id}`).then(Ce=>{const Me=Ce.folders[Ce.folders.length-1].id,Ue=Ce.folders.slice(0,-1).map(Ve=>Ve.id),le=mp(Ue,v,Me,_);return le.join()!==Ce.folders.map(Ve=>Ve.id).join()?se("/guilds/reorder",{characterId:e.id,kind:"folders",ids:le}).then(i).catch(i):i()}).catch(()=>i()),ve=()=>se(`/guilds/${e.id}`).then(Ce=>{const Me=Ce.folders.find(be=>be.id===a),Ue=Me.topics[Me.topics.length-1].id,le=Me.topics.slice(0,-1).map(be=>be.id),Ve=mp(le,T,Ue,b);return Ve.join()!==Me.topics.map(be=>be.id).join()?se("/guilds/reorder",{characterId:e.id,kind:"topics",folderId:a,ids:Ve}).then(i).catch(i):i()}).catch(()=>i()),it=t.unread??{topics:{},folders:{}},$e=Ce=>u.jsx(Qv,{label:"Titre de la catégorie…",title:Ce.name,desc:Ce.description??"",save:(Me,Ue)=>n(()=>se(`/guilds/folders/${Ce.id}/edit`,{characterId:e.id,name:Me.title,description:Me.desc}),()=>{Ue(),i()}),onDone:()=>ne(null)},Ce.id),ut=Ce=>u.jsx(Qv,{label:"Titre du sujet…",title:Ce.title,desc:Ce.description??"",save:(Me,Ue)=>n(()=>se(`/guilds/topics/${Ce.id}/edit`,{characterId:e.id,title:Me.title,description:Me.desc}),()=>{Ue(),i()}),onDone:()=>K(null)},Ce.id);return u.jsxs("div",{className:"forum",children:[!H&&u.jsxs("div",{className:"fview",children:[u.jsxs("div",{className:"row2 fhead2",children:[u.jsx("span",{}),u.jsx("h4",{className:"rhead",children:"Catégories"}),u.jsx("span",{})]}),u.jsx(vp,{rows:ae,onReorder:(Ce,Me)=>fe(pp(We,v,Ce,Me)),renderRow:(Ce,Me,Ue)=>{var be;if(Ce.add)return u.jsx(gp,{i:Me,len:ae.length,onOpen:()=>x(!0),dnd:Ue,below:_,setBelow:M,label:"Ajouter une catégorie",canMove:r,onMove:(P,C)=>fe(yo(We,v,P,C))});const le=t.folders.find(P=>P.id===Ce.id),Ve=it.folders[le.id]??0;return u.jsxs("div",{className:"item fcard"+(((be=Ue.drag)==null?void 0:be.from)===Me?" rkdr":""),...Ue.rowProps(Me),children:[u.jsxs("div",{className:"row2 sel",children:[u.jsxs("button",{className:"selitem",onClick:()=>{o(le.id),c(null),N(null)},children:[u.jsxs("span",{children:[u.jsx("b",{dangerouslySetInnerHTML:{__html:Gi(le.name)}}),Ve>0&&u.jsx("span",{className:"unread",children:Ve})]}),u.jsxs("small",{children:[u.jsx(yf,{size:12})," ",le.visible_ranks.length?le.visible_ranks.join(", "):"personne (hors Chef)"]})]}),u.jsxs("span",{className:"row",children:[r&&u.jsx("button",{title:"Éditer",onClick:()=>{ne(le.id),N(null)},children:u.jsx(Cc,{size:13})}),r&&u.jsx(wu,{i:Me,len:ae.length,onMove:(P,C)=>fe(yo(We,v,P,C))})]})]}),le.description&&u.jsx("div",{className:"fsep",children:"-----"}),le.description&&u.jsx("small",{className:"fdesc",dangerouslySetInnerHTML:{__html:Gi(le.description)}}),Y===le.id&&$e(le),s&&u.jsxs("div",{className:"prow",children:[u.jsx("button",{className:"btnlike",onClick:()=>N(E===le.id?null:le.id),children:E===le.id?"Masquer les droits":"Droits par rang (Voir / Écrire)"}),E===le.id&&u.jsx(Zv,{kind:"folders",g:t,target:le,me:e,run:n,onDone:()=>{N(null),i()}})]})]})}}),!t.folders.length&&u.jsx("small",{children:"Aucune catégorie : créez-en une avec la carte +."})]}),H&&l===null&&u.jsxs("div",{className:"fview",children:[u.jsxs("div",{className:"row2 fhead2",children:[u.jsxs("button",{className:"backbtn",onClick:Ae,title:"Retour aux catégories",children:[u.jsx(m0,{size:15})," Catégories"]}),u.jsx("h4",{className:"rhead",dangerouslySetInnerHTML:{__html:Gi(H.name)}}),u.jsx("span",{})]}),H.description&&u.jsx("div",{className:"fsep",children:"-----"}),H.description&&u.jsx("small",{className:"fdesc",dangerouslySetInnerHTML:{__html:Gi(H.description)}}),u.jsx(vp,{rows:xe,onReorder:(Ce,Me)=>De(pp(Z,T,Ce,Me)),renderRow:(Ce,Me,Ue)=>{var P;if(Ce.add)return u.jsx(gp,{i:Me,len:xe.length,onOpen:()=>h(!0),dnd:Ue,below:b,setBelow:w,label:"Ajouter un sujet",canMove:r,onMove:(C,j)=>De(yo(Z,T,C,j))});const le=H.topics.find(C=>C.id===Ce.id),Ve=it.topics[le.id]??0,be=qv(le,H,t.me,e.id);return u.jsxs("div",{className:"item fcard"+(((P=Ue.drag)==null?void 0:P.from)===Me?" rkdr":""),...Ue.rowProps(Me),children:[u.jsxs("div",{className:"row2 sel",children:[u.jsxs("button",{className:"selitem",onClick:()=>de(le),children:[u.jsxs("span",{children:[u.jsx("b",{dangerouslySetInnerHTML:{__html:Gi(le.title)}}),Ve>0&&u.jsx("span",{className:"unread",children:Ve})]}),u.jsxs("small",{children:["par ",le.author," · ",(le.visible_ranks??[]).length?`voir : ${le.visible_ranks.join(", ")}`:"lecture héritée"]})]}),u.jsxs("span",{className:"row",children:[be&&u.jsx("button",{title:"Éditer",onClick:()=>{K(le.id),z(null)},children:u.jsx(Cc,{size:13})}),r&&u.jsx(wu,{i:Me,len:xe.length,onMove:(C,j)=>De(yo(Z,T,C,j))})]})]}),le.description&&u.jsx("div",{className:"fsep",children:"-----"}),le.description&&u.jsx("small",{className:"fdesc",dangerouslySetInnerHTML:{__html:Gi(le.description)}}),Q===le.id&&ut(le),s&&u.jsxs("div",{className:"prow",children:[u.jsx("button",{className:"btnlike",onClick:()=>z(V===le.id?null:le.id),children:V===le.id?"Masquer les droits":"Droits par rang (Voir / Écrire)"}),V===le.id&&u.jsx(Zv,{kind:"topics",g:t,target:le,me:e,run:n,onDone:()=>{z(null),i()}})]})]})}}),!((U=H.topics)!=null&&U.length)&&u.jsx("small",{children:"Aucun sujet dans cette catégorie."})]}),J&&u.jsxs("div",{className:"fview",children:[u.jsxs("div",{className:"row2 fhead2",children:[u.jsxs("button",{className:"backbtn",onClick:Ae,title:"Retour aux sujets",children:[u.jsx(m0,{size:15})," Sujets"]}),u.jsx("h4",{className:"rhead",dangerouslySetInnerHTML:{__html:Gi(J.title)}}),qv(J,H,t.me,e.id)&&u.jsx("button",{className:"btnlike",title:"Éditer le sujet",onClick:()=>K(J.id),children:u.jsx(Cc,{size:13})})]}),J.description&&u.jsx("div",{className:"fsep",children:"-----"}),J.description&&u.jsx("small",{className:"fdesc",dangerouslySetInnerHTML:{__html:Gi(J.description)}}),Q===J.id&&ut(J),u.jsxs("div",{className:"posts",children:[d.map((Ce,Me)=>u.jsx(iN,{p:Ce},Ce.id??Me)),!d.length&&u.jsx("small",{children:"Aucun message pour l'instant."})]}),s||K3(J,H).includes(t.me.rank)?u.jsxs("div",{className:"replywrap",children:[u.jsx(ed,{onFmt:I.fmt,onColor:I.color}),u.jsxs("div",{className:"replyrow",children:[u.jsx("input",{...I.bind(m),value:f,onChange:Ce=>m(Ce.target.value),placeholder:"Répondre… (**gras** · *italique* · #rrggbb)"}),u.jsx("button",{className:"primary",onClick:()=>n(()=>se("/guilds/posts",{characterId:e.id,topicId:J.id,body:f}),()=>{m(""),de(J)}),children:"Envoyer"})]})]}):u.jsx("small",{children:"Votre rang ne permet pas de répondre dans ce sujet."})]}),y&&u.jsx(rN,{g:t,me:e,run:n,load:i,onCreated:je,onClose:()=>x(!1)}),g&&u.jsx(sN,{g:t,folder:H,me:e,run:n,load:i,onCreated:ve,onClose:()=>h(!1)})]})}function oN({me:t,run:e,load:n,onClose:i,onCreated:r}){const[s,a]=X.useState(""),[o,l]=X.useState({create_topics:!0});return u.jsx(dr,{onClose:i,className:"inv guild",label:"Nouveau rang",children:u.jsxs("div",{className:"form",children:[u.jsxs("h4",{children:[u.jsx(qu,{size:14})," Créer un rang"]}),u.jsx("input",{placeholder:"Nom (ex : Sénéchal, Recrue…)",value:s,onChange:c=>a(c.target.value)}),U1.map(([c,d])=>u.jsxs("label",{className:"chk",children:[u.jsx("input",{type:"checkbox",checked:!!o[c],onChange:p=>l({...o,[c]:p.target.checked})})," ",d]},c)),u.jsx("button",{className:"primary",disabled:s.trim().length<2,onClick:()=>e(()=>se("/guilds/ranks",{characterId:t.id,name:s.trim(),permissions:o}),()=>{i(),(r??n)()}),children:"Créer le rang"})]})})}function wu({i:t,len:e,onMove:n}){return u.jsxs("span",{className:"ord",children:[u.jsx("button",{title:"Monter",disabled:t===0,onClick:i=>{i.stopPropagation(),n(t,-1)},children:u.jsx(Dw,{size:14})}),u.jsx("button",{title:"Descendre",disabled:t===e-1,onClick:i=>{i.stopPropagation(),n(t,1)},children:u.jsx(Iw,{size:14})})]})}function lN({g:t,me:e,run:n,load:i}){const[r,s]=X.useState(!1),[a,o]=X.useState(null),[l,c]=X.useState(""),[d,p]=X.useState(null),[f,m]=X.useState(!1),y=t.ranks.map(_=>_.id),x=nl(y,d),g=_=>{p(_.addPos),_.ids.join()!==y.join()&&n(()=>se("/guilds/reorder",{characterId:e.id,kind:"ranks",ids:_.ids}),i)},h=(_,M)=>g(yo(y,d,_,M)),v=_=>n(()=>se(`/guilds/ranks/${_.id}/rename`,{characterId:e.id,name:l}),()=>{o(null),i()}),S=()=>se(`/guilds/${e.id}`).then(_=>{const M=_.ranks[_.ranks.length-1].id,T=_.ranks.slice(0,-1).map(b=>b.id),A=mp(T,d,M,f);return A.join()!==_.ranks.map(b=>b.id).join()?se("/guilds/reorder",{characterId:e.id,kind:"ranks",ids:A}).then(i).catch(i):i()}).catch(()=>i());return u.jsxs("div",{className:"form ranks",children:[u.jsx("h4",{className:"rhead",children:"Rangs & privilèges"}),u.jsx(vp,{rows:x,onReorder:(_,M)=>g(pp(y,d,_,M)),renderRow:(_,M,T)=>{var b;if(_.add)return u.jsx(gp,{i:M,len:x.length,onOpen:()=>s(!0),dnd:T,below:f,setBelow:m,label:"Ajouter un rang",canMove:!0,onMove:h});const A=t.ranks.find(w=>w.id===_.id);return u.jsxs("div",{className:"item rcard"+(((b=T.drag)==null?void 0:b.from)===M?" rkdr":""),...T.rowProps(M),children:[u.jsxs("div",{className:"head",children:[u.jsx("b",{children:A.name}),u.jsxs("span",{className:"row",children:[A.is_leader&&u.jsx("span",{className:"pill",children:"Chef — tous les droits"}),a===A.id?u.jsxs("span",{className:"row",children:[u.jsx("input",{value:l,onChange:w=>c(w.target.value)}),u.jsx("button",{className:"primary",onClick:()=>v(A),children:"Renommer"})]}):u.jsx("button",{title:`Renommer « ${A.name} »`,onClick:()=>{o(A.id),c(A.name)},children:u.jsx(Cc,{size:13})}),u.jsx(wu,{i:M,len:x.length,onMove:h})]})]}),u.jsx("div",{className:"grid2",children:U1.map(([w,E])=>u.jsxs("label",{className:"chk",children:[u.jsx("input",{type:"checkbox",disabled:A.is_leader,checked:A.is_leader||!!A.permissions[w],onChange:N=>n(()=>se(`/guilds/ranks/${A.id}/permission`,{characterId:e.id,permission:w,value:N.target.checked}),i)})," ",E]},w))})]})}}),u.jsxs("div",{className:"item drank",children:[u.jsx("div",{className:"head",children:u.jsx("b",{children:"Rang par défaut des nouveaux arrivants"})}),u.jsx("div",{className:"drow",children:[u.jsxs("label",{className:"chk",children:[u.jsx("input",{type:"radio",name:"drank",checked:t.guild.default_rank_id==null,onChange:()=>n(()=>se("/guilds/default-rank",{characterId:e.id,rankId:null}),i)})," Automatique (rang le plus bas)"]},"auto"),...t.ranks.filter(_=>!_.is_leader).map(_=>u.jsxs("label",{className:"chk",children:[u.jsx("input",{type:"radio",name:"drank",checked:t.guild.default_rank_id===_.id,onChange:()=>n(()=>se("/guilds/default-rank",{characterId:e.id,rankId:_.id}),i)})," ",_.name]},_.id))]}),u.jsx("small",{children:"Un candidat accepté ou une invitation acceptée reçoit ce rang. « Automatique » = le rang non-Chef le plus bas."})]}),r&&u.jsx(oN,{me:e,run:n,load:i,onCreated:S,onClose:()=>s(!1)})]})}function cN({me:t,run:e,reload:n}){const[i,r]=X.useState(""),[s,a]=X.useState(""),[o,l]=X.useState([]);return X.useEffect(()=>{se(`/guilds/invitations/${t.id}`).then(l).catch(()=>{})},[]),u.jsxs("div",{className:"cols",children:[u.jsxs("div",{className:"form",children:[u.jsx("h3",{children:"Fonder une guilde"}),u.jsx("input",{placeholder:"Nom de la guilde",value:i,onChange:c=>r(c.target.value)}),u.jsx("input",{placeholder:"Tag (2-6 lettres)",maxLength:6,value:s,onChange:c=>a(c.target.value)}),u.jsx("button",{className:"primary",onClick:()=>e(()=>se("/guilds",{characterId:t.id,name:i,tag:s||void 0}),n),children:"Créer"}),u.jsx("h3",{children:"Postuler"}),u.jsxs("div",{className:"row",children:[u.jsx("input",{placeholder:"Nom de la guilde",value:i,onChange:c=>r(c.target.value)}),u.jsx("button",{onClick:()=>e(()=>se("/guilds/apply",{characterId:t.id,name:i}),()=>alert("Candidature envoyée")),children:"Postuler"})]})]}),u.jsxs("div",{className:"form",children:[u.jsx("h3",{children:"Invitations reçues"}),!o.length&&u.jsx("small",{children:"Aucune invitation."}),o.map(c=>u.jsxs("div",{className:"item row2",children:[u.jsxs("span",{children:[c.guild," [",c.tag,"]"]}),u.jsxs("span",{className:"row",children:[u.jsx("button",{className:"primary",onClick:()=>e(()=>se(`/guilds/invitations/${c.id}/accept`,{characterId:t.id,accept:!0}),n),children:"Rejoindre"}),u.jsx("button",{onClick:()=>e(()=>se(`/guilds/invitations/${c.id}/accept`,{characterId:t.id,accept:!1}),n),children:"Refuser"})]})]},c.id))]})]})}function uN(){const{me:t}=Yt(f=>f.game),e=Kt(),n=Es(),i=ur(),[r,s]=X.useState(void 0),[a,o]=X.useState("pres"),l=()=>se(`/guilds/${t.id}`).then(s).catch(()=>s(null));X.useEffect(()=>{l()},[]);const c=()=>{l(),i()},d=()=>n(()=>se("/guilds/leave",{characterId:t.id}),c),p=[["pres",Yw,"1. Présentation"],["list",n2,`2. Liste (${(r==null?void 0:r.members.length)??0})`],["forum",$w,"3. Forum"],...r!=null&&r.me.leader?[["manage",ky,"4. Gestion (Chef)"]]:[]];return r===void 0?null:u.jsx(dr,{onClose:()=>e(tt.setPanel(null)),className:"inv guild",label:"Guilde",children:r?u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"seg tabs4",children:p.map(([f,m,y])=>u.jsxs("button",{className:a===f?"on":"",onClick:()=>o(f),children:[u.jsx(m,{size:15})," ",y]},f))}),u.jsxs("small",{className:"rankline",children:["Votre rang : ",u.jsx("b",{children:r.me.rank})]}),a==="pres"&&u.jsx(eN,{g:r,me:t,run:n,load:l,leave:d}),a==="list"&&u.jsx(tN,{g:r,me:t,run:n,load:l}),a==="forum"&&u.jsx(aN,{g:r,me:t,run:n,load:l}),a==="manage"&&r.me.leader&&u.jsx(lN,{g:r,me:t,run:n,load:l})]}):u.jsx(cN,{me:t,run:n,reload:c})})}const dN={human:"Hôtel de Ville",demon:"Bastion Infernal",angel:"Sanctuaire de la Providence"};function hN(){const{me:t}=Yt(_=>_.game),e=Kt(),n=Es(),i=ur(),[r,s]=ln("/shop"),[a,o]=ln(`/market/${t.id}`),[l,c]=ln(`/chest/${t.id}`),[d,p]=ln(`/spells/${t.id}`),[f,m]=ln(`/inventory/${t.id}`),[y,x]=X.useState(150),g=()=>{s(),o(),c(),m(),p(),i()},h=(f==null?void 0:f.items.filter(_=>!_.equipped_slot))??[],v=_=>n(_,g),S=_=>_.weapon_damage?`Arme ×${_.weapon_damage}`:_.armor?`Armure +${_.armor}`:"Outil / parchemin";return u.jsxs(dr,{onClose:()=>e(tt.setPanel(null)),className:"inv capital",label:"Capitale de faction",children:[u.jsxs("div",{className:"banner",children:[u.jsxs("div",{children:[u.jsx("h3",{children:dN[t.race]}),u.jsx("small",{children:"Toutes les interactions dans ce bâtiment coûtent 0 énergie."})]}),u.jsxs("span",{className:"pill gold",children:[t.gold," Or"]})]}),u.jsxs("div",{className:"cols3",children:[u.jsxs("section",{children:[u.jsxs("h4",{children:[u.jsx(Qw,{size:15})," Boutique de faction ",u.jsx("small",{children:"réserve"})]}),u.jsx("small",{children:"Outils de récolte, armes, parchemins de base et sorts."}),r==null?void 0:r.items.map(_=>u.jsxs("div",{className:"item row2",children:[u.jsxs("div",{children:[u.jsx("b",{children:_.name}),u.jsx("br",{}),u.jsxs("small",{children:[S(_)," · stock ",_.stock]})]}),u.jsxs("button",{disabled:_.stock<=0||t.gold<_.price,onClick:()=>v(()=>se("/shop/buy",{characterId:t.id,itemId:_.id})),children:[_.price," Or"]})]},_.id)),u.jsx("h4",{children:"Sorts de base"}),r==null?void 0:r.spells.map(_=>{const M=d==null?void 0:d.spells.some(T=>T.id===_.id);return u.jsxs("div",{className:"item row2",children:[u.jsxs("div",{children:[u.jsx("b",{children:_.name}),u.jsx("br",{}),u.jsxs("small",{children:[_.description," · ⚡",_.energy_cost]})]}),u.jsx("button",{disabled:M||t.gold<_.price,onClick:()=>v(()=>se("/shop/learn",{characterId:t.id,spellId:_.id})),children:M?"Appris":`Apprendre ${_.price} Or`})]},_.id)})]}),u.jsxs("section",{children:[u.jsxs("h4",{children:[u.jsx(Kw,{size:15})," Marché (",t.race==="human"?"Humains":t.race==="demon"?"Démons":"Anges",")"]}),u.jsx("small",{children:"Entre joueurs de votre race."}),a!=null&&a.length?a.map(_=>u.jsxs("div",{className:"item row2",children:[u.jsxs("div",{children:[u.jsx("b",{children:_.name}),u.jsx("br",{}),u.jsx("small",{children:_.kind})]}),u.jsxs("button",{disabled:t.gold<_.price,onClick:()=>v(()=>se(`/market/${_.id}/buy`,{characterId:t.id})),children:[_.price," Or"]})]},_.id)):u.jsx("small",{children:"Aucune offre."}),u.jsxs("div",{className:"row2 sellrow",children:[u.jsx("b",{children:"Mettre en vente depuis le sac"}),u.jsx("input",{type:"number",min:10,step:10,value:y,onChange:_=>x(+_.target.value)})]}),u.jsx("div",{className:"gear",children:h.map((_,M)=>u.jsxs("button",{className:"pill",onClick:()=>v(()=>se("/market/list",{characterId:t.id,kind:"item",refId:_.id,price:y})),children:["Vendre ",_.name," (",y,")"]},_.id+"-"+M))})]}),u.jsxs("section",{children:[u.jsxs("h4",{children:[u.jsx(Dy,{size:15})," Coffre personnel ",u.jsxs("small",{children:[(l==null?void 0:l.items.length)??0," / ",(l==null?void 0:l.size)??"…"," espaces"]})]}),u.jsx("small",{children:"Plus il est grand, plus l'extension coûte cher."}),l!=null&&l.items.length?l.items.map((_,M)=>u.jsxs("div",{className:"item row2",children:[u.jsx("span",{children:_.name}),u.jsx("button",{onClick:()=>v(()=>se("/chest/move",{characterId:t.id,itemId:_.id,to:"bag"})),children:"Retirer vers le sac"})]},_.id+"-"+M)):u.jsx("small",{children:"Votre coffre est vide."}),h.length>0&&u.jsxs(u.Fragment,{children:[u.jsxs("small",{children:[u.jsx(bw,{size:12})," Déposer depuis le sac :"]}),u.jsx("div",{className:"gear",children:h.map((_,M)=>u.jsxs("button",{className:"pill",onClick:()=>v(()=>se("/chest/move",{characterId:t.id,itemId:_.id,to:"chest"})),children:["+ ",_.name]},_.id+"-"+M))})]}),u.jsxs("button",{className:"primary wide",disabled:!l||t.gold<l.nextCost,onClick:()=>v(()=>se("/chest/expand",{characterId:t.id})),children:[u.jsx(Uw,{size:14})," Agrandir (+1 espace) — ",(l==null?void 0:l.nextCost)??"…"," Or"]})]})]})]})}function fN(){var c;const{me:t,auth:e}=Yt(d=>d.game),n=Kt(),i=Es(),[r,s]=ln("/characters"),[a,o]=X.useState(""),l=((c=r==null?void 0:r[0])==null?void 0:c.race)??t.race;return u.jsxs(Ju,{title:"Compte & paramètres",wide:!0,children:[u.jsxs("h4",{children:["Personnages du compte (",(r==null?void 0:r.length)??0,"/3) ",u.jsxs("span",{className:"pill",children:["Race unique : ",l]})]}),u.jsxs("div",{className:"item",children:[u.jsx("small",{children:"Personnage actif (pseudo non modifiable)"}),u.jsxs("div",{children:[u.jsx("b",{children:t.pseudo})," ",u.jsx(xm,{size:13})," · ",t.rank.rank_name]})]}),r==null?void 0:r.map(d=>u.jsxs("button",{className:"row2 sel"+(d.id===t.id?" on":""),onClick:()=>{n(tt.setMe(null)),n(tt.setChar(d.id)),n(tt.setPanel(null))},children:[u.jsx("span",{children:d.pseudo}),u.jsxs("small",{children:["(",d.x,",",d.y,")"]})]},d.id)),((r==null?void 0:r.length)??0)<3&&u.jsxs("div",{className:"row",children:[u.jsx("input",{placeholder:"Pseudo du nouveau héros…",value:a,onChange:d=>o(d.target.value)}),u.jsxs("button",{className:"primary",onClick:()=>i(()=>se("/characters",{pseudo:a,race:l}),()=>{o(""),s()}),children:[u.jsx(Fy,{size:14})," Créer"]})]}),(e==null?void 0:e.admin)&&u.jsxs(u.Fragment,{children:[u.jsx("h4",{children:"Administration"}),u.jsxs("div",{className:"item row2",children:[u.jsxs("div",{children:[u.jsx("b",{children:"Simuler la mise à jour horaire (+1 h)"}),u.jsx("br",{}),u.jsx("small",{children:"Régénère Vie et Énergie du héros, de sa monture et des invocations ; +XP/h et +Or/h."})]}),u.jsxs("button",{onClick:()=>i(()=>se("/admin/tick",void 0,"POST"),()=>n(tt.toast("+1 heure appliquée"))),children:[u.jsx(kw,{size:14})," +1 h"]})]}),u.jsxs("a",{className:"item row2",href:"#admin",children:[u.jsxs("span",{children:[u.jsx("b",{children:"Espace administrateur"}),u.jsx("br",{}),u.jsx("small",{children:"Joueurs, blocage, téléportation, création d'objets/boss."})]}),u.jsx(_m,{size:18})]})]}),u.jsxs("button",{className:"danger wide",onClick:()=>{ym(null),location.reload()},children:[u.jsx(Hw,{size:14})," Déconnexion"]})]})}function pN(){const[t,e]=X.useState(null),[n,i]=X.useState([]),[r,s]=X.useState("items"),[a,o]=X.useState('{"name":"","slot":"weapon","rarity":"rare","quantity_max":5}'),[l,c]=X.useState(""),d=()=>{se("/admin/stats").then(e).catch(f=>c(f.message)),se("/admin/players").then(i).catch(()=>{})};X.useEffect(d,[]);const p=async f=>{try{await f(),d(),c("OK")}catch(m){c(m.message)}};return u.jsxs("div",{className:"admin",children:[u.jsx("a",{href:"/",children:"← Jeu"}),u.jsx("h1",{children:"Administration"}),u.jsx("p",{children:l}),u.jsx("pre",{children:JSON.stringify(t)}),u.jsx("button",{onClick:()=>p(()=>se("/admin/tick",void 0,"POST")),children:"Simuler +1 heure"}),u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"#"}),u.jsx("th",{children:"Pseudo"}),u.jsx("th",{children:"Race"}),u.jsx("th",{children:"XP"}),u.jsx("th",{children:"Or"}),u.jsx("th",{children:"Pos"}),u.jsx("th",{children:"Actions"})]})}),u.jsx("tbody",{children:n.map(f=>u.jsxs("tr",{children:[u.jsx("td",{children:f.id}),u.jsx("td",{children:f.pseudo}),u.jsx("td",{children:f.race}),u.jsx("td",{children:f.xp}),u.jsx("td",{children:f.gold}),u.jsxs("td",{children:[f.map_id,":",f.x,",",f.y]}),u.jsxs("td",{children:[u.jsx("button",{onClick:()=>p(()=>se(`/admin/players/${f.id}/block`,{blocked:!f.blocked})),children:f.blocked?"Débloquer":"Bloquer"}),u.jsx("button",{onClick:()=>{const[m,y,x]=(prompt("map,x,y","1,100,100")||"").split(",").map(Number);m&&p(()=>se(`/admin/players/${f.id}/teleport`,{map:m,x:y,y:x}))},children:"Téléporter"}),u.jsx("button",{onClick:()=>{const[m,y]=(prompt("Donner : item|spell|mount, id","mount,1")||"").split(",");m&&p(()=>se(`/admin/players/${f.id}/grant`,{kind:m,refId:+y}))},children:"Donner"}),u.jsx("button",{onClick:()=>{const[m,y]=(prompt("stat,delta","gold,100")||"").split(",");m&&p(()=>se(`/admin/players/${f.id}/stat`,{stat:m,delta:+y}))},children:"± stat"})]})]},f.id))})]}),u.jsx("h3",{children:"Créer dynamiquement"}),u.jsx("select",{value:r,onChange:f=>s(f.target.value),children:["items","monsters","mounts","spells"].map(f=>u.jsx("option",{children:f},f))}),u.jsx("textarea",{rows:"5",value:a,onChange:f=>o(f.target.value)}),u.jsx("button",{onClick:()=>p(()=>se(`/admin/create/${r}`,{data:JSON.parse(a)})),children:"Créer"})]})}function mN(){const{auth:t,charId:e,me:n,panel:i,toast:r}=Yt(f=>f.game),s=Kt(),[a,o]=X.useState(location.hash),[l,c]=X.useState(!M0()),[d,p]=X.useState(!1);return X.useEffect(()=>{const f=()=>o(location.hash);return addEventListener("hashchange",f),M0()&&se("/auth/me").then(m=>s(tt.setAuth(m))).catch(()=>ym(null)).finally(()=>c(!0)),()=>removeEventListener("hashchange",f)},[]),X.useEffect(()=>{if(r){const f=setTimeout(()=>s(tt.toast(null)),3500);return()=>clearTimeout(f)}},[r]),l?t?a==="#admin"?t.admin?u.jsx(pN,{}):u.jsxs("div",{className:"center box",children:["Accès réservé.",u.jsx("a",{href:"#",children:"Retour"})]}):e?u.jsxs(u.Fragment,{children:[u.jsx(y3,{}),u.jsx(w3,{}),u.jsx(P3,{}),u.jsx(B3,{}),u.jsx(H3,{}),u.jsx(W3,{}),n&&{faith:u.jsx(X3,{}),mounts:u.jsx($3,{}),guild:u.jsx(uN,{}),world:u.jsx(Y3,{}),actions:u.jsx(q3,{}),capital:u.jsx(hN,{}),account:u.jsx(fN,{})}[i],r&&u.jsx("div",{className:"toast",children:r}),u.jsx("div",{className:"acctwrap",children:u.jsx("button",{className:"ico sm",title:"Compte & paramètres","aria-label":"Compte et paramètres",onClick:()=>s(tt.setPanel("account")),children:u.jsx(ky,{size:18})})})]}):u.jsx(_3,{admin:t.admin}):u.jsx(x3,{}):null}dy(document.getElementById("root")).render(u.jsx(RE,{store:ww,children:u.jsx(mN,{})}));
