import MainLayouts from "./components/layout/MainLayouts";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <MainLayouts />
    </ProtectedRoute>
  );
}

export default App;
