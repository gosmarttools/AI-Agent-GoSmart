/**
 * GoSmart AI Agent
 * A product of PT. MEDIA ONLINE NUSANTARA
 *
 * © 2026 PT. MEDIA ONLINE NUSANTARA
 * All Rights Reserved.
 */

export default {
  async fetch(request, env) {

    // =============================
    // CORS HANDLING
    // =============================
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      })
    }

    // =============================
    // METHOD VALIDATION
    // =============================
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Method Not Allowed. Use POST."
        }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
    }

    // =============================
    // PARSE JSON BODY
    // =============================
    let body
    try {
      body = await request.json()
    } catch {
      return new Response(
        JSON.stringify({
          error: "Invalid JSON body"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
    }

    const prompt = body.prompt
    if (!prompt) {
      return new Response(
        JSON.stringify({
          error: "Field 'prompt' is required"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
    }

    // =============================
    // CALL WORKERS AI
    // =============================
    const aiResult = await env.AI.run(
      "@cf/meta/llama-3.1-8b-instruct",
      {
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah GoSmart AI Agent. Jawab singkat, jelas, profesional, menggunakan Bahasa Indonesia."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 256
      }
    )

    // =============================
    // RESPONSE
    // =============================
    return new Response(
      JSON.stringify({
        success: true,
        product: "GoSmart AI Agent",
        company: "PT. MEDIA ONLINE NUSANTARA",
        reply: aiResult.response
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    )
  }
}
