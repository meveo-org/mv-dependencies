# mv-dependencies

mv-dependencies contains third party libraries that are used with the meveo frontend framework components.

## Features
* lit-element
* jsonata
* es-module-shims
* router-slot

## Quick Start

To experiment with the mv-dependencies component.

1. Clone this repo.
2. Import the js library that is needed in the component

## Sample usage

`lit-element` is best imported using `importmaps`
```html
<script defer src="{module directory}/es-module-shims.js"></script>
<script type="importmap-shim">
  {
    "imports": {
      "lit-element": "{module directory}/lit-element.js"
    }
  }
  </script>
  <script type="module-shim" src="./component-that-uses-lit-element.js"></script>
```

## Acknowledgements
Uses the following libraries:

* [lit-element](https://lit-element.polymer-project.org)
* [jsonata](http://jsonata.org)
* [es-module-shims](https://github.com/guybedford/es-module-shims)
* [router-slot](https://github.com/andreasbm/router-slot)