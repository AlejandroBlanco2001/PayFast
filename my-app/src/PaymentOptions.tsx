import React from "react";
import ReactDOM from "react-dom/client";
import PaymentBox from "./PaymentBox";
import "./index.css";

export default function PaymentOption() {
  let props = {
    name: "MasterCard",
    image:
      "https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo.png",
  };
  return (
    <div className="PaymentOption">
      <PaymentBox props={props}></PaymentBox>
    </div>
  );
}
