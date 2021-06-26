import loadImages from "../util/loadImg.js";
export default class levelOne {
    constructor() {
        this.Canvas = {
            Tw: 0,
            Th: 0,
            OriginalCanvas: document.getElementById("dungeons-game"),
            Canvas: document.getElementById("dungeons-game"),
            Ctx: document.getElementById("dungeons-game").getContext("2d"),
        };
        this.GameStats = {
            player: {
                pos: {
                    x: 1,
                    y: 1,
                },
                width: 1,
                height: 1,
                facing: "right",
                position: 0,
                speed: 1
            },
            tilemap: {
                tiles: [
                    [
                        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                    ]
                ],
                tileStats: {
                    width: 10,
                    height: 10
                },
                width: 15,
                height: 10
            },
            Time: {
                LastFrameAnimation: 0,
                Time: 0
            }
        };
        this.collisionBoundaries = [
            { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 }, { x: 0, y: 9 }, { x: 0, y: 10 }, { x: 0, y: 11 }, { x: 0, y: 12 }, { x: 0, y: 13 }, { x: 0, y: 14 }, { x: 1, y: 0 }, { x: 1, y: 14 }, { x: 2, y: 0 }, { x: 2, y: 14 }, { x: 3, y: 0 }, { x: 3, y: 14 }, { x: 4, y: 0 }, { x: 4, y: 14 }, { x: 5, y: 0 }, { x: 5, y: 14 }, { x: 6, y: 0 }, { x: 6, y: 14 }, { x: 7, y: 0 }, { x: 7, y: 14 }, { x: 8, y: 0 }, { x: 8, y: 14 }, { x: 9, y: 0 }, { x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 }, { x: 9, y: 8 }, { x: 9, y: 9 }, { x: 9, y: 10 }, { x: 9, y: 11 }, { x: 9, y: 12 }, { x: 9, y: 13 }, { x: 9, y: 14 }
        ];
        this.Sprites = {
            Locations: { player: "static/Meteor.png", tileMap: "static/Tilemap.png" },
            LoadedSprites: {}
        };
        window.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp") {
                this.GameStats.player.facing = "up";
            }
            else if (e.key == "ArrowDown") {
                this.GameStats.player.facing = "down";
            }
            else if (e.key == "ArrowRight") {
                this.GameStats.player.facing = "right";
            }
            else if (e.key == "ArrowLeft") {
                this.GameStats.player.facing = "left";
            }
        });
    }
    async init() {
        //Stretch Canvas
        this.resizeCanvas();
        window.onresize = () => { this.resizeCanvas(); };
        //Write "Loading Images"
        this.Canvas.Ctx.font = `${this.Canvas.Canvas.height / 4}px 'VT323'`;
        this.Canvas.Ctx.textAlign = "center";
        this.Canvas.Ctx.fillText("Loading Images...", this.Canvas.Canvas.width / 2, this.Canvas.Canvas.height / 2);
        //Wait for images to load
        this.Sprites.LoadedSprites = await loadImages(this.Sprites.Locations);
        requestAnimationFrame((t) => { this.gameFrame(t); });
    }
    setVars() {
        this.GameStats = {
            player: {
                pos: {
                    x: 1,
                    y: 1,
                },
                width: 1,
                height: 1,
                facing: "right",
                position: 0,
                speed: 1
            },
            tilemap: {
                tiles: [
                    [
                        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,
                    ],
                    [
                        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                    ]
                ],
                tileStats: {
                    width: 10,
                    height: 10
                },
                width: 15,
                height: 10
            },
            Time: {
                LastFrameAnimation: 0,
                Time: 0
            }
        };
        //Stretch Canvas
        this.resizeCanvas();
        window.onresize = () => { this.resizeCanvas(); };
        requestAnimationFrame((t) => { this.gameFrame(t); });
    }
    gameFrame(timestamp) {
        if (this.GameStats.Time.Time == 0) {
            this.GameStats.Time.Time = timestamp;
            requestAnimationFrame((t) => { this.gameFrame(t); });
        }
        else {
            this.Canvas.Ctx.clearRect(0, 0, this.Canvas.Canvas.width, this.Canvas.Canvas.height);
            this.drawTilemap();
            this.drawSprite(this.GameStats.player.pos.x, this.GameStats.player.pos.y);
            let x = this.movement(timestamp);
            this.GameStats.Time.Time = timestamp;
            if (!x) {
                requestAnimationFrame((t) => { this.gameFrame(t); });
            }
            else {
                alert("Ur Dead. We're restarting");
                this.setVars();
            }
        }
    }
    resizeCanvas() {
        if (window.innerWidth / (this.Canvas.OriginalCanvas.width / this.Canvas.Canvas.height) <= window.innerHeight) {
            //Canvas.w / Window.w * Window.h= Canvas.height / 
            let aspectRatio = this.Canvas.OriginalCanvas.width / this.Canvas.OriginalCanvas.height;
            this.Canvas.Canvas.width = window.innerWidth;
            this.Canvas.Canvas.height = window.innerWidth / aspectRatio;
        }
        else {
            let aspectRatio = this.Canvas.Canvas.height / this.Canvas.OriginalCanvas.width;
            this.Canvas.Canvas.height = window.innerHeight;
            this.Canvas.Canvas.width = window.innerHeight / aspectRatio;
        }
        this.Canvas.Tw = this.Canvas.Canvas.width / 15;
        this.Canvas.Th = this.Canvas.Canvas.height / 10;
        //@ts-ignore
        this.Canvas.Ctx.mozImageSmoothingEnabled = false;
        //@ts-ignore
        this.Canvas.Ctx.webkitImageSmoothingEnabled = false;
        //@ts-ignore
        this.Canvas.Ctx.msImageSmoothingEnabled = false;
        this.Canvas.Ctx.imageSmoothingEnabled = false;
        //Set Speed
        this.GameStats.player.speed = 5 / (Math.round((window.outerWidth / window.innerWidth) * 100) * 0.01);
    }
    drawSprite(Cx, Cy) {
        let y = 0;
        switch (this.GameStats.player.facing) {
            case "up":
                y = 0;
                break;
            case "down":
                y = 1;
                break;
            case "left":
                y = 2;
                break;
            case "right":
                y = 3;
                break;
        }
        this.Canvas.Ctx.drawImage(this.Sprites.LoadedSprites.player, this.GameStats.player.position * 15, y * 15, 15, 15, Cx * this.Canvas.Tw, Cy * this.Canvas.Th, this.Canvas.Tw, this.Canvas.Th);
    }
    movement(timestamp) {
        if (this.GameStats.player.facing == "right") {
            this.GameStats.player.pos.x += this.GameStats.player.speed * ((timestamp - this.GameStats.Time.Time) / 1000);
        }
        else if (this.GameStats.player.facing == "left") {
            this.GameStats.player.pos.x -= this.GameStats.player.speed * ((timestamp - this.GameStats.Time.Time) / 1000);
        }
        else if (this.GameStats.player.facing == "down") {
            this.GameStats.player.pos.y += this.GameStats.player.speed * ((timestamp - this.GameStats.Time.Time) / 1000);
        }
        else if (this.GameStats.player.facing == "up") {
            this.GameStats.player.pos.y -= this.GameStats.player.speed * ((timestamp - this.GameStats.Time.Time) / 1000);
        }
        if (!this.collisionList({ x: this.GameStats.player.pos.x, y: this.GameStats.player.pos.y, width: this.GameStats.player.width, height: this.GameStats.player.height }, this.collisionBoundaries.map(e => {
            return { width: 1, height: 1, x: e.y, y: e.x };
        }))) {
            if (this.GameStats.Time.LastFrameAnimation == 0) {
                this.GameStats.player.position == 2 ? this.GameStats.player.position = 0 : this.GameStats.player.position++;
                this.GameStats.Time.LastFrameAnimation++;
            }
            else if (this.GameStats.Time.LastFrameAnimation == 5) {
                this.GameStats.Time.LastFrameAnimation = 0;
            }
            else {
                this.GameStats.Time.LastFrameAnimation++;
            }
            return false;
        }
        else {
            return true;
        }
    }
    collision(obj1, obj2) {
        if (obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y) {
            return true;
        }
        else {
            return false;
        }
    }
    collisionList(obj, list) {
        let isCollision = false;
        let collided = false;
        for (let i = 0; i < list.length; i++) {
            if (this.collision(obj, list[i])) {
                collided = true;
                break;
            }
        }
        return collided;
    }
    drawTilemap() {
        this.Canvas.Ctx.clearRect(0, 0, this.Canvas.Canvas.width, this.Canvas.Canvas.height);
        for (let i = 0; i < this.GameStats.tilemap.tiles.length; i++) {
            for (let j = 0; j < this.GameStats.tilemap.tiles[i].length; j++) {
                let imageStats = this.imageStats(this.GameStats.tilemap.tiles[i][j]);
                this.Canvas.Ctx.drawImage(this.Sprites.LoadedSprites.tileMap, imageStats.x * 10, imageStats.y * 10, 10, 10, j * this.Canvas.Tw, i * this.Canvas.Th, this.Canvas.Tw, this.Canvas.Th);
            }
        }
    }
    imageStats(Num) {
        return { x: Num - (Math.floor(Num / 4) * 4) - 1, y: Math.floor(Num / 4) };
    }
}
//# sourceMappingURL=one.js.map