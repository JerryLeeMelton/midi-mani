"use client"

import { useDropzone } from "react-dropzone"
import { FC } from "react"

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
    if (
      !file.name.toLowerCase().endsWith(".mid") &&
      !file.name.toLowerCase().endsWith(".midi")
    ) {
      alert("Only .MIDI and .MID files are allowed.")
      return
    }

    onFileUpload(file) // Pass the single valid file to the parent component
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "audio/midi": [".mid", ".midi"] },
  })

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
