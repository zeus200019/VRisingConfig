"use client";

import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  icon,
  className = '',
  headerClassName = '',
  bodyClassName = ''
}) => {
  const hasHeader = title || subtitle || icon;
  
  return (
    <div className={`${styles.card} ${className}`}>
      {hasHeader && (
        <div className={`${styles.cardHeader} ${headerClassName}`}>
          {icon && <div className={styles.cardIcon}>{icon}</div>}
          <div className={styles.cardTitles}>
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
          </div>
        </div>
      )}
      <div className={`${styles.cardBody} ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card; 