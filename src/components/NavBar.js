import React from "react";

const NavBar = ({play, toggle, record, toggleR, recorded, playRecording}) => { 
  return (
    <div>
      <button className={'navbtn'} onClick={toggle}>{play ? "Pause" : "Play"}</button>
      <button className={'navbtn'} onClick={()=>{toggle(); toggleR();}}>{record ? "Stop" : "Record"}</button>
      {recorded ? <button className={'navbtn'} onClick={()=>playRecording(0)}>Play Rec</button> : ""}
    </div>
  );
};

export default NavBar;