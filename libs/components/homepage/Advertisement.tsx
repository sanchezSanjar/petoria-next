import React from 'react';
import { useTranslation } from 'next-i18next';
import { Stack } from '@mui/material';

// homepage promo band: a pet photo with a slow zoom (was a 26 MB real-estate video)
const Advertisement = () => {
	const { t } = useTranslation('common');

	return (
		<Stack className={'video-frame'}>
			<img className={'ad-image'} src={'/img/banner/promo.jpg'} alt={t('Two French bulldogs swimming in life jackets')} />
			<div className={'ad-caption'}>
				<strong>{t('Everything your pet needs')}</strong>
				<span>{t('Pets, food, toys and accessories from trusted sellers')}</span>
			</div>
		</Stack>
	);
};

export default Advertisement;
