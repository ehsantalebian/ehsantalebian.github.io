import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ContactForm from "@/components/ContactForm";
import { contactLinks } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PageShell page="contact">
      <section className="title-section text-left text-sm-center revealator-slideup revealator-once revealator-delay1">
        <h1>GET IN <span>TOUCH</span></h1>
        <span className="title-bg">Contact</span>
      </section>

      <section className="main-content revealator-slideup revealator-once revealator-delay1">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <h3 className="text-uppercase custom-title mb-0 ft-wt-600 pb-3">Don&apos;t be shy !</h3>
              <p className="open-sans-font mb-4">
                Feel free to get in touch with me. I am always open to communication and collaboration regarding
                professional work, engineering opportunities, or simply sharing technical experiences.
              </p>
              {contactLinks.map((l) => (
                <p key={l.label} className="open-sans-font custom-span-contact position-relative contact-link-row">
                  <i className={`fa ${l.icon} position-absolute`} />
                  <span className="d-block">{l.label}</span>
                  <a href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener noreferrer" : undefined}>
                    {l.text}
                  </a>
                </p>
              ))}
            </div>
            <div className="col-12 col-lg-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
