import { GeoJSONRenderer } from "./core/renderer";
import { throttle } from "./core/util";

window.onload = () => {
    const testElement = document.querySelector('#test') as HTMLElement;
    const renderer = new GeoJSONRenderer(testElement, {
        fillStyle: '#d3d3d3',
    });
    renderer.run();
    window.addEventListener('resize', throttle(renderer.run, 50));
}