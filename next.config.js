/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.md": [
          {
            loader: "@mdx-js/loader",
            options: {
              format: "md",
            },
          },
        ],
        "*.mdx": ["@mdx-js/loader"],
      },
    },
  },
};

module.exports = nextConfig;
