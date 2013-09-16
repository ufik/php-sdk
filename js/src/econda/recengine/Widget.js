if(typeof window.econda == 'undefined') {
	window.econda = {};
	var econda = window.econda;
}
if(typeof window.econda.recengine == 'undefined') {
	econda.recengine = {};
}
/**
 * Widget configuration helper
 * @class econda.recengine.Widget
 */
econda.recengine.Widget = function(config)
{
	var cmp = this;
	
	/**
	 * HTML container element where we'll insert the widget HTML
	 * Existing content will be removed.
	 */
	this.element = null;
	
	/**
	 * Widget id as defined in cross sell management interface
	 * @var {Numeric} id
	 */
	this.id = null;
	
	/**
	 * Cross sell account id
	 * @var {String} accountId
	 */
	this.accountId = null;
	
	/**
	 * Request context
	 * @property {econda.recengine.Context} context
	 */
	this.context = null;
	
	/**
	 * Index of first product redommendation
	 * @property {Numeric} [startIndex=0]
	 */
	this.startIndex = 0;
	
	/**
	 * Number of recommendations to load
	 * @property {Numeric} [chunkSize=null]
	 */
	this.chunkSize = null;
	
	/**
	 * Uri or renderer. We'll send widget data as json encoded parameter to this renderer
	 * and replace content of widget element with response.
	 * @property {String} rendererUri
	 */
	this.rendererUri = null;

	this.setElement = function(element)
	{
		this.element = element;
	};
	
	this.setId = function(id)
	{
		this.id = id;
		return this;
	};
	
	this.setAccountId = function(accountId)
	{
		this.accountId = accountId;
		return this;
	};
	
	this.setContext = function(context)
	{
		if(context instanceof econda.recengine.Context == false) {
			context = new econda.recengine.Context(context);
		}
		
		this.context = context;
		return this;
	};
	
	this.setStartIndex = function(startIndex)
	{
		this.startIndex = startIndex;
		return this;
	};
	
	this.setChunkSize = function(chunkSize)
	{
		this.chunkSize = chunkSize;
		return this;
	};
	
	this.setRendererUri = function(rendererUri)
	{
		this.rendererUri = rendererUri;
		return this;
	};
	
	/**
	 * Creates a json string
	 */
	this.toJson = function()
	{
		var cmp = this,
			data = {},
			allowedProperties = {id: true, accountId: true, context: true, startIndex: true, chunkSize: true};
			
			
		for(var p in cmp) {
			if(typeof(allowedProperties[p]) != 'undefined' && allowedProperties[p] && cmp[p] != null) {
				data[p] = cmp[p];
			}
		}
		return window.JSON.stringify(data);
	};
	
	this.render = function()
	{
		var cmp = this,
			widgetJson;
		
		widgetJson = cmp.toJson();

		$.ajax({
			type: "GET",
			url: cmp.rendererUri,
			data: "data=" + widgetJson,
			success: function(html) {
			     $(cmp.element).html(html);
			}
		});
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
};


