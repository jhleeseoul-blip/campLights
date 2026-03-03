import { Suspense } from "react";
import CheckinClient from "./CheckinClient";

export const dynamic = "force-dynamic";

export default function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <CheckinFetcher searchParams={searchParams} />
    </Suspense>
  );
}

async function CheckinFetcher({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const cityId = typeof params.cityId === 'string' ? params.cityId : undefined;
  return <CheckinClient presetCityId={cityId} />;
}