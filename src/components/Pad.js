import React, { useEffect, Fragment } from "react";

const Pad = ({ num, audioArray, playlist, togglePlaylist}) => {
  useEffect(() => {
  }, [playlist]);
    return (
      <Fragment>
       <button className={playlist[num] ? 'btn btnclk' : 'btn'} onClick={()=>{togglePlaylist(num,!playlist[num])}}>{playlist[num] ? "Pause " : "Play "}{audioArray[num].name}</button>
      </Fragment>
    );
  };

  export default Pad;



