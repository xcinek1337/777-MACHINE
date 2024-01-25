export const typesAction = {
	START_SPIN: 'setSpinStart',
};

export const setStartSpinAction = (value) => {
	return {
		type: typesAction.START_SPIN,
		payload: {
			value,
		},
	};
};
