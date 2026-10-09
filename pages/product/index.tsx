import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';
import { Box, Button, Menu, MenuItem, Pagination, Stack, Typography } from '@mui/material';
import ProductCard from '../../libs/components/product/ProductCard';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import Filter from '../../libs/components/product/Filter';
import { useRouter } from 'next/router';
import { ProductsInquiry } from '../../libs/types/product/product.input';
import { Product } from '../../libs/types/product/product';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Direction,Message  } from '../../libs/enums/common.enum';
import { T } from '../../libs/types/common';
import { GET_PRODUCTS } from '../../apollo/user/query';
import { useMutation, useQuery } from '@apollo/client';
import { LIKE_TARGET_PRODUCT } from '../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const parseInput = (input: unknown) => {
	if (typeof input !== 'string') return null;
	try {
		return JSON.parse(input);
	} catch {
		return null;
	}
};

const ProductList: NextPage = ({ initialInput, ...props }: any) => {
	const { t } = useTranslation('common');
	const router = useRouter();
	const [searchFilter, setSearchFilter] = useState<ProductsInquiry>(parseInput(router?.query?.input) ?? initialInput);
	const [products, setProducts] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [sortingOpen, setSortingOpen] = useState(false);
	const [filterSortName, setFilterSortName] = useState('New');
	const [showFilter, setShowFilter] = useState<boolean>(false);

	/** APOLLO REQUESTS **/
	const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);

	const { loading: getProductsLoading, 
		data: getProductsData, 
		error: getProductsError, 
		refetch: getProductsRefetch } = useQuery(GET_PRODUCTS, {
			fetchPolicy: "network-only",
			variables: {input: searchFilter},
			notifyOnNetworkStatusChange: true,
			onCompleted: (data: T) => {
				setProducts(data?.getProducts?.list);
				setTotal(data?.getProducts?.metaCounter?.[0]?.total ?? 0);
			},
		}) ;

	/** LIFECYCLES **/
	useEffect(() => {
		const inputObj = parseInput(router.query.input);
		if (inputObj) {
			setSearchFilter(inputObj);
			setCurrentPage(inputObj.page ?? 1);
		} else {
			setCurrentPage(searchFilter.page ?? 1);
		}
	}, [router]);

	/** HANDLERS **/
	const likeProductHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			//likeTargetProduct()
			await likeTargetProduct({ variables: { input: id } });
			//getProductsRefetch
			await getProductsRefetch({ input: searchFilter });

			await sweetTopSmallSuccessAlert("success", 800);
		} catch (err: any) {
			console.log("ERROR, likeProductHandler", err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}


	const handlePaginationChange = async (event: ChangeEvent<unknown>, value: number) => {
		const updatedFilter = { ...searchFilter, page: value };
		await router.push(
			`/product?input=${JSON.stringify(updatedFilter)}`,
			`/product?input=${JSON.stringify(updatedFilter)}`,
			{
				scroll: false,
			},
		);
		setCurrentPage(value);
	};

	const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
		setSortingOpen(true);
	};

	const sortingCloseHandler = () => {
		setSortingOpen(false);
		setAnchorEl(null);
	};

	const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
		switch (e.currentTarget.id) {
			case 'new':
				setSearchFilter({ ...searchFilter, sort: 'createdAt', direction: Direction.DESC });
				setFilterSortName('New');
				break;
			case 'lowest':
				setSearchFilter({ ...searchFilter, sort: 'productPrice', direction: Direction.ASC });
				setFilterSortName('Lowest Price');
				break;
			case 'highest':
				setSearchFilter({ ...searchFilter, sort: 'productPrice', direction: Direction.DESC });
				setFilterSortName('Highest Price');
		}
		setSortingOpen(false);
		setAnchorEl(null);
	};

	return (
		<div id="product-list-page" style={{ position: 'relative' }}>
			<div className="container">
				<Stack className={'product-page'}>
					<Stack className={`filter-config ${showFilter ? 'open' : ''}`}>
						{/* @ts-ignore */}
						<Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} initialInput={initialInput} />
					</Stack>
					<Stack className="main-config" mb={'76px'}>
						<Stack className={'toolbar'}>
							{/* the filter panel is a sidebar on desktop and opens from here on tablets and phones */}
							<Button
								className={'filter-toggle'}
								startIcon={<TuneRoundedIcon />}
								onClick={() => setShowFilter((prev) => !prev)}
								aria-expanded={showFilter}
							>
								{t('Filters')}
							</Button>
							<Typography className={'result-count'}>
								{t('Total {{count}} products available', { count: total })}
							</Typography>
							<Box component={'div'} className={'sort'}>
								<span>{t('Sort by')}</span>
								<Button onClick={sortingClickHandler} endIcon={<KeyboardArrowDownRoundedIcon />}>
									{t(filterSortName)}
								</Button>
								<Menu anchorEl={anchorEl} open={sortingOpen} onClose={sortingCloseHandler} sx={{ paddingTop: '5px' }}>
									<MenuItem
										onClick={sortingHandler}
										id={'new'}
										disableRipple
										sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
									>
										{t('New')}
									</MenuItem>
									<MenuItem
										onClick={sortingHandler}
										id={'lowest'}
										disableRipple
										sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
									>
										{t('Lowest Price')}
									</MenuItem>
									<MenuItem
										onClick={sortingHandler}
										id={'highest'}
										disableRipple
										sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
									>
										{t('Highest Price')}
									</MenuItem>
								</Menu>
							</Box>
						</Stack>
						<Stack className={'list-config'}>
							{products?.length === 0 ? (
								<div className={'no-data'}>
									<img src="/img/icons/icoAlert.svg" alt="" />
									<p>{t('No Products found!')}</p>
								</div>
							) : (
								products.map((product: Product) => {
									return <ProductCard likeProductHandler={likeProductHandler} product={product} key={product?._id} />;
								})
							)}
						</Stack>
						<Stack className="pagination-config">
							{products.length !== 0 && (
								<Stack className="pagination-box">
									<Pagination
										page={currentPage}
										count={Math.ceil(total / searchFilter.limit)}
										onChange={handlePaginationChange}
										shape="circular"
										color="primary"
									/>
								</Stack>
							)}
						</Stack>
					</Stack>
				</Stack>
			</div>
		</div>
	);
};

ProductList.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			pricesRange: {
				start: 0,
				end: 2000000,
			},
		},
	},
};

export default withLayoutBasic(ProductList);
