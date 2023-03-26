import React from 'react';

type Props = {
  color: string;
};

export function ColorPreview({ color }: Props) {
  return (
    <div className="color-preview" style={{ backgroundColor: color }}></div>
  );
}
