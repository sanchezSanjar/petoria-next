import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
	Stack,
	Typography,
	Checkbox,
	OutlinedInput,
	Tooltip,
	IconButton,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { ProductGender, ProductLocation, ProductSpecies, ProductType } from '../../enums/product.enum';
import { ProductsInquiry } from '../../types/product/product.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RefreshIcon from '@mui/icons-material/Refresh';

interface FilterType {
	searchFilter: ProductsInquiry;
	setSearchFilter: any;
	initialInput: ProductsInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const { t } = useTranslation('common');
	const router = useRouter();
	const [productLocation, setProductLocation] = useState<ProductLocation[]>(Object.values(ProductLocation));
	const [productType, setProductType] = useState<ProductType[]>(Object.values(ProductType));
	const productSpecies: ProductSpecies[] = Object.values(ProductSpecies);
	const productGender: ProductGender[] = Object.values(ProductGender);
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);
	const [priceInput, setPriceInput] = useState({
		start: String(searchFilter?.search?.pricesRange?.start ?? 0),
		end: String(searchFilter?.search?.pricesRange?.end ?? 0),
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList;
			setShowMore(false);
			router.push(`/product?input=${JSON.stringify({
			...searchFilter,
			page: 1,
			search: {
				...searchFilter.search,
			}, 
		})}`, `/product?input=${JSON.stringify({
			...searchFilter,
			page: 1,
			search: {
				...searchFilter.search,
			}, 
		})}`, { scroll: false }).then();

		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router.push(`/product?input=${JSON.stringify({
			...searchFilter,
			page: 1,
			search: {
				...searchFilter.search,
			}, 
		})}`, `/product?input=${JSON.stringify({
			...searchFilter,
			page: 1,
			search: {
				...searchFilter.search,
			}, 
		})}`, { scroll: false }).then();

		}

		if (searchFilter?.search?.speciesList?.length == 0) {
			delete searchFilter.search.speciesList;
			router.push(`/product?input=${JSON.stringify({
			...searchFilter,
			page: 1,
			search: {
				...searchFilter.search,
			}, 
		})}`, `/product?input=${JSON.stringify({
			...searchFilter,
			page: 1,
			search: {
				...searchFilter.search,
			}, 
		})}`, { scroll: false }).then();

		}

		if (searchFilter?.search?.genderList?.length == 0) {
			delete searchFilter.search.genderList;
			router.push(`/product?input=${JSON.stringify({
			...searchFilter,
			page: 1,
			search: {
				...searchFilter.search,
			}, 
		})}`, `/product?input=${JSON.stringify({
			...searchFilter,
			page: 1,
			search: {
				...searchFilter.search,
			}, 
		})}`, { scroll: false }).then();

		}

		if (searchFilter?.search?.locationList) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/
	const productLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							page: 1,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							page: 1,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							page: 1,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							page: 1,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('productLocationSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, productLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							page: 1,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							page: 1,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							page: 1,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							page: 1,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('productTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, productTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	// checkbox lists without their own handler (species, gender)
	const productListSelectHandler = useCallback(
		async (e: any, key: 'speciesList' | 'genderList') => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				const current: string[] = searchFilter?.search?.[key] || [];
				if (!isChecked && !current.includes(value)) return;
				const list = isChecked ? [...current, value] : current.filter((item: string) => item !== value);
				const url = `/product?input=${JSON.stringify({
					...searchFilter,
					page: 1,
					search: { ...searchFilter.search, [key]: list },
				})}`;
				await router.push(url, url, { scroll: false });
			} catch (err: any) {
				console.log('ERROR, productListSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						page: 1,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						page: 1,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						page: 1,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						page: 1,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	// keep the price boxes in sync when the filter changes from outside (reset, back/forward)
	useEffect(() => {
		setPriceInput({
			start: String(searchFilter?.search?.pricesRange?.start ?? 0),
			end: String(searchFilter?.search?.pricesRange?.end ?? 0),
		});
	}, [searchFilter?.search?.pricesRange?.start, searchFilter?.search?.pricesRange?.end]);

	// apply typed prices after a pause, so every keystroke doesn't push a new URL and drop digits
	useEffect(() => {
		const timer = setTimeout(() => {
			const current = searchFilter?.search?.pricesRange;
			if (priceInput.start !== '' && Number(priceInput.start) !== (current?.start ?? 0)) {
				productPriceHandler(Number(priceInput.start), 'start');
			} else if (priceInput.end !== '' && Number(priceInput.end) !== (current?.end ?? 0)) {
				productPriceHandler(Number(priceInput.end), 'end');
			}
		}, 600);
		return () => clearTimeout(timer);
	}, [priceInput]);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/product?input=${JSON.stringify(initialInput)}`,
				`/product?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>PRODUCTS FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-home'} mb={'40px'}>
					<Typography className={'title-main'}>{t('Find Your Pet')}</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={t('What are you looking for?')}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									const updatedFilter = { ...searchFilter, page: 1, search: { ...searchFilter.search, text: searchText } };
									router.push(`/product?input=${JSON.stringify(updatedFilter)}`, `/product?input=${JSON.stringify(updatedFilter)}`, {
										scroll: false,
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											const { text, ...search } = searchFilter.search;
											const updatedFilter = { ...searchFilter, page: 1, search };
											router.push(`/product?input=${JSON.stringify(updatedFilter)}`, `/product?input=${JSON.stringify(updatedFilter)}`, {
												scroll: false,
											});
										}}
									/>
								</>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title={t('Reset')}>
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						{t('Location')}
					</p>
					<Stack
						className={`product-location`}
						style={{ height: showMore ? '253px' : '115px' }}
						onMouseEnter={() => setShowMore(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.locationList) {
								setShowMore(false);
							}
						}}
					>
						{productLocation.map((location: string) => {
							return (
								<Stack className={'input-box'} key={location}>
									<Checkbox
										id={location}
										className="product-checkbox"
										color="default"
										size="small"
										value={location}
										checked={(searchFilter?.search?.locationList || []).includes(location as ProductLocation)}
										onChange={productLocationSelectHandler}
									/>
									<label htmlFor={location} style={{ cursor: 'pointer' }}>
										<Typography className="product-type">{t(location)}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>{t('Product Type')}</Typography>
					{productType.map((type: string) => (
						<Stack className={'input-box'} key={type}>
							<Checkbox
								id={type}
								className="product-checkbox"
								color="default"
								size="small"
								value={type}
								onChange={productTypeSelectHandler}
								checked={(searchFilter?.search?.typeList || []).includes(type as ProductType)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="product_type">{t(type)}</Typography>
							</label>
						</Stack>
					))}
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>{t('Species')}</Typography>
					{productSpecies.map((item: string) => (
						<Stack className={'input-box'} key={item}>
							<Checkbox
								id={item}
								className="product-checkbox"
								color="default"
								size="small"
								value={item}
								onChange={(e: any) => productListSelectHandler(e, 'speciesList')}
								checked={(searchFilter?.search?.speciesList || []).includes(item as ProductSpecies)}
							/>
							<label htmlFor={item} style={{ cursor: 'pointer' }}>
								<Typography className="product_type">{t(item)}</Typography>
							</label>
						</Stack>
					))}
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>{t('Gender')}</Typography>
					{productGender.map((item: string) => (
						<Stack className={'input-box'} key={item}>
							<Checkbox
								id={item}
								className="product-checkbox"
								color="default"
								size="small"
								value={item}
								onChange={(e: any) => productListSelectHandler(e, 'genderList')}
								checked={(searchFilter?.search?.genderList || []).includes(item as ProductGender)}
							/>
							<label htmlFor={item} style={{ cursor: 'pointer' }}>
								<Typography className="product_type">{t(item)}</Typography>
							</label>
						</Stack>
					))}
				</Stack>
				<Stack className={'find-your-home'}>
					<Typography className={'title'}>{t('Price Range')}</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder={t('$ min')}
							min={0}
							value={priceInput.start}
							onChange={(e: any) => {
								if (e.target.value === '' || e.target.value >= 0) {
									setPriceInput({ ...priceInput, start: e.target.value });
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder={t('$ max')}
							value={priceInput.end}
							onChange={(e: any) => {
								if (e.target.value === '' || e.target.value >= 0) {
									setPriceInput({ ...priceInput, end: e.target.value });
								}
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Filter;
