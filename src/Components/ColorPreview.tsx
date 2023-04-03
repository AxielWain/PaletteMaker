import { invert } from 'polished';
import { TRANSPARENT_COLOR } from '../utils/constants';

type Props = {
  color: string;
  onClick?: (color: string) => void;
};

export function ColorPreview({ color, onClick }: Props) {
  const handleClick = () => {
    if (color !== TRANSPARENT_COLOR && onClick) {
      onClick(color);
    }
  };
  return (
    <div
      className="color-preview"
      style={{ backgroundColor: color, borderColor: invert(color) }}
      onClick={handleClick}
    ></div>
  );
}
