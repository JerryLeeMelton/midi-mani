import React from "react"
import styles from "./Header.module.css"

export const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>midi mani</h1>
      <h3 className={styles.h3}>an online midi manipulator</h3>
    </div>
  )
}
