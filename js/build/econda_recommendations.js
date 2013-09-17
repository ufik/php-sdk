if(typeof JSON !== "object") {
  JSON = {}
}
(function() {
  function f(n) {
    return n < 10 ? "0" + n : n
  }
  if(typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function() {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    };
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
      return this.valueOf()
    }
  }
  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b":"\\b", "\t":"\\t", "\n":"\\n", "\f":"\\f", "\r":"\\r", '"':'\\"', "\\":"\\\\"}, rep;
  function quote(string) {
    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
      var c = meta[a];
      return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    }) + '"' : '"' + string + '"'
  }
  function str(key, holder) {
    var i, k, v, length, mind = gap, partial, value = holder[key];
    if(value && (typeof value === "object" && typeof value.toJSON === "function")) {
      value = value.toJSON(key)
    }
    if(typeof rep === "function") {
      value = rep.call(holder, key, value)
    }
    switch(typeof value) {
      case "string":
        return quote(value);
      case "number":
        return isFinite(value) ? String(value) : "null";
      case "boolean":
      ;
      case "null":
        return String(value);
      case "object":
        if(!value) {
          return"null"
        }
        gap += indent;
        partial = [];
        if(Object.prototype.toString.apply(value) === "[object Array]") {
          length = value.length;
          for(i = 0;i < length;i += 1) {
            partial[i] = str(i, value) || "null"
          }
          v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
          gap = mind;
          return v
        }
        if(rep && typeof rep === "object") {
          length = rep.length;
          for(i = 0;i < length;i += 1) {
            if(typeof rep[i] === "string") {
              k = rep[i];
              v = str(k, value);
              if(v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v)
              }
            }
          }
        }else {
          for(k in value) {
            if(Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if(v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v)
              }
            }
          }
        }
        v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
        gap = mind;
        return v
    }
  }
  if(typeof JSON.stringify !== "function") {
    JSON.stringify = function(value, replacer, space) {
      var i;
      gap = "";
      indent = "";
      if(typeof space === "number") {
        for(i = 0;i < space;i += 1) {
          indent += " "
        }
      }else {
        if(typeof space === "string") {
          indent = space
        }
      }
      rep = replacer;
      if(replacer && (typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number"))) {
        throw new Error("JSON.stringify");
      }
      return str("", {"":value})
    }
  }
  if(typeof JSON.parse !== "function") {
    JSON.parse = function(text, reviver) {
      var j;
      function walk(holder, key) {
        var k, v, value = holder[key];
        if(value && typeof value === "object") {
          for(k in value) {
            if(Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if(v !== undefined) {
                value[k] = v
              }else {
                delete value[k]
              }
            }
          }
        }
        return reviver.call(holder, key, value)
      }
      text = String(text);
      cx.lastIndex = 0;
      if(cx.test(text)) {
        text = text.replace(cx, function(a) {
          return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        })
      }
      if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
        j = eval("(" + text + ")");
        return typeof reviver === "function" ? walk({"":j}, "") : j
      }
      throw new SyntaxError("JSON.parse");
    }
  }
})();
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
econda.recengine.Context = function(config) {
  var cmp = this;
  this.productIds = null;
  this.category = null;
  this.setProductIds = function(productIds) {
    this.productIds = productIds
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
    this.element = element
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
      if(typeof allowedProperties[p] != "undefined" && (allowedProperties[p] && cmp[p] != null)) {
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
    data.products = data.items || [];
    data.startIndex = data.start || 0;
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
      $(cmp.element).html(html)
    }})
  };
  if(typeof config != "undefined") {
    if(typeof config != "object") {
      throw"Invalid config object given for recommencation widget.";
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

