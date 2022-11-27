import { component$, useClientEffect$, useContext } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { UserContext } from '~/context/user';
import { magic } from '~/lib/magic';
import { login } from '~/services/login';

// Send token to server to validate

export const Callback = component$(() => {
  const nav = useNavigate();
  const location = useLocation();
  const state = useContext(UserContext);

  useClientEffect$(
    async () => {
      const magicCredential = new URLSearchParams(location.query).get('magic_credential');

      if (magicCredential) {
        const didToken = await magic.auth.loginWithCredential();

        const res = await login(didToken);

        if (res.status === 200) {
          // Set the UserContext to the now logged in user
          const user = await magic.user.getMetadata();

          state.user = user;

          nav.path = '/home';
        }
      }
    },
    { eagerness: 'load' }
  );

  return <div>Loading...</div>;
});
