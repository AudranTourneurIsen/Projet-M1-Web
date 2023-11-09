import { FC, useState } from 'react';

type DropdownSelectionObject = {
  id: string;
  name: string;
  selected: boolean;
};

type DropdownSelectionState = DropdownSelectionObject[];

type DropdownCheckboxProps = {
  label: string;
  state: DropdownSelectionState;
  setState: (state: DropdownSelectionState) => void;
};

export const DropdownCheckboxSelection: FC<DropdownCheckboxProps> = (props) => {
  const { label, state, setState } = props;

  const [isOpen, setIsOpen] = useState(false);

  console.log('dropdown checkbox', state);

  return (
    <>
      <button
        id="dropdownHelperButton"
        data-dropdown-toggle="dropdownHelper"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={(): void => setIsOpen(!isOpen)}
      >
        {label}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div className="h-2" />

      {isOpen && (
        <div
          id="dropdownHelper"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHelperButton"
          >
            {state.map((item) => (
              <li key={item.id}>
                <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id={item.id}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    checked={item.selected}
                    onChange={(e): void => {
                      const newState = state.map((stateItem) => {
                        if (stateItem.id === item.id) {
                          return {
                            ...stateItem,
                            selected: e.target.checked,
                          };
                        }
                        return stateItem;
                      });
                      console.log('new state:', newState);
                      setState(newState);
                    }}
                  />
                  <label
                    htmlFor={item.id}
                    className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    {item.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
