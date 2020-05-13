import React, {useState} from 'react';
import './Track.css';

const playIcon = (
    <svg className="Play-icon-SVG" viewBox="0 0 110 110">
        <defs>
        <path d="M105.5 55.5C105.5 83.1 83.1 105.5 55.5 105.5C27.9 105.5 5.5 83.1 5.5 55.5C5.5 27.9 27.9 5.5 55.5 5.5C83.1 5.5 105.5 27.9 105.5 55.5Z" id="gF6y0cHtW"></path>
            <path d="M61.76 66.58L36.95 78.16L36.95 55L36.95 31.84L61.76 43.42L86.57 55L61.76 66.58Z" id="a2TpNWuNGp"></path>
        </defs>
        <g className="Play-icon-container">
            <use className="Play-icon" xlinkHref="#gF6y0cHtW" opacity="1" fillOpacity="0" strokeWidth="5" strokeOpacity="1"></use>
            <use className="Play-icon" xlinkHref="#a2TpNWuNGp" opacity="1" fillOpacity="1"></use>
        </g>
    </svg>
)

const pauseIcon = (
    <svg className="Play-icon-SVG" viewBox="0 0 110 110">
        <defs>
            <path d="M41.83 78.66L41.83 32.34" id="h6RZaAMwf"></path>
            <path d="M105.5 55.5C105.5 83.1 83.1 105.5 55.5 105.5C27.9 105.5 5.5 83.1 5.5 55.5C5.5 27.9 27.9 5.5 55.5 5.5C83.1 5.5 105.5 27.9 105.5 55.5Z" id="gF6y0cHtW"></path>
            <path d="M69.48 78.66L69.48 32.34" id="b5PIp0QjQT"></path>
        </defs>
        <g className="Play-icon-container">
            <use className="Play-icon" xlinkHref="#h6RZaAMwf" opacity="1" strokeWidth="10" strokeOpacity="1"></use>    
            <use className="Play-icon" xlinkHref="#b5PIp0QjQT" opacity="1" strokeWidth="10" strokeOpacity="1"></use>
            <use className="Play-icon" xlinkHref="#gF6y0cHtW" opacity="1" strokeWidth="5" strokeOpacity="1" fillOpacity="0"></use>
        </g>
    </svg>
)

const Track = (props) => {
    const [playPause, setPlayPause] = useState(true);

    const handlePlayOnClick = () => {
        playPause ? setPlayPause(false) : setPlayPause(true);
        props.onPlayPause(props.track);
    }

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
    
    const renderPlayPause = (playPause) => {
    return (
            <div className="Play-pause-button" onClick={handlePlayOnClick}>
                <audio id={`Track-audio_${props.track.id}`} src={props.track.preview}></audio>
                {props.currentPlayingTrack === props.track.id ? pauseIcon : playIcon}
            </div>)
    }

    return (
        <div className="Track">
            {renderPlayPause(playPause)}
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {renderAction(props.isRemoval)}
        </div>
    )
}

export default Track;