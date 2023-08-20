import { NavLink } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState.context";
import { PurchaseBalance } from "../components/PurchaseCredits";

export function HomeView() {
  const {
    state: { isLoggedIn, userData },
  } = useGlobalState();

  if (isLoggedIn) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h1>Hello, user!</h1>
          <p>
            Your current credit is{" "}
            <strong className="text-primary">${userData?.userBalance}</strong>.
          </p>
          <p>
            <PurchaseBalance></PurchaseBalance>
          </p>
          <p>
            <NavLink className="btn btn-success" to="/operations">
              Execute Operation
            </NavLink>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>You are not logged in</h1>
        <p>Please, login to use our functionalities</p>
        <p>Demo user: demouser@jlcorradi.dev</p>
        <p>Password: password</p>
      </div>
    </div>
  );
}
