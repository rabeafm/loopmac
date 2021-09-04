import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Pad from "./Pad";

const SOUNDS = [
  {
    num: 0,
    name: 'Future Funk Beats',
    source: '../res/120_future_funk_beats_25.mp3'
  },
  {
    num: 1,
    name: 'Slutter Break Beats',
    source: './res/120_stutter_breakbeats_16.mp3'
  },
  {
    num: 2,
    name: 'Heavy Funk Groove',
    source: './res/Bass Warwick heavy funk groove on E 120 BPM.mp3'
  },
  {
    num: 3,
    name: 'Electric Guitar',
    source: './res/electric guitar coutry slide 120bpm - B.mp3'
  },
  {
    num: 4,
    name: 'Stompy Slosh',
    source: './res/FUD_120_StompySlosh.mp3'
  },
  {
    num: 5,
    name: 'Groove Tangu',
    source: './res/GrooveB_120bpm_Tanggu.mp3'
  },
  {
    num: 6,
    name: 'Maze Politics',
    source: './res/MazePolitics_120_Perc.mp3'
  },
  {
    num: 7,
    name: 'Pass 3 Groove',
    source: './res/PAS3GROOVE1.03B.mp3'
  },
  {
    num: 8,
    name: 'Silent Star Organ',
    source: './res/SilentStar_120_Em_OrganSynth.mp3'
  }
];

const LoopMachine = () => {
  // setting up audio array
  const [audioArray] = useState([
    { num: 0, name: SOUNDS[0].name, audio: new Audio(SOUNDS[0].source) },
    { num: 1, name: SOUNDS[1].name, audio: new Audio(SOUNDS[1].source) },
    { num: 2, name: SOUNDS[2].name, audio: new Audio(SOUNDS[2].source) },
    { num: 3, name: SOUNDS[3].name, audio: new Audio(SOUNDS[3].source) },
    { num: 4, name: SOUNDS[4].name, audio: new Audio(SOUNDS[4].source) },
    { num: 5, name: SOUNDS[5].name, audio: new Audio(SOUNDS[5].source) },
    { num: 6, name: SOUNDS[6].name, audio: new Audio(SOUNDS[6].source) },
    { num: 7, name: SOUNDS[7].name, audio: new Audio(SOUNDS[7].source) },
    { num: 8, name: SOUNDS[8].name, audio: new Audio(SOUNDS[8].source) }]);

  // play state
  const [play, setPlay] = useState(false);
  // toggling play
  const toggle = () => setPlay(!play);

  // Interval counter
  const [times, repeat] = useState(0);
  // record state
  const [record, setRecord] = useState(false);
  // toggling record
  const toggleR = () => setRecord(!record);
  // record array
  const [recording, setRecording] = useState([]);

  // current interval playlist
  const [playlist,setPlaylist] = useState ([false, false, false, false, false, false, false, false, false]);
  
  // change playlist
  const togglePlaylist = (num,val) => {
    let arr = JSON.parse(JSON.stringify(playlist));
    arr[num] = val;
    setPlaylist(arr);
    if(val===false)
      audioArray[num].audio.pause();
  }

  const playRecording = (num) => {
    audioArray.forEach(item => {
        if(recording[num][item.num]) {item.audio.currentTime = 0; item.audio.play();
          togglePlaylist(item.num,true)}
      });
      setTimeout(()=>{
        if(recording.length>num+1)
          playRecording(num+1);
      },8000);
  }

 

  useEffect(() => {
    if(play){
      audioArray.forEach(item => {
        if(playlist[item.num]) {item.audio.currentTime = 0; item.audio.play();}
      });
      setTimeout(()=>{
        repeat(times+1);
      },8000);
      if (record){
        setRecording( [ ...recording, JSON.parse(JSON.stringify(playlist)) ]);
        console.log(times);
        console.log("record after playlist added");
        console.log(recording);
      }
    } else {
      audioArray.forEach(item => {
        item.audio.pause();
      });
    }
     // eslint-disable-next-line
    }, [play,times]
  );
  
  return (
    <div>
      <NavBar play={play} toggle={toggle} record={record} toggleR={toggleR} recording={recording} playRecording={playRecording}/>
      <Pad num={0} audioArray={audioArray} playlist={playlist} togglePlaylist={togglePlaylist} />
      <Pad num={1} audioArray={audioArray} playlist={playlist} togglePlaylist={togglePlaylist} />
      <Pad num={2} audioArray={audioArray} playlist={playlist} togglePlaylist={togglePlaylist} />
      <Pad num={3} audioArray={audioArray} playlist={playlist} togglePlaylist={togglePlaylist} />
      <Pad num={4} audioArray={audioArray} playlist={playlist} togglePlaylist={togglePlaylist} />
      <Pad num={5} audioArray={audioArray} playlist={playlist} togglePlaylist={togglePlaylist} />
      <Pad num={6} audioArray={audioArray} playlist={playlist} togglePlaylist={togglePlaylist} />
      <Pad num={7} audioArray={audioArray} playlist={playlist} togglePlaylist={togglePlaylist} />
      <Pad num={8} audioArray={audioArray} playlist={playlist} togglePlaylist={togglePlaylist} />
    </div>
  );
};

export default LoopMachine;