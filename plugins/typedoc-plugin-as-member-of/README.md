[![Build Status](https://travis-ci.org/cancerberoSgx/typedoc-plugin-decl-as-member-of.png?branch=master)](https://travis-ci.org/cancerberoSgx/typedoc-plugin-decl-as-member-of) [![appveyor Build status](https://ci.appveyor.com/api/projects/status/w3ynfan159ejobkv/branch/master?svg=true)](https://ci.appveyor.com/project/cancerberoSgx/typedoc-plugin-decl-as-member-of/branch/master) [![codecov](https://codecov.io/gh/cancerberoSgx/typedoc-plugin-decl-as-member-of/branch/master/graph/badge.svg)](https://codecov.io/gh/cancerberoSgx/typedoc-plugin-decl-as-member-of/tree/master/src) [![dependencies](https://david-dm.org/cancerberosgx/typedoc-plugin-decl-as-member-of/status.svg)](https://david-dm.org/cancerberosgx/typedoc-plugin-decl-as-member-of) [![devDependencies](https://david-dm.org/cancerberosgx/typedoc-plugin-decl-as-member-of/dev-status.svg)](https://david-dm.org/cancerberosgx/typedoc-plugin-decl-as-member-of-dev#info=devDependencies)


# About

[TypeDoc](http://typedoc.org) plugin   to 'move' declarations as members of existin classes, interfaces, objects, etc 

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

