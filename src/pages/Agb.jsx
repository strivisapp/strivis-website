import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    heading: "1. Scope",
    body: `These Terms of Service apply to use of the Strivis app (the "App") in both its free and paid (Premium) versions. By registering, you accept these terms.`,
  },
  {
    heading: "2. Description of service",
    body: `Strivis provides training, nutrition, and progress-tracking features, including AI-generated training plans, an exercise database, nutrition tracking using third-party nutrition databases, and analytics. Strivis does not replace professional medical, nutritional, or fitness advice.`,
  },
  {
    heading: "3. Registration and account",
    body: `Using the App requires a user account. You must provide accurate information and keep your password confidential. The minimum age for use follows the requirements of the applicable app store.`,
  },
  {
    heading: "4. Premium subscription",
    body: `Strivis Premium is a paid add-on with monthly, yearly, or lifetime terms at the prices shown in the App. Subscriptions renew automatically unless cancelled in time before the renewal date. Billing is handled by the Apple App Store, whose own cancellation and refund terms additionally apply.`,
  },
  {
    heading: "5. User content",
    body: `You retain ownership of content you upload yourself (for example progress photos, custom exercises, and recipes). You grant us a non-exclusive right to process and store this content solely to provide the App's features.`,
  },
  {
    heading: "6. Health and safety disclaimer",
    body: `Strivis, including its AI-generated training and nutrition plans, is not a medical device and does not provide medical, nutritional, or fitness advice from a licensed professional. All content is for informational and motivational purposes only. Consult a physician before starting any new exercise or nutrition program, particularly if you have a pre-existing health condition or injury, or are pregnant. You use the App's training and nutrition features at your own risk and assume all risks associated with physical exercise.`,
  },
  {
    heading: "7. Disclaimer of warranties",
    body: `The App is provided "as is" and "as available" without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the App will be uninterrupted, error-free, or free of harmful components.`,
  },
  {
    heading: "8. Limitation of liability",
    body: `To the maximum extent permitted by law, our total liability arising from or relating to these terms or the App is limited to the amount you paid us, if any, in the twelve months preceding the claim. We are not liable for indirect, incidental, consequential, or punitive damages, except where liability cannot be limited by law (for example, in cases of intent or gross negligence).`,
  },
  {
    heading: "9. Third-party links and services",
    body: `The App may reference or connect to third-party websites, databases (such as Open Food Facts or USDA FoodData Central), or services (such as the Apple App Store) that we do not control. We are not responsible for the content, accuracy, or practices of these third parties.`,
  },
  {
    heading: "10. Termination and account deletion",
    body: `You can delete your account at any time through the App's settings or by contacting us. Deletion removes your personal data in accordance with our Privacy Policy. We may suspend or terminate your access if you violate these terms.`,
  },
  {
    heading: "11. Changes to these terms",
    body: `We may update these terms with effect for the future. We will notify you of material changes in the App and, where you have provided one, by email.`,
  },
  {
    heading: "12. Governing law",
    body: `These terms are governed by the law of the Federal Republic of Germany, excluding the UN Convention on Contracts for the International Sale of Goods, to the extent legally permitted.`,
  },
];

export default function Agb() {
  return (
    <div className="min-h-svh bg-background text-foreground px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="font-heading text-3xl tracking-wide mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: September 18, 2026</p>

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
