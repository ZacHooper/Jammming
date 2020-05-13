import React, { useState} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

const App = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState("Enter New Name...");
    const [currentPlayingTrack, setcurrentPlayingTrack] = useState("");

    const playTrack = (track) => {
        //if nothing is playing, play the track
        if (currentPlayingTrack === "") {
            const audioPlayer = document.getElementById(`Track-audio_${track.id}`);
            setcurrentPlayingTrack(track.id)
            audioPlayer.play()
            return;
        }

        //if something is playing and a different track is trying to play, pause the first track then play the second
        if (`Track-audio_${currentPlayingTrack}` !== `Track-audio_${track.id}`) {
            const oldAudioPlayer = document.getElementById(`Track-audio_${currentPlayingTrack}`);
            const newAudioPlayer = document.getElementById(`Track-audio_${track.id}`);
            oldAudioPlayer.pause();
            newAudioPlayer.play();
            setcurrentPlayingTrack(track.id);
            return;
        }

        //if something is playing already pause it
        if (`Track-audio_${currentPlayingTrack}` === `Track-audio_${track.id}`) {
            const audioPlayer = document.getElementById(`Track-audio_${currentPlayingTrack}`);
            audioPlayer.pause();
            setcurrentPlayingTrack("")
            return;
        }
    }

    const addTrack = (track) => {        
        if (!playlistTracks.find(pTrack => pTrack.id === track.id)) {
            //Append the current state array with new track. Below method was taken from here - https://stackoverflow.com/questions/58544537/how-to-use-array-state-in-react-function-component
            //Had to use this method rather than using the .push call on the state array. Looks better and more succint too. 
            let filterTrackList = searchResults.filter(pTrack => pTrack.id !== track.id);
            setPlaylistTracks([...playlistTracks, track]);
            setSearchResults(filterTrackList);
        }        
    }

    const removeTrack = (track) => {        
        let filterTrackList = playlistTracks.filter(pTrack => pTrack.id !== track.id)
        setSearchResults([...searchResults, track]);
        setPlaylistTracks(filterTrackList);
    }
    
    const updatePlaylistName = (name) => {
        setPlaylistName(name);
    }

    //beginning of save playlist functionanilty
    const savePlaylist = async () => {
        const trackUris = playlistTracks.map(track => track.uri);
        const snapshotId = await Spotify.savePlaylist(trackUris, playlistName);
        if (snapshotId) {
            console.log(snapshotId);
            setPlaylistName("Enter New Name...");
            setPlaylistTracks([]);
        }
        else {
            console.log("Playlist not saved");
        }
    }

    const search = async (search) => {        
        let results = await Spotify.search(search);
        setSearchResults(results);
    }

    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onSearch={search}/>
                <div className="App-playlist">
                    <SearchResults searchResults={searchResults} onAdd={addTrack} onPlayPause={playTrack} currentPlayingTrack={currentPlayingTrack}/>
                    <Playlist playlistTracks={playlistTracks} 
                              playlistName={playlistName}
                              onRemove={removeTrack}
                              onNameChange={updatePlaylistName}
                              onSave={savePlaylist}
                              onPlayPause={playTrack}
                              currentPlayingTrack={currentPlayingTrack}/>
                </div>
            </div>
        </div>
    )
}

export default App;