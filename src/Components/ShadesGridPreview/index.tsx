import { useKeyIds } from '../../hooks';
import { ColorPreview } from '../ColorPreview';
import './styles.css';

type Props = {
  colors: string[];
  columnCount: number;
};

export function ShadesGridPreview({ colors, columnCount }: Props) {
  const keyIds = useKeyIds(colors.length);
  return (
    <div
      className="shades-grid"
      style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
    >
      {colors.map((color, index) => (
        <ColorPreview key={keyIds[index]} color={color} />
      ))}
    </div>
  );
}
