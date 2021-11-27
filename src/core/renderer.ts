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
    private stageMaxWidth = 1024;
    private stageMaxHeight = 768;
    private stageHeight = 0;
    private stageWidth = 0;
    private stageX = 0;
    private stageY = 0;
    private polgons: Array<Polygon> = [];
    static geoJsonWidth = 360;
    static geoJsonHeight = 180;
    private geoJsonRendererOption?: GeoJSONRendererOption;

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
        return this.stageMaxWidth / this.stageMaxHeight;
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
            if (this.canvas.height > this.stageMaxHeight) {
                this.stageHeight = this.stageMaxHeight;
            }
            this.stageWidth = this.stageHeight * stageRatio;
        } else {
            if (this.canvas.width > this.stageMaxWidth) {
                this.stageWidth = this.stageMaxWidth;
            }
            this.stageHeight = this.stageWidth / stageRatio;
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
    }
}
