import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  civility: z.enum(["Mr.", "Mrs.", "Ms."]).optional(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  passportId: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  organisation: z.string().min(2),
  companyAddress: z.string().optional(),
  jobTitle: z.string().min(2),
  country: z.string().min(2),
  delegateType: z.string(),
  branchOfActivity: z.string().optional(),
  visaInvitation: z.enum(["YES", "NO"]).optional(),
  arrivalDate: z.string().optional(),
  arrivalTime: z.string().optional(),
  departureDate: z.string().optional(),
  departureTime: z.string().optional(),
  airlineCompany: z.string().optional(),
  flightNumber: z.string().optional(),
  workshopChoice: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  specialNeeds: z.string().optional(),
  terms: z.boolean(),
});

function generateCode(): string {
  return "AIRDC26-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function sendConfirmationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  country: string;
  delegateType: string;
  confirmationCode: string;
}) {
  if (!process.env.RESEND_API_KEY) return;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #0D3B66, #1D4E89); padding: 40px 32px; text-align: center;">
        <h1 style="color: #D4AF37; font-size: 28px; margin: 0;">AIRDC 2026</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">23rd Annual Conference · Zimbabwe</p>
      </div>
      <div style="padding: 40px 32px;">
        <h2 style="color: #0D3B66; margin-top: 0;">Registration Confirmed ✓</h2>
        <p style="color: #374151;">Dear ${data.firstName},</p>
        <p style="color: #374151;">Thank you 