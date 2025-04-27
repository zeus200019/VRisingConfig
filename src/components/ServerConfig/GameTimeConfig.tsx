"use client";

import React from 'react';
import styles from './GameTimeConfig.module.css';
import Card from '../ui/Card';
import Slider from '../ui/Slider';
import Input from '../ui/Input';
import { useServerConfig } from '../../contexts/ServerConfigContext';
import { 
  Sun, 
  Moon, 
  Clock, 
  SunHorizon,
  MoonStars,
  Timer,
  Drop
} from '@phosphor-icons/react';

const GameTimeConfig: React.FC = () => {
  const { config, updateConfig } = useServerConfig();

  // 处理滑块变化
  const handleSliderChange = (key: string) => (value: number) => {
    updateConfig(`Settings.GameTimeModifiers.${key}`, value);
  };

  // 处理输入框变化
  const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      updateConfig(`Settings.GameTimeModifiers.${key}`, value);
    }
  };

  // 格式化时间显示
  const formatDayDuration = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return minutes > 0 
      ? `${minutes}分钟${seconds > 0 ? ` ${seconds}秒` : ''}`
      : `${seconds}秒`;
  };

  // 格式化百分比显示
  const formatPercentage = (value: number) => `${(value * 100).toFixed(0)}%`;

  const getDayNightPreview = () => {
    const dayStart = `${config.Settings.GameTimeModifiers.DayStartHour.toString().padStart(2, '0')}:${config.Settings.GameTimeModifiers.DayStartMinute.toString().padStart(2, '0')}`;
    const dayEnd = `${config.Settings.GameTimeModifiers.DayEndHour.toString().padStart(2, '0')}:${config.Settings.GameTimeModifiers.DayEndMinute.toString().padStart(2, '0')}`;
    return `${dayStart} - ${dayEnd}`;
  };

  // 计算日夜周期的总分钟数
  const getDayCycleDuration = () => {
    const dayStartMinutes = config.Settings.GameTimeModifiers.DayStartHour * 60 + config.Settings.GameTimeModifiers.DayStartMinute;
    const dayEndMinutes = config.Settings.GameTimeModifiers.DayEndHour * 60 + config.Settings.GameTimeModifiers.DayEndMinute;
    return dayEndMinutes >= dayStartMinutes 
      ? dayEndMinutes - dayStartMinutes 
      : (24 * 60) - dayStartMinutes + dayEndMinutes;
  };

  const getDayCyclePercentage = () => {
    return Math.round((getDayCycleDuration() / (24 * 60)) * 100);
  };

  return (
    <Card 
      title="游戏时间设置" 
      subtitle="配置游戏世界的时间流动和特殊事件"
      className={styles.card}
    >
      <div className={styles.timeSection}>
        <div className={styles.sectionHeader}>
          <h4 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>
              <Clock weight="duotone" />
            </span>
            <span>日夜循环</span>
          </h4>
          <div className={styles.dayNightPreview}>
            <div className={styles.dayCycleLabel}>
              <Timer weight="duotone" className={styles.previewIcon} />
              当前设置:
            </div>
            <div className={styles.dayCycleTime}>{getDayNightPreview()}</div>
            <div className={styles.dayCycleLabel}>
              <Sun weight="duotone" className={styles.previewIcon} />
              白天占比: <strong>{getDayCyclePercentage()}%</strong>
            </div>
          </div>
        </div>

        <div className={styles.timeVisualizer}>
          <div className={styles.timeAxis}>
            <div className={styles.timeTick} style={{left: '0%'}}>
              <Moon weight="duotone" className={styles.tickIcon} />
              00:00
            </div>
            <div className={styles.timeTick} style={{left: '25%'}}>
              <SunHorizon weight="duotone" className={styles.tickIcon} />
              06:00
            </div>
            <div className={styles.timeTick} style={{left: '50%'}}>
              <Sun weight="duotone" className={styles.tickIcon} />
              12:00
            </div>
            <div className={styles.timeTick} style={{left: '75%'}}>
              <SunHorizon weight="duotone" className={`${styles.tickIcon} ${styles.sunsetIcon}`} />
              18:00
            </div>
            <div className={styles.timeTick} style={{left: '100%'}}>
              <MoonStars weight="duotone" className={styles.tickIcon} />
              24:00
            </div>
          </div>
          
          <div className={styles.dayNightBar}>
            <div 
              className={styles.dayPeriod} 
              style={{
                left: `${(config.Settings.GameTimeModifiers.DayStartHour * 60 + config.Settings.GameTimeModifiers.DayStartMinute) / (24 * 60) * 100}%`,
                width: `${((config.Settings.GameTimeModifiers.DayEndHour * 60 + config.Settings.GameTimeModifiers.DayEndMinute) - 
                        (config.Settings.GameTimeModifiers.DayStartHour * 60 + config.Settings.GameTimeModifiers.DayStartMinute)) / (24 * 60) * 100}%`
              }}
            >
              <Sun weight="fill" className={styles.dayIcon} />
            </div>
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.timeInputCard}>
            <div className={styles.timeInputHeader}>
              <div className={styles.headerLeft}>
                <Timer weight="duotone" className={styles.headerIcon} />
                游戏内一天持续时间
              </div>
              <div className={styles.headerValue}>
                {formatDayDuration(config.Settings.GameTimeModifiers.DayDurationInSeconds)}
              </div>
            </div>
            <Slider
              label=""
              min={600}
              max={3600}
              step={60}
              value={config.Settings.GameTimeModifiers.DayDurationInSeconds}
              onChange={handleSliderChange('DayDurationInSeconds')}
              valueFormat={formatDayDuration}
              helperText="设置游戏内一天的现实时间长度"
              showTicks
            />
          </div>

          <div className={styles.timeInputCard}>
            <div className={styles.timeInputHeader}>
              <div className={styles.headerLeft}>
                <SunHorizon weight="duotone" className={styles.headerIcon} />
                日出时间
              </div>
            </div>
            <div className={styles.timeInputGroup}>
              <div className={styles.timeInputs}>
                <div className={styles.timeInput}>
                  <Input 
                    label="小时"
                    type="number"
                    min={0}
                    max={23}
                    value={config.Settings.GameTimeModifiers.DayStartHour}
                    onChange={handleInputChange('DayStartHour')}
                    showNumberControls
                  />
                </div>
                <div className={styles.timeInputDivider}>:</div>
                <div className={styles.timeInput}>
                  <Input 
                    label="分钟"
                    type="number"
                    min={0}
                    max={59}
                    value={config.Settings.GameTimeModifiers.DayStartMinute}
                    onChange={handleInputChange('DayStartMinute')}
                    showNumberControls
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.timeInputCard}>
            <div className={styles.timeInputHeader}>
              <div className={styles.headerLeft}>
                <SunHorizon weight="duotone" className={`${styles.headerIcon} ${styles.sunsetIcon}`} />
                日落时间
              </div>
            </div>
            <div className={styles.timeInputGroup}>
              <div className={styles.timeInputs}>
                <div className={styles.timeInput}>
                  <Input 
                    label="小时"
                    type="number"
                    min={0}
                    max={23}
                    value={config.Settings.GameTimeModifiers.DayEndHour}
                    onChange={handleInputChange('DayEndHour')}
                    showNumberControls
                  />
                </div>
                <div className={styles.timeInputDivider}>:</div>
                <div className={styles.timeInput}>
                  <Input 
                    label="分钟"
                    type="number"
                    min={0}
                    max={59}
                    value={config.Settings.GameTimeModifiers.DayEndMinute}
                    onChange={handleInputChange('DayEndMinute')}
                    showNumberControls
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.timeSection}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>
            <Drop weight="duotone" className={styles.bloodIcon} />
          </span>
          <span>血月事件</span>
        </h4>
        <div className={styles.bloodMoonContainer}>
          <div className={styles.bloodMoonInfo}>
            <div className={styles.bloodMoonDesc}>
              <p>血月是游戏中的特殊事件，玩家在此期间能力获得提升。调整频率可以改变游戏体验的节奏。</p>
            </div>
            <div className={styles.bloodMoonRange}>
              发生间隔: <strong>{config.Settings.GameTimeModifiers.BloodMoonFrequency_Min}-{config.Settings.GameTimeModifiers.BloodMoonFrequency_Max} 天</strong>
            </div>
          </div>
          <div className={styles.formGrid}>
            <Slider
              label="最短间隔周期（天）"
              min={1}
              max={30}
              step={1}
              value={config.Settings.GameTimeModifiers.BloodMoonFrequency_Min}
              onChange={handleSliderChange('BloodMoonFrequency_Min')}
              helperText="两次血月事件之间的最小天数"
              showTicks
            />
            
            <Slider
              label="最长间隔周期（天）"
              min={1}
              max={30}
              step={1}
              value={config.Settings.GameTimeModifiers.BloodMoonFrequency_Max}
              onChange={handleSliderChange('BloodMoonFrequency_Max')}
              helperText="两次血月事件之间的最大天数"
              showTicks
            />
            
            <Slider
              label="血月能力增强"
              min={0}
              max={1}
              step={0.05}
              value={config.Settings.GameTimeModifiers.BloodMoonBuff}
              onChange={handleSliderChange('BloodMoonBuff')}
              valueFormat={formatPercentage}
              helperText="血月期间玩家获得的力量提升"
              showTicks
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameTimeConfig; 