/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  deploymentId:
    process.env.NEXT_DEPLOYMENT_ID ?? process.env.VERCEL_GIT_COMMIT_SHA,
};

export default nextConfig;
