import React, { useState, useEffect, Suspense } from "react";
import { Toaster, toast } from "react-hot-toast";
import Header from "./components/Header";
import Features from "./components/Features";
import Prediction from "./components/Prediction";
import { featureKeys, featureOptions, featureValueMap } from "./types";
import { BrainModelContext } from "./hooks/BrainModelProvider";

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

const AppContent: React.FC = () => {
  const [sample, setSample] = useState<typeof initialSample>(initialSample);
  const [result, setResult] = useState<{
    edible?: number;
    poisonous?: number;
  } | null>(null);
  const model = React.useContext(BrainModelContext);

  useEffect(() => {
    if (model?.status) {
      toast(model.status, { id: "status-toast" });
    }
  }, [model?.status]);

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
    if (model?.net && model?.predict) {
      const translated = translateSample(sample);
      setResult(model.predict(translated));
    }
  }, [sample, model]);

  return (
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
        {model?.net && (
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
  );
};

const App: React.FC = () => {
  const BrainModelProvider = React.lazy(() =>
    import("./hooks/BrainModelProvider").then((module) => ({
      default: module.BrainModelProvider,
    }))
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Toaster position="bottom-right" />
      <Suspense fallback={<div>Loading model...</div>}>
        <BrainModelProvider>
          <AppContent />
        </BrainModelProvider>
      </Suspense>
    </div>
  );
};

export default App;
