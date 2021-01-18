const stringIsNumber = value => isNaN(Number(value)) === false;

export const enumToArray = (enumObj: any) => {
	return Object.keys(enumObj)
		.map(key => enumObj[key]);
};
