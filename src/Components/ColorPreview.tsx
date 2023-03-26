import { invert } from 'polished';

type Props = {
  color: string;
};

export function ColorPreview({ color }: Props) {
  return (
    <div
      className="color-preview"
      style={{ backgroundColor: color, borderColor: invert(color) }}
    ></div>
  );
}
