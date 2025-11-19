import { useState } from 'preact/hooks'
import { VariantPreview } from './VariantPreview'
import './styles.css'
import { Shade } from './types'
import { addPaletteShades, getGoodContrastShades } from './utils'

type Props = {
  isComputed: boolean
  background: string
  foreground: string
  baseColors: string[]
  colorShades: string[]
  derivedColors: string[]
  derivedShades: string[]
}

export function ContrastPreview({
  isComputed,
  background,
  foreground,
  baseColors,
  derivedColors,
  colorShades,
  derivedShades,
}: Props) {
  const [currentShade, setCurrentShade] = useState(0)

  const palette: Shade[][] = []

  addPaletteShades(palette, baseColors, derivedColors)
  addPaletteShades(palette, colorShades, derivedShades, 1, 12)

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
          onInput={(e) => {
            setCurrentShade(parseFloat(e.currentTarget.value))
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
