import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Tone from "tone";
import { chordsList, drumsList, voxList } from "./tracks.js"

const App = () => {

   const [isLoaded, setLoaded] = useState(false);
   const [isPlaying, setPlaying] = useState(false);
   const [progress, setProgress] = useState(0);
   const chords = useRef(null);
   const drums = useRef(null);
   const vox = useRef(null);
   const transport = useRef(null);
   transport.current = Tone.Transport;

   useEffect(() => {
      transport.current.loop = true;
      transport.current.bpm.value = 150;
      transport.current.loopStart = "0m";
      transport.current.loopEnd = "8m";

      // new Tone.Loop(() => {
      //    setProgress(Math.round(transport.current.progress*100));
      // }, "4n").start();

      chords.current = new Tone.Player({
         url: pickRandomTrack(chordsList),
         loop: true
      }).toMaster().sync().start();

      drums.current = new Tone.Player({
         url: pickRandomTrack(drumsList),
         loop: true
      }).toMaster().sync().start();

      vox.current = new Tone.Player({
         url: pickRandomTrack(voxList),
         loop: true
      }).toMaster().sync().start();

   
      Tone.Buffer.on('load', () => {
         setLoaded(true);
      })
   }, []);

   const togglePlay = () => {
      if (isPlaying) {
         transport.current.stop();
      }
      else {
         transport.current.start();
      }
      setPlaying(!isPlaying);
   }

   const shuffle = () => {
      const newChords = pickRandomTrack(chordsList);
      const newDrums = pickRandomTrack(drumsList);
      const newVox = pickRandomTrack(voxList);

      console.log(newChords);
      console.log(newDrums);
      console.log(newVox);

      chords.current.load(newChords);
      drums.current.load(newDrums);
      vox.current.load(newVox);
   }

   const pickRandomTrack = (tracks) => {
      return "./audio/" + tracks[getRandomInt(tracks.length)];
   }

   const getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max));
   }

   const muteChords = () => {
      chords.current.mute = !chords.current.mute;
   }

   const muteDrums = () => {
      drums.current.mute = !drums.current.mute;
   }

   const muteVox = () => {
      vox.current.mute = !vox.current.mute;
   }

   const printProg = () => {
      console.log(Math.round(transport.current.progress*100));
   }

   return (
      <div>
         <button disabled={!isLoaded} onClick={togglePlay}>
            toggle play
         </button>
         <button disabled={!isLoaded} onClick={shuffle}>
            shuffle
         </button>
         <button disabled={!isLoaded} onClick={muteChords}>
            mute chords
         </button>
         <button disabled={!isLoaded} onClick={muteDrums}>
            mute drums
         </button>
         <button disabled={!isLoaded} onClick={muteVox}>
            mute vox
         </button>
         <button onClick={printProg}>show prog</button>
      </div>
   );
};

export default App;

//mute button and lock button