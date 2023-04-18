import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
    if (imageUrl === '') {
        return (
            <div className="center ma2">
                <div className="absolute">
                    <img id="face-detection" alt="" src={imageUrl} style={{width:"500px", height:'auto'}} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="center ma2">
                <div className="absolute">
                    <img id="face-detection" alt="" src={imageUrl} style={{width:"500px", height:'auto'}} />
                    <div className="bounding-box" style={{top: box.top, left: box.left, right: box.right, bottom: box.bottom}}></div>
                </div>
            </div>
        );
    }
}

export default FaceRecognition;