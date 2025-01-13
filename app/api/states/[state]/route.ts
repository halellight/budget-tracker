import { NextResponse } from 'next/server';
import { getStateData } from '@/lib/getStateData';

export async function GET(request: Request, { params }: { params: { state?: string } }) {
  const state = params?.state;

  if (!state) {
    return NextResponse.json({ error: 'State parameter is missing' }, { status: 400 });
  }

  try {
    const stateData = await getStateData(state.toLowerCase());

    if (!stateData) {
      return NextResponse.json({ error: `Data for state ${state} not found` }, { status: 404 });
    }

    return NextResponse.json(stateData);
  } catch (error) {
    console.error(`Error reading file for state ${state}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
