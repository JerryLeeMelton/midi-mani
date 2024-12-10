"use client"

import React, { useState } from "react"
import styles from "./RandomizationControls.module.css"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css" //

interface RandomizationControlsProps {
  onApply: (timingRange: number, velocityRange: number) => void
}

const RandomizationControls: React.FC<RandomizationControlsProps> = ({
  onApply,
}) => {
  const [timingRange, setTimingRange] = useState(0) // Timing range in milliseconds
  const [velocityRange, setVelocityRange] = useState(0) // Velocity range
  const timingRangeTooltip =
    "The range in milliseconds (ms) that the timing of the notes will be randomized by."
  const velocityRangeTooltip =
    "The range in velocity that the velocity of the notes will be randomized by. 0 is no change, 127 is a full range change."

  const handleApply = () => {
    onApply(timingRange, velocityRange)
  }

  return (
    <div className={styles.randomizationControlsContainer}>
      <h2 className={styles.randomizationControlsHeader}>Humanization</h2>
      <Tippy content={timingRangeTooltip}>
        <div className={styles.randomizationControlsInputContainer}>
          <label>Timing Range (ms):</label>

          <input
            type="number"
            value={timingRange}
            onChange={(e) => setTimingRange(Number(e.target.value))}
            className={styles.randomizationControlsInput}
            min={0}
            max={1000}
          />
        </div>
      </Tippy>
      <Tippy content={velocityRangeTooltip}>
        <div className={styles.randomizationControlsInputContainer}>
          <label>Velocity Range:</label>
          <input
            type="number"
            value={velocityRange}
            onChange={(e) => setVelocityRange(Number(e.target.value))}
            className={styles.randomizationControlsInput}
            min={0}
            max={127}
          />
        </div>
      </Tippy>
      <button onClick={handleApply} className={styles.runRandomizationButton}>
        Run Humanization
      </button>
    </div>
  )
}

export default RandomizationControls
