import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { ColorPreview } from '../ColorPreview';
import './styles.css';

type Props = {
  colors: string[];
  columnCount: number;
};

export function ShadesGridPreview({ colors, columnCount }: Props) {
  const keyIds = useMemo(() => {
    const ids: string[] = [];
    for (let i = 0; i < colors.length; i++) {
      ids.push(nanoid(12));
    }
    return ids;
  }, [columnCount]);
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
