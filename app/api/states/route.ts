import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  const dataDir = path.join(process.cwd(), 'public', 'data')
  try {
    const files = await fs.readdir(dataDir)
    const states = files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''))
      .sort()
    return NextResponse.json(states)
  } catch (error) {
    console.error('Error reading data directory:', error)
    return NextResponse.json({ error: 'Failed to fetch states' }, { status: 500 })
  }
}

