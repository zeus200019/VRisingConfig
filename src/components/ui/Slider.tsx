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
  const sliderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className={`${styles.sliderContainer} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && (
        <div className={styles.labelContainer}>
          <label className={styles.label}>{label}</label>
          {showValue && <span className={styles.value}>{formatValue(innerValue)}</span>}
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