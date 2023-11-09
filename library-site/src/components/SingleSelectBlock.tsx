import React, { Dispatch, JSX, useCallback, useId } from 'react';

type SingleSelectBlockProps = {
  options: Array<{ id: string; name: string }>;
  selectedOptionId: string | null;
  setSelectedOptionId: Dispatch<string | null>;
};

export function SingleSelectBlock(props: SingleSelectBlockProps): JSX.Element {
  const { options, selectedOptionId, setSelectedOptionId } = props;

  const baseId = useId();

  const manageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      console.log("???", newValue);
      setSelectedOptionId(newValue);
    },
    [],
  );

  return (
    <form className="flex flex-col gap-4">
      {options.map((option, index) => (
        <label
          className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700"
          htmlFor={`${baseId}-${index}`}
          key={option.id}
        >
          <input
            id={`${baseId}-${index}`}
            type="radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={selectedOptionId === option.id}
            value={option.id}
            onChange={manageChange}
          />
          <span className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {option.name}
          </span>
        </label>
      ))}
    </form>
  );
}
