import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    heading: "Type of data we collect",
    body: `Among the types of Personal Data that Strivis collects, by itself or through third parties, there are: name, email address, password, device information, usage data, user ID, purchase history, and the health and fitness data described below.`,
  },
  {
    heading: "Health and fitness data",
    body: `To provide personalized training and nutrition plans, Strivis collects data you enter directly: body metrics (weight, height, age, gender, target weight), injuries and allergies you report, dietary preferences and nutrition goals, logged workouts (exercises, sets, reps, and weight lifted), logged meals, supplement intake and water intake, and progress photos you choose to upload. This data is used solely to generate and track your personal training and nutrition plans and is linked to your account. It is not shared with third parties for advertising or marketing purposes.`,
  },
  {
    heading: "Account registration",
    body: `When you create a Strivis account, we collect your name, email address, and password to authenticate you and enable core app functionality.`,
  },
  {
    heading: "Handling payments",
    body: `Strivis offers in-app purchases (Premium subscriptions) processed via the Apple App Store. Strivis is not involved in the collection or processing of your payment details — Apple handles this directly and only notifies Strivis whether a payment was completed. Purchase state is also managed through RevenueCat, Inc. (United States), which processes your user ID, device information, and usage data to keep your subscription status in sync across devices.`,
  },
  {
    heading: "Platform services and hosting",
    body: `Strivis uses the following service providers, each acting as a data processor on Strivis's behalf. Supabase, Inc. provides sign-in and account authentication (email address, password hash, and sign-in identifiers from Apple or Google if you use them). Railway Corporation (United States) hosts the Strivis backend and its database, which store your profile, the fitness data described above, and your community content. Cloudflare, Inc. stores the files you upload, such as your avatar and progress photos, in its R2 storage located in Europe. The app is distributed via Apple's App Store Connect, which processes purchase history, and push notifications are delivered through Apple's Push Notification service.`,
  },
  {
    heading: "AI-generated plans",
    body: `When you request an AI training or nutrition plan, Strivis sends the information needed for that plan (such as your goal, experience level, training days, equipment, body weight, reported injuries, dietary preferences, allergies, nutrition targets, and the names of custom exercises you created) to Anthropic, PBC (United States), which generates the plan. Your name and email address are not sent. Anthropic processes this data only to generate the response and does not use it to train its models.`,
  },
  {
    heading: "Crash reports and app analytics",
    body: `To find and fix errors, the app sends crash and error reports to Sentry (Functional Software, Inc.) through its EU data region. The app also records a small set of usage events (for example, that a workout was completed) with PostHog through its EU data region, without automatic click tracking or session recordings and without your health values.`,
  },
  {
    heading: "This website",
    body: `This website is hosted by Vercel Inc., which processes technical access data such as your IP address to deliver the pages. If you join the waitlist, we store your email address, your browser language, and the signup date in the Strivis database to notify you once at launch; you can ask us to delete it at any time. With your consent only, this website uses the Meta Pixel (Meta Platforms Ireland Ltd.) to measure our advertising; it sets cookies and sends usage data to Meta. You can withdraw that consent at any time by clearing this site's data in your browser, after which you will be asked again.`,
  },
  {
    heading: "Nutrition data lookups",
    body: `Strivis looks up food and nutrition information from Open Food Facts and USDA FoodData Central. These lookups are queried anonymously and do not transmit your account data or personal information to either service.`,
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
    body: `Some of the services listed above, including RevenueCat, Inc., Railway Corporation, Anthropic, PBC, Vercel Inc., and Apple Inc., are based in the United States. Where your personal data is transferred outside the European Economic Area, we rely on appropriate safeguards, such as the European Commission's Standard Contractual Clauses or the recipient's participation in an equivalent data-protection framework, to keep your data protected.`,
  },
  {
    heading: "Mode and place of processing",
    body: `Data is processed using computers and IT-enabled tools, following organizational procedures strictly related to the purposes indicated above. Depending on your location, data transfers may involve transferring your data to a country other than your own — in particular to the United States, where the providers named above process data as described.`,
  },
  {
    heading: "Retention time",
    body: `We store your data for as long as your account exists. If you request account deletion, through the App's settings or by contacting us, we delete your profile and associated personal data within a few days, unless a legal retention obligation requires us to keep specific records for longer.`,
  },
  {
    heading: "Your rights under the GDPR",
    body: `If you are in the European Union, you have the right to withdraw consent, object to processing, access your data, request rectification, restrict processing, request erasure, receive your data in a portable format, and lodge a complaint with your competent data protection authority.`,
  },
  {
    heading: "How to exercise these rights",
    body: `Any request to exercise your rights, including account and data deletion, can be sent to the contact email below. Requests are free of charge and answered as early as possible, always within one month.`,
  },
];

export default function Datenschutz() {
  return (
    <div className="min-h-svh bg-background text-foreground px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="font-heading text-3xl tracking-wide mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: September 23, 2026</p>

        <div className="mb-10">
          <h2 className="font-heading text-lg tracking-wide mb-1.5">Owner and data controller</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Simon Paretski, Aldebaranstraße 18, 12529 Schönefeld, Germany
            <br />
            Contact email: strivisofficial@gmail.com
          </p>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="font-heading text-lg tracking-wide mb-1.5">{section.heading}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
