import { Accordion, Form } from "react-bootstrap";
import { useRecordsContext } from "../context/RecordsState.context";
import moment from "moment";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

export function ExecutionResultFilterEditor() {
  const {
    state: { filter },
    actions: { setFilter },
  } = useRecordsContext();

  const [dateIni, setDateIni] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [description, setDescription] = useState(filter.description);

  const { debounce } = useDebounce();

  return (
    <Accordion defaultActiveKey={["0"]} className="mb-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Filters</Accordion.Header>
        <Accordion.Body>
          <Form className="d-flex">
            <Form.Control
              type="date"
              placeholder="From Date"
              className="me-2"
              aria-label="dateIni"
              datatype="date"
              value={dateIni}
              onChange={(e) => {
                setDateIni(e.target.value);
                setFilter({ ...filter, dateIni: new Date(e.target.value) });
              }}
            />
            <Form.Control
              type="date"
              placeholder="From Date"
              className="me-2"
              aria-label="dateEnd"
              value={dateEnd}
              onChange={(e) => {
                setDateEnd(e.target.value);
                setFilter({ ...filter, dateEnd: new Date(e.target.value) });
              }}
            />
            <Form.Control
              type="text"
              placeholder="Text"
              className="me-2"
              aria-label="Text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                debounce(
                  () => setFilter({ ...filter, description: e.target.value }),
                  900
                )();
              }}
            />
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
