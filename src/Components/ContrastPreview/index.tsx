import { useState } from 'react'
import { VariantPreview } from './VariantPreview'
import './styles.css'
import { Shade } from './types'
import { addPaletteShades, getGoodContrastShades } from './utils'

type Props = {
  isComputed: boolean
  background: string
  foreground: string
  baseColors: string[]
  darkerShades: string[]
  lighterShades: string[]
  derivedColors: string[]
  derivedDarkerShades: string[]
  derivedLighterShades: string[]
}

export function ContrastPreview({
  isComputed,
  background,
  foreground,
  baseColors,
  darkerShades,
  lighterShades,
  derivedColors,
  derivedDarkerShades,
  derivedLighterShades,
}: Props) {
  const [currentShade, setCurrentShade] = useState(0)

  const palette: Shade[][] = []

  addPaletteShades(palette, baseColors, derivedColors)
  addPaletteShades(palette, lighterShades, derivedLighterShades, 1, 6)
  addPaletteShades(palette, darkerShades, derivedDarkerShades, 7, 6)

  const { shadesForBackground, shadesForForeground } = getGoodContrastShades(
    palette[currentShade],
    background,
    foreground
  )

  const Theme = VariantPreview({
    isComputed,
    background,
    foreground,
    backgroundShades: shadesForBackground,
    foregroundShades: shadesForForeground,
  })

  return (
    <div>
      <div>
        <strong>Contrast Preview</strong>
      </div>
      <div>
        <label>Shade Row:</label>
        <input
          min={0}
          max={palette.length - 1}
          type="number"
          value={currentShade}
          onChange={(e) => {
            setCurrentShade(parseFloat(e.target.value))
          }}
        />
      </div>
      <div className="themes">
        <Theme inverse={false} />
        <Theme inverse />
      </div>
    </div>
  )
}
