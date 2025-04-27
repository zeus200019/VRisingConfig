"use client";

import React from 'react';
import styles from './ResourceModifierConfig.module.css';
import Card from '../ui/Card';
import Slider from '../ui/Slider';
import { useServerConfig } from '../../contexts/ServerConfigContext';

const ResourceModifierConfig: React.FC = () => {
  const { config, updateConfig } = useServerConfig();

  // 处理滑块变化
  const handleSliderChange = (key: string) => (value: number) => {
    // 对值进行舍入处理，解决浮点数精度问题
    const roundedValue = Math.round(value * 100) / 100;
    updateConfig(`Settings.${key}`, roundedValue);
  };

  // 处理商人滑块变化
  const handleTraderSliderChange = (key: string) => (value: number) => {
    // 对值进行舍入处理，解决浮点数精度问题
    const roundedValue = Math.round(value * 100) / 100;
    updateConfig(`Settings.TraderModifiers.${key}`, roundedValue);
  };

  // 格式化倍率显示
  const formatMultiplier = (value: number) => `${value}x`;

  // 确保TraderModifiers存在，如果不存在则使用默认值
  const traderModifiers = config.Settings.TraderModifiers || {
    StockModifier: 3.0, 
    PriceModifier: 1.0, 
    RestockTimerModifier: 0.3
  };

  return (
    <Card 
      title="资源倍率设置" 
      subtitle="优化游戏中资源的获取与消耗平衡"
      className={styles.card}
    >
      <div className={styles.sliderGroup}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🔮</span>
          <span>资源获取与掉落</span>
        </h4>
        <div className={styles.sliderGrid}>
          <Slider
            label="物品堆叠倍率"
            min={0.25}
            max={3}
            step={0.05}
            value={config.Settings.InventoryStacksModifier}
            onChange={(value) => {
              // 特殊处理最大值情况
              const finalValue = value >= 2.95 ? 3 : Math.round(value * 100) / 100;
              updateConfig('Settings.InventoryStacksModifier', finalValue);
            }}
            valueFormat={formatMultiplier}
            helperText="提高可在单个栏位堆叠的物品数量"
            showTicks
          />
          
          <Slider
            label="普通掉落倍率"
            min={0.25}
            max={3}
            step={0.05}
            value={config.Settings.DropTableModifier_General}
            onChange={(value) => {
              // 特殊处理最大值情况
              const finalValue = value >= 2.95 ? 3 : Math.round(value * 100) / 100;
              updateConfig('Settings.DropTableModifier_General', finalValue);
            }}
            valueFormat={formatMultiplier}
            helperText="增加普通怪物的战利品数量"
            showTicks
          />
          
          <Slider
            label="仆从猎杀资源倍率"
            min={0.25}
            max={3}
            step={0.05}
            value={config.Settings.DropTableModifier_Missions}
            onChange={(value) => {
              // 特殊处理最大值情况
              const finalValue = value >= 2.95 ? 3 : Math.round(value * 100) / 100;
              updateConfig('Settings.DropTableModifier_Missions', finalValue);
            }}
            valueFormat={formatMultiplier}
            helperText="增加仆从猎杀资源产出倍率（解锁黑暗王座后可以叫你的仆从出去打工）"
            showTicks
          />
          
          <Slider
            label="全局材料资源产出倍率"
            min={0.25}
            max={3}
            step={0.05}
            value={config.Settings.MaterialYieldModifier_Global}
            onChange={(value) => {
              // 特殊处理最大值情况
              const finalValue = value >= 2.95 ? 3 : Math.round(value * 100) / 100;
              updateConfig('Settings.MaterialYieldModifier_Global', finalValue);
            }}
            valueFormat={formatMultiplier}
            helperText="提高所有材料资源的采集产出效率"
            showTicks
          />
          
          <Slider
            label="血液精华产出倍率"
            min={0.25}
            max={3}
            step={0.05}
            value={config.Settings.BloodEssenceYieldModifier}
            onChange={(value) => {
              // 特殊处理最大值情况
              const finalValue = value >= 2.95 ? 3 : Math.round(value * 100) / 100;
              updateConfig('Settings.BloodEssenceYieldModifier', finalValue);
            }}
            valueFormat={formatMultiplier}
            helperText="增加血液精华的获取量"
            showTicks
          />
        </div>
      </div>

      <div className={styles.sliderGroup}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>⚖️</span>
          <span>资源消耗与维护</span>
        </h4>
        <div className={styles.sliderGrid}>
          <Slider
            label="玩家血型消耗倍率"
            min={0}
            max={3}
            step={0.1}
            value={config.Settings.BloodDrainModifier}
            onChange={handleSliderChange('BloodDrainModifier')}
            valueFormat={formatMultiplier}
            helperText="调整玩家血型资源的消耗速率（血型会随时间减少，不同血型可以提供不同加成）"
            showTicks
          />
          
          <Slider
            label="耐久度消耗倍率"
            min={0}
            max={3}
            step={0.1}
            value={config.Settings.DurabilityDrainModifier}
            onChange={handleSliderChange('DurabilityDrainModifier')}
            valueFormat={formatMultiplier}
            helperText="降低值使装备耐久度消耗更慢"
            showTicks
          />
          
          <Slider
            label="城堡衰败速率"
            min={0}
            max={3}
            step={0.1}
            value={config.Settings.CastleDecayRateModifier}
            onChange={handleSliderChange('CastleDecayRateModifier')}
            valueFormat={formatMultiplier}
            helperText="降低值使城堡衰败更慢"
            showTicks
          />
          
          <Slider
            label="城堡之心血精华消耗"
            min={0}
            max={3}
            step={0.1}
            value={config.Settings.CastleBloodEssenceDrainModifier}
            onChange={handleSliderChange('CastleBloodEssenceDrainModifier')}
            valueFormat={formatMultiplier}
            helperText="降低值使城堡之心消耗血液精华更慢"
            showTicks
          />
        </div>
      </div>

      <div className={styles.sliderGroup}>
        <h4 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🛒</span>
          <span>商人系统</span>
        </h4>
        <div className={styles.sliderGrid}>
          <Slider
            label="商人库存倍率"
            min={0.25}
            max={10}
            step={0.05}
            value={traderModifiers.StockModifier}
            onChange={handleTraderSliderChange('StockModifier')}
            valueFormat={formatMultiplier}
            helperText="增加商人可交易的物品数量"
            showTicks
          />
          
          <Slider
            label="商人价格倍率"
            min={0.25}
            max={10}
            step={0.05}
            value={traderModifiers.PriceModifier}
            onChange={handleTraderSliderChange('PriceModifier')}
            valueFormat={formatMultiplier}
            helperText="降低值使商品价格更便宜"
            showTicks
          />
          
          <Slider
            label="商人补货计时器倍率"
            min={0.25}
            max={10}
            step={0.05}
            value={traderModifiers.RestockTimerModifier}
            onChange={handleTraderSliderChange('RestockTimerModifier')}
            valueFormat={formatMultiplier}
            helperText="降低值使商人更快补充库存"
            showTicks
          />
        </div>
      </div>

      <div className={styles.buildResearchGroup}>
        <div className={styles.buildResearchHeader}>
          <h4 className={styles.buildResearchTitle}>
            <span className={styles.sectionIcon}>⚒️</span>
            <span>建造与研究系统</span>
          </h4>
        </div>

        <div className={styles.categoriesContainer}>
          <div className={styles.categoryGroup}>
            <h5 className={styles.categoryTitle}>成本倍率</h5>
            <div className={styles.categorySliders}>
              <Slider
                label="建造成本倍率"
                min={0}
                max={3}
                step={0.1}
                value={config.Settings.BuildCostModifier}
                onChange={handleSliderChange('BuildCostModifier')}
                valueFormat={formatMultiplier}
                helperText="降低值使建筑物消耗更少资源"
                showTicks
              />
              
              <Slider
                label="配方成本倍率"
                min={0}
                max={3}
                step={0.1}
                value={config.Settings.RecipeCostModifier}
                onChange={handleSliderChange('RecipeCostModifier')}
                valueFormat={formatMultiplier}
                helperText="降低值使物品制作消耗更少资源"
                showTicks
              />
              
              <Slider
                label="精炼成本倍率"
                min={0}
                max={3}
                step={0.1}
                value={config.Settings.RefinementCostModifier}
                onChange={handleSliderChange('RefinementCostModifier')}
                valueFormat={formatMultiplier}
                helperText="降低值使精炼消耗更少资源"
                showTicks
              />
              
              <Slider
                label="研究成本倍率"
                min={0}
                max={3}
                step={0.1}
                value={config.Settings.ResearchCostModifier}
                onChange={handleSliderChange('ResearchCostModifier')}
                valueFormat={formatMultiplier}
                helperText="降低值使研究消耗更少资源"
                showTicks
              />
              
              <Slider
                label="修理成本倍率"
                min={0}
                max={3}
                step={0.1}
                value={config.Settings.RepairCostModifier}
                onChange={handleSliderChange('RepairCostModifier')}
                valueFormat={formatMultiplier}
                helperText="降低值使修理消耗更少资源"
                showTicks
              />
            </div>
          </div>
          
          <div className={styles.categoryGroup}>
            <h5 className={styles.categoryTitle}>速度倍率</h5>
            <div className={styles.categorySliders}>
              <Slider
                label="制作速度倍率"
                min={0.25}
                max={6}
                step={0.05}
                value={config.Settings.CraftRateModifier}
                onChange={handleSliderChange('CraftRateModifier')}
                valueFormat={formatMultiplier}
                helperText="降低值使制作速度更快"
                showTicks
              />
              
              <Slider
                label="精炼速度倍率"
                min={0.25}
                max={6}
                step={0.05}
                value={config.Settings.RefinementRateModifier}
                onChange={handleSliderChange('RefinementRateModifier')}
                valueFormat={formatMultiplier}
                helperText="降低值使精炼速度更快"
                showTicks
              />
              
              <Slider
                label="研究时间倍率"
                min={0}
                max={6}
                step={0.05}
                value={config.Settings.ResearchTimeModifier}
                onChange={handleSliderChange('ResearchTimeModifier')}
                valueFormat={formatMultiplier}
                helperText="降低值使研究完成更快"
                showTicks
              />
              
              <Slider
                label="仆从转化速度倍率"
                min={0.25}
                max={6}
                step={0.05}
                value={config.Settings.ServantConvertRateModifier}
                onChange={handleSliderChange('ServantConvertRateModifier')}
                valueFormat={formatMultiplier}
                helperText="降低值使仆从转化更快"
                showTicks
              />
            </div>
          </div>
          
          <div className={`${styles.categoryGroup} ${styles.resourceEfficiency}`}>
            <h5 className={styles.categoryTitle}>资源效率</h5>
            <div className={styles.categorySliders}>
              <div className={styles.singleSlider}>
                <Slider
                  label="拆解资源倍率"
                  min={0}
                  max={1}
                  step={0.1}
                  value={config.Settings.DismantleResourceModifier}
                  onChange={handleSliderChange('DismantleResourceModifier')}
                  valueFormat={formatMultiplier}
                  helperText="提高值使拆解返还更多资源"
                  showTicks
                />
              </div>
            </div>
            <div className={styles.resourceEfficiencyDescription}>
              就是拆家返回的资源倍率
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResourceModifierConfig; 