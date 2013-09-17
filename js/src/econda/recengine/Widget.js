if(typeof window.econda == 'undefined') {
	window.econda = {};
	var econda = window.econda;
}
if(typeof window.econda.recengine == 'undefined') {
	econda.recengine = {};
}
/**
 * Cross sell widget
 *
 * The following example shows a browser only implementation of a widget. If you are looking for a server side rendering, check #setRendererUri.
 *
 *     <div id="ecRecommendationsContainer">Loading...</div>
 *     <script type="text/javascript">
 *        var myTemplates = {};
 *
 *        // Renderer function for horizontal widgets.
 *        myTemplates.horizontal = function(data, element, esc) {
 *            var products = data.products;
 *
 *            var header = [
 *              '<div class="widgetContainer">',
 *               '<div>Recommendations Title</div>',
 *               '<ul class="productsContainer">'
 *            ];
 *
 *            var recs = [];
 *            for(var i=0; i<products.length; i++) {
 *                  var p = products[i];
 *                  recs.push('<li>' + esc.html(p.id) + '</li>');
 *            }
 *
 *            var footer = ['</ul></div>'];
 *
 *            var html = header.concat(recs, footer);
 *            return html.join('');
 *        };
 *
  *        // Setup widget, load data and render using defined rendering function
  *        var widget = new econda.recengine.Widget({
 *            element: document.getElementById('ecRecommendationsContainer'),
 *            rendererFn: myTemplates.horizontal,
 *            accountId: '00000cec-d98025a8-912b-46a4-a57d-7a691ba7a376-1',
 *            id: 6,
 *            context: {
 *                productIds: ['prodId1', 'prodId2'],
 *                category: {
 *                    type: 'brand',
 *                    path: 'econda'
 *                }
 *            }
 *        });
 *        widget.render();
 *     </script>
 *
 * @class econda.recengine.Widget
 */
econda.recengine.Widget = function(config)
{
	var cmp = this;

    /**
     * HTML container element where we'll insert the widget HTML
     * @cfg element
     */
    /**
     * Widget id as defined in cross sell management interface
     * @cfg {Number} id
     */
    /**
     * Uri of renderer. We'll send widget data as json encoded parameter to this renderer
     * and replace content of widget element with response. If this property is not set,
     * we'll send a request use an cross domain ajax call.
     * @cfg {String} rendererUri
     */
    /**
     * Cross sell account id
     * @cfg {String} accountId
     */
    /**
     * Request context
     * @cfg {econda.recengine.Context} context
     */
    /**
     * Index of first product redommendation
     * @cfg {Number} startIndex
     */
    /**
     * Number of recommendations to load
     * @cfg {Number} chunkSize
     */
    /**
     * Uri or renderer. We'll send widget data as json encoded parameter to this renderer
     * and replace content of widget element with response. If this property is not set,
     * we'll send a request use an cross domain ajax call.
     * @cfg {Function} rendererFn
     */

	/**
	 * HTML container element where we'll insert the widget HTML
	 * Existing content will be removed.
     * @property element
     * @private
	 */
	this.element = null;
	
	/**
	 * Widget id as defined in cross sell management interface
	 * @property {Number} id
     * @private
	 */
	this.id = null;
	
	/**
	 * Cross sell account id
	 * @property {String} accountId
     * @private
	 */
	this.accountId = null;
	
	/**
	 * Request context
	 * @property {Object|econda.recengine.Context} context
     * @private
	 */
	this.context = null;
	
	/**
	 * Index of first product redommendation
	 * @property {Number} [startIndex=0]
     * @private
	 */
	this.startIndex = 0;
	
	/**
	 * Number of recommendations to load
	 * @property {Number} [chunkSize=null]
     * @private
	 */
	this.chunkSize = null;
	
	/**
	 * Uri or renderer. We'll send widget data as json encoded parameter to this renderer
	 * and replace content of widget element with response. If this property is not set,
	 * we'll send a request use an cross domain ajax call.
	 * @property {String} rendererUri
     * @private
	 */
	this.rendererUri = null;
	
	/**
	 * Renderer function. Used to render result of cross domain ajax call to container specified in element
	 * property
	 * @property {Function} rendererFn
     * @private
	 */
	this.rendererFn = null;

	/**
	 * Set html element node, allowed is what jquery accepts.
	 * This can be a css selector or a javascript reference to a dom node (result of document.getElementBy...)
     * @param {String|HTMLElement} element
	 * @method
     * @return econda.recengine.Widget
	 */
	this.setElement = function(element)
	{
		this.element = element;
        return this;
	};

    /**
     * Widget id as defined in cross sell management interface.
     *
     * @param {Number} id
     * @returns econda.recengine.Widget
     */
	this.setId = function(id)
	{
		this.id = id;
		return this;
	};

    /**
     * Cross sell account id
     * @param {String} accountId
     * @returns {econda.recengine.Widget}
     */
	this.setAccountId = function(accountId)
	{
		this.accountId = accountId;
		return this;
	};

    /**
     * Set request context (that's what we want to get recommendations for). See econda.recengine.Context for details.
     *
     * @param {Object|econda.recengine.Context} context
     * @returns {econda.recengine.Widget}
     */
	this.setContext = function(context)
	{
		if(context instanceof econda.recengine.Context == false) {
			context = new econda.recengine.Context(context);
		}
		
		this.context = context;
		return this;
	};

    /**
     * Index of first result. Used for paging widgets.
     * @param {Number} startIndex
     * @returns {econda.recengine.Widget}
     */
	this.setStartIndex = function(startIndex)
	{
		this.startIndex = startIndex;
		return this;
	};

    /**
     * Chunk size is the maximum number of results the recommendation service may return.
     *
     * @param {Number|null} chunkSize
     * @returns {econda.recengine.Widget}
     */
	this.setChunkSize = function(chunkSize)
	{
		this.chunkSize = chunkSize;
		return this;
	};

    /**
     * Uri on shop server where we'll send the widget configuration to. Response will be written
     * to #element html container.
     *
     * @param {String} rendererUri
     * @returns {econda.recengine.Widget}
     */
	this.setRendererUri = function(rendererUri)
	{
		this.rendererUri = rendererUri;
		return this;
	};

    /**
     * A function we'll pass the recommendations to and use the return value as html for #element.
     *
     * Renderer function has the following parameters:
     * <ul>
     *     <li>data: Recommendation server response as javascript object.</li>
     *     <li>element: Element as given in #setElement</li>
     *     <li>esc: Escape helper econda.util.EscapeHelper</li>
     * </ul>
     *
     * @param rendererFn
     * @returns {econda.recengine.Widget}
     */
	this.setRendererFn = function(rendererFn)
	{
		this.rendererFn = rendererFn;
		return this;
	};
		
	
	/**
	 * Creates a json string from widget configuration
     * @return {String}
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

    /**
     * Render widget.
     *
     * <ul>
     *     <li>If #rendererUri is set: Send widget configuration as json string to given uri
     *         and write result to html element specified in #element</li>
     *     <li>Else: Send request to cross sell server from javascript and render result using renderer
     *         function given in #rendererFn</li>
     * </ul>
     */
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

    /**
     * @param {Object} cfg
     * @private
     */
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


