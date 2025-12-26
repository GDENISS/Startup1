import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Akoot.tech',
    short_name: 'Akoot',
    description: 'Building digital platforms that solve real problems',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#dc2626',
    icons: [
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
