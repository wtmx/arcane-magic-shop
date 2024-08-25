import React from 'react';

interface DiscreteSliderProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
  formatLabel: (value: number) => string;
}

const DiscreteSlider: React.FC<DiscreteSliderProps> = ({ value, options, onChange, formatLabel }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value);
    onChange(options[index]);
  };

  const currentIndex = options.indexOf(value);

  return (
    <div className="flex items-center space-x-2">
      <input
        type="range"
        min={0}
        max={options.length - 1}
        step={1}
        value={currentIndex}
        onChange={handleChange}
        className="w-full"
      />
      <span className="w-20 text-right">{formatLabel(value)}</span>
    </div>
  );
};

DiscreteSlider.displayName = 'DiscreteSlider';

export default DiscreteSlider;