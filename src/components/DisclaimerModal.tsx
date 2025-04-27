"use client";

import React from 'react';
import styles from './DisclaimerModal.module.css';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>用户协议与免责声明</h2>
        <div className={styles.content}>
          <p>感谢使用V Rising服务器配置工具。在开始使用前，请仔细阅读以下条款：</p>
          
          <h3>1. 非官方工具声明</h3>
          <p>本工具为非官方第三方工具，与V Rising游戏开发商Stunlock Studios没有任何从属关系。我们不代表V Rising或Stunlock Studios的官方立场。</p>
          
          <h3>2. 使用风险</h3>
          <p>使用本工具配置服务器的风险由用户自行承担。我们不对因使用本工具而导致的任何服务器故障、数据丢失、游戏体验问题或其他任何损失承担责任。</p>
          
          <h3>3. 准确性声明</h3>
          <p>虽然我们尽力确保工具中的配置选项准确无误，但不保证所有信息完全准确或随游戏更新而及时更新。用户应参考官方文档验证关键配置。</p>
          
          <h3>4. 知识产权声明</h3>
          <p>V Rising及其相关图像、标志和内容归Stunlock Studios所有。本工具的使用不应被视为对这些知识产权的任何侵犯。本工具仅用于帮助服务器管理，不提供任何游戏内容的复制或分发。</p>
          
          <h3>5. 服务中断</h3>
          <p>我们不保证本工具服务的连续性或可用性，可能会出现暂时的服务中断或永久性的服务终止。</p>
          
          <h3>6. 用户责任</h3>
          <p>用户有责任确保服务器配置符合游戏规则和服务条款。使用本工具不免除用户遵守V Rising相关协议的责任。</p>
          
          <p className={styles.finalStatement}>通过使用本工具，您确认已阅读并理解以上免责声明，并同意受其约束。</p>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          同意并继续
        </button>
      </div>
    </div>
  );
};

export default DisclaimerModal; 