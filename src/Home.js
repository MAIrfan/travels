import { useEffect, useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { Container, Navbar, Tab, Tabs, Alert, Button } from "react-bootstrap";
import DriverPage from "./DriverPage";
import InvoicePage from "./InvoicePage";
import ChargesPage from "./ChargesPage";
import PdfRenderer from "./PdfRenderer";

function Home() {
  const [invoices, setInvoices] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [response, setResponse] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [charges, setCharges] = useState({
    rideFare: "349",
    rideTimeFare: "0",
    airportServiceCharge: "30",
    airportParkingCharge: "250",
    surge: "1153.55",
    tax: "17.45",
  });

  useEffect(() => {
    axios
      .get("https://travels-api.onrender.com/api/invoices")
      .then((response) => setInvoices(response.data))
      .catch((error) => console.log(error));
    axios
      .get("https://travels-api.onrender.com/api/drivers")
      .then((response) => setDrivers(response.data))
      .catch((error) => console.log(error));
  }, [response]);

  useEffect(() => {
    let timer;
    if (response) {
      timer = setTimeout(() => {
        setResponse(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [response]);

  useEffect(() => {
    if (response?.status === 200) {
      setSelectedRecord(response.data);
    }
  }, [response, selectedRecord]);

  const getAlert = () => {
    if (!response) return null;

    if (response.status === 200)
      return <Alert variant="success">Record created successfully.</Alert>;
    else return <Alert variant="danger">Record failed to create.</Alert>;
  };

  const handleGenerateInvoice = () => {
    var element = document.getElementById("pdf");
    var opt = {
      margin: 0,
      filename: `${selectedRecord.name}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
  };

  return (
    <Container fluid style={{ fontFamily: "roboto", width: "90%" }}>
      <Navbar>
        <Navbar.Brand
          href="#home"
          style={{
            fontSize: "2em",
            fontWeight: "bold",
            color: "red",
            textShadow: "2px 2px #fff000",
          }}
        >
          9STAR TRAVELS
        </Navbar.Brand>
      </Navbar>
      {getAlert()}
      <div className="d-flex">
        <div className="w-100">
          <Tabs
            defaultActiveKey="invoices"
            id="uncontrolled-tab-example"
            className="mt-5"
          >
            <Tab eventKey="invoices" title="Invoices">
              <InvoicePage
                invoices={invoices}
                drivers={drivers}
                response={response}
                setResponse={setResponse}
                selectedRecord={selectedRecord}
                setSelectedRecord={setSelectedRecord}
                charges={charges}
              />
            </Tab>
            <Tab eventKey="drivers" title="Drivers">
              <DriverPage drivers={drivers} setResponse={setResponse} />
            </Tab>
            <Tab eventKey="charges" title="Charges">
              <ChargesPage charges={charges} setCharges={setCharges} />
            </Tab>
          </Tabs>
        </div>
        {selectedRecord?._id && (
          <div className="w-75 mt-5 px-4">
            <div className="d-flex justify-content-between">
              <h3 className="d-inline-block">Preview</h3>
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedRecord(null)}
                >
                  Close
                </Button>
                {selectedRecord && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="mx-3"
                    onClick={handleGenerateInvoice}
                  >
                    Generate Invoice
                  </Button>
                )}
              </div>
            </div>
            {selectedRecord?._id && (
              <PdfRenderer
                id={selectedRecord._id}
                name={selectedRecord.name}
                mobile={selectedRecord.mobile}
                driverName={selectedRecord.driver.name}
                driverMobile={selectedRecord.driver.mobile}
                vehicle={selectedRecord.driver.vehicle}
                pickup={selectedRecord.pickup}
                drop={selectedRecord.drop}
                ride={charges.rideFare}
                rideTime={charges.rideTimeFare}
                airportServiceCharge={charges.airportServiceCharge}
                airportParkingCharge={charges.airportParkingCharge}
                surge={charges.surge}
                tax={charges.tax}
              />
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
export default Home;
