import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { IOperation } from "../model/Operation.model";
import http from "../Http";

export interface IOperationDropboxProps {
  onSelectOperation: (op: IOperation) => void;
  selected?: string;
}

const OPERATIONS_V1 = "/api/v1/operations";

export default function OperationDropbox(props: IOperationDropboxProps) {
  const [operations, setOperations] = useState<IOperation[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await http.get<IOperation[]>(OPERATIONS_V1);
        setOperations(data);
      } catch (error) {}
    })();
  }, []);

  return (
    <Form.Select
      aria-label="Floating label select example"
      onChange={(e) => {
        props.onSelectOperation(
          operations.filter((o) => o.operationType === e.target.value)[0]
        );
      }}
      required
    >
      <option>Select Operation</option>
      {operations.map((op) => (
        <option key={op.operationType} value={op.operationType}>
          {op.description}
        </option>
      ))}
    </Form.Select>
  );
}
