import { Apartment } from './apartment';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';

const apiFetch = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
  return response.json();
};

export const fetchApartments = async (page = 1, limit = 10): Promise<Apartment[]> => {
  const url = `${baseUrl}/apartments?page=${page}&limit=${limit}`;
  const { items }: { items: Apartment[] } = await apiFetch(url);

  return items.map(item => ({
    ...item,
    images: item.images?.map(img => ({
      ...img,
      url: `${baseUrl}${img.url}`,
    })),
  }));
};

export const fetchApartmentById = async (id: number): Promise<Apartment> => {
  return apiFetch(`${baseUrl}/apartments/${id}`);
};
