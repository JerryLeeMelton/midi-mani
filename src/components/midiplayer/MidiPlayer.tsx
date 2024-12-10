"use client"

import React, { useState, useEffect, useRef } from "react"
import * as Tone from "tone"
import { Midi } from "@tonejs/midi"
import Icon from "@mdi/react"
import {
  mdiPlay,
  mdiPause,
  mdiStop,
  mdiVolumeHigh,
  mdiVolumeMedium,
  mdiVolumeLow,
  mdiVolumeOff,
} from "@mdi/js"
import styles from "./MidiPlayer.module.css"

interface MIDIPlayerProps {
  file: File | Midi // Accept both File and Midi types
}

const MIDIPlayer: React.FC<MIDIPlayerProps> = ({ file }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [midi, setMidi] = useState<Midi | null>(null)
  const [startTime, setStartTime] = useState<string>("0:0:0")
  const [volume, setVolume] = useState<number>(0) // Default volume (0 dB)

  const volumeNode = useRef(new Tone.Volume(volume).toDestination()) // Volume control node

  const loadMIDI = async () => {
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer()
      const midiData = new Midi(arrayBuffer)
      setMidi(midiData)
    } else {
      setMidi(file) // Directly use the Midi object
    }
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

  const getVolumeIcon = () => {
    const volumePercentage = ((volume + 60) / 60) * 100 // Convert volume to percentage (0-100)
    if (volumePercentage > 66) {
      return mdiVolumeHigh
    } else if (volumePercentage > 33) {
      return mdiVolumeMedium
    } else if (volumePercentage > 0) {
      return mdiVolumeLow
    } else {
      return mdiVolumeOff
    }
  }

  useEffect(() => {
    loadMIDI()
  }, [file, loadMIDI])

  useEffect(() => {
    // Update volume node when volume changes
    volumeNode.current.volume.value = volume
  }, [volume])

  return (
    <div>
      <div className={styles.playbackControlButtonsContainer}>
        <button
          onClick={playMIDI}
          disabled={isPlaying}
          className={styles.playbackControlButton}
        >
          <Icon
            path={mdiPlay}
            size={1}
            className={styles.playbackControlButtonIcon}
          />
        </button>
        <button
          onClick={pauseMIDI}
          disabled={!isPlaying}
          className={styles.playbackControlButton}
        >
          <Icon
            path={mdiPause}
            size={1}
            className={styles.playbackControlButtonIcon}
          />
        </button>
        <button onClick={stopMIDI} className={styles.playbackControlButton}>
          <Icon
            path={mdiStop}
            size={1}
            className={styles.playbackControlButtonIcon}
          />
        </button>
      </div>

      <div className={styles.volumeControlContainer}>
        <label htmlFor="volume" className={styles.volumeControlLabel}>
          <Icon path={getVolumeIcon()} size={1} />
        </label>
        <input
          id="volume"
          type="range"
          min="-60"
          max="0"
          value={volume}
          step="1"
          onChange={handleVolumeChange}
          className={styles.customSlider}
        />
      </div>
    </div>
  )
}

export default MIDIPlayer
