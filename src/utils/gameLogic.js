import _isEqual from 'lodash/isEqual';

import { megaWinCombinations, winCombinations } from './winningPatterns';

export const checkNormalWin = (results) =>
	winCombinations.some((winningCombo) => results.some((resultRow) => _isEqual(resultRow, winningCombo)));

export const checkMegaWin = (results) => megaWinCombinations.some((winningCombo) => _isEqual(results, winningCombo));
