import { type FC, useId } from 'react';

type TextInputProps = {
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
};

export const TextInput: FC<TextInputProps> = (props) => {
  const { placeholder, label, onChange, value } = props;

  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
        onChange={(e): void => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};
