import React, { useState } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({ label, options = [], value, onChange, placeholder = "Select..." }) => {
  const [open, setOpen] = useState(false);
  const current = options.find(o => o.value === value);
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <button className={styles.control} onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open}>
        <span>{current ? current.label : placeholder}</span>
        <span className={styles.caret}>▾</span>
      </button>
      {open && (
        <ul className={styles.menu} role="listbox">
          {options.map(opt => (
            <li key={opt.value} className={styles.item} role="option" aria-selected={opt.value === value}
                onClick={() => { onChange?.(opt.value); setOpen(false); }}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
