if(typeof window.econda == 'undefined') {
	window.econda = {};
	var econda = window.econda;
}
if(typeof window.econda.recengine == 'undefined') {
	econda.recengine = {};
}

econda.recengine.ContextCategory = function(config)
{
	var cmp = this;

	/**
	 * Category type, this is the field name of category, e.g. "productcategory", "brand"
	 * @private
	 * @property {String}
	 */
	this.type = null;	

	/**
	 * Array of category path parts
	 * @private
	 * @property {String}
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
	
	this.setType = function(type)
	{
		this.type = type;
		return this;
	};
	
	this.setId = function(id)
	{
		this.id = id;
		return this;
	};
	
	this.setVariant = function(variant)
	{
		this.variant = variant;
		return this;
	};
	
	
	/**
	 * Set path, multiple formats allowed:
	 * 
	 * Array of parts:
	 *     cat.setPath(["part1", "part2"]
	 *     
	 * Path as string:
	 *     cat.setPath({
	 *       path: "part1/part2",
	 *       delimiter: "/"
	 *     });
	 *     
	 * Path as string with default delimiter:
	 *     cat.setPath("part1/part2");
	 * 
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
