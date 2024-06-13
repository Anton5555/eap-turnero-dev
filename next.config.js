await import("./src/env.js");

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/platform",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
