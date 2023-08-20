import { Dropdown } from "react-bootstrap";
import http from "../Http";
import { useGlobalState } from "../context/GlobalState.context";

export interface IPurchaseBalanceProps {}

const USER_V1 = "/api/v1/users";

type PurchaseRequest = {
  amount: number;
};

export function PurchaseBalance() {
  const amounts = [10, 20, 50, 100];
  const {
    actions: { updateUserData },
  } = useGlobalState();

  async function purchase(amount: number) {
    await http.put<PurchaseRequest>(`${USER_V1}/balance`, { amount });
    updateUserData();
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        Purchase Credits
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {amounts.map((a) => (
          <Dropdown.Item onClick={() => purchase(a)}>
            Purchase ${a}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
