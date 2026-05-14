import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateWallet from "./pages/CreateWallet";
import WalletList from "./pages/WalletList";
import UnlockWallet from "./pages/UnlockWallet";
import Dashboard from "./pages/Dashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/create"
          element={<CreateWallet />}
        />

        <Route
          path="/"
          element={<WalletList />}
        />

        <Route
          path="/unlock"
          element={<UnlockWallet />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;