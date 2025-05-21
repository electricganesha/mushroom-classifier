import React from "react";
import { type featureOptions } from "../types";
interface FormProps {
  keys: string[];
  options: typeof featureOptions;
  sample: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Features: React.FC<FormProps> = ({
  keys,
  options,
  sample,
  handleInputChange,
}) => (
  <form style={{ marginBottom: "1rem" }}>
    {keys.map((key) => (
      <div key={key}>
        <label>
          {key}:{" "}
          <select name={key} value={sample[key]} onChange={handleInputChange}>
            {options[key as keyof typeof options].map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    ))}
  </form>
);

export default Features;
