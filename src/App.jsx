import React, { useState } from "react";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [unit, setUnit] = useState("metric");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const healthTips = {
    Underweight: "You're underweight. Consider a nutritious, calorie-rich diet.",
    Normal: "Great job! You're maintaining a healthy weight.",
    Overweight: "You are slightly overweight. Consider regular exercise and a balanced diet.",
    Obese: "BMI is in the obese range. Consider consulting a healthcare provider.",
  };

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h || w <= 0 || h <= 0) {
      setBmi(null);
      setCategory("Please enter valid inputs.");
      return;
    }

    let bmiValue = 0;

    if (unit === "metric") {
      const heightInMeters = h / 100;
      bmiValue = w / (heightInMeters * heightInMeters);
    } else {
      // Imperial: BMI = (lbs / (inches^2)) * 703
      bmiValue = (w / (h * h)) * 703;
    }

    bmiValue = bmiValue.toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 24.9) setCategory("Normal");
    else if (bmiValue < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100">
      <div className="p-8 rounded-2xl shadow-2xl w-full max-w-md bg-white/30 backdrop-blur-md border border-white/40">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          BMI Calculator
        </h1>

        <div className="space-y-4">
          {/* Unit System */}
          <div>
            <label className="block mb-1 text-gray-700">Unit System</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/60 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, inches)</option>
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block mb-1 text-gray-700">
              Weight ({unit === "metric" ? "kg" : "lbs"})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/60 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block mb-1 text-gray-700">
              Height ({unit === "metric" ? "cm" : "inches"})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/60 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block mb-1 text-gray-700">Age (optional)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/60 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 text-gray-700">Gender (optional)</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/60 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateBMI}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white transition-all"
          >
            Calculate BMI
          </button>

          {/* Results */}
          {bmi && (
            <div className="mt-6 text-center">
              <p className="text-lg text-gray-800">
                Your BMI: <span className="font-bold">{bmi}</span>
              </p>
              <p className="text-xl font-semibold text-purple-700">{category}</p>
              {healthTips[category] && (
                <p className="text-sm text-gray-700 mt-2">
                  {healthTips[category]}
                </p>
              )}
            </div>
          )}

          {/* Validation message */}
          {category && !bmi && (
            <p className="text-center mt-4 text-red-500">{category}</p>
          )}
        </div>
      </div>
    </div>
  );
}
