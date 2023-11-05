import { FC } from 'react';

type Proposition = {
  id: string;
  name: string;
};

type DropdownProps = {
  label: string;
  onChange: (value: string) => void;
  currentlySelectedId: string | null | undefined;
  propositions: Proposition[];
};

export const DropdownSelection: FC<DropdownProps> = (props) => {
  const { label, onChange, currentlySelectedId, propositions } = props;

  console.log('propositions', propositions);
  console.log('selected', currentlySelectedId);

  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e): void => {
          const newId = e.target.value;
          onChange(newId);
        }}
        value={
          propositions.find(
            (proposition) => proposition.id === currentlySelectedId,
          )?.id
        }
      >
        <option value="">--Please choose an option--</option>
        {propositions.map((proposition) => (
          <option key={proposition.id} value={proposition.id}>
            {proposition.name}
          </option>
        ))}
      </select>
    </div>
  );
};
