import React, { useState } from "react";
import "./CalorieCalculator.css";

function CalorieCalculator() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [goal, setGoal] = useState("maintain");
    const [calories, setCalories] = useState(null);
    const [suggestion, setSuggestion] = useState("");
    const [notification, setNotification] = useState("");

const calculateCalories = () => {
    if (weight <= 0 || height <= 0 || age <= 0) {
        alert(
            "Veuillez entrer des valeurs valides supérieures à 0 pour le poids, la taille et l'âge."
        );
        return;
    }

    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let adjustedCalories = bmr;
    switch (goal) {
        case "lose":
        adjustedCalories = bmr - 500;
        setSuggestion("Un déficit calorique pour perdre du poids.");
        break;
        case "gain":
        adjustedCalories = bmr + 500;
        setSuggestion("Un surplus calorique pour prendre du poids.");
        break;
        default:
        setSuggestion("Des calories pour maintenir votre poids.");
    }

    setCalories(adjustedCalories);

    setNotification(`Calcul terminé : ${adjustedCalories.toFixed(2)} kcal/jour`);
    setTimeout(() => setNotification(""), 10000);
};

return (
    <div className="container">
        <div className="card">
        <h1 className="title">Calorie Calculator</h1>
        <div className="input-group">
            <label className="label">Poids (kg):</label>
            <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input"
            min="0"
            />
        </div>
        <div className="input-group">
            <label className="label">Taille (cm):</label>
            <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="input"
            min="0"
            />
        </div>
        <div className="input-group">
            <label className="label">Âge:</label>
            <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input"
            min="0"
            />
        </div>
        <div className="input-group">
            <label className="label">Genre:</label>
            <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select"
            >
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            </select>
        </div>
        <div className="input-group">
            <label className="label">Objectif:</label>
            <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="select"
            >
            <option value="maintain">Maintenir</option>
            <option value="lose">Perdre du poids</option>
            <option value="gain">Prendre du poids</option>
            </select>
        </div>
        <button onClick={calculateCalories} className="button">
            Calculer
        </button>
        {calories && (
            <div className="result">
            <h2>Vos besoins caloriques : {calories.toFixed(2)} kcal/jour</h2>
            <p>{suggestion}</p>
            </div>
        )}
        </div>


        {notification && <div className="notification">{notification}</div>}
    </div>
);
}

export default CalorieCalculator;

