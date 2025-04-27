"use client";

import React from 'react';
import styles from './PVPConfig.module.css';
import Card from '../ui/Card';
import Select from '../ui/Select';
import Slider from '../ui/Slider';
import Checkbox from '../ui/Checkbox';
import { useServerConfig } from '../../contexts/ServerConfigContext';

const PVPConfig: React.FC = () => {
  const { config, updateConfig } = useServerConfig();

  // 处理选择框变化
  const handleSelectChange = (key: string) => (value: string) => {
    updateConfig(`Settings.${key}`, parseInt(value, 10));
  };

  // 处理复选框变化
  const handleCheckboxChange = (key: string) => (checked: boolean) => {
    updateConfig(`Settings.${key}`, checked);
  };
  
  // 城堡伤害模式选项
  const castleDamageModeOptions = [
    { value: 0, label: '禁用' },
    { value: 1, label: '随时可伤害' },
    { value: 2, label: '仅限时间窗口' },
    { value: 3, label: '仅限战争活动' }
  ];

  // 攻城武器生命值选项
  const siegeWeaponHealthOptions = [
    { value: 0, label: '750' },
    { value: 1, label: '1000' },
    { value: 2, label: '1250' },
    { value: 3, label: '1750' },
    { value: 4, label: '2500' },
    { value: 5, label: '4000' },
    { value: 6, label: '5000' },
    { value: 7, label: '7500' }
  ];

  // 玩家伤害模式选项
  const playerDamageModeOptions = [
    { value: 0, label: '随时可伤害' },
    { value: 1, label: '仅限时间窗口' },
    { value: 2, label: '禁用' }
  ];

  // 城堡之心伤害模式选项
  const castleHeartDamageModeOptions = [
    { value: 0, label: '仅衰败时可摧毁' },
    { value: 1, label: '可被玩家摧毁' },
    { value: 2, label: '可被占领或摧毁' },
    { value: 3, label: '禁用' }
  ];

  // PvP保护模式选项
  const pvpProtectionModeOptions = [
    { value: 0, label: '无保护' },
    { value: 1, label: '15分钟' },
    { value: 2, label: '30分钟' },
    { value: 3, label: '1小时' },
    { value: 4, label: '2小时' }
  ];

  return (
    <Card 
      title="PVP设置" 
      subtitle="配置玩家对战和城堡攻击规则"
      className={styles.card}
    >
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>⚔️</span>
          <span>玩家对战设置</span>
        </h4>
        <div className={styles.formGrid}>
          <div className={styles.selectItem}>
            <Select
              label="PVP玩家伤害模式"
              options={playerDamageModeOptions}
              value={config.Settings.PlayerDamageMode}
              onChange={handleSelectChange('PlayerDamageMode')}
              helperText="玩家何时可以被伤害"
            />
          </div>
          
          <div className={styles.selectItem}>
            <Select
              label="PVP保护模式"
              options={pvpProtectionModeOptions}
              value={config.Settings.PvPProtectionMode}
              onChange={handleSelectChange('PvPProtectionMode')}
              helperText="新玩家PvP保护时间"
            />
          </div>
          
          <div className={styles.checkboxWrapper}>
            <Checkbox
              label="PVP允许掠夺敌方容器"
              checked={config.Settings.CanLootEnemyContainers}
              onChange={handleCheckboxChange('CanLootEnemyContainers')}
              helperText="是否可以打开并掠夺敌方箱子"
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🏰</span>
          <span>城堡攻击设置</span>
        </h4>
        <div className={styles.formGrid}>
          <div className={styles.selectItem}>
            <Select
              label="PVP城堡伤害模式"
              options={castleDamageModeOptions}
              value={config.Settings.CastleDamageMode}
              onChange={handleSelectChange('CastleDamageMode')}
              helperText="城堡何时可以被伤害"
            />
          </div>
          
          <div className={styles.selectItem}>
            <Select
              label="PVP城堡之心伤害模式"
              options={castleHeartDamageModeOptions}
              value={config.Settings.CastleHeartDamageMode}
              onChange={handleSelectChange('CastleHeartDamageMode')}
              helperText="城堡之心何时可以被伤害"
            />
          </div>
          
          <div className={styles.selectItem}>
            <Select
              label="PVP攻城武器生命值"
              options={siegeWeaponHealthOptions}
              value={config.Settings.SiegeWeaponHealth}
              onChange={handleSelectChange('SiegeWeaponHealth')}
              helperText="攻城武器的耐久度"
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>⏱️</span>
          <span>PVP时间设置</span>
        </h4>
        <div className={styles.formGrid}>
          <Slider
            label="PVP城堡攻城计时器"
            min={60}
            max={1800}
            step={60}
            value={config.Settings.CastleSiegeTimer}
            onChange={(value) => updateConfig('Settings.CastleSiegeTimer', value)}
            valueFormat={(value) => `${Math.floor(value / 60)}分钟`}
            helperText="城堡攻城持续时间（60-1800秒）"
            showTicks
          />
          
          <Slider
            label="PVP城堡受攻击计时器"
            min={0}
            max={60}
            step={5}
            value={config.Settings.CastleUnderAttackTimer}
            onChange={(value) => updateConfig('Settings.CastleUnderAttackTimer', value)}
            valueFormat={(value) => `${value}秒`}
            helperText="城堡受攻击状态持续时间（0-60秒）"
            showTicks
          />
          
          <Slider
            label="PVP城堡突袭计时器"
            min={60}
            max={3600}
            step={60}
            value={config.Settings.CastleRaidTimer}
            onChange={(value) => updateConfig('Settings.CastleRaidTimer', value)}
            valueFormat={(value) => `${Math.floor(value / 60)}分钟`}
            helperText="城堡突袭状态持续时间（60-3600秒）"
            showTicks
          />
          
          <Slider
            label="PVP城堡突袭保护时间"
            min={0}
            max={604800}
            step={3600}
            value={config.Settings.CastleRaidProtectionTime}
            onChange={(value) => updateConfig('Settings.CastleRaidProtectionTime', value)}
            valueFormat={(value) => {
              if (value === 0) return "禁用";
              if (value < 3600) return `${Math.floor(value / 60)}分钟`;
              if (value < 86400) return `${Math.floor(value / 3600)}小时`;
              return `${Math.floor(value / 86400)}天`;
            }}
            helperText="城堡在被袭击后不能再次被攻击的时间（0-604800秒，7天）"
            showTicks
          />
          
          <Slider
            label="PVP城堡暴露免费占领计时器"
            min={0}
            max={3600}
            step={60}
            value={config.Settings.CastleExposedFreeClaimTimer}
            onChange={(value) => updateConfig('Settings.CastleExposedFreeClaimTimer', value)}
            valueFormat={(value) => {
              if (value === 0) return "禁用";
              return `${Math.floor(value / 60)}分钟`;
            }}
            helperText="当城堡暴露（主人离线/血精华耗尽）后能被免费占领的时间（0-3600秒）"
            showTicks
          />
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🔔</span>
          <span>PVP附加选项</span>
        </h4>
        <div className={styles.checkboxGrid}>
          <Checkbox
            label="PVP宣布攻城武器生成"
            checked={config.Settings.AnnounceSiegeWeaponSpawn}
            onChange={handleCheckboxChange('AnnounceSiegeWeaponSpawn')}
            helperText="当攻城武器生成时通知所有玩家"
          />
          
          <Checkbox
            label="PVP显示攻城武器地图图标"
            checked={config.Settings.ShowSiegeWeaponMapIcon}
            onChange={handleCheckboxChange('ShowSiegeWeaponMapIcon')}
            helperText="在地图上显示攻城武器的位置"
          />
          
          <Checkbox
            label="PVP免费突袭城堡"
            checked={config.Settings.FreeCastleRaid}
            onChange={handleCheckboxChange('FreeCastleRaid')}
            helperText="玩家可以免费突袭其他人的城堡，无需消耗资源"
          />
          
          <Checkbox
            label="PVP免费占领城堡"
            checked={config.Settings.FreeCastleClaim}
            onChange={handleCheckboxChange('FreeCastleClaim')}
            helperText="玩家可以免费占领暴露的城堡，无需消耗资源"
          />
          
          <Checkbox
            label="PVP免费摧毁城堡"
            checked={config.Settings.FreeCastleDestroy}
            onChange={handleCheckboxChange('FreeCastleDestroy')}
            helperText="玩家可以免费摧毁城堡，无需消耗资源"
          />
        </div>
      </div>
    </Card>
  );
};

export default PVPConfig; 