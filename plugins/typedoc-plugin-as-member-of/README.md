# About

[TypeDoc](http://typedoc.org) plugin to 'move' declarations as members of existing classes, interfaces, objects, etc 

Example - declare event as a function outside your class / interface and use @decl-as-member-of so they appear as members of existing classes/interfaces)

```ts
/** something that moves with an engine */
interface Vehicle {
  /** start the engines of this emitter, probably firing [[beforeEngineStart]] event */
  startEngines();
}
/**
 * Event fired just before the engines of this vehicle start. 
 * @asMemberOf Vehicle
 * @event 
 */
declare function beforeEngineStart(engineData: {status: string; temp: number; }[]): number;
```

Because the function has the @event annotation the plugin will also mutate the function into an event besides moving it. 

# Output example

 * https://cancerberosgx.github.io/perplexed-wars/docs/interfaces/igameframework.html
 * https://cancerberosgx.github.io/plugin-container/interfaces/iplugincontainer.html


# Install and Usage

```sh
npm install --save-dev typedoc-plugin-as-member-of
typedoc --out out --plugin typedoc-plugin-as-member-of ./src
```
