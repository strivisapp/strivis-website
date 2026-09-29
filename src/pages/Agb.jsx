import { Link } from "react-router-dom";
import { LegalPage } from "@/components/site/LegalPage";

const LIST = "list-disc space-y-2 pl-5 marker:text-white/40";
const A = "text-white underline hover:text-primary";

// Apple's standard Licensed Application End User License Agreement.
const APPLE_EULA_URL = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

const SECTIONS = [
  {
    heading: "1. Scope",
    body: `These Terms of Service apply to use of the Strivis app (the "App") in both its free and paid (Premium) versions. You accept them when you create your account, by ticking the box for them.`,
  },
  {
    heading: "2. Description of service",
    body: `Strivis provides training, nutrition, and progress-tracking features, including AI-generated training plans, an exercise database, nutrition tracking using third-party nutrition databases, analytics, and a community in which users share posts, comments and achievements. Strivis does not replace professional medical, nutritional, or fitness advice.`,
  },
  {
    heading: "3. Registration, account and minimum age",
    body: `Using the App requires a user account. You must be 18 or older to use Strivis, in every country, including the United States; by creating an account you confirm that you are. You must provide accurate information and keep your password confidential. If we learn that a user is under 18, we suspend the account and delete it after 30 days.`,
  },
  {
    heading: "4. Premium subscription",
    children: (
      <>
        <p>
          Strivis Premium is a paid add-on with monthly or yearly subscriptions, or a one-time lifetime purchase, at the
          prices shown in the App. Purchases are sold and billed by Apple through the App Store and charged to your
          Apple ID when you confirm the purchase.
        </p>
        <ul className={LIST}>
          <li>
            A subscription renews automatically for the same period at the price shown in the App Store, unless you
            cancel it at least 24 hours before the end of the current period.
          </li>
          <li>
            You can cancel or manage a subscription at any time in your Apple ID's subscription settings (App Store
            settings) on your device. Deleting the App does not cancel a subscription.
          </li>
          <li>
            If a free trial is offered, it turns into a paid subscription automatically when it ends, unless you cancel
            at least 24 hours before the end of the trial. If notifications are allowed, the App reminds you two days
            before the trial ends.
          </li>
          <li>The lifetime purchase is paid once and does not renew.</li>
          <li>Apple sends purchase receipts. Refunds are handled by Apple under Apple's terms.</li>
        </ul>
        <p>
          Apple's standard{" "}
          <a href={APPLE_EULA_URL} className={A} target="_blank" rel="noreferrer">
            Licensed Application End User License Agreement
          </a>{" "}
          applies to your use of the App in addition to these terms. The Apple App Store's own terms for purchases,
          cancellation and refunds also apply.
        </p>
      </>
    ),
  },
  {
    heading: "5. User content",
    body: `You retain ownership of content you create or upload yourself (for example progress photos, custom exercises, recipes, posts, comments, your profile photo and bio). You grant us a non-exclusive, worldwide, royalty-free right to store, process, reproduce and display this content, and to adapt its format (for example resize images), solely to provide the App's features and to show it to the audience you chose (for example everyone in the community, your followers, or only you). This right ends when you delete the content or your account, apart from backup copies that are deleted in the normal course.`,
  },
  {
    heading: "6. Community rules",
    children: (
      <>
        <p>
          Post only content you created yourself or have the right to share. Strivis has zero tolerance for
          objectionable content and abusive users. Not allowed are, in particular:
        </p>
        <ul className={LIST}>
          <li>illegal content, and content that infringes someone else's rights (copyright, trademarks, privacy, their own image);</li>
          <li>nudity, sexual or pornographic content;</li>
          <li>violence, threats, harassment, bullying, hate speech and discrimination;</li>
          <li>
            content that encourages dangerous behaviour, such as extreme dieting, eating disorders, self-harm, or the
            use of doping or illegal substances;
          </li>
          <li>spam, advertising, and pretending to be someone else;</li>
          <li>other people's personal data without their consent.</li>
        </ul>
        <p>
          You can report posts, comments and users in the App and block users. We review reports, remove
          objectionable content, and suspend or remove users who post it. We aim to act on reports within 24 hours.
        </p>
      </>
    ),
  },
  {
    heading: "7. Copyright and repeat infringers",
    children: (
      <p>
        If you believe content in Strivis infringes your copyright, or is illegal for another reason, follow the steps
        on our{" "}
        <Link to="/copyright" className={A}>
          Copyright and takedown
        </Link>{" "}
        page; you don't need an account. Accounts with three upheld copyright removals are suspended.
      </p>
    ),
  },
  {
    heading: "8. Health and safety disclaimer",
    body: `Strivis, including its AI-generated training and nutrition plans, is not a medical device and does not provide medical, nutritional, or fitness advice from a licensed professional. All content is for informational and motivational purposes only. Consult a physician before starting any new exercise or nutrition program, particularly if you have a pre-existing health condition or injury, or are pregnant. You use the App's training and nutrition features at your own risk and assume all risks associated with physical exercise.`,
  },
  {
    heading: "9. Disclaimer of warranties",
    body: `The App is provided "as is" and "as available" without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the App will be uninterrupted, error-free, or free of harmful components.`,
  },
  {
    heading: "10. Limitation of liability",
    body: `To the maximum extent permitted by law, our total liability arising from or relating to these terms or the App is limited to the amount you paid us, if any, in the twelve months preceding the claim. We are not liable for indirect, incidental, consequential, or punitive damages, except where liability cannot be limited by law (for example, in cases of intent or gross negligence).`,
  },
  {
    heading: "11. Third-party links and services",
    body: `The App may reference or connect to third-party websites, databases (such as Open Food Facts or USDA FoodData Central), or services (such as the Apple App Store) that we do not control. We are not responsible for the content, accuracy, or practices of these third parties.`,
  },
  {
    heading: "12. Termination and account deletion",
    body: `You can delete your account at any time through the App's settings or by contacting us. Deletion removes your personal data in accordance with our Privacy Policy. We may suspend or terminate your access if you violate these terms, in particular the community rules. Deleting your account does not cancel an App Store subscription; cancel it as described in section 4.`,
  },
  {
    heading: "13. Changes to these terms",
    body: `We may update these terms with effect for the future. We will notify you of material changes in the App before they take effect.`,
  },
  {
    heading: "14. Governing law",
    body: `These terms are governed by the law of the Federal Republic of Germany, excluding the UN Convention on Contracts for the International Sale of Goods, to the extent legally permitted.`,
  },
];

// Draft wording, not legal advice: have it reviewed by someone qualified
// before relying on it. Revised on 2026-09-30 for the launch legal pass
// (18+ only, community rules and zero tolerance, licence to show content to
// the chosen audience, copyright and repeat infringers, App Store
// subscription terms and Apple's standard EULA, changes announced in the
// App); the other sections are worded as published, renumbered.
export default function Agb() {
  return <LegalPage title="Terms of Service" updated="September 30, 2026" sections={SECTIONS} />;
}
