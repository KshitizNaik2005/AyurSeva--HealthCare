
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load model, encoder, and actual feature names used during training
try:
    model = joblib.load("disease_model.pkl")
    label_encoder = joblib.load("label_encoder.pkl")
    feature_names = joblib.load("feature_names.pkl")  # ⬅️ this replaces the hardcoded list
except Exception as e:
    raise RuntimeError("❌ Could not load model or encoder.") from e

# Input format
class SymptomInput(BaseModel):
    symptoms: list[str]

@app.get("/")
def read_root():
    return {"message": "AI Disease Prediction API is running"}

@app.post("/predict")
def predict_disease(data: SymptomInput):
    input_symptoms = data.symptoms

    try:
        # Create a binary feature vector using actual training feature names
        symptom_vector = [1 if symptom in input_symptoms else 0 for symptom in feature_names]
        df = pd.DataFrame([symptom_vector], columns=feature_names)

        prediction = model.predict(df)[0]
        predicted_disease = label_encoder.inverse_transform([prediction])[0]

        return {"prediction": predicted_disease}

    except Exception as e:
        print(f"❌ Prediction failed due to: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
