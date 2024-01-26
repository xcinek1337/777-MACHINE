export const typesAction = {
	START_SPIN: 'setStartSpin',
	SET_MACHINE_ACTIVE: 'setMachineAvtive',
	SET_BTN_DISABLE: 'setButtonDisable',
	SET_SPIN_RESULT: 'setSpinResult',
	SET_NORMAL_WIN: 'setNormalWin',
	SET_MEGA_WIN: 'setMegaWin',
};

export const setStartSpinAction = (value) => {
	return {
		type: typesAction.START_SPIN,
		payload: {
			value,
		},
	};
};
export const setMachineAvtiveAction = (value) => {
	return {
		type: typesAction.SET_MACHINE_ACTIVE,
		payload: {
			value,
		},
	};
};
export const setButtonDisableAction = (value) => {
	return {
		type: typesAction.SET_BTN_DISABLE,
		payload: {
			value,
		},
	};
};
export const setSpinResultAction = (result) => {
	return {
		type: typesAction.SET_SPIN_RESULT,
		payload: {
			result,
		},
	};
};
export const setNormalWinAction = (value) => {
	return {
		type: typesAction.SET_NORMAL_WIN,
		payload: {
			value,
		},
	};
};
export const setMegaWinAction = (value) => {
	return {
		type: typesAction.SET_MEGA_WIN,
		payload: {
			value,
		},
	};
};