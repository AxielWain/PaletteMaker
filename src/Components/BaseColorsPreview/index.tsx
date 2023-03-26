import { ColorPreview } from '../ColorPreview';
import './styles.css';

type Props = {
  colors: string[];
};

export function BaseColorsPreview({ colors }: Props) {
  return (
    <div
      className="base-palette-grid"
      style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}
    >
      {colors.map((color) => (
        <ColorPreview key={color} color={color} />
      ))}
    </div>
  );
}
