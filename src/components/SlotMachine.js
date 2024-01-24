import React, { useEffect, useState } from 'react';
import './style.css';

const SlotMachine = () => {
	const [buttonDisable, setButtonDisable] = useState(false);
	const [isSpin, setIsSpin] = useState(false);
	const [spinResults, setSpinResults] = useState([]);

	const gambling = () => {
		const randomSymbols = generateRandomSymbols();
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
	const spinContent = () => {
		return (
			<>
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
				{gambling()}
			</>
		);
	};
	const spinResult = () => {
		return (
			<>
				{spinResults.map((result, index) => (
					<div
						key={index}
						className='reels'
					>
						{result.map((symbol, symbolIndex) => (
							<div
								key={symbolIndex}
								className='reel'
							>
								{symbol}
							</div>
						))}
					</div>
				))}
			</>
		);
	};

	const prepareSpin = () => {
		setIsSpin(false);
		setTimeout(() => {
			spinReels();
		}, 1000);
	};

	const spinReels = () => {
		setButtonDisable(true);
		setIsSpin(true);

		const stopTime = [100, 200, 300, 400, 500, 1000];

		const results = [];
		for (let i = 0; i < 3; i++) {
			results.push(generateRandomSymbols());
		}
		setSpinResults(results);

		setTimeout(() => {
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
			<div className={isSpin ? 'slot__machine slot__machine--active' : 'slot__machine'}>
				{spinResult()}
				{spinContent()}
			</div>
			<div className='slot__button'>
				<button
					onClick={prepareSpin}
					disabled={buttonDisable}
				>
					Spin
				</button>
			</div>
		</>
	);
};

export default SlotMachine;
