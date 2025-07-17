import React from "react";
import { useBrainModel } from "../hooks/useBrainModel";

export type BrainModelContextType = ReturnType<typeof useBrainModel>;

export const BrainModelContext =
  React.createContext<BrainModelContextType | null>(null);

export const BrainModelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const model = useBrainModel();

  return (
    <BrainModelContext.Provider value={model}>
      {children}
    </BrainModelContext.Provider>
  );
};
