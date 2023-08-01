import React from 'react';
import StreamedianPlayer from './StreamedianPlayer';
// import './index.css';

const RTSPPlayer = ({rtspUrl, id}) => (
	<div>
		<StreamedianPlayer id={id}>
			<source src={rtspUrl} type="application/x-rtsp" />
		</StreamedianPlayer>
	</div>
);

export default RTSPPlayer;
