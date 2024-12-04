"use client"

import Image from "next/image"
import styles from "./page.module.css"
import FileUploader from "@/components/fileuploader/FileUploader"

const Home: React.FC = () => {
  const handleFileUpload = (files: File[]) => {
    console.log(files)
  }
  return (
    <div className={styles.page}>
      <FileUploader onFileUpload={handleFileUpload} />
    </div>
  )
}

export default Home
