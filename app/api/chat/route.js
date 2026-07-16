import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { reply: "กรุณาตั้งค่า NEXT_PUBLIC_N8N_WEBHOOK_URL ใน .env.local เพื่อเชื่อมต่อ n8n" },
        { status: 500 }
      );
    }

    // Forward the request to n8n
    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!n8nResponse.ok) {
      // Return 404 as a specific error message if workflow is not active
      if (n8nResponse.status === 404) {
        return NextResponse.json(
          { reply: "ไม่พบ Webhook (404 Not Found) - กรุณาตรวจสอบว่าใน n8n ได้กดปุ่ม 'Active' ให้ Workflow ทำงานแล้วหรือยังครับ" },
          { status: 404 }
        );
      }
      throw new Error(`n8n responded with status: ${n8nResponse.status}`);
    }

    const text = await n8nResponse.text();
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.error("Failed to parse n8n response as JSON:", text);
      data = { reply: text || "Received empty response from n8n" };
    }
    
    // Ensure we return exactly what the frontend expects
    return NextResponse.json({
      reply: data.reply || data.output || data.message || (text ? text : "Message received.")
    });

  } catch (error) {
    console.error("n8n Proxy Error:", error);
    return NextResponse.json(
      { reply: "ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อกับ n8n (อาจจะไม่ได้เปิด n8n ไว้ หรือติดปัญหา Network)" },
      { status: 500 }
    );
  }
}
