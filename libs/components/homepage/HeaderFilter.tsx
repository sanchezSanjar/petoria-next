import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ProductGender, ProductSpecies, ProductType } from '../../enums/product.enum';
import { ProductsInquiry } from '../../types/product/product.input';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface HeaderFilterProps {
	initialInput: ProductsInquiry;
}

// homepage search: category (product type) -> species -> gender, then search on /product
const HeaderFilter = (props: HeaderFilterProps) => {
	const { initialInput } = props;
	const { t } = useTranslation('common');
	const [searchFilter, setSearchFilter] = useState<ProductsInquiry>(initialInput);
	const typeRef: any = useRef();
	const speciesRef: any = useRef();
	const genderRef: any = useRef();
	const router = useRouter();
	const [openType, setOpenType] = useState(false);
	const [openSpecies, setOpenSpecies] = useState(false);
	const [openGender, setOpenGender] = useState(false);
	const productType: ProductType[] = Object.values(ProductType);
	const productSpecies: ProductSpecies[] = Object.values(ProductSpecies);
	const productGender: ProductGender[] = Object.values(ProductGender);
	const isPet = searchFilter?.search?.typeList?.[0] === ProductType.PET;

	/** LIFECYCLES **/
	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			if (!typeRef?.current?.contains(event.target)) {
				setOpenType(false);
			}

			if (!speciesRef?.current?.contains(event.target)) {
				setOpenSpecies(false);
			}

			if (!genderRef?.current?.contains(event.target)) {
				setOpenGender(false);
			}
		};

		document.addEventListener('mousedown', clickHandler);

		return () => {
			document.removeEventListener('mousedown', clickHandler);
		};
	}, []);

	/** HANDLERS **/
	const typeStateChangeHandler = () => {
		setOpenType((prev) => !prev);
		setOpenSpecies(false);
		setOpenGender(false);
	};

	const speciesStateChangeHandler = () => {
		setOpenSpecies((prev) => !prev);
		setOpenType(false);
		setOpenGender(false);
	};

	const genderStateChangeHandler = () => {
		setOpenGender((prev) => !prev);
		setOpenType(false);
		setOpenSpecies(false);
	};

	const disableAllStateHandler = () => {
		setOpenType(false);
		setOpenSpecies(false);
		setOpenGender(false);
	};

	const productTypeSelectHandler = useCallback(
		async (value: any) => {
			try {
				const { genderList, ...search } = searchFilter.search;
				setSearchFilter({
					...searchFilter,
					// gender only applies to pets: drop it when another category is picked
					search: value === ProductType.PET ? { ...search, genderList, typeList: [value] } : { ...search, typeList: [value] },
				});
				speciesStateChangeHandler();
			} catch (err: any) {
				console.log('ERROR, productTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productSpeciesSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						speciesList: [value],
					},
				});
				// pets continue to gender; other categories are done after species
				if (isPet) genderStateChangeHandler();
				else disableAllStateHandler();
			} catch (err: any) {
				console.log('ERROR, productSpeciesSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productGenderSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						genderList: [value],
					},
				});
				disableAllStateHandler();
			} catch (err: any) {
				console.log('ERROR, productGenderSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const pushSearchHandler = async () => {
		try {
			if (searchFilter?.search?.typeList?.length == 0) {
				delete searchFilter.search.typeList;
			}

			if (searchFilter?.search?.speciesList?.length == 0) {
				delete searchFilter.search.speciesList;
			}

			if (searchFilter?.search?.genderList?.length == 0) {
				delete searchFilter.search.genderList;
			}

			await router.push(
				`/product?input=${JSON.stringify(searchFilter)}`,
				`/product?input=${JSON.stringify(searchFilter)}`,
			);
		} catch (err: any) {
			console.log('ERROR, pushSearchHandler:', err);
		}
	};

	return (
		<Stack className={'search-box'}>
			<Stack className={'select-box'}>
				<Box component={'div'} className={`box ${openType ? 'on' : ''}`} onClick={typeStateChangeHandler}>
					<span>{searchFilter?.search?.typeList ? t(searchFilter?.search?.typeList[0]) : t('Product type')}</span>
					<ExpandMoreIcon />
				</Box>
				<Box component={'div'} className={`box ${openSpecies ? 'on' : ''}`} onClick={speciesStateChangeHandler}>
					<span>{searchFilter?.search?.speciesList ? t(searchFilter?.search?.speciesList[0]) : t('Species')}</span>
					<ExpandMoreIcon />
				</Box>
				{isPet && (
					<Box component={'div'} className={`box ${openGender ? 'on' : ''}`} onClick={genderStateChangeHandler}>
						<span>{searchFilter?.search?.genderList ? t(searchFilter?.search?.genderList[0]) : t('Gender')}</span>
						<ExpandMoreIcon />
					</Box>
				)}
			</Stack>
			<Stack className={'search-box-other'}>
				<Box component={'div'} className={'search-btn'} onClick={pushSearchHandler}>
					<img src="/img/icons/search_white.svg" alt="" />
				</Box>
			</Stack>

			{/*MENU */}
			<div className={`filter-rooms ${openType ? 'on' : ''}`} ref={typeRef}>
				{productType.map((type: string) => (
					<span onClick={() => productTypeSelectHandler(type)} key={type}>
						{t(type)}
					</span>
				))}
			</div>

			<div className={`filter-rooms ${openSpecies ? 'on' : ''}`} ref={speciesRef}>
				{productSpecies.map((species: string) => (
					<span onClick={() => productSpeciesSelectHandler(species)} key={species}>
						{t(species)}
					</span>
				))}
			</div>

			{isPet && (
				<div className={`filter-rooms ${openGender ? 'on' : ''}`} ref={genderRef}>
					{productGender.map((gender: string) => (
						<span onClick={() => productGenderSelectHandler(gender)} key={gender}>
							{t(gender)}
						</span>
					))}
				</div>
			)}
		</Stack>
	);
};

HeaderFilter.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {
			pricesRange: {
				start: 0,
				end: 2000000,
			},
		},
	},
};

export default HeaderFilter;
