import geoJson from "./geo.json";
import { Polygon } from "./polygon";
import { Point } from "./point";
import { Dot } from "./dot";
import { throttle } from "./util";

export interface GeoJSONRendererOption {
    fillStyle?: string;
}

export class GeoJSONRenderer {
    private importedParent: HTMLElement;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private parent: HTMLElement;
    public stageHeight = 0;
    public stageWidth = 0;
    public stageX = 0;
    public stageY = 0;
    private polgons: Array<Polygon> = [];
    static geoJsonWidth = 360;
    static geoJsonHeight = 180;
    private geoJsonRendererOption?: GeoJSONRendererOption;
    private zoom = 1;
    private FixedPixelSize = 4;
    private FixedRadius = 2;
    private pixelSize = this.FixedPixelSize;
    private radius = this.FixedRadius;
    private dots: Array<Dot> = [];
    public mouseRatioX = 0;
    public mouseRatioY = 0;
    offsetX = 0;
    offsetY = 0;
    startClientX = 0;
    startClientY = 0;

    constructor(importedParent: HTMLElement, geoJsonRendererOption?: GeoJSONRendererOption) {
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.importedParent = importedParent;
        this.parent = document.createElement('div');
        this.parent.style["overflow"] = 'auto';
        this.parent.style.width = '100%';
        this.parent.style.height = '100%';
        this.importedParent.appendChild(this.parent);
        this.parent.appendChild(this.canvas);
        this.initGeojson();
        this.geoJsonRendererOption = geoJsonRendererOption;

        this.canvas.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('resize', throttle(this.run, 100));
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.onMouseUp);
        this.parent.addEventListener('wheel', this.onWheel, { passive: false });
        this.run();
    }

    addZoom = (zoom: number) => {
        this.zoom += zoom
        this.zoom = Math.min(Math.max(this.zoom, 1), 3);
        this.canvas.style.width = `${this.zoom * 100}%`
        this.canvas.style.height = `${this.zoom * 100}%`;
        this.pixelSize = this.FixedPixelSize * Math.floor(this.zoom);
        this.radius = this.FixedRadius * Math.floor(this.zoom);
        this.run();
    };

    getCanvas = () => {
        return this.canvas;
    }

    getContext = () => {
        return this.context;
    }

    private setOption = (geoJsonRendererOption?: GeoJSONRendererOption) => {
        this.context.fillStyle = geoJsonRendererOption?.fillStyle || '#D3D3D3';
    }

    private initGeojson = () => {
        geoJson.features.forEach((feature) => {
            if (feature.geometry.type === 'Polygon') {
                this.polgons.push(new Polygon(this.stageX, this.stageY, this.getGeoJsonRatio(), feature.geometry.coordinates[0] as Point[]));
            } else if (feature.geometry.type === 'MultiPolygon') {
                const multiPolygons = feature.geometry.coordinates;
                multiPolygons.forEach((_polgons) => {
                    this.polgons.push(new Polygon(this.stageX, this.stageY, this.getGeoJsonRatio(), _polgons[0] as Array<Point>))
                })
            }
        })
    }

    private getStageRatio = () => {
        return 4 / 3;
    }

    private getGeoJsonRatio = () => {
        return this.stageWidth / GeoJSONRenderer.geoJsonWidth;
    }

    private resize = () => {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        const clientRatio = this.canvas.width / this.canvas.height;
        const stageRatio = this.getStageRatio();
        this.stageWidth = this.canvas.width;
        this.stageHeight = this.canvas.height;
        if (clientRatio > stageRatio) {
            this.stageWidth = Math.floor(this.stageHeight * stageRatio);
        } else {
            this.stageHeight = Math.floor(this.stageWidth / stageRatio);
        }
        this.stageX = Math.floor((this.canvas.width - this.stageWidth) / 2);
        this.stageY = Math.floor((this.canvas.height - this.stageHeight) / 2);
        const geoJsonRatio = this.getGeoJsonRatio();

        this.polgons.forEach((polygon) => {
            polygon.resize(this.stageX, this.stageY, geoJsonRatio);
        })

    }

    private draw = () => {
        this.setOption(this.geoJsonRendererOption);
        this.polgons.forEach((polygon) => polygon.draw(this.context));
    }

    run = () => {
        this.resize();
        this.draw();
        this.dots = [];
        const imgData = this.context.getImageData(this.stageX, this.stageY, this.stageWidth, this.stageHeight);

        const columns = Math.ceil(this.stageWidth / this.pixelSize);
        const rows = Math.ceil(this.stageHeight / this.pixelSize)
        const data = imgData.data;
        for (let i = 0; i < rows; i++) {
            const y = Math.floor((i + 0.5) * this.pixelSize);
            const pixelY = Math.max(Math.min(y, this.stageHeight), 0);
            for (let j = 0; j < columns; j++) {
                const x = Math.floor((j + 0.5) * this.pixelSize);
                const pixelX = Math.max(Math.min(x, this.stageWidth), 0);
                const pixelIndex = (pixelX + pixelY * this.stageWidth) * 4;
                if (data[pixelIndex + 0] === undefined || data[pixelIndex + 0] === 0) { continue; }
                const red = data[pixelIndex + 0];
                const green = data[pixelIndex + 1];
                const blue = data[pixelIndex + 2];
                const dot = new Dot(this.stageX + x, this.stageY + y, this.radius, this.pixelSize, red, green, blue)
                this.dots.push(dot);
            }
        }

        this.context.clearRect(this.stageX, this.stageY, this.stageWidth, this.stageHeight);
        this.dots.forEach((dot) => {
            dot.draw(this.context);
        })
    }

    move = (moveX: number, moveY: number) => {
        const xRatio = (moveX + 180) / 360;
        const yRatio = (moveY + 90) / 180;
        const testBoundRect = this.parent.getBoundingClientRect();
        const targetX = Math.floor(this.stageWidth * xRatio);
        const targetY = Math.floor(this.stageHeight * yRatio);
        this.context.beginPath();
        this.context.fillRect(targetX + this.stageX, targetY + this.stageY, 20, 20);
        targetX + this.stageX - testBoundRect.width / 2, targetY + this.stageY - testBoundRect.height / 2
        this.parent.scrollTo({
            left: targetX + this.stageX - testBoundRect.width / 2,
            top: targetY + this.stageY - testBoundRect.height / 2,
            behavior: 'smooth'
        });
    }

    onMouseMove = (event: MouseEvent) => {
        const clientRect = this.canvas.getBoundingClientRect();
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
        const clientRect = this.canvas.getBoundingClientRect();
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
        this.canvas.style['cursor'] = 'grab';
        this.canvas.addEventListener('mousemove', this.onMoveMouse);
    }

    onMouseUp = (event: MouseEvent) => {
        this.canvas.removeEventListener('mousemove', this.onMoveMouse);
        this.canvas.style['cursor'] = '';
    }
}
