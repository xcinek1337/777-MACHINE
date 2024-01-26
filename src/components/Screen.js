import React from 'react';

const Screen = () => {
	return (
		<div className='slot__screen screen'>
			{false && <p className='screen__win'>one line win</p>}
			{true && <h2 className='screen__jackpot'>JACKPOT!!!</h2>}
			<img
				className='screen__border'
				src={require('../img/screenCutted.png')}
				alt=''
			/>
		</div>
	);
};
export default Screen;
