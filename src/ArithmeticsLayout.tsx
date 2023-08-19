import { TopBar } from "./components/TopBar";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { HomeView } from "./views/HomeView";
import { ToastContainer } from "react-toastify";
import { OperationView } from "./views/OperationView";
import { HistoryView } from "./views/HistoryView";

export interface IArithmeticsLayoutProps {}

export function ArithmeticsLayout(props: IArithmeticsLayoutProps) {
  return (
    <>
      <TopBar></TopBar>
      <Container>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/operations" element={<OperationView />} />
          <Route path="/history" element={<HistoryView />} />
        </Routes>
      </Container>
      <ToastContainer />
    </>
  );
}
