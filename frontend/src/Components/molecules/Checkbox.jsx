import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({ label, checked, onChange, name, disabled }) => {
  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        name={name}
        checked={!!checked}
        onChange={e => onChange?.(e.target.checked)}
        disabled={disabled}
        className={styles.input}
      />
      <span className={styles.box} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Checkbox;
