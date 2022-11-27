import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import SignIn from '~/components/sign-in';

export default component$(() => {
  return <SignIn />;
});

export const head: DocumentHead = {
  title: 'Sign In',
};
