import { $, component$, useContext } from '@builder.io/qwik';
import { DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { Button } from '~/components/ui-components/button';
import { UserContext } from '~/context/user';
import { magic } from '~/lib/magic';

export default component$(() => {
  const state = useContext(UserContext);
  const nav = useNavigate();

  const logout = $(async () => {
    await magic.user.logout();
    state.user = null;
    nav.path = '/sign-in';
  });

  return (
    <div class="flex flex-col items-start">
      <h1>Home</h1>
      <span>{state.user?.email}</span>
      <Button onClick$={logout}>Logout</Button>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Home',
};
