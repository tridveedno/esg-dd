import React from 'react';
import { HelpCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  tooltip?: string;
  required?: boolean;
  error?: string;
}

export function FormField({ label, children, tooltip, required, error }: FormFieldProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-brand-redorange ml-1">*</span>}
        </label>
        {tooltip && (
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-brand-purple hover:text-brand-orange transition-colors"
            >
              <HelpCircle size={16} />
            </button>
            {showTooltip && (
              <div className="absolute left-0 top-6 z-10 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface RadioGroupProps {
  options: { value: string; label: string }[];
  name: string;
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ options, name, value, onChange }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
          style={{
            borderColor: value === option.value ? '#8B104E' : '#E5E7EB',
            backgroundColor: value === option.value ? 'rgba(139, 16, 78, 0.05)' : 'white',
          }}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="mr-3 accent-brand-purple"
          />
          <span className="text-sm font-medium text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

interface RatingScaleProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  labels?: { min: string; max: string };
}

export function RatingScale({ name, value, onChange, min = 1, max = 5, labels }: RatingScaleProps) {
  return (
    <div>
      <div className="flex justify-between items-center gap-2">
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              value === rating
                ? 'bg-brand-orange text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {rating}
          </button>
        ))}
      </div>
      {labels && (
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>{labels.min}</span>
          <span>{labels.max}</span>
        </div>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export function Select({ options, className = '', ...props }: SelectProps) {
  return (
    <select
      className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple focus:ring-opacity-20 transition-all ${className}`}
      {...props}
    >
      <option value="">Select an option...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
