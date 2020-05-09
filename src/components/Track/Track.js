import React from 'react';
import './Track.css';

const Track = (props) => {
    const handleOnClick = () => {
        if (!props.isRemoval) {
            props.onAdd(props.track);
        } 
        else {
            props.onRemove(props.track);
        }
    }
    
    const renderAction = (isRemoval) => {
        return <button className="Track-action" onClick={handleOnClick}>{!isRemoval ? '+' : '-'}</button>
    }        

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {renderAction(props.isRemoval)}
        </div>
    )
}

export default Track;