import { ILayer } from './ILayer';
import { CanvasRenderer } from './CanvasRenderer';
import { Dot, Point, Polygon } from '@dot-map-renderer/component';
import { geoJsonWidth } from '@dot-map-renderer/consts';
import geoJson from '@dot-map-renderer/map';

export class DotMapLayer implements ILayer
{
    private readonly image: HTMLImageElement;
    private readonly polygons: Array<Polygon> = [];
    depth = -9999;

    constructor(
        private readonly canvasRenderer: CanvasRenderer
    )
    {
        const {
            stageWidth,
            stageHeight,
            bufferCanvas,
        } = this.canvasRenderer;

        this.loadGeoJson();
        this.resizePolygons(
            stageWidth / geoJsonWidth
        );

        bufferCanvas.drawing(this.polygons);

        const dataURL = bufferCanvas.toDataURL();

        this.image = new Image(0, 0);
        this.image.width = stageWidth;
        this.image.height = stageHeight;
        this.image.src = dataURL;
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

    private resizePolygons = (ratio: number) =>
    {
        this.polygons.forEach((polygon) =>
        {
            polygon.resize(0, 0, ratio);
        });
    };

    draw()
    {
        const {
            bufferCanvas,
            canvas
        } = this.canvasRenderer;

        bufferCanvas.drawImage(this.image);
        const imageData = bufferCanvas.getImageData();
        const dots = this.makeDots(imageData);

        canvas.drawing(dots);
    }

    private makeDots = (imgData: ImageData) =>
    {
        const {
            pixelAndGapSize,
            stageHeight,
            stageWidth,
            stageY,
            stageX,
            pixelSize,
            gapSize,
            option
        } = this.canvasRenderer;

        const { data, width, height } = imgData;
        const columns = Math.ceil(width / pixelAndGapSize);
        const rows = Math.ceil(height / pixelAndGapSize);
        const dots: Dot[] = [];

        for (let i = 0; i < rows; i++)
        {
            const y = Math.floor((i + 0.5) * pixelAndGapSize);
            const pixelY = Math.max(Math.min(y, stageHeight), 0);

            for (let j = 0; j < columns; j++)
            {
                const x = Math.floor((j + 0.5) * pixelAndGapSize);
                const pixelX = Math.max(Math.min(x, stageWidth), 0);
                const pixelIndex = (pixelX + (pixelY * stageWidth)) * 4;

                if (data[pixelIndex] > 0 || data[pixelIndex + 1] > 0 || data[pixelIndex + 2] > 0)
                {
                    dots.push(option.dotFactory.create(
                        stageX + x,
                        stageY + y,
                        pixelSize,
                        gapSize,
                        option.pixelColor,
                    ));
                }
            }
        }

        return dots;
    };
}
