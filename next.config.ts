import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // 기존 .svg 관련 로더 제거
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config.module.rules = config.module.rules.map((rule: any) => {
      if (rule.test?.test(".svg")) {
        return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
    });

    // @svgr/webpack 추가
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
