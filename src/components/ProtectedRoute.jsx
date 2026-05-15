import { Navigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";

function ProtectedRoute({ children }) {

    const { activeWallet } = useWallet();

    if (!activeWallet) {
        return <Navigate to="/" repalce />;
    }

    return children
}

export default ProtectedRoute;