if(typeof window.econda == 'undefined') {
	window.econda = {};
	var econda = window.econda;
}
if(typeof window.econda.recengine == 'undefined') {
	econda.recengine = {};
}

/**
 * Request context, e.g. the product we want to get recommendations for
 * @class econda.recengine.Context
 */
econda.recengine.Context = function(config)
{
	var cmp = this;
	
	/**
	 * Array of product ids
	 */
	this.productIds = null;

	/**
	 * Product category to get recommendations for
	 */
	this.category = null;

	/**
	 * Array of string with product ids
	 */
	this.setProductIds = function(productIds)
	{
		this.productIds = productIds;
	};
	
	/**
	 * Set category, see {econda.recengine.ContextCategory} for details
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
