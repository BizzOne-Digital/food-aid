"use client";

import { useState } from "react";
import { ContentEditor, type FieldDef, type SectionDef } from "./ContentEditor";

const feature = [
  { key: "icon", label: "Icon", icon: true },
  { key: "title", label: "Title" },
  { key: "subtitle", label: "Subtitle" },
];

const HOME: SectionDef[] = [
  {
    title: "Hero",
    fields: [
      { key: "heroEyebrow", label: "Eyebrow", type: "text" },
      { key: "heroTitleLine1", label: "Title Line 1", type: "text" },
      { key: "heroHighlight", label: "Highlighted Text (red)", type: "text" },
      { key: "heroTitleAfter", label: "Text After Highlight", type: "text" },
      { key: "heroDescription", label: "Description", type: "textarea" },
      { key: "heroImage", label: "Hero Image", type: "image", hint: "Landscape, at least 1600px wide." },
      { key: "heroDecorLine1", label: "Decorative Text Line 1", type: "text" },
      { key: "heroDecorLine2", label: "Decorative Text Line 2", type: "text" },
      { key: "heroPrimaryLabel", label: "Primary Button Label", type: "text" },
      { key: "heroPrimaryHref", label: "Primary Button Link", type: "text" },
      { key: "heroSecondaryLabel", label: "Secondary Button Label", type: "text" },
      { key: "heroSecondaryHref", label: "Secondary Button Link", type: "text" },
      { key: "heroFeatures", label: "Feature Items", type: "objectList", fields: feature },
    ],
  },
  {
    title: "Services Intro",
    fields: [
      { key: "servicesEyebrow", label: "Eyebrow", type: "text" },
      { key: "servicesTitle", label: "Heading", type: "text" },
      { key: "servicesDescription", label: "Description", type: "textarea" },
      { key: "servicesHighlightLine1", label: "Highlight Line 1", type: "text" },
      { key: "servicesHighlightLine2", label: "Highlight Line 2", type: "text" },
    ],
  },
  {
    title: "About Preview",
    fields: [
      { key: "aboutEyebrow", label: "Eyebrow", type: "text" },
      { key: "aboutTitle", label: "Heading", type: "textarea", rows: 2, hint: "Use a new line to break the heading." },
      { key: "aboutText", label: "Paragraph", type: "textarea", rows: 4 },
      { key: "aboutImage", label: "Image", type: "image" },
      { key: "aboutOverlay", label: "Overlay Panel Text", type: "textarea", rows: 4 },
      { key: "aboutFeatures", label: "Value Items", type: "objectList", fields: feature },
    ],
  },
  {
    title: "Promotional Offer",
    fields: [
      { key: "offerKicker", label: "Kicker", type: "text" },
      { key: "offerTitle", label: "Offer Title", type: "text", hint: "{percent} is replaced with the percentage set in Settings > Offer." },
      { key: "offerDescription", label: "Offer Description", type: "text" },
      { key: "offerPillLine1", label: "Pill Line 1", type: "text" },
      { key: "offerPillLine2", label: "Pill Line 2", type: "text" },
      { key: "offerTerms", label: "Offer Terms (small print)", type: "textarea", rows: 2 },
      { key: "promoImage", label: "Promo Background Image", type: "image" },
    ],
  },
  {
    title: "Trust Strip (under hero)",
    fields: [{ key: "trustItems", label: "Trust Items", type: "objectList", fields: feature }],
  },
  {
    title: "How It Works",
    fields: [
      { key: "stepsEyebrow", label: "Eyebrow", type: "text" },
      { key: "stepsTitle", label: "Heading", type: "text" },
      { key: "stepsDescription", label: "Description", type: "textarea" },
      {
        key: "steps",
        label: "Steps",
        type: "objectList",
        fields: [
          { key: "title", label: "Title" },
          { key: "text", label: "Text", textarea: true },
        ],
      },
    ],
  },
  {
    title: "Signs You Need Foot Care",
    fields: [
      { key: "signsEyebrow", label: "Eyebrow", type: "text" },
      { key: "signsTitle", label: "Heading", type: "text" },
      { key: "signsDescription", label: "Description", type: "textarea" },
      { key: "signs", label: "Signs", type: "stringList" },
      { key: "signsNote", label: "Medical Note", type: "textarea", rows: 2 },
    ],
  },
  {
    title: "Hygiene & Safety",
    fields: [
      { key: "safetyEyebrow", label: "Eyebrow", type: "text" },
      { key: "safetyTitle", label: "Heading", type: "text" },
      { key: "safetyText", label: "Text", type: "textarea" },
      { key: "safetyImage", label: "Image", type: "image" },
      { key: "safetyPoints", label: "Checklist", type: "stringList" },
    ],
  },
  {
    title: "Retirement Homes & Care Facilities",
    fields: [
      { key: "facilitiesEyebrow", label: "Eyebrow", type: "text" },
      { key: "facilitiesTitle", label: "Heading", type: "text" },
      { key: "facilitiesText", label: "Text", type: "textarea" },
      { key: "facilitiesImage", label: "Image", type: "image" },
      { key: "facilitiesPoints", label: "Points", type: "stringList" },
      { key: "facilitiesCtaLabel", label: "Button Label", type: "text" },
    ],
  },
  {
    title: "FAQ",
    fields: [
      { key: "faqEyebrow", label: "Eyebrow", type: "text" },
      { key: "faqTitle", label: "Heading", type: "text" },
      {
        key: "faqs",
        label: "Questions",
        type: "objectList",
        fields: [
          { key: "question", label: "Question" },
          { key: "answer", label: "Answer", textarea: true },
        ],
      },
    ],
  },
  {
    title: "Final Call to Action",
    fields: [
      { key: "finalCtaTitle", label: "Heading", type: "text" },
      { key: "finalCtaText", label: "Text", type: "textarea" },
    ],
  },
  {
    title: "Testimonials & Footer CTA",
    fields: [
      { key: "testimonialsEyebrow", label: "Testimonials Eyebrow", type: "text" },
      { key: "testimonialsTitle", label: "Testimonials Heading", type: "text" },
      { key: "footerCtaTitle", label: "Footer CTA Heading", type: "text" },
      { key: "footerCtaText", label: "Footer CTA Text", type: "textarea" },
      { key: "footerCtaLabel", label: "Footer CTA Button", type: "text" },
    ],
  },
];

const section = (key: string, label: string): FieldDef => ({
  key,
  label,
  type: "group",
  fields: [
    { key: "title", label: "Heading", type: "text" },
    { key: "body", label: "Content", type: "textarea", rows: 5 },
    { key: "image", label: "Image", type: "image" },
  ],
});

const ABOUT: SectionDef[] = [
  {
    title: "Page Hero",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Heading", type: "textarea", rows: 2 },
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "heroImage", label: "Hero Image", type: "image" },
    ],
  },
  { title: "Content Sections", fields: [section("story", "Our Story"), section("whyMobile", "Why Mobile Foot Care Matters"), section("approach", "Our Approach")] },
  {
    title: "Who We Help",
    fields: [
      { key: "whoWeHelpTitle", label: "Heading", type: "text" },
      { key: "whoWeHelp", label: "List", type: "stringList" },
      { key: "whoWeHelpImage", label: "Image", type: "image" },
    ],
  },
  {
    title: "Why Choose Us",
    fields: [
      { key: "whyChooseTitle", label: "Heading", type: "text" },
      {
        key: "whyChoose",
        label: "Value Cards",
        type: "objectList",
        fields: [
          { key: "icon", label: "Icon", icon: true },
          { key: "title", label: "Title" },
          { key: "text", label: "Text", textarea: true },
        ],
      },
    ],
  },
  {
    title: "Service Areas",
    fields: [
      { key: "serviceAreasTitle", label: "Heading", type: "text" },
      { key: "serviceAreasText", label: "Text", type: "textarea" },
      { key: "serviceAreas", label: "Areas", type: "stringList" },
    ],
  },
  {
    title: "Call to Action",
    fields: [
      { key: "ctaTitle", label: "Heading", type: "text" },
      { key: "ctaText", label: "Text", type: "textarea" },
      { key: "ctaLabel", label: "Button Label", type: "text" },
    ],
  },
];

export function PagesEditor() {
  const [tab, setTab] = useState<"home" | "about">("home");
  return (
    <>
      <div className="mb-6 inline-flex rounded-xl bg-white p-1 shadow-card ring-1 ring-line" role="tablist" aria-label="Page">
        {(["home", "about"] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${tab === t ? "bg-brand text-white" : "text-ink hover:bg-soft"}`}
          >
            {t === "home" ? "Home Page" : "About Page"}
          </button>
        ))}
      </div>
      <ContentEditor key={tab} endpoint={`/api/admin/pages/${tab}`} sections={tab === "home" ? HOME : ABOUT} />
    </>
  );
}
