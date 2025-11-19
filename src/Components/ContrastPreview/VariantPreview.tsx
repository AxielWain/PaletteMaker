import { ColorExample } from './ColorExample'
import { Shade } from './types'

type Props = {
  isComputed: boolean
  background: string
  foreground: string
  backgroundShades: Shade[]
  foregroundShades: Shade[]
}

export function VariantPreview({
  isComputed,
  background,
  foreground,
  backgroundShades,
  foregroundShades,
}: Props) {
  return ({ inverse }: { inverse: boolean }) => {
    const backgroundColor = inverse ? foreground : background
    const backShades = inverse ? foregroundShades : backgroundShades
    const color = inverse ? background : foreground
    const frontShades = inverse ? backgroundShades : foregroundShades
    const title = inverse ? 'Light Variant' : 'Dark Variant'
    return (
      <div
        className="contrast-preview"
        style={{
          backgroundColor,
          borderColor: color,
          color,
        }}
      >
        <p className="title" style={{ backgroundColor }}>
          {title}
        </p>
        <ColorExample
          shades={backShades}
          inverse={false}
          isComputed={isComputed}
        />
        <ColorExample shades={frontShades} inverse isComputed={isComputed} />
      </div>
    )
  }
}
