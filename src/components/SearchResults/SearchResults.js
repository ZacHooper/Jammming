import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList'

const SearchResults = () => {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList />
        </div>
    );
}

export default SearchResults;