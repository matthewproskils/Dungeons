import loadImages from "../util/loadImg.js";
import util from "../util/loadImg.js";

interface Sprite {
  x: number,
  y: number,
  width: number,
  height: number,
}

// function lalist(tiles) {
//   let arr = []
//   for (let i = 0; i < tiles.length; i++) {
//     for (let j = 0; j < tiles[i].length; j++) {
//       if (tiles[i][j] != 5) {
//         arr.push({ x: i, y: j })
//       }
//     }
//   }
// }


export default class levelOne {
  Canvas = {
    Tw: 0,
    Th: 0,
    OriginalCanvas: <HTMLCanvasElement>document.getElementById("dungeons-game"),
    Canvas: <HTMLCanvasElement>document.getElementById("dungeons-game"),
    Ctx: <CanvasRenderingContext2D>(<HTMLCanvasElement>document.getElementById("dungeons-game")).getContext("2d"),
  }

  continue = true;

  constructor() {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "visible") {
        this.continue = true;
        this.AnimRequest = (() => { return requestAnimationFrame((t) => { this.gameFrame(t) }) })();
      }
    });
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key == "ArrowUp" || e.key == "w") {
        this.GameStats.player.facing = "up";
      } else if (e.key == "ArrowDown" || e.key == "s") {
        this.GameStats.player.facing = "down";
      } else if (e.key == "ArrowRight" || e.key == "d") {
        this.GameStats.player.facing = "right";
      } else if (e.key == "ArrowLeft" || e.key == "a") {
        this.GameStats.player.facing = "left";
      }
    })
  }

  async init() {
    //Stretch Canvas
    this.resizeCanvas();
    window.onresize = () => { this.resizeCanvas(); };

    //Write "Loading Images"
    this.Canvas.Ctx.font = `${this.Canvas.Canvas.height / 4}px 'VT323'`
    this.Canvas.Ctx.textAlign = "center";
    this.Canvas.Ctx.fillText("Loading Images...", this.Canvas.Canvas.width / 2, this.Canvas.Canvas.height / 2);

    //Wait for images to load
    this.Sprites.LoadedSprites = await loadImages(this.Sprites.Locations);
    requestAnimationFrame((t) => { this.gameFrame(t) });
  }

  setVars() {
    this.GameStats = {
      door: {
        opened: false,
        x: 14,
        y: 9,
      },
      coins: [
        {
          x: 10,
          y: 1,
          pos: 0,
          count: 0
        },
        {
          x: 5,
          y: 5,
          pos: 0,
          count: 0
        }
      ],
      enemies: [
        {
          x: 3,
          y: 3
        }
      ],
      player: {
        pos: {
          x: 1,
          y: 1,
        },
        score: 0,
        width: 1,
        height: 1,
        facing: "right",
        position: 0,
        speed: 1
      },
      tilemap: {
        tiles:
          [
            [
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
            ],
            [
              1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            ],
            [
              1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            ],
            [
              1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            ],
            [
              1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            ],
            [
              1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            ],
            [
              1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            ],
            [
              1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            ],
            [
              1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
            ],
            [
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
            ],
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
    }

    //Stretch Canvas
    this.GameStats.player.speed = 5 / (Math.round((window.outerWidth / window.innerWidth) * 100) * 0.01)

    requestAnimationFrame((t) => { this.gameFrame(t) });
  }

  //@ts-ignore
  AnimRequest;

  gameFrame(timestamp: number) {
    if (this.continue) {
      if (this.GameStats.Time.Time == 0) {
        this.GameStats.Time.Time = timestamp;
        this.AnimRequest = requestAnimationFrame((t) => { this.gameFrame(t) });
      } else {
        this.Canvas.Ctx.clearRect(0, 0, this.Canvas.Canvas.width, this.Canvas.Canvas.height);
        this.drawTilemap();
        this.renderCoins();
        this.renderEnemies();
        this.collisionEnemies();
        this.collisionCoins();
        let ended = this.collisionDoor();
        if (ended) {
          alert("Good Job You completed it")
        } else {
          this.renderDoor();
          this.drawSprite(this.GameStats.player.pos.x, this.GameStats.player.pos.y);
          this.renderCounter();
          let x = this.movement(timestamp)
          this.GameStats.Time.Time = timestamp;
          if (x == "a") {
            this.AnimRequest = requestAnimationFrame((t) => { this.gameFrame(t) });
          } else if (x == "b") {
            this.AnimRequest = requestAnimationFrame((t) => { this.gameFrame(t) });
          } else if (x == "c") {
            this.setVars();
          }
        }
      }
    }
  }

  renderDoor() {
    if (this.GameStats.door.opened) {
      this.Canvas.Ctx.drawImage(this.Sprites.LoadedSprites.door, 16, 0, 16, 16, (this.GameStats.door.x - 1) * this.Canvas.Tw, (this.GameStats.door.y - 1) * this.Canvas.Th, this.Canvas.Tw, this.Canvas.Th);
    } else {
      this.Canvas.Ctx.drawImage(this.Sprites.LoadedSprites.door, 0, 0, 16, 16, (this.GameStats.door.x - 1) * this.Canvas.Tw, (this.GameStats.door.y - 1) * this.Canvas.Th, this.Canvas.Tw, this.Canvas.Th);
    }
  }

  collisionDoor() {
    if (this.collision({ x: this.GameStats.player.pos.x, y: this.GameStats.player.pos.y, width: this.GameStats.player.width, height: this.GameStats.player.height }, { x: this.GameStats.door.x - 1, y: this.GameStats.door.y - 1, width: 1, height: 1 }) && this.GameStats.door.opened) {
      return true;
    } else {
      return false;
    }
  }

  resizeCanvas() {
    if (window.innerWidth / (this.Canvas.OriginalCanvas.width / this.Canvas.Canvas.height) <= window.innerHeight) {
      //Canvas.w / Window.w * Window.h= Canvas.height / 
      let aspectRatio = this.Canvas.OriginalCanvas.width / this.Canvas.OriginalCanvas.height
      this.Canvas.Canvas.width = window.innerWidth;
      this.Canvas.Canvas.height = window.innerWidth / aspectRatio;
    } else {
      let aspectRatio = this.Canvas.Canvas.height / this.Canvas.OriginalCanvas.width
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
    this.GameStats.player.speed = 5 / (Math.round((window.outerWidth / window.innerWidth) * 100) * 0.01)
  }

  drawSprite(Cx: number, Cy: number) {
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

  movement(timestamp: number) {
    if (timestamp - this.GameStats.Time.Time > 500) {
      console.log("Time Skip");
      return "a";
    } else {
      if (this.GameStats.player.facing == "right") {
        this.GameStats.player.pos.x += this.GameStats.player.speed * ((timestamp - this.GameStats.Time.Time) / 1000);
      } else if (this.GameStats.player.facing == "left") {
        this.GameStats.player.pos.x -= this.GameStats.player.speed * ((timestamp - this.GameStats.Time.Time) / 1000);
      } else if (this.GameStats.player.facing == "down") {
        this.GameStats.player.pos.y += this.GameStats.player.speed * ((timestamp - this.GameStats.Time.Time) / 1000);
      } else if (this.GameStats.player.facing == "up") {
        this.GameStats.player.pos.y -= this.GameStats.player.speed * ((timestamp - this.GameStats.Time.Time) / 1000);
      }
      if (!this.collisionList({ x: this.GameStats.player.pos.x, y: this.GameStats.player.pos.y, width: this.GameStats.player.width, height: this.GameStats.player.height }, this.collisionBoundaries.map(e => {
        return { width: 1, height: 1, x: e.y, y: e.x };
      }))) {
        if (this.GameStats.Time.LastFrameAnimation == 0) {
          this.GameStats.player.position == 2 ? this.GameStats.player.position = 0 : this.GameStats.player.position++;
          this.GameStats.Time.LastFrameAnimation++;
        } else if (this.GameStats.Time.LastFrameAnimation == 10) {
          this.GameStats.Time.LastFrameAnimation = 0;
        } else {
          this.GameStats.Time.LastFrameAnimation++;
        }
        return "b";
      } else {
        return "c";
      }
    }
  }

  collisionCoins() {
    for (let i = 0; i < this.GameStats.coins.length; i++) {
      if (this.collision({ x: this.GameStats.coins[i].x, y: this.GameStats.coins[i].y, width: 1, height: 1 }, { x: this.GameStats.player.pos.x, y: this.GameStats.player.pos.y, width: this.GameStats.player.width, height: this.GameStats.player.height })) {
        this.GameStats.player.score++;
        this.GameStats.coins.splice(i, 1);
        if (this.GameStats.coins.length == 0) {
          this.GameStats.door.opened = true;
        }
        return;
      }
    }
    return;
  }

  renderCoins() {
    for (let i = 0; i < this.GameStats.coins.length; i++) {
      this.Canvas.Ctx.drawImage(this.Sprites.LoadedSprites.coin, 16 * this.GameStats.coins[i].pos, 0, 16, 16, this.GameStats.coins[i].x * this.Canvas.Tw, this.GameStats.coins[i].y * this.Canvas.Th, this.Canvas.Tw, this.Canvas.Th);
      if (this.GameStats.coins[i].count == 10) {
        this.GameStats.coins[i].count = 0;
        if (this.GameStats.coins[i].pos == 8) {
          this.GameStats.coins[i].pos = 0
        } else {
          this.GameStats.coins[i].pos++
        }
      } else {
        this.GameStats.coins[i].count++;
      }
    }
  }

  collision(obj1: Sprite, obj2: Sprite) {
    if (obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y) {
      return true;
    } else {
      return false;
    }
  }

  collisionList(obj: Sprite, list: Array<Sprite>) {
    let collided = false;
    for (let i = 0; i < list.length; i++) {
      if (this.collision(obj, list[i])) {
        collided = true;
        break;
      }
    }
    return collided;
  }

  renderCounter() {
    this.Canvas.Ctx.font = `${this.Canvas.Th}px 'VT323'`;
    let text = `Score: ${this.GameStats.player.score}/2, Level 1`;
    let textWidth = this.Canvas.Ctx.measureText(text).width;
    this.Canvas.Ctx.globalAlpha = 0.5;
    this.Canvas.Ctx.fillStyle = "#000000";
    this.Canvas.Ctx.fillRect(0, 0, textWidth + 10, this.Canvas.Th);
    this.Canvas.Ctx.globalAlpha = 1.0;
    this.Canvas.Ctx.textBaseline = 'hanging';
    this.Canvas.Ctx.fillStyle = "#fbf7ff";
    this.Canvas.Ctx.fillText(text, this.Canvas.Ctx.measureText(text).width / 2 + (this.Canvas.Th * 0.1), this.Canvas.Th * 0.1);
  }

  renderEnemies() {
    for (let i = 0; i < this.GameStats.enemies.length; i++) {
      this.Canvas.Ctx.drawImage(this.Sprites.LoadedSprites.enemy, 0, 0, 16, 16, (this.GameStats.enemies[i].x - 1) * this.Canvas.Tw, (this.GameStats.enemies[i].y - 1.5) * this.Canvas.Tw, this.Canvas.Tw, this.Canvas.Th);
    }
  }

  collisionEnemies() {
    for (let i = 0; i < this.GameStats.enemies.length; i++) {
      if (this.collision({ x: this.GameStats.enemies[i].x - 1, y: this.GameStats.enemies[i].y - 1, width: 1, height: 1 }, { x: this.GameStats.player.pos.x, y: this.GameStats.player.pos.y, width: this.GameStats.player.width, height: this.GameStats.player.height })) {
        this.setVars();
        return;
      }
    }
  }

  GameStats = {
    door: {
      opened: false,
      x: 14,
      y: 9,
    },
    coins: [
      {
        x: 10,
        y: 1,
        pos: 0,
        count: 0
      },
      {
        x: 5,
        y: 5,
        pos: 0,
        count: 0
      }
    ],
    enemies: [
      {
        x: 3,
        y: 3
      }
    ],
    player: {
      pos: {
        x: 1,
        y: 1,
      },
      score: 0,
      width: 1,
      height: 1,
      facing: "right",
      position: 0,
      speed: 1
    },
    tilemap: {
      tiles:
        [
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
          ],
          [
            1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
          ],
          [
            1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
          ],
          [
            1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
          ],
          [
            1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
          ],
          [
            1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
          ],
          [
            1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
          ],
          [
            1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
          ],
          [
            1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
          ],
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
  }

  collisionBoundaries = [
    { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 }, { x: 0, y: 9 }, { x: 0, y: 10 }, { x: 0, y: 11 }, { x: 0, y: 12 }, { x: 0, y: 13 }, { x: 0, y: 14 }, { x: 1, y: 0 }, { x: 1, y: 14 }, { x: 2, y: 0 }, { x: 2, y: 14 }, { x: 3, y: 0 }, { x: 3, y: 14 }, { x: 4, y: 0 }, { x: 4, y: 14 }, { x: 5, y: 0 }, { x: 5, y: 14 }, { x: 6, y: 0 }, { x: 6, y: 14 }, { x: 7, y: 0 }, { x: 7, y: 14 }, { x: 8, y: 0 }, { x: 8, y: 14 }, { x: 9, y: 0 }, { x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 }, { x: 9, y: 8 }, { x: 9, y: 9 }, { x: 9, y: 10 }, { x: 9, y: 11 }, { x: 9, y: 12 }, { x: 9, y: 13 }, { x: 9, y: 14 }
  ]

  drawTilemap() {
    this.Canvas.Ctx.clearRect(0, 0, this.Canvas.Canvas.width, this.Canvas.Canvas.height);
    for (let i = 0; i < this.GameStats.tilemap.tiles.length; i++) {
      for (let j = 0; j < this.GameStats.tilemap.tiles[i].length; j++) {
        this.Canvas.Ctx.drawImage(
          this.Sprites.LoadedSprites.tileMap,
          0, (this.GameStats.tilemap.tiles[i][j] - 1) * 10, 10, 10,
          j * this.Canvas.Tw, i * this.Canvas.Th, this.Canvas.Tw, this.Canvas.Th
        );
      }
    }
  }

  imageStats(Num: number) {
    return { x: Num - (Math.floor(Num / 4) * 4) - 1, y: Math.floor(Num / 4) }
  }

  Sprites: any = {
    Locations: { player: "static/Meteor.png", tileMap: "static/Tilemap.png", coin: "static/Coin.png", enemy: "static/Enemy.png", door: "static/Door.png" },
    LoadedSprites: {}
  }
}