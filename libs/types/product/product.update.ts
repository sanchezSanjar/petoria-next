import { ProductGender, ProductLocation, ProductSpecies, ProductStatus, ProductType } from '../../enums/product.enum';

export interface ProductUpdate {
	_id: string;
	productType?: ProductType;
	productSpecies?: ProductSpecies;
	productGender?: ProductGender;
	productStatus?: ProductStatus;
	productLocation?: ProductLocation;
	productTitle?: string;
	productPrice?: number;
	productImages?: string[];
	productDesc?: string;
}
