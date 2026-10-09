import React, { ReactNode } from 'react';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Product } from '../../types/product/product';
import { ProductGender } from '../../enums/product.enum';

export interface ProductSpec {
	key: string;
	icon: ReactNode;
	label: string;
}

/** Card/detail specs that replace the old beds/rooms/square row. Gender is only set for pets. **/
export const getProductSpecs = (product: Product): ProductSpec[] => {
	const specs: ProductSpec[] = [
		{ key: 'type', icon: <CategoryOutlinedIcon fontSize={'small'} />, label: product?.productType },
		{ key: 'species', icon: <PetsIcon fontSize={'small'} />, label: product?.productSpecies },
	];
	if (product?.productGender) {
		specs.push({
			key: 'gender',
			icon: product.productGender === ProductGender.MALE ? <MaleIcon fontSize={'small'} /> : <FemaleIcon fontSize={'small'} />,
			label: product.productGender,
		});
	}
	return specs;
};
