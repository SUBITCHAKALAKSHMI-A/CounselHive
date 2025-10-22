from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib
import os
import gc

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173"])

print("🚀 Starting TNEA College Predictor API...")

# ---------------------------
# Load & preprocess dataset with memory optimization
# ---------------------------
def load_data():
    try:
        # Load only necessary columns to save memory
        df = pd.read_csv("dt_dataset_with_district_corrected.csv")
        df.columns = df.columns.str.strip().str.lower()
        
        # Convert to categorical to save memory
        df["college name"] = df["college name"].str.lower().astype('category')
        df["branch name"] = df["branch name"].str.lower().astype('category')
        df["district"] = df["district"].str.lower().astype('category')
        
        print(f"✅ Dataset loaded: {len(df)} records")
        return df
    except Exception as e:
        print(f"❌ Error loading dataset: {e}")
        return pd.DataFrame()

df = load_data()

# ---------------------------
# Simple prediction logic without heavy ML training
# ---------------------------
def create_prediction_engine(df):
    """Create a simple prediction engine without heavy ML training"""
    if df.empty:
        return None, None, None
    
    print("🔄 Setting up prediction engine...")
    
    # Create a simple lookup-based prediction system
    categories = ["oc", "bc", "bcm", "mbc", "sc", "sca", "st"]
    
    # Build college database for quick lookup
    college_db = []
    for _, row in df.iterrows():
        for cat in categories:
            if cat in row and pd.notna(row[cat]):
                college_db.append({
                    "cutoff_required": float(row[cat]),
                    "category": cat,
                    "district": row["district"],
                    "branch": row["branch name"],
                    "college": row["college name"],
                    "college_code": row["college code"],
                    "branch_code": row["branch code"]
                })
    
    college_df = pd.DataFrame(college_db)
    
    # Simple encoders for categorical data
    encoders = {}
    for col in ["category", "district", "branch"]:
        le = LabelEncoder()
        college_df[col] = le.fit_transform(college_df[col].astype(str))
        encoders[col] = le
    
    print(f"✅ Prediction engine ready with {len(college_df)} college-branch combinations")
    return college_df, encoders

# Initialize prediction engine
college_df, encoders = create_prediction_engine(df)

def calculate_probability(user_cutoff, required_cutoff, category_match=True):
    """Calculate admission probability based on cutoff difference"""
    if user_cutoff >= required_cutoff:
        # Higher probability if cutoff meets requirement
        diff = user_cutoff - required_cutoff
        if diff >= 3:
            return 95.0  # Very high probability
        elif diff >= 1:
            return 85.0  # High probability
        else:
            return 75.0  # Good probability
    else:
        # Lower probability if cutoff doesn't meet requirement
        diff = required_cutoff - user_cutoff
        if diff <= 1:
            return 45.0  # Moderate probability
        elif diff <= 3:
            return 25.0  # Low probability
        else:
            return 10.0  # Very low probability

# ---------------------------
# API Routes
# ---------------------------

@app.route('/')
def home():
    return jsonify({
        "message": "TNEA College Predictor API", 
        "status": "running",
        "version": "2.0",
        "colleges_count": df["college code"].nunique() if not df.empty else 0,
        "branches_count": df["branch name"].nunique() if not df.empty else 0,
        "prediction_engine": "Optimized Lookup System"
    })

@app.route('/api/districts', methods=['GET'])
def get_districts():
    """Get all available districts"""
    try:
        if df.empty:
            return jsonify([])
        districts = sorted(df["district"].unique())
        return jsonify([str(district).title() for district in districts])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/branches', methods=['GET'])
def get_branches():
    """Get all available branches"""
    try:
        if df.empty:
            return jsonify([])
        branches = sorted(df["branch name"].unique())
        return jsonify([str(branch).title() for branch in branches])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/colleges', methods=['GET'])
def get_colleges():
    """Get all colleges with basic info"""
    try:
        if df.empty:
            return jsonify([])
        colleges = df[["college code", "college name", "district"]].drop_duplicates()
        colleges_list = []
        for _, row in colleges.iterrows():
            colleges_list.append({
                "code": row["college code"],
                "name": str(row["college name"]).title(),
                "district": str(row["district"]).title()
            })
        return jsonify(colleges_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict():
    """Main prediction endpoint - Only colleges with required_cutoff <= user cutoff"""
    try:
        data = request.get_json()
        print(f"📥 Received prediction request: {data}")
        
        # Validate required fields
        if not data or 'cutoff' not in data:
            return jsonify({"success": False, "error": "Missing cutoff value"}), 400
        
        cutoff = float(data['cutoff'])
        category = data.get('category', 'OC').lower()
        districts = [d.lower() for d in data.get('districts', [])]
        branches = [b.lower() for b in data.get('branches', [])]
        limit_choice = data.get('limit', 50)
        
        if cutoff < 0 or cutoff > 200:
            return jsonify({"success": False, "error": "Cutoff must be between 0 and 200"}), 400
        
        # Convert limit choice to number
        if isinstance(limit_choice, str):
            if "50" in limit_choice:
                limit = 50
            elif "70" in limit_choice:
                limit = 70
            else:
                limit = 100
        else:
            limit = limit_choice
        
        if college_df is None:
            return jsonify({"success": False, "error": "Prediction engine not available"}), 500
        
        results = []
        
        # Create a working copy and decode categorical columns for filtering
        working_df = college_df.copy()
        
        # Decode the categorical columns back to strings for filtering
        working_df["district_decoded"] = encoders["district"].inverse_transform(working_df["district"])
        working_df["branch_decoded"] = encoders["branch"].inverse_transform(working_df["branch"])
        working_df["category_decoded"] = encoders["category"].inverse_transform(working_df["category"])
        
        # Filter by category - if "all" is selected, don't filter by category
        if category != 'all':
            working_df = working_df[working_df["category_decoded"] == category]
        
        # Filter by districts if specified
        if districts:
            working_df = working_df[working_df["district_decoded"].isin(districts)]
        
        # Filter by branches if specified
        if branches:
            working_df = working_df[working_df["branch_decoded"].isin(branches)]
        
        print(f"🔍 Found {len(working_df)} college-branch combinations after filtering")
        
        # Filter only colleges where required_cutoff <= user cutoff
        working_df = working_df[working_df["cutoff_required"] <= cutoff]

        print(f"🔍 Found {len(working_df)} college-branch combinations after cutoff filtering")

        # If no results found with exact branch, try partial matching for branches
        if len(working_df) == 0 and branches:
            print("🔄 Trying partial branch matching...")
            # Create a new working df with category filter
            working_df = college_df.copy()
            working_df["district_decoded"] = encoders["district"].inverse_transform(working_df["district"])
            working_df["branch_decoded"] = encoders["branch"].inverse_transform(working_df["branch"])
            working_df["category_decoded"] = encoders["category"].inverse_transform(working_df["category"])
            
            # Filter by category - if "all" is selected, don't filter by category
            if category != 'all':
                working_df = working_df[working_df["category_decoded"] == category]
            
            # Filter by districts if specified
            if districts:
                working_df = working_df[working_df["district_decoded"].isin(districts)]
            
            # Try partial matching for branches
            branch_patterns = [branch.lower() for branch in branches]
            mask = working_df["branch_decoded"].str.lower().apply(
                lambda x: any(pattern in x for pattern in branch_patterns)
            )
            working_df = working_df[mask]
            print(f"🔍 Found {len(working_df)} college-branch combinations after partial matching")
        
        # Calculate probabilities and prepare results
        for _, row in working_df.iterrows():
            required_cutoff = row["cutoff_required"]
            
            # Improved probability calculation based on your screenshot
            if required_cutoff == 0:
                probability = 95.0  # High probability for 0 cutoff colleges
            elif cutoff >= required_cutoff:
                # If cutoff meets or exceeds required, high probability
                diff = cutoff - required_cutoff
                if diff >= 10:
                    probability = 95.0
                elif diff >= 5:
                    probability = 85.0
                elif diff >= 2:
                    probability = 75.0
                else:
                    probability = 65.0
            else:
                # If cutoff is below required, calculate based on how close
                diff = required_cutoff - cutoff
                if diff <= 2:
                    probability = 45.0
                elif diff <= 5:
                    probability = 30.0
                elif diff <= 10:
                    probability = 20.0
                else:
                    probability = 10.0
            
            # Determine college type - based on your screenshot logic
            if cutoff >= required_cutoff:
                college_type = "safe"
            else:
                college_type = "other"
            
            results.append({
                "collegeCode": row["college_code"],
                "collegeName": str(row["college"]).title(),
                "branchCode": row["branch_code"],
                "branchName": str(row["branch_decoded"]).title(),
                "district": str(row["district_decoded"]).title(),
                "requiredCutoff": float(required_cutoff),
                "admissionProbability": round(probability, 2),
                "type": college_type,
                "category": str(row["category_decoded"]).upper()  # Add category to results
            })
        
        # Sort results by required cutoff (descending) and admission probability (descending)
        results.sort(key=lambda x: (-x["requiredCutoff"], -x["admissionProbability"]))
        
        # Apply limit
        final_results = results[:limit]
        
        print(f"📤 Returning {len(final_results)} results")
        
        return jsonify({
            "success": True,
            "count": len(final_results),
            "results": final_results
        })
        
    except Exception as e:
        print(f"❌ Prediction error: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get dataset statistics"""
    try:
        stats = {
            "totalColleges": df["college code"].nunique() if not df.empty else 0,
            "totalBranches": df["branch name"].nunique() if not df.empty else 0,
            "totalDistricts": df["district"].nunique() if not df.empty else 0,
            "totalRecords": len(df),
            "predictionEntries": len(college_df) if college_df is not None else 0
        }
        return jsonify(stats)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy", 
        "service": "TNEA College Predictor",
        "data_loaded": not df.empty,
        "prediction_ready": college_df is not None,
        "memory_optimized": True
    })

@app.route('/api/college-list', methods=['GET'])
def get_college_list():
    """
    Returns college details grouped by college, with branches and cutoff for each category.
    """
    try:
        if df.empty:
            return jsonify([])

        categories = ["oc", "bc", "bcm", "mbc", "sc", "sca", "st"]

        # Group by college, then list branches and cutoffs
        grouped = df.groupby(["college code", "college name", "district"])
        college_list = []
        for (code, name, district), group in grouped:
            branches = []
            for _, row in group.iterrows():
                branch = {
                    "Branch Code": row.get("branch code", ""),
                    "Branch Name": str(row.get("branch name", "")).title(),
                    "Cutoff": {cat.upper(): float(row.get(cat, 0)) for cat in categories}
                }
                branches.append(branch)
            college_list.append({
                "College Code": str(code),
                "College Name": str(name).title(),
                "District": str(district).title(),
                "Branches": branches
            })

        return jsonify(college_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add a catch-all route for undefined routes
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Route not found", "path": request.path}), 404

if __name__ == '__main__':
    print("\n" + "="*50)
    print("🎯 TNEA College Predictor API - OPTIMIZED")
    print("="*50)
    print(f"🏫 Colleges: {df['college code'].nunique() if not df.empty else 0}")
    print(f"📚 Branches: {df['branch name'].nunique() if not df.empty else 0}")
    print(f"📍 Districts: {df['district'].nunique() if not df.empty else 0}")
    print(f"🎯 Prediction entries: {len(college_df) if college_df is not None else 0}")
    print("\n🌐 Server: http://localhost:5000")
    print("\n📍 Available Endpoints:")
    print("   GET  /")
    print("   GET  /api/health")
    print("   GET  /api/stats")
    print("   GET  /api/districts")
    print("   GET  /api/branches")
    print("   GET  /api/colleges")
    print("   POST /api/predict")
    print("   GET  /api/college-list")
    print("\n🚀 Server ready! (Memory Optimized)")
    print("="*50 + "\n")
    
    # Force garbage collection before starting server
    gc.collect()
    
    app.run(host='0.0.0.0', port=5000, debug=False)  # debug=False to save memory