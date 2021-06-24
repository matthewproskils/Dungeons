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
                    x: 0,
                    y: 0,
                },
                facing: "right",
                position: 0,
                speed: 100
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
            [
                {
                    "x": 0,
                    "y": 40
                },
                {
                    "x": 0,
                    "y": 40
                },
                {
                    "x": 0,
                    "y": 40
                },
                {
                    "x": 0,
                    "y": 40
                },
                {
                    "x": 0,
                    "y": 40
                },
                {
                    "x": 0,
                    "y": 40
                },
                {
                    "x": 0,
                    "y": 40
                },
                {
                    "x": 0,
                    "y": 40
                },
                {
                    "x": 0,
                    "y": 40
                },
                {
                    "x": 0,
                    "y": 40
                }
            ]
        ];
        this.Sprites = {
            Locations: { player: "static/Meteor.png", tileMap: "static/Tilemap.png" },
            LoadedSprites: {}
        };
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
    gameFrame(timestamp) {
        if (this.GameStats.Time.Time == 0) {
            this.GameStats.Time.Time = timestamp;
        }
        else {
            this.GameStats.player.pos.x -= this.GameStats.player.speed * ((this.GameStats.Time.Time - timestamp) / 1000);
            console.log(this.GameStats.player.pos);
            this.Canvas.Ctx.clearRect(0, 0, this.Canvas.Canvas.width, this.Canvas.Canvas.height);
            this.drawTilemap();
            this.drawSprite(this.GameStats.player.pos.x, this.GameStats.player.pos.y);
            this.GameStats.Time.Time = timestamp;
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
        }
        requestAnimationFrame((t) => { this.gameFrame(t); });
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
        this.Canvas.Ctx.imageSmoothingEnabled = false;
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
        this.Canvas.Ctx.drawImage(this.Sprites.LoadedSprites.player, this.GameStats.player.position * 15, y * 15, 15, 15, Cx, Cy, this.Canvas.Tw, this.Canvas.Th);
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