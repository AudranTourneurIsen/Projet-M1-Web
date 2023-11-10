import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

type BadgeColor = 'unselected' | 'selected';

type BadgeProps = {
  isActive: boolean;
  onPress: () => void;
  label: string;
};
export const Badge: FC<BadgeProps> = (props) => {
  const { isActive, onPress, label } = props;

  const baseClass = 'text-md font-semibold mx-2 px-4 py-2 rounded-xl';

  const colorClasses: Record<BadgeColor, string> = {
    selected: 'bg-purple-900 text-purple-300',
    unselected: 'bg-gray-700 text-gray-300',
  };

  const color = isActive ? 'selected' : 'unselected';

  return (
    <button
      type="button"
      className={twMerge(baseClass, colorClasses[color])}
      onClick={(): void => onPress()}
    >
      {label}
    </button>
  );
};
