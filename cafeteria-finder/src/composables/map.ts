export function createRGBPoint({ r, g, b }: { r: number; g: number; b: number }) {
  const diameter = 50
  const radius = diameter / 2
  const centerX = radius
  const centerY = radius
  const pixelData = new Uint8Array(diameter * diameter * 4) // Cada pixel tem um componente RGBA.

  for (let y = 0; y < diameter; y++) {
    for (let x = 0; x < diameter; x++) {
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)

      if (distance <= radius) {
        const index = (y * diameter + x) * 4
        pixelData[index] = r // Vermelho
        pixelData[index + 1] = g // Verde
        pixelData[index + 2] = b // Azul
        pixelData[index + 3] = 255 // Alfa (255 = totalmente opaco)
      }
    }
  }

  return { width: diameter, height: diameter, data: pixelData }
}
