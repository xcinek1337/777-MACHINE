import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { megaWinCombinations } from '../utils/winningPatterns';
import { checkNormalWin, checkMegaWin, generateRandomSymbols } from '../utils/gameLogic';
import {
	setStartSpinAction,
	setMachineAvtiveAction,
	setButtonDisableAction,
	setSpinResultAction,
	setNormalWinAction,
	setMegaWinAction,
	setCreditsAction,
} from '../redux/actions/777machine';

const SlotMachine = () => {
	const dispatch = useDispatch();

	const startSpin = useSelector((state) => state.startSpin);
	const machineActive = useSelector((state) => state.machineActive);
	const result = useSelector((state) => state.spinResult);
	const credits = useSelector((state) => state.credits);
	const stake = useSelector((state) => state.stake);

	const normalWin = () => {
		const normWin = stake * 10;
		const result = credits + normWin;
		return result;
	};
	const megaWin = () => {
		const jackopot = stake * 100000;
		const result = credits + jackopot;
		return result;
	};

	const afterGetResult = () => {
		// setTimoute 1.2s because spining animation
		setTimeout(() => {
			dispatch(setStartSpinAction(false));
			dispatch(setButtonDisableAction(false));
			dispatch(setNormalWinAction(checkNormalWin(result)));
			dispatch(setMegaWinAction(checkMegaWin(result)));

			if (checkNormalWin(result)) {
				dispatch(setCreditsAction(normalWin()));
			}
			if (checkMegaWin(result)) {
				dispatch(setCreditsAction(megaWin()));
			}
		}, 1200);
	};

	useEffect(() => {
		if (startSpin) {
			spinAction();
			dispatch(setMachineAvtiveAction(true));
		}
	}, [startSpin]);

	useEffect(() => {
		if (result) afterGetResult();
	}, [result]);

	const spinAction = () => {
		const results = Array.from({ length: 3 }, () => generateRandomSymbols());
		dispatch(setSpinResultAction(results));

		setTimeout(() => {
			dispatch(setMachineAvtiveAction(false));
		}, 400);
	};

	const renderReelsArray = (arrayData) => {
		return (
			<>
				{arrayData.map((result, index) => (
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

	const mockModel = () => renderReelsArray(megaWinCombinations[1]);

	const renderResult = () => {
		if (result.length === 0) {
			// mocked 3 reels, cause when app is inicliazie, result is empty - so first spin can look not good animated
			mockModel();
		}
		return renderReelsArray(result);
	};

	const renderReels = (numberOfReels) => {
		return (
			<>
				{Array.from({ length: numberOfReels }).map((_, index) => {
					return (
						<div
							key={index}
							className='reels'
						>
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
				})}
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
