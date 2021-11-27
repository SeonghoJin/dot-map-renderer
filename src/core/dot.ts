const PI2 = Math.PI * 2;

export class Dot {
    x: number;
    y: number;
    pixelSize: number;
    red: number;
    green: number;
    blue: number;
    radius: number;
    constructor(x: number, y: number, radius: number, pixelSize: number, red: number, green: number, blue: number) {
        this.x = x;
        this.y = y;
        this.pixelSize = pixelSize;
        this.radius = radius;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    get pixelSizeHalf(): number {
        return this.pixelSize / 2;
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.clearRect(
            this.x - this.pixelSizeHalf,
            this.y - this.pixelSizeHalf,
            this.pixelSize, this.pixelSize,
        )

        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.red}, ${this.blue}, ${this.green})`
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
        ctx.fill();
    }

    resize = (x: number, y: number, pixelSize: number, radius: number, red: number, green: number, blue: number) => {
        this.x = x;
        this.y = y;
        this.pixelSize = pixelSize;
        this.radius = radius;
        this.blue = blue;
        this.green = green;
        this.red = red;
    }
}