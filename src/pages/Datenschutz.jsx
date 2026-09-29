import { Link } from "react-router-dom";
import { LegalPage } from "@/components/site/LegalPage";

const LIST = "list-disc space-y-2 pl-5 marker:text-white/40";

// Every recipient the app, the backend and this website actually contact
// besides those with their own section below (legal inventory 2026-09-30).
// A new SDK, API or host belongs in this policy before it ships;
// tests/legal.test.mjs checks that each one is named.
const PROVIDERS = [
  {
    name: "Supabase, Inc. (United States)",
    text: "Sign-in and account authentication: your email address, password hash, and the sign-in identifiers from Apple or Google if you use them.",
  },
  {
    name: "Railway Corporation (United States)",
    text: "Hosts the Strivis backend and its database in its European region. The database stores your profile, the fitness data described above, your consent records and your community content. Railway also keeps the backend's request logs: for every request, your IP address, the time and the address requested. We use these logs only to keep the service running and secure (Art. 6(1)(f) GDPR), and Railway deletes them automatically after its log retention period.",
  },
  {
    name: "Cloudflare, Inc. (United States)",
    text: "Stores the files you upload, such as your avatar, post photos and progress photos, in its R2 storage located in Europe, and delivers images to the app through its content delivery network (cdn.strivis.app). At sign-up and password reset, Cloudflare Turnstile checks that you are a person and not a bot; it receives your IP address and technical information about your device and browser.",
  },
  {
    name: "Have I Been Pwned, Pwned Passwords (Australia)",
    text: "At sign-up and password reset, the app checks whether your new password appears in known data breaches. It sends only the first five characters of a scrambled (SHA-1) version of your password, never the password itself or your email address (the k-anonymity method). The service sees your IP address.",
  },
  {
    name: "Apple",
    text: "Distributes the app through the App Store (which processes purchase history), delivers push notifications through the Apple Push Notification service (your device's push token), and, if you use Sign in with Apple, gives us your Apple identifier, your email address or Apple's relay address, and your name if you choose to share it.",
  },
  {
    name: "Google LLC (United States)",
    text: "If you use Google Sign-In, Google gives us your Google account identifier, email address and name.",
  },
  {
    name: "Base44 (Wix.com Ltd., Israel)",
    text: "One image uploaded before Strivis moved to its own servers is still loaded from base44.app. When the app shows it, Base44 receives your IP address and technical information about your device.",
  },
];

const SECTIONS = [
  {
    heading: "Type of data we collect",
    body: `Among the types of Personal Data that Strivis collects, by itself or through third parties, there are: name, email address, password, IP address, device information, usage data, user ID, purchase history, the health and fitness data described below, the content you share in the community, and records of the consents you give.`,
  },
  {
    heading: "Minimum age",
    body: `Strivis is only for people aged 18 or older, in every country, including the United States. During onboarding we ask for your date of birth to check this. We do not store your date of birth: we keep your age (for your calorie and macro targets) and the fact that you confirmed you are 18 or older, with the time. If the date shows you are under 18, nothing is saved: the onboarding answers on your device are deleted, an account already started with Apple or Google is deleted, and for 24 hours the device shows that Strivis is for adults instead of asking again. Existing accounts are asked once to confirm their age; an account whose user turns out to be under 18 is suspended, its profile and posts are hidden from the community at once, and it is deleted after 30 days. The waitlist on this website is also for adults only. If you believe a person under 18 has given us personal data, contact us and we will delete it.`,
  },
  {
    heading: "Health and fitness data",
    body: `To provide personalized training and nutrition plans, Strivis collects data you enter directly: body metrics (weight, height, age, gender, target weight), injuries and allergies you report, dietary preferences and nutrition goals, logged workouts (exercises, sets, reps, and weight lifted), logged meals, supplement intake and water intake, and progress photos you choose to upload. Your onboarding answers are kept on your device until you create your account and are then saved to it. This data is used solely to generate and track your personal training and nutrition plans and is linked to your account. It is not shared with third parties for advertising or marketing purposes.`,
  },
  {
    heading: "Your consent to processing health data",
    body: `Health data is a special category of personal data (Art. 9 GDPR). We process it only with your explicit consent (Art. 9(2)(a) GDPR), which you give when you create your account by ticking a separate box, apart from accepting the Terms. We record when you gave it and which version of the consent text you saw. You can withdraw it at any time in the app's privacy settings (Settings › Privacy). Withdrawing does not affect processing that happened before. Because Strivis cannot calculate your plans and targets without these data, the app then takes you to delete your health data or your account.`,
  },
  {
    heading: "Account registration",
    body: `When you create a Strivis account, we collect your email address and password, or the details Apple or Google give us if you sign in with them (see below), to authenticate you and enable core app functionality. We also record when you accepted the Terms of Service and this Privacy Policy and which versions you accepted, so that we can show it later (Art. 6(1)(c) and (f) GDPR).`,
  },
  {
    heading: "Community and public content",
    body: `Strivis has a community. Your profile (name, username, profile photo and bio) and the posts, comments and achievements you share are visible to other Strivis users. By default your profile is public, new posts are visible to everyone in the community, and achievements are shared automatically. In the app's settings you can make your profile private, choose who sees your posts (everyone, your followers, or only you), and turn off automatic sharing. Progress photos stay private. Links to profiles and posts (strivis.app/u/… and strivis.app/p/…) open in the app; this website never shows the content itself. We process community content to provide the community you signed up for (Art. 6(1)(b) GDPR).`,
  },
  {
    heading: "Handling payments",
    body: `Strivis offers in-app purchases (Premium subscriptions) processed via the Apple App Store. Strivis is not involved in the collection or processing of your payment details; Apple handles this directly and only notifies Strivis whether a payment was completed. Purchase state is also managed through RevenueCat, Inc. (United States), which processes your user ID, device information, and usage data to keep your subscription status in sync across devices. RevenueCat gives the app a random, anonymous ID when it first starts, before you have an account, so that a purchase made during onboarding can be linked to the account you then create.`,
  },
  {
    heading: "Platform services and hosting",
    children: (
      <>
        <p>
          Strivis uses the following service providers. Each processes data on Strivis's behalf (as a data processor)
          or, for Apple and Google, as the provider of the store or sign-in service you chose.
        </p>
        <ul className={LIST}>
          {PROVIDERS.map((p) => (
            <li key={p.name}>
              <span className="font-semibold text-white">{p.name}.</span> {p.text}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    heading: "AI-generated plans",
    body: `When you request an AI training or nutrition plan, and once automatically right after you create your account if you have Premium (your first nutrition plan, from your onboarding answers), Strivis sends the information needed for that plan (such as your goal, experience level, training days, equipment, body weight, reported injuries, dietary preferences, allergies, disliked foods, nutrition targets, and the names of custom exercises you created) to Anthropic, PBC (United States), which generates the plan. Your name and email address are not sent. Anthropic processes this data only to generate the response and does not use it to train its models.`,
  },
  {
    heading: "Crash reports and app analytics",
    body: `To find and fix errors, the app and the backend send crash and error reports to Sentry (Functional Software, Inc., United States) through its EU data region. Only if you allow it in the app (Art. 6(1)(a) GDPR), the app also records a small set of usage events (for example, that a workout was completed) with PostHog (PostHog, Inc., United States) through its EU data region, without cookies, automatic click tracking or session recordings and without your health values. These events are linked to your Strivis account ID, not to your name or email address, so they are pseudonymous rather than anonymous. We record whether and when you gave or withdrew this consent. Until you allow it, PostHog is not loaded and nothing is sent. You can withdraw your consent at any time in the app under Settings › Privacy › Share usage data (Einstellungen › Privatsphäre › Nutzungsdaten teilen).`,
  },
  {
    heading: "Nutrition data lookups",
    body: `When you search for a food, the app queries Open Food Facts (Open Food Facts association, France) directly from your device, so Open Food Facts receives your IP address and the search term, but no account data. Barcode lookups and USDA FoodData Central (United States Department of Agriculture) are queried through our backend, so those services receive neither your IP address nor your account data.`,
  },
  {
    heading: "This website",
    children: (
      <>
        <p>
          This website is hosted by Vercel Inc. (United States), which processes technical access data such as your
          IP address to deliver the pages. Vercel also serves the page the app uses for the Cloudflare Turnstile check
          described above.
        </p>
        <p>
          <span className="font-semibold text-white">Waitlist and launch email.</span> The waitlist is for people aged
          18 or older. If you join it, we store your email address, your browser language, the form you used, and
          when you signed up, consented and confirmed, in the Strivis database. We send the emails through Brevo
          (Sendinblue SAS, France): first one email asking you to confirm your address (double opt-in), and only after
          you confirm, the launch email. Every email has an unsubscribe link. The legal basis is your consent (Art.
          6(1)(a) GDPR), which you can withdraw at any time through that link or by writing to us. After you
          unsubscribe, we keep your address only on a block list so that we never email you again.
        </p>
        <p>
          <span className="font-semibold text-white">Meta Pixel.</span> Only with your consent (Art. 6(1)(a) GDPR and
          § 25(1) TDDDG), this website uses the Meta Pixel (Meta Platforms Ireland Ltd.) to measure our advertising.
          It sets the cookies _fbp and _fbc and sends Meta the page address, the referring page, your IP address,
          information about your browser, and the events "page view" and "waitlist signup". We do not send Meta your
          email address. For collecting and transmitting these data, Strivis and Meta Platforms Ireland Ltd. are joint
          controllers (Art. 26 GDPR) under Meta's Controller Addendum; Meta alone is responsible for what it does with
          the data afterwards, including transfers to Meta Platforms, Inc. in the United States. You can exercise your
          rights with us or with Meta. Your choice is stored in your browser (localStorage), not in a cookie.
        </p>
        <p>
          You can withdraw your consent at any time with "Cookie settings" at the bottom of every page: choose
          "Decline". The pixel then stops, we delete the _fbp and _fbc cookies on strivis.app, and the pixel is not
          loaded again unless you accept again.
        </p>
      </>
    ),
  },
  {
    heading: "Apple Health and wearable integrations",
    body: `If and when Strivis introduces optional integration with Apple Health or Apple Watch, the App will request your explicit permission before reading or writing any health or fitness data (such as steps, heart rate, or logged workouts) through Apple's HealthKit. This data will only be used to provide the features you enable and will not be used for advertising or shared with third parties for their own purposes. You can revoke this permission at any time in your device's Health app settings.`,
  },
  {
    heading: "Equal protection of user data",
    body: `Strivis shares user data only with third parties carefully selected to ensure that they provide the same or equal protection of user data as stated in this privacy policy and requested by applicable data protection laws.`,
  },
  {
    heading: "International data transfers",
    body: `Some of the services listed above are based outside the European Economic Area: in the United States (Supabase, Railway, Cloudflare, RevenueCat, Apple, Google, Anthropic, PostHog, Sentry and Vercel; Meta may transfer data to Meta Platforms, Inc.), in Australia (Have I Been Pwned) and in Israel (Base44). Where your personal data is transferred outside the European Economic Area, we rely on appropriate safeguards, such as an adequacy decision of the European Commission, the recipient's certification under the EU-U.S. Data Privacy Framework, or the European Commission's Standard Contractual Clauses, to keep your data protected.`,
  },
  {
    heading: "Mode and place of processing",
    body: `Data is processed using computers and IT-enabled tools, following organizational procedures strictly related to the purposes indicated above. Depending on your location, data transfers may involve transferring your data to a country other than your own, in particular to the United States, where the providers named above process data as described.`,
  },
  {
    heading: "Retention time",
    body: `We store your account data for as long as your account exists. If you request account deletion, through the App's settings or by contacting us, we delete your profile and associated personal data within a few days, unless a legal retention obligation requires us to keep specific records for longer. We keep records of your consents for as long as we rely on them and may need to prove them. We keep your waitlist address until you unsubscribe or ask us to delete it, and no longer than we need it to send the launch email, apart from the block list described above.`,
  },
  {
    heading: "Your rights under the GDPR",
    body: `If you are in the European Union, you have the right to withdraw consent at any time (Art. 7(3) GDPR; this does not affect processing before the withdrawal), object to processing, access your data, request rectification, restrict processing, request erasure, receive your data in a portable format, and lodge a complaint with your competent data protection authority.`,
  },
  {
    heading: "How to exercise these rights",
    children: (
      <p>
        Any request to exercise your rights, including account and data deletion, can be sent to the contact email
        above. Requests are free of charge and answered as early as possible, always within one month. To report
        content that infringes copyright or is otherwise illegal, see{" "}
        <Link to="/copyright" className="text-white underline hover:text-primary">
          Copyright and takedown
        </Link>
        .
      </p>
    ),
  },
];

// Draft wording, not legal advice: have it reviewed by someone qualified
// before relying on it. Revised on 2026-09-30 for the launch legal pass
// (every recipient the code uses, community visibility, server logs, 18+,
// explicit Art. 9 consent, double opt-in waitlist, withdrawing the Meta
// Pixel); the owner block and the rest of the wording are as published.
export default function Datenschutz() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 30, 2026"
      sections={[
        {
          heading: "Owner and data controller",
          children: (
            <p>
              Simon Paretski, Aldebaranstraße 18, 12529 Schönefeld, Germany
              <br />
              Contact email: strivisofficial@gmail.com
            </p>
          ),
        },
        ...SECTIONS,
      ]}
    />
  );
}
