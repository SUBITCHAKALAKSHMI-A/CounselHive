import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Default marker fix for Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ✅ College data you provided
const collegeData = {
  Ariyalur: {
    Private: [
      "Jayam College of Engineering and Technology",
      "M.I.E.T. Engineering College",
    ],
  },
  Chennai: {
    Government: [
      "Government College of Engineering, Chennai",
      "Anna University, Chennai",
      "Government College of Technology, Chennai",
    ],
    Private: [
      "Loyola-ICAM College of Engineering and Technology",
      "B.S. Abdur Rahman Crescent Institute of Science and Technology",
      "R.M.K. Engineering College",
      "Panimalar Engineering College",
      "St. Joseph's College of Engineering",
      "Easwari Engineering College",
      "Jeppiaar Engineering College",
      "Rajalakshmi Engineering College",
      "Sri Sairam Engineering College",
      "Sri Sai Ram Institute of Technology",
      "Adhiparasakthi Engineering College",
      "Aalim Muhammed Salegh College of Engineering",
      "Agni College of Technology",
      "Aksheyaa College of Engineering",
      "Asan Memorial College of Engineering and Technology",
      "Central Institute of Plastics Engineering and Technology",
      "Jawahar Engineering College",
      "Jawahar School of Architecture Planning and Design",
    ],
  },
  "Coimbatore": {
    "Government": ["Government College of Technology, Coimbatore"],
    "Private": [
      "PSG College of Technology",
      "Coimbatore Institute of Technology",
      "Kumaraguru College of Technology",
      "Sri Ramakrishna Engineering College",
      "Karpagam College of Engineering",
      "Sri Krishna College of Engineering & Technology",
      "SNS College of Technology",
      "Dr. Mahalingam College of Engineering and Technology",
      "Tamil Nadu College of Engineering",
      "Rathinam Technical Campus",
      "KPR Institute of Engineering and Technology",
      "Dhanalakshmi Srinivasan College of Engineering",
      "Park College of Engineering and Technology",
      "Hindusthan College of Engineering and Technology",
      "Nehru Institute of Engineering and Technology",
      "Hindustan Institute of Technology",
      "Adhiyamaan College of Engineering"
    ]
  },
  "Cuddalore": {
    "Private": [
      "CK College of Engineering",
      "MRK Institute of Technology",
      "Dr. Navalar Nedunchezhiyan College of Engineering",
      "Krishnaswamy College of Engineering and Technology",
      "St. Anne's College of Engineering and Technology"
    ]
  },
  "Dharmapuri": {
    "Government": [
      "Government College of Engineering, Dharmapuri"
    ]
  },
  "Dindigul": {
    "Private": [
      "P.S.N.A. College of Engineering and Technology"
    ]
  },
  "Erode": {
    "Private": [
      "Kongu Engineering College",
      "Bannari Amman Institute of Technology",
      "Erode Sengunthar Engineering College",
      "Velalar College of Engineering and Technology",
      "Institute of Road and Transport Technology"
    ]
  },
  "Kallakurichi": {
    "Private": [
      "Arignar Anna Institute of Science and Technology",
      "Kallakurichi Institute of Technology"
    ]
  },
  "Kanchipuram": {
    "Government": [
      "Government College of Engineering, Kanchipuram"
    ],
    "Private": [
      "Sri Sivasubramaniya Nadar College of Engineering",
      "Sri Sai Ram Engineering College",
      "Sri Sairam Institute of Technology",
      "Chennai Institute of Technology",
      "Adhiparasakthi Engineering College",
      "Mohamed Sathak AJ College of Engineering",
      "Rajiv Gandhi College of Engineering",
      "Sri Venkateswara College of Engineering",
      "Saveetha Engineering College",
      "Velammal Institute of Technology",
      "Rajalakshmi Institute of Technology",
      "K.C.G College of Technology",
      "Tagore Engineering College"
    ]
  },
  "Karur": {
    "Private": [
      "M. Kumarasamy College of Engineering",
      "Chettinad College of Engineering and Technology"
    ]
  },
  "Krishnagiri": {
    "Government": [
      "Government College of Engineering, Bargur"
    ]
  },
  "Madurai": {
    "Government": [
      "Thiagarajar College of Engineering",
      "Government College of Engineering, Tirunelveli"
    ],
    "Private": [
      "K.L.N. College of Engineering",
      "Sethu Institute of Technology",
      "Velammal College of Engineering and Technology"
    ]
  },
  "Mayiladuthurai": {
    "Private": [
      "Annai College of Engineering and Technology",
      "Dhanalakshmi Srinivasan Engineering College"
    ]
  },
  "Nagapattinam": {
    "Private": [
      "E.G.S. Pillay Engineering College",
      "Sembodai Rukumani College of Engineering",
      "Sir Issac Newton College of Engineering and Technology",
      "Arifa Institute of Engineering and Technology",
      "Prime College of Architecture and Planning"
    ]
  },
  "Namakkal": {
    "Private": [
      "Selvam College of Technology",
      "J.K.K. Nattraja College of Engineering and Technology",
      "Sengunthar Engineering College (Autonomous)"
    ]
  },
  "Nilgiris": {
    "Private": [
      "JSS Academy of Technical Education",
      "Nehru Institute of Engineering and Technology"
    ]
  },
  "Perambalur": {
    "Private": [
      "Perambalur Institute of Engineering and Technology",
      "Sakthi Engineering College"
    ]
  },
  "Pudukkottai": {
    "Private": [
      "Pudukkottai College of Engineering and Technology",
      "Muthayammal Engineering College"
    ]
  },
  "Ramanathapuram": {
    "Private": [
      "Mohamed Sathak Engineering College",
      "Syed Ammal Engineering College"
    ]
  },
  "Ranipet": {
    "Private": [
      "Arunai Engineering College",
      "Dhaanish Ahmed College of Engineering"
    ]
  },
  "Salem": {
    "Government": [
      "Government College of Engineering, Salem"
    ],
    "Private": [
      "AVS Engineering College",
      "Sona College of Technology",
      "Tagore Institute of Engineering and Technology",
      "Institute of Road and Transport Technology"
    ]
  },
  "Sivaganga": {
    "Private": [
      "Sivaganga College of Engineering",
      "P.S.R. Engineering College"
    ]
  },
  "Tenkasi": {
    "Private": [
      "Tenkasi Institute of Technology",
      "V.V.V. College for Women"
    ]
  },
  "Thanjavur": {
    "Private": [
      "Parisutham Institute of Technology & Science",
      "Government College of Engineering, Sengippatti"
    ]
  },
  "Theni": {
    "Private": [
      "Theni Kammavar Sangam College of Technology",
      "Vaigai College of Engineering"
    ]
  },
  "Thoothukudi": {
    "Private": [
      "St. Mother Theresa Engineering College",
      "Dr. Sivanthi Adithanar Engineering College, Tiruchendur"
    ]
  },
  "Tiruchirappalli": {
    "Government": [
      "Government College of Engineering, Srirangam",
      "University Departments of Anna University, Tiruchirappalli (BIT Campus)"
    ],
    "Private": [
      "Vetri Vinayaha College of Engineering and Technology",
      "PSG Institute of Technology and Applied Research"
    ]
  },
  "Tirunelveli": {
    "Government": [
      "Government College of Engineering, Tirunelveli"
    ],
    "Private": [
      "Francis Xavier Engineering College",
      "National Engineering College",
      "University College of Engineering, Nagercoil"
    ]
  },
  "Tirupathur": {
    "Private": [
      "Tirupathur Engineering College",
      "Vani Engineering College"
    ]
  },
  "Tiruppur": {
    "Private": [
      "Tiruppur Kumaran College of Technology",
      "Angel College of Engineering and Technology"
    ]
  },
  "Tiruvallur": {
    "Private": [
      "Apollo Engineering College",
      "Prathyusha Engineering College",
      "Saveetha Engineering College",
      "Velammal Institute of Technology",
      "Velammal Engineering College",
      "R.M.D. Engineering College",
      "Panimalar Engineering College",
      "Easwari Engineering College",
      "Rajalakshmi Institute of Technology",
      "K.C.G College of Technology",
      "Tagore Engineering College"
    ]
  },
  "Tiruvannamalai": {
    "Private": [
      "Arulmigu Meenakshi Amman College of Engineering"
    ]
  },
  "Tiruvarur": {
    "Private": [
      "Anjalai Ammal Mahalingam Engineering College"
    ]
  },
  "Vellore": {
    "Government": [
      "Thanthai Periyar Government Institute of Technology"
    ],
    "Private": [
      "C. Abdul Hakeem College of Engineering & Technology",
      "Kingston Engineering College",
      "Global Institute of Technology",
      "Annai Meera Engineering College",
      "Sree Krishna Engineering"
    ]
  },
  "Viluppuram": {
    "Private": [
      "Viluppuram Engineering College",
      "Thiruvalluvar College of Engineering and Technology"
    ]
  },
  "Virudhunagar": {
    "Private": [
      "Virudhunagar College of Engineering",
      "V.S.B. Engineering College"
    ]
  }
  // 👉 Continue with other districts...
};

// ✅ Approximate district coordinates (you can refine later)
const districtCoordinates = {
  Ariyalur: [11.1395, 79.0786],
  Chennai: [13.0827, 80.2707],
  Coimbatore: [11.0168, 76.9558],
  Cuddalore: [11.7447, 79.7680],
  Dharmapuri: [12.1211, 78.1582],
  Dindigul: [10.3673, 77.9803],
  Erode: [11.3410, 77.7172],
  Madurai: [9.9252, 78.1198],
  Salem: [11.6643, 78.1460],
  Tiruchirappalli: [10.7905, 78.7047],
  Tirunelveli: [8.7139, 77.7567],
  Vellore: [12.9165, 79.1325],
  // ➕ Add remaining districts
};

export default function TamilnaduCollegeMap() {
  return (
    <MapContainer
      center={[11.1271, 78.6569]} // Tamil Nadu center
      zoom={7}
      style={{ height: "600px", width: "100%" }}
    >
      {/* Map background */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Loop through districts */}
      {Object.keys(collegeData).map((district, i) => {
        const coords = districtCoordinates[district];
        if (!coords) return null; // Skip districts without coordinates

        return (
          <Marker key={i} position={coords}>
            <Popup>
              <h3>{district}</h3>
              {Object.keys(collegeData[district]).map((type) => (
                <div key={type}>
                  <strong>{type} Colleges:</strong>
                  <ul>
                    {collegeData[district][type].map((college, j) => (
                      <li key={j}>{college}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
