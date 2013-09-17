if(typeof window.econda == 'undefined') {
	window.econda = {};
	var econda = window.econda;
}
if(typeof window.econda.recengine == 'undefined') {
	econda.recengine = {};
}

/**
 * Represents a category, we want to get recommendations for.
 * A category mst have a type, which is in general, the field name. E.g. "productcategory", "brand", ..
 * The category itself can be identified by id (as given in import feed) or path.
 *
 * A context category is always assigned to a econda.recengine.Context object. Normally the easiest way
 * is to use a category configuration in econda.recengine.Context#setCategory
 *
 *     myContextObject.setCategory({
 *         type: 'brand',
 *         path: 'my>category>path',
 *         delimiter: '>'
 *     });
 *
 *     myContextObject.setCategory(new econda.recengine.ContextCategory({
 *         type: 'productcategory',
 *         id: 'A142'
 *     }));
 *
 * @class econda.recengine.ContextCategory
 */
econda.recengine.ContextCategory = function(config)
{
	var cmp = this;

    /**
     * Category type, this is the field name of category, e.g. "productcategory", "brand". See #setType for details.
     * @cfg {String} type
     */
    /**
     * Category path, see #setPath for details.
     * @cfg {Array|Object|String} path
     */
    /**
     * Category id, see #setCategory for details.
     * @cfg {String} id
     */
    /**
     * Variant key, see #setVariant for details.
     * @cfg {String} variant
     */

	/**
	 * Category type, this is the field name of category, e.g. "productcategory", "brand"
	 * @private
	 * @property {String}
	 */
	this.type = null;	

	/**
	 * Array of category path parts
	 * @private
	 * @property {Array}
	 */
	this.path = null;
	
	/**
	 * Category id
	 * @private
	 * @property {String}
	 */
	this.id = null;
	
	/**
	 * Variant key
	 * @private
	 * @property {String}
	 */
	this.variant = null;

    /**
     * Set category type, common examples are "productcategory" or "brand". The type is required.
     *
     * @param {String} type
     * @returns {econda.recengine.ContextCategory}
     */
	this.setType = function(type)
	{
		this.type = type;
		return this;
	};

    /**
     * Set category id. The id must match the id given during import. This will work for "referenced" categories only.
     * For "inline" categories, we've no id, so you can't identify them by id.
     *
     * @param {String} id
     * @returns {econda.recengine.ContextCategory}
     */
	this.setId = function(id)
	{
		this.id = id;
		return this;
	};

    /**
     * Set variant. This is only required if you use multiple languages.
     *
     * @param {String} variant
     * @returns {econda.recengine.ContextCategory}
     */
	this.setVariant = function(variant)
	{
		this.variant = variant;
		return this;
	};
	
	
	/**
	 * Set path, multiple formats allowed:
	 * 
	 * Array of parts:
     *
	 *     cat.setPath(["part1", "part2"] // e.g. "tv", "lcd"
	 *     
	 * Path as string:
     *
	 *     cat.setPath({
	 *       path: "part1/part2",
	 *       delimiter: "/"
	 *     });
	 *     
	 * Path as string with default delimiter:
     *
	 *     cat.setPath("part1/part2");
	 *
     * @param path
     * return (econda.recengine.ContextCategory)
	 */
	this.setPath = function(path)
	{
		if(typeof(path) == 'string') {
			path = {"path": path, "delimiter": "/"};
		}
		if(typeof(path) == 'object' && typeof(path.path) != 'undefined') {
			if(typeof(path.delimiter) == 'undefined') {
				path.delimiter = '/';
			}
			path = path.path.split(path.delimiter);
		}
		this.path = path;
		return this;
	}

	// constructor
	if(typeof config != 'undefined') {
		if(typeof config != 'object') {
			throw "Invalid config object given for recommencation widget."
		}
		for(var p in config) {
			var setter = 'set' + p.charAt(0).toUpperCase() + p.slice(1);
			cmp[setter](config[p]);
		}
	}
}
