# About

[TypeDoc](http://typedoc.org) plugin   to 'move' declarations as members of existing classes, interfaces, objects, etc 

Example - declare event / event handlers as external functions and use @decl-as-member-of so they appear as members of existing classes/(interfaces) 

```ts
/**
 * a second event emitter
 */
interface SecondAttemptEmitter{
  startEngines();
}
/**
 * @decl-as-member-of SecondAttemptEmitter
 * @param x 
 */
declare function beforeEngineStart(engineData: {suit: string; card: number; }[]): number;

```ts

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

