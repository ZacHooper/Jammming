import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

const TrackList = (props) => {

    return (
        <div className="TrackList">
            {
                props.tracks.map(track => {
                    return <Track key={`Track_${track.id}`} 
                                  track={track} 
                                  onAdd={props.onAdd} 
                                  onRemove={props.onRemove} 
                                  isRemoval={props.isRemoval} 
                                  onPlayPause={props.onPlayPause}
                                  currentPlayingTrack={props.currentPlayingTrack}/>
                })
            }
        </div>
    )
}

export default TrackList;