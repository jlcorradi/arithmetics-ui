import { RecordStateProvider } from "../context/RecordsState";

export interface IHistoryViewProps {}

export function HistoryView(props: IHistoryViewProps) {
  return (
    <RecordStateProvider>
      <h4 className="pt-3">Operation Execution History</h4>
    </RecordStateProvider>
  );
}
