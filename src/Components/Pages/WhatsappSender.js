import React, { useState } from "react";

export default function WhatsAppSender() {
  const [phone, setPhone] = useState(""); // e.g. 919876543210
  const [message, setMessage] = useState("");

  // Simple mobile detection
  const isMobile = () => /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

  const openWhatsApp = () => {
    if (!phone) {
      alert("Enter phone in international format (no +). Example: 919876543210");
      return;
    }
    const encoded = encodeURIComponent(message || "");
    // use E.164 WITHOUT '+' (just country code + number)
    const phoneOnly = phone.replace(/[^\d]/g, ""); // strip non-digits
    // prefer app protocol on mobile
    if (isMobile()) {
      // whatsapp:// may be blocked in some browsers; window.location will attempt to open app
      const appUrl = `whatsapp://send?phone=${phoneOnly}&text=${encoded}`;
      window.location.href = appUrl;
      // Optionally also open web after short delay as fallback (not required)
      setTimeout(() => {
        const webUrl = `https://wa.me/${phoneOnly}?text=${encoded}`;
        window.open(webUrl, "_blank");
      }, 1000);
    } else {
      // desktop -> open WhatsApp Web in new tab
      const webUrl = `https://wa.me/${phoneOnly}?text=${encoded}`;
      window.open(webUrl, "_blank");
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "16px auto", fontFamily: "sans-serif" }}>
      <h3>Send message via WhatsApp</h3>
      <label>
        Phone (country code + number, no +) <br />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 919876543210"
          style={{ width: "100%", padding: 8, margin: "6px 0" }}
        />
      </label>
      <label>
        Message <br />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi, this is a test message"
          style={{ width: "100%", padding: 8, margin: "6px 0" }}
          rows={4}
        />
      </label>
      <button onClick={openWhatsApp} style={{ padding: "8px 12px", cursor: "pointer" }}>
        Open WhatsApp
      </button>
    </div>
  );
}
