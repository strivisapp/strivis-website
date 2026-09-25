// TODO(owner): fill in every "[TODO: ...]" value below before launch
// (13 October 2026); tests/launch.test.mjs fails from launch day on while
// any placeholder is left. These are the operator's legal details for the
// Impressum (German provider identification, § 5 DDG, and the person
// responsible for editorial content, § 18 (2) MStV). They were deliberately
// NOT filled in by the redesign: only the owner can supply them, and they
// should be checked by someone qualified (this is not legal advice).
//
// Plain data (no JSX) so tests can read it. `phone` is optional: leave it
// null to show no phone number.
export const IMPRESSUM = {
  // Full name of the person (or company, with legal form) running Strivis.
  name: "[TODO: full name of the operator]",
  // Postal address where the operator can be served (no P.O. box).
  street: "[TODO: street and house number]",
  city: "[TODO: postcode and city]",
  country: "[TODO: country]",
  // An email address that is actually read, for fast electronic contact.
  email: "[TODO: contact email]",
  phone: null,
  // Person responsible for the content (name and address, if different
  // from the operator above).
  responsible: "[TODO: name and address of the person responsible for the content]",
};

export const IMPRESSUM_PLACEHOLDER = /\[TODO:[^\]]*\]/;
