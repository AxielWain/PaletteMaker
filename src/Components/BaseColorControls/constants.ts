type HslRestriction = {
  minHue: number
  maxHue: number
  minLightness: number
  maxLightness: number
}

export const ControlRestrictions: readonly HslRestriction[] = [
  // white
  {
    minHue: 0,
    maxHue: 360,
    minLightness: 0.8,
    maxLightness: 1,
  },
  // red
  {
    minHue: -30,
    maxHue: 30,
    minLightness: 0.2,
    maxLightness: 0.8,
  },
  // yellow
  {
    minHue: 30,
    maxHue: 90,
    minLightness: 0.2,
    maxLightness: 0.8,
  },
  // green
  {
    minHue: 90,
    maxHue: 150,
    minLightness: 0.2,
    maxLightness: 0.8,
  },
  // cyan
  {
    minHue: 150,
    maxHue: 210,
    minLightness: 0.2,
    maxLightness: 0.8,
  },
  // blue
  {
    minHue: 210,
    maxHue: 270,
    minLightness: 0.2,
    maxLightness: 0.8,
  },
  // magenta
  {
    minHue: 270,
    maxHue: 330,
    minLightness: 0.2,
    maxLightness: 0.8,
  },
  // black
  {
    minHue: 0,
    maxHue: 360,
    minLightness: 0,
    maxLightness: 0.2,
  },
]
