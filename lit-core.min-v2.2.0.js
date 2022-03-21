/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new Map;class e{constructor(t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let i=s.get(this.cssText);return t&&void 0===i&&(s.set(this.cssText,i=new CSSStyleSheet),i.replaceSync(this.cssText)),i}toString(){return this.cssText}}const n=t=>new e("string"==typeof t?t:t+"",i),o=(t,...s)=>{const n=1===t.length?t[0]:s.reduce(((i,s,e)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[e+1]),t[0]);return new e(n,i)},h=(i,s)=>{t?i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style"),e=window.litNonce;void 0!==e&&s.setAttribute("nonce",e),s.textContent=t.cssText,i.appendChild(s)}))},l=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return n(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var r;const a=window.trustedTypes,u=a?a.emptyScript:"",d=window.reactiveElementPolyfillSupport,c={toAttribute(t,i){switch(i){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,i)=>i!==t&&(i==i||t==t),p={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:v};class f extends HTMLElement{constructor(){super(),this.t=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this.i=null,this.o()}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this.u(s,i);void 0!==e&&(this.g.set(e,s),t.push(e))})),t}static createProperty(t,i=p){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(e){const n=this[t];this[i]=e,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.g=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)i.unshift(l(t))}else void 0!==t&&i.push(l(t));return i}static u(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this.U(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,s;(null!==(i=this.M)&&void 0!==i?i:this.M=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var i;null===(i=this.M)||void 0===i||i.splice(this.M.indexOf(t)>>>0,1)}U(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.t.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return h(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.M)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.M)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,s){this._$AK(t,s)}q(t,i,s=p){var e,n;const o=this.constructor.u(t,s);if(void 0!==o&&!0===s.reflect){const h=(null!==(n=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==n?n:c.toAttribute)(i,s.type);this.i=t,null==h?this.removeAttribute(o):this.setAttribute(o,h),this.i=null}}_$AK(t,i){var s,e,n;const o=this.constructor,h=o.g.get(t);if(void 0!==h&&this.i!==h){const t=o.getPropertyOptions(h),l=t.converter,r=null!==(n=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==n?n:c.fromAttribute;this.i=h,this[h]=r(i,t.type),this.i=null}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this.i!==t&&(void 0===this.J&&(this.J=new Map),this.J.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._=this.K())}async K(){this.isUpdatePending=!0;try{await this._}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.t&&(this.t.forEach(((t,i)=>this[i]=t)),this.t=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this.M)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this.G()}catch(t){throw i=!1,this.G(),t}i&&this._$AE(s)}willUpdate(t){}_$AE(t){var i;null===(i=this.M)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}G(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._}shouldUpdate(t){return!0}update(t){void 0!==this.J&&(this.J.forEach(((t,i)=>this.q(i,this[i],t))),this.J=void 0),this.G()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:f}),(null!==(r=globalThis.reactiveElementVersions)&&void 0!==r?r:globalThis.reactiveElementVersions=[]).push("1.3.0");const y=globalThis.trustedTypes,b=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,S="?"+w,$=`<${S}>`,m=document,C=(t="")=>m.createComment(t),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,_=Array.isArray,E=t=>{var i;return _(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,x=/>/g,M=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,k=/'/g,R=/"/g,N=/^(?:script|style|textarea|title)$/i,O=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),L=O(1),j=O(2),z=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),P=new WeakMap,H=(t,i,s)=>{var e,n;const o=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let h=o._$litPart$;if(void 0===h){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;o._$litPart$=h=new K(i.insertBefore(C(),t),t,void 0,null!=s?s:{})}return h._$AI(t),h},B=m.createTreeWalker(m,129,null,!1),D=(t,i)=>{const s=t.length-1,e=[];let n,o=2===i?"<svg>":"",h=T;for(let i=0;i<s;i++){const s=t[i];let l,r,a=-1,u=0;for(;u<s.length&&(h.lastIndex=u,r=h.exec(s),null!==r);)u=h.lastIndex,h===T?"!--"===r[1]?h=U:void 0!==r[1]?h=x:void 0!==r[2]?(N.test(r[2])&&(n=RegExp("</"+r[2],"g")),h=M):void 0!==r[3]&&(h=M):h===M?">"===r[0]?(h=null!=n?n:T,a=-1):void 0===r[1]?a=-2:(a=h.lastIndex-r[2].length,l=r[1],h=void 0===r[3]?M:'"'===r[3]?R:k):h===R||h===k?h=M:h===U||h===x?h=T:(h=M,n=void 0);const d=h===M&&t[i+1].startsWith("/>")?" ":"";o+=h===T?s+$:a>=0?(e.push(l),s.slice(0,a)+"$lit$"+s.slice(a)+w+d):s+w+(-2===a?(e.push(void 0),i):d)}const l=o+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==b?b.createHTML(l):l,e]};class Z{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let n=0,o=0;const h=t.length-1,l=this.parts,[r,a]=D(t,i);if(this.el=Z.createElement(r,s),B.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(e=B.nextNode())&&l.length<h;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(w)){const s=a[o++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(w),i=/([.?@])?(.*)/.exec(s);l.push({type:1,index:n,name:i[2],strings:t,ctor:"."===i[1]?W:"?"===i[1]?G:"@"===i[1]?Q:V})}else l.push({type:6,index:n})}for(const i of t)e.removeAttribute(i)}if(N.test(e.tagName)){const t=e.textContent.split(w),i=t.length-1;if(i>0){e.textContent=y?y.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],C()),B.nextNode(),l.push({type:2,index:++n});e.append(t[i],C())}}}else if(8===e.nodeType)if(e.data===S)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=e.data.indexOf(w,t+1));)l.push({type:7,index:n}),t+=w.length-1}n++}}static createElement(t,i){const s=m.createElement("template");return s.innerHTML=t,s}}function q(t,i,s=t,e){var n,o,h,l;if(i===z)return i;let r=void 0!==e?null===(n=s.X)||void 0===n?void 0:n[e]:s.Y;const a=A(i)?void 0:i._$litDirective$;return(null==r?void 0:r.constructor)!==a&&(null===(o=null==r?void 0:r._$AO)||void 0===o||o.call(r,!1),void 0===a?r=void 0:(r=new a(t),r._$AT(t,s,e)),void 0!==e?(null!==(h=(l=s).X)&&void 0!==h?h:l.X=[])[e]=r:s.Y=r),void 0!==r&&(i=q(t,r._$AS(t,i.values),r,e)),i}class J{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,n=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:m).importNode(s,!0);B.currentNode=n;let o=B.nextNode(),h=0,l=0,r=e[0];for(;void 0!==r;){if(h===r.index){let i;2===r.type?i=new K(o,o.nextSibling,this,t):1===r.type?i=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(i=new X(o,this,t)),this.v.push(i),r=e[++l]}h!==(null==r?void 0:r.index)&&(o=B.nextNode(),h++)}return n}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class K{constructor(t,i,s,e){var n;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this.tt=null===(n=null==e?void 0:e.isConnected)||void 0===n||n}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this.tt}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=q(this,t,i),A(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==z&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):E(t)?this.S(t):this.$(t)}A(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==I&&A(this._$AH)?this._$AA.nextSibling.data=t:this.k(m.createTextNode(t)),this._$AH=t}T(t){var i;const{values:s,_$litType$:e}=t,n="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=Z.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===n)this._$AH.m(s);else{const t=new J(n,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t}}_$AC(t){let i=P.get(t.strings);return void 0===i&&P.set(t.strings,i=new Z(t)),i}S(t){_(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const n of t)e===i.length?i.push(s=new K(this.A(C()),this.A(C()),this,this.options)):s=i[e],s._$AI(n),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this.tt=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class V{constructor(t,i,s,e,n){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const n=this.strings;let o=!1;if(void 0===n)t=q(this,t,i,0),o=!A(t)||t!==this._$AH&&t!==z,o&&(this._$AH=t);else{const e=t;let h,l;for(t=n[0],h=0;h<n.length-1;h++)l=q(this,e[s+h],i,h),l===z&&(l=this._$AH[h]),o||(o=!A(l)||l!==this._$AH[h]),l===I?t=I:t!==I&&(t+=(null!=l?l:"")+n[h+1]),this._$AH[h]=l}o&&!e&&this.C(t)}C(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class W extends V{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===I?void 0:t}}const F=y?y.emptyScript:"";class G extends V{constructor(){super(...arguments),this.type=4}C(t){t&&t!==I?this.element.setAttribute(this.name,F):this.element.removeAttribute(this.name)}}class Q extends V{constructor(t,i,s,e,n){super(t,i,s,e,n),this.type=5}_$AI(t,i=this){var s;if((t=null!==(s=q(this,t,i,0))&&void 0!==s?s:I)===z)return;const e=this._$AH,n=t===I&&e!==I||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,o=t!==I&&(e===I||n);n&&this.element.removeEventListener(this.name,this,e),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class X{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const Y={P:"$lit$",L:w,V:S,I:1,N:D,R:J,D:E,j:q,H:K,O:V,F:G,B:Q,W,Z:X},tt=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,st;null==tt||tt(Z,K),(null!==(g=globalThis.litHtmlVersions)&&void 0!==g?g:globalThis.litHtmlVersions=[]).push("2.2.0");const et=f;class nt extends f{constructor(){super(...arguments),this.renderOptions={host:this},this.it=void 0}createRenderRoot(){var t,i;const s=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=s.firstChild),s}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.it=H(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.it)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.it)||void 0===t||t.setConnected(!1)}render(){return z}}nt.finalized=!0,nt._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:nt});const ot=globalThis.litElementPolyfillSupport;null==ot||ot({LitElement:nt});const ht={_$AK:(t,i,s)=>{t._$AK(i,s)},_$AL:t=>t._$AL};(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.2.0");export{e as CSSResult,nt as LitElement,f as ReactiveElement,et as UpdatingElement,ht as _$LE,Y as _$LH,h as adoptStyles,o as css,c as defaultConverter,l as getCompatibleStyle,L as html,z as noChange,v as notEqual,I as nothing,H as render,t as supportsAdoptingStyleSheets,j as svg,n as unsafeCSS};
//# sourceMappingURL=lit-core.min.js.map