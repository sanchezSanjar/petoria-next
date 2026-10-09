import React from 'react';
import { useTranslation } from 'next-i18next';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ProductLocation, ProductSpecies, ProductType } from '../../libs/enums/product.enum';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const About: NextPage = () => {
	const { t } = useTranslation('common');
	// real catalogue facts instead of made-up numbers
	const facts = [
		{ value: Object.values(ProductType).length, label: 'Product types' },
		{ value: Object.values(ProductSpecies).length, label: 'Species' },
		{ value: Object.values(ProductLocation).length, label: 'Cities' },
	];

	return (
		<Stack className={'about-page'}>
			<Stack className={'intro'}>
				<Stack className={'container'}>
					<Stack className={'left'}>
						<strong>{t("We're on a Mission to Make Pet Care Simple and Joyful.")}</strong>
					</Stack>
					<Stack className={'right'}>
						<p>
							{t(
								'Petoria is a marketplace for pets and everything they need. Registered sellers list dogs, cats, birds and fish, together with food, toys and accessories, so you can find a new friend and its supplies in one place.',
							)}
							<br />
							<br />
							{t(
								'Every listing shows the species, gender and city, with real photos and the seller’s contact. Compare, save your favorites and talk to the seller before you decide.',
							)}
						</p>
						<Stack className={'boxes'}>
							<div className={'box'}>
								<div>
									<img src="/img/icons/garden.svg" alt="" />
								</div>
								<span>{t('Healthy Pets')}</span>
								<p>{t('Listings from registered sellers, with species, gender and photos.')}</p>
							</div>
							<div className={'box'}>
								<div>
									<img src="/img/icons/securePayment.svg" alt="" />
								</div>
								<span>{t('Trusted Sellers')}</span>
								<p>{t('Every listing shows who sells it, with a profile and a contact number.')}</p>
							</div>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
			<Stack className={'statistics'}>
				<Stack className={'container'}>
					<Stack className={'banner'}>
						<img src="/img/banner/home-hero.jpg" alt="" />
					</Stack>
					<Stack className={'info'}>
						{facts.map((fact) => (
							<Box component={'div'} key={fact.label}>
								<strong>{fact.value}</strong>
								<p>{t(fact.label)}</p>
							</Box>
						))}
					</Stack>
				</Stack>
			</Stack>
			<Stack className={'agents'}>
				<Stack className={'container'}>
					<span className={'title'}>{t('Our Exclusive Sellers')}</span>
					<p className={'desc'}>{t('Meet the people who list pets and products on Petoria')}</p>
					<Stack className={'wrap'}>
						{/*{[1, 2, 3, 4, 5].map(() => {*/}
						{/*	return <AgentCard />;*/}
						{/*})}*/}
					</Stack>
				</Stack>
			</Stack>
			<Stack className={'options'}>
				<img src="/img/banner/about.jpg" alt="" className={'about-banner'} />
				<Stack className={'container'}>
					<strong>{t('Sell your pets and products on Petoria')}</strong>
					<Stack>
						<div className={'icon-box'}>
							<img src="/img/icons/security.svg" alt="" />
						</div>
						<div className={'text-box'}>
							<span>{t('List in minutes')}</span>
							<p>{t('Add photos, type, species, gender and price from My Page.')}</p>
						</div>
					</Stack>
					<Stack>
						<div className={'icon-box'}>
							<img src="/img/icons/keywording.svg" alt="" />
						</div>
						<div className={'text_-box'}>
							<span>{t('Reach pet lovers')}</span>
							<p>{t('Buyers find your listings by type, species and city.')}</p>
						</div>
					</Stack>
					<Stack>
						<div className={'icon-box'}>
							<img src="/img/icons/investment.svg" alt="" />
						</div>
						<div className={'text-box'}>
							<span>{t('Manage your listings')}</span>
							<p>{t('Edit listings, mark items as sold and follow their views and likes.')}</p>
						</div>
					</Stack>
					<Stack className={'btn'}>
						{t('Learn More')}
						<img src="/img/icons/rightup.svg" alt="" />
					</Stack>
				</Stack>
			</Stack>
			<Stack className={'partners'}>
				<Stack className={'container'}>
					<span>{t('Pets we care for')}</span>
					<Stack className={'wrap'}>
						{Object.values(ProductSpecies).map((species) => (
							<span className={'species-chip'} key={species}>
								{t(species)}
							</span>
						))}
					</Stack>
				</Stack>
			</Stack>
			<Stack className={'help'}>
				<Stack className={'container'}>
					<Box component={'div'} className={'left'}>
						<strong>{t('Need help? Talk to our expert.')}</strong>
						<p>{t('Talk to our experts or Browse through more products.')}</p>
					</Box>
					<Box component={'div'} className={'right'}>
						<div className={'white'}>
							{t('Contact Us')}
							<img src="/img/icons/rightup.svg" alt="" />
						</div>
						<div className={'black'}>
							<img src="/img/icons/call.svg" alt="" />
							+82 10 4867 2909
						</div>
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default withLayoutBasic(About);
