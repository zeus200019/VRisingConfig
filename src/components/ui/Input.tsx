"use client";

import React, { InputHTMLAttributes, useId, useState, CSSProperties } from 'react';
import styles from './Input.module.css';
import { CaretUp, CaretDown } from '@phosphor-icons/react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  showNumberControls?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  fullWidth = false,
  showNumberControls = false,
  className = '',
  ...props
}) => {
  const [, setIsHovered] = useState(false);
  
  const inputClasses = [
    styles.input,
    error ? styles.error : '',
    icon ? styles.withIcon : '',
    showNumberControls ? styles.withNumberControls : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  const generatedId = useId();
  const id = props.id || `input-${label ? label.replace(/\s+/g, '-').toLowerCase() : generatedId}`;

  const handleIncrement = () => {
    if (props.type === 'number' && props.onChange) {
      const currentValue = typeof props.value === 'number' ? props.value : parseInt(props.value as string || '0', 10);
      let newValue = currentValue + 1;
      
      // 处理时间循环逻辑
      if (props.max !== undefined) {
        const maxValue = parseInt(String(props.max), 10);
        // 如果超过最大值，重置为最小值
        if (newValue > maxValue) {
          newValue = props.min !== undefined ? parseInt(String(props.min), 10) : 0;
        }
      }
      
      const event = {
        target: { value: newValue.toString() }
      } as React.ChangeEvent<HTMLInputElement>;
      props.onChange(event);
    }
  };

  const handleDecrement = () => {
    if (props.type === 'number' && props.onChange) {
      const currentValue = typeof props.value === 'number' ? props.value : parseInt(props.value as string || '0', 10);
      let newValue = currentValue - 1;
      
      // 处理时间循环逻辑
      if (props.min !== undefined) {
        const minValue = parseInt(String(props.min), 10);
        if (newValue < minValue) {
          // 确定最大值
          let maxValue: number;
          
          // 获取最大值
          if (props.max !== undefined) {
            maxValue = parseInt(String(props.max), 10);
          } else {
            // 根据标签或其他特征推断是小时还是分钟
            if (label?.toLowerCase().includes('小时')) {
              maxValue = 23;
            } else if (label?.toLowerCase().includes('分钟')) {
              maxValue = 59;
            } else {
              maxValue = minValue; // 默认不循环
            }
          }
          
          newValue = maxValue;
        }
      }
      
      const event = {
        target: { value: newValue.toString() }
      } as React.ChangeEvent<HTMLInputElement>;
      props.onChange(event);
    }
  };

  // 获取修改后的input属性，隐藏原生数字控制按钮
  const inputProps = {
    ...props,
    // 使用any是必要的，因为TypeScript对CSS属性的类型定义不完整，尤其是浏览器前缀属性
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style: showNumberControls && props.type === 'number' ? 
      { 
        ...props.style as CSSProperties, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        appearance: 'textfield' as any, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        WebkitAppearance: 'textfield' as any, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        MozAppearance: 'textfield' as any 
      } : props.style
  };

  return (
    <div className={`${styles.inputContainer} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div 
        className={`${styles.inputWrapper} ${showNumberControls ? styles.numberInputWrapper : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <input id={id} className={inputClasses} {...inputProps} />
        {showNumberControls && props.type === 'number' && (
          <div className={`${styles.numberControls} ${styles.showControls}`}>
            <button
              type="button"
              className={`${styles.controlButton} ${styles.upButton}`}
              onClick={handleIncrement}
              tabIndex={-1}
              aria-label="增加"
            >
              <CaretUp weight="bold" />
            </button>
            <button
              type="button"
              className={`${styles.controlButton} ${styles.downButton}`}
              onClick={handleDecrement}
              tabIndex={-1}
              aria-label="减少"
            >
              <CaretDown weight="bold" />
            </button>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <div className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default Input; 