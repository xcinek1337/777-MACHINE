import React from 'react';

const GamblingAnimation = ({ randomSymbols }) => {
	return (
		<div className='reels'>
			{randomSymbols.map((symbol, index) => (
				<div
					key={index}
					className='reel'
				>
					{symbol}
				</div>
			))}
		</div>
	);
};

export default GamblingAnimation;
