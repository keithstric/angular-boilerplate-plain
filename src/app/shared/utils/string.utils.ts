/**
 * This file is a collection of text utilities
 */

/**
 * Title case a string
 * @param {string} str
 */
export const titleCaseString = (str: string) => {
	const sentence = str.toLowerCase().split(' ');
	for (let i = 0; i < sentence.length; i++) {
		sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
	}
	return sentence.join(' ');
};
