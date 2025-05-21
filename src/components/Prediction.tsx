import React from "react";
import { ConfidenceChart } from "./ConfidenceChart";

interface PredictionProps {
  result: { edible?: number; poisonous?: number } | null;
}

const Prediction: React.FC<PredictionProps> = ({ result }) => {
  if (!result) return null;
  const poisonous = Math.round((result.poisonous ?? 0) * 100);
  return (
    <div
      style={{
        position: "fixed",
        bottom: "48px",
        right: "48px",
        border: "1px solid yellow",
        color: "yellow",
        padding: "16px",
        borderRadius: "8px",
        maxWidth: "240px",
      }}
    >
      <strong style={{ fontSize: "24px" }}>Prediction:</strong>
      <hr style={{ color: "yellow" }} />
      <div style={{ height: "240px", width: "100%" }}>
        <ConfidenceChart prediction={result ?? {}} />
      </div>
      <hr style={{ color: "yellow" }} />
      {poisonous > 10 ? (
        <div>
          <strong style={{ color: "red" }}>Likely poisonous!</strong>
        </div>
      ) : (
        <div>
          <strong style={{ color: "greenyellow" }}>Likely edible!</strong>
        </div>
      )}
      <div>
        <hr style={{ color: "yellow" }} />
        <div
          style={{
            color: "yellow",
            marginTop: "8px",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          <p style={{ fontSize: "24px", padding: 0, margin: 0 }}>⚠️</p>
          Do <u>NOT</u> use this app to identify and consume real mushrooms!
          <br />
          Eating wild mushrooms can be deadly. Always consult an expert.
        </div>
      </div>
    </div>
  );
};

export default Prediction;
