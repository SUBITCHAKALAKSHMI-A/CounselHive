import streamlit as st
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# ---------------------------
# Load & preprocess dataset
# ---------------------------
@st.cache_data
def load_data():
    df = pd.read_csv("dt_dataset_with_district_corrected.csv")
    df.columns = df.columns.str.strip().str.lower()
    df["college name"] = df["college name"].str.lower()
    df["branch name"] = df["branch name"].str.lower()
    df["district"] = df["district"].str.lower()
    return df

df = load_data()

# ---------------------------
# Prepare ML dataset
# ---------------------------
def prepare_training_data(df):
    records = []
    categories = ["oc", "bc", "bcm", "mbc", "sc", "sca", "st"]

    for _, row in df.iterrows():
        for cat in categories:
            records.append({
                "cutoff_required": row[cat],
                "category": cat,
                "district": row["district"],
                "branch": row["branch name"],
                "college": row["college name"],
                "college_code": row["college code"],
                "branch_code": row["branch code"]
            })
    return pd.DataFrame(records)

training_df = prepare_training_data(df)

# ---------------------------
# Train ML model (once)
# ---------------------------
MODEL_FILE = "tnea_model.pkl"

if not os.path.exists(MODEL_FILE):
    X = training_df[["cutoff_required", "category", "district", "branch"]]
    y = np.ones(len(X))

    y = []
    data = []
    for _, row in training_df.iterrows():
        data.append([row["cutoff_required"], row["category"], row["district"], row["branch"]])
        y.append(1)
        data.append([row["cutoff_required"] - np.random.uniform(0.5, 5), row["category"], row["district"], row["branch"]])
        y.append(0)

    X = pd.DataFrame(data, columns=["cutoff", "category", "district", "branch"])
    y = np.array(y)

    # Encode categorical features
    cat_features = ["category", "district", "branch"]
    encoders = {}
    for col in cat_features:
        le = LabelEncoder()
        X[col] = le.fit_transform(X[col])
        encoders[col] = le

    # Scale cutoff
    scaler = StandardScaler()
    X[["cutoff"]] = scaler.fit_transform(X[["cutoff"]])

    # Train model
    model = RandomForestClassifier(n_estimators=200, random_state=42)
    model.fit(X, y)

    joblib.dump((model, scaler, encoders), MODEL_FILE)

# ---------------------------
# Load model
# ---------------------------
model, scaler, encoders = joblib.load(MODEL_FILE)

# ---------------------------
# Streamlit UI
# ---------------------------
st.title("🎓 ML-Powered TNEA College Predictor")

cutoff = st.number_input("Enter your cutoff marks", min_value=0.0, max_value=200.0, step=0.01)
category = st.selectbox("Select your category", ["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"]).lower()
districts = st.multiselect("Preferred districts", sorted(df["district"].unique()))
branches = st.multiselect("Preferred departments", sorted(df["branch name"].unique()))
limit_choice = st.radio("How many colleges to display?", ["Top 50", "Top 70", "Top 100"])

if st.button("Predict Colleges"):
    results = []

    # ----------------------
    # Step 1: Safe +3 colleges
    # ----------------------
    safe_df = training_df[(training_df["cutoff_required"] >= cutoff) & 
                          (training_df["cutoff_required"] <= cutoff + 3)]
    for _, row in safe_df.iterrows():
        if (len(districts) > 0 and row["district"] not in districts) or \
           (len(branches) > 0 and row["branch"] not in branches) or \
           (row["category"] != category):
            continue

        X_new = pd.DataFrame([{
            "cutoff": cutoff,
            "category": row["category"],
            "district": row["district"],
            "branch": row["branch"]
        }])
        for col in ["category", "district", "branch"]:
            X_new[col] = encoders[col].transform(X_new[col])
        X_new["cutoff"] = scaler.transform(X_new[["cutoff"]])
        prob = model.predict_proba(X_new)[0][1]

        results.append({
            "college code": row["college_code"],
            "college name": row["college"],
            "branch code": row["branch_code"],
            "branch name": row["branch"],
            "district": row["district"],
            "required cutoff": row["cutoff_required"],
            "admission probability": round(prob * 100, 2)
        })

    # ----------------------
    # Step 2: Other possible colleges ≤ cutoff
    # ----------------------
    other_df = training_df[training_df["cutoff_required"] < cutoff]
    for _, row in other_df.iterrows():
        if (len(districts) > 0 and row["district"] not in districts) or \
           (len(branches) > 0 and row["branch"] not in branches) or \
           (row["category"] != category):
            continue

        X_new = pd.DataFrame([{
            "cutoff": cutoff,
            "category": row["category"],
            "district": row["district"],
            "branch": row["branch"]
        }])
        for col in ["category", "district", "branch"]:
            X_new[col] = encoders[col].transform(X_new[col])
        X_new["cutoff"] = scaler.transform(X_new[["cutoff"]])
        prob = model.predict_proba(X_new)[0][1]

        results.append({
            "college code": row["college_code"],
            "college name": row["college"],
            "branch code": row["branch_code"],
            "branch name": row["branch"],
            "district": row["district"],
            "required cutoff": row["cutoff_required"],
            "admission probability": round(prob * 100, 2)
        })

    # ----------------------
    # Combine & sort results
    # ----------------------
    results_df = pd.DataFrame(results)
    results_df = results_df.sort_values(
        by=["required cutoff", "admission probability"], ascending=[False, False]
    )

    # Apply limit
    if limit_choice == "Top 50":
        results_df = results_df.head(50)
    elif limit_choice == "Top 70":
        results_df = results_df.head(70)
    else:
        results_df = results_df.head(100)

    if results_df.empty:
        st.error("No matching colleges found. Try adjusting preferences.")
    else:
        st.success(f"✅ Found {len(results_df)} possible colleges.")
        st.dataframe(results_df)
