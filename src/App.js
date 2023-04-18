import React, {Component, useCallback} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg'

// Setting up Clarify
const clarifyReturnRequestOptions = (imageURL) => {
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": 'a56gt81kb0',
        "app_id": 'smartbrain'
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": imageURL
                }
            }
        }
    ]
  });
  
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + '3f3bbbfb451d4d91bf516dd6088599a4'
    },
    body: raw
  };

  return requestOptions;
};

// App Component Definition
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation = (clarifaiResp) => {
    let {top_row, left_col, bottom_row, right_col} = clarifaiResp.outputs[0].data.regions[0].region_info.bounding_box;
    let imgElem = document.getElementById("face-detection");
    let imgWidth = imgElem.width;
    let imgHeight = imgElem.height;
    this.setState({box: {
      top: top_row * imgHeight,
      left: left_col * imgWidth,
      right: imgWidth - right_col*imgWidth,
      bottom: imgHeight - bottom_row*imgHeight,
    }});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    let MODEL_ID = 'face-detection';
    let REQUEST_OPTIONS = clarifyReturnRequestOptions(this.state.input);
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", REQUEST_OPTIONS)
        .then(response => response.json())
        .then(result => this.calculateFaceLocation(result))
        .catch(error => console.log('error', error));
  }


  render() {
    let {input, imageUrl, box} = this.state;
    return (
      <div className='App'>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={imageUrl} box={box}/>
        <ParticlesBg color="#ffffff" num={200} type="cobweb" bg={true} />
      </div>
    );
  }
}


export default App;
