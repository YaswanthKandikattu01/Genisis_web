import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}

// Queue for async email sending with retry
const emailQueue: { payload: EmailPayload; retries: number }[] = [];
let isProcessing = false;

async function processQueue() {
    if (isProcessing || emailQueue.length === 0) return;
    isProcessing = true;

    while (emailQueue.length > 0) {
        const item = emailQueue.shift()!;
        try {
            await transporter.sendMail({
                from: `"Genesis AI" <${process.env.EMAIL_USER}>`,
                ...item.payload,
            });
            console.log(`✅ Email sent to ${item.payload.to}`);
        } catch (error) {
            console.error(`❌ Email failed to ${item.payload.to}:`, error);
            if (item.retries < 3) {
                emailQueue.push({ ...item, retries: item.retries + 1 });
                console.log(`🔄 Retrying (${item.retries + 1}/3)...`);
            }
        }
    }

    isProcessing = false;
}

// Enqueue email with auto-processing
export function enqueueEmail(payload: EmailPayload) {
    emailQueue.push({ payload, retries: 0 });
    // Process asynchronously
    setTimeout(processQueue, 0);
}

// Send registration confirmation
export function sendRegistrationConfirmation(name: string, email: string) {
    enqueueEmail({
        to: email,
        subject: "✅ Registration Confirmed – Genesis AI Hackathon 2026",
        html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #0a0a0f; color: #fafafa; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #6366f1, #06b6d4); padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; color: white;">Welcome to Genesis Hackathon 2026</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
          <p>Your registration fee of <strong>₹129</strong> has been received successfully.</p>
          
          <div style="background: #18181b; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #6366f1;">
            <h3 style="margin-top: 0; color: #6366f1;">📋 Important Information</h3>
            <ul style="line-height: 2; padding-left: 20px;">
              <li><strong>Assessment Date:</strong> Will be communicated via email</li>
              <li><strong>Time Limit:</strong> 45 hours from start</li>
              <li><strong>Role:</strong> SDE-1 (Remote)</li>
              <li><strong>Salary Range:</strong> ₹10–16 LPA</li>
            </ul>
          </div>
          
          <div style="background: #2d1215; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444;">
            <h3 style="margin-top: 0; color: #ef4444;">⚠️ Strict Rule</h3>
            <p style="margin-bottom: 0;">Use of AI tools (ChatGPT, Gemini, Copilot, etc.) during the assessment is <strong>strictly prohibited</strong>. Any malpractice will lead to immediate disqualification without refund.</p>
          </div>
          
          <p>Best of luck!</p>
          <p style="color: #71717a;">— Team Genesis</p>
        </div>
        <div style="background: #18181b; padding: 20px; text-align: center; font-size: 12px; color: #52525b;">
          Genesis AI Platform &copy; 2026 | This is an automated email
        </div>
      </div>
    `,
    });
}

// Send assessment questions
export function sendAssessmentEmail(email: string, assessmentLink: string = "#") {
    enqueueEmail({
        to: email,
        subject: "🧠 Genesis Hackathon 2026 – Assessment Started",
        html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #0a0a0f; color: #fafafa; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #6366f1, #06b6d4); padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; color: white;">Assessment Phase Active</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Hello Participant,</p>
          <p>The assessment phase has officially started. You have <strong>45 hours</strong> to complete.</p>
          
          <div style="background: #18181b; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0;">📝 Instructions</h3>
            <ol style="line-height: 2; padding-left: 20px;">
              <li>Click the link below to access your assessment</li>
              <li>Complete all tasks within the 45-hour window</li>
              <li>Submit your work before the deadline</li>
              <li><strong style="color: #ef4444;">Do NOT use any AI tools</strong></li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${assessmentLink}" style="background: #6366f1; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: bold; display: inline-block;">Start Assessment</a>
          </div>
          
          <p style="color: #71717a;">— Team Genesis</p>
        </div>
      </div>
    `,
    });
}
