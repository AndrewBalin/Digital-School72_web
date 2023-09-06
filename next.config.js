module.exports = {
    output: 'export',
    staticPageGenerationTimeout: 1000,
    experimental: { appDir: true },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: '@svgr/webpack',
        })
        config.experiments = { ...config.experiments, topLevelAwait: true }
        return config
    },
    images: {
        //unoptimized: true,
        domains: ['127.0.0.1', '1f0e-165-231-181-132.eu.ngrok.io', '26.45.166.104', '51.250.120.249'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}