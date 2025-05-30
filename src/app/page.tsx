"use client"

import { useState } from "react"
import FileUploader from "@/components/fileuploader/FileUploader"
import MIDIPlayer from "@/components/midiplayer/MidiPlayer"
import RandomizationControls from "@/components/randomizationcontrols/RandomizationControls"
import { Midi } from "@tonejs/midi"
import styles from "./page.module.css"
import DownloadButton from "@/components/downloadbutton/DownloadButton"

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [midi, setMidi] = useState<Midi | null>(null)
  const [modifiedMidi, setModifiedMidi] = useState<Midi | null>(null)

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file)
    const arrayBuffer = await file.arrayBuffer()
    const midiData = new Midi(arrayBuffer)
    setMidi(midiData)
    setModifiedMidi(null) // Reset modifications
  }

  const handleApplyRandomization = (
    timingRange: number,
    velocityRange: number
  ) => {
    if (!midi) return

    const newMidi = new Midi(midi.toArray())
    newMidi.tracks.forEach((track) => {
      track.notes.forEach((note) => {
        // Randomize timing
        const timeShift = Math.random() * 2 * timingRange - timingRange
        note.time += timeShift / 1000 // Convert ms to seconds

        // Randomize velocity
        const velocityRangeNormalized = velocityRange / 127 // Convert 0–127 to 0–1 for tonejs
        const velocityShift =
          Math.random() * 2 * velocityRangeNormalized - velocityRangeNormalized
        note.velocity = Math.max(0, Math.min(1, note.velocity + velocityShift)) // Clamp between 0 and 1 for tonejs
      })
    })

    setModifiedMidi(newMidi)
  }

  const handleDownload = () => {
    if (!modifiedMidi) return

    const blob = new Blob([modifiedMidi.toArray()], { type: "audio/midi" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    const trimmed = uploadedFile?.name.replace(/\.[^/.]+$/, "")
    a.download = trimmed ? `${trimmed}-modified.mid` : "modified-file.mid"
    a.click()
  }

  return (
    <div style={{ padding: "20px" }} className={styles.pageContainer}>
      <FileUploader onFileUpload={handleFileUpload} />
      {uploadedFile && (
        <>
          <MIDIPlayer file={modifiedMidi || uploadedFile} />
          <RandomizationControls onApply={handleApplyRandomization} />
          <DownloadButton
            onDownload={handleDownload}
            disabled={!modifiedMidi}
          />
        </>
      )}
    </div>
  )
}
