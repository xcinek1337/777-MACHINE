import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setStartSpinAction,
	setButtonDisableAction,
	setMegaWinAction,
	setNormalWinAction,
	setNoFundsAction,
	setCreditsAction,
	setStakeAction,
} from '../redux/actions/777machine';

const Gui = () => {
	const dispatch = useDispatch();

	const buttonDisable = useSelector((state) => state.isButtonDisable);
	const credits = useSelector((state) => state.credits);
	const stake = useSelector((state) => state.stake);
	const updatedBalance = credits - stake;

	const clearActionsAndSpinAgain = () => {
		dispatch(setButtonDisableAction(true));
		dispatch(setStartSpinAction(true));
		dispatch(setMegaWinAction(false));
		dispatch(setNormalWinAction(false));
		dispatch(setNoFundsAction(false));
		dispatch(setCreditsAction(updatedBalance));
	};

	const handleSpin = () => {
		if (credits >= stake && credits > 0) {
			clearActionsAndSpinAgain();
		} else {
			dispatch(setNoFundsAction(true));
		}
	};

	const handleStakeChange = (amount) => {
		const updatedStake = stake + amount;
		if (updatedStake >= 1) {
			dispatch(setStakeAction(updatedStake));
		}
	};
	return (
		<div className='slot__gui gui'>
			<div className='gui__stake'>
				<button
					onClick={() => handleStakeChange(50)}
					className='gui__stake--up'
				>
					+
				</button>
				<span>STAKE: {stake}</span>
				<button
					onClick={() => handleStakeChange(-50)}	
					className='gui__stake--down'
				>
					-
				</button>
			</div>
			<button
				className='gui__spin-btn'
				onClick={handleSpin}
				disabled={buttonDisable}
			>
				Spin
			</button>
			<span>CREDITS {credits}</span>
		</div>
	);
};
export default Gui;
