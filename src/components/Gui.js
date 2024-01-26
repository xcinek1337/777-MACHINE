import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setStartSpinAction,
	setButtonDisableAction,
	setMegaWinAction,
	setNormalWinAction,
} from '../redux/actions/777machine';

const Gui = () => {
	const dispatch = useDispatch();

	const buttonDisable = useSelector((state) => state.isButtonDisable);

	// czy to jest juz zbyt przesadzone ze robie taka funckje ktora pozniej odpalam tylko w handleSpin?
	const beforeSpinExecute = () => {
		dispatch(setButtonDisableAction(true));
		dispatch(setStartSpinAction(true));
		dispatch(setMegaWinAction(false));
		dispatch(setNormalWinAction(false));
	};

	const handleSpin = () => {
		beforeSpinExecute();
	};

	return (
		<div className='slot__gui gui'>
			<div className='gui__stake'>
				<button className='gui__stake--up'>+</button>
				<span>STAKE: 10</span>
				<button className='gui__stake--down'>-</button>
			</div>
			<button
				className='gui__spin-btn'
				onClick={handleSpin}
				disabled={buttonDisable}
			>
				Spin
			</button>
			<span>CREDITS 1000</span>
		</div>
	);
};
export default Gui;
