"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        alert("Thank you! Your message has been delivered directly to my Telegram.");
        form.reset();
      } else if (res.status === 429) {
        alert("Too many messages in a short time. Please try again later.");
      } else {
        alert("Failed to send message via Telegram. Please reach out to me directly at ehsan.talebian@outlook.com.");
      }
    } catch {
      alert("An error occurred. Please check your network connection.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contactform" id="contact-form" onSubmit={onSubmit}>
      <div className="contactform">
        <div className="row">
          <div className="col-12 col-md-6">
            <input type="text" name="name" placeholder="YOUR NAME" required maxLength={100} />
          </div>
          <div className="col-12 col-md-6">
            <input type="email" name="email" placeholder="YOUR EMAIL" required maxLength={254} />
          </div>
          <div className="col-12">
            <input type="text" name="subject" placeholder="YOUR SUBJECT (OPTIONAL)" maxLength={200} />
          </div>
          <div className="col-12">
            <textarea name="message" placeholder="YOUR MESSAGE" required maxLength={3000}></textarea>
          </div>
          <div className="hp-field" aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="col-12">
            <button type="submit" className="button" id="submit-btn" disabled={sending}>
              <span className="button-text">{sending ? "Sending..." : "Send Message"}</span>
              <span className={`button-icon fa ${sending ? "fa-spinner fa-spin" : "fa-send"}`}></span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
