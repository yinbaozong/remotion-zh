import {Button} from '../../components/Button';

export const RetryButton: React.FC<{
	onClick: () => void;
	readonly label?: string;
}> = ({onClick, label = '重试'}) => {
	return <Button onClick={onClick}>{label}</Button>;
};
