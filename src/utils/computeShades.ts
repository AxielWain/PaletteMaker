import { darken, lighten, parseToHsl, toColorString } from 'polished'
import { TRANSPARENT_COLOR } from './constants'

const linearInterpolation = (a: number, b: number, t: number) => {
  return (b - a) * t + a
}

const normalize = (value: number, min: number, max: number) => {
  return (value - min) / (max - min)
}

export function computeShades(
  color: string,
  maxShades = 6,
  maxLightness = 0.9,
  minLightness = 0.1
) {
  const { hue, saturation, lightness } = parseToHsl(color)
  const shades: string[] = []
  const deltaLightness = (maxLightness - minLightness) / 12
  let accuLightness = maxLightness

  for (let i = 0; i < 12; i++) {
    const t = normalize(accuLightness, minLightness, maxLightness)
    const newLightness =
      accuLightness > lightness
        ? linearInterpolation(lightness, maxLightness, t)
        : linearInterpolation(minLightness, lightness, t)
    const newHue =
      hue +
      linearInterpolation(
        -30,
        30,
        normalize(newLightness, minLightness, maxLightness)
      )
    shades.push(
      toColorString({
        hue: newHue,
        saturation,
        lightness: newLightness,
      })
    )
    accuLightness -= deltaLightness
  }

  const lighterShades = shades.slice(0, maxShades)
  const darkerShades = shades.slice(maxShades, shades.length)

  return { darkerShades, lighterShades }
}
