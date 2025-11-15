export type Unit = {
	name: string;
	symbol: string;
	ratio: number;
};

export type UnitEntry = {
	unit: Unit;
	value: number;
};

export type System = {
	name: string;
	unitEntries: UnitEntry[];
};

export const unitCategories: { name: string; systems: System[] }[] = [
	{
		name: 'length',
		systems: [
			{
				name: 'Metric',
				unitEntries: [
					{ unit: { name: 'Kilomètre', symbol: 'km', ratio: 1000 }, value: 0 },
					{ unit: { name: 'Mètre', symbol: 'm', ratio: 1 }, value: 0 },
					{ unit: { name: 'Centimètre', symbol: 'cm', ratio: 0.01 }, value: 0 },
					{ unit: { name: 'Millimètre', symbol: 'mm', ratio: 0.001 }, value: 0 },
				]
			},
			{
				name: 'Imperial',
				unitEntries: [
					{ unit: { name: 'Mile', symbol: 'mi', ratio: 1609.344 }, value: 0 },
					{ unit: { name: 'Yard', symbol: 'yd', ratio: 0.9144 }, value: 0 },
					{ unit: { name: 'Pied', symbol: 'ft', ratio: 0.3048 }, value: 0 },
					{ unit: { name: 'Pouce', symbol: 'in', ratio: 0.0254 }, value: 0 },
				]
			}
		]
	},
	{
		name: 'mass',
		systems: [
			{
				name: 'Metric',
				unitEntries: [
					{ unit: { name: 'Kilogramme', symbol: 'kg', ratio: 1000 }, value: 0 },
					{ unit: { name: 'Gramme', symbol: 'g', ratio: 1 }, value: 0 },
					{ unit: { name: 'Milligramme', symbol: 'mg', ratio: 0.001 }, value: 0 },
				]
			},
			{
				name: 'Imperial',
				unitEntries: [
					{ unit: { name: 'Livre', symbol: 'lb', ratio: 453.592 }, value: 0 },
					{ unit: { name: 'Once', symbol: 'oz', ratio: 28.3495 }, value: 0 },
				]
			}
		]
	}
];
