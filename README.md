# About
my typedoc plugins some are really useful, others just learning / research projects

# Install and generate all the docs

```sh
yarn 
yarn run-all doc
```

Note with `yarn run-all X` you run X command in all yarn workspaces, for example, 

```sh
yarn run-all test
```


# TODO: things I don't know how to do, yet

## typedoc

 * "this method trigger the event foo of that class". can do it in jsdoc but not in typedoc

*
    // TODO: IDEA: what if we biuld a event emitter with generics that doesn't 
    // extends node event emitter but just delegate the methods to a property???