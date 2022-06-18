[![npm version](https://badge.fury.io/js/dot-map-renderer.svg)](https://www.npmjs.com/package/dot-map-renderer)

# dot-map-renderer
<img src="./images/1.png" width="100%" />
<img src="./images/2.png" width="100%" />
<img src="./images/3.png" width="100%" />
<img src="./images/mousemove.gif" width="100%" />
<img src="./images/zoom.gif" width="100%" />

dot-map-renderer is a library that draws pointmaps according to screen size and screen enlargement. <br/>
dot-map-renderer is a pure project, without dependency, hence a very light library.

## Environments in which to use dot-map
- Browser - chorme

## About This Repository
dot-map-renderer uses a monorepo approach, so in addition to the dot-map-renderer NPM module, this repository contains code for a few closely related projects and some pieces of dot-map-renderer which are published as standalone modules,

- [`packages/app`](https://github.com/bigshelf/dot-map-renderer/tree/master/packages/app)
- [`packages/collider`](https://github.com/bigshelf/dot-map-renderer/tree/master/packages/collider/src)
- [`packages/component`](https://github.com/bigshelf/dot-map-renderer/tree/master/packages/component)
- [`packages/const`](https://github.com/bigshelf/dot-map-renderer/tree/master/packages/consts)
- [`packages/map`](https://github.com/bigshelf/dot-map-renderer/tree/master/packages/map)
- [`packages/renderer`](https://github.com/bigshelf/dot-map-renderer/tree/master/packages/renderer)
- [`packages/util`](https://github.com/bigshelf/dot-map-renderer/tree/master/packages/util)

## Installation

```shell
npm i @dot-map-renderer/app
```


## Getting started

### ES

```typescript
import { DotMap } from "@dot-map-renderer/app"

const $body = document.querySelector('body');

const dotMap = new DotMap({
    dotType: 'rectangular',
    backgroundColor: 'blue',
    pixelSize: 5,
    gapSize: 8,
});

dotMap.attaching($body);

const {controller} = dotMap;

controller.addAnchors([13,81]);
controller.addAnchors([13,43]);
controller.addAnchors([13,13]);
controller.addAnchors([13,30]);
```
### REACT

```typescript
import * as React from "react";
import { useEffect, useRef } from "react";
import { DotMap } from "@dot-map-renderer/app";

const dotMap = new DotMap({
  dotType: "rectangular",
  backgroundColor: "#4A4F5A",
  pixelSize: 2,
  gapSize: 2,
});

export const DotMapViewer = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current != null) {
      dotMap.attaching(ref.current);
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{
        overflow: "auto",
        backgroundColor: "#4A4F5A",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
};
```


## How to build

```shell
npm run build
```
