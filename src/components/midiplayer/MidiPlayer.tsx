"use client"

import React, { useState, useEffect, useRef } from "react"
import * as Tone from "tone"
import { Midi } from "@tonejs/midi"

interface MIDIPlayerProps {
  file: File
}

const MIDIPlayer: React.FC<MIDIPlayerProps> = ({ file }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [midi, setMidi] = useState<Midi | null>(null)
  const [startTime, setStartTime] = useState<string>("0:0:0")
  const [volume, setVolume] = useState<number>(0) // Default volume (0 dB)

  const volumeNode = useRef(new Tone.Volume(volume).toDestination()) // Volume control node

  const loadMIDI = async () => {
    const arrayBuffer = await file.arrayBuffer()
    const midiData = new Midi(arrayBuffer)
    setMidi(midiData)
  }

  const playMIDI = async () => {
    if (!midi) return

    await Tone.start() // Ensure Tone.js is ready

    if (!isPlaying) {
      // Stop and reset if starting fresh
      if (startTime === "0:0:0") {
        Tone.getTransport().stop()
        Tone.getTransport().cancel()
        scheduleMIDIEvents(midi)
      }

      // Resume from current time or restart
      Tone.getTransport().start(undefined, startTime)
      setIsPlaying(true)
    }
  }

  const pauseMIDI = () => {
    if (isPlaying) {
      setStartTime(Tone.getTransport().position.toString()) // Save the current position
      Tone.getTransport().pause()
      setIsPlaying(false)
    }
  }

  const stopMIDI = () => {
    Tone.getTransport().stop()
    Tone.getTransport().cancel()
    setStartTime("0:0:0") // Reset to start of the track
    setIsPlaying(false)
  }

  const scheduleMIDIEvents = (midiData: Midi) => {
    midiData.tracks.forEach((track) => {
      const synth = new Tone.Synth().connect(volumeNode.current) // Connect synth to volume node

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
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value)
    setVolume(newVolume)
    volumeNode.current.volume.value = newVolume // Update volume in real-time
  }

  useEffect(() => {
    loadMIDI()
  }, [file])

  useEffect(() => {
    // Update volume node when volume changes
    volumeNode.current.volume.value = volume
  }, [volume])

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
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="volume">Volume:</label>
        <input
          id="volume"
          type="range"
          min="-60" // Minimum volume (mute)
          max="0" // Maximum volume (0 dB)
          value={volume}
          step="1"
          onChange={handleVolumeChange}
        />
        <span>{volume} dB</span>
      </div>
    </div>
  )
}

export default MIDIPlayer
