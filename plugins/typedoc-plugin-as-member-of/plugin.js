"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("typedoc/dist/lib/converter/components");
const converter_1 = require("typedoc/dist/lib/converter/converter");
const abstract_1 = require("typedoc/dist/lib/models/reflections/abstract");
/**
 *
 */
let DeclAsMemberOf = class DeclAsMemberOf extends components_1.ConverterComponent {
    initialize() {
        this.listenTo(this.owner, {
            [converter_1.Converter.EVENT_BEGIN]: this.onBegin,
            [converter_1.Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
            [converter_1.Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
        });
    }
    /**
     * Triggered when the converter begins converting a project.
     *
     * @param context  The context object describing the current state the converter is in.
     */
    onBegin(context) {
        this.asMemberOfPool = [];
    }
    /**
     * Triggered when the converter has created a declaration reflection. This happens while is parsing the code itself,
     * for example, some information, like like method signatures could not be complete yet
     *
     * @param context  The context object describing the current state the converter is in.
     * @param reflection  The reflection that is currently processed.
     * @param node  The node that is currently processed if available.
     */
    onDeclaration(context, reflection, node) {
        if (node.symbol && node.jsDoc) {
            let tags = [];
            node.jsDoc.forEach(node => tags = tags.concat((node.tags || [])
                .filter(tag => tag.tagName && tag.tagName.text === 'asMemberOf')));
            if (tags.length) {
                this.asMemberOfPool.push({ parentName: tags[tags.length - 1].comment, reflection });
            }
        }
    }
    log(msg, error) {
        console.log(msg);
        if (error) {
            console.log(error + '\n', error.stack);
        }
    }
    /**
     * Triggered when the converter begins resolving a project. At this point all the code was parsed and
     * and now the converter is resolving reflection node
     * @param context  The context object describing the current state the converter is in.
     */
    onBeginResolve(context) {
        // TODO: too many casting - perhaps dangerous. Is reduced by the fact that we only accept clases or interfaces as targets
        // TODO : more defensive - we are accessing without testing 
        // TODO: should ewe call context context.registerReflection ? 
        // TODO: what about signatures ( functino overloading) ? test!
        this.asMemberOfPool.forEach((item) => {
            const target = context.project.findReflectionByName(item.parentName);
            if (!target) {
                this.log(`WARNING @asMemberOf target ${item.parentName} not found.`);
                return;
            }
            const sourceReflection = item.reflection;
            const sourceParent = item.reflection.parent;
            if (!(target.kindOf(abstract_1.ReflectionKind.Interface) || target.kindOf(abstract_1.ReflectionKind.Class))) {
                this.log(`Ignoring @asMemberOf directive because target : ${item.parentName} is of unsupported type - right now only classes and interfaces declarations are allowed as target`); // TODO: better debug message
                return;
            }
            // remove from current parent.
            sourceParent.children = sourceParent.children.filter(c => c.name !== item.reflection.name);
            // add to new parent (push)
            target.children.push(sourceReflection);
            // set the new parent
            sourceReflection.parent = target;
            // extra feature: if the source tag is a @event we transform it into an event if it is a a function or event or method
            const hasEventTag = !!sourceReflection.signatures.find(signature => !!signature.comment.tags.find(t => t.tagName === 'event'));
            if (hasEventTag && sourceReflection.kindOf(abstract_1.ReflectionKind.FunctionOrMethod)) {
                sourceReflection.kind = abstract_1.ReflectionKind.Event;
            }
            // TODO: we should do the same transformation if for other kinds if there is an annotation so user also have possibility for using this plugin for other things. 
        });
    }
};
DeclAsMemberOf = __decorate([
    components_1.Component({ name: 'as-member-of' })
], DeclAsMemberOf);
exports.DeclAsMemberOf = DeclAsMemberOf;
// Finally we export the plugin class as a TypeDoc Plugin - this is we register it as a 
// TypeDoc component with our name 'respect-name-tag'
function default_1(pluginHost) {
    pluginHost.owner.converter.addComponent('as-member-of', DeclAsMemberOf);
}
exports.default = default_1;
//# sourceMappingURL=plugin.js.map