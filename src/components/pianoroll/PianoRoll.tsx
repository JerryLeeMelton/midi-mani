import React, { FC } from "react"

interface Note {
  pitch: string
  time: number
  duration: number
}

interface PianoRollProps {
  notes: Note[]
}

const pitchToY = (pitch: string): number => {
  const pitchMap: Record<string, number> = {
    C: 0,
    D: 1,
    E: 2,
    F: 3,
    G: 4,
    A: 5,
    B: 6,
  }

  const octave = parseInt(pitch.slice(-1), 10) // Extract the octave number
  const note = pitch.charAt(0) // Extract the note (C, D, E, etc.)
  const semitoneOffset = pitch.includes("#") ? 1 : 0

  return (octave * 7 + pitchMap[note]) * 10 + semitoneOffset * 5 // Calculate vertical position
}

const PianoRoll: FC<PianoRollProps> = ({ notes }) => {
  const width = 800 // Example width
  const height = 400 // Example height
  const timeToX = (time: number) => time * 100 // Map time to horizontal position

  return (
    <svg width={width} height={height} style={{ border: "1px solid black" }}>
      {notes.map((note, index) => (
        <rect
          key={index}
          x={timeToX(note.time)} // Horizontal position
          y={height - pitchToY(note.pitch)} // Vertical position
          width={note.duration * 100} // Duration determines width
          height={10} // Fixed height for each note
          fill="blue"
        />
      ))}
    </svg>
  )
}

export default PianoRoll
