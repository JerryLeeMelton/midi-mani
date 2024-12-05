"use client"

import { useDropzone } from "react-dropzone"
import { FC } from "react"
import styles from "./FileUploader.module.css"

interface FileUploaderProps {
  onFileUpload: (file: File) => void
}

const FileUploader: FC<FileUploaderProps> = ({ onFileUpload }) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      alert("Please upload only one file at a time.")
      return
    }

    const file = acceptedFiles[0]
    console.log("FileUploader  :  file == ", file)
    if (
      file == null ||
      (!file.name.toLowerCase().endsWith(".mid") &&
        !file.name.toLowerCase().endsWith(".midi"))
    ) {
      alert("Only .MIDI and .MID files are allowed.")
      return
    }

    onFileUpload(file)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "audio/midi": [".mid", ".midi"] },
    multiple: false,
  })

  return (
    <div {...getRootProps()} className={styles.container}>
      <input {...getInputProps()} />
      <p>Drag and drop your MIDI file here, or click to select.</p>
    </div>
  )
}

export default FileUploader
