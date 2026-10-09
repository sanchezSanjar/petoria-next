import React from 'react';
import { useTranslation } from 'next-i18next';
import { Stack, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '../../types/product/product';
import { ProductStatus } from '../../enums/product.enum';
import { getProductSpecs } from '../common/ProductSpecs';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL, topProductRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface ProductCardType {
	product: Product;
	likeProductHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const ProductCard = (props: ProductCardType) => {
	const { product, likeProductHandler, myFavorites, recentlyVisited } = props;
	const { t } = useTranslation('common');
	const user = useReactiveVar(userVar);
	const imagePath: string = product?.productImages[0]
		? `${REACT_APP_API_URL}/${product?.productImages[0]}`
		: '/img/banner/home-hero.jpg';
	const isSold = product?.productStatus === ProductStatus.SOLD;

	return (
		<Stack className="card-config">
			<Stack className="top">
				<Link
					href={{
						pathname: '/product/detail',
						query: { id: product?._id },
					}}
				>
					<img src={imagePath} alt={product?.productTitle ?? ''} />
				</Link>
				{product && product?.productRank > topProductRank && (
					<Box component={'div'} className={'top-badge'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<Typography>{t('TOP')}</Typography>
					</Box>
				)}
				{isSold && (
					<Box component={'div'} className={'sold-overlay'}>
						<span>{t('Sold out')}</span>
					</Box>
				)}
				<Box component={'div'} className={'price-box'}>
					<Typography>${formatterStr(product?.productPrice)}</Typography>
				</Box>
			</Stack>
			<Stack className="bottom">
				<Stack className="name-address">
					<Stack className="name">
						<Link
							href={{
								pathname: '/product/detail',
								query: { id: product?._id },
							}}
						>
							<Typography>{product.productTitle}</Typography>
						</Link>
					</Stack>
					<Stack className="address">
						<Typography>{t(product.productLocation)}</Typography>
					</Stack>
				</Stack>
				<Stack className="options">
					{getProductSpecs(product).map((spec) => (
						<Stack className="option" key={spec.key}>
							{spec.icon} <Typography>{t(spec.label)}</Typography>
						</Stack>
					))}
				</Stack>
				<Stack className="divider"></Stack>
				<Stack className="type-buttons">
					<Stack className="type">
						<Typography className={`status ${isSold ? 'sold' : 'available'}`}>
							{isSold ? t('Sold out') : t('Available')}
						</Typography>
					</Stack>
					{!recentlyVisited && (
						<Stack className="buttons">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{product?.productViews}</Typography>
							<IconButton color={'default'} onClick={() => likeProductHandler?.(user, product?._id)}>
								{myFavorites ? (
									<FavoriteIcon color="primary" />
								) : product?.meLiked && product?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon color="primary" />
								) : (
									<FavoriteBorderIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{product?.productLikes}</Typography>
						</Stack>
					)}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default ProductCard;
