[![npm version](https://badge.fury.io/js/dot-map-renderer.svg)](https://www.npmjs.com/package/dot-map-renderer)

# dot-map-renderer
<img src="./images/1.png" width="100%" />
<img src="./images/2.png" width="100%" />
<img src="./images/3.png" width="100%" />
<img src="./images/mousemove.gif" width="100%" />
<img src="./images/zoom.gif" width="100%" />

dot-map-renderer is a library that draws a point map according to the size of the screen and the enlargement of the screen.

## Environments in which to use dot-map

- Browser - chorme


## Installation
```shell
npm i dot-map-renderer
```

## Getting started

#### Webpack

##### [es](./example/es)
```shell
import {GeoJSONRenderer} from 'dot-map-renderer';

const app = new GeoJSONRenderer(document.body, {
    pixelColor: '#D3D3D3'
});
```
##### [commonjs](./example/commonjs)

#### [Download](./example/download)

#### CDN

## API

## How to build

```shell
npm run build
```