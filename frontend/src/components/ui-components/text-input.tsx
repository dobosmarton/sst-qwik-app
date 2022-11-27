import { PropFunction, QwikChangeEvent } from '@builder.io/qwik';

type TextInputProps = {
  id: string;
  name: string;
  type?: 'email' | 'text';
  autoComplete?: 'email';
  required?: boolean;
  value: string;
  onChange$: PropFunction<(event: QwikChangeEvent<HTMLInputElement>) => void>;
};

export const TextInput = (props: TextInputProps) => {
  return (
    <input
      id={props.id}
      name={props.name}
      type={props.type}
      autoComplete={props.autoComplete}
      required={props.required}
      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      value={props.value}
      onChange$={props.onChange$}
    />
  );
};
