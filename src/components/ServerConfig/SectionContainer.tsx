"use client";

import React, { ReactNode } from 'react';
import styles from './SectionContainer.module.css';

interface SectionContainerProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  title,
  subtitle,
  children
}) => {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
};

export default SectionContainer; 