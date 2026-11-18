import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/advantage", destination: "/approach", statusCode: 301 },
      { source: "/proof", destination: "/results", statusCode: 301 },
      { source: "/who-we-serve", destination: "/industries", statusCode: 301 },
      { source: "/council", destination: "/team", statusCode: 301 },
      { source: "/tools", destination: "/approach#kit", statusCode: 301 },
      { source: "/publications", destination: "/insights", statusCode: 301 },
      { source: "/industry-playbooks/nurses", destination: "/industry-playbooks", permanent: false },
      { source: "/industry-playbooks/cruise-lines", destination: "/industry-playbooks", permanent: false },
      { source: "/industry-playbooks/warehouse-logistics", destination: "/industry-playbooks", permanent: false },
      { source: "/industry-playbooks/hospitality", destination: "/industry-playbooks", permanent: false },
      { source: "/industry-playbooks/skilled-trades", destination: "/industry-playbooks", permanent: false },
      { source: "/industry-playbooks/senior-living", destination: "/industry-playbooks", permanent: false },
    ];
  },
};

export default nextConfig;
