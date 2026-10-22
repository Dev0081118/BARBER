import React from "react";
const Privacy = () => {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-black">

      {/* HEADER */}
      <section className="border-b border-neutral-200 px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
            {/* BACK BUTTON */} 
            <a href="/" className="mb-20 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors duration-300 hover:text-black active:text-black" ><span className="text-lg leading-none">←</span> Back to Website</a>

          <p className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
            Next Level Barbershop
          </p>

          <h1 className="max-w-[900px] text-6xl font-light leading-[0.9] tracking-[-0.05em] md:text-8xl">
            Privacy
            <br />
            <span className="text-neutral-400">
              Policy.
            </span>
          </h1>

          <p className="mt-10 text-sm text-neutral-500">
            Last updated: September 2026
          </p>

        </div>
      </section>


      {/* CONTENT */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[900px]">

          {/* INTRO */}
          <PrivacySection
            number="01"
            title="Introduction"
          >
            <p>
              Next Level Barbershop respects your privacy and is committed to
              protecting any personal information you provide when using our
              website or contacting us.
            </p>

            <p>
              This Privacy Policy explains what information we may collect,
              how we use it, and how we protect your information.
            </p>
          </PrivacySection>


          {/* INFORMATION */}
          <PrivacySection
            number="02"
            title="Information We Collect"
          >
            <p>
              We may collect information that you voluntarily provide when
              interacting with our website or contacting the barber shop.
            </p>

            <ul>
              <li>Name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Appointment information</li>
              <li>Messages or enquiries you send to us</li>
            </ul>

            <p>
              We may also collect limited technical information, such as
              browser type, device information and website usage data, to help
              us improve our website.
            </p>
          </PrivacySection>


          {/* USE */}
          <PrivacySection
            number="03"
            title="How We Use Your Information"
          >
            <p>
              Information collected through our website may be used to:
            </p>

            <ul>
              <li>Respond to your enquiries</li>
              <li>Manage appointment requests</li>
              <li>Provide and improve our services</li>
              <li>Communicate with you about your appointment</li>
              <li>Maintain and improve our website</li>
            </ul>

            <p>
              We do not use your personal information for purposes unrelated
              to our services without your consent, unless required by law.
            </p>
          </PrivacySection>


          {/* COOKIES */}
          <PrivacySection
            number="04"
            title="Cookies"
          >
            <p>
              Our website may use cookies or similar technologies to improve
              functionality and understand how visitors use the website.
            </p>

            <p>
              Cookies may help us remember preferences and provide a better
              browsing experience.
            </p>

            <p>
              You can control or disable cookies through your browser
              settings. Disabling certain cookies may affect some website
              functionality.
            </p>
          </PrivacySection>


          {/* THIRD PARTY */}
          <PrivacySection
            number="05"
            title="Third-Party Services"
          >
            <p>
              Our website may contain links to third-party services such as
              Google, Google Maps, Instagram or other external platforms.
            </p>

            <p>
              These services operate under their own privacy policies. We are
              not responsible for the privacy practices or content of
              third-party websites.
            </p>
          </PrivacySection>


          {/* SECURITY */}
          <PrivacySection
            number="06"
            title="Data Security"
          >
            <p>
              We take reasonable steps to protect personal information from
              unauthorized access, misuse, alteration or disclosure.
            </p>

            <p>
              However, no method of transmitting or storing information
              online can be guaranteed to be completely secure.
            </p>
          </PrivacySection>


          {/* RETENTION */}
          <PrivacySection
            number="07"
            title="Data Retention"
          >
            <p>
              We retain personal information only for as long as reasonably
              necessary to provide our services, manage our business
              relationship with you, or comply with legal obligations.
            </p>
          </PrivacySection>


          {/* YOUR RIGHTS */}
          <PrivacySection
            number="08"
            title="Your Privacy Rights"
          >
            <p>
              Depending on applicable privacy laws, you may have rights to
              access, correct or request deletion of personal information we
              hold about you.
            </p>

            <p>
              If you would like to make a privacy-related request, please
              contact us using the details below.
            </p>
          </PrivacySection>


          {/* CONTACT */}
          <PrivacySection
            number="09"
            title="Contact Us"
          >
            <p>
              If you have questions about this Privacy Policy or how we
                handle your information, please contact Next Level Barbershop.
            </p>

            <div className="mt-8 space-y-2 text-sm">
              <p>
                <span className="text-neutral-400">Email:</span>{" "}
                hello@nextlevelbarbershop.com.au
              </p>

              <p>
                <span className="text-neutral-400">Phone:</span>{" "}
                +61 415 300 889
              </p>

              <p>
                <span className="text-neutral-400">Location:</span>{" "}
                56 William St, Perth WA 6000, Australia
              </p>
            </div>
          </PrivacySection>


          {/* DISCLAIMER */}
          <div className="mt-20 border-t border-neutral-200 pt-8 text-xs leading-6 text-neutral-400">
            This Privacy Policy is provided as general website content and
            should be reviewed and adapted to reflect the actual data
            practices and legal requirements applicable to Next Level
            Barbershop
            Shop.
          </div>

        </div>
      </section>

    </main>
  );
};


/* -------------------------
   Privacy Section
------------------------- */

const PrivacySection = ({ number, title, children }) => {
  return (
    <section className="grid grid-cols-1 gap-8 border-b border-neutral-200 py-14 md:grid-cols-12">

      {/* NUMBER */}
      <div className="md:col-span-2">
        <span className="text-xs text-neutral-400">
          {number}
        </span>
      </div>


      {/* TITLE */}
      <div className="md:col-span-4">
        <h2 className="text-2xl font-light tracking-[-0.03em] md:text-3xl">
          {title}
        </h2>
      </div>


      {/* CONTENT */}
      <div className="space-y-6 text-sm leading-7 text-neutral-600 md:col-span-6">

        {children}

        {/* Style lists */}
        <style>
          {`
            ul {
              list-style: none;
              padding: 0;
              margin: 1.5rem 0;
            }

            ul li {
              border-bottom: 1px solid #e5e5e5;
              padding: 10px 0;
            }

            ul li::before {
              content: "—";
              margin-right: 12px;
              color: #999;
            }
          `}
        </style>

      </div>

    </section>
  );
};

export default Privacy;
