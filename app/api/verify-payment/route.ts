import { NextResponse } from "next/server"
import crypto from "crypto"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      playerData,
    } = await request.json()

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      )
    }

    // Save player to database
    const { data: player, error } = await supabase
      .from("players")
      .insert({
        name: playerData.name,
        father_name: playerData.fatherName,
        email: playerData.email,
        mobile: playerData.mobile,
        state: playerData.state,
        district: playerData.district,
        address: playerData.address,
        payment_status: "completed",
        payment_id: razorpay_payment_id,
        payment_amount: 500,
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { error: "Failed to save registration" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      playerId: player.id,
    })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    )
  }
}
