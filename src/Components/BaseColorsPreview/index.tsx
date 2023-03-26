import { useKeyIds } from '../../hooks';
import { ColorPreview } from '../ColorPreview';
import './styles.css';

type Props = {
  colors: string[];
};

export function BaseColorsPreview({ colors }: Props) {
  const keyIds = useKeyIds(colors.length);
  return (
    <div
      className="base-palette-grid"
      style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}
    >
      {colors.map((color, index) => (
        <ColorPreview key={keyIds[index]} color={color} />
      ))}
    </div>
  );
}
