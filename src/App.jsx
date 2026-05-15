import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateWallet from "./pages/CreateWallet";
import WalletList from "./pages/WalletList";
import UnlockWallet from "./pages/UnlockWallet";
import Dashboard from "./pages/Dashboard";
import SendTransaction from "./pages/SendTransaction";
import ConfirmTransaction from "./pages/ConfirmTransaction";
import ProtectedRoute from "./components/ProtectedRoute";

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
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/send"
          element={
            <ProtectedRoute>
              <SendTransaction/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirm"
          element={
            <ProtectedRoute>
              <ConfirmTransaction/>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;