if(typeof window.econda == 'undefined') {
	window.econda = {};
	var econda = window.econda;
}
if(typeof window.econda.recengine == 'undefined') {
	econda.recengine = {};
}

/**
 * Request context, e.g. the product we want to get recommendations for.
 * @class econda.recengine.Context
 */
econda.recengine.Context = function(config)
{
	var cmp = this;

    /**
     * Array of product ids or String containing a single product id.
     * @cfg {String|Array} productIds
     */
    /**
     * Category, see #setCategory for details.
     * @cfg {String|Array|Object|econda.recengine.ContextCategory} category
     */

	/**
	 * Array of product ids
     * @property {Array} productIds
     * @private
	 */
	this.productIds = null;

	/**
	 * Product category to get recommendations for
     * @property {econda.recengine.ContextCategory} category
     * @private
	 */
	this.category = null;

	/**
	 * Array of string with product ids
     * @param {Array|String} productIds
     * return {econda.recengine.Context}
	 */
	this.setProductIds = function(productIds)
	{
        if(productIds instanceof Array == false) {
            productIds = [productIds];
        }
        this.productIds = productIds;
        return this;
	};
	
	/**
	 * Set category, see econda.recengine.ContextCategory for details
     *
     * @param {Object|String|econda.recengine.ContextCategory} category
     * @return {econda.recengine.Context}
	 */
	this.setCategory = function(category)
	{
		if(category instanceof econda.recengine.ContextCategory == false) {
			category = new econda.recengine.ContextCategory(category);
		}
		this.category = category;
		return this;
	};

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
