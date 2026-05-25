import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Google Form submission
    // Replace with your actual Google Form action URL and field entry IDs
    const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION

    if (!googleFormUrl) {
      console.error('Google Form URL not configured')
      return NextResponse.json({ error: 'Form submission not configured' }, { status: 500 })
    }

    // Create form data for Google Forms
    // Entry IDs need to be obtained from your Google Form
    const formData = new URLSearchParams({
      'entry.0': name, // Replace with actual entry ID for name
      'entry.1': email, // Replace with actual entry ID for email
      'entry.2': subject, // Replace with actual entry ID for subject
      'entry.3': message, // Replace with actual entry ID for message
    })

    // Submit to Google Form
    const response = await fetch(googleFormUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (response.ok || response.status === 200) {
      return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 })
    } else {
      console.error('Google Form submission failed:', response.status)
      return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'An error occurred while submitting the form' },
      { status: 500 }
    )
  }
}
