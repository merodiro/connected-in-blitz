import { sessionMiddleware, simpleRolesIsAuthorized } from 'blitz'

module.exports = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: 'connected-in',
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
