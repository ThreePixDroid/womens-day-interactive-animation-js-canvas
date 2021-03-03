export class Heart {
  constructor(x, y, path) {
    this.homeX = this.x = x
    this.homeY = this.y = y
    this.path = path

    this.color = `hsla(${Math.random() * 60 - 60}, 100%, 50%, ${.8 - Math.random() * .5})`

    this.maxDistToMouse = 150
    this.heartSpeed = 500

    this.velocityX = 0
    this.velocityY = 0

    this.rotationSpeed = (Math.random() > .5 ? -1 : 1); 
    this.angle = Math.random() * Math.PI * 2
    this.offsetX = Math.cos(this.angle)
    this.offsetY = Math.sin(this.angle)

    this.explosionX = x
    this.explosionY = y
    this.isExplosion = false
    this.explosionRadius = 0
    this.explosionMaxRadius= 30
  }
  update({x, y}, {w, h}, correction) {
    const distToMouse = this.getApproximateDistance(this.x - x, this.y - y)
    // console.log(distToMouse);

    if (distToMouse < this.maxDistToMouse && this.velocityX === 0 && this.velocityY === 0) {
      this.velocityX = this.heartSpeed * (this.x - x) / distToMouse * correction
      this.velocityY = this.heartSpeed * (this.y - y) / distToMouse * correction
    } 

    this.x += this.velocityX
    this.y += this.velocityY

    this.angle += (this.rotationSpeed + this.velocityX + this.velocityY) * correction
    this.offsetX = Math.cos(this.angle) * 20
    this.offsetY = Math.sin(this.angle) * 20

    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
      this.isExplosion = true
      this.explosionX = this.x
      this.explosionY = this.y
      this.x = this.homeX
      this.y = this.homeY
      this.velocityX = 0 
      this.velocityY = 0 
    }
  }
  updateExplosion() {
    if (this.isExplosion && this.explosionRadius < this.explosionMaxRadius) {
      this.explosionRadius++
    } else {
      this.isExplosion = false
      this.explosionRadius = 0
    }
  }
  drawExplosion(ctx) {
    if (this.isExplosion && this.explosionRadius < this.explosionMaxRadius) {
      const alpha = this.explosionRadius / this.explosionMaxRadius
      ctx.lineWidth = 10 - 10 * alpha
      ctx.strokeStyle = `hsla(${160 * alpha - 60}, 100%, 50%, ${1 - alpha * .5})`

      ctx.beginPath()
      ctx.arc(this.explosionX, this.explosionY, this.explosionRadius, 0 , Math.PI * 2)
      ctx.stroke()
    }
  }
  getApproximateDistance(dx, dy) {
    dx = Math.abs(dx);
    dy = Math.abs(dy);
    return dx < dy ? (123 * dy + 51 * dx) / 128 : (123 * dx + 51 * dy) / 128;
  }
}