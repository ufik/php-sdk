Ext.data.JsonP.econda_recengine_ContextCategory({"tagname":"class","name":"econda.recengine.ContextCategory","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{},"private":null,"id":"class-econda.recengine.ContextCategory","members":{"cfg":[{"name":"id","tagname":"cfg","owner":"econda.recengine.ContextCategory","meta":{},"id":"cfg-id"},{"name":"path","tagname":"cfg","owner":"econda.recengine.ContextCategory","meta":{},"id":"cfg-path"},{"name":"type","tagname":"cfg","owner":"econda.recengine.ContextCategory","meta":{},"id":"cfg-type"},{"name":"variant","tagname":"cfg","owner":"econda.recengine.ContextCategory","meta":{},"id":"cfg-variant"}],"property":[{"name":"id","tagname":"property","owner":"econda.recengine.ContextCategory","meta":{"private":true},"id":"property-id"},{"name":"path","tagname":"property","owner":"econda.recengine.ContextCategory","meta":{"private":true},"id":"property-path"},{"name":"type","tagname":"property","owner":"econda.recengine.ContextCategory","meta":{"private":true},"id":"property-type"},{"name":"variant","tagname":"property","owner":"econda.recengine.ContextCategory","meta":{"private":true},"id":"property-variant"}],"method":[{"name":"setId","tagname":"method","owner":"econda.recengine.ContextCategory","meta":{"chainable":true},"id":"method-setId"},{"name":"setPath","tagname":"method","owner":"econda.recengine.ContextCategory","meta":{"chainable":true},"id":"method-setPath"},{"name":"setType","tagname":"method","owner":"econda.recengine.ContextCategory","meta":{"chainable":true},"id":"method-setType"},{"name":"setVariant","tagname":"method","owner":"econda.recengine.ContextCategory","meta":{"chainable":true},"id":"method-setVariant"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":9,"files":[{"filename":"ContextCategory.js","href":"ContextCategory.html#econda-recengine-ContextCategory"}],"html_meta":{},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/ContextCategory.html#econda-recengine-ContextCategory' target='_blank'>ContextCategory.js</a></div></pre><div class='doc-contents'><p>Represents a category, we want to get recommendations for.\nA category mst have a type, which is in general, the field name. E.g. \"productcategory\", \"brand\", ..\nThe category itself can be identified by id (as given in import feed) or path.</p>\n\n<p>A context category is always assigned to a econda.recengine.Context object. Normally the easiest way\nis to use a category configuration in econda.recengine.Context#setCategory</p>\n\n<pre><code>myContextObject.setCategory({\n    type: 'brand',\n    path: 'my&gt;category&gt;path',\n    delimiter: '&gt;'\n});\n\nmyContextObject.setCategory(new econda.recengine.ContextCategory({\n    type: 'productcategory',\n    id: 'A142'\n}));\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-id' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='econda.recengine.ContextCategory'>econda.recengine.ContextCategory</span><br/><a href='source/ContextCategory.html#econda-recengine-ContextCategory-cfg-id' target='_blank' class='view-source'>view source</a></div><a href='#!/api/econda.recengine.ContextCategory-cfg-id' class='name not-expandable'>id</a><span> : String</span></div><div class='description'><div class='short'><p>Category id, see #setCategory for details.</p>\n</div><div class='long'><p>Category id, see #setCategory for details.</p>\n</div></div></div><div id='cfg-path' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='econda.recengine.ContextCategory'>econda.recengine.ContextCategory</span><br/><a href='source/ContextCategory.html#econda-recengine-ContextCategory-cfg-path' target='_blank' class='view-source'>view source</a></div><a href='#!/api/econda.recengine.ContextCategory-cfg-path' class='name not-expandable'>path</a><span> : Array|Object|String</span></div><div class='description'><div class='short'><p>Category path, see <a href=\"#!/api/econda.recengine.ContextCategory-method-setPath\" rel=\"econda.recengine.ContextCategory-method-setPath\" class=\"docClass\">setPath</a> for details.</p>\n</div><div class='long'><p>Category path, see <a href=\"#!/api/econda.recengine.ContextCategory-method-setPath\" rel=\"econda.recengine.ContextCategory-method-setPath\" class=\"docClass\">setPath</a> for details.</p>\n</div></div></div><div id='cfg-type' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='econda.recengine.ContextCategory'>econda.recengine.ContextCategory</span><br/><a href='source/ContextCategory.html#econda-recengine-ContextCategory-cfg-type' target='_blank' class='view-source'>view source</a></div><a href='#!/api/econda.recengine.ContextCategory-cfg-type' class='name expandable'>type</a><span> : String</span></div><div class='description'><div class='short'>Category type, this is the field name of category, e.g. ...</div><div class='long'><p>Category type, this is the field name of category, e.g. \"productcategory\", \"brand\". See <a href=\"#!/api/econda.recengine.ContextCategory-method-setType\" rel=\"econda.recengine.ContextCategory-method-setType\" class=\"docClass\">setType</a> for details.</p>\n</div></div></div><div id='cfg-variant' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='econda.recengine.ContextCategory'>econda.recengine.ContextCategory</span><br/><a href='source/ContextCategory.html#econda-recengine-ContextCategory-cfg-variant' target='_blank' class='view-source'>view source</a></div><a href='#!/api/econda.recengine.ContextCategory-cfg-variant' class='name not-expandable'>variant</a><span> : String</span></div><div class='description'><div class='short'><p>Variant key, see <a href=\"#!/api/econda.recengine.ContextCategory-method-setVariant\" rel=\"econda.recengine.ContextCategory-method-setVariant\" class=\"docClass\">setVariant</a> for details.</p>\n</div><div class='long'><p>Variant key, see <a href=\"#!/api/econda.recengine.ContextCategory-method-setVariant\" rel=\"econda.recengine.ContextCategory-method-setVariant\" class=\"docClass\">setVariant</a> for details.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-id' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='econda.recengine.ContextCategory'>econda.recengine.ContextCategory</span><br/><a href='source/ContextCategory.html#econda-recengine-ContextCategory-property-id' target='_blank' class='view-source'>view source</a></div><a href='#!/api/econda.recengine.ContextCategory-property-id' class='name not-expandable'>id</a><span> : String</span><strong class='private signature' >private</strong></div><div class='description'><div class='short'><p>Category id</p>\n</div><div class='long'><p>Category id</p>\n</div></div></div><div id='property-path' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='econda.recengine.ContextCategory'>econda.recengine.ContextCategory</span><br/><a href='source/ContextCategory.html#econda-recengine-ContextCategory-property-path' target='_blank' class='view-source'>view source</a></div><a href='#!/api/econda.recengine.ContextCategory-property-path' class='name not-expandable'>path</a><span> : Array</span><strong class='private signature' >private</strong></div><div class='description'><div class='short'><p>Array of category path parts</p>\n</div><div class='long'><p>Array of category path parts</p>\n</div></div></div><div id='property-type' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='econda.recengine.ContextCategory'>econda.recengine.ContextCategory</span><br/><a href='source/ContextCategory.html#econda-recengine-ContextCategory-property-type' target='_blank' class='view-source'>view source</a></div><a href='#!/api/econda.recengine.ContextCategory-property-type' class='name expandable'>type</a><span> : String</span><strong class='private signature' >private</strong></div><div class='description'><div class='short'>Category type, this is the field name of category, e.g. ...</div><div class='long'><p>Category type, this is the field name of category, e.g. \"productcategory\", \"brand\"</p>\n</div></div></div><div id='property-variant' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='econda.recengine.ContextCategory'>econda.recengine.ContextCategory</span><br/><a href='source/ContextCategory.html#econda-recengine-ContextCategory-property-variant' target='_blank' class='view-source'>view source</a></div><a href='#!/api/econda.recengine.ContextCategory-property-variant' class='name not-expandable'>variant</a><span> : String</span><strong class='private signature' >private</strong></div><div class='description'><div class='short'><p>Variant key</p>\n</div><div class='long'><p>Variant key</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-setId' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='econda.recengine.ContextCategory'>econda.recengine.ContextCategory</span><br/><a href='source/ContextCategory.html#econda-recengine-ContextCategory-method-setId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/econda.recengine.ContextCategory-method-setId' class='name expandable'>setId</a>( <span class='pre'>id</span> ) : <a href=\"#!/api/econda.recengine.ContextCategory\" rel=\"econda.recengine.ContextCategory\" class=\"docClass\">econda.recengine.ContextCategory</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>Set category id. ...</div><div class='long'><p>Set category id. The id must match the id given during import. This will work for \"referenced\" categories only.\nFor \"inline\" categories, we've no id, so you can't identify them by id.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/econda.recengine.ContextCategory\" rel=\"econda.recengine.ContextCategory\" class=\"docClass\">econda.recengine.ContextCategory</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setPath' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='econda.recengine.ContextCategory'>econda.recengine.ContextCategory</span><br/><a href='source/ContextCategory.html#econda-recengine-ContextCategory-method-setPath' target='_blank' class='view-source'>view source</a></div><a href='#!/api/econda.recengine.ContextCategory-method-setPath' class='name expandable'>setPath</a>( <span class='pre'>path</span> ) : <a href=\"#!/api/econda.recengine.ContextCategory\" rel=\"econda.recengine.ContextCategory\" class=\"docClass\">econda.recengine.ContextCategory</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>Set path, multiple formats allowed:\n\nArray of parts:\n\ncat.setPath([\"part1\", \"part2\"] // e.g. ...</div><div class='long'><p>Set path, multiple formats allowed:</p>\n\n<p>Array of parts:</p>\n\n<pre><code>cat.setPath([\"part1\", \"part2\"] // e.g. \"tv\", \"lcd\"\n</code></pre>\n\n<p>Path as string:</p>\n\n<pre><code>cat.setPath({\n  path: \"part1/part2\",\n  delimiter: \"/\"\n});\n</code></pre>\n\n<p>Path as string with default delimiter:</p>\n\n<pre><code>cat.setPath(\"part1/part2\");\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>path</span> : Object<div class='sub-desc'><p>return (econda.recengine.ContextCategory)</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/econda.recengine.ContextCategory\" rel=\"econda.recengine.ContextCategory\" class=\"docClass\">econda.recengine.ContextCategory</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-setType' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='econda.recengine.ContextCategory'>econda.recengine.ContextCategory</span><br/><a href='source/ContextCategory.html#econda-recengine-ContextCategory-method-setType' target='_blank' class='view-source'>view source</a></div><a href='#!/api/econda.recengine.ContextCategory-method-setType' class='name expandable'>setType</a>( <span class='pre'>type</span> ) : <a href=\"#!/api/econda.recengine.ContextCategory\" rel=\"econda.recengine.ContextCategory\" class=\"docClass\">econda.recengine.ContextCategory</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>Set category type, common examples are \"productcategory\" or \"brand\". ...</div><div class='long'><p>Set category type, common examples are \"productcategory\" or \"brand\". The type is required.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/econda.recengine.ContextCategory\" rel=\"econda.recengine.ContextCategory\" class=\"docClass\">econda.recengine.ContextCategory</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setVariant' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='econda.recengine.ContextCategory'>econda.recengine.ContextCategory</span><br/><a href='source/ContextCategory.html#econda-recengine-ContextCategory-method-setVariant' target='_blank' class='view-source'>view source</a></div><a href='#!/api/econda.recengine.ContextCategory-method-setVariant' class='name expandable'>setVariant</a>( <span class='pre'>variant</span> ) : <a href=\"#!/api/econda.recengine.ContextCategory\" rel=\"econda.recengine.ContextCategory\" class=\"docClass\">econda.recengine.ContextCategory</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>Set variant. ...</div><div class='long'><p>Set variant. This is only required if you use multiple languages.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>variant</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/econda.recengine.ContextCategory\" rel=\"econda.recengine.ContextCategory\" class=\"docClass\">econda.recengine.ContextCategory</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});