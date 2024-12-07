"use client"

import React, { useState } from "react"
import styles from "./RandomizationControls.module.css"

interface RandomizationControlsProps {
  onApply: (timingRange: number, velocityRange: number) => void
}

const RandomizationControls: React.FC<RandomizationControlsProps> = ({
  onApply,
}) => {
  const [timingRange, setTimingRange] = useState(0) // Timing range in milliseconds
  const [velocityRange, setVelocityRange] = useState(0) // Velocity range

  const handleApply = () => {
    onApply(timingRange, velocityRange)
  }

  return (
    <div
      style={{ marginTop: "20px" }}
      className={styles.randomizationControlsContainer}
    >
      <h2 className={styles.randomizationControlsHeader}>
        Randomization Controls
      </h2>
      <div className={styles.randomizationControlsInputContainer}>
        <label>Timing Range (ms):</label>
        <input
          type="number"
          value={timingRange}
          onChange={(e) => setTimingRange(Number(e.target.value))}
          className={styles.randomizationControlsInput}
        />
      </div>
      <div className={styles.randomizationControlsInputContainer}>
        <label>Velocity Range:</label>
        <input
          type="number"
          value={velocityRange}
          onChange={(e) => setVelocityRange(Number(e.target.value))}
          className={styles.randomizationControlsInput}
        />
      </div>
      <button onClick={handleApply} className={styles.runRandomizationButton}>
        Run Randomization
      </button>
    </div>
  )
}

export default RandomizationControls
