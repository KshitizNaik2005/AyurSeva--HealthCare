import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Load dataset
df = pd.read_csv("Training.csv")

# Drop unnamed columns like 'Unnamed: 133'
df = df.loc[:, ~df.columns.str.contains("^unnamed", case=False)]

# Clean column names: strip, lowercase, replace spaces/special chars
df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_').str.replace(r'[^\w]', '', regex=True)

# ✅ Remove duplicate columns (solves issues like 'fluid_overload.1')
df = df.loc[:, ~df.columns.duplicated()]

# Separate features and label
X = df.drop(columns=["prognosis"])
y = df["prognosis"]

# Encode label
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Train model
model = DecisionTreeClassifier()
model.fit(X, y_encoded)

# Save model and supporting files
joblib.dump(model, "disease_model.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")
joblib.dump(X.columns.tolist(), "feature_names.pkl")  # Consistent features for FastAPI

print("✅ Model training complete and saved.")
