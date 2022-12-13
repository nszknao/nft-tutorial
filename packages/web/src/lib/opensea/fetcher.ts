export const fetcher = async (url: string, params: Record<string, string>) => {
  const query = new URLSearchParams(params);
  const res = await fetch(
    `https://api.opensea.io/api/v1${url}?${query.toString()}`
  );
  if (!res.ok) return;
  const data = await res.json();
  return data;
};
