import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStartSpinAction } from '../redux/actions/777machine';

const Gui = () => {
	const dispatch = useDispatch();
	return (
		<div className='slot__button'>
			<p>CREDITS:</p>
			{/* {win && <h2>normal win</h2>} */}
			{/* {megaWin && <h2>JACKOPOT!@#!@#Q!@#</h2>} */}
			{/* {insufficientCredits && <h1 style={{ color: 'red' }}>no avaliable fund </h1>} */}
			<button
				onClick={() => dispatch(setStartSpinAction(true))}
				disabled={false}
			>
				Spin
			</button>
			<br />
			<br />
			{/* <button onClick={() => setStake((prevStake) => prevStake + 50)}>+</button> */}
			<div>
				<p>stake:</p>
				<button
					style={{ width: '100%', height: '50%' }}
					// onClick={() => setStake(credits)}
				>
					max bet
				</button>
			</div>
			{/* <button onClick={() => setStake((prevStake) => prevStake - 50)}>-</button> */}
		</div>
	);
};
export default Gui;
