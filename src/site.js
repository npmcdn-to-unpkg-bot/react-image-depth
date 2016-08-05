import React, { Component } from 'react';

import ImageDepth from './image-depth';

import './site.css';

const usage = `<ImageDepth>
  <img src="path/to/image.jpg" />
<ImageDepth>
`;

class Site extends Component {
  render() {
    return (
			<div className="container">
				<h1>react-image-depth</h1>
				<p>CSS 2D image depth map effect for React.</p>
				<p>View on <a href="https://github.com/henriquea/react-image-depth">GitHub</a></p>
				<h2>Install</h2>
				<p>Run <code>npm i react-image-depth --save</code>.</p>
				<h2>Usage</h2>
				<pre>
					<code>{usage}</code>
				</pre>
				<h2>Demo</h2>
				<ImageDepth>
					<img src="https://drscdn.500px.org/photo/388736/q%3D80_m%3D2000/1c9e8e3f880b12e9f18f6c55cbf5485c" width="100%" alt="" />
				</ImageDepth>
				<p>
					Photo by <a href="https://500px.com/photo/388736/oo-by-besim-mazhiqi">Besim Mazhiqi</a>
				</p>
				<h2>Credits</h2>
				<p>
					Original script by the awesome <a href="http://tympanus.net/codrops/2015/05/28/image-tilt-effect/">Mary Lou</a>.
				</p>
				<h2>Questions</h2>
				<p>
      		Questions, comments or suggestion? <a href="https://github.com/henriquea/react-image-depth/issues/new?title=Question+title">Open an issue</a>.
    		</p>
			</div>
    );
  }
}

export default Site;
