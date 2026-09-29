// Facts behind the copyright and takedown page (src/pages/Copyright.jsx),
// plain data so tests can read them. The agent's name, address and email
// come from src/content/impressum.js, so the three legal pages never
// disagree.
//
// DMCA_AGENT_REGISTRATION is a placeholder until the owner has registered
// the designated agent with the U.S. Copyright Office (dmca.copyright.gov).
// Replace "pending" with the registration number (DMCA-…) once it exists;
// the page shows whatever is here. Have the page checked by someone
// qualified (this is not legal advice).
export const DMCA_AGENT_REGISTRATION_PENDING = "pending";
export const DMCA_AGENT_REGISTRATION = DMCA_AGENT_REGISTRATION_PENDING;

// Upheld copyright removals after which an account is suspended (owner
// decision, 2026-09-30). The app's moderation uses the same number.
export const REPEAT_INFRINGER_STRIKES = 3;

// 17 U.S.C. § 512(g)(2)(C): removed material is restored no sooner than 10
// and no later than 14 business days after a valid counter-notice.
export const COUNTER_NOTICE_BUSINESS_DAYS = { min: 10, max: 14 };
