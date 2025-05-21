import papa from "papaparse";
import { COLUMN_NAMES, type EncodedSample, type MushroomRow } from "../types";

export async function loadMushroomData(
  csvUrl: string
): Promise<EncodedSample[]> {
  return new Promise((resolve, reject) => {
    papa.parse<MushroomRow>(csvUrl, {
      download: true,
      dynamicTyping: false,
      complete: (results) => {
        const data = results.data.filter(
          (row) => row.length === COLUMN_NAMES.length
        );

        // Build feature maps (label encoding)
        const featureMaps: Record<string, Record<string, number>> = {};
        for (let col = 1; col < COLUMN_NAMES.length; col++) {
          const values = Array.from(new Set(data.map((row) => row[col])));
          featureMaps[COLUMN_NAMES[col]] = {};
          values.forEach((val, i) => {
            featureMaps[COLUMN_NAMES[col]][val] = i / (values.length - 1 || 1);
          });
        }

        // Encode samples
        const encoded = data.map((row): EncodedSample => {
          const input: Record<string, number> = {};
          for (let col = 1; col < COLUMN_NAMES.length; col++) {
            const key = COLUMN_NAMES[col];
            input[key] = featureMaps[key][row[col]];
          }

          return {
            input,
            output: row[0] === "e" ? { edible: 1 } : { poisonous: 1 },
          };
        });

        resolve(encoded);
      },
      error: reject,
    });
  });
}
