// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'x-middleware-injected-comments',
            value: 'none',
          },
        ],
      },
    ]
  },
}
