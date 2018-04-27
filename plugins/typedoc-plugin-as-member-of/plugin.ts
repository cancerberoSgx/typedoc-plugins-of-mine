import { Component, ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Converter } from 'typedoc/dist/lib/converter/converter';
import { Reflection, ReflectionKind } from 'typedoc/dist/lib/models/reflections/abstract';
import { Context } from 'typedoc/dist/lib/converter/context';
import { DeclarationReflection, SignatureReflection } from 'typedoc/dist/lib/models';
/**
 * 
 */
@Component({ name: 'as-member-of' })
export class DeclAsMemberOf extends ConverterComponent {
  asMemberOfPool: AsMemberOfPool[];

  initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_BEGIN]: this.onBegin,
      [Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
      [Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
    });
  }

  /**
   * Triggered when the converter begins converting a project.
   *
   * @param context  The context object describing the current state the converter is in.
   */
  private onBegin(context: Context) {
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
  private onDeclaration(context: Context, reflection: Reflection, node?) {
    if (node && node.symbol && node.jsDoc) {
      let tags = [];
      node.jsDoc.forEach(node =>
        tags = tags.concat(
          (node.tags || [])
          .filter(tag => tag.tagName && tag.tagName.text === 'asMemberOf'),
        ),
      );
      if (tags.length) {
        this.asMemberOfPool.push({ parentName: tags[tags.length - 1].comment, reflection });
      }
    }
  }

  log(msg:string, error?:Error) {
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
  private onBeginResolve(context: Context) {

    // TODO: too many casting - perhaps dangerous. Is reduced by the fact that we only accept clases or interfaces as targets
    // TODO : more defensive - we are accessing without testing 
    // TODO: should ewe call context context.registerReflection ? 
    // TODO: what about signatures ( functino overloading) ? test!

    this.asMemberOfPool.forEach((item) => {

      const target = context.project.findReflectionByName(item.parentName) as DeclarationReflection;      
      if (!target) {
        this.log(`WARNING @asMemberOf target ${item.parentName} not found.`);
        return;
      }
      const sourceReflection = (item.reflection as DeclarationReflection);
      const sourceParent = (item.reflection.parent as DeclarationReflection);

      if (!(target.kindOf(ReflectionKind.Interface) || target.kindOf(ReflectionKind.Class))) {
        this.log(`Ignoring @asMemberOf directive because target : ${item.parentName} is of unsupported type - right now only classes and interfaces declarations are allowed as target`);     // TODO: better debug message
        return;
      }

      // remove from current parent.
      sourceParent.children = sourceParent.children.filter(c => c.name !== item.reflection.name);

      // add to new parent (push)
      target.children.push(sourceReflection);

      // set the new parent
      sourceReflection.parent = target;
      
      // extra feature: if the source tag is a @event we transform it into an event if it is a a function or event or method
      const hasEventTag:boolean = !!sourceReflection.signatures.find(signature => !!signature.comment.tags.find(t => t.tagName === 'event'));
      if (hasEventTag && sourceReflection.kindOf(ReflectionKind.FunctionOrMethod)) {
        sourceReflection.kind = ReflectionKind.Event;
      }
      // TODO: we should do the same transformation if for other kinds if there is an annotation so user also have possibility for using this plugin for other things. 
    });
  }
}

interface AsMemberOfPool {
  reflection: Reflection;
  parentName: string;
}

// Finally we export the plugin class as a TypeDoc Plugin - this is we register it as a 
// TypeDoc component with our name 'respect-name-tag'
export default function (pluginHost) {
  pluginHost.owner.converter.addComponent('as-member-of', DeclAsMemberOf);
}
