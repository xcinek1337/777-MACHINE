import _isEqual from 'lodash/isEqual';

import { megaWinCombinations, winCombinations, symbols } from './winningPatterns';

export const checkNormalWin = (results) =>
	winCombinations.some((winningCombo) => results.some((resultRow) => _isEqual(resultRow, winningCombo)));

export const checkMegaWin = (results) => megaWinCombinations.some((winningCombo) => _isEqual(results, winningCombo));

export const generateRandomSymbols = () => {
	return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
};