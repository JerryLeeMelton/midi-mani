"use client"

import { useDropzone } from "react-dropzone"
import { FC, useState } from "react"
import styles from "./FileUploader.module.css"

interface FileUploaderProps {
  onFileUpload: (file: File) => void
}

const FileUploader: FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      alert("Please upload only one file at a time.")
      return
    }

    const file = acceptedFiles[0]
    if (
      file == null ||
      (!file.name.toLowerCase().endsWith(".mid") &&
        !file.name.toLowerCase().endsWith(".midi"))
    ) {
      alert("Only .MIDI and .MID files are allowed.")
      return
    }

    setUploadedFile(file) // Update local state
    onFileUpload(file) // Notify parent component
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "audio/midi": [".mid", ".midi"] },
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={uploadedFile ? styles.containerUploaded : styles.container}
    >
      <input {...getInputProps()} />
      {uploadedFile ? (
        <div className={styles.uploadedFile}>
          <p className={styles.uploadedFileName}>{uploadedFile.name}</p>
          <p className={styles.uploaderDescriptionText}>
            Drag and drop a new file to replace it.
          </p>
        </div>
      ) : (
        <p className={styles.uploaderDescriptionText}>
          Drag and drop your MIDI file here, or click to select.
        </p>
      )}
    </div>
  )
}

export default FileUploader
