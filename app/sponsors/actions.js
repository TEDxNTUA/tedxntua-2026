"use server";

export async function submitSponsorshipInquiry(formData) {
  const accessKey = "a3e2b416-7bf0-4825-8572-ef284e7873e6";
  
  const data = {
    access_key: accessKey,
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    message: formData.get("message"),
    from_name: "TEDxNTUA Sponsorship",
    subject: `Sponsorship Inquiry from ${formData.get("company") || formData.get("name")}`,
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Sponsorship submission error:", error);
    return { success: false, message: "Network error occurred." };
  }
}
