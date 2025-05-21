import React, { useEffect, useState } from "react";
import { NeuralNetwork } from "brain.js";
import { loadMushroomData } from "./utils/preprocess";
import {
  featureKeys,
  featureOptions,
  featureValueMap,
  type EncodedSample,
} from "./types";
import type { NeuralNetwork as NeuralNetworkType } from "brain.js";
import type { INeuralNetworkData } from "brain.js/dist/neural-network";
import { Toaster, toast } from "react-hot-toast";

const App: React.FC = () => {
  const [net, setNet] = useState<NeuralNetworkType<
    INeuralNetworkData,
    INeuralNetworkData
  > | null>(null);
  const [status, setStatus] = useState("Loading and training model...");
  const [result, setResult] = useState<{
    edible?: number;
    poisonous?: number;
  } | null>(null);

  // 2. Initial sample uses codes, not numbers
  const initialSample: { [K in keyof typeof featureOptions]: string } = {
    "cap-shape": "x",
    "cap-surface": "s",
    "cap-color": "n",
    bruises: "t",
    odor: "c",
    "gill-attachment": "f",
    "gill-spacing": "c",
    "gill-size": "b",
    "gill-color": "k",
    "stalk-shape": "e",
    "stalk-root": "e",
    "stalk-surface-above-ring": "s",
    "stalk-surface-below-ring": "s",
    "stalk-color-above-ring": "w",
    "stalk-color-below-ring": "w",
    "veil-type": "p",
    "veil-color": "w",
    "ring-number": "o",
    "ring-type": "p",
    "spore-print-color": "k",
    population: "s",
    habitat: "u",
  };

  const [sample, setSample] = useState<typeof initialSample>(initialSample);

  useEffect(() => {
    async function init() {
      try {
        const samples: EncodedSample[] = await loadMushroomData(
          "/dataset/agaricus-lepiota.data"
        );

        const neuralNet = new NeuralNetwork();
        neuralNet.train(samples, {
          iterations: 2000,
          errorThresh: 0.005,
          log: true,
        });

        setNet(neuralNet);
        setStatus("Model trained successfully ✅");
      } catch (e) {
        console.error(e);
        setStatus("Failed to load dataset ⛔");
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (status) {
      toast(status, { id: "status-toast" });
    }
  }, [status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSample((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Translate codes to numbers before prediction
  const translateSample = (sample: typeof initialSample) => {
    const result: Record<string, number> = {};
    for (const key of featureKeys) {
      result[key] =
        featureValueMap[key][
          sample[key] as keyof (typeof featureValueMap)[typeof key]
        ];
    }
    return result;
  };

  useEffect(() => {
    if (net) {
      const prediction = net.run(translateSample(sample));
      if (
        typeof prediction === "object" &&
        prediction !== null &&
        "edible" in prediction &&
        "poisonous" in prediction
      ) {
        setResult({
          edible: prediction.edible,
          poisonous: prediction.poisonous,
        });
      } else if (Array.isArray(prediction)) {
        setResult({
          edible: prediction[0],
          poisonous: prediction[1],
        });
      } else {
        setResult(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sample, net]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Toaster position="bottom-right" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          textAlign: "center",
          height: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "50%" }}>
          <h1>🍄 Mushroom Classifier 🍄</h1>
          <p>
            This is a simple neural network model to classify mushrooms as
            edible or poisonous based on their features. The model is trained on
            the{" "}
            <a href="https://archive.ics.uci.edu/dataset/73/mushroom">
              UCI Mushroom dataset
            </a>{" "}
            , which contains descriptions of 23 species of gilled mushrooms in
            the Agaricus and Lepiota family. Each sample is labeled as edible or
            poisonous (with unknown edibility grouped as poisonous).
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
          {net && (
            <form style={{ marginBottom: "1rem" }}>
              {featureKeys.map((key) => (
                <div key={key}>
                  <label>
                    {key}:{" "}
                    <select
                      name={key}
                      value={sample[key]}
                      onChange={handleInputChange}
                    >
                      {(
                        featureOptions[key] as ReadonlyArray<{
                          label: string;
                          value: string;
                        }>
                      ).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ))}
            </form>
          )}
          {result && (
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ color: "greenyellow" }}>
                  Edible: {Math.round((result.edible ?? 0) * 100)}%<br />
                </span>
                <span style={{ color: "red" }}>
                  Poisonous: {Math.round((result.poisonous ?? 0) * 100)}%
                </span>
              </div>
              <hr style={{ color: "yellow" }} />
              {Math.round((result.poisonous ?? 0) * 100) > 10 ? (
                <div>
                  <strong style={{ color: "red" }}>
                    Warning: This mushroom is likely poisonous!
                  </strong>
                </div>
              ) : (
                <div>
                  <strong style={{ color: "greenyellow" }}>
                    This mushroom is likely edible!
                  </strong>
                  <hr style={{ color: "yellow" }} />
                  <div>
                    <div
                      style={{
                        color: "orange",
                        marginTop: "8px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      <p style={{ fontSize: "24px", padding: 0, margin: 0 }}>
                        ⚠️
                      </p>
                      Do <u>NOT</u> use this app to identify real mushrooms!
                      <br />
                      Eating wild mushrooms can be deadly. Always consult an
                      expert.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
