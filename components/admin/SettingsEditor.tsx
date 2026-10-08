"use client";

import { ContentEditor, type SectionDef } from "./ContentEditor";

const SECTIONS: SectionDef[] = [
  {
    title: "Business Details",
    fields: [
      { key: "businessName", label: "Business Name", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "address", label: "Address / City", type: "text" },
      { key: "serviceArea", label: "Service Area Line", type: "text" },
      { key: "footerDescription", label: "Footer Description", type: "textarea" },
    ],
  },
  {
    title: "Branding",
    description: "Leave the logo empty to use the built-in Foot Aid logo.",
    fields: [
      { key: "logoUrl", label: "Logo", type: "image", folder: "misc", hint: "Transparent PNG or WEBP, about 360 x 104px." },
      { key: "faviconUrl", label: "Favicon", type: "image", folder: "misc", hint: "Square PNG, 512 x 512px." },
    ],
  },
  {
    title: "Social Links",
    fields: [
      {
        key: "social",
        label: "Profiles",
        type: "group",
        fields: [
          { key: "facebook", label: "Facebook URL", type: "text" },
          { key: "instagram", label: "Instagram URL", type: "text" },
          { key: "linkedin", label: "LinkedIn URL", type: "text" },
          { key: "google", label: "Google Business Profile URL", type: "text" },
        ],
      },
    ],
  },
  {
    title: "Offer",
    fields: [
      { key: "offerEnabled", label: "Show promotional banner", type: "toggle" },
      { key: "offerPercentage", label: "Offer Percentage", type: "text" },
      { key: "offerText", label: "Offer Text", type: "textarea" },
    ],
  },
  {
    title: "SEO Defaults",
    fields: [
      { key: "seoTitle", label: "Default Title", type: "text" },
      { key: "seoDescription", label: "Default Description", type: "textarea" },
      { key: "seoImage", label: "Social Share Image", type: "image", folder: "misc", hint: "1200 x 630px recommended." },
    ],
  },
];

export function SettingsEditor() {
  return <ContentEditor endpoint="/api/admin/settings" sections={SECTIONS} saveLabel="Save Settings" />;
}
