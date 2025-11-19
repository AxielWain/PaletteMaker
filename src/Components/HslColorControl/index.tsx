import { parseToHsl } from 'polished'
import hsl from 'polished/lib/color/hsl'
import { HslColor } from 'polished/lib/types/color'
import { useState } from 'react'
import { ColorPreview } from '../ColorPreview'
import { LabeledSlider } from './LabeledSlider'
import './styles.css'

type Props = {
  minHue: number
  maxHue: number
  minLightness: number
  maxLightness: number
  initialColor: string
  onColorChange: (color: string) => void
}

export function HslColorControl({
  minHue,
  maxHue,
  minLightness,
  maxLightness,
  initialColor,
  onColorChange,
}: Props) {
  const hslColor = parseToHsl(initialColor)
  const [hue, setHue] = useState(hslColor.hue)
  const [saturation, setSaturation] = useState(hslColor.saturation)
  const [lightness, setLightness] = useState(hslColor.lightness)
  const [color, setColor] = useState(initialColor)

  const updateColor = (color: HslColor) => {
    const hexColor = hsl(color)
    setColor(hexColor)
    onColorChange(hexColor)
  }

  const handleHueChange = (value: number) => {
    setHue(value)
    updateColor({ hue: value, saturation, lightness })
  }

  const handleSaturationChange = (value: number) => {
    setSaturation(value)
    updateColor({ hue, saturation: value, lightness })
  }

  const handleLightnessChange = (value: number) => {
    setLightness(value)
    updateColor({ hue, saturation, lightness: value })
  }

  return (
    <div className="hsl-sliders">
      <ColorPreview color={color} />
      <div className="sliders">
        <LabeledSlider
          label="H"
          min={minHue}
          max={maxHue}
          value={hue}
          onChange={handleHueChange}
        />
        <LabeledSlider
          label="S"
          min={0}
          max={1}
          step={0.01}
          value={saturation}
          onChange={handleSaturationChange}
        />
        <LabeledSlider
          label="L"
          min={minLightness}
          max={maxLightness}
          step={0.01}
          value={lightness}
          onChange={handleLightnessChange}
        />
      </div>
    </div>
  )
}
