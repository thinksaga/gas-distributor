import React from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = ({ items = [] }) => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.menu}>
          {items.map(item => (
            <li key={item.to} className={styles.item}>
              <Link to={item.to} className={styles.link}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
