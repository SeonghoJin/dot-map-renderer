import geoJson from "@dot-map-renderer/map";
import { Polygon } from "@dot-map-renderer/component";
import {isPoint, Point} from "./point";
import {formatll, llToStagell} from "./util";
import {geoJsonWidth, stageRatio} from "./consts";
import {Canvas} from "@dot-map-renderer/component";
import {GeoJSONRendererOption} from "./geoJSONRendererOption";
import {DefaultAnchor} from "@dot-map-renderer/component";
import {throttle} from "./throttle";
import {DotMapController} from "@dot-map-renderer/app";

export class GeoJSONRenderer implements DotMapController {
    private readonly parent: HTMLElement;
    private readonly canvas: Canvas;
    private readonly bufferCanvas: Canvas;
    private attachingElement: HTMLElement;
    private polygons: Array<Polygon> = [];
    private stageHeight = 0;
    private stageWidth = 0;
    private stageX = 0;
    private stageY = 0;
    private option: GeoJSONRendererOption;
    private anchorPoints: Array<Point> = [];

    private zoom = 1;
    public mouseRatioX = 0;
    public mouseRatioY = 0;
    offsetX = 0;
    offsetY = 0;
    startClientX = 0;
    startClientY = 0;
    image : HTMLImageElement;

    get pixelAndGapSize() : number {
        return this.pixelSize + this.gapSize;
    }

    get pixelSize() : number {
        return Math.ceil(this.zoom) * this.option.defaultPixelSize;
    }

    get gapSize() : number {
        return Math.ceil(this.zoom) * this.option.defaultGapSize;
    }

    constructor(attachingElement : HTMLElement, geoJsonRendererOption : GeoJSONRendererOption) {
        this.loadGeoJson();
        this.attachingElement = attachingElement;
        this.canvas = new Canvas();
        this.bufferCanvas = new Canvas();
        this.parent = document.createElement('div');
        this.image = new Image(0,0);
        this.option = geoJsonRendererOption

        this.initHTML();
        this.initInteraction();

        const {width : canvasWidth, height : canvasHeight} = this.canvas.matchOffsetSize();
        const {width : stageWidth, height : stageHeight} = this.resizeStage(canvasWidth, canvasHeight);
        this.bufferCanvas.reSize(stageWidth, stageHeight);
        this.resizePolygons(stageWidth / geoJsonWidth);

        this.bufferCanvas.drawing(this.polygons);
        this.initImage(this.stageWidth, this.stageHeight, this.bufferCanvas.toDataURL());
        this.draw();
    }

    private loadGeoJson = () => {
        geoJson.features.forEach((feature) => {
            if (feature.geometry.type === 'Polygon') {
                this.polygons.push(new Polygon(0, 0, feature.geometry.coordinates[0] as Point[]));
            } else if (feature.geometry.type === 'MultiPolygon') {
                const multiPolygons = feature.geometry.coordinates;
                multiPolygons.forEach((_polygons) => {
                    this.polygons.push(new Polygon(0, 0, _polygons[0] as Array<Point>))
                })
            }
        })
    }

    private initHTML = () => {
        this.canvas.setStyleSize('100%', '100%');
        this.parent.style["overflow"] = 'auto';
        this.parent.style.width = '100%';
        this.parent.style.height = '100%';
        this.attachingElement.appendChild(this.parent);
        this.parent.appendChild(this.canvas.element);
        this.parent.style.backgroundColor = this.option.backgroundColor;
    }

    private initInteraction = () => {
        this.canvas.element.addEventListener('mousemove', this.onMouseMove);
        this.parent.addEventListener('wheel', this.onWheel, { passive: false });
        window.addEventListener('resize', throttle(this.run, 100));
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    private initImage = (width: number, height: number, dataURL: string) => {
        this.image.width = width;
        this.image.height = height;
        this.image.src = dataURL;
    }

    private resizeStage = (width: number,height: number) => {
        const clientRatio = width / height;
        this.stageWidth = width;
        this.stageHeight = height;
        if (clientRatio > stageRatio) {
            this.stageWidth = Math.round(height * stageRatio);
        } else {
            this.stageHeight = Math.round(width / stageRatio);
        }
        this.stageX = (this.canvas.element.width - this.stageWidth) / 2;
        this.stageY = (this.canvas.element.height - this.stageHeight) / 2;
        return {
            width: this.stageWidth,
            height: this.stageHeight,
        }
    }

    private resizePolygons = (ratio: number) => {
        this.polygons.forEach((polygon) => {
            polygon.resize(0, 0, ratio);
        })
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
                if(data[pixelIndex + 0] > 0 || data[pixelIndex + 1] > 0 || data[pixelIndex + 2] > 0){
                    dots.push(this.option.dotFactory.create(
                        this.stageX + x,
                        this.stageY + y,
                        this.pixelSize,
                        this.gapSize,
                        this.option.pixelColor,
                    ));
                };
            }
        }
        return dots;
    }

    run = () => {
        this.resize();
        this.draw();
    }

    resize = () => {
        this.bufferCanvas.clear();
        const {width : canvasWidth, height : canvasHeight} = this.canvas.matchOffsetSize();
        const {width : stageWidth, height : stageHeight} = this.resizeStage(canvasWidth, canvasHeight);
        this.bufferCanvas.reSize(stageWidth, stageHeight);
    }

    draw = () => {
        this.bufferCanvas.drawImage(this.image);
        this.canvas.drawing(
            this.makeDots(
                this.bufferCanvas.getImageData()
            )
        );
        this.drawAnchors();
    }

    drawAnchors = () => {
        const pencil = new DefaultAnchor();
        this.canvas.drawing((context) => {
            this.anchorPoints.forEach((point) => {
                const formattedPoint = llToStagell(formatll([point[1], point[0]]), this.stageWidth, this.stageHeight);
                pencil.draw(context, formattedPoint[0] + this.stageX, formattedPoint[1] + this.stageY);
            })
        })
    }

    move = (moveY: number, moveX: number) => {
        const [x, y] = formatll([moveX, moveY])
        const xRatio = x / 360;
        const yRatio = y / 180;
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

    addAnchors = (points: Point[] | Point) => {
        if(isPoint(points)){
            this.anchorPoints.push(points);
        }
        else {
            this.anchorPoints.push(...(points))
        };
        this.drawAnchors();
    }
}
