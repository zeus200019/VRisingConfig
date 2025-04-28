"use client";

import React from 'react';
import styles from './CastleConfig.module.css';
import Card from '../ui/Card';
import Slider from '../ui/Slider';
import Checkbox from '../ui/Checkbox';
import Select from '../ui/Select';
import { useServerConfig } from '../../contexts/ServerConfigContext';

const CastleConfig: React.FC = () => {
  const { config, updateConfig } = useServerConfig();

  // 处理城堡设置变化
  const handleCastleStatChange = (key: string) => (value: number) => {
    updateConfig(`Settings.CastleStatModifiers_Global.${key}`, value);
  };

  // 处理心脏等级限制变化
  const handleHeartLimitChange = (level: number, key: string) => (value: number) => {
    updateConfig(`Settings.CastleStatModifiers_Global.HeartLimits.Level${level}.${key}`, value);
  };

  // 处理复选框变化
  const handleCheckboxChange = (key: string) => (checked: boolean) => {
    updateConfig(`Settings.${key}`, checked);
  };

  // 获取心脏限制值，避免类型错误
  const getHeartLimitValue = (level: number, key: string): number => {
    const levelKey = `Level${level}` as keyof typeof config.Settings.CastleStatModifiers_Global.HeartLimits;
    const limits = config.Settings.CastleStatModifiers_Global.HeartLimits[levelKey];
    return limits[key as keyof typeof limits] as number;
  };
  
  // 城堡等级图标
  const getLevelIcon = (level: number) => {
    const icons = ['🏠', '🏡', '🏘️', '🏰', '🏯'];
    return icons[level - 1] || level.toString();
  };

  // 城堡心脏限制类型选项
  const castleHeartLimitTypeOptions = [
    { value: 0, label: '按玩家限制' },
    { value: 1, label: '按血族限制' }
  ];

  return (
    <Card 
      title="城堡设置" 
      subtitle="配置城堡限制和防御系统"
      className={styles.card}
    >
      <div className={styles.castleSection}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🏰</span>
          <span>城堡全局限制</span>
        </h4>
        <div className={styles.formGrid}>
          <div className={styles.selectItem}>
            <Select
              label="城堡之心上限类型"
              options={castleHeartLimitTypeOptions}
              value={config.Settings.CastleStatModifiers_Global.CastleHeartLimitType}
              onChange={(value) => handleCastleStatChange('CastleHeartLimitType')(parseInt(value, 10))}
              helperText="设置城堡数量限制的计算方式（0按玩家限制，1按血族限制）"
            />
          </div>
          
          <Slider
            label="城堡数量限制"
            min={0}
            max={255}
            step={1}
            value={config.Settings.CastleStatModifiers_Global.CastleLimit}
            onChange={handleCastleStatChange('CastleLimit')}
            helperText="每个玩家可拥有的最大城堡数量（0-255）"
            showTicks
          />
          
          <Slider
            label="监狱牢房上限"
            min={0}
            max={255}
            step={1}
            value={config.Settings.CastleStatModifiers_Global.PrisonCellLimit}
            onChange={handleCastleStatChange('PrisonCellLimit')}
            helperText="每个城堡最多可建造的监狱牢房数量（0-255）"
            showTicks
          />
          
          <Slider
            label="保险箱上限"
            min={0}
            max={255}
            step={1}
            value={config.Settings.CastleStatModifiers_Global.SafetyBoxLimit}
            onChange={handleCastleStatChange('SafetyBoxLimit')}
            helperText="每个城堡最多可建造的保险箱数量（0-255）"
            showTicks
          />
          
          <Slider
            label="坟墓上限"
            min={0}
            max={255}
            step={1}
            value={config.Settings.CastleStatModifiers_Global.TombLimit}
            onChange={handleCastleStatChange('TombLimit')}
            helperText="每个城堡最多可建造的坟墓数量（0-255）"
            showTicks
          />
          
          <Slider
            label="虫穴上限"
            min={0}
            max={255}
            step={1}
            value={config.Settings.CastleStatModifiers_Global.VerminNestLimit}
            onChange={handleCastleStatChange('VerminNestLimit')}
            helperText="每个城堡最多可建造的虫穴数量（0-255）"
            showTicks
          />
          
          <Slider
            label="黑暗王座上限"
            min={0}
            max={255}
            step={1}
            value={config.Settings.CastleStatModifiers_Global.ThroneOfDarknessLimit}
            onChange={handleCastleStatChange('ThroneOfDarknessLimit')}
            helperText="每个城堡最多可建造的黑暗王座数量（0-255）"
            showTicks
          />
          
          <Slider
            label="眼结构上限"
            min={0}
            max={255}
            step={1}
            value={config.Settings.CastleStatModifiers_Global.EyeStructuresLimit}
            onChange={handleCastleStatChange('EyeStructuresLimit')}
            helperText="每个城堡最多可建造的眼结构数量（0-255）"
            showTicks
          />
          
          <Slider
            label="暗影召唤法阵上限"
            min={0}
            max={255}
            step={1}
            value={config.Settings.CastleStatModifiers_Global.NetherGateLimit}
            onChange={handleCastleStatChange('NetherGateLimit')}
            helperText="每个城堡最多可建造的暗影召唤法阵数量（0-255）"
            showTicks
          />
          
          <Slider
            label="竞技场站点上限"
            min={0}
            max={255}
            step={1}
            value={config.Settings.CastleStatModifiers_Global.ArenaStationLimit}
            onChange={handleCastleStatChange('ArenaStationLimit')}
            helperText="每个城堡最多可建造的竞技场站点数量（0-255）"
            showTicks
          />
          
          <Slider
            label="传送站上限"
            min={0}
            max={255}
            step={1}
            value={config.Settings.CastleStatModifiers_Global.RoutingStationLimit}
            onChange={handleCastleStatChange('RoutingStationLimit')}
            helperText="每个城堡最多可建造的传送站数量（0-255）"
            showTicks
          />
          
          <Slider
            label="城堡计时周期"
            min={0.1}
            max={600}
            step={0.1}
            value={config.Settings.CastleStatModifiers_Global.TickPeriod}
            onChange={handleCastleStatChange('TickPeriod')}
            valueFormat={(value) => `${value}秒`}
            helperText="城堡资源消耗和状态更新的计时周期（0.1-600秒）"
            showTicks
          />
        </div>
      </div>

      <div className={styles.castleSection}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>❤️</span>
          <span>城堡之心等级限制</span>
        </h4>
        <div className={styles.levelGrid}>
          {[1, 2, 3, 4, 5].map((level) => (
            <div key={level} className={styles.levelCard}>
              <h5 className={styles.levelTitle}>
                <span className={styles.levelIcon}>{getLevelIcon(level)}</span>
                <span>等级 {level} 城堡之心</span>
              </h5>
              <div className={styles.sliderContainer}>
                <Slider
                  label="地板上限"
                  min={0}
                  max={10000}
                  step={100}
                  value={getHeartLimitValue(level, 'FloorLimit')}
                  onChange={handleHeartLimitChange(level, 'FloorLimit')}
                  valueFormat={(value) => `${value}`}
                  helperText={`${level}级城堡之心的最大地板数量`}
                  showTicks={false}
                />
                
                <Slider
                  label="仆从上限"
                  min={0}
                  max={35}
                  step={1}
                  value={getHeartLimitValue(level, 'ServantLimit')}
                  onChange={handleHeartLimitChange(level, 'ServantLimit')}
                  valueFormat={(value) => `${value}`}
                  helperText={`${level}级城堡之心的最大仆从数量（0-35）`}
                  showTicks={false}
                />
                
                <Slider
                  label="高度上限"
                  min={0}
                  max={255}
                  step={1}
                  value={getHeartLimitValue(level, 'HeightLimit')}
                  onChange={handleHeartLimitChange(level, 'HeightLimit')}
                  valueFormat={(value) => `${value}`}
                  helperText={`${level}级城堡之心的最大建筑高度（0-255）`}
                  showTicks={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.castleSection}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🚫</span>
          <span>城堡限制设置</span>
        </h4>
        <div className={styles.formGrid}>
          <Slider
            label="城堡最小间距"
            min={0}
            max={255}
            step={1}
            value={config.Settings.CastleMinimumDistanceInFloors}
            onChange={(value) => updateConfig('Settings.CastleMinimumDistanceInFloors', value)}
            valueFormat={(value) => `${value}格`}
            helperText="玩家之间城堡必须保持的最小距离（0-255，已废弃/未使用）"
            showTicks
          />
          
          <Slider
            label="城堡迁移冷却时间"
            min={0}
            max={2592000}
            step={86400}
            value={config.Settings.CastleRelocationCooldown}
            onChange={(value) => updateConfig('Settings.CastleRelocationCooldown', value)}
            valueFormat={(value) => {
              if (value === 0) return "无冷却";
              if (value < 3600) return `${Math.floor(value / 60)}分钟`;
              if (value < 86400) return `${Math.floor(value / 3600)}小时`;
              return `${Math.floor(value / 86400)}天`;
            }}
            helperText="两次城堡迁移之间的冷却时间（0-2592000秒，30天）"
            showTicks
          />
          
          <div className={styles.checkboxWrapper}>
            <Checkbox
              label="启用城堡迁移"
              checked={config.Settings.CastleRelocationEnabled}
              onChange={handleCheckboxChange('CastleRelocationEnabled')}
              helperText="允许玩家迁移他们的城堡到新位置"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CastleConfig;
