import React from "react";
import moment from "moment";

const PdfRenderer = ({ id, crn_no, name, mobile, driverName, driverMobile, vehicle, pickup, drop, ride, rideTime, airportServiceCharge, airportParkingCharge, surge, tax }) => {
  const currentDate = moment().format("DD-MMM-YYYY");

  return (
    <div id="pdf">
      <div
        style={{ fontSize: "1rem", fontFamily: "cursive", margin: "2rem" }}
      >
        <header style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div
              style={{
                fontSize: "2em",
                fontWeight: "bold",
                color: "red",
                textShadow: "2px 2px #fff000",
              }}
            >
              9STAR TRAVELS
            </div>
            <div>RidePlus Technologies (P) Ltd,</div>
            <div style={{ width: 300, marginTop: 10 }}>
              59srt Prakash Nagar, Begumpet, Secunderabad, Hyderabad, 500016.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              height: 70,
              marginTop: 35,
              lineHeight: "1.6",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span>GST No:-</span>
              <span>SAC Code:-</span>
              <span>Service Tax Cab:-</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginLeft: 6,
              }}
            >
              <b>36AAKCR1259H1Z7</b>
              <b>996601</b>
              <b>business auxiliary services</b>
            </div>
          </div>
        </header>
        <hr />
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            lineHeight: "1.6",
          }}
        >
          <div>
            <div>Invoice Id:-</div>
            <b>{id}</b>
          </div>
          <div>
            <div>CRN No:-</div>
            <b>{crn_no}</b>
          </div>
          <div style={{ textAlign: "end" }}>
            <div>Invoice Date:-</div>
            <b>{currentDate}</b>
          </div>
        </section>
        <hr />
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            lineHeight: "1.6",
          }}
        >
          <div>
            <div>Customer Name:-</div>
            <b>{name}</b>
          </div>
          <div>
            <div>Mobile Number:-</div>
            <b style={{ textAlign: "end" }}>+91 {mobile}</b>
          </div>
        </section>
        <hr />
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            lineHeight: "1.6",
          }}
        >
          <div>
            <div>Driver Details:-</div>
            <div>
              <span>Name:-</span>
              <b style={{ marginLeft: 4 }}>{driverName}</b>
            </div>
            <div>
              <span>Vehicle:-</span>
              <b style={{ marginLeft: 4 }}>
                {vehicle}
              </b>
            </div>
          </div>
          <div>
            <div>Mobile Number:-</div>
            <b style={{ textAlign: "end" }}>+91 {driverMobile}</b>
          </div>
        </section>
        <hr />
        <section>
          <div style={{ lineHeight: "1.6" }}>
            <div>Pickup Location:-</div>
            <b>{pickup}</b>
            <div>Drop Location:-</div>
            <b>{drop}</b>
          </div>
        </section>
        <section>
          <hr />
          <h3>Fare Breakdown</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              lineHeight: 2,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <b>Ride Fare</b>
              <b>Ride Time Fare</b>
              <b>Airport Service Charge</b>
              <b>Airport Parking Charges</b>
              <b>Surge</b>
              <b>Tax</b>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "end",
              }}
            >
              <span>₹ {ride}</span>
              <span>₹ {rideTime}</span>
              <span>₹ {airportServiceCharge}</span>
              <span>₹ {airportParkingCharge}</span>
              <span>₹ {surge}</span>
              <span>₹ {tax}</span>
            </div>
          </div>
        </section>
        <section>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <b>Final Amount</b>
            <b>₹ {parseFloat(ride) + parseFloat(rideTime) + parseFloat(airportServiceCharge) + parseFloat(airportParkingCharge) + parseFloat(surge) + parseFloat(tax)}</b>
          </div>
        </section>
        <footer style={{ textAlign: "center", marginTop: 50 }}>
          <hr />
          <span>Than You - RidePlus Technologies (P) Ltd</span>
        </footer>
      </div>
    </div>
  );
};

export default PdfRenderer;
