"use server";

import { prisma } from "@/lib/prisma";

export async function saveEnquiry(data: {
  name: string;
  email: string;
  phone?: string;
  course: string;
  whatsAppUpdates: boolean;
}) {
  try {
    const enquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        course: data.course,
        whatsAppUpdates: data.whatsAppUpdates,
      },
    });
    return { success: true, enquiry };
  } catch (error) {
    console.error("Error saving enquiry:", error);
    return { success: false, error: "Failed to save enquiry" };
  }
}
