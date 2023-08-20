import { SyntheticEvent, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import http from "../Http";
import { Auth } from "../Auth";
import { useGlobalState } from "../context/GlobalState.context";
import { useNavigate } from "react-router-dom";

const AUTH_V1 = "/api/v1/auth";

type LoginResponse = {
  access_token: string;
};

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    actions: { setIsLoggedIn },
    state: { isLoggedIn, userData },
  } = useGlobalState();

  async function submit(e: SyntheticEvent) {
    e.preventDefault();
    const urlEncodedData = new URLSearchParams({
      username,
      password,
    }).toString();

    try {
      let response = await http.post<LoginResponse>(AUTH_V1, urlEncodedData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      Auth.setToken(response.data?.access_token);
      setIsLoggedIn(true);
    } catch (err) {
      Auth.setToken(null);
    }
  }

  if (isLoggedIn) {
    return (
      <>
        <Badge bg="success">Balance: ${userData?.userBalance}</Badge>
        <Button
          variant="light"
          onClick={() => {
            setIsLoggedIn(false);
            Auth.setToken(null);
            navigate("/");
          }}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <Form className="d-flex" onSubmit={submit}>
      <Form.Control
        type="search"
        placeholder="Email"
        className="me-2"
        aria-label="Email"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Form.Control
        type="password"
        placeholder="Password"
        className="me-2"
        aria-label="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="outline-success">
        Login
      </Button>
    </Form>
  );
}
