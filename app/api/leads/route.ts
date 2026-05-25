import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

// Lead Interface
interface Lead {
  id: string
  name: string
  email: string
  phone: string
  budget: string
  type: string
  message: string
  status: string
  createdAt: string
  notes: string
}

const DATA_DIR = path.join(process.cwd(), 'data')
const FILE_PATH = path.join(DATA_DIR, 'leads.json')

// Seed Mock Data
const SEED_LEADS: Lead[] = [
  {
    id: 'lead_dharvin_1716612000',
    name: 'Dharvin',
    email: 'dharvin.aids@gmail.com',
    phone: '+91 94421 87654',
    budget: '₹15,000',
    type: 'Content',
    message: 'Need a custom high-end photo frame editing and design for the AI&DS farewell photo. The frame should contain cinematic details, a metallic golden border, and high-fidelity typography. Reference is the aids farewell photo frame which needs to be super detailed and visually spectacular.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    notes: 'Student project. Wants it printed and framed. High details, golden elements, and AI&DS department logo.'
  },
  {
    id: 'lead_sarah_1716600000',
    name: 'Sarah Jenkins',
    email: 'sarah@luxebrands.co',
    phone: '+1 (555) 019-2834',
    budget: '$10,000',
    type: 'Branding',
    message: 'We are launching a new luxury sustainable fashion line in New York. We need full identity branding, custom typography, logo, and a comprehensive brand guidelines deck. A minimal, premium, editorial aesthetic is an absolute must.',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    notes: 'Initial styling review session went great. Shared styleboard of violet-gold accents. Client wants standard brand assets by next month.'
  },
  {
    id: 'lead_alex_1716580000',
    name: 'Alex Rivers',
    email: 'alex@flowtech.io',
    phone: '+1 (555) 048-1290',
    budget: '$25,000',
    type: 'Web Design',
    message: 'Looking to redesign our main corporate SaaS landing page into a highly interactive, fluid 3D WebGL and Next.js digital experience. High emphasis on transition smoothness, premium mobile responsiveness, and page speed.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    notes: 'Sent formal quotation for design system + Next.js build. Client is discussing budget internally. Follow up on Thursday.'
  },
  {
    id: 'lead_marcus_1716500000',
    name: 'Marcus Sterling',
    email: 'sterling.media@gmail.com',
    phone: '+44 20 7946 0958',
    budget: '$5,000',
    type: 'Video',
    message: 'Need a 60-second high-energy commercial promo for our product launch event. High-fidelity cinematic editing, dynamic text transitions, visual sound design, and color grading. We have raw 4K footage ready to be compiled.',
    status: 'Closed',
    createdAt: new Date(Date.now() - 3600000 * 120).toISOString(), // 5 days ago
    notes: 'Project fully delivered and approved. Client was absolutely thrilled with the typography kinetic animations. Received full payment.'
  }
]

// Helper: Read Leads
function readLeads(): Lead[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (!fs.existsSync(FILE_PATH)) {
      // Auto-seed on first run
      fs.writeFileSync(FILE_PATH, JSON.stringify(SEED_LEADS, null, 2), 'utf-8')
      return SEED_LEADS
    }
    const content = fs.readFileSync(FILE_PATH, 'utf-8')
    return JSON.parse(content) || []
  } catch (err) {
    console.error('Error reading leads file:', err)
    return []
  }
}

// Helper: Write Leads
function writeLeads(leads: Lead[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(FILE_PATH, JSON.stringify(leads, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error('Error writing leads file:', err)
    return false
  }
}

// GET all leads
export async function GET() {
  const leads = readLeads()
  return NextResponse.json(leads)
}

// Helper: Send Email Notification to genstudioadmins@gmail.com
async function sendEmailNotification(lead: Lead) {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  const user = process.env.SMTP_USER || 'genstudioadmins@gmail.com'
  const pass = process.env.SMTP_PASS

  if (!pass) {
    console.warn('[Email Notification] SMTP_PASS environment variable not provided. Skipping email dispatch.')
    return
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass
    }
  })

  const mailOptions = {
    from: `"Studio GENZ CRM" <${user}>`,
    to: 'genstudioadmins@gmail.com', // Admin inbox
    subject: `⚡ New Lead Capture: ${lead.name} (${lead.type})`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #fafafa;">
        <div style="text-align: center; border-bottom: 2px solid #8b5cf6; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #8b5cf6; margin: 0; text-transform: uppercase; font-weight: 900; letter-spacing: -0.05em;">STUDIO GENZ CRM</h2>
          <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">Real-Time Client Lead Captured</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e5e5; margin-bottom: 20px;">
          <h3 style="color: #111; margin-top: 0; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px; font-size: 14px; text-transform: uppercase; tracking-wider;">Lead Specification</h3>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #666; width: 120px;">Client Name:</td>
              <td style="padding: 6px 0; color: #111;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #666;">Project Type:</td>
              <td style="padding: 6px 0; color: #8b5cf6; font-weight: bold;">${lead.type}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #666;">Project Budget:</td>
              <td style="padding: 6px 0; color: #f59e0b; font-weight: bold; font-family: monospace;">${lead.budget}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #666;">Client Email:</td>
              <td style="padding: 6px 0; color: #111; font-family: monospace;">${lead.email}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #666;">Phone Number:</td>
              <td style="padding: 6px 0; color: #111; font-family: monospace;">${lead.phone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #666;">Date Captured:</td>
              <td style="padding: 6px 0; color: #666; font-size: 11px;">${new Date(lead.createdAt).toLocaleString('en-US')}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e5e5; margin-bottom: 20px;">
          <h3 style="color: #111; margin-top: 0; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px; font-size: 14px; text-transform: uppercase; tracking-wider;">Proposal Message</h3>
          <p style="color: #333; line-height: 1.6; margin: 0; font-size: 13px; white-space: pre-wrap;">${lead.message}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${lead.email}&su=${encodeURIComponent(`Studio GENZ - Project Proposal Reply`)}" target="_blank" style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block;">Compose Gmail Reply</a>
        </div>

        <div style="text-align: center; margin-top: 20px; border-top: 1px solid #eaeaea; padding-top: 15px; color: #888; font-size: 10px;">
          <p style="margin: 0;">This email is automated from the Studio GENZ CRM Dashboard on Lead capture.</p>
        </div>
      </div>
    `
  }

  await transporter.sendMail(mailOptions)
  console.log(`[Email Notification] Email successfully sent to genstudioadmins@gmail.com for lead: ${lead.name}`)
}

// Helper: Send WhatsApp Notification via Twilio
async function sendWhatsAppNotification(lead: Lead) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromWhatsApp = process.env.TWILIO_WHATSAPP_FROM || '+14155238886'
  const toWhatsApp = process.env.TWILIO_WHATSAPP_TO

  if (!accountSid || !authToken || !toWhatsApp) {
    console.warn('[WhatsApp Notification] Twilio Account SID, Auth Token or TWILIO_WHATSAPP_TO recipient number not provided. Skipping WhatsApp.')
    return
  }

  const formattedFrom = fromWhatsApp.startsWith('whatsapp:') ? fromWhatsApp : `whatsapp:${fromWhatsApp}`
  const authString = Buffer.from(`${accountSid}:${authToken}`).toString('base64')
  
  // Split recipient string by comma to support multiple numbers (e.g. "+91XXXXXXXXXX,+91YYYYYYYYYY")
  const recipientNumbers = toWhatsApp.split(',').map(num => num.trim()).filter(Boolean)

  const messageBody = `⚡ *New Lead Proposal Captured!* ⚡\n\n` +
    `• *Client:* ${lead.name}\n` +
    `• *Service:* ${lead.type}\n` +
    `• *Budget:* ${lead.budget}\n` +
    `• *Email:* ${lead.email}\n` +
    `• *Phone:* ${lead.phone}\n\n` +
    `💬 *Message:* "${lead.message.slice(0, 150)}${lead.message.length > 150 ? '...' : ''}"\n\n` +
    `🌐 Log in to Studio GENZ CRM to manage details.`

  // Send message to all numbers concurrently in background
  await Promise.all(recipientNumbers.map(async (number) => {
    try {
      const formattedTo = number.startsWith('whatsapp:') ? number : `whatsapp:${number}`
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          From: formattedFrom,
          To: formattedTo,
          Body: messageBody
        })
      })

      if (response.ok) {
        console.log(`[WhatsApp Notification] WhatsApp successfully dispatched to (${number}) for lead: ${lead.name}`)
      } else {
        const errorData = await response.json()
        console.error(`[WhatsApp Notification] Twilio API call failed for number (${number}):`, errorData)
      }
    } catch (err) {
      console.error(`[WhatsApp Notification] Error sending WhatsApp to number (${number}):`, err)
    }
  }))
}

// POST new lead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const leads = readLeads()

    // Support seeding mock leads explicitly
    if (body.isSeedAction && Array.isArray(body.seeds)) {
      writeLeads(body.seeds)
      return NextResponse.json({ success: true, leads: body.seeds })
    }

    const newLead: Lead = {
      id: body.id || 'lead_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now(),
      name: body.name || 'Anonymous Client',
      email: body.email || 'No email provided',
      phone: body.phone || 'No phone provided',
      budget: body.budget || 'Undetermined',
      type: body.type || 'Inquiry',
      message: body.message || 'No details provided',
      status: body.status || 'New',
      createdAt: body.createdAt || new Date().toISOString(),
      notes: body.notes || ''
    }

    const updatedLeads = [newLead, ...leads]
    writeLeads(updatedLeads)

    // Trigger asynchronous email and WhatsApp alerts in the background
    sendEmailNotification(newLead).catch(err => {
      console.error('[Notification Trigger] Failed to send email alert:', err)
    })
    sendWhatsAppNotification(newLead).catch(err => {
      console.error('[Notification Trigger] Failed to send WhatsApp alert:', err)
    })

    return NextResponse.json({ success: true, lead: newLead })
  } catch (err) {
    console.error('POST /api/leads error:', err)
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 400 })
  }
}

// PUT update lead
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status, notes } = body
    if (!id) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 })
    }

    const leads = readLeads()
    let updatedLead: Lead | null = null

    const updatedLeads = leads.map(lead => {
      if (lead.id === id) {
        updatedLead = {
          ...lead,
          status: status !== undefined ? status : lead.status,
          notes: notes !== undefined ? notes : lead.notes
        }
        return updatedLead
      }
      return lead
    })

    if (!updatedLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    writeLeads(updatedLeads)
    return NextResponse.json({ success: true, lead: updatedLead })
  } catch (err) {
    console.error('PUT /api/leads error:', err)
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 400 })
  }
}

// DELETE leads
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const clear = searchParams.get('clear')

    if (clear === 'true') {
      writeLeads([])
      return NextResponse.json({ success: true, message: 'Leads database cleared' })
    }

    if (!id) {
      return NextResponse.json({ error: 'Lead ID required for deletion' }, { status: 400 })
    }

    const leads = readLeads()
    const filteredLeads = leads.filter(l => l.id !== id)

    writeLeads(filteredLeads)
    return NextResponse.json({ success: true, id })
  } catch (err) {
    console.error('DELETE /api/leads error:', err)
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 400 })
  }
}
