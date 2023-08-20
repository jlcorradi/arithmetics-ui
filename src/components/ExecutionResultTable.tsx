import { Button, Spinner } from "react-bootstrap";
import { useRecordsContext } from "../context/RecordsState.context";
import moment from "moment";

export function ExecutionResultTable() {
  const {
    state: { records, order, isLoading },
    actions: { setOrder, deleteRecord },
  } = useRecordsContext();

  function changeOrder(newOrder: string) {
    if (order.includes(newOrder)) {
      setOrder(`${newOrder}:DESC`);
    } else {
      setOrder(`${newOrder}:ASC`);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="container text-center m-2">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col" onClick={() => changeOrder("id")}>
              #
            </th>
            <th scope="col" onClick={() => changeOrder("date")}>
              Date
            </th>
            <th scope="col" onClick={() => changeOrder("description")}>
              Description
            </th>
            <th scope="col" onClick={() => changeOrder("operationResponse")}>
              Result
            </th>
            <th scope="col" onClick={() => changeOrder("price")}>
              Cost
            </th>
            <th scope="col" onClick={() => changeOrder("userBalance")}>
              Balance
            </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.content.map((record) => (
            <tr key={record.id}>
              <th scope="row">{record.id}</th>
              <td>{moment(record.date).fromNow()}</td>
              <td>{record.description}</td>
              <td>{record.result}</td>
              <td>${record.price}</td>
              <td>${record.userBalance}</td>
              <td>
                <Button
                  size="sm"
                  variant="link"
                  onClick={(e) => deleteRecord(record)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
