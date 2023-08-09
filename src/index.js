import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Put any other imports below so that CSS from your
// components takes precedence over default styles.
//import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Provider } from "react-redux";
// import i18n (needs to be bundled ;))
import "./i18n";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000, // avant que les data ne deviennent obselletes
    },
  },
});
//let persistor = persistStore(store);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <I18nextProvider i18n={i18next}> */}
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <PersistGate loading={<p>is loading......</p>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      {/* </I18nextProvider> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
