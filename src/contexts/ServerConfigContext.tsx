"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// VBlood和解锁设置的类型
interface VBloodUnitSetting {
  UnitId: number;
  UnitLevel: number;
}

interface UnlockedItem {
  Id: number;
}

// 定义服务器配置类型
export interface ServerConfig {
  Name: string;
  Description: string;
  Settings: {
    GameDifficulty: number;
    GameModeType: number;
    CastleDamageMode: number;
    SiegeWeaponHealth: number;
    PlayerDamageMode: number;
    CastleHeartDamageMode: number;
    PvPProtectionMode: number;
    DeathContainerPermission: number;
    RelicSpawnType: number;
    CanLootEnemyContainers: boolean;
    BloodBoundEquipment: boolean;
    TeleportBoundItems: boolean;
    BatBoundItems: boolean;
    BatBoundShards: boolean;
    AllowGlobalChat: boolean;
    AllWaypointsUnlocked: boolean;
    FreeCastleRaid: boolean;
    FreeCastleClaim: boolean;
    FreeCastleDestroy: boolean;
    InactivityKillEnabled: boolean;
    InactivityKillTimeMin: number;
    InactivityKillTimeMax: number;
    InactivityKillSafeTimeAddition: number;
    InactivityKillTimerMaxItemLevel: number;
    StartingProgressionLevel: number;
    WeaponSlots: number;
    DisableDisconnectedDeadEnabled: boolean;
    DisableDisconnectedDeadTimer: number;
    DisconnectedSunImmunityTime: number;
    InventoryStacksModifier: number;
    DropTableModifier_General: number;
    DropTableModifier_Missions: number;
    DropTableModifier_StygianShards: number;
    SoulShard_DurabilityLossRate: number;
    MaterialYieldModifier_Global: number;
    BloodEssenceYieldModifier: number;
    JournalVBloodSourceUnitMaxDistance: number;
    PvPVampireRespawnModifier: number;
    CastleMinimumDistanceInFloors: number;
    ClanSize: number;
    BloodDrainModifier: number;
    DurabilityDrainModifier: number;
    GarlicAreaStrengthModifier: number;
    HolyAreaStrengthModifier: number;
    SilverStrengthModifier: number;
    SunDamageModifier: number;
    CastleDecayRateModifier: number;
    CastleBloodEssenceDrainModifier: number;
    CastleSiegeTimer: number;
    CastleUnderAttackTimer: number;
    CastleRaidTimer: number;
    CastleRaidProtectionTime: number;
    CastleExposedFreeClaimTimer: number;
    CastleRelocationCooldown: number;
    CastleRelocationEnabled: boolean;
    AnnounceSiegeWeaponSpawn: boolean;
    ShowSiegeWeaponMapIcon: boolean;
    BuildCostModifier: number;
    RecipeCostModifier: number;
    CraftRateModifier: number;
    ResearchCostModifier: number;
    RefinementCostModifier: number;
    RefinementRateModifier: number;
    ResearchTimeModifier: number;
    DismantleResourceModifier: number;
    ServantConvertRateModifier: number;
    RepairCostModifier: number;
    Death_DurabilityFactorLoss: number;
    Death_DurabilityLossFactorAsResources: number;
    StarterEquipmentId: number;
    StarterResourcesId: number;
    VBloodUnitSettings: VBloodUnitSetting[];
    UnlockedAchievements: UnlockedItem[];
    UnlockedResearchs: UnlockedItem[];
    GameTimeModifiers: {
      DayDurationInSeconds: number;
      DayStartHour: number;
      DayStartMinute: number;
      DayEndHour: number;
      DayEndMinute: number;
      BloodMoonFrequency_Min: number;
      BloodMoonFrequency_Max: number;
      BloodMoonBuff: number;
    };
    VampireStatModifiers: {
      MaxHealthModifier: number;
      PhysicalPowerModifier: number;
      SpellPowerModifier: number;
      ResourcePowerModifier: number;
      SiegePowerModifier: number;
      DamageReceivedModifier: number;
      ReviveCancelDelay: number;
    };
    UnitStatModifiers_Global: {
      MaxHealthModifier: number;
      PowerModifier: number;
      LevelIncrease: number;
    };
    UnitStatModifiers_VBlood: {
      MaxHealthModifier: number;
      PowerModifier: number;
      LevelIncrease: number;
    };
    EquipmentStatModifiers_Global: {
      MaxHealthModifier: number;
      ResourceYieldModifier: number;
      PhysicalPowerModifier: number;
      SpellPowerModifier: number;
      SiegePowerModifier: number;
      MovementSpeedModifier: number;
    };
    CastleStatModifiers_Global: {
      TickPeriod: number;
      SafetyBoxLimit: number;
      EyeStructuresLimit: number;
      TombLimit: number;
      VerminNestLimit: number;
      PrisonCellLimit: number;
      HeartLimits: {
        Level1: {
          FloorLimit: number;
          ServantLimit: number;
          HeightLimit: number;
        };
        Level2: {
          FloorLimit: number;
          ServantLimit: number;
          HeightLimit: number;
        };
        Level3: {
          FloorLimit: number;
          ServantLimit: number;
          HeightLimit: number;
        };
        Level4: {
          FloorLimit: number;
          ServantLimit: number;
          HeightLimit: number;
        };
        Level5: {
          FloorLimit: number;
          ServantLimit: number;
          HeightLimit: number;
        };
      };
      CastleHeartLimitType: number;
      CastleLimit: number;
      NetherGateLimit: number;
      ThroneOfDarknessLimit: number;
      ArenaStationLimit: number;
      RoutingStationLimit: number;
    };
    PlayerInteractionSettings: {
      TimeZone: number;
      VSPlayerWeekdayTime: {
        StartHour: number;
        StartMinute: number;
        EndHour: number;
        EndMinute: number;
      };
      VSPlayerWeekendTime: {
        StartHour: number;
        StartMinute: number;
        EndHour: number;
        EndMinute: number;
      };
      VSCastleWeekdayTime: {
        StartHour: number;
        StartMinute: number;
        EndHour: number;
        EndMinute: number;
      };
      VSCastleWeekendTime: {
        StartHour: number;
        StartMinute: number;
        EndHour: number;
        EndMinute: number;
      };
    };
    TraderModifiers: {
      StockModifier: number;
      PriceModifier: number;
      RestockTimerModifier: number;
    };
    WarEventGameSettings: {
      Interval: number;
      MajorDuration: number;
      MinorDuration: number;
      WeekdayTime: {
        StartHour: number;
        StartMinute: number;
        EndHour: number;
        EndMinute: number;
      };
      WeekendTime: {
        StartHour: number;
        StartMinute: number;
        EndHour: number;
        EndMinute: number;
      };
      ScalingPlayers1: {
        PointsModifier: number;
        DropModifier: number;
      };
      ScalingPlayers2: {
        PointsModifier: number;
        DropModifier: number;
      };
      ScalingPlayers3: {
        PointsModifier: number;
        DropModifier: number;
      };
      ScalingPlayers4: {
        PointsModifier: number;
        DropModifier: number;
      };
    };
  };
}

// 创建上下文接口
interface ServerConfigContextType {
  config: ServerConfig;
  setConfig: React.Dispatch<React.SetStateAction<ServerConfig>>;
  updateConfig: (path: string, value: unknown) => void;
  resetConfig: () => void;
  exportConfig: () => string;
  importConfig: (jsonString: string) => void;
  isLoading: boolean;
}

// 创建默认空配置
const emptyConfig: ServerConfig = {
  Name: 'V Rising 服务器',
  Description: '由配置工具生成的服务器',
  Settings: {
    GameDifficulty: 1,
    GameModeType: 0,
    CastleDamageMode: 0,
    SiegeWeaponHealth: 2,
    PlayerDamageMode: 0,
    CastleHeartDamageMode: 1,
    PvPProtectionMode: 4,
    DeathContainerPermission: 2,
    RelicSpawnType: 1,
    CanLootEnemyContainers: true,
    BloodBoundEquipment: true,
    TeleportBoundItems: true,
    BatBoundItems: false,
    BatBoundShards: false,
    AllowGlobalChat: true,
    AllWaypointsUnlocked: false,
    FreeCastleRaid: false,
    FreeCastleClaim: false,
    FreeCastleDestroy: false,
    InactivityKillEnabled: true,
    InactivityKillTimeMin: 3600,
    InactivityKillTimeMax: 604800,
    InactivityKillSafeTimeAddition: 172800,
    InactivityKillTimerMaxItemLevel: 84,
    StartingProgressionLevel: 0,
    WeaponSlots: 8,
    DisableDisconnectedDeadEnabled: true,
    DisableDisconnectedDeadTimer: 60,
    DisconnectedSunImmunityTime: 300.0,
    InventoryStacksModifier: 3.0,
    DropTableModifier_General: 3.0,
    DropTableModifier_Missions: 3.0,
    DropTableModifier_StygianShards: 1.0,
    SoulShard_DurabilityLossRate: 1.0,
    MaterialYieldModifier_Global: 3.0,
    BloodEssenceYieldModifier: 3.0,
    JournalVBloodSourceUnitMaxDistance: 25.0,
    PvPVampireRespawnModifier: 1.0,
    CastleMinimumDistanceInFloors: 2,
    ClanSize: 20,
    BloodDrainModifier: 1.0,
    DurabilityDrainModifier: 0.5,
    GarlicAreaStrengthModifier: 1.0,
    HolyAreaStrengthModifier: 1.0,
    SilverStrengthModifier: 1.0,
    SunDamageModifier: 1.0,
    CastleDecayRateModifier: 0.25,
    CastleBloodEssenceDrainModifier: 0.25,
    CastleSiegeTimer: 420.0,
    CastleUnderAttackTimer: 60.0,
    CastleRaidTimer: 600.0,
    CastleRaidProtectionTime: 1800.0,
    CastleExposedFreeClaimTimer: 300.0,
    CastleRelocationCooldown: 0.0,
    CastleRelocationEnabled: true,
    AnnounceSiegeWeaponSpawn: true,
    ShowSiegeWeaponMapIcon: false,
    BuildCostModifier: 1.0,
    RecipeCostModifier: 1.0,
    CraftRateModifier: 0.5,
    ResearchCostModifier: 1.0,
    RefinementCostModifier: 1.0,
    RefinementRateModifier: 0.5,
    ResearchTimeModifier: 1.0,
    DismantleResourceModifier: 1.0,
    ServantConvertRateModifier: 0.25,
    RepairCostModifier: 1.0,
    Death_DurabilityFactorLoss: 0.125,
    Death_DurabilityLossFactorAsResources: 1.0,
    StarterEquipmentId: 0,
    StarterResourcesId: 0,
    VBloodUnitSettings: [],
    UnlockedAchievements: [],
    UnlockedResearchs: [],
    GameTimeModifiers: {
      DayDurationInSeconds: 2160.0,
      DayStartHour: 9,
      DayStartMinute: 0,
      DayEndHour: 17,
      DayEndMinute: 0,
      BloodMoonFrequency_Min: 10,
      BloodMoonFrequency_Max: 18,
      BloodMoonBuff: 0.2
    },
    VampireStatModifiers: {
      MaxHealthModifier: 1.0,
      PhysicalPowerModifier: 1.0,
      SpellPowerModifier: 1.0,
      ResourcePowerModifier: 1.0,
      SiegePowerModifier: 1.0,
      DamageReceivedModifier: 1.0,
      ReviveCancelDelay: 5.0
    },
    UnitStatModifiers_Global: {
      MaxHealthModifier: 1.2,
      PowerModifier: 1.7,
      LevelIncrease: 0
    },
    UnitStatModifiers_VBlood: {
      MaxHealthModifier: 2.0,
      PowerModifier: 2.0,
      LevelIncrease: 7
    },
    EquipmentStatModifiers_Global: {
      MaxHealthModifier: 1.0,
      ResourceYieldModifier: 3.0,
      PhysicalPowerModifier: 1.0,
      SpellPowerModifier: 1.0,
      SiegePowerModifier: 1.0,
      MovementSpeedModifier: 1.0
    },
    CastleStatModifiers_Global: {
      TickPeriod: 5.0,
      SafetyBoxLimit: 20,
      EyeStructuresLimit: 1,
      TombLimit: 20,
      VerminNestLimit: 20,
      PrisonCellLimit: 50,
      HeartLimits: {
        Level1: {
          FloorLimit: 5000,
          ServantLimit: 20,
          HeightLimit: 20
        },
        Level2: {
          FloorLimit: 5000,
          ServantLimit: 20,
          HeightLimit: 20
        },
        Level3: {
          FloorLimit: 5000,
          ServantLimit: 20,
          HeightLimit: 20
        },
        Level4: {
          FloorLimit: 5000,
          ServantLimit: 20,
          HeightLimit: 20
        },
        Level5: {
          FloorLimit: 5000,
          ServantLimit: 20,
          HeightLimit: 20
        }
      },
      CastleHeartLimitType: 0,
      CastleLimit: 20,
      NetherGateLimit: 4,
      ThroneOfDarknessLimit: 4,
      ArenaStationLimit: 5,
      RoutingStationLimit: 10
    },
    PlayerInteractionSettings: {
      TimeZone: 0,
      VSPlayerWeekdayTime: {
        StartHour: 20,
        StartMinute: 0,
        EndHour: 22,
        EndMinute: 0
      },
      VSPlayerWeekendTime: {
        StartHour: 20,
        StartMinute: 0,
        EndHour: 22,
        EndMinute: 0
      },
      VSCastleWeekdayTime: {
        StartHour: 20,
        StartMinute: 0,
        EndHour: 22,
        EndMinute: 0
      },
      VSCastleWeekendTime: {
        StartHour: 20,
        StartMinute: 0,
        EndHour: 22,
        EndMinute: 0
      }
    },
    TraderModifiers: {
      StockModifier: 3.0,
      PriceModifier: 1.0,
      RestockTimerModifier: 0.3
    },
    WarEventGameSettings: {
      Interval: 1,
      MajorDuration: 1,
      MinorDuration: 1,
      WeekdayTime: {
        StartHour: 0,
        StartMinute: 0,
        EndHour: 23,
        EndMinute: 59
      },
      WeekendTime: {
        StartHour: 0,
        StartMinute: 0,
        EndHour: 23,
        EndMinute: 59
      },
      ScalingPlayers1: {
        PointsModifier: 1.0,
        DropModifier: 1.0
      },
      ScalingPlayers2: {
        PointsModifier: 0.5,
        DropModifier: 0.5
      },
      ScalingPlayers3: {
        PointsModifier: 0.25,
        DropModifier: 0.25
      },
      ScalingPlayers4: {
        PointsModifier: 0.25,
        DropModifier: 0.25
      }
    }
  }
};

// 创建上下文
const ServerConfigContext = createContext<ServerConfigContextType | undefined>(undefined);

// 创建提供者组件
export const ServerConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ServerConfig>(emptyConfig);
  const [defaultConfigData, setDefaultConfigData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // 获取默认配置
  useEffect(() => {
    const fetchDefaultConfig = async () => {
      try {
        // 先尝试从localStorage加载用户配置
        const savedConfig = localStorage.getItem('userServerConfig');
        if (savedConfig) {
          try {
            const parsedSavedConfig = JSON.parse(savedConfig);
            setConfig(parsedSavedConfig);
            setIsLoading(false);
            return; // 如果成功加载了用户配置，就不需要加载默认配置
          } catch (parseError) {
            console.error('解析保存的配置失败:', parseError);
            // 解析失败时继续加载默认配置
          }
        }

        const response = await fetch('/vrising.md');
        const data = await response.text();
        setDefaultConfigData(data);
        
        // 尝试解析默认配置（移除注释）
        const configText = data.replace(/\/\/.*$/gm, '');
        try {
          const parsedConfig = JSON.parse(configText);
          setConfig(parsedConfig);
        } catch (parseError) {
          console.error('解析默认配置失败:', parseError);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('获取默认配置失败:', error);
        setIsLoading(false);
      }
    };

    fetchDefaultConfig();
  }, []);

  // 当配置更改时保存到localStorage
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('userServerConfig', JSON.stringify(config));
      } catch (error) {
        console.error('保存配置到localStorage失败:', error);
      }
    }
  }, [config, isLoading]);

  // 更新配置的特定路径
  const updateConfig = (path: string, value: unknown) => {
    setConfig(prevConfig => {
      const newConfig = { ...prevConfig };
      const keys = path.split('.');
      let current: Record<string, unknown> = newConfig;
      
      // 遍历路径，直到最后一个键前
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]] as Record<string, unknown>;
      }
      
      // 设置最后一个键的值
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  // 重置配置
  const resetConfig = () => {
    try {
      if (defaultConfigData) {
        const configText = defaultConfigData.replace(/\/\/.*$/gm, '');
        try {
          const parsedConfig = JSON.parse(configText);
          setConfig(parsedConfig);
          
          // 重置时也清除localStorage中的保存
          localStorage.removeItem('userServerConfig');
        } catch (parseError) {
          console.error('重置配置时解析JSON失败:', parseError);
          
          // 解析失败时回退到空配置
          setConfig(emptyConfig);
          localStorage.removeItem('userServerConfig');
        }
      } else {
        // 如果没有默认配置数据，则重新获取
        fetch('/vrising.md')
          .then(response => response.text())
          .then(data => {
            setDefaultConfigData(data);
            const cleanConfig = data.replace(/\/\/.*$/gm, '');
            try {
              const parsedConfig = JSON.parse(cleanConfig);
              setConfig(parsedConfig);
              localStorage.removeItem('userServerConfig');
            } catch (parseError) {
              console.error('重新获取配置后解析失败:', parseError);
              setConfig(emptyConfig);
              localStorage.removeItem('userServerConfig');
            }
          })
          .catch(error => {
            console.error('重新获取默认配置失败:', error);
            setConfig(emptyConfig);
            localStorage.removeItem('userServerConfig');
          });
      }
    } catch (error) {
      console.error('重置配置失败:', error);
      // 发生错误时回退到空配置
      setConfig(emptyConfig);
      localStorage.removeItem('userServerConfig');
    }
  };

  // 导出配置为JSON字符串
  const exportConfig = (): string => {
    return JSON.stringify(config, null, 2);
  };

  // 导入配置
  const importConfig = (jsonString: string) => {
    try {
      const cleanedJson = jsonString.replace(/\/\/.*$/gm, '');
      const parsedConfig = JSON.parse(cleanedJson);
      setConfig(parsedConfig);
      
      // 导入新配置后也更新localStorage
      localStorage.setItem('userServerConfig', JSON.stringify(parsedConfig));
    } catch (error) {
      console.error('导入配置失败:', error);
      alert('导入配置失败，请检查JSON格式是否正确');
    }
  };

  return (
    <ServerConfigContext.Provider value={{ 
      config, 
      setConfig, 
      updateConfig,
      resetConfig,
      exportConfig,
      importConfig,
      isLoading
    }}>
      {children}
    </ServerConfigContext.Provider>
  );
};

// 创建钩子以便在组件中使用上下文
export const useServerConfig = () => {
  const context = useContext(ServerConfigContext);
  if (context === undefined) {
    throw new Error('useServerConfig must be used within a ServerConfigProvider');
  }
  return context;
}; 