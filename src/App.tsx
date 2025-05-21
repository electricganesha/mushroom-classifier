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
import Header from "./components/Header";
import Features from "./components/Features";
import Prediction from "./components/Prediction";

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
        <Header />
        <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
          {net && (
            <Features
              keys={featureKeys}
              options={featureOptions}
              sample={sample}
              handleInputChange={handleInputChange}
            />
          )}
          <Prediction result={result} />
        </div>
      </div>
    </div>
  );
};

export default App;
