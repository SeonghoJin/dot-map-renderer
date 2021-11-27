import { GeoJSONRenderer } from "./core/renderer";

window.onload = () => {
    const testElement = document.querySelector('#test') as HTMLElement;
    const renderer = new GeoJSONRenderer(testElement, {
        fillStyle: '#d3d3d3',
    });
    renderer.run();
    const canvas = renderer.getCanvas();
    window.addEventListener('resize', renderer.run);

    let mouseRatioX = 0;
    let mouseRatioY = 0;

    canvas.addEventListener('mousemove', (event: MouseEvent) => {
        const clientRect = canvas.getBoundingClientRect();
        mouseRatioX = event.offsetX / clientRect.width;
        mouseRatioY = event.offsetY / clientRect.height;
    });

    testElement.addEventListener('wheel', (event: WheelEvent) => {
        event.preventDefault();
        const { deltaY } = event;
        if (deltaY < 0) {
            renderer.addZoom(+0.1);
        }
        if (deltaY > 0) {
            renderer.addZoom(-0.1);
        }
        const clientRect = canvas.getBoundingClientRect();
        const { width, height } = clientRect;
        testElement.scrollLeft = width * mouseRatioX - (event.clientX - testElement.getBoundingClientRect().x);
        testElement.scrollTop = height * mouseRatioY - (event.clientY - testElement.getBoundingClientRect().y);
    }, { passive: false });


    let offsetX = 0;
    let offsetY = 0;
    let startClientX = 0;
    let startClientY = 0;

    const onMoveMouse = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        offsetX = startClientX - clientX;
        offsetY = startClientY - clientY;
        testElement.scrollBy({
            top: offsetY,
            left: offsetX,
        });
        startClientX = clientX;
        startClientY = clientY;
    }

    canvas.addEventListener('mousedown', (event) => {
        const { clientX, clientY } = event;
        startClientX = clientX;
        startClientY = clientY;
        canvas.addEventListener('mousemove', onMoveMouse);
        canvas.classList.add('mousedown');
    })

    canvas.addEventListener('mouseup', (event) => {
        canvas.removeEventListener('mousemove', onMoveMouse);
        canvas.classList.remove('mousedown');
    })
}