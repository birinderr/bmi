import React, { useState } from "react";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!weight || !height || weight <= 0 || height <= 0) {
      setBmi(null);
      setCategory("Please enter valid inputs.");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue >= 18.5 && bmiValue < 24.9) setCategory("Normal");
    else if (bmiValue >= 25 && bmiValue < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100">
      <div className="p-8 rounded-2xl shadow-2xl w-96 bg-white/30 backdrop-blur-md border border-white/40">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          BMI Calculator
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Weight (kg)</label>
            <input
              type="number"
              className="w-full p-3 rounded-lg bg-white/60 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Height (cm)</label>
            <input
              type="number"
              className="w-full p-3 rounded-lg bg-white/60 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <button
            onClick={calculateBMI}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white transition-all"
          >
            Calculate BMI
          </button>

          {bmi && (
            <div className="mt-6 text-center">
              <p className="text-lg text-gray-800">
                Your BMI: <span className="font-bold">{bmi}</span>
              </p>
              <p className="text-xl font-semibold text-purple-700">{category}</p>
            </div>
          )}

          {category && !bmi && (
            <p className="text-center mt-4 text-red-500">{category}</p>
          )}
        </div>
      </div>
    </div>
  );
}