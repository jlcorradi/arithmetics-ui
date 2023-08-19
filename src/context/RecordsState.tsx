import { PropsWithChildren, createContext } from "react";

const useRecords = () => {};

type RecordsStateType = ReturnType<typeof useRecords>;

const RecordStateContext = createContext<RecordsStateType>(
  {} as unknown as RecordsStateType
);

export const RecordStateProvider = ({ children }: PropsWithChildren) => {
  const ctx = useRecords();
  return (
    <RecordStateContext.Provider value={ctx}>
      {children}
    </RecordStateContext.Provider>
  );
};
