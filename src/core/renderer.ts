import geoJson from "./geo.json";
import { Polygon } from "./polygon";
import { Point } from "./point";

export interface GeoJSONRendererOption {
    fillStyle?: string;
}

export class GeoJSONRenderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private parent: HTMLElement;
    private stageHeight = 0;
    private stageWidth = 0;
    private stageX = 0;
    private stageY = 0;
    private polgons: Array<Polygon> = [];
    static geoJsonWidth = 360;
    static geoJsonHeight = 180;
    private geoJsonRendererOption?: GeoJSONRendererOption;
    private zoom = 1;

    constructor(parent: HTMLElement, geoJsonRendererOption?: GeoJSONRendererOption) {
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.parent = parent;
        this.parent.appendChild(this.canvas);
        this.initGeojson();
        this.geoJsonRendererOption = geoJsonRendererOption;
    }

    addZoom = (zoom: number) => {
        this.zoom += zoom
        this.zoom = Math.min(Math.max(this.zoom, 1), 3);
        this.canvas.style.width = `${this.zoom * 100}%`
        this.canvas.style.height = `${this.zoom * 100}%`;
        this.run();
    };

    getCanvas = () => {
        return this.canvas;
    }

    getContext = () => {
        return this.context;
    }

    private setOption = (geoJsonRendererOption?: GeoJSONRendererOption) => {
        this.context.fillStyle = geoJsonRendererOption?.fillStyle || '#000000';
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
            this.stageWidth = this.stageHeight * stageRatio;
        } else {
            this.stageHeight = this.stageWidth / stageRatio;
        }
        this.stageX = Math.floor((this.canvas.width - this.stageWidth) / 2);
        this.stageY = Math.floor((this.canvas.height - this.stageHeight) / 2);
        this.context.strokeRect(this.stageX, this.stageY, this.stageWidth, this.stageHeight);
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
    }
}
