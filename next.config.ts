import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites(){
    const userApiTarget =
      process.env.USER_API_TARGET ?? "http://localhost:3000/api/users";
    return [
      {
        source: "/api/users",
        destination: userApiTarget,
      },
      {
        source: "/api/users/:path*",
        destination: `${userApiTarget}/:path*`,  
      }
    ];
  }
};

export default nextConfig;
