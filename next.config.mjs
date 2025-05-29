const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	compiler: {
		styledComponents: true,
	},
	typescript: {
		ignoreBuildErrors: false,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ['images.unsplash.com'], // для работы с Unsplash
	},
}

export default nextConfig
