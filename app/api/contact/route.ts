import * as zod from 'zod';
import { createTransport } from 'nodemailer';

const schema = zod.object({
    context: zod.string().min(1).max(64).optional(),
    name: zod.string().min(3).max(64),
    athleteName: zod.string().min(1).max(64).optional(),
    email: zod.string().email(),
    message: zod.string().min(1).max(5000),
});

export async function POST(request: Request) {
    const result = schema.safeParse(await request.json());
    if (!result.success) return new Response(JSON.stringify(result.error), { status: 400 });

    const { context, name, athleteName, email, message } = result.data;

    const transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use TLS
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const options = {
        from: `"${name}" <${email}>`,
        to: process.env.SMTP_EMAIL,
        subject: `New message from ${name} (${context})`,
        text: `
            Name: ${name}
            Email: ${email}
            Athlete Name: ${athleteName} (${context})
            Message: ${message}
        `
    }

    try {
        await transporter.sendMail(options);
        return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 });
    }
    catch (error) {
        return new Response(JSON.stringify({ message: 'Message failed to send!' }), { status: 500 });
    }
}