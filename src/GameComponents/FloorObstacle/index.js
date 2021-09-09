import { images } from "../../Helpers";

class FloorObstacle {
    constructor(context, canvas){
        this.height = 32;
        this.width = 32;
        this.xVelocity = -10;
        this.context = context;
        this.canvas = canvas;
        this.x = this.canvas.width;
        this.y = this.canvas.height - this.height;
        this.sprite_image = new Image();
    }

    update(){
        this.x += this.xVelocity
        if (this.x < -this.width){
            this.x = this.canvas.width * 2
        }
    }

    display(){
        // this.sprite_image.src = images["cake_placeholder.png"].default;
        // this.context.drawImage(this.sprite_image, this.width, this.height, 20, this.y, this.width, this.height)
        this.context.fillStyle = 'red';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

}
export default FloorObstacle