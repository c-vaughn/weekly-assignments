import React from 'react';
import colors from '../colors';

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  style?: React.CSSProperties;
}

const elevation = {
  boxShadow: '0px 1px 1px rgba(9, 30, 66, 0.25), 0px 0px 1px rgba(9, 30, 66, 0.31)',
};

const TextInput: React.FC<TextInputProps> = ({
  placeholder = '',
  value,
  onChange,
  type = 'text',
  style = {},
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: '90%',
        height: '40px',
        padding: '0px 12px',
        borderRadius: 6,
        border: `1px solid ${colors.border}`,
        background: colors.surface,
        color: colors.textPrimary,
        fontSize: 16,
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: elevation.boxShadow,
        ...style,
      }}
      onFocus={e => (e.currentTarget.style.borderColor = colors.focusRing)}
      onBlur={e => (e.currentTarget.style.borderColor = colors.border)}
    />
  );
};

export default TextInput; 