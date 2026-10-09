/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		REACT_APP_API_URL: process.env.REACT_APP_API_URL,
		REACT_APP_API_GRAPHQL_URL: process.env.REACT_APP_API_GRAPHQL_URL,
		REACT_APP_API_WS: process.env.REACT_APP_API_WS,
	},
	// old Nestar links (/property, /property/detail?id=...) keep working; the query string is passed through
	async redirects() {
		return [
			{ source: '/property', destination: '/product', permanent: false },
			{ source: '/property/:path*', destination: '/product/:path*', permanent: false },
			{ source: '/_admin/properties', destination: '/_admin/products', permanent: false },
		];
	},
};

const { i18n } = require('./next-i18next.config');
nextConfig.i18n = i18n;

module.exports = nextConfig;
