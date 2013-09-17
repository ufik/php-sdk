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
	 * and replace content of widget element with response. If this property is not set,
	 * we'll send a request use an cross domain ajax call.
	 * @property {String} rendererUri
	 */
	this.rendererUri = null;
	
	/**
	 * Renderer function. Used to render result of cross domain ajax call to container specified in element
	 * property
	 * @property {Function} rendererFn
	 */
	this.rendererFn = null;

	/**
	 * Set html element node, allowed is what jquery accepts.
	 * This can be a css selector or a javascript reference to a dom node (result of document.getElementBy...)
	 * @method
	 */
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
	
	this.setRendererFn = function(rendererFn)
	{
		this.rendererFn = rendererFn;
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
		if(cmp.rendererUri) {
			cmp._callRemoteRenderer();
		} else {
			cmp._getDataFromCrossSellServer({
				success: cmp._renderDataResult
			});
		}
	};
	
	/**
	 * Call defined renderer function and pass data, target element and
	 * escape helper as arguments. Replace element content if there's a
	 * return value.
	 * @private
	 * @method
	 */
	this._renderDataResult = function(data)
	{
		if(!cmp.rendererFn) {
			throw "Trying to render result but no template function set.";
		}
		// add property names as used in js api
		data.products = data.items || [];
		data.startIndex = data.start || 0;
		var html = cmp.rendererFn(data, cmp.element, econda.util.EscapeHelper);
		if(typeof(html) != 'undefined' && html) {
			$(cmp.element).html(html);
		}
	};
	

	this._getDataFromCrossSellServer = function(cfg)
	{
		var cfg = cfg || {};
		
		if(typeof(cfg) == 'undefined') {
			throw "Missing success callback configuration in getDataFromCrossSellServer.";
		}
		
		var widgetDataLoader = new econda.widgets._Widget(
		{
            "wid": cmp.id,
            "aid": cmp.accountId,
            "handleData": cfg.success
		});
		var csRequest = cmp._buildCsRequest();
		widgetDataLoader._loadData(csRequest);
	};
	
	/**
	 * Read data from widget and return cross sell request as
	 * object key => value
	 * @private
	 */
	this._buildCsRequest = function()
	{
		var ctx = cmp.context,
		    csRequest = {};
		    
		csRequest.type = 'cs';
		csRequest.start = cmp.startIndex;
		if(cmp.chunkSize) {
			csRequest.csize = cmp.chunkSize;
		}
		if(ctx.productIds) {
			csRequest.pid = window.JSON.stringify(ctx.productIds);
		}
		if(ctx.category) {
			csRequest['ctxcat.ct'] = ctx.category.type;
			if(ctx.category.id) {
				csRequest['ctxcat.id'] = ctx.category.id;
			}
			if(ctx.category.path) {
				csRequest['ctxcat.paa'] = ctx.category.path;
			}
			if(ctx.category.variant) {
				csRequest['ctxcat.pv'] = ctx.category.variant;
			}
		}
		
		return csRequest;
	};
		
	
	/**
	 * Call remote renderer as defined in rendererUri
	 * @private
	 */
	this._callRemoteRenderer = function()
	{
		var cmp = this,
		widgetJson;
	
		widgetJson = cmp.toJson();
	
		$.ajax({
			type: "POST",
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
			if(typeof(cmp[setter]) == 'undefined') {
				throw "There's no setter function for property: " + p;
			}
			cmp[setter](config[p]);
		}
	}
};


