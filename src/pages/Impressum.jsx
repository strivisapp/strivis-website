import { LegalPage } from "@/components/site/LegalPage";
import { IMPRESSUM, IMPRESSUM_PLACEHOLDER } from "@/content/impressum";

// The Impressum. Every value comes from src/content/impressum.js, which the
// owner fills in; until then its "[TODO: ...]" placeholders show up here
// highlighted, so a missing detail can't pass unnoticed.
function Value({ children }) {
  if (IMPRESSUM_PLACEHOLDER.test(children)) {
    return <mark className="rounded-sm bg-primary/15 px-1 text-primary">{children}</mark>;
  }
  return children;
}

export default function Impressum() {
  const { name, street, city, country, email, phone, responsible } = IMPRESSUM;
  return (
    <LegalPage
      title="Impressum"
      sections={[
        {
          heading: "Operator",
          children: (
            <address className="not-italic">
              <Value>{name}</Value>
              <br />
              <Value>{street}</Value>
              <br />
              <Value>{city}</Value>
              <br />
              <Value>{country}</Value>
            </address>
          ),
        },
        {
          heading: "Contact",
          children: (
            <p>
              Email:{" "}
              {IMPRESSUM_PLACEHOLDER.test(email) ? (
                <Value>{email}</Value>
              ) : (
                <a href={`mailto:${email}`} className="text-white underline hover:text-primary">
                  {email}
                </a>
              )}
              {phone && (
                <>
                  <br />
                  Phone: <Value>{phone}</Value>
                </>
              )}
            </p>
          ),
        },
        {
          heading: "Responsible for the content",
          children: (
            <p>
              <Value>{responsible}</Value>
            </p>
          ),
        },
      ]}
    />
  );
}
