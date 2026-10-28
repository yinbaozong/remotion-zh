import type {LogLevel} from 'remotion';

export const humanReadableLogLevel = (logLevel: LogLevel) => {
	if (logLevel === 'trace') {
		return 'Trace';
	}

	if (logLevel === 'verbose') {
		return 'Verbose';
	}

	if (logLevel === 'info') {
		return '信息';
	}

	if (logLevel === 'warn') {
		return 'Warn';
	}

	if (logLevel === 'error') {
		return '错误';
	}

	throw new TypeError(`Got unexpected log level "${logLevel satisfies never}"`);
};
