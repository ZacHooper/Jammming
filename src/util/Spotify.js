import { CLIENT_ID } from '../secrets/secrets';

let accessToken;
const redirectUri =  'http://localhost:3000/' //'http://jammming-zh.surge.shn/'
const scope = 'playlist-modify-public playlist-modify-private'

const Spotify = {
    async getAccessToken () {
        //Check to see if the access token is already set
        if (accessToken) {
            return accessToken;
        } 

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken='', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return accessToken
        }

        let redirectUser = 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID 
                     + '&response_type=token'
                     + '&redirect_uri=' + encodeURIComponent(redirectUri)
                     + '&scope=' + scope

        window.location = redirectUser;
    },

    async search(search) {
        const accessToken = await Spotify.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/search?q=${search}&type=track&market=AU&limit=10`;
        try {
            const res = await fetch(endpoint, {headers: {Authorization: `Bearer ${accessToken}`}});
            if (res.ok) {
                const json = await res.json();
                const tracks = json.tracks.items;
                return tracks.map(track => {
                    const artistNames = track.artists.map(artist => artist.name)
                    return {
                        id: track.id,
                        name: track.name,
                        artist: artistNames.join(', '),
                        album: track.album.name,
                        uri: track.uri
                    }
                });
            }
            throw new Error('Unable to process search');
        } catch (error) {
            console.log(error);
               
        }
    },

    async savePlaylist(trackUris, playlistName) {
        
        if (!trackUris && !playlistName){
            return;
        }
        const accessToken = await Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;
        let playlistId;

        //get user id if it wasn't already supplied
        try {
            const res = await fetch('https://api.spotify.com/v1/me', {headers: headers})                
            if (res.ok) {
                const user = await res.json();
                userId = user.id
            }
            else {
                throw new Error('Request to fetch user details failed.');
            }
        } catch (error) {
            console.log(error)
        }

        //Create the new playlist
        let endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
        console.log(playlistName);
        
        try {
            const res = await fetch(endpoint, {
                headers: headers, 
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            });
            if (res.ok) {
                const playlist = await res.json();
                playlistId = playlist.id;
            } 
            else {
                throw new Error('Post to create new playlist failed');
            }
        } catch (error) {
            console.log(error);
        }

        //add the tracks to the playlist
        endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        try {
            const res = await fetch(endpoint, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({uris: trackUris})
            });
            if (res.ok) {
                const snapshot = await res.json();
                return snapshot.snapshot_id;
            }
            else {
                throw new Error(`Post to add tracks to playlist with ID: ${playlistId} failed.`);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default Spotify;