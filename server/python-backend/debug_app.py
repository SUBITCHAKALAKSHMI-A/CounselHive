#!/usr/bin/env python3
import os
import sys

def main():
    print("🔧 Starting TNEA College Predictor Backend...")
    
    # Check if required files exist
    if not os.path.exists("dt_dataset_with_district_corrected.csv"):
        print("❌ Dataset file 'dt_dataset_with_district_corrected.csv' not found!")
        print("💡 Please make sure the dataset file is in the same directory as app.py")
        return
    
    print("✅ Dataset file found")
    print("🚀 Starting Flask server...")
    
    # Import and run the app
    from app import app
    app.run(host='0.0.0.0', port=5000, debug=True)

if __name__ == '__main__':
    main()