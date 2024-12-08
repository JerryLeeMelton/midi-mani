"use client"

import React, { useState } from "react"
import styles from "./DownloadButton.module.css"

interface DownloadButtonProps {
  onDownload: () => void
  disabled: boolean
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onDownload,
  disabled,
}) => {
  const handleDownload = () => {
    onDownload()
  }

  return (
    <div className={styles.downloadButtonContainer}>
      <button
        onClick={handleDownload}
        disabled={disabled}
        className={styles.downloadButton}
      >
        Download Modified File
      </button>
    </div>
  )
}

export default DownloadButton
