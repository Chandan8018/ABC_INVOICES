import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/theme/ThemeProvider";
import "./index.css";
import CustomizedProgressBars from "./components/spinner/CustomizedProgressBars.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <React.StrictMode>
          <Suspense
            fallback={
              <div className='flex justify-center items-center gap-4 h-screen'>
                <CustomizedProgressBars />
                <span className='text-2xl'>Loading....</span>
              </div>
            }
          >
            <App />
          </Suspense>
        </React.StrictMode>
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
