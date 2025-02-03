import React from "react";

async function SellerStorePage({
  params,
}: {
  params: Promise<{ pageUrl: string }>;
}) {
  const pageUrl = (await params).pageUrl;
  return <div>{pageUrl}</div>;
}

export default SellerStorePage;
