import { useState } from "react";
import { IOperation } from "../model/Operation.model";
import http from "../Http";
import { IExecutionRequest, IExecutionResult } from "../model/Execution.model";
import { useGlobalState } from "../context/GlobalState.context";

const EXECUTIONS_V1 = "/api/v1/executions"; 

export const useExecuteOperation = () => {
  const [operation, setOperation] = useState<IOperation>(
    {} as unknown as IOperation
  );
  const [executionResult, setExecutionResult] = useState<IExecutionResult>(
    {} as unknown as IExecutionResult
  );
  const [busy, setBusy] = useState(false);
  const {
    actions: { updateUserData },
  } = useGlobalState();

  async function execute(params: number[]) {
    setBusy(true);
    try {
      let request: IExecutionRequest = {
        type: operation.operationType,
        params,
      };
      const { data } = await http.post<IExecutionResult>(EXECUTIONS_V1, request);

      setExecutionResult(data);
      updateUserData();
    } catch (err) {
    } finally {
      setBusy(false);
    }
  }

  return { operation, setOperation, executionResult, execute, busy };
};
