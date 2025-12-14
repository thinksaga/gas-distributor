import React from "react";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

const Navigation = ({ left = [], right = [] }) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          {left.map(item => (
            <Link key={item.to} to={item.to} className={styles.link}>{item.label}</Link>
          ))}
        </div>
        <div className={styles.right}>
          {right.map(item => (
            <Link key={item.to} to={item.to} className={styles.link}>{item.label}</Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
