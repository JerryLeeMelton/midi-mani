import React from "react"
import { Track } from "@/modules/midi/MidiParser"
import styles from "./MidiVisualizer.module.css"

interface MidiVisualizerProps {
  tracks: Track[]
}

const MidiVisualizer: React.FC<MidiVisualizerProps> = ({ tracks }) => {
  return (
    <div className={styles.container}>
      <h2>MIDI Tracks</h2>
      {tracks.map((track, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>{track.name}</h3>
          <p>Number of notes: {track.notes.length}</p>
          <ul>
            {track.notes.slice(0, 10).map(
              (
                note,
                i // Display only the first 10 notes
              ) => (
                <li key={i}>
                  {note.pitch} (Time: {note.time.toFixed(2)}s, Duration:{" "}
                  {note.duration.toFixed(2)}s)
                </li>
              )
            )}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default MidiVisualizer
