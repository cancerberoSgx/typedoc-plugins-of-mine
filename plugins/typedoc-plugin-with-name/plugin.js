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
/**
 * This plugin will force TypeDoc to use the name declared in &#64;name annotation. For
 * example, the following class declares a an event member named `before:add-to-cart`
 * although the associated node is a method with the name `addListener`. The method
 * signature will still be used for the event, i.e. the callback function signature:
 *
 *  @example
 * ```ts
 * export interface Cart {
 *   &#47;**
 *    * Register given listener function to be notified when the user add the items to the cart
 *    * &#64;event
 *    * &#64;name before:add-to-cart
 *    * &#64;param listener accepts the items that the user had intention to add to the cart and
 *    * a promise that will be resolved when the transaction is fulfilled or rejected
 *    * otherwise. Also the listener have the possibility to asynchronously validate
 *    * the transaction yb returning a promise. If so the transaction won't start
 *    * unless the promise is resolved (could be useful to validate with third parties
 *    * providers)
 *    *&#47;
 *   addListener(listener:(items:IItem[], transaction:Promise<ITransaction>) => Promise<boolean>):void;
 * }
 * ```
 *
 */
let RespectNameTagPlugin = class RespectNameTagPlugin extends components_1.ConverterComponent {
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
        this.respectThisNames = [];
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
                .filter(tag => tag.tagName && tag.tagName.text === 'name')));
            if (tags.length) {
                const ref = reflection;
                // Heads up - if user declared more than 1 tag we take the last one
                this.respectThisNames.push({ renameTo: tags[tags.length - 1].comment, reflection });
            }
        }
    }
    /**
     * Triggered when the converter begins resolving a project. At this point all the code was parsed and
     * and now the converter is resolving reflection node
     * @param context  The context object describing the current state the converter is in.
     */
    onBeginResolve(context) {
        this.respectThisNames.forEach((item) => {
            // item.reflection.name = item.renameTo; // this should be enough
            // the following code works in case user put different names to signatures of the same method. That 
            // doesn't make any sense - but since it woks i leave the code commented
            const signatures = item.reflection.signatures || [];
            if (!signatures || !signatures.length) {
                item.reflection.name = item.renameTo;
            }
            else {
                signatures.forEach((signature) => {
                    const nameTag = signature.comment.tags.find(tag => tag.tagName === 'name');
                    if (nameTag && nameTag.text) {
                        signature.name = nameTag.text;
                    }
                });
            }
        });
    }
};
RespectNameTagPlugin = __decorate([
    components_1.Component({ name: 'respect-name-tag' })
], RespectNameTagPlugin);
exports.RespectNameTagPlugin = RespectNameTagPlugin;
// Finally we export the plugin class as a TypeDoc Plugin - this is we register it as a 
// TypeDoc component with our name 'respect-name-tag'
function default_1(pluginHost) {
    pluginHost.owner.converter.addComponent('respect-name-tag', RespectNameTagPlugin);
}
exports.default = default_1;
//# sourceMappingURL=plugin.js.map