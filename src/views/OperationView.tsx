import Form from "react-bootstrap/Form";
import OperationDropbox from "../components/OperationDropbox";
import { useExecuteOperation } from "../hooks/useExecuteOperation";
import { SyntheticEvent, useState } from "react";
import { Button, FormGroup, Spinner } from "react-bootstrap";
import { ExecutionResultPanel } from "../components/ExecutionResultPanel";

export interface IOperationViewProps {}

export function OperationView(props: IOperationViewProps) {
  const { operation, setOperation, executionResult, busy, execute } =
    useExecuteOperation();
  const [param1, setParam1] = useState("");
  const [param2, setParam2] = useState("");

  function resolveParamValue(text: string) {
    const regex = /[-\d.]+/g;
    const numbersArray = text.match(regex);
    if (numbersArray) {
      return numbersArray.join("");
    }
    return "";
  }

  function submit(e: SyntheticEvent) {
    e.preventDefault();
    let params = [Number.parseFloat(param1)];
    if (operation?.paramsQuantity === 2) {
      params.push(Number.parseFloat(param2));
    }
    execute(params);
    setParam1("");
    setParam2("");
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="p-5">
          <h2>Operation</h2>
          <Form onSubmit={submit}>
            <OperationDropbox
              onSelectOperation={setOperation}
              selected={operation?.operationType}
            ></OperationDropbox>
            <Form.Group
              className="mb-3 mt-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>First Param</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Param"
                value={param1}
                onChange={(e) => setParam1(resolveParamValue(e.target.value))}
                required
              />
            </Form.Group>
            {operation?.paramsQuantity === 2 && (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Second Param</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Second Param"
                  value={param2}
                  onChange={(e) => setParam2(resolveParamValue(e.target.value))}
                  required
                />
              </Form.Group>
            )}

            <FormGroup className="mb-3 py-2">
              <Button
                type="submit"
                className="btn btn-success"
                disabled={!operation || busy}
              >
                {busy && (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                Execute Operation
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
      <div className="col-md-6 text-center">
        <ExecutionResultPanel results={executionResult}></ExecutionResultPanel>
      </div>
    </div>
  );
}
