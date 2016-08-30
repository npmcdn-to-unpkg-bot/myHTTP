require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';
//get Json file
let imageDataArr = require('../data/imagedatas.json');

// fileName -> url path
imageDataArr = (function getImageUrl (imageDataArr){
	for (var i=0; i<imageDataArr.length; i++){
		var imageData = imageDataArr[i];
		imageData.imageURL = require('../images' + imageData.fileName);
		imageDataArr[i] = imageData
	}
	return imageDataArr;
})(imageDataArr)

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
      		<section className="img-sec">
      		</section>
      		<nav className="controller-nav">
      		</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
