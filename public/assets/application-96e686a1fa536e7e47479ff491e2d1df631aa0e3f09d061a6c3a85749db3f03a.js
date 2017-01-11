/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
d3=function(){function n(n){return null!=n&&!isNaN(n)}function t(n){return n.length}function e(n){for(var t=1;n*t%1;)t*=10;return t}function r(n,t){try{for(var e in t)Object.defineProperty(n.prototype,e,{value:t[e],enumerable:!1})}catch(r){n.prototype=t}}function u(){}function i(){}function a(n,t,e){return function(){var r=e.apply(t,arguments);return r===t?n:r}}function o(){}function c(n){function t(){for(var t,r=e,u=-1,i=r.length;++u<i;)(t=r[u].on)&&t.apply(this,arguments);return n}var e=[],r=new u;return t.on=function(t,u){var i,a=r.get(t);return arguments.length<2?a&&a.on:(a&&(a.on=null,e=e.slice(0,i=e.indexOf(a)).concat(e.slice(i+1)),r.remove(t)),u&&e.push(r.set(t,{on:u})),n)},t}function l(){ca.event.stopPropagation(),ca.event.preventDefault()}function f(){for(var n,t=ca.event;n=t.sourceEvent;)t=n;return t}function s(n,t){function e(){n.on(t,null)}n.on(t,function(){l(),e()},!0),setTimeout(e,0)}function h(n){for(var t=new o,e=0,r=arguments.length;++e<r;)t[arguments[e]]=c(t);return t.of=function(e,r){return function(u){try{var i=u.sourceEvent=ca.event;u.target=n,ca.event=u,t[u.type].apply(e,r)}finally{ca.event=i}}},t}function g(n,t){var e=n.ownerSVGElement||n;if(e.createSVGPoint){var r=e.createSVGPoint();if(0>va&&(fa.scrollX||fa.scrollY)){e=ca.select(la.body).append("svg").style("position","absolute").style("top",0).style("left",0);var u=e[0][0].getScreenCTM();va=!(u.f||u.e),e.remove()}return va?(r.x=t.pageX,r.y=t.pageY):(r.x=t.clientX,r.y=t.clientY),r=r.matrixTransform(n.getScreenCTM().inverse()),[r.x,r.y]}var i=n.getBoundingClientRect();return[t.clientX-i.left-n.clientLeft,t.clientY-i.top-n.clientTop]}function p(n){for(var t=-1,e=n.length,r=[];++t<e;)r.push(n[t]);return r}function d(n){return Array.prototype.slice.call(n)}function m(n){return xa(n,ka),n}function v(n){return function(){return ba(n,this)}}function y(n){return function(){return _a(n,this)}}function M(n,t){function e(){this.removeAttribute(n)}function r(){this.removeAttributeNS(n.space,n.local)}function u(){this.setAttribute(n,t)}function i(){this.setAttributeNS(n.space,n.local,t)}function a(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}function o(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}return n=ca.ns.qualify(n),null==t?n.local?r:e:"function"==typeof t?n.local?o:a:n.local?i:u}function x(n){return n.trim().replace(/\s+/g," ")}function _(n){return RegExp("(?:^|\\s+)"+ca.requote(n)+"(?:\\s+|$)","g")}function w(n,t){function e(){for(var e=-1;++e<u;)n[e](this,t)}function r(){for(var e=-1,r=t.apply(this,arguments);++e<u;)n[e](this,r)}n=n.trim().split(/\s+/).map(S);var u=n.length;return"function"==typeof t?r:e}function S(n){var t=_(n);return function(e,r){if(u=e.classList)return r?u.add(n):u.remove(n);var u=e.getAttribute("class")||"";r?(t.lastIndex=0,t.test(u)||e.setAttribute("class",x(u+" "+n))):e.setAttribute("class",x(u.replace(t," ")))}}function E(n,t,e){function r(){this.style.removeProperty(n)}function u(){this.style.setProperty(n,t,e)}function i(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(n):this.style.setProperty(n,r,e)}return null==t?r:"function"==typeof t?i:u}function k(n,t){function e(){delete this[n]}function r(){this[n]=t}function u(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}return null==t?e:"function"==typeof t?u:r}function A(n){return{__data__:n}}function q(n){return function(){return Ea(this,n)}}function N(n){return arguments.length||(n=ca.ascending),function(t,e){return!t-!e||n(t.__data__,e.__data__)}}function T(){}function C(n,t,e){function r(){var t=this[a];t&&(this.removeEventListener(n,t,t.$),delete this[a])}function u(){var u=c(t,ya(arguments));r.call(this),this.addEventListener(n,this[a]=u,u.$=e),u._=t}function i(){var t,e=RegExp("^__on([^.]+)"+ca.requote(n)+"$");for(var r in this)if(t=r.match(e)){var u=this[r];this.removeEventListener(t[1],u,u.$),delete this[r]}}var a="__on"+n,o=n.indexOf("."),c=z;o>0&&(n=n.substring(0,o));var l=Na.get(n);return l&&(n=l,c=D),o?t?u:r:t?T:i}function z(n,t){return function(e){var r=ca.event;ca.event=e,t[0]=this.__data__;try{n.apply(this,t)}finally{ca.event=r}}}function D(n,t){var e=z(n,t);return function(n){var t=this,r=n.relatedTarget;r&&(r===t||r.compareDocumentPosition(t)&8)||e.call(t,n)}}function j(n,t){for(var e=0,r=n.length;r>e;e++)for(var u,i=n[e],a=0,o=i.length;o>a;a++)(u=i[a])&&t(u,a,e);return n}function L(n){return xa(n,Ta),n}function F(){}function H(n,t,e){return new P(n,t,e)}function P(n,t,e){this.h=n,this.s=t,this.l=e}function R(n,t,e){function r(n){return n>360?n-=360:0>n&&(n+=360),60>n?i+(a-i)*n/60:180>n?a:240>n?i+(a-i)*(240-n)/60:i}function u(n){return Math.round(r(n)*255)}var i,a;return n%=360,0>n&&(n+=360),t=0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,a=.5>=e?e*(1+t):e+t-e*t,i=2*e-a,et(u(n+120),u(n),u(n-120))}function O(n){return n>0?1:0>n?-1:0}function Y(n){return Math.acos(Math.max(-1,Math.min(1,n)))}function U(n){return n>1?Fa/2:-1>n?-Fa/2:Math.asin(n)}function I(n){return(Math.exp(n)-Math.exp(-n))/2}function V(n){return(Math.exp(n)+Math.exp(-n))/2}function X(n){return(n=Math.sin(n/2))*n}function Z(n,t,e){return new B(n,t,e)}function B(n,t,e){this.h=n,this.c=t,this.l=e}function $(n,t,e){return J(e,Math.cos(n*=Pa)*t,Math.sin(n)*t)}function J(n,t,e){return new G(n,t,e)}function G(n,t,e){this.l=n,this.a=t,this.b=e}function K(n,t,e){var r=(n+16)/116,u=r+t/500,i=r-e/200;return u=Q(u)*Ua,r=Q(r)*Ia,i=Q(i)*Va,et(tt(3.2404542*u-1.5371385*r-.4985314*i),tt(-.969266*u+1.8760108*r+.041556*i),tt(.0556434*u-.2040259*r+1.0572252*i))}function W(n,t,e){return Z(Math.atan2(e,t)*Ra,Math.sqrt(t*t+e*e),n)}function Q(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function nt(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function tt(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function et(n,t,e){return new rt(n,t,e)}function rt(n,t,e){this.r=n,this.g=t,this.b=e}function ut(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function it(n,t,e){var r,u,i,a=0,o=0,c=0;if(r=/([a-z]+)\((.*)\)/i.exec(n))switch(u=r[2].split(","),r[1]){case"hsl":return e(parseFloat(u[0]),parseFloat(u[1])/100,parseFloat(u[2])/100);case"rgb":return t(lt(u[0]),lt(u[1]),lt(u[2]))}return(i=Ba.get(n))?t(i.r,i.g,i.b):(null!=n&&n.charAt(0)==="#"&&(n.length===4?(a=n.charAt(1),a+=a,o=n.charAt(2),o+=o,c=n.charAt(3),c+=c):n.length===7&&(a=n.substring(1,3),o=n.substring(3,5),c=n.substring(5,7)),a=parseInt(a,16),o=parseInt(o,16),c=parseInt(c,16)),t(a,o,c))}function at(n,t,e){var r,u,i=Math.min(n/=255,t/=255,e/=255),a=Math.max(n,t,e),o=a-i,c=(a+i)/2;return o?(u=.5>c?o/(a+i):o/(2-a-i),r=n==a?(t-e)/o+(e>t?6:0):t==a?(e-n)/o+2:(n-t)/o+4,r*=60):u=r=0,H(r,u,c)}function ot(n,t,e){n=ct(n),t=ct(t),e=ct(e);var r=nt((.4124564*n+.3575761*t+.1804375*e)/Ua),u=nt((.2126729*n+.7151522*t+.072175*e)/Ia),i=nt((.0193339*n+.119192*t+.9503041*e)/Va);return J(116*u-16,500*(r-u),200*(u-i))}function ct(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function lt(n){var t=parseFloat(n);return n.charAt(n.length-1)==="%"?Math.round(2.55*t):t}function ft(n){return"function"==typeof n?n:function(){return n}}function st(n){return n}function ht(n){return n.length===1?function(t,e){n(null==t?e:null)}:n}function gt(n,t){function e(n,e,i){arguments.length<3&&(i=e,e=null);var a=ca.xhr(n,t,i);return a.row=function(n){return arguments.length?a.response((e=n)==null?r:u(n)):e},a.row(e)}function r(n){return e.parse(n.responseText)}function u(n){return function(t){return e.parse(t.responseText,n)}}function a(t){return t.map(o).join(n)}function o(n){return c.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var c=RegExp('["'+n+"\n]"),l=n.charCodeAt(0);return e.parse=function(n,t){var r;return e.parseRows(n,function(n,e){if(r)return r(n,e-1);var u=Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");r=t?function(n,e){return t(u(n),e)}:u})},e.parseRows=function(n,t){function e(){if(f>=c)return a;if(u)return u=!1,i;var t=f;if(n.charCodeAt(t)===34){for(var e=t;e++<c;)if(n.charCodeAt(e)===34){if(n.charCodeAt(e+1)!==34)break;++e}f=e+2;var r=n.charCodeAt(e+1);return 13===r?(u=!0,n.charCodeAt(e+2)===10&&++f):10===r&&(u=!0),n.substring(t+1,e).replace(/""/g,'"')}for(;c>f;){var r=n.charCodeAt(f++),o=1;if(10===r)u=!0;else if(13===r)u=!0,n.charCodeAt(f)===10&&(++f,++o);else if(r!==l)continue;return n.substring(t,f-o)}return n.substring(t)}for(var r,u,i={},a={},o=[],c=n.length,f=0,s=0;(r=e())!==a;){for(var h=[];r!==i&&r!==a;)h.push(r),r=e();(!t||(h=t(h,s++)))&&o.push(h)}return o},e.format=function(t){if(Array.isArray(t[0]))return e.formatRows(t);var r=new i,u=[];return t.forEach(function(n){for(var t in n)r.has(t)||u.push(r.add(t))}),[u.map(o).join(n)].concat(t.map(function(t){return u.map(function(n){return o(t[n])}).join(n)})).join("\n")},e.formatRows=function(n){return n.map(a).join("\n")},e}function pt(){for(var n,t=Date.now(),e=Wa;e;)n=t-e.then,n>=e.delay&&(e.flush=e.callback(n)),e=e.next;var r=dt()-t;r>24?(isFinite(r)&&(clearTimeout(Ja),Ja=setTimeout(pt,r)),$a=0):($a=1,Qa(pt))}function dt(){for(var n=null,t=Wa,e=1/0;t;)t.flush?(delete Ka[t.callback.id],t=n?n.next=t.next:Wa=t.next):(e=Math.min(e,t.then+t.delay),t=(n=t).next);return e}function mt(n,t){var e=Math.pow(10,Math.abs(8-t)*3);return{scale:t>8?function(n){return n/e}:function(n){return n*e},symbol:n}}function vt(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function yt(n){return n+""}function Mt(n,t){n&&lo.hasOwnProperty(n.type)&&lo[n.type](n,t)}function xt(n,t,e){var r,u=-1,i=n.length-e;for(t.lineStart();++u<i;)r=n[u],t.point(r[0],r[1]);t.lineEnd()}function bt(n,t){var e=-1,r=n.length;for(t.polygonStart();++e<r;)xt(n[e],t,1);t.polygonEnd()}function _t(){function n(n,t){n*=Pa,t=t*Pa/2+Fa/4;var e=n-r,a=Math.cos(t),o=Math.sin(t),c=i*o,l=so,f=ho,s=u*a+c*Math.cos(e),h=c*Math.sin(e);so=l*s-f*h,ho=f*s+l*h,r=n,u=a,i=o}var t,e,r,u,i;go.point=function(a,o){go.point=n,r=(t=a)*Pa,u=Math.cos(o=(e=o)*Pa/2+Fa/4),i=Math.sin(o)},go.lineEnd=function(){n(t,e)}}function wt(n){function t(n,t){r>n&&(r=n),n>i&&(i=n),u>t&&(u=t),t>a&&(a=t)}function e(){o.point=o.lineEnd=T}var r,u,i,a,o={point:t,lineStart:T,lineEnd:T,polygonStart:function(){o.lineEnd=e},polygonEnd:function(){o.point=t}};return function(t){return a=i=-(r=u=1/0),ca.geo.stream(t,n(o)),[[r,u],[i,a]]}}function St(n,t){if(!po){++mo,n*=Pa;var e=Math.cos(t*=Pa);vo+=(e*Math.cos(n)-vo)/mo,yo+=(e*Math.sin(n)-yo)/mo,Mo+=(Math.sin(t)-Mo)/mo}}function Et(){var n,t;po=1,kt(),po=2;var e=xo.point;xo.point=function(r,u){e(n=r,t=u)},xo.lineEnd=function(){xo.point(n,t),At(),xo.lineEnd=At}}function kt(){function n(n,u){n*=Pa;var i=Math.cos(u*=Pa),a=i*Math.cos(n),o=i*Math.sin(n),c=Math.sin(u),l=Math.atan2(Math.sqrt((l=e*c-r*o)*l+(l=r*a-t*c)*l+(l=t*o-e*a)*l),t*a+e*o+r*c);mo+=l,vo+=l*(t+(t=a)),yo+=l*(e+(e=o)),Mo+=l*(r+(r=c))}var t,e,r;po>1||(1>po&&(po=1,mo=vo=yo=Mo=0),xo.point=function(u,i){u*=Pa;var a=Math.cos(i*=Pa);t=a*Math.cos(u),e=a*Math.sin(u),r=Math.sin(i),xo.point=n})}function At(){xo.point=St}function qt(n){var t=n[0],e=n[1],r=Math.cos(e);return[r*Math.cos(t),r*Math.sin(t),Math.sin(e)]}function Nt(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function Tt(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Ct(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function zt(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function Dt(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function jt(){return!0}function Lt(n){return[Math.atan2(n[1],n[0]),Math.asin(Math.max(-1,Math.min(1,n[2])))]}function Ft(n,t){return Math.abs(n[0]-t[0])<Ha&&Math.abs(n[1]-t[1])<Ha}function Ht(n,t,e,r,u){var i=[],a=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,e=n[0],r=n[t];if(Ft(e,r)){u.lineStart();for(var o=0;t>o;++o)u.point((e=n[o])[0],e[1]);return u.lineEnd(),void 0}var c={point:e,points:n,other:null,visited:!1,entry:!0,subject:!0},l={point:e,points:[e],other:c,visited:!1,entry:!1,subject:!1};c.other=l,i.push(c),a.push(l),c={point:r,points:[r],other:null,visited:!1,entry:!1,subject:!0},l={point:r,points:[r],other:c,visited:!1,entry:!0,subject:!1},c.other=l,i.push(c),a.push(l)}}),a.sort(t),Pt(i),Pt(a),i.length){if(e)for(var o=1,c=!e(a[0].point),l=a.length;l>o;++o)a[o].entry=c=!c;for(var f,s,h,g=i[0];;){for(f=g;f.visited;)if((f=f.next)===g)return;s=f.points,u.lineStart();do{if(f.visited=f.other.visited=!0,f.entry){if(f.subject)for(var o=0;o<s.length;o++)u.point((h=s[o])[0],h[1]);else r(f.point,f.next.point,1,u);f=f.next}else{if(f.subject){s=f.prev.points;for(var o=s.length;--o>=0;)u.point((h=s[o])[0],h[1])}else r(f.point,f.prev.point,-1,u);f=f.prev}f=f.other,s=f.points}while(!f.visited);u.lineEnd()}}}function Pt(n){if(t=n.length){for(var t,e,r=0,u=n[0];++r<t;)u.next=e=n[r],e.prev=u,u=e;u.next=e=n[0],e.prev=u}}function Rt(n,t,e){return function(r){function u(t,e){n(t,e)&&r.point(t,e)}function i(n,t){m.point(n,t)}function a(){v.point=i,m.lineStart()}function o(){v.point=u,m.lineEnd()}function c(n,t){M.point(n,t),d.push([n,t])}function l(){M.lineStart(),d=[]}function f(){c(d[0][0],d[0][1]),M.lineEnd();var n,t=M.clean(),e=y.buffer(),u=e.length;if(!u)return p=!0,g+=Ut(d,-1),d=null,void 0;if(d=null,1&t){n=e[0],h+=Ut(n,1);var i,u=n.length-1,a=-1;for(r.lineStart();++a<u;)r.point((i=n[a])[0],i[1]);return r.lineEnd(),void 0}u>1&&2&t&&e.push(e.pop().concat(e.shift())),s.push(e.filter(Ot))}var s,h,g,p,d,m=t(r),v={point:u,lineStart:a,lineEnd:o,polygonStart:function(){v.point=c,v.lineStart=l,v.lineEnd=f,p=!1,g=h=0,s=[],r.polygonStart()},polygonEnd:function(){v.point=u,v.lineStart=a,v.lineEnd=o,s=ca.merge(s),s.length?Ht(s,It,null,e,r):(-Ha>h||p&&-Ha>g)&&(r.lineStart(),e(null,null,1,r),r.lineEnd()),r.polygonEnd(),s=null},sphere:function(){r.polygonStart(),r.lineStart(),e(null,null,1,r),r.lineEnd(),r.polygonEnd()}},y=Yt(),M=t(y);return v}}function Ot(n){return n.length>1}function Yt(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,e){n.push([t,e])},lineEnd:T,buffer:function(){var e=t;return t=[],n=null,e},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function Ut(n,t){if(!(e=n.length))return 0;for(var e,r,u,i=0,a=0,o=n[0],c=o[0],l=o[1],f=Math.cos(l),s=Math.atan2(t*Math.sin(c)*f,Math.sin(l)),h=1-t*Math.cos(c)*f,g=s;++i<e;)o=n[i],f=Math.cos(l=o[1]),r=Math.atan2(t*Math.sin(c=o[0])*f,Math.sin(l)),u=1-t*Math.cos(c)*f,Math.abs(h-2)<Ha&&Math.abs(u-2)<Ha||(Math.abs(u)<Ha||Math.abs(h)<Ha||(Math.abs(Math.abs(r-s)-Fa)<Ha?u+h>2&&(a+=4*(r-s)):a+=Math.abs(h-2)<Ha?4*(r-g):((3*Fa+r-s)%(2*Fa)-Fa)*(h+u)),g=s,s=r,h=u);return a}function It(n,t){return((n=n.point)[0]<0?n[1]-Fa/2-Ha:Fa/2-n[1])-((t=t.point)[0]<0?t[1]-Fa/2-Ha:Fa/2-t[1])}function Vt(n){var t,e=0/0,r=0/0,u=0/0;return{lineStart:function(){n.lineStart(),t=1},point:function(i,a){var o=i>0?Fa:-Fa,c=Math.abs(i-e);Math.abs(c-Fa)<Ha?(n.point(e,r=(r+a)/2>0?Fa/2:-Fa/2),n.point(u,r),n.lineEnd(),n.lineStart(),n.point(o,r),n.point(i,r),t=0):u!==o&&c>=Fa&&(Math.abs(e-u)<Ha&&(e-=u*Ha),Math.abs(i-o)<Ha&&(i-=o*Ha),r=Xt(e,r,i,a),n.point(u,r),n.lineEnd(),n.lineStart(),n.point(o,r),t=0),n.point(e=i,r=a),u=o},lineEnd:function(){n.lineEnd(),e=r=0/0},clean:function(){return 2-t}}}function Xt(n,t,e,r){var u,i,a=Math.sin(n-e);return Math.abs(a)>Ha?Math.atan((Math.sin(t)*(i=Math.cos(r))*Math.sin(e)-Math.sin(r)*(u=Math.cos(t))*Math.sin(n))/(u*i*a)):(t+r)/2}function Zt(n,t,e,r){var u;if(null==n)u=e*Fa/2,r.point(-Fa,u),r.point(0,u),r.point(Fa,u),r.point(Fa,0),r.point(Fa,-u),r.point(0,-u),r.point(-Fa,-u),r.point(-Fa,0),r.point(-Fa,u);else if(Math.abs(n[0]-t[0])>Ha){var i=(n[0]<t[0]?1:-1)*Fa;u=e*i/2,r.point(-i,u),r.point(0,u),r.point(i,u)}else r.point(t[0],t[1])}function Bt(n){function t(n,t){return Math.cos(n)*Math.cos(t)>i}function e(n){var e,i,c,l,f;return{lineStart:function(){l=c=!1,f=1},point:function(s,h){var g,p=[s,h],d=t(s,h),m=a?d?0:u(s,h):d?u(s+(0>s?Fa:-Fa),h):0;if(!e&&(l=c=d)&&n.lineStart(),d!==c&&(g=r(e,p),(Ft(e,g)||Ft(p,g))&&(p[0]+=Ha,p[1]+=Ha,d=t(p[0],p[1]))),d!==c)f=0,d?(n.lineStart(),g=r(p,e),n.point(g[0],g[1])):(g=r(e,p),n.point(g[0],g[1]),n.lineEnd()),e=g;else if(o&&e&&a^d){var v;m&i||!(v=r(p,e,!0))||(f=0,a?(n.lineStart(),n.point(v[0][0],v[0][1]),n.point(v[1][0],v[1][1]),n.lineEnd()):(n.point(v[1][0],v[1][1]),n.lineEnd(),n.lineStart(),n.point(v[0][0],v[0][1])))}!d||e&&Ft(e,p)||n.point(p[0],p[1]),e=p,c=d,i=m},lineEnd:function(){c&&n.lineEnd(),e=null},clean:function(){return f|(l&&c)<<1}}}function r(n,t,e){var r=qt(n),u=qt(t),a=[1,0,0],o=Tt(r,u),c=Nt(o,o),l=o[0],f=c-l*l;if(!f)return!e&&n;var s=i*c/f,h=-i*l/f,g=Tt(a,o),p=zt(a,s),d=zt(o,h);Ct(p,d);var m=g,v=Nt(p,m),y=Nt(m,m),M=v*v-y*(Nt(p,p)-1);if(!(0>M)){var x=Math.sqrt(M),b=zt(m,(-v-x)/y);if(Ct(b,p),b=Lt(b),!e)return b;var _,w=n[0],S=t[0],E=n[1],k=t[1];w>S&&(_=w,w=S,S=_);var A=S-w,q=Math.abs(A-Fa)<Ha,N=q||Ha>A;if(!q&&E>k&&(_=E,E=k,k=_),N?q?E+k>0^b[1]<(Math.abs(b[0]-w)<Ha?E:k):E<=b[1]&&b[1]<=k:A>Fa^(w<=b[0]&&b[0]<=S)){var T=zt(m,(-v+x)/y);return Ct(T,p),[b,Lt(T)]}}}function u(t,e){var r=a?n:Fa-n,u=0;return-r>t?u|=1:t>r&&(u|=2),-r>e?u|=4:e>r&&(u|=8),u}var i=Math.cos(n),a=i>0,o=Math.abs(i)>Ha,c=ae(n,6*Pa);return Rt(t,e,c)}function $t(n,t,e,r){function u(r,u){return Math.abs(r[0]-n)<Ha?u>0?0:3:Math.abs(r[0]-e)<Ha?u>0?2:1:Math.abs(r[1]-t)<Ha?u>0?1:0:u>0?3:2}function i(n,t){return a(n.point,t.point)}function a(n,t){var e=u(n,1),r=u(t,1);return e!==r?e-r:0===e?t[1]-n[1]:1===e?n[0]-t[0]:2===e?n[1]-t[1]:t[0]-n[0]}function o(u,i){var a=i[0]-u[0],o=i[1]-u[1],c=[0,1];return Math.abs(a)<Ha&&Math.abs(o)<Ha?n<=u[0]&&u[0]<=e&&t<=u[1]&&u[1]<=r:Jt(n-u[0],a,c)&&Jt(u[0]-e,-a,c)&&Jt(t-u[1],o,c)&&Jt(u[1]-r,-o,c)?(c[1]<1&&(i[0]=u[0]+c[1]*a,i[1]=u[1]+c[1]*o),c[0]>0&&(u[0]+=c[0]*a,u[1]+=c[0]*o),!0):!1}return function(c){function l(i){var a=u(i,-1),o=f([0===a||3===a?n:e,a>1?r:t]);return o}function f(n){for(var t=0,e=M.length,r=n[1],u=0;e>u;++u)for(var i=1,a=M[u],o=a.length,c=a[0];o>i;++i)b=a[i],c[1]<=r?b[1]>r&&s(c,b,n)>0&&++t:b[1]<=r&&s(c,b,n)<0&&--t,c=b;return 0!==t}function s(n,t,e){return(t[0]-n[0])*(e[1]-n[1])-(e[0]-n[0])*(t[1]-n[1])}function h(i,o,c,l){var f=0,s=0;if(null==i||(f=u(i,c))!==(s=u(o,c))||a(i,o)<0^c>0){do l.point(0===f||3===f?n:e,f>1?r:t);while((f=(f+c+4)%4)!==s)}else l.point(o[0],o[1])}function g(u,i){return u>=n&&e>=u&&i>=t&&r>=i}function p(n,t){g(n,t)&&c.point(n,t)}function d(){C.point=v,M&&M.push(x=[]),q=!0,A=!1,E=k=0/0}function m(){y&&(v(_,w),S&&A&&T.rejoin(),y.push(T.buffer())),C.point=p,A&&c.lineEnd()}function v(n,t){n=Math.max(-_o,Math.min(_o,n)),t=Math.max(-_o,Math.min(_o,t));var e=g(n,t);if(M&&x.push([n,t]),q)_=n,w=t,S=e,q=!1,e&&(c.lineStart(),c.point(n,t));else if(e&&A)c.point(n,t);else{var r=[E,k],u=[n,t];o(r,u)?(A||(c.lineStart(),c.point(r[0],r[1])),c.point(u[0],u[1]),e||c.lineEnd()):(c.lineStart(),c.point(n,t))}E=n,k=t,A=e}var y,M,x,_,w,S,E,k,A,q,N=c,T=Yt(),C={point:p,lineStart:d,lineEnd:m,polygonStart:function(){c=T,y=[],M=[]},polygonEnd:function(){c=N,(y=ca.merge(y)).length?(c.polygonStart(),Ht(y,i,l,h,c),c.polygonEnd()):f([n,t])&&(c.polygonStart(),c.lineStart(),h(null,null,1,c),c.lineEnd(),c.polygonEnd()),y=M=x=null}};return C}}function Jt(n,t,e){if(Math.abs(t)<Ha)return 0>=n;var r=n/t;if(t>0){if(r>e[1])return!1;r>e[0]&&(e[0]=r)}else{if(r<e[0])return!1;r<e[1]&&(e[1]=r)}return!0}function Gt(n,t){function e(e,r){return e=n(e,r),t(e[0],e[1])}return n.invert&&t.invert&&(e.invert=function(e,r){return e=t.invert(e,r),e&&n.invert(e[0],e[1])}),e}function Kt(n){function t(t){function r(e,r){e=n(e,r),t.point(e[0],e[1])}function i(){f=0/0,d.point=a,t.lineStart()}function a(r,i){var a=qt([r,i]),o=n(r,i);e(f,s,l,h,g,p,f=o[0],s=o[1],l=r,h=a[0],g=a[1],p=a[2],u,t),t.point(f,s)}function o(){d.point=r,t.lineEnd()}function c(){var n,r,c,m,v,y,M;i(),d.point=function(t,e){a(n=t,r=e),c=f,m=s,v=h,y=g,M=p,d.point=a},d.lineEnd=function(){e(f,s,l,h,g,p,c,m,n,v,y,M,u,t),d.lineEnd=o,o()}}var l,f,s,h,g,p,d={point:r,lineStart:i,lineEnd:o,polygonStart:function(){t.polygonStart(),d.lineStart=c},polygonEnd:function(){t.polygonEnd(),d.lineStart=i}};return d}function e(t,u,i,a,o,c,l,f,s,h,g,p,d,m){var v=l-t,y=f-u,M=v*v+y*y;if(M>4*r&&d--){var x=a+h,b=o+g,_=c+p,w=Math.sqrt(x*x+b*b+_*_),S=Math.asin(_/=w),E=Math.abs(Math.abs(_)-1)<Ha?(i+s)/2:Math.atan2(b,x),k=n(E,S),A=k[0],q=k[1],N=A-t,T=q-u,C=y*N-v*T;(C*C/M>r||Math.abs((v*N+y*T)/M-.5)>.3)&&(e(t,u,i,a,o,c,A,q,E,x/=w,b/=w,_,d,m),m.point(A,q),e(A,q,E,x,b,_,l,f,s,h,g,p,d,m))}}var r=.5,u=16;return t.precision=function(n){return arguments.length?(u=(r=n*n)>0&&16,t):Math.sqrt(r)},t}function Wt(n){return Qt(function(){return n})()}function Qt(n){function t(n){return n=a(n[0]*Pa,n[1]*Pa),[n[0]*f+o,c-n[1]*f]}function e(n){return n=a.invert((n[0]-o)/f,(c-n[1])/f),n&&[n[0]*Ra,n[1]*Ra]}function r(){a=Gt(i=ee(d,m,v),u);var n=u(g,p);return o=s-n[0]*f,c=h+n[1]*f,t}var u,i,a,o,c,l=Kt(function(n,t){return n=u(n,t),[n[0]*f+o,c-n[1]*f]}),f=150,s=480,h=250,g=0,p=0,d=0,m=0,v=0,y=bo,M=st,x=null,b=null;return t.stream=function(n){return ne(i,y(l(M(n))))},t.clipAngle=function(n){return arguments.length?(y=null==n?(x=n,bo):Bt((x=+n)*Pa),t):x},t.clipExtent=function(n){return arguments.length?(b=n,M=null==n?st:$t(n[0][0],n[0][1],n[1][0],n[1][1]),t):b},t.scale=function(n){return arguments.length?(f=+n,r()):f},t.translate=function(n){return arguments.length?(s=+n[0],h=+n[1],r()):[s,h]},t.center=function(n){return arguments.length?(g=n[0]%360*Pa,p=n[1]%360*Pa,r()):[g*Ra,p*Ra]},t.rotate=function(n){return arguments.length?(d=n[0]%360*Pa,m=n[1]%360*Pa,v=n.length>2?n[2]%360*Pa:0,r()):[d*Ra,m*Ra,v*Ra]},ca.rebind(t,l,"precision"),function(){return u=n.apply(this,arguments),t.invert=u.invert&&e,r()}}function ne(n,t){return{point:function(e,r){r=n(e*Pa,r*Pa),e=r[0],t.point(e>Fa?e-2*Fa:-Fa>e?e+2*Fa:e,r[1])},sphere:function(){t.sphere()},lineStart:function(){t.lineStart()},lineEnd:function(){t.lineEnd()},polygonStart:function(){t.polygonStart()},polygonEnd:function(){t.polygonEnd()}}}function te(n,t){return[n,t]}function ee(n,t,e){return n?t||e?Gt(ue(n),ie(t,e)):ue(n):t||e?ie(t,e):te}function re(n){return function(t,e){return t+=n,[t>Fa?t-2*Fa:-Fa>t?t+2*Fa:t,e]}}function ue(n){var t=re(n);return t.invert=re(-n),t}function ie(n,t){function e(n,t){var e=Math.cos(t),o=Math.cos(n)*e,c=Math.sin(n)*e,l=Math.sin(t),f=l*r+o*u;return[Math.atan2(c*i-f*a,o*r-l*u),Math.asin(Math.max(-1,Math.min(1,f*i+c*a)))]}var r=Math.cos(n),u=Math.sin(n),i=Math.cos(t),a=Math.sin(t);return e.invert=function(n,t){var e=Math.cos(t),o=Math.cos(n)*e,c=Math.sin(n)*e,l=Math.sin(t),f=l*i-c*a;return[Math.atan2(c*i+l*a,o*r+f*u),Math.asin(Math.max(-1,Math.min(1,f*r-o*u)))]},e}function ae(n,t){var e=Math.cos(n),r=Math.sin(n);return function(u,i,a,o){null!=u?(u=oe(e,u),i=oe(e,i),(a>0?i>u:u>i)&&(u+=2*a*Fa)):(u=n+2*a*Fa,i=n);for(var c,l=a*t,f=u;a>0?f>i:i>f;f-=l)o.point((c=Lt([e,-r*Math.cos(f),-r*Math.sin(f)]))[0],c[1])}}function oe(n,t){var e=qt(t);e[0]-=n,Dt(e);var r=Y(-e[1]);return((-e[2]<0?-r:r)+2*Math.PI-Ha)%(2*Math.PI)}function ce(n,t,e){var r=ca.range(n,t-Ha,e).concat(t);return function(n){return r.map(function(t){return[n,t]})}}function le(n,t,e){var r=ca.range(n,t-Ha,e).concat(t);return function(n){return r.map(function(t){return[t,n]})}}function fe(n){return n.source}function se(n){return n.target}function he(n,t,e,r){var u=Math.cos(t),i=Math.sin(t),a=Math.cos(r),o=Math.sin(r),c=u*Math.cos(n),l=u*Math.sin(n),f=a*Math.cos(e),s=a*Math.sin(e),h=2*Math.asin(Math.sqrt(X(r-t)+u*a*X(e-n))),g=1/Math.sin(h),p=h?function(n){var t=Math.sin(n*=h)*g,e=Math.sin(h-n)*g,r=e*c+t*f,u=e*l+t*s,a=e*i+t*o;return[Math.atan2(u,r)*Ra,Math.atan2(a,Math.sqrt(r*r+u*u))*Ra]}:function(){return[n*Ra,t*Ra]};return p.distance=h,p}function ge(){function n(n,u){var i=Math.sin(u*=Pa),a=Math.cos(u),o=Math.abs((n*=Pa)-t),c=Math.cos(o);wo+=Math.atan2(Math.sqrt((o=a*Math.sin(o))*o+(o=r*i-e*a*c)*o),e*i+r*a*c),t=n,e=i,r=a}var t,e,r;So.point=function(u,i){t=u*Pa,e=Math.sin(i*=Pa),r=Math.cos(i),So.point=n},So.lineEnd=function(){So.point=So.lineEnd=T}}function pe(n){var t=0,e=Fa/3,r=Qt(n),u=r(t,e);return u.parallels=function(n){return arguments.length?r(t=n[0]*Fa/180,e=n[1]*Fa/180):[180*(t/Fa),180*(e/Fa)]},u}function de(n,t){function e(n,t){var e=Math.sqrt(i-2*u*Math.sin(t))/u;return[e*Math.sin(n*=u),a-e*Math.cos(n)]}var r=Math.sin(n),u=(r+Math.sin(t))/2,i=1+r*(2*u-r),a=Math.sqrt(i)/u;return e.invert=function(n,t){var e=a-t;return[Math.atan2(n,e)/u,Math.asin((i-(n*n+e*e)*u*u)/(2*u))]},e}function me(n,t){var e=n(t[0]),r=n([.5*(t[0][0]+t[1][0]),t[0][1]]),u=n([t[1][0],t[0][1]]),i=n(t[1]),a=r[1]-e[1],o=r[0]-e[0],c=u[1]-r[1],l=u[0]-r[0],f=a/o,s=c/l,h=.5*(f*s*(e[1]-u[1])+s*(e[0]+r[0])-f*(r[0]+u[0]))/(s-f),g=(.5*(e[0]+r[0])-h)/f+.5*(e[1]+r[1]),p=i[0]-h,d=i[1]-g,m=e[0]-h,v=e[1]-g,y=p*p+d*d,M=m*m+v*v,x=Math.atan2(d,p),b=Math.atan2(v,m);return function(t){var e=t[0]-h,r=t[1]-g,u=e*e+r*r,i=Math.atan2(r,e);return u>y&&M>u&&i>x&&b>i?n.invert(t):void 0}}function ve(){function n(n,t){ko+=u*n-r*t,r=n,u=t}var t,e,r,u;Ao.point=function(i,a){Ao.point=n,t=r=i,e=u=a},Ao.lineEnd=function(){n(t,e)}}function ye(){function n(n,t){a.push("M",n,",",t,i)}function t(n,t){a.push("M",n,",",t),o.point=e}function e(n,t){a.push("L",n,",",t)}function r(){o.point=n}function u(){a.push("Z")}var i=Se(4.5),a=[],o={point:n,lineStart:function(){o.point=t},lineEnd:r,polygonStart:function(){o.lineEnd=u},polygonEnd:function(){o.lineEnd=r,o.point=n},pointRadius:function(n){return i=Se(n),o},result:function(){if(a.length){var n=a.join("");return a=[],n}}};return o}function Me(n,t){po||(vo+=n,yo+=t,++Mo)}function xe(){function n(n,r){var u=n-t,i=r-e,a=Math.sqrt(u*u+i*i);vo+=a*(t+n)/2,yo+=a*(e+r)/2,Mo+=a,t=n,e=r}var t,e;if(1!==po){if(!(1>po))return;po=1,vo=yo=Mo=0}qo.point=function(r,u){qo.point=n,t=r,e=u}}function be(){qo.point=Me}function _e(){function n(n,t){var e=u*n-r*t;vo+=e*(r+n),yo+=e*(u+t),Mo+=3*e,r=n,u=t}var t,e,r,u;2>po&&(po=2,vo=yo=Mo=0),qo.point=function(i,a){qo.point=n,t=r=i,e=u=a},qo.lineEnd=function(){n(t,e)}}function we(n){function t(t,e){n.moveTo(t,e),n.arc(t,e,a,0,2*Fa)}function e(t,e){n.moveTo(t,e),o.point=r}function r(t,e){n.lineTo(t,e)}function u(){o.point=t}function i(){n.closePath()}var a=4.5,o={point:t,lineStart:function(){o.point=e},lineEnd:u,polygonStart:function(){o.lineEnd=i},polygonEnd:function(){o.lineEnd=u,o.point=t},pointRadius:function(n){return a=n,o},result:T};return o}function Se(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function Ee(n){var t=Kt(function(t,e){return n([t*Ra,e*Ra])});return function(n){return n=t(n),{point:function(t,e){n.point(t*Pa,e*Pa)},sphere:function(){n.sphere()},lineStart:function(){n.lineStart()},lineEnd:function(){n.lineEnd()},polygonStart:function(){n.polygonStart()},polygonEnd:function(){n.polygonEnd()}}}}function ke(n,t){function e(t,e){var r=Math.cos(t),u=Math.cos(e),i=n(r*u);return[i*u*Math.sin(t),i*Math.sin(e)]}return e.invert=function(n,e){var r=Math.sqrt(n*n+e*e),u=t(r),i=Math.sin(u),a=Math.cos(u);return[Math.atan2(n*i,r*a),Math.asin(r&&e*i/r)]},e}function Ae(n,t){function e(n,t){var e=Math.abs(Math.abs(t)-Fa/2)<Ha?0:a/Math.pow(u(t),i);return[e*Math.sin(i*n),a-e*Math.cos(i*n)]}var r=Math.cos(n),u=function(n){return Math.tan(Fa/4+n/2)},i=n===t?Math.sin(n):Math.log(r/Math.cos(t))/Math.log(u(t)/u(n)),a=r*Math.pow(u(n),i)/i;return i?(e.invert=function(n,t){var e=a-t,r=O(i)*Math.sqrt(n*n+e*e);return[Math.atan2(n,e)/i,2*Math.atan(Math.pow(a/r,1/i))-Fa/2]},e):Ne}function qe(n,t){function e(n,t){var e=i-t;return[e*Math.sin(u*n),i-e*Math.cos(u*n)]}var r=Math.cos(n),u=n===t?Math.sin(n):(r-Math.cos(t))/(t-n),i=r/u+n;return Math.abs(u)<Ha?te:(e.invert=function(n,t){var e=i-t;return[Math.atan2(n,e)/u,i-O(u)*Math.sqrt(n*n+e*e)]},e)}function Ne(n,t){return[n,Math.log(Math.tan(Fa/4+t/2))]}function Te(n){var t,e=Wt(n),r=e.scale,u=e.translate,i=e.clipExtent;return e.scale=function(){var n=r.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.translate=function(){var n=u.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.clipExtent=function(n){var a=i.apply(e,arguments);if(a===e){if(t=null==n){var o=Fa*r(),c=u();i([[c[0]-o,c[1]-o],[c[0]+o,c[1]+o]])}}else t&&(a=null);return a},e.clipExtent(null)}function Ce(n,t){var e=Math.cos(t)*Math.sin(n);return[Math.log((1+e)/(1-e))/2,Math.atan2(Math.tan(t),Math.cos(n))]}function ze(n){function t(t){function a(){l.push("M",i(n(f),o))}for(var c,l=[],f=[],s=-1,h=t.length,g=ft(e),p=ft(r);++s<h;)u.call(this,c=t[s],s)?f.push([+g.call(this,c,s),+p.call(this,c,s)]):f.length&&(a(),f=[]);return f.length&&a(),l.length?l.join(""):null}var e=De,r=je,u=jt,i=Le,a=i.key,o=.7;return t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.defined=function(n){return arguments.length?(u=n,t):u},t.interpolate=function(n){return arguments.length?(a="function"==typeof n?i=n:(i=jo.get(n)||Le).key,t):a},t.tension=function(n){return arguments.length?(o=n,t):o},t}function De(n){return n[0]}function je(n){return n[1]}function Le(n){return n.join("L")}function Fe(n){return Le(n)+"Z"}function He(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("V",(r=n[t])[1],"H",r[0]);return u.join("")}function Pe(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("H",(r=n[t])[0],"V",r[1]);return u.join("")}function Re(n,t){return n.length<4?Le(n):n[1]+Ue(n.slice(1,n.length-1),Ie(n,t))}function Oe(n,t){return n.length<3?Le(n):n[0]+Ue((n.push(n[0]),n),Ie([n[n.length-2]].concat(n,[n[1]]),t))}function Ye(n,t){return n.length<3?Le(n):n[0]+Ue(n,Ie(n,t))}function Ue(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return Le(n);var e=n.length!=t.length,r="",u=n[0],i=n[1],a=t[0],o=a,c=1;if(e&&(r+="Q"+(i[0]-a[0]*2/3)+","+(i[1]-a[1]*2/3)+","+i[0]+","+i[1],u=n[1],c=2),t.length>1){o=t[1],i=n[c],c++,r+="C"+(u[0]+a[0])+","+(u[1]+a[1])+","+(i[0]-o[0])+","+(i[1]-o[1])+","+i[0]+","+i[1];for(var l=2;l<t.length;l++,c++)i=n[c],o=t[l],r+="S"+(i[0]-o[0])+","+(i[1]-o[1])+","+i[0]+","+i[1]}if(e){var f=n[c];r+="Q"+(i[0]+o[0]*2/3)+","+(i[1]+o[1]*2/3)+","+f[0]+","+f[1]}return r}function Ie(n,t){for(var e,r=[],u=(1-t)/2,i=n[0],a=n[1],o=1,c=n.length;++o<c;)e=i,i=a,a=n[o],r.push([u*(a[0]-e[0]),u*(a[1]-e[1])]);return r}function Ve(n){if(n.length<3)return Le(n);var t=1,e=n.length,r=n[0],u=r[0],i=r[1],a=[u,u,u,(r=n[1])[0]],o=[i,i,i,r[1]],c=[u,",",i];for(Je(c,a,o);++t<e;)r=n[t],a.shift(),a.push(r[0]),o.shift(),o.push(r[1]),Je(c,a,o);for(t=-1;++t<2;)a.shift(),a.push(r[0]),o.shift(),o.push(r[1]),Je(c,a,o);return c.join("")}function Xe(n){if(n.length<4)return Le(n);for(var t,e=[],r=-1,u=n.length,i=[0],a=[0];++r<3;)t=n[r],i.push(t[0]),a.push(t[1]);for(e.push($e(Ho,i)+","+$e(Ho,a)),--r;++r<u;)t=n[r],i.shift(),i.push(t[0]),a.shift(),a.push(t[1]),Je(e,i,a);return e.join("")}function Ze(n){for(var t,e,r=-1,u=n.length,i=u+4,a=[],o=[];++r<4;)e=n[r%u],a.push(e[0]),o.push(e[1]);for(t=[$e(Ho,a),",",$e(Ho,o)],--r;++r<i;)e=n[r%u],a.shift(),a.push(e[0]),o.shift(),o.push(e[1]),Je(t,a,o);return t.join("")}function Be(n,t){var e=n.length-1;if(e)for(var r,u,i=n[0][0],a=n[0][1],o=n[e][0]-i,c=n[e][1]-a,l=-1;++l<=e;)r=n[l],u=l/e,r[0]=t*r[0]+(1-t)*(i+u*o),r[1]=t*r[1]+(1-t)*(a+u*c);return Ve(n)}function $e(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function Je(n,t,e){n.push("C",$e(Lo,t),",",$e(Lo,e),",",$e(Fo,t),",",$e(Fo,e),",",$e(Ho,t),",",$e(Ho,e))}function Ge(n,t){return(t[1]-n[1])/(t[0]-n[0])}function Ke(n){for(var t=0,e=n.length-1,r=[],u=n[0],i=n[1],a=r[0]=Ge(u,i);++t<e;)r[t]=(a+(a=Ge(u=i,i=n[t+1])))/2;return r[t]=a,r}function We(n){for(var t,e,r,u,i=[],a=Ke(n),o=-1,c=n.length-1;++o<c;)t=Ge(n[o],n[o+1]),Math.abs(t)<1e-6?a[o]=a[o+1]=0:(e=a[o]/t,r=a[o+1]/t,u=e*e+r*r,u>9&&(u=3*t/Math.sqrt(u),a[o]=u*e,a[o+1]=u*r));for(o=-1;++o<=c;)u=(n[Math.min(c,o+1)][0]-n[Math.max(0,o-1)][0])/(6*(1+a[o]*a[o])),i.push([u||0,a[o]*u||0]);return i}function Qe(n){return n.length<3?Le(n):n[0]+Ue(n,We(n))}function nr(n,t,e,r){var u,i,a,o,c,l,f;return u=r[n],i=u[0],a=u[1],u=r[t],o=u[0],c=u[1],u=r[e],l=u[0],f=u[1],(f-a)*(o-i)-(c-a)*(l-i)>0}function tr(n,t,e){return(e[0]-t[0])*(n[1]-t[1])<(e[1]-t[1])*(n[0]-t[0])}function er(n,t,e,r){var u=n[0],i=e[0],a=t[0]-u,o=r[0]-i,c=n[1],l=e[1],f=t[1]-c,s=r[1]-l,h=(o*(c-l)-s*(u-i))/(s*a-o*f);
return[u+h*a,c+h*f]}function rr(n,t){var e={list:n.map(function(n,t){return{index:t,x:n[0],y:n[1]}}).sort(function(n,t){return n.y<t.y?-1:n.y>t.y?1:n.x<t.x?-1:n.x>t.x?1:0}),bottomSite:null},r={list:[],leftEnd:null,rightEnd:null,init:function(){r.leftEnd=r.createHalfEdge(null,"l"),r.rightEnd=r.createHalfEdge(null,"l"),r.leftEnd.r=r.rightEnd,r.rightEnd.l=r.leftEnd,r.list.unshift(r.leftEnd,r.rightEnd)},createHalfEdge:function(n,t){return{edge:n,side:t,vertex:null,l:null,r:null}},insert:function(n,t){t.l=n,t.r=n.r,n.r.l=t,n.r=t},leftBound:function(n){var t=r.leftEnd;do t=t.r;while(t!=r.rightEnd&&u.rightOf(t,n));return t=t.l},del:function(n){n.l.r=n.r,n.r.l=n.l,n.edge=null},right:function(n){return n.r},left:function(n){return n.l},leftRegion:function(n){return n.edge==null?e.bottomSite:n.edge.region[n.side]},rightRegion:function(n){return n.edge==null?e.bottomSite:n.edge.region[Po[n.side]]}},u={bisect:function(n,t){var e={region:{l:n,r:t},ep:{l:null,r:null}},r=t.x-n.x,u=t.y-n.y,i=r>0?r:-r,a=u>0?u:-u;return e.c=n.x*r+n.y*u+.5*(r*r+u*u),i>a?(e.a=1,e.b=u/r,e.c/=r):(e.b=1,e.a=r/u,e.c/=u),e},intersect:function(n,t){var e=n.edge,r=t.edge;if(!e||!r||e.region.r==r.region.r)return null;var u=e.a*r.b-e.b*r.a;if(Math.abs(u)<1e-10)return null;var i,a,o=(e.c*r.b-r.c*e.b)/u,c=(r.c*e.a-e.c*r.a)/u,l=e.region.r,f=r.region.r;l.y<f.y||l.y==f.y&&l.x<f.x?(i=n,a=e):(i=t,a=r);var s=o>=a.region.r.x;return s&&i.side==="l"||!s&&i.side==="r"?null:{x:o,y:c}},rightOf:function(n,t){var e=n.edge,r=e.region.r,u=t.x>r.x;if(u&&n.side==="l")return 1;if(!u&&n.side==="r")return 0;if(e.a===1){var i=t.y-r.y,a=t.x-r.x,o=0,c=0;if(!u&&e.b<0||u&&e.b>=0?c=o=i>=e.b*a:(c=t.x+t.y*e.b>e.c,e.b<0&&(c=!c),c||(o=1)),!o){var l=r.x-e.region.l.x;c=e.b*(a*a-i*i)<l*i*(1+2*a/l+e.b*e.b),e.b<0&&(c=!c)}}else{var f=e.c-e.a*t.x,s=t.y-f,h=t.x-r.x,g=f-r.y;c=s*s>h*h+g*g}return n.side==="l"?c:!c},endPoint:function(n,e,r){n.ep[e]=r,n.ep[Po[e]]&&t(n)},distance:function(n,t){var e=n.x-t.x,r=n.y-t.y;return Math.sqrt(e*e+r*r)}},i={list:[],insert:function(n,t,e){n.vertex=t,n.ystar=t.y+e;for(var r=0,u=i.list,a=u.length;a>r;r++){var o=u[r];if(!(n.ystar>o.ystar||n.ystar==o.ystar&&t.x>o.vertex.x))break}u.splice(r,0,n)},del:function(n){for(var t=0,e=i.list,r=e.length;r>t&&e[t]!=n;++t);e.splice(t,1)},empty:function(){return i.list.length===0},nextEvent:function(n){for(var t=0,e=i.list,r=e.length;r>t;++t)if(e[t]==n)return e[t+1];return null},min:function(){var n=i.list[0];return{x:n.vertex.x,y:n.ystar}},extractMin:function(){return i.list.shift()}};r.init(),e.bottomSite=e.list.shift();for(var a,o,c,l,f,s,h,g,p,d,m,v,y,M=e.list.shift();;)if(i.empty()||(a=i.min()),M&&(i.empty()||M.y<a.y||M.y==a.y&&M.x<a.x))o=r.leftBound(M),c=r.right(o),h=r.rightRegion(o),v=u.bisect(h,M),s=r.createHalfEdge(v,"l"),r.insert(o,s),d=u.intersect(o,s),d&&(i.del(o),i.insert(o,d,u.distance(d,M))),o=s,s=r.createHalfEdge(v,"r"),r.insert(o,s),d=u.intersect(s,c),d&&i.insert(s,d,u.distance(d,M)),M=e.list.shift();else{if(i.empty())break;o=i.extractMin(),l=r.left(o),c=r.right(o),f=r.right(c),h=r.leftRegion(o),g=r.rightRegion(c),m=o.vertex,u.endPoint(o.edge,o.side,m),u.endPoint(c.edge,c.side,m),r.del(o),i.del(c),r.del(c),y="l",h.y>g.y&&(p=h,h=g,g=p,y="r"),v=u.bisect(h,g),s=r.createHalfEdge(v,y),r.insert(l,s),u.endPoint(v,Po[y],m),d=u.intersect(l,s),d&&(i.del(l),i.insert(l,d,u.distance(d,h))),d=u.intersect(s,f),d&&i.insert(s,d,u.distance(d,h))}for(o=r.right(r.leftEnd);o!=r.rightEnd;o=r.right(o))t(o.edge)}function ur(n){return n.x}function ir(n){return n.y}function ar(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function or(n,t,e,r,u,i){if(!n(t,e,r,u,i)){var a=.5*(e+u),o=.5*(r+i),c=t.nodes;c[0]&&or(n,c[0],e,r,a,o),c[1]&&or(n,c[1],a,r,u,o),c[2]&&or(n,c[2],e,o,a,i),c[3]&&or(n,c[3],a,o,u,i)}}function cr(n,t){n=ca.rgb(n),t=ca.rgb(t);var e=n.r,r=n.g,u=n.b,i=t.r-e,a=t.g-r,o=t.b-u;return function(n){return"#"+ut(Math.round(e+i*n))+ut(Math.round(r+a*n))+ut(Math.round(u+o*n))}}function lr(n){var t=[n.a,n.b],e=[n.c,n.d],r=sr(t),u=fr(t,e),i=sr(hr(e,t,-u))||0;t[0]*e[1]<e[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,u*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-e[0],e[1]))*Ra,this.translate=[n.e,n.f],this.scale=[r,i],this.skew=i?Math.atan2(u,i)*Ra:0}function fr(n,t){return n[0]*t[0]+n[1]*t[1]}function sr(n){var t=Math.sqrt(fr(n,n));return t&&(n[0]/=t,n[1]/=t),t}function hr(n,t,e){return n[0]+=e*t[0],n[1]+=e*t[1],n}function gr(n,t){return t-=n=+n,function(e){return n+t*e}}function pr(n,t){var e,r=[],u=[],i=ca.transform(n),a=ca.transform(t),o=i.translate,c=a.translate,l=i.rotate,f=a.rotate,s=i.skew,h=a.skew,g=i.scale,p=a.scale;return o[0]!=c[0]||o[1]!=c[1]?(r.push("translate(",null,",",null,")"),u.push({i:1,x:gr(o[0],c[0])},{i:3,x:gr(o[1],c[1])})):c[0]||c[1]?r.push("translate("+c+")"):r.push(""),l!=f?(l-f>180?f+=360:f-l>180&&(l+=360),u.push({i:r.push(r.pop()+"rotate(",null,")")-2,x:gr(l,f)})):f&&r.push(r.pop()+"rotate("+f+")"),s!=h?u.push({i:r.push(r.pop()+"skewX(",null,")")-2,x:gr(s,h)}):h&&r.push(r.pop()+"skewX("+h+")"),g[0]!=p[0]||g[1]!=p[1]?(e=r.push(r.pop()+"scale(",null,",",null,")"),u.push({i:e-4,x:gr(g[0],p[0])},{i:e-2,x:gr(g[1],p[1])})):(p[0]!=1||p[1]!=1)&&r.push(r.pop()+"scale("+p+")"),e=u.length,function(n){for(var t,i=-1;++i<e;)r[(t=u[i]).i]=t.x(n);return r.join("")}}function dr(n,t){var e,r={},u={};for(e in n)e in t?r[e]=yr(e)(n[e],t[e]):u[e]=n[e];for(e in t)e in n||(u[e]=t[e]);return function(n){for(e in r)u[e]=r[e](n);return u}}function mr(n,t){var e,r,u,i,a,o=0,c=0,l=[],f=[];for(n+="",t+="",Oo.lastIndex=0,r=0;e=Oo.exec(t);++r)e.index&&l.push(t.substring(o,c=e.index)),f.push({i:l.length,x:e[0]}),l.push(null),o=Oo.lastIndex;for(o<t.length&&l.push(t.substring(o)),r=0,i=f.length;(e=Oo.exec(n))&&i>r;++r)if(a=f[r],a.x==e[0]){if(a.i)if(l[a.i+1]==null)for(l[a.i-1]+=a.x,l.splice(a.i,1),u=r+1;i>u;++u)f[u].i--;else for(l[a.i-1]+=a.x+l[a.i+1],l.splice(a.i,2),u=r+1;i>u;++u)f[u].i-=2;else if(l[a.i+1]==null)l[a.i]=a.x;else for(l[a.i]=a.x+l[a.i+1],l.splice(a.i+1,1),u=r+1;i>u;++u)f[u].i--;f.splice(r,1),i--,r--}else a.x=gr(parseFloat(e[0]),parseFloat(a.x));for(;i>r;)a=f.pop(),l[a.i+1]==null?l[a.i]=a.x:(l[a.i]=a.x+l[a.i+1],l.splice(a.i+1,1)),i--;return l.length===1?l[0]==null?f[0].x:function(){return t}:function(n){for(r=0;i>r;++r)l[(a=f[r]).i]=a.x(n);return l.join("")}}function vr(n,t){for(var e,r=ca.interpolators.length;--r>=0&&!(e=ca.interpolators[r](n,t)););return e}function yr(n){return"transform"==n?pr:vr}function Mr(n,t){var e,r=[],u=[],i=n.length,a=t.length,o=Math.min(n.length,t.length);for(e=0;o>e;++e)r.push(vr(n[e],t[e]));for(;i>e;++e)u[e]=n[e];for(;a>e;++e)u[e]=t[e];return function(n){for(e=0;o>e;++e)u[e]=r[e](n);return u}}function xr(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function br(n){return function(t){return 1-n(1-t)}}function _r(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function wr(n){return n*n}function Sr(n){return n*n*n}function Er(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,e=t*n;return 4*(.5>n?e:3*(n-t)+e-.75)}function kr(n){return function(t){return Math.pow(t,n)}}function Ar(n){return 1-Math.cos(n*Fa/2)}function qr(n){return Math.pow(2,10*(n-1))}function Nr(n){return 1-Math.sqrt(1-n*n)}function Tr(n,t){var e;return arguments.length<2&&(t=.45),arguments.length?e=t/(2*Fa)*Math.asin(1/n):(n=1,e=t/4),function(r){return 1+n*Math.pow(2,10*-r)*Math.sin(2*(r-e)*Fa/t)}}function Cr(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function zr(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function Dr(n,t){n=ca.hcl(n),t=ca.hcl(t);var e=n.h,r=n.c,u=n.l,i=t.h-e,a=t.c-r,o=t.l-u;return i>180?i-=360:-180>i&&(i+=360),function(n){return $(e+i*n,r+a*n,u+o*n)+""}}function jr(n,t){n=ca.hsl(n),t=ca.hsl(t);var e=n.h,r=n.s,u=n.l,i=t.h-e,a=t.s-r,o=t.l-u;return i>180?i-=360:-180>i&&(i+=360),function(n){return R(e+i*n,r+a*n,u+o*n)+""}}function Lr(n,t){n=ca.lab(n),t=ca.lab(t);var e=n.l,r=n.a,u=n.b,i=t.l-e,a=t.a-r,o=t.b-u;return function(n){return K(e+i*n,r+a*n,u+o*n)+""}}function Fr(n,t){return t-=n,function(e){return Math.round(n+t*e)}}function Hr(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return(e-n)*t}}function Pr(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return Math.max(0,Math.min(1,(e-n)*t))}}function Rr(n){for(var t=n.source,e=n.target,r=Yr(t,e),u=[t];t!==r;)t=t.parent,u.push(t);for(var i=u.length;e!==r;)u.splice(i,0,e),e=e.parent;return u}function Or(n){for(var t=[],e=n.parent;null!=e;)t.push(n),n=e,e=e.parent;return t.push(n),t}function Yr(n,t){if(n===t)return n;for(var e=Or(n),r=Or(t),u=e.pop(),i=r.pop(),a=null;u===i;)a=u,u=e.pop(),i=r.pop();return a}function Ur(n){n.fixed|=2}function Ir(n){n.fixed&=-7}function Vr(n){n.fixed|=4,n.px=n.x,n.py=n.y}function Xr(n){n.fixed&=-5}function Zr(n,t,e){var r=0,u=0;if(n.charge=0,!n.leaf)for(var i,a=n.nodes,o=a.length,c=-1;++c<o;)i=a[c],null!=i&&(Zr(i,t,e),n.charge+=i.charge,r+=i.charge*i.cx,u+=i.charge*i.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var l=t*e[n.point.index];n.charge+=n.pointCharge=l,r+=l*n.point.x,u+=l*n.point.y}n.cx=r/n.charge,n.cy=u/n.charge}function Br(n,t){return ca.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=Kr,n}function $r(n){return n.children}function Jr(n){return n.value}function Gr(n,t){return t.value-n.value}function Kr(n){return ca.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function Wr(n){return n.x}function Qr(n){return n.y}function nu(n,t,e){n.y0=t,n.y=e}function tu(n){return ca.range(n.length)}function eu(n){for(var t=-1,e=n[0].length,r=[];++t<e;)r[t]=0;return r}function ru(n){for(var t,e=1,r=0,u=n[0][1],i=n.length;i>e;++e)(t=n[e][1])>u&&(r=e,u=t);return r}function uu(n){return n.reduce(iu,0)}function iu(n,t){return n+t[1]}function au(n,t){return ou(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function ou(n,t){for(var e=-1,r=+n[0],u=(n[1]-r)/t,i=[];++e<=t;)i[e]=u*e+r;return i}function cu(n){return[ca.min(n),ca.max(n)]}function lu(n,t){return n.parent==t.parent?1:2}function fu(n){var t=n.children;return t&&t.length?t[0]:n._tree.thread}function su(n){var t,e=n.children;return e&&(t=e.length)?e[t-1]:n._tree.thread}function hu(n,t){var e=n.children;if(e&&(u=e.length))for(var r,u,i=-1;++i<u;)t(r=hu(e[i],t),n)>0&&(n=r);return n}function gu(n,t){return n.x-t.x}function pu(n,t){return t.x-n.x}function du(n,t){return n.depth-t.depth}function mu(n,t){function e(n,r){var u=n.children;if(u&&(a=u.length))for(var i,a,o=null,c=-1;++c<a;)i=u[c],e(i,o),o=i;t(n,r)}e(n,null)}function vu(n){for(var t,e=0,r=0,u=n.children,i=u.length;--i>=0;)t=u[i]._tree,t.prelim+=e,t.mod+=e,e+=t.shift+(r+=t.change)}function yu(n,t,e){n=n._tree,t=t._tree;var r=e/(t.number-n.number);n.change+=r,t.change-=r,t.shift+=e,t.prelim+=e,t.mod+=e}function Mu(n,t,e){return n._tree.ancestor.parent==t.parent?n._tree.ancestor:e}function xu(n,t){return n.value-t.value}function bu(n,t){var e=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=e,e._pack_prev=t}function _u(n,t){n._pack_next=t,t._pack_prev=n}function wu(n,t){var e=t.x-n.x,r=t.y-n.y,u=n.r+t.r;return u*u-e*e-r*r>.001}function Su(n){function t(n){f=Math.min(n.x-n.r,f),s=Math.max(n.x+n.r,s),h=Math.min(n.y-n.r,h),g=Math.max(n.y+n.r,g)}if((e=n.children)&&(l=e.length)){var e,r,u,i,a,o,c,l,f=1/0,s=-1/0,h=1/0,g=-1/0;if(e.forEach(Eu),r=e[0],r.x=-r.r,r.y=0,t(r),l>1&&(u=e[1],u.x=u.r,u.y=0,t(u),l>2))for(i=e[2],qu(r,u,i),t(i),bu(r,i),r._pack_prev=i,bu(i,u),u=r._pack_next,a=3;l>a;a++){qu(r,u,i=e[a]);var p=0,d=1,m=1;for(o=u._pack_next;o!==u;o=o._pack_next,d++)if(wu(o,i)){p=1;break}if(1==p)for(c=r._pack_prev;c!==o._pack_prev&&!wu(c,i);c=c._pack_prev,m++);p?(m>d||d==m&&u.r<r.r?_u(r,u=o):_u(r=c,u),a--):(bu(r,i),u=i,t(i))}var v=(f+s)/2,y=(h+g)/2,M=0;for(a=0;l>a;a++)i=e[a],i.x-=v,i.y-=y,M=Math.max(M,i.r+Math.sqrt(i.x*i.x+i.y*i.y));n.r=M,e.forEach(ku)}}function Eu(n){n._pack_next=n._pack_prev=n}function ku(n){delete n._pack_next,delete n._pack_prev}function Au(n,t,e,r){var u=n.children;if(n.x=t+=r*n.x,n.y=e+=r*n.y,n.r*=r,u)for(var i=-1,a=u.length;++i<a;)Au(u[i],t,e,r)}function qu(n,t,e){var r=n.r+e.r,u=t.x-n.x,i=t.y-n.y;if(r&&(u||i)){var a=t.r+e.r,o=u*u+i*i;a*=a,r*=r;var c=.5+(r-a)/(2*o),l=Math.sqrt(Math.max(0,2*a*(r+o)-(r-=o)*r-a*a))/(2*o);e.x=n.x+c*u+l*i,e.y=n.y+c*i-l*u}else e.x=n.x+r,e.y=n.y}function Nu(n){return 1+ca.max(n,function(n){return n.y})}function Tu(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function Cu(n){var t=n.children;return t&&t.length?Cu(t[0]):n}function zu(n){var t,e=n.children;return e&&(t=e.length)?zu(e[t-1]):n}function Du(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function ju(n,t){var e=n.x+t[3],r=n.y+t[0],u=n.dx-t[1]-t[3],i=n.dy-t[0]-t[2];return 0>u&&(e+=u/2,u=0),0>i&&(r+=i/2,i=0),{x:e,y:r,dx:u,dy:i}}function Lu(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function Fu(n){return n.rangeExtent?n.rangeExtent():Lu(n.range())}function Hu(n,t,e,r){var u=e(n[0],n[1]),i=r(t[0],t[1]);return function(n){return i(u(n))}}function Pu(n,t){var e,r=0,u=n.length-1,i=n[r],a=n[u];return i>a&&(e=r,r=u,u=e,e=i,i=a,a=e),(t=t(a-i))&&(n[r]=t.floor(i),n[u]=t.ceil(a)),n}function Ru(n,t,e,r){var u=[],i=[],a=0,o=Math.min(n.length,t.length)-1;for(n[o]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++a<=o;)u.push(e(n[a-1],n[a])),i.push(r(t[a-1],t[a]));return function(t){var e=ca.bisect(n,t,1,o)-1;return i[e](u[e](t))}}function Ou(n,t,e,r){function u(){var u=Math.min(n.length,t.length)>2?Ru:Hu,c=r?Pr:Hr;return a=u(n,t,c,e),o=u(t,n,c,vr),i}function i(n){return a(n)}var a,o;return i.invert=function(n){return o(n)},i.domain=function(t){return arguments.length?(n=t.map(Number),u()):n},i.range=function(n){return arguments.length?(t=n,u()):t},i.rangeRound=function(n){return i.range(n).interpolate(Fr)},i.clamp=function(n){return arguments.length?(r=n,u()):r},i.interpolate=function(n){return arguments.length?(e=n,u()):e},i.ticks=function(t){return Vu(n,t)},i.tickFormat=function(t,e){return Xu(n,t,e)},i.nice=function(){return Pu(n,Uu),u()},i.copy=function(){return Ou(n,t,e,r)},u()}function Yu(n,t){return ca.rebind(n,t,"range","rangeRound","interpolate","clamp")}function Uu(n){return n=Math.pow(10,Math.round(Math.log(n)/Math.LN10)-1),n&&{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}}function Iu(n,t){var e=Lu(n),r=e[1]-e[0],u=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),i=t/r*u;return.15>=i?u*=10:.35>=i?u*=5:.75>=i&&(u*=2),e[0]=Math.ceil(e[0]/u)*u,e[1]=Math.floor(e[1]/u)*u+.5*u,e[2]=u,e}function Vu(n,t){return ca.range.apply(ca,Iu(n,t))}function Xu(n,t,e){var r=-Math.floor(Math.log(Iu(n,t)[2])/Math.LN10+.01);return ca.format(e?e.replace(uo,function(n,t,e,u,i,a,o,c,l,f){return[t,e,u,i,a,o,c,l||"."+(r-2*("%"===f)),f].join("")}):",."+r+"f")}function Zu(n,t,e,r){function u(t){return n(e(t))}return u.invert=function(t){return r(n.invert(t))},u.domain=function(t){return arguments.length?(t[0]<0?(e=Ju,r=Gu):(e=Bu,r=$u),n.domain(t.map(e)),u):n.domain().map(r)},u.base=function(n){return arguments.length?(t=+n,u):t},u.nice=function(){return n.domain(Pu(n.domain(),Ku(t))),u},u.ticks=function(){var u=Lu(n.domain()),i=[];if(u.every(isFinite)){var a=Math.log(t),o=Math.floor(u[0]/a),c=Math.ceil(u[1]/a),l=r(u[0]),f=r(u[1]),s=t%1?2:t;if(e===Ju)for(i.push(-Math.pow(t,-o));o++<c;)for(var h=s-1;h>0;h--)i.push(-Math.pow(t,-o)*h);else{for(;c>o;o++)for(var h=1;s>h;h++)i.push(Math.pow(t,o)*h);i.push(Math.pow(t,o))}for(o=0;i[o]<l;o++);for(c=i.length;i[c-1]>f;c--);i=i.slice(o,c)}return i},u.tickFormat=function(n,i){if(arguments.length<2&&(i=Jo),!arguments.length)return i;var a,o=Math.log(t),c=Math.max(.1,n/u.ticks().length),l=e===Ju?(a=-1e-12,Math.floor):(a=1e-12,Math.ceil);return function(n){return n/r(o*l(e(n)/o+a))<=c?i(n):""}},u.copy=function(){return Zu(n.copy(),t,e,r)},Yu(u,n)}function Bu(n){return Math.log(0>n?0:n)}function $u(n){return Math.exp(n)}function Ju(n){return-Math.log(n>0?0:-n)}function Gu(n){return-Math.exp(-n)}function Ku(n){n=Math.log(n);var t={floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}};return function(){return t}}function Wu(n,t){function e(t){return n(r(t))}var r=Qu(t),u=Qu(1/t);return e.invert=function(t){return u(n.invert(t))},e.domain=function(t){return arguments.length?(n.domain(t.map(r)),e):n.domain().map(u)},e.ticks=function(n){return Vu(e.domain(),n)},e.tickFormat=function(n,t){return Xu(e.domain(),n,t)},e.nice=function(){return e.domain(Pu(e.domain(),Uu))},e.exponent=function(n){if(!arguments.length)return t;var i=e.domain();return r=Qu(t=n),u=Qu(1/t),e.domain(i)},e.copy=function(){return Wu(n.copy(),t)},Yu(e,n)}function Qu(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function ni(n,t){function e(t){return a[((i.get(t)||i.set(t,n.push(t)))-1)%a.length]}function r(t,e){return ca.range(n.length).map(function(n){return t+e*n})}var i,a,o;return e.domain=function(r){if(!arguments.length)return n;n=[],i=new u;for(var a,o=-1,c=r.length;++o<c;)i.has(a=r[o])||i.set(a,n.push(a));return e[t.t].apply(e,t.a)},e.range=function(n){return arguments.length?(a=n,o=0,t={t:"range",a:arguments},e):a},e.rangePoints=function(u,i){arguments.length<2&&(i=0);var c=u[0],l=u[1],f=(l-c)/(Math.max(1,n.length-1)+i);return a=r(n.length<2?(c+l)/2:c+f*i/2,f),o=0,t={t:"rangePoints",a:arguments},e},e.rangeBands=function(u,i,c){arguments.length<2&&(i=0),arguments.length<3&&(c=i);var l=u[1]<u[0],f=u[l-0],s=u[1-l],h=(s-f)/(n.length-i+2*c);return a=r(f+h*c,h),l&&a.reverse(),o=h*(1-i),t={t:"rangeBands",a:arguments},e},e.rangeRoundBands=function(u,i,c){arguments.length<2&&(i=0),arguments.length<3&&(c=i);var l=u[1]<u[0],f=u[l-0],s=u[1-l],h=Math.floor((s-f)/(n.length-i+2*c)),g=s-f-(n.length-i)*h;return a=r(f+Math.round(g/2),h),l&&a.reverse(),o=Math.round(h*(1-i)),t={t:"rangeRoundBands",a:arguments},e},e.rangeBand=function(){return o},e.rangeExtent=function(){return Lu(t.a[0])},e.copy=function(){return ni(n,t)},e.domain(n)}function ti(n,t){function e(){var e=0,i=t.length;for(u=[];++e<i;)u[e-1]=ca.quantile(n,e/i);return r}function r(n){return isNaN(n=+n)?0/0:t[ca.bisect(u,n)]}var u;return r.domain=function(t){return arguments.length?(n=t.filter(function(n){return!isNaN(n)}).sort(ca.ascending),e()):n},r.range=function(n){return arguments.length?(t=n,e()):t},r.quantiles=function(){return u},r.copy=function(){return ti(n,t)},e()}function ei(n,t,e){function r(t){return e[Math.max(0,Math.min(a,Math.floor(i*(t-n))))]}function u(){return i=e.length/(t-n),a=e.length-1,r}var i,a;return r.domain=function(e){return arguments.length?(n=+e[0],t=+e[e.length-1],u()):[n,t]},r.range=function(n){return arguments.length?(e=n,u()):e},r.copy=function(){return ei(n,t,e)},u()}function ri(n,t){function e(e){return t[ca.bisect(n,e)]}return e.domain=function(t){return arguments.length?(n=t,e):n},e.range=function(n){return arguments.length?(t=n,e):t},e.copy=function(){return ri(n,t)},e}function ui(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=e.map(t),t):n},t.ticks=function(t){return Vu(n,t)},t.tickFormat=function(t,e){return Xu(n,t,e)},t.copy=function(){return ui(n)},t}function ii(n){return n.innerRadius}function ai(n){return n.outerRadius}function oi(n){return n.startAngle}function ci(n){return n.endAngle}function li(n){for(var t,e,r,u=-1,i=n.length;++u<i;)t=n[u],e=t[0],r=t[1]+nc,t[0]=e*Math.cos(r),t[1]=e*Math.sin(r);return n}function fi(n){function t(t){function c(){d.push("M",o(n(v),s),f,l(n(m.reverse()),s),"Z")}for(var h,g,p,d=[],m=[],v=[],y=-1,M=t.length,x=ft(e),b=ft(u),_=e===r?function(){return g}:ft(r),w=u===i?function(){return p}:ft(i);++y<M;)a.call(this,h=t[y],y)?(m.push([g=+x.call(this,h,y),p=+b.call(this,h,y)]),v.push([+_.call(this,h,y),+w.call(this,h,y)])):m.length&&(c(),m=[],v=[]);return m.length&&c(),d.length?d.join(""):null}var e=De,r=De,u=0,i=je,a=jt,o=Le,c=o.key,l=o,f="L",s=.7;return t.x=function(n){return arguments.length?(e=r=n,t):r},t.x0=function(n){return arguments.length?(e=n,t):e},t.x1=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(u=i=n,t):i},t.y0=function(n){return arguments.length?(u=n,t):u},t.y1=function(n){return arguments.length?(i=n,t):i},t.defined=function(n){return arguments.length?(a=n,t):a},t.interpolate=function(n){return arguments.length?(c="function"==typeof n?o=n:(o=jo.get(n)||Le).key,l=o.reverse||o,f=o.closed?"M":"L",t):c},t.tension=function(n){return arguments.length?(s=n,t):s},t}function si(n){return n.radius}function hi(n){return[n.x,n.y]}function gi(n){return function(){var t=n.apply(this,arguments),e=t[0],r=t[1]+nc;return[e*Math.cos(r),e*Math.sin(r)]}}function pi(){return 64}function di(){return"circle"}function mi(n){var t=Math.sqrt(n/Fa);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function vi(n,t){return xa(n,ac),n.id=t,n}function yi(n,t,e,r){var u=n.id;return j(n,"function"==typeof e?function(n,i,a){n.__transition__[u].tween.set(t,r(e.call(n,n.__data__,i,a)))}:(e=r(e),function(n){n.__transition__[u].tween.set(t,e)}))}function Mi(n){return null==n&&(n=""),function(){this.textContent=n}}function xi(n,t,e,r){var i=n.__transition__||(n.__transition__={active:0,count:0}),a=i[e];if(!a){var o=r.time;return a=i[e]={tween:new u,event:ca.dispatch("start","end"),time:o,ease:r.ease,delay:r.delay,duration:r.duration},++i.count,ca.timer(function(r){function u(r){return i.active>e?l():(i.active=e,h.start.call(n,f,t),a.tween.forEach(function(e,r){(r=r.call(n,f,t))&&d.push(r)}),c(r)||ca.timer(c,0,o),1)}function c(r){if(i.active!==e)return l();for(var u=(r-g)/p,a=s(u),o=d.length;o>0;)d[--o].call(n,a);return u>=1?(l(),h.end.call(n,f,t),1):void 0}function l(){return--i.count?delete i[e]:delete n.__transition__,1}var f=n.__data__,s=a.ease,h=a.event,g=a.delay,p=a.duration,d=[];return r>=g?u(r):ca.timer(u,g,o),1},0,o),a}}function bi(n,t){n.attr("transform",function(n){return"translate("+t(n)+",0)"})}function _i(n,t){n.attr("transform",function(n){return"translate(0,"+t(n)+")"})}function wi(n,t,e){if(r=[],e&&t.length>1){for(var r,u,i,a=Lu(n.domain()),o=-1,c=t.length,l=(t[1]-t[0])/++e;++o<c;)for(u=e;--u>0;)(i=+t[o]-u*l)>=a[0]&&r.push(i);for(--o,u=0;++u<e&&(i=+t[o]+u*l)<a[1];)r.push(i)}return r}function Si(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function Ei(n,t,e){function r(t){var e=n(t),r=i(e,1);return r-t>t-e?e:r}function u(e){return t(e=n(new gc(e-1)),1),e}function i(n,e){return t(n=new gc(+n),e),n}function a(n,r,i){var a=u(n),o=[];if(i>1)for(;r>a;)e(a)%i||o.push(new Date(+a)),t(a,1);else for(;r>a;)o.push(new Date(+a)),t(a,1);return o}function o(n,t,e){try{gc=Si;var r=new Si;return r._=n,a(r,t,e)}finally{gc=Date}}n.floor=n,n.round=r,n.ceil=u,n.offset=i,n.range=a;var c=n.utc=ki(n);return c.floor=c,c.round=ki(r),c.ceil=ki(u),c.offset=ki(i),c.range=o,n}function ki(n){return function(t,e){try{gc=Si;var r=new Si;return r._=t,n(r,e)._}finally{gc=Date}}}function Ai(n,t,e,r){for(var u,i,a=0,o=t.length,c=e.length;o>a;){if(r>=c)return-1;if(u=t.charCodeAt(a++),37===u){if(i=Cc[t.charAt(a++)],!i||(r=i(n,e,r))<0)return-1}else if(u!=e.charCodeAt(r++))return-1}return r}function qi(n){return RegExp("^(?:"+n.map(ca.requote).join("|")+")","i")}function Ni(n){for(var t=new u,e=-1,r=n.length;++e<r;)t.set(n[e].toLowerCase(),e);return t}function Ti(n,t,e){n+="";var r=n.length;return e>r?Array(e-r+1).join(t)+n:n}function Ci(n,t,e){Sc.lastIndex=0;var r=Sc.exec(t.substring(e));return r?e+=r[0].length:-1}function zi(n,t,e){wc.lastIndex=0;var r=wc.exec(t.substring(e));return r?e+=r[0].length:-1}function Di(n,t,e){Ac.lastIndex=0;var r=Ac.exec(t.substring(e));return r?(n.m=qc.get(r[0].toLowerCase()),e+=r[0].length):-1}function ji(n,t,e){Ec.lastIndex=0;var r=Ec.exec(t.substring(e));return r?(n.m=kc.get(r[0].toLowerCase()),e+=r[0].length):-1}function Li(n,t,e){return Ai(n,""+Tc.c,t,e)}function Fi(n,t,e){return Ai(n,""+Tc.x,t,e)}function Hi(n,t,e){return Ai(n,""+Tc.X,t,e)}function Pi(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+4));return r?(n.y=+r[0],e+=r[0].length):-1}function Ri(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.y=Oi(+r[0]),e+=r[0].length):-1}function Oi(n){return n+(n>68?1900:2e3)}function Yi(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.m=r[0]-1,e+=r[0].length):-1}function Ui(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.d=+r[0],e+=r[0].length):-1}function Ii(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.H=+r[0],e+=r[0].length):-1}function Vi(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.M=+r[0],e+=r[0].length):-1}function Xi(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.S=+r[0],e+=r[0].length):-1}function Zi(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+3));return r?(n.L=+r[0],e+=r[0].length):-1}function Bi(n,t,e){var r=Dc.get(t.substring(e,e+=2).toLowerCase());return null==r?-1:(n.p=r,e)}function $i(n){var t=n.getTimezoneOffset(),e=t>0?"-":"+",r=~~(Math.abs(t)/60),u=Math.abs(t)%60;return e+Ti(r,"0",2)+Ti(u,"0",2)}function Ji(n){return n.toISOString()}function Gi(n,t,e){function r(t){return n(t)}return r.invert=function(t){return Wi(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain(t),r):n.domain().map(Wi)},r.nice=function(n){return r.domain(Pu(r.domain(),function(){return n}))},r.ticks=function(e,u){var i=Ki(r.domain());if("function"!=typeof e){var a=i[1]-i[0],o=a/e,c=ca.bisect(Lc,o);if(c==Lc.length)return t.year(i,e);if(!c)return n.ticks(e).map(Wi);Math.log(o/Lc[c-1])<Math.log(Lc[c]/o)&&--c,e=t[c],u=e[1],e=e[0].range}return e(i[0],new Date(+i[1]+1),u)},r.tickFormat=function(){return e},r.copy=function(){return Gi(n.copy(),t,e)},ca.rebind(r,n,"range","rangeRound","interpolate","clamp")}function Ki(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function Wi(n){return new Date(n)}function Qi(n){return function(t){for(var e=n.length-1,r=n[e];!r[1](t);)r=n[--e];return r[0](t)}}function na(n){var t=new Date(n,0,1);return t.setFullYear(n),t}function ta(n){var t=n.getFullYear(),e=na(t),r=na(t+1);return t+(n-e)/(r-e)}function ea(n){var t=new Date(Date.UTC(n,0,1));return t.setUTCFullYear(n),t}function ra(n){var t=n.getUTCFullYear(),e=ea(t),r=ea(t+1);return t+(n-e)/(r-e)}function ua(n){return n.responseText}function ia(n){return JSON.parse(n.responseText)}function aa(n){var t=la.createRange();return t.selectNode(la.body),t.createContextualFragment(n.responseText)}function oa(n){return n.responseXML}var ca={version:"3.1.5"};Date.now||(Date.now=function(){return+new Date});var la=document,fa=window;try{la.createElement("div").style.setProperty("opacity",0,"")}catch(sa){var ha=fa.CSSStyleDeclaration.prototype,ga=ha.setProperty;ha.setProperty=function(n,t,e){ga.call(this,n,t+"",e)}}ca.ascending=function(n,t){return t>n?-1:n>t?1:n>=t?0:0/0},ca.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:0/0},ca.min=function(n,t){var e,r,u=-1,i=n.length;if(arguments.length===1){for(;++u<i&&((e=n[u])==null||e!=e);)e=void 0;for(;++u<i;)(r=n[u])!=null&&e>r&&(e=r)}else{for(;++u<i&&((e=t.call(n,n[u],u))==null||e!=e);)e=void 0;for(;++u<i;)(r=t.call(n,n[u],u))!=null&&e>r&&(e=r)}return e},ca.max=function(n,t){var e,r,u=-1,i=n.length;if(arguments.length===1){for(;++u<i&&((e=n[u])==null||e!=e);)e=void 0;for(;++u<i;)(r=n[u])!=null&&r>e&&(e=r)}else{for(;++u<i&&((e=t.call(n,n[u],u))==null||e!=e);)e=void 0;for(;++u<i;)(r=t.call(n,n[u],u))!=null&&r>e&&(e=r)}return e},ca.extent=function(n,t){var e,r,u,i=-1,a=n.length;if(arguments.length===1){for(;++i<a&&((e=u=n[i])==null||e!=e);)e=u=void 0;for(;++i<a;)(r=n[i])!=null&&(e>r&&(e=r),r>u&&(u=r))}else{for(;++i<a&&((e=u=t.call(n,n[i],i))==null||e!=e);)e=void 0;for(;++i<a;)(r=t.call(n,n[i],i))!=null&&(e>r&&(e=r),r>u&&(u=r))}return[e,u]},ca.sum=function(n,t){var e,r=0,u=n.length,i=-1;if(arguments.length===1)for(;++i<u;)isNaN(e=+n[i])||(r+=e);else for(;++i<u;)isNaN(e=+t.call(n,n[i],i))||(r+=e);return r},ca.mean=function(t,e){var r,u=t.length,i=0,a=-1,o=0;if(arguments.length===1)for(;++a<u;)n(r=t[a])&&(i+=(r-i)/++o);else for(;++a<u;)n(r=e.call(t,t[a],a))&&(i+=(r-i)/++o);return o?i:void 0},ca.quantile=function(n,t){var e=(n.length-1)*t+1,r=Math.floor(e),u=+n[r-1],i=e-r;return i?u+i*(n[r]-u):u},ca.median=function(t,e){return arguments.length>1&&(t=t.map(e)),t=t.filter(n),t.length?ca.quantile(t.sort(ca.ascending),.5):void 0},ca.bisector=function(n){return{left:function(t,e,r,u){for(arguments.length<3&&(r=0),arguments.length<4&&(u=t.length);u>r;){var i=r+u>>>1;n.call(t,t[i],i)<e?r=i+1:u=i}return r},right:function(t,e,r,u){for(arguments.length<3&&(r=0),arguments.length<4&&(u=t.length);u>r;){var i=r+u>>>1;e<n.call(t,t[i],i)?u=i:r=i+1}return r}}};var pa=ca.bisector(function(n){return n});ca.bisectLeft=pa.left,ca.bisect=ca.bisectRight=pa.right,ca.shuffle=function(n){for(var t,e,r=n.length;r;)e=Math.random()*r--|0,t=n[r],n[r]=n[e],n[e]=t;return n},ca.permute=function(n,t){for(var e=[],r=-1,u=t.length;++r<u;)e[r]=n[t[r]];return e},ca.zip=function(){if(!(u=arguments.length))return[];for(var n=-1,e=ca.min(arguments,t),r=Array(e);++n<e;)for(var u,i=-1,a=r[n]=Array(u);++i<u;)a[i]=arguments[i][n];return r},ca.transpose=function(n){return ca.zip.apply(ca,n)},ca.keys=function(n){var t=[];for(var e in n)t.push(e);return t},ca.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},ca.entries=function(n){var t=[];for(var e in n)t.push({key:e,value:n[e]});return t},ca.merge=function(n){return Array.prototype.concat.apply([],n)},ca.range=function(n,t,r){if(arguments.length<3&&(r=1,arguments.length<2&&(t=n,n=0)),1/0===(t-n)/r)throw Error("infinite range");var u,i=[],a=e(Math.abs(r)),o=-1;if(n*=a,t*=a,r*=a,0>r)for(;(u=n+r*++o)>t;)i.push(u/a);else for(;(u=n+r*++o)<t;)i.push(u/a);return i},ca.map=function(n){var t=new u;for(var e in n)t.set(e,n[e]);return t},r(u,{has:function(n){return da+n in this},get:function(n){return this[da+n]},set:function(n,t){return this[da+n]=t},remove:function(n){return n=da+n,n in this&&delete this[n]},keys:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},values:function(){var n=[];return this.forEach(function(t,e){n.push(e)}),n},entries:function(){var n=[];return this.forEach(function(t,e){n.push({key:t,value:e})}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===ma&&n.call(this,t.substring(1),this[t])}});var da="\0",ma=da.charCodeAt(0);ca.nest=function(){function n(t,o,c){if(c>=a.length)return r?r.call(i,o):e?o.sort(e):o;for(var l,f,s,h,g=-1,p=o.length,d=a[c++],m=new u;++g<p;)(h=m.get(l=d(f=o[g])))?h.push(f):m.set(l,[f]);return t?(f=t(),s=function(e,r){f.set(e,n(t,r,c))}):(f={},s=function(e,r){f[e]=n(t,r,c)}),m.forEach(s),f}function t(n,e){if(e>=a.length)return n;var r=[],u=o[e++];return n.forEach(function(n,u){r.push({key:n,values:t(u,e)})}),u?r.sort(function(n,t){return u(n.key,t.key)}):r}var e,r,i={},a=[],o=[];return i.map=function(t,e){return n(e,t,0)},i.entries=function(e){return t(n(ca.map,e,0),0)},i.key=function(n){return a.push(n),i},i.sortKeys=function(n){return o[a.length-1]=n,i},i.sortValues=function(n){return e=n,i},i.rollup=function(n){return r=n,i},i},ca.set=function(n){var t=new i;if(n)for(var e=0;e<n.length;e++)t.add(n[e]);return t},r(i,{has:function(n){return da+n in this},add:function(n){return this[da+n]=!0,n},remove:function(n){return n=da+n,n in this&&delete this[n]},values:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===ma&&n.call(this,t.substring(1))}}),ca.behavior={},ca.rebind=function(n,t){for(var e,r=1,u=arguments.length;++r<u;)n[e=arguments[r]]=a(n,t,t[e]);return n},ca.dispatch=function(){for(var n=new o,t=-1,e=arguments.length;++t<e;)n[arguments[t]]=c(n);return n},o.prototype.on=function(n,t){var e=n.indexOf("."),r="";if(e>=0&&(r=n.substring(e+1),n=n.substring(0,e)),n)return arguments.length<2?this[n].on(r):this[n].on(r,t);if(arguments.length===2){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(r,null);return this}},ca.event=null,ca.mouse=function(n){return g(n,f())};var va=/WebKit/.test(fa.navigator.userAgent)?-1:0,ya=d;
try{ya(la.documentElement.childNodes)[0].nodeType}catch(Ma){ya=p}var xa=[].__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var e in t)n[e]=t[e]};ca.touches=function(n,t){return arguments.length<2&&(t=f().touches),t?ya(t).map(function(t){var e=g(n,t);return e.identifier=t.identifier,e}):[]},ca.behavior.drag=function(){function n(){this.on("mousedown.drag",t).on("touchstart.drag",t)}function t(){function n(){var n=a.parentNode;return null!=f?ca.touches(n).filter(function(n){return n.identifier===f})[0]:ca.mouse(n)}function t(){if(!a.parentNode)return u();var t=n(),e=t[0]-h[0],r=t[1]-h[1];g|=e|r,h=t,l(),o({type:"drag",x:t[0]+i[0],y:t[1]+i[1],dx:e,dy:r})}function u(){o({type:"dragend"}),g&&(l(),ca.event.target===c&&s(p,"click")),p.on(null!=f?"touchmove.drag-"+f:"mousemove.drag",null).on(null!=f?"touchend.drag-"+f:"mouseup.drag",null)}var i,a=this,o=e.of(a,arguments),c=ca.event.target,f=ca.event.touches?ca.event.changedTouches[0].identifier:null,h=n(),g=0,p=ca.select(fa).on(null!=f?"touchmove.drag-"+f:"mousemove.drag",t).on(null!=f?"touchend.drag-"+f:"mouseup.drag",u,!0);r?(i=r.apply(a,arguments),i=[i.x-h[0],i.y-h[1]]):i=[0,0],null==f&&l(),o({type:"dragstart"})}var e=h(n,"drag","dragstart","dragend"),r=null;return n.origin=function(t){return arguments.length?(r=t,n):r},ca.rebind(n,e,"on")};var ba=function(n,t){return t.querySelector(n)},_a=function(n,t){return t.querySelectorAll(n)},wa=la.documentElement,Sa=wa.matchesSelector||wa.webkitMatchesSelector||wa.mozMatchesSelector||wa.msMatchesSelector||wa.oMatchesSelector,Ea=function(n,t){return Sa.call(n,t)};"function"==typeof Sizzle&&(ba=function(n,t){return Sizzle(n,t)[0]||null},_a=function(n,t){return Sizzle.uniqueSort(Sizzle(n,t))},Ea=Sizzle.matchesSelector);var ka=[];ca.selection=function(){return Ca},ca.selection.prototype=ka,ka.select=function(n){var t,e,r,u,i=[];"function"!=typeof n&&(n=v(n));for(var a=-1,o=this.length;++a<o;){i.push(t=[]),t.parentNode=(r=this[a]).parentNode;for(var c=-1,l=r.length;++c<l;)(u=r[c])?(t.push(e=n.call(u,u.__data__,c)),e&&"__data__"in u&&(e.__data__=u.__data__)):t.push(null)}return m(i)},ka.selectAll=function(n){var t,e,r=[];"function"!=typeof n&&(n=y(n));for(var u=-1,i=this.length;++u<i;)for(var a=this[u],o=-1,c=a.length;++o<c;)(e=a[o])&&(r.push(t=ya(n.call(e,e.__data__,o))),t.parentNode=e);return m(r)};var Aa={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};ca.ns={prefix:Aa,qualify:function(n){var t=n.indexOf(":"),e=n;return t>=0&&(e=n.substring(0,t),n=n.substring(t+1)),Aa.hasOwnProperty(e)?{space:Aa[e],local:n}:n}},ka.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node();return n=ca.ns.qualify(n),n.local?e.getAttributeNS(n.space,n.local):e.getAttribute(n)}for(t in n)this.each(M(t,n[t]));return this}return this.each(M(n,t))},ca.requote=function(n){return n.replace(qa,"\\$&")};var qa=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;ka.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node(),r=(n=n.trim().split(/^|\s+/g)).length,u=-1;if(t=e.classList){for(;++u<r;)if(!t.contains(n[u]))return!1}else for(t=e.getAttribute("class");++u<r;)if(!_(n[u]).test(t))return!1;return!0}for(t in n)this.each(w(t,n[t]));return this}return this.each(w(n,t))},ka.style=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t="");for(e in n)this.each(E(e,n[e],t));return this}if(2>r)return fa.getComputedStyle(this.node(),null).getPropertyValue(n);e=""}return this.each(E(n,t,e))},ka.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(k(t,n[t]));return this}return this.each(k(n,t))},ka.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},ka.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},ka.append=function(n){function t(){return this.appendChild(la.createElementNS(this.namespaceURI,n))}function e(){return this.appendChild(la.createElementNS(n.space,n.local))}return n=ca.ns.qualify(n),this.select(n.local?e:t)},ka.insert=function(n,t){function e(e,r){return this.insertBefore(la.createElementNS(this.namespaceURI,n),t.call(this,e,r))}function r(e,r){return this.insertBefore(la.createElementNS(n.space,n.local),t.call(this,e,r))}return n=ca.ns.qualify(n),"function"!=typeof t&&(t=v(t)),this.select(n.local?r:e)},ka.remove=function(){return this.each(function(){var n=this.parentNode;n&&n.removeChild(this)})},ka.data=function(n,t){function e(n,e){var r,i,a,o=n.length,s=e.length,h=Math.min(o,s),g=Array(s),p=Array(s),d=Array(o);if(t){var m,v=new u,y=new u,M=[];for(r=-1;++r<o;)m=t.call(i=n[r],i.__data__,r),v.has(m)?d[r]=i:v.set(m,i),M.push(m);for(r=-1;++r<s;)m=t.call(e,a=e[r],r),(i=v.get(m))?(g[r]=i,i.__data__=a):y.has(m)||(p[r]=A(a)),y.set(m,a),v.remove(m);for(r=-1;++r<o;)v.has(M[r])&&(d[r]=n[r])}else{for(r=-1;++r<h;)i=n[r],a=e[r],i?(i.__data__=a,g[r]=i):p[r]=A(a);for(;s>r;++r)p[r]=A(e[r]);for(;o>r;++r)d[r]=n[r]}p.update=g,p.parentNode=g.parentNode=d.parentNode=n.parentNode,c.push(p),l.push(g),f.push(d)}var r,i,a=-1,o=this.length;if(!arguments.length){for(n=Array(o=(r=this[0]).length);++a<o;)(i=r[a])&&(n[a]=i.__data__);return n}var c=L([]),l=m([]),f=m([]);if("function"==typeof n)for(;++a<o;)e(r=this[a],n.call(r,r.parentNode.__data__,a));else for(;++a<o;)e(r=this[a],n);return l.enter=function(){return c},l.exit=function(){return f},l},ka.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},ka.filter=function(n){var t,e,r,u=[];"function"!=typeof n&&(n=q(n));for(var i=0,a=this.length;a>i;i++){u.push(t=[]),t.parentNode=(e=this[i]).parentNode;for(var o=0,c=e.length;c>o;o++)(r=e[o])&&n.call(r,r.__data__,o)&&t.push(r)}return m(u)},ka.order=function(){for(var n=-1,t=this.length;++n<t;)for(var e,r=this[n],u=r.length-1,i=r[u];--u>=0;)(e=r[u])&&(i&&i!==e.nextSibling&&i.parentNode.insertBefore(e,i),i=e);return this},ka.sort=function(n){n=N.apply(this,arguments);for(var t=-1,e=this.length;++t<e;)this[t].sort(n);return this.order()},ka.on=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t=!1);for(e in n)this.each(C(e,n[e],t));return this}if(2>r)return(r=this.node()["__on"+n])&&r._;e=!1}return this.each(C(n,t,e))};var Na=ca.map({mouseenter:"mouseover",mouseleave:"mouseout"});Na.forEach(function(n){"on"+n in la&&Na.remove(n)}),ka.each=function(n){return j(this,function(t,e,r){n.call(t,t.__data__,e,r)})},ka.call=function(n){var t=ya(arguments);return n.apply(t[0]=this,t),this},ka.empty=function(){return!this.node()},ka.node=function(){for(var n=0,t=this.length;t>n;n++)for(var e=this[n],r=0,u=e.length;u>r;r++){var i=e[r];if(i)return i}return null};var Ta=[];ca.selection.enter=L,ca.selection.enter.prototype=Ta,Ta.append=ka.append,Ta.insert=ka.insert,Ta.empty=ka.empty,Ta.node=ka.node,Ta.select=function(n){for(var t,e,r,u,i,a=[],o=-1,c=this.length;++o<c;){r=(u=this[o]).update,a.push(t=[]),t.parentNode=u.parentNode;for(var l=-1,f=u.length;++l<f;)(i=u[l])?(t.push(r[l]=e=n.call(u.parentNode,i.__data__,l)),e.__data__=i.__data__):t.push(null)}return m(a)},ka.transition=function(){var n,t,e=rc||++oc,r=[],u=Object.create(cc);u.time=Date.now();for(var i=-1,a=this.length;++i<a;){r.push(n=[]);for(var o=this[i],c=-1,l=o.length;++c<l;)(t=o[c])&&xi(t,c,e,u),n.push(t)}return vi(r,e)};var Ca=m([[la]]);Ca[0].parentNode=wa,ca.select=function(n){return"string"==typeof n?Ca.select(n):m([[n]])},ca.selectAll=function(n){return"string"==typeof n?Ca.selectAll(n):m([ya(n)])},ca.behavior.zoom=function(){function n(){this.on("mousedown.zoom",o).on("mousemove.zoom",f).on(ja+".zoom",c).on("dblclick.zoom",g).on("touchstart.zoom",p).on("touchmove.zoom",d).on("touchend.zoom",p)}function t(n){return[(n[0]-w[0])/S,(n[1]-w[1])/S]}function e(n){return[n[0]*S+w[0],n[1]*S+w[1]]}function r(n){S=Math.max(E[0],Math.min(E[1],n))}function u(n,t){t=e(t),w[0]+=n[0]-t[0],w[1]+=n[1]-t[1]}function i(){M&&M.domain(y.range().map(function(n){return(n-w[0])/S}).map(y.invert)),b&&b.domain(x.range().map(function(n){return(n-w[1])/S}).map(x.invert))}function a(n){i(),ca.event.preventDefault(),n({type:"zoom",scale:S,translate:w})}function o(){function n(){c=1,u(ca.mouse(r),h),a(i)}function e(){c&&l(),f.on("mousemove.zoom",null).on("mouseup.zoom",null),c&&ca.event.target===o&&s(f,"click.zoom")}var r=this,i=k.of(r,arguments),o=ca.event.target,c=0,f=ca.select(fa).on("mousemove.zoom",n).on("mouseup.zoom",e),h=t(ca.mouse(r));fa.focus(),l()}function c(){m||(m=t(ca.mouse(this))),r(Math.pow(2,za()*.002)*S),u(ca.mouse(this),m),a(k.of(this,arguments))}function f(){m=null}function g(){var n=ca.mouse(this),e=t(n),i=Math.log(S)/Math.LN2;r(Math.pow(2,ca.event.shiftKey?Math.ceil(i)-1:Math.floor(i)+1)),u(n,e),a(k.of(this,arguments))}function p(){var n=ca.touches(this),e=Date.now();if(v=S,m={},n.forEach(function(n){m[n.identifier]=t(n)}),l(),n.length===1){if(500>e-_){var i=n[0],o=t(n[0]);r(2*S),u(i,o),a(k.of(this,arguments))}_=e}}function d(){var n=ca.touches(this),t=n[0],e=m[t.identifier];if(i=n[1]){var i,o=m[i.identifier];t=[(t[0]+i[0])/2,(t[1]+i[1])/2],e=[(e[0]+o[0])/2,(e[1]+o[1])/2],r(ca.event.scale*v)}u(t,e),_=null,a(k.of(this,arguments))}var m,v,y,M,x,b,_,w=[0,0],S=1,E=Da,k=h(n,"zoom");return n.translate=function(t){return arguments.length?(w=t.map(Number),i(),n):w},n.scale=function(t){return arguments.length?(S=+t,i(),n):S},n.scaleExtent=function(t){return arguments.length?(E=null==t?Da:t.map(Number),n):E},n.x=function(t){return arguments.length?(M=t,y=t.copy(),w=[0,0],S=1,n):M},n.y=function(t){return arguments.length?(b=t,x=t.copy(),w=[0,0],S=1,n):b},ca.rebind(n,k,"on")};var za,Da=[0,1/0],ja="onwheel"in la?(za=function(){return-ca.event.deltaY*(ca.event.deltaMode?120:1)},"wheel"):"onmousewheel"in la?(za=function(){return ca.event.wheelDelta},"mousewheel"):(za=function(){return-ca.event.detail},"MozMousePixelScroll");F.prototype.toString=function(){return this.rgb()+""},ca.hsl=function(n,t,e){return arguments.length===1?n instanceof P?H(n.h,n.s,n.l):it(""+n,at,H):H(+n,+t,+e)};var La=P.prototype=new F;La.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),H(this.h,this.s,this.l/n)},La.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),H(this.h,this.s,n*this.l)},La.rgb=function(){return R(this.h,this.s,this.l)};var Fa=Math.PI,Ha=1e-6,Pa=Fa/180,Ra=180/Fa;ca.hcl=function(n,t,e){return arguments.length===1?n instanceof B?Z(n.h,n.c,n.l):n instanceof G?W(n.l,n.a,n.b):W((n=ot((n=ca.rgb(n)).r,n.g,n.b)).l,n.a,n.b):Z(+n,+t,+e)};var Oa=B.prototype=new F;Oa.brighter=function(n){return Z(this.h,this.c,Math.min(100,this.l+Ya*(arguments.length?n:1)))},Oa.darker=function(n){return Z(this.h,this.c,Math.max(0,this.l-Ya*(arguments.length?n:1)))},Oa.rgb=function(){return $(this.h,this.c,this.l).rgb()},ca.lab=function(n,t,e){return arguments.length===1?n instanceof G?J(n.l,n.a,n.b):n instanceof B?$(n.l,n.c,n.h):ot((n=ca.rgb(n)).r,n.g,n.b):J(+n,+t,+e)};var Ya=18,Ua=.95047,Ia=1,Va=1.08883,Xa=G.prototype=new F;Xa.brighter=function(n){return J(Math.min(100,this.l+Ya*(arguments.length?n:1)),this.a,this.b)},Xa.darker=function(n){return J(Math.max(0,this.l-Ya*(arguments.length?n:1)),this.a,this.b)},Xa.rgb=function(){return K(this.l,this.a,this.b)},ca.rgb=function(n,t,e){return arguments.length===1?n instanceof rt?et(n.r,n.g,n.b):it(""+n,et,R):et(~~n,~~t,~~e)};var Za=rt.prototype=new F;Za.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,u=30;return t||e||r?(t&&u>t&&(t=u),e&&u>e&&(e=u),r&&u>r&&(r=u),et(Math.min(255,Math.floor(t/n)),Math.min(255,Math.floor(e/n)),Math.min(255,Math.floor(r/n)))):et(u,u,u)},Za.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),et(Math.floor(n*this.r),Math.floor(n*this.g),Math.floor(n*this.b))},Za.hsl=function(){return at(this.r,this.g,this.b)},Za.toString=function(){return"#"+ut(this.r)+ut(this.g)+ut(this.b)};var Ba=ca.map({aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"});Ba.forEach(function(n,t){Ba.set(n,it(t,et,R))}),ca.functor=ft,ca.xhr=function(n,t,e){function r(){var n=c.status;!n&&c.responseText||n>=200&&300>n||304===n?i.load.call(u,o.call(u,c)):i.error.call(u,c)}var u={},i=ca.dispatch("progress","load","error"),a={},o=st,c=new(fa.XDomainRequest&&/^(http(s)?:)?\/\//.test(n)?XDomainRequest:XMLHttpRequest);return"onload"in c?c.onload=c.onerror=r:c.onreadystatechange=function(){c.readyState>3&&r()},c.onprogress=function(n){var t=ca.event;ca.event=n;try{i.progress.call(u,c)}finally{ca.event=t}},u.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?a[n]:(null==t?delete a[n]:a[n]=t+"",u)},u.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",u):t},u.response=function(n){return o=n,u},["get","post"].forEach(function(n){u[n]=function(){return u.send.apply(u,[n].concat(ya(arguments)))}}),u.send=function(e,r,i){if(arguments.length===2&&"function"==typeof r&&(i=r,r=null),c.open(e,n,!0),null==t||"accept"in a||(a.accept=t+",*/*"),c.setRequestHeader)for(var o in a)c.setRequestHeader(o,a[o]);return null!=t&&c.overrideMimeType&&c.overrideMimeType(t),null!=i&&u.on("error",i).on("load",function(n){i(null,n)}),c.send(null==r?null:r),u},u.abort=function(){return c.abort(),u},ca.rebind(u,i,"on"),arguments.length===2&&"function"==typeof t&&(e=t,t=null),null==e?u:u.get(ht(e))},ca.csv=gt(",","text/csv"),ca.tsv=gt("	","text/tab-separated-values");var $a,Ja,Ga=0,Ka={},Wa=null;ca.timer=function(n,t,e){if(arguments.length<3){if(arguments.length<2)t=0;else if(!isFinite(t))return;e=Date.now()}var r=Ka[n.id];r&&r.callback===n?(r.then=e,r.delay=t):Ka[n.id=++Ga]=Wa={callback:n,then:e,delay:t,next:Wa},$a||(Ja=clearTimeout(Ja),$a=1,Qa(pt))},ca.timer.flush=function(){for(var n,t=Date.now(),e=Wa;e;)n=t-e.then,e.delay||(e.flush=e.callback(n)),e=e.next;dt()};var Qa=fa.requestAnimationFrame||fa.webkitRequestAnimationFrame||fa.mozRequestAnimationFrame||fa.oRequestAnimationFrame||fa.msRequestAnimationFrame||function(n){setTimeout(n,17)},no=".",to=",",eo=[3,3],ro=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"].map(mt);ca.formatPrefix=function(n,t){var e=0;return n&&(0>n&&(n*=-1),t&&(n=ca.round(n,vt(n,t))),e=1+Math.floor(1e-12+Math.log(n)/Math.LN10),e=Math.max(-24,Math.min(24,Math.floor((0>=e?e+1:e-1)/3)*3))),ro[8+e/3]},ca.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)},ca.format=function(n){var t=uo.exec(n),e=t[1]||" ",r=t[2]||">",u=t[3]||"",i=t[4]||"",a=t[5],o=+t[6],c=t[7],l=t[8],f=t[9],s=1,h="",g=!1;switch(l&&(l=+l.substring(1)),(a||"0"===e&&"="===r)&&(a=e="0",r="=",c&&(o-=Math.floor((o-1)/4))),f){case"n":c=!0,f="g";break;case"%":s=100,h="%",f="f";break;case"p":s=100,h="%",f="r";break;case"b":case"o":case"x":case"X":i&&(i="0"+f.toLowerCase());case"c":case"d":g=!0,l=0;break;case"s":s=-1,f="r"}"#"===i&&(i=""),"r"!=f||l||(f="g"),null!=l&&("g"==f?l=Math.max(1,Math.min(21,l)):("e"==f||"f"==f)&&(l=Math.max(0,Math.min(20,l)))),f=io.get(f)||yt;var p=a&&c;return function(n){if(g&&n%1)return"";var t=0>n||0===n&&0>1/n?(n=-n,"-"):u;if(0>s){var d=ca.formatPrefix(n,l);n=d.scale(n),h=d.symbol}else n*=s;n=f(n,l),!a&&c&&(n=ao(n));var m=i.length+n.length+(p?0:t.length),v=o>m?Array(m=o-m+1).join(e):"";return p&&(n=ao(v+n)),no&&n.replace(".",no),t+=i,("<"===r?t+n+v:">"===r?v+t+n:"^"===r?v.substring(0,m>>=1)+t+n+v.substring(m):t+(p?n:v+n))+h}};var uo=/(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,io=ca.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=ca.round(n,vt(n,t))).toFixed(Math.max(0,Math.min(20,vt(n*(1+1e-15),t))))}}),ao=st;if(eo){var oo=eo.length;ao=function(n){for(var t=n.lastIndexOf("."),e=t>=0?"."+n.substring(t+1):(t=n.length,""),r=[],u=0,i=eo[0];t>0&&i>0;)r.push(n.substring(t-=i,t+i)),i=eo[u=(u+1)%oo];return r.reverse().join(to||"")+e}}ca.geo={},ca.geo.stream=function(n,t){n&&co.hasOwnProperty(n.type)?co[n.type](n,t):Mt(n,t)};var co={Feature:function(n,t){Mt(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,r=-1,u=e.length;++r<u;)Mt(e[r].geometry,t)}},lo={Sphere:function(n,t){t.sphere()},Point:function(n,t){var e=n.coordinates;t.point(e[0],e[1])},MultiPoint:function(n,t){for(var e,r=n.coordinates,u=-1,i=r.length;++u<i;)e=r[u],t.point(e[0],e[1])},LineString:function(n,t){xt(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)xt(e[r],t,0)},Polygon:function(n,t){bt(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)bt(e[r],t)},GeometryCollection:function(n,t){for(var e=n.geometries,r=-1,u=e.length;++r<u;)Mt(e[r],t)}};ca.geo.area=function(n){return fo=0,ca.geo.stream(n,go),fo};var fo,so,ho,go={sphere:function(){fo+=4*Fa},point:T,lineStart:T,lineEnd:T,polygonStart:function(){so=1,ho=0,go.lineStart=_t},polygonEnd:function(){var n=2*Math.atan2(ho,so);fo+=0>n?4*Fa+n:n,go.lineStart=go.lineEnd=go.point=T}};ca.geo.bounds=wt(st),ca.geo.centroid=function(n){po=mo=vo=yo=Mo=0,ca.geo.stream(n,xo);var t;return mo&&Math.abs(t=Math.sqrt(vo*vo+yo*yo+Mo*Mo))>Ha?[Math.atan2(yo,vo)*Ra,Math.asin(Math.max(-1,Math.min(1,Mo/t)))*Ra]:void 0};var po,mo,vo,yo,Mo,xo={sphere:function(){2>po&&(po=2,mo=vo=yo=Mo=0)},point:St,lineStart:kt,lineEnd:At,polygonStart:function(){2>po&&(po=2,mo=vo=yo=Mo=0),xo.lineStart=Et},polygonEnd:function(){xo.lineStart=kt}},bo=Rt(jt,Vt,Zt),_o=1e9;ca.geo.projection=Wt,ca.geo.projectionMutator=Qt,(ca.geo.equirectangular=function(){return Wt(te)}).raw=te.invert=te,ca.geo.rotation=function(n){function t(t){return t=n(t[0]*Pa,t[1]*Pa),t[0]*=Ra,t[1]*=Ra,t}return n=ee(n[0]%360*Pa,n[1]*Pa,n.length>2?n[2]*Pa:0),t.invert=function(t){return t=n.invert(t[0]*Pa,t[1]*Pa),t[0]*=Ra,t[1]*=Ra,t},t},ca.geo.circle=function(){function n(){var n="function"==typeof r?r.apply(this,arguments):r,t=ee(-n[0]*Pa,-n[1]*Pa,0).invert,u=[];return e(null,null,1,{point:function(n,e){u.push(n=t(n,e)),n[0]*=Ra,n[1]*=Ra}}),{type:"Polygon",coordinates:[u]}}var t,e,r=[0,0],u=6;return n.origin=function(t){return arguments.length?(r=t,n):r},n.angle=function(r){return arguments.length?(e=ae((t=+r)*Pa,u*Pa),n):t},n.precision=function(r){return arguments.length?(e=ae(t*Pa,(u=+r)*Pa),n):u},n.angle(90)},ca.geo.distance=function(n,t){var e,r=(t[0]-n[0])*Pa,u=n[1]*Pa,i=t[1]*Pa,a=Math.sin(r),o=Math.cos(r),c=Math.sin(u),l=Math.cos(u),f=Math.sin(i),s=Math.cos(i);return Math.atan2(Math.sqrt((e=s*a)*e+(e=l*f-c*s*o)*e),c*f+l*s*o)},ca.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return ca.range(Math.ceil(i/m)*m,u,m).map(h).concat(ca.range(Math.ceil(l/v)*v,c,v).map(g)).concat(ca.range(Math.ceil(r/p)*p,e,p).filter(function(n){return Math.abs(n%m)>Ha}).map(f)).concat(ca.range(Math.ceil(o/d)*d,a,d).filter(function(n){return Math.abs(n%v)>Ha}).map(s))}var e,r,u,i,a,o,c,l,f,s,h,g,p=10,d=p,m=90,v=360,y=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(i).concat(g(c).slice(1),h(u).reverse().slice(1),g(l).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(i=+t[0][0],u=+t[1][0],l=+t[0][1],c=+t[1][1],i>u&&(t=i,i=u,u=t),l>c&&(t=l,l=c,c=t),n.precision(y)):[[i,l],[u,c]]},n.minorExtent=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],o=+t[0][1],a=+t[1][1],r>e&&(t=r,r=e,e=t),o>a&&(t=o,o=a,a=t),n.precision(y)):[[r,o],[e,a]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(m=+t[0],v=+t[1],n):[m,v]},n.minorStep=function(t){return arguments.length?(p=+t[0],d=+t[1],n):[p,d]},n.precision=function(t){return arguments.length?(y=+t,f=ce(o,a,90),s=le(r,e,y),h=ce(l,c,90),g=le(i,u,y),n):y},n.majorExtent([[-180,-90+Ha],[180,90-Ha]]).minorExtent([[-180,-80-Ha],[180,80+Ha]])},ca.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),e||u.apply(this,arguments)]}}var t,e,r=fe,u=se;return n.distance=function(){return ca.geo.distance(t||r.apply(this,arguments),e||u.apply(this,arguments))},n.source=function(e){return arguments.length?(r=e,t="function"==typeof e?null:e,n):r},n.target=function(t){return arguments.length?(u=t,e="function"==typeof t?null:t,n):u},n.precision=function(){return arguments.length?n:0},n},ca.geo.interpolate=function(n,t){return he(n[0]*Pa,n[1]*Pa,t[0]*Pa,t[1]*Pa)},ca.geo.length=function(n){return wo=0,ca.geo.stream(n,So),wo};var wo,So={sphere:T,point:T,lineStart:ge,lineEnd:T,polygonStart:T,polygonEnd:T};(ca.geo.conicEqualArea=function(){return pe(de)}).raw=de,ca.geo.albersUsa=function(){function n(n){return t(n)(n)}function t(n){var t=n[0],e=n[1];return e>50?a:-140>t?o:21>e?c:i}var e,r,u,i=ca.geo.conicEqualArea().rotate([98,0]).center([0,38]).parallels([29.5,45.5]),a=ca.geo.conicEqualArea().rotate([160,0]).center([0,60]).parallels([55,65]),o=ca.geo.conicEqualArea().rotate([160,0]).center([0,20]).parallels([8,18]),c=ca.geo.conicEqualArea().rotate([60,0]).center([0,10]).parallels([8,18]);return n.invert=function(n){return e(n)||r(n)||u(n)||i.invert(n)},n.scale=function(t){return arguments.length?(i.scale(t),a.scale(.6*t),o.scale(t),c.scale(1.5*t),n.translate(i.translate())):i.scale()},n.translate=function(t){if(!arguments.length)return i.translate();var l=i.scale(),f=t[0],s=t[1];return i.translate(t),a.translate([f-.4*l,s+.17*l]),o.translate([f-.19*l,s+.2*l]),c.translate([f+.58*l,s+.43*l]),e=me(a,[[-180,50],[-130,72]]),r=me(o,[[-164,18],[-154,24]]),u=me(c,[[-67.5,17.5],[-65,19]]),n},n.scale(1e3)};var Eo,ko,Ao={point:T,lineStart:T,lineEnd:T,polygonStart:function(){ko=0,Ao.lineStart=ve},polygonEnd:function(){Ao.lineStart=Ao.lineEnd=Ao.point=T,Eo+=Math.abs(ko/2)}},qo={point:Me,lineStart:xe,lineEnd:be,polygonStart:function(){qo.lineStart=_e},polygonEnd:function(){qo.point=Me,qo.lineStart=xe,qo.lineEnd=be}};ca.geo.path=function(){function n(n){return n&&ca.geo.stream(n,r(u.pointRadius("function"==typeof i?+i.apply(this,arguments):i))),u.result()}var t,e,r,u,i=4.5;return n.area=function(n){return Eo=0,ca.geo.stream(n,r(Ao)),Eo},n.centroid=function(n){return po=vo=yo=Mo=0,ca.geo.stream(n,r(qo)),Mo?[vo/Mo,yo/Mo]:void 0},n.bounds=function(n){return wt(r)(n)},n.projection=function(e){return arguments.length?(r=(t=e)?e.stream||Ee(e):st,n):t},n.context=function(t){return arguments.length?(u=(e=t)==null?new ye:new we(t),n):e},n.pointRadius=function(t){return arguments.length?(i="function"==typeof t?t:+t,n):i},n.projection(ca.geo.albersUsa()).context(null)},ca.geo.albers=function(){return ca.geo.conicEqualArea().parallels([29.5,45.5]).rotate([98,0]).center([0,38]).scale(1e3)};var No=ke(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(ca.geo.azimuthalEqualArea=function(){return Wt(No)}).raw=No;var To=ke(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},st);(ca.geo.azimuthalEquidistant=function(){return Wt(To)}).raw=To,(ca.geo.conicConformal=function(){return pe(Ae)}).raw=Ae,(ca.geo.conicEquidistant=function(){return pe(qe)}).raw=qe;var Co=ke(function(n){return 1/n},Math.atan);(ca.geo.gnomonic=function(){return Wt(Co)}).raw=Co,Ne.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Fa/2]},(ca.geo.mercator=function(){return Te(Ne)}).raw=Ne;var zo=ke(function(){return 1},Math.asin);(ca.geo.orthographic=function(){return Wt(zo)}).raw=zo;var Do=ke(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(ca.geo.stereographic=function(){return Wt(Do)}).raw=Do,Ce.invert=function(n,t){return[Math.atan2(I(n),Math.cos(t)),U(Math.sin(t)/V(n))]},(ca.geo.transverseMercator=function(){return Te(Ce)}).raw=Ce,ca.geom={},ca.svg={},ca.svg.line=function(){return ze(st)};var jo=ca.map({linear:Le,"linear-closed":Fe,"step-before":He,"step-after":Pe,basis:Ve,"basis-open":Xe,"basis-closed":Ze,bundle:Be,cardinal:Ye,"cardinal-open":Re,"cardinal-closed":Oe,monotone:Qe});jo.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var Lo=[0,2/3,1/3,0],Fo=[0,1/3,2/3,0],Ho=[0,1/6,2/3,1/6];ca.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,u,i,a,o,c,l,f,s,h,g,p,d=ft(e),m=ft(r),v=n.length,y=v-1,M=[],x=[],b=0;if(d===De&&r===je)t=n;else for(i=0,t=[];v>i;++i)t.push([+d.call(this,u=n[i],i),+m.call(this,u,i)]);for(i=1;v>i;++i)t[i][1]<t[b][1]?b=i:t[i][1]==t[b][1]&&(b=t[i][0]<t[b][0]?i:b);for(i=0;v>i;++i)i!==b&&(c=t[i][1]-t[b][1],o=t[i][0]-t[b][0],M.push({angle:Math.atan2(c,o),index:i}));for(M.sort(function(n,t){return n.angle-t.angle}),g=M[0].angle,h=M[0].index,s=0,i=1;y>i;++i)a=M[i].index,g==M[i].angle?(o=t[h][0]-t[b][0],c=t[h][1]-t[b][1],l=t[a][0]-t[b][0],f=t[a][1]-t[b][1],o*o+c*c>=l*l+f*f?M[i].index=-1:(M[s].index=-1,g=M[i].angle,s=i,h=a)):(g=M[i].angle,s=i,h=a);for(x.push(b),i=0,a=0;2>i;++a)M[a].index!==-1&&(x.push(M[a].index),i++);for(p=x.length;y>a;++a)if(M[a].index!==-1){for(;!nr(x[p-2],x[p-1],M[a].index,t);)--p;x[p++]=M[a].index}var _=[];for(i=0;p>i;++i)_.push(n[x[i]]);return _}var e=De,r=je;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t)},ca.geom.polygon=function(n){return n.area=function(){for(var t=0,e=n.length,r=n[e-1][1]*n[0][0]-n[e-1][0]*n[0][1];++t<e;)r+=n[t-1][1]*n[t][0]-n[t-1][0]*n[t][1];return.5*r},n.centroid=function(t){var e,r,u=-1,i=n.length,a=0,o=0,c=n[i-1];for(arguments.length||(t=-1/(6*n.area()));++u<i;)e=c,c=n[u],r=e[0]*c[1]-c[0]*e[1],a+=(e[0]+c[0])*r,o+=(e[1]+c[1])*r;return[a*t,o*t]},n.clip=function(t){for(var e,r,u,i,a,o,c=-1,l=n.length,f=n[l-1];++c<l;){for(e=t.slice(),t.length=0,i=n[c],a=e[(u=e.length)-1],r=-1;++r<u;)o=e[r],tr(o,f,i)?(tr(a,f,i)||t.push(er(a,o,f,i)),t.push(o)):tr(a,f,i)&&t.push(er(a,o,f,i)),a=o;f=i}return t},n},ca.geom.delaunay=function(n){var t=n.map(function(){return[]}),e=[];return rr(n,function(e){t[e.region.l.index].push(n[e.region.r.index])}),t.forEach(function(t,r){var u=n[r],i=u[0],a=u[1];t.forEach(function(n){n.angle=Math.atan2(n[0]-i,n[1]-a)}),t.sort(function(n,t){return n.angle-t.angle});for(var o=0,c=t.length-1;c>o;o++)e.push([u,t[o],t[o+1]])}),e},ca.geom.voronoi=function(n){function t(n){var t,r,a,o=n.map(function(){return[]}),c=ft(u),l=ft(i),f=n.length,s=1e6;if(c===De&&l===je)t=n;else for(t=[],a=0;f>a;++a)t.push([+c.call(this,r=n[a],a),+l.call(this,r,a)]);if(rr(t,function(n){var t,e,r,u,i,a;n.a===1&&n.b>=0?(t=n.ep.r,e=n.ep.l):(t=n.ep.l,e=n.ep.r),n.a===1?(i=t?t.y:-s,r=n.c-n.b*i,a=e?e.y:s,u=n.c-n.b*a):(r=t?t.x:-s,i=n.c-n.a*r,u=e?e.x:s,a=n.c-n.a*u);var c=[r,i],l=[u,a];o[n.region.l.index].push(c,l),o[n.region.r.index].push(c,l)}),o=o.map(function(n,e){var r=t[e][0],u=t[e][1],i=n.map(function(n){return Math.atan2(n[0]-r,n[1]-u)}),a=ca.range(n.length).sort(function(n,t){return i[n]-i[t]});return a.filter(function(n,t){return!t||i[n]-i[a[t-1]]>Ha}).map(function(t){return n[t]})}),o.forEach(function(n,e){var r=n.length;if(!r)return n.push([-s,-s],[-s,s],[s,s],[s,-s]);if(!(r>2)){var u=t[e],i=n[0],a=n[1],o=u[0],c=u[1],l=i[0],f=i[1],h=a[0],g=a[1],p=Math.abs(h-l),d=g-f;if(Math.abs(d)<Ha){var m=f>c?-s:s;n.push([-s,m],[s,m])}else if(Ha>p){var v=l>o?-s:s;n.push([v,-s],[v,s])}else{var m=(l-o)*(g-f)>(h-l)*(f-c)?s:-s,y=Math.abs(d)-p;Math.abs(y)<Ha?n.push([0>d?m:-m,m]):(y>0&&(m*=-1),n.push([-s,m],[s,m]))}}}),e)for(a=0;f>a;++a)e(o[a]);for(a=0;f>a;++a)o[a].point=n[a];return o}var e,r=null,u=De,i=je;return arguments.length?t(n):(t.x=function(n){return arguments.length?(u=n,t):u},t.y=function(n){return arguments.length?(i=n,t):i},t.size=function(n){return arguments.length?(null==n?e=null:(r=[+n[0],+n[1]],e=ca.geom.polygon([[0,0],[0,r[1]],r,[r[0],0]]).clip),t):r},t.links=function(n){var t,e,r,a=n.map(function(){return[]}),o=[],c=ft(u),l=ft(i),f=n.length;if(c===De&&l===je)t=n;else for(r=0;f>r;++r)t.push([+c.call(this,e=n[r],r),+l.call(this,e,r)]);return rr(t,function(t){var e=t.region.l.index,r=t.region.r.index;a[e][r]||(a[e][r]=a[r][e]=!0,o.push({source:n[e],target:n[r]}))}),o},t.triangles=function(n){if(u===De&&i===je)return ca.geom.delaunay(n);var t,e,r,a,o,c=ft(u),l=ft(i);for(a=0,t=[],o=n.length;o>a;++a)e=[+c.call(this,r=n[a],a),+l.call(this,r,a)],e.data=r,t.push(e);return ca.geom.delaunay(t).map(function(n){return n.map(function(n){return n.data})})},t)};var Po={l:"r",r:"l"};ca.geom.quadtree=function(n,t,e,r,u){function i(n){function i(n,t,e,r,u,i,a,o){if(!isNaN(e)&&!isNaN(r))if(n.leaf){var c=n.x,f=n.y;if(null!=c)if(Math.abs(c-e)+Math.abs(f-r)<.01)l(n,t,e,r,u,i,a,o);else{var s=n.point;n.x=n.y=n.point=null,l(n,s,c,f,u,i,a,o),l(n,t,e,r,u,i,a,o)
}else n.x=e,n.y=r,n.point=t}else l(n,t,e,r,u,i,a,o)}function l(n,t,e,r,u,a,o,c){var l=.5*(u+o),f=.5*(a+c),s=e>=l,h=r>=f,g=(h<<1)+s;n.leaf=!1,n=n.nodes[g]||(n.nodes[g]=ar()),s?u=l:o=l,h?a=f:c=f,i(n,t,e,r,u,a,o,c)}var f,s,h,g,p,d,m,v,y,M=ft(o),x=ft(c);if(null!=t)d=t,m=e,v=r,y=u;else if(v=y=-(d=m=1/0),s=[],h=[],p=n.length,a)for(g=0;p>g;++g)f=n[g],f.x<d&&(d=f.x),f.y<m&&(m=f.y),f.x>v&&(v=f.x),f.y>y&&(y=f.y),s.push(f.x),h.push(f.y);else for(g=0;p>g;++g){var b=+M(f=n[g],g),_=+x(f,g);d>b&&(d=b),m>_&&(m=_),b>v&&(v=b),_>y&&(y=_),s.push(b),h.push(_)}var w=v-d,S=y-m;w>S?y=m+w:v=d+S;var E=ar();if(E.add=function(n){i(E,n,+M(n,++g),+x(n,g),d,m,v,y)},E.visit=function(n){or(n,E,d,m,v,y)},g=-1,null==t){for(;++g<p;)i(E,n[g],s[g],h[g],d,m,v,y);--g}else n.forEach(E.add);return s=h=n=f=null,E}var a,o=De,c=je;return(a=arguments.length)?(o=ur,c=ir,3===a&&(u=e,r=t,e=t=0),i(n)):(i.x=function(n){return arguments.length?(o=n,i):o},i.y=function(n){return arguments.length?(c=n,i):c},i.size=function(n){return arguments.length?(null==n?t=e=r=u=null:(t=e=0,r=+n[0],u=+n[1]),i):null==t?null:[r,u]},i)},ca.interpolateRgb=cr,ca.transform=function(n){var t=la.createElementNS(ca.ns.prefix.svg,"g");return(ca.transform=function(n){t.setAttribute("transform",n);var e=t.transform.baseVal.consolidate();return new lr(e?e.matrix:Ro)})(n)},lr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var Ro={a:1,b:0,c:0,d:1,e:0,f:0};ca.interpolateNumber=gr,ca.interpolateTransform=pr,ca.interpolateObject=dr,ca.interpolateString=mr;var Oo=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;ca.interpolate=vr,ca.interpolators=[function(n,t){var e=typeof t;return("string"===e||e!==typeof n?Ba.has(t)||/^(#|rgb\(|hsl\()/.test(t)?cr:mr:t instanceof F?cr:"object"===e?Array.isArray(t)?Mr:dr:gr)(n,t)}],ca.interpolateArray=Mr;var Yo=function(){return st},Uo=ca.map({linear:Yo,poly:kr,quad:function(){return wr},cubic:function(){return Sr},sin:function(){return Ar},exp:function(){return qr},circle:function(){return Nr},elastic:Tr,back:Cr,bounce:function(){return zr}}),Io=ca.map({"in":st,out:br,"in-out":_r,"out-in":function(n){return _r(br(n))}});ca.ease=function(n){var t=n.indexOf("-"),e=t>=0?n.substring(0,t):n,r=t>=0?n.substring(t+1):"in";return e=Uo.get(e)||Yo,r=Io.get(r)||st,xr(r(e.apply(null,Array.prototype.slice.call(arguments,1))))},ca.interpolateHcl=Dr,ca.interpolateHsl=jr,ca.interpolateLab=Lr,ca.interpolateRound=Fr,ca.layout={},ca.layout.bundle=function(){return function(n){for(var t=[],e=-1,r=n.length;++e<r;)t.push(Rr(n[e]));return t}},ca.layout.chord=function(){function n(){var n,l,s,h,g,p={},d=[],m=ca.range(i),v=[];for(e=[],r=[],n=0,h=-1;++h<i;){for(l=0,g=-1;++g<i;)l+=u[h][g];d.push(l),v.push(ca.range(i)),n+=l}for(a&&m.sort(function(n,t){return a(d[n],d[t])}),o&&v.forEach(function(n,t){n.sort(function(n,e){return o(u[t][n],u[t][e])})}),n=(2*Fa-f*i)/n,l=0,h=-1;++h<i;){for(s=l,g=-1;++g<i;){var y=m[h],M=v[y][g],x=u[y][M],b=l,_=l+=x*n;p[y+"-"+M]={index:y,subindex:M,startAngle:b,endAngle:_,value:x}}r[y]={index:y,startAngle:s,endAngle:l,value:(l-s)/n},l+=f}for(h=-1;++h<i;)for(g=h-1;++g<i;){var w=p[h+"-"+g],S=p[g+"-"+h];(w.value||S.value)&&e.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}c&&t()}function t(){e.sort(function(n,t){return c((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var e,r,u,i,a,o,c,l={},f=0;return l.matrix=function(n){return arguments.length?(i=(u=n)&&u.length,e=r=null,l):u},l.padding=function(n){return arguments.length?(f=n,e=r=null,l):f},l.sortGroups=function(n){return arguments.length?(a=n,e=r=null,l):a},l.sortSubgroups=function(n){return arguments.length?(o=n,e=null,l):o},l.sortChords=function(n){return arguments.length?(c=n,e&&t(),l):c},l.chords=function(){return e||n(),e},l.groups=function(){return r||n(),r},l},ca.layout.force=function(){function n(n){return function(t,e,r,u){if(t.point!==n){var i=t.cx-n.x,a=t.cy-n.y,o=1/Math.sqrt(i*i+a*a);if(d>(u-e)*o){var c=t.charge*o*o;return n.px-=i*c,n.py-=a*c,!0}if(t.point&&isFinite(o)){var c=t.pointCharge*o*o;n.px-=i*c,n.py-=a*c}}return!t.charge}}function t(n){n.px=ca.event.x,n.py=ca.event.y,o.resume()}var e,r,u,i,a,o={},c=ca.dispatch("start","tick","end"),l=[1,1],f=.9,s=Vo,h=Xo,g=-30,p=.1,d=.8,m=[],v=[];return o.tick=function(){if((r*=.99)<.005)return c.end({type:"end",alpha:r=0}),!0;var t,e,o,s,h,d,y,M,x,b=m.length,_=v.length;for(e=0;_>e;++e)o=v[e],s=o.source,h=o.target,M=h.x-s.x,x=h.y-s.y,(d=M*M+x*x)&&(d=r*i[e]*((d=Math.sqrt(d))-u[e])/d,M*=d,x*=d,h.x-=M*(y=s.weight/(h.weight+s.weight)),h.y-=x*y,s.x+=M*(y=1-y),s.y+=x*y);if((y=r*p)&&(M=l[0]/2,x=l[1]/2,e=-1,y))for(;++e<b;)o=m[e],o.x+=(M-o.x)*y,o.y+=(x-o.y)*y;if(g)for(Zr(t=ca.geom.quadtree(m),r,a),e=-1;++e<b;)(o=m[e]).fixed||t.visit(n(o));for(e=-1;++e<b;)o=m[e],o.fixed?(o.x=o.px,o.y=o.py):(o.x-=(o.px-(o.px=o.x))*f,o.y-=(o.py-(o.py=o.y))*f);c.tick({type:"tick",alpha:r})},o.nodes=function(n){return arguments.length?(m=n,o):m},o.links=function(n){return arguments.length?(v=n,o):v},o.size=function(n){return arguments.length?(l=n,o):l},o.linkDistance=function(n){return arguments.length?(s="function"==typeof n?n:+n,o):s},o.distance=o.linkDistance,o.linkStrength=function(n){return arguments.length?(h="function"==typeof n?n:+n,o):h},o.friction=function(n){return arguments.length?(f=+n,o):f},o.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,o):g},o.gravity=function(n){return arguments.length?(p=+n,o):p},o.theta=function(n){return arguments.length?(d=+n,o):d},o.alpha=function(n){return arguments.length?(n=+n,r?r=n>0?n:0:n>0&&(c.start({type:"start",alpha:r=n}),ca.timer(o.tick)),o):r},o.start=function(){function n(n,r){for(var u,i=t(e),a=-1,o=i.length;++a<o;)if(!isNaN(u=i[a][n]))return u;return Math.random()*r}function t(){if(!c){for(c=[],r=0;p>r;++r)c[r]=[];for(r=0;d>r;++r){var n=v[r];c[n.source.index].push(n.target),c[n.target.index].push(n.source)}}return c[e]}var e,r,c,f,p=m.length,d=v.length,y=l[0],M=l[1];for(e=0;p>e;++e)(f=m[e]).index=e,f.weight=0;for(e=0;d>e;++e)f=v[e],typeof f.source=="number"&&(f.source=m[f.source]),typeof f.target=="number"&&(f.target=m[f.target]),++f.source.weight,++f.target.weight;for(e=0;p>e;++e)f=m[e],isNaN(f.x)&&(f.x=n("x",y)),isNaN(f.y)&&(f.y=n("y",M)),isNaN(f.px)&&(f.px=f.x),isNaN(f.py)&&(f.py=f.y);if(u=[],"function"==typeof s)for(e=0;d>e;++e)u[e]=+s.call(this,v[e],e);else for(e=0;d>e;++e)u[e]=s;if(i=[],"function"==typeof h)for(e=0;d>e;++e)i[e]=+h.call(this,v[e],e);else for(e=0;d>e;++e)i[e]=h;if(a=[],"function"==typeof g)for(e=0;p>e;++e)a[e]=+g.call(this,m[e],e);else for(e=0;p>e;++e)a[e]=g;return o.resume()},o.resume=function(){return o.alpha(.1)},o.stop=function(){return o.alpha(0)},o.drag=function(){return e||(e=ca.behavior.drag().origin(st).on("dragstart.force",Ur).on("drag.force",t).on("dragend.force",Ir)),arguments.length?(this.on("mouseover.force",Vr).on("mouseout.force",Xr).call(e),void 0):e},ca.rebind(o,c,"on")};var Vo=20,Xo=1;ca.layout.hierarchy=function(){function n(t,a,o){var c=u.call(e,t,a);if(t.depth=a,o.push(t),c&&(l=c.length)){for(var l,f,s=-1,h=t.children=[],g=0,p=a+1;++s<l;)f=n(c[s],p,o),f.parent=t,h.push(f),g+=f.value;r&&h.sort(r),i&&(t.value=g)}else i&&(t.value=+i.call(e,t,a)||0);return t}function t(n,r){var u=n.children,a=0;if(u&&(o=u.length))for(var o,c=-1,l=r+1;++c<o;)a+=t(u[c],l);else i&&(a=+i.call(e,n,r)||0);return i&&(n.value=a),a}function e(t){var e=[];return n(t,0,e),e}var r=Gr,u=$r,i=Jr;return e.sort=function(n){return arguments.length?(r=n,e):r},e.children=function(n){return arguments.length?(u=n,e):u},e.value=function(n){return arguments.length?(i=n,e):i},e.revalue=function(n){return t(n,0),n},e},ca.layout.partition=function(){function n(t,e,r,u){var i=t.children;if(t.x=e,t.y=t.depth*u,t.dx=r,t.dy=u,i&&(a=i.length)){var a,o,c,l=-1;for(r=t.value?r/t.value:0;++l<a;)n(o=i[l],e,c=o.value*r,u),e+=c}}function t(n){var e=n.children,r=0;if(e&&(u=e.length))for(var u,i=-1;++i<u;)r=Math.max(r,t(e[i]));return 1+r}function e(e,i){var a=r.call(this,e,i);return n(a[0],0,u[0],u[1]/t(a[0])),a}var r=ca.layout.hierarchy(),u=[1,1];return e.size=function(n){return arguments.length?(u=n,e):u},Br(e,r)},ca.layout.pie=function(){function n(i){var a=i.map(function(e,r){return+t.call(n,e,r)}),o=+("function"==typeof r?r.apply(this,arguments):r),c=(("function"==typeof u?u.apply(this,arguments):u)-o)/ca.sum(a),l=ca.range(i.length);null!=e&&l.sort(e===Zo?function(n,t){return a[t]-a[n]}:function(n,t){return e(i[n],i[t])});var f=[];return l.forEach(function(n){var t;f[n]={data:i[n],value:t=a[n],startAngle:o,endAngle:o+=t*c}}),f}var t=Number,e=Zo,r=0,u=2*Fa;return n.value=function(e){return arguments.length?(t=e,n):t},n.sort=function(t){return arguments.length?(e=t,n):e},n.startAngle=function(t){return arguments.length?(r=t,n):r},n.endAngle=function(t){return arguments.length?(u=t,n):u},n};var Zo={};ca.layout.stack=function(){function n(o,c){var l=o.map(function(e,r){return t.call(n,e,r)}),f=l.map(function(t){return t.map(function(t,e){return[i.call(n,t,e),a.call(n,t,e)]})}),s=e.call(n,f,c);l=ca.permute(l,s),f=ca.permute(f,s);var h,g,p,d=r.call(n,f,c),m=l.length,v=l[0].length;for(g=0;v>g;++g)for(u.call(n,l[0][g],p=d[g],f[0][g][1]),h=1;m>h;++h)u.call(n,l[h][g],p+=f[h-1][g][1],f[h][g][1]);return o}var t=st,e=tu,r=eu,u=nu,i=Wr,a=Qr;return n.values=function(e){return arguments.length?(t=e,n):t},n.order=function(t){return arguments.length?(e="function"==typeof t?t:Bo.get(t)||tu,n):e},n.offset=function(t){return arguments.length?(r="function"==typeof t?t:$o.get(t)||eu,n):r},n.x=function(t){return arguments.length?(i=t,n):i},n.y=function(t){return arguments.length?(a=t,n):a},n.out=function(t){return arguments.length?(u=t,n):u},n};var Bo=ca.map({"inside-out":function(n){var t,e,r=n.length,u=n.map(ru),i=n.map(uu),a=ca.range(r).sort(function(n,t){return u[n]-u[t]}),o=0,c=0,l=[],f=[];for(t=0;r>t;++t)e=a[t],c>o?(o+=i[e],l.push(e)):(c+=i[e],f.push(e));return f.reverse().concat(l)},reverse:function(n){return ca.range(n.length).reverse()},"default":tu}),$o=ca.map({silhouette:function(n){var t,e,r,u=n.length,i=n[0].length,a=[],o=0,c=[];for(e=0;i>e;++e){for(t=0,r=0;u>t;t++)r+=n[t][e][1];r>o&&(o=r),a.push(r)}for(e=0;i>e;++e)c[e]=(o-a[e])/2;return c},wiggle:function(n){var t,e,r,u,i,a,o,c,l,f=n.length,s=n[0],h=s.length,g=[];for(g[0]=c=l=0,e=1;h>e;++e){for(t=0,u=0;f>t;++t)u+=n[t][e][1];for(t=0,i=0,o=s[e][0]-s[e-1][0];f>t;++t){for(r=0,a=(n[t][e][1]-n[t][e-1][1])/(2*o);t>r;++r)a+=(n[r][e][1]-n[r][e-1][1])/o;i+=a*n[t][e][1]}g[e]=c-=u?i/u*o:0,l>c&&(l=c)}for(e=0;h>e;++e)g[e]-=l;return g},expand:function(n){var t,e,r,u=n.length,i=n[0].length,a=1/u,o=[];for(e=0;i>e;++e){for(t=0,r=0;u>t;t++)r+=n[t][e][1];if(r)for(t=0;u>t;t++)n[t][e][1]/=r;else for(t=0;u>t;t++)n[t][e][1]=a}for(e=0;i>e;++e)o[e]=0;return o},zero:eu});ca.layout.histogram=function(){function n(n,i){for(var a,o,c=[],l=n.map(e,this),f=r.call(this,l,i),s=u.call(this,f,l,i),i=-1,h=l.length,g=s.length-1,p=t?1:1/h;++i<g;)a=c[i]=[],a.dx=s[i+1]-(a.x=s[i]),a.y=0;if(g>0)for(i=-1;++i<h;)o=l[i],o>=f[0]&&o<=f[1]&&(a=c[ca.bisect(s,o,1,g)-1],a.y+=p,a.push(n[i]));return c}var t=!0,e=Number,r=cu,u=au;return n.value=function(t){return arguments.length?(e=t,n):e},n.range=function(t){return arguments.length?(r=ft(t),n):r},n.bins=function(t){return arguments.length?(u="number"==typeof t?function(n){return ou(n,t)}:ft(t),n):u},n.frequency=function(e){return arguments.length?(t=!!e,n):t},n},ca.layout.tree=function(){function n(n,u){function i(n,t){var r=n.children,u=n._tree;if(r&&(a=r.length)){for(var a,c,l,f=r[0],s=f,h=-1;++h<a;)l=r[h],i(l,c),s=o(l,c,s),c=l;vu(n);var g=.5*(f._tree.prelim+l._tree.prelim);t?(u.prelim=t._tree.prelim+e(n,t),u.mod=u.prelim-g):u.prelim=g}else t&&(u.prelim=t._tree.prelim+e(n,t))}function a(n,t){n.x=n._tree.prelim+t;var e=n.children;if(e&&(r=e.length)){var r,u=-1;for(t+=n._tree.mod;++u<r;)a(e[u],t)}}function o(n,t,r){if(t){for(var u,i=n,a=n,o=t,c=n.parent.children[0],l=i._tree.mod,f=a._tree.mod,s=o._tree.mod,h=c._tree.mod;o=su(o),i=fu(i),o&&i;)c=fu(c),a=su(a),a._tree.ancestor=n,u=o._tree.prelim+s-i._tree.prelim-l+e(o,i),u>0&&(yu(Mu(o,n,r),n,u),l+=u,f+=u),s+=o._tree.mod,l+=i._tree.mod,h+=c._tree.mod,f+=a._tree.mod;o&&!su(a)&&(a._tree.thread=o,a._tree.mod+=s-f),i&&!fu(c)&&(c._tree.thread=i,c._tree.mod+=l-h,r=n)}return r}var c=t.call(this,n,u),l=c[0];mu(l,function(n,t){n._tree={ancestor:n,prelim:0,mod:0,change:0,shift:0,number:t?t._tree.number+1:0}}),i(l),a(l,-l._tree.prelim);var f=hu(l,pu),s=hu(l,gu),h=hu(l,du),g=f.x-e(f,s)/2,p=s.x+e(s,f)/2,d=h.depth||1;return mu(l,function(n){n.x=(n.x-g)/(p-g)*r[0],n.y=n.depth/d*r[1],delete n._tree}),c}var t=ca.layout.hierarchy().sort(null).value(null),e=lu,r=[1,1];return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(r=t,n):r},Br(n,t)},ca.layout.pack=function(){function n(n,u){var i=t.call(this,n,u),a=i[0];a.x=0,a.y=0,mu(a,function(n){n.r=Math.sqrt(n.value)}),mu(a,Su);var o=r[0],c=r[1],l=Math.max(2*a.r/o,2*a.r/c);if(e>0){var f=e*l/2;mu(a,function(n){n.r+=f}),mu(a,Su),mu(a,function(n){n.r-=f}),l=Math.max(2*a.r/o,2*a.r/c)}return Au(a,o/2,c/2,1/l),i}var t=ca.layout.hierarchy().sort(xu),e=0,r=[1,1];return n.size=function(t){return arguments.length?(r=t,n):r},n.padding=function(t){return arguments.length?(e=+t,n):e},Br(n,t)},ca.layout.cluster=function(){function n(n,u){var i,a=t.call(this,n,u),o=a[0],c=0;mu(o,function(n){var t=n.children;t&&t.length?(n.x=Tu(t),n.y=Nu(t)):(n.x=i?c+=e(n,i):0,n.y=0,i=n)});var l=Cu(o),f=zu(o),s=l.x-e(l,f)/2,h=f.x+e(f,l)/2;return mu(o,function(n){n.x=(n.x-s)/(h-s)*r[0],n.y=(1-(o.y?n.y/o.y:1))*r[1]}),a}var t=ca.layout.hierarchy().sort(null).value(null),e=lu,r=[1,1];return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(r=t,n):r},Br(n,t)},ca.layout.treemap=function(){function n(n,t){for(var e,r,u=-1,i=n.length;++u<i;)r=(e=n[u]).value*(0>t?0:t),e.area=isNaN(r)||0>=r?0:r}function t(e){var i=e.children;if(i&&i.length){var a,o,c,l=s(e),f=[],h=i.slice(),p=1/0,d="slice"===g?l.dx:"dice"===g?l.dy:"slice-dice"===g?e.depth&1?l.dy:l.dx:Math.min(l.dx,l.dy);for(n(h,l.dx*l.dy/e.value),f.area=0;(c=h.length)>0;)f.push(a=h[c-1]),f.area+=a.area,"squarify"!==g||(o=r(f,d))<=p?(h.pop(),p=o):(f.area-=f.pop().area,u(f,d,l,!1),d=Math.min(l.dx,l.dy),f.length=f.area=0,p=1/0);f.length&&(u(f,d,l,!0),f.length=f.area=0),i.forEach(t)}}function e(t){var r=t.children;if(r&&r.length){var i,a=s(t),o=r.slice(),c=[];for(n(o,a.dx*a.dy/t.value),c.area=0;i=o.pop();)c.push(i),c.area+=i.area,i.z!=null&&(u(c,i.z?a.dx:a.dy,a,!o.length),c.length=c.area=0);r.forEach(e)}}function r(n,t){for(var e,r=n.area,u=0,i=1/0,a=-1,o=n.length;++a<o;)(e=n[a].area)&&(i>e&&(i=e),e>u&&(u=e));return r*=r,t*=t,r?Math.max(t*u*p/r,r/(t*i*p)):1/0}function u(n,t,e,r){var u,i=-1,a=n.length,o=e.x,l=e.y,f=t?c(n.area/t):0;if(t==e.dx){for((r||f>e.dy)&&(f=e.dy);++i<a;)u=n[i],u.x=o,u.y=l,u.dy=f,o+=u.dx=Math.min(e.x+e.dx-o,f?c(u.area/f):0);u.z=!0,u.dx+=e.x+e.dx-o,e.y+=f,e.dy-=f}else{for((r||f>e.dx)&&(f=e.dx);++i<a;)u=n[i],u.x=o,u.y=l,u.dx=f,l+=u.dy=Math.min(e.y+e.dy-l,f?c(u.area/f):0);u.z=!1,u.dy+=e.y+e.dy-l,e.x+=f,e.dx-=f}}function i(r){var u=a||o(r),i=u[0];return i.x=0,i.y=0,i.dx=l[0],i.dy=l[1],a&&o.revalue(i),n([i],i.dx*i.dy/i.value),(a?e:t)(i),h&&(a=u),u}var a,o=ca.layout.hierarchy(),c=Math.round,l=[1,1],f=null,s=Du,h=!1,g="squarify",p=.5*(1+Math.sqrt(5));return i.size=function(n){return arguments.length?(l=n,i):l},i.padding=function(n){function t(t){var e=n.call(i,t,t.depth);return null==e?Du(t):ju(t,"number"==typeof e?[e,e,e,e]:e)}function e(t){return ju(t,n)}if(!arguments.length)return f;var r;return s=(f=n)==null?Du:(r=typeof n)=="function"?t:"number"===r?(n=[n,n,n,n],e):e,i},i.round=function(n){return arguments.length?(c=n?Math.round:Number,i):c!=Number},i.sticky=function(n){return arguments.length?(h=n,a=null,i):h},i.ratio=function(n){return arguments.length?(p=n,i):p},i.mode=function(n){return arguments.length?(g=n+"",i):g},Br(i,o)},ca.random={normal:function(n,t){var e=arguments.length;return 2>e&&(t=1),1>e&&(n=0),function(){var e,r,u;do e=Math.random()*2-1,r=Math.random()*2-1,u=e*e+r*r;while(!u||u>1);return n+t*e*Math.sqrt(-2*Math.log(u)/u)}},logNormal:function(){var n=ca.random.normal.apply(ca,arguments);return function(){return Math.exp(n())}},irwinHall:function(n){return function(){for(var t=0,e=0;n>e;e++)t+=Math.random();return t/n}}},ca.scale={},ca.scale.linear=function(){return Ou([0,1],[0,1],vr,!1)},ca.scale.log=function(){return Zu(ca.scale.linear().domain([0,Math.LN10]),10,Bu,$u)};var Jo=ca.format(".0e");ca.scale.pow=function(){return Wu(ca.scale.linear(),1)},ca.scale.sqrt=function(){return ca.scale.pow().exponent(.5)},ca.scale.ordinal=function(){return ni([],{t:"range",a:[[]]})},ca.scale.category10=function(){return ca.scale.ordinal().range(Go)},ca.scale.category20=function(){return ca.scale.ordinal().range(Ko)},ca.scale.category20b=function(){return ca.scale.ordinal().range(Wo)},ca.scale.category20c=function(){return ca.scale.ordinal().range(Qo)};var Go=["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"],Ko=["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"],Wo=["#393b79","#5254a3","#6b6ecf","#9c9ede","#637939","#8ca252","#b5cf6b","#cedb9c","#8c6d31","#bd9e39","#e7ba52","#e7cb94","#843c39","#ad494a","#d6616b","#e7969c","#7b4173","#a55194","#ce6dbd","#de9ed6"],Qo=["#3182bd","#6baed6","#9ecae1","#c6dbef","#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#31a354","#74c476","#a1d99b","#c7e9c0","#756bb1","#9e9ac8","#bcbddc","#dadaeb","#636363","#969696","#bdbdbd","#d9d9d9"];ca.scale.quantile=function(){return ti([],[])},ca.scale.quantize=function(){return ei(0,1,[0,1])},ca.scale.threshold=function(){return ri([.5],[0,1])},ca.scale.identity=function(){return ui([0,1])},ca.svg.arc=function(){function n(){var n=t.apply(this,arguments),i=e.apply(this,arguments),a=r.apply(this,arguments)+nc,o=u.apply(this,arguments)+nc,c=(a>o&&(c=a,a=o,o=c),o-a),l=Fa>c?"0":"1",f=Math.cos(a),s=Math.sin(a),h=Math.cos(o),g=Math.sin(o);return c>=tc?n?"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"M0,"+n+"A"+n+","+n+" 0 1,0 0,"+-n+"A"+n+","+n+" 0 1,0 0,"+n+"Z":"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"Z":n?"M"+i*f+","+i*s+"A"+i+","+i+" 0 "+l+",1 "+i*h+","+i*g+"L"+n*h+","+n*g+"A"+n+","+n+" 0 "+l+",0 "+n*f+","+n*s+"Z":"M"+i*f+","+i*s+"A"+i+","+i+" 0 "+l+",1 "+i*h+","+i*g+"L0,0"+"Z"}var t=ii,e=ai,r=oi,u=ci;return n.innerRadius=function(e){return arguments.length?(t=ft(e),n):t},n.outerRadius=function(t){return arguments.length?(e=ft(t),n):e},n.startAngle=function(t){return arguments.length?(r=ft(t),n):r},n.endAngle=function(t){return arguments.length?(u=ft(t),n):u},n.centroid=function(){var n=(t.apply(this,arguments)+e.apply(this,arguments))/2,i=(r.apply(this,arguments)+u.apply(this,arguments))/2+nc;return[Math.cos(i)*n,Math.sin(i)*n]},n};var nc=-Fa/2,tc=2*Fa-1e-6;ca.svg.line.radial=function(){var n=ze(li);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},He.reverse=Pe,Pe.reverse=He,ca.svg.area=function(){return fi(st)},ca.svg.area.radial=function(){var n=fi(li);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},ca.svg.chord=function(){function n(n,o){var c=t(this,i,n,o),l=t(this,a,n,o);return"M"+c.p0+r(c.r,c.p1,c.a1-c.a0)+(e(c,l)?u(c.r,c.p1,c.r,c.p0):u(c.r,c.p1,l.r,l.p0)+r(l.r,l.p1,l.a1-l.a0)+u(l.r,l.p1,c.r,c.p0))+"Z"}function t(n,t,e,r){var u=t.call(n,e,r),i=o.call(n,u,r),a=c.call(n,u,r)+nc,f=l.call(n,u,r)+nc;return{r:i,a0:a,a1:f,p0:[i*Math.cos(a),i*Math.sin(a)],p1:[i*Math.cos(f),i*Math.sin(f)]}}function e(n,t){return n.a0==t.a0&&n.a1==t.a1}function r(n,t,e){return"A"+n+","+n+" 0 "+ +(e>Fa)+",1 "+t}function u(n,t,e,r){return"Q 0,0 "+r}var i=fe,a=se,o=si,c=oi,l=ci;return n.radius=function(t){return arguments.length?(o=ft(t),n):o},n.source=function(t){return arguments.length?(i=ft(t),n):i},n.target=function(t){return arguments.length?(a=ft(t),n):a},n.startAngle=function(t){return arguments.length?(c=ft(t),n):c},n.endAngle=function(t){return arguments.length?(l=ft(t),n):l},n},ca.svg.diagonal=function(){function n(n,u){var i=t.call(this,n,u),a=e.call(this,n,u),o=(i.y+a.y)/2,c=[i,{x:i.x,y:o},{x:a.x,y:o},a];return c=c.map(r),"M"+c[0]+"C"+c[1]+" "+c[2]+" "+c[3]}var t=fe,e=se,r=hi;return n.source=function(e){return arguments.length?(t=ft(e),n):t},n.target=function(t){return arguments.length?(e=ft(t),n):e},n.projection=function(t){return arguments.length?(r=t,n):r},n},ca.svg.diagonal.radial=function(){var n=ca.svg.diagonal(),t=hi,e=n.projection;return n.projection=function(n){return arguments.length?e(gi(t=n)):t},n},ca.svg.symbol=function(){function n(n,r){return(ec.get(t.call(this,n,r))||mi)(e.call(this,n,r))}var t=di,e=pi;return n.type=function(e){return arguments.length?(t=ft(e),n):t},n.size=function(t){return arguments.length?(e=ft(t),n):e},n};var ec=ca.map({circle:mi,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*ic)),e=t*ic;return"M0,"+-t+"L"+e+",0"+" 0,"+t+" "+-e+",0"+"Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"},"triangle-down":function(n){var t=Math.sqrt(n/uc),e=t*uc/2;return"M0,"+e+"L"+t+","+-e+" "+-t+","+-e+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/uc),e=t*uc/2;return"M0,"+-e+"L"+t+","+e+" "+-t+","+e+"Z"}});ca.svg.symbolTypes=ec.keys();var rc,uc=Math.sqrt(3),ic=Math.tan(30*Pa),ac=[],oc=0,cc={ease:Er,delay:0,duration:250};ac.call=ka.call,ac.empty=ka.empty,ac.node=ka.node,ca.transition=function(n){return arguments.length?rc?n.transition():n:Ca.transition()},ca.transition.prototype=ac,ac.select=function(n){var t,e,r,u=this.id,i=[];"function"!=typeof n&&(n=v(n));for(var a=-1,o=this.length;++a<o;){i.push(t=[]);for(var c=this[a],l=-1,f=c.length;++l<f;)(r=c[l])&&(e=n.call(r,r.__data__,l))?("__data__"in r&&(e.__data__=r.__data__),xi(e,l,u,r.__transition__[u]),t.push(e)):t.push(null)}return vi(i,u)},ac.selectAll=function(n){var t,e,r,u,i,a=this.id,o=[];"function"!=typeof n&&(n=y(n));for(var c=-1,l=this.length;++c<l;)for(var f=this[c],s=-1,h=f.length;++s<h;)if(r=f[s]){i=r.__transition__[a],e=n.call(r,r.__data__,s),o.push(t=[]);for(var g=-1,p=e.length;++g<p;)xi(u=e[g],g,a,i),t.push(u)}return vi(o,a)},ac.filter=function(n){var t,e,r,u=[];"function"!=typeof n&&(n=q(n));for(var i=0,a=this.length;a>i;i++){u.push(t=[]);for(var e=this[i],o=0,c=e.length;c>o;o++)(r=e[o])&&n.call(r,r.__data__,o)&&t.push(r)}return vi(u,this.id,this.time).ease(this.ease())},ac.tween=function(n,t){var e=this.id;return arguments.length<2?this.node().__transition__[e].tween.get(n):j(this,null==t?function(t){t.__transition__[e].tween.remove(n)}:function(r){r.__transition__[e].tween.set(n,t)})},ac.attr=function(n,t){function e(){this.removeAttribute(i)}function r(){this.removeAttributeNS(i.space,i.local)}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var u=yr(n),i=ca.ns.qualify(n);return yi(this,"attr."+n,t,function(n){function t(){var t,e=this.getAttribute(i);return e!==n&&(t=u(e,n),function(n){this.setAttribute(i,t(n))})}function a(){var t,e=this.getAttributeNS(i.space,i.local);return e!==n&&(t=u(e,n),function(n){this.setAttributeNS(i.space,i.local,t(n))})}return null==n?i.local?r:e:(n+="",i.local?a:t)})},ac.attrTween=function(n,t){function e(n,e){var r=t.call(this,n,e,this.getAttribute(u));return r&&function(n){this.setAttribute(u,r(n))}}function r(n,e){var r=t.call(this,n,e,this.getAttributeNS(u.space,u.local));return r&&function(n){this.setAttributeNS(u.space,u.local,r(n))}}var u=ca.ns.qualify(n);return this.tween("attr."+n,u.local?r:e)},ac.style=function(n,t,e){function r(){this.style.removeProperty(n)}var u=arguments.length;if(3>u){if("string"!=typeof n){2>u&&(t="");for(e in n)this.style(e,n[e],t);return this}e=""}var i=yr(n);return yi(this,"style."+n,t,function(t){function u(){var r,u=fa.getComputedStyle(this,null).getPropertyValue(n);return u!==t&&(r=i(u,t),function(t){this.style.setProperty(n,r(t),e)})}return null==t?r:(t+="",u)})},ac.styleTween=function(n,t,e){return arguments.length<3&&(e=""),this.tween("style."+n,function(r,u){var i=t.call(this,r,u,fa.getComputedStyle(this,null).getPropertyValue(n));return i&&function(t){this.style.setProperty(n,i(t),e)}})},ac.text=function(n){return yi(this,"text",n,Mi)},ac.remove=function(){return this.each("end.transition",function(){var n;!this.__transition__&&(n=this.parentNode)&&n.removeChild(this)})},ac.ease=function(n){var t=this.id;return arguments.length<1?this.node().__transition__[t].ease:("function"!=typeof n&&(n=ca.ease.apply(ca,arguments)),j(this,function(e){e.__transition__[t].ease=n}))},ac.delay=function(n){var t=this.id;return j(this,"function"==typeof n?function(e,r,u){e.__transition__[t].delay=n.call(e,e.__data__,r,u)|0}:(n|=0,function(e){e.__transition__[t].delay=n}))},ac.duration=function(n){var t=this.id;return j(this,"function"==typeof n?function(e,r,u){e.__transition__[t].duration=Math.max(1,n.call(e,e.__data__,r,u)|0)}:(n=Math.max(1,0|n),function(e){e.__transition__[t].duration=n}))},ac.each=function(n,t){var e=this.id;if(arguments.length<2){var r=cc,u=rc;rc=e,j(this,function(t,r,u){cc=t.__transition__[e],n.call(t,t.__data__,r,u)}),cc=r,rc=u}else j(this,function(r){r.__transition__[e].event.on(n,t)});return this},ac.transition=function(){for(var n,t,e,r,u=this.id,i=++oc,a=[],o=0,c=this.length;c>o;o++){a.push(n=[]);for(var t=this[o],l=0,f=t.length;f>l;l++)(e=t[l])&&(r=Object.create(e.__transition__[u]),r.delay+=r.duration,xi(e,l,i,r)),n.push(e)}return vi(a,i)},ca.svg.axis=function(){function n(n){n.each(function(){var n,s=ca.select(this),h=null==l?e.ticks?e.ticks.apply(e,c):e.domain():l,g=null==t?e.tickFormat?e.tickFormat.apply(e,c):String:t,p=wi(e,h,f),d=s.selectAll(".tick.minor").data(p,String),m=d.enter().insert("line",".tick").attr("class","tick minor").style("opacity",1e-6),v=ca.transition(d.exit()).style("opacity",1e-6).remove(),y=ca.transition(d).style("opacity",1),M=s.selectAll(".tick.major").data(h,String),x=M.enter().insert("g","path").attr("class","tick major").style("opacity",1e-6),b=ca.transition(M.exit()).style("opacity",1e-6).remove(),_=ca.transition(M).style("opacity",1),w=Fu(e),S=s.selectAll(".domain").data([0]),E=(S.enter().append("path").attr("class","domain"),ca.transition(S)),k=e.copy(),A=this.__chart__||k;this.__chart__=k,x.append("line"),x.append("text");var q=x.select("line"),N=_.select("line"),T=M.select("text").text(g),C=x.select("text"),z=_.select("text");switch(r){case"bottom":n=bi,m.attr("y2",i),y.attr("x2",0).attr("y2",i),q.attr("y2",u),C.attr("y",Math.max(u,0)+o),N.attr("x2",0).attr("y2",u),z.attr("x",0).attr("y",Math.max(u,0)+o),T.attr("dy",".71em").style("text-anchor","middle"),E.attr("d","M"+w[0]+","+a+"V0H"+w[1]+"V"+a);break;case"top":n=bi,m.attr("y2",-i),y.attr("x2",0).attr("y2",-i),q.attr("y2",-u),C.attr("y",-(Math.max(u,0)+o)),N.attr("x2",0).attr("y2",-u),z.attr("x",0).attr("y",-(Math.max(u,0)+o)),T.attr("dy","0em").style("text-anchor","middle"),E.attr("d","M"+w[0]+","+-a+"V0H"+w[1]+"V"+-a);break;case"left":n=_i,m.attr("x2",-i),y.attr("x2",-i).attr("y2",0),q.attr("x2",-u),C.attr("x",-(Math.max(u,0)+o)),N.attr("x2",-u).attr("y2",0),z.attr("x",-(Math.max(u,0)+o)).attr("y",0),T.attr("dy",".32em").style("text-anchor","end"),E.attr("d","M"+-a+","+w[0]+"H0V"+w[1]+"H"+-a);break;case"right":n=_i,m.attr("x2",i),y.attr("x2",i).attr("y2",0),q.attr("x2",u),C.attr("x",Math.max(u,0)+o),N.attr("x2",u).attr("y2",0),z.attr("x",Math.max(u,0)+o).attr("y",0),T.attr("dy",".32em").style("text-anchor","start"),E.attr("d","M"+a+","+w[0]+"H0V"+w[1]+"H"+a)}if(e.ticks)x.call(n,A),_.call(n,k),b.call(n,k),m.call(n,A),y.call(n,k),v.call(n,k);else{var D=k.rangeBand()/2,j=function(n){return k(n)+D};x.call(n,j),_.call(n,j)}})}var t,e=ca.scale.linear(),r=lc,u=6,i=6,a=6,o=3,c=[10],l=null,f=0;return n.scale=function(t){return arguments.length?(e=t,n):e},n.orient=function(t){return arguments.length?(r=t in fc?t+"":lc,n):r},n.ticks=function(){return arguments.length?(c=arguments,n):c},n.tickValues=function(t){return arguments.length?(l=t,n):l},n.tickFormat=function(e){return arguments.length?(t=e,n):t},n.tickSize=function(t,e){if(!arguments.length)return u;var r=arguments.length-1;return u=+t,i=r>1?+e:u,a=r>0?+arguments[r]:u,n},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(t){return arguments.length?(f=+t,n):f},n};var lc="bottom",fc={top:1,right:1,bottom:1,left:1};ca.svg.brush=function(){function n(i){i.each(function(){var i,a=ca.select(this),l=a.selectAll(".background").data([0]),s=a.selectAll(".extent").data([0]),h=a.selectAll(".resize").data(f,String);a.style("pointer-events","all").on("mousedown.brush",u).on("touchstart.brush",u),l.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),s.enter().append("rect").attr("class","extent").style("cursor","move"),h.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return sc[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),h.style("display",n.empty()?"none":null),h.exit().remove(),o&&(i=Fu(o),l.attr("x",i[0]).attr("width",i[1]-i[0]),e(a)),c&&(i=Fu(c),l.attr("y",i[0]).attr("height",i[1]-i[0]),r(a)),t(a)})}function t(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+s[+/e$/.test(n)][0]+","+s[+/^s/.test(n)][1]+")"})}function e(n){n.select(".extent").attr("x",s[0][0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",s[1][0]-s[0][0])}function r(n){n.select(".extent").attr("y",s[0][1]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",s[1][1]-s[0][1])}function u(){function u(){var n=ca.event.changedTouches;return n?ca.touches(y,n)[0]:ca.mouse(y)}function f(){ca.event.keyCode==32&&(E||(m=null,k[0]-=s[1][0],k[1]-=s[1][1],E=2),l())}function h(){ca.event.keyCode==32&&2==E&&(k[0]+=s[1][0],k[1]+=s[1][1],E=0,l())}function g(){var n=u(),i=!1;v&&(n[0]+=v[0],n[1]+=v[1]),E||(ca.event.altKey?(m||(m=[(s[0][0]+s[1][0])/2,(s[0][1]+s[1][1])/2]),k[0]=s[+(n[0]<m[0])][0],k[1]=s[+(n[1]<m[1])][1]):m=null),w&&p(n,o,0)&&(e(b),i=!0),S&&p(n,c,1)&&(r(b),i=!0),i&&(t(b),x({type:"brush",mode:E?"move":"resize"}))}function p(n,t,e){var r,u,a=Fu(t),o=a[0],c=a[1],l=k[e],f=s[1][e]-s[0][e];return E&&(o-=l,c-=f+l),r=Math.max(o,Math.min(c,n[e])),E?u=(r+=l)+f:(m&&(l=Math.max(o,Math.min(c,2*m[e]-r))),r>l?(u=r,r=l):u=l),s[0][e]!==r||s[1][e]!==u?(i=null,s[0][e]=r,s[1][e]=u,!0):void 0}function d(){g(),b.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),ca.select("body").style("cursor",null),A.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),x({type:"brushend"}),l()}var m,v,y=this,M=ca.select(ca.event.target),x=a.of(y,arguments),b=ca.select(y),_=M.datum(),w=!/^(n|s)$/.test(_)&&o,S=!/^(e|w)$/.test(_)&&c,E=M.classed("extent"),k=u(),A=ca.select(fa).on("mousemove.brush",g).on("mouseup.brush",d).on("touchmove.brush",g).on("touchend.brush",d).on("keydown.brush",f).on("keyup.brush",h);if(E)k[0]=s[0][0]-k[0],k[1]=s[0][1]-k[1];else if(_){var q=+/w$/.test(_),N=+/^n/.test(_);v=[s[1-q][0]-k[0],s[1-N][1]-k[1]],k[0]=s[q][0],k[1]=s[N][1]}else ca.event.altKey&&(m=k.slice());b.style("pointer-events","none").selectAll(".resize").style("display",null),ca.select("body").style("cursor",M.style("cursor")),x({type:"brushstart"}),g(),l()}var i,a=h(n,"brushstart","brush","brushend"),o=null,c=null,f=hc[0],s=[[0,0],[0,0]];return n.x=function(t){return arguments.length?(o=t,f=hc[!o<<1|!c],n):o
},n.y=function(t){return arguments.length?(c=t,f=hc[!o<<1|!c],n):c},n.extent=function(t){var e,r,u,a,l;return arguments.length?(i=[[0,0],[0,0]],o&&(e=t[0],r=t[1],c&&(e=e[0],r=r[0]),i[0][0]=e,i[1][0]=r,o.invert&&(e=o(e),r=o(r)),e>r&&(l=e,e=r,r=l),s[0][0]=0|e,s[1][0]=0|r),c&&(u=t[0],a=t[1],o&&(u=u[1],a=a[1]),i[0][1]=u,i[1][1]=a,c.invert&&(u=c(u),a=c(a)),u>a&&(l=u,u=a,a=l),s[0][1]=0|u,s[1][1]=0|a),n):(t=i||s,o&&(e=t[0][0],r=t[1][0],i||(e=s[0][0],r=s[1][0],o.invert&&(e=o.invert(e),r=o.invert(r)),e>r&&(l=e,e=r,r=l))),c&&(u=t[0][1],a=t[1][1],i||(u=s[0][1],a=s[1][1],c.invert&&(u=c.invert(u),a=c.invert(a)),u>a&&(l=u,u=a,a=l))),o&&c?[[e,u],[r,a]]:o?[e,r]:c&&[u,a])},n.clear=function(){return i=null,s[0][0]=s[0][1]=s[1][0]=s[1][1]=0,n},n.empty=function(){return o&&s[0][0]===s[1][0]||c&&s[0][1]===s[1][1]},ca.rebind(n,a,"on")};var sc={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},hc=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]];ca.time={};var gc=Date,pc=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Si.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){dc.setUTCDate.apply(this._,arguments)},setDay:function(){dc.setUTCDay.apply(this._,arguments)},setFullYear:function(){dc.setUTCFullYear.apply(this._,arguments)},setHours:function(){dc.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){dc.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){dc.setUTCMinutes.apply(this._,arguments)},setMonth:function(){dc.setUTCMonth.apply(this._,arguments)},setSeconds:function(){dc.setUTCSeconds.apply(this._,arguments)},setTime:function(){dc.setTime.apply(this._,arguments)}};var dc=Date.prototype,mc="%a %b %e %X %Y",vc="%m/%d/%Y",yc="%H:%M:%S",Mc=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],xc=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],bc=["January","February","March","April","May","June","July","August","September","October","November","December"],_c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];ca.time.year=Ei(function(n){return n=ca.time.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),ca.time.years=ca.time.year.range,ca.time.years.utc=ca.time.year.utc.range,ca.time.day=Ei(function(n){var t=new gc(1970,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),ca.time.days=ca.time.day.range,ca.time.days.utc=ca.time.day.utc.range,ca.time.dayOfYear=function(n){var t=ca.time.year(n);return Math.floor((n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*6e4)/864e5)},pc.forEach(function(n,t){n=n.toLowerCase(),t=7-t;var e=ca.time[n]=Ei(function(n){return(n=ca.time.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+Math.floor(t)*7)},function(n){var e=ca.time.year(n).getDay();return Math.floor((ca.time.dayOfYear(n)+(e+t)%7)/7)-(e!==t)});ca.time[n+"s"]=e.range,ca.time[n+"s"].utc=e.utc.range,ca.time[n+"OfYear"]=function(n){var e=ca.time.year(n).getDay();return Math.floor((ca.time.dayOfYear(n)+(e+t)%7)/7)}}),ca.time.week=ca.time.sunday,ca.time.weeks=ca.time.sunday.range,ca.time.weeks.utc=ca.time.sunday.utc.range,ca.time.weekOfYear=ca.time.sundayOfYear,ca.time.format=function(n){function t(t){for(var r,u,i,a=[],o=-1,c=0;++o<e;)n.charCodeAt(o)===37&&(a.push(n.substring(c,o)),(u=Nc[r=n.charAt(++o)])!=null&&(r=n.charAt(++o)),(i=Tc[r])&&(r=i(t,null==u?"e"===r?" ":"0":u)),a.push(r),c=o+1);return a.push(n.substring(c,o)),a.join("")}var e=n.length;return t.parse=function(t){var e={y:1900,m:0,d:1,H:0,M:0,S:0,L:0},r=Ai(e,n,t,0);if(r!=t.length)return null;"p"in e&&(e.H=e.H%12+e.p*12);var u=new gc;return u.setFullYear(e.y,e.m,e.d),u.setHours(e.H,e.M,e.S,e.L),u},t.toString=function(){return n},t};var wc=qi(Mc),Sc=qi(xc),Ec=qi(bc),kc=Ni(bc),Ac=qi(_c),qc=Ni(_c),Nc={"-":"",_:" ",0:"0"},Tc={a:function(n){return xc[n.getDay()]},A:function(n){return Mc[n.getDay()]},b:function(n){return _c[n.getMonth()]},B:function(n){return bc[n.getMonth()]},c:ca.time.format(mc),d:function(n,t){return Ti(n.getDate(),t,2)},e:function(n,t){return Ti(n.getDate(),t,2)},H:function(n,t){return Ti(n.getHours(),t,2)},I:function(n,t){return Ti(n.getHours()%12||12,t,2)},j:function(n,t){return Ti(1+ca.time.dayOfYear(n),t,3)},L:function(n,t){return Ti(n.getMilliseconds(),t,3)},m:function(n,t){return Ti(n.getMonth()+1,t,2)},M:function(n,t){return Ti(n.getMinutes(),t,2)},p:function(n){return n.getHours()>=12?"PM":"AM"},S:function(n,t){return Ti(n.getSeconds(),t,2)},U:function(n,t){return Ti(ca.time.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return Ti(ca.time.mondayOfYear(n),t,2)},x:ca.time.format(vc),X:ca.time.format(yc),y:function(n,t){return Ti(n.getFullYear()%100,t,2)},Y:function(n,t){return Ti(n.getFullYear()%1e4,t,4)},Z:$i,"%":function(){return"%"}},Cc={a:Ci,A:zi,b:Di,B:ji,c:Li,d:Ui,e:Ui,H:Ii,I:Ii,L:Zi,m:Yi,M:Vi,p:Bi,S:Xi,x:Fi,X:Hi,y:Ri,Y:Pi},zc=/^\s*\d+/,Dc=ca.map({am:0,pm:1});ca.time.format.utc=function(n){function t(n){try{gc=Si;var t=new gc;return t._=n,e(t)}finally{gc=Date}}var e=ca.time.format(n);return t.parse=function(n){try{gc=Si;var t=e.parse(n);return t&&t._}finally{gc=Date}},t.toString=e.toString,t};var jc=ca.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");ca.time.format.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?Ji:jc,Ji.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},Ji.toString=jc.toString,ca.time.second=Ei(function(n){return new gc(Math.floor(n/1e3)*1e3)},function(n,t){n.setTime(n.getTime()+Math.floor(t)*1e3)},function(n){return n.getSeconds()}),ca.time.seconds=ca.time.second.range,ca.time.seconds.utc=ca.time.second.utc.range,ca.time.minute=Ei(function(n){return new gc(Math.floor(n/6e4)*6e4)},function(n,t){n.setTime(n.getTime()+Math.floor(t)*6e4)},function(n){return n.getMinutes()}),ca.time.minutes=ca.time.minute.range,ca.time.minutes.utc=ca.time.minute.utc.range,ca.time.hour=Ei(function(n){var t=n.getTimezoneOffset()/60;return new gc((Math.floor(n/36e5-t)+t)*36e5)},function(n,t){n.setTime(n.getTime()+Math.floor(t)*36e5)},function(n){return n.getHours()}),ca.time.hours=ca.time.hour.range,ca.time.hours.utc=ca.time.hour.utc.range,ca.time.month=Ei(function(n){return n=ca.time.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),ca.time.months=ca.time.month.range,ca.time.months.utc=ca.time.month.utc.range;var Lc=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],Fc=[[ca.time.second,1],[ca.time.second,5],[ca.time.second,15],[ca.time.second,30],[ca.time.minute,1],[ca.time.minute,5],[ca.time.minute,15],[ca.time.minute,30],[ca.time.hour,1],[ca.time.hour,3],[ca.time.hour,6],[ca.time.hour,12],[ca.time.day,1],[ca.time.day,2],[ca.time.week,1],[ca.time.month,1],[ca.time.month,3],[ca.time.year,1]],Hc=[[ca.time.format("%Y"),jt],[ca.time.format("%B"),function(n){return n.getMonth()}],[ca.time.format("%b %d"),function(n){return n.getDate()!=1}],[ca.time.format("%a %d"),function(n){return n.getDay()&&n.getDate()!=1}],[ca.time.format("%I %p"),function(n){return n.getHours()}],[ca.time.format("%I:%M"),function(n){return n.getMinutes()}],[ca.time.format(":%S"),function(n){return n.getSeconds()}],[ca.time.format(".%L"),function(n){return n.getMilliseconds()}]],Pc=ca.scale.linear(),Rc=Qi(Hc);Fc.year=function(n,t){return Pc.domain(n.map(ta)).ticks(t).map(na)},ca.time.scale=function(){return Gi(ca.scale.linear(),Fc,Rc)};var Oc=Fc.map(function(n){return[n[0].utc,n[1]]}),Yc=[[ca.time.format.utc("%Y"),jt],[ca.time.format.utc("%B"),function(n){return n.getUTCMonth()}],[ca.time.format.utc("%b %d"),function(n){return n.getUTCDate()!=1}],[ca.time.format.utc("%a %d"),function(n){return n.getUTCDay()&&n.getUTCDate()!=1}],[ca.time.format.utc("%I %p"),function(n){return n.getUTCHours()}],[ca.time.format.utc("%I:%M"),function(n){return n.getUTCMinutes()}],[ca.time.format.utc(":%S"),function(n){return n.getUTCSeconds()}],[ca.time.format.utc(".%L"),function(n){return n.getUTCMilliseconds()}]],Uc=Qi(Yc);return Oc.year=function(n,t){return Pc.domain(n.map(ra)).ticks(t).map(ea)},ca.time.scale.utc=function(){return Gi(ca.scale.linear(),Oc,Uc)},ca.text=function(){return ca.xhr.apply(ca,arguments).response(ua)},ca.json=function(n,t){return ca.xhr(n,"application/json",t).response(ia)},ca.html=function(n,t){return ca.xhr(n,"text/html",t).response(aa)},ca.xml=function(){return ca.xhr.apply(ca,arguments).response(oa)},ca}();
(function() {


}).call(this);
/*
			 1  2  3  4  5  6  7  8  9  10
			+--+--+--+--+--+--+--+--+--+--+
	1		|  |  |  |//|//|//|//|  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	2		|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	3		|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	4		|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	5		|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	6		|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	7		|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	8		|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	10	|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	11	|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	12	|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	13	|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	14	|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	15	|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	16	|  |  |  |  |  |  |  |  |  |  |
			+--+--+--+--+--+--+--+--+--+--+
	17	|  |  |//|  |  |  |  |  |//|//|
			+--+--+--+--+--+--+--+--+--+--+
	18	|  |//|//|//|  |  |  |  |//|//|
			+--+--+--+--+--+--+--+--+--+--+
*/

//
var gamedata = [
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
],
  div = 33,
  rows = 18,
  cols = 10,
  w = cols * div,
  h = rows * div,
  shape = {},
  nextShape = {},
  next = -1,
  interval = 0,
  timeInterval = 0,
  level = 1,
  lines = 0,
  time = 0,
  gameover = false,
  paused = false,
  grid = false,
  svg,
  svgnext,
  scoreID;

function tetris() {
  svg = d3
    .select(".svg-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h), svgnext = d3.select(".next").append("svg");

  attachKeyListeners();
  gameOver();
}

function play() {
  createShape(true);
  timeInterval = setInterval(
    function() {
      time++;
      d3.select("#time").text(time);
    },
    1000
  );
  interval = setInterval(start, 650);
}

function start() {
  if (shape.animate()) {
    shape.down().draw();
  } else {
    clearInterval(interval);
    updateGame();
    createShape(false);

    if (gameover) {
      gameOver();
      clearInterval(timeInterval);
    } else {
      interval = setInterval(start, 650 - level * 50);
    }
  }
}

function createShape(first) {
  var curr;
  if (next >= 0) {
    curr = next;
    next = Math.round(Math.random() * 6);
    if (next == curr) {
      next = Math.round(Math.random() * 6);
    }
  } else {
    curr = Math.round(Math.random() * 6);
    next = Math.round(Math.random() * 6);
  }

  switch (curr) {
  case 0:
    shape = createBar();
    break;
  case 1:
    shape = createL1();
    break;
  case 2:
    shape = createSquare();
    break;
  case 3:
    shape = createZ1();
    break;
  case 4:
    shape = createL2();
    break;
  case 5:
    shape = createT();
    break;
  case 6:
    shape = createZ2();
    break;
  }

  switch (next) {
  case 0:
    nextShape = createBar("next");
    break;
  case 1:
    nextShape = createL1("next");
    break;
  case 2:
    nextShape = createSquare("next");
    break;
  case 3:
    nextShape = createZ1("next");
    break;
  case 4:
    nextShape = createL2("next");
    break;
  case 5:
    nextShape = createT("next");
    break;
  case 6:
    nextShape = createZ2("next");
    break;
  }
}

/*
	o = 0
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|//|//|  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	o = 90
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
*/
function createBar(next) {
  var d = [ [ 3 * div, 0 ], [ 4 * div, 0 ], [ 5 * div, 0 ], [ 6 * div, 0 ] ],
    // data
    dPreview = [ [ 10, 20 ], [ 30, 20 ], [ 50, 20 ], [ 70, 20 ] ],
    o = 0,
    // orientation
    f = "orange",
    // fill
    grace = true,
    bar = {};

  if (next) {
    drawNext(dPreview, 20, f);
  } else {
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);
  }

  bar.f = function(value) {
    if (!arguments.length)
      return f;

    f = value;
    return bar;
  };

  bar.d = function(value) {
    if (!arguments.length)
      return d;

    d = value;
    return bar;
  };

  bar.o = function(value) {
    if (!arguments.length)
      return o;

    o = value;
    return bar;
  };

  bar.left = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (d[0][0] > 0) {
      if (
        o == 0 && gamedata[r][c - 1] == 0 ||
          o == 90 && gamedata[r][c - 1] == 0 && gamedata[r - 1][c - 1] == 0 &&
            (gamedata[r - 2] == undefined || gamedata[r - 2][c - 1] == 0) &&
            (gamedata[r - 3] == undefined || gamedata[r - 3][c - 1] == 0)
      ) {
        for (var i = 0; i < d.length; i++) {
          d[i][0] -= div;
        }
      }
    }
    return bar;
  };

  bar.right = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (d[3][0] < w - div) {
      if (
        o == 0 && gamedata[r][c + 4] == 0 ||
          o == 90 && gamedata[r][c + 1] == 0 && gamedata[r - 1][c + 1] == 0 &&
            (gamedata[r - 2] == undefined || gamedata[r - 2][c + 1] == 0) &&
            (gamedata[r - 3] == undefined || gamedata[r - 3][c + 1] == 0)
      ) {
        for (var i = 0; i < d.length; i++) {
          d[i][0] += div;
        }
      }
    }
    return bar;
  };

  bar.down = function() {
    for (var i = 0; i < d.length; i++) {
      d[i][1] += div;
    }

    return bar;
  };

  bar.drop = function() {
    var x1, x2, r = d[0][1] / div, done = false;

    if (o == 0) {
      x1 = d[0][0] / div;
      x2 = d[3][0] / div;

      for (var i = r; i < rows; i++) {
        for (var j = x1; j <= x2; j++) {
          if (gamedata[i][j]) {
            done = true;
            break;
          }
        }
        if (done)
          break;
      }

      for (var k = 0; k < d.length; k++) {
        d[k][1] = div * (i - 1);
      }
    } else {
      x1 = d[0][0] / div;

      for (var i = r; i < rows; i++) {
        if (gamedata[i][x1]) {
          break;
        }
      }

      for (var k = 0; k < d.length; k++) {
        d[k][1] = div * (i - k - 1);
      }
    }
    grace = false;
    return bar;
  };

  bar.rotate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        r + 1 <= rows && gamedata[r + 1][c + 1] == 0 &&
          (gamedata[r - 1] == undefined || gamedata[r - 1][c + 1] == 0) &&
          (gamedata[r - 2] == undefined || gamedata[r - 2][c + 1] == 0)
      ) {
        o = 90;
        d[0][0] += div;
        d[0][1] += div;
        d[2][0] -= div;
        d[2][1] -= div;
        d[3][0] -= 2 * div;
        d[3][1] -= 2 * div;
      }
    } else {
      if (
        gamedata[r - 1][c - 1] == 0 && gamedata[r - 1][c + 1] == 0 &&
          gamedata[r - 1][c + 2] == 0
      ) {
        o = 0;
        d[0][0] -= div;
        d[0][1] -= div;
        d[2][0] += div;
        d[2][1] += div;
        d[3][0] += 2 * div;
        d[3][1] += 2 * div;
      }
    }

    return bar;
  };

  bar.animate = function() {
    var r, c, animate = true;

    if (d[0][1] == div * 17) {
      return false;
    } else if (o == 0) {
      for (var i = 0; i < d.length; i++) {
        r = d[i][1] / div + 1;
        c = d[i][0] / div;

        if (gamedata[r][c]) {
          animate = false;
          break;
        }
      }
      return animate;
    } else if (o == 90) {
      r = d[0][1] / div + 1;
      c = d[0][0] / div;
      return gamedata[r][c] == 0;
    }

    return bar;
  };

  bar.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  bar.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return bar;
  };

  return bar;
}

/*
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
*/
function createSquare(next) {
  var d = [
    [ 4 * div, 0 ],
    [ 5 * div, 0 ],
    [ 4 * div, div ],
    [ 5 * div, div ]
  ],
    // data
    dPreview = [ [ 30, 10 ], [ 50, 10 ], [ 30, 30 ], [ 50, 30 ] ],
    o = 0,
    // orientation
    f = "red",
    // fill
    grace = true,
    sqr = {};

  if (next)
    drawNext(dPreview, 20, f);
  else
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);

  sqr.f = function(value) {
    if (!arguments.length)
      return f;
    f = value;
    return sqr;
  };

  sqr.d = function(value) {
    if (!arguments.length)
      return d;

    d = value;
    return sqr;
  };

  sqr.o = function(value) {
    if (!arguments.length)
      return o;

    o = value;
    return sqr;
  };

  sqr.left = function() {
    var r = d[0][1] / div,
      // row
      c = d[0][0] / div;
    // col
    if (c > 0 && gamedata[r][c - 1] == 0 && gamedata[r + 1][c - 1] == 0) {
      for (var i = 0; i < 4; i++) {
        d[i][0] -= div;
      }
    }
    return sqr;
  };

  sqr.right = function() {
    var r = d[0][1] / div, c = d[1][0] / div;

    if (
      c < cols - 1 && gamedata[r][c + 1] == 0 && gamedata[r + 1][c + 1] == 0
    ) {
      for (var i = 0; i < 4; i++) {
        d[i][0] += div;
      }
    }
    return sqr;
  };

  sqr.down = function() {
    for (var i = 0; i < 4; i++) {
      d[i][1] += div;
    }
    return sqr;
  };

  sqr.drop = function() {
    var r = d[3][1] / div, c = d[0][0] / div;

    for (var i = r; i < rows; i++) {
      if (gamedata[i][c] != 0 || gamedata[i][c + 1] != 0) {
        break;
      }
    }

    d[0][1] = div * (i - 2);
    d[1][1] = div * (i - 2);
    d[2][1] = div * (i - 1);
    d[3][1] = div * (i - 1);
    grace = false;
    return sqr;
  };

  sqr.rotate = function() {
    // it's a square! no need to implement rotate()!
    return sqr;
  };

  sqr.animate = function() {
    var r = d[2][1] / div,
      // row
      c = d[2][0] / div;
    // col
    if (
      r < rows - 1 && gamedata[r + 1][c] == 0 && gamedata[r + 1][c + 1] == 0
    ) {
      return true;
    }

    return false;
  };

  sqr.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  sqr.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return sqr;
  };

  return sqr;
}

/*
	O = 0
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	O = 90
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	O = 180
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	O = 270
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
*/
function createL1(next) {
  var d = [ [ 3 * div, div ], [ 3 * div, 0 ], [ 4 * div, 0 ], [ 5 * div, 0 ] ],
    dPreview = [ [ 20, 10 ], [ 40, 10 ], [ 60, 10 ], [ 20, 30 ] ],
    o = 0,
    // orientation
    f = "blue",
    // fill
    grace = true,
    l1 = {};
  if (next)
    drawNext(dPreview, 20, f);
  else
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);

  l1.f = function() {
    return f;
  };

  l1.d = function() {
    return d;
  };

  l1.left = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c - 1] == 0 && gamedata[r - 1][c - 1] == 0)
        move = true;
    } else if (o == 90) {
      if (
        (gamedata[r] == undefined || gamedata[r][c - 1] == 0) &&
          gamedata[r + 1][c] == 0 &&
          gamedata[r + 2][c] == 0
      )
        move = true;
    } else if (o == 180) {
      if (gamedata[r][c - 1] == 0 && gamedata[r + 1][c - 3] == 0)
        move = true;
    } else if (o == 270) {
      if (
        gamedata[r][c - 2] == 0 && gamedata[r - 1][c - 2] == 0 &&
          gamedata[r - 2][c - 2] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] -= div;
    }

    return l1;
  };

  l1.right = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c + 1] == 0 && gamedata[r - 1][c + 3] == 0)
        move = true;
    } else if (o == 90) {
      if (
        (gamedata[r] == undefined || gamedata[r][c + 2] == 0) &&
          gamedata[r + 1][c + 2] == 0 &&
          gamedata[r + 2][c + 2] == 0
      )
        move = true;
    } else if (o == 180) {
      if (gamedata[r][c + 1] == 0 && gamedata[r + 1][c + 1] == 0)
        move = true;
    } else if (o == 270) {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r - 1][c] == 0 &&
          gamedata[r - 2][c] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] += div;
    }

    return l1;
  };

  l1.down = function() {
    for (var i = 0; i < 4; i++) {
      d[i][1] += div;
    }
    return l1;
  };

  l1.drop = function() {
    var c = d[0][0] / div, r = d[0][1] / div, j;

    if (o == 0) {
      for (j = r + 1; j < rows; j++) {
        if (
          gamedata[j][c] || gamedata[j - 1][c] || gamedata[j - 1][c + 1] ||
            gamedata[j - 1][c + 2]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j - 1);
      d[2][1] = div * (j - 1);
      d[3][1] = div * (j - 1);
    } else if (o == 90) {
      for (j = r + 1; j < rows - 2; j++) {
        if (
          gamedata[j][c] || gamedata[j][c + 1] || gamedata[j + 1][c + 1] ||
            gamedata[j + 2][c + 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * (j + 1);
      d[3][1] = div * (j + 2);
    } else if (o == 180) {
      for (j = r + 1; j < rows - 1; j++) {
        if (
          gamedata[j][c] || gamedata[j + 1][c] || gamedata[j + 1][c - 1] ||
            gamedata[j + 1][c - 2]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j + 1);
      d[2][1] = div * (j + 1);
      d[3][1] = div * (j + 1);
    } else {
      for (j = r + 1; j < rows; j++) {
        if (
          gamedata[j][c] || gamedata[j][c - 1] || gamedata[j - 1][c - 1] ||
            gamedata[j - 2][c - 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * (j - 1);
      d[3][1] = div * (j - 2);
    }
    grace = false;
    return l1;
  };

  l1.rotate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        r + 1 < rows - 1 &&
          (gamedata[r - 2] == undefined || gamedata[r - 2][c] == 0) &&
          (gamedata[r - 2] == undefined || gamedata[r - 2][c + 1] == 0) &&
          gamedata[r][c + 1] == 0
      ) {
        o = 90;
        d[0][1] -= div * 2;
        d[1][0] += div;
        d[1][1] -= div;
        d[3][1] += div;
        d[3][0] -= div;
      }
    } else if (o == 90) {
      if (
        (gamedata[r] == undefined || gamedata[r][c + 2] == 0) &&
          (gamedata[r + 1] == undefined || gamedata[r + 1][c + 2] == 0) &&
          (gamedata[r + 1] == undefined || gamedata[r + 1][c] == 0)
      ) {
        o = 180;
        d[0][0] += div * 2;
        d[1][0] += div;
        d[1][1] += div;
        d[3][0] -= div;
        d[3][1] -= div;
      }
    } else if (o == 180) {
      if (
        r + 2 < rows - 1 &&
          (gamedata[r + 2] == undefined || gamedata[r + 2][c] == 0) &&
          (gamedata[r + 2] == undefined || gamedata[r + 2][c - 1] == 0) &&
          (gamedata[r] == undefined || gamedata[r][c - 1] == 0)
      ) {
        o = 270;
        d[0][1] += div * 2;
        d[1][0] -= div;
        d[1][1] += div;
        d[3][0] += div;
        d[3][1] -= div;
      }
    } else {
      if (
        gamedata[r][c - 2] == 0 && gamedata[r - 1][c - 2] == 0 &&
          gamedata[r - 1][c] == 0
      ) {
        o = 0;
        d[0][0] -= div * 2;
        d[1][0] -= div;
        d[1][1] -= div;
        d[3][0] += div;
        d[3][1] += div;
      }
    }
    return l1;
  };

  l1.animate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        r + 1 < rows && gamedata[r + 1][c] == 0 && gamedata[r][c + 1] == 0 &&
          gamedata[r][c + 2] == 0
      )
        return true;
    } else if (o == 90) {
      if (
        r + 3 < rows && gamedata[r + 1][c] == 0 && gamedata[r + 3][c + 1] == 0
      )
        return true;
    } else if (o == 180) {
      if (
        r + 2 < rows && gamedata[r + 2][c] == 0 &&
          gamedata[r + 2][c - 1] == 0 &&
          gamedata[r + 2][c - 2] == 0
      )
        return true;
    } else {
      if (
        r + 1 < rows && gamedata[r + 1][c] == 0 && gamedata[r + 1][c - 1] == 0
      )
        return true;
    }
    return false;
  };

  l1.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  l1.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return l1;
  };

  return l1;
}

/*
	O = 0
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	O = 90
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	O = 180
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	O = 270
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
*/
function createL2(next) {
  var d = [ [ 3 * div, 0 ], [ 4 * div, 0 ], [ 5 * div, 0 ], [ 5 * div, div ] ],
    // data
    dPreview = [ [ 20, 10 ], [ 40, 10 ], [ 60, 10 ], [ 60, 30 ] ],
    o = 0,
    // orientation
    f = "purple",
    // fill
    grace = true,
    l2 = {};

  if (next)
    drawNext(dPreview, 20, f);
  else
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);

  l2.f = function() {
    return f;
  };

  l2.d = function() {
    return d;
  };

  l2.left = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (c > 0 && gamedata[r][c - 1] == 0 && gamedata[r + 1][c + 1] == 0)
        move = true;
    } else if (o == 90) {
      if (
        c > 0 && gamedata[r][c - 1] == 0 && gamedata[r + 1][c - 1] == 0 &&
          gamedata[r + 2][c - 2] == 0
      )
        move = true;
    } else if (o == 180) {
      if (c > 0 && gamedata[r][c - 3] == 0 && gamedata[r - 1][c - 3] == 0)
        move = true;
    } else {
      if (
        c > 0 && gamedata[r][c - 1] == 0 && gamedata[r - 1][c - 1] == 0 &&
          gamedata[r - 2][c - 1] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] -= div;
    }

    return l2;
  };

  l2.right = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c + 3] == 0 && gamedata[r + 1][c + 3] == 0)
        move = true;
    } else if (o == 90) {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r + 1][c + 1] == 0 &&
          gamedata[r + 2][c + 1] == 0
      )
        move = true;
    } else if (o == 180) {
      if (gamedata[r][c + 1] == 0 && gamedata[r - 1][c - 1] == 0)
        move = true;
    } else {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r - 1][c + 1] == 0 &&
          gamedata[r - 2][c + 2] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] += div;
    }

    return l2;
  };

  l2.down = function() {
    for (var i = 0; i < 4; i++) {
      d[i][1] += div;
    }
    return l2;
  };

  l2.drop = function() {
    var r = d[0][1] / div, c = d[0][0] / div, j;

    if (o == 0) {
      for (j = r + 1; j < rows - 1; j++) {
        if (gamedata[j][c] || gamedata[j][c + 1] || gamedata[j + 1][c + 2])
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * j;
      d[3][1] = div * (j + 1);
    } else if (o == 90) {
      for (j = r + 1; j < rows - 2; j++) {
        if (
          gamedata[j][c] || gamedata[j + 1][c] || gamedata[j + 2][c] ||
            gamedata[j + 2][c - 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j + 1);
      d[2][1] = div * (j + 2);
      d[3][1] = div * (j + 2);
    } else if (o == 180) {
      for (j = r + 1; j < rows; j++) {
        if (
          gamedata[j][c] || gamedata[j][c - 1] || gamedata[j][c - 2] ||
            gamedata[j - 1][c - 2]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * j;
      d[3][1] = div * (j - 1);
    } else {
      for (j = r + 1; j < rows; j++) {
        if (gamedata[j][c] || gamedata[j - 2][c + 1])
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j - 1);
      d[2][1] = div * (j - 2);
      d[3][1] = div * (j - 2);
    }

    grace = false;
    return l2;
  };

  l2.rotate = function() {
    var r, c;

    if (o == 0) {
      r = d[0][1] / div;
      c = d[0][0] / div;

      if (
        r + 2 < rows - 1 && gamedata[r + 1][c + 1] == 0 &&
          gamedata[r + 2][c] == 0 &&
          gamedata[r + 2][c + 1] == 0
      ) {
        o = 90;
        d[0][0] += div;
        d[1][1] += div;
        d[2][0] -= div;
        d[2][1] += div * 2;
        d[3][0] -= div * 2;
        d[3][1] += div;
      }
    } else if (o == 90) {
      r = d[3][1] / div;
      c = d[3][0] / div;

      if (
        (gamedata[r - 2] == undefined || gamedata[r - 2][c] == 0) &&
          (gamedata[r - 1] == undefined || gamedata[r - 1][c] == 0) &&
          (gamedata[r - 1] == undefined || gamedata[r - 1][c + 2] == 0)
      ) {
        o = 180;
        d[0][0] += div;
        d[0][1] += div;
        d[2][0] -= div;
        d[2][1] -= div;
        d[3][1] -= div * 2;
      }
    } else if (o == 180) {
      r = d[0][1] / div;
      c = d[0][0] / div;

      if (
        r + 1 < rows && gamedata[r - 1][c] == 0 &&
          gamedata[r - 1][c - 1] == 0 &&
          gamedata[r + 1][c - 1] == 0
      ) {
        o = 270;
        d[0][0] -= div;
        d[0][1] += div;
        d[2][0] += div;
        d[2][1] -= div;
        d[3][0] += div * 2;
      }
    } else {
      r = d[3][1] / div;
      c = d[3][0] / div;

      if (gamedata[r + 1][c] == 0 && gamedata[r][c - 2] == 0) {
        o = 0;
        d[0][0] -= div;
        d[0][1] -= div * 2;
        d[1][1] -= div;

        d[2][0] += div;
        d[3][1] += div;
      }
    }

    return l2;
  };

  l2.animate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        r + 1 < rows - 1 && gamedata[r + 1][c] == 0 &&
          gamedata[r + 1][c + 1] == 0 &&
          gamedata[r + 2][c + 2] == 0
      )
        return true;
    } else if (o == 90) {
      if (
        r + 3 < rows && gamedata[r + 3][c] == 0 && gamedata[r + 3][c - 1] == 0
      )
        return true;
    } else if (o == 180) {
      if (
        r + 1 < rows && gamedata[r + 1][c] == 0 &&
          gamedata[r + 1][c - 1] == 0 &&
          gamedata[r + 1][c - 2] == 0
      )
        return true;
    } else {
      if (
        r + 1 < rows && gamedata[r + 1][c] == 0 && gamedata[r - 1][c + 1] == 0
      )
        return true;
    }

    return false;
  };

  l2.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  l2.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return l2;
  };

  return l2;
}

/*
	o = 0
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	o = 90
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
*/
function createZ1(next) {
  var d = [
    [ 3 * div, 0 ],
    [ 4 * div, 0 ],
    [ 4 * div, div ],
    [ 5 * div, div ]
  ],
    // data
    dPreview = [ [ 20, 10 ], [ 40, 10 ], [ 40, 30 ], [ 60, 30 ] ],
    o = 0,
    // orientation
    f = "lightgreen",
    // fill
    grace = true,
    z1 = {};

  if (next)
    drawNext(dPreview, 20, f);
  else
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);

  z1.f = function() {
    return f;
  };

  z1.d = function() {
    return d;
  };

  z1.left = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c - 1] == 0 && gamedata[r + 1][c] == 0)
        move = true;
    } else if (o = 90) {
      if (
        gamedata[r][c - 1] == 0 && gamedata[r + 1][c - 2] == 0 &&
          gamedata[r + 2][c - 2] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] -= div;
    }

    return z1;
  };

  z1.right = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c + 2] == 0 && gamedata[r + 1][c + 3] == 0)
        move = true;
    } else if (o == 90) {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r + 1][c + 1] == 0 &&
          gamedata[r + 2][c] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] += div;
    }

    return z1;
  };

  z1.down = function() {
    for (var i = 0; i < 4; i++) {
      d[i][1] += div;
    }

    return z1;
  };

  z1.drop = function() {
    var c = d[0][0] / div, r = d[0][1] / div, j;

    if (o == 0) {
      for (j = r + 1; j < rows - 1; j++) {
        if (
          gamedata[j][c] || gamedata[j][c + 1] || gamedata[j + 1][c + 1] ||
            gamedata[j + 1][c + 2]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * (j + 1);
      d[3][1] = div * (j + 1);
    } else if (o == 90) {
      for (j = r + 1; j < rows - 2; j++) {
        if (
          gamedata[j][c] || gamedata[j + 1][c] || gamedata[j + 1][c - 1] ||
            gamedata[j + 2][c - 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j + 1);
      d[2][1] = div * (j + 1);
      d[3][1] = div * (j + 2);
    }

    grace = false;
    return z1;
  };

  z1.rotate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (gamedata[r][c + 2] == 0 && gamedata[r + 2][c + 1] == 0) {
        o = 90;
        d[0][0] += div * 2;
        d[1][0] += div;
        d[1][1] += div;
        d[3][0] -= div;
        d[3][1] += div;
      }
    } else {
      if (gamedata[r][c - 2] == 0 && gamedata[r][c - 1] == 0) {
        o = 0;
        d[0][0] -= div * 2;
        d[1][0] -= div;
        d[1][1] -= div;
        d[3][0] += div;
        d[3][1] -= div;
      }
    }

    return z1;
  };

  z1.animate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        gamedata[r + 1][c] == 0 &&
          (gamedata[r + 2] && gamedata[r + 2][c + 1] == 0) &&
          (gamedata[r + 2] && gamedata[r + 2][c + 2] == 0)
      )
        return true;
    } else {
      if (
        gamedata[r + 2][c] == 0 &&
          (gamedata[r + 3] && gamedata[r + 3][c - 1] == 0)
      )
        return true;
    }

    return false;
  };

  z1.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  z1.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return z1;
  };

  return z1;
}

/*
	o = 0
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	o = 90
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
*/
function createZ2(next) {
  var d = [
    [ 3 * div, div ],
    [ 4 * div, div ],
    [ 4 * div, 0 ],
    [ 5 * div, 0 ]
  ],
    // data
    dPreview = [ [ 20, 30 ], [ 40, 30 ], [ 40, 10 ], [ 60, 10 ] ],
    o = 0,
    // orientation
    f = "rgb(174, 235, 255)",
    // fill
    grace = true,
    z2 = {};

  if (next)
    drawNext(dPreview, 20, f);
  else
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);

  z2.f = function() {
    return f;
  };

  z2.d = function() {
    return d;
  };

  z2.left = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c - 1] == 0 && gamedata[r - 1][c] == 0)
        move = true;
    } else if (o = 90) {
      if (
        gamedata[r][c - 1] == 0 && gamedata[r + 1][c - 1] == 0 &&
          gamedata[r + 2][c] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] -= div;
    }

    return z2;
  };

  z2.right = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c + 2] == 0 && gamedata[r - 1][c + 3] == 0)
        move = true;
    } else if (o == 90) {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r + 1][c + 2] == 0 &&
          gamedata[r + 2][c + 2] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] += div;
    }

    return z2;
  };

  z2.down = function() {
    for (var i = 0; i < 4; i++) {
      d[i][1] += div;
    }

    return z2;
  };

  z2.drop = function() {
    var c = d[0][0] / div, r = d[0][1] / div, j;

    if (o == 0) {
      for (j = r + 1; j < rows; j++) {
        if (
          gamedata[j][c] || gamedata[j][c + 1] || gamedata[j - 1][c + 1] ||
            gamedata[j - 1][c + 2]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * (j - 1);
      d[3][1] = div * (j - 1);
    } else if (o == 90) {
      for (j = r + 1; j < rows - 2; j++) {
        if (
          gamedata[j][c] || gamedata[j + 1][c] || gamedata[j + 1][c + 1] ||
            gamedata[j + 2][c + 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j + 1);
      d[2][1] = div * (j + 1);
      d[3][1] = div * (j + 2);
    }

    grace = false;
    return z2;
  };

  z2.rotate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (gamedata[r][c + 2] == 0 && gamedata[r + 1][c + 2] == 0) {
        o = 90;
        d[0][0] += div;
        d[0][1] -= div;
        d[2][0] += div;
        d[2][1] += div;
        d[3][1] += div * 2;
      }
    } else {
      if (gamedata[r + 1][c - 1] == 0 && gamedata[r][c + 1] == 0) {
        o = 0;
        d[0][0] -= div;
        d[0][1] += div;
        d[2][0] -= div;
        d[2][1] -= div;
        d[3][1] -= div * 2;
      }
    }

    return z2;
  };

  z2.animate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        gamedata[r + 1] && gamedata[r + 1][c] == 0 &&
          (gamedata[r + 1] && gamedata[r + 1][c + 1] == 0) &&
          gamedata[r][c + 2] == 0
      )
        return true;
    } else {
      if (
        gamedata[r + 2][c] == 0 &&
          (gamedata[r + 3] && gamedata[r + 3][c + 1] == 0)
      )
        return true;
    }

    return false;
  };

  z2.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  z2.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return z2;
  };

  return z2;
}

/*
	o = 0
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	o = 90
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	o = 180
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |//|//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |  |  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+

	o = 270
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|//|  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
	|  |  |  |  |//|  |  |  |  |  |
	+--+--+--+--+--+--+--+--+--+--+
*/
function createT(next) {
  var d = [ [ 3 * div, 0 ], [ 4 * div, 0 ], [ 5 * div, 0 ], [ 4 * div, div ] ],
    // data
    dPreview = [ [ 20, 10 ], [ 40, 10 ], [ 60, 10 ], [ 40, 30 ] ],
    o = 0,
    // orientation
    f = "#D7DF01",
    // fill
    grace = true,
    t = {};

  if (next)
    drawNext(dPreview, 20, f);
  else
    svg
      .selectAll("rect.active")
      .data(d)
      .enter()
      .append("rect")
      .attr("class", "active")
      .attr("x", function(d) {
        return d[0] + 1;
      })
      .attr("y", function(d) {
        return d[1] + 1;
      })
      .attr("rx", 1)
      .attr("width", div - 3)
      .attr("height", div - 3)
      .style("stroke", f)
      .style("stroke-width", 2)
      .style("fill", f)
      .style("fill-opacity", 0.6);

  t.f = function() {
    return f;
  };

  t.d = function() {
    return d;
  };

  t.left = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c - 1] == 0 && gamedata[r + 1][c] == 0)
        move = true;
    } else if (o == 90) {
      if (
        gamedata[r][c - 1] == 0 && gamedata[r + 1][c - 2] == 0 &&
          gamedata[r + 2][c - 1] == 0
      )
        move = true;
    } else if (o == 180) {
      if (gamedata[r][c - 3] == 0 && gamedata[r - 1][c - 2] == 0)
        move = true;
    } else {
      if (
        gamedata[r][c - 1] == 0 && gamedata[r - 1][c - 1] == 0 &&
          gamedata[r - 2][c - 1] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] -= div;
    }

    return t;
  };

  t.right = function() {
    var r = d[0][1] / div, c = d[0][0] / div, move = false;

    if (o == 0) {
      if (gamedata[r][c + 3] == 0 && gamedata[r + 1][c + 2] == 0)
        move = true;
    } else if (o == 90) {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r + 1][c + 1] == 0 &&
          gamedata[r + 2][c + 1] == 0
      )
        move = true;
    } else if (o == 180) {
      if (gamedata[r][c + 1] == 0 && gamedata[r - 1][c] == 0)
        move = true;
    } else {
      if (
        gamedata[r][c + 1] == 0 && gamedata[r - 1][c + 2] == 0 &&
          gamedata[r - 2][c + 1] == 0
      )
        move = true;
    }

    if (move) {
      for (var i = 0; i < 4; i++)
        d[i][0] += div;
    }

    return t;
  };

  t.down = function() {
    for (var i = 0; i < 4; i++) {
      d[i][1] += div;
    }

    return t;
  };

  t.drop = function() {
    var c = d[0][0] / div, r = d[0][1] / div, j;

    if (o == 0) {
      for (j = r + 1; j < rows - 1; j++) {
        if (
          gamedata[j][c] || gamedata[j][c + 1] || gamedata[j][c + 2] ||
            gamedata[j + 1][c + 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * j;
      d[3][1] = div * (j + 1);
    } else if (o == 90) {
      for (j = r + 1; j < rows - 2; j++) {
        if (
          gamedata[j][c] || gamedata[j + 1][c] || gamedata[j + 2][c] ||
            gamedata[j + 1][c - 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j + 1);
      d[2][1] = div * (j + 2);
      d[3][1] = div * (j + 1);
    } else if (o == 180) {
      for (j = r + 1; j < rows; j++) {
        if (
          gamedata[j][c] || gamedata[j][c - 1] || gamedata[j][c - 2] ||
            gamedata[j - 1][c - 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * j;
      d[2][1] = div * j;
      d[3][1] = div * (j - 1);
    } else {
      for (j = r + 1; j < rows; j++) {
        if (
          gamedata[j][c] || gamedata[j - 1][c] || gamedata[j - 2][c] ||
            gamedata[j - 1][c + 1]
        )
          break;
      }

      j--;
      d[0][1] = div * j;
      d[1][1] = div * (j - 1);
      d[2][1] = div * (j - 2);
      d[3][1] = div * (j - 1);
    }

    grace = false;
    return t;
  };

  t.rotate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (gamedata[r - 1] == undefined || gamedata[r - 1][c + 1] == 0) {
        o = 90;
        d[0][0] += div;
        d[0][1] -= div;
        d[2][0] -= div;
        d[2][1] += div;
        d[3][0] -= div;
        d[3][1] -= div;
      }
    } else if (o == 90) {
      if (gamedata[r + 1][c + 1] == 0) {
        o = 180;
        d[0][0] += div;
        d[0][1] += div;
        d[2][0] -= div;
        d[2][1] -= div;
        d[3][0] += div;
        d[3][1] -= div;
      }
    } else if (o == 180) {
      if (gamedata[r + 1] && gamedata[r + 1][c - 1] == 0) {
        o = 270;
        d[0][0] -= div;
        d[0][1] += div;
        d[2][0] += div;
        d[2][1] -= div;
        d[3][0] += div;
        d[3][1] += div;
      }
    } else {
      if (gamedata[r - 1][c - 1] == 0) {
        o = 0;
        d[0][0] -= div;
        d[0][1] -= div;
        d[2][0] += div;
        d[2][1] += div;
        d[3][0] -= div;

        d[3][1] += div;
      }
    }

    return t;
  };

  t.animate = function() {
    var r = d[0][1] / div, c = d[0][0] / div;

    if (o == 0) {
      if (
        gamedata[r + 1][c] == 0 && gamedata[r + 1][c + 2] == 0 &&
          (gamedata[r + 2] && gamedata[r + 2][c + 1] == 0)
      )
        return true;
    } else if (o == 90) {
      if (
        gamedata[r + 3] && gamedata[r + 3][c] == 0 &&
          gamedata[r + 2][c - 1] == 0
      )
        return true;
    } else if (o == 180) {
      if (
        gamedata[r + 1] && gamedata[r + 1][c] == 0 &&
          gamedata[r + 1][c - 1] == 0 &&
          gamedata[r + 1][c - 2] == 0
      )
        return true;
    } else {
      if (gamedata[r + 1] && gamedata[r + 1][c] == 0 && gamedata[r][c + 1] == 0)
        return true;
    }

    return false;
  };

  t.grace = function(value) {
    if (!arguments.length)
      return grace;
    grace = false;
  };

  t.draw = function() {
    svg.selectAll("rect.active").data(d).attr("x", function(d) {
      return d[0] + 1;
    }).attr("y", function(d) {
      return d[1] + 1;
    });

    return t;
  };

  return t;
}

function toggleGrid() {
  if (grid) {
    d3.selectAll("line").remove();
    grid = false;
  } else {
    drawGrid();
    grid = true;
  }
}

function drawGrid() {
  for (var i = 1; i < rows; i++) {
    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", i * div)
      .attr("x2", w)
      .attr("y2", i * div)
      .attr("stroke", "lightgray")
      .attr("stroke-width", 0.5);
  }

  for (var j = 1; j < cols; j++) {
    svg
      .append("line")
      .attr("x1", j * div)
      .attr("y1", 0)
      .attr("x2", j * div)
      .attr("y2", h)
      .attr("stroke", "lightgray")
      .attr("stroke-width", 0.5);
  }
}

function attachKeyListeners() {
  d3.select("body").on("keydown", function(event) {
    if (d3.event.keyCode == 37) {
      if (!paused && (shape.animate() || shape.grace())) {
        d3.event.preventDefault();
        shape.left().draw();
      }
    } else if (d3.event.keyCode == 39) {
      if (!paused && (shape.animate() || shape.grace())) {
        d3.event.preventDefault();
        shape.right().draw();
      }
    } else if (d3.event.keyCode == 40) {
      if (!paused && shape.animate()) {
        d3.event.preventDefault();
        shape.down().draw();
      }
    } else if (d3.event.keyCode == 32) {
      if (!paused && shape.animate()) {
        d3.event.preventDefault();
        shape.drop().draw();
      }
    } else if (d3.event.keyCode == 38) {
      if (!paused && (shape.animate() || shape.grace())) {
        d3.event.preventDefault();
        shape.rotate().draw();
      }
    } else if (d3.event.keyCode == 80) {
      if (interval) {
        d3.event.preventDefault();
        pause();
      }
    }
  });
}

function updateGame() {
  var a = shape.d(), r, c, j, done = false;

  for (var i = 0; i < 4; i++) {
    r = a[i][1] / div;
    c = a[i][0] / div;
    gamedata[r][c] = shape.f();
  }

  j = rows - 1;
  while (!done && j > 1) {
    if (emptyRow(j)) {
      done = true;
    } else if (fullRow(j)) {
      slideDown(j);
    } else {
      j--;
    }
  }

  d3.selectAll("rect.active").remove();
  svg.selectAll("g").data([]).exit().remove();

  svg
    .selectAll("g")
    .data(gamedata)
    .enter()
    .append("g")
    .selectAll("rect")
    .data(function(d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("x", function(d, i, j) {
      return i * div + 1;
    })
    .attr("y", function(d, i, j) {
      return j * div + 1;
    })
    .attr("rx", 1)
    .attr("width", function(d) {
      return div - 3;
    })
    .attr("height", function(d) {
      return div - 3;
    })
    .style("fill", function(d, i, j) {
      return d ? gamedata[j][i] : "none";
    })
    .style("fill-opacity", function(d, i, j) {
      return d ? 0.7 : "none";
    })
    .style("stroke", function(d, i, j) {
      return d ? gamedata[j][i] : "none";
    })
    .style("stroke-width", function(d) {
      return d ? 2 : 0;
    });

  if (!emptyRow(1)) {
    gameover = true;
  }
}

function gameOver() {
  if (gameover) {
    updateScore();
    scoreID = null;
  }

  d3.selectAll("rect.active").remove();
  svgnext.selectAll("rect").data([]).exit().remove();

  svg
    .selectAll("g")
    .data(gamedata)
    .selectAll("rect")
    .data(function(d) {
      return d;
    })
    .transition()
    .duration(300)
    .delay(function(d, i, j) {
      return j * 100;
    })
    .style("fill-opacity", 0)
    .style("stroke-opacity", 0);

  d3.select("#modal").classed("active-modal", true);
}

function newGame() {
  gamedata = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 0
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 1
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 2
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 3
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 4
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 5
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 6
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 7
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 8
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 9
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 10
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 11
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 12
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 13
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 14
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 15
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    // 16
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ], // 17
  prev = -1, interval = 0, timeInterval = 0, gameover = false, shape = {}, nextShape = {}, next = -1, level = 1, lines = 0, time = 0;

  svg.selectAll("g").data([]).exit().remove();
  d3.select("#modal").classed("active-modal", false);
  d3.select("#level").text(level);
  d3.select("#lines").text(lines);
  d3.select("#time").text(time);
  createScore();
  play();
}

function drawNext(data, length, fill) {
  svgnext.selectAll("rect").data([]).exit().remove();

  svgnext
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) {
      return d[0];
    })
    .attr("y", function(d) {
      return d[1];
    })
    .attr("width", length - 2.5)
    .attr("height", length - 2.5)
    .style("stroke", fill)
    .style("stroke-width", 1.5)
    .style("fill", fill)
    .style("fill-opacity", 0.6);
}

function emptyRow(j) {
  for (var i = 0; i < cols; i++) {
    if (gamedata[j][i])
      return false;
  }

  return true;
}

function fullRow(j) {
  for (var i = 0; i < cols; i++) {
    if (gamedata[j][i] == 0)
      return false;
  }

  return true;
}

function slideDown(j) {
  for (var k = j; k > 0; k--) {
    if (emptyRow(k)) {
      break;
    } else {
      for (var i = 0; i < cols; i++)
        gamedata[k][i] = gamedata[k - 1][i];
    }
  }

  lines++;
  if (lines % 5 == 0)
    level++;
  d3.select("#level").text(level);
  d3.select("#lines").text(lines);
}

function pause() {
  if (paused) {
    paused = false;
    interval = setInterval(start, 650 - level * 50);
    timeInterval = setInterval(
      function() {
        time++;
        d3.select("#time").text(time);
      },
      1000
    );
    d3.select("#pause").classed("paused", false);
  } else {
    paused = true;
    clearInterval(interval);
    clearInterval(timeInterval);
    d3.select("#pause").classed("paused", true);
  }
}

function createScore() {}

function updateScore() {}

function createURL() {
  var url = "http://d3tetris.herokuapp.com/scores/";
  // var url = "http://localhost:3000/scores/";
  if (gameover) {
    url += "update?level=" + level;
    url += "&lines=" + lines;
    url += "&time=" + time;
  } else {
    url += "create";
  }

  return url;
}

function updateStats(json) {
  d3.select("#gamesplayed").text(json.count);
  d3.select("#hs-lines").text(json.hs.lines);
  d3.select("#hs-time").text(json.hs.time);
}

function updateCount() {
  var count = Number(d3.select("#gamesplayed").text());
  d3.select("#gamesplayed").text(count + 1);
}
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//



;
