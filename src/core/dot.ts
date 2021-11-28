const PI2 = Math.PI * 2;

export class Dot {
    x: number;
    y: number;
    pixelSize: number;
    red: number;
    green: number;
    blue: number;
    radius: number;
    radiusHalf: number;
    constructor(x: number, y: number, radius: number, pixelSize: number, red: number, green: number, blue: number) {
        this.x = x;
        this.y = y;
        this.pixelSize = pixelSize;
        this.radius = radius;
        this.radiusHalf = radius / 2;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    get pixelSizeHalf(): number {
        return this.pixelSize / 2;
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.red}, ${this.blue}, ${this.green})`
        ctx.fillRect(this.x - this.radiusHalf, this.y - this.radiusHalf, this.radius, this.radius)
    }

    resize = (x: number, y: number, pixelSize: number, radius: number, red: number, green: number, blue: number) => {
        this.x = x;
        this.y = y;
        this.pixelSize = pixelSize;
        this.radius = radius;
        this.radiusHalf = radius / 2;
        this.blue = blue;
        this.green = green;
        this.red = red;
    }
}