import { typesAction } from '../actions/777machine';

const initialState = {
	startSpin: false,
	machineActive: false,
	isButtonDisable: false,
	spinResult: [],
	normalWin: false,
	megaWin: false,
	credits: 1000,
	stake: 100,
	noFunds: false,
};

const reducers = (state = initialState, action) => {
	switch (action.type) {
		case typesAction.START_SPIN:
			return {
				...state,
				startSpin: action.payload.value,
			};
		case typesAction.SET_MACHINE_ACTIVE:
			return {
				...state,
				machineActive: action.payload.value,
			};
		case typesAction.SET_BTN_DISABLE:
			return {
				...state,
				isButtonDisable: action.payload.value,
			};
		case typesAction.SET_SPIN_RESULT:
			return {
				...state,
				spinResult: action.payload.value,
			};
		case typesAction.SET_NORMAL_WIN:
			return {
				...state,
				normalWin: action.payload.value,
			};
		case typesAction.SET_MEGA_WIN:
			return {
				...state,
				megaWin: action.payload.value,
			};
		case typesAction.SET_NOT_FUNDS:
			return {
				...state,
				noFunds: action.payload.value,
			};
		case typesAction.SET_CREDITS:
			return {
				...state,
				credits: action.payload.value,
			};
		default:
			return state;
	}
};

export default reducers;
