import React from 'react';
import { useSelector } from 'react-redux';

const ScreenFrame = () => {
	const normalWin = useSelector((state) => state.normalWin);
	const megaWin = useSelector((state) => state.megaWin);
	const noFunds = useSelector((state) => state.noFunds);

	return (
		<div className='slot__screen screen'>
			{noFunds && <h2 className='screen__msg'>no avaliable funds</h2>}
			{normalWin && <p className='screen__win'>line win</p>}
			{megaWin && <h2 className='screen__jackpot'>JACKPOT!!!</h2>}
			<img
				className='screen__border'
				src={require('../img/screenCutted.png')}
				alt=''
			/>
		</div>
	);
};
export default ScreenFrame;
