# About

[TypeDoc](http://typedoc.org) plugin to 'move' declarations as members of existing classes, interfaces, objects, etc 

Example - declare event as a function outside your class / interface and use @decl-as-member-of so they appear as members of existing classes/(interfaces) 

```ts
/** a second event emitter */
interface SecondAttemptEmitter{
  /** start the engines of this emitter, probably firing a [[beforeEngineStart]] event */
  startEngines();
}
/**
 * @asMemberOf SecondAttemptEmitter
 * @event
 * @param x 
 */
declare function beforeEngineStart(engineData: {suit: string; card: number; }[]): number;
```

Because the funciont has the @event anntation the plugin will also mutate the funcion into an event besides moving it. 

# Usage

```sh
npm install --save-dev typedoc-plugin-decl-as-member-of
```

Typedoc has the ability to discover and load typedoc plugins found in node_modules. Simply install the plugin and run typedoc.
```
npm install --save typedoc-plugin-external-module-name
typedoc
```

If unsure, you can always run typedoc with `--plugin typedoc-plugin-decl-as-member-of` argument to enforce plugin's execution. 

