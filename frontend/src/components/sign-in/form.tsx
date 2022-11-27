import { $, component$, PropFunction, useStore } from '@builder.io/qwik';
import { Button } from '../ui-components/button';
import { TextInput } from '../ui-components/text-input';

type FormProps = {
  onFormSubmit$: PropFunction<(email: string) => void>;
};

export const SignInForm = component$((props: FormProps) => {
  const state = useStore({ email: '' });

  const onFormSubmit$ = $(() => props.onFormSubmit$(state.email));

  return (
    <form className="space-y-6" preventdefault:submit onSubmit$={onFormSubmit$}>
      <div>
        <label html-for="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={state.email}
            onChange$={async (event) => {
              state.email = event.target.value;
            }}
          />
        </div>
      </div>

      <Button type="submit" className="w-full justify-center">
        Send Magic Link
      </Button>
    </form>
  );
});
