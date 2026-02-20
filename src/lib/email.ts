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
                from: `"Genesis Labs" <${process.env.EMAIL_USER}>`,
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
        subject: "✅ Registration Confirmed – Genesis Labs Hackathon 2026",
        html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #0a0a0f; color: #fafafa; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #6366f1, #06b6d4); padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; color: white;">Welcome to Genesis Labs Hackathon 2026</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
          <p>Your registration fee of <strong>₹129</strong> has been received successfully.</p>
          
          <div style="background: #18181b; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #6366f1;">
            <h3 style="margin-top: 0; color: #6366f1;">📋 Important Dates & Information</h3>
            <ul style="line-height: 2; padding-left: 20px;">
              <li><strong>Assessment Links Sent:</strong> February 28, 2026 (1 day before test)</li>
              <li><strong>Test Date:</strong> March 1, 2026</li>
              <li><strong>Winners Announcement:</strong> March 8, 2026 at 5:30 PM IST</li>
              <li><strong>Role:</strong> SDE-1 (Remote)</li>
              <li><strong>Top 1–2 Rewards:</strong> Apple Mac M4 laptops + placement (₹10–25 LPA)</li>
              <li><strong>Top 3–10 Rewards:</strong> Apple iPad Pro</li>
            </ul>
          </div>
          
          <div style="background: #2d1215; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444;">
            <h3 style="margin-top: 0; color: #ef4444;">⚠️ Strict Rule</h3>
            <p style="margin-bottom: 0;">Use of AI tools (ChatGPT, Gemini, Copilot, etc.) during the assessment is <strong>strictly prohibited</strong>. Any malpractice will lead to immediate disqualification without refund.</p>
          </div>
          
          <p>Best of luck!</p>
          <p style="color: #71717a;">— Team Genesis Labs</p>
        </div>
        <div style="background: #18181b; padding: 20px; text-align: center; font-size: 12px; color: #52525b;">
          Genesis Labs Platform &copy; 2026 | This is an automated email
        </div>
      </div>
    `,
    });
}

// Send payment failure notification
export function sendPaymentFailureEmail(name: string | null, email: string) {
    const safeName = name && name.trim().length > 0 ? name : "Participant";

    enqueueEmail({
        to: email,
        subject: "❌ Payment Failed – Genesis Labs Hackathon 2026",
        html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #0a0a0f; color: #fafafa; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #ef4444, #b91c1c); padding: 32px 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; color: white;">Payment Attempt Unsuccessful</h1>
        </div>
        <div style="padding: 24px;">
          <p style="font-size: 15px;">Hello <strong>${safeName}</strong>,</p>
          <p>We detected a payment attempt for the <strong>Genesis Labs Hackathon 2026</strong>, but it was not completed successfully.</p>

          <div style="background: #18181b; border-radius: 12px; padding: 18px; margin: 18px 0; border-left: 4px solid #ef4444;">
            <h3 style="margin-top: 0; color: #ef4444;">What this means</h3>
            <ul style="line-height: 1.8; padding-left: 20px; font-size: 14px;">
              <li>If an amount was deducted, it will typically be <strong>reversed automatically</strong> by your bank/payment provider.</li>
              <li>Your hackathon registration is <strong>not confirmed</strong> until a successful payment is recorded.</li>
              <li>You can safely try the payment again from the registration page.</li>
            </ul>
          </div>

          <p style="font-size: 14px;">If you continue to face issues, please contact us at <strong>kandikattu.career@gmail.com</strong> with your registered email and any transaction reference you received.</p>

          <p style="margin-top: 24px; font-size: 14px;">— Team Genesis Labs</p>
        </div>
        <div style="background: #18181b; padding: 16px; text-align: center; font-size: 12px; color: #52525b;">
          Genesis Labs Platform &copy; 2026 | This is an automated email
        </div>
      </div>
    `,
    });
}

// Send assessment questions
export function sendAssessmentEmail(email: string, assessmentLink: string = "#") {
    enqueueEmail({
        to: email,
        subject: "🧠 Genesis Labs Hackathon 2026 – Assessment Started",
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
          
          <p style="color: #71717a;">— Team Genesis Labs</p>
        </div>
      </div>
    `,
    });
}
