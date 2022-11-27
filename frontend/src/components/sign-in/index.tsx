import { $, component$, useContext, useWatch$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { UserContext } from '~/context/user';
import { magic } from '~/lib/magic';
import { login } from '~/services/login';
import { SignInForm } from './form';

export default component$(() => {
  const nav = useNavigate();
  const state = useContext(UserContext);

  const navToHome = $(() => (nav.path = '/home'));

  useWatch$(({ track }) => {
    const user = track(() => state.user);

    if (user?.issuer) {
      navToHome();
    }
  });

  const handleLoginWithEmail$ = $(async (email: string) => {
    try {
      // Trigger Magic link to be sent to user
      const didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL('/callback', window.location.origin).href, // optional redirect back to your app after magic link is clicked
      });

      // Validate didToken with server
      const res = await login(didToken);

      if (res.status === 200) {
        // Set the UserContext to the now logged in user
        const userMetadata = await magic.user.getMetadata();
        state.user = userMetadata;

        navToHome();
      }
    } catch (error) {
      console.log('handleLoginWithEmail#error', (error as any).message);
    }
  });

  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>

          <div className="mt-8">
            <div className="mt-6">
              <SignInForm onFormSubmit$={handleLoginWithEmail$} />
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
});
