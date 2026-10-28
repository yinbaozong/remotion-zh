import type {WebRendererQuality} from '@remotion/web-renderer';
import {Checkmark} from '../../icons/Checkmark';
import type {ComboboxValue} from '../NewComposition/ComboBox';

const QUALITY_OPTIONS: {value: WebRendererQuality; label: string}[] = [
	{value: 'very-low', label: '极低'},
	{value: 'low', label: '低'},
	{value: 'medium', label: '中'},
	{value: 'high', label: '高'},
	{value: 'very-high', label: '极高'},
];

export const getQualityOptions = (
	selectedQuality: WebRendererQuality,
	setQuality: (quality: WebRendererQuality) => void,
): ComboboxValue[] => {
	return QUALITY_OPTIONS.map(({value, label}) => ({
		label,
		onClick: () => setQuality(value),
		leftItem: selectedQuality === value ? <Checkmark /> : null,
		id: value,
		keyHint: null,
		quickSwitcherLabel: null,
		subMenu: null,
		type: 'item' as const,
		value,
	}));
};
