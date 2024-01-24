import React, { useEffect, useState } from 'react';
import _isEqual from 'lodash/isEqual';
import { symbols, winingCombinations, megaWinCombinations } from '../utils/winningPatterns';
import './style.css';

const SlotMachine = () => {
	const [buttonDisable, setButtonDisable] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const [mount, isMount] = useState(true);
	const [win, isWin] = useState(false);
	const [megaWin, isMegaWin] = useState(false);
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
	const spinContent = (numberOfReels) => {
		return (
			<>
				{Array.from({ length: numberOfReels }).map((_, index) => {
					return <React.Fragment key={index}>{gambling()}</React.Fragment>;
				})}
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
		setIsSpinning(false);
		isMegaWin(false);
		isWin(false);
		setTimeout(() => {
			spinReels();
		}, 1000);
	};

	const spinReels = () => {
		setButtonDisable(true);
		setIsSpinning(true);

		const stopTime = 1000;

		const results = [];
		for (let i = 0; i < 3; i++) {
			results.push(generateRandomSymbols());
		}
		setSpinResults(results);

		setTimeout(() => {
			const normalWin = winingCombinations.some((winningCombo) => {
				return results.some((resultRow) => {
					return _isEqual(resultRow, winningCombo);
				});
			});

			const megaWin = megaWinCombinations.some((winningCombo) => {
				return _isEqual(results, winningCombo);
			});

			isWin(normalWin);
			isMegaWin(megaWin);

			setButtonDisable(false);
			isMount(false)
		}, stopTime);
	};

	const generateRandomSymbols = () => {
		return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
	};

	return (
		<>
			<div className='slot__background'></div>
			<div className='slot__screen'></div>
			<div className={isSpinning ? 'slot__machine slot__machine--active' : 'slot__machine'}>
				{spinResult()}
				{mount ? spinContent(12) : spinContent(9)}
			</div>
			<div className='slot__button'>
				<button
					onClick={prepareSpin}
					disabled={buttonDisable}
				>
					Spin
				</button>
				{win && <h2>u won!!!!</h2>}
				{megaWin && <h2>JACKOPOT!@#!@#Q!@#</h2>}
			</div>
		</>
	);
};

export default SlotMachine;
