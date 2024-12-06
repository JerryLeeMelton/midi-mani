"use client"

import React, { useState } from "react"
import * as Tone from "tone"
import { Midi } from "@tonejs/midi"

interface MIDIPlayerProps {
  file: File
}

const MIDIPlayer: React.FC<MIDIPlayerProps> = ({ file }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [midi, setMidi] = useState<Midi | null>(null)

  const loadMIDI = async () => {
    const arrayBuffer = await file.arrayBuffer()
    const midiData = new Midi(arrayBuffer)
    setMidi(midiData)
  }

  const playMIDI = async () => {
    if (!midi) return

    await Tone.start() // Ensure Tone.js is ready
    Tone.Transport.stop() // Reset playback
    Tone.Transport.cancel() // Clear previous events

    midi.tracks.forEach((track) => {
      const synth = new Tone.Synth().toDestination()

      track.notes.forEach((note) => {
        Tone.Transport.schedule((time) => {
          synth.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          )
        }, note.time)
      })
    })

    setIsPlaying(true)
    Tone.Transport.start()
  }

  const pauseMIDI = () => {
    Tone.Transport.pause()
    setIsPlaying(false)
  }

  const stopMIDI = () => {
    Tone.Transport.stop()
    setIsPlaying(false)
  }

  React.useEffect(() => {
    loadMIDI()
  }, [file])

  return (
    <div>
      <h2>MIDI Playback</h2>
      <button onClick={playMIDI} disabled={isPlaying}>
        Play
      </button>
      <button onClick={pauseMIDI} disabled={!isPlaying}>
        Pause
      </button>
      <button onClick={stopMIDI}>Stop</button>
    </div>
  )
}

export default MIDIPlayer
