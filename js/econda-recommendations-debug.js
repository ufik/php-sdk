if(typeof window.econda == "undefined") {
  var econda = window.econda = {}
}
econda.debug = {enabled:false, setEnabled:function(enabled) {
  this.enabled = enabled;
  return this
}, getEnabled:function() {
  return this.enabled
}, error:function() {
  var data = [];
  for(var n = 1;n < arguments.length;n++) {
    data.push(arguments[n])
  }
  if(this.enabled && typeof console != "undefined" && console.error) {
    console.error(arguments[0], data)
  }
  return this
}, warn:function() {
  var data = [];
  for(var n = 1;n < arguments.length;n++) {
    data.push(arguments[n])
  }
  if(this.enabled && typeof console != "undefined" && console.warn) {
    console.warn(arguments[0], data)
  }
  return this
}, log:function() {
  var data = [];
  for(var n = 1;n < arguments.length;n++) {
    data.push(arguments[n])
  }
  if(this.enabled && typeof console != "undefined" && console.log) {
    console.log(arguments[0], data)
  }
  return this
}};
if(typeof window.econda == "undefined") {
  window.econda = {};
  var econda = window.econda
}
if(typeof window.econda.util == "undefined") {
  econda.util = {}
}
econda.util.EscapeHelper = {entityMap:{"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;", "/":"&#x2F;"}, html:function(text) {
  return String(text).replace(/[&<>"'\/]/g, function(s) {
    return util.EscapeHelper.entityMap[s]
  })
}};
if(typeof window.econda == "undefined") {
  window.econda = {};
  var econda = window.econda
}
if(typeof window.econda.recengine == "undefined") {
  econda.recengine = {}
}
econda.recengine.ContextCategory = function(config) {
  var cmp = this;
  this.type = null;
  this.path = null;
  this.id = null;
  this.variant = null;
  this.setType = function(type) {
    this.type = type;
    return this
  };
  this.setId = function(id) {
    this.id = id;
    return this
  };
  this.setVariant = function(variant) {
    this.variant = variant;
    return this
  };
  this.setPath = function(path) {
    if(typeof path == "string") {
      path = {"path":path, "delimiter":"/"}
    }
    if(typeof path == "object" && typeof path.path != "undefined") {
      if(typeof path.delimiter == "undefined") {
        path.delimiter = "/"
      }
      path = path.path.split(path.delimiter)
    }
    this.path = path;
    return this
  };
  if(typeof config != "undefined") {
    if(typeof config != "object") {
      throw"Invalid config object given for recommencation widget.";
    }
    for(var p in config) {
      var setter = "set" + p.charAt(0).toUpperCase() + p.slice(1);
      cmp[setter](config[p])
    }
  }
};
if(typeof window.econda == "undefined") {
  window.econda = {};
  var econda = window.econda
}
if(typeof window.econda.recengine == "undefined") {
  econda.recengine = {}
}
econda.recengine.Context = function(config) {
  var cmp = this;
  this.productIds = null;
  this.category = null;
  this.setProductIds = function(productIds) {
    if(productIds instanceof Array == false) {
      productIds = [productIds]
    }
    this.productIds = productIds;
    return this
  };
  this.setCategory = function(category) {
    if(category instanceof econda.recengine.ContextCategory == false) {
      category = new econda.recengine.ContextCategory(category)
    }
    this.category = category;
    return this
  };
  if(typeof config != "undefined") {
    if(typeof config != "object") {
      throw"Invalid config object given for recommencation widget.";
    }
    for(var p in config) {
      var setter = "set" + p.charAt(0).toUpperCase() + p.slice(1);
      cmp[setter](config[p])
    }
  }
};
if(typeof window.econda == "undefined") {
  window.econda = {};
  var econda = window.econda
}
if(typeof window.econda.recengine == "undefined") {
  econda.recengine = {}
}
econda.recengine.Widget = function(config) {
  var cmp = this;
  this.element = null;
  this.id = null;
  this.accountId = null;
  this.context = null;
  this.startIndex = 0;
  this.chunkSize = null;
  this.rendererUri = null;
  this.rendererFn = null;
  this.setElement = function(element) {
    this.element = element;
    return this
  };
  this.setId = function(id) {
    this.id = id;
    return this
  };
  this.setAccountId = function(accountId) {
    this.accountId = accountId;
    return this
  };
  this.setContext = function(context) {
    if(context instanceof econda.recengine.Context == false) {
      context = new econda.recengine.Context(context)
    }
    this.context = context;
    return this
  };
  this.setStartIndex = function(startIndex) {
    this.startIndex = startIndex;
    return this
  };
  this.setChunkSize = function(chunkSize) {
    this.chunkSize = chunkSize;
    return this
  };
  this.setRendererUri = function(rendererUri) {
    this.rendererUri = rendererUri;
    return this
  };
  this.setRendererFn = function(rendererFn) {
    this.rendererFn = rendererFn;
    return this
  };
  this.toJson = function() {
    var cmp = this, data = {}, allowedProperties = {id:true, accountId:true, context:true, startIndex:true, chunkSize:true};
    for(var p in cmp) {
      if(typeof allowedProperties[p] != "undefined" && allowedProperties[p] && cmp[p] != null) {
        data[p] = cmp[p]
      }
    }
    return window.JSON.stringify(data)
  };
  this.render = function() {
    if(cmp.rendererUri) {
      cmp._callRemoteRenderer()
    }else {
      cmp._getDataFromCrossSellServer({success:cmp._renderDataResult})
    }
  };
  this._renderDataResult = function(data) {
    if(!cmp.rendererFn) {
      throw"Trying to render result but no template function set.";
    }
    if(typeof data == "undefined") {
      data = {}
    }
    if(typeof data.products == "undefined") {
      data.products = data.items || []
    }
    if(typeof data.startIndex) {
      data.startIndex = data.start || 0
    }
    var html = cmp.rendererFn(data, cmp.element, econda.util.EscapeHelper);
    if(typeof html != "undefined" && html) {
      $(cmp.element).html(html)
    }
  };
  this._getDataFromCrossSellServer = function(cfg) {
    var cfg = cfg || {};
    if(typeof cfg == "undefined") {
      throw"Missing success callback configuration in getDataFromCrossSellServer.";
    }
    var widgetDataLoader = new econda.widgets._Widget({"wid":cmp.id, "aid":cmp.accountId, "handleData":cfg.success});
    var csRequest = cmp._buildCsRequest();
    widgetDataLoader._loadData(csRequest)
  };
  this._buildCsRequest = function() {
    var ctx = cmp.context, csRequest = {};
    csRequest.type = "cs";
    csRequest.start = cmp.startIndex;
    if(cmp.chunkSize) {
      csRequest.csize = cmp.chunkSize
    }
    if(ctx.productIds) {
      csRequest.pid = window.JSON.stringify(ctx.productIds)
    }
    if(ctx.category) {
      csRequest["ctxcat.ct"] = ctx.category.type;
      if(ctx.category.id) {
        csRequest["ctxcat.id"] = ctx.category.id
      }
      if(ctx.category.path) {
        csRequest["ctxcat.paa"] = ctx.category.path
      }
      if(ctx.category.variant) {
        csRequest["ctxcat.pv"] = ctx.category.variant
      }
    }
    return csRequest
  };
  this._callRemoteRenderer = function() {
    var cmp = this, widgetJson;
    widgetJson = cmp.toJson();
    $.ajax({type:"POST", url:cmp.rendererUri, data:"data=" + widgetJson, success:function(html) {
      if(cmp.rendererFn) {
        cmp._renderDataResult(html)
      }else {
        $(cmp.element).html(html)
      }
    }})
  };
  if(typeof config != "undefined") {
    if(typeof config != "object") {
      throw"Invalid config object given for recommendation widget.";
    }
    for(var p in config) {
      var setter = "set" + p.charAt(0).toUpperCase() + p.slice(1);
      if(typeof cmp[setter] == "undefined") {
        throw"There's no setter function for property: " + p;
      }
      cmp[setter](config[p])
    }
  }
};
econda.recengine.Widget.init = function() {
  if(typeof window.csWidgets == "object") {
    var csWidgets = window.csWidgets;
    if(csWidgets instanceof Array == false) {
      csWidgets = [csWidgets]
    }
    for(var n = 0;n < csWidgets.length;n++) {
      if(csWidgets[n] instanceof econda.recengine.Widget == false) {
        csWidgets[n] = new econda.recengine.Widget(csWidgets[n]);
        csWidgets[n].render()
      }
    }
  }
};
$(document).ready(econda.recengine.Widget.init);

