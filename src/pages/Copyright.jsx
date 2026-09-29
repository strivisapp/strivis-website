import { Link } from "react-router-dom";
import { LegalPage } from "@/components/site/LegalPage";
import { IMPRESSUM } from "@/content/impressum";
import {
  COUNTER_NOTICE_BUSINESS_DAYS,
  DMCA_AGENT_REGISTRATION,
  DMCA_AGENT_REGISTRATION_PENDING,
  REPEAT_INFRINGER_STRIKES,
} from "@/content/copyright";

// How rights holders and anyone else (with or without a Strivis account)
// report content in the app: DMCA notices (17 U.S.C. § 512(c)(3)),
// counter-notices (§ 512(g)), the repeat-infringer policy (§ 512(i)) and EU
// notice and action (DSA Art. 16 and 17). Linked from the footer, the Terms
// and the app's report sheet. Draft wording, have it checked by someone
// qualified (this is not legal advice).
const { name, street, city, country, email } = IMPRESSUM;

function Mail() {
  return (
    <a href={`mailto:${email}`} className="text-white underline hover:text-primary">
      {email}
    </a>
  );
}

const LIST = "list-disc space-y-2 pl-5 marker:text-white/40";

// The strike count in words, as the page reads it ("three").
const words = ["zero", "one", "two", "three", "four", "five"];

export default function Copyright() {
  const pending = DMCA_AGENT_REGISTRATION === DMCA_AGENT_REGISTRATION_PENDING;
  return (
    <LegalPage
      title="Copyright and takedown"
      updated="September 30, 2026"
      intro={
        <p className="mb-7">
          People share posts, comments, profile photos and bios in the Strivis app. If something there infringes your
          copyright, or you believe it is illegal for another reason, tell us. You don't need a Strivis account. Strivis
          users can also report a post, comment or profile in the app.
        </p>
      }
      sections={[
        {
          heading: "Report copyright infringement",
          children: (
            <>
              <p>
                Email <Mail /> with the subject "Copyright notice". Under 17 U.S.C. § 512(c)(3), your notice must
                include:
              </p>
              <ul className={LIST}>
                <li>your physical or electronic signature, as the copyright owner or as someone authorised to act for them;</li>
                <li>the copyrighted work you say is infringed (for several works, a representative list);</li>
                <li>
                  the material on Strivis you say infringes it and want removed, with enough detail for us to find it,
                  such as the link to the post or profile (strivis.app/p/… or strivis.app/u/…) or the username and a
                  description;
                </li>
                <li>your contact details: name, postal address, phone number and email address;</li>
                <li>
                  a statement that you believe in good faith that the use of the material is not authorised by the
                  copyright owner, its agent or the law;
                </li>
                <li>
                  a statement that the information in your notice is accurate and, under penalty of perjury, that you
                  are the copyright owner or authorised to act on the owner's behalf.
                </li>
              </ul>
              <p>
                If an element is missing, we tell you what to add. Knowingly false claims can make you liable for
                damages (17 U.S.C. § 512(f)).
              </p>
            </>
          ),
        },
        {
          heading: "Designated agent",
          children: (
            <>
              <p>Our designated agent to receive notices of claimed infringement (17 U.S.C. § 512(c)(2)):</p>
              <address className="not-italic">
                {name}
                <br />
                {street}
                <br />
                {city}
                <br />
                {country}
                <br />
                Email: <Mail />
              </address>
              <p>
                DMCA agent registration number:{" "}
                {pending ? (
                  <mark className="rounded-sm bg-primary/15 px-1 text-primary">{DMCA_AGENT_REGISTRATION}</mark>
                ) : (
                  DMCA_AGENT_REGISTRATION
                )}
              </p>
            </>
          ),
        },
        {
          heading: "What happens after a notice",
          body: `When a notice is complete, we remove the material or block access to it without delay. We tell the person who posted it that it was removed, why, and how to send a counter-notice, and we tell you what we did.`,
        },
        {
          heading: "Counter-notice",
          children: (
            <>
              <p>
                If your content was removed and you believe that was a mistake or a misidentification, email{" "}
                <Mail /> with the subject "Counter-notice". Under 17 U.S.C. § 512(g)(3), it must include:
              </p>
              <ul className={LIST}>
                <li>your physical or electronic signature;</li>
                <li>the material that was removed and where it appeared before it was removed;</li>
                <li>
                  a statement under penalty of perjury that you believe in good faith that the material was removed as
                  a result of a mistake or a misidentification;
                </li>
                <li>your name, postal address and phone number;</li>
                <li>
                  a statement that you consent to the jurisdiction of the U.S. Federal District Court for the judicial
                  district of your address (or, if your address is outside the United States, any judicial district in
                  which Strivis may be found), and that you will accept service of process from the person who sent the
                  notice or their agent.
                </li>
              </ul>
              <p>
                We send your counter-notice to the person who sent the original notice. We restore the material{" "}
                {COUNTER_NOTICE_BUSINESS_DAYS.min} to {COUNTER_NOTICE_BUSINESS_DAYS.max} business days after we
                receive it, unless they tell us within that time that they have filed a court action to stop you from
                infringing.
              </p>
            </>
          ),
        },
        {
          heading: "Repeat infringers",
          body: `We count the copyright removals we uphold for each account. An account with ${words[REPEAT_INFRINGER_STRIKES]} upheld copyright removals is suspended. A removal that is reversed after a counter-notice does not count.`,
        },
        {
          heading: "Illegal content in the EU (Digital Services Act)",
          children: (
            <>
              <p>
                Anyone, with or without a Strivis account, can notify us of content in Strivis that they consider
                illegal (Art. 16 DSA). Use the same address, <Mail />, and include:
              </p>
              <ul className={LIST}>
                <li>why you consider the content illegal, explained well enough for us to assess it;</li>
                <li>where it is: the link to the post or profile, or the username and a description;</li>
                <li>your name and email address (not needed for notices about child sexual abuse material);</li>
                <li>a statement that you believe in good faith that your notice is accurate and complete.</li>
              </ul>
              <p>
                We confirm that we received your notice and decide on it without undue delay, carefully and
                objectively. We tell you our decision and the reasons. If we remove or restrict content, we also tell
                the person who posted it what we did, why, and how they can contest it (Art. 17 DSA). Either side can
                ask us to review a decision by replying to our email, and can also turn to a certified out-of-court
                dispute settlement body or the courts.
              </p>
            </>
          ),
        },
        {
          heading: "Contact point",
          children: (
            <p>
              For notices, counter-notices and questions from users and authorities (Art. 11 and 12 DSA): <Mail />, in
              English or German. Who we are is in the{" "}
              <Link to="/impressum" className="text-white underline hover:text-primary">
                Impressum
              </Link>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
