import React, {useEffect} from "react";

const NavBar = ({play, toggle, record, toggleR, recording, playRecording}) => { 
  //let playrecord = "";

  //useEffect(() => {
   // playrecord = <button className={'btn navbtn'} >Play Recording</button>;
    
  //}, [record]);
  

  return (
    <div>
      <button className={'btn navbtn'} onClick={toggle}>{play ? "Pause" : "Play"}</button>
      <button className={'btn navbtn'} onClick={()=>{toggle(); toggleR();}}>{record ? "Stop" : "Record"}</button>
      <button className={'btn navbtn'} onClick={()=>playRecording(0)}>Play Recording</button>;

      {//playrecord
      }
    </div>
  );
};

export default NavBar;