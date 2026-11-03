export interface LocationData {
  divisions: {
    name: string;
    districts: {
      name: string;
      thanas: string[];
    }[];
  }[];
}

export const BANGLADESH_LOCATIONS: LocationData = {
  divisions: [
    {
      name: "Dhaka",
      districts: [
        {
          name: "Dhaka",
          thanas: [
            "Gulshan",
            "Banani",
            "Dhanmondi",
            "Uttara",
            "Mirpur",
            "Mohammadpur",
            "Badda",
            "Motijheel",
            "Tejgaon",
            "Khilgaon",
            "Rampura",
            "Baridhara",
            "Bashundhara R/A",
            "Lalbagh",
            "Shahbagh",
            "Pallabi",
            "Shyamoli",
            "New Market",
            "Wari",
            "Jatrabari",
            "Demra",
            "Keraniganj",
            "Savar",
            "Dhamrai",
          ],
        },
        {
          name: "Gazipur",
          thanas: ["Gazipur Sadar", "Tongie", "Kaliakair", "Kapasia", "Sreepur", "Kaliganj"],
        },
        {
          name: "Narayanganj",
          thanas: ["Narayanganj Sadar", "Bandar", "Fatullah", "Siddhirganj", "Rupganj", "Sonargaon", "Araihazar"],
        },
        {
          name: "Tangail",
          thanas: ["Tangail Sadar", "Mirzapur", "Nagarpur", "Madhupur", "Gopalpur", "Ghatail"],
        },
        {
          name: "Faridpur",
          thanas: ["Faridpur Sadar", "Boalmari", "Bhanga", "Nagarkanda", "Madhukhali"],
        },
        {
          name: "Manikganj",
          thanas: ["Manikganj Sadar", "Singair", "Saturia", "Shivalaya", "Harirampur"],
        },
        {
          name: "Munshiganj",
          thanas: ["Munshiganj Sadar", "Sreenagar", "Sirajdikhan", "Tongibari", "Lohajang", "Gazaria"],
        },
        {
          name: "Narsingdi",
          thanas: ["Narsingdi Sadar", "Palash", "Shibpur", "Raipura", "Belabo", "Monohardi"],
        },
        {
          name: "Kishoreganj",
          thanas: ["Kishoreganj Sadar", "Bhairab", "Bajitpur", "Katiadi", "Pakundia", "Karimganj"],
        },
      ],
    },
    {
      name: "Chittagong",
      districts: [
        {
          name: "Chittagong",
          thanas: ["Panchlaish", "Khulshi", "Kotwali", "Agrabad", "Halishahar", "Double Mooring", "Nasirabad", "Bayezid", "Patenga", "Chawkbazar", "GEC Circle", "Hathazari", "Sitakunda", "Patiya"],
        },
        {
          name: "Cox's Bazar",
          thanas: ["Cox's Bazar Sadar", "Ramu", "Chakaria", "Teknaf", "Ukhia", "Maheshkhali", "Pekua"],
        },
        {
          name: "Comilla",
          thanas: ["Comilla Sadar", "Daudkandi", "Chandina", "Debidwar", "Muradnagar", "Homna", "Laksam", "Burichang"],
        },
        {
          name: "Brahmanbaria",
          thanas: ["Brahmanbaria Sadar", "Ashuganj", "Sarail", "Kasba", "Nabinagar", "Akhaura"],
        },
        {
          name: "Noakhali",
          thanas: ["Noakhali Sadar", "Begumganj", "Senbagh", "Chatkhil", "Companyganj", "Hatiya"],
        },
        {
          name: "Feni",
          thanas: ["Feni Sadar", "Chhagalnaiya", "Daganbhuiyan", "Parshuram", "Fulgazi", "Sonagazi"],
        },
        {
          name: "Chandpur",
          thanas: ["Chandpur Sadar", "Hajiganj", "Faridganj", "Matlab North", "Matlab South", "Shahrasti"],
        },
      ],
    },
    {
      name: "Sylhet",
      districts: [
        {
          name: "Sylhet",
          thanas: ["Sylhet Sadar", "South Surma", "Beanibazar", "Golapganj", "Biswanath", "Zakiganj", "Osmani Nagar", "Fenchuganj"],
        },
        {
          name: "Moulvibazar",
          thanas: ["Moulvibazar Sadar", "Sreemangal", "Kulaura", "Rajnagar", "Kamalganj", "Barlekha", "Juri"],
        },
        {
          name: "Habiganj",
          thanas: ["Habiganj Sadar", "Madhabpur", "Nabiganj", "Chunarughat", "Bahubal", "Baniachang"],
        },
        {
          name: "Sunamganj",
          thanas: ["Sunamganj Sadar", "Chhatak", "Jagannathpur", "Derai", "Tahirpur", "Dowarabazar"],
        },
      ],
    },
    {
      name: "Rajshahi",
      districts: [
        {
          name: "Rajshahi",
          thanas: ["Boalia", "Rajpara", "Motihar", "Shah Makhdum", "Paba", "Godagari", "Bagmara", "Tanore"],
        },
        {
          name: "Bogra",
          thanas: ["Bogra Sadar", "Sherpur", "Shibganj", "Gabtali", "Shajahanpur", "Dhunat", "Kahaloo"],
        },
        {
          name: "Pabna",
          thanas: ["Pabna Sadar", "Ishwardi", "Santhia", "Bera", "Chatmohar", "Sujanagar", "Faridpur"],
        },
        {
          name: "Sirajganj",
          thanas: ["Sirajganj Sadar", "Ullapara", "Shahjadpur", "Belkuchi", "Kamarkhanda", "Kazipur"],
        },
        {
          name: "Naogaon",
          thanas: ["Naogaon Sadar", "Mohadevpur", "Patnitala", "Manda", "Badalgachhi", "Dhamoirhat"],
        },
      ],
    },
    {
      name: "Khulna",
      districts: [
        {
          name: "Khulna",
          thanas: ["Khulna Sadar", "Sonadanga", "Khalishpur", "Daulatpur", "Khan Jahan Ali", "Dighalia", "Rupsha", "Dumuria", "Batiaghata"],
        },
        {
          name: "Jessore",
          thanas: ["Jessore Sadar", "Jhikargachha", "Sharsha", "Monirampur", "Keshabpur", "Abhaynagar", "Bagherpara"],
        },
        {
          name: "Kushtia",
          thanas: ["Kushtia Sadar", "Kumarkhali", "Bheramara", "Mirpur", "Daulatpur", "Khoksa"],
        },
        {
          name: "Satkhira",
          thanas: ["Satkhira Sadar", "Kalaroa", "Tala", "Debhata", "Kaliganj", "Assasuni", "Shyamnagar"],
        },
      ],
    },
    {
      name: "Barisal",
      districts: [
        {
          name: "Barisal",
          thanas: ["Kotwali", "Airport", "Kaunia", "Babuganj", "Bakerganj", "Banaripara", "Gournadi", "Mehendiganj", "Wazirpur"],
        },
        {
          name: "Patuakhali",
          thanas: ["Patuakhali Sadar", "Galachipa", "Bauphal", "Kalapara", "Mirzaganj", "Dumki"],
        },
        {
          name: "Bhola",
          thanas: ["Bhola Sadar", "Daulatkhan", "Burhanuddin", "Lalmohan", "Char Fasson", "Tazumuddin"],
        },
      ],
    },
    {
      name: "Rangpur",
      districts: [
        {
          name: "Rangpur",
          thanas: ["Rangpur Sadar", "Kotwali", "Mithapukur", "Pirganj", "Badarganj", "Gangachara", "Kaunia"],
        },
        {
          name: "Dinajpur",
          thanas: ["Dinajpur Sadar", "Birganj", "Kaharole", "Birol", "Bochaganj", "Phulbari", "Parbatipur"],
        },
        {
          name: "Saidpur",
          thanas: ["Saidpur Sadar", "Kishoreganj", "Jaldhaka", "Domar", "Dimla"],
        },
      ],
    },
    {
      name: "Mymensingh",
      districts: [
        {
          name: "Mymensingh",
          thanas: ["Mymensingh Sadar", "Muktagachha", "Phulpur", "Trishal", "Bhaluka", "Gafargaon", "Gauripur", "Ishwarganj"],
        },
        {
          name: "Jamalpur",
          thanas: ["Jamalpur Sadar", "Sarishabari", "Melandaha", "Dewanganj", "Islampur", "Madarganj", "Baksiganj"],
        },
      ],
    },
  ],
};
