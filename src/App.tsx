import { ArithmeticsLayout } from "./ArithmeticsLayout";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStateProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <ArithmeticsLayout></ArithmeticsLayout>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
