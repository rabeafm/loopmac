import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Pad from "./Pad";
import './LoopMachine.css';

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
  // setting up audio array && initializing playlist
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
  const [playlist,setPlaylist] = useState ([false, false, false, false, false, false, false, false, false]);
  
  // play state & toggling play
  const [play, setPlay] = useState(false);
  const toggle = () => setPlay(!play);

  // Interval counter
  const [times, setTimes] = useState(0);

  // record state & recording array & toggling record
  const [record, setRecord] = useState(false);
  const [recording, setRecording] = useState([]);
  const toggleR = () => setRecord(!record);
  
  // is there a recording state & is it playing
  const [recorded, setRecorded] = useState(false);
  const [playing, setPlaying] = useState(false);
  
  /**********************************************************
   * A function that recieves the number of a beat updates  *
   * it in the playlist and if needs to be muted mutes it.  *
   * @param num number of beat                              *
   * @param val on/of based on true or false                *
   *********************************************************/
  const togglePlaylist = (num,val) => {
    let arr = JSON.parse(JSON.stringify(playlist)); //enables deep clone of the array
    arr[num] = val;
    setPlaylist(arr);
    if(val===false)
      audioArray[num].audio.pause();
  }

   /*********************************************************
   * follows up on the state of play and times (intervals)  *
   * plays music based on the playlist in this interval     *
   * after the 8 seconds interval is over rerenders due to  *
   * change times state.                                    *
   **********************************************************/
  useEffect(() => {
    if(play){
      if (record){
        setRecorded(true);
        setRecording( [ ...recording, JSON.parse(JSON.stringify(playlist)) ]);      // for followup on recording console.log(times); console.log(recording);
      }
      audioArray.forEach(item => {
        if(playlist[item.num]) {item.audio.currentTime = 0; item.audio.play();}
      });
      setTimeout(()=>setTimes(times+1),8000);
    } else {
      audioArray.forEach(item => item.audio.pause());
      setPlaylist([false, false, false, false, false, false, false, false, false]); // init playlist & the buttons
    }// prevents warning on unfollowed up states
     // eslint-disable-next-line
    }, [play,times]
  );
  
  /**********************************************************
   * A function that recieves the number of an interval and *
   * plays relevant playlist in that interval. calls self   *
   * with next interval.                                    *
   * @param num number of interval                          *
   *********************************************************/
  const playRecording = (num) => {
    // if first interval checks its not already playing
    if((num!==0) || (num===0 && playing===false)) {
      setPlaylist(recording[num]);    // sets playlist so the buttons would change
      setPlaying(true);               //prevents playing twice simultaniously
      audioArray.forEach(item => {
        if(recording[num][item.num]) {item.audio.currentTime = 0; item.audio.play();
        }
      });
      setTimeout(()=>{
        if(recording.length>num+1)
          playRecording(num+1); //calls next playlist of next interval
        else {
          setPlaying(false);    // finishes playing and init playlist & the buttons
          setPlaylist([false, false, false, false, false, false, false, false, false]);
        }
      },8000);
    }
  }

  return (
    <div className='loopmachine'>
      <div className='desc'>
      <h1>Welcome to The Loop Machine </h1>
      <p>
        This machine imitates a loop machine, a machine that allows you to combine different sounds. This machine is based on 8 seconds intervals,
        allowing you to add sounds at the beginning of every interval. Choose the tunes you wish to play then click on play, then you can deselect
        them to mute them or select new ones to add (which will be added when the current interval has ended).
      </p>
      <p>
        If you wish to record a session choose the beats you wish to start with before starting the recording, if unselected you will begin the
        recording with a silent gap of 8 seconds, afterwards the selected sounds are added. unselecting a sound before the end of the interval 
        will cause it not to be recorded.
      </p>
      </div>
      
      <NavBar play={play} toggle={toggle} record={record} toggleR={toggleR} recorded={recorded} playRecording={playRecording}/>
      <div className='pads'>
      {audioArray.map((audio) =>     
               <Pad key={audio.num} num={audio.num} name={audio.name} playlist={playlist} togglePlaylist={togglePlaylist} />
        )}
      </div>
    </div>
  );
};

export default LoopMachine;