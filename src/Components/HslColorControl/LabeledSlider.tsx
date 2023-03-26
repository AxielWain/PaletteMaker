import { nanoid } from 'nanoid';
import { useState } from 'react';

type Props = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
};

export function LabeledSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
}: Props) {
  const [id] = useState(nanoid(10));
  return (
    <div className="slider-container">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        className="slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}
