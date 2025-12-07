import { useState } from "react";

/**
 * Contact page that displays contact information, map, and Google Form instead of the custom contact form.
 */
export default function Contact() {
  // --- Add form state ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // status message

  // --- Add handler ---
  async function handleSubmit(e) {
    e.preventDefault();

    const issueTitle = `Contact Form: ${name} <${email}>`;
    const issueBody = message;

    setStatus("Sending...");
    try {
      const response = await fetch(
        `https://api.github.com/repos/davpsasnsol/davpsasnsol.github.io/issues`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: issueTitle,
            body: issueBody,
          }),
        }
      );
      if (response.ok) {
        setStatus("Message sent! We will review and reply soon.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Failed to send. Try again later.");
      }
    } catch (error) {
      setStatus("Failed to send. Try again later.");
    }
  }

  return (
    <div className="py-16 bg-dav-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-dav-maroon mb-4">Contact Us</h1>
          <p className="text-gray-600">Get in touch with us for any queries or information</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              {/* ... (contact info as before, unchanged) ... */}
              {/* REMOVED for brevity, your code stays untouched! */}
            </div>
          </div>
          
          <div>
            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-dav-maroon mb-6">Send us a Message</h2>
              {/* --- Replace Google Form with Contact Form --- */}
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg space-y-4"
                style={{
                  minHeight: "500px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  className="w-full border rounded px-3 py-2 mb-2"
                  placeholder="Your Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2 mb-2"
                  placeholder="Your Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <textarea
                  className="w-full border rounded px-3 py-2 mb-2"
                  rows={5}
                  placeholder="Your Message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-dav-saffron text-white px-6 py-2 rounded font-bold mt-2"
                  disabled={status === "Sending..."}
                >
                  {status === "Sending..." ? "Sending..." : "Send"}
                </button>
                {status && <div className="mt-2 text-dav-maroon font-medium">{status}</div>}
              </form>
            </div>
          </div>
        </div>
        
        {/* Map Section (unchanged) */}
        <div className="mt-12">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-dav-maroon mb-4">Our Location</h2>
            <div className="h-64 rounded-lg overflow-hidden">
              <iframe
                title="DAV Public School, Kanyapur, Asansol Location"
                src="https://www.google.com/maps?q=DAV+Public+School,+Kanyapur,+Beside+District+Magistrate+Office,+Lions+Club+Road,+R.K+Mission,+Asansol,+West+Bengal+713305&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.75rem' }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
