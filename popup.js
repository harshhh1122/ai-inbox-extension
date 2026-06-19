async function loadEmails() {
  try {
    const res = await fetch("https://harshitauriya.app.n8n.cloud/webhook/emails");
    const data = await res.json();

    console.log("DATA:", data); // DEBUG

    const container = document.getElementById("emails");
    container.innerHTML = "";

    data.reverse().forEach(email => {
      const div = document.createElement("div");

      // urgency color
      let color = "gray";
      if (email.urgency === "High") color = "red";
      else if (email.urgency === "Medium") color = "orange";
      else if (email.urgency === "Low") color = "green";

     div.className = "email-card";

div.innerHTML = `
  <div style="border-left: 4px solid ${color}; padding-left: 10px;">
    
    <div class="email-subject">
      ${email.subject || "No Subject"}
    </div>

    <div class="email-meta">📧 ${email.email}</div>
    <div class="email-meta">📂 ${email.category}</div>
    <div class="email-meta">⚡ ${email.urgency}</div>
    <div class="email-meta">📅 ${email.event_date || "No date"}</div>

    <div class="email-summary">
      ${email.summary}
    </div>

  </div>
`;
      container.appendChild(div);
    });

  } catch (err) {
    console.error("Error:", err);
    document.getElementById("emails").innerText = "Error loading emails";
  }
}

loadEmails();