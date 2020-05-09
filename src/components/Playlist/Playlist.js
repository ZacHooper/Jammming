import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

const Playlist = (props) => {
    return (
        <div className="Playlist">
            <input defaultValue={props.playlistName}/>
            <TrackList tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval={true}/>
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;