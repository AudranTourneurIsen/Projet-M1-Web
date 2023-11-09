import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonColor = 'info' | 'success' | 'none';

type ButtonProps = {
  color: ButtonColor;
  onPress?: () => void;
  children: ReactNode;
};

export const Button: FC<ButtonProps> = (props) => {
  const { color = 'info', onPress, children } = props;

  const commonClasses =
    'text-white bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2';

  const colorClasses: Record<ButtonColor, string> = {
    info: 'from-blue-500 via-blue-600 to-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800',
    success:
      'from-green-400 via-green-500 to-green-600 focus:ring-green-300 dark:focus:ring-green-800',
    none: '',
  };

  return (
    <button
      type="button"
      className={twMerge(commonClasses, colorClasses[color])}
      onClick={onPress}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  onPress: (): void => {},
};
