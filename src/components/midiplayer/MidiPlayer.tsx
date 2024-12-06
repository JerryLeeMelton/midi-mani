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
    Tone.getTransport().stop() // Reset playback
    Tone.getTransport().cancel() // Clear previous events

    midi.tracks.forEach((track) => {
      const synth = new Tone.Synth().toDestination()

      track.notes.forEach((note) => {
        Tone.getTransport().schedule((time) => {
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
    Tone.getTransport().start()
  }

  const pauseMIDI = () => {
    Tone.getTransport().pause()
    setIsPlaying(false)
  }

  const stopMIDI = () => {
    Tone.getTransport().stop()
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
