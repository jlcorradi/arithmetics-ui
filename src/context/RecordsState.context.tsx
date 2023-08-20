import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IExecutionResult } from "../model/Execution.model";
import http from "../Http";
import useDebounce from "../hooks/useDebounce";

type RecordFilter = {
  dateIni: Date;
  dateEnd: Date;
  description: string;
};

type PageInfo = {
  page: number;
  pageSize: number;
};

type PageResponse = {
  content: IExecutionResult[];
  totalElements: number;
  totalPages: number;
};

const EXECUTIONS_V1 = "/api/v1/executions";

const useRecords = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<RecordFilter>(
    {} as unknown as RecordFilter
  );
  const [pageInfo, setPageInfo] = useState<PageInfo>({ page: 0, pageSize: 10 });
  const [order, setOrder] = useState("date:DESC");
  const [records, setRecords] = useState<PageResponse>({
    content: [],
  } as unknown as PageResponse);

  const { debounce } = useDebounce();

  async function loadData() {
    try {
      const { data } = await http.get<PageResponse>(EXECUTIONS_V1, {
        params: {
          ...filter,
          ...pageInfo,
          order,
        },
      });

      setRecords(data);
    } finally {
      setIsLoading(false);
    }
  }

  const loadDataDebounce = debounce(loadData, 300);

  useEffect(() => {
    setIsLoading(true);
    loadDataDebounce();
  }, [filter, pageInfo, order]);

  useEffect(() => {
    setPageInfo({ ...pageInfo, page: 0 });
  }, [filter, order]);

  return {
    state: { filter, pageInfo, order, records, isLoading },
    actions: { setFilter, setPageInfo, setOrder },
  };
};

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

export const useRecordsContext = () => useContext(RecordStateContext);
