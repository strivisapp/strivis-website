// The operator's legal details for the Impressum (German provider
// identification, § 5 DDG, and the person responsible for editorial content,
// § 18 (2) MStV). Taken word for word from the privacy policy's "Owner and
// data controller" section (src/pages/Datenschutz.jsx), so the two stay the
// same; change both together. Have the wording checked by someone qualified
// (this is not legal advice). tests/launch.test.mjs fails if a "[TODO: ...]"
// placeholder ever comes back.
//
// Plain data (no JSX) so tests can read it. `phone` is optional: null shows
// no phone number.
export const IMPRESSUM = {
  name: "Simon Paretski",
  street: "Aldebaranstraße 18",
  city: "12529 Schönefeld",
  country: "Germany",
  email: "strivisofficial@gmail.com",
  phone: null,
  // Person responsible for the content (§ 18 (2) MStV).
  responsible: "Simon Paretski, Aldebaranstraße 18, 12529 Schönefeld",
};

export const IMPRESSUM_PLACEHOLDER = /\[TODO:[^\]]*\]/;
