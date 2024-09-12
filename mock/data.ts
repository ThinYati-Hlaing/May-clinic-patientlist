
export interface PatientDataType {
  id: string;
  isDone: boolean;
  name: string;
  status: string;
  pawrent: string;
  breed: string;
  gender: string;
  birth: string;
  phone: string;
  address: string;
  icon: string;
  city?: string;
  town?: string;
}

const PatientData: PatientDataType[] = [
    {
        id: "B-0025",
        isDone: false,
        name: "Milo",
        status: "allergy",
        pawrent: "The `Nu San",
        breed: "Beagle",
        gender: "Male",
        birth:"1.5.2021",
        phone: "09788564860",
        address: "တိုက်(၅) ၊ အခန်း(၀၀၁)၊ လိူင်သီရိအိမ်ရာ, Hlaing, Yangon.",
        icon:      "/image/more.png"

      },
      {
        id: "S-0189",
        isDone: false,
        name: "MJ",
        status: "allergy",
        pawrent: "Naychi Lin",
        breed: "Spaniel",
        gender: "Female",
        birth:"18.6.2021",
        phone: "09784517545",
        address: "ခြံအမှတ် (၅)၊ စံပယ်ခြံ (၂)လမ်း, Hlaing, Yangon.",
        icon:    "/image/more.png"
      },
      {
        id: "G-0089",
        isDone: false,
        name: "Lu Lu",
        status: "pickyEater",
        pawrent: "Pink Pink",
        breed: "Golden Retriever",
        gender: "Female",
        birth:"1.5.2021",
        phone: "09794781245",
        address: "တိုက် (1A)၊ အခန်း (၀၀၅)၊ Gems Condo, Hlaing, Yangon",
        icon:      "/image/more.png"

      },
      {
        id: "G-0090",
        isDone: false,
        name: "Sky",
        status: "pickyEater",
        pawrent: "Kyaw Min Oo",
        breed: "Golden Retriever",
        gender: "Male",
        birth:"1.5.2021",
        phone: "09979458712",
        address: "တိုက်(၅) ၊ အခန်း(၂၁)၊ စမ်းချောင်းရိပ်မွန်, Sanchaung, Yangon.",
        icon:      "/image/more.png"

      },
      {
        id: "G-0098",
        isDone: false,
        name: "Lu Lu",
        status: "pickyEater",
        pawrent: "Pink Pink",
        breed: "Golden Retriever",
        gender: "Female",
        birth:"1.5.2021",
        phone: "09254200154",
        address: "ခြံအမှတ် (၃၅)၊ မြယာကုန်း (၃)လမ်း ၊ Mayangonr, Yangon.",
        icon:      "/image/more.png"

      },
      {
        id: "G-0099",
        isDone: false,
        name: "Lu Lu",
        status: "pickyEater",
        pawrent: "Pink Pink",
        breed: "Golden Retriever",
        gender: "Female",
        birth:"1.5.2021",
        phone: "09784587125",
        address: "တိုက်(1A) ၊ အခန်း(၀၀၅)၊ , မြကန်သာအိမ်ရာ, Kamayut, Yangon.",
        icon:      "/image/more.png"

      }
]

export default PatientData;