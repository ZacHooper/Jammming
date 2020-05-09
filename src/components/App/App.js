import React, { useState} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

const searchTracks = [
    {
        id: '1',
        name: 'Goodnight',
        artist: 'Nick Murphy',
        album: 'Goodnight - Single'
    },
    {
        id: '2',
        name: 'The Difference - extended',
        artist: 'Flume, Toro y Moi',
        album: 'The Difference (Extended)'
    },
    {
        id: '3',
        name: 'Elixir',
        artist: 'Tourist',
        album: 'Wild'
    }
];

const pTracks = [
    {
        id: '4',
        name: 'Suburbia',
        artist: 'Press Club',
        album: 'Late Teens'
    },
    {
        id: '5',
        name: 'Dove Sei - Original Deep Mix',
        artist: 'Lovebirds',
        album: 'Dove Sei'
    },
    {
        id: '6',
        name: '29 #Strafford APTS',
        artist: 'Bon Iver',
        album: '22, A Million'
    }
];

const App = () => {
    const [searchResults, setSearchResults] = useState(searchTracks);
    const [playlistTracks, setPlaylistTracks] = useState(pTracks);
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
    const savePlaylist = () => {
        //This should create an array of track URI's
        return playlistTracks.map(track => track.id);
    }

    const search = (search) => {
        console.log(search);
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