"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useRef } from 'react';
import styles from './ConfigExportImport.module.css';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useServerConfig } from '../../contexts/ServerConfigContext';

// 导入新增的树形视图组件
import dynamic from 'next/dynamic';
// 使用动态导入避免SSR错误
const ReactJson = dynamic(() => import('react-json-view'), { 
  ssr: false,
  loading: () => <div className={styles.loading}>加载中...</div>
});

// 配置类别定义
interface ConfigCategory {
  icon: string;
  title: string;
  key: string;
  items: ConfigItem[];
}

// 配置项定义
interface ConfigItem {
  path: (string|string[])[]; // 配置在JSON中的路径 - 可以是单个字符串路径或多个路径
  label: string;  // 显示名称
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: any) => string; // 可选的格式化函数
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueClass?: (value: any) => string; // 可选的CSS类名函数
}

// 导入预览信息
interface ImportPreview {
  fileName: string;
  serverName: string;
  configData: string;
  isStandaloneServer?: boolean; // 添加标识是否为私人服务器配置
}

const ConfigExportImport: React.FC = () => {
  const { exportConfig, importConfig, resetConfig, config } = useServerConfig();
  const [jsonConfig, setJsonConfig] = useState('');
  const [parsedJson, setParsedJson] = useState<Record<string, unknown>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [configSummary, setConfigSummary] = useState<Record<string, any>>({});
  const [showImport, setShowImport] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [downloadName] = useState('ServerGameSettings.json');
  const [isExpanded, setIsExpanded] = useState(true); // 默认全部展开
  // 导入预览信息
  const [importPreview, setImportPreview] = useState<ImportPreview | null>(null);
  // 添加是否为私人服务器配置模式的状态
  const [isStandaloneServerMode, setIsStandaloneServerMode] = useState(false);
  
  // 使用useEffect从localStorage中读取模式状态
  useEffect(() => {
    // 确保代码只在浏览器端执行
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('vrising_standalone_server_mode');
      if (savedMode === 'true') {
        setIsStandaloneServerMode(true);
      }
    }
  }, []);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 配置类别定义
  const configCategories: ConfigCategory[] = [
    {
      icon: '🔰',
      title: '基本信息',
      key: 'basic',
      items: [
        { path: ['Name'], label: '规则名称' },
        { path: ['Description'], label: '规则描述' }
      ]
    },
    {
      icon: '🎮',
      title: '游戏模式',
      key: 'gameMode',
      items: [
        { 
          path: ['Settings', 'GameModeType'], 
          label: '游戏模式', 
          format: (value) => {
            const modes: Record<number, string> = {
              0: 'PvE玩家对环境模式',
              1: 'PvP玩家对战模式'
            };
            return modes[value as number] || `未知模式(${value})`;
          }
        },
        { 
          path: ['Settings', 'GameDifficulty'], 
          label: '游戏难度', 
          format: (value) => {
            const difficulties: Record<number, string> = {
              0: '简单',
              1: '普通',
              2: '残酷'
            };
            return difficulties[value as number] || `未知难度(${value})`;
          }
        },
        { 
          path: ['Settings', 'BloodBoundEquipment'], 
          label: '血契装备', 
          valueClass: (value) => value ? 'enabled' : 'disabled',
          format: (value) => value ? '开启' : '关闭'
        },
        { 
          path: ['Settings', 'DeathContainerPermission'], 
          label: '死亡容器权限', 
          format: (value) => {
            const permissions: Record<number, string> = {
              0: '任何人',
              1: '血族成员',
              2: '仅限死者'
            };
            return permissions[value as number] || `未知权限(${value})`;
          }
        },
        { 
          path: ['Settings', 'RelicSpawnType'], 
          label: '灵魂碎片数量', 
          format: (value) => {
            const types: Record<number, string> = {
              0: '唯一物品',
              1: '数量充足'
            };
            return types[value as number] || `未知类型(${value})`;
          }
        },
        { 
          path: ['Settings', 'TeleportBoundItems'], 
          label: '禁止携带资源物品传送', 
          valueClass: (value) => value ? 'disabled' : 'enabled',
          format: (value) => value ? '禁止传送' : '允许传送'
        },
        { 
          path: ['Settings', 'BatBoundItems'], 
          label: '禁止携带资源物品变蝙蝠', 
          valueClass: (value) => value ? 'disabled' : 'enabled',
          format: (value) => value ? '禁止变身' : '允许变身'
        },
        { 
          path: ['Settings', 'BatBoundShards'], 
          label: '禁止携带灵魂碎片变蝙蝠', 
          valueClass: (value) => value ? 'disabled' : 'enabled',
          format: (value) => value ? '禁止变身' : '允许变身'
        },
        { 
          path: ['Settings', 'AllowGlobalChat'], 
          label: '世界聊天频道', 
          valueClass: (value) => value ? 'enabled' : 'disabled',
          format: (value) => value ? '开启' : '关闭'
        },
        { 
          path: ['Settings', 'AllWaypointsUnlocked'], 
          label: '解锁所有传送点', 
          valueClass: (value) => value ? 'enabled' : 'disabled',
          format: (value) => value ? '是' : '否'
        }
      ]
    },
    {
      icon: '⏱️',
      title: '游戏时间',
      key: 'gameTime',
      items: [
        { 
          path: ['Settings', 'GameTimeModifiers', 'DayDurationInSeconds'], 
          label: '游戏内一天持续时间', 
          format: (value) => `${Math.floor(Number(value) / 60)}分钟`
        },
        { 
          path: [
            ['Settings', 'GameTimeModifiers', 'DayStartHour'], 
            ['Settings', 'GameTimeModifiers', 'DayStartMinute']
          ], 
          label: '日出时间', 
          format: (values) => {
            if(Array.isArray(values) && values.length === 2) {
              return `${values[0].toString().padStart(2, '0')}:${values[1].toString().padStart(2, '0')}`;
            }
            return '未设置';
          }
        },
        { 
          path: [
            ['Settings', 'GameTimeModifiers', 'DayEndHour'], 
            ['Settings', 'GameTimeModifiers', 'DayEndMinute']
          ], 
          label: '日落时间', 
          format: (values) => {
            if(Array.isArray(values) && values.length === 2) {
              return `${values[0].toString().padStart(2, '0')}:${values[1].toString().padStart(2, '0')}`;
            }
            return '未设置';
          }
        },
        { 
          path: [
            ['Settings', 'GameTimeModifiers', 'BloodMoonFrequency_Min'], 
            ['Settings', 'GameTimeModifiers', 'BloodMoonFrequency_Max']
          ], 
          label: '血月出现间隔', 
          format: (values) => {
            if(Array.isArray(values) && values.length === 2) {
              return `${values[0]}-${values[1]} 天`;
            }
            return '未设置';
          }
        },
        { 
          path: ['Settings', 'GameTimeModifiers', 'BloodMoonBuff'], 
          label: '血月能力增强', 
          format: (value) => `${(Number(value) * 100).toFixed(0)}%`
        }
      ]
    },
    {
      icon: '📦',
      title: '资源倍率',
      key: 'resources',
      items: [
        { 
          path: ['Settings', 'InventoryStacksModifier'], 
          label: '物品堆叠倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'DropTableModifier_General'], 
          label: '普通掉落倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'DropTableModifier_Missions'], 
          label: '仆从猎杀资源倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'DropTableModifier_StygianShards'], 
          label: '暗影碎片战利品掉落倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'SoulShard_DurabilityLossRate'], 
          label: '灵魂碎片耐久度损失率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'MaterialYieldModifier_Global'], 
          label: '材料产出倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'BloodEssenceYieldModifier'], 
          label: '血精华产出倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'BloodDrainModifier'], 
          label: '血液消耗倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'DurabilityDrainModifier'], 
          label: '耐久消耗倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'CastleDecayRateModifier'], 
          label: '城堡衰败速率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'CastleBloodEssenceDrainModifier'], 
          label: '城堡血精华消耗',
          format: (value) => `${value}x`
        }
      ]
    },
    {
      icon: '⚒️',
      title: '建造与研究',
      key: 'crafting',
      items: [
        { 
          path: ['Settings', 'BuildCostModifier'], 
          label: '建造成本倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'RecipeCostModifier'], 
          label: '配方成本倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'RefinementCostModifier'], 
          label: '精炼成本倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'ResearchCostModifier'], 
          label: '研究成本倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'RepairCostModifier'], 
          label: '修理成本倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'CraftRateModifier'], 
          label: '制作速度倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'RefinementRateModifier'], 
          label: '精炼速度倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'ResearchTimeModifier'], 
          label: '研究时间倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'ServantConvertRateModifier'], 
          label: '仆从转化速度倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'DismantleResourceModifier'], 
          label: '拆解资源倍率',
          format: (value) => `${value}x`
        }
      ]
    },
    {
      icon: '🛒',
      title: '商人系统',
      key: 'traders',
      items: [
        { 
          path: ['Settings', 'TraderModifiers', 'StockModifier'], 
          label: '商人库存倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'TraderModifiers', 'PriceModifier'], 
          label: '商人价格倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'TraderModifiers', 'RestockTimerModifier'], 
          label: '商人补货计时器倍率',
          format: (value) => `${value}x`
        }
      ]
    },
    {
      icon: '⚔️',
      title: '战斗设置',
      key: 'combat',
      items: [
        { 
          path: ['Settings', 'VampireStatModifiers', 'MaxHealthModifier'], 
          label: '吸血鬼最大生命值倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'VampireStatModifiers', 'PhysicalPowerModifier'], 
          label: '吸血鬼物理力量倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'VampireStatModifiers', 'SpellPowerModifier'], 
          label: '吸血鬼法术力量倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'VampireStatModifiers', 'ResourcePowerModifier'], 
          label: '吸血鬼资源攻击力倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'VampireStatModifiers', 'SiegePowerModifier'], 
          label: '吸血鬼攻城力量倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'VampireStatModifiers', 'DamageReceivedModifier'], 
          label: '吸血鬼受到伤害倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'VampireStatModifiers', 'ReviveCancelDelay'], 
          label: '复活延迟',
          format: (value) => `${value}秒`
        },
        { 
          path: ['Settings', 'WeaponSlots'], 
          label: '武器槽位数量', 
          format: (value) => `${value}个`
        },
        { 
          path: ['Settings', 'PvPVampireRespawnModifier'], 
          label: 'PvP吸血鬼重生时间倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'UnitStatModifiers_Global', 'MaxHealthModifier'], 
          label: '怪物最大生命值倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'UnitStatModifiers_Global', 'PowerModifier'], 
          label: '怪物力量倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'UnitStatModifiers_Global', 'LevelIncrease'], 
          label: '怪物等级增加',
          format: (value) => `+${value}`
        },
        { 
          path: ['Settings', 'UnitStatModifiers_VBlood', 'MaxHealthModifier'], 
          label: 'V血BOSS生命值倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'UnitStatModifiers_VBlood', 'PowerModifier'], 
          label: 'V血BOSS力量倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'UnitStatModifiers_VBlood', 'LevelIncrease'], 
          label: 'V血BOSS等级增加',
          format: (value) => `+${value}`
        },
        { 
          path: ['Settings', 'EquipmentStatModifiers_Global', 'MaxHealthModifier'], 
          label: '装备最大生命值倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'EquipmentStatModifiers_Global', 'PhysicalPowerModifier'], 
          label: '装备物理力量倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'EquipmentStatModifiers_Global', 'SpellPowerModifier'], 
          label: '装备法术力量倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'EquipmentStatModifiers_Global', 'ResourceYieldModifier'], 
          label: '装备资源产出倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'EquipmentStatModifiers_Global', 'SiegePowerModifier'], 
          label: '装备攻城力量倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'EquipmentStatModifiers_Global', 'MovementSpeedModifier'], 
          label: '装备移动速度倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'GarlicAreaStrengthModifier'], 
          label: '大蒜区域强度倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'HolyAreaStrengthModifier'], 
          label: '神圣区域强度倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'SilverStrengthModifier'], 
          label: '白银强度倍率',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'SunDamageModifier'], 
          label: '阳光伤害倍率',
          format: (value) => `${value}x`
        }
      ]
    },
    {
      icon: '🏰',
      title: '城堡设置',
      key: 'castle',
      items: [
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'CastleHeartLimitType'], 
          label: '城堡之心上限类型',
          format: (value) => {
            const types: Record<number, string> = {
              0: '按玩家限制',
              1: '按血族限制'
            };
            return types[value as number] || `未知类型(${value})`;
          }
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'CastleLimit'], 
          label: '城堡数量限制'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'PrisonCellLimit'], 
          label: '监狱牢房上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'SafetyBoxLimit'], 
          label: '保险箱上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'TombLimit'], 
          label: '坟墓上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'VerminNestLimit'], 
          label: '虫穴上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'ThroneOfDarknessLimit'], 
          label: '黑暗王座上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'EyeStructuresLimit'], 
          label: '眼结构上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'NetherGateLimit'], 
          label: '暗影召唤法阵上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'ArenaStationLimit'], 
          label: '竞技场站点上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'RoutingStationLimit'], 
          label: '传送站上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'TickPeriod'], 
          label: '城堡计时周期',
          format: (value) => `${value}秒`
        },
        // 城堡心脏等级限制
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'HeartLimits', 'Level1', 'FloorLimit'], 
          label: 'L1心脏地板上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'HeartLimits', 'Level1', 'ServantLimit'], 
          label: 'L1心脏仆从上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'HeartLimits', 'Level1', 'HeightLimit'], 
          label: 'L1心脏高度上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'HeartLimits', 'Level2', 'FloorLimit'], 
          label: 'L2心脏地板上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'HeartLimits', 'Level2', 'ServantLimit'], 
          label: 'L2心脏仆从上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'HeartLimits', 'Level2', 'HeightLimit'], 
          label: 'L2心脏高度上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'HeartLimits', 'Level3', 'FloorLimit'], 
          label: 'L3心脏地板上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'HeartLimits', 'Level3', 'ServantLimit'], 
          label: 'L3心脏仆从上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'HeartLimits', 'Level3', 'HeightLimit'], 
          label: 'L3心脏高度上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'HeartLimits', 'Level4', 'FloorLimit'], 
          label: 'L4心脏地板上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'HeartLimits', 'Level4', 'ServantLimit'], 
          label: 'L4心脏仆从上限'
        },
        { 
          path: ['Settings', 'CastleStatModifiers_Global', 'HeartLimits', 'Level4', 'HeightLimit'], 
          label: 'L4心脏高度上限'
        },
        { 
          path: ['Settings', 'CastleMinimumDistanceInFloors'], 
          label: '城堡最小距离',
          format: (value) => `${value}格`
        },
        { 
          path: ['Settings', 'CastleRelocationEnabled'], 
          label: '启用城堡迁移',
          valueClass: (value) => value ? 'enabled' : 'disabled',
          format: (value) => value ? '是' : '否'
        },
        { 
          path: ['Settings', 'CastleRelocationCooldown'], 
          label: '城堡迁移冷却时间',
          format: (value) => {
            if (value === 0) return "无冷却";
            if (value < 3600) return `${Math.floor(value / 60)}分钟`;
            if (value < 86400) return `${Math.floor(value / 3600)}小时`;
            return `${Math.floor(value / 86400)}天`;
          }
        }
      ]
    },
    {
      icon: '🛡️',
      title: 'PVP设置',
      key: 'pvp',
      items: [
        { 
          path: ['Settings', 'CastleDamageMode'], 
          label: 'PVP城堡伤害模式',
          format: (value) => {
            const modes: Record<number, string> = {
              0: '禁用',
              1: '随时可伤害',
              2: '仅限时间窗口',
              3: '仅限战争活动'
            };
            return modes[value as number] || `未知模式(${value})`;
          }
        },
        { 
          path: ['Settings', 'CastleHeartDamageMode'], 
          label: 'PVP城堡心脏伤害模式',
          format: (value) => {
            const modes: Record<number, string> = {
              0: '仅衰败时可摧毁',
              1: '可被玩家摧毁',
              2: '可被占领或摧毁',
              3: '禁用'
            };
            return modes[value as number] || `未知模式(${value})`;
          }
        },
        { 
          path: ['Settings', 'PlayerDamageMode'], 
          label: 'PVP玩家伤害模式',
          format: (value) => {
            const modes: Record<number, string> = {
              0: '随时可伤害',
              1: '仅限时间窗口',
              2: '禁用'
            };
            return modes[value as number] || `未知模式(${value})`;
          }
        },
        { 
          path: ['Settings', 'PvPProtectionMode'], 
          label: 'PVP保护模式',
          format: (value) => {
            const modes: Record<number, string> = {
              0: '无保护',
              1: '15分钟',
              2: '30分钟',
              3: '1小时',
              4: '2小时'
            };
            return modes[value as number] || `未知模式(${value})`;
          }
        },
        { 
          path: ['Settings', 'CanLootEnemyContainers'], 
          label: 'PVP允许掠夺敌方容器',
          valueClass: (value) => value ? 'enabled' : 'disabled',
          format: (value) => value ? '允许' : '禁止'
        },
        { 
          path: ['Settings', 'SiegeWeaponHealth'], 
          label: 'PVP攻城武器生命值',
          format: (value) => {
            const healthValues: Record<number, string> = {
              0: '750',
              1: '1000',
              2: '1250',
              3: '1750',
              4: '2500',
              5: '4000',
              6: '5000',
              7: '7500'
            };
            return healthValues[value as number] || `未知值(${value})`;
          }
        },
        // PVP计时器相关设置
        { 
          path: ['Settings', 'CastleSiegeTimer'], 
          label: 'PVP城堡攻城计时器',
          format: (value) => `${Math.floor(Number(value) / 60)}分钟`
        },
        { 
          path: ['Settings', 'CastleUnderAttackTimer'], 
          label: 'PVP城堡受攻击计时器',
          format: (value) => `${value}秒`
        },
        { 
          path: ['Settings', 'CastleRaidTimer'], 
          label: 'PVP城堡突袭计时器',
          format: (value) => `${Math.floor(Number(value) / 60)}分钟`
        },
        { 
          path: ['Settings', 'CastleRaidProtectionTime'], 
          label: 'PVP城堡突袭保护时间',
          format: (value) => {
            if (value === 0) return "禁用";
            if (value < 3600) return `${Math.floor(Number(value) / 60)}分钟`;
            if (value < 86400) return `${Math.floor(Number(value) / 3600)}小时`;
            return `${Math.floor(Number(value) / 86400)}天`;
          }
        },
        { 
          path: ['Settings', 'CastleExposedFreeClaimTimer'], 
          label: 'PVP城堡暴露免费占领计时器',
          format: (value) => {
            if (value === 0) return "禁用";
            return `${Math.floor(Number(value) / 60)}分钟`;
          }
        },
        { 
          path: ['Settings', 'AnnounceSiegeWeaponSpawn'], 
          label: 'PVP宣布攻城武器生成',
          valueClass: (value) => value ? 'enabled' : 'disabled',
          format: (value) => value ? '是' : '否'
        },
        { 
          path: ['Settings', 'ShowSiegeWeaponMapIcon'], 
          label: 'PVP显示攻城武器地图图标',
          valueClass: (value) => value ? 'enabled' : 'disabled',
          format: (value) => value ? '是' : '否'
        },
        { 
          path: ['Settings', 'FreeCastleRaid'], 
          label: 'PVP免费突袭城堡',
          valueClass: (value) => value ? 'enabled' : 'disabled',
          format: (value) => value ? '是' : '否'
        },
        { 
          path: ['Settings', 'FreeCastleClaim'], 
          label: 'PVP免费占领城堡',
          valueClass: (value) => value ? 'enabled' : 'disabled',
          format: (value) => value ? '是' : '否'
        },
        { 
          path: ['Settings', 'FreeCastleDestroy'], 
          label: 'PVP免费摧毁城堡',
          valueClass: (value) => value ? 'enabled' : 'disabled',
          format: (value) => value ? '是' : '否'
        }
      ]
    },
    {
      icon: '🌀',
      title: '裂隙事件',
      key: 'rift',
      items: [
        { 
          path: ['Settings', 'EventsEnabled'], 
          label: '事件开启', 
          valueClass: (value) => value ? 'enabled' : 'disabled',
          format: (value) => value ? '开启' : '关闭'
        },
        { 
          path: ['Settings', 'WarEventGameSettings', 'Interval'], 
          label: '事件间隔周期',
          format: (value) => {
            const intervals: Record<number, string> = {
              0: '30分钟',
              1: '1小时',
              2: '1小时30分钟',
              3: '2小时',
              4: '4小时',
              5: '8小时',
              6: '12小时',
              7: '24小时'
            };
            return intervals[value as number] || `未知间隔(${value})`;
          }
        },
        { 
          path: ['Settings', 'WarEventGameSettings', 'MajorDuration'], 
          label: '大型入侵持续时间',
          format: (value) => {
            const durations: Record<number, string> = {
              0: '15分钟',
              1: '20分钟',
              2: '25分钟',
              3: '30分钟',
              4: '35分钟',
              5: '40分钟',
              6: '1小时',
              7: '2小时'
            };
            return durations[value as number] || `未知时间(${value})`;
          }
        },
        { 
          path: ['Settings', 'WarEventGameSettings', 'MinorDuration'], 
          label: '小型入侵持续时间',
          format: (value) => {
            const durations: Record<number, string> = {
              0: '15分钟',
              1: '20分钟',
              2: '25分钟',
              3: '30分钟',
              4: '35分钟',
              5: '40分钟',
              6: '1小时',
              7: '2小时'
            };
            return durations[value as number] || `未知时间(${value})`;
          }
        },
        // 工作日和周末时间设置
        { 
          path: [
            ['Settings', 'WarEventGameSettings', 'WeekdayTime', 'StartHour'],
            ['Settings', 'WarEventGameSettings', 'WeekdayTime', 'StartMinute'],
            ['Settings', 'WarEventGameSettings', 'WeekdayTime', 'EndHour'],
            ['Settings', 'WarEventGameSettings', 'WeekdayTime', 'EndMinute']
          ], 
          label: '工作日可用时间范围',
          format: (values) => {
            if(Array.isArray(values) && values.length === 4) {
              return `${values[0].toString().padStart(2, '0')}:${values[1].toString().padStart(2, '0')} - ${values[2].toString().padStart(2, '0')}:${values[3].toString().padStart(2, '0')}`;
            }
            return '未设置';
          }
        },
        { 
          path: [
            ['Settings', 'WarEventGameSettings', 'WeekendTime', 'StartHour'],
            ['Settings', 'WarEventGameSettings', 'WeekendTime', 'StartMinute'],
            ['Settings', 'WarEventGameSettings', 'WeekendTime', 'EndHour'],
            ['Settings', 'WarEventGameSettings', 'WeekendTime', 'EndMinute']
          ], 
          label: '周末可用时间范围',
          format: (values) => {
            if(Array.isArray(values) && values.length === 4) {
              return `${values[0].toString().padStart(2, '0')}:${values[1].toString().padStart(2, '0')} - ${values[2].toString().padStart(2, '0')}:${values[3].toString().padStart(2, '0')}`;
            }
            return '未设置';
          }
        },
        // 多人缩放系数
        { 
          path: ['Settings', 'WarEventGameSettings', 'ScalingPlayers1', 'PointsModifier'], 
          label: '单人点数修改器',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'WarEventGameSettings', 'ScalingPlayers1', 'DropModifier'], 
          label: '单人掉落修改器',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'WarEventGameSettings', 'ScalingPlayers2', 'PointsModifier'], 
          label: '双人点数修改器',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'WarEventGameSettings', 'ScalingPlayers2', 'DropModifier'], 
          label: '双人掉落修改器',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'WarEventGameSettings', 'ScalingPlayers3', 'PointsModifier'], 
          label: '三人点数修改器',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'WarEventGameSettings', 'ScalingPlayers3', 'DropModifier'], 
          label: '三人掉落修改器',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'WarEventGameSettings', 'ScalingPlayers4', 'PointsModifier'], 
          label: '四人点数修改器',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'WarEventGameSettings', 'ScalingPlayers4', 'DropModifier'], 
          label: '四人掉落修改器',
          format: (value) => `${value}x`
        },
        { 
          path: ['Settings', 'VBloodUnitSettings', 'UnlockedUnitSettings'], 
          label: 'V血单位解锁', 
          format: (value) => {
            if(typeof value === 'object' && value !== null) {
              const count = Object.keys(value).length;
              return `已解锁: ${count}个`;
            }
            return '未设置';
          }
        }
      ]
    }
  ];

  // 根据路径获取配置值
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getConfigValue = (obj: any, path: string[]): any => {
    if (!obj || path.length === 0) return undefined;
    
    let current = obj;
    for (const key of path) {
      if (current === undefined || current === null) return undefined;
      current = current[key];
    }
    
    return current;
  };

  // 获取多个路径的值
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMultipleConfigValues = (obj: any, paths: string[][]): any[] => {
    return paths.map(path => getConfigValue(obj, path));
  };

  // 处理文件选择
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let parsed = JSON.parse(content);
        let isStandaloneServer = false;
        
        // 检测是否为私人服务器配置格式（不包含Name和Settings字段，直接就是Settings内容）
        if (!parsed.Settings && parsed.GameModeType !== undefined) {
          // 这可能是私人服务器配置，自动添加外层结构
          isStandaloneServer = true;
          parsed = {
            Name: "导入的私人服务器配置",
            Description: "从私人服务器配置文件导入的设置",
            Settings: parsed
          };
        }
        
        // 基本验证导入的JSON结构
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('无效的JSON格式');
        }
        
        // 验证必要的字段是否存在
        if (!parsed.Settings) {
          throw new Error('JSON缺少必要的配置字段');
        }
        
        const serverName = parsed.Name || '未命名服务器';
        
        setImportPreview({
          fileName: file.name,
          serverName: serverName,
          configData: JSON.stringify(parsed), // 使用处理后的JSON
          isStandaloneServer: isStandaloneServer
        });
        setShowImport(true);
      } catch (error) {
        console.error('解析JSON文件失败:', error);
        alert('无法解析选择的文件，请确保是有效的V Rising配置文件。');
        
        // 重置文件输入
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.onerror = () => {
      alert('读取文件时发生错误，请重试。');
      // 重置文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    reader.readAsText(file);
  };

  // 处理导入功能
  const handleImport = () => {
    if (!importPreview) return;
    
    try {
      // 清理并再次验证JSON格式
      const cleanedJson = cleanImportedJson(importPreview.configData);
      const parsed = JSON.parse(cleanedJson);
      
      // 验证必要的结构
      if (!parsed || typeof parsed !== 'object' || !parsed.Settings) {
        throw new Error('配置文件格式无效');
      }
      
      // 记录是否为私人服务器模式并保存到localStorage
      const newMode = !!importPreview.isStandaloneServer;
      setIsStandaloneServerMode(newMode);
      
      // 确保在浏览器环境中执行
      if (typeof window !== 'undefined') {
        localStorage.setItem('vrising_standalone_server_mode', newMode.toString());
      }
      
      // 尝试导入配置
      importConfig(cleanedJson);
      
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
      
      setImportSuccess(true);
      setShowImport(false);
      setImportPreview(null);
      
      // 重置文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      successTimerRef.current = setTimeout(() => {
        setImportSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('导入失败:', error);
      alert(`导入失败: ${error instanceof Error ? error.message : '配置格式不兼容'}`);
      
      // 重置状态
      setShowImport(false);
      setImportPreview(null);
      
      // 重置文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // 获取配置JSON - 根据模式返回不同的格式
  const getConfigJson = (): string => {
    try {
      const fullConfig = exportConfig();
      
      // 如果是私人服务器模式，则只返回Settings内容
      if (isStandaloneServerMode) {
        const parsed = JSON.parse(fullConfig);
        if (parsed && parsed.Settings) {
          // 深度复制Settings对象，确保数据完整性
          return JSON.stringify(parsed.Settings, null, 2);
        }
      }
      
      return fullConfig;
    } catch (error) {
      console.error('获取配置失败:', error);
      return '{}';
    }
  };

  // 生成配置JSON，并在配置改变时更新
  useEffect(() => {
    const configStr = getConfigJson();
    setJsonConfig(configStr);
    
    try {
      let displayJson;
      
      // 如果是私人服务器模式，显示JSON会有所不同
      if (isStandaloneServerMode) {
        displayJson = JSON.parse(configStr);
      } else {
        displayJson = JSON.parse(exportConfig());
      }
      
      setParsedJson(displayJson);
      
      // 提取配置摘要
      const summary: Record<string, any> = {};
      configCategories.forEach(category => {
        const items = category.items.map(item => {
          let paths: string[][] = [];
          
          // 区分单个路径和多个路径的情况
          if (typeof item.path[0] === 'string') {
            // 单个路径的情况，如：['Settings', 'GameMode']
            paths = [item.path as string[]];
          } else if (Array.isArray(item.path[0])) {
            // 多个路径的情况，如：[['Settings', 'StartHour'], ['Settings', 'StartMinute']]
            paths = item.path as string[][];
          }
          
          // 对于私人服务器模式，需要调整路径
          if (isStandaloneServerMode) {
            paths = paths.map(path => {
              // 移除路径中的"Settings"前缀
              if (path[0] === 'Settings') {
                return path.slice(1);
              }
              return path;
            });
          }
          
          // 获取值
          const rawValues = isStandaloneServerMode
            ? getMultipleConfigValues(displayJson, paths)
            : getMultipleConfigValues(displayJson, paths);
            
          return {
            ...item,
            value: paths.length === 1 ? rawValues[0] : rawValues
          };
        });
        summary[category.key] = items;
      });
      
      setConfigSummary(summary);
    } catch (error) {
      console.error('解析JSON失败:', error);
    }
  }, [config, exportConfig, isStandaloneServerMode]);

  // 处理复制功能
  const handleCopy = () => {
    if (copyTimerRef.current) {
      clearTimeout(copyTimerRef.current);
    }

    navigator.clipboard.writeText(jsonConfig).then(() => {
      setCopySuccess(true);
      copyTimerRef.current = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }).catch(err => {
      console.error('复制失败:', err);
      alert('复制失败，请手动复制');
    });
  };

  // 处理下载功能
  const handleDownload = () => {
    try {
      // 根据当前模式决定文件名
      const filename = isStandaloneServerMode ? 'ServerGameSettings.json' : downloadName;
      
      const blob = new Blob([jsonConfig], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // 创建一个临时的a元素
      const downloadElement = document.createElement('a');
      downloadElement.href = url;
      downloadElement.download = filename;
      
      // 添加到DOM，触发点击，然后移除
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);
      
      // 释放URL对象
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('下载失败:', error);
      alert('下载失败，请尝试手动复制内容并保存');
    }
  };

  // 打开文件选择对话框
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // 取消导入
  const handleCancelImport = () => {
    setShowImport(false);
    setImportPreview(null);
    // 重置文件输入
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 展开/折叠所有节点
  const toggleExpandAll = () => {
    setIsExpanded(!isExpanded);
  };

  // 渲染配置摘要项
  const renderConfigItem = (item: any) => {
    let displayValue = item.value;
    let valueClassName = styles.configValue;
    
    // 使用格式化函数（如果有）
    if (item.format && item.value !== undefined) {
      displayValue = item.format(item.value);
    } else if (typeof item.value === 'boolean') {
      displayValue = item.value ? '是' : '否';
    } else if (item.value === undefined || item.value === null) {
      displayValue = '-';
    }
    
    // 应用值的CSS类名（如果有）
    if (item.valueClass && item.value !== undefined) {
      const customClass = item.valueClass(item.value);
      if (customClass) {
        valueClassName = `${styles.configValue} ${styles[customClass]}`;
      }
    }
    
    return (
      <div key={item.label} className={styles.configItem}>
        <div className={styles.configName}>{item.label}</div>
        <div className={valueClassName}>{displayValue}</div>
      </div>
    );
  };

  // 渲染配置摘要类别
  const renderConfigCategory = (category: ConfigCategory) => {
    const items = configSummary[category.key] || [];
    
    if (items.length === 0) return null;
    
    return (
      <div key={category.key} className={styles.summaryCategory}>
        <div className={styles.categoryHeader}>
          <span className={styles.categoryIcon}>{category.icon}</span>
          {category.title}
        </div>
        <div className={styles.categoryItems}>
          {items.map((item: any) => renderConfigItem(item))}
        </div>
      </div>
    );
  };

  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  // 处理重置功能
  const handleReset = () => {
    if (window.confirm('确定要重置所有配置为默认值吗？此操作不可撤销。')) {
      resetConfig();
      
      // 同时重置私人服务器模式
      setIsStandaloneServerMode(false);
      // 确保在浏览器环境中执行
      if (typeof window !== 'undefined') {
        localStorage.removeItem('vrising_standalone_server_mode');
      }
      
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      
      setResetSuccess(true);
      
      resetTimerRef.current = setTimeout(() => {
        setResetSuccess(false);
      }, 3000);
    }
  };

  // 切换私人服务器模式
  const toggleServerMode = () => {
    const newMode = !isStandaloneServerMode;
    setIsStandaloneServerMode(newMode);
    // 确保在浏览器环境中执行
    if (typeof window !== 'undefined') {
      localStorage.setItem('vrising_standalone_server_mode', newMode.toString());
    }
  };

  // 在前面添加保护配置的函数
  useEffect(() => {
    // 当config发生变化时检查是否为有效状态
    if (config && typeof config === 'object') {
      try {
        exportConfig(); // 尝试调用导出函数测试配置是否正常
      } catch (error) {
        console.error('配置状态异常:', error);
        // 尝试使用localStorage中的备份配置或重置为默认值
        resetConfig();
        alert('检测到配置异常，已重置为默认值。');
      }
    }
  }, [config, exportConfig, resetConfig]);

  // 组件初始化时保存默认配置
  useEffect(() => {
    try {
      // 保存当前配置作为临时备份
      const configBackup = exportConfig();
      if (configBackup) {
        localStorage.setItem('vrising_config_backup', configBackup);
      }
    } catch (error) {
      console.error('备份配置失败:', error);
    }
  }, []);

  // 特别为有问题的JSON添加清理功能
  const cleanImportedJson = (jsonStr: string): string => {
    try {
      // 通过解析和重新序列化移除可能的非法字符或结构
      let obj = JSON.parse(jsonStr);
      
      // 如果是私人服务器配置格式（没有Settings字段但有GameModeType等字段）
      if (!obj.Settings && obj.GameModeType !== undefined) {
        obj = {
          Name: "导入的私人服务器配置",
          Description: "从私人服务器配置文件导入的设置",
          Settings: obj
        };
      }
      
      // 验证必要的字段
      if (!obj.Settings) {
        throw new Error('配置缺少必要的Settings字段');
      }
      
      return JSON.stringify(obj);
    } catch (error) {
      // 如果解析失败，原样返回
      console.error('清理JSON字符串失败:', error);
      throw new Error('配置文件格式无效，无法处理');
    }
  };

  return (
    <Card 
      title="配置导入/导出" 
      subtitle="导出或导入规则配置JSON"
      className={styles.card}
    >
      <div className={styles.exportContainer}>
        <div className={styles.actionButtons}>
          <Button 
            onClick={handleCopy} 
            variant="primary" 
            size="md"
            className={styles.actionButton}
            icon={copySuccess ? "✓" : "📋"}
          >
            {copySuccess ? '已复制' : (isStandaloneServerMode ? '复制服务器配置' : '复制配置')}
          </Button>
          
          <Button 
            onClick={handleDownload} 
            variant="primary" 
            size="md"
            className={styles.actionButton}
            icon="💾"
          >
            {isStandaloneServerMode ? '下载服务器配置' : '下载配置'}
          </Button>
          
          <Button 
            onClick={handleImportClick} 
            variant="secondary" 
            size="md"
            className={styles.actionButton}
            icon={importSuccess ? "✓" : "📤"}
          >
            {importSuccess ? '导入成功' : '导入配置'}
          </Button>
          
          {/* 隐藏的文件输入 */}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".json"
            style={{ display: 'none' }}
          />
          
          <Button 
            onClick={handleReset} 
            variant="danger" 
            size="md"
            className={styles.actionButton}
            icon={resetSuccess ? "✓" : "🔄"}
          >
            {resetSuccess ? '已重置' : '重置配置'}
          </Button>
        </div>
        
        {/* 导入预览弹窗 */}
        {showImport && importPreview && (
          <div className={styles.importPreviewModal}>
            <div className={styles.importPreviewContent}>
              <h3 className={styles.importPreviewTitle}>导入配置确认</h3>
              <div className={styles.importPreviewInfo}>
                <div className={styles.importPreviewItem}>
                  <span className={styles.importPreviewLabel}>文件名:</span>
                  <span className={styles.importPreviewValue}>{importPreview.fileName}</span>
                </div>
                <div className={styles.importPreviewItem}>
                  <span className={styles.importPreviewLabel}>服务器名称:</span>
                  <span className={styles.importPreviewValue}>{importPreview.serverName}</span>
                </div>
                {importPreview.isStandaloneServer && (
                  <div className={styles.importPreviewItem}>
                    <span className={styles.importPreviewLabel}>配置类型:</span>
                    <span className={styles.importPreviewValue} style={{color: '#4caf50'}}>
                      私人服务器配置 (已自动适配)
                    </span>
                  </div>
                )}
              </div>
              <div className={styles.importWarning}>
                警告：导入将覆盖当前所有配置！
              </div>
              <div className={styles.importPreviewActions}>
                <Button 
                  onClick={handleCancelImport} 
                  variant="outline" 
                  size="md"
                >
                  取消
                </Button>
                <Button 
                  onClick={handleImport} 
                  variant="success" 
                  size="md"
                >
                  确认导入
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className={styles.jsonContainer}>
          <div className={styles.jsonHeader}>
            <h4 className={styles.jsonTitle}>
              配置预览
              {isStandaloneServerMode && (
                <span style={{
                  marginLeft: '0.75rem',
                  fontSize: '0.85rem',
                  color: '#ffb74d',
                  backgroundColor: 'rgba(255, 183, 77, 0.15)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}>
                  私人服务器模式
                </span>
              )}
            </h4>
            <div className={styles.viewControls}>
              <div className={styles.buttonGroup}>
                <Button 
                  onClick={toggleServerMode} 
                  variant="outline" 
                  size="sm"
                  className={styles.controlButton}
                  style={{
                    marginRight: '8px',
                    backgroundColor: isStandaloneServerMode ? 'rgba(255, 183, 77, 0.2)' : 'transparent',
                    color: isStandaloneServerMode ? '#ffb74d' : 'inherit'
                  }}
                >
                  {isStandaloneServerMode ? '切换为普通模式' : '切换为私人服务器模式'}
                </Button>
                <Button 
                  onClick={toggleExpandAll} 
                  variant="outline" 
                  size="sm"
                  className={styles.controlButton}
                >
                  {isExpanded ? '全部折叠' : '全部展开'}
                </Button>
              </div>
            </div>
          </div>
          
          <div className={styles.configPreviewLayout}>
            <div className={styles.jsonContentWrapper}>
              <div className={styles.jsonTreeView}>
                {Object.keys(parsedJson).length > 0 && (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  <ReactJson 
                    src={parsedJson}
                    name={null}
                    theme="monokai" 
                    displayDataTypes={false}
                    collapsed={!isExpanded ? 1 : false}
                    displayObjectSize={false}
                    enableClipboard={false}
                    onEdit={false}
                    onAdd={false}
                    onDelete={false}
                    sortKeys={false}
                    style={{ 
                      backgroundColor: 'transparent',
                      width: '100%',
                      height: '100%',
                      overflowX: 'auto'
                    }}
                    iconStyle="square"
                    quotesOnKeys={false}
                  />
                )}
              </div>
            </div>
            
            <div className={styles.configSummaryWrapper}>
              {configCategories
                .filter(category => !isStandaloneServerMode || category.key !== 'basic')
                .map(category => renderConfigCategory(category))}
            </div>
          </div>
        </div>
        
        <div className={styles.instructions}>
          <h5 className={styles.instructionsTitle}>使用说明</h5>
          
          <div className={styles.useCaseContainer}>
            <span className={styles.stepHeading}>
              <span className={styles.stepIcon}>🎮</span>
              新服务器配置流程
            </span>
            <ul className={styles.steps}>
              <li>启动游戏，在主菜单选择【<strong>开始游戏</strong>】</li>
              <li>选择【<strong>私人游戏</strong>】模式</li>
              <li>点击【<strong>高级游戏设置</strong>】进入配置界面</li>
              <li>调整血族规模（即盟友规模，盟友才能一起建造），其他部分可在本页面进行调整，完成后点击【<strong>保存为新规则</strong>】</li>
              <li>退出游戏，找到规则文件存储位置：<code>C:\Users\用户名\AppData\LocalLow\Stunlock Studios\VRising\Settings\v4\ServerPresets</code></li>
              <li>回到本页面，点击【<strong>导入配置</strong>】按钮选择刚保存的规则文件，一般按照修改时间最新的就是您刚保存的</li>
              <li>在本工具中详细调整服务器参数</li>
              <li>调整完成后点击【<strong>复制配置</strong>】，将内容替换到原规则文件中</li>
              <li>重新启动游戏，依次选择【<strong>开始游戏</strong>】 → 【<strong>私人游戏</strong>】</li>
              <li>在游戏设置中选择【<strong>高级游戏设置</strong>】 → 【<strong>选择规则</strong>】 → 找到您修改过的规则 → 点击保存 → 不要修改任何除最大人数、血族人数的参数 → 进入游戏</li>
            </ul>
          </div>

          <div className={styles.useCaseContainer}>
            <span className={styles.stepHeading}>
              <span className={styles.stepIcon}>💾</span>
              现有存档配置流程
            </span>
            <div className={styles.importWarning}>
              ⚠️ 重要提示：修改服务器配置前，请先备份您的存档文件！点击游戏主菜单的【加载游戏】，选择您想更改规则的存档，点击【打开目录】，备份该文件夹中的所有文件。
            </div>
            <ul className={styles.steps}>
              <li>启动游戏，在主菜单选择【<strong>加载游戏</strong>】</li>
              <li>从存档列表中选择您的游戏存档</li>
              <li>点击【<strong>编辑设置</strong>】按钮</li>
              <li>调整血族规模（即盟友规模，盟友才能一起建造），其他部分可在本页面进行调整，然后点击【<strong>保存为新规则</strong>】</li>
              <li>退出游戏，找到规则文件存储位置：<code>C:\Users\用户名\AppData\LocalLow\Stunlock Studios\VRising\Settings\v4\ServerPresets</code></li>
              <li>回到本页面，点击【<strong>导入配置</strong>】按钮选择刚保存的规则文件</li>
              <li>在本工具中详细调整服务器参数</li>
              <li>调整完成后点击【<strong>复制配置</strong>】，将内容替换到原规则文件中</li>
              <li>重新启动游戏，依次选择【<strong>加载游戏</strong>】 → 选择您的存档</li>
              <li>点击【<strong>编辑设置</strong>】 → 【<strong>选择规则</strong>】 → 找到您修改过的规则 → 点击保存 → 不要修改任何除最大人数、血族人数的参数 → 进入游戏</li>
            </ul>
          </div>
          
          <div className={styles.useCaseContainer}>
            <span className={styles.stepHeading}>
              <span className={styles.stepIcon}>🖥️</span>
              私人服务器配置
            </span>
            <div className={styles.importWarning}>
              ⚠️ 重要提示：修改服务器配置前，请先备份您的服务器存档文件！
            </div>
            <ul className={styles.steps}>
              <li>本工具现已支持导入私人服务器配置文件 (ServerGameSettings.json)，系统会自动识别格式并进行适配</li>
              <li>如果您有私人服务器的配置文件，可以直接点击【<strong>导入配置</strong>】按钮导入</li>
              <li>导入后可以在本工具中调整参数，然后通过【<strong>复制配置</strong>】或【<strong>下载配置</strong>】获取修改后的配置</li>
              <li>若要在私人服务器中使用，请注意只需使用【Settings】内的内容</li>
            </ul>
          </div>

          <div className={styles.extraInfo}>
            <div className={styles.extraInfoItem}>
              <span className={styles.extraInfoIcon}>📁</span>
              <div>
                配置文件位置：<code>C:\Users\用户名\AppData\LocalLow\Stunlock Studios\VRising\Settings\v4\ServerPresets</code>
                <div className={styles.helpNote}>找不到AppData文件夹？在资源管理器上方点击&ldquo;查看→显示隐藏文件&rdquo;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ConfigExportImport;