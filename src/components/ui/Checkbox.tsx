"use client";

import React, { InputHTMLAttributes, useId } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  helperText?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  helperText,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const id = props.id || `checkbox-${label ? label.replace(/\s+/g, '-').toLowerCase() : generatedId}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className={`${styles.checkboxContainer} ${className}`}>
      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          className={styles.checkbox}
          {...props}
        />
        <label htmlFor={id} className={styles.checkboxLabel}>
          <span className={styles.checkmark}>
            {checked && (
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 4L4.5 7.5L11 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          {label}
        </label>
      </div>
      {helperText && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
};

export default Checkbox; 