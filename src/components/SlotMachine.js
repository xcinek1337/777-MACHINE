import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GamblingAnimation from './GamblingAnimation';

import { symbols } from '../utils/winningPatterns';
import { megaWinCombinations } from '../utils/winningPatterns';
import { checkNormalWin, checkMegaWin } from '../utils/gameLogic';
import {
	setStartSpinAction,
	setMachineAvtiveAction,
	setButtonDisableAction,
	setSpinResultAction,
	setNormalWinAction,
	setMegaWinAction,
} from '../redux/actions/777machine';

const SlotMachine = () => {
	const dispatch = useDispatch();
	
	const startSpin = useSelector((state) => state.startSpin);
	const machineActive = useSelector((state) => state.machineActive);
	const result = useSelector((state) => state.spinResult);

	const afterSpin = () => {
		dispatch(setStartSpinAction(false));
		dispatch(setButtonDisableAction(false));
		dispatch(setNormalWinAction(checkNormalWin(result)));
		dispatch(setMegaWinAction(checkMegaWin(result)));
	};



	useEffect(() => {
		if (startSpin) {
			spinReels();
			dispatch(setMachineAvtiveAction(true));
		}
	}, [startSpin]);

	useEffect(() => {
		if (result) {
			setTimeout(() => {
				afterSpin();
			}, 1200);
		}
	}, [result]);

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
		// zabezpieczenie jesli spinResult jest puste - zeby graficznie ilosc reels byla taka sama jak po pierwszym zakreceniu
		if (result.length === 0) {
			mockModel();
		}
		return (
			<>
				{result.map((result, index) => (
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

	// const handleSpinClick = () => {
	// 	if (credits >= stake && credits > 0) {
	// 		spinReels();

			
			// kredyty w GUI DOPIERO ZADECYDUJA CZY PRZEKAZAC TRUE DO REDUXA AHA
	// 		setCredits((prevCredit) => prevCredit - stake);
	// 	}
	// };

	const generateRandomSymbols = () => {
		return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
	};

	const spinReels = () => {
		const results = Array.from({ length: 3 }, () => generateRandomSymbols());
		dispatch(setSpinResultAction(results));

		setTimeout(
			() => {
				dispatch(setMachineAvtiveAction(false));
			},
			400
			// less time == better rolling animation :D
		);
	};

	const mockModel = () => {
		return (
			<>
				{megaWinCombinations[1].map((result, index) => (
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

	return (
		<>
			<div className={`slot__machine ${machineActive ? 'slot__machine--active' : ''}`}>
				{renderResult()}
				{renderReels(12)}
			</div>
		</>
	);
};

export default SlotMachine;
