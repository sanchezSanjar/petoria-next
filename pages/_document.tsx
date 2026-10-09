import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/svg+xml" href="/img/logo/favicon.svg" />

				{/* SEO */}
				<meta name="keyword" content={'petoria, pet shop, pets, pet food, pet toys, pet accessories'} />
				<meta
					name={'description'}
					content={
						'Buy and sell pets, pet food, toys and accessories anywhere in South Korea. Best pet products at best prices on Petoria | ' +
						'Покупайте и продавайте питомцев, корма, игрушки и аксессуары в любой точке Южной Кореи. Лучшие товары для питомцев по лучшим ценам на Petoria | ' +
						'대한민국 어디서나 반려동물, 사료, 장난감, 액세서리를 사고팔 수 있습니다. Petoria에서 최적의 가격으로 최고의 반려동물 용품을 만나보세요'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
