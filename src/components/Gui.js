import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStartSpinAction } from '../redux/actions/777machine';

const Gui = () => {
	const dispatch = useDispatch();
	return (
		<div className='slot__gui gui'>
			<div className='gui__stake'>
				<button className='gui__stake--up'>+</button>
				<span>STAKE: 10</span>
				<button className='gui__stake--down'>-</button>
			</div>
			<button
				className='gui__spin-btn'
				onClick={() => dispatch(setStartSpinAction(true))}
			>
				Spin
			</button>
			<span>CREDITS 1000</span>

			{/* <button onClick={() => setStake((prevStake) => prevStake + 50)}>+</button> */}
			{/* <div>
				<p>stake:</p>
				<button
					style={{ width: '100%', height: '50%' }}
					// onClick={() => setStake(credits)}
				>
					max bet
				</button>
			</div> */}
			{/* <button onClick={() => setStake((prevStake) => prevStake - 50)}>-</button> */}
		</div>
	);
};
export default Gui;
