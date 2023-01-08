import { RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./context/provider";
import appRouter from "./router";

const App = () => {
  return (
    <AppContextProvider>
      <RouterProvider router={appRouter} />
    </AppContextProvider>
  );
};

export default App;
