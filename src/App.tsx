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

const App: React.FC = () => {
  const [net, setNet] = useState<NeuralNetworkType<
    INeuralNetworkData,
    INeuralNetworkData
  > | null>(null);
  const [status, setStatus] = useState("Loading and training...");
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
    odor: "n",
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
        setStatus("Model trained.");
      } catch (e) {
        console.error(e);
        setStatus("Failed to load dataset.");
      }
    }

    init();
  }, []);

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

  const testSample = () => {
    if (!net) return;
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
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🍄 Full Mushroom Classifier</h1>
      <p>
        This data set includes descriptions of hypothetical samples
        corresponding to 23 species of gilled mushrooms in the Agaricus and
        Lepiota Family (pp. 500-525). Each species is identified as definitely
        edible, definitely poisonous, or of unknown edibility and not
        recommended. This latter class was combined with the poisonous one. The
        Guide clearly states that there is no simple rule for determining the
        edibility of a mushroom; no rule like ``leaflets three, let it be'' for
        Poisonous Oak and Ivy.
      </p>
      <p>{status}</p>

      {net && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            testSample();
          }}
          style={{ marginBottom: "1rem" }}
        >
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
          <button type="submit">Test Sample</button>
        </form>
      )}

      {result && (
        <div>
          <strong>Prediction:</strong>
          <br />
          Edible: {Math.round((result.edible || 0) * 100)}%<br />
          Poisonous: {Math.round((result.poisonous || 0) * 100)}%
        </div>
      )}
    </div>
  );
};

export default App;
