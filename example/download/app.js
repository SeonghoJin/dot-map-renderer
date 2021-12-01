import './dot-map-renderer.js';

const {GeoJSONRenderer} = dot_map_renderer;

const app = new GeoJSONRenderer(document.body, {
    pixelColor: '#D3D3D3'
})
