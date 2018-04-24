[![Build Status](https://travis-ci.org/cancerberoSgx/typedoc-plugin-respect-name-tag.png?branch=master)](https://travis-ci.org/cancerberoSgx/typedoc-plugin-respect-name-tag) [![appveyor Build status](https://ci.appveyor.com/api/projects/status/w3ynfan159ejobkv/branch/master?svg=true)](https://ci.appveyor.com/project/cancerberoSgx/typedoc-plugin-respect-name-tag/branch/master) [![codecov](https://codecov.io/gh/cancerberoSgx/typedoc-plugin-respect-name-tag/branch/master/graph/badge.svg)](https://codecov.io/gh/cancerberoSgx/typedoc-plugin-respect-name-tag/tree/master/src) [![dependencies](https://david-dm.org/cancerberosgx/typedoc-plugin-respect-name-tag/status.svg)](https://david-dm.org/cancerberosgx/typedoc-plugin-respect-name-tag) [![devDependencies](https://david-dm.org/cancerberosgx/typedoc-plugin-respect-name-tag/dev-status.svg)](https://david-dm.org/cancerberosgx/typedoc-plugin-respect-name-tag-dev#info=devDependencies)


# About

[TypeDoc](http://typedoc.org) plugin to enforce the use of the `@name` tag to 
declare entity names. 

Any entity with a jsDoc comment containing a `@name` tag with a valid value
will be named like that by TypeDoc instead of using the original entity name. 

For example, the following class declares a an event member which, thanks to this 
plugin will be named `before:add-to-cart`. Without this plugin TypeDoc will name 
the event like the method, `addListener`. The method signature will still be used 
for the event, the only thing that change is its name. 

```ts
export interface Cart {
  /**
   * Register given listener function to be notified when the user add the items to the cart 
   * @event
   * @name before:add-to-cart
   * @param listener accepts the items that the user had intention to add to the cart and 
   * a promise that will be resolved when the transaction is fulfilled or rejected 
   * otherwise. Also the listener have the possibility to asynchronously validate 
   * the transaction yb returning a promise. If so the transaction won't start 
   * unless the promise is resolved (could be useful to validate with third parties 
   * providers)
   */
  addListener(listener:(items:IItem[], transaction:Promise<ITransaction>) => Promise<boolean>):void;
}
```

# Usage

```sh
npm install --save-dev typedoc-plugin-respect-name-tag
```

Typedoc has the ability to discover and load typedoc plugins found in node_modules. Simply install the plugin and run typedoc.
```
npm install --save typedoc-plugin-external-module-name
typedoc
```

If unsure, you can always run typedoc with `--plugin typedoc-plugin-respect-name-tag` argument to enforce plugin's execution. 


# TODO: 

 * test not only for events but for clases, properties, etc
 * validate @name's value - should be valid ts identifier. 


##Ideas for typedoc extensions tutorials

1) implement @ignore - will ignore that comment

2) synthetic @events: 

 * when i put @event in a method like on() is not good  because I will loose that method. Also in general you on() method is oevrloaede a lot  so all events appear stacked in the same "parent" (as signatures) and with the method name. is ugly althouhg easy and you have the callback signature right there

 "this proposal is about creating new synthetic nodes ()