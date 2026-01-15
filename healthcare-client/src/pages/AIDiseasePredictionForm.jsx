import React, { useState } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import './AIDiseasePredictionForm.css'; // Include custom styles

const SYMPTOM_LIST = [
  "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing",
  "shivering", "chills", "joint_pain", "stomach_pain", "acidity",
  "ulcers_on_tongue", "muscle_wasting", "vomiting", "burning_micturition",
  "spotting_urination", "fatigue", "weight_gain", "anxiety",
  "cold_hands_and_feets", "mood_swings", "weight_loss", "restlessness",
  "lethargy", "patches_in_throat", "irregular_sugar_level", "cough",
  "high_fever", "sunken_eyes", "breathlessness", "sweating", "dehydration",
  "indigestion", "headache", "yellowish_skin", "dark_urine", "nausea",
  "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "constipation",
  "abdominal_pain", "diarrhoea", "mild_fever", "yellow_urine",
  "yellowing_of_eyes", "acute_liver_failure", "fluid_overload1",
  "swelling_of_stomach", "swelled_lymph_nodes", "malaise",
  "blurred_and_distorted_vision", "phlegm", "throat_irritation",
  "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion",
  "chest_pain", "weakness_in_limbs", "fast_heart_rate", "pain_during_bowel_movements",
  "pain_in_anal_region", "bloody_stool", "irritation_in_anus",
  "neck_pain", "dizziness", "cramps", "bruising", "obesity",
  "swollen_legs", "swollen_blood_vessels", "puffy_face_and_eyes",
  "enlarged_thyroid", "brittle_nails", "swollen_extremeties",
  "excessive_hunger", "extra_marital_contacts", "drying_and_tingling_lips",
  "slurred_speech", "knee_pain", "hip_joint_pain", "muscle_weakness",
  "stiff_neck", "swelling_joints", "movement_stiffness", "spinning_movements",
  "loss_of_balance", "unsteadiness", "weakness_of_one_body_side",
  "loss_of_smell", "bladder_discomfort", "foul_smell_of_urine",
  "continuous_feel_of_urine", "passage_of_gases", "internal_itching",
  "toxic_look_typhos", "depression", "irritability", "muscle_pain",
  "altered_sensorium", "red_spots_over_body", "belly_pain",
  "abnormal_menstruation", "dischromic_patches", "watering_from_eyes",
  "increased_appetite", "polyuria", "family_history", "mucoid_sputum",
  "rusty_sputum", "lack_of_concentration", "visual_disturbances",
  "receiving_blood_transfusion", "receiving_unsterile_injections",
  "coma", "stomach_bleeding", "distention_of_abdomen", "history_of_alcohol_consumption",
  "blood_in_sputum", "prominent_veins_on_calf", "palpitations",
  "painful_walking", "pus_filled_pimples", "blackheads",
  "scurring", "skin_peeling", "silver_like_dusting", "small_dents_in_nails",
  "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze"
];

const AIDiseasePredictionForm = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddSymptom = () => {
    if (selectedSymptom && !selectedSymptoms.includes(selectedSymptom)) {
      setSelectedSymptoms([...selectedSymptoms, selectedSymptom]);
      setSelectedSymptom('');
    }
  };

  const handleRemoveSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/predict', {
        symptoms: selectedSymptoms,
      });
      setPrediction(response.data.prediction);
      setError('');
    } catch (err) {
      console.error(err);
      setPrediction('');
      setError('❌ Sorry! We couldn\'t identify your condition right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

//   const handleSubmit = async () => {
//   try {
//     setLoading(true);

//     // Prefer ML URL from .env, fallback to localhost
//     const mlUrl = process.env.REACT_APP_ML_URL || "http://127.0.0.1:8000";

//     const response = await axios.post(`${mlUrl}/predict`, {
//       symptoms: selectedSymptoms,
//     });

//     setPrediction(response.data.prediction);
//     setError('');
//   } catch (err) {
//     console.error(err);
//     setPrediction('');
//     setError('❌ Sorry! We couldn\'t identify your condition right now. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };


  return (
    <div className="ai-form bg-cover bg-center min-h-screen p-6" style={{ backgroundImage: "url('/medical-background.jpg')" }}>
      <div className="bg-white bg-opacity-90 rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
        <h2 className="text-3xl text-center text-blue-800 font-bold mb-6">🧠 AI Disease Predictor</h2>
        
        <div className="flex mb-4">
          <select
            value={selectedSymptom}
            onChange={(e) => setSelectedSymptom(e.target.value)}
            className="w-full p-2 rounded-l border border-blue-300 focus:outline-none"
          >
            <option value="">-- Select a Symptom --</option>
            {SYMPTOM_LIST.map((symptom, idx) => (
              <option key={idx} value={symptom}>
                {`🩺 ${symptom.replaceAll('_', ' ')}`}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddSymptom}
            className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {selectedSymptoms.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Selected Symptoms:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {symptom.replaceAll('_', ' ')}
                  <button onClick={() => handleRemoveSymptom(symptom)} className="text-red-500 font-bold">×</button>
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={selectedSymptoms.length === 0 || loading}
        >
          {loading ? <FaSpinner className="animate-spin inline mr-2" /> : '🔍 Predict Disease'}
        </button>

        {prediction && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded shadow">
            ✅ <strong>Prediction:</strong> {prediction}
            <p className="text-sm mt-2">This is based on your entered symptoms. Please consult a licensed medical professional for diagnosis and treatment.</p>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-100 text-red-800 p-3 rounded">
            {error}
          </div>
        )}

        <div className="mt-8 text-xs text-gray-600 border-t pt-4">
          ⚠️ <strong>Disclaimer:</strong> This tool provides an AI-based prediction for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
        </div>
      </div>
    </div>
  );
};

export default AIDiseasePredictionForm;
