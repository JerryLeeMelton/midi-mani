"use client"

import Image from "next/image"
import styles from "./page.module.css"
import FileUploader from "@/components/fileuploader/FileUploader"
import { parseMIDIFile, Track } from "@/modules/midi/MidiParser"
import MidiVisualizer from "@/components/midivisualizer/MidiVisualizer"
import { useState } from "react"
import MIDIPlayer from "@/components/midiplayer/MidiPlayer"

const Home: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])

  const handleFileUpload = async (file: File | null) => {
    if (file) {
      setUploadedFile(file)
      const parsedTracks = await parseMIDIFile(file)
      setTracks(parsedTracks) // Store parsed tracks
    } else {
      setUploadedFile(null)
      setTracks([])
    }
  }

  return (
    <div style={{ padding: "20px" }} className={styles.page}>
      <div>
        <FileUploader onFileUpload={handleFileUpload} />
        {uploadedFile && (
          <>
            <MIDIPlayer file={uploadedFile} />
          </>
        )}
      </div>

      {tracks.length > 0 && (
        <>
          <MidiVisualizer tracks={tracks} />
        </>
      )}
    </div>
  )
}

export default Home
