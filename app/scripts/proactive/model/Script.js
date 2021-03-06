define(
    [
        'backbone',
        'proactive/model/SchemaModel',
        'text!proactive/templates/script-form-template.html',
        'proactive/config'
    ],

    function (Backbone, SchemaModel, tpl, config) {

    "use strict";

    var scriptTemplate = _.template(tpl);

    return SchemaModel.extend({
        schema: {
            "Script": {
                type: "TextArea",
                fieldAttrs: {
                    'placeholder': ['code->#cdata-section', 'code->#text']},
                    template: scriptTemplate
            },
            "Or Url": {
                type: "Text",
                fieldAttrs: {'placeholder': 'file->@attributes->url',
                             "data-help":"The Url which contains the script to be executed."}
            },
            "Language": {
                type: 'Select',
                options: config.languages_available['script'],
                fieldAttrs: {
                    'placeholder': 'code->@attributes->language',
                    "data-help":"The language of the code to execute."
                }
            },
            "CatalogKind": {
                type: "Hidden"
            },
            "Or Path": {
                type: "Hidden",
                fieldAttrs: {'placeholder': 'file->@attributes->path'}
            },
            "Arguments": {
                type: 'Hidden',
                itemType: 'Text',
                fieldAttrs: {'placeholder': 'file->arguments->argument', 'itemplaceholder': '@attributes->value'}
            }
        },
        populateSchema: function (obj) {
            SchemaModel.prototype.populateSchema.call(this, obj);
            var path = this.get("Or Path");
            if (path) {
                var fileName = path.replace(/^.*[\\\/]/, '');
                this.set("Library", fileName);
            }
        }
    })
})
