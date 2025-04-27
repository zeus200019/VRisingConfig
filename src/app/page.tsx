"use client";

import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import SectionContainer from '../components/ServerConfig/SectionContainer';
import { ServerConfigProvider } from '../contexts/ServerConfigContext';
import BasicInfoConfig from '../components/ServerConfig/BasicInfoConfig';
import GameModeConfig from '../components/ServerConfig/GameModeConfig';
import ResourceModifierConfig from '../components/ServerConfig/ResourceModifierConfig';
import GameTimeConfig from '../components/ServerConfig/GameTimeConfig';
import CombatConfig from '../components/ServerConfig/CombatConfig';
import CastleConfig from '../components/ServerConfig/CastleConfig';
import PVPConfig from '../components/ServerConfig/PVPConfig';
import WarEventConfig from '../components/ServerConfig/WarEventConfig';
import ConfigExportImport from '../components/ServerConfig/ConfigExportImport';

export default function Home() {
  return (
    <ServerConfigProvider>
      <MainLayout 
        title=""
      >

        <SectionContainer id="export" title="配置管理">
          <ConfigExportImport />
        </SectionContainer>

        <SectionContainer id="basic-info" title="基本信息">
          <BasicInfoConfig />
        </SectionContainer>
        
        <SectionContainer id="game-mode" title="游戏模式设置">
          <GameModeConfig />
        </SectionContainer>
        
        <SectionContainer id="resources" title="资源修改器设置">
          <ResourceModifierConfig />
        </SectionContainer>
        
        <SectionContainer id="game-time" title="游戏时间设置">
          <GameTimeConfig />
        </SectionContainer>
        
        <SectionContainer id="combat" title="战斗系统设置">
          <CombatConfig />
        </SectionContainer>
        
        <SectionContainer id="castle" title="城堡系统设置">
          <CastleConfig />
        </SectionContainer>
        
        <SectionContainer id="pvp" title="PVP系统设置">
          <PVPConfig />
        </SectionContainer>
        
        <SectionContainer id="war-event" title="莫尔提姆裂隙设置">
          <WarEventConfig />
        </SectionContainer>
        

      </MainLayout>
    </ServerConfigProvider>
  );
}
