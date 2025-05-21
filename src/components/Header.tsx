import React from "react";

const Header: React.FC = () => (
  <div style={{ maxWidth: "50%" }}>
    <h1>🍄 Mushroom Classifier 🍄</h1>
    <p>
      This is a simple neural network model to classify mushrooms as edible or
      poisonous based on their features. The model is trained on the{" "}
      <a href="https://archive.ics.uci.edu/dataset/73/mushroom">
        UCI Mushroom dataset
      </a>{" "}
      , which contains descriptions of 23 species of gilled mushrooms in the
      Agaricus and Lepiota family. Each sample is labeled as edible or poisonous
      (with unknown edibility grouped as poisonous).
    </p>
  </div>
);

export default Header;
