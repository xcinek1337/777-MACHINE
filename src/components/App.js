import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Confetti from 'react-dom-confetti';
import SlotMachine from './SlotMachine';
import Gui from './Gui';

import './2style.css';

import reducers from '../redux/reducers';
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
	const config = {
		angle: 90,
		spread: 360,
		startVelocity: 40,
		elementCount: 70,
		decay: 0.95,
	};
	return (
		<Provider store={store}>
			<Confetti
				active={false}
				config={config}
			/>
			<header className='logo'>
				<img
					src={require('../img/jackpot.png')}
					alt=''
				/>
			</header>
			<main style={{ position: 'relative' }}>
				<SlotMachine />
				<Gui />
			</main>
		</Provider>
	);
};

export default App