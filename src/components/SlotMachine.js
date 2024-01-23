import React, { useState } from 'react';
import './style.css';

const SlotMachine = () => {
	const [buttonDisable, setButtonDisable] = useState(false);

	const gambling = () => {
		return (
			<div className='reels'>
				{generateRandomSymbols().map((symbol, index) => (
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
	const spinReels = () => {
		setButtonDisable(true);

		const stopTime = [100, 200, 300, 400, 500, 3000]; 

		setTimeout(() => {
			generateRandomSymbols();
		}, stopTime[0]);
		setTimeout(() => {
			console.log(`hi`);
			generateRandomSymbols();
		}, stopTime[1]);
		setTimeout(() => {
			generateRandomSymbols();
		}, stopTime[2]);

		setTimeout(() => {
			generateRandomSymbols();
		}, stopTime[3]);

		setTimeout(() => {
			generateRandomSymbols();
			setButtonDisable(false);
		}, stopTime[5]);
	};

	const generateRandomSymbols = () => {
		const symbols = ['🍒', '🍇', '🍊', '🔔', '💎'];
		return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
	};

	return (
		<>
			<div className='slot__background'></div>
			<div className='slot__screen'></div>
			<div className={buttonDisable ? 'slot__machine slot__machine--active' : 'slot__machine'}>
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
			</div>
			<div className='slot__button'>
				<button
					onClick={spinReels}
					disabled={buttonDisable}
				>
					Spin
				</button>
			</div>
		</>
	);
};

export default SlotMachine;
