"use client";

import React from 'react';
import styles from './BasicInfoConfig.module.css';
import Card from '../ui/Card';
import Input from '../ui/Input';
import { useServerConfig } from '../../contexts/ServerConfigContext';

const BasicInfoConfig: React.FC = () => {
  const { config, updateConfig } = useServerConfig();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig('Name', e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig('Description', e.target.value);
  };

  return (
    <Card 
      title="基本信息" 
      subtitle="设置规则名称和描述"
      className={styles.card}
    >
      <div className={styles.formGroup}>
        <Input
          label="规则名称"
          value={config.Name}
          onChange={handleNameChange}
          placeholder="输入规则名称"
          fullWidth
          helperText="规则名称，将显示在规则列表中"
        />
        
        <Input
          label="规则描述"
          value={config.Description}
          onChange={handleDescriptionChange}
          placeholder="输入规则描述"
          fullWidth
          helperText="规则描述，简要说明规则特点"
        />
      </div>
    </Card>
  );
};

export default BasicInfoConfig;
