import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
       user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_APP_PASSWORD, // 👈 THIS
    },
});

export async function sendEmail({ to, subject, html }) {

    try {
       console.log("👉 MAIL FUNCTION CALLED");
        console.log("👉 TO:", to);
        const info = await transporter.sendMail({
            from: process.env.GOOGLE_USER,
            to,
            subject,
            html,
        });

        console.log("✅ EMAIL SENT:", info.messageId);

    } catch (err) {
        console.log("❌ EMAIL ERROR:", err.message);
    }

    
}