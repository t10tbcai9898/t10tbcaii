import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { email, password, fullName, state, phone } = await request.json()

    // Validate input
    if (!email || !password || !fullName || !state) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      )
    }

    // Check if state already has a secretary
    const { data: existingSecretary } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("state", state)
      .eq("role", "state_secretary")
      .single()

    if (existingSecretary) {
      return NextResponse.json(
        { error: "This state already has a secretary assigned" },
        { status: 400 }
      )
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
    })

    if (authError) {
      console.error("Auth error:", authError)
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      )
    }

    // Create profile
    const { error: profileError } = await supabaseAdmin.from("profiles").insert({
      id: authData.user.id,
      email,
      full_name: fullName,
      role: "state_secretary",
      state,
      phone,
    })

    if (profileError) {
      // Cleanup: delete the auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      console.error("Profile error:", profileError)
      return NextResponse.json(
        { error: "Failed to create profile" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "State Secretary created successfully",
    })
  } catch (error) {
    console.error("Error creating secretary:", error)
    return NextResponse.json(
      { error: "Failed to create secretary" },
      { status: 500 }
    )
  }
}
