import { Midi } from "@tonejs/midi"
import { Note } from "@tonejs/midi/dist/Note"

export const parseMIDI = async (MIDIfile: File): Promise<Note[]> => {
  const midiData = await Midi.fromUrl(MIDIfile.webkitRelativePath)
  // const arrayBuffer = await MIDIfile.arrayBuffer()
  // const midi = new Midi(arrayBuffer)

  const notes = midiData.tracks.flatMap((track) =>
    track.notes.map((note) => note)
  )

  return notes
}
