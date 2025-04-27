"use client";

import React, { useState, ReactNode, useEffect } from 'react';
import styles from './MainLayout.module.css';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

interface SectionProps {
  id: string;
  [key: string]: string | ReactNode;
}

const navItems: NavItem[] = [
  { id: 'export', label: '配置管理', icon: '💾' },
  { id: 'basic-info', label: '基本信息', icon: '🔰' },
  { id: 'game-mode', label: '游戏模式', icon: '🎮' },
  { id: 'resources', label: '资源倍率', icon: '📦' },
  { id: 'game-time', label: '时间设置', icon: '🕒' },
  { id: 'combat', label: '战斗设置', icon: '⚔️' },
  { id: 'castle', label: '城堡设置', icon: '🏰' },
  { id: 'pvp', label: 'PVP设置', icon: '🛡️' },
  { id: 'war-event', label: '裂隙事件', icon: '🌀' }

];

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description }) => {
  const [activeSection, setActiveSection] = useState<string>(navItems[0].id);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // 检测窗口大小变化
  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // 初始检查
    checkWindowSize();
    
    // 添加事件监听器
    window.addEventListener('resize', checkWindowSize);
    
    // 清理
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // 点击导航项时自动关闭移动侧边栏
  const handleNavClick = (id: string) => {
    setActiveSection(id);
    if (isMobile) {
      setSidebarExpanded(false);
    }
  };

  // 将children数组扁平化处理
  const childrenArray = React.Children.toArray(children);

  // 过滤并显示当前活动的部分
  const renderActiveSection = () => {
    // 找到与当前活动ID匹配的子元素
    const activeChild = childrenArray.find(
      (child) => React.isValidElement(child) && 
        (child as React.ReactElement<SectionProps>).props.id === activeSection
    );
    
    return activeChild || null;
  };

  // 计算侧边栏类名
  const sidebarClassName = [
    styles.sidebar,
    sidebarCollapsed ? styles.collapsed : '',
    isMobile && sidebarExpanded ? styles.expanded : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      {isMobile && (
        <button 
          className={styles.mobileToggle}
          onClick={toggleMobileSidebar}
          aria-label="切换菜单"
        >
          {sidebarExpanded ? '✕' : '☰'}
        </button>
      )}
      
      <div className={sidebarClassName}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>V Rising 配置工具</h2>
          <button 
            className={styles.toggleButton} 
            onClick={toggleSidebar}
            aria-label={sidebarCollapsed ? "展开侧边栏" : "收起侧边栏"}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.id} className={styles.navItem}>
                <button
                  className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className={styles.sidebarFooter}>
          {!sidebarCollapsed && (
            <p className={styles.footerText}>夜族崛起服务器配置工具</p>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </header>

        <main className={styles.main}>
          <div className={styles.contentContainer}>
            {renderActiveSection()}
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>夜族崛起服务器配置工具 &copy; {new Date().getFullYear()}</p>
            <button 
              className={styles.disclaimerLink}
              onClick={() => {
                // 触发一个自定义事件，使DisclaimerWrapper组件显示免责声明
                const showDisclaimerEvent = new CustomEvent('showDisclaimer');
                window.dispatchEvent(showDisclaimerEvent);
              }}
            >
              查看免责声明
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout; 