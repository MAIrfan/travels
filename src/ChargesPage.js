import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";

const ChargesPage = ({ charges, setCharges }) => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

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
      handleClose();
    }
  };

  return (
    <>
      <Container fluid style={{ fontSize: "1.2rem" }}>
        <Row>
          <Col className="p-5">
            <b>Ride Fare:</b> ₹{charges.rideFare}
          </Col>
          <Col className="p-5">
            <b>Ride Time Fare:</b> ₹{charges.rideTimeFare}
          </Col>
        </Row>
        <Row>
          <Col className="p-5">
            <b>Airport Parking Charge:</b> ₹{charges.airportParkingCharge}
          </Col>
          <Col className="p-5">
            <b>Airport Service Charge:</b> ₹{charges.airportServiceCharge}
          </Col>
        </Row>
        <Row>
          <Col className="p-5">
            <b>Surge:</b> ₹{charges.surge}
          </Col>
          <Col className="p-5">
            <b>Tax:</b> ₹{charges.tax}
          </Col>
        </Row>
      </Container>
      <Button variant="primary" className="m-2 w-100" onClick={handleShow}>
        Edit
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Charges</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="validationRideFare">
              <Form.Label>Ride Fare</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter ride fare"
                value={charges.rideFare}
                onChange={(event) =>
                  setCharges((prevState) => ({
                    ...prevState,
                    rideFare: event.target.value,
                  }))
                }
              />
              <Form.Control.Feedback type="invalid">
                Ride fare is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationRideTimeFare">
              <Form.Label>Ride Time Fare</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter ride time fare"
                value={charges.rideTimeFare}
                onChange={(event) =>
                  setCharges((prevState) => ({
                    ...prevState,
                    rideTimeFare: event.target.value,
                  }))
                }
              />
              <Form.Control.Feedback type="invalid">
                Ride Time Fare is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="validationAirportParkingCharge"
            >
              <Form.Label>Airport Parking Charge</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter airport parking charge"
                  required
                  value={charges.airportParkingCharge}
                  onChange={(event) =>
                    setCharges((prevState) => ({
                      ...prevState,
                      airportParkingCharge: event.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Airport Parking Charge is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="validationAirportServiceCharge"
            >
              <Form.Label>Airport Service Charge</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter airport service charge"
                  required
                  value={charges.airportServiceCharge}
                  onChange={(event) =>
                    setCharges((prevState) => ({
                      ...prevState,
                      airportServiceCharge: event.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Airport service charge is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationSurge">
              <Form.Label>Surge</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter surge"
                  required
                  value={charges.surge}
                  onChange={(event) =>
                    setCharges((prevState) => ({
                      ...prevState,
                      surge: event.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Surge is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationTax">
              <Form.Label>Tax</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter tax"
                  required
                  value={charges.tax}
                  onChange={(event) =>
                    setCharges((prevState) => ({
                      ...prevState,
                      tax: event.target.value,
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Tax is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ChargesPage;
