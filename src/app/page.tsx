"use client"

import Image from "next/image"
import styles from "./page.module.css"
import FileUploader from "@/components/fileuploader/FileUploader"
import { parseMIDI } from "@/modules/midi/midi"
import { Note } from "@tonejs/midi/dist/Note"
import { useState } from "react"

const Home: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (file: File | null) => {
    if (file) {
      console.log("Uploaded file:", file) // For debugging
      setUploadedFile(file) // Store the file in state
    } else {
      setUploadedFile(null) // Clear the file on invalid upload
    }
  }

  return (
    <div style={{ padding: "20px" }} className={styles.page}>
      <FileUploader onFileUpload={handleFileUpload} />
      {uploadedFile && <p>Uploaded file: {uploadedFile.name}</p>}
    </div>
  )
}

export default Home
