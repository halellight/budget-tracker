import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { StateData } from '@/types/budget'

export async function POST(request: Request) {
  try {
    const data: StateData = await request.json()
    const dataDir = path.join(process.cwd(), 'public', 'data')
    const filePath = path.join(dataDir, `${data.code.toLowerCase()}.json`)
    
    // Create the directory if it doesn't exist
    await fs.mkdir(dataDir, { recursive: true })
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ message: 'Data uploaded successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error uploading data:', error)
    return NextResponse.json({ error: 'Failed to upload data' }, { status: 500 })
  }
}

