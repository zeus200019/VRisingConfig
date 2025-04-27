"use client";

import React from 'react';
import styles from './CombatConfig.module.css';
import Card from '../ui/Card';
import Slider from '../ui/Slider';
import { useServerConfig } from '../../contexts/ServerConfigContext';

const CombatConfig: React.FC = () => {
  const { config, updateConfig } = useServerConfig();

  // 处理吸血鬼属性变化
  const handleVampireStatChange = (key: string) => (value: number) => {
    updateConfig(`Settings.VampireStatModifiers.${key}`, value);
  };

  // 处理全局单位属性变化
  const handleUnitStatChange = (statType: string) => (key: string) => (value: number) => {
    updateConfig(`Settings.UnitStatModifiers_${statType}.${key}`, value);
  };

  // 处理装备属性变化
  const handleEquipmentStatChange = (key: string) => (value: number) => {
    updateConfig(`Settings.EquipmentStatModifiers_Global.${key}`, value);
  };

  // 处理弱点属性变化
  const handleWeaknessStatChange = (key: string) => (value: number) => {
    updateConfig(`Settings.${key}`, value);
  };

  // 格式化倍率显示
  const formatMultiplier = (value: number) => `${value}x`;

  return (
    <Card 
      title="战斗设置" 
      subtitle="配置吸血鬼能力、敌人属性和战斗系统"
      className={styles.card}
    >
      <div className={styles.combatSection}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>⚔️</span>
          <span>吸血鬼属性</span>
        </h4>
        <div className={styles.sliderGrid}>
          <Slider
            label="最大生命值倍率"
            min={0.01}
            max={10}
            step={0.1}
            value={config.Settings.VampireStatModifiers.MaxHealthModifier}
            onChange={handleVampireStatChange('MaxHealthModifier')}
            valueFormat={formatMultiplier}
            helperText="调整玩家的最大生命值（范围: 0.01-10）"
            showTicks
          />
          
          <Slider
            label="物理力量倍率"
            min={0.01}
            max={10}
            step={0.1}
            value={config.Settings.VampireStatModifiers.PhysicalPowerModifier}
            onChange={handleVampireStatChange('PhysicalPowerModifier')}
            valueFormat={formatMultiplier}
            helperText="调整玩家的物理攻击力（范围: 0.01-10）"
            showTicks
          />
          
          <Slider
            label="法术力量倍率"
            min={0.01}
            max={10}
            step={0.1}
            value={config.Settings.VampireStatModifiers.SpellPowerModifier}
            onChange={handleVampireStatChange('SpellPowerModifier')}
            valueFormat={formatMultiplier}
            helperText="调整玩家的法术攻击力（范围: 0.01-10）"
            showTicks
          />
          
          <Slider
            label="资源攻击力倍率"
            min={0.01}
            max={10}
            step={0.1}
            value={config.Settings.VampireStatModifiers.ResourcePowerModifier}
            onChange={handleVampireStatChange('ResourcePowerModifier')}
            valueFormat={formatMultiplier}
            helperText="调整玩家采集资源的效率，越大破坏资源点的速度越快（范围: 0.01-10）"
            showTicks
          />
          
          <Slider
            label="攻城力量倍率"
            min={0.01}
            max={10}
            step={0.1}
            value={config.Settings.VampireStatModifiers.SiegePowerModifier}
            onChange={handleVampireStatChange('SiegePowerModifier')}
            valueFormat={formatMultiplier}
            helperText="调整玩家对城堡的攻击力（范围: 0.01-10）"
            showTicks
          />
          
          <Slider
            label="受到伤害倍率"
            min={0.01}
            max={10}
            step={0.1}
            value={config.Settings.VampireStatModifiers.DamageReceivedModifier}
            onChange={handleVampireStatChange('DamageReceivedModifier')}
            valueFormat={formatMultiplier}
            helperText="调整玩家受到的伤害，值越大伤害越高"
            showTicks
          />
        </div>
      </div>

      <div className={styles.combatSection}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🧰</span>
          <span>装备属性修改器</span>
        </h4>
        <div className={styles.sliderGrid}>
          <Slider
            label="最大生命值倍率"
            min={0.01}
            max={10}
            step={0.1}
            value={config.Settings.EquipmentStatModifiers_Global.MaxHealthModifier}
            onChange={handleEquipmentStatChange('MaxHealthModifier')}
            valueFormat={formatMultiplier}
            helperText="调整装备提供的最大生命值（范围: 0.01-10）"
            showTicks
          />
          
          <Slider
            label="资源产出倍率"
            min={0.01}
            max={10}
            step={0.1}
            value={config.Settings.EquipmentStatModifiers_Global.ResourceYieldModifier}
            onChange={handleEquipmentStatChange('ResourceYieldModifier')}
            valueFormat={formatMultiplier}
            helperText="调整装备提供的资源产出效率，越大单次攻击资源点的资源数量越多（范围: 0.01-10）"
            showTicks
          />
          
          <Slider
            label="物理力量倍率"
            min={0.01}
            max={10}
            step={0.1}
            value={config.Settings.EquipmentStatModifiers_Global.PhysicalPowerModifier}
            onChange={handleEquipmentStatChange('PhysicalPowerModifier')}
            valueFormat={formatMultiplier}
            helperText="调整装备提供的物理攻击力（范围: 0.01-10）"
            showTicks
          />
          
          <Slider
            label="法术力量倍率"
            min={0.01}
            max={10}
            step={0.1}
            value={config.Settings.EquipmentStatModifiers_Global.SpellPowerModifier}
            onChange={handleEquipmentStatChange('SpellPowerModifier')}
            valueFormat={formatMultiplier}
            helperText="调整装备提供的法术攻击力（范围: 0.01-10）"
            showTicks
          />
          
          <Slider
            label="攻城力量倍率"
            min={0.01}
            max={10}
            step={0.1}
            value={config.Settings.EquipmentStatModifiers_Global.SiegePowerModifier}
            onChange={handleEquipmentStatChange('SiegePowerModifier')}
            valueFormat={formatMultiplier}
            helperText="调整装备提供的攻城能力（范围: 0.01-10）"
            showTicks
          />
          
          <Slider
            label="移动速度倍率"
            min={0.01}
            max={10}
            step={0.1}
            value={config.Settings.EquipmentStatModifiers_Global.MovementSpeedModifier}
            onChange={handleEquipmentStatChange('MovementSpeedModifier')}
            valueFormat={formatMultiplier}
            helperText="调整装备提供的移动速度（范围: 0.01-10）"
            showTicks
          />
        </div>
      </div>

      <div className={styles.combatSection}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>👹</span>
          <span>敌人属性</span>
        </h4>
        
        <div className={styles.enemySection}>
          <div className={styles.enemyGroup}>
            <h5 className={styles.enemyGroupTitle}>
              <span>🧟</span>
              <span>全局怪物单位</span>
            </h5>
            <div className={styles.sliderGrid}>
              <Slider
                label="最大生命值倍率"
                min={0.01}
                max={10}
                step={0.1}
                value={config.Settings.UnitStatModifiers_Global.MaxHealthModifier}
                onChange={handleUnitStatChange('Global')('MaxHealthModifier')}
                valueFormat={formatMultiplier}
                helperText="调整所有怪物的最大生命值（范围: 0.01-10）"
                showTicks
              />
              
              <Slider
                label="力量倍率"
                min={0.01}
                max={10}
                step={0.1}
                value={config.Settings.UnitStatModifiers_Global.PowerModifier}
                onChange={handleUnitStatChange('Global')('PowerModifier')}
                valueFormat={formatMultiplier}
                helperText="调整所有怪物的攻击力（范围: 0.01-10）"
                showTicks
              />
              
              <Slider
                label="等级增加"
                min={0}
                max={100}
                step={1}
                value={config.Settings.UnitStatModifiers_Global.LevelIncrease}
                onChange={handleUnitStatChange('Global')('LevelIncrease')}
                valueFormat={(value) => `+${value}`}
                helperText="增加所有怪物的等级（范围: 0-100）"
                showTicks
              />
            </div>
          </div>
          
          <div className={styles.enemyGroup}>
            <h5 className={styles.enemyGroupTitle}>
              <span>👑</span>
              <span>V型血（BOSS）</span>
            </h5>
            <div className={styles.sliderGrid}>
              <Slider
                label="最大生命值倍率"
                min={0.01}
                max={10}
                step={0.1}
                value={config.Settings.UnitStatModifiers_VBlood.MaxHealthModifier}
                onChange={handleUnitStatChange('VBlood')('MaxHealthModifier')}
                valueFormat={formatMultiplier}
                helperText="调整V型血BOSS的最大生命值（范围: 0.01-10）"
                showTicks
              />
              
              <Slider
                label="力量倍率"
                min={0.01}
                max={10}
                step={0.1}
                value={config.Settings.UnitStatModifiers_VBlood.PowerModifier}
                onChange={handleUnitStatChange('VBlood')('PowerModifier')}
                valueFormat={formatMultiplier}
                helperText="调整V型血BOSS的攻击力（范围: 0.01-10）"
                showTicks
              />
              
              <Slider
                label="等级增加"
                min={0}
                max={100}
                step={1}
                value={config.Settings.UnitStatModifiers_VBlood.LevelIncrease}
                onChange={handleUnitStatChange('VBlood')('LevelIncrease')}
                valueFormat={(value) => `+${value}`}
                helperText="增加V型血BOSS的等级（范围: 0-100）"
                showTicks
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.combatSection}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🔄</span>
          <span>复活与重生设置</span>
        </h4>
        <div className={styles.sliderGrid}>
          <Slider
            label="PvP吸血鬼重生时间倍率"
            min={0}
            max={3}
            step={0.1}
            value={config.Settings.PvPVampireRespawnModifier}
            onChange={(value) => updateConfig('Settings.PvPVampireRespawnModifier', value)}
            valueFormat={formatMultiplier}
            helperText="调整PvP战斗中玩家重生时间的倍率，复活延迟*重生时间倍率"
            showTicks
          />
          
          <Slider
            label="复活延迟"
            min={0}
            max={30}
            step={0.5}
            value={config.Settings.VampireStatModifiers.ReviveCancelDelay}
            onChange={handleVampireStatChange('ReviveCancelDelay')}
            valueFormat={(value) => `${value}秒`}
            helperText="玩家可以取消复活的等待时间（范围: 0-30秒）"
            showTicks
          />
        </div>
      </div>

      <div className={styles.combatSection}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>☠️</span>
          <span>弱点系统</span>
        </h4>
        <div className={styles.weaknessGrid}>
          <Slider
            label="大蒜区域强度倍率"
            min={0}
            max={3}
            step={0.1}
            value={config.Settings.GarlicAreaStrengthModifier}
            onChange={handleWeaknessStatChange('GarlicAreaStrengthModifier')}
            valueFormat={formatMultiplier}
            helperText="调整大蒜区域对吸血鬼的伤害强度（范围: 0-3）"
            showTicks
          />
          
          <Slider
            label="神圣区域强度倍率"
            min={0}
            max={3}
            step={0.1}
            value={config.Settings.HolyAreaStrengthModifier}
            onChange={handleWeaknessStatChange('HolyAreaStrengthModifier')}
            valueFormat={formatMultiplier}
            helperText="调整神圣区域对吸血鬼的伤害强度（范围: 0-3）"
            showTicks
          />
          
          <Slider
            label="白银强度倍率"
            min={0}
            max={3}
            step={0.1}
            value={config.Settings.SilverStrengthModifier}
            onChange={handleWeaknessStatChange('SilverStrengthModifier')}
            valueFormat={formatMultiplier}
            helperText="调整白银对吸血鬼的伤害强度（范围: 0-3）"
            showTicks
          />
          
          <Slider
            label="阳光伤害倍率"
            min={0}
            max={3}
            step={0.1}
            value={config.Settings.SunDamageModifier}
            onChange={handleWeaknessStatChange('SunDamageModifier')}
            valueFormat={formatMultiplier}
            helperText="调整阳光对吸血鬼的伤害强度（范围: 0-3）"
            showTicks
          />
        </div>
      </div>
    </Card>
  );
};

export default CombatConfig;
