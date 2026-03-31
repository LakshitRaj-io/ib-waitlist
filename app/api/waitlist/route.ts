import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    // Server-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Insert into Supabase 'waitlist' table
    const { error } = await supabase
      .from("waitlist")
      .insert({ email: email.trim().toLowerCase() })

    if (error) {
      // Postgres unique violation code is 23505
      // This happens if the user is already on the waitlist
      if (error.code === "23505") {
        return NextResponse.json({ success: true, existing: true }, { status: 200 })
      }
      
      console.error("[waitlist supabase error]", error)
      return NextResponse.json(
        { error: `Supabase error: ${error.message || error.code || 'Unknown'}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err: unknown) {
    console.error("[waitlist exception]", err)
    
    // Attempt to extract a readable message
    let errMsg = "Unknown error"
    if (err instanceof Error) errMsg = err.message
    else if (typeof err === "string") errMsg = err
    else if (err && typeof err === "object") errMsg = JSON.stringify(err)

    return NextResponse.json(
      { error: `Server exception: ${errMsg}. Did you restart the dev server after adding .env variables?` },
      { status: 500 }
    )
  }
}
