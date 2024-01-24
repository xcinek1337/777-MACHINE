import React, { useEffect, useState } from 'react';

import GamblingAnimation from './GamblingAnimation';

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
	const [credits, setCredits] = useState(1000);
	const [insufficientCredits, setInsufficientCredits] = useState(false);
	const [stake, setStake] = useState(100);

	useEffect(() => {
		if (win) {
			setCredits((prevCredit) => prevCredit + stake * 10);
		}
		if (megaWin) {
			setCredits((prevCredit) => prevCredit + stake * 100000);
		}
	}, [win, megaWin]);

	const renderReels = (numberOfReels) => {
		return (
			<>
				{Array.from({ length: numberOfReels }).map((_, index) => {
					return (
						<React.Fragment key={index}>{<GamblingAnimation randomSymbols={generateRandomSymbols()} />}</React.Fragment>
					);
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
		if (credits >= stake && credits > 0) {
			setInsufficientCredits(false);
			setButtonDisable(true);
			setCredits((prevCredit) => prevCredit - stake);
			setIsSpinning(false);
			isMegaWin(false);
			isWin(false);

			setTimeout(() => {
				spinReels();
			}, 1000);
		} else {
			setInsufficientCredits(true);
		}
	};

	const generateRandomSymbols = () => {
		return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
	};

	const spinReels = () => {
		setIsSpinning(true);

		const results = Array.from({ length: 3 }, () => generateRandomSymbols());
		setSpinResults(results);

		setTimeout(() => {
			console.log(checkNormalWin(results));
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
				<p>CREDITS: {credits}</p>
				{win && <h2>normal win</h2>}
				{megaWin && <h2>JACKOPOT!@#!@#Q!@#</h2>}
				{insufficientCredits && (
					<h1 style={{ color: 'red' }}>NO MONEY NO PLAY / send blik +750 722 712 TO CONTINUE </h1>
				)}
				<button
					onClick={handleSpinClick}
					disabled={buttonDisable}
				>
					Spin
				</button>
				<br />
				<br />
				<button onClick={() => setStake((prevStake) => prevStake + 50)}>+</button>
				<div>
					<p>stake: {stake}</p>
					<button
						style={{ width: '100%', height: '50%' }}
						onClick={() => setStake(credits)}
					>
						max bet
					</button>
				</div>
				<button onClick={() => setStake((prevStake) => prevStake - 50)}>-</button>
			</div>
			<footer>provider by xcinekk1337</footer>
		</>
	);
};

export default SlotMachine;
