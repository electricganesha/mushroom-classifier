import { useEffect, useState } from "react";
import { loadMushroomData } from "../utils/preprocess";
import type { EncodedSample } from "../types";

type NeuralNetworkType = {
  train: (
    samples: EncodedSample[],
    options: { iterations: number; errorThresh: number; log: boolean }
  ) => void;
  run: (
    input: Record<string, number>
  ) => { edible?: number; poisonous?: number } | number[] | null;
};

// Declare the type of `window.brain` so TypeScript doesn't complain
declare global {
  interface Window {
    brain: {
      NeuralNetwork: new () => NeuralNetworkType;
    };
  }
}

export interface UseBrainModelResult {
  net: NeuralNetworkType | null; // can be null before model is trained
  status: string;
  predict: (
    input: Record<string, number>
  ) => { edible?: number; poisonous?: number } | null;
}

export function useBrainModel(): UseBrainModelResult {
  const [net, setNet] = useState<NeuralNetworkType | null>(null);
  const [status, setStatus] = useState("Loading and training model...");

  useEffect(() => {
    async function init() {
      try {
        const samples: EncodedSample[] = await loadMushroomData(
          "/dataset/agaricus-lepiota.data"
        );

        const neuralNet = new window.brain.NeuralNetwork();
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

  function predict(input: Record<string, number>) {
    if (!net) return null;
    const prediction = net.run(input);
    if (
      typeof prediction === "object" &&
      prediction !== null &&
      "edible" in prediction &&
      "poisonous" in prediction
    ) {
      return {
        edible: prediction.edible as number,
        poisonous: prediction.poisonous as number,
      };
    } else if (Array.isArray(prediction)) {
      return {
        edible: prediction[0],
        poisonous: prediction[1],
      };
    } else {
      return null;
    }
  }

  return { net, status, predict };
}
