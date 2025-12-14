import React from "react";
import styles from "./FormGroup.module.css";

const FormGroup = ({ title, description, children }) => {
  return (
    <div className={styles.group}>
      {(title || description) && (
        <div className={styles.header}>
          {title && <h4 className={styles.title}>{title}</h4>}
          {description && <p className={styles.desc}>{description}</p>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default FormGroup;
