import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ChatWindow from "@/components/ChatWindow";

export const metadata: Metadata = { title: "Chat" };

export default function ChatPage() {
  return (
    <PageShell page="chat">
      <section className="title-section text-left text-sm-center revealator-slideup revealator-once revealator-delay1">
        <h1>CHAT WITH <span>ME</span></h1>
        <span className="title-bg">Assistant</span>
      </section>

      <section className="main-content revealator-slideup revealator-once revealator-delay1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <ChatWindow />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
