import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GamblingAnimation from './GamblingAnimation';

import { symbols } from '../utils/winningPatterns';
import { megaWinCombinations } from '../utils/winningPatterns';
import { checkNormalWin, checkMegaWin } from '../utils/gameLogic';
import { setStartSpinAction } from '../redux/actions/777machine';

const SlotMachine = () => {
	const dispatch = useDispatch();
	const isSpin = useSelector((state) => state.isSpin);

	const [buttonDisable, setButtonDisable] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const [win, isWin] = useState(false);
	const [megaWin, isMegaWin] = useState(false);
	const [spinResults, setSpinResults] = useState([]);
	const [credits, setCredits] = useState(1000);
	const [insufficientCredits, setInsufficientCredits] = useState(false);
	const [stake, setStake] = useState(100);

	useEffect(() => {
		handleSpinClick();
	}, [isSpin]);

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
		// zabezpieczenie jesli spinResult jest puste - zeby graficznie ilosc reels byla taka sama jak po pierwszym zakreceniu
		if (spinResults.length === 0) {
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
		}
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
			spinReels();

			// to mozna w funkcje opakowac tez
			setIsSpinning(true);
			setButtonDisable(true);
			setCredits((prevCredit) => prevCredit - stake);
			setInsufficientCredits(false);
			isMegaWin(false);
			isWin(false);
		} else {
			setInsufficientCredits(true);
		}
	};

	const generateRandomSymbols = () => {
		return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
	};

	const spinReels = () => {
		const results = Array.from({ length: 3 }, () => generateRandomSymbols());
		setSpinResults(results);

		setTimeout(() => {
			dispatch(setStartSpinAction(false));
			setIsSpinning(false);
			//zabieram clase - krecimy reelsami a za sekunde dojedzie do stanu renderowania wynikow krecenia - wiec potrzebujemy drugi setTimeout ktory jest pozniej

			setTimeout(() => {
				// tu mozna zrobic funkcje afterEndedSpin - i wrzucic to co ponizej - byloby czytelniej :)
				// wiem ze callback HELL
				console.log(checkNormalWin(results));
				isWin(checkNormalWin(results));
				isMegaWin(checkMegaWin(results));
				setButtonDisable(false);
			}, 1000);
		}, 1000);
	};

	return (
		<>
			<div className={`slot__machine ${isSpinning ? 'slot__machine--active' : ''}`}>
				{renderResult()}
				{renderReels(12)}
			</div>
		</>
	);
};

export default SlotMachine;
