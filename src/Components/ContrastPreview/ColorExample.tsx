import { Shade } from './types';
import { getShadeName } from './utils/getShadeName';

type Props = {
  inverse: boolean;
  isComputed: boolean;
  shades: Shade[];
};

export function ColorExample({ inverse, isComputed, shades }: Props) {
  if (isComputed) {
    const style = (color: string) =>
      inverse ? { backgroundColor: color } : { color };
    return (
      <>
        {shades.map((shade) => {
          const shadeName = getShadeName(shade);
          return (
            <p
              className="color-example"
              key={shadeName}
              style={style(shade.color)}
            >
              {shadeName}
            </p>
          );
        })}
      </>
    );
  }

  return <></>;
}
