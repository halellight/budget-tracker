import { type NextRequest, NextResponse } from "next/server"
import { getStateData } from "@/lib/api"

// Remove type annotations for the context parameter
export async function GET(request: NextRequest, context: any) {
  const state = context.params.state.toLowerCase()

  try {
    const data = await getStateData(state)

    if (!data) {
      return NextResponse.json({ error: "State not found or no data available" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch state data" }, { status: 500 })
  }
}

