import { JSX, useId } from 'react';

type MultiSelectBlockProps = {
  options: Array<{ id: string; name: string }>;
  selectedOptionIds: string[];
  setSelectedOptionIds: (ids: string[]) => void;
};

export function MultiSelectBlock(props: MultiSelectBlockProps): JSX.Element {
  const { options, selectedOptionIds, setSelectedOptionIds } = props;

  const baseId = useId();

  function handleClick(id: string): void {
    if (selectedOptionIds.includes(id)) {
      setSelectedOptionIds(selectedOptionIds.filter((i) => i !== id));
    } else {
      setSelectedOptionIds([...selectedOptionIds, id]);
    }
  }

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
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={selectedOptionIds.includes(option.id)}
            onChange={(): void => handleClick(option.id)}
          />
          <span className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {option.name}
          </span>
        </label>
      ))}
    </form>
  );
}
