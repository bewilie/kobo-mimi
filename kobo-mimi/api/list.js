import { list } from '@vercel/blob';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { blobs } = await list();
    // Sort books alphabetically or by upload date
    const sortedBlobs = blobs.sort((a, b) => b.uploadedAt - a.uploadedAt);
    return response.status(200).json(sortedBlobs);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
