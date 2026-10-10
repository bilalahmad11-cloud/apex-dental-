import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide your Name, Email, and Message.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    // Realistic network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    return NextResponse.json({
      success: true,
      mode: "demo",
      message: "Thank you for reaching out! In this interactive demo, your message has been simulated successfully.",
      ticketId: `MSG-${Math.floor(10000 + Math.random() * 90000)}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to send message right now. Please call our clinic directly.",
      },
      { status: 500 }
    );
  }
}
