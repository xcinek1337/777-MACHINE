import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Confetti from 'react-dom-confetti';
import SlotMachine from './SlotMachine';
import Gui from './Gui';
import Screen from './Screen';
// import './2style.css';
import '../styles/_styles.scss'

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
			<header className='header'>
				<button className='header__rules-btn'>ⓘ</button>
				<button className='header__funds-btn' >add funds</button>
			</header>
			<main style={{ position: 'relative' }}>
				<SlotMachine />
				<Screen />
				<Gui />
			</main>
			<footer className='slot__footer'>2077© Provider by xcinek1337</footer>
		</Provider>
	);
};

export default App