import { FC } from 'react';
import { twMerge } from 'tailwind-merge'

type BadgeColor = 'unselected' | 'selected';


type BadgeProps = {
    isActive : boolean;
    color: BadgeColor;
    onPress: () => void;
    label: string;
}
export const Badge : FC<BadgeProps> = (props) => {
    let {isActive = false, color = 'unselected', onPress, label} = props;

    const colorClasses : Record<BadgeColor, string> = {
        selected: 'bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300',
        unselected: 'bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'
    };

    function handleClick() {
        isActive = !isActive;
        if (color == 'unselected') {
            color = 'selected';
        }
        else {
            color = 'unselected';
        }

        onPress();
    }

    return (

          <span
              className={twMerge(colorClasses[color])}
              onClick={handleClick}
          >
          {label}
          </span>
    );
};