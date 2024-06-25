import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Mn5pzGewho0TU5gLY6gb4O5jFRJtsOxYQpp3eLXS2OuFfC8Q5CVeZF4tn2jrMUr99oMwNwPILll2AADx6gvqnNw00X8k5b3y5"
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
);
