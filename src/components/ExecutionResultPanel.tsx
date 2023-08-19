import { ExecutionResult } from "../model/Execution.model";

export interface IExecutionResultPanelProps {
  results: ExecutionResult;
}

export function ExecutionResultPanel({ results }: IExecutionResultPanelProps) {
  if (Object.keys(results).length) {
    return (
      <div className="p-5">
        <h2>Execution Results</h2>
        <p>{results.description}</p>
        <h1>{results.result}</h1>
        <p>Cost: ${results.price}</p>
        <p>Remaining User Balance: ${results.userBalance}</p>
      </div>
    );
  }
  return <></>;
}
