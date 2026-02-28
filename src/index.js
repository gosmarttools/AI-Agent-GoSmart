/**
 * GoSmart AI Agent
 * © 2026 PT. MEDIA ONLINE NUSANTARA
 * All Rights Reserved.
 */

export default {
  async fetch(request, env) {

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      })
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "POST only" }), {
        status: 405,
        headers: { "Access-Control-Allow-Origin": "*" }
      })
    }

    const { prompt } = await request.json()

    if (!prompt) {
      return new Response(JSON.stringify({ error: "prompt required" }), {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" }
      })
    }

    const ai = await env.AI.run(
      "@cf/meta/llama-3.1-8b-instruct",
      {
        messages: [
          { role: "system", content: "Kamu adalah GoSmart AI." },
          { role: "user", content: prompt }
        ],
        max_tokens: 300
      }
    )

    return new Response(JSON.stringify({
      success: true,
      brand: "GoSmart",
      company: "PT. MEDIA ONLINE NUSANTARA",
      reply: ai.response
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
  }
}
