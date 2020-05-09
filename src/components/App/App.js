import React, { useState} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

const App = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState("Enter New Name...");

    

    const addTrack = (track) => {        
        if (!playlistTracks.find(pTrack => pTrack.id === track.id)) {
            //Append the current state array with new track. Below method was taken from here - https://stackoverflow.com/questions/58544537/how-to-use-array-state-in-react-function-component
            //Had to use this method rather than using the .push call on the state array. Looks better and more succint too. 
            setPlaylistTracks([...playlistTracks, track]) 
        }        
    }

    const removeTrack = (track) => {        
        let filterTrackList = playlistTracks.filter(pTrack => pTrack.id !== track.id)
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
                    <SearchResults searchResults={searchResults} onAdd={addTrack}/>
                    <Playlist playlistTracks={playlistTracks} 
                              playlistName={playlistName}
                              onRemove={removeTrack}
                              onNameChange={updatePlaylistName}
                              onSave={savePlaylist}/>
                </div>
            </div>
        </div>
    )
}

export default App;