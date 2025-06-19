import Link from "next/link";

const lastUpdated = "Jun 2025";

export default function page() {
  return (
    <article className="prose prose-sm mt-8 pb-16 dark:prose-invert">
      <div className="space-y-4">
        <h1 className="title text-4xl">privacy policy.</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      <div className="space-y-4">
        <h2 className="title text-2xl">Hey there, I’m Asif.</h2>
        <p>
          Just wanted to keep things clear and simple. This is my personal portfolio website,
          and your privacy matters to me. I am not into tracking or selling anyones data — not
          my vibe.
        </p>

        <h2 className="title">What I Collect (Basically Nothing)</h2>
        <p>
          This is a static site, so I’m not collecting your data. No logins, no cookies, no weird
          tracking scripts. It’s just here to showcase my work and connect with you.
        </p>

        <h3>1. Chatbot Messages</h3>
        <p>
          If there’s a chatbot feature and you use it, those messages might be stored temporarily
          — mostly to help with replies and improve the experience. Just don’t share any sensitive
          info, okay?
        </p>

        <h3>2. Contact Info</h3>
        <p>
          If you email me or use the contact form, I’ll only use that info to reply to you. No
          newsletters, no spam — just real human responses from me.
        </p>

        <h2 className="title">How I Use Info (If Any)</h2>
        <p>Here’s what I *might* do if you reach out:</p>
        <ul>
          <li>Reply to your message or email</li>
          <li>Make small improvements to the site based on feedback</li>
          <li>Make sure everything is running smoothly</li>
        </ul>

        <h2 className="title">Sharing Info (I Don’t)</h2>
        <p>
          I don’t share or sell your info. If you accidentally sent something sensitive and want it
          deleted, just let me know.
        </p>

        <h2 className="title">Security Stuff</h2>
        <p>
          I do my best to keep things safe, but hey — nothing online is 100% secure. Be mindful of
          what you share, just in case.
        </p>

        <h2 className="title">Updates</h2>
        <p>
          This policy is up to date as of <b>{lastUpdated}</b>. If I ever make changes, I’ll
          update this page. No surprises.
        </p>

        <h2 className="title">Reach Out</h2>
        <p>
          Got a question or just want to say hi? Drop me an email at{" "}
          <Link href="mailto:phenomenalasif@gmail.com">phenomenalasif@gmail.com</Link> or use the{" "}
          <Link href="/contact">contact form</Link> (I’m working on it).
        </p>
      </div>
    </article>
  );
}
