export class Canvas {
  constructor(container = document.body) {
    this.cnv = document.createElement(`canvas`)
    this.ctx = this.cnv.getContext(`2d`)
    container.appendChild(this.cnv)
    
    this.fitCanvasToContainer()
  }
  fitCanvasToContainer() {
    this.cnv.width = this.cnv.offsetWidth
    this.cnv.height = this.cnv.offsetHeight
  }
  clear() { 
    this.ctx.clearRect(0, 0, this.w, this.h) 
  }
  drawPath(path, color = `red`, fill = true, offsetX = 0, offsetY = 0) {
    const {ctx} = this

    ctx.fillStyle = ctx.strokeStyle = color
    ctx.lineWidth = 60
    ctx.lineJoin = `round`

    ctx.beginPath()
    path.forEach(({x, y}, i) => { 
      x += offsetX
      y += offsetY

      i < 1 ? ctx.moveTo(x, y) : ctx.lineTo(x, y) 
    })
    ctx.closePath()

    fill ? ctx.fill() : ctx.stroke() 
  }
  drawText() {
    this.ctx.textAlign = `left`
    this.ctx.textBaseline = `middle`
    this.ctx.fillStyle = `rgb(0, 140, 80)`
    
    const textSize = this.h * .12
    this.ctx.font = `italic 900 ${textSize}px times new roman`
    // this.ctx.fillText(`Happy women's day!`,    this.cx, this.cy)
    this.ctx.fillText(`Happy`,    this.cx + 200, this.cy - textSize)
    this.ctx.fillText(`women's`,  this.cx + 200, this.cy)
    this.ctx.fillText(`day!`,     this.cx + 200, this.cy + textSize)
    this.ctx.textAlign = `right`
    this.ctx.fillText(`March`,    this.cx - 200, this.cy)
  }
  get w() { return this.cnv.width } 
  get h() { return this.cnv.height } 
  get cx() { return this.cnv.width / 2 } 
  get cy() { return this.cnv.height / 2 } 
  get box() { return this.cnv.getBoundingClientRect() }
}