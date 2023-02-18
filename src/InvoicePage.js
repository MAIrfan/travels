import { useState } from "react";
import axios from "axios";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Table, Button, Modal, Form, ListGroup } from "react-bootstrap";
import Divider from "./Divider";

const InvoicePage = ({
  invoices = [],
  drivers = [],
  setResponse,
  setSelectedRecord,
}) => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [active, setActive] = useState("");
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    pickup: "",
    drop: "",
    driver: "",
  });
  const apiKey = "YOURAPIKEY";
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey,
    });

  const handleClose = () => {
    setShow(false);
    setValidated(false);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (event.currentTarget.checkValidity() === true) {
      axios
        .post("https://travels-api.onrender.com/api/invoices", form)
        .then((response) => {
          setResponse(response);
          setSelectedRecord(response);
          handleClose();
        })
        .catch((error) => setResponse(error));
    }
  };

  const renderList = (field) => {
    if (isPlacePredictionsLoading)
      return (
        <ListGroup
          as="ul"
          className="position-absolute w-100"
          style={{ zIndex: 99 }}
        >
          <ListGroup.Item as="li">Please wait, loading...</ListGroup.Item>
        </ListGroup>
      );

    return (
      <ListGroup
        as="ul"
        className="position-absolute w-100"
        style={{ zIndex: 99 }}
      >
        {!isPlacePredictionsLoading &&
          placePredictions.map((place) => (
            <ListGroup.Item
              key={place.place_id}
              as="li"
              variant="light"
              action
              onClick={() => {
                setForm((prevState) => ({
                  ...prevState,
                  [field]: place.description,
                }));
                getPlacePredictions({ input: "" });
              }}
            >
              {place.description}
            </ListGroup.Item>
          ))}
      </ListGroup>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4 className="mt-3">Invoices</h4>
        <Button
          variant="primary"
          size="sm"
          className="m-2"
          onClick={handleShow}
        >
          Create Invoice
        </Button>
      </div>
      <Divider />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Customer Mobile</th>
            <th>Pickup Location</th>
            <th>Drop Location</th>
            <th>Driver Name</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice._id}</td>
              <td>{invoice.name}</td>
              <td>{invoice.mobile}</td>
              <td>{invoice.pickup}</td>
              <td>{invoice.drop}</td>
              <td>{invoice.driver.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Customer Details:</h5>
            <Divider />
            <Form.Group className="mb-3" controlId="formCustomerName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter customer name"
                onChange={(event) =>
                  setForm((prevState) => ({
                    ...prevState,
                    name: event.target.value,
                  }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCustomerMobile">
              <Form.Label>Customer Mobile</Form.Label>
              <Form.Control
                required
                type="mobile"
                placeholder="Enter customer mobile number"
                onChange={(event) =>
                  setForm((prevState) => ({
                    ...prevState,
                    mobile: event.target.value,
                  }))
                }
              />
            </Form.Group>

            <h5 className="mt-5">Location Details:</h5>
            <Divider />
            <Form.Group
              className="mb-3 position-relative"
              controlId="formPickup"
            >
              <Form.Label>Pickup Location</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Search pickup location here..."
                value={form.pickup}
                onChange={(event) => {
                  getPlacePredictions({ input: event.target.value });
                  setForm((prevState) => ({
                    ...prevState,
                    pickup: event.target.value,
                  }));
                  setActive("pickup");
                }}
              />
              {active === "pickup" && renderList("pickup")}
            </Form.Group>
            <Form.Group className="mb-3 position-relative" controlId="formDrop">
              <Form.Label>Drop Location</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Search drop location here..."
                value={form.drop}
                onChange={(event) => {
                  getPlacePredictions({ input: event.target.value });
                  setForm((prevState) => ({
                    ...prevState,
                    drop: event.target.value,
                  }));
                  setActive("drop");
                }}
              />
              {active === "drop" && renderList("drop")}
            </Form.Group>

            <h5 className="mt-5">Driver Details:</h5>
            <Divider />
            <Form.Group className="mb-3" controlId="formDrop">
              <Form.Select
                aria-label="Default select example"
                required
                onChange={(event) =>
                  setForm((prevState) => ({
                    ...prevState,
                    driver: event.target.value,
                  }))
                }
              >
                <option>Choose driver...</option>
                {drivers.map((driver) => (
                  <option
                    key={driver._id}
                    value={driver._id}
                  >{`${driver.name} - ${driver.vehicle}`}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default InvoicePage;
