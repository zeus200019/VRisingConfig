"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Slider.module.css';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  helperText?: string;
  showValue?: boolean;
  valueFormat?: (value: number) => string;
  showTicks?: boolean;
  tickCount?: number;
  fullWidth?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  helperText,
  showValue = true,
  valueFormat,
  showTicks = false,
  tickCount = 5,
  fullWidth = false,
}) => {
  const [innerValue, setInnerValue] = useState<number>(value);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [valueWidth, setValueWidth] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const updateSliderPosition = useCallback(() => {
    if (!progressRef.current || !thumbRef.current) return;
    
    const percentage = ((innerValue - min) / (max - min)) * 100;
    progressRef.current.style.width = `${percentage}%`;
    thumbRef.current.style.left = `${percentage}%`;
  }, [innerValue, min, max]);

  // 计算滑块位置和进度条宽度
  useEffect(() => {
    updateSliderPosition();
  }, [updateSliderPosition]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setInnerValue(newValue);
    onChange(newValue);
  };

  const formatValue = (val: number) => {
    if (valueFormat) {
      return valueFormat(val);
    }
    return val.toString();
  };
  
  // 开始编辑值
  const handleValueClick = () => {
    // 获取显示值元素的宽度
    if (valueRef.current) {
      const rect = valueRef.current.getBoundingClientRect();
      setValueWidth(rect.width);
    }
    
    setIsEditing(true);
    setInputValue(innerValue.toString());
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 0);
  };

  // 处理输入更改
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 处理失焦和按回车
  const handleInputBlur = () => {
    commitInput();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitInput();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  // 提交输入值
  const commitInput = () => {
    let newValue: number;

    // 尝试解析输入值
    try {
      newValue = parseFloat(inputValue);

      // 处理NaN或非数字
      if (isNaN(newValue)) {
        newValue = innerValue;
      }

      // 确保值在有效范围内
      newValue = Math.max(min, Math.min(max, newValue));

      // 应用步长
      if (step !== 0) {
        // 将值四舍五入到最接近的步长
        const steps = Math.round((newValue - min) / step);
        newValue = min + steps * step;
        // 处理浮点数精度问题
        newValue = parseFloat(newValue.toFixed(10));
      }

      // 更新值并触发onChange
      setInnerValue(newValue);
      onChange(newValue);
    } catch (error) {
      // 如果解析失败，保持原值
      console.error("Invalid input:", error);
    }

    setIsEditing(false);
    setValueWidth(null);
  };
  
  // 生成刻度标记
  const renderTicks = () => {
    if (!showTicks) return null;
    
    const ticks = [];
    const count = Math.min(tickCount, 10); // 限制最多10个刻度，避免过密
    
    for (let i = 0; i < count; i++) {
      const value = min + (i * (max - min) / (count - 1));
      const formattedValue = i === 0 || i === count - 1 || i === Math.floor(count / 2) 
        ? formatValue(Number(value.toFixed(2))) 
        : '';
        
      ticks.push(
        <div 
          key={i} 
          className={styles.tick} 
          data-value={formattedValue}
        />
      );
    }
    
    return <div className={styles.tickMarks}>{ticks}</div>;
  };

  // 创建输入框样式，确保宽度与原始值显示匹配
  const inputStyle = valueWidth ? { width: `${valueWidth}px` } : {};

  return (
    <div className={`${styles.sliderContainer} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && (
        <div className={styles.labelContainer}>
          <label className={styles.label}>{label}</label>
          {showValue && (
            isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                className={styles.valueInput}
                style={inputStyle}
                autoFocus
              />
            ) : (
              <span 
                ref={valueRef}
                className={`${styles.value} ${styles.editable}`} 
                onClick={handleValueClick}
                title="点击编辑值"
              >
                {formatValue(innerValue)}
              </span>
            )
          )}
        </div>
      )}
      
      <div className={styles.sliderWrapper} ref={sliderRef}>
        <div 
          className={styles.progress} 
          ref={progressRef}
        />
        <div 
          className={styles.sliderThumb} 
          ref={thumbRef}
        />
        <input
          ref={rangeRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={innerValue}
          onChange={handleSliderChange}
          className={styles.slider}
        />
      </div>
      
      {showTicks && renderTicks()}
      
      {helperText && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
};

export default Slider; 