import React, { useState } from 'react';
import './style.css'



const SlotMachine = () => {
	const [reels, setReels] = useState(['', '', '']);
	const [spinning, setSpinning] = useState(false);

	const spinReels = () => {
		setSpinning(true);

		// Symulacja losowego zatrzymywania bębnów po określonym czasie
		const stopTime = [1000, 2000, 3000]; // Czas zatrzymania dla każdego bębna

		setTimeout(() => {
			setReels(generateRandomSymbols());
		}, stopTime[0]);

		setTimeout(() => {
			setReels(generateRandomSymbols());
		}, stopTime[1]);

		setTimeout(() => {
			setReels(generateRandomSymbols());
			setSpinning(false);
		}, stopTime[2]);
	};

	const generateRandomSymbols = () => {
		const symbols = ['🍒', '🍇', '🍊', '🔔', '💎']; // Dodaj swoje symbole
		return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
	};

	return (
		<div className='slot-machine'>
			<div className='reels'>
				{reels.map((symbol, index) => (
					<div
						key={index}
						className='reel'
					>
						{symbol}
					</div>
				))}
			</div>
			<div className='reels'>
				{reels.map((symbol, index) => (
					<div
						key={index}
						className='reel'
					>
						{symbol}
					</div>
				))}
			</div>
			<button
				onClick={spinReels}
				disabled={spinning}
			>
				Spin
			</button>
		</div>
	);
};

export default SlotMachine;
