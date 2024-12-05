import { Midi } from "@tonejs/midi"

export interface Note {
  pitch: string
  time: number
  duration: number
}

export interface Track {
  name: string
  notes: Note[]
}

export const parseMIDIFile = async (file: File): Promise<Track[]> => {
  const arrayBuffer = await file.arrayBuffer()
  const midi = new Midi(arrayBuffer)

  return midi.tracks.map((track) => ({
    name: track.name || "Untitled Track",
    notes: track.notes.map((note) => ({
      pitch: note.name, // ex., "C4"
      time: note.time, // Start time in seconds
      duration: note.duration, // Duration in seconds
    })),
  }))
}
