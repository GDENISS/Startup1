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
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
