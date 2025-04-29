"use client";

import React from 'react';
import styles from './GameModeConfig.module.css';
import Card from '../ui/Card';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import { useServerConfig } from '../../contexts/ServerConfigContext';

const GameModeConfig: React.FC = () => {
  const { config, updateConfig } = useServerConfig();

  // 游戏难度选项
  const difficultyOptions = [
    { value: 0, label: '简单' },
    { value: 1, label: '普通' },
    { value: 2, label: '残酷' }
  ];

  // 游戏模式选项
  const gameModeOptions = [
    { value: 0, label: 'PVE玩家对环境模式' },
    { value: 1, label: 'PVP玩家对战模式' }
  ];

  // 死亡容器权限选项
  const deathContainerPermissionOptions = [
    { value: 0, label: '任何人' },
    { value: 1, label: '血族成员' },
    { value: 2, label: '仅限死者' }
  ];

  // 灵魂碎片数量选项
  const relicSpawnTypeOptions = [
    { value: 0, label: '唯一物品' },
    { value: 1, label: '数量充足' }
  ];

  // 处理选择框变化
  const handleSelectChange = (key: string) => (value: string) => {
    updateConfig(`Settings.${key}`, parseInt(value, 10));
  };

  // 处理复选框变化
  const handleCheckboxChange = (key: string) => (checked: boolean) => {
    updateConfig(`Settings.${key}`, checked);
  };

  return (
    <Card 
      title="游戏模式" 
      subtitle="设置游戏核心模式和规则"
      className={styles.card}
    >
      <div className={styles.sectionContainer}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🎮</span>
          <span>基础游戏设置</span>
        </h4>
        <div className={styles.formGrid}>
          <div className={styles.selectItem}>
            <Select
              label="游戏难度"
              options={difficultyOptions}
              value={config.Settings.GameDifficulty}
              onChange={handleSelectChange('GameDifficulty')}
              helperText="决定游戏整体难度"
            />
          </div>
          
          <div className={styles.selectItem}>
            <Select
              label="游戏模式"
              options={gameModeOptions}
              value={config.Settings.GameModeType}
              onChange={handleSelectChange('GameModeType')}
              helperText="PvE或PvP模式"
            />
          </div>
          
          <div className={styles.selectItem}>
            <Select
              label="灵魂碎片数量"
              options={relicSpawnTypeOptions}
              value={config.Settings.RelicSpawnType}
              onChange={handleSelectChange('RelicSpawnType')}
              helperText="灵魂碎片是否唯一（灵魂碎片就是一个装备，在后期击败特定boos掉落，能提供加成和一些特性）"
            />
          </div>
          
          <div className={styles.selectItem}>
            <Select
              label="死亡容器权限"
              options={deathContainerPermissionOptions}
              value={config.Settings.DeathContainerPermission}
              onChange={handleSelectChange('DeathContainerPermission')}
              helperText="谁可以搜刮死亡玩家物品"
            />
          </div>
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🧰</span>
          <span>其他设置</span>
        </h4>

        <div className={styles.checkboxContainer}>
          <h5 className={styles.checkboxTitle}>物品掠夺与掉落</h5>
          <div className={styles.checkboxGrid}>
            <Checkbox
              label="血契装备（死亡不掉落）"
              checked={config.Settings.BloodBoundEquipment}
              onChange={handleCheckboxChange('BloodBoundEquipment')}
              helperText="死亡时不会掉落已装备物品"
            />
          </div>
        </div>
        
        <div className={`${styles.checkboxContainer} ${styles.checkboxContainerSpaced}`}>
          <h5 className={styles.checkboxTitle}>移动与传送限制</h5>
          <div className={styles.checkboxGrid}>
            <Checkbox
              label="禁止携带资源物品使用传送阵"
              checked={config.Settings.TeleportBoundItems}
              onChange={handleCheckboxChange('TeleportBoundItems')}
              helperText="开启后玩家不能在携带资源物品时使用传送门，关闭则可以携带资源传送"
            />
            <Checkbox
              label="禁止携带资源物品变为蝙蝠形态"
              checked={config.Settings.BatBoundItems}
              onChange={handleCheckboxChange('BatBoundItems')}
              helperText="开启后玩家不能在携带资源物品时变身蝙蝠，关闭则可以携带资源变身蝙蝠"
            />
            
            <Checkbox
              label="禁止携带灵魂碎片变为蝙蝠形态"
              checked={config.Settings.BatBoundShards}
              onChange={handleCheckboxChange('BatBoundShards')}
              helperText="开启后玩家不能在携带灵魂碎片时变身蝙蝠，关闭则可以携带灵魂碎片变身蝙蝠"
            />
          </div>
        </div>
        
        <div className={`${styles.checkboxContainer} ${styles.checkboxContainerSpaced}`}>
          <h5 className={styles.checkboxTitle}>游戏便利性</h5>
          <div className={styles.checkboxGrid}>
            <Checkbox
              label="开启世界聊天频道"
              checked={config.Settings.AllowGlobalChat}
              onChange={handleCheckboxChange('AllowGlobalChat')}
              helperText="允许使用全服聊天频道"
            />
            
            <Checkbox
              label="解锁所有传送点"
              checked={config.Settings.AllWaypointsUnlocked}
              onChange={handleCheckboxChange('AllWaypointsUnlocked')}
              helperText="玩家启动时拥有所有传送点"
            />
          </div>
        </div>
        
      </div>
    </Card>
  );
};

export default GameModeConfig;
