import type {LogLevel} from '@remotion/renderer';
import {BrowserSafeApis} from '@remotion/renderer/client';
import type {
	ConfigFileStudioSettings,
	ConfigUpdate,
} from '@remotion/studio-shared';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Internals} from 'remotion';
import {NoReactInternals} from 'remotion/no-react';
import {BLUE, LIGHT_TEXT} from '../helpers/colors';
import {UndoIcon} from '../icons/undo';
import {Button} from './Button';
import {Checkbox} from './Checkbox';
import {ConfigSelect} from './ConfigSelect';
import {sectionHeader} from './InspectorPanel/styles';
import {Spacing} from './layout';
import {
	InputDragger,
	parseInputDraggerNumber,
} from './NewComposition/InputDragger';
import {RemotionInput} from './NewComposition/RemInput';
import {ValidationMessage} from './NewComposition/ValidationMessage';
import {InfoBubble} from './RenderModal/InfoBubble';
import {INFO_TOOLTIP_FONT_SIZE} from './RenderModal/InfoTooltip';
import {label, optionRow, rightRow} from './RenderModal/layout';
import {useSettings} from './SettingsContext';
import {useAutoSaveConfig} from './use-auto-save-config';

const container: React.CSSProperties = {
	alignSelf: 'flex-start',
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	minWidth: 0,
};

const dividerLabel: React.CSSProperties = {
	...sectionHeader,
	margin: 0,
	padding: '4px 16px',
};

const sectionTitle: React.CSSProperties = {
	...dividerLabel,
	marginTop: 8,
};

const resetIcon: React.CSSProperties = {
	height: 12,
	width: 12,
};

const initialSettings: ConfigFileStudioSettings = {
	preservePitchOnPlayback: null,
	showLayerFrameNumbers: null,
	showPremounting: null,
	defaultPremountInSeconds: null,
	askAIEnabled: null,
	audioLatencyHint: null,
	beepOnFinish: null,
	enableCrossSiteIsolation: null,
	sequenceActivityLimit: null,
	interactivityEnabled: null,
	keyboardShortcutsEnabled: null,
	logLevel: null,
	maxTimelineTracks: null,
	numberOfSharedAudioTags: null,
	rspack: null,
	canvasTabsEnabled: null,
};

const ConfigNumber = ({
	defaultValue,
	description,
	name,
	onChange,
	onChangeEnd,
	value,
	step,
	suffix,
}: {
	readonly defaultValue: number;
	readonly description: React.ReactNode;
	readonly step: number;
	readonly suffix: string | null;
	readonly name: string;
	readonly onChange: (value: number | null) => void;
	readonly onChangeEnd: (value: number | null) => void;
	readonly value: number | null;
}) => {
	const valueSuffix = suffix === null ? '' : ` ${suffix}`;
	const defaultLabel = `Default (${defaultValue}${valueSuffix})`;

	return (
		<div style={optionRow}>
			<div style={label}>
				{name}
				{description === null ? null : (
					<InfoBubble
						aria-label={`About ${name.toLowerCase()}`}
						horizontalAlignment="right"
					>
						<div
							style={{
								padding: 12,
								maxWidth: 280,
								fontSize: INFO_TOOLTIP_FONT_SIZE,
								lineHeight: 1.5,
							}}
						>
							{description}
						</div>
					</InfoBubble>
				)}
			</div>
			<div style={{...rightRow, gap: 6}}>
				<InputDragger
					aria-label={name}
					buttonStyle={{textAlign: 'right', width: 140}}
					formatter={() =>
						value === null ? defaultLabel : `${value}${valueSuffix}`
					}
					min={0}
					onTextChange={() => undefined}
					onValueChange={onChange}
					onValueChangeEnd={onChangeEnd}
					placeholder={defaultLabel}
					rightAlign
					status="ok"
					step={step}
					value={value ?? defaultValue}
				/>
				<Button
					disabled={value === null}
					onClick={() => onChangeEnd(null)}
					size="compact"
					style={{color: LIGHT_TEXT}}
					aria-label={`Use default (${defaultValue}${valueSuffix})`}
				>
					<UndoIcon style={resetIcon} />
				</Button>
			</div>
		</div>
	);
};

export const StudioSettings: React.FC = () => {
	const {error: settingsError, revision, studioRuntimeConfig} = useSettings();
	const [settings, setSettings] =
		useState<ConfigFileStudioSettings>(initialSettings);
	const [sequenceActivityLimitText, setSequenceActivityLimitText] =
		useState('Infinity');
	const [committedNumberSettings, setCommittedNumberSettings] = useState<{
		numberOfSharedAudioTags: number | null;
		defaultPremountInSeconds: number | null;
		sequenceActivityLimit: number | null;
	}>({
		numberOfSharedAudioTags: null,
		defaultPremountInSeconds: null,
		sequenceActivityLimit: null,
	});
	const [editedSetters, setEditedSetters] = useState<Set<string>>(
		() => new Set(),
	);
	const [syncedRevision, setSyncedRevision] = useState(-1);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (studioRuntimeConfig === null) {
			return;
		}

		setSettings(
			studioRuntimeConfig.configFileStudioSettings ?? initialSettings,
		);
		setSequenceActivityLimitText(
			String(
				studioRuntimeConfig.configFileStudioSettings?.sequenceActivityLimit ??
					Internals.DEFAULT_SEQUENCE_ACTIVITY_LIMIT,
			),
		);
		setCommittedNumberSettings({
			sequenceActivityLimit:
				studioRuntimeConfig.configFileStudioSettings?.sequenceActivityLimit ??
				null,
			defaultPremountInSeconds:
				studioRuntimeConfig.configFileStudioSettings
					?.defaultPremountInSeconds ?? null,
			numberOfSharedAudioTags:
				studioRuntimeConfig.configFileStudioSettings?.numberOfSharedAudioTags ??
				null,
		});
		setEditedSetters(new Set());
		setSyncedRevision(revision);
		setError(null);
	}, [revision, studioRuntimeConfig]);

	const changeSetting = useCallback(
		(
			key: keyof ConfigFileStudioSettings,
			setter: string,
			value: ConfigFileStudioSettings[keyof ConfigFileStudioSettings],
		) => {
			setSettings((current) => ({...current, [key]: value}));
			setEditedSetters((current) => new Set(current).add(setter));
		},
		[],
	);
	const previewNumberSetting = useCallback(
		(
			key:
				| 'numberOfSharedAudioTags'
				| 'defaultPremountInSeconds'
				| 'sequenceActivityLimit',
			value: number | null,
		) => {
			setSettings((current) => ({...current, [key]: value}));
		},
		[],
	);
	const commitNumberSetting = useCallback(
		(
			key:
				| 'numberOfSharedAudioTags'
				| 'defaultPremountInSeconds'
				| 'sequenceActivityLimit',
			setter: string,
			value: number | null,
		) => {
			setSettings((current) => ({...current, [key]: value}));
			setCommittedNumberSettings((current) => ({...current, [key]: value}));
			setEditedSetters((current) => new Set(current).add(setter));
		},
		[],
	);

	const updates = useMemo((): ConfigUpdate[] => {
		const update = (
			setter: string,
			value: ConfigFileStudioSettings[keyof ConfigFileStudioSettings],
		): ConfigUpdate =>
			value === null || value === undefined
				? {setter, type: 'delete'}
				: {setter, type: 'set', value};

		const updatesForEditedSetters = [
			update('setPreservePitchOnPlayback', settings.preservePitchOnPlayback),
			update('setShowLayerFrameNumbers', settings.showLayerFrameNumbers),
			update('setShowPremounting', settings.showPremounting),
			update('setEnableCrossSiteIsolation', settings.enableCrossSiteIsolation),
			update('setAudioLatencyHint', settings.audioLatencyHint),
			update(
				'setNumberOfSharedAudioTags',
				committedNumberSettings.numberOfSharedAudioTags,
			),
			update(
				'setDefaultPremountInSeconds',
				committedNumberSettings.defaultPremountInSeconds,
			),
			update('setRspack', settings.rspack),
			update('setInteractivityEnabled', settings.interactivityEnabled),
			update(
				'setSequenceActivityLimit',
				committedNumberSettings.sequenceActivityLimit,
			),
			update('setCanvasTabsEnabled', settings.canvasTabsEnabled),
			update('setLogLevel', settings.logLevel),
		].filter((item) => editedSetters.has(item.setter));

		if (editedSetters.has('setRspack')) {
			updatesForEditedSetters.push({
				setter: 'setExperimentalRspackEnabled',
				type: 'delete',
			});
		}

		if (editedSetters.has('setLogLevel')) {
			updatesForEditedSetters.push({setter: 'setLevel', type: 'delete'});
		}

		return updatesForEditedSetters;
	}, [committedNumberSettings, editedSetters, settings]);

	const ready = studioRuntimeConfig !== null && syncedRevision === revision;
	useAutoSaveConfig({
		enabled: ready,
		onError: setError,
		ready,
		syncRevision: syncedRevision,
		updates,
	});

	if (studioRuntimeConfig === null) {
		return null;
	}

	return (
		<div style={container}>
			<p style={dividerLabel}>界面</p>
			<div style={optionRow}>
				<div style={label}>
					启用交互
					<InfoBubble
						aria-label="关于交互"
						horizontalAlignment="right"
					>
						<div
							style={{
								padding: 12,
								maxWidth: 280,
								fontSize: INFO_TOOLTIP_FONT_SIZE,
								lineHeight: 1.5,
							}}
						>
							Global setting for turning off any interactivity that may edit
							your code.
						</div>
					</InfoBubble>
				</div>
				<label style={rightRow} aria-label="启用交互">
					<Checkbox
						checked={settings.interactivityEnabled !== false}
						name="Interactivity enabled"
						onChange={(event) =>
							changeSetting(
								'interactivityEnabled',
								'setInteractivityEnabled',
								event.target.checked ? null : false,
							)
						}
					/>
				</label>
			</div>
			<div style={optionRow}>
				<div style={label}>
					作品标签页
					<InfoBubble
						aria-label="关于作品标签页"
						horizontalAlignment="right"
					>
						<div
							style={{
								padding: 12,
								maxWidth: 280,
								fontSize: INFO_TOOLTIP_FONT_SIZE,
								lineHeight: 1.5,
							}}
						>
							在画布上方显示标签页。
						</div>
					</InfoBubble>
				</div>
				<label style={rightRow} aria-label="作品标签页">
					<Checkbox
						checked={settings.canvasTabsEnabled !== false}
						name="Composition Tabs"
						onChange={(event) =>
							changeSetting(
								'canvasTabsEnabled',
								'setCanvasTabsEnabled',
								event.target.checked ? null : false,
							)
						}
					/>
				</label>
			</div>

			<p style={sectionTitle}>时间轴</p>
			<div style={optionRow}>
				<div style={label}>
					图层帧计数器
					<InfoBubble
						aria-label="关于图层帧计数器"
						horizontalAlignment="right"
					>
						<div
							style={{
								padding: 12,
								maxWidth: 280,
								fontSize: INFO_TOOLTIP_FONT_SIZE,
								lineHeight: 1.5,
							}}
						>
							以小标签显示片段内部时间。
						</div>
					</InfoBubble>
				</div>
				<label style={rightRow} aria-label="图层帧计数器">
					<Checkbox
						checked={settings.showLayerFrameNumbers ?? false}
						name="Layer Frame Counters"
						onChange={(event) =>
							changeSetting(
								'showLayerFrameNumbers',
								'setShowLayerFrameNumbers',
								event.target.checked,
							)
						}
					/>
				</label>
			</div>
			<div style={optionRow}>
				<div style={label}>
					显示预挂载
					<InfoBubble
						aria-label="关于预挂载"
						horizontalAlignment="right"
					>
						<div
							style={{
								padding: 12,
								maxWidth: 280,
								fontSize: INFO_TOOLTIP_FONT_SIZE,
								lineHeight: 1.5,
							}}
						>
							Indicate in the timeline when a layer is mounted invisibly. See:{' '}
							<a
								href="https://www.remotion.dev/docs/player/premounting"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									color: BLUE,
									fontSize: INFO_TOOLTIP_FONT_SIZE,
									lineHeight: 1.5,
									textDecoration: 'none',
								}}
							>
								预挂载
							</a>
						</div>
					</InfoBubble>
				</div>
				<label style={rightRow} aria-label="显示预挂载">
					<Checkbox
						checked={settings.showPremounting ?? false}
						name="Show Premounting"
						onChange={(event) =>
							changeSetting(
								'showPremounting',
								'setShowPremounting',
								event.target.checked,
							)
						}
					/>
				</label>
			</div>
			<div style={optionRow}>
				<div style={label}>
					显示未挂载组件
					<InfoBubble
						aria-label="关于显示未挂载组件"
						horizontalAlignment="right"
					>
						<div
							style={{
								padding: 12,
								maxWidth: 280,
								fontSize: INFO_TOOLTIP_FONT_SIZE,
								lineHeight: 1.5,
							}}
						>
							The maximum number of components which may be evaluated for better
							timeline visualization. See:{' '}
							<a
								href="https://www.remotion.dev/docs/studio/showing-unmounted-components"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									color: BLUE,
									fontSize: INFO_TOOLTIP_FONT_SIZE,
									lineHeight: 1.5,
									textDecoration: 'none',
								}}
							>
								正在显示未挂载组件
							</a>
						</div>
					</InfoBubble>
				</div>
				<div style={{...rightRow, gap: 6}}>
					<RemotionInput
						aria-label="显示未挂载组件"
						type="text"
						style={{width: 140}}
						onChange={(event) => {
							event.currentTarget.setCustomValidity('');
							setSequenceActivityLimitText(event.currentTarget.value);
						}}
						onBlur={(event) => {
							const text = event.currentTarget.value.trim();
							if (text === '') {
								setSequenceActivityLimitText(
									String(settings.sequenceActivityLimit ?? Infinity),
								);
								return;
							}

							const value =
								text === 'Infinity' ? Infinity : parseInputDraggerNumber(text);
							if (
								value !== Infinity &&
								(value === null || !Number.isSafeInteger(value) || value < 0)
							) {
								event.currentTarget.setCustomValidity(
									'Enter a non-negative safe integer or Infinity.',
								);
								event.currentTarget.reportValidity();
								return;
							}

							event.currentTarget.setCustomValidity('');
							setSequenceActivityLimitText(String(value));
							const limit = value === Infinity ? null : value;
							if (limit !== settings.sequenceActivityLimit) {
								commitNumberSetting(
									'sequenceActivityLimit',
									'setSequenceActivityLimit',
									limit,
								);
							}
						}}
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								event.currentTarget.blur();
							}

							if (event.key === 'Escape') {
								event.currentTarget.setCustomValidity('');
								setSequenceActivityLimitText(
									String(settings.sequenceActivityLimit ?? Infinity),
								);
							}
						}}
						rightAlign
						status="ok"
						value={sequenceActivityLimitText}
					/>
					<Button
						disabled={settings.sequenceActivityLimit === null}
						onClick={() => {
							setSequenceActivityLimitText('Infinity');
							commitNumberSetting(
								'sequenceActivityLimit',
								'setSequenceActivityLimit',
								null,
							);
						}}
						size="compact"
						style={{color: LIGHT_TEXT}}
						aria-label={`Reset unmounted component visualization limit to ${Internals.DEFAULT_SEQUENCE_ACTIVITY_LIMIT}`}
					>
						<UndoIcon style={resetIcon} />
					</Button>
				</div>
			</div>

			<p style={sectionTitle}>播放</p>
			<div style={optionRow}>
				<div style={label}>
					保持音调
					<InfoBubble
						aria-label="关于保持音调"
						horizontalAlignment="right"
					>
						<div
							style={{
								padding: 12,
								maxWidth: 280,
								fontSize: INFO_TOOLTIP_FONT_SIZE,
								lineHeight: 1.5,
							}}
						>
							Keep audio pitch unchanged when adjusting the Studio playback
							speed. Applies to Audio and Video from @remotion/media.
						</div>
					</InfoBubble>
				</div>
				<label style={rightRow} aria-label="保持音调">
					<Checkbox
						checked={settings.preservePitchOnPlayback !== false}
						name="Preserve pitch"
						onChange={(event) =>
							changeSetting(
								'preservePitchOnPlayback',
								'setPreservePitchOnPlayback',
								event.target.checked ? null : false,
							)
						}
					/>
				</label>
			</div>
			<ConfigNumber
				defaultValue={NoReactInternals.DEFAULT_STUDIO_PREMOUNT_IN_SECONDS}
				description={
					<>
						How many seconds before a layer starts it should be mounted
						invisibly. See:{' '}
						<a
							href="https://www.remotion.dev/docs/player/premounting"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								color: BLUE,
								fontSize: INFO_TOOLTIP_FONT_SIZE,
								lineHeight: 1.5,
								textDecoration: 'none',
							}}
						>
							预挂载
						</a>
					</>
				}
				name="Default Premount"
				step={0.1}
				suffix="sec"
				onChange={(value) =>
					previewNumberSetting('defaultPremountInSeconds', value)
				}
				onChangeEnd={(value) =>
					commitNumberSetting(
						'defaultPremountInSeconds',
						'setDefaultPremountInSeconds',
						value,
					)
				}
				value={settings.defaultPremountInSeconds}
			/>
			<ConfigSelect
				defaultLabel="播放"
				description={
					<>
						Remotion runs an{' '}
						<code style={{fontFamily: 'monospace'}}>AudioContext</code> to drive
						audio. Define which{' '}
						<a
							href="https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext#latencyhint"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								color: BLUE,
								fontSize: INFO_TOOLTIP_FONT_SIZE,
								lineHeight: 1.5,
								textDecoration: 'none',
							}}
						>
							<code style={{color: BLUE, fontFamily: 'monospace'}}>
								latencyHint
							</code>
						</a>{' '}
						it should use.
					</>
				}
				name="Audio latency hint"
				onChange={(value) =>
					changeSetting('audioLatencyHint', 'setAudioLatencyHint', value)
				}
				options={[
					{label: '交互', value: 'interactive'},
					{label: '均衡', value: 'balanced'},
					{label: '播放', value: 'playback'},
				]}
				value={settings.audioLatencyHint}
			/>
			<ConfigNumber
				defaultValue={0}
				description={null}
				name="Number of shared audio tags"
				step={1}
				suffix={null}
				onChange={(value) =>
					previewNumberSetting('numberOfSharedAudioTags', value)
				}
				onChangeEnd={(value) =>
					commitNumberSetting(
						'numberOfSharedAudioTags',
						'setNumberOfSharedAudioTags',
						value,
					)
				}
				value={settings.numberOfSharedAudioTags}
			/>

			<p style={sectionTitle}>开发</p>
			<ConfigSelect
				defaultLabel="Webpack"
				description="Chooses the tool that compiles your project for Studio and rendering. Webpack is the default; Rspack is an alternative. Changing this setting restarts Studio."
				name="Bundler"
				onChange={(value) => changeSetting('rspack', 'setRspack', value)}
				options={[
					{label: 'Rspack', value: true},
					{label: 'Webpack', value: false},
				]}
				value={settings.rspack}
			/>
			<div style={optionRow}>
				<div style={label}>
					Cross-site isolation
					<InfoBubble
						aria-label="关于跨站隔离"
						horizontalAlignment="right"
					>
						<div
							style={{
								padding: 12,
								maxWidth: 280,
								fontSize: INFO_TOOLTIP_FONT_SIZE,
								lineHeight: 1.5,
							}}
						>
							Isolates Studio from other websites to enable shared memory and
							multithreading. Required for{' '}
							<code style={{fontFamily: 'monospace'}}>
								@remotion/whisper-web
							</code>{' '}
							and for faster{' '}
							<code style={{fontFamily: 'monospace'}}>@mediabunny/prores</code>{' '}
							decoding. The tradeoff is that media from other websites may not
							load. See:{' '}
							<a
								href="https://www.remotion.dev/docs/miscellaneous/cross-origin-isolation"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									color: BLUE,
									fontSize: INFO_TOOLTIP_FONT_SIZE,
									lineHeight: 1.5,
									textDecoration: 'none',
								}}
							>
								Cross-origin isolation
							</a>
						</div>
					</InfoBubble>
				</div>
				<label style={rightRow} aria-label="Cross-site isolation">
					<Checkbox
						checked={settings.enableCrossSiteIsolation === true}
						name="Cross-site isolation"
						onChange={(event) =>
							changeSetting(
								'enableCrossSiteIsolation',
								'setEnableCrossSiteIsolation',
								event.target.checked ? true : null,
							)
						}
					/>
				</label>
			</div>
			<ConfigSelect<LogLevel>
				defaultLabel="信息"
				description="Controls how much detail Remotion writes to the console. Use Info for normal output, Warn or Error for fewer messages, and Verbose or Trace for debugging."
				name="Log level"
				onChange={(value) => changeSetting('logLevel', 'setLogLevel', value)}
				options={BrowserSafeApis.logLevels.map((value) => ({
					label: value[0].toUpperCase() + value.slice(1),
					value,
				}))}
				value={settings.logLevel}
			/>
			{(error ?? settingsError) ? (
				<>
					<Spacing y={1} block />
					<div style={{paddingLeft: 16, paddingRight: 16}}>
						<ValidationMessage
							align="flex-start"
							message={error ?? settingsError ?? ''}
							type="error"
						/>
					</div>
				</>
			) : null}
			<Spacing y={2} block />
		</div>
	);
};
