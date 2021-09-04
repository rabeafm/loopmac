import React, { Fragment } from "react";

const Pad = ({ num, name, playlist, togglePlaylist}) => {
    return (
      <Fragment>
       <button className={playlist[num] ? 'btn btnclk' : 'btn'} onClick={()=>{togglePlaylist(num,!playlist[num])}}>{playlist[num] ? <img src="https://img.icons8.com/material-outlined/48/E8A87C/pause--v1.png" alt="pause"/> : <img src="https://img.icons8.com/material-outlined/48/41b3a3/play--v1.png"  alt="play"/>}<h3>{name}</h3></button>
      </Fragment>
    );
  };

  export default Pad;



