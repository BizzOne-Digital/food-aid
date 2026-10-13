// Default content. Used for seeding and as a fallback when a field is missing in MongoDB.
const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  hero: "/images/hero.png",
  aboutPreview: u("1627903634010-cacbe106fad2"),
  promo: u("1728497872607-fa0b98a3eb79", 2000),
  nurseSmiling: u("1765896387387-0538bc9f997e"),
  nurseChat: u("1765896387398-1e1ae8d2eb85"),
  caregiverWalker: u("1773227055624-07b515ba87c5"),
  seniorTalk: u("1773227059784-c1e36cc8c8c9"),
  holdingHands: u("1584515933487-779824d29309"),
  nurseSenior: u("1576765608535-5f04d1e3f289"),
  footHold: u("1675159364623-6938e10245f0"),
};

export type FeatureItem = { icon: string; title: string; subtitle: string };

export type HomeContent = {
  heroEyebrow: string;
  heroTitleLine1: string;
  heroHighlight: string;
  heroTitleAfter: string;
  heroDescription: string;
  heroImage: string;
  heroDecorLine1: string;
  heroDecorLine2: string;
  heroPrimaryLabel: string;
  heroPrimaryHref: string;
  heroSecondaryLabel: string;
  heroSecondaryHref: string;
  heroFeatures: FeatureItem[];
  servicesEyebrow: string;
  servicesTitle: string;
  servicesDescription: string;
  servicesHighlightLine1: string;
  servicesHighlightLine2: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutText: string;
  aboutImage: string;
  aboutOverlay: string;
  aboutFeatures: FeatureItem[];
  offerKicker: string;
  offerTitle: string;
  offerPercentage: string;
  offerDescription: string;
  offerPillLine1: string;
  offerPillLine2: string;
  offerTerms: string;
  promoImage: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  footerCtaTitle: string;
  footerCtaText: string;
  footerCtaLabel: string;
  trustItems: FeatureItem[];
  stepsEyebrow: string;
  stepsTitle: string;
  stepsDescription: string;
  steps: StepItem[];
  signsEyebrow: string;
  signsTitle: string;
  signsDescription: string;
  signs: string[];
  signsNote: string;
  safetyEyebrow: string;
  safetyTitle: string;
  safetyText: string;
  safetyImage: string;
  safetyPoints: string[];
  facilitiesEyebrow: string;
  facilitiesTitle: string;
  facilitiesText: string;
  facilitiesImage: string;
  facilitiesPoints: string[];
  facilitiesCtaLabel: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: FaqItem[];
  finalCtaTitle: string;
  finalCtaText: string;
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefitsText: string;
  benefitsImage: string;
  benefitsVideo: string;
  benefits: string[];
  driveEyebrow: string;
  driveTitle: string;
  driveHighlight: string;
  driveSubtitle: string;
  driveAreas: string;
  driveCtaKicker: string;
  driveCtaLabel: string;
};

export type StepItem = { title: string; text: string };
export type FaqItem = { question: string; answer: string };

export const defaultHome: HomeContent = {
  heroEyebrow: "Mobile Foot Care Nurse in Calgary",
  heroTitleLine1: "Healthy, Pain-Free Feet.",
  heroHighlight: "We Come to You.",
  heroTitleAfter: "",
  heroDescription:
    "Safe, professional foot care from an Advanced Foot Care Nurse, at your home, care facility or hospital in Calgary and surrounding areas.",
  heroImage: IMAGES.hero,
  heroDecorLine1: "Healthy Feet",
  heroDecorLine2: "Happier Days!",
  heroPrimaryLabel: "Book an Appointment",
  heroPrimaryHref: "/booking",
  heroSecondaryLabel: "Learn More",
  heroSecondaryHref: "/about",
  heroFeatures: [
    { icon: "Home", title: "Mobile Service", subtitle: "Home, facility or hospital" },
    { icon: "Nurse", title: "Advanced Foot Care", subtitle: "Nurse-led treatment" },
    { icon: "Users", title: "For All Ages", subtitle: "Every foot care need" },
  ],
  servicesEyebrow: "Mobile Foot Care in Calgary",
  servicesTitle: "Our Services",
  servicesDescription:
    "Diabetic foot care, nail trimming and treatment for corns, calluses and problem nails for people of all ages, provided on site at your home, care facility or hospital.",
  servicesHighlightLine1: "Free Foot Assessment",
  servicesHighlightLine2: "for New Clients",
  aboutEyebrow: "About Foot Aid",
  aboutTitle: "Caring for Your Feet,\nWhere You Feel Most Comfortable",
  aboutText:
    "Foot Aid is a mobile-only foot care nurse service. We do not operate from a clinic. Instead, we bring professional foot care to you, at home, in care facilities and in hospitals throughout Calgary and surrounding areas, for clients of all ages and needs.",
  aboutImage: IMAGES.aboutPreview,
  aboutOverlay: "Bringing\nProfessional\nFoot Care\nto You",
  aboutFeatures: [
    { icon: "Home", title: "Mobile Service", subtitle: "We come to you" },
    { icon: "Nurse", title: "Experienced Nurse", subtitle: "Advanced foot care" },
    { icon: "MapPin", title: "Homes & Hospitals", subtitle: "Calgary & area" },
  ],
  offerKicker: "Join Us Today",
  offerTitle: "Get {percent} OFF",
  offerPercentage: "20%",
  offerDescription: "Your First Treatment Visit",
  offerPillLine1: "Plus, a",
  offerPillLine2: "Free Foot Assessment!",
  offerTerms: "New clients only. 20% off the treatment portion of your first visit. One per client; cannot be combined with other offers.",
  promoImage: IMAGES.promo,
  testimonialsEyebrow: "What Our Clients Say",
  testimonialsTitle: "Testimonials",
  footerCtaTitle: "Book an Appointment",
  footerCtaText: "Book your mobile foot care visit today. We come to your home, care facility or hospital.",
  footerCtaLabel: "Book Now",
  trustItems: [
    { icon: "Nurse", title: "Nurse-Led Care", subtitle: "Advanced foot care training" },
    { icon: "ShieldCheck", title: "Hygienic Practices", subtitle: "Clean instruments every visit" },
    { icon: "ClipboardCheck", title: "Free Assessment", subtitle: "For new clients" },
    { icon: "MapPin", title: "Mobile Only", subtitle: "We come to you" },
  ],
  stepsEyebrow: "How It Works",
  stepsTitle: "Foot Care in 4 Simple Steps",
  stepsDescription: "No travel, no waiting rooms. Booking a visit takes only a few minutes.",
  steps: [
    { title: "Request a Visit", text: "Book online or call or text us with your preferred date, time and location." },
    { title: "We Confirm", text: "We contact you to confirm the visit and note any mobility or health needs." },
    { title: "Assessment", text: "Your nurse checks your feet, skin, nails and circulation, and explains the plan. Free for new clients." },
    { title: "Gentle Treatment", text: "Care is completed on site, with simple tips to keep your feet healthy." },
  ],
  signsEyebrow: "When to Book",
  signsTitle: "Signs You May Need Professional Foot Care",
  signsDescription:
    "Foot problems can affect anyone and often go untreated. Book a visit if you notice any of these:",
  signs: [
    "Thick, hard or discoloured toenails",
    "Painful, curved or ingrown nails",
    "Hard skin, calluses or corns",
    "Difficulty reaching or trimming your own nails",
    "Diabetes or poor circulation",
    "Discomfort when walking or wearing shoes",
  ],
  signsNote: "If you have an open wound, signs of infection or sudden pain, please contact your doctor first.",
  safetyEyebrow: "Hygiene & Safety",
  safetyTitle: "Careful, Hygienic Care Wherever You Are",
  safetyText:
    "We follow infection-prevention practices at every visit and are always happy to explain how our instruments are cleaned and prepared.",
  safetyImage: "/images/img1.png",
  safetyPoints: [
    "Clean instruments prepared for each client",
    "Disposable gloves and single-use supplies where appropriate",
    "Review of your health history and medications",
    "Extra care for clients with diabetes or circulation concerns",
    "Clear notes and advice after every appointment",
  ],
  facilitiesEyebrow: "For Hospitals & Care Facilities",
  facilitiesTitle: "On-Site Foot Care for Hospitals & Care Facilities",
  facilitiesText:
    "We provide on-site foot care in hospitals, retirement homes, assisted living residences and long-term care facilities across Calgary, for individual patients or scheduled visits for multiple residents.",
  facilitiesImage: "/images/img2.png",
  facilitiesPoints: [
    "Bedside foot care for hospital patients",
    "Scheduled on-site visits for multiple residents",
    "Routine nail trimming, corn and callus care",
    "Diabetic and high-risk foot care",
    "Clear care notes for staff and families",
    "Flexible scheduling around your facility's routine",
  ],
  facilitiesCtaLabel: "Discuss a Partnership",
  faqEyebrow: "Questions & Answers",
  faqTitle: "Frequently Asked Questions",
  faqs: [
    {
      question: "Is there a mobile foot care nurse near me in Calgary?",
      answer: "Yes. Foot Aid is a mobile-only service. We visit clients at home, in care facilities and in hospitals throughout Calgary, Airdrie, Chestermere, Cochrane, Okotoks and surrounding areas.",
    },
    {
      question: "Is the foot assessment really free?",
      answer: "Yes, for new clients. Your first visit includes a free foot assessment so we can understand your needs before any treatment.",
    },
    {
      question: "Do you provide diabetic foot care?",
      answer: "Yes. We provide diabetic foot care at home, in care facilities and in hospital, including nail and skin care and regular foot checks. We will refer you to your doctor if we find anything that needs medical attention.",
    },
    {
      question: "What does the 20% off offer include?",
      answer: "New clients receive 20% off the treatment portion of their first visit. The offer is one per client and cannot be combined with other offers.",
    },
    {
      question: "How long does a visit take?",
      answer: "Most visits take 45 to 60 minutes, depending on the care needed. We never rush an appointment.",
    },
    {
      question: "Do I need a doctor's referral?",
      answer: "No referral is needed. If we find something that needs medical attention, we will recommend that you see your doctor.",
    },
    {
      question: "Do you have a clinic I can visit?",
      answer: "No. Foot Aid is mobile only. We come to you at home, in a care facility or in hospital.",
    },
    {
      question: "Can you visit hospitals, retirement homes or care residences?",
      answer: "Yes. We provide on-site care in hospitals, retirement residences, assisted living and long-term care facilities.",
    },
    {
      question: "What do I need to prepare for the visit?",
      answer: "Just a comfortable chair and good lighting. We bring all equipment and supplies with us.",
    },
  ],
  benefitsEyebrow: "Why Regular Foot Care Helps",
  benefitsTitle: "What Good Foot Care Does for You",
  benefitsText: "Small nail and skin problems can turn into pain or infection if they are left alone. Regular visits from a foot care nurse help you stay comfortable and keep moving.",
  benefitsImage: "https://images.unsplash.com/photo-1545463913-5083aa7359a6?auto=format&fit=crop&w=1200&q=80",
  benefitsVideo: "/videos/foot-care.mp4",
  benefits: [
    "Catches small problems before they become painful",
    "Keeps nails trimmed and skin healthy",
    "Lowers the risk of cuts, infection and falls",
    "Leaves your feet comfortable and cared for",
  ],
  driveEyebrow: "Mobile Foot Care Nurse",
  driveTitle: "No clinic. No waiting room.",
  driveHighlight: "We come to you.",
  driveSubtitle: "Safe, professional foot care from an Advanced Foot Care Nurse.",
  driveAreas: "Serving Calgary, Airdrie, Chestermere, Cochrane, Okotoks and surrounding areas.",
  driveCtaKicker: "Now Booking",
  driveCtaLabel: "Book Your Visit",
  finalCtaTitle: "Give Your Feet the Care They Deserve",
  finalCtaText: "Book your visit today. New clients get 20% off their first treatment visit, plus a free foot assessment.",
};

export type AboutSection = { title: string; body: string; image: string };
export type ValueItem = { icon: string; title: string; text: string };

export type AboutContent = {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  story: AboutSection;
  whyMobile: AboutSection;
  approach: AboutSection;
  whoWeHelpTitle: string;
  whoWeHelp: string[];
  whoWeHelpImage: string;
  whyChooseTitle: string;
  whyChoose: ValueItem[];
  serviceAreasTitle: string;
  serviceAreasText: string;
  serviceAreas: string[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
};

export const defaultAbout: AboutContent = {
  eyebrow: "About Foot Aid",
  title: "Professional Foot Care,\nDelivered to Your Home",
  intro:
    "Foot Aid is a mobile-only foot care nurse service. We bring professional foot care to homes, care facilities and hospitals across Calgary and surrounding areas, for people of all ages.",
  heroImage: "/images/img2.png",
  story: {
    title: "Our Story",
    body:
      "Foot Aid was created to close a simple but important gap: many people, from busy adults to seniors and hospital patients, cannot easily travel to a clinic for regular foot care. Healthy feet are essential for comfort, balance and independence, so we bring professional nursing foot care directly to you, wherever you are.",
    image: IMAGES.nurseChat,
  },
  whyMobile: {
    title: "Why Mobile Foot Care Matters",
    body:
      "Untreated nail and skin concerns can lead to pain, infection and a higher risk of falls. When getting to an appointment is difficult, regular care is often delayed. Mobile foot care removes the travel, waiting rooms and stress, so problems are treated early and comfortably, at home, in a care facility or in hospital.",
    image: "/images/img3.png",
  },
  approach: {
    title: "Our Approach",
    body:
      "Every visit begins with listening. We complete a careful foot assessment, explain what we see in plain language, and agree on a care plan that suits your comfort and health needs. Treatments are gentle, hygienic and unhurried, using clean, properly prepared instruments and professional techniques.",
    image: "/images/img6.png",
  },
  whoWeHelpTitle: "Who We Help",
  whoWeHelp: [
    "Adults of all ages who want professional foot and nail care",
    "People living with diabetes or circulation concerns",
    "Seniors at home or in retirement residences",
    "Hospital patients and those recovering from illness or surgery",
    "Anyone who finds it difficult to reach or care for their own feet",
  ],
  whoWeHelpImage: "/images/img5.png",
  whyChooseTitle: "Why Choose Us",
  whyChoose: [
    { icon: "Home", title: "Mobile-Only Visits", text: "We come to your home, facility or hospital." },
    { icon: "Nurse", title: "Professional Advanced Care", text: "Nurse-led treatment with properly prepared tools." },
    { icon: "Users", title: "Care for All Ages", text: "Gentle, patient care for every foot care need." },
    { icon: "Heart", title: "Compassionate Approach", text: "Respectful, reassuring and unhurried visits." },
    { icon: "ClipboardCheck", title: "Personalized Assessment", text: "A care plan based on your feet and needs." },
    { icon: "MapPin", title: "Calgary & Surrounding Areas", text: "Serving Calgary and nearby communities." },
  ],
  serviceAreasTitle: "Service Areas",
  serviceAreasText:
    "We serve clients throughout Calgary and surrounding communities. Not sure if we reach you? Contact us and we will confirm.",
  serviceAreas: ["Calgary", "Airdrie", "Chestermere", "Cochrane", "Okotoks", "Strathmore"],
  ctaTitle: "Ready to Book Your Visit?",
  ctaText: "Book your mobile foot care visit today. New clients receive 20% off their first treatment visit, plus a free foot assessment.",
  ctaLabel: "Book an Appointment",
};

export type SocialLinks = { facebook: string; instagram: string; linkedin: string; google: string };

export type SiteSettingsData = {
  businessName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  serviceArea: string;
  footerDescription: string;
  logoUrl: string;
  faviconUrl: string;
  social: SocialLinks;
  offerEnabled: boolean;
  offerPercentage: string;
  offerText: string;
  seoTitle: string;
  seoDescription: string;
  seoImage: string;
};

export const defaultSettings: SiteSettingsData = {
  businessName: "Foot Aid",
  tagline: "Mobile Foot Care Nurse",
  email: "leymn.ali@gmail.com",
  phone: "+1 587-707-1099",
  address: "Calgary, Alberta",
  serviceArea: "Mobile service: we come to you",
  footerDescription:
    "Mobile-only foot care nursing for all ages. We come to your home, care facility or hospital in Calgary and surrounding areas.",
  logoUrl: "",
  faviconUrl: "",
  social: { facebook: "", instagram: "", linkedin: "", google: "" },
  offerEnabled: true,
  offerPercentage: "20%",
  offerText: "New clients: 20% OFF your first treatment visit, plus a Free Foot Assessment.",
  seoTitle: "Mobile Foot Care Nurse in Calgary | Foot Aid",
  seoDescription:
    "Foot Aid is a mobile foot care nurse in Calgary. We come to your home, care facility or hospital for diabetic foot care, nail trimming, senior foot care, and corn and callus care. Free assessment for new clients.",
  seoImage: IMAGES.hero,
};

export type ServiceData = {
  _id?: string;
  title: string;
  slug: string;
  imageUrl: string;
  /** Optional real before/after photos (client results, with consent). */
  beforeImage?: string;
  afterImage?: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  isActive: boolean;
  sortOrder: number;
};

export const defaultServices: ServiceData[] = [
  {
    title: "Free Foot Assessment",
    slug: "free-foot-assessment",
    imageUrl: "/images/service1.png",
    iconName: "ClipboardCheck",
    shortDescription: "A full check of your foot health and care needs. Free for new clients.",
    fullDescription:
      "Every new client starts with a complete, no-cost assessment. We check skin, nails, circulation and sensation, review any concerns or medical conditions, and recommend a care plan that fits your needs. You get clear answers before any treatment begins.",
    isActive: true,
    sortOrder: 1,
  },
  {
    title: "Routine Foot & Nail Care",
    slug: "routine-foot-nail-care",
    imageUrl: u("1675159364623-6938e10245f0", 900),
    iconName: "Scissors",
    shortDescription: "Regular nail trimming, filing and skin care to keep feet comfortable.",
    fullDescription:
      "Regular foot care keeps nails at a safe length and skin healthy. Each visit includes nail trimming and filing, gentle skin care and a quick check for any changes, so small problems are caught early. Ideal for anyone who finds it hard to reach or trim their own nails.",
    isActive: true,
    sortOrder: 2,
  },
  {
    title: "Diabetic Foot Care",
    slug: "diabetic-foot-care",
    imageUrl: "/images/img3.png",
    iconName: "ShieldCheck",
    shortDescription: "Careful nail and skin care for clients living with diabetes.",
    fullDescription:
      "Diabetes can reduce sensation and circulation in the feet, so even small cuts or pressure areas need attention. We provide careful nail and skin care, check for early warning signs and share daily foot care tips. If we notice anything that needs medical attention, we will advise you to contact your doctor.",
    isActive: true,
    sortOrder: 3,
  },
  {
    title: "Senior Foot Care",
    slug: "senior-foot-care",
    imageUrl: "/images/img6.png",
    iconName: "Users",
    shortDescription: "Gentle, patient foot care for seniors, wherever they live.",
    fullDescription:
      "As we age, nails thicken, skin becomes more fragile and reaching our feet gets harder. Our senior foot care visits combine nail care, corn and callus care and a foot health check, delivered with patience and respect at home, in residence or in hospital.",
    isActive: true,
    sortOrder: 4,
  },
  {
    title: "Thickened Nail Care",
    slug: "thickened-nail-care",
    imageUrl: u("1633526543913-d30e3c230d1f", 900),
    iconName: "Layers",
    shortDescription: "Safe reduction of thick, hard or discoloured toenails.",
    fullDescription:
      "Thick, yellow or discoloured toenails can be painful, press against shoes and be very hard to cut yourself. We safely file and reduce the nail thickness to relieve pressure and make nails easier to manage between visits.",
    isActive: true,
    sortOrder: 5,
  },
  {
    title: "Ingrown Nail Care",
    slug: "ingrown-nail-care",
    imageUrl: "/images/service2.png",
    iconName: "Scissors",
    shortDescription: "Safe and professional care for uncomfortable or ingrown nails.",
    fullDescription:
      "Ingrown nails can be painful and may lead to infection if left untreated. We gently trim and relieve the affected nail edge using clean instruments, and share simple tips to help prevent it from coming back.",
    isActive: true,
    sortOrder: 6,
  },
  {
    title: "Callus Care",
    slug: "callus-care",
    imageUrl: "/images/service3.png",
    iconName: "Layers",
    shortDescription: "Professional treatment of hard, thickened skin for healthier feet.",
    fullDescription:
      "Calluses build up over pressure points and can make walking uncomfortable. We safely reduce thickened skin, smooth the area and advise on footwear and moisturizing to keep your feet comfortable between visits.",
    isActive: true,
    sortOrder: 7,
  },
  {
    title: "Corn Care",
    slug: "corn-care",
    imageUrl: "/images/service4.png",
    iconName: "CircleDot",
    shortDescription: "Gentle treatment designed to relieve discomfort caused by corns.",
    fullDescription:
      "Corns are small areas of hardened skin that can press on nerves and cause sharp pain. We carefully reduce the corn, relieve the pressure and recommend padding or footwear changes to support lasting comfort.",
    isActive: true,
    sortOrder: 8,
  },
  {
    title: "Involuted Nail Care",
    slug: "involuted-nail-care",
    imageUrl: "/images/service5.png",
    iconName: "Footprints",
    shortDescription: "Specialized care for curved or involuted nails.",
    fullDescription:
      "Involuted nails curve inward and can pinch the skin along the nail edges. We thin, trim and file the nail to relieve pressure, and assess whether a correction option such as Onyfix may help.",
    isActive: true,
    sortOrder: 9,
  },
  {
    title: "Onyfix Correction",
    slug: "onyfix-correction",
    imageUrl: "/images/service6.png",
    iconName: "ShieldCheck",
    shortDescription: "Modern Onyfix nail correction designed to support healthier nail growth.",
    fullDescription:
      "Onyfix is a gentle, non-invasive nail correction system. A thin composite brace is applied to the nail surface to guide it to grow flatter over time. It is painless, requires no injections and lets you continue normal daily activities.",
    isActive: true,
    sortOrder: 10,
  },
];

export type TestimonialData = {
  _id?: string;
  clientName: string;
  location: string;
  rating: number;
  review: string;
  image: string;
  isPublished: boolean;
  sortOrder: number;
};

/**
 * Sample reviews for layout only. They are seeded UNPUBLISHED so nothing fake appears on the site.
 * Replace them with genuine client reviews (with permission) in Admin > Testimonials, then publish.
 */
export const defaultTestimonials: TestimonialData[] = [
  {
    clientName: "Sample Review",
    location: "Calgary, AB",
    rating: 5,
    review: "Very professional and caring. The visit was convenient and my mother felt completely comfortable.",
    image: "",
    isPublished: false,
    sortOrder: 1,
  },
  {
    clientName: "Sample Review",
    location: "Calgary, AB",
    rating: 5,
    review: "Highly recommend Foot Aid. Convenient, knowledgeable and compassionate care.",
    image: "",
    isPublished: false,
    sortOrder: 2,
  },
  {
    clientName: "Sample Review",
    location: "Calgary, AB",
    rating: 5,
    review: "The free assessment was very helpful. The care was gentle, professional and reassuring.",
    image: "",
    isPublished: false,
    sortOrder: 3,
  },
];
