import { useState } from "react";
import { Operation } from "../model/Operation.model";
import http from "../Http";
import { ExecutionRequest, ExecutionResult } from "../model/Execution.model";
import { useGlobalState } from "../context/GlobalState";

const EXECUTIONS_V1 = "/api/v1/executions";

export const useExecuteOperation = () => {
  const [operation, setOperation] = useState<Operation>(
    {} as unknown as Operation
  );
  const [executionResult, setExecutionResult] = useState<ExecutionResult>(
    {} as unknown as ExecutionResult
  );
  const [busy, setBusy] = useState(false);
  const {
    actions: { updateUserData },
  } = useGlobalState();

  async function execute(params: number[]) {
    setBusy(true);
    try {
      let request: ExecutionRequest = {
        type: operation.operationType,
        params,
      };
      const { data } = await http.post<ExecutionResult>(EXECUTIONS_V1, request);

      setExecutionResult(data);
      updateUserData();
    } catch (err) {
    } finally {
      setBusy(false);
    }
  }

  return { operation, setOperation, executionResult, execute, busy };
};
