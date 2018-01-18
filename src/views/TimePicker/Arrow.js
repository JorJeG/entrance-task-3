import React from 'react';

const Arrow = props => {
	let rootB = document.getElementById('root');
	if (rootB.clientWidth >= 1280) {
		return (
			<svg width={7} height={12} viewBox="0 0 7 12" {...props}>
				<title>arrow</title>
				<path
					d="M1 1.757L5.243 6 1 10.243"
					stroke="#000"
					strokeWidth={2}
					fill="none"
					fillRule="evenodd"
					strokeLinecap="round"
					strokeOpacity={0.428}
				/>
			</svg>
		)} else {
			return (
			<svg width={9} height={14} viewBox="0 0 9 14">
				<title>arrow</title>
				<g fill="none" fillRule="evenodd">
					<path d="M-6-5h24v24H-6z" />
					<path
						stroke="#000"
						strokeWidth={2}
						preserveAspectRatio="xMinYMin"
						strokeLinecap="round"
						d="M7.657 12.314L2 6.657 7.657 1"
					/>
				</g>
			</svg>)
		}
}

export default Arrow
