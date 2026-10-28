import type {SetStateAction} from 'react';
import type {PreviewServerConnectionState} from '../helpers/preview-server-events';
import {Checkmark} from '../icons/Checkmark';
import type {CompositionSortOrder} from '../state/folders';
import type {ModalState} from '../state/modals';
import type {ComboboxValue} from './NewComposition/ComboBox';

export const getRootCompositionMenuItems = ({
	connectionStatus,
	readOnlyStudio,
	setSelectedModal,
	compositionSortOrder,
	setCompositionSortOrder,
}: {
	connectionStatus: PreviewServerConnectionState['type'];
	readOnlyStudio: boolean;
	setSelectedModal: (value: SetStateAction<ModalState | null>) => void;
	compositionSortOrder: CompositionSortOrder;
	setCompositionSortOrder: (sortOrder: CompositionSortOrder) => void;
}): ComboboxValue[] => {
	return [
		{
			id: 'new-root-composition',
			keyHint: null,
			label: '新建作品...',
			leftItem: null,
			onClick: () => {
				setSelectedModal({
					type: 'new-comp',
					folderName: null,
					parentName: null,
					stack: null,
					canvasCapture: null,
				});
			},
			quickSwitcherLabel: '新建作品...',
			subMenu: null,
			type: 'item',
			value: 'new-root-composition',
			disabled: readOnlyStudio || connectionStatus !== 'connected',
		},
		{
			id: 'new-root-folder',
			keyHint: null,
			label: '新建文件夹...',
			leftItem: null,
			onClick: () => {
				setSelectedModal({
					type: 'new-folder',
					parentName: null,
					stack: null,
				});
			},
			quickSwitcherLabel: '新建文件夹...',
			subMenu: null,
			type: 'item',
			value: 'new-root-folder',
			disabled: readOnlyStudio || connectionStatus !== 'connected',
		},
		{
			id: 'sort-compositions-divider',
			type: 'divider',
		},
		{
			id: 'sort-compositions-header',
			label: '排序',
			type: 'section-header',
		},
		{
			id: 'sort-compositions-registration',
			keyHint: null,
			label: '按注册顺序',
			leftItem: compositionSortOrder === 'registration' ? <Checkmark /> : null,
			onClick: () => {
				setCompositionSortOrder('registration');
			},
			quickSwitcherLabel: '按注册顺序排序作品',
			subMenu: null,
			type: 'item',
			value: 'registration' as CompositionSortOrder,
		},
		{
			id: 'sort-compositions-alphabetical',
			keyHint: null,
			label: '按字母顺序',
			leftItem: compositionSortOrder === 'alphabetical' ? <Checkmark /> : null,
			onClick: () => {
				setCompositionSortOrder('alphabetical');
			},
			quickSwitcherLabel: '按字母排序作品',
			subMenu: null,
			type: 'item',
			value: 'alphabetical' as CompositionSortOrder,
		},
	];
};
