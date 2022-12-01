import { $, component$, PropFunction, useSignal } from '@builder.io/qwik';
import { Button } from '../ui-components/button';
import { TextInput } from '../ui-components/text-input';

type FormProps = {
  onFormSubmit$: PropFunction<(email: string) => void>;
};

export const SignInForm = component$((props: FormProps) => {
  const email = useSignal<string>('');

  const onFormSubmit$ = $(() => props.onFormSubmit$(email.value));

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
            value={email.value}
            onChange$={async (event) => {
              email.value = event.target.value;
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
