# 🍄 Mushroom Classifier 🍄

This project is an interactive web app for classifying mushrooms as edible or poisonous using a neural network trained on the classic UCI Mushroom Dataset. Built with React, TypeScript, and Vite, it allows you to explore how different mushroom features affect classification.

## Features

- **Interactive Form:** Select mushroom features from dropdowns (e.g., cap shape, color, odor, etc.)
- **Live Prediction:** See the probability of a mushroom being edible or poisonous based on your selections
- **Neural Network:** Uses [brain.js](https://github.com/BrainJS/brain.js) for in-browser machine learning
- **Data Preprocessing:** Encodes categorical features to numeric values for model compatibility

## Dataset

- Uses the [UCI Mushroom Dataset](https://archive.ics.uci.edu/dataset/73/mushroom) (`agaricus-lepiota.data`)
- The dataset is included in `public/dataset/agaricus-lepiota.data`

## How It Works

1. **Data Loading:** The app loads and preprocesses the mushroom dataset on startup.
2. **Model Training:** A neural network is trained in the browser using the processed data.
3. **User Input:** You select feature values for a hypothetical mushroom via dropdowns.
4. **Prediction:** The app encodes your selections, runs them through the trained model, and displays the probability of the mushroom being edible or poisonous.

## Running Locally

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

## Project Structure

```
public/
  dataset/
    agaricus-lepiota.data   # Mushroom dataset
src/
  App.tsx                  # Main React component
  types.ts                 # Feature types and encodings
  utils/preprocess.ts      # Data loading and preprocessing
```

## Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [brain.js](https://github.com/BrainJS/brain.js)

## Customization

- You can adjust the neural network parameters in `App.tsx` (iterations, error threshold, etc.)
- Feature encodings and dropdown options are defined in `App.tsx` and `types.ts`

## License

This project is for educational and demonstration purposes. The mushroom dataset is from the UCI Machine Learning Repository.
