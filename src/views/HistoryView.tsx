import { ExecutionResultFilterEditor } from "../components/ExecutionResultFilterEditor";
import { ExecutionResultTable } from "../components/ExecutionResultTable";
import { PageControlPanel } from "../components/PageControlPanel";
import {
  RecordStateProvider,
} from "../context/RecordsState.context";

export function HistoryView() {
  return (
    <RecordStateProvider>
      <h4 className="pt-4 pb-4">Operation Execution History</h4>
      <ExecutionResultFilterEditor></ExecutionResultFilterEditor>
      <ExecutionResultTable></ExecutionResultTable>
      <PageControlPanel></PageControlPanel>
    </RecordStateProvider>
  );
}
