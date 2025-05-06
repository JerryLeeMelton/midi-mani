# MIDI Mani - Online MIDI Manipulator

MIDI Mani is a web-based application that allows users to perform automated edits on MIDI files. Built with Next.js and TypeScript, it offers a user-friendly interface for musicians and producers to enhance their MIDI sequences.

Currently, the only function available on the platform is the "Humanization" function, which randomizes timing and velocity data to achieve a less robotic feel in your MIDI data.

MIDI Mani is designed to be as easy and no-nonsense as possible. Just drag and drop the MIDI file that you'd like to work on into the input box on the page to get started.

Make edits to the available parameters, then run your edits using the corresponding button.

When that's done you can preview your edits and then, if you're happy, download the resulting MIDI file for use in a DAW or sequencer.

## 🌐 Live Site

Explore the live application at [midimani.jerryleemelton.com](https://midimani.jerryleemelton.com)

## 🧰 Technologies Used

- **Frontend**:
  - Next.js
  - TypeScript

- **Backend**:
  - Node.js

## 🚀 Features

- **Humanization**: Apply subtle variations to MIDI sequences to make them sound more natural.
- **Drag-and-Drop Interface**: Easily upload MIDI files by dragging them into the application.
- **Real-Time Preview**: Listen to the edited MIDI before downloading.
- **Download Functionality**: Save the modified MIDI file for use in your DAW or sequencer.

## 🛠️ Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/JerryLeeMelton/midi-mani.git
   cd midi-mani
2. **Install Dependencies**:
   ```bash
   yarn install
3. **Run the Application**:
   ```bash
   yarn dev
4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`

## 🛣️ Future Enhancements

-   **File Visualization**: Add a display feature with zoom capabilities to allow a user to visually see how the notes are being changed on a piano roll style UI.

-   **Improved Previewing**: Expand and improve options for previewing MIDI data on the site.

-   **Transposition**: Shift notes to different keys.
    
-   **Track Splitting**: Separate MIDI tracks for individual editing.
    
-   **Quantization**: Align notes to a specified grid for rhythmic consistency.
    

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 🙌 Acknowledgements

-   [Next.js](https://nextjs.org/) for the React framework.
    
-   Tone.js for handling audio playback and manipulation.
