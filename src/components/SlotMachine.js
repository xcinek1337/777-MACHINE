import React, { useEffect, useState } from 'react';

import Gambling from './Gambling';

import { symbols } from '../utils/winningPatterns';
import { checkNormalWin, checkMegaWin } from '../utils/gameLogic';
import './style.css';

const SlotMachine = () => {
	const [buttonDisable, setButtonDisable] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const [mount, isMount] = useState(true);
	const [win, isWin] = useState(false);
	const [megaWin, isMegaWin] = useState(false);
	const [spinResults, setSpinResults] = useState([]);

	const renderReels = (numberOfReels) => {
		return (
			<>
				{Array.from({ length: numberOfReels }).map((_, index) => {
					return <React.Fragment key={index}>{<Gambling randomSymbols={generateRandomSymbols()} />}</React.Fragment>;
				})}
			</>
		);
	};
	const renderResult = () => {
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

	const handleSpinClick = () => {
		setIsSpinning(false);
		isMegaWin(false);
		isWin(false);

		setTimeout(() => {
			spinReels();
		}, 1000);
	};

	const generateRandomSymbols = () => {
		return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
	};
	
	const spinReels = () => {
		setButtonDisable(true);
		setIsSpinning(true);

		const results = Array.from({ length: 3 }, () => generateRandomSymbols());
		setSpinResults(results);
		console.log(results);
		setTimeout(() => {
			isWin(checkNormalWin(results));
			isMegaWin(checkMegaWin(results));

			setButtonDisable(false);
			isMount(false);
		}, 1000);
	};

	return (
		<>
			<div className='slot__background'></div>
			<div className='slot__screen'></div>
			<div className={`slot__machine ${isSpinning ? 'slot__machine--active' : ''}`}>
				{renderResult()}
				{mount ? renderReels(12) : renderReels(9)}
			</div>
			<div className='slot__button'>
				<button
					onClick={handleSpinClick}
					disabled={buttonDisable}
				>
					Spin
				</button>
				{win && <h2>normal win</h2>}
				{megaWin && <h2>JACKOPOT!@#!@#Q!@#</h2>}
			</div>
		</>
	);
};

export default SlotMachine;
