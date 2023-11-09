import { useId, type JSX, ReactNode } from 'react';

type CheckboxProps = {
  children: ReactNode;
};

export function Checkbox(props: CheckboxProps): JSX.Element {
  const { children } = props;
  const id = useId();
  return (
    <label
      className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700"
      htmlFor={id}
    >
      <input
        id={id}
        type="checkbox"
        value=""
        name="bordered-checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <span className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {children}
      </span>
    </label>
  );
}