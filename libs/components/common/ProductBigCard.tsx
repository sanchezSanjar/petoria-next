import React from 'react';
import { useTranslation } from 'next-i18next';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Product } from '../../types/product/product';
import { ProductStatus } from '../../enums/product.enum';
import { getProductSpecs } from './ProductSpecs';
import { REACT_APP_API_URL, topProductRank } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface ProductBigCardProps {
	product: Product;
	likeProductHandler?: any;
}

const ProductBigCard = (props: ProductBigCardProps) => {
	const { product,likeProductHandler } = props;
	const { t } = useTranslation('common');
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** HANDLERS **/
	const goProductDetatilPage = (productId: string) => {
		router.push(`/product/detail?id=${productId}`);
	};

	return (
		<Stack className="product-big-card-box" onClick={() => goProductDetatilPage(product?._id)}>
			<Box
				component={'div'}
				className={'card-img'}
				style={{ backgroundImage: `url(${REACT_APP_API_URL}/${product?.productImages?.[0]})` }}
			>
				{product && product?.productRank >= topProductRank && (
					<div className={'status'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<span>{t('top')}</span>
					</div>
				)}

				<div className={'price'}>${formatterStr(product?.productPrice)}</div>
			</Box>
			<Box component={'div'} className={'info'}>
				<strong className={'title'}>{product?.productTitle}</strong>
				<p className={'desc'}>{t(product?.productLocation)}</p>
				<div className={'options'}>
					{getProductSpecs(product).map((spec) => (
						<div key={spec.key}>
							{spec.icon}
							<span>{t(spec.label)}</span>
						</div>
					))}
				</div>
				<Divider sx={{ mt: '15px', mb: '17px' }} />
				<div className={'bott'}>
					<div className={'status-box'}>
						<p className={`card-status ${product?.productStatus === ProductStatus.SOLD ? 'sold' : 'available'}`}>
							{product?.productStatus === ProductStatus.SOLD ? t('Sold out') : t('Available')}
						</p>
					</div>
					<div className="buttons-box">
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">{product?.productViews}</Typography>
						<IconButton
							color={'default'}
							onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
								e.stopPropagation();
								likeProductHandler?.(user, product?._id);
							}}
						>
							{product?.meLiked && product?.meLiked[0]?.myFavorite ? (
								<FavoriteIcon style={{ color: 'red' }} />
							) : (
								<FavoriteIcon />
							)}
						</IconButton>
						<Typography className="view-cnt">{product?.productLikes}</Typography>
					</div>
				</div>
			</Box>
		</Stack>
	);
};

export default ProductBigCard;
