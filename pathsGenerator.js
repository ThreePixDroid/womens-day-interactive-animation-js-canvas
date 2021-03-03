export function createEightPath({cx, cy}, detalization = 80) {
  const path = []
  const rads = 2 * Math.PI
  const step = rads / detalization

  for (let i = 0 ; i < detalization ; i++) {
    const angle = i * step
    const size = 2 / (3 - Math.cos(angle * 2)) * cy * .8;

    path.push({
      x: cx + size * Math.sin(angle * 2) / 2,
      y: cy + size * Math.cos(angle)
    })
  }

  return path
}

export function createHeartPath(detalization = 25) {
  const path = []
  const rads = 2 * Math.PI
  const step = rads / detalization
  const size = Math.random() + .1

  for(let i = 0 ; i < detalization ; i++) {
    const angle = i * step

    path.push({
      x: size * 16 * Math.sin(angle) ** 3,
      y: size * -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle))
    })
  }

  return path
}