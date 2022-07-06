import geoJson from '@dot-map-renderer/map';
import { Polygon, Point, Canvas, Dot } from '@dot-map-renderer/component';
import { geoJsonWidth, stageRatio } from '@dot-map-renderer/consts';
import { throttle } from '@dot-map-renderer/util';
import { IRendererOption } from './IRendererOption';
import { IRenderer } from './IRenderer';
import { RendererContext } from './RendererContext';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';

export class CanvasRenderer implements IRenderer
{
    private readonly bufferCanvas: Canvas;
    private readonly polygons: Array<Polygon> = [];
    private attachingElement: HTMLElement;
    readonly canvas: Canvas;
    readonly parent: HTMLElement;
    components: Array<IComponent> = [];
    option: IRendererOption;
    stageHeight = 0;
    stageWidth = 0;
    stageX = 0;
    stageY = 0;
    image: HTMLImageElement;
    zoom = 1;

    get pixelAndGapSize(): number
    {
        return this.pixelSize + this.gapSize;
    }

    get pixelSize(): number
    {
        return Math.ceil(this.zoom) * this.option.pixelSize;
    }

    get gapSize(): number
    {
        return Math.ceil(this.zoom) * this.option.gapSize;
    }

    get canvasOffsetWidth()
    {
        return this.canvas.offsetWidth;
    }

    get canvasOffsetHeight()
    {
        return this.canvas.offsetHeight;
    }

    constructor(attachingElement: HTMLElement, geoJsonRendererOption: IRendererOption)
    {
        this.loadGeoJson();
        this.attachingElement = attachingElement;
        this.canvas = new Canvas();
        this.bufferCanvas = new Canvas();
        this.parent = document.createElement('div');
        this.image = new Image(0, 0);
        this.option = geoJsonRendererOption;

        this.initHTML();
        this.initInteraction();
        this.resize();
        this.resizePolygons(
            this.stageWidth / geoJsonWidth
        );

        this.bufferCanvas.drawing(this.polygons);
        this.initImage(
            this.stageWidth,
            this.stageHeight,
            this.bufferCanvas.toDataURL()
        );

        this.draw();
    }

    private loadGeoJson = () =>
    {
        geoJson.features.forEach((feature) =>
        {
            if (feature.geometry.type === 'Polygon')
            {
                this.polygons.push(new Polygon(0, 0, feature.geometry.coordinates[0] as Point[]));
            }
            else if (feature.geometry.type === 'MultiPolygon')
            {
                const multiPolygons = feature.geometry.coordinates;

                multiPolygons.forEach((_polygons) =>
                {
                    this.polygons.push(new Polygon(0, 0, _polygons[0] as Array<Point>));
                });
            }
        });
    };

    private initHTML = () =>
    {
        this.canvas.setStyleSize('100%', '100%');
        this.parent.style.overflow = 'auto';
        this.parent.style.width = '100%';
        this.parent.style.height = '100%';
        this.attachingElement.appendChild(this.parent);
        this.parent.appendChild(this.canvas.element);
        this.parent.style.backgroundColor = this.option.backgroundColor;
    };

    private initInteraction = () =>
    {
        window.addEventListener('resize', throttle(this.run, 100));
    };

    private initImage = (width: number, height: number, dataURL: string) =>
    {
        this.image.width = width;
        this.image.height = height;
        this.image.src = dataURL;
    };

    private resizeStage = (width: number, height: number) =>
    {
        const clientRatio = width / height;

        this.stageWidth = width;
        this.stageHeight = height;
        if (clientRatio > stageRatio)
        {
            this.stageWidth = Math.round(height * stageRatio);
        }
        else
        {
            this.stageHeight = Math.round(width / stageRatio);
        }
        this.stageX = (this.canvas.element.width - this.stageWidth) / 2;
        this.stageY = (this.canvas.element.height - this.stageHeight) / 2;
    };

    private resizePolygons = (ratio: number) =>
    {
        this.polygons.forEach((polygon) =>
        {
            polygon.resize(0, 0, ratio);
        });
    };

    private makeDots = (imgData: ImageData) =>
    {
        const { data, width, height } = imgData;
        const columns = Math.ceil(width / this.pixelAndGapSize);
        const rows = Math.ceil(height / this.pixelAndGapSize);
        const dots: Dot[] = [];

        for (let i = 0; i < rows; i++)
        {
            const y = Math.floor((i + 0.5) * this.pixelAndGapSize);
            const pixelY = Math.max(Math.min(y, this.stageHeight), 0);

            for (let j = 0; j < columns; j++)
            {
                const x = Math.floor((j + 0.5) * this.pixelAndGapSize);
                const pixelX = Math.max(Math.min(x, this.stageWidth), 0);
                const pixelIndex = (pixelX + (pixelY * this.stageWidth)) * 4;

                if (data[pixelIndex] > 0 || data[pixelIndex + 1] > 0 || data[pixelIndex + 2] > 0)
                {
                    dots.push(this.option.dotFactory.create(
                        this.stageX + x,
                        this.stageY + y,
                        this.pixelSize,
                        this.gapSize,
                        this.option.pixelColor,
                    ));
                }
            }
        }

        return dots;
    };

    public run = () =>
    {
        this.resize();
        this.draw();
    };

    resize = () =>
    {
        this.bufferCanvas.clear();
        this.canvas.matchOffsetSize();
        this.resizeStage(
            this.canvasOffsetWidth,
            this.canvasOffsetHeight
        );
        this.bufferCanvas.reSize(
            this.stageWidth,
            this.stageHeight
        );
        this.components.forEach((component) =>
        {
            component.resize(this);
        });
    };

    draw = () =>
    {
        this.drawDotMaps();
        this.drawComponents();
    };

    drawDotMaps = () =>
    {
        this.bufferCanvas.drawImage(this.image);
        const imageData = this.bufferCanvas.getImageData();
        const dots = this.makeDots(imageData);

        this.canvas.drawing(dots);
    };

    drawComponents = () =>
    {
        this.canvas.drawing(this.components);
    };

    public getContext = (): RendererContext => this;
}
