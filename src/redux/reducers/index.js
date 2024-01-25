import { typesAction } from '../actions/777machine';

const initialState = {
	isSpin: false,
};

const reducers = (state = initialState, action) => {
	switch (action.type) {
		case typesAction.START_SPIN:
			return {
				...state,
				isSpin: action.payload.value,
			};
		default:
			return state;
	}
};

export default reducers;
