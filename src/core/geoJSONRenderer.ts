import geoJson from "./geo.json";
import { Polygon } from "./component/polygon";
import { Point } from "./interfaces/point";
import { Dot } from "./interfaces/dot";
import { throttle } from "./util";
import {geoJsonWidth, stageRatio} from "./consts";
import {Canvas} from "./component/canvas";
import {RectDot} from "./component/dot/rectDot";
import {GeoJSONRendererOption} from "./interfaces/GeoJSONRendererOption";

export class GeoJSONRenderer {
    private importedParent: HTMLElement;
    private canvas: Canvas;
    private memoryCanvas: Canvas;
    private geoJsonRendererOption: Required<GeoJSONRendererOption>;
    private parent: HTMLElement;
    public stageHeight = 0;
    public stageWidth = 0;
    public stageX = 0;
    public stageY = 0;
    private polygons: Array<Polygon> = [];
    private zoom = 1;
    private dots: Array<Dot> = [];
    public mouseRatioX = 0;
    public mouseRatioY = 0;
    offsetX = 0;
    offsetY = 0;
    startClientX = 0;
    startClientY = 0;

    get getGeoJsonRatio() : number  {
        return this.stageWidth / geoJsonWidth;
    }

    get pixelAndGapSize() : number {
        return this.pixelSize + this.gapSize;
    }

    get pixelSize() : number {
        return Math.ceil(this.zoom) * this.geoJsonRendererOption.defaultPixelSize;
    }

    get gapSize() : number {
        return Math.ceil(this.zoom) * this.geoJsonRendererOption.defaultGapSize;
    }

    constructor(importedParent: HTMLElement, geoJsonRendererOption?: GeoJSONRendererOption) {
        this.loadGeoJson();
        this.canvas = new Canvas();
        this.memoryCanvas = new Canvas();
        this.parent = document.createElement('div');
        this.importedParent = importedParent;
        this.geoJsonRendererOption = {
            pixelColor : geoJsonRendererOption?.pixelColor ?? '#D3D3D3',
            backgroundColor : geoJsonRendererOption?.backgroundColor ?? '#000000',
            defaultGapSize: geoJsonRendererOption?.defaultGapSize ?? 1,
            defaultPixelSize: geoJsonRendererOption?.defaultPixelSize ?? 4,
        };
        this.initHTML();
        this.initInteraction();
        this.run();
    }

    private initHTML = () => {
        this.canvas.setStyleSize('100%', '100%');
        this.parent.style["overflow"] = 'auto';
        this.parent.style.width = '100%';
        this.parent.style.height = '100%';
        this.importedParent.appendChild(this.parent);
        this.parent.appendChild(this.canvas.element);
        this.parent.style.backgroundColor = this.geoJsonRendererOption.backgroundColor;
    }

    private initInteraction = () => {
        this.canvas.element.addEventListener('mousemove', this.onMouseMove);
        this.parent.addEventListener('wheel', this.onWheel, { passive: false });
        window.addEventListener('resize', throttle(this.run, 100));
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    private loadGeoJson = () => {
        geoJson.features.forEach((feature) => {
            if (feature.geometry.type === 'Polygon') {
                this.polygons.push(new Polygon(this.stageX, this.stageY, this.getGeoJsonRatio, feature.geometry.coordinates[0] as Point[]));
            } else if (feature.geometry.type === 'MultiPolygon') {
                const multiPolygons = feature.geometry.coordinates;
                multiPolygons.forEach((_polgons) => {
                    this.polygons.push(new Polygon(this.stageX, this.stageY, this.getGeoJsonRatio, _polgons[0] as Array<Point>))
                })
            }
        })
    }

    resize = () => {
        this.canvas.matchOffsetSize();
        this.memoryCanvas.reSize(this.canvas.element.offsetWidth, this.canvas.element.offsetHeight);
        const clientRatio = this.canvas.element.width / this.canvas.element.height;
        this.stageWidth = this.canvas.element.width;
        this.stageHeight = this.canvas.element.height;
        if (clientRatio > stageRatio) {
            this.stageWidth = Math.round(this.canvas.element.height * stageRatio);
        } else {
            this.stageHeight = Math.round(this.canvas.element.width / stageRatio);
        }
        this.stageX = (this.canvas.element.width - this.stageWidth) / 2;
        this.stageY = (this.canvas.element.height - this.stageHeight) / 2;
        const geoJsonRatio = this.getGeoJsonRatio;
        this.polygons.forEach((polygon) => {
            polygon.resize(this.stageX, this.stageY, geoJsonRatio);
        })
    }

    private drawingPolygons = (canvas: Canvas, polygons: Polygon[], color: string) => {
        canvas.context.fillStyle = color;
        canvas.drawing(polygons)
    }

    private drawingDots = (canvas: Canvas, dots: Dot[]) => {
        canvas.drawing(dots);
    }

    private makeDots = (imgData : ImageData) => {
        const {data, width, height} = imgData;
        const columns = Math.ceil(width / this.pixelAndGapSize);
        const rows = Math.ceil(height / this.pixelAndGapSize);
        const dots = [];
        for (let i = 0; i < rows; i++) {
            const y = Math.floor((i + 0.5) * this.pixelAndGapSize);
            const pixelY = Math.max(Math.min(y, this.stageHeight), 0);
            for (let j = 0; j < columns; j++) {
                const x = Math.floor((j + 0.5) * this.pixelAndGapSize);
                const pixelX = Math.max(Math.min(x, this.stageWidth), 0);
                const pixelIndex = (pixelX + pixelY * this.stageWidth) * 4;
                if(data[pixelIndex + 0] === undefined || data[pixelIndex + 1] === undefined || data[pixelIndex + 2] == undefined)continue;
                if(data[pixelIndex + 0] === 0 || data[pixelIndex + 1] === 0 || data[pixelIndex + 2] === 0)continue;
                const red = data[pixelIndex + 0];
                const green = data[pixelIndex + 1];
                const blue = data[pixelIndex + 2];
                const dot = new RectDot(this.stageX + x, this.stageY + y, this.pixelSize, this.gapSize, red, green, blue);
                dots.push(dot);
            }
        }
        return dots;
    }

    run = () => {
        this.resize();
        this.drawingPolygons(this.memoryCanvas, this.polygons, this.geoJsonRendererOption.pixelColor);
        this.drawingDots(this.canvas, this.makeDots(
            this.memoryCanvas.getImageData(this.stageX, this.stageY, this.stageWidth, this.stageHeight)
        ));
    }

    move = (moveY: number, moveX: number) => {
        const xRatio = (moveX + 180) / 360;
        const yRatio = (-moveY + 90) / 180;
        const testBoundRect = this.parent.getBoundingClientRect();
        const targetX = Math.floor(this.stageWidth * xRatio);
        const targetY = Math.floor(this.stageHeight * yRatio);
        this.canvas.context.beginPath();
        this.parent.scrollTo({
            left: targetX + this.stageX - testBoundRect.width / 2,
            top: targetY + this.stageY - testBoundRect.height / 2,
            behavior: 'smooth'
        });
    }

    onMouseMove = (event: MouseEvent) => {
        const clientRect = this.canvas.element.getBoundingClientRect();
        this.mouseRatioX = event.offsetX / clientRect.width;
        this.mouseRatioY = event.offsetY / clientRect.height;
    }

    onWheel = (event: WheelEvent) => {
        event.preventDefault();
        const { deltaY } = event;
        if (deltaY < 0) {
            this.addZoom(+0.1);
        }
        if (deltaY > 0) {
            this.addZoom(-0.1);
        }
        const clientRect = this.canvas.element.getBoundingClientRect();
        const { width, height } = clientRect;
        this.parent.scrollTo(
            Math.floor(width * this.mouseRatioX) - (event.clientX - this.parent.getBoundingClientRect().x),
            Math.floor(height * this.mouseRatioY) - (event.clientY - this.parent.getBoundingClientRect().y),
        )
    }

    onMoveMouse = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        this.offsetX = this.startClientX - clientX;
        this.offsetY = this.startClientY - clientY;
        this.parent.scrollBy({
            top: this.offsetY,
            left: this.offsetX,
        });
        this.startClientX = clientX;
        this.startClientY = clientY;
    }

    onMouseDown = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        this.startClientX = clientX;
        this.startClientY = clientY;
        this.canvas.element.style['cursor'] = 'grab';
        this.canvas.element.addEventListener('mousemove', this.onMoveMouse);
    }

    onMouseUp = (event: MouseEvent) => {
        this.canvas.element.removeEventListener('mousemove', this.onMoveMouse);
        this.canvas.element.style['cursor'] = '';
    }

    addZoom = (zoom: number) => {
        this.zoom += zoom
        this.zoom = Math.min(Math.max(this.zoom, 1), 3);
        this.canvas.setStyleSize(`${this.zoom * 100}%`, `${this.zoom * 100}%`);
        this.run();
    };
}
