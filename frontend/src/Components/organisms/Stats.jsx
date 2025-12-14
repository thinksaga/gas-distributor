import React from "react";
import styles from "./Stats.module.css";

const Stats = ({ items = [] }) => {
  return (
    <div className={styles.grid}>
      {items.map((s, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.value}>{s.value}</div>
          <div className={styles.label}>{s.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
