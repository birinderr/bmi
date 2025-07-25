import React, { useState } from "react";
import {
  Calculator, Heart, BarChart3, User, Scale,
  Ruler, Info, RotateCcw, TrendingUp, Moon, Sun
} from "lucide-react";

export default function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [unit, setUnit] = useState("metric");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const healthTips = {
    Underweight: {
      text: "You're underweight. Consider a nutritious, calorie-rich diet with healthy fats and proteins.",
      color: darkMode ? "text-yellow-400" : "text-yellow-600",
      bg: darkMode ? "bg-yellow-900/20" : "bg-yellow-50",
      border: darkMode ? "border-yellow-500/30" : "border-yellow-200"
    },
    Normal: {
      text: "Excellent! You're maintaining a healthy weight. Keep up the good work!",
      color: darkMode ? "text-green-400" : "text-green-600",
      bg: darkMode ? "bg-green-900/20" : "bg-green-50",
      border: darkMode ? "border-green-500/30" : "border-green-200"
    },
    Overweight: {
      text: "You are slightly overweight. Consider regular exercise and a balanced diet.",
      color: darkMode ? "text-orange-400" : "text-orange-600",
      bg: darkMode ? "bg-orange-900/20" : "bg-orange-50",
      border: darkMode ? "border-orange-500/30" : "border-orange-200"
    },
    Obese: {
      text: "BMI is in the obese range. Consider consulting a healthcare provider for guidance.",
      color: darkMode ? "text-red-400" : "text-red-600",
      bg: darkMode ? "bg-red-900/20" : "bg-red-50",
      border: darkMode ? "border-red-500/30" : "border-red-200"
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

  const getBMIPosition = () => {
    if (!bmi) return 0;
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return (bmiNum / 18.5) * 25;
    if (bmiNum < 25) return 25 + ((bmiNum - 18.5) / 6.5) * 25;
    if (bmiNum < 30) return 50 + ((bmiNum - 25) / 5) * 25;
    return Math.min(75 + ((bmiNum - 30) / 10) * 25, 100);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 p-4 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto">

        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-full text-sm shadow transition-all flex items-center gap-2 ${
              darkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold">BMI Calculator</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Calculate your Body Mass Index and get health insights
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className={`rounded-2xl shadow-xl p-8 border transition-colors ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white/70 backdrop-blur-lg border-white/50'
          }`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Personal Information
            </h2>

            <div className="space-y-6">
              {/* Unit Selection */}
              <div>
                <label className="block mb-2 text-sm font-medium">Unit System</label>
                <div className="grid grid-cols-2 gap-2">
                  {["metric", "imperial"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setUnit(type)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        unit === type
                          ? `border-blue-500 ${darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'}`
                          : `${darkMode ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500' : 'border-gray-200 bg-white hover:border-gray-300'}`
                      }`}
                    >
                      <div className="text-sm font-medium capitalize">{type}</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {type === "metric" ? "kg, cm" : "lbs, inches"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Input */}
              <div>
                <label className="block mb-2 text-sm font-medium flex items-center">
                  <Scale className="w-4 h-4 mr-1" />
                  Weight ({unit === "metric" ? "kg" : "lbs"})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === "metric" ? "Enter weight in kg" : "Enter weight in lbs"}
                  className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-800'
                  }`}
                />
              </div>

              {/* Height Input */}
              <div>
                <label className="block mb-2 text-sm font-medium flex items-center">
                  <Ruler className="w-4 h-4 mr-1" />
                  Height ({unit === "metric" ? "cm" : "inches"})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === "metric" ? "Enter height in cm" : "Enter height in inches"}
                  className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-800'
                  }`}
                />
              </div>

              {/* Age and Gender Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Age (optional)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                    className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-200 text-gray-800'
                    }`}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Gender (optional)</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-200 text-gray-800'
                    }`}
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
                  className={`px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center ${
                    darkMode 
                      ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
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
              <div className={`rounded-2xl shadow-xl p-8 border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white/70 backdrop-blur-lg border-white/50'
              }`}>
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Your BMI Result
                </h2>
                
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                    <span className="text-2xl font-bold text-white">{bmi}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{category}</h3>
                </div>

                {/* BMI Scale Visualization */}
                <div className="mb-6">
                  <div className={`flex justify-between text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                  <div className="relative h-4 bg-gradient-to-r from-yellow-400 via-green-500 via-orange-400 to-red-500 rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 w-1 h-full rounded-full transform -translate-x-1/2 transition-all duration-500 ${
                        darkMode ? 'bg-white border-2 border-gray-300' : 'bg-white border-2 border-gray-800'
                      }`}
                      style={{ left: `${getBMIPosition()}%` }}
                    />
                  </div>
                  <div className={`flex justify-between text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>

                {/* Health Tip */}
                {healthTips[category] && (
                  <div className={`p-4 rounded-xl border ${healthTips[category].bg} ${healthTips[category].border}`}>
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
              <div className={`rounded-xl p-4 border ${
                darkMode 
                  ? 'bg-red-900/20 border-red-500/30' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-center font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                  {category}
                </p>
              </div>
            )}

            {/* BMI Reference Table */}
            <div className={`rounded-2xl shadow-xl p-8 border transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white/70 backdrop-blur-lg border-white/50'
            }`}>
              <button
                onClick={() => setShowTable(!showTable)}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-xl font-semibold flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  BMI Reference Guide
                </h2>
                <Info className={`w-5 h-5 transform transition-transform ${
                  showTable ? 'rotate-180' : ''
                } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>

              {showTable && (
                <div className="mt-6">
                  <div className={`overflow-hidden rounded-xl border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <table className="w-full">
                      <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                        <tr>
                          <th className={`px-4 py-3 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>BMI Range</th>
                          <th className={`px-4 py-3 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</th>
                          <th className={`px-4 py-3 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Color</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${darkMode ? 'bg-gray-800 divide-gray-600' : 'bg-white divide-gray-200'}`}>
                        <tr>
                          <td className={`px-4 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>&lt; 18.5</td>
                          <td className={`px-4 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Underweight</td>
                          <td className="px-4 py-3"><div className="w-4 h-4 bg-yellow-400 rounded"></div></td>
                        </tr>
                        <tr>
                          <td className={`px-4 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>18.5 – 24.9</td>
                          <td className={`px-4 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Normal weight</td>
                          <td className="px-4 py-3"><div className="w-4 h-4 bg-green-500 rounded"></div></td>
                        </tr>
                        <tr>
                          <td className={`px-4 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>25 – 29.9</td>
                          <td className={`px-4 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Overweight</td>
                          <td className="px-4 py-3"><div className="w-4 h-4 bg-orange-400 rounded"></div></td>
                        </tr>
                        <tr>
                          <td className={`px-4 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>≥ 30</td>
                          <td className={`px-4 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Obese</td>
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