import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import {
  personalLeft, personalRight, stats, skills, experience, education, type ResumeItem,
} from "@/lib/content";

export const metadata: Metadata = { title: "About" };

type Info = { title: string; value: string; href?: string };

function InfoList({ items }: { items: Info[] }) {
  return (
    <ul className="about-list list-unstyled open-sans-font">
      {items.map((i) => (
        <li key={i.title}>
          <span className="title">{i.title} :</span>{" "}
          <span className="value">
            {i.href ? (
              <a href={i.href} target="_blank" style={{ color: "#3990ff", textDecoration: "none" }}>{i.value}</a>
            ) : (
              i.value
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Timeline({ items, icon }: { items: ResumeItem[]; icon: string }) {
  return (
    <div className="resume-box">
      <ul>
        {items.map((i) => (
          <li key={i.title}>
            <div className="icon"><i className={`fa ${icon}`} /></div>
            <span className="time open-sans-font text-uppercase">{i.time}</span>
            <h5 className="poppins-font text-uppercase">
              {i.title} <span className="place open-sans-font">{i.place}</span>
            </h5>
            <p className="open-sans-font">{i.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  return (
    <PageShell page="about">
      <section className="title-section text-left text-sm-center revealator-slideup revealator-once revealator-delay1">
        <h1>ABOUT <span>ME</span></h1>
        <span className="title-bg">Resume</span>
      </section>

      <section className="main-content revealator-slideup revealator-once revealator-delay1">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-5 col-xl-6">
              <div className="row">
                <div className="col-12">
                  <h3 className="text-uppercase custom-title mb-0 ft-wt-600">personal infos</h3>
                </div>
                <div className="col-12 d-block d-lg-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/profile.jpg" className="img-fluid main-img-mobile" alt="Ehsan Talebian" />
                </div>
                <div className="col-12 col-sm-6"><InfoList items={personalLeft} /></div>
                <div className="col-12 col-sm-6"><InfoList items={personalRight} /></div>
                <div className="col-12 mt-3">
                  <Link className="button" href="/contact">
                    <span className="button-text">Get In Touch</span>
                    <span className="button-icon fa fa-envelope"></span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-7 col-xl-6 mt-5 mt-lg-0">
              <div className="row">
                {stats.map((s) => (
                  <div className="col-6" key={s.line2}>
                    <div className={`box-stats ${s.margin}`.trim()}>
                      <h3 className="poppins-font">{s.value}</h3>
                      <p className="open-sans-font m-0 text-uppercase">
                        {s.line1} <span className="d-block">{s.line2}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="separator" />

          <div className="row">
            <div className="col-12">
              <h3 className="text-uppercase pb-3 mb-2 text-left custom-title ft-wt-600">Skills</h3>
            </div>
            <div className="col-12">
              <div className="skills-container text-left">
                {skills.map((s) => (
                  <span className="skill-badge" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          <hr className="separator mt-5" />

          <div className="row">
            <div className="col-12">
              <h3 className="text-uppercase pb-5 mb-0 text-left text-sm-center custom-title ft-wt-600">
                Experience <span>&amp;</span> Education
              </h3>
            </div>
            <div className="col-lg-6 m-15px-tb"><Timeline items={experience} icon="fa-briefcase" /></div>
            <div className="col-lg-6 m-15px-tb"><Timeline items={education} icon="fa-graduation-cap" /></div>
          </div>

          <div className="row mt-4 mb-2">
            <div className="col-12 text-center text-sm-right">
              <Link href="/contact" className="button">
                <span className="button-text">Get In Touch</span>
                <span className="button-icon fa fa-arrow-right"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
