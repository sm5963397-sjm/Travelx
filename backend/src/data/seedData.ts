export interface NormalizedPlace {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  photos: string[];
  image: string;
  openingHours: string;
  entryFee: number | string;
  currency: string;
  visitDuration: string;
  bestTime: string;
  address: string;
  tags: string[];
  isMustVisit: boolean;
  isHiddenGem: boolean;
  isPhotoSpot: boolean;
  crowdLevel: string;
  distance?: number;
}

export interface NormalizedStay {
  id: string;
  name: string;
  city: string;
  type: string;
  image: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  pricePerNight: number;
  amenities: string[];
  description: string;
  address: string;
  vibe: string;
  distance?: number;
}

export interface NormalizedRestaurant {
  id: string;
  name: string;
  city: string;
  placeCategory: string;
  cuisine: string;
  image: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  priceRange: string;
  costForTwo: number;
  mustTryDish: string;
  description: string;
  address: string;
  openingHours: string;
  tags: string[];
  distance?: number;
}

export const SEED_PLACES: NormalizedPlace[] = [
  // --- NAGPUR (Prominently featured in prompt: "My Nagpur Weekend") ---
  {
    id: "nagpur-deekshabhoomi",
    name: "Deekshabhoomi",
    city: "Nagpur",
    state: "Maharashtra",
    category: "historical",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 4200,
    latitude: 21.1278,
    longitude: 79.0664,
    entryFee: 0,
    currency: "₹",
    visitDuration: "1-2 hours",
    description: "A monumental sacred stupa of global historical significance where Dr. B. R. Ambedkar embraced Buddhism along with hundreds of thousands of followers in 1956. The great architectural dome is the largest hollow stupa in Asia.",
    shortDescription: "Architectural masterpiece and revered heritage stupa with serene gardens and reflection pools.",
    tags: ["Heritage", "Monument", "Architecture", "Spiritual", "Nagpur"],
    openingHours: "6:00 AM - 8:30 PM",
    bestTime: "Late afternoon for quiet sunset contemplation around the marble plaza",
    address: "South Ambazari Road, Abhyankar Nagar, Nagpur, Maharashtra 440010",
    isMustVisit: true,
    isHiddenGem: false,
    isPhotoSpot: true,
    crowdLevel: "Moderate",
  },
  {
    id: "nagpur-futala-lake",
    name: "Futala Lake Promenade",
    city: "Nagpur",
    state: "Maharashtra",
    category: "nature",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.6,
    reviewCount: 3100,
    latitude: 21.1539,
    longitude: 79.0478,
    entryFee: 0,
    currency: "₹",
    visitDuration: "2 hours",
    description: "Built by the Bhonsle kings, Futala Lake is celebrated for its bustling evening promenade, colorful musical fountains, and lively lakeside street food kiosks serving Nagpur's famous tarri poha and street snacks.",
    shortDescription: "Vibrant lakeside promenade famous for evening breezes, musical fountains and street food stalls.",
    tags: ["Lake", "Sunset", "Food", "Promenade", "Leisure"],
    openingHours: "Open 24 Hours (Fountain shows: 7:00 PM - 9:00 PM)",
    bestTime: "6:00 PM to 8:30 PM for sunset skies and lakeside snacks",
    address: "Vayusena Nagar, Telangkhedi, Nagpur, Maharashtra 440001",
    isMustVisit: true,
    isHiddenGem: false,
    isPhotoSpot: true,
    crowdLevel: "Crowded",
  },
  {
    id: "nagpur-zero-mile-stone",
    name: "Zero Mile Stone & Heritage Park",
    city: "Nagpur",
    state: "Maharashtra",
    category: "historical",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.4,
    reviewCount: 1450,
    latitude: 21.1498,
    longitude: 79.0806,
    entryFee: 20,
    currency: "₹",
    visitDuration: "1 hour",
    description: "Erected by the British during the Great Trigonometrical Survey of India in 1907, the Zero Mile pillar marks the geographical center of undivided India with distances to all major cities inscribed.",
    shortDescription: "Historic milestone and park marking the geographical center of India.",
    tags: ["Geographic Center", "History", "Landmark", "Nagpur"],
    openingHours: "10:00 AM - 7:00 PM",
    bestTime: "Morning hours for crisp photography of the sandstone obelisk",
    address: "Civil Lines, Wardha Road, Nagpur, Maharashtra 440001",
    isMustVisit: false,
    isHiddenGem: true,
    isPhotoSpot: true,
    crowdLevel: "Low",
  },
  {
    id: "nagpur-sitabuldi-fort",
    name: "Sitabuldi Fort",
    city: "Nagpur",
    state: "Maharashtra",
    category: "historical",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.5,
    reviewCount: 980,
    latitude: 21.1472,
    longitude: 79.0841,
    entryFee: 0,
    currency: "₹",
    visitDuration: "2 hours",
    description: "Site of the historic Battle of Sitabuldi fought in 1817 between the British East India Company and the Kingdom of Nagpur under Mudhoji II Bhonsle, offering sweeping panoramic vistas of Nagpur city.",
    shortDescription: "Hilltop fortress offering sweeping panoramic views of Nagpur's skyline.",
    tags: ["Fort", "Battlefield", "History", "Panoramas"],
    openingHours: "Special national holidays & weekends (Check military permissions)",
    bestTime: "Morning hours",
    address: "Sitabuldi, Nagpur, Maharashtra 440012",
    isMustVisit: false,
    isHiddenGem: true,
    isPhotoSpot: false,
    crowdLevel: "Low",
  },
  // --- JAIPUR (Iconic Heritage Capital) ---
  {
    id: "hawa-mahal",
    name: "Hawa Mahal (Palace of Winds)",
    city: "Jaipur",
    state: "Rajasthan",
    category: "historical",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1603288967727-46383e29f8f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609137144822-2580a158b021?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 3840,
    latitude: 26.9239,
    longitude: 75.8267,
    entryFee: 50,
    currency: "₹",
    visitDuration: "1-2 hours",
    description: "Built in 1799 by Maharaja Sawai Pratap Singh, Hawa Mahal features 953 honeycomb jharokhas adorned with intricate latticework. The facade allowed royal ladies to observe street life below without being seen.",
    shortDescription: "Iconic 5-story pink sandstone palace with 953 honeycombed windows and natural cooling breeze architecture.",
    tags: ["Iconic", "Royal Heritage", "Architecture", "Photography", "Pink City"],
    openingHours: "9:00 AM - 5:00 PM",
    bestTime: "Early Morning (8:30 AM) when sunrise casts a warm glow on the red-pink facade",
    address: "Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Jaipur",
    isMustVisit: true,
    isHiddenGem: false,
    isPhotoSpot: true,
    crowdLevel: "Crowded",
  },
  {
    id: "amber-fort",
    name: "Amer Fort (Amber Palace)",
    city: "Jaipur",
    state: "Rajasthan",
    category: "historical",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.9,
    reviewCount: 5200,
    latitude: 26.9855,
    longitude: 75.8513,
    entryFee: 100,
    currency: "₹",
    visitDuration: "3-4 hours",
    description: "Perched high on a hill overlooking Maota Lake, Amer Fort is a UNESCO World Heritage site known for its majestic Hindu and Rajput elements including the dazzling Sheesh Mahal (Mirror Palace).",
    shortDescription: "Majestic hilltop fortress overlooking Maota lake featuring the world-famous Sheesh Mahal mirror palace.",
    tags: ["UNESCO Heritage", "Fort", "Royal", "Views", "Mirrors"],
    openingHours: "8:00 AM - 5:30 PM, Evening Light Show: 7:00 PM",
    bestTime: "Morning between 8:30 AM - 11:00 AM before afternoon tour buses arrive",
    address: "Devisinghpura, Amer, Jaipur, Rajasthan 302001",
    isMustVisit: true,
    isHiddenGem: false,
    isPhotoSpot: true,
    crowdLevel: "Very Crowded",
  },
  {
    id: "panna-meena-kund",
    name: "Panna Meena ka Kund",
    city: "Jaipur",
    state: "Rajasthan",
    category: "culture",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.7,
    reviewCount: 1680,
    latitude: 26.9863,
    longitude: 75.8548,
    entryFee: 0,
    currency: "₹",
    visitDuration: "45 mins",
    description: "An authentic 16th-century architectural stepwell featuring an intricate criss-cross pattern of yellow-ochre geometric steps. Local lore says no one can use the same stairs twice.",
    shortDescription: "Ancient 16th-century geometric stepwell with hypnotic criss-cross staircases.",
    tags: ["Stepwell", "Architecture", "Hidden Gem", "Geometry", "Photo Spot"],
    openingHours: "Sunrise to Sunset",
    bestTime: "Early Morning (7:00 AM) with soft shadows outlining the step geometry",
    address: "Near Anokhi Museum, Amer, Jaipur, Rajasthan 302028",
    isMustVisit: false,
    isHiddenGem: true,
    isPhotoSpot: true,
    crowdLevel: "Low",
  },
  {
    id: "nahargarh-fort",
    name: "Nahargarh Fort & Sunset Point",
    city: "Jaipur",
    state: "Rajasthan",
    category: "nature",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 3900,
    latitude: 26.9372,
    longitude: 75.8157,
    entryFee: 50,
    currency: "₹",
    visitDuration: "2-3 hours",
    description: "Standing atop the rugged Aravalli ridge, Nahargarh once formed an impenetrable defense ring alongside Amer and Jaigarh. The Padao restaurant on the ramparts offers unbeatable panoramic sunset views of the entire Pink City.",
    shortDescription: "Hilltop fortress atop Aravalli hills famous for breathtaking citywide sunset vistas.",
    tags: ["Sunset", "Panoramic Views", "Aravalli", "Fort", "Chai Point"],
    openingHours: "10:00 AM - 5:30 PM (Padao Cafe open till 9:00 PM)",
    bestTime: "5:00 PM onwards to catch golden sunset over the cityscape",
    address: "Krishna Nagar, Brahampuri, Jaipur, Rajasthan 302002",
    isMustVisit: true,
    isHiddenGem: false,
    isPhotoSpot: true,
    crowdLevel: "Crowded",
  },
  // --- UDAIPUR ---
  {
    id: "city-palace-udaipur",
    name: "Udaipur City Palace",
    city: "Udaipur",
    state: "Rajasthan",
    category: "historical",
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.9,
    reviewCount: 4600,
    latitude: 24.5764,
    longitude: 73.6835,
    entryFee: 300,
    currency: "₹",
    visitDuration: "3 hours",
    description: "A monumental palace complex towering above Lake Pichola, built over 400 years with contributions from several rulers of the Mewar dynasty, famous for mirror mosaics and royal balconies.",
    shortDescription: "Magnificent lakeside royal palace complex featuring peacock courtyards and mirror mosaics.",
    tags: ["Palace", "Lake Pichola", "Mewar", "Royal", "UNESCO"],
    openingHours: "9:30 AM - 5:30 PM",
    bestTime: "Morning at opening time",
    address: "Old City, Udaipur, Rajasthan 313001",
    isMustVisit: true,
    isHiddenGem: false,
    isPhotoSpot: true,
    crowdLevel: "Crowded",
  },
  // --- VARANASI ---
  {
    id: "dashashwamedh-ghat",
    name: "Dashashwamedh Ghat",
    city: "Varanasi",
    state: "Uttar Pradesh",
    category: "culture",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.9,
    reviewCount: 6800,
    latitude: 25.3076,
    longitude: 83.0107,
    entryFee: 0,
    currency: "₹",
    visitDuration: "2-3 hours",
    description: "The vibrant heart of Varanasi riverfront where the spectacular Ganga Aarti ceremony takes place every evening with synchronized brass lamps, incense, and Vedic chants.",
    shortDescription: "Varanasi's main riverfront ghat world-famous for its evening Ganga Aarti celebration.",
    tags: ["Ganga Aarti", "Ghats", "Spiritual", "Riverfront", "Varanasi"],
    openingHours: "Open 24 Hours (Aarti at 6:45 PM)",
    bestTime: "Dawn for boat sunrise and 6:00 PM for the evening Aarti ceremony",
    address: "Dashashwamedh Ghat Rd, Bangali Tola, Varanasi, UP 221001",
    isMustVisit: true,
    isHiddenGem: false,
    isPhotoSpot: true,
    crowdLevel: "Very Crowded",
  },
  // --- GOA ---
  {
    id: "aguada-fort",
    name: "Fort Aguada & Lighthouse",
    city: "Goa",
    state: "Goa",
    category: "historical",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.7,
    reviewCount: 5100,
    latitude: 15.4925,
    longitude: 73.7736,
    entryFee: 50,
    currency: "₹",
    visitDuration: "2 hours",
    description: "A well-preserved 17th-century Portuguese fort and four-storey lighthouse standing at the confluence of the Mandovi River and the Arabian Sea with panoramic oceanic views.",
    shortDescription: "17th-century Portuguese fortress and cliffside lighthouse overlooking the Arabian Sea.",
    tags: ["Fort", "Sea Views", "Portuguese", "Goa", "Lighthouse"],
    openingHours: "9:30 AM - 6:00 PM",
    bestTime: "4:30 PM for sea breeze and sunset views",
    address: "Sinquerim, Candolim, Goa 403515",
    isMustVisit: true,
    isHiddenGem: false,
    isPhotoSpot: true,
    crowdLevel: "Crowded",
  },
];

export const SEED_STAYS: NormalizedStay[] = [
  {
    id: "nagpur-radisson",
    name: "Radisson Blu Hotel Nagpur",
    city: "Nagpur",
    type: "boutique-resort",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviewCount: 1890,
    latitude: 21.1158,
    longitude: 79.0682,
    pricePerNight: 5500,
    amenities: ["Free High-speed Wi-Fi", "Outdoor Pool", "Luxury Spa", "24/7 Room Dining"],
    description: "Premium upscale stay located in the heart of Nagpur with top-tier dining, plush suites, and tranquil pool.",
    address: "7 Wardha Road, Malviya Nagar, Nagpur, Maharashtra 440015",
    vibe: "Sophisticated luxury",
  },
  {
    id: "nagpur-backpacker-hub",
    name: "Orange City Hostel & Homestay",
    city: "Nagpur",
    type: "hostel",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    reviewCount: 340,
    latitude: 21.1422,
    longitude: 79.0754,
    pricePerNight: 650,
    amenities: ["Air-Conditioned Pods", "Co-working Space", "Free Breakfast", "Travel Desk"],
    description: "Budget-friendly, community-focused hostel designed for digital nomads, solo travelers, and students.",
    address: "Ramdaspeth, Central Nagpur, Maharashtra 440010",
    vibe: "Social, friendly backpacker vibe",
  },
  {
    id: "jaipur-zostel",
    name: "Zostel Jaipur (Hawa Mahal Rd)",
    city: "Jaipur",
    type: "hostel",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewCount: 1420,
    latitude: 26.9248,
    longitude: 75.8282,
    pricePerNight: 750,
    amenities: ["Rooftop Cafe", "Walking Tours", "Bunk Pods", "High-speed Wi-Fi"],
    description: "Vibrant backpacker hub located 2 minutes walking distance from Hawa Mahal. Host of daily old city walking and street food tours.",
    address: "First Floor, Opposite Hawa Mahal, Badi Choupad, Jaipur",
    vibe: "Lively social backpacker haven",
  },
  {
    id: "jaipur-haveli",
    name: "Samode Haveli Heritage Stay",
    city: "Jaipur",
    type: "boutique-resort",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewCount: 880,
    latitude: 26.9312,
    longitude: 75.8344,
    pricePerNight: 8500,
    amenities: ["Heritage Courtyard Pool", "Fine Dining", "Spa Services", "Royal Suites"],
    description: "An aristocratic 175-year-old traditional mansion turned heritage hotel with hand-painted murals and courtyard gardens.",
    address: "Ganga Pole, Jaipur, Rajasthan 302002",
    vibe: "Royal heritage luxury",
  },
];

export const SEED_RESTAURANTS: NormalizedRestaurant[] = [
  {
    id: "nagpur-ramji-shyamji-pohe",
    name: "Ramji-Shyamji Pohewala",
    city: "Nagpur",
    placeCategory: "street-food",
    cuisine: "Nagpuri Street Food / Tarri Poha",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewCount: 2900,
    latitude: 21.1512,
    longitude: 79.0825,
    priceRange: "$",
    costForTwo: 120,
    mustTryDish: "Spicy Tarri Poha with crispy chivda and boiled chana",
    description: "The most legendary breakfast spot in Nagpur serving fiery, flavor-packed tarri poha that locals have relished for decades.",
    address: "Wardha Road, Opposite Rahate Colony, Nagpur",
    openingHours: "6:00 AM - 1:00 PM",
    tags: ["Legendary", "Tarri Poha", "Breakfast", "Nagpur Specialty"],
  },
  {
    id: "nagpur-saoji-bhojnalaya",
    name: "Haldiram's Thhat Baat & Saoji Spices",
    city: "Nagpur",
    placeCategory: "restaurant",
    cuisine: "Authentic Saoji & Vidarbha Thali",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviewCount: 3400,
    latitude: 21.1441,
    longitude: 79.0874,
    priceRange: "$$",
    costForTwo: 600,
    mustTryDish: "Vidarbha Saoji Gravy & Jowar Bhakri",
    description: "Famous family restaurant serving fiery authentic Vidarbha curries, hearty thalis, and Nagpur's sweet orange barfi.",
    address: "Dharampeth Main Road, Nagpur, Maharashtra",
    openingHours: "11:00 AM - 11:00 PM",
    tags: ["Saoji", "Vidarbha Food", "Thali", "Family Dining"],
  },
  {
    id: "jaipur-wind-view-cafe",
    name: "Wind View Cafe (Rooftop)",
    city: "Jaipur",
    placeCategory: "cafe",
    cuisine: "Rajasthani Snacks, Masala Chai, Continental",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviewCount: 2200,
    latitude: 26.9242,
    longitude: 75.8262,
    priceRange: "$$",
    costForTwo: 450,
    mustTryDish: "Kulhad Masala Chai & Pyaaz Kachori",
    description: "Iconic rooftop cafe situated directly across the street from Hawa Mahal offering front-row panoramic views of the pink facade.",
    address: "3rd Floor, Opposite Hawa Mahal, Badi Choupad, Jaipur",
    openingHours: "7:30 AM - 10:00 PM",
    tags: ["Hawa Mahal View", "Rooftop", "Chai", "Sunset Spot"],
  },
  {
    id: "jaipur-rawat-mishthan",
    name: "Rawat Mishthan Bhandar",
    city: "Jaipur",
    placeCategory: "street-food",
    cuisine: "Authentic Rajasthani Sweets & Kachoris",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewCount: 4800,
    latitude: 26.9195,
    longitude: 75.7985,
    priceRange: "$",
    costForTwo: 200,
    mustTryDish: "Crispy Pyaaz Ki Kachori (Onion Kachori) & Mawa Kachori",
    description: "Jaipur's universally acclaimed savory institution, producing thousands of piping hot, flaky pyaaz kachoris daily since 1972.",
    address: "Station Road, Sindhi Camp, Jaipur, Rajasthan 302001",
    openingHours: "6:00 AM - 10:30 PM",
    tags: ["Legendary", "Pyaaz Kachori", "Heritage Snack", "Must-Try"],
  },
];
