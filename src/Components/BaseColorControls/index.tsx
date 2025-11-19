import { HslColorControl } from '../HslColorControl'
import { ControlRestrictions } from './constants'
import './styles.css'

type Props = {
  initialColors: readonly string[]
  onColorChange: (index: number, color: string) => void
}

export function BaseColorControls({ initialColors, onColorChange }: Props) {
  return (
    <div className="color-controls">
      {initialColors.map((color, index) => (
        <HslColorControl
          {...ControlRestrictions[index]}
          key={color}
          initialColor={color}
          onColorChange={(color) => {
            onColorChange(index, color)
          }}
        />
      ))}
    </div>
  )
}
