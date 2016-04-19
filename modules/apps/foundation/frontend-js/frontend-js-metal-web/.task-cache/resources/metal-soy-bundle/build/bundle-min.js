define("frontend-js-metal-web@1.0.6/metal-soy-bundle/build/bundle-min", ["metal-incremental-dom/src/IncrementalDomRenderer"], function(){"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol?"symbol":typeof o};(function(){this.CLOSURE_NO_DEPS=!0,this.goog=this.goog||{};var COMPILED=!1,goog=this.goog||{};goog.global=this,goog.global.CLOSURE_UNCOMPILED_DEFINES,goog.global.CLOSURE_DEFINES,goog.isDef=function(o){return void 0!==o},goog.exportPath_=function(o,e,t){var g=o.split("."),i=t||goog.global;g[0]in i||!i.execScript||i.execScript("var "+g[0]);for(var r;g.length&&(r=g.shift());)!g.length&&goog.isDef(e)?i[r]=e:i=i[r]?i[r]:i[r]={}},goog.define=function(o,e){var t=e;COMPILED||(goog.global.CLOSURE_UNCOMPILED_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES,o)?t=goog.global.CLOSURE_UNCOMPILED_DEFINES[o]:goog.global.CLOSURE_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES,o)&&(t=goog.global.CLOSURE_DEFINES[o])),goog.exportPath_(o,t)},goog.define("goog.DEBUG",!0),goog.define("goog.LOCALE","en"),goog.define("goog.TRUSTED_SITE",!0),goog.define("goog.STRICT_MODE_COMPATIBLE",!1),goog.define("goog.DISALLOW_TEST_ONLY_CODE",COMPILED&&!goog.DEBUG),goog.define("goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING",!1),goog.provide=function(o){if(!COMPILED&&goog.isProvided_(o))throw Error('Namespace "'+o+'" already declared.');goog.constructNamespace_(o)},goog.constructNamespace_=function(o,e){if(!COMPILED){delete goog.implicitNamespaces_[o];for(var t=o;(t=t.substring(0,t.lastIndexOf(".")))&&!goog.getObjectByName(t);)goog.implicitNamespaces_[t]=!0}goog.exportPath_(o,e)},goog.VALID_MODULE_RE_=/^[a-zA-Z_$][a-zA-Z0-9._$]*$/,goog.module=function(o){if(!goog.isString(o)||!o||-1==o.search(goog.VALID_MODULE_RE_))throw Error("Invalid module identifier");if(!goog.isInModuleLoader_())throw Error("Module "+o+" has been loaded incorrectly.");if(goog.moduleLoaderState_.moduleName)throw Error("goog.module may only be called once per module.");if(goog.moduleLoaderState_.moduleName=o,!COMPILED){if(goog.isProvided_(o))throw Error('Namespace "'+o+'" already declared.');delete goog.implicitNamespaces_[o]}},goog.module.get=function(o){return goog.module.getInternal_(o)},goog.module.getInternal_=function(o){return COMPILED?void 0:goog.isProvided_(o)?o in goog.loadedModules_?goog.loadedModules_[o]:goog.getObjectByName(o):null},goog.moduleLoaderState_=null,goog.isInModuleLoader_=function(){return null!=goog.moduleLoaderState_},goog.module.declareLegacyNamespace=function(){if(!COMPILED&&!goog.isInModuleLoader_())throw new Error("goog.module.declareLegacyNamespace must be called from within a goog.module");if(!COMPILED&&!goog.moduleLoaderState_.moduleName)throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");goog.moduleLoaderState_.declareLegacyNamespace=!0},goog.setTestOnly=function(o){if(goog.DISALLOW_TEST_ONLY_CODE)throw (o=o||"", Error("Importing test-only code into non-debug environment"+(o?": "+o:".")))},COMPILED||(goog.isProvided_=function(o){return o in goog.loadedModules_||!goog.implicitNamespaces_[o]&&goog.isDefAndNotNull(goog.getObjectByName(o))},goog.implicitNamespaces_={"goog.module":!0}),goog.getObjectByName=function(o,e){for(var t,g=o.split("."),i=e||goog.global;t=g.shift();){if(!goog.isDefAndNotNull(i[t]))return null;i=i[t]}return i},goog.globalize=function(o,e){var t=e||goog.global;for(var g in o)t[g]=o[g]},goog.addDependency=function(o,e,t,g){if(goog.DEPENDENCIES_ENABLED){var i,r,n=o.replace(/\\/g,"/"),a=goog.dependencies_;g&&"boolean"!=typeof g||(g=g?{module:"goog"}:{});for(var s=0;i=e[s];s++)a.nameToPath[i]=n,a.pathIsModule[n]="goog"==g.module;for(var l=0;r=t[l];l++)n in a.requires||(a.requires[n]={}),a.requires[n][r]=!0}},goog.define("goog.ENABLE_DEBUG_LOADER",!0),goog.logToConsole_=function(o){goog.global.console&&goog.global.console.error(o)},goog.require=function(o){if(!COMPILED){if(goog.ENABLE_DEBUG_LOADER&&goog.IS_OLD_IE_&&goog.maybeProcessDeferredDep_(o),goog.isProvided_(o))return goog.isInModuleLoader_()?goog.module.getInternal_(o):null;if(goog.ENABLE_DEBUG_LOADER){var e=goog.getPathFromDeps_(o);if(e)return (goog.writeScripts_(e), null)}var t="goog.require could not find: "+o;throw (goog.logToConsole_(t), Error(t))}},goog.basePath="",goog.global.CLOSURE_BASE_PATH,goog.global.CLOSURE_NO_DEPS,goog.global.CLOSURE_IMPORT_SCRIPT,goog.nullFunction=function(){},goog.abstractMethod=function(){throw Error("unimplemented abstract method")},goog.addSingletonGetter=function(o){o.getInstance=function(){return o.instance_?o.instance_:(goog.DEBUG&&(goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=o),o.instance_=new o)}},goog.instantiatedSingletons_=[],goog.define("goog.LOAD_MODULE_USING_EVAL",!0),goog.define("goog.SEAL_MODULE_EXPORTS",goog.DEBUG),goog.loadedModules_={},goog.DEPENDENCIES_ENABLED=!COMPILED&&goog.ENABLE_DEBUG_LOADER,goog.DEPENDENCIES_ENABLED&&(goog.dependencies_={pathIsModule:{},nameToPath:{},requires:{},visited:{},written:{},deferred:{}},goog.inHtmlDocument_=function(){var o=goog.global.document;return null!=o&&"write"in o},goog.findBasePath_=function(){if(goog.isDef(goog.global.CLOSURE_BASE_PATH))return void(goog.basePath=goog.global.CLOSURE_BASE_PATH);if(goog.inHtmlDocument_())for(var o=goog.global.document,e=o.getElementsByTagName("SCRIPT"),t=e.length-1;t>=0;--t){var g=e[t],i=g.src,r=i.lastIndexOf("?"),n=-1==r?i.length:r;if("base.js"==i.substr(n-7,7))return void(goog.basePath=i.substr(0,n-7))}},goog.importScript_=function(o,e){var t=goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_;t(o,e)&&(goog.dependencies_.written[o]=!0)},goog.IS_OLD_IE_=!(goog.global.atob||!goog.global.document||!goog.global.document.all),goog.importModule_=function(o){var e='goog.retrieveAndExecModule_("'+o+'");';goog.importScript_("",e)&&(goog.dependencies_.written[o]=!0)},goog.queuedModules_=[],goog.wrapModule_=function(o,e){return goog.LOAD_MODULE_USING_EVAL&&goog.isDef(goog.global.JSON)?"goog.loadModule("+goog.global.JSON.stringify(e+"\n//# sourceURL="+o+"\n")+");":'goog.loadModule(function(exports) {"use strict";'+e+"\n;return exports});\n//# sourceURL="+o+"\n"},goog.loadQueuedModules_=function(){var o=goog.queuedModules_.length;if(o>0){var e=goog.queuedModules_;goog.queuedModules_=[];for(var t=0;o>t;t++){var g=e[t];goog.maybeProcessDeferredPath_(g)}}},goog.maybeProcessDeferredDep_=function(o){if(goog.isDeferredModule_(o)&&goog.allDepsAreAvailable_(o)){var e=goog.getPathFromDeps_(o);goog.maybeProcessDeferredPath_(goog.basePath+e)}},goog.isDeferredModule_=function(o){var e=goog.getPathFromDeps_(o);if(e&&goog.dependencies_.pathIsModule[e]){var t=goog.basePath+e;return t in goog.dependencies_.deferred}return!1},goog.allDepsAreAvailable_=function(o){var e=goog.getPathFromDeps_(o);if(e&&e in goog.dependencies_.requires)for(var t in goog.dependencies_.requires[e])if(!goog.isProvided_(t)&&!goog.isDeferredModule_(t))return!1;return!0},goog.maybeProcessDeferredPath_=function(o){if(o in goog.dependencies_.deferred){var e=goog.dependencies_.deferred[o];delete goog.dependencies_.deferred[o],goog.globalEval(e)}},goog.loadModuleFromUrl=function(o){goog.retrieveAndExecModule_(o)},goog.loadModule=function(o){var e=goog.moduleLoaderState_;try{goog.moduleLoaderState_={moduleName:void 0,declareLegacyNamespace:!1};var t;if(goog.isFunction(o))t=o.call(goog.global,{});else{if(!goog.isString(o))throw Error("Invalid module definition");t=goog.loadModuleFromSource_.call(goog.global,o)}var g=goog.moduleLoaderState_.moduleName;if(!goog.isString(g)||!g)throw Error('Invalid module name "'+g+'"');goog.moduleLoaderState_.declareLegacyNamespace?goog.constructNamespace_(g,t):goog.SEAL_MODULE_EXPORTS&&Object.seal&&Object.seal(t),goog.loadedModules_[g]=t}finally{goog.moduleLoaderState_=e}},goog.loadModuleFromSource_=function(){var exports={};return (eval(arguments[0]), exports)},goog.writeScriptSrcNode_=function(o){goog.global.document.write('<script type="text/javascript" src="'+o+'"></script>')},goog.appendScriptSrcNode_=function(o){var e=goog.global.document,t=e.createElement("script");t.type="text/javascript",t.src=o,t.defer=!1,t.async=!1,e.head.appendChild(t)},goog.writeScriptTag_=function(o,e){if(goog.inHtmlDocument_()){var t=goog.global.document;if(!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING&&"complete"==t.readyState){var g=/\bdeps.js$/.test(o);if(g)return!1;throw Error('Cannot write "'+o+'" after document load')}var i=goog.IS_OLD_IE_;if(void 0===e)if(i){var r=" onreadystatechange='goog.onScriptLoad_(this, "+ ++goog.lastNonModuleScriptIndex_+")' ";t.write('<script type="text/javascript" src="'+o+'"'+r+"></script>")}else goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING?goog.appendScriptSrcNode_(o):goog.writeScriptSrcNode_(o);else t.write('<script type="text/javascript">'+e+"</script>");return!0}return!1},goog.lastNonModuleScriptIndex_=0,goog.onScriptLoad_=function(o,e){return("complete"==o.readyState&&goog.lastNonModuleScriptIndex_==e&&goog.loadQueuedModules_(), !0)},goog.writeScripts_=function(o){function e(o){if(!(o in i.written||o in i.visited)){if(i.visited[o]=!0,o in i.requires)for(var r in i.requires[o])if(!goog.isProvided_(r)){if(!(r in i.nameToPath))throw Error("Undefined nameToPath for "+r);e(i.nameToPath[r])}o in g||(g[o]=!0,t.push(o))}}var t=[],g={},i=goog.dependencies_;e(o);for(var r=0;r<t.length;r++){var n=t[r];goog.dependencies_.written[n]=!0}var a=goog.moduleLoaderState_;goog.moduleLoaderState_=null;for(var r=0;r<t.length;r++){var n=t[r];if(!n)throw (goog.moduleLoaderState_=a, Error("Undefined script input"));i.pathIsModule[n]?goog.importModule_(goog.basePath+n):goog.importScript_(goog.basePath+n)}goog.moduleLoaderState_=a},goog.getPathFromDeps_=function(o){return o in goog.dependencies_.nameToPath?goog.dependencies_.nameToPath[o]:null},goog.findBasePath_(),goog.global.CLOSURE_NO_DEPS||goog.importScript_(goog.basePath+"deps.js")),goog.normalizePath_=function(o){for(var e=o.split("/"),t=0;t<e.length;)"."==e[t]?e.splice(t,1):t&&".."==e[t]&&e[t-1]&&".."!=e[t-1]?e.splice(--t,2):t++;return e.join("/")},goog.loadFileSync_=function(o){if(goog.global.CLOSURE_LOAD_FILE_SYNC)return goog.global.CLOSURE_LOAD_FILE_SYNC(o);var e=new goog.global.XMLHttpRequest;return (e.open("get",o,!1), e.send(), e.responseText)},goog.retrieveAndExecModule_=function(o){if(!COMPILED){var e=o;o=goog.normalizePath_(o);var t=goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_,g=goog.loadFileSync_(o);if(null==g)throw new Error("load of "+o+"failed");var i=goog.wrapModule_(o,g),r=goog.IS_OLD_IE_;r?(goog.dependencies_.deferred[e]=i,goog.queuedModules_.push(e)):t(o,i)}},goog.typeOf=function(o){var e="undefined"==typeof o?"undefined":_typeof(o);if("object"==e){if(!o)return"null";if(o instanceof Array)return"array";if(o instanceof Object)return e;var t=Object.prototype.toString.call(o);if("[object Window]"==t)return"object";if("[object Array]"==t||"number"==typeof o.length&&"undefined"!=typeof o.splice&&"undefined"!=typeof o.propertyIsEnumerable&&!o.propertyIsEnumerable("splice"))return"array";if("[object Function]"==t||"undefined"!=typeof o.call&&"undefined"!=typeof o.propertyIsEnumerable&&!o.propertyIsEnumerable("call"))return"function"}else if("function"==e&&"undefined"==typeof o.call)return"object";return e},goog.isNull=function(o){return null===o},goog.isDefAndNotNull=function(o){return null!=o},goog.isArray=function(o){return"array"==goog.typeOf(o)},goog.isArrayLike=function(o){var e=goog.typeOf(o);return"array"==e||"object"==e&&"number"==typeof o.length},goog.isDateLike=function(o){return goog.isObject(o)&&"function"==typeof o.getFullYear},goog.isString=function(o){return"string"==typeof o},goog.isBoolean=function(o){return"boolean"==typeof o},goog.isNumber=function(o){return"number"==typeof o},goog.isFunction=function(o){return"function"==goog.typeOf(o)},goog.isObject=function(o){var e="undefined"==typeof o?"undefined":_typeof(o);return"object"==e&&null!=o||"function"==e},goog.getUid=function(o){return o[goog.UID_PROPERTY_]||(o[goog.UID_PROPERTY_]=++goog.uidCounter_)},goog.hasUid=function(o){return!!o[goog.UID_PROPERTY_]},goog.removeUid=function(o){null!==o&&"removeAttribute"in o&&o.removeAttribute(goog.UID_PROPERTY_);/** @preserveTry */
try{delete o[goog.UID_PROPERTY_]}catch(e){}},goog.UID_PROPERTY_="closure_uid_"+(1e9*Math.random()>>>0),goog.uidCounter_=0,goog.getHashCode=goog.getUid,goog.removeHashCode=goog.removeUid,goog.cloneObject=function(o){var e=goog.typeOf(o);if("object"==e||"array"==e){if(o.clone)return o.clone();var t="array"==e?[]:{};for(var g in o)t[g]=goog.cloneObject(o[g]);return t}return o},goog.bindNative_=function(o,e,t){return o.call.apply(o.bind,arguments)},goog.bindJs_=function(o,e,t){if(!o)throw new Error;if(arguments.length>2){var g=Array.prototype.slice.call(arguments,2);return function(){var t=Array.prototype.slice.call(arguments);return (Array.prototype.unshift.apply(t,g), o.apply(e,t))}}return function(){return o.apply(e,arguments)}},goog.bind=function(o,e,t){return (Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?goog.bind=goog.bindNative_:goog.bind=goog.bindJs_, goog.bind.apply(null,arguments))},goog.partial=function(o,e){var t=Array.prototype.slice.call(arguments,1);return function(){var e=t.slice();return (e.push.apply(e,arguments), o.apply(this,e))}},goog.mixin=function(o,e){for(var t in e)o[t]=e[t]},goog.now=goog.TRUSTED_SITE&&Date.now||function(){return+new Date},goog.globalEval=function(o){if(goog.global.execScript)goog.global.execScript(o,"JavaScript");else{if(!goog.global.eval)throw Error("goog.globalEval not available");if(null==goog.evalWorksForGlobals_)if(goog.global.eval("var _evalTest_ = 1;"),"undefined"!=typeof goog.global._evalTest_){try{delete goog.global._evalTest_}catch(e){}goog.evalWorksForGlobals_=!0}else goog.evalWorksForGlobals_=!1;if(goog.evalWorksForGlobals_)goog.global.eval(o);else{var t=goog.global.document,g=t.createElement("SCRIPT");g.type="text/javascript",g.defer=!1,g.appendChild(t.createTextNode(o)),t.body.appendChild(g),t.body.removeChild(g)}}},goog.evalWorksForGlobals_=null,goog.cssNameMapping_,goog.cssNameMappingStyle_,goog.getCssName=function(o,e){var t,g=function(o){return goog.cssNameMapping_[o]||o},i=function(o){for(var e=o.split("-"),t=[],i=0;i<e.length;i++)t.push(g(e[i]));return t.join("-")};return (t=goog.cssNameMapping_?"BY_WHOLE"==goog.cssNameMappingStyle_?g:i:function(o){return o}, e?o+"-"+t(e):t(o))},goog.setCssNameMapping=function(o,e){goog.cssNameMapping_=o,goog.cssNameMappingStyle_=e},goog.global.CLOSURE_CSS_NAME_MAPPING,!COMPILED&&goog.global.CLOSURE_CSS_NAME_MAPPING&&(goog.cssNameMapping_=goog.global.CLOSURE_CSS_NAME_MAPPING),goog.getMsg=function(o,e){return (e&&(o=o.replace(/\{\$([^}]+)}/g,function(o,t){return null!=e&&t in e?e[t]:o})), o)},goog.getMsgWithFallback=function(o,e){return o},goog.exportSymbol=function(o,e,t){goog.exportPath_(o,e,t)},goog.exportProperty=function(o,e,t){o[e]=t},goog.inherits=function(o,e){function t(){}t.prototype=e.prototype,o.superClass_=e.prototype,o.prototype=new t,o.prototype.constructor=o,o.base=function(o,t,g){for(var i=new Array(arguments.length-2),r=2;r<arguments.length;r++)i[r-2]=arguments[r];return e.prototype[t].apply(o,i)}},goog.base=function(o,e,t){var g=arguments.callee.caller;if(goog.STRICT_MODE_COMPATIBLE||goog.DEBUG&&!g)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if(g.superClass_){for(var i=new Array(arguments.length-1),r=1;r<arguments.length;r++)i[r-1]=arguments[r];return g.superClass_.constructor.apply(o,i)}for(var n=new Array(arguments.length-2),r=2;r<arguments.length;r++)n[r-2]=arguments[r];for(var a=!1,s=o.constructor;s;s=s.superClass_&&s.superClass_.constructor)if(s.prototype[e]===g)a=!0;else if(a)return s.prototype[e].apply(o,n);if(o[e]===g)return o.constructor.prototype[e].apply(o,n);throw Error("goog.base called from a method of one name to a method of a different name")},goog.scope=function(o){o.call(goog.global)},COMPILED||(goog.global.COMPILED=COMPILED),goog.string={},goog.string.subs=function(o,e){for(var t=o.split("%s"),g="",i=Array.prototype.slice.call(arguments,1);i.length&&t.length>1;)g+=t.shift()+i.shift();return g+t.join("%s")},goog.string.AMP_RE_=/&/g,goog.string.LT_RE_=/</g,goog.string.GT_RE_=/>/g,goog.string.QUOT_RE_=/"/g,goog.string.SINGLE_QUOTE_RE_=/'/g,goog.string.NULL_RE_=/\x00/g,goog.string.E_RE_=/e/g,goog.string.ALL_RE_=goog.string.DETECT_DOUBLE_ESCAPING?/[\x00&<>"'e]/:/[\x00&<>"']/,goog.string.htmlEscape=function(o,e){return e?(o=o.replace(goog.string.AMP_RE_,"&amp;").replace(goog.string.LT_RE_,"&lt;").replace(goog.string.GT_RE_,"&gt;").replace(goog.string.QUOT_RE_,"&quot;").replace(goog.string.SINGLE_QUOTE_RE_,"&#39;").replace(goog.string.NULL_RE_,"&#0;"),goog.string.DETECT_DOUBLE_ESCAPING&&(o=o.replace(goog.string.E_RE_,"&#101;")),o):goog.string.ALL_RE_.test(o)?(-1!=o.indexOf("&")&&(o=o.replace(goog.string.AMP_RE_,"&amp;")),-1!=o.indexOf("<")&&(o=o.replace(goog.string.LT_RE_,"&lt;")),-1!=o.indexOf(">")&&(o=o.replace(goog.string.GT_RE_,"&gt;")),-1!=o.indexOf('"')&&(o=o.replace(goog.string.QUOT_RE_,"&quot;")),-1!=o.indexOf("'")&&(o=o.replace(goog.string.SINGLE_QUOTE_RE_,"&#39;")),-1!=o.indexOf("\x00")&&(o=o.replace(goog.string.NULL_RE_,"&#0;")),goog.string.DETECT_DOUBLE_ESCAPING&&-1!=o.indexOf("e")&&(o=o.replace(goog.string.E_RE_,"&#101;")),o):o},goog.debug={},goog.debug.runtimeType=function(o){return o instanceof Function?o.displayName||o.name||"unknown type name":o instanceof Object?o.constructor.displayName||o.constructor.name||Object.prototype.toString.call(o):null===o?"null":"undefined"==typeof o?"undefined":_typeof(o)},goog.debug.Error=function(o){if(Error.captureStackTrace)Error.captureStackTrace(this,goog.debug.Error);else{var e=(new Error).stack;e&&(this.stack=e)}o&&(this.message=String(o)),this.reportErrorToServer=!0},goog.inherits(goog.debug.Error,Error),goog.debug.Error.prototype.name="CustomError",goog.dom={},goog.dom.NodeType={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12},goog.provide("goog.i18n.bidi"),goog.provide("goog.i18n.bidi.Dir"),goog.provide("goog.i18n.bidi.DirectionalString"),goog.provide("goog.i18n.bidi.Format"),goog.define("goog.i18n.bidi.FORCE_RTL",!1),goog.i18n.bidi.IS_RTL=goog.i18n.bidi.FORCE_RTL||("ar"==goog.LOCALE.substring(0,2).toLowerCase()||"fa"==goog.LOCALE.substring(0,2).toLowerCase()||"he"==goog.LOCALE.substring(0,2).toLowerCase()||"iw"==goog.LOCALE.substring(0,2).toLowerCase()||"ps"==goog.LOCALE.substring(0,2).toLowerCase()||"sd"==goog.LOCALE.substring(0,2).toLowerCase()||"ug"==goog.LOCALE.substring(0,2).toLowerCase()||"ur"==goog.LOCALE.substring(0,2).toLowerCase()||"yi"==goog.LOCALE.substring(0,2).toLowerCase())&&(2==goog.LOCALE.length||"-"==goog.LOCALE.substring(2,3)||"_"==goog.LOCALE.substring(2,3))||goog.LOCALE.length>=3&&"ckb"==goog.LOCALE.substring(0,3).toLowerCase()&&(3==goog.LOCALE.length||"-"==goog.LOCALE.substring(3,4)||"_"==goog.LOCALE.substring(3,4)),goog.i18n.bidi.Format={LRE:"‪",RLE:"‫",PDF:"‬",LRM:"‎",RLM:"‏"},goog.i18n.bidi.Dir={LTR:1,RTL:-1,NEUTRAL:0},goog.i18n.bidi.RIGHT="right",goog.i18n.bidi.LEFT="left",goog.i18n.bidi.I18N_RIGHT=goog.i18n.bidi.IS_RTL?goog.i18n.bidi.LEFT:goog.i18n.bidi.RIGHT,goog.i18n.bidi.I18N_LEFT=goog.i18n.bidi.IS_RTL?goog.i18n.bidi.RIGHT:goog.i18n.bidi.LEFT,goog.i18n.bidi.toDir=function(o,e){return"number"==typeof o?o>0?goog.i18n.bidi.Dir.LTR:0>o?goog.i18n.bidi.Dir.RTL:e?null:goog.i18n.bidi.Dir.NEUTRAL:null==o?null:o?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR},goog.i18n.bidi.ltrChars_="A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿",goog.i18n.bidi.rtlChars_="֑-ۯۺ-߿‏יִ-﷿ﹰ-ﻼ",goog.i18n.bidi.htmlSkipReg_=/<[^>]*>|&[^;]+;/g,goog.i18n.bidi.stripHtmlIfNeeded_=function(o,e){return e?o.replace(goog.i18n.bidi.htmlSkipReg_,""):o},goog.i18n.bidi.rtlCharReg_=new RegExp("["+goog.i18n.bidi.rtlChars_+"]"),goog.i18n.bidi.ltrCharReg_=new RegExp("["+goog.i18n.bidi.ltrChars_+"]"),goog.i18n.bidi.hasAnyRtl=function(o,e){return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(o,e))},goog.i18n.bidi.hasRtlChar=goog.i18n.bidi.hasAnyRtl,goog.i18n.bidi.hasAnyLtr=function(o,e){return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(o,e))},goog.i18n.bidi.ltrRe_=new RegExp("^["+goog.i18n.bidi.ltrChars_+"]"),goog.i18n.bidi.rtlRe_=new RegExp("^["+goog.i18n.bidi.rtlChars_+"]"),goog.i18n.bidi.isRtlChar=function(o){return goog.i18n.bidi.rtlRe_.test(o)},goog.i18n.bidi.isLtrChar=function(o){return goog.i18n.bidi.ltrRe_.test(o)},goog.i18n.bidi.isNeutralChar=function(o){return!goog.i18n.bidi.isLtrChar(o)&&!goog.i18n.bidi.isRtlChar(o)},goog.i18n.bidi.ltrDirCheckRe_=new RegExp("^[^"+goog.i18n.bidi.rtlChars_+"]*["+goog.i18n.bidi.ltrChars_+"]"),goog.i18n.bidi.rtlDirCheckRe_=new RegExp("^[^"+goog.i18n.bidi.ltrChars_+"]*["+goog.i18n.bidi.rtlChars_+"]"),goog.i18n.bidi.startsWithRtl=function(o,e){return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(o,e))},goog.i18n.bidi.isRtlText=goog.i18n.bidi.startsWithRtl,goog.i18n.bidi.startsWithLtr=function(o,e){return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(o,e))},goog.i18n.bidi.isLtrText=goog.i18n.bidi.startsWithLtr,goog.i18n.bidi.isRequiredLtrRe_=/^http:\/\/.*/,goog.i18n.bidi.isNeutralText=function(o,e){return (o=goog.i18n.bidi.stripHtmlIfNeeded_(o,e), goog.i18n.bidi.isRequiredLtrRe_.test(o)||!goog.i18n.bidi.hasAnyLtr(o)&&!goog.i18n.bidi.hasAnyRtl(o))},goog.i18n.bidi.ltrExitDirCheckRe_=new RegExp("["+goog.i18n.bidi.ltrChars_+"][^"+goog.i18n.bidi.rtlChars_+"]*$"),goog.i18n.bidi.rtlExitDirCheckRe_=new RegExp("["+goog.i18n.bidi.rtlChars_+"][^"+goog.i18n.bidi.ltrChars_+"]*$"),goog.i18n.bidi.endsWithLtr=function(o,e){return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(o,e))},goog.i18n.bidi.isLtrExitText=goog.i18n.bidi.endsWithLtr,goog.i18n.bidi.endsWithRtl=function(o,e){return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(o,e))},goog.i18n.bidi.isRtlExitText=goog.i18n.bidi.endsWithRtl,goog.i18n.bidi.rtlLocalesRe_=new RegExp("^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)","i"),goog.i18n.bidi.isRtlLanguage=function(o){return goog.i18n.bidi.rtlLocalesRe_.test(o)},goog.i18n.bidi.bracketGuardTextRe_=/(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g,goog.i18n.bidi.guardBracketInText=function(o,e){var t=void 0===e?goog.i18n.bidi.hasAnyRtl(o):e,g=t?goog.i18n.bidi.Format.RLM:goog.i18n.bidi.Format.LRM;return o.replace(goog.i18n.bidi.bracketGuardTextRe_,g+"$&"+g)},goog.i18n.bidi.enforceRtlInHtml=function(o){return"<"==o.charAt(0)?o.replace(/<\w+/,"$& dir=rtl"):"\n<span dir=rtl>"+o+"</span>"},goog.i18n.bidi.enforceRtlInText=function(o){return goog.i18n.bidi.Format.RLE+o+goog.i18n.bidi.Format.PDF},goog.i18n.bidi.enforceLtrInHtml=function(o){return"<"==o.charAt(0)?o.replace(/<\w+/,"$& dir=ltr"):"\n<span dir=ltr>"+o+"</span>"},goog.i18n.bidi.enforceLtrInText=function(o){return goog.i18n.bidi.Format.LRE+o+goog.i18n.bidi.Format.PDF},goog.i18n.bidi.dimensionsRe_=/:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g,goog.i18n.bidi.leftRe_=/left/gi,goog.i18n.bidi.rightRe_=/right/gi,goog.i18n.bidi.tempRe_=/%%%%/g,goog.i18n.bidi.mirrorCSS=function(o){return o.replace(goog.i18n.bidi.dimensionsRe_,":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_,"%%%%").replace(goog.i18n.bidi.rightRe_,goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_,goog.i18n.bidi.RIGHT)},goog.i18n.bidi.doubleQuoteSubstituteRe_=/([\u0591-\u05f2])"/g,goog.i18n.bidi.singleQuoteSubstituteRe_=/([\u0591-\u05f2])'/g,goog.i18n.bidi.normalizeHebrewQuote=function(o){return o.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_,"$1״").replace(goog.i18n.bidi.singleQuoteSubstituteRe_,"$1׳")},goog.i18n.bidi.wordSeparatorRe_=/\s+/,goog.i18n.bidi.hasNumeralsRe_=/[\d\u06f0-\u06f9]/,goog.i18n.bidi.rtlDetectionThreshold_=.4,goog.i18n.bidi.estimateDirection=function(o,e){for(var t=0,g=0,i=!1,r=goog.i18n.bidi.stripHtmlIfNeeded_(o,e).split(goog.i18n.bidi.wordSeparatorRe_),n=0;n<r.length;n++){var a=r[n];goog.i18n.bidi.startsWithRtl(a)?(t++,g++):goog.i18n.bidi.isRequiredLtrRe_.test(a)?i=!0:goog.i18n.bidi.hasAnyLtr(a)?g++:goog.i18n.bidi.hasNumeralsRe_.test(a)&&(i=!0)}return 0==g?i?goog.i18n.bidi.Dir.LTR:goog.i18n.bidi.Dir.NEUTRAL:t/g>goog.i18n.bidi.rtlDetectionThreshold_?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR},goog.i18n.bidi.detectRtlDirectionality=function(o,e){return goog.i18n.bidi.estimateDirection(o,e)==goog.i18n.bidi.Dir.RTL},goog.i18n.bidi.setElementDirAndAlign=function(o,e){o&&(e=goog.i18n.bidi.toDir(e),e&&(o.style.textAlign=e==goog.i18n.bidi.Dir.RTL?goog.i18n.bidi.RIGHT:goog.i18n.bidi.LEFT,o.dir=e==goog.i18n.bidi.Dir.RTL?"rtl":"ltr"))},goog.i18n.bidi.setElementDirByTextDirectionality=function(o,e){switch(goog.i18n.bidi.estimateDirection(e)){case goog.i18n.bidi.Dir.LTR:o.dir="ltr";break;case goog.i18n.bidi.Dir.RTL:o.dir="rtl";break;default:o.removeAttribute("dir")}},goog.i18n.bidi.DirectionalString=function(){},goog.i18n.bidi.DirectionalString.prototype.implementsGoogI18nBidiDirectionalString,goog.i18n.bidi.DirectionalString.prototype.getDirection,goog.provide("goog.asserts"),goog.define("goog.asserts.ENABLE_ASSERTS",goog.DEBUG),goog.asserts.AssertionError=function(o,e){e.unshift(o),goog.debug.Error.call(this,goog.string.subs.apply(null,e)),e.shift(),this.messagePattern=o},goog.inherits(goog.asserts.AssertionError,goog.debug.Error),goog.asserts.AssertionError.prototype.name="AssertionError",goog.asserts.DEFAULT_ERROR_HANDLER=function(o){throw o},goog.asserts.errorHandler_=goog.asserts.DEFAULT_ERROR_HANDLER,goog.asserts.doAssertFailure_=function(o,e,t,g){var i="Assertion failed";if(t){i+=": "+t;var r=g}else o&&(i+=": "+o,r=e);var n=new goog.asserts.AssertionError(""+i,r||[]);goog.asserts.errorHandler_(n)},goog.asserts.setErrorHandler=function(o){goog.asserts.ENABLE_ASSERTS&&(goog.asserts.errorHandler_=o)},goog.asserts.assert=function(o,e,t){return (goog.asserts.ENABLE_ASSERTS&&!o&&goog.asserts.doAssertFailure_("",null,e,Array.prototype.slice.call(arguments,2)), o)},goog.asserts.fail=function(o,e){goog.asserts.ENABLE_ASSERTS&&goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure"+(o?": "+o:""),Array.prototype.slice.call(arguments,1)))},goog.asserts.assertNumber=function(o,e,t){return (goog.asserts.ENABLE_ASSERTS&&!goog.isNumber(o)&&goog.asserts.doAssertFailure_("Expected number but got %s: %s.",[goog.typeOf(o),o],e,Array.prototype.slice.call(arguments,2)), o)},goog.asserts.assertString=function(o,e,t){return (goog.asserts.ENABLE_ASSERTS&&!goog.isString(o)&&goog.asserts.doAssertFailure_("Expected string but got %s: %s.",[goog.typeOf(o),o],e,Array.prototype.slice.call(arguments,2)), o)},goog.asserts.assertFunction=function(o,e,t){return (goog.asserts.ENABLE_ASSERTS&&!goog.isFunction(o)&&goog.asserts.doAssertFailure_("Expected function but got %s: %s.",[goog.typeOf(o),o],e,Array.prototype.slice.call(arguments,2)), o)},goog.asserts.assertObject=function(o,e,t){return (goog.asserts.ENABLE_ASSERTS&&!goog.isObject(o)&&goog.asserts.doAssertFailure_("Expected object but got %s: %s.",[goog.typeOf(o),o],e,Array.prototype.slice.call(arguments,2)), o)},goog.asserts.assertArray=function(o,e,t){return (goog.asserts.ENABLE_ASSERTS&&!goog.isArray(o)&&goog.asserts.doAssertFailure_("Expected array but got %s: %s.",[goog.typeOf(o),o],e,Array.prototype.slice.call(arguments,2)), o)},goog.asserts.assertBoolean=function(o,e,t){return (goog.asserts.ENABLE_ASSERTS&&!goog.isBoolean(o)&&goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.",[goog.typeOf(o),o],e,Array.prototype.slice.call(arguments,2)), o)},goog.asserts.assertElement=function(o,e,t){return(!goog.asserts.ENABLE_ASSERTS||goog.isObject(o)&&o.nodeType==goog.dom.NodeType.ELEMENT||goog.asserts.doAssertFailure_("Expected Element but got %s: %s.",[goog.typeOf(o),o],e,Array.prototype.slice.call(arguments,2)), o)},goog.asserts.assertInstanceof=function(o,e,t,g){return(!goog.asserts.ENABLE_ASSERTS||o instanceof e||goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.",[goog.asserts.getType_(e),goog.asserts.getType_(o)],t,Array.prototype.slice.call(arguments,3)), o)},goog.asserts.assertObjectPrototypeIsIntact=function(){for(var o in Object.prototype)goog.asserts.fail(o+" should not be enumerable in Object.prototype.")},goog.asserts.getType_=function(o){return o instanceof Function?o.displayName||o.name||"unknown type name":o instanceof Object?o.constructor.displayName||o.constructor.name||Object.prototype.toString.call(o):null===o?"null":"undefined"==typeof o?"undefined":_typeof(o)},goog.string.StringBuffer=function(o,e){null!=o&&this.append.apply(this,arguments)},goog.string.StringBuffer.prototype.buffer_="",goog.string.StringBuffer.prototype.set=function(o){this.buffer_=""+o},goog.string.StringBuffer.prototype.append=function(o,e,t){if(this.buffer_+=String(o),null!=e)for(var g=1;g<arguments.length;g++)this.buffer_+=arguments[g];return this},goog.string.StringBuffer.prototype.clear=function(){this.buffer_=""},goog.string.StringBuffer.prototype.getLength=function(){return this.buffer_.length},goog.string.StringBuffer.prototype.toString=function(){return this.buffer_},goog.soy={},goog.soy.data={},goog.soy.data.SanitizedContentKind={HTML:goog.DEBUG?{sanitizedContentKindHtml:!0}:{},JS:goog.DEBUG?{sanitizedContentJsChars:!0}:{},URI:goog.DEBUG?{sanitizedContentUri:!0}:{},TRUSTED_RESOURCE_URI:goog.DEBUG?{sanitizedContentTrustedResourceUri:!0}:{},ATTRIBUTES:goog.DEBUG?{sanitizedContentHtmlAttribute:!0}:{},CSS:goog.DEBUG?{sanitizedContentCss:!0}:{},TEXT:goog.DEBUG?{sanitizedContentKindText:!0}:{}},goog.soy.data.SanitizedContent=function(){throw Error("Do not instantiate directly")},goog.soy.data.SanitizedContent.prototype.contentKind,goog.soy.data.SanitizedContent.prototype.contentDir=null,goog.soy.data.SanitizedContent.prototype.content,goog.soy.data.SanitizedContent.prototype.getContent=function(){return this.content},goog.soy.data.SanitizedContent.prototype.toString=function(){return this.content},goog.soy.data.UnsanitizedText=function(){goog.soy.data.UnsanitizedText.base(this,"constructor")},goog.inherits(goog.soy.data.UnsanitizedText,goog.soy.data.SanitizedContent),function(){var o={};o.asserts={},o.esc={};var e={};o.StringBuilder=goog.string.StringBuffer,e.SanitizedContentKind=goog.soy.data.SanitizedContentKind,e.isContentKind=function(o,e){return null!=o&&o.contentKind===e},e.SanitizedUri=function(){goog.soy.data.SanitizedContent.call(this)},goog.inherits(e.SanitizedUri,goog.soy.data.SanitizedContent),e.SanitizedUri.prototype.contentKind=e.SanitizedContentKind.URI,e.SanitizedUri.prototype.contentDir=goog.i18n.bidi.Dir.LTR,e.UnsanitizedText=function(o,e){this.content=String(o),this.contentDir=null!=e?e:null},goog.inherits(e.UnsanitizedText,goog.soy.data.UnsanitizedText),e.UnsanitizedText.prototype.contentKind=e.SanitizedContentKind.TEXT,e.$$EMPTY_STRING_={VALUE:""},e.$$makeSanitizedContentFactory_=function(o){function e(o){this.content=o}function t(o,t){var g=new e(String(o));return (void 0!==t&&(g.contentDir=t), g)}return (e.prototype=o.prototype, t)},e.$$makeSanitizedContentFactoryWithDefaultDirOnly_=function(o){function e(o){this.content=o}function t(o){var t=new e(String(o));return t}return (e.prototype=o.prototype, t)},e.markUnsanitizedText=function(o,t){return new e.UnsanitizedText(o,t)},e.VERY_UNSAFE={},e.VERY_UNSAFE.ordainSanitizedUri=e.$$makeSanitizedContentFactoryWithDefaultDirOnly_(e.SanitizedUri),o.$$augmentMap=function(o,e){function t(){}t.prototype=o;var g=new t;for(var i in e)g[i]=e[i];return g},o.$$checkMapKey=function(o){if("string"!=typeof o)throw Error("Map literal's key expression must evaluate to string (encountered type \""+("undefined"==typeof o?"undefined":_typeof(o))+'").');return o},o.$$getMapKeys=function(o){var e=[];for(var t in o)e.push(t);return e},o.$$checkNotNull=function(o){if(null==o)throw Error("unexpected null value");return o},o.$$getDelTemplateId=function(o){return o},o.$$DELEGATE_REGISTRY_PRIORITIES_={},o.$$DELEGATE_REGISTRY_FUNCTIONS_={},o.$$registerDelegateFn=function(e,t,g,i){var r="key_"+e+":"+t,n=o.$$DELEGATE_REGISTRY_PRIORITIES_[r];if(void 0===n||g>n)o.$$DELEGATE_REGISTRY_PRIORITIES_[r]=g,o.$$DELEGATE_REGISTRY_FUNCTIONS_[r]=i;else if(g==n)throw Error('Encountered two active delegates with the same priority ("'+e+":"+t+'").')},o.$$getDelegateFn=function(e,t,g){var i=o.$$DELEGATE_REGISTRY_FUNCTIONS_["key_"+e+":"+t];if(i||""==t||(i=o.$$DELEGATE_REGISTRY_FUNCTIONS_["key_"+e+":"]),i)return i;if(g)return o.$$EMPTY_TEMPLATE_FN_;throw Error('Found no active impl for delegate call to "'+e+":"+t+'" (and not allowemptydefault="true").')},o.$$EMPTY_TEMPLATE_FN_=function(o,e,t){return""},o.$$truncate=function(e,t,g){return (e=String(e), e.length<=t?e:(g&&(t>3?t-=3:g=!1),o.$$isHighSurrogate_(e.charAt(t-1))&&o.$$isLowSurrogate_(e.charAt(t))&&(t-=1),e=e.substring(0,t),g&&(e+="..."),e))},o.$$isHighSurrogate_=function(o){return o>=55296&&56319>=o},o.$$isLowSurrogate_=function(o){return o>=56320&&57343>=o},o.asserts.assertType=function(o,e,t,g,i){var r="expected param "+e+" of type "+g+(goog.DEBUG?", but got "+goog.debug.runtimeType(t):"")+".";return goog.asserts.assert(o,r,i)},o.esc.$$escapeHtmlHelper=function(o){return goog.string.htmlEscape(String(o))},o.$$filterImageDataUri=function(t){return e.VERY_UNSAFE.ordainSanitizedUri(o.esc.$$filterImageDataUriHelper(t))},o.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_=/^data:image\/(?:bmp|gif|jpe?g|png|tiff|webp);base64,[a-z0-9+\/]+=*$/i,o.esc.$$filterImageDataUriHelper=function(e){var t=String(e);return o.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_.test(t)?t:(goog.asserts.fail("Bad value `%s` for |filterImageDataUri",[t]),"data:image/gif;base64,zSoyz")},goog.loadModule(function(){return (goog.module("soy"), o)}),goog.loadModule(function(){return (goog.module("soydata"), e)}),goog.loadModule(function(){return (goog.module("soy.asserts"), o)})}(),goog.loadModule(function(){return (goog.module("incrementaldom"), IncrementalDOM)})}).call(window)});