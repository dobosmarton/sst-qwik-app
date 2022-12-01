import { component$, useClientEffect$, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { UserContext, UserState } from './context/user';

import globalStyles from './global.css?inline';
import { magic } from './lib/magic';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);

  const state = useStore<UserState>({
    user: null,
    loading: false,
  });

  useContextProvider(UserContext, state);

  useClientEffect$(async () => {
    state.loading = true;
    const isLoggedIn = await magic.user.isLoggedIn();

    if (isLoggedIn) {
      const userData = await magic.user.getMetadata();

      state.user = userData;
    } else {
      state.user = null;
    }
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en" class="h-full">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
