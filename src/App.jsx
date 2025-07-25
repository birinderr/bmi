import React, { useState } from "react";
import { Calculator, Heart, BarChart3, User, Scale, Ruler, Info, RotateCcw, TrendingUp } from "lucide-react";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [unit, setUnit] = useState("metric");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [showTable, setShowTable] = useState(false);

  const healthTips = {
    Underweight: {
      text: "You're underweight. Consider a nutritious, calorie-rich diet with healthy fats and proteins.",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200"
    },
    Normal: {
      text: "Excellent! You're maintaining a healthy weight. Keep up the good work!",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200"
    },
    Overweight: {
      text: "You are slightly overweight. Consider regular exercise and a balanced diet.",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200"
    },
    Obese: {
      text: "BMI is in the obese range. Consider consulting a healthcare provider for guidance.",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200"
    },
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
      bmiValue = (w / (h * h)) * 703;
    }

    bmiValue = bmiValue.toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 24.9) setCategory("Normal");
    else if (bmiValue < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  const resetAll = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("");
    setUnit("metric");
    setBmi(null);
    setCategory("");
  };

  const getCategoryColor = () => {
    if (category === "Underweight") return "bg-yellow-500";
    if (category === "Normal") return "bg-green-500";
    if (category === "Overweight") return "bg-orange-500";
    if (category === "Obese") return "bg-red-500";
    return "bg-gray-300";
  };

  const getBMIPosition = () => {
    if (!bmi) return 0;
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return (bmiNum / 18.5) * 25;
    if (bmiNum < 25) return 25 + ((bmiNum - 18.5) / 6.5) * 25;
    if (bmiNum < 30) return 50 + ((bmiNum - 25) / 5) * 25;
    return Math.min(75 + ((bmiNum - 30) / 10) * 25, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">BMI Calculator</h1>
          <p className="text-gray-600">Calculate your Body Mass Index and get health insights</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/50">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Personal Information
            </h2>

            <div className="space-y-6">
              {/* Unit Selection */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Unit System</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("metric")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      unit === "metric"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="text-sm font-medium">Metric</div>
                    <div className="text-xs text-gray-500">kg, cm</div>
                  </button>
                  <button
                    onClick={() => setUnit("imperial")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      unit === "imperial"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="text-sm font-medium">Imperial</div>
                    <div className="text-xs text-gray-500">lbs, inches</div>
                  </button>
                </div>
              </div>

              {/* Weight Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                  <Scale className="w-4 h-4 mr-1" />
                  Weight ({unit === "metric" ? "kg" : "lbs"})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === "metric" ? "Enter weight in kg" : "Enter weight in lbs"}
                  className="w-full p-4 rounded-xl bg-white border border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Height Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                  <Ruler className="w-4 h-4 mr-1" />
                  Height ({unit === "metric" ? "cm" : "inches"})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === "metric" ? "Enter height in cm" : "Enter height in inches"}
                  className="w-full p-4 rounded-xl bg-white border border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Age and Gender Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Age (optional)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                    className="w-full p-4 rounded-xl bg-white border border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Gender (optional)</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white border border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={calculateBMI}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate BMI
                </button>
                <button
                  onClick={resetAll}
                  className="px-6 py-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 flex items-center justify-center"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* BMI Result */}
            {bmi && (
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/50">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Your BMI Result
                </h2>
                
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                    <span className="text-2xl font-bold text-white">{bmi}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{category}</h3>
                </div>

                {/* BMI Scale Visualization */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                  <div className="relative h-4 bg-gradient-to-r from-yellow-400 via-green-500 via-orange-400 to-red-500 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 w-1 h-full bg-white border-2 border-gray-800 rounded-full transform -translate-x-1/2 transition-all duration-500"
                      style={{ left: `${getBMIPosition()}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>

                {/* Health Tip */}
                {healthTips[category] && (
                  <div className={`p-4 rounded-xl ${healthTips[category].bg} ${healthTips[category].border} border`}>
                    <div className="flex items-start">
                      <Heart className={`w-5 h-5 mr-3 mt-0.5 ${healthTips[category].color}`} />
                      <div>
                        <h4 className={`font-medium ${healthTips[category].color} mb-1`}>Health Insight</h4>
                        <p className={`text-sm ${healthTips[category].color}`}>
                          {healthTips[category].text}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Error Message */}
            {category && !bmi && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-center font-medium">{category}</p>
              </div>
            )}

            {/* BMI Reference Table */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/50">
              <button
                onClick={() => setShowTable(!showTable)}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  BMI Reference Guide
                </h2>
                <Info className={`w-5 h-5 text-gray-500 transform transition-transform ${showTable ? 'rotate-180' : ''}`} />
              </button>

              {showTable && (
                <div className="mt-6">
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">BMI Range</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Color</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-800">&lt; 18.5</td>
                          <td className="px-4 py-3 text-sm text-gray-800">Underweight</td>
                          <td className="px-4 py-3"><div className="w-4 h-4 bg-yellow-400 rounded"></div></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-800">18.5 – 24.9</td>
                          <td className="px-4 py-3 text-sm text-gray-800">Normal weight</td>
                          <td className="px-4 py-3"><div className="w-4 h-4 bg-green-500 rounded"></div></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-800">25 – 29.9</td>
                          <td className="px-4 py-3 text-sm text-gray-800">Overweight</td>
                          <td className="px-4 py-3"><div className="w-4 h-4 bg-orange-400 rounded"></div></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-800">≥ 30</td>
                          <td className="px-4 py-3 text-sm text-gray-800">Obese</td>
                          <td className="px-4 py-3"><div className="w-4 h-4 bg-red-500 rounded"></div></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}