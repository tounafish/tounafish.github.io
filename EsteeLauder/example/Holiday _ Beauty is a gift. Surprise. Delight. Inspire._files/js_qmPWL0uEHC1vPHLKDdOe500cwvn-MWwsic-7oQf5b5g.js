var $ = jQuery; var generic = generic || {}; var site = site || {}; var prodcat = prodcat || {};
;
var generic = generic || {};

/**
 * @description Wrap Function - Return a new function that triggers a parameter function first and
 * then moves on to the original, wrapped function.  The follow up of the original can be
 * precluded by returning false from the parameter of type function.
 *
 **/

$.extend(Function.prototype, {

    /**
     * @param {function} step-ahead function to the original function being wrapped
     * @return {function} new function to be assigned to original namespace
     */
    wrap: function(fn) {

        var _generic_ = fn; // generic-level
        var _site_ = this; // site-level

        //this.passObj = true;
        var passObj = true;

        return function() {

            passObj = _generic_.apply(fn, arguments);
            if(passObj) _site_.call(this, passObj); else return;

        }

    }
});


/**
 * @description Minimal Native Version of Prototype Hash Class
 *
 * @class Hash
 * @namespace generic.Hash
 *
 * @returns A public api object (get, set, etc).
 *
 */

generic.Hash = function(obj) {

        var H = (obj instanceof Object)?obj:{}, index = [], _queue = [];

        var queryString = function() {

            /** @inner **/
            var Q = function (o,v,isArr) {

                var i, S = Object.prototype.toString, A = "[object Array]", _queue = [];

                o = o || H;

                for(i in o) {
                    if(typeof o[i] === "object") {
                        _queue = (S.call(o[i])===A)?Q(o[i],i,true):Q(o[i],i);
                    } else { n=(isArr)?v:i; _queue.push(n+'='+o[i]); }
                }

                return _queue;

            }

            //return "?"+Q().join("&");
            return Q().join("&");
        }

        return {

            /**
             * @public get
             */
            get : function (x) { return H[x] || false; },
            /**
             * @public set
             */
            set : function (x,y) { H[x] = y; index.push(x); return this; },
            /**
             * @public toQueryString
             ** DEPRECATED **
             */
            toQueryString : queryString,
            /**
             * @public fromQueryString
             */
            queryToJson : function(q,p/*pure object, not hash*/) {

                var query = q;
                var k, v, i;
                var obj = {};

                var xArr = query.split('&');

                for(i = 0; i < xArr.length; i++) {

                    k = xArr[i].split('=')[0]; v = xArr[i].split('=')[1];
                    evalStr = "obj['"+k+"']='"+v+"'";
                    eval(evalStr);

                }

                return obj;
            },


            /**
             * @public slice
             *
             * @param {array}
             * @returns hash containing only the key/value pairs matched by the keys
             *          passed in the array
             *
             */
            slice: function( array ) {
                var h = $H();
                for ( var i in array ) {
                    h.set( array[i], H[array[i]] );
                }
                return h;
            },

            obj: function() {
                return H;
            }
        }
        ; // end api set

    };

generic.HashFactory = function(hash) {

	var H = new generic.Hash(hash);
	return H;

}

/**
 * @see generic.Hash
 */
$H = generic.HashFactory; // map convenience alias






/**
 * Minimal Native Version of Prototype Class
 *
 * @deprecated Jquery extend method has options for deep copy extensions
 *
 * @class Class
 * @namespace generic.Class
 *
 */

generic.Class = { // Uppercase 'Class', avoid IE errors

    fn : function(src,props) {

        var tgt,prxy,z,fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

            tgt = function(){ // New Constructor
            // Initialize Method is a Requirement of Class
                // With the inclusion of the _super method, initialize in the superclass should only be called on demand
                /*if(tgt.superclass&&tgt.superclass.hasOwnProperty("initialize")){
                    tgt.superclass.initialize.apply(this,arguments);
                }*/
                if(tgt.prototype.initialize){
                    tgt.prototype.initialize.apply(this,arguments);
                }
            };

            // Preserve Classical Inheritance using Proxy Middle
            src = src || Object;
            prxy = function(){}; /* Potentially define "Class" here */
            prxy.prototype = src.prototype;
            tgt.prototype = new prxy();
            tgt.superclass = src.prototype;
            tgt.prototype.constructor = tgt;

            // give new class 'own' copies of props and add _super method to call superclass' corresponding method
            for(z in props){
                if ( typeof props[z] == "function" && typeof tgt.superclass[z] == "function" && fnTest.test(props[z]) ) {
                    tgt.prototype[z] = ( function( z, fn ) {
                        return function() {
                            this._super = tgt.superclass[z];
                            var ret = fn.apply( this, arguments );
                            return ret;
                        };
                    })( z, props[z] )
                } else {
                    tgt.prototype[z] = props[z];
                }
                /*if(props.hasOwnProperty(z)){tgt.prototype[z]=props[z];}*/
            }

        return tgt;

    },
    create : function(){

        var len = arguments.length, args = Array.prototype.slice.call(arguments), fn = generic.Class.fn;

            if(len==2) {  tgt = generic.Class.fn(args[0],args[1]); }
            else if(len==1) {  tgt = generic.Class.fn(null,args[0]); }
            else { tgt = function(){}; /* return empty constructor */ }

        return tgt; // return constructor that stacks named Class w/ object-literal, works with instanceof

    }, // End Create Method
    mixin: function( baseClass, mixin ) {
        var newClass = baseClass;
        if ( mixin && mixin.length ) {
            for ( var i=0; i < mixin.length; i++ ) {
                newClass = generic.Class.mixin( newClass, mixin[i] );
            }
        } else {
            if ( mixin ) { newClass = generic.Class.create( newClass, mixin ); }
        }
        return newClass;
    }
};

/**
 * @memberOf generic
 *
 */

generic.isElement = function(o) {
    return o.nodeType && (o.nodeType == 1) ;
};

/**
 * @memberOf generic
 *
 */
generic.isString = function(s) {
    return typeof(s) == "string" ;
};

/**
 * @memberOf generic
 *
 */
generic.env = {
    isIE : !!(typeof(ActiveXObject) == 'function'),
    isIE6 : !!(!!(typeof(ActiveXObject) == 'function') && (/MSIE\s6\.0/.test(navigator.appVersion))),
    isIE11 : !!(/Trident.*rv[ :]*11\./.test(navigator.userAgent)),
    isIE8 : !!(!!(typeof(ActiveXObject) == 'function') && (/MSIE\s8\.0/.test(navigator.appVersion))),
    isIE9 : !!(!!(typeof(ActiveXObject) == 'function') && (/MSIE\s9\.0/.test(navigator.appVersion))),
    isFF : !!(typeof(navigator.product) != 'undefined' && navigator.product == 'Gecko' && !( (document.childNodes) && (!navigator.taintEnabled)) && /firefox/.test(navigator.userAgent.toLowerCase()) ),
    isFF2 : !!(typeof(navigator.product) != 'undefined' && navigator.product == 'Gecko' && !((document.childNodes) && (!navigator.taintEnabled)) && navigator.userAgent.toLowerCase().split(' firefox/').length > 1 && navigator.userAgent.toLowerCase().split(' firefox/')[1].split('.')[0] == '2'),
    isFF3 : !!(typeof(navigator.product) != 'undefined' && navigator.product == 'Gecko' && !((document.childNodes) && (!navigator.taintEnabled)) && navigator.userAgent.toLowerCase().split(' firefox/').length > 1 && navigator.userAgent.toLowerCase().split(' firefox/')[1].split('.')[0] == '3'),
    isMac    : !!(/macppc|macintel/.test(navigator.platform.toLowerCase())),
    isSafari : !!(/Safari/.test(navigator.userAgent)),
    isIOS4 : !!(navigator.userAgent.match(/OS 4(_\d)+ like Mac OS X/i)),

    domain : window.location.protocol + "//" + window.location.hostname,

    debug: true, //JSTest check subdomain

    parsedQuery : function () {

        var query = window.location.search.toString().split('?')[1] || "";
        var splitStr = query.split('&');
    	var key, value, keyNameVar, tempObj, tempStr;

    	var a = {}; a.n = {};

    	var main = function() {

    		var params = {};
    		var returnArr = [];
			var arr = [];

    		if(!query) return;

    		for(var i = 0; i < splitStr.length ; i++) {

    			// just take the key
    			key = splitStr[i].split('=')[0];
    			value = splitStr[i].split('=')[1];

                var c = splitStr[i].match(new RegExp(key));
                var cItem = a.n[c] = a.n[c] || { "v" : [], "key" : c };
                cItem.e = cItem.e ? cItem.e + 1 : 0;   
                cItem.v.push(value);
    		}

    		for(var namespace in a.n) {

    			// if duplicate keys
    			if(a.n[namespace].e>0) {

    				for(var n = 0; n <= a.n[namespace].e; n++) {
    					arr.push(a.n[namespace].v.pop());
    				} // end for-loop

    				a.n[namespace].v = arr;
    			}

    			tempObj = a.n[namespace].v;
    			if(tempObj.length>1) { eval('params["'+namespace+'"]=tempObj'); }
    			else { tempStr = tempObj[0]; eval('params["'+namespace+'"]=tempStr'); }
    		}

    		return params;
    	}

    	var parameters = main() || {};
    	return parameters;

    },
    query: function(key) {
        var result = generic.env.parsedQuery()[key] || null;
        return result;
    }
};
;
if (typeof console != 'object' &&
        typeof firebug !== 'object' ) {
    var console = {
        log: function() {},
        dir: function() {},
        info: function() {},
        assert: function() {}
    };
}
;
/*
    http://www.JSON.org/json2.js
    2011-02-23

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    "use strict";

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
;
var generic = generic || {};

/**
 * This singleton class provides an interface to the Perl Gem JSON-RPC methods via AJAX.
 * @memberOf generic
 *
 * @class JsonRpc
 * @namespace generic.jsonrpc
 * @returns public object that provides the main api method - "fetch"
 */

generic.jsonrpc = ( function() {

    /**
     * @description Object literal that gets returned to provide the public api
     * @requires generic.env (dependency)
     */
    var jsonRpcObj = {

        id: 0,
        //url: generic.env.domain + "/rpc/jsonrpc.tmpl",
        url: "/rpc/jsonrpc.tmpl",
        /**
         * @constant error codes describe scenarios for post onSuccess
         * errorHandling that points to onFailure
         */
        errorCodes: {
            101: "The data type of this method is not supported.",
            102: "The data type of the request parameters is not supported.",
            103: "Your request did not return any results.",
            104: "Response is not in the expected format."
        },

        /**
         * @function main public api
         *
         * @param {object} Object literal with list of callbacks, onBoth for single callback regardless of
         * ajax response, and onSuccess && onFailure together to switch depending on the condition
         * of the asynchronous response.
         *
         * @returns incremented id to mark unique fetch
         */
        fetch: function(/* Object*/args) {

            var self = this;
            this.id++;
            
            var bustBrowserCache = false;
            if (typeof args.bustBrowserCache === "boolean" && !!args.bustBrowserCache ) {
                bustBrowserCache = true;
            }

            /**
             * @default
             */
            var options = {method:'post'};
            if (args.sync){
                options.async = false;
            }


            if (args.onBoth) {
                options.onSuccess = args.onBoth;
                options.onFailure = args.onBoth;
            } else {
                options.onSuccess = args.onSuccess || function (response) {
                    //console.log('JSON-RPC success');
                    //console.log(JSON.parse(response.getValue()));
                };
                options.onFailure = args.onFailure || function (response) {
                    //console.log('JSON-RPC failure');
                    //console.log(JSON.parse(response.getMessages()));
                };
            }
            var requestRpcId = this.id; // A local copy of id for the onSuccess callback
            options.onSuccess = options.onSuccess.wrap( function(response) {
                if (!response||!response.responseText) { // empty response
                    errorHandler(self.createErrorResponse(103));
                        return false;
                    }

                    /**
                     * @event RPC:RESULT is fired during the wrapping callback
                     * that front-runs the site-level callbacks (which were parameters to fetch)
                     */
                    //generic.events.fire({event:'RPC:RESULT',msg:response});
                    $(document).trigger("RPC:RESULT", [response, args, requestRpcId]);

                    var responseArray = $.parseJSON(response.responseText);

                    if ($.isArray(responseArray)) {

                        var resultObj = responseArray[0];
                        if (resultObj) {

                            var jsonRpcResponse = generic.jsonRpcResponse(resultObj);
                            if (resultObj.error) { // server returns an error, pass to onFailure
                                errorHandler(jsonRpcResponse); return false;

                            } else if (resultObj.result) { // successful response in expected format
                                //console.log("generic.jsonrpc.onSuccess");

                                return jsonRpcResponse; /* Move on to the wrapped function */

                            }
                        } else { // top-level response array is empty
                            errorHandler(self.createErrorResponse(103)); return false;
                        }
                    } else { // response is not in expected format (array)
                        errorHandler(self.createErrorResponse(104)); return false;
                    }

            });

            options.onFailure = options.onFailure.wrap( function(jqXHR) {

                var resp = jqXHR;
                //server returned failure, i.e. onFailure was not triggered by this class
                if (typeof resp.responseText != "undefined") {
                    //console.log("generic.jsonRPC onFailure: server error");
                    try { //server returns an error in json
                        var responseArray = JSON.parse(resp.responseText);
                        var resultObj = responseArray[0];
                        resp = generic.jsonRpcResponse(resultObj);
                    } catch(e) { //server response is not json
                        //console.log("generic.jsonRPC onFailure: server error, result is not json");
                        resp = self.createErrorResponse(resp.status,resp.responseText);
                    }
                }
                return resp;
            });

            /**
             * @function errorHandler takes over when the generic level onSuccess concludes that
             * the rpc response fails to qualify
             *
             * @see onFailure callback
             */
            var errorHandler = options.onFailure;
            var method = args.method || 'rpc.form';
            var params = args.params || [];

            // make sure a method was passed
            if ( typeof method !== "string" || method.length <= 0 ) {
                errorHandler(self.createErrorResponse(101));
                return null;
            }

            //make sure that the params type is an obj
            if (typeof params === 'string') {
                params = JSON.parse(params);
            }
            if (typeof params !== 'object') {
                errorHandler(self.createErrorResponse(102));
                return null;
            }
            
            var postMethod = args.method || "rpc.form";
            var postArray = [{
                   "method": postMethod,
                   "id": self.id,
                   "params": params
               }];
             options.data = $.param({JSONRPC: JSON.stringify(postArray)});


            var url = this.url + '?dbgmethod=' + method;
            if (bustBrowserCache) {
                url += "&cachebuster=" + Date.parse( new Date() );
            }

            //url = 'jsonrpc-response-example.html'; // debug, force success example

            /* Mapping Functions */

            /**
             * @private map jquery's responses to a single, relevant param
             */
            var jqSuccess = function(data, textStatus, response) {
                return options.onSuccess.call(options,response);
            };
            var jqError = function(jqXHR, textStatus, errorThrown) {
                return options.onFailure.call(options,jqXHR);
            };

            /*
             * Jquery success property of options (object)
             *
             * success(data, textStatus, jqXHR)Function, Array
             *
             * A function to be called if the request succeeds. The function gets passed three arguments:
             * The data returned from the server, formatted according to the dataType parameter;
             * a string describing the status; and the jqXHR (in jQuery 1.4.x, XMLHttpRequest) object.
             * As of jQuery 1.5, the success setting can accept an array of functions.
             * Each function will be called in turn. This is an Ajax Event.
             *
             */
            options.success = jqSuccess;

            /*
             * Jquery error property of options (object)
             *
             * error(jqXHR, textStatus, errorThrown) Function
             *
             * A function to be called if the request fails.
             * The function receives three arguments: The jqXHR (in jQuery 1.4.x, XMLHttpRequest)
             * object, a string describing the type of error that occurred and an optional
             * exception object, if one occurred. Possible values for the second argument (besides null)
             * are "timeout", "error", "abort", and "parsererror". This is an Ajax Event.
             * As of jQuery 1.5, the error setting can accept an array of functions.
             * Each function will be called in turn.
             *
             * Note: This handler is not called for cross-domain script and JSONP requests.
             */


            options.type = "POST";
            options.error = jqError;

            // console.log("==================");
            // console.log("===options.data===");
            // console.log(options.data);

            $.ajax(url, options);
            return this.id;
        },
        /**
         * @public Exposed api method to generate a jsonRpcResponse object with
         * "error" as the primary key.
         *
         * @param {integer} The integer value maps to a set of class constants
         * that describes the type of error.
         *
         * @param {integer, string} Overloaded method takes precedence
         * over single param.  Error code and error message passed
         * explicitly.
         *
         * @returns {object} An "error" keyed jsonRpcResponse object
         */
        createErrorResponse: function(errorCode, errorMsg) {
            errorMsg = errorMsg || this.errorCodes[errorCode];
            var errorObj = new generic.jsonRpcResponse({
                "error" : {
                    "code": errorCode,
                    "data": {
                    "messages" : [{
                        "text" : errorMsg,
                        "display_locations" : [],
                        "severity" : "MESSAGE",
                        "tags" : [],
                        "key" : ""
                         }]
                    }
                },
                "id" : this.id
            });
            return errorObj;
        }

    };

    return jsonRpcObj;
})();


/**
 * A JsonRpcResponse object is of the expected type as parameters to the onSuccess,
 * onFailure, or onBoth callback functions.
 *
 * @memberOf generic
 *
 * @class JsonRpcResponse
 * @namespace generic.jsonRpcResponse
 * @param {object} resultObj - PerlGem RPC response formatted object
 *
 */
generic.jsonRpcResponse = function (resultObj) {
    var jsonRpcResponseObj = {};
    var rawResponse = resultObj; // raw response data is kept in a private variable

    /**
     * @inner Constructor
     * @constructs CartItem
     */
    var CartItem = function(itemData) {
        this.product = {
            sku: {}
        };
        var prodRegEx = /^prod\.(.+)$/;
        var skuRegEx = /sku\.(.+)$/;
        var prodObj = { sku: {} };
        for (var prop in itemData) {
            var newPropName = null;
            var prodResult = prop.match(prodRegEx);
            if (prodResult && prodResult[1]) {
                newPropName = prodResult[1];
                this.product[newPropName] = itemData[prop];
            }
            if (!newPropName) {
                var skuResult = prop.match(skuRegEx);
                if (skuResult && skuResult[1]) {
                    newPropName = skuResult[1];
                    this.product.sku[newPropName] = itemData[prop];
                }
            }
            if (!newPropName) {
                this[prop] = itemData[prop];
            }
        }
    }

    /**
     * @inner Constructor
     * @constructs CartResult
     */
    var CartResult = function(responseData) {
        var data = responseData;
		var cartItemCount = "";
        var cartItem = {
            product: {
                sku: {}
            }
        };
        var cartMethod;
        var allItems = [];

        if (data.ac_results &&
                $.isArray(data.ac_results) &&
                    data.ac_results[0]) {

            if (data.ac_results[0].result &&
                    data.ac_results[0].result.CARTITEM) {
                cartItem = new CartItem(data.ac_results[0].result.CARTITEM);
            }
            if (data.ac_results[0].action) {
                cartMethod = data.ac_results[0].action;
            }
        }

        if (data.trans_data &&
                data.trans_data.order &&
                    $.isArray(data.trans_data.order.items) ) {
            cartItemCount = data.trans_data.items_count;
            $.each(data.trans_data.order.items, function() {
                var tempItem = new CartItem(this);
                allItems.push(this);
            });

        }
        //------------------
        // PUBLIC METHODS
        //------------------
        /**
         * @public CartResult.getAllItems
         */
        this.getAllItems = function() {
            return allItems;
        }
        /**
         * @public CartResult.getItem
         */
        this.getItem = function() {
            return cartItem;
        };
        /**
         * @public CartResult.getMethod
         */
        this.getMethod = function() {
            return cartMethod;
        }
        /**
         * @public CartResult.getCount
         */
        this.getCount = function() {
            return cartItemCount;
        }
    };

    /* Debug Method + Prop *
    jsonRpcResponseObj.getTest = function() { alert('test')} ; // temporary
    jsonRpcResponseObj.testValue = 'test val'; // temporary
    */

    /**
     * @public JsonRpcReponse.getId
     */
    jsonRpcResponseObj.getId = function() {
        if (rawResponse) {
            return rawResponse.id;
        }
        return null;
    };
    /**
     * @public JsonRpcReponse.getError
     */
    jsonRpcResponseObj.getError = function() {
        if (rawResponse &&
            rawResponse.error) {
            return rawResponse.error;
        }
        return null;
    };
    /**
     * @public JsonRpcReponse.getData
     */
    jsonRpcResponseObj.getData = function() {
        if (rawResponse &&
            rawResponse.result &&
            rawResponse.result.data) {
            return rawResponse.result.data;
        }
        return null;
    };
    /**
     * @public JsonRpcReponse.getValue
     */
    jsonRpcResponseObj.getValue = function() {
        if (rawResponse &&
            rawResponse.result &&
            typeof rawResponse.result.value != "undefined") {
            return rawResponse.result.value;
        }
        return null;
    };
    /**
     * @public JsonRpcReponse.getMessages
     *
     * @description This method returns the contents of the response's error property.
     * It first checks the result property, then checks the error property.
     */
    jsonRpcResponseObj.getMessages = function() {
        if (rawResponse) {
            if (rawResponse.result &&
                rawResponse.result.data &&
                rawResponse.result.data.messages) {
                return rawResponse.result.data.messages;
            } else if (rawResponse.error &&
                       rawResponse.error.data &&
                       rawResponse.error.data.messages) {
                return rawResponse.error.data.messages;
            }
        }
        return null;
    };
    /**
     * @public JsonRpcReponse.getCartResults
     */
    jsonRpcResponseObj.getCartResults = function() {
        var data = this.getData();
        if (!data) {
            return null;
        }
        var returnObj = new CartResult(data);
        return returnObj;
    };

    return jsonRpcResponseObj;
};




/*
 * generic.onLoadRpcRequests a global array of RPC request objects
 * must be initialized pre-DOM-load and formatted like this:
 * [
 *     {
 *         "method":   "user.json",
 *         "params":   [{}],
 *         "onSuccess" : function () { },
 *         "onFailure" : function () { }
 *     }
 * ]
 *
 */
$( function() {
    // TODO Modify generic.jsonrpc to allow multiple methods
    // on one request, then use it for this Ajax call. 
    var requests = generic.onLoadRpcRequests || [];
    var queryVals = [];

    for (var i=0, len=requests.length; i<len; i++) {
        var postMethod = requests[i]["method"] || "rpc.form";
        queryVals[i] = {
            "method": postMethod,
            "params": requests[i].params,
            "id": i + 1
        };
    }
    
    if (queryVals.length < 1) {
        return null;
    }

    var successHandler = function(data, textStatus, response) {
        for (var i=0, len=requests.length; i<len; i++) {
            var fn = requests[i].onSuccess;
            if (typeof fn !== 'function') {
                continue;
            }
            fn( data[i] );
        }
    }

    var url = "/rpc/jsonrpc.tmpl";
    var options = {};
    
    // ELCTWO-571 requires that we pass brand, region, and locale ids to ensure proper responses 
    // on the pg side for drupal sites.  To accomplish this we pass 'addl_url_params' within the arguments.
    // This snippets searches for such entries and adds 'em to the request url.
    var url_params = "";
    $(queryVals).each( function () {
      if (this.params[0].url_params) {
        if (this.params[0].url_params.charAt(0) === '&') {
          url_params += this.params[0].url_params;
        } else {
          url_params += '&' + this.params[0].url_params;
        }
      }
    });
    if (url_params !== "") {
      url += '?' + url_params.substring(1);
    } 

    options.data = $.param({JSONRPC: JSON.stringify(queryVals)});

    options.type = "POST";
    options.success = function(data, textStatus, response) {
        // console.log("Ajax success :::::::::::::::::::::");
        // console.log(arguments);
    
        successHandler(data, textStatus, response);
    };
    options.error = function(jqXHR, textStatus, errorThrown) {
        // console.log("Ajax error :::::::::::::::::::::");
        // console.log(arguments);
    };

    $.ajax(url,options);


});
;
var generic = generic || {};

generic.cookie = function(/*String*/name, /*String?*/value, /*.__cookieProps*/props){
	var c = document.cookie;
	if (arguments.length == 1) {
		var matches = c.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
		if (matches) {
			matches = decodeURIComponent(matches[1]);
			try {
			     return jQuery.parseJSON(matches); //Object
			} catch(e) {
			     return matches; //String
			}

		} else {
			return undefined;
		}
	} else {
		props = props || {};
// FIXME: expires=0 seems to disappear right away, not on close? (FF3)  Change docs?
		var exp = props.expires;
		if (typeof exp == "number"){
			var d = new Date();
			d.setTime(d.getTime() + exp*24*60*60*1000);
			exp = props.expires = d;
		}
		if(exp && exp.toUTCString){ props.expires = exp.toUTCString(); }

		value = encodeURIComponent(value);
		var updatedCookie = name + "=" + value;

		for(propName in props){
			updatedCookie += "; " + propName;
			var propValue = props[propName];
			if(propValue !== true){ updatedCookie += "=" + propValue; }
		}
		//console.log(updatedCookie);
		document.cookie = updatedCookie;
	}
};;
var generic = generic || {};

generic.forms = {
    select : {
        addOption:  function(args) {
            if (!args) return;
            var val = args.value;
            var label = args.label || val;
            var opt = '<option value="' + val + '">' + label + '</option>';

            args.menuNode.append(opt);
        },
        setValue: function(args) {
            var idx = 0;
            for (var i=0, len=args.menuNode[0].options.length; i<len; i++) {
                if (args.value == args.menuNode[0].options[i].value) {
                    idx = i;
                    break;
                }
            }
            args.menuNode[0].selectedIndex = idx;
        }
    }
};

;
var generic = generic || {};
generic.rb = generic.rb || {};

var rb = rb || {};

/**
* This method provides access to resource bundle values that have been
* written to the HTML in JSON format. The file that outputs these values
* must be included in the .html as a script tag with the desired RB name
* as a query string paramter.
*
* @class ResourceBundle
* @namespace generic.rb
*
* @memberOf generic
* @methodOf generic
* @requires generic.Hash (minimal functional replication of Prototype Hash Class)
*
* @example Inline data
*
*    <script src="/js/shared/v2/internal/resource.tmpl?rb=account"></script>
*
* @example Script retrival of data values
*
*    var myBundle = generic.rb("account");
*    myBundle.get("err_please_sign_in");
*
*
* @param {String} rbGroupName name of resource bundle needed
*
* @returns An object that provides the main get method
*
*/
generic.rb = function(rbGroupName) {

    var findResourceBundle = function(groupName) {

        if (groupName && rb) {

            var rbName = groupName;
            var rbHash = generic.Hash(rb[rbName]);
            if (rbHash) {
                return rbHash;
            } else {
                return $H({});
            }
        } else {
            return $H({});
        }

    };

    var resourceBundle = findResourceBundle(rbGroupName);

    var returnObj = {
        /**
        * @public This method will return the value for the requested Resource Bundle key.
        * If the key is not found, the key name will be returned.
        *
        * @param {String} keyName key of desired Resource Bundle value
        */
        get: function(keyName) {
            if ( !generic.isString(keyName) ) {
                return null;
            }
            var val = resourceBundle.get(keyName);
            if (val) {
                return val;
            } else {
                return keyName;
            }
        }
    };

    return returnObj;

};;
var generic = generic || {};

/**
 * Template.js
 *
 * @memberOf generic
 *
 * @class TemplateSingleton
 * @namespace generic.template
 *
 * @requires object literal with parameters
 *
 * @param path attribute as a literal key is required
 * @example "/templates/cart-overlay.tmpl",
 *
 * @param {string} templateString takes first priority
 * @example templateString:'#{product.url} some-page-markup-with-#{product.url}'
 *
 * @param {boolean} forceReload
 *
 * @param {function} callback
 * @example
 *
 * callback:function(html) {
 *    // Front-End Resolution
 *    $('#container').html(html);
 * }
 *
 * @param {object} query object hash with object-literals, array-literals that can be nested
 * @example example structure
 * query: {
 *    a:'',b:{},c:[],d:{[]} // keys rooted to named parent if object or array-objects are nested
 * }
 *
 * @param {object} Hash of string-literals with string values that map to the template
 * @example
 *
 * object: {
 *    'product.PROD_RGN_NAME':'replacement',
 *    SOME_VAR:'replacement'
 * }
 *
 * @example Usage
 *
 * generic.template.get({
 *    path:"/some/path/to/template.tmpl",
 *    ...
 * });
 *
 * @param {HTML} (optional) Markup based inline template
 * @required The path attribute must match the path key passed to the get method.
 *
 * @example Inline Template Example
 *
 * <!-- -------------------------- Inline Template ------------------------------ -->
 *
 * <script type="text/html" class="inline-template" path="templates/foo.tmpl">"
 *         <div>#{FIRST_NAME}</div>
 *         <div>#{SECOND_NAME}</div>
 * </script>
 *
 * Inline Templates : Valid inline template via script tag in this format, aside
 * from the templateString parameter, will be the first candidate for the template,
 * then the cache, then ajax.
 *
 *
 * @returns {object} An object that refers to a singleton which provides
 * the primary get api method.
 *
 */


generic.template  = ( function() {

    var that = {};
    var templateClassName = ".inline-template";
    var templates = {};

    /**
     * This method loads a pre-interpolation template into the object's internal cache. This cache is checked before attempting to pull the template from the DOM or load it via Ajax.
     * @param (String) key The name that is used to retrieve the template from the internal cache. Typically mathces the path for Ajax-loaded templates.
     * @param (String) html The non-interpoltaed content of the template.
     * @returns (Strin) the HTML that was originally passed in
     * @private
     */
    var setInternalTemplate = function(key, html) {
        templates[key] = html;
        return html;
    };

    var getInternalTemplate = function(key) {
        return templates[key];
    };

    var returnTemplate = function(args) {
        if (typeof args.object === "object") {
            var html = interpolate(args.template, args.object);
        }else{
			var html = args.template;
		}
        if (typeof args.callback === "function") {
            args.callback(html);
        }
    };

    var interpolate = function(template, obj) {
        var obj = obj || {};
        var tmpl = template, Lre = new RegExp("\#\{"), Rre = new RegExp("\}"), tmplA = [], temp, lft, rght;

        tmplA = tmpl.replace(/[\r\t\n]/g," ").split(Lre); // array of (.+?)} with '}' marking key vs rest of doc

        var returnString = "";
        for(var x = 0; x < tmplA.length; x++) {
            var chunk = tmplA[x];
            var splitChunk = chunk.split(Rre);

			// FIXME TODO: Embarrassingly ham handed approach to setting url_domain template variable for IE (bug i73662)
			//  Needs someone more familiar with javascript to find out why this error only occurs in IE
			//	 with the url_domain object value set anywhere but here (setting it elsewhere works fine in FF)
			if (splitChunk[0] == 'url_domain') {
				splitChunk[1] = 'http://' + document.location.hostname;
			}
            if (typeof splitChunk[1] !== "undefined") { // close tag is found
                // First check array notation for property names with spaces
                // Then check object notation for deep references
                var valueToInsert = eval("obj['" + splitChunk[0] +"']" ) || eval("obj." + splitChunk[0] );
                if (typeof valueToInsert === "undefined" || valueToInsert === null) {
                    valueToInsert = '';
                }
                chunk = valueToInsert.toString() + splitChunk[1];
            }
            returnString += chunk;
        }
        return returnString;
    };

    that.get = function( args ) {
        var key = args.path;
        var callback = args.callback;
        var forceReload = !!args.forceReload;
        var objectParam = args.object;
        var template = getInternalTemplate(key);

        if (template && !forceReload) {  // internal template found and OK to use cache
            returnTemplate({
                template: template,
                object: objectParam,
                callback: args.callback
            })
        } else {  // no internal template found or not OK to use cache
            // attempt to retrieve from DOM
            var matchingTemplateNode = null;
            $(templateClassName).each( function() {
                if ( $(this).html() && ( $(this).attr("path")==key) ) {
                    matchingTemplateNode = this;
                }
            });
            if (matchingTemplateNode) { // inline template found in DOM
                template = setInternalTemplate( key, $(matchingTemplateNode).html() );
                returnTemplate({
                    template: template,
                    object: args.object,
                    callback: args.callback
                })
            } else { // not found inline


                $.ajax({
                    url: key,
                    context: this, // bind (.bind onSuccess callback)
                    data: args.urlparams,
                    success: function(data, textStatus, jqXHR){
                        template = setInternalTemplate( key, jqXHR.responseText);
                        returnTemplate({
                            template: template,
                            object: args.object,
                            callback: args.callback
                        })
                    }
                });
            }
        }

    };

    return that;

})();
//
// generic.TemplateSingleton = (function(){
//
//     /**
//      * @private singleton reference
//      */
//     var singleton;
//
//     /**
//      * @inner Template constructor
//      * @constructs Template object
//      */
//     var Template = function ( template, pattern ) {
//         this.template = template?template:'';
//         this.readyState = template?1:0;
//         this.pattern = pattern?pattern:new RegExp("\#\{(.+?)\}");
//         this.queue = new Array();
//
//         /**
//          * @private
//          */
//         var A = {
//             evaluate : function(replacements){
//                 var tmpl = this.template, Lre = new RegExp("\#\{"), Rre = new RegExp("\}"), tmplA = [], temp, lft, rght;
//
//             // reference : ob.replace(/[\r\t\n]/g," ").split("<").join("Y").split(">").join("X");
//             tmplA = tmpl.replace(/[\r\t\n]/g," ").split(Lre); // array of (.+?)} with '}' marking key vs rest of doc
//
//             for(var x = 0; x < tmplA.length; x++) {
//
//                 // Array.split returns differently for IE, test for undefined
//                 lft = (replacements[tmplA[x].split(Rre)[0]]===undefined)?'':replacements[tmplA[x].split(Rre)[0]]
//                 rght = (tmplA[x].split(Rre)[1]===undefined)?'':tmplA[x].split(Rre)[1];
//
//                 tmplA[x] = lft + rght;
//
//                 }
//                 tmpl = tmplA.join('');
//
//                 return tmpl;
//
//             },
//             Pattern : new RegExp("\#\{(.+?)\}")
//         }
//
//         $.extend(this,A,{
//             //test: function(){alert('test at prototype level');}, // prototype set as object, not a constructor
//             load: function(template) {
//                 this.template = template.toString();
//                 this.readyState = 1;
//                 this.onReadyState();
//             },
//             evaluateCallback: function (options) {
//                 this.options = {
//                     object: {},
//                     callback: function () {}
//                 };
//                 this.options = $.extend(this.options, options || { });
//
//                       /**
//                        * @private This is tied to templateString. If passed,
//                        * then onReadyState queue bypassed, and control goes straight
//                        * to the callbackEvaluation via readState true
//                        */
//                     if (this.readyState) {
//                         this.options.callback(this.evaluate(this.options.object));
//
//                     } else {
//                         this.queue.push({
//                             qtype: 'callback',
//                             obj: this.options.object,
//                             fnc: this.options.callback
//                         });
//                     }
//                 return;
//             },
//             // Asynchronous to .evaluateCallback
//             onReadyState: function () {
//                 while (q = this.queue.shift()) {
//                     var object = q.obj;
//                     var qtype = q.qtype;
//                     var callback = q.fnc;
//
//                     callback(this.evaluate(object));
//                 }
//             }
//         });
//     }
//
//     /**
//      * @description Single object with main method that controls for
//      * the switch among templateString, inline, cache, ajax is delegated.
//      *
//      * @inner Constructor
//      * @constructs an object with main method namespace
//      * @class GetFunctionObject
//      */
//     var GetFunctionObject = (new function() {
//
//         /**
//          * @private
//          */
//         var defaults = { useInline:true, templateCssClass : ".inline-template" }, _object  = []; // internal prop
//
//         this.debug = function() { var msg = 'private var defaults : '+defaults.useInline; alert(msg); }
//
//         /**
//          * @private
//          * @function primary function (method) as value bound to public get api method
//          */
//         this.main = function (params) {
//
//             /**
//              * @private
//              */
//             var key = params.path, query = params.query,
//                 forceReload = params.forceReload || false,
//                 templateString = params.templateString || false,
//                 useInline, templateClassName;
//
//             // if no templateString-override, then setup for inline script tag template
//             if(!templateString) {
//                 useInline = (params.useInline)?params.useInline:defaults.useInline;
//                 templateClassName = (params.templateClassName)?params.templateClassName:defaults.templateCssClass;
//             }
//             /* these controls currently closed
//             if(params.useInline && params.templateClassName) {
//                 defaults.useInline = params.useInline;
//                 defaults.templateClassName = params.templateClassName;
//             }
//             */
//
//             // Case 1: Brand New : forceReload, new query, and no template yet
//             if (typeof _object[key] != "undefined" && !forceReload && !query) {
//                 return _object[key];
//             }
//             _object[key] = new Template();
//             //this._object[key].test(); // hits new inner Class of Template
//
//             // Case 2: Template string directly passed
//             if (templateString) {
//                 _object[key].load(templateString);
//                 return _object[key].evaluateCallback(params);
//             }
//             var url = key;
//             if (query) {
//                 var q = $H(query);
//                 var queryString = q.toQueryString();
//                 url += "?" + queryString;
//             }
//             // Attempt to Use Inline
//             if(useInline) {
//                 $(templateClassName).each(function(){
//                     if($(this).html()&&($(this).attr("path")==key)) {
//                      alert($(this).html());
//                         _object[key].load( $(this).html() );
//                     }
//                 });
//             }else{
//              // load asynchronously and move onto evaluateCallback
//              $.ajax({
//                  url: url,
//                  context: this, // bind (.bind onSuccess callback)
//                  data: params.urlparams,
//                  success: function(data, textStatus, jqXHR){
//                      _object[key].load(jqXHR.responseText);
//                  }
//              });
//          }
//              _object[key].evaluateCallback(params);
//
//         return this;
//         }
//     }());
//
//     var PublicInterfaceMapper = { get : GetFunctionObject.main, sample : GetFunctionObject.debug };
//     var API = $.extend(PublicInterfaceMapper,GetFunctionObject);
//
//     return function () {
//
//         // Return Same Obj
//         if(singleton) { return singleton; }
//
//             // Extra api
//             singleton = $.extend(this,API);
//             singleton.api = API.sample;
//
//         //alert('return singleton; //* should only see this once *// ');
//         };
//     }());
//
// generic.template = new generic.TemplateSingleton();
;
var generic = generic || {};
generic.checkout = {};

/**
 * The cart is a singleton.  Multicart functionality needs to be extended,
 * where this singleton can provide a single reference to manage n carts.
 *
 * @class Cart
 * @namespace generic.checkout.cart
 *
 * @requires generic.cookie, generic.jsonrpc, generic.Hash
 *
 * @returns singleton cart object
 *
 */
generic.checkout.Cart = (function() {

    /**
     * @private declared dependencies of other js modules
     */
    var Hash = generic.Hash, JsonRpc = generic.jsonrpc, Cookie = generic.cookie;

    /**
     * @private singleton
     */
    var cart;

    /**
     * @private    private classes for mixin to service final api {}
     */
    var Properties = {

        setCookie: false

    },
    Containers = {
        order: new Hash(),
        payments: new Array(),
        carts: new Hash(),
        items: new Array(),
        samples: new Array()
    },
    CartData = {
        totalShoppedItems: 0,
        totalItems: 0
    },
    /**
     * @constant
     */
    CartConstants = {

        transactionParams: {
            transactionFields: {
                "trans_fields" : ["TRANS_ID", "payments"]
            },
            paymentFields: {
                "payment_fields" : ["address", "PAYMENT_TYPE", "PAYMENT_AMOUNT", "TRANS_PAYMENT_ID"]
            },
            orderFields: {
                "order_fields" : ["items", "samples", "address", "TRANS_ORDER_ID"]
            }
        },
        itemTypes: {
            "cart" : {
                 "id": "SKU_BASE_ID",
                 "_SUBMIT" : "cart"
             },
             "GiftCard" : {
                 "id": "GiftCard",
                 "_SUBMIT" : "giftcard"
             },
             "collection" : {
                 "id": "SKU_BASE_ID",
                 "_SUBMIT" : "collection.items"
             },
             "kit" : {
                 "id": "COLLECTION_ID",
                 "_SUBMIT" : "alter_collection"
             },
             "replenishment" : {
                 "id": "SKU_BASE_ID",
                 "_SUBMIT" : "alter_replenishment"
             },
             "favorites" : {
                 "id": "SKU_BASE_ID",
                 "_SUBMIT" : "alter_collection"
             }
        }
    },
    Ops = {
        /**
         * @private update cart state
         */
        _updateCartData: function(data){
            // console.log("generic.checkout.cart._updateCartData");
            var self = this;
            this.data = data;
            this.totalItems = data.items_count;
            this.defaultCartId = data.default_cart_id;
            this.payments = (data.trans && data.trans.payments) ? $.makeArray(data.trans.payments) : null;
            this.order = data.order;

            // contents and sample_contents mirror the sku by qty hashes
            this.order.contents = new Hash();
            this.order.sample_contents = new Hash();

            if (this.order.items != null) {
				this.order.items = $.map(this.order.items,
					function (ele) { // filter out nulls
						return (ele == null ? null : ele)
					}
				);
            }

            var items = this.order.items || null;
            var totalShoppedItems = 0;
            if (items != null) {
                $.each(items, function(){
                    if (!this) { return; }
                    totalShoppedItems+=this.ITEM_QUANTITY;

                    // set up contents by cart hashes
                    var cartID = this.CART_ID;
                    var cart = self.carts.get(cartID);
                    if (!cart) {
                        self.carts.set(cartID, new Hash());
                        cart = self.carts.get(cartID);
                        cart.set('contents', new Hash());
                    }
                    var id = this['sku.SKU_BASE_ID'] ? this['sku.SKU_BASE_ID'] : this.COLLECTION_ID;
                    cart.get('contents').set(id, this.ITEM_QUANTITY);

                    // compute per-unit tax (replace this with field from JSONRPC result when available)
                    var unitTax = this.APPLIED_TAX/this.ITEM_QUANTITY;
                    this.UNIT_TAX = unitTax;

                    // set up order contents hash (spans carts)
                    if (this.itemType.toLowerCase() == 'skuitem') {
                        var key = this['sku.SKU_BASE_ID'];
                        var qty = this.ITEM_QUANTITY;
                        //error self.order.contents.set(key, qty);
                        self.order.contents[key] = qty;
                    } else if (this.itemType.toLowerCase() == 'kititem') {
                        var key = this.COLLECTION_ID;
                        var qty = this.ITEM_QUANTITY;
                        self.order.contents.set(key,qty);
                    } else {
                        // FUTURE: other cart item types (e.g. kits)
                    }

                });
            }

            this.totalShoppedItems = totalShoppedItems;

            var samples = this.order.samples;
            if (samples != null) {
                $.each(samples,  function(){
                    // set up contents by cart hashes
                    var cartID = this.CART_ID;
                    var cart = self.carts.get(cartID);

                    if (!cart) {
                        self.carts.set(cartID, new Hash());
                        cart = self.carts.get(cartID);
                        cart.set('contents', new Hash());
                    }

                    var id = this['sku.SKU_BASE_ID'] ? this['sku.SKU_BASE_ID'] : this.COLLECTION_ID;
                    cart.get('contents').set(id, this.ITEM_QUANTITY);

                    // set up order contents hash (spans carts)
                    if (this.itemType.toLowerCase() == 'sampleitem') {
                        var key = this['sku.SKU_BASE_ID'];
                        var qty = this.ITEM_QUANTITY;
                        self.order.sample_contents.set(key,qty);
                    } else {
                        // other item types (are likely errors)
                    }
                });
            }

            // original:
            // if (self.setCookie) self.setCookie();
            // generic.events.fire({event:'cart:countsUpdated'});
            // generic.events.fire({event:'cart:updated'});

            //if (self.setCookie) self.setCookie();
            /**
             * @event cart:countsUpdated
             */
            //generic.events.fire({event:'cart:countsUpdated'});

        }
    },
    /**
     * @inner Api class with all the methods to handle cart
     */
    API = {
        initialize: function(args) {
             $.extend(this, args);
        },
        /**
         * @public getCartTotals
         */
        getCartTotals: function() {

            var cookie = Cookie("cart");
            if (cookie && cookie!==null) {
               // console.log("generic.cart.getCartTotals cookie: "+Object.toJSON(cookie));
               $.extend(this, cookie);

               /**
                * @events cart:countsUpdated
                */
               // generic.events.fire({event:'cart:countsUpdated'});
            } else {
               // console.log("generic.cart.getCartTotals !cookie");
               this.getCart();
            }

        },
        /**
         * @public setCookie
         */
        setCookie: function() {
            // console.log("generic.cart.setCookie "+this.totalItems);
            var s  = {
                totalItems: this.totalItems
            }
            s = JSON.stringify(s);
            Cookie("cart",s, {path:"/"});
        },
        /**
         * @public getCart
         * @returns id of updated cart
         */
        getCart: function(args) {

            //console.log("generic.cart.getCart");
            var self = this;

            if (args != null && args.pageDataKey) {
                var pageData = generic.page_data(args.pageDataKey);
                if (pageData.get("rpcdata")) {
                    // console.log( "cart page data found!" );
                    self._updateCartData(pageData.get("rpcdata"));
                    return;
                }
            }

            var params = {};
            $.extend ( params, self.transactionParams.transactionFields );
            $.extend ( params, self.transactionParams.paymentFields);
            $.extend ( params, self.transactionParams.orderFields);

             var id = generic.jsonrpc.fetch({
                method : 'trans.get',
                params: [params],
                onSuccess:function(jsonRpcResponse) {
                    self._updateCartData(jsonRpcResponse.getValue());
                },
                onFailure: function(jsonRpcResponse){
                    //jsonRpcResponse.getError();
                    console.log('Transaction JSON failed to load');
                }
            });
            return id;

        },
        /**
         * @public updateCart
         *
         * @param {object} onSuccess, onFailure callbacks
         *
         * @returns {number} incremented id uniquely identifying internal operations
         */
        updateCart: function(args){

            // console.log("cart.updateCart: "+Object.toJSON(args.params));
            if (!args.params) return null;

            var self = this;
            var onSuccess = args.onSuccess || new (function(){})(); // native empty function
            var onFailure = args.onFailure || new (function(){})(); // prev: prototype.emptyFunction

            var itemType = args.params.itemType || "cart"; //e.g. cart, collection, giftcard etc
            var id = self.itemTypes[itemType].id;
            var method = 'rpc.form';

            var params = {
                '_SUBMIT': self.itemTypes[itemType]["_SUBMIT"]
            };  // not-yet args.params

            //id // single id or collection id based on sku array from params
            if (id == 'SKU_BASE_ID') {
                params[id] = (args.params.skus.length == 1) ? args.params.skus[0] : args.params.collectionId; //MK collections array syntax correct?
            } else if (id == 'COLLECTION_ID') {
                params[id] = args.params.collectionId;
            }

            params["INCREMENT"] = args.params.INCREMENT;
            params["QTY"] = args.params.QTY;

            //offer code
            if (args.params.OFFER_CODE && args.params.OFFER_CODE.length>0) {
                params['OFFER_CODE'] = args.params.OFFER_CODE;
            }

            //favorites
            if (args.params.action && args.params.action.length > 0) {
                params['action'] = 'add';
            }

            //kit
            if (args.params.action && args.params.action == 'save') {
                params['action'] = 'save';
            }

            //replenishment
            if (args.params.REPLENISHMENT_FREQ && args.params.REPLENISHMENT_FREQ >= 0) {
                params['REPLENISHMENT_FREQ'] = args.params.REPLENISHMENT_FREQ;
            }
            if (args.params.add_to_cart && args.params.add_to_cart != 0) {
                params['add_to_cart'] = args.params.add_to_cart;
            }

            //giftcard
            if (args.params.ITEM_TYPE && args.params.ITEM_TYPE == 'GiftCard') {
                $.extend(params, args.params);
            }

            // targeting of the correct cart is still missing (and important to get right)
            // cart id if we are adding to something other than the default cart
            if (args.params.cart_id && (args.params.cart_id != self.defaultCartId)) {
                params['CART_ID'] = args.params.cart_id;
            }

            //method
            if (args.params.method && args.params.method.length > 0 ) {
                method = args.params.method;
            }

            // Save which catId the prod was displayed in
            if (args.params.CAT_BASE_ID && args.params.CAT_BASE_ID.length > 0) {
                params["CAT_BASE_ID"] = args.params.CAT_BASE_ID;
            }

            var id = JsonRpc.fetch({
                "method" : method,
                "params" : [params], // [{}]
                "onSuccess": function(jsonRpcResponse){

                    var data = jsonRpcResponse.getData();
                      var cartResultObj = jsonRpcResponse.getCartResults();
                    //load data
                    if (data && data["trans_data"]) {
                        self._updateCartData(data["trans_data"]);
                    }
                    if (args.params.itemType == 'cart') {
                         // $(document).trigger("cart.updated", [cartResultObj]);
                    };
                    if (args.params.itemType == 'favorites') {
                        /**
                         * @event favorites:updated
                         */

                        $(document).trigger("favorites.updated", [jsonRpcResponse]);
                    };
                    if (args.params.itemType == 'kit') {
                        /**
                         * @event kit:updated
                         */

                        $(document).trigger("kit.updated", [jsonRpcResponse]);
                    };
                    if (args.params.itemType == 'replenishment') {
                      	$(document).trigger("cart.updated", [cartResultObj]);
                    };
                    onSuccess(jsonRpcResponse);

                },
                "onFailure": function(jsonRpcResponse){
                    onFailure(jsonRpcResponse);
                }
            });

            return id;

        },
        /**
         * @public getItemQty
         * @returns {number}
         */
        getItemQty : function(baseSkuId) {
            if (!this.order.items) return 0;
            /* prototype js code:
            var lineItem = this.order.items.find( function (line) {
                return line['sku.SKU_BASE_ID'] ==  baseSkuId;
              });
            if (!lineItem) {
                return 0;
            }
            return lineItem.ITEM_QUANTITY;
            */
            for(i in this.order.items) {

                if( i['sku.SKU_BASE_ID'] == baseSkuId ) {

                    var lineItem = i;
                    break;
                }

            }
            if(!lineItem) return 0;
            return lineItem.ITEM_QUANTITY;
        },
        /**
         * @public getBaseSkuIds
         * @returns {array}
         */
        getBaseSkuIds: function() {  //MK: what is this used for?
            //console.log("generic.cart.getBaseSkuIds: "+this.order.items);
            /* prototype js code:
            if (!this.order.items) return new Hash();
            var baseSkuIds = this.order.items.pluck( 'sku.SKU_BASE_ID' ); //MK what about giftcards/collections?
            return baseSkuIds;
            */
            if (!this.order.items) return new Hash();
            var baseSkuIds = [];
            for(i in this.order.items) {
                baseSkuIds.push(i['sku.SKU_BASE_ID']);
            }
            return baseSkuIds;
        },
        /**
         * @public getSubtotal
         * @returns {number}
         */
        getSubtotal: function() {
            var lineItems = this.order.items;
            if (!this.order.items) return 0;
            var subtotal = 0;
            for (var i=0, len = lineItems.length; i<len; i++) {
                var lineItem = lineItems[i];
                subtotal += (lineItem.UNIT_PRICE + lineItem.UNIT_TAX) * lineItem.ITEM_QUANTITY;
            }
            return subtotal;
        },
        /**
         * @public getTotalShoppedItems
         * @returns {number}
         */
        getTotalShoppedItems: function(){ //products and gift cards
           /** var ttl = 0;
            var items = this.order.items;
            if (items != null) {
                items.each(function(item){
                    if (item && item.ITEM_QUANTITY) {
                        ttl += item.ITEM_QUANTITY;
                    }
                });
            }
            return ttl;**/
            return this.totalShoppedItems;
        },
        /**
         * @public getTotalSamples
         * @returns {number}
         */
        getTotalSamples: function() {
             var ttl = 0;
             var samples = this.order.samples;
                if (samples != null) {
                    samples.each(function(item){
                        ttl += item.ITEM_QUANTITY;
                    });
            }
            return ttl;
        },
        /**
         * @public getTotalItems
         * @returns {number}
         */
        getTotalItems: function(){
           // return this.getTotalShoppedItems() + this.getTotalSamples();
           return this.totalItems;
         }

    };

    cart = $.extend(cart,API,Ops,CartConstants,CartData,Containers,Properties);

    var extra = {
        sample : function(){alert('sample');}
    }

    return function(){

        if(cart) { return cart; }

        // initial and only-time singleton reference
        cart = $.extend(this,cart);
        cart.api = extra.sample;

    };

}() ) ;

generic.checkout.cart = new generic.checkout.Cart();
;
//
// TODO: check that all fields exist before returning/fetching data
// TODO: accept product & category ID args as arrays
//
/**
 * @namespace
 */
var generic = generic || {};

/**
 * @namespace
 */
generic.productData = generic.productData || {};


// document.observe('dom:loaded', function (evt) {
    // check pagedata for product data
// });


/**
 * This constructor method creates and returns a productCatalog singleton object.
 * The method executes immediately on load.
 * object that executes
 * @return {Object} product catalog object
 * @namespace
 * @methodOf generic
 */
generic.productData = ( function() {
    // var data = {
    //     categories : [{
    //         CATEGORY_ID : "",
    //         products: [{
    //             PRODUCT_ID : "",
    //             skus: [{
    //                 SKU_ID : ""
    //             }]
    //         }]
    //     }]
    // };
    // var data = {};
    var data = {
        categories : []
    };
    var defaultCategoryFields = ["CATEGORY_ID", "CAT_BASE_ID", "CATEGORY_NAME"];
    var defaultProductFields = ["PRODUCT_ID", "DEFAULT_CAT_ID", "PARENT_CAT_ID", "PROD_RGN_NAME", "PROD_RGN_SUBHEADING", "SUB_LINE", "DESCRIPTION", "SHORT_DESC", "PROD_SKIN_TYPE", "PROD_SKIN_TYPE_TEXT", "PROD_CAT_IMAGE_NAME", "PROD_CAT_DISPLAY_ORDER", "SMALL_IMAGE", "LARGE_IMAGE", "THUMBNAIL_IMAGE", "PRODUCT_USAGE", "FORMULA", "ATTRIBUTE_COVERAGE", "ATTRIBUTE_BENEFIT", "SKIN_CONCERN_LABEL", "SKIN_CONCERN_1", "SKIN_CONCERN_2", "SKIN_CONCERN_3", "skus", "shaded", "sized", "worksWith"];
	var defaultSkuFields = ["SKU_ID", "SKU_BASE_ID", "PRODUCT_ID", "SHADENAME", "SHADE_DESCRIPTION", "SKIN_TYPE", "SKIN_TYPE_TEXT", "PRODUCT_SIZE", "DISPLAY_ORDER", "STRENGTH", "PRICE", "formattedPrice", "formattedTaxedPrice", "SMOOSH_DESIGN", "SMOOSH_PATH_STRING", "INVENTORY_STATUS", "REFILLABLE", "HEX_VALUE", "HEX_VALUE_STRING", "FINISH", "ATTRIBUTE_COLOR_FAMILY", "UNDERTONE", "SKIN_TONE", "SKIN_TONE_TEXT" ];

    var fetchData = function(args) {
        // check for relevant page_data
        /********* COMMENTED OUT UNTIL page_data and Analytics are converted ************/
        if (args.pageDataKey) {
            var catalogPageData = generic.page_data(args.pageDataKey);
            if (catalogPageData.get("rpcdata")) {
                 //Notify analytics.js that this exists instead of RPC data
                // document.fire("PAGEDATA:RESULT",args.pageDataKey);
                $(document).trigger("PAGEDATA:RESULT", [args.pageDataKey]);
                args.callback(catalogPageData.get("rpcdata"));
                return;
            }
        }

        var jsonRpcParams = {};
        if (args.categoryId) {
            jsonRpcParams.categories = [args.categoryId];
        }
        if (args.productId) {
            jsonRpcParams.products = [args.productId];
        } else if (args.productIds && $.isArray(args.productIds)) {
            jsonRpcParams.products = args.productIds;
        }
        if (args.categoryFields) {
            jsonRpcParams.category_fields = args.categoryFields;
        }
        if (args.productFields) {
            jsonRpcParams.product_fields = args.productFields;
        }
        if (args.skuFields) {
            jsonRpcParams.sku_fields = args.skuFields;
        }
        generic.jsonrpc.fetch({
            method: "prodcat",
            params: [jsonRpcParams],
            onSuccess: function(jsonRpcResponse) {
                args.callback(jsonRpcResponse.getValue());
            },
            onFailure: function (jsonRpcResponse) {}
        });
    };
    var getInternalCategoryData = function(args) {
        if (!( args.categoryId && data && $.isArray(data.categories) )) {
            return null;
        }
        var categoryMatch = null;
        for (var i=0, len=data.categories.length; i<len; i++) {
            var c = data.categories[i];
            if (c.CATEGORY_ID == args.categoryId) {
                categoryMatch = c;
                break;
            }
        }
        return categoryMatch;
    };
    var getInternalProductData = function(args) {
        if (!( args.productId && data && $.isArray(data.categories) )) {
            return null;
        }
        var productMatch = null;
        var categoryMatch = null;
        if (args.categoryId) {
            categoryMatch = getInternalCategoryData({categoryId : args.categoryId});
            if (categoryMatch && $.isArray(categoryMatch.products)) {
                for (var i=0, len=categoryMatch.products.length; i<len; i++) {
                    var p = categoryMatch.products[i];
                    if (p.PRODUCT_ID == args.productId) {
                        productMatch = p;
                        break;
                    }
                }
            }
        } else {
            for (var i=0, len=data.categories.length; i<len; i++) {
                var category = data.categories[i];
                if ($.isArray(category.products)) {
                    for (var j=0, jlen=categoryMatch.products.length; j<jlen; j++) {
                        var p = categoryMatch.products[j];
                        if (p.PRODUCT_ID == args.productId) {
                            productMatch = p;
                            break;
                        }
                    }
                }
                if (productMatch) {
                    break;
                }
            }
        }
        return productMatch;
    };

    /** @scope generic.productCatalog */
    return {
        /**
         * Returns product data for a given product ID.
         * @method getProductData
         * @public
         */
        getProductData : function (args) {

            if (!( args.productId)) {
                return null;
            }


            var productMatch = getInternalProductData({
                productId: args.productId,
                categoryId: args.categoryId
            });
            if (productMatch) {
                args.callback(productMatch);
            } else {
                var self = this;
                // to get the correct product data, we have to concatenate the Cat ID
                // and Prod ID with a ~ character and pass the resulting value as the product ID.
                var compoundProductId = args.productId;
                if (args.categoryId) {
                    compoundProductId = args.categoryId + '~' + args.productId;
                }

                fetchData({
                    pageDataKey: args.pageDataKey,
                    productId: compoundProductId,
                    categoryFields: args.categoryFields,
                    productFields: args.productFields,
                    skuFields: args.skuFields,
                    callback: function(responseData) {
                        self.setProductData(responseData);
                        var returnData = getInternalProductData({
                            productId: args.productId,
                            categoryId: args.categoryId
                        });
                        args.callback(returnData);
                    }
                });
            }
        },
        getProductsData : function (args) {
            if (!( args.productIds && $.isArray(args.productIds) )) {
                return null;
            }
            var productsDataArray = [];
            var productIdsToFetch = [];

            for (var i=0, len=args.productIds; i<len; i++) {
                var prodId = args.productIds[i];
                var productMatch = getInternalProductData({
                    productId: prodId
                });
                if (productMatch) {
                    productsDataArray.push(productMatch);
                } else {
                    productIdsToFetch.push(prodId);
                }
            }

            fetchData({
                pageDataKey: args.pageDataKey,
                productIds: productIdsToFetch,
                categoryFields : args.categoryFields || defaultCategoryFields,
                productFields : args.productFields || defaultProductFields,
                skuFields : args.skuFields || defaultSkuFields,
                callback: function(responseData) {
                    // self.setProductData(responseData);
                    // var returnData = getInternalProductData({
                    //     productId: args.productId,
                    //     categoryId: args.categoryId
                    // });
                    args.callback(responseData);
                }
            });
        },
        getCategoryData : function (args) {
            if ( !args.categoryId ) {
                return null;
            }
            var categoryMatch = getInternalCategoryData({
                categoryId: args.categoryId
            });
            if (categoryMatch) {
                args.callback(categoryMatch);
            } else {
                var self = this;
                fetchData({
                    pageDataKey: args.pageDataKey,
                    categoryId: args.categoryId,
                    productFields: args.productFields,
                    categoryFields: args.categoryFields,
                    skuFields: args.skuFields,
                    callback: function(responseData) {
                        self.setCategoryData(responseData);
                        args.callback(getInternalCategoryData({categoryId: args.categoryId}));
                    }
                });
            }
        },
        addCategory : function (newCategoryData) {
            if (!newCategoryData.CATEGORY_ID) {
                return null;
            }
            data.categories = data.categories || [];
            data.categories.push(newCategoryData);
            return newCategoryData;
        },
        addProduct : function (newProductData) {
            var categoryID = newProductData.PARENT_CAT_ID;
            var category = getInternalCategoryData({categoryId: categoryID});
            if (!category) {
                category = this.addCategory({
                    CATEGORY_ID: categoryID,
                    products: []
                });
            }
            category.products.push(newProductData);
        },
        setCategoryData: function(args) {
            if ( args.categories && $.isArray(args.categories) ) {
                for (var i=0, len=args.categories.length; i<len; i++) {
                    var newCategory = args.categories[i];
                    if ( !newCategory.CATEGORY_ID ) {
                        return null;
                    }
                    var oldCategory = getInternalCategoryData({
                        categoryId : newCategory.CATEGORY_ID
                    });
                    if (oldCategory) {
                        $.extend(oldCategory, newCategory);
                    } else {
                        this.addCategory(newCategory);
                    }
                }
            }

        },
        setProductData : function (args) {
            if ( args.products && $.isArray(args.products) ) {
                for (var i=0, len=args.products.length; i<len; i++) {
                    var newProduct = args.products[i];

                    if ( !(newProduct.PARENT_CAT_ID && newProduct.PRODUCT_ID) ) {
                        return null;
                    }
                    var oldProduct = getInternalProductData({
                        productId : newProduct.PRODUCT_ID,
                        categoryId : newProduct.PARENT_CAT_ID
                    });
                    if (oldProduct) {
                        $.extend(oldProduct, newProduct);
                    } else {
                        this.addProduct(newProduct);
                    }
                };
            }
        },
        clearAllData : function () {
            data = {};
        },

        validateSkusArray : function(skus) {
        	return (skus && $.isArray(skus) && skus.length > 0);
        },

        /**
         * This method returns a string that displays both post and pre-tax prices for a given SKU.
         * Locale-specific characters and format are hard-coded in the method.
         * @return {String} formatted string with pre- & post-tax prices
         * @param {Object} sku JSON-formatted SKU data. Must include formattedTaxedPrice and formattedPrice properties.
         * @param {String} separator Optional string that gets placed between both prices. Default is a space.
         * @methodOf generic.productData
         */
        getPriceDisplay : function (sku, separator) {
            if (sku && sku.formattedTaxedPrice && sku.formattedPrice) {
                var preTaxLabel  = '&#26412;&#20307;';
                var postTaxLabel = '&#31246;&#36796;';
                var openBracket = '( ';
                var closeBracket = ')';
                if (!separator) separator = ' ';
                var price_string = '';
                price_string = postTaxLabel + sku.formattedTaxedPrice + separator + openBracket + preTaxLabel + sku.formattedPrice + closeBracket;
                return price_string;
            } else {
                return '';
            }
        }

     };
} )();


;
var generic = generic || {};

generic.errorStateClassName = 'error';

/**
 * This method displays error messages. It takes an array of error objects and a UL node
 * as parameters. If the UL is not spuulied, it will attempt to find a <UL class="error_messages">
 * in the DOM. It will then attempt to insert one directly after a <DIV id="header"> (If no header
 * is found, the method exits.) All the LI child nodes (previous messages) of the UL are hidden.
 * The text property of each error Hash is then displayed as an LI.
 * This method can also alter the style of the input elements that triggered the error.
 * The tags property in an error hash must be an array that contains a string starting with
 * "field." If the optional formNode parameter is supplied, this form node will be
 * searched for the field, and that field will be passed to the generic.showErrorState method.
 * @example
 * var errArray = [
 *      {
 *          "text": "Last Name Alternate must use Kana characters.",
 *          "display_locations": [],
 *          "severity": "MESSAGE",
 *          "tags": ["FORM", "address", "field.last_name_alternate"],
 *          "key": "unicode_script.last_name_alternate.address"
 *      },
 *      {
 *          "text": "First Name Alternate must use Kana characters.",
 *          "display_locations": [],
 *          "severity": "MESSAGE",
 *          "tags": ["FORM", "address", "field.first_name_alternate"],
 *          "key": "unicode_script.first_name_alternate.address"
 *      }
 *  ];
 * var listNode = $$("ul.error_messages")[0];
 * generic.showErrors(errArray, listNode);
 * @param {Array} errorObjectsArray Array of error hashes.
 * @param {DOM Node UL} errListNode UL element in which the error messages will be displayed.
 * @param {DOM Node} formNode Form element (or any container node) that contains the inputs
 * to be marked as being in an error state.
 */
generic.showErrors = function(errorObjectsArray, errListNode, formNode) {

    var ulNode = errListNode != null ? errListNode : $("ul.error_messages");
    // prototype version acted on a single node. This could be a list
    // so cut it down to avoid redundant messaging in places. i.e - signin
    ulNode = $(ulNode[0]);

    // TEST that pre-exisiting ul.error_messages is selected as container
    if ( $("ul.error_messages").length == 0 ) {
        var header = $("div#header");
        if (  header.length == 0  ) {
            return null;
            // TEST that DOM w/o div#header gets no error list (no ulNode parameter in method call)
        } else {
            $("<ul class='error_messages'></ul>").insertAfter(header);
            ulNode =  $(".error_messages");
            // TEST that DOM with div#header adds ul.error_messages after div#header)
        }
    }
    var errListItemNodes = ulNode.children("li");

    errListItemNodes.hide();
    // TEST that pre-exisiting, visible ul.error_messages LI's are hidden
    if (errorObjectsArray.length > 0 ){
        // hide all error states on fields
        formNode = $(formNode);
        var inputNodes = formNode.children("input, select, label");
        inputNodes.each( function () {
            generic.hideErrorState(this);
        });
        // TEST setup: input, select, label elements in formNode have class name "error"
        // test that the class name gets removed from those elements
    }
    for (var i=0, len=errorObjectsArray.length; i<len; i++) {
        var errObj = errorObjectsArray[i];
        var errKey = errObj.key;
        var errListItemNode = [];
        if (errKey) {
            var regEx = new RegExp(errKey);
            // try to find LI whose ID matches the error key
            errListItemNode = errListItemNodes.filter( function() {
                return regEx.test(this.id);
            });
        }

        if (errListItemNode.length > 0) {
            // TEST setup: LI with id that matches error key is already in UL, hidden.
            // Test that the LI gets shown when matching key is found amoung error objects.
            errListItemNode.show();
        } else {
            // TEST setup: no matching LI is in UL. LI gets created with matching key and added to UL.
            errListItemNode = $("<li/>");
            errListItemNode.html(errObj.text);
            ulNode.append( errListItemNode );

        }
        if (errObj.displayMode && errObj.displayMode === "message") {
            // TEST setup: error object has displayMode="message"
            // Test that matching LI gets class name "message"
            errListItemNode.addClass("message");
        }
        if (errObj.tags && $.isArray(errObj.tags)) {
            // search through error objects, show error state for any tagged with "field.[NAME]"
            var fieldPrefixRegEx = /^field\.(\w+)$/;
            for (var j=0, jlen=errObj.tags.length; j<jlen; j++) {
                var tag = errObj.tags[j];
                var reResults = tag.match(fieldPrefixRegEx);
                if ( reResults && reResults[1] ) {
                    var fieldName = reResults[1].toUpperCase();
                    var inputNode = $("input[name=" + fieldName + "], select[name=" + fieldName + "]" , formNode);
                    if (inputNode.length > 0) {
                        generic.showErrorState(inputNode[0]);
                        var labelNode = $("label[for=" + inputNode[0].id + "]", formNode);
                        generic.showErrorState(labelNode[0]);
                    }
                }
            }
            // TEST setup: error object has "tags" = ["field.last_name"]; formNode contains a label & an input tag with name=last_name
            // Test that the tags get className "error"
        }
    }
    ulNode.show();
    ulNode.addClass("error_messages_display");
    // TEST ulNode should be visible & have classname = error_messages_display
};
generic.showErrorState = function( /* DOM Node */ inputNode) {
    if (!inputNode || !generic.isElement(inputNode)) {
        return null;
    }
    $(inputNode).addClass(generic.errorStateClassName);
}
generic.hideErrorState = function( /* DOM Node */ inputNode) {
    if (!inputNode || !generic.isElement(inputNode)) {
        return null;
    }
    $(inputNode).removeClass(generic.errorStateClassName);
}



;
var generic = generic || {};
generic.page_data = generic.page_data || {};
var page_data = page_data || {};

generic.page_data = function(pageDataKey) {
    var getPageDataValue = function(pageDataKey) {

        if (typeof pageDataKey != "string") {
            return $H({});
        }
        // avoid deep cloning of page_data
        if (pageDataKey && page_data) {
            var key = pageDataKey;
            var parts = key.split(".");
            var length = parts.length;
            var val = page_data;
            var k;
            while (k = parts.shift()) {
                if (val[k]) {
                    val = val[k];
                }
                else {
                    return $H({});
                }
            }
            var rh;
            // For scalars and arrays make a return hash where the key is the pageDataKey
            if (typeof val == "string"
                    || typeof val == "number"
                    || $.isArray(val)) {
                var t = new Object;
                t[pageDataKey] = val;
                rh = $H(t);
            }
            else {
                rh = $H(val);
            }

            if (rh) {
                return rh;
            }
            else {
                return $H({});
            }
        }
        else {
            return $H({});
        }
    };
    var pageDataValue = getPageDataValue(pageDataKey);
    var returnObj = {
        get: function(key) {
            if ( typeof key != "string") {
                return null;
            }
            var val = pageDataValue.get(key);
            return val;
        }
    };
    return returnObj;
};

;

generic.user = {};

/**
 * generic.user
 * - depends on: generic.jsonrpc
 */
generic.user = (function(){

    return {
        signed_id : false,

        initialize: function(args) {
            generic.updateProperties.apply(this, [args]);
        },

        getUser: function(args) {
            var self = this;

            if (args && args.pageDataKey) {
                var pageData = generic.page_data(args.pageDataKey);
                if (pageData.get("rpcdata")) {
                    console.log( "user page data found!");
                    self._updateUserData(pageData.get("rpcdata"));
                    return;
                }
            }

            var id = generic.jsonrpc.fetch({
                method : 'user.json',
                params: [],
                onSuccess: function(jsonRpcResponse) {
                    self._updateUserData(jsonRpcResponse.getValue());
                },
                onFailure: function(jsonRpcResponse) {
                    console.log('User JSON failed to load');
                }
            });
            return id;
        },

        // until we better parameterise this...
        _updateUserData: function(data) {
            var seld = this;
            if (data && !data[this.userinfo_rpc_key]) {
                $.extend( this, data[this.userinfo_rpc_key] );
            } else {
                $.extend( this, data );
            }
            //generic.events.fire({event:'user:updated'});
        },

        isSignedIn: function() {
            return ( this.signed_in ? true : false );
        }

    };
}() );

(function($) {
    clearTimeout(window.signOutTimer);
    ($)(function(){
        if (document.location.protocol == 'https:') {
            var site = window.site || {};
            // Don't do it if the user isn't signed in:
            var signed_in = typeof site.userInfoCookie == 'undefined' ? 0 : site.userInfoCookie.getValue('signed_in');
            signed_in = parseInt(signed_in, 10);
            if (signed_in) {
                window.signOutTimer = window.setTimeout(function() {
                  document.location.href = '/account/signin.tmpl?_SUBMIT=signout&timeout=1';
                } , 15 * 60 * 1000);
            }
        }
    });
})(jQuery);
;
(function($) {
  window.generic = generic || {};

  // Route the old perlgem overlay method to colorbox:
  generic.overlay = {
    launch : function(args, event) {
      if (typeof event !== 'undefined' ) {
        event.preventDefault();
      }
      // ColorBox args sent along
      var cboxArgs = {
          'height': '600px',
          'width' : '768px',
          'margin' : 'auto',
        };
      // Smoosh in any overrides from other calls, looks like args.cssStyle
      _.extend(cboxArgs, args);
      _.extend(cboxArgs, args.cssStyle); // get height/width overrides

      // When mobile, override any height/width and set to 100%
      if ($(window).width() <= 768) {
        _.extend(cboxArgs, {height: '100%', width: '100%'});
          // When mobile, If default Height is true ,override any height set to auto
          var isDefaultHeight = (typeof args.isDefaultHeight !== 'undefined' ? args.isDefaultHeight: false);
          if (isDefaultHeight) {
            _.extend(cboxArgs, {height: 'auto'});
          }
      }
      // Actual content of the overlay
      if (typeof args.content !== 'undefined') cboxArgs.html = args.content;
      // A custome class each launcher has the option of setting
      if (typeof args.cssClass !== 'undefined') cboxArgs.className = args.cssClass;
      // Scroll to an anchor, if sent over
      if (typeof args.inPageAnchor !== 'undefined') {
        cboxArgs.onComplete = function() {
          $('#cboxLoadedContent').scrollTo($('#' + args.inPageAnchor), 50);
        };
      }
      // Launch it
      $.colorbox(cboxArgs);
    },

    initLinks: function() {
      // Give us access to the parent scope so we can hit .launch()
      var self = this;
      // Links are tiggered via class, but indicate if already processed
      var $triggers = $('.overlay-link:not(.overlay-ready)').addClass('overlay-ready');

      // Depending on the type of link, the overlay needs to do something unique
      $triggers.each( function() {
        var args = {
          cssStyle: {}
        }, // args sent to overlay
          linkClassNames = $(this).attr('class'), // class name sent to colorbox
          linkHref = $(this).attr('href'), // actual href
          linkHrefWithEmbed = linkHref,
          inPageAnchor = $(this).data('inpage-anchor'), // see try/catch below
          overlayElement = $(this).data('overlay-content'); // use an existing element as content

        // used in overlay linking below
        var urlParts = document.createElement('a'); //
        urlParts.href = linkHref; //

        // Parse height options out of the link's class
        var widthRegexResults = linkClassNames.match(/overlay-width-(\d+)/);
        if (widthRegexResults) {
          args.cssStyle.width = widthRegexResults[1];
        }
        // Parse width options
        var heightRegexResults = linkClassNames.match(/overlay-height-(\d+)/);
        if (heightRegexResults) {
          args.cssStyle.height = heightRegexResults[1];
        }
        // Add a custom class, optionally
        var cssClassRegexResults = linkClassNames.match(/overlay-addclass-([a-z\-\_]+)/);
        if (cssClassRegexResults) {
          args.className = cssClassRegexResults[1];
        }

        // Make sure embed doesn't already exist. This gets added form internal
        // drupal embeddable urls
        if (typeof overlayElement !== 'undefined') {
          args.content = $(overlayElement).html();
        } else {
	  var pathName = urlParts.pathname;
          try {
            if ((generic.env.isIE || generic.env.isIE11) && pathName.charAt(0) != '/') {
              pathName = '/'+pathName;
            }
            if( !linkHref.match(/[\&\?]embed=1($|&)/)) {
              linkHrefWithEmbed = pathName + (urlParts.search === "" ? "?" : urlParts.search+"&") + "embed=1" + urlParts.hash;

              // Retain original link if it included the protocol.
              if(linkHref.match(/https?:\/\//)) {
                linkHrefWithEmbed = urlParts.protocol + "//" + urlParts.host + linkHrefWithEmbed;
              }
            }
          } catch(e) {
            linkHrefWithEmbed = linkHref;
          }

          // Fix the link within the page
          $(this).attr('href', linkHrefWithEmbed);
          // But this is actually used to launch overlay
          args.href = linkHrefWithEmbed;
        }

        // scrollTo behavior if we have a data attribute
        if (typeof inPageAnchor !== 'undefined') {
          args.inPageAnchor = inPageAnchor;
        }

        // Launch a colorbox overlay
        $(this).on('click', function(e) {
          // use our canonical launch function for all the goodies
          self.launch(args, e);
        });

      }); // .each()

    }, // initLinks

    hide: function() {
      $.colorbox.close();
    },

    getRBKeys: function() {
      generic.rb.language = generic.rb("language");
      generic.rb.language.rb_close = generic.rb.language.get('close');
    }
  };

  ($)(function(){
    generic.overlay.getRBKeys();
    generic.overlay.initLinks();
  });

})(jQuery);
;
var site = site || {};
var generic = generic || {};

/**
  * Method to grab a cookie and use that to control DOM elements as needed.
  * Handles the setting and getting of the user cookie defined in cookie.name and set in backend.
  * To find where the cookie is set on backend, look to Request::TransactionLocaleHandler.
  * Example cookie structure not signed in:
  *   FE_USER_CART=item_count:1&first_name:&signed_in:0&region_id:0
  * Example cookie structure signed in:
  *   FE_USER_CART=item_count:3&first_name:John&signed_in:1&region_id:0
  * You can set specific functions on page load using events.load or hook into javascript events
  *  by defining them in the events class and adding the event to events.init.
  * The cookie class is used to handle all the cookie functionality such as the setting and getting.
  * This method is meant to be stand alone so should be able to add to a brand without many tweaks.
  * Uses straight javascript so not dependent on a javascript framework except for DOM load.
  * Preferably added to the where ever the globalnav javascript is added within a brand.
  * @memberOf site
*/
site.userInfoCookie = function() {
  // Set global vars here.
  var nodes = {};

  // Private internal cookie class.
  // Leverages generic.cookie to get and set the cookie values.
  var cookie = {
    name: 'FE_USER_CART',
    value: '',
    regEx: function(key) {
      if (!key) {
        return null;
      }
      return new RegExp(key + ':([^;&,}]*)');
    },
    set: function() {
      if (!this.name) {
        return null;
      }
      var userCookie = generic.cookie(this.name);
      this.value = userCookie ? userCookie : '';
    },
    getValue: function(key) {
      var keyVal = this.value.match(this.regEx(key));
      return keyVal ? (keyVal[1] ? keyVal[1] : null) : null;
    },
    setValue: function(key, val) {
      var match  = this.value.match(this.regEx(key));
      var oldValue = match[0];
      var newValue = this.value.replace(match[1], val);
      generic.cookie(this.name, newValue, { path: '/' });
      this.value   = newValue;
    }
  };

  // Private events class that handles all individual events.
  // Add all events in 'init' method so they will get fired on page load.
  // The cart event is commented out but there as an example.
  var events = {
    init: function() {
      this.load();
      //this.cart();
    },
    load: function() {
      _setCartItemsTotal();
    },
    cart: function() {
      /*
      $(document).on('cart:countsUpdated', function() {
        var cartCount = generic.checkout.cart.getTotalItems();
        cookie.setValue('item_count', cartCount);
      });
      */
    }
  };

  /* Additional helper functions below here. */

  // Pulls in the cookie info and updates the DOM;
  var _setCartItemsTotal = function() {
    if (!nodes.cartTotalContainer) {
      return null;
    }

    var valueKey = 'item_count';
    var itemsTotal = cookie.getValue(valueKey) || 0;
    nodes.cartTotalContainer.innerHTML = itemsTotal;
  };

  // BRAND SPECIFIC: Get any DOM nodes and assign them to the global class var nodes. Varies between brands.
  // Helps keep all the brand specific DOM definitions in one spot.
  var _getDomNodes = function() {
    nodes.cartTotalContainer = document.getElementById('items_count') || document.getElementById('shoppingbag_count');
  };

  return {
    init: function() {
      _getDomNodes();
      cookie.set();
      events.init();
    },
    set: function() {
      cookie.set();
    },
    getValue: function(key) {
      return cookie.getValue(key);
    },
    setValue: function(key, val) {
      cookie.setValue(key, val);
    }
  };
}();

// BRAND SPECIFIC: This is for a prototype site.
// $(document).ready(function(){ site.userInfoCookie.init(); });

// Set the cookie outside of $(document).ready so other scripts can always access it in their $(document).ready:
site.userInfoCookie.set();
;
/**
 * @namespace
 */
var site = site || {};
site.signin = site.signin || {};
site.panels = site.panels || {};

/**
    * One-time call to collect specific RB Keys used for forget password.
    * @methodOf site.signin
*/
site.signin.getRBKeys = function() {
    site.signin.rb = generic.rb("error_messages");
	site.signin.forgotPasswordEmailNotFound = site.signin.rb.get('no_account') != 'no_account' ? site.signin.rb.get('no_account') : 'We do not have an account associated with that email address. Please sign in as a new customer.';
	site.signin.forgotPasswordNoEmailProvided = site.signin.rb.get('invalid_email') != 'invalid_email' ? site.signin.rb.get('invalid_email') :  'Please enter an email address in the following format: jane@aol.com.';
    site.signin.forgotPasswordMigratedUser = site.signin.rb.get('migrated.mobile_account.signin');
};

/**
    * This method is used to set up the forget password functionality
    * on the site.
    * Takes the passed element in the DOM and gets the required form
    * nodes and places them within forgotPassArgs object.
    * site.signin.setForgetPassword() is then called if the param resetPassword
    * is set to true.
    * @param {Object} args
    * @param {Object} args.emailNode **REQUIRED** DOM element of either a
    * form element or wrapper element of the email.
    * @param {Object} args.errorListNode **REQUIRED** DOM element used to show
    * password hint or error messaging if hint is not available.
    * @param {Object} args.forgotPasswordLink **REQUIRED** DOM element of the
    * forget password link.
    * @params {element} forget link node set on dom:load
    * @methodOf site.signin
*/
site.signin.forgotPassword = function(args) {

    if ((args.emailNode.length > 1) || (!args.forgotPasswordLink) || (!args.errorListNode) ) {
        return null;
    }
    site.signin.getRBKeys();

    var errorListNode = args.errorListNode;
    var emailNode = args.emailNode;
    var forgotPasswordLink = args.forgotPasswordLink;
    var forgotPasswordNote = args.forgotPasswordNote;
    var forgotPasswordCopy = $("#lpw-text");
    var panel = args.panel;
    // content may have been set on server side. If so, do not hide.
    if (forgotPasswordCopy.length > 1 && forgotPasswordCopy.html().length < 1) {
        forgotPasswordCopy.hide();
    }

    forgotPasswordNote.delegate('a.sign-in-component__fpw-link', "click", function(evt) {
        evt.preventDefault();
        var email = site.signin.getEmailAddress(emailNode);

        if (!email || email.length < 1) {
            if (panel) {
                panel.setMessages({
                    text: site.signin.forgotPasswordNoEmailProvided
                });
            } else {
                generic.showErrors([{
                    text: site.signin.forgotPasswordNoEmailProvided
                    }], errorListNode);
                generic.showErrorState(emailNode[0]);
            }
            return null;
        }

        generic.jsonrpc.fetch({
            method: 'user.emailAvailable',
            params: [{
                "EMAIL_ADDRESS": email
            }],
            onSuccess : function(result) {
                var responseData = result.getValue();
                if (responseData === 0) {
                    forgotPasswordCopy.addClass("hidden");
                    site.signin.requestPassword(email);
                } else {
                    if (panel) {
                        site.checkout.panel.clearPanelMessages();
                        panel.setMessages({
                            text: site.signin.forgotPasswordEmailNotFound
                        }, true);
                        
                    } else {
                        errorListNode[0].innerHTML = '';
                        forgotPasswordCopy.removeClass("hidden");
                        generic.showErrors([{
                            text: site.signin.forgotPasswordEmailNotFound
                            }], errorListNode);
                        generic.showErrorState(emailNode[0]);
                    }
                }
            },
            onFailure : function(result) {
                var errorObjectsArray = result.getMessages();
                var errorKey = errorObjectsArray[0].key;
                if (panel) {
                    panel.setMessages({
                        text: site.signin.forgotPasswordNoEmailProvided
                    });
                } else {
                    generic.showErrors([{
                        text: site.signin.forgotPasswordNoEmailProvided
                        }], errorListNode);
                        generic.showErrorState(emailNode[0]);
                }
            }
        });
        
    });
};


/**
 * This method is used to retrieve a user's password hint.
 * @param {email} the user email that will be passed. **REQUIRED**
 * @param {onSucess}
 * @param {onFailure}
 * @methodOf site.signin
*/
site.signin.getPasswordHint = function(args) {
 if (!args.email) {
     return null;
 }
 var onSuccess = args.onSuccess || function() {};
 var onFailure = args.onFailure || function() {};


 generic.jsonrpc.fetch({
     method: 'user.passwdHint',
     params: [{
         "EMAIL_ADDRESS": args.email
     }],
     onSuccess : onSuccess,
     onFailure : onFailure
 });
};

/**
    * This method is used to reset a users password by submitting a hidden form.
    * @param {email} the user's email address **REQUIRED**
    * @param {actionURL} the page URL of the reset page **REQUIRED**
    * **NOTE**: The error check for if an account exists is handled by the password
    * hint function. The reset is hidden inside the password hint function
    * so no duplicate error checking is needed here.
*/
site.signin.initResetPassword = function(emailNode) {
    //have to initialise the link here because it isn't on the page until the pw hint method is invoked
    var email = site.signin.getEmailAddress(emailNode);
    var resetPassLink = $('#pwd-reset');
    if (resetPassLink) {
        resetPassLink.bind('click', function(evt) {
            evt.preventDefault();
            site.signin.requestPassword(email);
        });
    }
};


/**
    * This method is used to direct the user to registration.tmpl or password_request.tmpl.
    * The passed values are injected into the genric form before it is submitted.
    * @param {email} the user email that will be passed. **REQUIRED**
    * @param {actionURL} action url used on user submit. **REQUIRED**
    * @param {returnURL} passed when an action is needed after the user
    * has gone to the next template page. **NOT REQUIRED**
    * Example case for returnURL is if the user goes through checkout and registers,
    * the returnURL is used to pass the viewbag action url to the registration page. Once
    * registration form is filled out, user will be brought to viewbag.
    * @methodOf site.signin
*/
site.signin.submitHiddenSigninForm = function(args) {
    if (!args.actionURL || !site.signin.hiddenForm) {
        return null;
    }
    site.signin.hiddenForm.attr('action', args.actionURL);
    var hiddenEmailNode = $('#sigin-form-hidden-email');
    hiddenEmailNode.val(args.email);
    if (args.returnURL) {
        var hiddenReturnNode = $('#sigin-form-hidden-return');
        hiddenReturnNode.val(args.returnURL);
    }
    site.signin.hiddenForm.submit();
};


/**
    * This method is used to call site.signin.submitHiddenSigninForm by
    * passing the user's email used in the reset form submit. Otherwise
    * password reset directly via URL
    * @param {String} the user email that will be passed. **REQUIRED**
    * @methodOf site.signin
*/
site.signin.requestPassword = function(emailAddr) {
    var actionPath = '/account/password_request.tmpl';

    // grab and return the first match, the actual HTML Element object, or return undef if not found
    site.signin.hiddenForm    = $('form#signin-hidden-form').get(0);

    if (site.signin.hiddenForm) {
        site.signin.submitHiddenSigninForm({
            email: emailAddr,
            actionURL: actionPath
        });
    } else {
        var resetURL = actionPath + '?PC_EMAIL_ADDRESS=' + encodeURIComponent(emailAddr);
        document.location.href = resetURL;
    }
};

/**
    * This method is used to pull the user's email from either a form
    * input or container html tag wrapper (i.e. div, span, etc)
    * @param {String} emailNode the user email that will be passed. **REQUIRED**
    * @methodOf site.signin
*/
site.signin.getEmailAddress = function(emailNode) {
    if(!emailNode || emailNode.length < 1) {
        return null;
    }
    
    var email = emailNode[0].value || emailNode[0].innerHTML;
    return email;
};
;
(function($) {

window.site = site || {};
site.loyalty = site.loyalty || {};

site.loyalty = {
  multiImg : function(context){
    if( $('.loyalty_multi_image_tout_right').length ){
      var i=0;
      var random;
      var sequence = [];
      var position = 0;
      var time_per_image = $('[data-time_per_img]', context).attr('data-time_per_img');
      while ( i < $('.loyalty_multi_image_tout_right img').size() ){
        random = Math.floor( Math.random() * $('.loyalty_multi_image_tout_right img', context).size() )
        if ( !$('.loyalty_multi_image_tout_right img', context).eq(random).hasClass('processed') ){
          $('.loyalty_multi_image_tout_right img', context).eq(random).addClass('processed');
          sequence.push(random);
          i++;
        }
      }
      function rotate_img() {
        position = (position === sequence.length-1) ? 0 : position+1;
        $('.loyalty_multi_image_tout_right img').addClass('hidden');
        $('.loyalty_multi_image_tout_right img').eq(sequence[position]).removeClass('hidden');
        setTimeout(rotate_img, time_per_image * 1000);
      }
      rotate_img();
    }
  },
  enrollmentBtn : function(context) {
    var $joinBtn = $('.js-join-popup',context);
    $joinBtn.click(function(event) {
      event.preventDefault();
      var signedIn = site.userInfoCookie.getValue('signed_in') - 0;
      // just submit the form
      if(signedIn) {
        var params = {};
        params['_SUBMIT'] = 'loyalty_join';
        params['LOYALTY_ACTIVE_FLAG'] = '1';

        generic.jsonrpc.fetch({
          method: 'rpc.form',
          params: [params],
          onSuccess: function(jsonRpcResponse) {
            // send them to loyalty landing
            window.location.href = "/account/loyalty/index.tmpl";
          },
        });
      }
      // show a popup so the user can enter their email
      else {
        Drupal.behaviors.ELB_loyalty_offer.showSignupFormNow();
      }
    });
  },
  signInBtn : function(context) {
    var $signInBtn = $('.js-sign-in-popup',context);
    $signInBtn.click(function(event) {
      event.preventDefault();
      // trigger sign in button or send to signin
      if( $('.device-pc').length ) {
        $('.page-utilities__account-button')[0].click();
      } else {
        window.location.href = '/account/signin.tmpl';
      }
    });
  },
  checkLoyaltyPageAccess : function() {
    // a check table of products and the minimum tier needed to access the product
    // example: 36143:3 (product 36143 is restricted to tier 3 members)
    var checkTable = {};

    //product/689/36143/Product-Catalog/Skincare/By-Category/Repair-Serums/New-Dimension/Shape-Fill-Expert-Serum
    var url = window.location.pathname;
    var pathArray = window.location.pathname.split( '/' );
    // this will return 36143
    var product = pathArray[3];

    return checkTable[product] ? checkTable[product] : 0;
  },
  loyaltyNavLinks : function() {
    window.scroll(0,0);
    $('.account-utilities__account-details-elist a').each(function(index) {
      var ele = this;
      if ((window.location.hash != "") && (this.href.indexOf(window.location.hash) > -1)) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }
};

Drupal.behaviors.ELB_loyalty = {
  attach: function(context, settings) {
    var self = this;
    //site.loyalty();
    $(window).on('hashchange',function(){
      var pageMainNode = $('.page-main')
      if(pageMainNode.hasClass('loyalty-account-page')) {
        site.loyalty.loyaltyNavLinks();
      };
    }).trigger('hashchange');
  }
};

})(jQuery);
;
var site = site || {};
var generic = generic || {};

// Global variables
var profileRequests = new Array;

/**
    * Class used to handle site profiling, which involves the getting, the possible setting and the possible processing 
    *   of a user's attributes into tailored content or data for a page.
    * Public methods can be used then used to handle specific overall scenarios for a pages profiling. 
    *   Example: Setting touts on a page based on user defined skin type.
    * The profile_user config defines that rules that are ingested by this class on page load.
    * The class first looks for the config info in page_data and then will fire an rpc call if not found.
    * Arguments can be passed when initiating the class but not required.
    * @methodOf site
*/
site.profile = function( args ) {

    /**** Global vars ****/
    var options = jQuery.extend( args, {
        setStorage  : (args && args.setStorage) ? args.setStorage : true
    });

    var storage         = {};
    var hasStorage      = function() {
        return jQuery.isEmptyObject(storage) ? false : true;
    };

    /**** Global classes and functions ****/

    /**
        * Private class used to not only store the config data but also help with retrieving
        *   specific attributes and rules also.
        * @method load:
        *   - Grabs the profile config from the page and stores it when not available.
        *   - Also set the internal config obj to be used later by _getData.
        * @method attr:
        *   - Used to get specific attributes for the profile config.
        *   - An optional sub param can be set to return a value one level down of the attribute obj.
        * @method rule:
        *   - Same as the attr method except used to get specific attributes for the profile config.
        *   - An optional sub param can be set to return a value one level down of the rules obj.
        * @returns {Object} The individual config objects and helper functions.
        * @private
    */
    var _config = function() {

        var config = {};

        // Helper methods that get passed with the data obj being requested.
        var _helpers = {
            get : function(key) {
                return this[key];
            }
        };

        var _getData = function(type, key, sub) {
            var data = config[type];
            if (data) {
                // Return key config info based on sub or return {} if no key exists.
                var obj = data[key] ? sub ? data[key][sub] : data[key] : {};
                jQuery.extend(obj, _helpers);
                return obj;
            } else {
                return {};
            };
        };

        return {
            attr : function(key, sub) {
                return _getData('attributes', key, sub);
            },
            rule : function(key, sub) {
                return _getData('rules', key, sub);
            },
            load : function() {
                // Look for rules data object first in cached source, page data or cookie, or fire rpc call.
                if (jQuery.isEmptyObject(this.rules)) {
                    config = jQuery.extend(this, Drupal.settings.personal_block.profile_config);
                } else {
                    // make rpc call to get rules if not in page source.
                };
            }
        };
    }();

    /**
        * Private function used to handle the storage class.
        * site.profile defaults to having storage set to true but if not, this will
        *   not set the global storage variable which stores the storage class.
        * If setStorage is set to true and the storage class isn't available, a
        *   console message is posted.
        * @private
    */
    var _setStorage = function() {
        if (!options.setStorage) {
            return false;
        };

        if (site.profile.storage) {
            storage = site.profile.storage({
                config : _config
            });
        } else {
            console.log('Profile storage class is not loading.');
        };
    };

    /**
        * Private function used to return an object from the API results to handle all the post API needs.
        * Each rules obj in the results array is wrapped with a set of default methods.
        * Setter functions are also added to handle specific situations like 
        *   processing the rules output or map nodes to the rules obj.
        * All setter methods return the results array even if nothing is added to each rule obj.
        * @param {Array} results *REQUIRED* : Results array returned from the profile api.
        * @returns {Array} Array of results object from the api extended with helper functions.
        * @private
    */
    var _setResultHelpers = function(results) {
        if (!results) {
            return null;
        };

        var origResults = results;

        // Define the default methods that will be added to the results obj.
        var defaultMethods = {
            getValue : function(key) {
                var value = (this[key] && this[key].value) ? this[key].value : '_';
                return value;
            }
        }

        // Mapping of the defaultMethods to the global resultsArray.
        var resultsArray = jQuery.map( results, function(obj) {
            return jQuery.extend(obj, defaultMethods );
        });

        return resultsArray;
    };

    /**
        * Private class used for methods specific to calling the profile.process_rule rpc method.
        * @method call:
        *   - Handles the actual calling to the api.
        *   - Expects a set of params that can be used by calling this class and a callback.
        *   - Callback is to be used for anything that needs to happen after the rules results have been processed.
        *   - If the results from the filtering come back with rules that have all values stored, the json call is bypassed.
        * @method get:
        *   - Handles the collecting of the results data that is already stored in the cache.
        *   - Once the value is received from the cache, it is formatted to the correct obj format.
        * @method filter:
        *   - Handles the filtering of the rules that have values in the cache.
        *   - The rules that have all there values storage get pushed to the hasValues array and
        *       those that don't have all there values, including dependencies, get pushed to noValues.
        * @method format:
        *   - Handles the formatting of the params that will be passed to the API.
        *   - Expects an array of DOM nodes that have the specific rule and data attributes.
        *   - Returns a formatted obj that can be used for the profile API params.
        * @private
    */
    var _API = {
        call : function(array) {

            if (!array || !array[0]) {
                return null;
            };

            var paramObj = {
                rules : array
            };

            generic.jsonrpc.fetch({
                method: 'profile.process_rule',
                params: [paramObj],
                onBoth: function(response) {
                    var results = response.getValue();

                    if (hasStorage()) {
                        storage.set(results, true);
                    };

                    var modResults  = _setResultHelpers(results);
                    jQuery(modResults).each(function(index, result) {
                        jQuery(array).each( function(pIndex, param) {
                            if (param.rule_id == result.rule_id) {
                                if (param.callback) {
                                    param.callback(result);
                                };
                            };
                        });
                    });
                },
                onError: function () {  }
            });
        },
        setRequests : function() {
            if (!profileRequests || !profileRequests[0]) {
                return null;
            };

            // Format requests for filtering
            var params              = this.format(profileRequests);
            var filteredObj         = this.filter(params);

            // Grab stored values
            var valuesArray     = filteredObj.hasValues;
            var noValuesArray   = filteredObj.noValues;
            var storedResults   = valuesArray[0] ? this.get(valuesArray) : [];

            // If stored values exist, use the callback of each result.
            if (storedResults && storedResults[0]) {
                var modResults = _setResultHelpers(storedResults);
                jQuery(modResults).each( function(index, result) {
                  if (result.callback) {
                    result.callback(result);
                  };
                });
            };

            // If stored values don't exist, fire this.call to fetch values
            if (noValuesArray && noValuesArray[0]) {
                this.call(noValuesArray);
            };
        },
        get : function(array) {

            if (!array && !array[0]) {
                return {};
            };

            var resultsArray = [];

            jQuery.each(array, function(index, rule) {
                var ruleName    = rule.name;
                var rulesConfig = _config.rules;
                if (!ruleName || !rulesConfig) {
                    return null;
                };

                var resultObj       = {};
                var ruleInfo        = rulesConfig[ruleName];
                var outParams       = ruleInfo ? ruleInfo.out_params : [];

                for (var param in rule) {
                    if (param != 'name') {
                        resultObj[param] = rule[param];
                    }
                };

                jQuery(outParams).each( function(index, param) {
                    var paramVal = ( hasStorage() && storage.hasValue(param) ) ? storage.get(param) : '';
                    if (paramVal) {
                        resultObj[param] = {
                            "value" : paramVal
                        };
                    };
                });

                resultsArray.push(resultObj);
            });

            return resultsArray;

        },
        filter : function(array) {

            if (!array && !array[0]) {
                return {};
            };

            var valueArray    = [];
            var filteredRules = [];
            jQuery(array).each(function(index, rule) {
                var ruleName    = rule.name;
                var rulesConfig = _config.rules;

                if (!ruleName || !rulesConfig) {
                    return null;
                };

                // Make sure rules exists
                var ruleInfo = rulesConfig[ruleName];
                if (!ruleInfo) {
                    return null;
                };

                var outParams       = ruleInfo.out_params;
                var outParamsTotal  = outParams.length;

                var valueCount = 0;
                if (!rule.force_call) {
                    jQuery(outParams).each( function(index, param) {
                        if (hasStorage() && storage.hasValue(param)) {
                            valueCount++;
                        };
                    });
                };

                if (valueCount != outParamsTotal) {
                    var in_params   = ruleInfo.in_params;
                    // Add params to the rule unless none are already included.
                    rule['params']  = rule['params'] ? jQuery.extend({}, rule['params']) : {};
                    jQuery(in_params).each(function(index, param) {
                        // If storage is available and the param has any value.
                        if (hasStorage() && storage.get(param)) {
                            var sendValue = true;
                            // If param has an expiration, check expiration otherwise send value.
                            if (storage.getExp(param)) {
                                // If param value has not expired, send value to rpc otherwise don't.
                                sendValue = storage.hasValue(param) ? true : false;
                            };
                            if (sendValue) {
                                rule['params'][param] = storage.get(param);
                            };
                        };
                    });
                    filteredRules.push(rule);
                } else {
                    valueArray.push(rule);
                }
            });

            return {
                hasValues : valueArray,
                noValues  : filteredRules
            };

        },
        format : function(array) {
            if (!array || !array[0]) {
                return null;
            };

            var rulesArray = [];
            jQuery(array).each( function(index, rule) {
                var name        = rule.rule;
                var params      = rule.params;
                var rule_id     = rule.rule_id;
                var callback    = rule.callback;
                var force_call  = rule.force_call;

                // set up default rule param.
                var ruleObj = {
                    'name' : name
                };

                // add data if available
                if (params) {
                    ruleObj['params'] = params;
                };

                // add id if available
                if (rule_id) {
                    ruleObj['rule_id'] = rule_id;
                };

                // add callback if available
                if (callback) {
                    ruleObj['callback'] = callback;
                };

                // add force_call if available
                if (force_call) {
                    ruleObj['force_call'] = force_call;
                };

                rulesArray.push(ruleObj);
            });

            return rulesArray;
        }
    };

    /**
        * Private function used to return the output defined by the profile_rules config.
        * Maps any output defined in rules config to each rules obj by looking for the path_base and out params in the results.
        * The path_base is first applied to the output and then the optional out params are added if available.
        * Once the output is determined, if permutations are defined, the getPermutations function
        *   will return the permutation value from the profile_rules config, else it will return the original value.
        * @returns {String} The output set within the profile.config for the rule.
        * @private
    */
    var _getOutput = function(obj) {
        var objRule = obj.rule;
        if (!objRule) {
            return null;
        };

        var getPermutations = function(value) {
            var perm = permutations[value];
            if (perm && perm['path']) {
                return perm['path'];
            } else {
                return value;
            };
        };

        var output       = '';
        var permutations = objRule.permutations;

        // Build output
        var defaultBasePath = _config.default_path_base;
        if (defaultBasePath) {
            output += defaultBasePath;
        };

        var node = obj.node;
        if (node) {
            var nodeId = node.getAttribute('data-nid');
            output += '/' + nodeId;
        }

        var pathBase = objRule.path_base;
        if (pathBase) {
            output += pathBase + '/';
        };

        // Add params based on param seq order.
        var outParams = objRule.out_params;
        if (outParams) {
            var pOutput = '';
            jQuery(outParams).each(function(index, param) {
                var value = obj.getValue(param);
                if (value) {
                    pOutput += ( index == 0 ) ? value : ( '/' + value );
                };
            });
            var paramPath = permutations ? getPermutations(pOutput) : pOutput;
            output += paramPath;
        };
        return output ? output : '';
    }

    /**** Global initialization functions ****/
    _config.load();
    _setStorage();

    /** @scope site.profile */
    return {
        call : function(args) {
            return _API.call(args);
        },
        setRequests : function() {
            _API.setRequests();
        },
        getConfig : function() {
            return _config;
        },
        format : function(rulesArray) {
            return _API.format(rulesArray);
        },
        getOutput : function(obj) {
            return _getOutput(obj);
        },
        reset : function() {
            if (hasStorage()) {
                storage.reset();
            }
        }
    }
};
;
var site = site || {};
var generic = generic || {};
site.profile = site.profile || {};

/**
    * Class used to handle profile caching.
    * When available, site.profile will use this to store the attributes returned when a rule is processed or
    *   check the cache for a specific attribute value when needed.
    * This class is using cookie storage but other types of storage will be explored (i.e. html5 storage).
    *  @method get:
    *   - Returns the value of a specific attribute set in the profile.config when available.
    *   - Only returns values that are in the cache and not expired.
    *   - If the value is expired or not set, it will return null.
    *   - @param {String} key *REQUIRED* : Attribute name defined in profile.config
    *  @method hasValue:
    *   - Similar to get except returns a boolean instead of the value.
    *   - @param {String} key *REQUIRED* : Attribute name defined in profile.config
    *  @method set:
    *   - Method used to set a data obj or array of data objects to storage.
    *   - Does not take the expiration into account so this is a hard set.
    *   - Once a value is passed, it will format that value into a scalar or array based on the attribute config.
    *   - After the value is set, it is then sent to the cache.
    *   - Example data object format:
    *   {
    *       'SKIN_TYPE' : {
    *           value : 3
    *       }
    *   }
    *   If a value obj isn't set to the attribute, it will not be passed to the cache storage.
    *   - @param {Object} obj *REQUIRED* : Either an object or array of data objects that follows the format described.
    * @methodOf site.profile
*/
site.profile.storage = function( args ) {
    if (!args || !args.config) {
        return {};
    };

    /**** Global vars ****/
    var config = args.config;

    /**
        * Class used to handle the data handling within a cookie.
        * Once the cookie is initialized, helper functions are used to set values stored
        *   within the cookie.
        * The cookie is formatted in JSON after the value obj has been set using JSON.stringify.
        * In order to read or set a value or expiration in the cookie, JSON.parse is used to
        *   convert the string value into a javascript obj.
        * Double quotes are also removed so the value size can be kept at a minimum.
        * @private
    */
    var _cookie = {
        name  : 'PSN',
        value : {},
        attr  : {
            path    : "/",
            expires : 365
        },
        init : function() {
            if (!this.name) {
                return null;
            };
            var userCookie = generic.cookie(this.name);
            if (userCookie) {
                this.value = userCookie;
            } else {
                this.set();
            };
        },
        currentTime : function() {
            var date = new Date();
            // convert milliseconds to seconds
            return Math.floor(date.getTime() / 1000);
        },
        hasExpired : function(key) {
            var expiration = this.getExpiration(key);
            return (this.currentTime() > expiration ) ? true : false;
        },
        check : function() {
            // Makes sure cookie value is obj.
            var modVal = this.value;
            if (typeof modVal == 'string') {
                var cVal = modVal.replace(/\'/g, '"');
                modVal = JSON.parse(cVal);
                this.value = modVal;
            };
            return modVal;
        },
        set : function(val) {
            var cookieVal = val || JSON.stringify(this.value);

            // Remove array escaping, spaces and double quotes.
            var match = cookieVal.replace(/\"\[/g, '[');
            match = match.replace(/\]\"/g, ']');
            match = match.replace(/\\\"/g, '"');
            match = match.replace(/^\s/g, '');
            match = match.replace(/\"/g, "'");

            generic.cookie(this.name, match, this.attr);
        },
        setKey : function(key, val, exp) {
            var keyAbbr = _getKeyAbbr(key);
            if (!key && !keyAbbr) {
                return null;
            };
            this.init();
            this.check();
            this.value[keyAbbr] = {};
            this.setValue(key, val);
            this.setExpiration(key, exp);
            this.set();
        },
        setValue : function(key, val) {
            var keyAbbr = _getKeyAbbr(key);
            if (!keyAbbr || !this.value[keyAbbr]) {
                return null;
            };
            this.check();
            this.value[keyAbbr]['v'] = val;
            this.set();
        },
        setExpiration : function(key, exp) {
            var keyAbbr = _getKeyAbbr(key);
            if (!keyAbbr || !this.value[keyAbbr]) {
                return null;
            };
            this.check();
            var newExp = exp ? (this.currentTime() + exp) : '';
            this.value[keyAbbr]['t'] = newExp;
            this.set();
        },
        getValue : function(key) {
            this.check();
            var keyObj = this.value[_getKeyAbbr(key)] || {};
            return keyObj.v ? keyObj.v : null;
        },
        getExpiration : function(key) {
            this.check();
            var keyObj = this.value[_getKeyAbbr(key)] || {};
            return keyObj.t ? keyObj.t : null;
        }
    };

    /**
        * Private function used to return an attributes abbreviation (abbr) from the attribute config.
        * Passing the full key name will return the abbreviation or null.
        * @param {String} key *REQUIRED* : Name of the attribute set in profile.config.
        * @returns {String} The abbreviation of the attribute passed.
        * @private
    */
    var _getKeyAbbr = function(key) {
        var attrConfig = config.attributes;
        if (!key || !attrConfig) {
            return null;
        };

        return ( attrConfig[key] && attrConfig[key].abbr ) ? attrConfig[key].abbr : null;
    };

    /**
        * Private function used to return a bolean value when an attribute value is set and not expired.
        * If either of those requirements are not set, false is returned.
        * The cache method getValue is first called to see if a value is set.
        * If a value is returned, the cache method hasExpired is then called to see if it needs to reset.
        * If the value has not expired, true is returned.
        * @param {String} key *REQUIRED* : Name of the attribute set in profile.config.
        * @returns {Boolean} Whether a value is available in the cache.
        * @private
    */
    var _checkValue = function(key) {
        if (!key) {
            return false;
        };

        var keyValue = _cookie.getValue(key);
        if (keyValue) {
            var expired = false;
            if (_cookie.hasExpired(key)) {
                expired = true;
            };
            return expired ? false : true;
        } else {
            return false;
        };
    };

    /**
        * Private function used to set an attribute and reset any of it's dependent attributes.
        * The attribute key and value is passed along with an optional expiration when needed.
        * Once the key, value and optional expiration are sent to the cache obj, any dependencies
        *   are checked for and if any are returned there expirations are voided.
        * This is done to make sure the rules are properly set with the most recent information.
        * @param {String} key *REQUIRED* : Name of the attribute set in profile.config.
        * @param {String} val : Value of the attribute to be set.
        * @param {Number} exp : Optional expiration value to be sent to the cache obj.
        * @private
    */
    var _setKey = function(key, val, exp) {
        if (!key) {
            return null;
        };

        _cookie.setKey(key, val, exp);

        var cacheConfig  = config.attr(key, 'data').get('cache');
        var dependencies = cacheConfig.dependencies;
        if (dependencies && dependencies[0]) {
            jQuery(dependencies).each( function(index, dKey) {
                if (_checkValue(dKey)) {
                    _cookie.setExpiration(dKey, '');
                };
            });
        };
    };

    /**
        * Private function that returns the attribute value if available.
        * After making sure a key is passed, it goes straight to the cache obj to retrieve the value else it returns null.
        * @param {String} key *REQUIRED* : Name of the attribute set in profile.config.
        * @returns {String/Number} The value of an attribute if available.
        * @private
    */
    var _getValue = function(key) {
        if (!key) {
            return null;
        };
        return _cookie.getValue(key);
    };

    /**
        * Private function that returns the attribute expiration if available.
        * After making sure a key is passed, it goes straight to the cache obj to retrieve the expiration else it returns null.
        * @param {String} key *REQUIRED* : Name of the attribute set in profile.config.
        * @returns {String/Number} The expiration of an attribute if available.
        * @private
    */
    var _getExpiration = function(key) {
        if (!key) {
            return null;
        };
        return _cookie.getExpiration(key);
    };

    /**
        * Private function used to filter the data object(s) passed to the public set method.
        * If the obj passed is not an array, the obj is placed within one to keep the interface flexible.
        * As each method is iterated through, it makes sure each obj attribute is an object and follows the format:
        *   {
        *       'SKIN_TYPE' : {
        *           value : 3
        *       }
        *   }
        * This is done since some attributes of the obj might not be related to the actual value; example being a DOM node id.
        * If the object does, it with then check the attribute config to set the value formatting and then
        *   pass that to the _setKey function to set the attribute and any attributes.
        * @param {Object} obj *REQUIRED* : Either an object or array of data objects that follows the format described.
        * @param {Boolean} isOutParam : Boolean passed to know when a call is fired from the JSON-RPC call.
        * @private
    */
    var _setValues = function(obj, isOutParam) {
        if (!obj) {
            return null;
        };

        var array = jQuery.isArray(obj) ? obj : [obj];

        jQuery(array).each(function(index, resultObj) {
            for (var key in resultObj) {
                var result = resultObj[key];
                if (typeof result == 'object' && result.value) {
                    var cacheConfig  = config.attr(key, 'data').get('cache');
                    if (cacheConfig && !jQuery.isEmptyObject(cacheConfig)) {
                        var formattedVal = _formatValue(key, result.value, isOutParam);
                        var expiration   = isOutParam ? cacheConfig.expire : '';
                        _setKey(key, formattedVal, expiration);
                    };
                };
            };
        });
    };

    /**
        * Function used to format an attribute value by using the attribute data config.
        * Once an attribute key and value is passed, the attribute config is queried to see
        *   if the attribute data config is set.
        * If the config is set and the config contains a type not a scalar, a switch is called to 
        *   handle the other types to get the formatting information.
        * A switch is used so other format types can be added without too much issue.
        * Here is an explanation of each type:
        * @type scalar (default):
        *   - The easiest form of storage.
        *   - It just sets that value to what is passed.
        *   - No rules are applied at this point.
        * @type array:
        *   - The array format type is used for attributes with multiple values, such as a list of category ids.
        *   - The config data limit sets the size of the array while the data stack determines how the array is populated.
        *   - An array limit is needed to be set in the config or a value will not be added to the array.
        *   - Once the array is populated with the new value, it is then returned.
        * @returns {String/Number/Array} Newly formatted value.
        * @private
    */
    var _formatValue = function(key, val, isOutParam) {
        if (!key || !val) {
            return null;
        };

        var dataConfig  = config.attr(key, 'data');
        var type        = dataConfig.type;
        if (type && type != 'SCALAR') {
            var newVal = '';
            switch(type) {
                case 'ARRAY':
                    var keyVal      = _cookie.getValue(key);
                    var cacheInfo   = dataConfig.get('cache');
                    var replaceVal  = (cacheInfo.replace_on_out_param && isOutParam) ? true : false;
                    if (keyVal && !replaceVal) {
                        var insert  = true;
                        var modVal  = (typeof keyVal == 'string') ? JSON.parse(keyVal) : keyVal;
                        if (dataConfig.unique) {
                            // If unique is set, add new value to array only if it's not there already.
                            insert = ($.inArray(val, keyVal) >= 0) ? false : true;
                        };
                        if (insert) {
                            var arrayLimit  = dataConfig.limit;
                            modVal.unshift(val);
                            if ( arrayLimit && (modVal.length > arrayLimit) ) {
                                var stack = dataConfig.stack;
                                if (!stack || stack == 'FIFO') {
                                    modVal = modVal.splice(0, arrayLimit);
                                };                            
                            };
                        };
                        newVal = modVal;
                    } else {
                        if (jQuery.isArray(val)) {
                            newVal = val;
                        } else {
                            var array = new Array();
                            array.push(val);
                            newVal = array;
                        };
                    };
                    break;
            };
            return newVal;
        } else {
            return val;
        };
    };

    /**
        * Function used to reset the entire storage cache and not a single attribute.
        * Used for scenarios when the cache needs to be reset for maybe a new user at a
        *   kiosk or a scenario involving sign-in/sign-out that requires a storage reset.
        * After instantiating site.profile, you can call this when needed.
        * @private
    */
    var _reset = function() {
        // Just pass a single space to reset the cache.
        _cookie.set(' ');
    };

    /**
        * Function to remove an attribute value and timestamp stored in the PSN front-end storage.
        * Used to force the backend to reprocess an attribute by looking at the backend storage when a rule is called.
        * Calls _setKey() and passes only the attribute name, to reset the attribute.
        * @param {keys} array or string *REQUIRED* : Either a string or array of attributes values to remove.
    */
    var _deleteValues = function(keys) {
        if (!keys) {
            return null;
        };
        var array = jQuery.isArray(keys) ? keys : [keys];
        jQuery(array).each(function(index, key) {
          // If attribute exists in cookie, reset it.
          if (_getValue(key)) {
              // Reset the value and expiration to force reprocessing.
              _setKey(key, '', '');
          };
        });
    };

    /**
        * Function to reset the timestamp of an attribute stored in the PSN front-end storage.
        * Used to resend the stored attribute value to the backend for reprocessing.
        * Calls _setKey() and passes the attribute name and value if exists in storage already to reset the attribute.
        * @param {keys} array or string *REQUIRED* : Either a string or array of attributes to reset.
    */
    var _expireValues = function(keys) {
        if (!keys) {
            return null;
        };
        var array = jQuery.isArray(keys) ? keys : [keys];
        jQuery(array).each(function(index, key) {
          var val = _getValue(key);
          // If attribute exists in cookie, reset it.
          if (val) {
              // Reset the value and expiration to force reprocessing.
              _setKey(key, val, '');
          };
        });
    };

    // Init cookie class.
    _cookie.init();

    /** @scope site.profile.storage */
    return {
        get : function(key) {
            return _getValue(key);
        },
        getExp : function(key) {
            return _getExpiration(key);
        },
        hasValue : function(key) {
            return _checkValue(key);
        },
        deleteValues : function(keys) {
            _deleteValues(keys);
        },
        expireValues : function(keys) {
            _expireValues(keys);
        },
        set : function(obj, isOutParam) {
            _setValues(obj, isOutParam);
        },
        reset : function() {
            _reset();
        }
    }

};
;
var site = site || {};
var generic = generic || {};
site.profile = site.profile || {};

/**
    * Class used to handle event setting for a rule attribute.
    * After an event, say a page view or quiz completion, this class allows you to pass an
    *   attribute to the profile cache for future processing.
    * Once a value is stored, it will be sent for processing if a rule that uses that attribute is called.
    *  @method store:
    *   - The store method is the public method available to pass that attribute value.
    *   - You can send either a value obj or an array of value objects in the following format:
    *      { 'SKIN_TYPE' : 3 }
    *   - Once the value is sent, it will be formatted as per the site.profile class requirements and sent
    *       for validation and processing.
    *   - @param {Object} obj *REQUIRED* : Either an object or array of data objects that follows the format described above.
    * @methodOf site.profile
*/
site.profile.events = function( args ) {

    /**** Global vars ****/
    var options         = jQuery.extend(args, {});
    var profile         = site.profile();
    var config          = {};
    var storage         = {};

    /**
        * Load function used to store the config and storage object.
        * If either aren't loaded, they will load there respective classes.
        * The config object will either call the profile class or the global profile_config variable.
        * If the storage object isn't loaded, the site.profile.storage will be called.
        * @private
    */
    var _load = function() {
        if (jQuery.isEmptyObject(config)) {
            config = profile.getConfig() || profile_config;
        };

        if (jQuery.isEmptyObject(storage)) {
            storage = site.profile.storage ? site.profile.storage({
                config : config
            }) : {};
        };
    };

    /**
        * Function used to format and return the object passed to the public method following
        *   the requirements of the site.profile class.
        * Example:
        *   Converts:
        *       {
        *           'SKIN_TYPE' : 3
        *       }
        *   to:
        *       {
        *           'SKIN_TYPE' : {
        *               'value' : 3
        *           }
        *       }
        * @returns {Object} Newly formatted object.
        * @private
    */
    var _format = function(obj) {
        if (!obj) {
            return null;
        };

        var newObj = {};
        for (var key in obj) {
            newObj[key] = {
                value : obj[key]
            };
        };
        
        return newObj;
    };

    /**
        * Function used to check if the data value obj passed is not empty and then
        *   call the storage set method if storage is available.
        * @private
    */
    var _callStorage = function(obj) {
        if (jQuery.isEmptyObject(obj)) {
            return null;
        };

        if (!jQuery.isEmptyObject(storage)) {
            storage.set(obj);
        };
    };

    /**
        * Function used to check if the data obj passed is an array or object and
        *   then call the _callStorage function to store the attribute value.
        * _load is called before to make sure the storage is set properly.
        * @private
    */
    var _store = function(obj) {
        if (!obj) {
            return null;
        };

        _load();

        if (jQuery.isArray(obj)) {
            jQuery(obj).each(function(index, obj) {
                _callStorage(_format(obj));
            });
        } else {
            _callStorage(_format(obj));
        };
    };

    /**
        * Function used to remove the stored attribute value by calling the storage.deleteValues method.
        * Deleting an attribute clears the value and expiration so when a rule is called,
        *   the attribute will processed on the backend.
        * _load is called before to make sure the storage is set properly.
        * @private
    */
    var _delete = function(keys) {
        if (!keys) {
            return null;
        };
        _load();
        storage.deleteValues(keys);
    };

    /**
        * Function used to expire an attribute Value by calling the storage.expireValues method.
        * Resetting an attribute timestamp clears the expiration so when a rule is called,
        *   the stored attribute will processed on the backend.
        * _load is called before to make sure the storage is set properly.
        * @private
    */
    var _expire = function(keys) {
        if (!keys) {
            return null;
        };
        _load();
        storage.expireValues(keys);
    };

    // Init classes needed for events.
    _load();

    /** @scope site.profile.events */
    return {
        store : function(obj) {
            _store(obj);
        },
        expire : function(keys) {
            _expire(keys);
        },
        del : function(keys) {
            _delete(keys);
        }
    }

};;
var site = site || {};
var generic = generic || {};
site.profile = site.profile || {};

/**
    * Class used to handle the population of profile touts.
    *  @method set:
    *   - Handles populating specific DOM nodes with touts based on the rule set in the 'data-profile-rule' attribute.
    *   - Uses site.profile to gather the specific data of a user based on that 
    *       attribute and then process the results to determine the correct touts.
    *   - @param {String} data-profile-rule *REQUIRED* : Rule used for that tout. Rules are set in the profile.tmpl config.
    *   - @param {Object} data-profile-options : Used to override the results for testing or if that rule info is 
    *       already determined before firing site.profile.  Needs to be JSON formatted. Example '{ "SKIN_TYPE" : 3 }'
    * @methodOf site.profile
*/
site.profile.touts = function( args ) {

    /**** Global vars ****/
    var options     = args || {};
    var profile     = site.profile();
    var config      = profile.getConfig();

    /**
        * Private class used for methods specific to handling DOM nodes.
        * @method get:
        *   - Gets all the DOM nodes that use the attribute defined on method load and returns the array.
        *   - Uses global options.ruleAttr and if nothing is matched, will return an empty array.
        *   - @param {String} ruleAttr *REQUIRED* : Unique DOM node id used to collect rule specific nodes. 
        * @method parse:
        *   - Handles the extracting of the rules and rules data from the DOM nodes.
        *   - Iterates through each node and creates an array of rules obj to use where needed.
        *   - Returns an array unless an array of DOM nodes or a ruleAttr is not defined in options.
        *   - @param {Array}  nodes     *REQUIRED* : Array of DOM nodes that will be used to generate the rules object array.
        *   - @param {String} ruleAttr  *REQUIRED* : Unique DOM node id used to collect rule specific nodes.
        *   - @param {String} dataAttr             : Optional attribute added to each rule node that can be used to override values.
        *   - @returns {Array} Array of dom node objects that contain rules.
        * @method set:
        *   - Used by the public method 'set' to handle the setting of DOM nodes.
        *   - The profile DOM nodes are first collected then a params obj is created to submit to site.profile assigned to profile.
        *   - Once the results are returned, the DOM info is mapped back to the data.
        *   - Next, the DOM is then populated with the correct touts based on the rules used to define the output.
        *   - @param {Obj} args *REQUIRED* : Object arguments used by this.get to determine which DOM nodes to capture.
        * @private
    */
    var _nodes = {
        get : function() {
            var ruleAttr = options.ruleAttr;
            if (!ruleAttr) {
                return null;
            };
            var nodes = jQuery('[' + ruleAttr + ']');
            return nodes;
        },
        parse : function(nodes) {
            var ruleAttr    = options.ruleAttr;
            var dataAttr    = options.dataAttr;

            if ( !nodes
                 || !nodes[0]
                 || !ruleAttr ) {
                return null;
            };

            var rulesArray = [];
            jQuery(nodes).each( function(index, node) {
                var ruleId   = node.getAttribute('data-rule-id');
                var rulesObj = {
                    'node'     : node,
                    'rule'     : node.getAttribute(ruleAttr),
                    'rule_id'  : ruleId,
                    'callback' : function(result) {
                        var resultsMatch = _addNodeInfo(nodes, result);
                        _populateDOM(resultsMatch);
                    }
                };
                if (dataAttr) {
                    // expects json formatting
                    var attr = dataAttr.replace("data-","");
                    rulesObj['data'] = jQuery(node).data(attr);
                };
                rulesArray.push(rulesObj);
            });

            return jQuery(rulesArray);
        },
        set : function(args) {
            if (!args) {
                return null;
            };
    
            jQuery.extend(options, args);

            var nodes       = this.get(args);
            var rulesArray  = this.parse(nodes);

            jQuery(rulesArray).each( function(index, rule) {
                profileRequests.push(rule);
            });

            profile.setRequests();
        }
    };

    /**
        * Private function used to map each DOM node with a rule to the rules results.
        * Does the mapping by matching the node id of the nodes passed into the function with
        *   the id in the obj returned from the API.
        * If a match is made, the node and rule are added to the original obj result obj.
        * If no object is matched, the original object is just passed back.
        * @param {Array} nodes *REQUIRED* : Set of DOM nodes in an array used to match with the API results.
        * @param {Array} results *REQUIRED* : Global results array containing the rules returned from the API.
        * @returns {Object} A result object passed from the API extended with the node info for mapping.
        * @private
    */
    var _addNodeInfo = function(nodes, results) {

        if (!nodes || !results) {
            return null;
        };

        // Add results to an array if it's a single obj.
        var results = jQuery.isArray(results) ? results : [results];

        return jQuery.map(results, function(obj) {
            // Assign result object to a node if available
            if (nodes && nodes[0]) {
                jQuery(nodes).each(function(index, node) {
                    var ruleId = node.getAttribute('data-rule-id');
                    if (ruleId == obj.rule_id) {
                        var attr = options.ruleAttr.replace("data-","");
                        obj['node']     = this;
                        obj['rule']     = config.rule(jQuery(node).data(attr));
                        obj['output']   = profile.getOutput(obj);
                    };
                });
            };

            return obj;
        });
    }

    /**
        * Private function that ties into generic.templatefactory.
        * Returns a template that is then passed into a callback param.
        * @param {String} args.path *REQUIRED* : Path of the template to be retrieved.
        * @param {Function} args.callback *REQUIRED* : Functionality to be done after the template is fetched.
        * @param {Object} args.params : Optional params that can be passed into the template being fetched.
        * @private
    */
    var _getTemplate = function(args) {
        var path     = args.path;
        var callback = args.callback;
        var params   = args.params || {};

        if (!path || !callback) {
            return null;
        };

        generic.template.get({
            path     : path,
            callback : callback
        });
    };

    /**
        * Private function specific to populating the DOM using the output defined each rules object.
        * Need to pass each rules object with the output defined, which assumes is a path.
        * The callback is set to replace the node defined in the result obj with the fetched template.
        * @param {String} args.output *REQUIRED* : Path of the template to be retrieved.
        * @private
    */
    var _populateDOM = function(results) {
        if (!results) {
            return null;
        };

        jQuery(results).each( function(index, result) {
            _getTemplate({
                path     : result.output,
                callback : function(json) {

                    var jsonObj = '';
                    try {
                        jsonObj = JSON.parse(json);
                    } catch (e) {
                        //console.log('PERSONAL_BLOCK::JSON is not valid');
                        return false;
                    };
                    var html    = jsonObj.html;
                    var js      = jsonObj.js;

                    var node = result.node;
                    if (node) {
                        if (html) {
                            jQuery(node).html(html);
                        };
                    };
                    if (js) {
                       // When js is available, append it to the body to re-initialize module js.
                       var script = document.createElement("script");
                       script.type = "text/javascript";
                       try {
                         jQuery(script).append(js);
                       } catch (e) {
                         //console.log('PERSONAL_BLOCK::JSON Block js not available.');
                         return false;
                       };
                       document.body.appendChild(script);

                       Drupal.attachBehaviors();
                    };

                    // Fix for carousel bug with attachBehaviors.
                    var slideShowNodes = jQuery(node).find('.cycle-slideshow');
                    if (slideShowNodes[0]) {
                        slideShowNodes.cycle();
                    };
                }
            });
        });
    };

    /** @scope site.profile.touts */
    return {
        set : function(args) {
            _nodes.set(args);
        }
    }
};

;
jQuery( function() {

    // Call the touts class on every page load.
    var userTouts = site.profile.touts();
    userTouts.set({
        ruleAttr    : 'data-profile-rule',
        dataAttr    : 'data-profile-options'
    });

});
;
window.matchMedia=window.matchMedia||function(d){var f,e=d.documentElement,h=e.firstElementChild||e.firstChild,k=d.createElement("body"),i=d.createElement("div");i.id="mq-test-1";i.style.cssText="position:absolute;top:-100em";k.style.background="none";k.appendChild(i);return function(d){i.innerHTML='&shy;<style media="'+d+'"> #mq-test-1 { width: 42px; }</style>';e.insertBefore(k,h);f=42==i.offsetWidth;e.removeChild(k);return{matches:f,media:d}}}(document);
(function(d){function f(){t(!0)}d.respond={};respond.update=function(){};respond.mediaQueriesSupported=d.matchMedia&&d.matchMedia("only all").matches;if(!respond.mediaQueriesSupported){var e=d.document,h=e.documentElement,k=[],i=[],l=[],q={},r=e.getElementsByTagName("head")[0]||h,E=e.getElementsByTagName("base")[0],s=r.getElementsByTagName("link"),u=[],A=function(){for(var c=s.length,b=0,a,m,g,e;b<c;b++)a=s[b],m=a.href,g=a.media,e=a.rel&&"stylesheet"===a.rel.toLowerCase(),m&&(e&&!q[m])&&(a.styleSheet&&
a.styleSheet.rawCssText?(y(a.styleSheet.rawCssText,m,g),q[m]=!0):(!/^([a-zA-Z:]*\/\/)/.test(m)&&!E||m.replace(RegExp.$1,"").split("/")[0]===d.location.host)&&u.push({href:m,media:g}));z()},z=function(){if(u.length){var c=u.shift();var b=c.href,a=B();a&&(a.open("GET",b,!0),a.onreadystatechange=function(){4!=a.readyState||200!=a.status&&304!=a.status||(y(a.responseText,c.href,c.media),q[c.href]=!0,setTimeout(function(){z()},0))},4!=a.readyState&&a.send(null))}},y=function(c,b,a){var e=c.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),
g=e&&e.length||0,b=b.substring(0,b.lastIndexOf("/")),d=function(a){return a.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+b+"$2$3")},j=!g&&a,h=0,p,n,f,l;b.length&&(b+="/");for(j&&(g=1);h<g;h++){p=0;j?(n=a,i.push(d(c))):(n=e[h].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1,i.push(RegExp.$2&&d(RegExp.$2)));f=n.split(",");for(l=f.length;p<l;p++)n=f[p],k.push({media:n.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:i.length-1,hasquery:-1<n.indexOf("("),minw:n.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&
parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:n.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}t()},v,C,D=function(){var c,b=e.createElement("div"),a=e.body,d=!1;b.style.cssText="position:absolute;font-size:1em;width:1em";a||(a=d=e.createElement("body"),a.style.background="none");a.appendChild(b);h.insertBefore(a,h.firstChild);c=b.offsetWidth;d?h.removeChild(a):a.removeChild(b);return c=w=parseFloat(c)},w,t=function(c){var b=h.clientWidth,a="CSS1Compat"===
e.compatMode&&b||e.body.clientWidth||b,b={},d=s[s.length-1],g=(new Date).getTime();if(c&&v&&30>g-v)clearTimeout(C),C=setTimeout(t,30);else{v=g;for(var f in k){var c=k[f],g=c.minw,j=c.maxw,q=null===g,p=null===j;g&&(g=parseFloat(g)*(-1<g.indexOf("em")?w||D():1));j&&(j=parseFloat(j)*(-1<j.indexOf("em")?w||D():1));if(!c.hasquery||(!q||!p)&&(q||a>=g)&&(p||a<=j))b[c.media]||(b[c.media]=[]),b[c.media].push(i[c.rules])}for(f in l)l[f]&&l[f].parentNode===r&&r.removeChild(l[f]);for(f in b)a=e.createElement("style"),
c=b[f].join("\n"),a.type="text/css",a.media=f,r.insertBefore(a,d.nextSibling),a.styleSheet?a.styleSheet.cssText=c:a.appendChild(e.createTextNode(c)),l.push(a)}},B,x=!1;try{x=new XMLHttpRequest}catch(F){x=new ActiveXObject("Microsoft.XMLHTTP")}B=function(){return x};A();respond.update=A;d.addEventListener?d.addEventListener("resize",f,!1):d.attachEvent&&d.attachEvent("onresize",f)}})(this);
;
var generic = generic || {};
var site = site || {};

generic.endeca = generic.endeca || {
    catalog: {},
    result: {},
    results: {},
    resultsgroup: {},
    mixins: {},
    instances: {},
    generic: {
        Class: generic.Class || {},
        env: generic.env || {},
        rb: generic.rb || {},
        template: generic.template || {}
    },
    helpers: {
        array: {
            toInt: function( array ) {
                for ( var i = 0; i < array.length; i++ ) {
                    array[i] = parseInt( array[i] );
                }
                return array;
            },
            unique: function( array ) {
                var o = {}, a = [];
                for ( var i = 0; i < array.length; i++ ) {
                    if ( typeof o[array[i]] == 'undefined' ) { a.push( array[i] ); }
                    o[array[i]] = 1;
                }
                return a;
            },
            remove: function( array, valuesToRemove ) {
                var newArray;
                var valuesToRemove = jQuery.isArray( valuesToRemove ) ? valuesToRemove : [valuesToRemove];
                return jQuery.grep( array, function( value ) {
                    return jQuery.inArray( value, valuesToRemove ) == -1 ;
                });
            }
        }, 
        func: {
            bind: function() { 
                var _func = arguments[0] || null; 
                var _obj = arguments[1] || this; 
                var _args = jQuery.grep(arguments, function(v, i) { 
                    return i > 1; 
                }); 
            
                return function() { 
                    return _func.apply(_obj, _args); 
                }; 
            }
        },
        string: {
            toQueryParams: function( string, separator ) {
            	var string = string || '';
            	var separator = separator || '&';
            	var paramsList = string.substring(string.indexOf('?')+1).split('#')[0].split(separator || '&'), params = {}, i, key, value, pair;
            	for (i=0; i<paramsList.length; i++) {
            		pair = paramsList[i].split('=');
            		key = decodeURIComponent(pair[0]);
            		value = (pair[1])?decodeURIComponent(pair[1]):'';
            		if (params[key]) {
            			if (typeof params[key] == "string") { params[key] = [params[key]]; }
            			params[key].push(value);
            		} else { params[key] = value; }
            	}
            	return params;
            }  
        },
        obj: {
            first: function( obj ) {
                for ( var i in obj ) { return obj[i]; }
            },
            slice: function( obj, array ) {
                var h = {};
                for ( var i = 0; i < array.length; i++ ) {
                    if ( typeof obj[array[i]] != 'undefined' ) {
                        h[array[i]] = obj[array[i]];
                    }
                }
                return h;
            }
        }
    }
};

site.endeca = generic.endeca;
;


var rb = rb || {};

/**
* This method provides access to resource bundle values that have been 
* written to the HTML in JSON format. The file that outputs these values
* must be included in the .html as a script tag with the desired RB name
* as a query string paramter.
* 
* @class ResourceBundle
* @namespace generic.rb
* 
* @memberOf generic
* @methodOf generic
* @requires generic.Hash (minimal functional replication of Prototype Hash Class)
* 
* @example Inline data
* 
*    <script src="/js/shared/v2/internal/resource.tmpl?rb=account"></script>
* 
* @example Script retrival of data values
* 
*    var myBundle = generic.rb("account");
*    myBundle.get("err_please_sign_in");
*    
* 
* @param {String} rbGroupName name of resource bundle needed
* 
* @returns An object that provides the main get method
* 
*/
generic.endeca.generic.rb = function(rbGroupName) {
    
    var findResourceBundle = function(groupName) {
        
        if (groupName && rb) {
            
            var rbName = groupName;
            var rbObj = rb[rbName];
            if (rbObj) {
                return rbObj;
            } else {
                return {};
            }
        } else {
            return {};
        }

    };
    
    var resourceBundle = findResourceBundle(rbGroupName);
    
    var returnObj = {
        /**
        * @public This method will return the value for the requested Resource Bundle key.
        * If the key is not found, the key name will be returned.
        * 
        * @param {String} keyName key of desired Resource Bundle value
        */
        get: function(keyName) {
            if ( typeof(keyName) != "string" ) {
                return null;
            }
            var val = resourceBundle[keyName];
            if (val) {
                return val;
            } else {
                return keyName;
            }
        }
    };
    
    return returnObj;

};


/**
 * Minimal Native Version of Prototype Class
 * 
 * @deprecated Jquery extend method has options for deep copy extensions
 * 
 * @class Class
 * @namespace generic.Class
 * 
 */

generic.endeca.generic.Class = { // Uppercase 'Class', avoid IE errors

    fn : function(src,props) {
    
        var tgt,prxy,z,fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    
            tgt = function(){ // New Constructor
            // Initialize Method is a Requirement of Class
                // With the inclusion of the _super method, initialize in the superclass should only be called on demand
                /*if(tgt.superclass&&tgt.superclass.hasOwnProperty("initialize")){
                    tgt.superclass.initialize.apply(this,arguments);
                }*/
                if(tgt.prototype.initialize){
                    tgt.prototype.initialize.apply(this,arguments);
                } 
            };
        
            // Preserve Classical Inheritance using Proxy Middle
            src = src || Object;
            prxy = function(){}; /* Potentially define "Class" here */
            prxy.prototype = src.prototype;
            tgt.prototype = new prxy();
            tgt.superclass = src.prototype;
            tgt.prototype.constructor = tgt;
    
            // give new class 'own' copies of props and add _super method to call superclass' corresponding method
            for(z in props){
                if ( typeof props[z] == "function" && typeof tgt.superclass[z] == "function" && fnTest.test(props[z]) ) {
                    tgt.prototype[z] = ( function( z, fn ) {
                        return function() {
                            this._super = tgt.superclass[z];
                            var ret = fn.apply( this, arguments );
                            return ret;
                        };
                    })( z, props[z] )
                } else {
                    tgt.prototype[z] = props[z];
                }
                /*if(props.hasOwnProperty(z)){tgt.prototype[z]=props[z];}*/
            }
    
        return tgt;
    
    }, 
    create : function(){

        var len = arguments.length, args = Array.prototype.slice.call(arguments), fn = generic.endeca.generic.Class.fn;
        
            if(len==2) {  tgt = generic.endeca.generic.Class.fn(args[0],args[1]); }
            else if(len==1) {  tgt = generic.endeca.generic.Class.fn(null,args[0]); } 
            else { tgt = function(){}; /* return empty constructor */ }

        return tgt; // return constructor that stacks named Class w/ object-literal, works with instanceof
    
    }, // End Create Method    
    mixin: function( baseClass, mixin ) {
        var newClass = baseClass;
        if ( mixin && mixin.length ) { 
            for ( var i=0; i < mixin.length; i++ ) {
                newClass = generic.endeca.generic.Class.mixin( newClass, mixin[i] );
            }
        } else {
            if ( mixin ) { newClass = generic.endeca.generic.Class.create( newClass, mixin ); }
        }
        return newClass;
    }  
};


generic.endeca.generic.env = { 
    isIE : !!(typeof(ActiveXObject) == 'function'),
    isIE6 : !!(!!(typeof(ActiveXObject) == 'function') && (/MSIE\s6\.0/.test(navigator.appVersion))),
    isFF : !!(typeof(navigator.product) != 'undefined' && navigator.product == 'Gecko' && !( (document.childNodes) && (!navigator.taintEnabled)) && /firefox/.test(navigator.userAgent.toLowerCase()) ),
    isFF2 : !!(typeof(navigator.product) != 'undefined' && navigator.product == 'Gecko' && !((document.childNodes) && (!navigator.taintEnabled)) && navigator.userAgent.toLowerCase().split(' firefox/')[1] && navigator.userAgent.toLowerCase().split(' firefox/')[1].split('.')[0] == '2'),
    isFF3 : !!(typeof(navigator.product) != 'undefined' && navigator.product == 'Gecko' && !((document.childNodes) && (!navigator.taintEnabled)) && navigator.userAgent.toLowerCase().split(' firefox/')[1] && navigator.userAgent.toLowerCase().split(' firefox/')[1].split('.')[0] == '3'),
    isMac    : !!(/macppc|macintel/.test(navigator.platform.toLowerCase())),
    isSafari : !!(/Safari/.test(navigator.userAgent)),
    
    domain : window.location.protocol + "//" + window.location.hostname,
    
    debug: true, //JSTest check subdomain

    parsedQuery : function () {
    	
        var query = window.location.search.toString().split('?')[1] || "";
        var splitStr = query.split('&'); 
    	var key, value, keyNameVar, tempObj, tempStr; 

    	var a = {}; a.n = {};
    			
    	var main = function() {

    		var params = {};
    		var returnArr = [];
			var arr = [];

    		if(!query) return; 
    		
    		for(var i = 0; i < splitStr.length ; i++) {
    		
    			// just take the key
    			key = splitStr[i].split('=')[0];
    			value = splitStr[i].split('=')[1];

    			var rx = new RegExp(key);
    			var c = splitStr[i].match(rx);
    			
    			if(eval('a.n.'+c)) { // if namespace already exists
    				eval('a.n.'+c+'.e += 1'); 
    				eval('a.n.'+c+'.v.push(value);');
    			}
    			else { // first-time penalty
    				eval('keyNameVar = { v:[], key:"'+c+'" };'); 
    				eval('a.n.'+c+' = keyNameVar;'); 
    				eval('a.n.'+c+'.e = new Number(0); a.n.'+c+'.v.push(value);');
    			}
    			
    		}
    		
    		for(var namespace in a.n) {

    			// if duplicate keys
    			if(a.n[namespace].e>0) {
    				
    				for(var n = 0; n <= a.n[namespace].e; n++) {
    					arr.push(a.n[namespace].v.pop());
    				} // end for-loop
    					
    				a.n[namespace].v = arr;	
    			}

    			tempObj = a.n[namespace].v;
    			if(tempObj.length>1) { eval('params.'+namespace+'=tempObj'); } 
    			else { tempStr = tempObj[0]; eval('params.'+namespace+'=tempStr'); }
    		}

    		return params;	
    	}

    	var parameters = main() || {};
    	return parameters;
    	
    },
    query: function(key) { 
        var result = generic.endeca.generic.env.parsedQuery()[key] || null;
        return result; 
    }
};


/**
 * Template.js
 * 
 * @memberOf generic
 * 
 * @class TemplateSingleton
 * @namespace generic.template
 * 
 * @requires object literal with parameters
 * 
 * @param path attribute as a literal key is required
 * @example "/templates/cart-overlay.tmpl",
 * 
 * @param {string} templateString takes first priority
 * @example templateString:'#{product.url} some-page-markup-with-#{product.url}'
 * 
 * @param {boolean} forceReload
 * 
 * @param {function} callback
 * @example
 * 
 * callback:function(html) {
 *    // Front-End Resolution
 *    jQuery('#container').html(html);
 * }
 * 
 * @param {object} query object hash with object-literals, array-literals that can be nested
 * @example example structure
 * query: {
 *    a:'',b:{},c:[],d:{[]} // keys rooted to named parent if object or array-objects are nested
 * }
 * 
 * @param {object} Hash of string-literals with string values that map to the template
 * @example
 * 
 * object: {
 *    'product.PROD_RGN_NAME':'replacement',
 *    SOME_VAR:'replacement'
 * }
 * 
 * @example Usage
 * 
 * generic.template.get({
 *    path:"/some/path/to/template.tmpl",
 *    ...
 * });
 * 
 * @param {HTML} (optional) Markup based inline template
 * @required The path attribute must match the path key passed to the get method.
 * 
 * @example Inline Template Example
 * 
 * <!-- -------------------------- Inline Template ------------------------------ -->
 * 
 * <script type="text/html" class="inline-template" path="templates/foo.tmpl">"
 *         <div>#{FIRST_NAME}</div>
 *         <div>#{SECOND_NAME}</div>
 * </script>
 * 
 * Inline Templates : Valid inline template via script tag in this format, aside
 * from the templateString parameter, will be the first candidate for the template,
 * then the cache, then ajax.
 * 
 * 
 * @returns {object} An object that refers to a singleton which provides
 * the primary get api method.
 * 
 */

generic.endeca.generic.template = ( function() {

    var that = {};
    var templateClassName = ".inline-template";
    var templates = {}; 
    
    // mustache stuff
    var translations;
    var partials;
    // end mustache stuff

    /**
     * This method loads a pre-interpolation template into the object's internal cache. This cache is checked before attempting to pull the template from the DOM or load it via Ajax.
     * @param (String) key The name that is used to retrieve the template from the internal cache. Typically mathces the path for Ajax-loaded templates.
     * @param (String) html The non-interpoltaed content of the template.
     * @returns (Strin) the HTML that was originally passed in
     * @private
     */
    var setInternalTemplate = function(key, html) {
        templates[key] = html;
        return html;
    };

    var getInternalTemplate = function(key) {
        var template = templates[key];
        
        if ( !template && site.templates && site.templates[key] ) {
            templates[key] = site.templates[key].content;
            template = templates[key];
        }
        
        return template;
    };
    
    var returnTemplate = function(args) {
        var html = args.template;
        
        html = interpolate({ template: html, recurseParams: { object: args.object, rb: args.rb }, Lre: /\[jsInclude\]/i, Rre: /\[\/jsInclude\]/i });
        
        if ( typeof args.rb === "object" ) { html = interpolate({ template: html, obj: args.rb, Lre: /\[rb\]/, Rre: /\[\/rb\]/ }); }
        
        //if ( typeof args.object === "object" ) { html = interpolate({ template: html, obj: args.object }); }
        
        if ( typeof args.object === "object" ) {
            try {
                if ( html.match(/\{\{.*\[/) && html.match(/\].*\}\}/)  ) {
                    throw "generic.template: template expects array notation, defaulting to non-mustache rendering";
                }
                
                translations = translations || {
                    globals: {
                        t: site.translations || {}
                    }
                };
                
                var obj = $.extend( {}, args.object, translations );
                
                html = Mustache.to_html( html, obj, templates );
            } catch (e) {
                console.log(e);
                html = interpolate({ template: html, obj: args.object });
            }
        }
        
        return html;
        
    };

    var interpolate = function( args ) {
        var args = args || {};
        
        args.Lre = args.Lre || /\{\{/;
        args.Rre = args.Rre || /\}\}/;
        
        var obj = args.obj || args.rb || {};
        var tmpl = args.template || "", 
            recurseParams = args.recurseParams || null,
            Lre = new RegExp(args.Lre), 
            Rre = new RegExp(args.Rre), 
            tmplA = [], 
            temp, lft, rght;

        tmplA = tmpl.replace(/[\r\t\n]/g," ").split(Lre); // array of (.+?)} with '}' marking key vs rest of doc

        var returnString = "";
        for(var x = 0; x < tmplA.length; x++) {
            var chunk = tmplA[x];
            var splitChunk = chunk.split(Rre);

            if (typeof splitChunk[1] !== "undefined") { // close tag is found
                var valueToInsert = "";
                
                if ( recurseParams ) {
                    recurseParams['path'] = splitChunk[0];
                    valueToInsert = that.get(recurseParams);
                } else {
                
                    // First check array notation for property names with spaces
                    // Then check object notation for deep references
                    valueToInsert = eval("obj['" + splitChunk[0] +"']" ) || eval("obj." + splitChunk[0] );
                    if (typeof valueToInsert === "undefined" || valueToInsert === null) {
                        valueToInsert = '';
                    }
                }
                
                chunk = valueToInsert.toString() + splitChunk[1];
            }
            returnString += chunk;
        }
        return returnString;
    };

    that.get = function( args ) {
        var key = args.path;
        var callback = args.callback;
        var forceReload = !!args.forceReload;
        var objectParam = args.object;
        var rbParam = args.rb;
        var template = getInternalTemplate(key);
        
        var html;
      
        if (template && !forceReload) {  // internal template found and OK to use cache
            html = returnTemplate({
                template: template,
                object: objectParam,
                rb: rbParam,
                callback: args.callback
            })
        } else {  // no internal template found or not OK to use cache
            // attempt to retrieve from DOM
            var matchingTemplateNode = null;
            jQuery(templateClassName).each( function() {
                if ( jQuery(this).html() && ( jQuery(this).attr("path")==key) ) { 
                    matchingTemplateNode = this;
                }
            });
            if (matchingTemplateNode) { // inline template found in DOM
                template = setInternalTemplate( key, jQuery(matchingTemplateNode).html() );
                html = returnTemplate({
                    template: template,
                    object: args.object,
                    rb: rbParam,
                    callback: args.callback
                });
            }
        }
        
        if ( typeof args.callback === "function" ) { args.callback(html); }
        else { return html; }

    };
    
    that.loadMustacheMappings = function( args ) {
        var args = args || { mappings: {} };
        
        if ( args.mappings ) {
            for ( var key in args.mappings ) {
                if ( args.mappings.hasOwnProperty(key) && site.templates[ args.mappings[key] ] ) {
                    // These need to be mapped in both direction to handles partials
                    templates[ key ] = site.templates[ args.mappings[key] ].content;
                    templates[ args.mappings[key] ] = site.templates[ args.mappings[key] ].content;
                }
            }
        }
    }

    return that;

})();;
generic.endeca.catalog = site.endeca.generic.Class.create({
	initialize: function( args ) {
        this.jsonResult = null;
        this.resultList = [];
        jQuery.extend( this, args || {} );
        
        if ( this.jsonResult ) { this.parseData(); }
	},
	
    parseData: function() {
        if ( this.jsonResult.AggrRecords ) {
            for ( var i = 0; i < this.jsonResult.AggrRecords.length; i++) {
                for ( var j = 0; j < this.jsonResult.AggrRecords[i].Records.length; j++ ) {
                    this._parseRecord( this.jsonResult.AggrRecords[i].Records[j] );
                }
            }
        } else if ( this.jsonResult.Records ) {
            for ( var i = 0; i < this.jsonResult.Records.length; i++ ) {
                this._parseRecord( this.jsonResult.Records[i] );
            }
        }
	}
});

site.endeca.catalog = generic.endeca.catalog;;
generic.endeca.catalog.content = site.endeca.generic.Class.create( site.endeca.catalog, {	
	_parseRecord: function( record ) {
	    this.resultList.push({
	        "Properties": {
    	        "image": site.endeca.generic.rb('endeca').get('content.image_url'),
    	        "title": record.Properties.p_PROD_RGN_NAME,
    		    "description": record.Properties.p_DESCRIPTION,
    		    "link": record.Properties.p_url,
    		    "link_text": site.endeca.generic.rb('endeca').get('content.link_text'),
    		    "Zone": 'crawlData'
    		}
        });
	}
});


site.endeca.catalog.content = generic.endeca.catalog.content;
;
//
// EndecaCatalog class.
// This class parses the Endeca JSON data into category, product, and sku objects,
// and maintains lists (hashes) for each type.  You can then access each list by id,
// such as:
//		var catObj = this.categoryList[catid];
// The structure of the lists/objects is essentially the same as the "CatProdData" class
// of the CL-US project.  Thus, each product object also contains a "skus" list which
// is a list of references to sku objects (also on the skuList) which are skus for that
// product.  Thus, when you get a product object from the productList, that product
// object will have a list of all it's skus (at least the skus that were included
// in the data).
//
// There is a "rec_type" property on each data record that indicates either "product"
// or "content".  "product" record types have cat/prod/sku data, and are stored as such.
// "content" records are not products, and the data for these records is stored
// essentially verbatim on the "contentList" hash.  Typically content records are
// things like articles and videos on the site.
//
// NOTE - this class is intended only to be a convenient container for the data
// returned from an Endeca query.  Please do not add page/state data to this class.
//
// A discussion of the Endeca data format is at the end of this file.
//	

generic.endeca.catalog.product = site.endeca.generic.Class.create( site.endeca.catalog, {

	initialize: function(args) {
		
		this.categoryList = {};
		this.productList = {};
		this.skuList = {};
		
		this.parseOrderHi = 0;
		this.parseOrderLo = 0;
		
		this._super(args);
		
		this.resultList = this.getProducts();
	},
	
	_parseRecord: function( record ) {
	    if ( record.Properties["rec_type"] == 'product'  ) {
            var props = { 'c': {}, 'p': {}, 's': {} };
            
            props['p']['matched'] = 1;
            props['s']['matched'] = 0;
	        
	        for ( var prop in record.Properties ) {
	            var propValue = record.Properties[prop];
	            
	            if ( propValue && propValue != "" && !isNaN( propValue ) ) {
	                if ( propValue.match(/\./) ) { propValue = parseFloat(propValue); }
	                else { propValue = parseInt(propValue); } 
                }
                
                if ( prop.match(/_json/i) ) { 
                    prop = prop.replace(/_json/i, '');
                    propValue =  jQuery.parseJSON( propValue );
                }
                
                if ( prop.match(/^([a-z])_/) ) {
                    props[RegExp.$1] = props[RegExp.$1] ? props[RegExp.$1] : [];
                    props[RegExp.$1][prop.substr(2)] = propValue;
                }
                
                if ( prop == "DGraph.WhyDidItMatch" ) {
                    props['s']['matchedOn'] = propValue;
                    
                    var matchedOnString = typeof propValue == "object" ? propValue.join() : propValue;
                    
                    if ( matchedOnString.match(/s_/) ) {
                        props['p']['matched'] = 0;
                        props['s']['matched'] = 1;
                    } 
                }
	        }
            
            this.addProps( props['c'], props['p'], props['s'] );
	    }
	},

	//from legacy
	addProps: function ( catProps, prodProps, skuProps, insert ) {
		// For now, i'm using id's, but we may want to use the "path", which is more specific...
		var catId = catProps.CATEGORY_ID;
		var prodId = prodProps.PRODUCT_ID;
		var skuId = skuProps.SKU_ID;
		
		// I'm paranoid - check for id's
		if ( !catId || !prodId || !skuId ) return;
		
		// Insert/update sku object
		var skuObj = this.skuList[skuId] || {};
		this.skuList[skuId] = jQuery.extend(skuObj,skuProps);
		
		// If existing product record, use that and update.
		// Else create new one.
		var prodObj = this.productList[prodId] || { parseOrder: ++this.parseOrderHi };
		
		// If inserting, parse order should be negative.
		if ( insert && prodObj.parseOrder > 0 ) {
			prodObj.parseOrder = --this.parseOrderLo;
		}
		
		prodObj = jQuery.extend(prodObj,prodProps);
		if ( !prodObj.skus )
			prodObj.skus = [];
		if ( !prodObj.skuList )
			prodObj.skuList = {};
		// Make sure each sku is listed only once per product
		if ( !prodObj.skuList[skuId] ) 
			prodObj.skus.push(skuObj);
		prodObj.skuList[skuId] = skuObj;
		this.productList[prodId] = prodObj;
		
		skuObj.product = prodObj;
		
		var catObj = this.categoryList[catId] || {};
		catObj = jQuery.extend(catObj,catProps);
		if ( !catObj.prods ) catObj.prods = [];
		catObj.prods.push(prodObj);		
		this.categoryList[catId] = catObj;
	},
	
	
	// Return an array of product objects, sorted by parseOrder
	getProducts: function() {
	    function sortByParseOrder( a, b ) {
		    if ( a.parseOrder > b.parseOrder ) { return 1; }
		    else if ( a.parseOrder < b.parseOrder ) { return -1; }
            return 0;
		}
		
		function sortByDisplayOrder( a, b ) {
		    if ( a.DISPLAY_ORDER > b.DISPLAY_ORDER ) { return 1; }
		    else if ( a.DISPLAY_ORDER < b.DISPLAY_ORDER ) { return -1; }
            return 0;
		}
		
		var prods = [];
	    
	    for ( var prodId in this.productList ) {
	        this.productList[prodId].skus.sort(sortByDisplayOrder);
	        prods.push( this.productList[prodId] );
	    }
	    
	    prods.sort(sortByParseOrder);
		
		return prods;
	},
	
	// Return an array of sku objects
	getSkus: function() {
		var skus = [];
		for ( var sku in this.skuList ) {
		    skus.push( this.skuList[sku] );
		}
		return skus;
	},
	
	getCategory: function(catid) {
		var catObj = ( this.categoryList ? this.categoryList[catid] : null );
		return catObj;
	},
	
	getProduct: function(prodid) {
		var prodObj = ( this.productList ? this.productList[prodid] : null );
		return prodObj;
	},
	
	getSku: function(skuid) {
		var skuObj = ( this.skuList ? this.skuList[skuid] : null );
		return skuObj;
	}
	
});

site.endeca.catalog.product = generic.endeca.catalog.product;


/*
The Endeca data arrives as a JSON hash.  Each record in the hash is a complete sku record,
including all the category, product, and sku properties for that sku.

When we request the data, we request a rollup on PRODUCT_ID.  This groups the
data by product.  The "parent" product is called the "Aggregate Record" (in Endeca-land).
Thus, in the hash, the first sku is the "AggrRecord" (which is a sku representative of
the rolled-up product record), and all the other skus (if any) then follow that record.

Because Endeca flattens the entire database into sku-specific records, before sending
the data to Endeca, we pre-pend each property name with a "c_", "p_", or "s_", to indicate
if that property is a Category, Product, or Sku property (respectively). Then, when
we parse out each Endeca record, we can split the record into category, product, and
sku properties.  As we parse the data, we create a category, product, and sku object
for each sku, and then merge that object into the list of cats/prods/skus in our
EndecaCatalog class.

Note that because a product often has multiple skus, we will see the same product id
more than once as we process those skus.  Thus, we want to "update" the product record
in our list with the new sku info, and not just "add" the product record (since that would
potentially create duplicate product records).  A similar scenario may occur if a
product belongs to more than one category.

Here is a very simplified synopsys of the Endeca data JSON format:

	AggrRecords: [
		{	-- new product
			Records: [
				{
					Properties: {
						c_*
						p_*
						s_*
					}
				}
				{
					Properties: {
						c_*
						p_*
						s_*
					}
				}
			]
		}
		{	-- new product
			Records: [
				{
					Properties: {
						c_*
						p_*
						s_*
					}
				}
				{
					Properties: {
						c_*
						p_*
						s_*
					}
				}
			]
		}
	]
*/
	
;
/*
    Base endeca control class.
    
    This is the base class that will control all instances of endeca. All instances of endeca will have a control
    class that inherits from this base class.

*/

generic.endeca.control = site.endeca.generic.Class.create({
    initialize: function( args ) {            
        this.configuration = args || site.endeca.configuration;
        
        this.queryString = site.endeca.generic.env.query('qs') || "";
        this.searchTerm = site.endeca.generic.env.query('search') || "";
        
        this.hasResults = false;
        this.hasSearched = 0;
        this.wildcardSearch = false;
        
        this.customClasses = {};
        this.results = {};
        this.queries = {};
        this.catalogs = {};
        this.nodes = {};
        
        if ( this.configuration.mustacheMappings ) { this.loadMustacheMappings(); }
        if ( this.configuration.queries ) { this.generateQueries(); }
        if ( this.configuration.results ) { this.generateResults(); }
        if ( this.configuration.nodes ) { this.generateNodes(); }
        
        if ( this.configuration.coremetricsEnabled ) {
            site.endeca.coremetrics.initialize({ enabled: true });
        }

        if ( this.configuration.omnitureEnabled ) {
            if (site.endeca.omniture) {
                site.endeca.omniture.initialize({ enabled: true });
            }
        }
        
    },
    
    loadMustacheMappings: function () {
        if ( this.configuration.mustacheMappings ) {
            site.endeca.generic.template.loadMustacheMappings({ mappings: this.configuration.mustacheMappings });
        }
    },
    
    generateQueries: function() {
        /*
            Take the information provided from the configuration and instantiate all of the necessary queries for this
            class. Queries will be accessible from this.queries[queryName].
            
        */
        
        for ( var query in this.configuration.queries ) {
            this.queries[query] = new site.endeca.query( jQuery.extend(
                { callbackCompleted: site.endeca.helpers.func.bind( this.searchCompleted, this ) }, this.configuration.query,
                this.configuration.queries[query] || {}
            ));
        }
    },
    
    generateResults: function() {
        /*
            Create custom classes for each of the results configuration objects.
        */
        
        for ( var resultsName in this.configuration.results ) {
            // Allow for optional childClass setting in configuration
            this.configuration.results[resultsName].childClass = this.configuration.results[resultsName].childClass || "";
            
            /* 
                Determine which mixins we should be using for this custom class:
                
                1. Use the mixinKey provided in the configuration for this class.
                2. Remove 'site.endeca' from the childClass string and use the remainder as the mixinKey: 
                    childClass = 'site.endeca.results.products', mixinKey = 'results.products'
                3. Remove 'site.endeca' from the baseClass string and add on the resultName as the mixinKey
                    baseClass = 'site.endeca.results', resultsName = 'products', mixinKey = 'results.products'
                4. Remove 'site.endeca' from the baseClass string as the mixinKey
                    baseClass = 'site.endeca.results', mixinKey = 'results'
                
            */
            
            var mixins =    this.configuration.mixins[this.configuration.results[resultsName].mixinKey] || 
                            this.configuration.mixins[this.configuration.results[resultsName].childClass.replace(/site\.endeca\./, '')] ||
                            this.configuration.mixins[this.configuration.results[resultsName].baseClass.replace(/site\.endeca\./, '') + '.' + resultsName] ||
                            this.configuration.mixins[this.configuration.results[resultsName].baseClass.replace(/site\.endeca\./, '')];

            var baseClass = eval(this.configuration.results[resultsName].baseClass);
            
            // Use childClass provided in configuration or
            // Use resultsName to retrieve childClass from baseClass or
            // use an empty object
            var childClass = eval(this.configuration.results[resultsName].childClass) || baseClass[resultsName] || {};
            
            // Create a custom class created from the baseClass, appropriate mixins, and the childClass
            this.customClasses[resultsName] = site.endeca.generic.Class.create( site.endeca.generic.Class.mixin( baseClass, mixins ), childClass );
            
            // Instantiate custom class in this.results[resultsName]
            // Pass in the mixins from configuration for use in result(s) generation
            // Pass in any configuration settings specified in the configuration file for this class
            // Pass in any instanceArgs specified in the configuration file for this class
            this.results[resultsName] = new this.customClasses[resultsName]( jQuery.extend( {}, { mixins: this.configuration.mixins, configuration: this.configuration.results[resultsName].configuration || {} }, this.configuration.results[resultsName].instanceArgs || {} ) );
        }
    },
    
    generateNodes: function() {
        for ( var nodeName in this.configuration.nodes ) {
            this.nodes[nodeName] = this.configuration.nodes[nodeName];
        }
    },
    
    search: function( args ) {
        var args = args || {
            searchTerm: null,
            queryString: null
        };
        
        this.hasSearched++;
        
        this.showLoading();
        this.resetQueries();
        
        // Get searchTerm from queryString here in order to synchronize all queries on the same search term
        var queryString = args.queryString || this.queryString || '';
        var searchTerm = queryString ? site.endeca.helpers.string.toQueryParams( queryString )['Ntt'] : ( args.searchTerm || this.searchTerm || '' );
        
        for ( var query in this.queries ) {
            this.queries[query].searchTerm = searchTerm;
            this.queries[query].queryString = this.queries[query].noQueryString ? '' : queryString;
            this.queries[query].prepare();
            this.queries[query].execute();
            
            this.searchTerm = this.queries[query].searchTerm;
        }
    },
    
    searchCompleted: function( args ) {
        if ( this.queriesCompleted() ) {
            this.resetResults();
            
            for ( var query in this.queries ) {
    		    this.catalogs[query] = new site.endeca.catalog[query]({ jsonResult: this.queries[query].jsonResult });
    		}
    		
            this.meta = new site.endeca.meta({ query: this.queries.product, jsonResult: this.queries.product.jsonResult, searchKey: this.queries.product.searchKey, configuration: { followRedirects: this.configuration.followRedirects, contentzones: this.configuration.contentzones } });
            
            if ( this.meta.redirecting ) { return false; }
            
            this.hideLoading();
            
            return true;
        }
        
        return false;
    },
    
    
    
    queriesCompleted: function() {
        for ( var query in this.queries ) {
            if ( !this.queries[query].completed ) { return false; }
        }
        return true;
    },
    
    processCoremetrics: function( args ) {
        var args = args || {
            pageView: true
        };
        // this should be called from your searchCompleted in your instance's control subclass.
        if ( this.configuration.coremetricsEnabled ) { 
            site.endeca.coremetrics.reset();
            site.endeca.coremetrics.pageView = args.pageView;
            site.endeca.coremetrics.productCount = this.meta.searchInfo.totalProductRecords;
            site.endeca.coremetrics.contentCount = this.meta.searchInfo.totalContentRecords;
            site.endeca.coremetrics.searchTerm = this.meta.searchInfo.correctedTerms && this.meta.searchInfo.correctedTerms.length ? this.meta.searchInfo.correctedTerms[0] : this.queries.product.parsedSearchTerm();
            site.endeca.coremetrics.wildcardSearch = this.wildcardSearch;
            site.endeca.coremetrics.numberOfPages = this.meta.pagination ? this.meta.pagination.numberOfPages : 1;
            site.endeca.coremetrics.currentPage = this.meta.pagination ? this.meta.pagination.numberOfCurrentPage : 1;
            if ( this.meta.dimensions.breadcrumbs ) {
                for ( var i = 0; i < this.meta.dimensions.breadcrumbs.length; i++ ) {
                    for ( var j = 0; j < this.meta.dimensions.breadcrumbs[i]["Dimension Values"].length; j++ ) {
                        site.endeca.coremetrics.addRefinement({
                            dimensionName: this.meta.dimensions.breadcrumbs[i]["Dimension Name"],
                            refinement: this.meta.dimensions.breadcrumbs[i]["Dimension Values"][j]["Dim Value Name"]
                        });
                    }
                }
            }
            site.endeca.coremetrics.setPageView(); 
        }
    },

    processOmniture: function() {
        // this should be called from your searchCompleted in your instance's control subclass.
        if ( this.configuration.omnitureEnabled ) {
            site.endeca.omniture.reset();

            // Will use tms_page_data instead of site.endeca because that brings this data under the helm of the Generic
            // Data Dictionary for tagging.
            site.endeca.omniture.productCount = this.meta.searchInfo.totalProductRecords;
            site.endeca.omniture.contentCount = this.meta.searchInfo.totalContentRecords;
            site.endeca.omniture.searchTerm = this.meta.searchInfo.correctedTerms && this.meta.searchInfo.correctedTerms.length ? this.meta.searchInfo.correctedTerms[0] : this.queries.product.parsedSearchTerm();
            site.endeca.omniture.numberOfPages = this.meta.pagination ? this.meta.pagination.numberOfPages : 1;
            site.endeca.omniture.currentPage = this.meta.pagination ? this.meta.pagination.numberOfCurrentPage : 1;

            if ( this.meta.dimensions.breadcrumbs ) {
                var lastBC = this.meta.dimensions.breadcrumbs[ this.meta.dimensions.breadcrumbs.length - 1 ];
                var lastBCVal = lastBC["Dimension Values"][ lastBC["Dimension Values"].length - 1 ];
                site.endeca.omniture.refineSearch( lastBCVal["Dim Value Name"] );
            } else {
                site.endeca.omniture.searchResults();
            }
        }
    },
    
    
    showLoading: function() {
        if ( this.nodes.loading ) {
            this.nodes.loading.show();
        }
    },
    
    hideLoading: function() {
        if ( this.nodes.loading ) {
            this.nodes.loading.hide();
        }
    },
    
    displayResults: function() {
        if ( this.hasResults ) {
            if ( this.results.bestsellers ) { this.results.bestsellers.hide(); }
            if ( this.results.content ) { this.results.content.show(); }
            if ( this.nodes.resultsContainer ) { this.nodes.resultsContainer.show(); }
            if ( this.nodes.noResultsContainer ) { this.nodes.noResultsContainer.hide(); }
	        this.processCoremetrics();
                this.processOmniture();
            this.wildcardSearch = false;
            return true;
        } else {
            if ( this.wildcardSearch ) {
                if ( this.nodes.resultsContainer ) { this.nodes.resultsContainer.hide(); }
                if ( this.nodes.noResultsContainer ) { this.nodes.noResultsContainer.show(); }
                if ( this.results.content ) { this.results.content.hide(); }
                if ( this.results.bestsellers ) {
            	    this.results.bestsellers.displayResults();
            	    this.results.bestsellers.show();
                }
	            this.processCoremetrics();
                    this.processOmniture();
                this.wildcardSearch = false;
                return true;
            } else {
                this.wildcardSearch = true;
                this.search({ searchTerm: this.searchTerm + '*' });
                return false;
            }
        }
    },  
         
    
    resetQueries: function() {
        for ( var query in this.queries ) {
            this.queries[query].reset();
        }
    },
    
    resetResults: function() {  
        this.hasResults = false;
        for ( var resultsName in this.results ) {
            this.results[resultsName].reset();
        }
    }
});

site.endeca.control = generic.endeca.control;
;
/**

Is this a GENERIC file - if values need to be modified, they either need to be passed in from control.js OR this file can be extended at the instance level (see example in sites/clinique/na/js/pc/site/endeca/instances/foundation_finder/option/coremetrics.js)

**/

generic.endeca.coremetrics = {
    enabled: false,
    category_id: "search",
    page_id: "Search Results",
    productCount: 0,
    contentCount: 0,
    searchTerm: null,
    refinementsList: [],
    numberOfPages: 1,
    currentPage: 1,
    pageView: true,
    dimensionNameMap: {
        "Skin Type" : "Typ",
        "Skin Tone" : "Ton"
    },
    wildcardSearch: false,
    
    initialize: function( args ) {
        jQuery.extend( this, args );
    },
    
    addRefinement: function ( args ) {
        var args = args || {};
        if ( args.dimensionName && args.refinement ) {
            var dimensionName;
            if ( this.dimensionNameMap[args.dimensionName] ) {
                dimensionName = this.dimensionNameMap[args.dimensionName];
            } else {
                var dimensionNameWords = args.dimensionName.split(' ');
                dimensionName = dimensionNameWords.shift().substr(0,3);
                for ( var i = 0; i < dimensionNameWords.length; i++ ) {
                    dimensionName += dimensionNameWords[i].charAt(0);
                }
            }
            
            this.refinementsList.push( dimensionName + ':' + args.refinement );
        }
    },
    
    setPageView: function () {
        if ( this.pageView ) {            
            var PAGE_ID = this.page_id + " " + this.currentPage;
            var CATID = this.category_id;
            var KEYWORDS = this.searchTerm;
            var RESULTS = this.contentCount + this.productCount;
            var FILTERLIST = this.refinementsList.join(' > ');
            
            if ( FILTERLIST ){
                PAGE_ID = 'Search Results Filtered ' + this.currentPage;
            }
            
            if ( this.contentCount > 0 && this.productCount == 0 ) {
                KEYWORDS = '*' + KEYWORDS;
            }
            
            if ( typeof cmCreatePageviewTag == 'function' ) {
                cmCreatePageviewTag( PAGE_ID, KEYWORDS, CATID, RESULTS.toString(), FILTERLIST );
            }
            
            if ( this.wildcardSearch ) {
                if ( typeof cmCreateConversionEventTag == 'function' ) {
        	        cmCreateConversionEventTag("RESULTS PAGE", 1, "ENDECA WILDCARD SEARCH", 1);
        	    }
            } else {
                if ( typeof cmCreateConversionEventTag == 'function' ) {
        	        cmCreateConversionEventTag("RESULTS PAGE", 1, "NO ENDECA WILDCARD SEARCH", 1);
        	    }
            }
        }
    },
    
    contentClick: function() {
        if ( typeof cmCreatePageElementTag == 'function' ) {
            cmCreatePageElementTag("CONTENT", "SEARCH DROPDOWN");
        }
    },
    
    productClick: function() {
        cmCreatePageElementTag("PRODUCTS", "SEARCH DROPDOWN");
        if ( this.wildcardSearch ) {
            if ( typeof cmCreateConversionEventTag == 'function' ) {
	            cmCreateConversionEventTag("SEARCH DROPDOWN", 1, "ENDECA WILDCARD SEARCH", 1);
	        }
        } else {
            if ( typeof cmCreateConversionEventTag == 'function' ) {
	            cmCreateConversionEventTag("SEARCH DROPDOWN", 1, "NO ENDECA WILDCARD SEARCH", 1);
	        }
        }
    },
    
    seeAllClick: function() {
        if ( typeof cmCreatePageElementTag == 'function' ) {
            cmCreatePageElementTag("SEE ALL","SEARCH DROPDOWN");
        }
    },
    
    reset: function() {
        this.refinementsList = [];
        this.pageView = true;
    }
};

site.endeca.coremetrics = generic.endeca.coremetrics;;
site.endeca.omniture = {
    enabled: false,
    page_id: "Search Results",
    productCount: 0,
    contentCount: 0,
    searchTerm: null,
    refinementsList: [],
    numberOfPages: 1,
    currentPage: 1,
    
    initialize: function( args ) {
        jQuery.extend( this, args );
    },
    
    searchResults: function () {
        var PAGE_ID = this.page_id + " " + this.currentPage;
        var KEYWORDS = this.searchTerm;
        var RESULTS = this.contentCount + this.productCount;
        
        if ( this.contentCount > 0 && this.productCount == 0 ) {
            KEYWORDS = '*' + KEYWORDS;
        }
        
        omnidata = [KEYWORDS, this.contentCount, this.productCount, PAGE_ID];
        tms_page_data.tms_page_info['SEARCH'] = omnidata; 
        jQuery(window).trigger("OMNISEARCH", [omnidata]);
        // console.log("SC PAGE VIEW");
    },
    
    refineSearch: function( refinementName ) {
        omnidata = [refinementName, this.productCount];
        tms_page_data.tms_page_info['FILTERSEARCH'] = omnidata;
        jQuery(window).trigger("FILTERSEARCH",[omnidata]);
        // console.log("SEARCH FILTER EVENT",omnidata);
    },
    
    contentClick: function() {
        
    },
    
    productClick: function(productid) {
         // console.log("product ",productid); 
         jQuery(window).trigger("SEARCHPRODUCTCLK",[productid]);
    },
    
    seeAllClick: function() {
        jQuery(window).trigger("SEARCHALLCLK"); 
    },
    
    reset: function() {
        this.refinementsList = [];
    }
};
;
/*
    Endeca Meta class.
    This provides a convenience wrapper for parsing and normalizing the metadata of Endeca results.
    After parsing, we can access the properties we care about as valid js properties.
    There is no other use for this class (please don't add page/state specific
    code in this module).

*/

generic.endeca.meta = site.endeca.generic.Class.create({
    initialize: function( args ) {
        this.jsonResult = null;
        this.searchKey = "all";
        this.redirecting = false;
        
        this.pagination = null;
        this.sorting = [];
        this.dimensions = {};
        this.metaInfo = {};
        this.searchInfo = {};
        this.supplementalObjects = [];
        this.supplementalContent = {};
        
        jQuery.extend( this, args );
        
        if ( this.jsonResult ) { this.parseData(); }
    },
    
    parseData: function( args ) {
        this.processSupplemental();
        this.processMetaInfo();
        this.processSearchInfo();
        this.processPagination();
        this.processSorting();
        this.processDimensions();
    },
    
    processMetaInfo: function() {
        this.metaInfo = this.jsonResult.MetaInfo || this.metaInfo;
        
        this.numberOfPages = this.getMetaProp( "Number of Pages" , 1 );
  		this.recordsReturned = this.getMetaProp( "Number of Records Returned", 0 );
  		this.recordsPerPage = this.getMetaProp( "Number of Records per Page", 0 );
  		this.totalMatchRecords = this.getMetaProp( "Total Number of Matching Records", 0 );
  		this.totalAggrRecords = this.getMetaProp( "Total Number of Matching Aggregate Records", 0 );
    },
    
    processSearchInfo: function( args ) {
        var args = args || { totalContentRecords: 0 };
        var searchInfo = this.jsonResult && this.jsonResult["Search Info"] && this.jsonResult["Search Info"][this.searchKey] ? this.jsonResult["Search Info"][this.searchKey] : {};
        this.searchInfo.searchTerm = searchInfo["Search Term"] || "";
        
        if ( this.searchInfo.searchTerm.match(/\*$/) ) {
            this.searchInfo.searchTerm = this.searchInfo.searchTerm.slice(0,-1);
        }
        
        this.searchInfo.totalContentRecords = args.totalContentRecords || 0;
        this.searchInfo.totalProductRecords = this.totalAggrRecords || this.totalMatchRecords;
        
        this.searchInfo.contentResultText = this.searchInfo.totalContentRecords == 1 ? site.endeca.generic.rb('endeca').get('content_result') : site.endeca.generic.rb('endeca').get('content_results');
        this.searchInfo.productResultText = this.searchInfo.totalProductRecords == 1 ? site.endeca.generic.rb('endeca').get('product') : site.endeca.generic.rb('endeca').get('products');
        
        this.searchInfo.totalRecords = parseInt(this.searchInfo.totalContentRecords) + parseInt(this.searchInfo.totalProductRecords);
        this.searchInfo.resultText = this.searchInfo.totalRecords == 1 ? site.endeca.generic.rb('endeca').get('result') : site.endeca.generic.rb('endeca').get('results');
        
        this.searchInfo.startingRecord = this.searchInfo.totalProductRecords ? this.getMetaProp( "Starting Record Number", 1 ) : 0;
  		this.searchInfo.endingRecord = this.getMetaProp( "Ending Record Number", 1 );
        
        this.searchInfo.originalRecords = this.searchInfo.totalRecords;
        this.searchInfo.originalResultText = this.searchInfo.resultText;
        
        
        // If we matched on a computed phrase AFTER the spell correction,
		// then the "Spell Correction" flag is not set properly.
		// Also, the "New Term" will have quotes around it, which further
		// messes up the comparison.  So... to test for spell correction,
		// see if the user's search term is NOT within the corrected term.
		this.searchInfo.correctedTerms = [];
		if ( searchInfo["Spell Correction"] ) {
		    for ( var i = 0; i < searchInfo["Spell Correction"].length; i++ ) {
                if ( searchInfo["Spell Correction"][i]["New Term"].toLowerCase().indexOf( this.searchInfo.searchTerm.toLowerCase() ) < 0 && 
                     searchInfo["Spell Correction"][i]["AutoPhrasing"] == "false" ) {
                    this.searchInfo.correctedTerms.push( searchInfo["Spell Correction"][i]["New Term"] );
                }
            }
		}
        
        if ( this.searchInfo.correctedTerms.length ) { 
            this.searchInfo.originalRecords = 0;
            this.searchInfo.originalResultText = this.searchInfo.originalRecords == 1 ? site.endeca.generic.rb('endeca').get('result') : site.endeca.generic.rb('endeca').get('results');
        }
        
        
  		// Quirk: With computed phrases turned on, if the user enters
  		// an exact phrase that we have in our search config, we'll get
  		// a dym entry of the quoted phrase.  Since this is confusing and unnecessary,
  		// we'll just skip those dym's.
  		
        this.searchInfo.didYouMean = [];
		if ( searchInfo["DYM Information"] ) {
            for ( var i = 0; i < searchInfo["DYM Information"].length; i++ ) {
                if (    searchInfo["DYM Information"][i]["New Term"].toLowerCase().indexOf( this.searchInfo.searchTerm.toLowerCase() ) < 0 && 
                     searchInfo["DYM Information"][i]["AutoPhrasing"] == "false" ) {
                    this.searchInfo.didYouMean.push( {
                        "Selection Link": searchInfo["DYM Information"][i]["Pivot Link"],
                        "Term": searchInfo["DYM Information"][i]["New Term"]
                    });
                }
            }
        }
    },
    
    processPagination: function() {
        if ( this.numberOfPages > 1 ) {
            var viewAllQuery = new site.endeca.query( jQuery.extend( true, {}, site.endeca.configuration.query, { recordsPerPage: 10000 } ) );
            
            this.pagination = {
                numberOfPages: this.numberOfPages,
                numberOfCurrentPage: this.getMetaProp ( "Page Number" , 1 ),
                viewAllLink: this.query.getMergedQueryString( viewAllQuery.toQueryString() ),
                previousPageLink: this.getMetaProp( "Previous Page Link" ),
                nextPageLink: this.getMetaProp( "Next Page Link" ),
      		    directPageLinks: this.getMetaProp( "Direct Page Links", '' )
            };
      	}
      	
      	/** Do we want to merge the select link? If so, we can do that here:
      	if ( this.numberOfPages > 1 ) {
            var query = new site.endeca.query({ recordsPerPage: 10000 });
            
            this.pagination = {
                numberOfPages: this.numberOfPages,
                numberOfCurrentPage: this.getMetaProp ( "Page Number" , 1 ),
                viewAllLink: { "Selection Link": query.toQueryString() },
                previousPageLink: { 'Selection Link': this.getMetaProp( "Previous Page Link" ) },
                nextPageLink: { 'Selection Link': this.getMetaProp( "Next Page Link" ) },
      		    directPageLinks: this.getMetaProp( "Direct Page Links", '' )
            };
            
            for ( var i = 0; i < this.pagination.directPageLinks.length; i++ ) {
                this.pagination.directPageLinks[i] = { "Selection Link": this.pagination.directPageLinks[i], "Content": i+1 };
            }
      	}
      	**/
    },
    
    processSorting: function() {
        var addSort = this.getMetaProp ( "Add Sort Key Links", [] );
        var sortedBy = this.getMetaProp ( "Sorted By", [] );
        
        if ( addSort.length ) {
            this.sorting = this.sorting.concat( addSort );
        }
        
        if ( sortedBy.length ) {
            this.sorting = this.sorting.concat( sortedBy );
        }
    },
    
    processDimensions: function() {        
        var breadcrumbs = [];
        var refinements = [];
        
        if ( this.jsonResult.Breadcrumbs ) {
            for ( var i = 0; i < this.jsonResult.Breadcrumbs.length; i++ ) {
                var bc = this.jsonResult.Breadcrumbs[i];
                if ( bc && bc["Type"] == 'Navigation' ) {
                    for ( var j = 0; j < bc["Dimension Values"].length; j++ ) {
                        bc["Dimension Values"][j]["Removal Link"] = this.query.getMergedQueryString( bc["Dimension Values"][j]["Removal Link"], parseInt( bc["Dimension Values"][j]["Dim Value ID"] ) );
                    }
                    breadcrumbs.push(bc);
                }
            }
        }
        
        if ( this.jsonResult.Refinements ) {
            for ( var i = 0; i < this.jsonResult.Refinements.length; i++ ) {
                var ref = this.jsonResult.Refinements[i];
                if ( ref && ref["Dimensions"] && ref["Dimensions"][0] && ref.Dimensions[0]["Dimension Values"] ) {
                    for ( var j = 0; j < ref.Dimensions[0]["Dimension Values"].length; j++ ) {
                        ref.Dimensions[0]["Dimension Values"][j]["Selection Link"] = this.query.getMergedQueryString( ref.Dimensions[0]["Dimension Values"][j]["Selection Link"] );
                    }
                    refinements.push(ref["Dimensions"][0]);
                }
            }
        }
        
        if ( breadcrumbs.length ) { this.dimensions.breadcrumbs = breadcrumbs; }
        if ( refinements.length ) { this.dimensions.refinements = refinements; }
    },
    
    processSupplemental: function() {
        this.supplementalObjects = this.jsonResult["Supplemental Objects"] || this.supplementalObjects;
        
        for ( var i = 0; i < this.supplementalObjects.length; i++ ) {
            var supplementalObject = this.supplementalObjects[i];
            if ( supplementalObject.Properties ) {
                if ( supplementalObject.Properties["DGraph.KeywordRedirectUrl"] && this.configuration.followRedirects ) {
                    this.redirecting = true;
                    document.location.href = supplementalObject.Properties["DGraph.KeywordRedirectUrl"];
		            return false;
				}
				if ( supplementalObject.Properties["DGraph.SeeAlsoMerchId"] ) {
				    var zone = supplementalObject.Properties.Zone;
				    
				    var content = this.supplementalContent[zone] || { records: [] };
				    content.style = supplementalObject.Properties.Style;
				    
				    if ( !supplementalObject.Properties[ 'suppress_' + ( jQuery.cookie('LOCALE') || 'en_US' ) ] ) {
				        content.records.push( supplementalObject );
				    
				    }
                    this.supplementalContent[zone] = content;
				}
            }
        }
    },
    
    // Convenience function to look for prop and return default if not found
	getMetaProp: function( property, def ) {
		var val = ( this.metaInfo[property] || def );
		if ( !isNaN(val) ) {
			val = parseInt(val);
		}
		return val;
	}
    
});

site.endeca.meta = generic.endeca.meta;
;
/*
    Endeca query class
        
*/

var Drupal = Drupal || {};
Drupal.settings = Drupal.settings || {};
Drupal.settings.endeca = Drupal.settings.endeca || {};

generic.endeca.query = site.endeca.generic.Class.create({
    initialize: function( args ) {
        this.configuration = args || {};
        
        this.sessionId = Math.floor(Math.random()*999999)+1;
        
        this.url = '/enrpc/JSONControllerServlet.do';
        this.urlParams = {};
        
        this.queryString = null;
        this.searchTerm = '';
        this.searchKey = 'all';
        this.searchMode = 'matchallpartial';
        
        this.searchDimensions = true;
        this.computePhrasings = true;
        this.didYouMean = true;
        
        this.recordsPerPage = 10;
        this.pageNumber = 1;
        
        this.sortKey = null;
        
        this.rollup = true;
        this.rollupId = 'p_PRODUCT_ID';
        this.rollupDetail = true;
/*

// Moved to site-level configuration.js

        this.defaultRangeFilters = {
            skuShoppable: 's_shoppable|GT+0',
            skuPromotional: 's_promotional|GT+0',
            skuSearchable: 's_searchable|GT+0',
            productTrFlag: 'p_TR_FLAG|LT+1',
            productDisplayable: 'p_displayable|GT+0',
            productShoppable: 'p_shoppable|GT+0'
        };
        this.rangeFilters = ['skuSearchable'];
        this.additionalRangeFilters = [];
                
        this.defaultRecordFilters = {
            products: 'rec_type:product',
            content: 'rec_type:content',
            locale: 'locale:' + site.endeca.generic.cookie('LOCALE'),
            activeSkus: 'NOT(s_INVENTORY_STATUS:5)',
            discontinued: 'NOT(s_discontinued:1)',
            shoppableOrComingSoon: 'OR(s_shoppable:1,s_isComingSoon:1)'
        };
        this.recordFilters = [];
        this.additionalRecordFilters = [];
*/

        // These should be configured in the sitewide configuration.js file.
        
        this.configuredRangeFilters = {} // collection of pre-built range filters 
        this.defaultRangeFilters = []; // which pre-built range filters to use on this query
        this.rangeFilters = []; // pre-built range filters applied via instance configuration
        this.additionalRangeFilters = []; // endeca sytnax range filters applied via instance configuration
        
        this.configuredRecordFilters = {}; // collection of pre-built record filters        
        this.defaultRecordFilters = []; // which pre-built record filters to use on this query
        this.recordFilters = []; // pre-built record filters applied via instance configuration
        this.additionalRecordFilters = []; // endeca sytnax record filters applied via instance configuration
        
        this.recordId = null; // only set this if you want to only retrieve this specific record
        
        this.configureLocale( { 
            'props': [ 'MDEXHost', 'MDEXPort', 'logHost', 'logPort', 'defaultDimensionIds' ],
            'locale': jQuery.cookie('LOCALE') || Drupal.settings.endeca.locale || 'en_US'
        } );
                
        jQuery.extend( this, this.configuration );
        
        this.recordFilters.push('locale'); //always filter by locale
        
        this.completed = 0; //indicates whether the query is new or not
        this.exportUrlParams = [ 'N', 'Ne', 'Nao', 'Ntt', 'D', 'M' ];
        
        this.setupServer();
	},
	
	reset: function() {
	    this.urlParams = {};
	    this.queryString = null;
	    this.jsonResult = null;
	    this.completed = 0;
	},
	
	prepare: function() {
	    this.setupServer();
	    
	    if ( this.recordId ) { this.setupRecordId(); }
        else if ( this.searchTerm ) {   
            this.searchTerm = jQuery.trim( this.parsedSearchTerm() );
            if ( this.computePhrasings ) { this.setupPhraseComputation(); }
            if ( this.didYouMean ) { this.setupDidYouMean(); }
            if ( this.searchDimensions ) { this.setupDimensionSearch(); }
            this.setupSearch();
        }
        
        if ( this.pageNumber ) { this.setupPage(); }
        if ( this.sortKey ) { this.setupSort(); }
        if ( this.rollup ) { this.setupRollUp(); }
        this.setupNavigation();
        this.setupRangeFilters();
        this.setupRecordFilters();
        
        if ( this.queryString ) { 
            this.queryString = decodeURIComponent(this.queryString);
            this.processQueryString();
        } else {
            this.setupDimensionIds();
        }
	},
	
	execute: function() {
		var url = this.url + '?' + this.toQueryString();
		jQuery.ajax({
            url: url,
	  		type: 'get',
	  		context: this,
	  		complete: this.onComplete
	  	});
	},
	
	onComplete: function(t) {
	    this.completed = 1;
		this.rawResult = t.responseText;
		this.jsonResult = jQuery.parseJSON( this.rawResult );
		this.callbackCompleted();
	},
	
    toQueryString: function( args ) {
	    var args = args || {};
	    var queryString = args.urlParams ? jQuery.param(args.urlParams) : jQuery.param(this.urlParams);
	    queryString = queryString.replace(/%2B/gi, '+'); //Endeca is picky about pluses being unencoded
	    return queryString;
	},
	
	processQueryString: function() {
	    this.urlParams = jQuery.extend( true, this.urlParams, site.endeca.helpers.string.toQueryParams( this.queryString ) );
        this.searchTerm = this.urlParams['Ntt'] || '';
        this.setupDimensionIds();
        this.setupRangeFilters();
        this.setupRecordFilters();
	},
	
	/** 
	    Return a new query string reflecting the merging of the current instance's query string and the passed in query string
        Used when preparing a new query for the url with the existing query instance
	 **/
	getMergedQueryString: function( queryString, dimIdsToRemove ) {
	    var newUrlParams = site.endeca.helpers.string.toQueryParams( queryString );
	    
        // If there is no record offset in the new query, add one.
	    if ( !newUrlParams['Nao'] ) { newUrlParams['Nao'] = 0; } 
	    
	    var mergedUrlParams = jQuery.extend(true, {}, this.urlParams, newUrlParams );
	        
	    // Merge Dimension Ids
	    var Ne = this._getDimensionIds({ urlParams: newUrlParams, oldDimensionIds: this.urlParams['Ne'] });
	    Ne = site.endeca.helpers.array.remove( Ne, this.defaultDimensionIds );
	    // For nested dimensions, make sure to remove the selected dimension (this mainly applies to breadcrumbs)
	    Ne = dimIdsToRemove ? site.endeca.helpers.array.remove( Ne, dimIdsToRemove ) : Ne;
	    mergedUrlParams['Ne'] = Ne.join('+');
	    
	    return this.toQueryString({ urlParams: site.endeca.helpers.obj.slice( mergedUrlParams, this.exportUrlParams ) });
	},
	
	setupServer: function() {
	    this.urlParams['M'] = 'host:' + this.MDEXHost + '|port:' + this.MDEXPort + '|recs_per_page:' + this.recordsPerPage;
	    this.urlParams['L'] = 'SESSION_ID:' + this.sessionId + '|host:' + this.logHost + '|port:' + this.logPort;
	},
	
	setupRecordId: function() {
	    this.urlParams['R'] = this.recordId
	},
	
	setupNavigation: function() {
	    this.urlParams['N'] = this.defaultNavigation ? this.defaultNavigation.join('+') : '';
	},
	
	setupDimensionIds: function() {
	    var NeString = this._getDimensionIds({ urlParams: this.urlParams });
	    if ( NeString.length ) { this.urlParams['Ne'] = NeString.join('+') }
	},
	
	setupSearch: function( args ) {
	    var args = args || {};
	    
	    this.urlParams['Ntt'] = args.searchTerm || this.searchTerm
	    this.urlParams['Ntk'] = this.searchKey
	    this.urlParams['Ntx'] = this.searchMode.match(/mode\+/) ? this.searchMode : ('mode+' + this.searchMode)
	},
	
	setupDimensionSearch: function( args ) {
	    var args = args || {};
	    
	    this.urlParams['D'] = args.searchTerm || this.searchTerm
	    this.urlParams['Dx'] = this.searchMode.match(/mode\+/) ? this.searchMode : ('mode+' + this.searchMode)
	    
	    /* Currently unused. Allows searching of specific dimensions: Di=DIMID+DIMID+DIMID
	    this.queryString += 'Di=';
	    */
	},
	
	setupPhraseComputation: function() {
	    this.urlParams['Ntpc'] = 1
	    this.urlParams['Ntpr'] = 1
	},	
	
	setupDidYouMean: function() {
        this.urlParams['Nty'] = 1  
	},
	
	setupSort: function() {
	    this.urlParams['Ns'] = this.sortKey
	},
	
	setupRollUp: function() {
	    this.urlParams['Nu'] = this.rollupId
	    
	    // type of rollup.  1 = summary only, 2 = all records
	    this.urlParams['Np'] = this.rollupDetail ? 2 : 1
	},
	
	setupPage: function() {
	    // This is actually a record offset, not a page number
	    this.urlParams['Nao'] = (this.pageNumber - 1) * this.recordsPerPage
	},
	
	setupRangeFilters: function() {
	    var filters = this._getFilters(this.defaultRangeFilters, this.rangeFilters, this.additionalRangeFilters, this.configuredRangeFilters);
	    	    
	    if (filters.length) {
	        this.urlParams['Nf'] = filters.join('|')
	    }	    
	},
	
	setupRecordFilters: function() {
        var filters = this._getFilters(this.defaultRecordFilters, this.recordFilters, this.additionalRecordFilters, this.configuredRecordFilters);
	    
	    if (filters.length) {
	        this.urlParams['Nr'] = 'AND(' + filters.join(',') + ')'
	    }
	},
	
	_getFilters: function(defaultFilters, filters, additionalFilters, configuredFilters) {
	    var filterArray = [];
	    
	    jQuery.each( filters, function( index, filter ) {
	         filterArray.push( configuredFilters[filter] );
	    });
	    
	    jQuery.each( defaultFilters, function( index, filter ) {
	         filterArray.push( configuredFilters[filter] );
	    });
	    
	    jQuery.each( additionalFilters, function( index, filter ) {
	        filterArray.push(filter);
	    });
	    
	    return filterArray;
	},
	
	_getDimensionIds: function( args ) {	    
	    var Ne = [];
	    
	    if ( args.oldDimensionIds ) { Ne = Ne.concat( args.oldDimensionIds.split('+') ) }
	    if ( args.addDefaultDimensionIds ) { Ne = Ne.concat( (args.oldDimensionIds).split('+') ) }
	    Ne = Ne.concat( args.urlParams && args.urlParams['Ne'] ? (args.urlParams['Ne']).split('+') : [] );
	    Ne = Ne.concat( this.defaultDimensionIds );
	    Ne = site.endeca.helpers.array.toInt( Ne );
	    Ne = site.endeca.helpers.array.unique( Ne );
	    
	    return Ne;
	},
	
	parsedSearchTerm: function( args ) {
	    var args = args || {};
	    var searchTerm = args.searchTerm || this.searchTerm;
	    
	    var parsedSearchTerm;
	    try {
	        parsedSearchTerm = decodeURIComponent( searchTerm )
	    } catch (e) {
	        parsedSearchTerm = searchTerm;
	    }
	    parsedSearchTerm = parsedSearchTerm.replace(/\+/g, " ");
	    return parsedSearchTerm.match(/[<>\/]/) == null ? parsedSearchTerm : '';
	},
	
	configureLocale: function( args ) {
	    var args = args || { 'props': [], 'locale': '' };
	    
	    for ( var i = 0; i < args.props.length; i++ ) {
	        if (    typeof this.configuration[ args.props[i] ] == "object" && 
	                typeof this.configuration[ args.props[i] ][ args.locale ] != "undefined" ) {
	            this.configuration[ args.props[i] ] = this.configuration[ args.props[i] ][ args.locale ];
	        }
	    }
	}
   
});


site.endeca.query = generic.endeca.query;
;
/*
    Endeca result class
    This class represents ONE result ( dom element ) on the page. Each of these results represents one item returned from endeca (product result, content result, refinement link, etc)
    
    Required Arguments:
        resultData: data describing the result, must be a JS obj
        templatePath: path of the template to populate with the resultData
        parentNode: node for the template to be inserted into
        
    this.node will represent the node that has been inserted into the page after the template is rendered.
    

*/

generic.endeca.result = site.endeca.generic.Class.create({
    initialize: function( args ) {
        this.parentNode = null;
        this.node = null;
        this.resultData = null;
        this.templatePath = null;
        
        jQuery.extend( this, args || {} );
    },
    
    displayResult: function( args ) {
        var args = args || {};
        var parentNode = args.parentNode || this.parentNode;
        var that = this;
        site.endeca.generic.template.get({ 
            path: that.templatePath,
            object: args.resultData || that.resultData,
            rb: rb ? rb.endeca : null,
            callback: function(html) {
                html = jQuery.trim(html);
                if ( html ) {
                    that.node = jQuery(html);
                    if ( parentNode && that.node ) {
                        parentNode.append( that.node );
                    }
                    that.displayResultCallback(args);
                }
            }
        });
    },
    
    displayResultCallback: function( args ) { /* Define this in your subclass */ },
    
    reset: function() {
        if ( this.node && this.parentNode && this.node != this.parentNode ) {
            this.node.remove();
        } else {
            this.parentNode.empty();
        }
    },  
    
    hide: function() {
        this.parentNode.hide();
    },
    
    show: function() {
        this.parentNode.show();
    }
});

site.endeca.result = generic.endeca.result;
;
/*
    Endeca results class
    This class represents a container of result classes (refinements, products, etc).
    
    Required Arguments:
        resultData: array describing the results
        templatePath: path of the template to be used for each result created
        parentNode: node for each result node to be inserted into
    Optional Arguments:
        containerTemplatePath: path to a container template. If provided, this.node will be set to the inserted element. 
        
    
    Optional CSS Selectors:
        results-header: this.headerNode will be set to a child of this.parentNode with class results-header
        results: this.contentNode will be set to a child of this.parentNode with class results. If there is no element with .results, this.node will be set as the contentNode.
        
        
    this.node will represent either of the following:
        1. If you provided a containerTemplatePath, this.node will be the inserted container
        2. If containerTemplatePath has not been provided, this.node will be set to this.parentNode
    

*/

generic.endeca.results = site.endeca.generic.Class.create({
    initialize: function( args ) {
        this.parentNode = null; // Node in which this results container will be inserted
        this.node = null; // Container node for results data - same as this.parentNode if there is no template in this class
        this.headerNode = null; // Header node for results data header, eg "Product Results", Refinement Headers
        this.contentNode = null; // Container node for individual result classes
        
        this.resultData = [];
        this.resultNodes = [];
        
        this.resultClass = null;
        
        this.configuration = {};
        this.mixins = {};
        
        jQuery.extend(this, args);
    },
    
    setupNodes: function( args ) {
        var args = args || {};
        var parentNode = args.parentNode || this.parentNode;
        var containerTemplatePath = args.containerTemplatePath || this.containerTemplatePath;
        this.node = parentNode || args.node;
        if ( this.node ) {
            if ( containerTemplatePath ) { this.loadContainer( { parentNode: parentNode, containerTemplatePath: containerTemplatePath } ); }
            this.headerNode = this.node.find('.results-header:first').length ? this.node.find('.results-header:first') : null;
            this.contentNode = this.node.find('.results:first').length ? this.node.find('.results:first') : this.node;
        }
    },
    
    /*
        create result classes for each element in the resultData array. 
    */
    displayResults: function( args ) {
        var args = args || {};
        args.childClass = args.childClass || this.childClass;
        
        this.setupNodes( args );
        
        var resultData = args.resultData || this.resultData;
        
        var that = this;
        jQuery.each( resultData, function(index, result) {
            that.createResult( jQuery.extend( args, {
                result: result,
                index: index
            }));
        });
    },
    
    loadContainer: function( args ) {
        var args = args || {};
        var templatePath = args.containerTemplatePath || this.containerTemplatePath;
        var that = this;
        site.endeca.generic.template.get({
            path: templatePath,
            object: args.resultData || that.resultData,
            rb: rb ? rb.endeca : null,
            callback: function(html) {
                html = jQuery.trim(html);
                if ( html ) {
                    that.node = jQuery(html);
                    if ( args.parentNode && that.node ) {
                        args.parentNode.append( that.node );
                    }
                }
            }
        });
    },
    
    createResult: function( args ) {
        var args = args || {};
        
        this.setResultClass( args );
        
        var result = new this.resultClass({
            parent: this,
            templatePath: args.templatePath || this.templatePath,
            resultData: args.result,
            parentNode: args.contentNode || this.contentNode,
            configuration: args.configuration || this.configuration,
            mixins: args.mixins || this.mixins
        });
        this.resultNodes.push( result ); 
    },
    
    /*
        Determine which class to use in displayResults.
        This will usually be specified in the subclass inheriting from this class. 
    */
    setResultClass: function ( args ) {
        var args = args || {};
        var baseClass = args.baseClass || this.baseClass || site.endeca.result;
        
        if ( !this.resultClass ) {
            args.childClass = args.childClass || this.childClass || "";
            var mixins = args.mixins || this.mixins[ this.resultMixinKey ] || this.mixins['result.' + args.childClass] || this.mixins['result'] || {};
            this.resultClass = args.childClass && baseClass[args.childClass] ? site.endeca.generic.Class.create( site.endeca.generic.Class.mixin( baseClass, mixins ), baseClass[args.childClass] ) : site.endeca.generic.Class.mixin( baseClass, mixins );
        }
    },
    
    displayResultNodes: function () {
        for ( var i = 0; i < this.resultNodes.length; i++ ) {
            this.resultNodes[i].displayResult();
        }
        
        if ( this.resultNodes.length ) {
            if ( this.resultNodes[0].node ) { this.resultNodes[0].node.addClass('first'); }
            if ( this.resultNodes[this.resultNodes.length-1].node ) { this.resultNodes[this.resultNodes.length-1].node.addClass('last'); }
        }
    },
    
    hide: function() {
        this.parentNode.hide();
    },
    
    show: function() {
        this.parentNode.show();
    },
        
    reset: function() {
        if ( this.containerTemplatePath ) { 
            if ( this.node ) { this.node.remove(); }
        } else { 
            if ( this.contentNode ) { this.contentNode.empty(); }
            else if ( this.node ) { this.node.empty(); }
        }
        
        this.resultData = [];
        this.resultNodes = [];
    }
});

site.endeca.results = generic.endeca.results;
;
/*
    Endeca resultsgroup class
    This class represents a group of results classes (all refinments, all pagination blocks, all content zones, etc).
    This class inherits from generic.endeca.results, overwriting the createResult function in order to create new results classes as opposed to new result classes.
    
    Additionally, when instantiating this class, you can pass in an obj called resultsArgs, the contents of which will be passed directly to any results class that is instantiated in createResult. 
*/

generic.endeca.resultsgroup = site.endeca.generic.Class.create( site.endeca.results, {
        
    initialize: function( args ) {
        this.baseClass = site.endeca.results;
        this._super( args );
    },
    
    displayResults: function( args ) {
        var args = args || {};
        var that = this;
        
        if ( that.parentNode && that.parentNode.length > 1 ) {
            that.parentNode.each( function() {
                args.parentNode = jQuery(this);
                that._super( args );
            });  
        } else {
            that._super( args );
        }
    },

    createResult: function( args ) {
        var args = args || {};
        
        args.childClass = this.resultsChildClass || args.childClass;
        args.mixins = args.mixins || this.mixins[ this.resultsMixinKey ] || this.mixins['results.' + args.childClass] || this.mixins['results'];        
        this.setResultClass( args );
        
        var result = new this.resultClass( jQuery.extend( { 
            parent: this,
            resultData: args.result,
            parentNode: this.contentNode || this.node || this.parentNode,
            summaryResultData: this.summaryResultData,
            mixins: this.mixins,
            configuration: args.configuration || this.configuration
        }, args.resultsArgs || this.resultsArgs || {} ) ); 
        this.resultNodes.push( result );
    },
    
    reset: function() {
        for ( var i = 0; i < this.resultNodes.length; i++ ) {
            this.resultNodes[i].reset();
        }
        this._super();
    }

}); 

site.endeca.resultsgroup = generic.endeca.resultsgroup;
;
generic.endeca.mixins.accordion = { 
    initialize: function( args ) {
        this._super(args);
        
        this.accordionHeaderNode = [];
        this.accordionContentNode = [];
        this.accordionCloseNode = [];
    },
       
    displayResults: function( args ) {
        this._super(args);
        this.setupAccordion();
    },
    
    setupAccordion: function() {
        this.accordionHeaderNode = this.node.find('.accordion-header:first');
        this.accordionContentNode = this.node.find('.accordion-content:first');
        this.accordionCloseNode = this.node.find('.accordion-close:first');
        
        if ( this.accordionHeaderNode.length && this.accordionContentNode.length ) {
            var that = this;
            this.accordionHeaderNode.unbind( 'click' );
            this.accordionHeaderNode.bind( 'click', { that: that }, that.onClick );
            
            if ( this.accordionCloseNode.length ) { 
                this.accordionCloseNode.unbind( 'click' );
                this.accordionCloseNode.bind( 'click', { that: that }, that.closeAccordion );
            }
        }
    },
    
    onClick: function( event ) {
        event.preventDefault();
        
        var that = event.data.that;
        that.toggleAccordion();
        
        return false;
    },
    
    accordionIsOpen: function() {
        return ! this.accordionHeaderNode.hasClass('collapsed');
    },
    
    accordionIsClosed: function() {
        return this.accordionHeaderNode.hasClass('collapsed');
    },
    
    toggleAccordion: function() {
        if ( ! this.accordionHeaderNode.hasClass('collapsed') ) { this.closeAccordion(); }
        else { this.openAccordion(); }
    },
    
    openAccordion: function( event ) {
        var that = event && event.data && event.data.that ? event.data.that : this;
        if ( this.accordionHeaderNode.length && this.accordionContentNode.length && this.accordionIsClosed() ) {
            this.accordionHeaderNode.removeClass('collapsed');
            this.accordionContentNode.addClass('opened');
            this.accordionContentNode.show();
            
            this.accordionContentNode.trigger('accordion:open', that);
        }
    },
    
    closeAccordion: function( event ) {
        var that = event && event.data && event.data.that ? event.data.that : this;
        if ( that.accordionHeaderNode.length && that.accordionContentNode.length && that.accordionIsOpen() ) {
            that.accordionHeaderNode.addClass('collapsed');
            that.accordionContentNode.removeClass('opened');
            that.accordionContentNode.hide();
            
            that.accordionContentNode.trigger('accordion:closed', that);
        }
    }
    
};

site.endeca.mixins.accordion = generic.endeca.mixins.accordion;
;
/*
    This can be used in conjunction with other mixins if placed last in the mixins array.
*/

generic.endeca.mixins.delayedClick = {
    onClick: function( event ) {
        var that = event.data.that;
        
        var _super = this._super;
        
        that.delayedClickNode = 
            ( that.delayedClickNode && that.delayedClickNode.length ) ? that.delayedClickNode : 
            ( that.node && that.node.find('.delayed-click:first').length ) ? that.node.find('.delayed-click:first') : 
            ( that.parentNode && that.parentNode.find('.delayed-click:first').length ) ? that.parentNode.find('.delayed-click:first') : 
            ( that.parent && that.parent.node && that.parent.node.find('.delayed-click:first').length ) ? that.parent.node.find('.delayed-click:first') : [];
        
        if ( that.delayedClickNode.length ) {
            event.preventDefault();
            that.delayedClickNode.unbind( 'click.delayed' );
            
            if ( !that.isDelayed() ) {
                that.addDelay( _super, event.data );
            } else {
                that.removeDelay();
            }
            
            return false;
        } else {
            return _super( event );
        }
    }, 
    
    addDelay: function( _super, data ) {
        var that = this;
        
        that.delayedClickNode.bind( 'click.delayed', data, _super );
        that.node.siblings('.delayed').removeClass('delayed');
        that.node.addClass('delayed');
        that.node.trigger( 'delay.added', that );
    },
    
    removeDelay: function () {
        var that = this;
        
        that.node.removeClass('delayed');
        that.node.trigger( 'delay.removed', that );
    },
    
    isDelayed: function() {
        return this.node.hasClass('delayed');
    }
};

site.endeca.mixins.delayedClick = generic.endeca.mixins.delayedClick;
;
generic.endeca.mixins.links = {        
    displayResultCallback: function( args ) {
        var args = args || { };
        args.resultData = args.resultData || this.resultData;
        var node = args.node || args.parentNode || this.node || this.parentNode;
        node = node.find('.link-mixin').length ? node.find('.link-mixin') : 
               node.find('a').length ? node.find('a') : node;
               
        var link = args["Selection Link"] || args.resultData["Selection Link"] || args.resultData["Removal Link"] || node.attr( 'rel' );
        
        if ( link && node ) {
            var that = this;
            node.bind( 'click', { that: that, link: link }, that.onClick );
            node.bind( 'simulate:click', { that: that, link: link }, that.onClick );
            
            if ( node.href ) { 
                var params = site.endeca.generic.env.parsedQuery();
                params['qs'] = encodeURIComponent(link);
        
                var url = document.location.pathname + "?" + jQuery.param(params);
                node.href = url;
            }
        }
    }
};

site.endeca.mixins.links = generic.endeca.mixins.links;

;
generic.endeca.mixins.links.address = jQuery.extend( {
    onClick: function( event ) {
        var that = event.data.that;
        jQuery.address.value( "?" + event.data.link );
        if (    that.configuration.scrollTo &&
                that.configuration.scrollTo.length ) {
            jQuery(window).scrollTop( that.configuration.scrollTo.position().top );
        } else if ( !( that.noScroll || that.configuration.noScroll ) ) {
            scroll(0,0)
        }
        event.preventDefault();
        return false;
    }
}, site.endeca.mixins.links );

site.endeca.mixins.links.address = generic.endeca.mixins.links.address;
;
generic.endeca.mixins.links.event = jQuery.extend( {
    onClick: function( event ) {
        var that = event.data.that;
        jQuery(document).trigger( 'link:clicked', event.data.link );
        event.preventDefault();
        return false;
    }
}, site.endeca.mixins.links );

site.endeca.mixins.links.event = generic.endeca.mixins.links.event;
;
generic.endeca.mixins.noReset = {
    displayResults: function( args ) {
        if ( this.resultNodes.length == 0 ) {
            this._super( args );
        }
    },
    reset: function() {}
};

site.endeca.mixins.noReset = generic.endeca.mixins.noReset;
;
/*
    This mixin is used to save the state of the selected node after it is clicked.
*/

generic.endeca.mixins.nodeCache = {
    initialize: function( args ) {
        this._super( args );
        
        this.cachedNode = [];
        this.previouslyCachedNode = [];
        this.nodeCacheUseParent = this.nodeCacheUseParent || 0;
        
        this.nodeCacheNode = ( this.nodeCacheNode && this.nodeCacheNode.length ) ? this.nodeCacheNode : [];
        this.nodeCacheRestoreNode = ( this.nodeCacheRestoreNode && this.nodeCacheRestoreNode.length ) ? this.nodeCacheRestoreNode : [];
        
        if ( !this.nodeCacheNode.length ) {
            if ( this.parent && this.parent.nodeCacheNode && this.parent.nodeCacheNode.length ) {
                this.nodeCacheNode = this.parent.nodeCacheNode;
                this.nodeCacheUseParent = 1;
            }
        }
        
        if ( !this.nodeCacheRestoreNode.length ) {
            if ( this.parent && this.parent.nodeCacheRestoreNode && this.parent.nodeCacheRestoreNode.length ) {
                this.nodeCacheRestoreNode = this.parent.nodeCacheRestoreNode;
                this.nodeCacheUseParent = 1;
            }
        }
        
        this.nodeCacheKey = this.nodeCacheUseParent ? this.parent.resultData[this.configuration.nodeCacheKey] : this.resultData[this.configuration.nodeCacheKey];
    },
    
    displayResult: function( args ) {
        if ( this.isCached() && !this.nodeCacheRestoreNode.length ) {
            this.clearCache();
        }
        this._super( args );
    },
    
    onClick: function( event ) {
        event.preventDefault();
        var that = event.data.that || event.data;        
        
        var _super = this._super || function() {};
        
        if ( that.nodeCacheNode.length ) {
            if ( that.isCached() ) {
                that.loadFromCache();
                return;
            } else if ( that.node.hasClass('recache') && that.previouslyCachedNode.length ) {
                that.recache({ data: that });
                return;
            } else if ( that.node.hasClass('recache') && that.isRestored() ) {
                that.recache({ data: that });
                return;
            } else {
                that.saveToCache();
            }
        }
        
        return _super( event );
    },  
        
        
    isCached: function() {
        this.cachedNode = this.nodeCacheNode.find( "[nodeCacheKey='" + this.nodeCacheKey + "']" );
        return this.cachedNode.length ? 1 : 0;
    },
    
    isRestored: function() {
        this.previouslyCachedNode = this.nodeCacheRestoreNode.find( "[nodeCacheKey='" + this.nodeCacheKey + "']" );
        return this.previouslyCachedNode.length ? 1 : 0;
    },
    
    saveToCache: function() {
        var that = this;
        
        this.node.trigger( 'savedToCache.before', that );
        
        var node = this.nodeCacheUseParent ? this.parent.node : this.node;
        if ( this.nodeCacheUseParent ) {
            this.parent.reset = function() {};
        }
        
        node.attr( 'nodeCacheKey', this.nodeCacheKey );
        this.clearCache();
        this.nodeCacheNode.append(node);
        
        this.node.trigger( 'savedToCache.after', that );
    },
    
    loadFromCache: function() { 
        var that = this;
        
        this.node.trigger( 'loadedFromCache.before', that );
        var restoreNode = 
            ( this.nodeCacheRestoreNode && this.nodeCacheRestoreNode.length ) ? this.nodeCacheRestoreNode :
            ( this.nodeCacheUseParent ) ? this.parent.parentNode : this.parentNode;
            
        var recacheNode = this.cachedNode.find( '.recache:first' );
        recacheNode.unbind( 'click' );
        recacheNode.bind( 'click', this, this.recache );
        restoreNode.append( this.cachedNode );
        
        this.previouslyCachedNode = this.cachedNode;
        this.node.trigger( 'loadedFromCache.after', that );
    },
    
    recache: function( event ) {
        var that = event.data;
        if ( that.previouslyCachedNode.length == 0 ) { return; }
        that.previouslyCachedNode.trigger( 'recached.before', that );
        that.nodeCacheNode.append( that.previouslyCachedNode );
        that.previouslyCachedNode.trigger( 'recached.after', that );
    },
    
    clearCache: function() {
        this.cachedNode.remove();
    }
};

site.endeca.mixins.nodeCache = generic.endeca.mixins.nodeCache;
;
generic.endeca.mixins.selectbox = {
    setupNodes: function( args ) {
        this._super( args );
        var that = this;
        var selectBox = this.node.find('select').length ? this.node.find('select') : 
                        this.parentNode.find('select').length ? this.parentNode.find('select') : '';
                        
        if ( selectBox ) { selectBox.bind( 'change', that, that.onChange ); }
    },
    
    onChange: function( event ) {
        var that = event.data;
        var selectedOption = this.options[this.selectedIndex];
        jQuery(selectedOption).trigger('simulate:click');
        event.preventDefault();
        return false;
    }
};

site.endeca.mixins.selectbox = generic.endeca.mixins.selectbox;
;
generic.endeca.mixins.summary = { 
    
    initialize: function( args ) {
        this._super(args);
        
        this.summaryResultData = { totalRecords: this.resultData.length };
        this.summaryResultData.resultText = this.summaryResultData.totalRecords == 1 ? site.endeca.generic.rb('endeca').get('result') : site.endeca.generic.rb('endeca').get('results');
    },
    
    setupNodes: function( args ) {
        var args = args || {};    
        this._super(args);
        if ( this.node ) {
            this.summaryNode = this.node.find('.results-summary').length ? this.node.find('.results-summary') : null;
        }
    },
    
    displayResults: function( args ) {
        this._super(args);
        this.setupSummary();
    },
    
    setupSummary: function() {
        if ( this.summaryNode && this.configuration.summaryTemplatePath && this.summaryResultData ) {
            this.summary = new site.endeca.result({
                parentNode: this.summaryNode,
                templatePath: this.configuration.summaryTemplatePath,
                resultData: this.summaryResultData
            });
            this.summary.displayResult();
        }
    },
    
    reset: function( args ) {
        this._super(args);
        if ( this.summaryNode ) { this.summaryNode.empty() }
    }
};

site.endeca.mixins.summary = generic.endeca.mixins.summary;
;
generic.endeca.result.product = {
    initialize: function( args ) {
        this.shadeResults = null;
        this._super( args );
    },
    
    displayResult: function( args ) {
        this.setupReviewData();
        this.setupBrandData();
        this._super( args );
    },
    
    displayResultCallback: function( args ) {
        this.setupQuickShop();
        this.setupAddToBag( this.resultData.skus[0] );
        if ( this.resultData.shaded ) { this.setupShades(); }
        if ( this.resultData.sized ) { this.setupSizeSelect(); }
        if ( typeof this.displayResultCallbackBrand == "function" ) { this.displayResultCallbackBrand() }
    },
    
    setupReviewData: function() {
        this.resultData.ratingDisplay = this.resultData.TOTAL_REVIEW_COUNT ? 'block' : 'none';
        this.resultData.ratingReviewWord = this.resultData.TOTAL_REVIEW_COUNT && this.resultData.TOTAL_REVIEW_COUNT > 1 ? site.endeca.generic.rb("language").get('reviews') : site.endeca.generic.rb("language").get('review');
        this.resultData.ratingRounded = this.resultData.TOTAL_REVIEW_COUNT ? Math.round(this.resultData.AVERAGE_RATING*10)/10 : 0;
    },
    
    setupBrandData: function() {
        this.resultData.formattedPriceRange = this.formatPriceRange();
        this.resultData.shadedClass = this.resultData.shaded ? 'shaded' : 'nonshaded';
        this.resultData.sizedClass = this.resultData.sized ? 'sized' : 'notsized';
        this.resultData.isComingSoon = eval( jQuery.map( this.resultData.skus, function( sku ) { return sku.isComingSoon }).join('+') ) > 0 ? "coming_soon" : "";
        if ( this.resultData.DESCRIPTION ) {
            this.resultData.descriptionBlurb = this.resultData.DESCRIPTION.substring( 0, ( this.configuration.descriptionBlurb || 120 ) );
            this.resultData.descriptionRest = this.resultData.DESCRIPTION.substring( ( this.configuration.descriptionBlurb || 120 ) );
            this.resultData.descriptionFull = this.resultData.descriptionBlurb + this.resultData.descriptionRest;
        }
        this.resultData.skinTypeText = typeof productPage != 'undefined' && typeof productPage.getAllSkinTypes == 'function' ? productPage.getAllSkinTypes( this.resultData ) : '';
        if( typeof this.resultData.ATTRIBUTE_BENEFIT != 'undefined' ){
            this.resultData.attrBenefit = this.resultData.ATTRIBUTE_BENEFIT.toString().replace(/,/g,", ");
        }
    },
    
    formatPriceRange: function() {
		var minPrice = this.resultData.skus[0];
		var maxPrice = this.resultData.skus[0];
		for(var i = 0; i < this.resultData.skus.length; i++){
			var currSku = this.resultData.skus[i];
			minPrice = (currSku.PRICE < minPrice.PRICE) ? currSku : minPrice;
			maxPrice = (currSku.PRICE > maxPrice.PRICE) ? currSku : maxPrice;
		}
		
		return ( minPrice !== maxPrice ) ? minPrice.formattedPrice + ' - ' + maxPrice.formattedPrice : this.resultData.skus[0].formattedPrice;
    },
    
    setupQuickShop: function() {
        var quickshopLink = this.node.find('a.quickshop-link');
        
        if ( quickshopLink && typeof brx != 'undefined' ) {
            var that = this;
            quickshopLink.bind("click", function (e) {
                e.preventDefault();
                
                if(jQuery.isFunction(productPage.launchQuickshop)){
                    var prodID = jQuery(this).attr('id').replace('quickview-link-','');
                    productPage.launchQuickshop(prodID);
                }else{
                    var view = brx.productView.quickshop({
                        productData: that.resultData
                    });   
                }
            });
            quickshopLink.bind("mouseover", function (e) {
            	jQuery(this).find('.quickshop-btn').addClass('qs-active');
            	jQuery(this).closest('.result').addClass('qs');
            });
            quickshopLink.bind("mouseout", function (e) {
            	jQuery(this).find('.quickshop-btn').removeClass('qs-active');
            	jQuery(this).closest('.result').removeClass('qs');
            });
        }
    },
    
    setupAddToBag: function( sku ) {
        var skuBaseId = typeof sku==="number" ? sku : sku.SKU_BASE_ID;
        var addButtonNode = this.node.find("a.btn-add-to-bag");
        var progressNode = this.node.find("span.add-progress");
        
        addButtonNode.unbind();
        addButtonNode.attr("data-skubaseid", skuBaseId );
        addButtonNode.bind("click", function(e) {
            e.preventDefault();
            
            if ( progressNode.length ) {
                addButtonNode.hide();
                progressNode.show();

                $(document).one("addToCart.success addToCart.failure", function () {
                    progressNode.hide();
                    addButtonNode.show();
                });
            }
            
            site.addToCart({
                skuBaseId: $(this).attr("data-skubaseid")
            });
            
        });
    },
    
    setupNote: function() {
        /*if (this.resultData.MISC_FLAG) {
            var flagImgNode = this.node.select(".prod_details .prod_title .note")[0];
            if ( flagImgNode ) {
                var flagImg = el.productView.flagImages.get(this.resultData);
                var img = new Element("img", { src: flagImg.mppimg, alt: flagImg.alt });
                flagImgNode.update(img);
            }
        }*/
    },
    
    setupGiftSetComponents: function() {
        /*var giftsetNode = this.node.down('.giftset');
        if ( giftsetNode ) { giftsetNode.show(); }*/
    },
    
    setupShades: function() {
        var shadesNode = this.node.find('.shades');
        var selectedShadesNode = this.node.find('.selected-shade-name');
        var priceNode = this.node.find('.shade-price');
        
        if ( shadesNode.length ) {
            var skus;
            
            if ( typeof this.configuration.maxmimumShades != 'undefined' && this.resultData.skus.length > this.configuration.maxmimumShades ) {
                skus = this.resultData.skus.slice( 0, this.configuration.maxmimumShades );
            } else {
                skus = this.resultData.skus.slice( 0 );
            }
            
            shadesNode.addClass( 'shades_' + this.resultData.skus.length );
            
            for ( var i = 0; i < skus.length; i++ ) {
                skus[i].PRODUCT_ID = this.resultData.PRODUCT_ID;
                skus[i].url = this.resultData.url;
            }
            
            this.shadeResults = new site.endeca.results({ 
                resultData: skus,
                parentNode: shadesNode,
                childClass: 'shade',
                configuration: this.configuration,
                mixins: this.mixins
            });
            this.shadeResults.displayResults();
            this.shadeResults.show();
            
            var that = this;
            
            this.node.bind( 'select.sku', function( event, sku ) {
                that.setupAddToBag( sku.resultData.SKU_BASE_ID );
                if ( selectedShadesNode.length ) {
                    selectedShadesNode.text( sku.resultData.SHADENAME );
                }
                if ( priceNode.length ) {
                    priceNode.text( sku.resultData.formattedPrice );
                }
            });
            
            this.shadeResults.resultNodes[0].selectShade();
            
            // Commenting this out for now as it causes the search page to automatically go to SPP when the result/shade node is a link
            //this.shadeResults.resultNodes[0].node.click();
        }
    },
    
    setupSizeSelect: function() {
        var sizeSelectNode = this.node.find('.size-select');
        var priceNode = this.node.find('.size-price');
        
        if ( sizeSelectNode.length ) {
          
            this.sizeResults = new site.endeca.results({ 
                resultData: this.resultData.skus,
                parentNode: sizeSelectNode,
                childClass: 'size',
                configuration: this.configuration,
                mixins: this.mixins
            });
            this.sizeResults.displayResults();
            this.sizeResults.show();
            
            var that = this;
            
            this.node.bind( 'select.sku', function( event, sku ) {
                that.setupAddToBag( sku.resultData.SKU_BASE_ID );
                if ( priceNode.length ) {
                    priceNode.text( sku.resultData.formattedPrice );
                }
            });
            
        }
        
    }
};


site.endeca.result.product = generic.endeca.result.product;
;
/* 
    This class is for supporting applications that DO NOT refresh their refinement list after selection by the user. 
    This allows the user to choose a refinement from a selectbox or a radio button without removing the other options.
    
    Doing this can be dangerous if there is no guarantee of products returning for ALL combinations of refinements. The user can end up selecting a combination of refinements that will return no results otherwise. It also does not allow for nested refinements. 


*/

generic.endeca.result.refinementAdditive = {
    onClick: function( event ) {
        var that = event.data.that;
        var link = that.resultData["Selection Link"];
        
        var linkN = site.endeca.helpers.string.toQueryParams( link )['N'];
        var linkNs = linkN ? linkN.split('+') : [];
        var currentN = site.endeca.helpers.string.toQueryParams( site.endeca.state || '' )['N'];
        var currentNs = currentN ? currentN.split('+') : [];

        for ( var i = 0; i < currentNs.length; i++ ) {
            if ( that.parent.refinementIDs[ currentNs[i] ] ) {
                currentNs.splice(i, 1);
            }
        }
        
        currentNs = currentNs.concat(linkNs);
        currentNs = site.endeca.helpers.array.unique(currentNs);
        event.data.link = link.replace( /N=[0-9+]*&/, "N=" + currentNs.join('+') + "&" );
        this._super( event );
        
    }
};

site.endeca.result.refinementAdditive = generic.endeca.result.refinementAdditive;
;
generic.endeca.result.shade = {
    initialize: function( args ) {
        this._super( args );
        this.templatePath = this.configuration.shadeTemplatePath || '/templates/endeca/products/shade.tmpl';
        this.displayResult();
    },
    
    displayResultCallback: function( args ) {
        this.drawSwatch();
        if ( ! this.configuration.suppressShadeEvents ) {
            this.initListeners();
        }
    },
    
    // Clinique style drawSwatch - this can be customized at the SITE level
    drawSwatch: function( args ) {
        if (!this.resultData.HEX_VALUE_STRING || this.resultData.HEX_VALUE_STRING.length < 1) {
            return;
        }
        
        var swatchContainerNode = this.node.find('.search-swatch-container');
        //var swatchWidth = swatchContainerNode.css('width');
        //swatchWidth = parseInt( swatchWidth.replace('px', '') );
                
        var hexVals = this.resultData.HEX_VALUE_STRING.split(',');
        //var swatchShadeWidth = Math.ceil(swatchWidth/hexVals.length);
        
        for (var i=0; i<hexVals.length; i++) {
            var d = jQuery("<div/>");
            d.css({ 
                //width: swatchShadeWidth + "px",
                'background-color': hexVals[i] 
            });
            if ( i == 0 ) { d.addClass('first'); }
            if ( i == hexVals.length-1 ) { d.addClass('last') }
            if ( hexVals.length == 1 ) { d.addClass('single') }
            
            swatchContainerNode.append(d);
        }
        
        swatchContainerNode.css('width', 'auto');  
    },
    
    initListeners: function( args ) {
        var that = this;
        this.node.bind( 'click', that, function( event ) {
            var that = event.data;
            that.selectShade();
        });
    },
    
    selectShade: function( args ) {
        this.node.siblings('.shade').removeClass('active');
        this.node.addClass('active');
        this.node.trigger( 'select.sku', this );
    }
};

site.endeca.result.shade = generic.endeca.result.shade;
;
generic.endeca.result.summary = {
    displayResult: function( args ) {
        var args = args || {};

        var templates = jQuery.extend( {
            results: '/templates/endeca/summary/results.tmpl',
            noResults: '/templates/endeca/summary/no-results.tmpl',
            noTerm: '/templates/endeca/summary/no-term.tmpl',
            autoCorrect: '/templates/endeca/summary/auto-correct.tmpl',
            didYouMean: '/templates/endeca/summary/did-you-mean.tmpl'
        }, ( this.configuration.templatePaths || {} ) );
        
        if ( this.resultData.searchTerm == "" ) { this.templatePath = templates['noTerm'] }
        else if ( this.hasResults ) { 
            this.templatePath = templates['results'];
            
            this.resultData.productAnchorLinkDisplay = this.resultData.totalProductRecords > 0 ? 'inline' : 'none';
            this.resultData.contentAnchorLinkDisplay = this.resultData.totalContentRecords > 0 ? 'inline' : 'none';
            this.resultData.productResultText += this.resultData.totalContentRecords > 0 ? ',' : '';
            
        } else { this.templatePath = templates['noResults'] }
        this._super(args);
        
        var searchTerms = this.node.find('.searchTerms');
        if ( this.resultData.breadcrumbs && searchTerms.length ) {
            var breadcrumbs = [];
            for ( var i = 0; i < this.resultData.breadcrumbs.length; i++ ) {
                for ( var j = 0; j < this.resultData.breadcrumbs[i]['Dimension Values'].length; j++ ) {
                    breadcrumbs.push( ', "' + this.resultData.breadcrumbs[i]['Dimension Values'][j]['Dim Value Name'] + '"' );
                }
            }
            searchTerms.append( breadcrumbs.join("") );
        }
        
        var acElement = this.node.find('#auto-correct');
        if ( this.resultData.correctedTerms && this.resultData.correctedTerms.length && acElement.length ) { 
            this.templatePath = templates['autoCorrect'];
            args.resultData = this.resultData;
            args.resultData.correctedTerm = this.resultData.correctedTerms.join(',');
            args.parentNode = acElement;
            this._super(args)
        }
        
        var dymElement = this.node.find('#did-you-mean');
        if ( this.resultData.didYouMean &&this.resultData.didYouMean.length && dymElement.length ) { 
            this.templatePath = templates['didYouMean'];
            args.resultData = this.resultData.didYouMean[0]; // Only handle the first did you mean term
            args.parentNode = dymElement;
            this._super(args)
        }
    },
    
    reset: function() {
        this.parentNode.empty();
    }
};

site.endeca.result.summary = generic.endeca.result.summary;
;
generic.endeca.results.breadcrumbs = {
    initialize: function(args) {
        this.childClass = 'breadcrumb';
        this._super(args);
        
        if ( (typeof this.resultData.length == "undefined" && this.resultData ) || this.resultData.length ) {
            this.displayResults();
        }
    },
    
    displayResults: function() {
        this.resultData['Dimension Name RB Key'] = this.resultData['Dimension Name'].replace(/\W+/gi, "_").toLowerCase();        
        this.resultData['Dimension Name RB'] = site.endeca.generic.rb('endeca').get( 'dimension_' + this.resultData['Dimension Name RB Key'] );
        this.resultData['Dimension Description RB'] = site.endeca.generic.rb('endeca').get( 'dimension_' + this.resultData['Dimension Name RB Key'] + '.description' );
        
        var that = this;
        var rd = jQuery.map(this.resultData["Dimension Values"], function( dimVal ){ 
            return jQuery.extend( dimVal, { 
                "Dimension Name": that.resultData["Dimension Name"],
                "Dimension Name RB Key": that.resultData["Dimension Name RB Key"],
                "Dimension Name RB": that.resultData["Dimension Name RB"],
                "Dimension Description RB": that.resultData["Dimension Description RB"]
            });
        });
        
        this._super({
            resultData: this.resultData["Dimension Values"]
        });
        
        this.displayResultNodes();
    },
    
    createResult: function( args ) {
        args.templatePath = this.childTemplatePath || this.templatePath || "/templates/endeca/breadcrumbs/link.tmpl";
        
        if ( this.configuration.breadcrumbTemplates && this.configuration.breadcrumbTemplates[ this.resultData["Dimension Name RB Key"] ] ) {
            args.templatePath = this.configuration.breadcrumbTemplates[ this.resultData["Dimension Name RB Key"] ];
        }
        
        args.result['Dim Value Name RB Key'] = args.result['Dim Value Name'].replace(/\W+/gi, "_").toLowerCase();
        args.result['Dim Value Name RB'] = site.endeca.generic.rb('endeca').get( 'refinement_' + args.result['Dim Value Name RB Key'] );
        
        this._super( args );
    }
}; 

site.endeca.results.breadcrumbs = generic.endeca.results.breadcrumbs;
;
generic.endeca.results.bestsellers = {
        
    initialize: function( args ) {
        this.childClass = 'product';
        this._super( args );
    },
    
    displayResults: function() {
        var that = this;
        
        this.query = new site.endeca.query( jQuery.extend({ 
                callbackCompleted: function() {
                    var productCatalog = new site.endeca.catalog.product({ jsonResult: that.query.jsonResult });
                    that.resultData = productCatalog.getProducts();
                    
                    that._super();
                    that.displayResultNodes();
                    if ( typeof that.configuration.queryCallback == 'function' ) {
                        that.configuration.queryCallback();
                    }
                }
            }, 
            site.endeca.configuration.query,
            this.configuration.queryArgs || {}
        ));
        
        this.query.prepare();
        this.query.execute();
    },
    
    createResult: function( args ) {
        args.result.context = 'bestseller-product';
        args.templatePath = this.childTemplatePath || this.templatePath || "/templates/endeca/products/bestseller-result.tmpl";
        this._super(args);
    }
};

site.endeca.results.bestsellers = generic.endeca.results.bestsellers;
;
generic.endeca.results.contentzone = site.endeca.generic.Class.create( site.endeca.results, {
    
    displayResults: function( args ) {
        var args = args || {};
        
        // setting this here doesn't allow for different styles per result -- so you can only have one containerTemplate per zone and it will always be for the first result, this is clunky
        this.zoneName = this.resultData[0].Properties.Zone;
        this.styleName = this.resultData[0].Properties.Style;
        
        this.styleConfig = this.configuration.styles && this.configuration.styles[ this.styleName ] ? 
            this.configuration.styles[ this.styleName ] :
            undefined;
        
        args.containerTemplatePath = this.configuration.containerTemplatePath;
        
        if ( typeof this.configuration.containerTemplatePath == "object" ) {
            args.containerTemplatePath = this.configuration.containerTemplatePath[ this.styleName ]
        } else if ( this.styleConfig && this.styleConfig.containerTemplatePath ) {
            args.containerTemplatePath = this.styleConfig.containerTemplatePath;
        }
        
        this._super(args);
    },
    
    createResult: function( args ) {
        var args = args || {};
        
        // checking this here allows for resultsets with different styles/templates in each result. 
        var styleName = ( args.result.Properties && args.result.Properties.Style ) ? args.result.Properties.Style : this.styleName;
        
        args.templatePath = this.configuration.templatePath;
        
        if ( typeof this.configuration.templatePath == "object" ) {
            args.templatePath = this.configuration.templatePath[ styleName ]
        } else if ( this.styleConfig && this.styleConfig.templatePath ) {
            args.templatePath = this.styleConfig.templatePath;
        }
            
        this._super(args);
    }
    
});

site.endeca.results.contentzone = generic.endeca.results.contentzone;
;
generic.endeca.results.contentzone.content = {
        
    initialize: function( args ) {
        //this.childClass = 'content';
        this._super(args);
        
        if ( this.resultData.length ) {
            this.displayResults();
        }
    },
    
    displayResults: function( args ) {
        this._super(args);
        
        this.displayResultNodes();
        
        /*this.resultNodes.each( function( result ) { 
            if ( result.resultData.content_link == "undefined" ) {
                result.node.down('.content-link').hide();
            }
        });*/
    },
    
    createResult: function( args ) {
        args.result = args.result.Properties;
        if ( args.result.Style.match(/drupal/i) ) { args.childClass = 'contentDrupal'; }
        this._super(args);
    }
    
};

site.endeca.results.contentzone.content = generic.endeca.results.contentzone.content;
;
generic.endeca.results.contentzone.products = {
        
    initialize: function( args ) {
        this.childClass = 'product';        
        this._super(args);
        this.query = null;
        this.totalProductResults = 0;
        var searchTerms = [];
        
        for ( var i = 0; i < this.resultData.length; i++ ) {
            for ( var j = 0; j < this.resultData[i]['Records'].length; j++ ) {
                searchTerms.push(this.resultData[i]['Records'][j]["Record Spec"]);
                this.totalProductResults++;
            }
        }
        
        this.query = new site.endeca.query( jQuery.extend({ 
                callbackCompleted: site.endeca.helpers.func.bind( this.searchCompleted, this ),
                searchMode: 'matchany',
                searchTerm: searchTerms.join(' '),
                searchKey: 'rec_id'
            }, 
            site.endeca.configuration.query,
            this.configuration.queryArgs || {}
        ));
        
        this.query.prepare();
        this.query.execute();
    },
    
    searchCompleted: function() {
        var productCatalog = new site.endeca.catalog.product({ jsonResult: this.query.jsonResult });
        
        this.displayResults({ resultData: productCatalog.getProducts() });
        this.displayResultNodes();
    },
    
    createResult: function( args ) {
        args.result.context = 'featured-product';
        args.result.callout = site.endeca.generic.rb('endeca').get('callout.featured-product');
        this._super(args);
    }
    
};

site.endeca.results.contentzone.products = generic.endeca.results.contentzone.products;
;
generic.endeca.results.pagination = {

    initialize: function( args ) {
        this._super(args);
        this.displayResults();
    },
    
    displayResults: function() {
        if ( this.resultData ) {
            this.setupNodes();
            
            if ( this.resultData.viewAllLink && this.configuration.viewAllLink ) {
                this.createResult({
                    templatePath: this.configuration.viewAllPageTemplatePath || "/templates/endeca/pagination/viewall.tmpl",
                    result: { "Selection Link": this.resultData.viewAllLink }
                });
            }            
        
            if ( this.resultData.previousPageLink && this.configuration.previousPageLink ) {
                this.createResult({
                    templatePath: this.configuration.previousPageTemplatePath || "/templates/endeca/pagination/previous.tmpl",
                    result: { "Selection Link": this.resultData.previousPageLink }
                });
      		}
      		
      		var oldContentNode = this.contentNode;
      		if ( this.configuration.containerTemplatePath ) {
      		    this.containerTemplatePath = this.configuration.containerTemplatePath
      		    this.setupNodes();
          	}
      		
      		if ( this.resultData.directPageLinks ) {
      		    for ( var i = 0; i < this.resultData.directPageLinks.length; i++ ) {
          		    this.createResult({
        	            templatePath: this.resultData.numberOfCurrentPage == i+1 ?  this.configuration.currentTemplatePath || "/templates/endeca/pagination/current.tmpl" :  this.configuration.linkTemplatePath || "/templates/endeca/pagination/link.tmpl",
                        result: { "Selection Link": this.resultData.directPageLinks[i], "Content": i+1 }
                    });
          		}
      		}
      		
      		this.contentNode = oldContentNode;
      		        
            if ( this.resultData.nextPageLink && this.configuration.nextPageLink ) {
                this.createResult({
                    templatePath: this.configuration.nextPageTemplatePath || "/templates/endeca/pagination/next.tmpl",
                    result: { "Selection Link": this.resultData.nextPageLink }
                });
      		}
      		
      		this.displayResultNodes();
        }
    },
    
    setupSummary: function () {
        return;
        if ( this.paginationSummaryNode ) {
            if ( this.summaryResultData && this.summaryResultData.totalProductRecords > 1 ) {
                var templatePath = "endeca.templates.pagination.summary.shown";            
                if ( this.resultData && this.resultData.numberOfCurrentPage == 1 ) {
                    templatePath = "endeca.templates.pagination.summary.topShown";
                }
                
                this.createResult({
                    templatePath: templatePath,
                    result: this.summaryResultData,
                    contentNode: this.paginationSummaryNode
                });
            }
            
            if ( this.resultData && this.resultData.nextPageLink ) {
                this.createResult({
                    templatePath: "endeca.templates.pagination.summary.next",
                    result: { "Selection Link": this.resultData.nextPageLink },
                    contentNode: this.paginationSummaryNode
                });
            }
            
            if ( this.summaryResultData ) {
                var templatePathView = null;
                var queryArgs = null;
                if ( this.summaryResultData.startingRecord == 1 && this.summaryResultData.endingRecord > 10 ) {
                    templatePathView = "endeca.templates.pagination.summary.viewLess";
                    queryArgs = {};
                } else if ( this.summaryResultData.totalProductRecords > 10 ) {
                    templatePathView = "endeca.templates.pagination.summary.viewAll";
                    queryArgs = { recordsPerPage: 10000 }
                }
                
                if ( templatePathView ) {
                    var query = new site.endeca.base.query(queryArgs);
                    this.createResult({
                        templatePath: templatePathView,
                        result: { "Selection Link": query.toQueryString() },
                        contentNode: this.paginationSummaryNode
                    }); 
                }
            }
            
        }
    }
};

site.endeca.results.pagination = generic.endeca.results.pagination;

;
generic.endeca.results.products = {
        
    initialize: function( args ) {
        this.childClass = 'product';
        this._super( args );
    },
    
    displayResults: function( args ) {
        var args = args || {};
        this._super( args );
        this.displayResultNodes();
    },
    
    createResult: function( args ) {
        args.templatePath = this.childTemplatePath || "/templates/endeca/products/result.tmpl";
        args.result.context = 'product';
        this._super( args );
    }    
};

site.endeca.results.products = generic.endeca.results.products;
;
generic.endeca.results.refinements = {
    
    initialize: function( args ) {
        this.containerTemplatePath = '/templates/endeca/refinements/container.tmpl';
        this.childClass = 'refinement';
        this.moreRefinement = null;
        this.refinementIDs = {};
        this._super( args );
        
        this.resultData['Dimension Name RB Key'] = this.resultData['Dimension Name'].replace(/\W+/gi, "_").toLowerCase();        
        this.resultData['Dimension Name RB'] = site.endeca.generic.rb('endeca').get( 'dimension_' + this.resultData['Dimension Name RB Key'] );
        this.resultData['Dimension Description RB'] = site.endeca.generic.rb('endeca').get( 'dimension_' + this.resultData['Dimension Name RB Key'] + '_description' );

        if ( this.configuration.refinementContainerTemplates && this.configuration.refinementContainerTemplates[ this.resultData["Dimension Name RB Key"] ] ) {
            this.containerTemplatePath = this.configuration.refinementContainerTemplates[ this.resultData["Dimension Name RB Key"] ];
        }
        
        this.displayResults({
            resultData: this.resultData["Dimension Values"]
        });
        
        this.displayResultNodes();
    },
    
    createResult: function( args ) {        
        args.templatePath = this.childTemplatePath || this.templatePath || "/templates/endeca/refinements/link.tmpl";
        
        if ( this.configuration.refinementTemplates && this.configuration.refinementTemplates[ this.resultData["Dimension Name RB Key"] ] ) {
            args.templatePath = this.configuration.refinementTemplates[ this.resultData["Dimension Name RB Key"] ];
        }
        
        if ( this.configuration.resultMixinKeys && this.configuration.resultMixinKeys[ this.resultData["Dimension Name RB Key"] ] ) {
            args.mixins = this.mixins[ 
                this.configuration.resultMixinKeys[ this.resultData["Dimension Name RB Key"] ]
            ];
        }
                
        if ( this.resultData["Dim Value Properties"] && this.resultData["Dim Value Properties"]["DGraph.More"] && args.result["Dim Value Name"] == "More..." ) {
            args.templatePath = "/templates/endeca/refinements/show-all.tmpl";
            this.moreRefinement = args.result["Dim Value ID"];
        } else {
            this.refinementIDs[ args.result["Dim Value ID"] ] = 1;
            args.result['Dim Value Name RB Key'] = args.result['Dim Value Name'].replace(/\W+/gi, "_").toLowerCase();        
            args.result['Dim Value Name RB'] = site.endeca.generic.rb('endeca').get( 'refinement_' + args.result['Dim Value Name RB Key'] );
            args.result['Dim Value Description RB'] = site.endeca.generic.rb('endeca').get( 'refinement_description_' + args.result['Dim Value Name RB Key'] );
        }
        
        this._super( args );
    },
    
    reset: function( args ) {
        this.refinementIDs = {};
        this._super( args );
    }

}; 

site.endeca.results.refinements = generic.endeca.results.refinements;
;
generic.endeca.results.sorting = {

    initialize: function( args ) {
        this._super(args);
        this.displayResults();
    },
    
    displayResults: function( args ) {
        this._super( args );
        this.displayResultNodes();
    },
    
    createResult: function( args ) {
        var args = args || {};
        
        if ( args.result['Sort Order'] ) {
            args.templatePath = this.configuration.currentTemplatePath || "/templates/endeca/sort/current.tmpl";
        } else {
            args.templatePath = this.configuration.linkTemplatePath || "/templates/endeca/sort/link.tmpl";
        }
        
        args.result['Sort Key RB'] = args.result['Sort Key'] ? site.endeca.generic.rb('endeca').get( 'sorting_' + args.result['Sort Key'].toLowerCase() ) : "";
        
        this._super(args);
    }
};


site.endeca.results.sorting = generic.endeca.results.sorting;
;
site.endeca.result.size = {
    initialize: function( args ) {
        this._super( args );
        this.templatePath = '/templates/endeca/products/size.tmpl';
        this.displayResult();
    },
    
    displayResultCallback: function( args ) {
        this.initListeners();
    },
    
    initListeners: function( args ) {
        var that = this;
        this.node.bind( 'click', that, function( event ) {
            var that = event.data;
            this.node.trigger( 'select.sku', that );
        });
    }
    
};
;
generic.endeca.resultsgroup.breadcrumbs = {
    displayResults: function( args ) {
        var args = args || {};
        args.childClass = 'breadcrumbs';
        this._super(args);
        
        var that = this;        
        jQuery('.clear-all').each( function( index, el ) {
            var $this = jQuery(this);
            // Mixed in via endeca.mixins.links...
            if ( that.displayResultCallback ) { 
                that.displayResultCallback({
                    "Selection Link" : ' ',
                    "node": $this
                }); 
                $this.show();
            } else {
                $this.hide();
            }
        });
    }
};

site.endeca.resultsgroup.breadcrumbs = generic.endeca.resultsgroup.breadcrumbs;

;
generic.endeca.resultsgroup.contentzones = {
        
    initialize: function( args ) {
        this.resultData = {};
        this.zones = {};
        this.crawlData = [];
        this.hasSoloResults = false;
        this.totalResults = 0;
        this.contentzones = {};
        this._super(args);
    },  
    
    setCrawlData: function( args ) {
        var args = args || { };
        if ( args.crawlData && args.crawlData.length ) { this.resultData.crawlData = { style: 'content', records: args.crawlData }; }
    },
    
    setupNodes: function( args ) {
        var args = args || {};
        this.node = this.parentNode || args.node;
    },
    
    displayResults: function( args ) {
        var args = args || {};
        
        args.baseClass = site.endeca.results.contentzone;
        
        for ( var zone in this.contentzones ) {
            // reset the result class for each zone as they may be following a different inheritance path
            this.resultClass = null; 
            
            var zoneArgs = args;
            var content = this.resultData[zone];
            
            if ( content && content.records && content.records.length ) {
                /*if ( this.contentzones[zone].limit && this.resultData[zone].records.length > this.contentzones[zone].limit ) {
                    zoneArgs.resultData = [ this.resultData[zone].records.slice( 0, this.contentzones[zone].limit ) ];
                } else {
                    zoneArgs.resultData = [ this.resultData[zone].records ];
                }*/
                
                zoneArgs.resultData = [ this.resultData[zone].records ];
                
                zoneArgs.childClass = this.contentzones[zone].childClass || (
                    site.endeca.results.contentzone[this.resultData[zone].style] ? 
                        this.resultData[zone].style : 
                        this.resultData[zone].style.match(/product/i) ? 'products' : 'content' 
                );
                zoneArgs.node = this.contentzones[zone].node;
                if ( this.contentzones[zone].solo ) { this.hasSoloResults = true; }
                if ( this.contentzones[zone].counted ) { this.totalResults += zoneArgs.resultData[0].length; }
                zoneArgs.configuration = this.contentzones[zone];
                zoneArgs.mixins = this.mixins['results.contentzone'];
                this._super(zoneArgs);
                this.contentzones[zone].resultNode = this.resultNodes[ this.resultNodes.length-1 ];
                zoneArgs.node.show();
            } else {
                this.contentzones[zone].node.hide();
            }
            
        }
    },
    
    /*
    //Initial attempt at using styles to build out custom result heirarchy - in order to do this, the contentzone resultsgroup/results/result structure will have to be modified. Currently resultsgroup represents ALL zones and sets up results classes that all have the same subclass, which doesn't allow you to mix product results with content results in one zone. In this setup, each result is a standard "result" class. 
    
    // To improve this, the following heirarchy should be adopted:
    //      resultsgroup.contentzones should still represent all zones. 
    //      results.contentzones should represent each style in a zone.
    //      result.contentzone.style should represent each individual result, with any custom, style-specific logic.
     
    createResult: function( args ) {
        try {
            args.childClass = args.configuration.styles[args.style].childClass;
        } catch(e) {
            args.childClass = 'content';
        }
        this._super( args );
    },
    */
    
    hide: function() {
        for ( var i = 0; i < this.resultNodes.length; i++ ) {
            this.resultNodes[i].hide();
        }
    },
    
    show: function() {
        for ( var i = 0; i < this.resultNodes.length; i++ ) {
            this.resultNodes[i].show();
        }
    },
    
    reset: function() {
        for ( var i = 0; i < this.resultNodes.length; i++ ) {
            this.resultNodes[i].reset();
        }
        this.resultNodes = [];
        this.totalResults = 0;
    }
    
};

site.endeca.resultsgroup.contentzones = generic.endeca.resultsgroup.contentzones;
;
generic.endeca.resultsgroup.pagination = {
    
    displayResults: function( args ) {
        var args = args || {};
        
        args.childClass = 'pagination';
        
        var that = this;
        jQuery('.pagination').each( function() {
            that.parentNode = jQuery(this);
            args.resultData = [that.resultData];
            that._super(args);
        });
    }
};

site.endeca.resultsgroup.pagination = generic.endeca.resultsgroup.pagination;

;
generic.endeca.resultsgroup.refinements = {
    
    initialize: function( args ) {
        this.moreRefinements = [];
        this._super( args );
    },
    
    displayResults: function( args ) {
        var args = args || {};
        
        args.childClass = 'refinements';
        this._super( args );
        
        var that = this;        
        jQuery('.expand-all').each( function( el, index ) {
            if ( that.moreRefinements.length ) {
                // Mixed in via endeca.mixins.links...
                if ( that.displayResultCallback ) { 
                    that.displayResultCallback({
                        "Selection Link" : 'Ne=' + that.moreRefinements().join('+'),
                        "node": el
                    }); 
                }
                el.show();
            } else {
                el.hide();
            }
        });
    },
    
    moreRefinements: function() {
        if ( this.moreRefinements.length ) {
            return this.moreRefinements;
        } else {
            for ( var i = 0; i < this.resultNodes.length; i++ ) {
                if ( this.resultNodes[i].moreRefinement ) { this.moreRefinements.push( this.resultNodes[i].moreRefinement ); }
            }
        }
    },
    
    reset: function( args ) {
        this.moreRefinements = [];
        this._super( args );
    }
    
};

site.endeca.resultsgroup.refinements = generic.endeca.resultsgroup.refinements;

;
site.endeca.result.product = jQuery.extend( true, {}, generic.endeca.result.product, {

    setupShades: function() {

        var skus = this.resultData.skus;

        for ( var i = 0; i < skus.length; i++ ) {
            skus[i].PRODUCT_ID = this.resultData.PRODUCT_ID;
            skus[i].url = this.resultData.url;
        }

        var shadesNode = this.node.find('.shades');
        var shadesContainerNode = this.node.find('.shade-select-container');
        var shadesListNode = this.node.find('.shade-select');
        var priceNode = this.node.find('.size-price');
        var imageNode = this.node.find('.sku-image');

        if ( shadesNode.length ) {
            shadesNode.addClass( 'shades_' + this.resultData.skus.length );
            $(skus).each(function(index, sku) {
              var shadeHex = sku.HEX_VALUE_STRING;
              // explode
              var shadeHex = shadeHex.split(',');
              if(shadeHex.length == 1) {
                sku['SWATCH_TYPE'] = 'single';
                sku['HEX_VALUE_1'] = shadeHex[0];
              }else if(shadeHex.length == 2){
                sku['SWATCH_TYPE'] = 'duo';
                sku['HEX_VALUE_1'] = shadeHex[0];
                sku['HEX_VALUE_2'] = shadeHex[1];
              }else if(shadeHex.length == 3){
                sku['SWATCH_TYPE'] = 'trio';
                sku['HEX_VALUE_1'] = shadeHex[0];
                sku['HEX_VALUE_2'] = shadeHex[1];
                sku['HEX_VALUE_3'] = shadeHex[2];
              }else if(shadeHex.length == 5){
                sku['SWATCH_TYPE'] = 'quint';
                sku['HEX_VALUE_1'] = shadeHex[0];
                sku['HEX_VALUE_2'] = shadeHex[1];
                sku['HEX_VALUE_3'] = shadeHex[2];
                sku['HEX_VALUE_4'] = shadeHex[3];
                sku['HEX_VALUE_5'] = shadeHex[4];
              }
              //misc flag for skus
              var skuMiscFlag =  sku.MISC_FLAG;
              if(skuMiscFlag == 1){
                sku['MISC_FLAG_TEXT'] = '- ' + rb.endeca.misc_flag_new;
              }else if(skuMiscFlag == 2){
                sku['MISC_FLAG_TEXT'] = '- ' + rb.endeca.misc_flag_limited_edition;
              }else if(skuMiscFlag == 3){
                sku['MISC_FLAG_TEXT'] = '- ' + rb.endeca.misc_flag_new_shades;
              }else if(skuMiscFlag == 94 || skuMiscFlag == 5){
                sku['MISC_FLAG_TEXT'] = '- ' + rb.endeca.misc_flag_online_exclusive;
              }else{
                sku['MISC_FLAG_TEXT'] = '';
              }
            });

            this.shadeResults = new site.endeca.results({
                resultData: skus,
                parentNode: shadesNode,
                childClass: 'shade',
                configuration: this.configuration,
                mixins: this.mixins
            });
            this.shadeResults.displayResults();
            this.shadeResults.show();
        }

        if ( shadesListNode.length > 0 ) {
            shadesListNode.addClass( 'shades_' + this.resultData.skus.length );

            this.shadeListResults = new site.endeca.results({
                resultData: skus,
                parentNode: shadesListNode,
                childClass: 'shade',
                configuration: jQuery.extend( {
                    shadeTemplatePath: '/templates/endeca/products/shade-select.tmpl'
                }, this.configuration ),
                mixins: this.mixins
            });
            this.shadeListResults.displayResults();
            //this.shadeListResults.show();
        }

        var that = this;

        this.node.bind( 'sku:select', function( event, sku ) {
            // that.setupAddToBag( sku.SKU_BASE_ID );
            if ( priceNode.length ) {
                var formattedPrice = (_.isUndefined(sku.formattedPrice)) ? '' : sku.formattedPrice;
                var productSize = (_.isUndefined(sku.PRODUCT_SIZE)) ? '' : sku.PRODUCT_SIZE;
                priceNode.html( '<span class="text--bold">' + formattedPrice + '</span> ' + productSize );

            }
            if ( imageNode.length ) {
                imageNode.attr( 'src', sku.XS_IMAGE );
            }
        });
        
        if ( site && site.ShadePicker ) {
            this.shadePricker = new site.ShadePicker( this.resultData );
            shadesContainerNode.show();
        }
    },
    setupAddToBag: function( sku ) {
        var skuBaseId = typeof sku==="number" ? sku : sku.SKU_BASE_ID;
        var $addButton = this.node.find("a.btn-add-to-bag");
        $addButton.attr("data-skubaseid", skuBaseId );
        site.createAddButton($addButton);
        this.setupQuantitySelect();
        this.setupMiscFlag();
        var $wishlistNode = this.node.find(".js-add-to-favorites");
        site.addFavoritesButton($wishlistNode);
    },
    setupQuantitySelect : function() {
      var $qtySelectNode = this.node.find(".search-product__quantity");
      if( $qtySelectNode.length < 1 ) return null;
      site.qtySelectMenu($qtySelectNode);
      $qtySelectNode.selectBox();
    },
    setupSizeSelect: function() {
        var sizeSelectNode = this.node.find('.size-select');
        var priceNode = this.node.find('.size-price');

        if ( sizeSelectNode.length ) {
            if( this.resultData.skus.length > 1 ){
                priceNode.hide();
                this.sizeResults = new site.endeca.results({
                    resultData: this.resultData.skus,
                    parentNode: sizeSelectNode,
                    childClass: 'size',
                    configuration: this.configuration,
                    mixins: this.mixins
                });
                this.sizeResults.displayResults();
                this.sizeResults.show();
                sizeSelectNode.selectBox();

                var that = this;

                sizeSelectNode.change(function(event) {
                  var selectedSku = sizeSelectNode.find('option:selected').val();
                  var skuData = _.find(that.resultData.skus, function(sku){ return sku.SKU_BASE_ID== selectedSku; });
                  site.skuSelect(skuData);
                });
            }
        }
    },
    setupQuickShop: function() {
        //site.quickshop(categoryData);
    },
    setupMiscFlag: function(){
      var miscFlagNode = this.node.find('.misc-flag');
      //misc flag - product level
      var miscFlag =  this.resultData.MISC_FLAG;
      var miscFlagText = false;
      if(miscFlag == 1){
        miscFlagText = rb.endeca.misc_flag_new;
      }else if(miscFlag == 2){
        miscFlagText = rb.endeca.misc_flag_limited_edition;
      }else if(miscFlag == 3){
        miscFlagText = rb.endeca.misc_flag_new_shades;
      }else if(miscFlag == 94 || miscFlag == 5){
        miscFlagText = rb.endeca.misc_flag_online_exclusive;
      }
      if(miscFlagText){
        console.log(miscFlagText);
        miscFlagNode.html(miscFlagText);
        miscFlagNode.show();
      }
    }
});
;
/**
 * @file configuration.js
 * Sitewide Endeca configuration.
 * Anything set here will be used as the default for all settings used by the endeca instances
 * on the page. These can be overwritten in the instance configuration files for each
 * endeca instance.
*/

jQuery(document).ready(function() {
  site.endeca.configuration = {
    query: {
      MDEXHost: 'localhost',
      MDEXPort: {
        'en_US': 26300,
        'en_CA': 26300,
        'fr_CA': 26305,
        'zh_TW': 26310,
        'en_AU': 26315,
        'en_GB': 26335,
        'de_AT': 26320,
        'de_DE': 26325,
        'fr_FR': 26330,
        'en_AU': 26315,
        'pl_PL': 26340,
        'de_CH': 26345,
        'fr_CH': 26350,
        'zh_CN': 26355,
        'ja_JP': 26360,
        'da_DK': 26365,
        'en_ZA': 26370,
        'es_MX': 26380,
        'ko_KR': 26385,
        'en_MY': 26375
      },
      logHost: generic.endeca.generic.env.domain.match(/www/) ? 'njlndca01' : 'localhost',
      logPort: {
        'en_US': 26304,
        'en_CA': 26304,
        'fr_CA': 26309,
        'zh_TW': 26314,
        'en_AU': 26319,
        'en_GB': 26339,
        'de_AT': 26324,
        'de_DE': 26329,
        'fr_FR': 26334,
        'en_AU': 26319,
        'pl_PL': 26344,
        'de_CH': 26349,
        'fr_CH': 26354,
        'zh_CN': 26359,
        'ja_JP': 26364,
        'da_DK': 26369,
        'en_ZA': 26374,
        'es_MX': 26384,
        'ko_KR': 26389,
        'en_MY': 26379
      },

      defaultDimensionIds: [8061,8173,8174,8095,8063,8050,8089,8051,8175],
      
      
      configuredRangeFilters: {
        skuShoppable: 's_shoppable|GT+0',
        skuPromotional: 's_promotional|GT+0',
        skuSearchable: 's_searchable|GT+0',
        productTrFlag: 'p_TR_FLAG|LT+1',
        productDisplayable: 'p_displayable|GT+0',
        productShoppable: 'p_shoppable|GT+0'
      },

      defaultRangeFilters: ['skuSearchable', 'productShoppable', 'productDisplayable'],

      configuredRecordFilters: {
        products: 'rec_type:product',
        content: 'rec_type:content',
        locale: 'locale:' + ( jQuery.cookie('LOCALE') || 'en_US' ),
        activeSkus: 'NOT(s_INVENTORY_STATUS:5)',
        discontinued: 'NOT(s_discontinued:1)',
        shoppableOrComingSoon: 'OR(s_shoppable:1,s_isComingSoon:1)'
      }

    },

    coremetricsEnabled: false,
    // @todo update when coremetrics is configured
//    coremetricsEnabled: true,
    omnitureEnabled: true,
    contentzones: {},
    mixins: {}

  };
});
;
/*
  Endeca control class for the typeahead endeca instance.
*/
var global = global || {};
var site = site || {};
site.endeca = site.endeca || {};
site.endeca.instances = site.endeca.instances || {};
site.endeca.instances.typeahead = site.endeca.instances.typeahead || {};

site.endeca.instances.typeahead.control = site.endeca.generic.Class.create(site.endeca.control, {
  initialize: function (args) {
    this.timer = 0;
    this._super(args);

    if (this.nodes.wrapper.length && this.nodes.inputElement.length) {
      var that = this;
      var bind_name = 'input';
      if (navigator.userAgent.indexOf("MSIE") != -1){
        bind_name = 'propertychange';
      }
      this.nodes.inputElement.bind(bind_name, that, that.onKeyUp);
      //this.nodes.inputElement.bind('keyup', that, that.onKeyUp);
      this._watchToClose();
    }
  },

  onKeyUp: function (event) {
    var that = event.data;
    clearTimeout(that.timer);
    that.timer = setTimeout(function () {
      var searchTerm = jQuery.trim(that.nodes.inputElement[0].value)/* + "*"*/;
      if (searchTerm != that.searchTerm && searchTerm.length >= that.configuration.minSearchLength) {
        that.searchTerm = searchTerm;
        that.search({
          searchTerm: searchTerm
        });
      }
    }, 200);
  },

  _watchToClose: function () {
    var that = this;

    // making they typeahead consistant with main-pc.js
    // jQuery(document).bind('click', that, function (event) {
    //   var tgt = event.target;
    //   var that = event.data;

    //   if (!jQuery(tgt).parents(that.nodes.wrapper.selector).length &&
    //     tgt != that.nodes.inputElement[0] &&
    //     tgt != that.nodes.wrapper[0]) {
    //     that.nodes.wrapper.hide();
    //     return;
    //   }

    //   that.nodes.wrapper.hide();
    // });
  },

  searchCompleted: function () {
    if (!this._super()) {
      return;
    }
    this.results.products.resultData = this.catalogs.product.resultList;

    if (this.results.products.resultData.length) {
      this.results.products.displayResults();
      this.results.products.show();
      this.hasResults = true;
      jQuery('.el-search-block__links').hide();
    } else {
      this.results.products.hide();
      jQuery('.el-search-block__links').show();
    }

    if ( this.hasResults || this.wildcardSearch ) {
        /* summary */
        this.results.summary.resultData = jQuery.extend( this.meta.searchInfo, { breadcrumbs: this.meta.dimensions.breadcrumbs } );
        this.results.summary.hasResults = this.hasResults;
        this.results.summary.displayResult();
    }

    // mobile close
    var that = this;
    jQuery('.typeahead__close').unbind('click');
    jQuery('.typeahead__close').bind('click', that, function (event) {
      that.nodes.wrapper.hide();

      //remove header class
      jQuery('body.device-mobile .page-header').removeClass(Drupal.ELB.ui.search_class);
    });
    if ( this.hasResults ) {
      /* view results */
      this.results.seeResults.resultData = [{
        'url': this.configuration.fullSearchBaseUrl + this.searchTerm
      }];

      jQuery('.el-mobile-search-block__btn-submit').click(function(event) {
          event.preventDefault();
          window.location.href = that.configuration.fullSearchBaseUrl + that.searchTerm;
      });

      this.results.seeResults.displayResults();
      this.results.seeResults.displayResultNodes();
      this.results.seeResults.show();
    } // if ( this.hasResults ) 

    //add header class
    jQuery('body.device-mobile .page-header').addClass(Drupal.ELB.ui.search_class);
    
    this.nodes.wrapper.show();
    this.displayResults();
    // warning: no code runs after above line
    
    // var me = this.nodes;
    // this.nodes.wrapper.find('.result a').bind('click', function (e) {
    //   //e.preventDefault();
    //   if (this.parentElement.parentNode.className = "term-results") {
    //     //  site.endeca.coremetrics.termClick();
    //   } else {
    //     site.endeca.coremetrics.productClick();
    //   }
    //   //me.inputElement.val(this.text);
    //   //me.formSubmit.submit();
    //   //console.log( 'this.nodes: ' + me );
    //   return true;
    // });

  }
});
;
/*
  Endeca configuration for the typeahead endeca instance.

  See comments in site.endeca.instances.search.configuration
*/

var site = site || {};
site.endeca = site.endeca || {};
site.endeca.instances = site.endeca.instances || {};
site.endeca.instances.typeahead = site.endeca.instances.typeahead || {};

jQuery(document).ready(function(){
  var predictiveLimit = ($('body').hasClass('device-pc')) ? 4 : 3;
  site.endeca.instances.typeahead.configuration = jQuery.extend( true, {}, site.endeca.configuration, {
    followRedirects: false,
    minSearchLength: 2,
		fullSearchBaseUrl: "/esearch?search=",

    nodes: {
      wrapper: jQuery('#typeahead-wrapper'),
      inputElement: jQuery('#perlgem-search-form #search'),
      loading: jQuery('.loading', '#typeahead-wrapper'),
      formSubmit: jQuery('.form-submit', '#perlgem-search-form')
    },

    queries: {
      product: {
        /*searchKey: 'typeahead',*/
        recordsPerPage: predictiveLimit,
        recordFilters: ['discontinued', 'activeSkus', 'products'],
      }
    },

    results: {
      products: {
        baseClass: 'site.endeca.results',
        instanceArgs: {
          parentNode: jQuery('.typeahead-product-results', '#typeahead-wrapper'),
          childTemplatePath: '/templates/endeca/typeahead/product-result.tmpl'
          //childTemplatePathSku: '/templates/endeca/typeahead/product-sku-result.tmpl'
        },
        configuration: {
          limit: predictiveLimit
        }
      },
      summary: {
        baseClass: 'site.endeca.result',
        instanceArgs: {
          parentNode: jQuery('.typeahead-summary')
        },
        configuration: {
          templatePaths: {
            results: '/templates/endeca/typeahead/results.tmpl',
            noResults: '/templates/endeca/typeahead/no-results.tmpl'
          }
        }
      },
      seeResults: {
        baseClass: 'site.endeca.results',
        instanceArgs: {
          parentNode: jQuery('.typeahead-see-results', '#typeahead-wrapper'),
          templatePath: '/templates/endeca/typeahead/term-result.tmpl'
        }
      }
    }
  });

  new site.endeca.instances.typeahead.control( site.endeca.instances.typeahead.configuration );
});
;
/*! jQuery UI - v1.10.3 - 2014-01-05
* http://jqueryui.com
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(t,e){var i="ui-effects-";t.effects={effect:{}},function(t,e){function i(t,e,i){var s=u[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:t>s.max?s.max:t)}function s(i){var s=h(),n=s._rgba=[];return i=i.toLowerCase(),f(l,function(t,a){var o,r=a.re.exec(i),l=r&&a.parse(r),h=a.space||"rgba";return l?(o=s[h](l),s[c[h].cache]=o[c[h].cache],n=s._rgba=o._rgba,!1):e}),n.length?("0,0,0,0"===n.join()&&t.extend(n,a.transparent),s):a[i]}function n(t,e,i){return i=(i+1)%1,1>6*i?t+6*(e-t)*i:1>2*i?e:2>3*i?t+6*(e-t)*(2/3-i):t}var a,o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],h=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=h.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),h.fn=t.extend(h.prototype,{parse:function(n,o,r,l){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(o),o=e);var u=this,d=t.type(n),p=this._rgba=[];return o!==e&&(n=[n,o,r,l],d="array"),"string"===d?this.parse(s(n)||a._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(n[e.idx],e)}),this):"object"===d?(n instanceof h?f(c,function(t,e){n[e.cache]&&(u[e.cache]=n[e.cache].slice())}):f(c,function(e,s){var a=s.cache;f(s.props,function(t,e){if(!u[a]&&s.to){if("alpha"===t||null==n[t])return;u[a]=s.to(u._rgba)}u[a][e.idx]=i(n[t],e,!0)}),u[a]&&0>t.inArray(null,u[a].slice(0,3))&&(u[a][3]=1,s.from&&(u._rgba=s.from(u[a])))}),this):e},is:function(t){var i=h(t),s=!0,n=this;return f(c,function(t,a){var o,r=i[a.cache];return r&&(o=n[a.cache]||a.to&&a.to(n._rgba)||[],f(a.props,function(t,i){return null!=r[i.idx]?s=r[i.idx]===o[i.idx]:e})),s}),s},_space:function(){var t=[],e=this;return f(c,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=h(t),n=s._space(),a=c[n],o=0===this.alpha()?h("transparent"):this,r=o[a.cache]||a.to(o._rgba),l=r.slice();return s=s[a.cache],f(a.props,function(t,n){var a=n.idx,o=r[a],h=s[a],c=u[n.type]||{};null!==h&&(null===o?l[a]=h:(c.mod&&(h-o>c.mod/2?o+=c.mod:o-h>c.mod/2&&(o-=c.mod)),l[a]=i((h-o)*e+o,n)))}),this[n](l)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=h(e)._rgba;return h(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),h.fn.parse.prototype=h.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,a=t[2]/255,o=t[3],r=Math.max(s,n,a),l=Math.min(s,n,a),h=r-l,c=r+l,u=.5*c;return e=l===r?0:s===r?60*(n-a)/h+360:n===r?60*(a-s)/h+120:60*(s-n)/h+240,i=0===h?0:.5>=u?h/c:h/(2-c),[Math.round(e)%360,i,u,null==o?1:o]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],a=t[3],o=.5>=s?s*(1+i):s+i-s*i,r=2*s-o;return[Math.round(255*n(r,o,e+1/3)),Math.round(255*n(r,o,e)),Math.round(255*n(r,o,e-1/3)),a]},f(c,function(s,n){var a=n.props,o=n.cache,l=n.to,c=n.from;h.fn[s]=function(s){if(l&&!this[o]&&(this[o]=l(this._rgba)),s===e)return this[o].slice();var n,r=t.type(s),u="array"===r||"object"===r?s:arguments,d=this[o].slice();return f(a,function(t,e){var s=u["object"===r?t:e.idx];null==s&&(s=d[e.idx]),d[e.idx]=i(s,e)}),c?(n=h(c(d)),n[o]=d,n):h(d)},f(a,function(e,i){h.fn[e]||(h.fn[e]=function(n){var a,o=t.type(n),l="alpha"===e?this._hsla?"hsla":"rgba":s,h=this[l](),c=h[i.idx];return"undefined"===o?c:("function"===o&&(n=n.call(this,c),o=t.type(n)),null==n&&i.empty?this:("string"===o&&(a=r.exec(n),a&&(n=c+parseFloat(a[2])*("+"===a[1]?1:-1))),h[i.idx]=n,this[l](h)))})})}),h.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,n){var a,o,r="";if("transparent"!==n&&("string"!==t.type(n)||(a=s(n)))){if(n=h(a||n),!d.rgba&&1!==n._rgba[3]){for(o="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&o&&o.style;)try{r=t.css(o,"backgroundColor"),o=o.parentNode}catch(l){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(l){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=h(e.elem,i),e.end=h(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},h.hook(o),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},a=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(e){var i,s,n=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,a={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(a[t.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(a[i]=n[i]);return a}function s(e,i){var s,n,o={};for(s in i)n=i[s],e[s]!==n&&(a[s]||(t.fx.step[s]||!isNaN(parseFloat(n)))&&(o[s]=n));return o}var n=["add","remove","toggle"],a={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,i){t.fx.step[i]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(jQuery.style(t.elem,i,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(e,a,o,r){var l=t.speed(a,o,r);return this.queue(function(){var a,o=t(this),r=o.attr("class")||"",h=l.children?o.find("*").addBack():o;h=h.map(function(){var e=t(this);return{el:e,start:i(this)}}),a=function(){t.each(n,function(t,i){e[i]&&o[i+"Class"](e[i])})},a(),h=h.map(function(){return this.end=i(this.el[0]),this.diff=s(this.start,this.end),this}),o.attr("class",r),h=h.map(function(){var e=this,i=t.Deferred(),s=t.extend({},l,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,s),i.promise()}),t.when.apply(t,h.get()).done(function(){a(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),l.complete.call(o[0])})})},t.fn.extend({addClass:function(e){return function(i,s,n,a){return s?t.effects.animateClass.call(this,{add:i},s,n,a):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,s,n,a){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},s,n,a):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(i){return function(s,n,a,o,r){return"boolean"==typeof n||n===e?a?t.effects.animateClass.call(this,n?{add:s}:{remove:s},a,o,r):i.apply(this,arguments):t.effects.animateClass.call(this,{toggle:s},n,a,o)}}(t.fn.toggleClass),switchClass:function(e,i,s,n,a){return t.effects.animateClass.call(this,{add:i,remove:e},s,n,a)}})}(),function(){function s(e,i,s,n){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(n=s,s=i,i={}),t.isFunction(s)&&(n=s,s=null),i&&t.extend(e,i),s=s||i.duration,e.duration=t.fx.off?0:"number"==typeof s?s:s in t.fx.speeds?t.fx.speeds[s]:t.fx.speeds._default,e.complete=n||i.complete,e}function n(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}t.extend(t.effects,{version:"1.10.3",save:function(t,e){for(var s=0;e.length>s;s++)null!==e[s]&&t.data(i+e[s],t[0].style[e[s]])},restore:function(t,s){var n,a;for(a=0;s.length>a;a++)null!==s[a]&&(n=t.data(i+s[a]),n===e&&(n=""),t.css(s[a],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},s=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:e.width(),height:e.height()},a=document.activeElement;try{a.id}catch(o){a=document.body}return e.wrap(s),(e[0]===a||t.contains(e[0],a))&&t(a).focus(),s=e.parent(),"static"===e.css("position")?(s.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,s){i[s]=e.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(n),s.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).focus()),e},setTransition:function(e,i,s,n){return n=n||{},t.each(i,function(t,i){var a=e.cssUnit(i);a[0]>0&&(n[i]=a[0]*s+a[1])}),n}}),t.fn.extend({effect:function(){function e(e){function s(){t.isFunction(a)&&a.call(n[0]),t.isFunction(e)&&e()}var n=t(this),a=i.complete,r=i.mode;(n.is(":hidden")?"hide"===r:"show"===r)?(n[r](),s()):o.call(n[0],i,s)}var i=s.apply(this,arguments),n=i.mode,a=i.queue,o=t.effects.effect[i.effect];return t.fx.off||!o?n?this[n](i.duration,i.complete):this.each(function(){i.complete&&i.complete.call(this)}):a===!1?this.each(e):this.queue(a||"fx",e)},show:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="show",this.effect.call(this,i)}}(t.fn.show),hide:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="hide",this.effect.call(this,i)}}(t.fn.hide),toggle:function(t){return function(e){if(n(e)||"boolean"==typeof e)return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="toggle",this.effect.call(this,i)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),s=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(s=[parseFloat(i),e])}),s}})}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;((e=Math.pow(2,--i))-1)/11>t;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}()})(jQuery);;
/*
 * jQuery FlexSlider v2.2.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // depricating this idea, as devices are being released with both of these events
        //eventType = (touch) ? "touchend" : "click",
        eventType = "click touchend MSPointerUp",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {},
        focused = true;

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) slider.currentSlide = 0;
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") slider.vars.animation = "swing";
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) methods.controlNav.setup();

        // DIRECTIONNAV:
        if (slider.vars.directionNav) methods.directionNav.setup();

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) methods.pausePlay.setup();

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) methods.pauseInvisible.init();

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) slider.pause();
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) slider.play();
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) methods.asNav.setup();

        // TOUCH
        if (touch && slider.vars.touch) methods.touch();

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) $(window).bind("resize orientationchange focus", methods.resize);

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.on(eventType, function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture)
                          e.currentTarget._gesture.addPointer(e.pointerId);
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"/>' : '<a>' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' != captn && undefined != captn ) item += '<span class="' + namespace + 'caption">' + captn + '</span>';
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            el.addEventListener('touchstart', onTouchStart, false);

            function onTouchStart(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;

                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            }

            function onTouchMove(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : startX - localX;
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            }

            function onTouchEnd(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            }
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) slider.doMath();

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) methods.smoothHeight();
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        $clone.find( '[id]' ).each(function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var prefixes = ['webkit','moz','ms','o'];

          if ('hidden' in document) return 'hidden';
          for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Hidden') in document)
            methods.pauseInvisible.visProp = prefixes[i] + 'Hidden';
          }
          if (methods.pauseInvisible.visProp) {
            var evtname = methods.pauseInvisible.visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                else slider.pause(); //Or just pause
              }
              else {
                if(slider.started) slider.play(); //Initiated before, just play
                else (slider.vars.initDelay > 0) ? setTimeout(slider.play, slider.vars.initDelay) : slider.play(); //Didn't init before: simply init or wait for it
              }
            });
          }
        },
        isHidden: function() {
          return document[methods.pauseInvisible.visProp] || false;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) slider.pause();

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) methods.sync("animate");

        // CONTROLNAV
        if (slider.vars.controlNav) methods.controlNav.active();

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) methods.directionNav.update();

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) slider.pause();
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            //margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              slider.wrapup(dimension);
            });
          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
            //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) methods.smoothHeight(slider.vars.animationSpeed);
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) slider.flexAnimate(slider.getTarget("next"));
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) methods.pausePlay.update("play");
      // SYNC:
      if (slider.syncExists) methods.sync("pause");
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) clearInterval(slider.animatedSlides);
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) methods.pausePlay.update("pause");
      // SYNC:
      if (slider.syncExists) methods.sync("play");
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
         slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) slider.container.css(slider.args);

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") slider.container.find('.clone').remove();
          // slider.container.append(slider.slides.first().clone().addClass('clone').attr('aria-hidden', 'true')).prepend(slider.slides.last().clone().addClass('clone').attr('aria-hidden', 'true'));
		      methods.uniqueID( slider.slides.first().clone().addClass('clone').attr('aria-hidden', 'true') ).appendTo( slider.container );
		      methods.uniqueID( slider.slides.last().clone().addClass('clone').attr('aria-hidden', 'true') ).prependTo( slider.container );
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) methods.smoothHeight();
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) methods.smoothHeight();
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) methods.directionNav.update();

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) options = {};

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === true ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) options.start($this);
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") $slider.flexAnimate(options, true);
      }
    }
  };
})(jQuery);
;
/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
;
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,g,e=this;if(e.defaults={accessibility:!0,appendArrows:a(c),arrows:!0,prevArrow:'<button type="button" class="slick-prev">Previous</button>',nextArrow:'<button type="button" class="slick-next">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button">'+(b+1)+"</button>"},dots:!1,draggable:!0,easing:"linear",fade:!1,infinite:!0,lazyLoad:"ondemand",onBeforeChange:null,onAfterChange:null,onInit:null,onReInit:null,pauseOnHover:!0,pauseOnDotsHover:!1,responsive:null,slide:"div",slidesToShow:1,slidesToScroll:1,speed:300,swipe:!0,touchMove:!0,touchThreshold:5,useCSS:!0,vertical:!1},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentSlide:0,currentLeft:null,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.paused=!1,e.positionProp=null,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.windowWidth=0,e.windowTimer=null,e.options=a.extend({},e.defaults,d),e.originalSettings=e.options,f=e.options.responsive||null,f&&f.length>-1){for(g in f)f.hasOwnProperty(g)&&(e.breakpoints.push(f[g].breakpoint),e.breakpointSettings[f[g].breakpoint]=f[g].settings);e.breakpoints.sort(function(a,b){return b-a})}e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.init()}var b=0;return c}(),b.prototype.addSlide=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).remove(),e.$slideTrack.append(e.$slides),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateSlide=function(b,c){var d={},e=this;e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}}):(e.applyTransition(),d[e.animType]=e.options.vertical===!1?"translate3d("+b+"px, 0px, 0px)":"translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.applyTransition=function(a){var b=this,c={};c[b.transitionType]=b.options.fade===!1?b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:"opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(0===a.currentSlide-1&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow=a(b.options.prevArrow),b.$nextArrow=a(b.options.nextArrow),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.appendTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled"))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="slick-dots">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.$slider),b.$dots.find("li").first().addClass("slick-active")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slidesCache=b.$slides,b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),b.options.centerMode===!0&&(b.options.slidesToScroll=1,0===b.options.slidesToShow%2&&(b.options.slidesToShow=3)),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.options.accessibility===!0&&b.$list.prop("tabIndex",0),b.setSlideClasses("number"==typeof this.currentSlide?this.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.checkResponsive=function(){var c,d,b=this;if(b.originalSettings.responsive&&b.originalSettings.responsive.length>-1&&null!==b.originalSettings.responsive){d=null;for(c in b.breakpoints)b.breakpoints.hasOwnProperty(c)&&a(window).width()<b.breakpoints[c]&&(d=b.breakpoints[c]);null!==d?null!==b.activeBreakpoint?d!==b.activeBreakpoint&&(b.activeBreakpoint=d,b.options=a.extend({},b.options,b.breakpointSettings[d]),b.refresh()):(b.activeBreakpoint=d,b.options=a.extend({},b.options,b.breakpointSettings[d]),b.refresh()):null!==b.activeBreakpoint&&(b.activeBreakpoint=null,b.options=a.extend({},b.options,b.originalSettings),b.refresh())}},b.prototype.changeSlide=function(b){var c=this,d=a(b.target);switch(d.is("a")&&b.preventDefault(),b.data.message){case"previous":c.slideCount>c.options.slidesToShow&&c.slideHandler(c.currentSlide-c.options.slidesToScroll);break;case"next":c.slideCount>c.options.slidesToShow&&c.slideHandler(c.currentSlide+c.options.slidesToScroll);break;case"index":c.slideHandler(d.parent().index()*c.options.slidesToScroll);break;default:return!1}},b.prototype.destroy=function(){var b=this;b.autoPlayClear(),b.touchObject={},a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&(b.$prevArrow.remove(),b.$nextArrow.remove()),b.$slides.parent().hasClass("slick-track")&&b.$slides.unwrap().unwrap(),b.$slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style"),b.$slider.removeClass("slick-slider"),b.$slider.removeClass("slick-initialized"),b.$list.off(".slick"),a(window).off(".slick-"+b.instanceUid)},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:1e3}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:1e3}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.filterSlides=function(a){var b=this;null!==a&&(b.unload(),b.$slideTrack.children(this.options.slide).remove(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var e,a=this,b=0,c=0,d=0;for(e=a.options.infinite===!0?a.slideCount+a.options.slidesToShow-a.options.slidesToScroll:a.slideCount;e>b;)d++,c+=a.options.slidesToScroll,b=c+a.options.slidesToShow;return d},b.prototype.getLeft=function(a){var c,d,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideWidth*b.options.slidesToShow,e=-1*d*b.options.slidesToShow),0!==b.slideCount%b.options.slidesToScroll&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideCount%b.options.slidesToShow*b.slideWidth,e=-1*b.slideCount%b.options.slidesToShow*d)):0!==b.slideCount%b.options.slidesToShow&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.options.slidesToShow*b.slideWidth-b.slideCount%b.options.slidesToShow*b.slideWidth,e=b.slideCount%b.options.slidesToShow*d),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?-1*a*b.slideWidth+b.slideOffset:-1*a*d+e},b.prototype.init=function(){var b=this;a(b.$slider).hasClass("slick-initialized")||(a(b.$slider).addClass("slick-initialized"),b.buildOut(),b.setProps(),b.startLoad(),b.loadSlider(),b.initializeEvents(),b.checkResponsive()),null!==b.options.onInit&&b.options.onInit.call(this,b)},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",b.autoPlayClear).on("mouseleave.slick",b.autoPlay)},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.options.pauseOnHover===!0&&b.options.autoplay===!0&&(b.$list.on("mouseenter.slick",b.autoPlayClear),b.$list.on("mouseleave.slick",b.autoPlay)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,function(){b.checkResponsive(),b.setPosition()}),a(window).on("resize.slick.slick-"+b.instanceUid,function(){a(window).width!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.setPosition()},50))}),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;37===a.keyCode?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.changeSlide({data:{message:"next"}})},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy");b.css({opacity:0}).attr("src",c).removeAttr("data-lazy").removeClass("slick-loading").load(function(){b.animate({opacity:1},200)})})}var c,d,e,f,b=this;b.options.centerMode===!0||b.options.fade===!0?(e=b.options.slidesToShow+b.currentSlide-1,f=e+b.options.slidesToShow+2):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.postSlide=function(a){var b=this;null!==b.options.onAfterChange&&b.options.onAfterChange.call(this,b,a),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]").length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(){var b=this,c=b.currentSlide;b.destroy(),a.extend(b,b.initials),b.currentSlide=c,b.init()},b.prototype.reinit=function(){var a=this;a.$slides=a.$slideTrack.children(a.options.slide).addClass("slick-slide"),a.slideCount=a.$slides.length,a.currentSlide>=a.slideCount&&0!==a.currentSlide&&(a.currentSlide=a.currentSlide-a.options.slidesToScroll),a.setProps(),a.setupInfinite(),a.buildArrows(),a.updateArrows(),a.initArrowEvents(),a.buildDots(),a.updateDots(),a.initDotEvents(),a.setSlideClasses(0),a.setPosition(),null!==a.options.onReInit&&a.options.onReInit.call(this,a)},b.prototype.removeSlide=function(a,b){var c=this;return"boolean"==typeof a?(b=a,a=b===!0?0:c.slideCount-1):a=b===!0?--a:a,c.slideCount<1||0>a||a>c.slideCount-1?!1:(c.unload(),c.$slideTrack.children(this.options.slide).eq(a).remove(),c.$slides=c.$slideTrack.children(this.options.slide),c.$slideTrack.children(this.options.slide).remove(),c.$slideTrack.append(c.$slides),c.$slidesCache=c.$slides,c.reinit(),void 0)},b.prototype.setCSS=function(a){var d,e,b=this,c={};d="left"==b.positionProp?a+"px":"0px",e="top"==b.positionProp?a+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.centerMode===!0?a.$slideTrack.children(".slick-slide").width(a.slideWidth):a.$slideTrack.children(".slick-slide").width(a.slideWidth),a.options.vertical===!1?(a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length)),a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding})):(a.$list.height(a.$slides.first().outerHeight()*a.options.slidesToShow),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight()*a.$slideTrack.children(".slick-slide").length)),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"}))},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=-1*b.slideWidth*d,a(e).css({position:"relative",left:c,top:0,zIndex:800,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:900,opacity:1})},b.prototype.setPosition=function(){var a=this;a.setValues(),a.setDimensions(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade()},b.prototype.setProps=function(){var a=this;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==document.body.style.WebkitTransition||void 0!==document.body.style.MozTransition||void 0!==document.body.style.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),void 0!==document.body.style.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition"),void 0!==document.body.style.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition"),void 0!==document.body.style.msTransform&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=null!==a.animType},b.prototype.setValues=function(){var a=this;a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.slideWidth=a.options.vertical===!1?Math.ceil(a.listWidth/a.options.slidesToShow):Math.ceil(a.listWidth)},b.prototype.setSlideClasses=function(a){var c,d,e,b=this;b.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"),d=b.$slider.find(".slick-slide"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>0&&a<b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active"):d.length<=b.options.slidesToShow?d.addClass("slick-active"):(e=b.options.infinite===!0?b.options.slidesToShow+a:a,d.slice(e,e+b.options.slidesToShow).addClass("slick-active")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if((b.options.fade===!0||b.options.vertical===!0)&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone().attr("id","").prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone().attr("id","").appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.slideHandler=function(a){var b,c,d,e,f=null,g=this;return g.animating===!0?!1:(b=a,f=g.getLeft(b),d=g.getLeft(g.currentSlide),e=0!==g.slideCount%g.options.slidesToScroll?g.options.slidesToScroll:0,g.currentLeft=null===g.swipeLeft?d:g.swipeLeft,g.options.infinite===!1&&g.options.centerMode===!1&&(0>a||a>g.slideCount-g.options.slidesToShow+e)?(g.options.fade===!1&&(b=g.currentSlide,g.animateSlide(d,function(){g.postSlide(b)})),!1):g.options.infinite===!1&&g.options.centerMode===!0&&(0>a||a>g.slideCount-g.options.slidesToScroll)?(g.options.fade===!1&&(b=g.currentSlide,g.animateSlide(d,function(){g.postSlide(b)})),!1):(g.options.autoplay===!0&&clearInterval(g.autoPlayTimer),c=0>b?0!==g.slideCount%g.options.slidesToScroll?g.slideCount-g.slideCount%g.options.slidesToScroll:g.slideCount-g.options.slidesToScroll:b>g.slideCount-1?0:b,g.animating=!0,null!==g.options.onBeforeChange&&a!==g.currentSlide&&g.options.onBeforeChange.call(this,g,g.currentSlide,c),g.currentSlide=c,g.setSlideClasses(g.currentSlide),g.updateDots(),g.updateArrows(),g.options.fade===!0?(g.fadeSlide(c,function(){g.postSlide(c)}),!1):(g.animateSlide(f,function(){g.postSlide(c)}),void 0)))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?"left":360>=d&&d>=315?"left":d>=135&&225>=d?"right":"vertical"},b.prototype.swipeEnd=function(b){var c=this;if(c.dragging=!1,void 0===c.touchObject.curX)return!1;if(c.touchObject.swipeLength>=c.touchObject.minSwipe)switch(a(b.target).on("click.slick",function(b){b.stopImmediatePropagation(),b.stopPropagation(),b.preventDefault(),a(b.target).off("click.slick")}),c.swipeDirection()){case"left":c.slideHandler(c.currentSlide+c.options.slidesToScroll),c.touchObject={};break;case"right":c.slideHandler(c.currentSlide-c.options.slidesToScroll),c.touchObject={}}else c.touchObject.startX!==c.touchObject.curX&&(c.slideHandler(c.currentSlide),c.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1||b.options.draggable===!1&&!a.originalEvent.touches))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var c,d,e,f,b=this;return f=void 0!==a.originalEvent?a.originalEvent.touches:null,c=b.getLeft(b.currentSlide),!b.dragging||f&&1!==f.length?!1:(b.touchObject.curX=void 0!==f?f[0].pageX:a.clientX,b.touchObject.curY=void 0!==f?f[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),d=b.swipeDirection(),"vertical"!==d?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),e=b.touchObject.curX>b.touchObject.startX?1:-1,b.swipeLeft=b.options.vertical===!1?c+b.touchObject.swipeLength*e:c+b.touchObject.swipeLength*(b.$list.height()/b.listWidth)*e,b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):(b.setCSS(b.swipeLeft),void 0)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,b.dragging=!0,void 0)},b.prototype.unfilterSlides=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).remove(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&(b.$prevArrow.remove(),b.$nextArrow.remove()),b.$slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style")},b.prototype.updateArrows=function(){var a=this;a.options.arrows===!0&&a.options.infinite!==!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.removeClass("slick-disabled"),a.$nextArrow.removeClass("slick-disabled"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled"),a.$nextArrow.removeClass("slick-disabled")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&(a.$nextArrow.addClass("slick-disabled"),a.$prevArrow.removeClass("slick-disabled")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active"))},a.fn.slick=function(a){var c=this;return c.each(function(c,d){d.slick=new b(d,a)})},a.fn.slickAdd=function(a,b,c){var d=this;return d.each(function(d,e){e.slick.addSlide(a,b,c)})},a.fn.slickCurrentSlide=function(){var a=this;return a.get(0).slick.getCurrent()},a.fn.slickFilter=function(a){var b=this;return b.each(function(b,c){c.slick.filterSlides(a)})},a.fn.slickGoTo=function(a){var b=this;return b.each(function(b,c){c.slick.slideHandler(a)})},a.fn.slickNext=function(){var a=this;return a.each(function(a,b){b.slick.changeSlide({data:{message:"next"}})})},a.fn.slickPause=function(){var a=this;return a.each(function(a,b){b.slick.autoPlayClear(),b.slick.paused=!0})},a.fn.slickPlay=function(){var a=this;return a.each(function(a,b){b.slick.paused=!1,b.slick.autoPlay()})},a.fn.slickPrev=function(){var a=this;return a.each(function(a,b){b.slick.changeSlide({data:{message:"previous"}})})},a.fn.slickRemove=function(a,b){var c=this;return c.each(function(c,d){d.slick.removeSlide(a,b)})},a.fn.slickGetOption=function(a){var b=this;return b.get(0).slick.options[a]},a.fn.slickSetOption=function(a,b,c){var d=this;return d.each(function(d,e){e.slick.options[a]=b,c===!0&&(e.slick.unload(),e.slick.reinit())})},a.fn.slickUnfilter=function(){var a=this;return a.each(function(a,b){b.slick.unfilterSlides()})},a.fn.unslick=function(){var a=this;return a.each(function(a,b){b.slick&&b.slick.destroy()})}});;
/**
 * @file
 * Attaches behaviors for the Contextual module.
 */

(function ($) {

Drupal.contextualLinks = Drupal.contextualLinks || {};

/**
 * Attaches outline behavior for regions associated with contextual links.
 */
Drupal.behaviors.contextualLinks = {
  attach: function (context) {
    $('div.contextual-links-wrapper', context).once('contextual-links', function () {
      var $wrapper = $(this);
      var $region = $wrapper.closest('.contextual-links-region');
      var $links = $wrapper.find('ul.contextual-links');
      var $trigger = $('<a class="contextual-links-trigger" href="#" />').text(Drupal.t('Configure')).click(
        function () {
          $links.stop(true, true).slideToggle(100);
          $wrapper.toggleClass('contextual-links-active');
          return false;
        }
      );
      // Attach hover behavior to trigger and ul.contextual-links.
      $trigger.add($links).hover(
        function () { $region.addClass('contextual-links-region-active'); },
        function () { $region.removeClass('contextual-links-region-active'); }
      );
      // Hide the contextual links when user clicks a link or rolls out of the .contextual-links-region.
      $region.bind('mouseleave click', Drupal.contextualLinks.mouseleave);
      // Prepend the trigger.
      $wrapper.prepend($trigger);
    });
  }
};

/**
 * Disables outline for the region contextual links are associated with.
 */
Drupal.contextualLinks.mouseleave = function () {
  $(this)
    .find('.contextual-links-active').removeClass('contextual-links-active')
    .find('ul.contextual-links').hide();
};

})(jQuery);
;
/*
 * jQuery UI Datepicker 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function(d,A){function K(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._inDialog=this._datepickerShowing=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass=
"ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su",
"Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",
minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false};d.extend(this._defaults,this.regional[""]);this.dpDiv=d('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')}function F(a,b){d.extend(a,b);for(var c in b)if(b[c]==
null||b[c]==A)a[c]=b[c];return a}d.extend(d.ui,{datepicker:{version:"1.8.11"}});var y=(new Date).getTime();d.extend(K.prototype,{markerClassName:"hasDatepicker",log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){F(this._defaults,a||{});return this},_attachDatepicker:function(a,b){var c=null;for(var e in this._defaults){var f=a.getAttribute("date:"+e);if(f){c=c||{};try{c[e]=eval(f)}catch(h){c[e]=f}}}e=a.nodeName.toLowerCase();
f=e=="div"||e=="span";if(!a.id){this.uuid+=1;a.id="dp"+this.uuid}var i=this._newInst(d(a),f);i.settings=d.extend({},b||{},c||{});if(e=="input")this._connectDatepicker(a,i);else f&&this._inlineDatepicker(a,i)},_newInst:function(a,b){return{id:a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:!b?this.dpDiv:d('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')}},
_connectDatepicker:function(a,b){var c=d(a);b.append=d([]);b.trigger=d([]);if(!c.hasClass(this.markerClassName)){this._attachments(c,b);c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});this._autoSize(b);d.data(a,"datepicker",b)}},_attachments:function(a,b){var c=this._get(b,"appendText"),e=this._get(b,"isRTL");b.append&&
b.append.remove();if(c){b.append=d('<span class="'+this._appendClass+'">'+c+"</span>");a[e?"before":"after"](b.append)}a.unbind("focus",this._showDatepicker);b.trigger&&b.trigger.remove();c=this._get(b,"showOn");if(c=="focus"||c=="both")a.focus(this._showDatepicker);if(c=="button"||c=="both"){c=this._get(b,"buttonText");var f=this._get(b,"buttonImage");b.trigger=d(this._get(b,"buttonImageOnly")?d("<img/>").addClass(this._triggerClass).attr({src:f,alt:c,title:c}):d('<button type="button"></button>').addClass(this._triggerClass).html(f==
""?c:d("<img/>").attr({src:f,alt:c,title:c})));a[e?"before":"after"](b.trigger);b.trigger.click(function(){d.datepicker._datepickerShowing&&d.datepicker._lastInput==a[0]?d.datepicker._hideDatepicker():d.datepicker._showDatepicker(a[0]);return false})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var e=function(f){for(var h=0,i=0,g=0;g<f.length;g++)if(f[g].length>h){h=f[g].length;i=g}return i};b.setMonth(e(this._get(a,
c.match(/MM/)?"monthNames":"monthNamesShort")));b.setDate(e(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=d(a);if(!c.hasClass(this.markerClassName)){c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});d.data(a,"datepicker",b);this._setDate(b,this._getDefaultDate(b),
true);this._updateDatepicker(b);this._updateAlternate(b);b.dpDiv.show()}},_dialogDatepicker:function(a,b,c,e,f){a=this._dialogInst;if(!a){this.uuid+=1;this._dialogInput=d('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');this._dialogInput.keydown(this._doKeyDown);d("body").append(this._dialogInput);a=this._dialogInst=this._newInst(this._dialogInput,false);a.settings={};d.data(this._dialogInput[0],"datepicker",a)}F(a.settings,e||{});
b=b&&b.constructor==Date?this._formatDate(a,b):b;this._dialogInput.val(b);this._pos=f?f.length?f:[f.pageX,f.pageY]:null;if(!this._pos)this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)];this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");a.settings.onSelect=c;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[0]);d.blockUI&&d.blockUI(this.dpDiv);d.data(this._dialogInput[0],"datepicker",a);return this},_destroyDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();d.removeData(a,"datepicker");if(e=="input"){c.append.remove();c.trigger.remove();b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",
this._doKeyUp)}else if(e=="div"||e=="span")b.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=false;c.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else if(e=="div"||e=="span")b.children("."+this._inlineClass).children().removeClass("ui-state-disabled");this._disabledInputs=d.map(this._disabledInputs,
function(f){return f==a?null:f})}},_disableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=true;c.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else if(e=="div"||e=="span")b.children("."+this._inlineClass).children().addClass("ui-state-disabled");this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:
f});this._disabledInputs[this._disabledInputs.length]=a}},_isDisabledDatepicker:function(a){if(!a)return false;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return true;return false},_getInst:function(a){try{return d.data(a,"datepicker")}catch(b){throw"Missing instance data for this datepicker";}},_optionDatepicker:function(a,b,c){var e=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?d.extend({},d.datepicker._defaults):e?b=="all"?d.extend({},
e.settings):this._get(e,b):null;var f=b||{};if(typeof b=="string"){f={};f[b]=c}if(e){this._curInst==e&&this._hideDatepicker();var h=this._getDateDatepicker(a,true),i=this._getMinMaxDate(e,"min"),g=this._getMinMaxDate(e,"max");F(e.settings,f);if(i!==null&&f.dateFormat!==A&&f.minDate===A)e.settings.minDate=this._formatDate(e,i);if(g!==null&&f.dateFormat!==A&&f.maxDate===A)e.settings.maxDate=this._formatDate(e,g);this._attachments(d(a),e);this._autoSize(e);this._setDateDatepicker(a,h);this._updateDatepicker(e)}},
_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){(a=this._getInst(a))&&this._updateDatepicker(a)},_setDateDatepicker:function(a,b){if(a=this._getInst(a)){this._setDate(a,b);this._updateDatepicker(a);this._updateAlternate(a)}},_getDateDatepicker:function(a,b){(a=this._getInst(a))&&!a.inline&&this._setDateFromField(a,b);return a?this._getDate(a):null},_doKeyDown:function(a){var b=d.datepicker._getInst(a.target),c=true,e=b.dpDiv.is(".ui-datepicker-rtl");
b._keyEvent=true;if(d.datepicker._datepickerShowing)switch(a.keyCode){case 9:d.datepicker._hideDatepicker();c=false;break;case 13:c=d("td."+d.datepicker._dayOverClass+":not(."+d.datepicker._currentClass+")",b.dpDiv);c[0]?d.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,c[0]):d.datepicker._hideDatepicker();return false;case 27:d.datepicker._hideDatepicker();break;case 33:d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),
"M");break;case 34:d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 35:if(a.ctrlKey||a.metaKey)d.datepicker._clearDate(a.target);c=a.ctrlKey||a.metaKey;break;case 36:if(a.ctrlKey||a.metaKey)d.datepicker._gotoToday(a.target);c=a.ctrlKey||a.metaKey;break;case 37:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?+1:-1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?
-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 38:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,-7,"D");c=a.ctrlKey||a.metaKey;break;case 39:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?-1:+1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 40:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,
+7,"D");c=a.ctrlKey||a.metaKey;break;default:c=false}else if(a.keyCode==36&&a.ctrlKey)d.datepicker._showDatepicker(this);else c=false;if(c){a.preventDefault();a.stopPropagation()}},_doKeyPress:function(a){var b=d.datepicker._getInst(a.target);if(d.datepicker._get(b,"constrainInput")){b=d.datepicker._possibleChars(d.datepicker._get(b,"dateFormat"));var c=String.fromCharCode(a.charCode==A?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||c<" "||!b||b.indexOf(c)>-1}},_doKeyUp:function(a){a=d.datepicker._getInst(a.target);
if(a.input.val()!=a.lastVal)try{if(d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),a.input?a.input.val():null,d.datepicker._getFormatConfig(a))){d.datepicker._setDateFromField(a);d.datepicker._updateAlternate(a);d.datepicker._updateDatepicker(a)}}catch(b){d.datepicker.log(b)}return true},_showDatepicker:function(a){a=a.target||a;if(a.nodeName.toLowerCase()!="input")a=d("input",a.parentNode)[0];if(!(d.datepicker._isDisabledDatepicker(a)||d.datepicker._lastInput==a)){var b=d.datepicker._getInst(a);
d.datepicker._curInst&&d.datepicker._curInst!=b&&d.datepicker._curInst.dpDiv.stop(true,true);var c=d.datepicker._get(b,"beforeShow");F(b.settings,c?c.apply(a,[a,b]):{});b.lastVal=null;d.datepicker._lastInput=a;d.datepicker._setDateFromField(b);if(d.datepicker._inDialog)a.value="";if(!d.datepicker._pos){d.datepicker._pos=d.datepicker._findPos(a);d.datepicker._pos[1]+=a.offsetHeight}var e=false;d(a).parents().each(function(){e|=d(this).css("position")=="fixed";return!e});if(e&&d.browser.opera){d.datepicker._pos[0]-=
document.documentElement.scrollLeft;d.datepicker._pos[1]-=document.documentElement.scrollTop}c={left:d.datepicker._pos[0],top:d.datepicker._pos[1]};d.datepicker._pos=null;b.dpDiv.empty();b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});d.datepicker._updateDatepicker(b);c=d.datepicker._checkOffset(b,c,e);b.dpDiv.css({position:d.datepicker._inDialog&&d.blockUI?"static":e?"fixed":"absolute",display:"none",left:c.left+"px",top:c.top+"px"});if(!b.inline){c=d.datepicker._get(b,"showAnim");
var f=d.datepicker._get(b,"duration"),h=function(){d.datepicker._datepickerShowing=true;var i=b.dpDiv.find("iframe.ui-datepicker-cover");if(i.length){var g=d.datepicker._getBorders(b.dpDiv);i.css({left:-g[0],top:-g[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})}};b.dpDiv.zIndex(d(a).zIndex()+1);d.effects&&d.effects[c]?b.dpDiv.show(c,d.datepicker._get(b,"showOptions"),f,h):b.dpDiv[c||"show"](c?f:null,h);if(!c||!f)h();b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus();d.datepicker._curInst=
b}}},_updateDatepicker:function(a){var b=this,c=d.datepicker._getBorders(a.dpDiv);a.dpDiv.empty().append(this._generateHTML(a));var e=a.dpDiv.find("iframe.ui-datepicker-cover");e.length&&e.css({left:-c[0],top:-c[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()});a.dpDiv.find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",function(){d(this).removeClass("ui-state-hover");this.className.indexOf("ui-datepicker-prev")!=-1&&d(this).removeClass("ui-datepicker-prev-hover");
this.className.indexOf("ui-datepicker-next")!=-1&&d(this).removeClass("ui-datepicker-next-hover")}).bind("mouseover",function(){if(!b._isDisabledDatepicker(a.inline?a.dpDiv.parent()[0]:a.input[0])){d(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");d(this).addClass("ui-state-hover");this.className.indexOf("ui-datepicker-prev")!=-1&&d(this).addClass("ui-datepicker-prev-hover");this.className.indexOf("ui-datepicker-next")!=-1&&d(this).addClass("ui-datepicker-next-hover")}}).end().find("."+
this._dayOverClass+" a").trigger("mouseover").end();c=this._getNumberOfMonths(a);e=c[1];e>1?a.dpDiv.addClass("ui-datepicker-multi-"+e).css("width",17*e+"em"):a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");a.dpDiv[(c[0]!=1||c[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");a==d.datepicker._curInst&&d.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&
a.input[0]!=document.activeElement&&a.input.focus();if(a.yearshtml){var f=a.yearshtml;setTimeout(function(){f===a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml);f=a.yearshtml=null},0)}},_getBorders:function(a){var b=function(c){return{thin:1,medium:2,thick:3}[c]||c};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},_checkOffset:function(a,b,c){var e=a.dpDiv.outerWidth(),f=a.dpDiv.outerHeight(),h=a.input?a.input.outerWidth():
0,i=a.input?a.input.outerHeight():0,g=document.documentElement.clientWidth+d(document).scrollLeft(),j=document.documentElement.clientHeight+d(document).scrollTop();b.left-=this._get(a,"isRTL")?e-h:0;b.left-=c&&b.left==a.input.offset().left?d(document).scrollLeft():0;b.top-=c&&b.top==a.input.offset().top+i?d(document).scrollTop():0;b.left-=Math.min(b.left,b.left+e>g&&g>e?Math.abs(b.left+e-g):0);b.top-=Math.min(b.top,b.top+f>j&&j>f?Math.abs(f+i):0);return b},_findPos:function(a){for(var b=this._get(this._getInst(a),
"isRTL");a&&(a.type=="hidden"||a.nodeType!=1||d.expr.filters.hidden(a));)a=a[b?"previousSibling":"nextSibling"];a=d(a).offset();return[a.left,a.top]},_hideDatepicker:function(a){var b=this._curInst;if(!(!b||a&&b!=d.data(a,"datepicker")))if(this._datepickerShowing){a=this._get(b,"showAnim");var c=this._get(b,"duration"),e=function(){d.datepicker._tidyDialog(b);this._curInst=null};d.effects&&d.effects[a]?b.dpDiv.hide(a,d.datepicker._get(b,"showOptions"),c,e):b.dpDiv[a=="slideDown"?"slideUp":a=="fadeIn"?
"fadeOut":"hide"](a?c:null,e);a||e();if(a=this._get(b,"onClose"))a.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b]);this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if(d.blockUI){d.unblockUI();d("body").append(this.dpDiv)}}this._inDialog=false}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(a){if(d.datepicker._curInst){a=
d(a.target);a[0].id!=d.datepicker._mainDivId&&a.parents("#"+d.datepicker._mainDivId).length==0&&!a.hasClass(d.datepicker.markerClassName)&&!a.hasClass(d.datepicker._triggerClass)&&d.datepicker._datepickerShowing&&!(d.datepicker._inDialog&&d.blockUI)&&d.datepicker._hideDatepicker()}},_adjustDate:function(a,b,c){a=d(a);var e=this._getInst(a[0]);if(!this._isDisabledDatepicker(a[0])){this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c);this._updateDatepicker(e)}},_gotoToday:function(a){a=
d(a);var b=this._getInst(a[0]);if(this._get(b,"gotoCurrent")&&b.currentDay){b.selectedDay=b.currentDay;b.drawMonth=b.selectedMonth=b.currentMonth;b.drawYear=b.selectedYear=b.currentYear}else{var c=new Date;b.selectedDay=c.getDate();b.drawMonth=b.selectedMonth=c.getMonth();b.drawYear=b.selectedYear=c.getFullYear()}this._notifyChange(b);this._adjustDate(a)},_selectMonthYear:function(a,b,c){a=d(a);var e=this._getInst(a[0]);e._selectingMonthYear=false;e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c==
"M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10);this._notifyChange(e);this._adjustDate(a)},_clickMonthYear:function(a){var b=this._getInst(d(a)[0]);b.input&&b._selectingMonthYear&&setTimeout(function(){b.input.focus()},0);b._selectingMonthYear=!b._selectingMonthYear},_selectDay:function(a,b,c,e){var f=d(a);if(!(d(e).hasClass(this._unselectableClass)||this._isDisabledDatepicker(f[0]))){f=this._getInst(f[0]);f.selectedDay=f.currentDay=d("a",e).html();f.selectedMonth=f.currentMonth=
b;f.selectedYear=f.currentYear=c;this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))}},_clearDate:function(a){a=d(a);this._getInst(a[0]);this._selectDate(a,"")},_selectDate:function(a,b){a=this._getInst(d(a)[0]);b=b!=null?b:this._formatDate(a);a.input&&a.input.val(b);this._updateAlternate(a);var c=this._get(a,"onSelect");if(c)c.apply(a.input?a.input[0]:null,[b,a]);else a.input&&a.input.trigger("change");if(a.inline)this._updateDatepicker(a);else{this._hideDatepicker();
this._lastInput=a.input[0];typeof a.input[0]!="object"&&a.input.focus();this._lastInput=null}},_updateAlternate:function(a){var b=this._get(a,"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),e=this._getDate(a),f=this.formatDate(c,e,this._getFormatConfig(a));d(b).each(function(){d(this).val(f)})}},noWeekends:function(a){a=a.getDay();return[a>0&&a<6,""]},iso8601Week:function(a){a=new Date(a.getTime());a.setDate(a.getDate()+4-(a.getDay()||7));var b=a.getTime();a.setMonth(0);
a.setDate(1);return Math.floor(Math.round((b-a)/864E5)/7)+1},parseDate:function(a,b,c){if(a==null||b==null)throw"Invalid arguments";b=typeof b=="object"?b.toString():b+"";if(b=="")return null;var e=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;e=typeof e!="string"?e:(new Date).getFullYear()%100+parseInt(e,10);for(var f=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,h=(c?c.dayNames:null)||this._defaults.dayNames,i=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?
c.monthNames:null)||this._defaults.monthNames,j=c=-1,l=-1,u=-1,k=false,o=function(p){(p=z+1<a.length&&a.charAt(z+1)==p)&&z++;return p},m=function(p){var v=o(p);p=new RegExp("^\\d{1,"+(p=="@"?14:p=="!"?20:p=="y"&&v?4:p=="o"?3:2)+"}");p=b.substring(s).match(p);if(!p)throw"Missing number at position "+s;s+=p[0].length;return parseInt(p[0],10)},n=function(p,v,H){p=o(p)?H:v;for(v=0;v<p.length;v++)if(b.substr(s,p[v].length).toLowerCase()==p[v].toLowerCase()){s+=p[v].length;return v+1}throw"Unknown name at position "+
s;},r=function(){if(b.charAt(s)!=a.charAt(z))throw"Unexpected literal at position "+s;s++},s=0,z=0;z<a.length;z++)if(k)if(a.charAt(z)=="'"&&!o("'"))k=false;else r();else switch(a.charAt(z)){case "d":l=m("d");break;case "D":n("D",f,h);break;case "o":u=m("o");break;case "m":j=m("m");break;case "M":j=n("M",i,g);break;case "y":c=m("y");break;case "@":var w=new Date(m("@"));c=w.getFullYear();j=w.getMonth()+1;l=w.getDate();break;case "!":w=new Date((m("!")-this._ticksTo1970)/1E4);c=w.getFullYear();j=w.getMonth()+
1;l=w.getDate();break;case "'":if(o("'"))r();else k=true;break;default:r()}if(c==-1)c=(new Date).getFullYear();else if(c<100)c+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c<=e?0:-100);if(u>-1){j=1;l=u;do{e=this._getDaysInMonth(c,j-1);if(l<=e)break;j++;l-=e}while(1)}w=this._daylightSavingAdjust(new Date(c,j-1,l));if(w.getFullYear()!=c||w.getMonth()+1!=j||w.getDate()!=l)throw"Invalid date";return w},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",
RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1E7,formatDate:function(a,b,c){if(!b)return"";var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,h=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort;c=(c?c.monthNames:null)||this._defaults.monthNames;var i=function(o){(o=k+1<a.length&&
a.charAt(k+1)==o)&&k++;return o},g=function(o,m,n){m=""+m;if(i(o))for(;m.length<n;)m="0"+m;return m},j=function(o,m,n,r){return i(o)?r[m]:n[m]},l="",u=false;if(b)for(var k=0;k<a.length;k++)if(u)if(a.charAt(k)=="'"&&!i("'"))u=false;else l+=a.charAt(k);else switch(a.charAt(k)){case "d":l+=g("d",b.getDate(),2);break;case "D":l+=j("D",b.getDay(),e,f);break;case "o":l+=g("o",(b.getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":l+=g("m",b.getMonth()+1,2);break;case "M":l+=j("M",
b.getMonth(),h,c);break;case "y":l+=i("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case "@":l+=b.getTime();break;case "!":l+=b.getTime()*1E4+this._ticksTo1970;break;case "'":if(i("'"))l+="'";else u=true;break;default:l+=a.charAt(k)}return l},_possibleChars:function(a){for(var b="",c=false,e=function(h){(h=f+1<a.length&&a.charAt(f+1)==h)&&f++;return h},f=0;f<a.length;f++)if(c)if(a.charAt(f)=="'"&&!e("'"))c=false;else b+=a.charAt(f);else switch(a.charAt(f)){case "d":case "m":case "y":case "@":b+=
"0123456789";break;case "D":case "M":return null;case "'":if(e("'"))b+="'";else c=true;break;default:b+=a.charAt(f)}return b},_get:function(a,b){return a.settings[b]!==A?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()!=a.lastVal){var c=this._get(a,"dateFormat"),e=a.lastVal=a.input?a.input.val():null,f,h;f=h=this._getDefaultDate(a);var i=this._getFormatConfig(a);try{f=this.parseDate(c,e,i)||h}catch(g){this.log(g);e=b?"":e}a.selectedDay=f.getDate();a.drawMonth=a.selectedMonth=
f.getMonth();a.drawYear=a.selectedYear=f.getFullYear();a.currentDay=e?f.getDate():0;a.currentMonth=e?f.getMonth():0;a.currentYear=e?f.getFullYear():0;this._adjustInstDate(a)}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(a,b,c){var e=function(h){var i=new Date;i.setDate(i.getDate()+h);return i},f=function(h){try{return d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),h,d.datepicker._getFormatConfig(a))}catch(i){}var g=
(h.toLowerCase().match(/^c/)?d.datepicker._getDate(a):null)||new Date,j=g.getFullYear(),l=g.getMonth();g=g.getDate();for(var u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,k=u.exec(h);k;){switch(k[2]||"d"){case "d":case "D":g+=parseInt(k[1],10);break;case "w":case "W":g+=parseInt(k[1],10)*7;break;case "m":case "M":l+=parseInt(k[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(j,l));break;case "y":case "Y":j+=parseInt(k[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(j,l));break}k=u.exec(h)}return new Date(j,
l,g)};if(b=(b=b==null||b===""?c:typeof b=="string"?f(b):typeof b=="number"?isNaN(b)?c:e(b):new Date(b.getTime()))&&b.toString()=="Invalid Date"?c:b){b.setHours(0);b.setMinutes(0);b.setSeconds(0);b.setMilliseconds(0)}return this._daylightSavingAdjust(b)},_daylightSavingAdjust:function(a){if(!a)return null;a.setHours(a.getHours()>12?a.getHours()+2:0);return a},_setDate:function(a,b,c){var e=!b,f=a.selectedMonth,h=a.selectedYear;b=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=
a.currentDay=b.getDate();a.drawMonth=a.selectedMonth=a.currentMonth=b.getMonth();a.drawYear=a.selectedYear=a.currentYear=b.getFullYear();if((f!=a.selectedMonth||h!=a.selectedYear)&&!c)this._notifyChange(a);this._adjustInstDate(a);if(a.input)a.input.val(e?"":this._formatDate(a))},_getDate:function(a){return!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay))},_generateHTML:function(a){var b=new Date;b=this._daylightSavingAdjust(new Date(b.getFullYear(),
b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),e=this._get(a,"showButtonPanel"),f=this._get(a,"hideIfNoPrevNext"),h=this._get(a,"navigationAsDateFormat"),i=this._getNumberOfMonths(a),g=this._get(a,"showCurrentAtPos"),j=this._get(a,"stepMonths"),l=i[0]!=1||i[1]!=1,u=this._daylightSavingAdjust(!a.currentDay?new Date(9999,9,9):new Date(a.currentYear,a.currentMonth,a.currentDay)),k=this._getMinMaxDate(a,"min"),o=this._getMinMaxDate(a,"max");g=a.drawMonth-g;var m=a.drawYear;if(g<0){g+=12;m--}if(o){var n=
this._daylightSavingAdjust(new Date(o.getFullYear(),o.getMonth()-i[0]*i[1]+1,o.getDate()));for(n=k&&n<k?k:n;this._daylightSavingAdjust(new Date(m,g,1))>n;){g--;if(g<0){g=11;m--}}}a.drawMonth=g;a.drawYear=m;n=this._get(a,"prevText");n=!h?n:this.formatDate(n,this._daylightSavingAdjust(new Date(m,g-j,1)),this._getFormatConfig(a));n=this._canAdjustMonth(a,-1,m,g)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._adjustDate('#"+a.id+"', -"+j+", 'M');\" title=\""+n+'"><span class="ui-icon ui-icon-circle-triangle-'+
(c?"e":"w")+'">'+n+"</span></a>":f?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>";var r=this._get(a,"nextText");r=!h?r:this.formatDate(r,this._daylightSavingAdjust(new Date(m,g+j,1)),this._getFormatConfig(a));f=this._canAdjustMonth(a,+1,m,g)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._adjustDate('#"+a.id+"', +"+j+", 'M');\" title=\""+r+'"><span class="ui-icon ui-icon-circle-triangle-'+
(c?"w":"e")+'">'+r+"</span></a>":f?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+r+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+r+"</span></a>";j=this._get(a,"currentText");r=this._get(a,"gotoCurrent")&&a.currentDay?u:b;j=!h?j:this.formatDate(j,r,this._getFormatConfig(a));h=!a.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+y+'.datepicker._hideDatepicker();">'+this._get(a,
"closeText")+"</button>":"";e=e?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?h:"")+(this._isInRange(a,r)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._gotoToday('#"+a.id+"');\">"+j+"</button>":"")+(c?"":h)+"</div>":"";h=parseInt(this._get(a,"firstDay"),10);h=isNaN(h)?0:h;j=this._get(a,"showWeek");r=this._get(a,"dayNames");this._get(a,"dayNamesShort");var s=this._get(a,"dayNamesMin"),z=
this._get(a,"monthNames"),w=this._get(a,"monthNamesShort"),p=this._get(a,"beforeShowDay"),v=this._get(a,"showOtherMonths"),H=this._get(a,"selectOtherMonths");this._get(a,"calculateWeek");for(var L=this._getDefaultDate(a),I="",D=0;D<i[0];D++){for(var M="",E=0;E<i[1];E++){var N=this._daylightSavingAdjust(new Date(m,g,a.selectedDay)),t=" ui-corner-all",x="";if(l){x+='<div class="ui-datepicker-group';if(i[1]>1)switch(E){case 0:x+=" ui-datepicker-group-first";t=" ui-corner-"+(c?"right":"left");break;case i[1]-
1:x+=" ui-datepicker-group-last";t=" ui-corner-"+(c?"left":"right");break;default:x+=" ui-datepicker-group-middle";t="";break}x+='">'}x+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+t+'">'+(/all|left/.test(t)&&D==0?c?f:n:"")+(/all|right/.test(t)&&D==0?c?n:f:"")+this._generateMonthYearHeader(a,g,m,k,o,D>0||E>0,z,w)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var B=j?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";for(t=0;t<7;t++){var q=
(t+h)%7;B+="<th"+((t+h+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+r[q]+'">'+s[q]+"</span></th>"}x+=B+"</tr></thead><tbody>";B=this._getDaysInMonth(m,g);if(m==a.selectedYear&&g==a.selectedMonth)a.selectedDay=Math.min(a.selectedDay,B);t=(this._getFirstDayOfMonth(m,g)-h+7)%7;B=l?6:Math.ceil((t+B)/7);q=this._daylightSavingAdjust(new Date(m,g,1-t));for(var O=0;O<B;O++){x+="<tr>";var P=!j?"":'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(q)+"</td>";for(t=0;t<7;t++){var G=
p?p.apply(a.input?a.input[0]:null,[q]):[true,""],C=q.getMonth()!=g,J=C&&!H||!G[0]||k&&q<k||o&&q>o;P+='<td class="'+((t+h+6)%7>=5?" ui-datepicker-week-end":"")+(C?" ui-datepicker-other-month":"")+(q.getTime()==N.getTime()&&g==a.selectedMonth&&a._keyEvent||L.getTime()==q.getTime()&&L.getTime()==N.getTime()?" "+this._dayOverClass:"")+(J?" "+this._unselectableClass+" ui-state-disabled":"")+(C&&!v?"":" "+G[1]+(q.getTime()==u.getTime()?" "+this._currentClass:"")+(q.getTime()==b.getTime()?" ui-datepicker-today":
""))+'"'+((!C||v)&&G[2]?' title="'+G[2]+'"':"")+(J?"":' onclick="DP_jQuery_'+y+".datepicker._selectDay('#"+a.id+"',"+q.getMonth()+","+q.getFullYear()+', this);return false;"')+">"+(C&&!v?"&#xa0;":J?'<span class="ui-state-default">'+q.getDate()+"</span>":'<a class="ui-state-default'+(q.getTime()==b.getTime()?" ui-state-highlight":"")+(q.getTime()==u.getTime()?" ui-state-active":"")+(C?" ui-priority-secondary":"")+'" href="#">'+q.getDate()+"</a>")+"</td>";q.setDate(q.getDate()+1);q=this._daylightSavingAdjust(q)}x+=
P+"</tr>"}g++;if(g>11){g=0;m++}x+="</tbody></table>"+(l?"</div>"+(i[0]>0&&E==i[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");M+=x}I+=M}I+=e+(d.browser.msie&&parseInt(d.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");a._keyEvent=false;return I},_generateMonthYearHeader:function(a,b,c,e,f,h,i,g){var j=this._get(a,"changeMonth"),l=this._get(a,"changeYear"),u=this._get(a,"showMonthAfterYear"),k='<div class="ui-datepicker-title">',
o="";if(h||!j)o+='<span class="ui-datepicker-month">'+i[b]+"</span>";else{i=e&&e.getFullYear()==c;var m=f&&f.getFullYear()==c;o+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+y+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" onclick=\"DP_jQuery_"+y+".datepicker._clickMonthYear('#"+a.id+"');\">";for(var n=0;n<12;n++)if((!i||n>=e.getMonth())&&(!m||n<=f.getMonth()))o+='<option value="'+n+'"'+(n==b?' selected="selected"':"")+">"+g[n]+"</option>";o+="</select>"}u||(k+=o+(h||!(j&&
l)?"&#xa0;":""));a.yearshtml="";if(h||!l)k+='<span class="ui-datepicker-year">'+c+"</span>";else{g=this._get(a,"yearRange").split(":");var r=(new Date).getFullYear();i=function(s){s=s.match(/c[+-].*/)?c+parseInt(s.substring(1),10):s.match(/[+-].*/)?r+parseInt(s,10):parseInt(s,10);return isNaN(s)?r:s};b=i(g[0]);g=Math.max(b,i(g[1]||""));b=e?Math.max(b,e.getFullYear()):b;g=f?Math.min(g,f.getFullYear()):g;for(a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+y+".datepicker._selectMonthYear('#"+
a.id+"', this, 'Y');\" onclick=\"DP_jQuery_"+y+".datepicker._clickMonthYear('#"+a.id+"');\">";b<=g;b++)a.yearshtml+='<option value="'+b+'"'+(b==c?' selected="selected"':"")+">"+b+"</option>";a.yearshtml+="</select>";if(d.browser.mozilla)k+='<select class="ui-datepicker-year"><option value="'+c+'" selected="selected">'+c+"</option></select>";else{k+=a.yearshtml;a.yearshtml=null}}k+=this._get(a,"yearSuffix");if(u)k+=(h||!(j&&l)?"&#xa0;":"")+o;k+="</div>";return k},_adjustInstDate:function(a,b,c){var e=
a.drawYear+(c=="Y"?b:0),f=a.drawMonth+(c=="M"?b:0);b=Math.min(a.selectedDay,this._getDaysInMonth(e,f))+(c=="D"?b:0);e=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(e,f,b)));a.selectedDay=e.getDate();a.drawMonth=a.selectedMonth=e.getMonth();a.drawYear=a.selectedYear=e.getFullYear();if(c=="M"||c=="Y")this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");b=c&&b<c?c:b;return b=a&&b>a?a:b},_notifyChange:function(a){var b=this._get(a,
"onChangeMonthYear");if(b)b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){a=this._get(a,"numberOfMonths");return a==null?[1,1]:typeof a=="number"?[1,a]:a},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,e){var f=this._getNumberOfMonths(a);
c=this._daylightSavingAdjust(new Date(c,e+(b<0?b:f[0]*f[1]),1));b<0&&c.setDate(this._getDaysInMonth(c.getFullYear(),c.getMonth()));return this._isInRange(a,c)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!a||b.getTime()<=a.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);return{shortYearCutoff:b,dayNamesShort:this._get(a,
"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,e){if(!b){a.currentDay=a.selectedDay;a.currentMonth=a.selectedMonth;a.currentYear=a.selectedYear}b=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(e,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),b,this._getFormatConfig(a))}});d.fn.datepicker=
function(a){if(!this.length)return this;if(!d.datepicker.initialized){d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv);d.datepicker.initialized=true}var b=Array.prototype.slice.call(arguments,1);if(typeof a=="string"&&(a=="isDisabled"||a=="getDate"||a=="widget"))return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));if(a=="option"&&arguments.length==2&&typeof arguments[1]=="string")return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,
[this[0]].concat(b));return this.each(function(){typeof a=="string"?d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this].concat(b)):d.datepicker._attachDatepicker(this,a)})};d.datepicker=new K;d.datepicker.initialized=false;d.datepicker.uuid=(new Date).getTime();d.datepicker.version="1.8.11";window["DP_jQuery_"+y]=d})(jQuery);
;
(function ($) {

/**
 * Attaches language support to the jQuery UI datepicker component.
 */
Drupal.behaviors.localeDatepicker = {
  attach: function(context, settings) {
    // This code accesses Drupal.settings and localized strings via Drupal.t().
    // So this code should run after these are initialized. By placing it in an
    // attach behavior this is assured.
    $.datepicker.regional['drupal-locale'] = $.extend({
      closeText: Drupal.t('Done'),
      prevText: Drupal.t('Prev'),
      nextText: Drupal.t('Next'),
      currentText: Drupal.t('Today'),
      monthNames: [
        Drupal.t('January'),
        Drupal.t('February'),
        Drupal.t('March'),
        Drupal.t('April'),
        Drupal.t('May'),
        Drupal.t('June'),
        Drupal.t('July'),
        Drupal.t('August'),
        Drupal.t('September'),
        Drupal.t('October'),
        Drupal.t('November'),
        Drupal.t('December')
      ],
      monthNamesShort: [
        Drupal.t('Jan'),
        Drupal.t('Feb'),
        Drupal.t('Mar'),
        Drupal.t('Apr'),
        Drupal.t('May'),
        Drupal.t('Jun'),
        Drupal.t('Jul'),
        Drupal.t('Aug'),
        Drupal.t('Sep'),
        Drupal.t('Oct'),
        Drupal.t('Nov'),
        Drupal.t('Dec')
      ],
      dayNames: [
        Drupal.t('Sunday'),
        Drupal.t('Monday'),
        Drupal.t('Tuesday'),
        Drupal.t('Wednesday'),
        Drupal.t('Thursday'),
        Drupal.t('Friday'),
        Drupal.t('Saturday')
      ],
      dayNamesShort: [
        Drupal.t('Sun'),
        Drupal.t('Mon'),
        Drupal.t('Tue'),
        Drupal.t('Wed'),
        Drupal.t('Thu'),
        Drupal.t('Fri'),
        Drupal.t('Sat')
      ],
      dayNamesMin: [
        Drupal.t('Su'),
        Drupal.t('Mo'),
        Drupal.t('Tu'),
        Drupal.t('We'),
        Drupal.t('Th'),
        Drupal.t('Fr'),
        Drupal.t('Sa')
      ],
      dateFormat: Drupal.t('mm/dd/yy'),
      firstDay: 0,
      isRTL: 0
    }, Drupal.settings.jquery.ui.datepicker);
    $.datepicker.setDefaults($.datepicker.regional['drupal-locale']);
  }
};

})(jQuery);
;
