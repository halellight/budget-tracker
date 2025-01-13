import { getStateData } from '@/lib/getStateData';
import { notFound } from 'next/navigation';
import StatePage from './StatePage';

export default async function Page({ params }: { params: { state: string } }) {
  // Ensure params.state exists and is passed correctly
  const { state } = params;

  // Validate and handle case sensitivity
  if (!state) {
    notFound(); // Trigger Next.js 404 if state is undefined
  }

  const stateData = await getStateData(state.toLowerCase());

  // Check if stateData exists; if not, trigger a 404
  if (!stateData) {
    notFound();
  }

  return <StatePage params={params} stateData={stateData} />;
}
