import { GeoJSONRenderer } from "./core/renderer";
import { debounce, throttle } from "./core/util";


window.onload = () => {
    const input1 = document.querySelector('#input_1') as HTMLInputElement;
    const input2 = document.querySelector('#input_2') as HTMLInputElement;
    const button = document.querySelector('button') as HTMLButtonElement;
    const testElement = document.querySelector('#test') as HTMLElement;


    const renderer = new GeoJSONRenderer(testElement, {
        fillStyle: '#d3d3d3',
    });
    renderer.run();
    const canvas = renderer.getCanvas();
    const context = renderer.getContext();
    window.addEventListener('resize', throttle(renderer.run, 100));

    button.addEventListener('click', () => {
        console.log(renderer.stageY);
        const xRatio = (parseInt(input1.value) + 180) / 360;
        const yRatio = (-parseInt(input2.value) + 90) / 180;
        const boundRect = canvas.getBoundingClientRect();
        const testBoundRect = testElement.getBoundingClientRect();
        const targetX = Math.floor(renderer.stageWidth * xRatio);
        const targetY = Math.floor(renderer.stageHeight * yRatio);
        context.beginPath();
        context.fillRect(targetX + renderer.stageX, targetY + renderer.stageY, 20, 20);
        targetX + renderer.stageX - testBoundRect.width / 2, targetY + renderer.stageY - testBoundRect.height / 2
        testElement.scrollTo({
            left: targetX + renderer.stageX - testBoundRect.width / 2,
            top: targetY + renderer.stageY - testBoundRect.height / 2,
            behavior: 'smooth'
        });
    })

    let mouseRatioX = 0;
    let mouseRatioY = 0;

    canvas.addEventListener('mousemove', (event: MouseEvent) => {
        const clientRect = canvas.getBoundingClientRect();
        mouseRatioX = event.offsetX / clientRect.width;
        mouseRatioY = event.offsetY / clientRect.height;
    });

    const onWheel = (event: WheelEvent) => {
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
        testElement.scrollTo(
            Math.floor(width * mouseRatioX) - (event.clientX - testElement.getBoundingClientRect().x),
            Math.floor(height * mouseRatioY) - (event.clientY - testElement.getBoundingClientRect().y),
        )
    }

    testElement.addEventListener('wheel', onWheel, { passive: false });

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

    window.addEventListener('mousedown', (event) => {
        const { clientX, clientY } = event;
        startClientX = clientX;
        startClientY = clientY;
        canvas.addEventListener('mousemove', onMoveMouse);
        canvas.classList.add('mousedown');
    })

    window.addEventListener('mouseup', (event) => {
        canvas.removeEventListener('mousemove', onMoveMouse);
        canvas.classList.remove('mousedown');
    })
}