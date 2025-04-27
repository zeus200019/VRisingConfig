"use client";

import React, { useMemo } from 'react';
import styles from './WarEventConfig.module.css';
import Card from '../ui/Card';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Slider from '../ui/Slider';
import { useServerConfig } from '../../contexts/ServerConfigContext';

const WarEventConfig: React.FC = () => {
  const { config, updateConfig } = useServerConfig();

  // 处理选择变化
  const handleSelectChange = (key: string) => (value: string) => {
    updateConfig(`Settings.WarEventGameSettings.${key}`, parseInt(value));
  };

  // 处理滑块变化
  const handleSliderChange = (playerId: number, key: string) => (value: number) => {
    updateConfig(`Settings.WarEventGameSettings.ScalingPlayers${playerId}.${key}`, value);
  };

  // 处理时间输入变化
  const handleTimeInputChange = (timeType: string, timeKey: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    updateConfig(`Settings.WarEventGameSettings.${timeType}.${timeKey}`, value);
  };

  // 时间间隔选项
  const intervalOptions = [
    { value: 0, label: '30分钟' },
    { value: 1, label: '1小时' },
    { value: 2, label: '1小时30分钟' },
    { value: 3, label: '2小时' },
    { value: 4, label: '4小时' },
    { value: 5, label: '8小时' },
    { value: 6, label: '12小时' },
    { value: 7, label: '24小时' }
  ];

  // 持续时间选项
  const durationOptions = [
    { value: 0, label: '15分钟' },
    { value: 1, label: '20分钟' },
    { value: 2, label: '25分钟' },
    { value: 3, label: '30分钟' },
    { value: 4, label: '35分钟' },
    { value: 5, label: '40分钟' },
    { value: 6, label: '1小时' },
    { value: 7, label: '2小时' }
  ];

  // 格式化倍率
  const formatMultiplier = (value: number) => `${value}x`;

  // 计算工作日时间段百分比位置，用于可视化
  const weekdayTimePosition = useMemo(() => {
    const startHour = config.Settings.WarEventGameSettings.WeekdayTime.StartHour;
    const startMinute = config.Settings.WarEventGameSettings.WeekdayTime.StartMinute;
    const endHour = config.Settings.WarEventGameSettings.WeekdayTime.EndHour;
    const endMinute = config.Settings.WarEventGameSettings.WeekdayTime.EndMinute;
    
    const startPercentage = ((startHour * 60 + startMinute) / (24 * 60)) * 100;
    const endPercentage = ((endHour * 60 + endMinute) / (24 * 60)) * 100;
    
    return { startPercentage, endPercentage };
  }, [
    config.Settings.WarEventGameSettings.WeekdayTime.StartHour,
    config.Settings.WarEventGameSettings.WeekdayTime.StartMinute,
    config.Settings.WarEventGameSettings.WeekdayTime.EndHour,
    config.Settings.WarEventGameSettings.WeekdayTime.EndMinute
  ]);

  // 计算周末时间段百分比位置，用于可视化
  const weekendTimePosition = useMemo(() => {
    const startHour = config.Settings.WarEventGameSettings.WeekendTime.StartHour;
    const startMinute = config.Settings.WarEventGameSettings.WeekendTime.StartMinute;
    const endHour = config.Settings.WarEventGameSettings.WeekendTime.EndHour;
    const endMinute = config.Settings.WarEventGameSettings.WeekendTime.EndMinute;
    
    const startPercentage = ((startHour * 60 + startMinute) / (24 * 60)) * 100;
    const endPercentage = ((endHour * 60 + endMinute) / (24 * 60)) * 100;
    
    return { startPercentage, endPercentage };
  }, [
    config.Settings.WarEventGameSettings.WeekendTime.StartHour,
    config.Settings.WarEventGameSettings.WeekendTime.StartMinute,
    config.Settings.WarEventGameSettings.WeekendTime.EndHour,
    config.Settings.WarEventGameSettings.WeekendTime.EndMinute
  ]);

  // 格式化时间显示
  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  // 渲染时间选择组件
  const renderTimeInputs = (timeType: 'WeekdayTime' | 'WeekendTime', title: string, icon: string, description: string, timePosition: { startPercentage: number, endPercentage: number }) => {
    // 使用类型安全的方式访问时间设置
    const timeSettings = config.Settings.WarEventGameSettings[timeType];
    
    // 格式化当前选择的时间范围文本
    const timeRangeText = `${formatTime(timeSettings.StartHour, timeSettings.StartMinute)} - ${formatTime(timeSettings.EndHour, timeSettings.EndMinute)}`;
    
    return (
      <div className={styles.timeInputGroup}>
        <h5 className={styles.timeInputTitle}>
          <span className={styles.timeInputIcon}>{icon}</span>
          <span>{title}</span>
        </h5>
        <p className={styles.timeDescription}>
          {description}
        </p>
        
        <div className={styles.timeInputs}>
          <div className={styles.timeRow}>
            <div className={styles.timeRangeBlock}>
              <div className={styles.timeRangeLabel}>开始时间</div>
              <div className={styles.timeRangeInputs}>
                <div className={styles.timeInput}>
                  <Input
                    label="小时"
                    type="number"
                    min={0}
                    max={23}
                    value={timeSettings.StartHour}
                    onChange={handleTimeInputChange(timeType, 'StartHour')}
                    helperText="0-23 小时"
                    showNumberControls
                  />
                </div>
                <div className={styles.timeInput}>
                  <Input
                    label="分钟"
                    type="number"
                    min={0}
                    max={59}
                    value={timeSettings.StartMinute}
                    onChange={handleTimeInputChange(timeType, 'StartMinute')}
                    helperText="0-59 分钟"
                    showNumberControls
                  />
                </div>
              </div>
            </div>
            
            <span className={styles.timeSeparator}>至</span>
            
            <div className={styles.timeRangeBlock}>
              <div className={styles.timeRangeLabel}>结束时间</div>
              <div className={styles.timeRangeInputs}>
                <div className={styles.timeInput}>
                  <Input
                    label="小时"
                    type="number"
                    min={0}
                    max={23}
                    value={timeSettings.EndHour}
                    onChange={handleTimeInputChange(timeType, 'EndHour')}
                    helperText="0-23 小时"
                    showNumberControls
                  />
                </div>
                <div className={styles.timeInput}>
                  <Input
                    label="分钟"
                    type="number"
                    min={0}
                    max={59}
                    value={timeSettings.EndMinute}
                    onChange={handleTimeInputChange(timeType, 'EndMinute')}
                    helperText="0-59 分钟"
                    showNumberControls
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.timeVisualization}>
          <div className={styles.timeAxisLabel}>
            <span>00:00</span>
            <span>12:00</span>
            <span>23:59</span>
          </div>
          <div className={styles.timeAxis}>
            <div
              className={styles.timeSegment}
              style={{
                left: `${timePosition.startPercentage}%`,
                width: `${timePosition.endPercentage - timePosition.startPercentage}%`
              }}
              title={timeRangeText}
            >
              {timeRangeText}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card 
      title="莫尔提姆裂隙设置" 
      subtitle="配置莫尔提姆裂隙入侵事件的参数（这是一个中后期刷装备的地方）"
      className={styles.card}
    >
      <div className={styles.eventSection}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>⏱️</span>
          <span>时间与频率设置</span>
        </h4>
        <div className={styles.formGrid}>
          <Select
            label="事件间隔周期"
            options={intervalOptions}
            value={config.Settings.WarEventGameSettings.Interval.toString()}
            onChange={handleSelectChange('Interval')}
            helperText="莫尔提姆裂隙入侵事件两次出现之间的时间间隔"
          />
          
          <Select
            label="大型入侵持续时间"
            options={durationOptions}
            value={config.Settings.WarEventGameSettings.MajorDuration.toString()}
            onChange={handleSelectChange('MajorDuration')}
            helperText="大型莫尔提姆裂隙入侵存在的持续时间"
          />
          
          <Select
            label="小型入侵持续时间"
            options={durationOptions}
            value={config.Settings.WarEventGameSettings.MinorDuration.toString()}
            onChange={handleSelectChange('MinorDuration')}
            helperText="小型莫尔提姆裂隙入侵存在的持续时间"
          />
        </div>

        <div className={styles.timeGroupsContainer}>
          {renderTimeInputs(
            'WeekdayTime',
            '工作日可用时间范围',
            '📅',
            '设置工作日（周一至周五）期间莫尔提姆裂隙入侵事件可以出现的时间段。只有在这个时间范围内，事件才会被触发。设置为 00:00 至 23:59 表示全天可用。',
            weekdayTimePosition
          )}
          
          {renderTimeInputs(
            'WeekendTime',
            '周末可用时间范围',
            '🗓️',
            '设置周末（周六和周日）期间莫尔提姆裂隙入侵事件可以出现的时间段。通常可以设置比工作日更宽松的时间范围，以便更多玩家参与。',
            weekendTimePosition
          )}
        </div>
      </div>

      <div className={styles.eventSection}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>👥</span>
          <span>多人缩放系数</span>
        </h4>
        
        <div className={styles.description}>
          当多个玩家参与莫尔提姆裂隙事件时，游戏会根据玩家数量自动调整难度和奖励。<strong>点数修改器</strong>数值越低，进入下一阶段需要击败的怪物数量越多；<strong>掉落修改器</strong>数值越高，玩家获得的奖励越多。针对不同人数设置合理的缩放系数，可以平衡游戏难度和奖励。
        </div>
        
        <div className={styles.scalingContainer}>
          <div className={styles.playerScalingCard}>
            <h5 className={styles.playerTitle}>
              <span className={styles.playerIcon}>1</span>
              <span>单人参与</span>
            </h5>
            <Slider
              label="点数修改器"
              min={0.1}
              max={3}
              step={0.1}
              value={config.Settings.WarEventGameSettings.ScalingPlayers1.PointsModifier}
              onChange={handleSliderChange(1, 'PointsModifier')}
              valueFormat={formatMultiplier}
              helperText="单人游戏中进入下一阶段所需击败的怪物数量倍率（越低越多）"
              showTicks
            />
            
            <Slider
              label="掉落修改器"
              min={0.1}
              max={3}
              step={0.1}
              value={config.Settings.WarEventGameSettings.ScalingPlayers1.DropModifier}
              onChange={handleSliderChange(1, 'DropModifier')}
              valueFormat={formatMultiplier}
              helperText="单人游戏中获得奖励的倍率调整（越高越多）"
              showTicks
            />
          </div>
          
          <div className={styles.playerScalingCard}>
            <h5 className={styles.playerTitle}>
              <span className={styles.playerIcon}>2</span>
              <span>双人参与</span>
            </h5>
            <Slider
              label="点数修改器"
              min={0.1}
              max={3}
              step={0.1}
              value={config.Settings.WarEventGameSettings.ScalingPlayers2.PointsModifier}
              onChange={handleSliderChange(2, 'PointsModifier')}
              valueFormat={formatMultiplier}
              helperText="双人游戏中进入下一阶段所需击败的怪物数量倍率（越低越多）"
              showTicks
            />
            
            <Slider
              label="掉落修改器"
              min={0.1}
              max={3}
              step={0.1}
              value={config.Settings.WarEventGameSettings.ScalingPlayers2.DropModifier}
              onChange={handleSliderChange(2, 'DropModifier')}
              valueFormat={formatMultiplier}
              helperText="双人游戏中获得奖励的倍率调整（越高越多）"
              showTicks
            />
          </div>
          
          <div className={styles.playerScalingCard}>
            <h5 className={styles.playerTitle}>
              <span className={styles.playerIcon}>3</span>
              <span>三人参与</span>
            </h5>
            <Slider
              label="点数修改器"
              min={0.1}
              max={3}
              step={0.1}
              value={config.Settings.WarEventGameSettings.ScalingPlayers3.PointsModifier}
              onChange={handleSliderChange(3, 'PointsModifier')}
              valueFormat={formatMultiplier}
              helperText="三人游戏中进入下一阶段所需击败的怪物数量倍率（越低越多）"
              showTicks
            />
            
            <Slider
              label="掉落修改器"
              min={0.1}
              max={3}
              step={0.1}
              value={config.Settings.WarEventGameSettings.ScalingPlayers3.DropModifier}
              onChange={handleSliderChange(3, 'DropModifier')}
              valueFormat={formatMultiplier}
              helperText="三人游戏中获得奖励的倍率调整（越高越多）"
              showTicks
            />
          </div>
          
          <div className={styles.playerScalingCard}>
            <h5 className={styles.playerTitle}>
              <span className={styles.playerIcon}>4</span>
              <span>四人参与</span>
            </h5>
            <Slider
              label="点数修改器"
              min={0.1}
              max={3}
              step={0.1}
              value={config.Settings.WarEventGameSettings.ScalingPlayers4.PointsModifier}
              onChange={handleSliderChange(4, 'PointsModifier')}
              valueFormat={formatMultiplier}
              helperText="四人游戏中进入下一阶段所需击败的怪物数量倍率（越低越多）"
              showTicks
            />
            
            <Slider
              label="掉落修改器"
              min={0.1}
              max={3}
              step={0.1}
              value={config.Settings.WarEventGameSettings.ScalingPlayers4.DropModifier}
              onChange={handleSliderChange(4, 'DropModifier')}
              valueFormat={formatMultiplier}
              helperText="四人游戏中获得奖励的倍率调整（越高越多）"
              showTicks
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WarEventConfig; 