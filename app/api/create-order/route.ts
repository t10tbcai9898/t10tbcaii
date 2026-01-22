import { NextResponse } from "next/server"
import Razorpay from "razorpay"

function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID
  const key_secret = process.env.RAZORPAY_KEY_SECRET
  
  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials not configured")
  }
  
  return new Razorpay({ key_id, key_secret })
}

export async function POST(request: Request) {
  try {
    const razorpay = getRazorpayInstance()
    const { amount } = await request.json()

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}
