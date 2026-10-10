import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, dentist, date, timeSlot, notes } = body;

    // Field existence validation
    if (!name || !email || !phone || !service || !dentist || !date || !timeSlot) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete all required fields (Name, Email, Phone, Service, Dentist, Date, and Time Slot).",
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Phone validation (at least 8 digits)
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid phone number (at least 8 digits).",
        },
        { status: 400 }
      );
    }

    // Date validation - prevent past dates
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select a valid appointment date.",
        },
        { status: 400 }
      );
    }

    if (selectedDate < today) {
      return NextResponse.json(
        {
          success: false,
          error: "Appointment date cannot be in the past.",
        },
        { status: 400 }
      );
    }

    // Simulated processing delay for realistic loading state
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate demo confirmation code
    const confirmationId = `AD-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      success: true,
      mode: "demo",
      message: "Appointment request received successfully in Demo Mode.",
      confirmation: {
        confirmationId,
        patientName: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        service,
        dentist,
        date,
        timeSlot,
        notes: notes ? notes.trim() : "",
        createdAt: new Date().toISOString(),
        status: "Confirmed (Demo)",
        clinicContact: "+1 (800) 555-3368",
        clinicAddress: "450 Medical Heights Blvd, Suite 320, San Francisco, CA",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your booking. Please try again.",
      },
      { status: 500 }
    );
  }
}
