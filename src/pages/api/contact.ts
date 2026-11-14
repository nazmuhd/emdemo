import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	const name = String(body.name ?? "").trim();
	const email = String(body.email ?? "").trim();
	const subject = String(body.subject ?? "").trim();
	const message = String(body.message ?? "").trim();
	const honeypot = String(body.website ?? "").trim();

	if (honeypot) {
		// Pretend success for bots
		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}

	if (!name || !email || !message) {
		return new Response(JSON.stringify({ error: "Name, email, and message are required." }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	const apiKey = import.meta.env.RESEND_API_KEY;
	const to = import.meta.env.CONTACT_TO_EMAIL;
	if (!apiKey || !to) {
		return new Response(JSON.stringify({ error: "Email service not configured." }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}

	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from: "Contact Form <onboarding@resend.dev>",
			to: [to],
			reply_to: email,
			subject: subject || `New contact message from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
		}),
	});

	if (!res.ok) {
		const err = await res.text();
		return new Response(JSON.stringify({ error: `Email send failed: ${err}` }), {
			status: 502,
			headers: { "Content-Type": "application/json" },
		});
	}

	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};