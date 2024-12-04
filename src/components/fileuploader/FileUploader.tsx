"use client"

import { useDropzone } from "react-dropzone"
import { FC } from "react"

interface FileUploaderProps {
  onFileUpload: (files: File[]) => void
}

const FileUploader: FC<FileUploaderProps> = ({ onFileUpload }) => {
  const onDrop = (acceptedFiles: File[]) => onFileUpload(acceptedFiles)
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed gray",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <p>Drag and drop your MIDI file here, or click to select.</p>
    </div>
  )
}

export default FileUploader
