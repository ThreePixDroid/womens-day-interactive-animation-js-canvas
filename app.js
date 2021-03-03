import { Canvas } from './canvas.js'
import { Heart } from './heart.js'
import { createEightPath, createHeartPath } from './pathsGenerator.js'

class Animation {
  constructor() {
    this.cnv = new Canvas

    this.deltaTime = 0;
    this.lastUpdate = 0;

    this.heartsCount = 200

    this.setup()
    this.createMouse()
    addEventListener(`resize`, () => this.setup())
    addEventListener(`mousemove`, e => this.updateMouse(e))
    requestAnimationFrame((stampTime) => this.animate(stampTime))
  }
  setup() {
    this.cnv.fitCanvasToContainer()

    this.eightPath = createEightPath(this.cnv)
    this.createHearts(this.cnv)
  }
  createHearts() {
    this.hearts = []
    for (let i = 0 ; i < this.heartsCount ; i++) {
      const pos = this.eightPath[ Math.floor(Math.random() * this.eightPath.length) ]

      this.hearts.push(new Heart(pos.x, pos.y, createHeartPath()))
    }
  }
  createMouse() {
    this.mouse = {
      x: undefined,
      y: undefined,
      moves: false,
    }
  }
  updateMouse(e) {
    if (e) {
      this.mouse.x = e.x - this.cnv.box.x
      this.mouse.y = e.y - this.cnv.box.y
      this.mouse.moves = true
    } else {
      this.mouse.moves = false
    }
  }
  update() {
    const correction = this.deltaTime * .001
    
    this.updateMouse() 

    this.hearts.forEach(heart => {
      heart.update(this.mouse, this.cnv, correction)
      heart.updateExplosion()
    })
  }
  render() {
    this.cnv.clear()

    this.cnv.drawPath(this.eightPath, `rgba(230, 160, 160, .7)`, false)
    
    this.hearts.forEach(heart => {
      this.cnv.drawPath(heart.path, heart.color, true, heart.x + heart.offsetX, heart.y + heart.offsetY)
      heart.drawExplosion(this.cnv.ctx)
    })
    
    this.cnv.drawText()
  }
  animate(stampTime) {
    requestAnimationFrame(stampTime => this.animate(stampTime))

    this.deltaTime = stampTime - this.lastUpdate;
    
    this.update()
    this.render()
    
    this.lastUpdate = stampTime;
  }
}

onload = () => new Animation