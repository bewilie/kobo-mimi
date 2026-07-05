export default function handler(request, response) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  return response.status(200).json({
    hasToken: !!token,
    tokenLength: token ? token.length : 0,
    envKeys: Object.keys(process.env).filter(k => k.includes('BLOB') || k.includes('TOKEN') || k.includes('VERCEL'))
  });
}
