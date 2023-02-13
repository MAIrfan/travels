import { useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, InputGroup } from "react-bootstrap";
import Divider from "./Divider";

const DriverPage = ({ drivers, setResponse }) => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    vehicle: "",
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
        .post("https://travels-api.onrender.com/api/drivers", form)
        .then((response) => {
          setResponse(response);
          handleClose();
        })
        .catch((error) => setResponse(error));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4 className="mt-3">Drivers</h4>
        <Button
          variant="primary"
          size="sm"
          className="m-2"
          onClick={handleShow}
        >
          Create Driver
        </Button>
      </div>
      <Divider />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Driver Name</th>
            <th>Driver Mobile</th>
            <th>Driver Vehicle</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver._id}>
              <td>{driver._id}</td>
              <td>{driver.name}</td>
              <td>{driver.mobile}</td>
              <td>{driver.vehicle}</td>
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
            <Modal.Title>Create Driver</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="validationDriverName">
              <Form.Label>Driver name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter driver name"
                onChange={(event) =>
                  setForm((prevState) => ({
                    ...prevState,
                    name: event.target.value,
                  }))
                }
              />
              <Form.Control.Feedback type="invalid">
                Driver name is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationDriverMobile">
              <Form.Label>Driver Mobile</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter mobile name"
                onChange={(event) =>
                  setForm((prevState) => ({
                    ...prevState,
                    mobile: event.target.value,
                  }))
                }
              />
              <Form.Control.Feedback type="invalid">
                Driver mobile is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationDriverVehicle">
              <Form.Label>Driver Vehicle</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter vehicle details"
                  required
                  onChange={(event) =>
                    setForm((prevState) => ({
                      ...prevState,
                      vehicle: event.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Driver vehicle detail is required
                </Form.Control.Feedback>
              </InputGroup>
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

export default DriverPage;
