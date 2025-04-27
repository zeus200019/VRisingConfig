"use client";

import React, { useState, useEffect } from 'react';
import DisclaimerModal from './DisclaimerModal';

interface DisclaimerWrapperProps {
  children: React.ReactNode;
}

const DisclaimerWrapper: React.FC<DisclaimerWrapperProps> = ({ children }) => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  
  useEffect(() => {
    // 检查用户是否已接受免责声明
    const hasAcceptedDisclaimer = localStorage.getItem('disclaimerAccepted');
    
    if (!hasAcceptedDisclaimer) {
      setShowDisclaimer(true);
    }
    
    // 监听显示免责声明的自定义事件
    const handleShowDisclaimerEvent = () => {
      setShowDisclaimer(true);
    };
    
    window.addEventListener('showDisclaimer', handleShowDisclaimerEvent);
    
    // 清理事件监听器
    return () => {
      window.removeEventListener('showDisclaimer', handleShowDisclaimerEvent);
    };
  }, []);
  
  const handleCloseDisclaimer = () => {
    // 保存用户已接受免责声明的状态
    localStorage.setItem('disclaimerAccepted', 'true');
    setShowDisclaimer(false);
  };
  
  return (
    <>
      {children}
      
      {/* 免责声明模态窗口 */}
      <DisclaimerModal 
        isOpen={showDisclaimer} 
        onClose={handleCloseDisclaimer} 
      />
    </>
  );
};

export default DisclaimerWrapper; 