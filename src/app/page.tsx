"use client"

import { useState } from "react"
import FileUploader from "@/components/fileuploader/FileUploader"
import MIDIPlayer from "@/components/midiplayer/MidiPlayer"
import RandomizationControls from "@/components/randomizationcontrols/RandomizationControls"
import { Midi } from "@tonejs/midi"
import styles from "./page.module.css"
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

    const newMidi = new Midi(midi.toArray()) // Clone the original MIDI file
    newMidi.tracks.forEach((track) => {
      track.notes.forEach((note) => {
        // Randomize timing
        const timeShift = Math.random() * 2 * timingRange - timingRange // Range: [-timingRange, timingRange]
        note.time += timeShift / 1000 // Convert ms to seconds

        // Randomize velocity
        const velocityShift = Math.random() * 2 * velocityRange - velocityRange // Range: [-velocityRange, velocityRange]
        note.velocity = Math.max(0, Math.min(1, note.velocity + velocityShift)) // Clamp between 0 and 1
      })
    })

    setModifiedMidi(newMidi) // Update the modified MIDI
  }

  const handleDownload = () => {
    if (!modifiedMidi) return

    const blob = new Blob([modifiedMidi.toArray()], { type: "audio/midi" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "modified-file.mid"
    a.click()
  }

  return (
    <div style={{ padding: "20px" }} className={styles.pageContainer}>
      <FileUploader onFileUpload={handleFileUpload} />
      {uploadedFile && (
        <>
          <RandomizationControls onApply={handleApplyRandomization} />
          <MIDIPlayer file={modifiedMidi || uploadedFile} />
          <button
            onClick={handleDownload}
            disabled={!modifiedMidi}
            className={styles.downloadButton}
          >
            Download Modified File
          </button>
        </>
      )}
    </div>
  )
}
