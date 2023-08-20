import { Pagination } from "react-bootstrap";
import { useRecordsContext } from "../context/RecordsState.context";

export function PageControlPanel() {
  const {
    state: {
      pageInfo,
      records: { totalPages },
    },
    actions: { setPageInfo },
  } = useRecordsContext();

  let pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-9">
          <Pagination>
            <Pagination.First
              onClick={() => setPageInfo({ ...pageInfo, page: 0 })}
            />
            <Pagination.Prev
              onClick={() =>
                setPageInfo({
                  ...pageInfo,
                  page: pageInfo.page > 0 ? pageInfo.page - 1 : 0,
                })
              }
            />

            {pages.map((i) => (
              <Pagination.Item
                key={i}
                active={i === pageInfo.page}
                onClick={() => setPageInfo({ ...pageInfo, page: i })}
              >
                {i}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() =>
                setPageInfo({
                  ...pageInfo,
                  page:
                    pageInfo.page < totalPages - 1
                      ? pageInfo.page + 1
                      : totalPages - 1,
                })
              }
            />
            <Pagination.Last
              onClick={() => setPageInfo({ ...pageInfo, page: totalPages - 1 })}
            />
          </Pagination>
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            onChange={(e) =>
              setPageInfo({
                pageSize: Number.parseInt(e.target.value),
                page: 0,
              })
            }
          >
            <option value={10}>10 Items per page</option>
            <option value={20}>20 Items per page</option>
            <option value={50}>50 Items per page</option>
            <option value={100}>100 Items per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
