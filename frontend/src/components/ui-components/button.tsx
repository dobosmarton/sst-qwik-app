import { PropFunction, QwikMouseEvent } from '@builder.io/qwik';

type ButtonProps = {
  type?: 'button' | 'reset' | 'submit';
  onClick$?: PropFunction<(event: QwikMouseEvent<HTMLButtonElement>) => void>;
  className?: string;
  children?: string;
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      onClick$={props.onClick$}
      className={`inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        props.className ?? ''
      }`}>
      {props.children}
    </button>
  );
};
