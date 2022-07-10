
import anime from 'animejs';

/**
 * @author  raizensoft.com
 */

const ROTATE_SPEED = 0.5;

/**
 * SpinningCube3D
 * @class SpinningCube3D
 */
export default class SpinningCube3D {

  size:number;
  el:HTMLDivElement;
  imgEl:HTMLImageElement;
  canvasEl:HTMLCanvasElement;
  rid:number;
  xAngle:number;
  yAngle:number;
  zAngle:number;
  scale:number;

  constructor(size:number = 400) {

    this.size = size;
    this.init();
  }

  /**
   * Init class components
   * @method init
   */
  init() {

    const el = this.el = document.querySelector('.spinning-cube');

    // Image and canvas element
    this.imgEl = document.createElement('img');
    this.imgEl.crossOrigin = 'anonymous';
    this.canvasEl = document.createElement('canvas');
    this.canvasEl.width = this.canvasEl.height = this.size;
    this.canvasEl.style.position = 'fixed';
    this.canvasEl.style.top = '50px';
    this.canvasEl.style.left = '50px';

    // Original angle
    this.xAngle = -20;
    this.yAngle = 30;
    this.zAngle = 0;
    this.scale = 1;
    this.el.style.transform = `scale(1) rotateX(-20deg) rotateY(30deg) rotateZ(0deg)`;
  }
  
  /**
   * Rotate cube by angle
   */
  rotate(x:number, y:number, z:number) {

  }

  /**
   * Load image
   */
  load(imgUrl:string) {

    anime({
      targets:this,
      scale:0.01,
      duration:1200
    });

    const ctx = this.canvasEl.getContext('2d');
    ctx!.clearRect(0, 0, this.size, this.size);

    this.imgEl.onload = () => {

      // Crop images
      const nw = this.imgEl.naturalWidth;
      const nh = this.imgEl.naturalHeight;
      let sx, sy, sw, sh;
      if (nh < nw) {
        sw = sh = nh;
        sy = 0;
        sx = (nw - nh) * 0.5;
      }
      else {
        sw = sh = nw;
        sx = 0;
        sy = (nh - nw) * 0.5;
      }
      ctx!.drawImage(this.imgEl, sx, sy, sw, sh, 0, 0, this.size, this.size);

      const cropImgUrl = this.canvasEl.toDataURL("image/png");

      // Assign image to each cube face
      for (let i = 0; i < this.el.children.length; i++) {

        const p = this.el.children[i] as HTMLDivElement;
        p.style.backgroundImage = `url(${cropImgUrl})`;
      }

      // Reset rotation
      this.xAngle = Math.floor(Math.random() * 360 - 180);
      this.yAngle = Math.floor(Math.random() * 360 - 180);
      this.zAngle = 0;
      anime.remove(this);
      anime({
        targets:this,
        scale:1,
        duration:1500
      });
    };
    this.imgEl.src = imgUrl;
  }

  startAnimate() {

    const doAnimate = () => {

      this.rid = requestAnimationFrame(doAnimate);
      this.zAngle += ROTATE_SPEED;
      this.el.style.transform = `scale(${this.scale}) rotateX(${this.xAngle}deg) rotateY(${this.yAngle}deg) rotateZ(${this.zAngle}deg)`;
    };
    doAnimate();
  }

  stopAnimate() {
    cancelAnimationFrame(this.rid);
  }
}
