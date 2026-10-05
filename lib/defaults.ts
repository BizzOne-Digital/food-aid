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
  faqEyebrow: string;
  faqTitle: string;
  faqs: FaqItem[];
  finalCtaTitle: string;
  finalCtaText: string;
};

export type StepItem = { title: string; text: string };
export type FaqItem = { question: string; answer: string };

export const defaultHome: HomeContent = {
  heroEyebrow: "Mobile Foot Care Nurse",
  heroTitleLine1: "Compassionate",
  heroHighlight: "Foot Care",
  heroTitleAfter: "at Home",
  heroDescription:
    "Professional mobile foot care for seniors and individuals with mobility challenges in Calgary and surrounding areas.",
  heroImage: IMAGES.hero,
  heroDecorLine1: "Healthy Feet",
  heroDecorLine2: "Happier Days!",
  heroPrimaryLabel: "Book an Appointment",
  heroPrimaryHref: "/booking",
  heroSecondaryLabel: "Learn More",
  heroSecondaryHref: "/about",
  heroFeatures: [
    { icon: "Home", title: "At Your Home", subtitle: "Comfort & Convenience" },
    { icon: "Nurse", title: "Licensed Nurse", subtitle: "Advanced Foot Care" },
    { icon: "Heart", title: "Focused on", subtitle: "Seniors & Mobility" },
  ],
  servicesEyebrow: "Professional Foot Care",
  servicesTitle: "Our Services",
  servicesDescription:
    "Comprehensive foot care services provided at your home by a qualified nurse, designed for seniors and individuals with mobility issues.",
  servicesHighlightLine1: "Free Foot Assessment",
  servicesHighlightLine2: "with Every Visit",
  aboutEyebrow: "About Foot Aid Leyman",
  aboutTitle: "Caring for Your Feet,\nWhere You Feel Most Comfortable",
  aboutText:
    "Foot Aid Leyman is a mobile nurse providing advanced foot care services for immobile seniors and individuals with mobility challenges. Professional, compassionate care is delivered directly to clients throughout Calgary and surrounding areas.",
  aboutImage: IMAGES.aboutPreview,
  aboutOverlay: "Bringing\nProfessional\nFoot Care\nto You",
  aboutFeatures: [
    { icon: "Home", title: "Mobile Service", subtitle: "We come to you" },
    { icon: "Nurse", title: "Experienced Nurse", subtitle: "Advanced foot care" },
    { icon: "MapPin", title: "Calgary & Surrounding", subtitle: "Areas we serve" },
  ],
  offerKicker: "Join Us Today",
  offerTitle: "Get {percent} OFF",
  offerPercentage: "20%",
  offerDescription: "on Your First Visit",
  offerPillLine1: "Plus, a",
  offerPillLine2: "Free Foot Assessment!",
  promoImage: IMAGES.promo,
  testimonialsEyebrow: "What Our Clients Say",
  testimonialsTitle: "Testimonials",
  footerCtaTitle: "Book an Appointment",
  footerCtaText: "Book your mobile foot care service today and experience professional care at home.",
  footerCtaLabel: "Book Now",
  trustItems: [
    { icon: "Nurse", title: "Nurse-Led Care", subtitle: "Advanced foot care training" },
    { icon: "ShieldCheck", title: "Sterilized Instruments", subtitle: "Medical-grade hygiene" },
    { icon: "ClipboardCheck", title: "Free Assessment", subtitle: "With every new client" },
    { icon: "MapPin", title: "Calgary & Area", subtitle: "We come to your home" },
  ],
  stepsEyebrow: "How It Works",
  stepsTitle: "Foot Care in 4 Simple Steps",
  stepsDescription: "No travel, no waiting rooms. Booking a home visit takes only a few minutes.",
  steps: [
    { title: "Request a Visit", text: "Book online or call us with your preferred date, time and address." },
    { title: "We Confirm", text: "We contact you to confirm the visit and note any mobility or health needs." },
    { title: "Free Assessment", text: "Your nurse checks your feet, skin, nails and circulation, and explains the plan." },
    { title: "Gentle Treatment", text: "Care is completed at home, with simple tips to keep your feet healthy." },
  ],
  signsEyebrow: "When to Book",
  signsTitle: "Signs You May Need Professional Foot Care",
  signsDescription:
    "Foot problems are common with age and often go untreated when reaching your feet becomes difficult. Book a visit if you notice any of these:",
  signs: [
    "Thick, hard or discoloured toenails",
    "Painful, curved or ingrown nails",
    "Hard skin, calluses or corns",
    "Difficulty reaching or trimming your own nails",
    "Diabetes or poor circulation",
    "Discomfort when walking or wearing shoes",
  ],
  signsNote: "If you have an open wound, signs of infection or sudden pain, please contact your doctor first.",
  safetyEyebrow: "Your Safety Comes First",
  safetyTitle: "Clinic-Level Hygiene, In Your Living Room",
  safetyText:
    "Every visit follows strict infection-control practices so you receive the same standard of care you would expect in a clinic, without leaving home.",
  safetyImage: "/images/img1.png",
  safetyPoints: [
    "Instruments are cleaned and sterilized before every visit",
    "Single-use files, gloves and supplies",
    "Careful review of your health history and medications",
    "Extra caution for clients with diabetes or circulation concerns",
    "Clear notes and advice after every appointment",
  ],
  faqEyebrow: "Questions & Answers",
  faqTitle: "Frequently Asked Questions",
  faqs: [
    {
      question: "Which areas do you serve?",
      answer: "We visit clients throughout Calgary and surrounding communities. Contact us if you are unsure whether we reach your area.",
    },
    {
      question: "Is the foot assessment really free?",
      answer: "Yes. Every new client receives a free foot assessment so we can understand your needs before any treatment.",
    },
    {
      question: "How long does a home visit take?",
      answer: "Most visits take 45 to 60 minutes, depending on the care needed. We never rush an appointment.",
    },
    {
      question: "Do I need a doctor's referral?",
      answer: "No referral is needed. If we find something that needs medical attention, we will recommend that you see your doctor.",
    },
    {
      question: "Can you visit retirement homes or care residences?",
      answer: "Yes. We visit private homes, retirement residences and assisted living facilities.",
    },
    {
      question: "What do I need to prepare for the visit?",
      answer: "Just a comfortable chair and good lighting. We bring all equipment and supplies with us.",
    },
  ],
  finalCtaTitle: "Give Your Feet the Care They Deserve",
  finalCtaText: "Book your home visit today. New clients get 20% off their first visit, plus a free foot assessment.",
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
  eyebrow: "About Foot Aid Leyman",
  title: "Professional Foot Care,\nDelivered to Your Home",
  intro:
    "Foot Aid Leyman provides compassionate mobile foot care for seniors and individuals with mobility challenges in Calgary and surrounding areas.",
  heroImage: "/images/img2.png",
  story: {
    title: "Our Story",
    body:
      "Foot Aid Leyman was created to close a simple but important gap: many seniors and people with limited mobility cannot easily travel to a clinic for regular foot care. Healthy feet are essential for comfort, balance and independence, so we bring professional nursing foot care to the people who need it most, right where they live.",
    image: IMAGES.nurseChat,
  },
  whyMobile: {
    title: "Why Mobile Foot Care Matters",
    body:
      "Untreated nail and skin concerns can lead to pain, infection and a higher risk of falls. For clients who are homebound or find travel difficult, regular care is often delayed. Mobile foot care removes the travel, waiting rooms and stress, so problems are treated early and comfortably at home.",
    image: "/images/img3.png",
  },
  approach: {
    title: "Our Approach",
    body:
      "Every visit begins with listening. We complete a careful foot assessment, explain what we see in plain language, and agree on a care plan that suits your comfort and health needs. Treatments are gentle, hygienic and unhurried, using sterilized instruments and professional techniques.",
    image: "/images/img6.png",
  },
  whoWeHelpTitle: "Who We Help",
  whoWeHelp: [
    "Seniors living at home or in retirement residences",
    "Individuals with limited mobility or balance concerns",
    "Homebound clients and those recovering from illness or surgery",
    "Clients who have difficulty reaching or caring for their own feet",
    "Families looking for reliable care for a loved one",
  ],
  whoWeHelpImage: "/images/img5.png",
  whyChooseTitle: "Why Choose Us",
  whyChoose: [
    { icon: "Home", title: "Convenient Home Visits", text: "Care at your door, scheduled around you." },
    { icon: "Nurse", title: "Professional Advanced Care", text: "Nurse-led treatment with sterilized tools." },
    { icon: "Users", title: "Senior-Focused Service", text: "Patient, gentle care designed for seniors." },
    { icon: "Heart", title: "Compassionate Approach", text: "Respectful, reassuring and unhurried visits." },
    { icon: "ClipboardCheck", title: "Personalized Assessment", text: "A care plan based on your feet and needs." },
    { icon: "MapPin", title: "Calgary & Surrounding Areas", text: "Serving Calgary and nearby communities." },
  ],
  serviceAreasTitle: "Service Areas",
  serviceAreasText:
    "We serve clients throughout Calgary and surrounding communities. Not sure if we reach you? Contact us and we will confirm.",
  serviceAreas: ["Calgary", "Airdrie", "Chestermere", "Cochrane", "Okotoks", "Strathmore"],
  ctaTitle: "Ready to Book Your Home Visit?",
  ctaText: "Book your mobile foot care appointment today. New clients receive 20% off their first visit.",
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
  businessName: "Foot Aid Leyman",
  tagline: "Mobile Foot Care Nurse",
  email: "leymn.ali@gmail.com",
  phone: "+1 647-784-3011",
  address: "Calgary, Alberta",
  serviceArea: "& Surrounding Areas",
  footerDescription:
    "Professional mobile foot care for seniors and individuals with mobility challenges in Calgary and surrounding areas.",
  logoUrl: "",
  faviconUrl: "",
  social: { facebook: "", instagram: "", linkedin: "", google: "" },
  offerEnabled: true,
  offerPercentage: "20%",
  offerText: "Join us today and get 20% OFF your first visit, plus a Free Foot Assessment.",
  seoTitle: "Foot Aid Leyman | Mobile Foot Care Nurse in Calgary",
  seoDescription:
    "Professional mobile foot care for seniors and individuals with mobility challenges in Calgary and surrounding areas. Book compassionate in-home foot care with Foot Aid Leyman.",
  seoImage: IMAGES.hero,
};

export type ServiceData = {
  _id?: string;
  title: string;
  slug: string;
  imageUrl: string;
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
    shortDescription: "A comprehensive evaluation of your foot health and care needs.",
    fullDescription:
      "Every new client starts with a complete, no-cost assessment. We check skin, nails, circulation and sensation, review any concerns or medical conditions, and recommend a care plan that fits your needs. You get clear answers before any treatment begins.",
    isActive: true,
    sortOrder: 1,
  },
  {
    title: "Ingrown Nail Care",
    slug: "ingrown-nail-care",
    imageUrl: "/images/service2.png",
    iconName: "Scissors",
    shortDescription: "Safe and professional care for uncomfortable or ingrown nails.",
    fullDescription:
      "Ingrown nails can be painful and may lead to infection if left untreated. We gently trim and relieve the affected nail edge using sterile instruments, and share simple tips to help prevent it from coming back.",
    isActive: true,
    sortOrder: 2,
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
    sortOrder: 3,
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
    sortOrder: 4,
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
    sortOrder: 5,
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
    sortOrder: 6,
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

export const defaultTestimonials: TestimonialData[] = [
  {
    clientName: "Margaret T.",
    location: "Calgary, AB",
    rating: 5,
    review:
      "Leyman is very professional and caring. The service made my mother feel comfortable and the home visit was extremely convenient.",
    image: "",
    isPublished: true,
    sortOrder: 1,
  },
  {
    clientName: "James R.",
    location: "Calgary, AB",
    rating: 5,
    review: "Highly recommended Foot Aid Leyman. Convenient, knowledgeable and compassionate care.",
    image: "",
    isPublished: true,
    sortOrder: 2,
  },
  {
    clientName: "Linda K.",
    location: "Calgary, AB",
    rating: 5,
    review: "The free assessment was very helpful. The service was gentle, professional and reassuring.",
    image: "",
    isPublished: true,
    sortOrder: 3,
  },
];
