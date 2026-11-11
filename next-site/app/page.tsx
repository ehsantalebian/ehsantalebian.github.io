import Link from "next/link";
import PageShell from "@/components/PageShell";

export default function HomePage() {
  return (
    <PageShell page="home">
      <section className="container-fluid main-container container-home p-0 revealator-slideup revealator-once revealator-delay1">
        <div className="color-block d-none d-lg-block"></div>
        <div className="row home-details-container align-items-center m-0">
          <div className="col-lg-4 bg-position d-none d-lg-block p-0">
            <div className="bg"></div>
          </div>
          <div className="col-12 col-lg-8 home-details text-left text-sm-center text-lg-left">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/profile.jpg" className="img-fluid main-img-mobile d-block d-lg-none" alt="Ehsan Talebian" />
              <h1 className="text-uppercase poppins-font">
                I&apos;m Ehsan Talebian<span className="hero-subtitle">DevOps Engineer</span>
              </h1>
              <p className="open-sans-font">
                &quot;I am a Tehran-based DevOps Engineer with a strong passion for managing diverse server environments,
                seamlessly deploying new applications, and ensuring they remain resilient and highly available. Driven by
                continuous learning, I am always eager to master emerging technologies—firmly believing that iterative
                progress is far better than chasing static perfection.&quot;
              </p>
              <div className="btn-group-home">
                <Link href="/about" className="button">
                  <span className="button-text">More About Me</span>
                  <span className="button-icon fa fa-arrow-right"></span>
                </Link>
                <a href="/Ehsan_Talebian_Resume.pdf" className="button" download>
                  <span className="button-text">Download CV</span>
                  <span className="button-icon fa fa-download"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
