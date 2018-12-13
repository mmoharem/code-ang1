import { Injectable } from "@angular/core";
import { Graphics, Texture, Sprite } from "pixi.js";
import { Subject } from "rxjs";
import { BaseTexture } from "pixi.js";
declare var PIXI: any;

// export interface frame {
//     Sprite
// }

@Injectable({
    providedIn: 'root'
})

export class LoaderService {

    loader = PIXI.loader;
    resource;
    resources = PIXI.loader.resources;
    TextureCache = PIXI.utils.TextureCache;

    Rectangle = PIXI.Rectangle;
    Sprite = PIXI.Sprite;
    graphics: Graphics = new PIXI.Graphics();
    texture: Texture;

    frames: Sprite[] = [];
    framesEmit = new Subject();

    image: Sprite;
    imageEmit = new Subject();

    constructor() {}

    initLoader(type, src, frameName=null, framesNo=null) {

        this.loader.add(src);
        this.loader.load(() => {
            this.resource = PIXI.loader.resources[src].textures;
            this.initTexture(this.resource, frameName, framesNo, type);
        });
    }

    initTexture(resource, frameName, framesNo, type) {
        if(type === 'spriteSheet') {

            this.frames = [];
            for(let i = 0; i < framesNo; i++) {
                let frame: Sprite = new PIXI.Sprite(resource[`${frameName}${i+1}.png`]);
                this.frames.push(frame);
                //     // cir.x = 1 + (i*80);
                //     // this.container.addChild(cir);    
            }
            this.framesEmit.next(this.frames);
        } else
        if(type === 'img') {
            let img: Sprite = new PIXI.Sprite(resource);
            this.imageEmit.next(img);
        }
    }

    initImm(src) {
        const loader = PIXI.loader;
        loader.add(src);
        loader.load(() => {
            this.resource = PIXI.loader.resources[src].textures;
            let img: Sprite = new PIXI.Sprite(this.resource);
            this.imageEmit.next(img);
        });
    }

    initImage(src) {
        const image = new Image();
        image.src = src;

        const base: BaseTexture = new PIXI.BaseTexture(image);
        const texture: Texture = new PIXI.Texture(base);
        const sprite: Sprite = new PIXI.Sprite(texture);

        return sprite;
    }

    iniGraphics(x, y, r, lineCol=0, fillCol, opacity=1) {
        const graphics: Graphics = new PIXI.Graphics();
        graphics.lineStyle(lineCol);
        graphics.beginFill(fillCol, opacity);
        graphics.drawCircle(x, y, r);
        graphics.endFill();

        const texture: Texture = graphics.generateCanvasTexture();
    }

    spriteSheet() {

    }
    
}

export const ploader1 = new LoaderService();
export const ploader2 = new LoaderService();