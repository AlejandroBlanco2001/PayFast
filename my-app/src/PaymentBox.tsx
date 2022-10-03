import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

export default function PaymentBox(props: any = {}) {
  return (
    <div>
      <div className="row">
        <div className="PaymentBox">
          <img src={props.props.image}></img>
        </div>
        <div className="PaymentBox">
          <h2>MasterCard</h2>
        </div>{" "}
        <div className="PaymentBox">
          <h2>MasterCard</h2>
        </div>
      </div>
      <div className="row">
        <div className="PaymentBox">
          <h2>MasterCard</h2>
        </div>
        <div className="PaymentBox">
          <h2>MasterCard</h2>
        </div>{" "}
        <div className="PaymentBox">
          <h2>MasterCard</h2>
        </div>
      </div>
    </div>
  );
}
