"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasRenderer = void 0;
const map_1 = __importDefault(require("@dot-map-renderer/map"));
const component_1 = require("@dot-map-renderer/component");
const consts_1 = require("@dot-map-renderer/consts");
const util_1 = require("@dot-map-renderer/util");
class CanvasRenderer {
    constructor(attachingElement, geoJsonRendererOption) {
        this.polygons = [];
        this.components = [];
        this.stageHeight = 0;
        this.stageWidth = 0;
        this.stageX = 0;
        this.stageY = 0;
        this.zoom = 1;
        this.loadGeoJson = () => {
            map_1.default.features.forEach((feature) => {
                if (feature.geometry.type === 'Polygon') {
                    this.polygons.push(new component_1.Polygon(0, 0, feature.geometry.coordinates[0]));
                }
                else if (feature.geometry.type === 'MultiPolygon') {
                    const multiPolygons = feature.geometry.coordinates;
                    multiPolygons.forEach((_polygons) => {
                        this.polygons.push(new component_1.Polygon(0, 0, _polygons[0]));
                    });
                }
            });
        };
        this.initHTML = () => {
            this.canvas.setStyleSize('100%', '100%');
            this.parent.style.overflow = 'auto';
            this.parent.style.width = '100%';
            this.parent.style.height = '100%';
            this.attachingElement.appendChild(this.parent);
            this.parent.appendChild(this.canvas.element);
            this.parent.style.backgroundColor = this.option.backgroundColor;
        };
        this.initInteraction = () => {
            window.addEventListener('resize', (0, util_1.throttle)(this.run, 100));
        };
        this.initImage = (width, height, dataURL) => {
            this.image.width = width;
            this.image.height = height;
            this.image.src = dataURL;
        };
        this.resizeStage = (width, height) => {
            const clientRatio = width / height;
            this.stageWidth = width;
            this.stageHeight = height;
            if (clientRatio > consts_1.stageRatio) {
                this.stageWidth = Math.round(height * consts_1.stageRatio);
            }
            else {
                this.stageHeight = Math.round(width / consts_1.stageRatio);
            }
            this.stageX = (this.canvas.element.width - this.stageWidth) / 2;
            this.stageY = (this.canvas.element.height - this.stageHeight) / 2;
        };
        this.resizePolygons = (ratio) => {
            this.polygons.forEach((polygon) => {
                polygon.resize(0, 0, ratio);
            });
        };
        this.makeDots = (imgData) => {
            const { data, width, height } = imgData;
            const columns = Math.ceil(width / this.pixelAndGapSize);
            const rows = Math.ceil(height / this.pixelAndGapSize);
            const dots = [];
            for (let i = 0; i < rows; i++) {
                const y = Math.floor((i + 0.5) * this.pixelAndGapSize);
                const pixelY = Math.max(Math.min(y, this.stageHeight), 0);
                for (let j = 0; j < columns; j++) {
                    const x = Math.floor((j + 0.5) * this.pixelAndGapSize);
                    const pixelX = Math.max(Math.min(x, this.stageWidth), 0);
                    const pixelIndex = (pixelX + (pixelY * this.stageWidth)) * 4;
                    if (data[pixelIndex] > 0 || data[pixelIndex + 1] > 0 || data[pixelIndex + 2] > 0) {
                        dots.push(this.option.dotFactory.create(this.stageX + x, this.stageY + y, this.pixelSize, this.gapSize, this.option.pixelColor));
                    }
                }
            }
            return dots;
        };
        this.run = () => {
            this.resize();
            this.draw();
        };
        this.resize = () => {
            this.bufferCanvas.clear();
            this.canvas.matchOffsetSize();
            this.resizeStage(this.canvasOffsetWidth, this.canvasOffsetHeight);
            this.bufferCanvas.reSize(this.stageWidth, this.stageHeight);
        };
        this.draw = () => {
            this.drawDotMaps();
            this.drawComponents();
        };
        this.drawDotMaps = () => {
            this.bufferCanvas.drawImage(this.image);
            const imageData = this.bufferCanvas.getImageData();
            const dots = this.makeDots(imageData);
            this.canvas.drawing(dots);
        };
        this.drawComponents = () => {
            this.canvas.drawing(this.components);
        };
        this.getContext = () => this;
        this.loadGeoJson();
        this.attachingElement = attachingElement;
        this.canvas = new component_1.Canvas();
        this.bufferCanvas = new component_1.Canvas();
        this.parent = document.createElement('div');
        this.image = new Image(0, 0);
        this.option = geoJsonRendererOption;
        this.initHTML();
        this.initInteraction();
        this.resize();
        this.resizePolygons(this.stageWidth / consts_1.geoJsonWidth);
        this.bufferCanvas.drawing(this.polygons);
        this.initImage(this.stageWidth, this.stageHeight, this.bufferCanvas.toDataURL());
        this.draw();
    }
    get pixelAndGapSize() {
        return this.pixelSize + this.gapSize;
    }
    get pixelSize() {
        return Math.ceil(this.zoom) * this.option.pixelSize;
    }
    get gapSize() {
        return Math.ceil(this.zoom) * this.option.gapSize;
    }
    get canvasOffsetWidth() {
        return this.canvas.offsetWidth;
    }
    get canvasOffsetHeight() {
        return this.canvas.offsetHeight;
    }
}
exports.CanvasRenderer = CanvasRenderer;
//# sourceMappingURL=CanvasRenderer.js.map