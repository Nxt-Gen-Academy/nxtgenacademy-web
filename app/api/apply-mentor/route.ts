import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  linkedin: z.string().url("Must be a valid URL"),
  expertise: z.string().min(1, "Please select an expertise"),
  experience: z.number().min(0, "Invalid experience"),
  goals: z.string().min(10, "Please provide more detail"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate the incoming request data
    const validatedData = schema.parse(body);

    // Create the mentor application record in the database
    const application = await prisma.mentorApplication.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        linkedin: validatedData.linkedin,
        expertise: validatedData.expertise,
        experience: validatedData.experience,
        goals: validatedData.goals,
      },
    });

    return NextResponse.json({ success: true, id: application.id });
  } catch (error) {
    console.error("Failed to save mentor application:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
