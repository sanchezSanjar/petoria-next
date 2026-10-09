import React, { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'next-i18next';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	}),
);
const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const Faq = () => {
	const { t } = useTranslation('common');
	const router = useRouter();
	const [category, setCategory] = useState<string>('product');
	const [expanded, setExpanded] = useState<string | false>('panel1');

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	
	/** HANDLERS **/
	const changeCategoryHandler = (category: string) => {
		setCategory(category);
	};

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	const data: any = {
		product: [
			{
				id: '00f5a45ed8897f8090116a01',
				subject: 'Are the pets and products on Petoria reliable?',
				content: 'Yes. Every listing comes from a registered seller, and listings that break our rules are removed by the admin.',
			},
			{
				id: '00f5a45ed8897f8090116a22',
				subject: 'What kinds of products do you offer?',
				content: 'Pets, pet food, toys and accessories for dogs, cats, birds and fish.',
			},
			{
				id: '00f5a45ed8897f8090116a21',
				subject: 'How can I search for products on your website?',
				content: 'Use the search bar and filters to choose product type, species, gender, location and price range.',
			},
			{
				id: '00f5a45ed8897f8090116a23',
				subject: 'Why do some pets show a gender and other products do not?',
				content: 'Gender is required for pets only. Food, toys and accessories do not have a gender.',
			},
			{
				id: '00f5a45ed8897f8090116a24',
				subject: 'What should I check before buying a pet?',
				content: 'Read the description, look at all photos, check the species and gender, and ask the seller about health and vaccinations.',
			},
			{
				id: '00f5a45ed8897f8090116a25',
				subject: 'What does "Sold out" mean?',
				content: 'The seller has marked the product as sold. It stays visible for reference but can no longer be bought.',
			},
			{
				id: '00f5a45ed8897f8090116a29',
				subject: 'What if there is a problem with my product after purchase?',
				content: 'Contact the seller first. If it cannot be solved, contact our support team through the CS page.',
			},
			{
				id: '00f5a45ed8897f8090116a28',
				subject: 'Can I find products near me?',
				content: 'Yes, filter by location to see products listed in your city.',
			},
			{
				id: '00f5a45ed8897f8090116a27',
				subject: 'Can I sell my own products on Petoria?',
				content: 'Yes. Sign up as a seller, then add products from My Page.',
			},
			{
				id: '00f5a45ed8897f8090116b99',
				subject: 'How do I save products I like?',
				content: 'Click the heart icon on a product. You can find all liked products under My Favorites on My Page.',
			},
		],
		payment: [
			{
				id: '00f5a45ed8897f8090116a02',
				subject: 'How can I make the payment?',
				content: 'You arrange the payment directly with the seller.',
			},
			{
				id: '00f5a45ed8897f8090116a91',
				subject: 'Are there any additional fees for using your services?',
				content: 'No, Petoria is free for buyers and sellers.',
			},
			{
				id: '00f5a45ed8897f8090116a92',
				subject: 'Is there an option for installment payments?',
				content: 'Some sellers offer installment payments for certain products. Please ask the seller for details.',
			},
			{
				id: '00f5a45ed8897f8090116a93',
				subject: 'Is my payment information secure on your website?',
				content:
					'Yes, we use industry-standard encryption technology to ensure the security of your payment information.',
			},
			{
				id: '00f5a45ed8897f8090116a94',
				subject: 'Can I make payments online through your website?',
				content: "Yes, you can securely make payments online through our website's payment portal.",
			},
			{
				id: '00f5a45ed8897f8090116a95',
				subject: "What happens if there's an issue with my payment?",
				content: 'If you encounter any issues with your payment, please contact our support team for assistance.',
			},
			{
				id: '00f5a45ed8897f8090116a96',
				subject: 'Do you offer refunds for payments made?',
				content:
					'Refund policies vary depending on the circumstances. Please refer to our refund policy or contact us for more information.',
			},
			{
				id: '00f5a45ed8897f8090116a97',
				subject: 'Are there any discounts or incentives for early payments?',
				content:
					'We occasionally offer discounts or incentives for early payments. Check our promotions or contact us for current offers.',
			},
			{
				id: '00f5a45ed8897f8090116a99',
				subject: 'How long does it take for payments to be processed?',
				content:
					'Payment processing times vary depending on the payment method used. Typically, credit/debit card payments are processed instantly',
			},
			{
				id: '00f5a45ed8897f8090116a98',
				subject: 'Are there penalties for late payments?',
				content:
					'Late payment penalties may apply depending on the terms of your agreement. Please refer to your contract or contact us for details.',
			},
		],
		buyers: [
			{
				id: '00f5a45ed8897f8090116a03',
				subject: 'What should buyers pay attention to?',
				content: 'Check that the product and its species match what you need, and read the description carefully before buying.',
			},
			{
				id: '00f5a45ed8897f8090116a85',
				subject: 'How can I check that a product fits my budget?',
				content: 'Use the price range filter on the product page to see only products within your budget.',
			},
			{
				id: '00f5a45ed8897f8090116a84',
				subject: 'How do I choose the right food for my pet?',
				content: 'Filter by species and choose food made for your pet, then check the description for age and size details.',
			},
			{
				id: '00f5a45ed8897f8090116a83',
				subject: 'Can I negotiate the price of a product?',
				content: 'Prices are set by sellers. You can contact the seller to ask about the price.',
			},
			{
				id: '00f5a45ed8897f8090116a82',
				subject: 'What are red flags to watch out for when buying a pet?',
				content: 'Very low prices, missing photos, no description and sellers who refuse to answer questions.',
			},
			{
				id: '00f5a45ed8897f8090116a81',
				subject: 'How can I contact a seller?',
				content: "On the product detail page you can see the seller's phone number. Click the seller's name to open their page and other products.",
			},
			{
				id: '00f5a45ed8897f8090116a80',
				subject: 'How do I know if a seller is trusted?',
				content: "Check the seller's rank, likes, number of products and reviews from other members.",
			},
			{
				id: '00f5a45ed8897f8090116a79',
				subject: 'Can I see products I viewed before?',
				content: 'Yes, open Recently Visited on My Page.',
			},
			{
				id: '00f5a45ed8897f8090116a78',
				subject: 'How do I leave a review?',
				content: 'Open the product detail page, write your review at the bottom and submit it.',
			},
			{
				id: '00f5a45ed8897f8090116a77',
				subject: 'What should I prepare before bringing a new pet home?',
				content: 'Food, a bed or cage, toys and basic accessories. You can find all of them in our shop.',
			},
		],

		agents: [
			{
				id: '00f5a45ed8897f8090116a04',
				subject: 'How do I become a seller?',
				content: 'Choose "Seller" when you sign up. Seller accounts can add and manage products.',
			},
			{
				id: '00f5a45ed8897f8090116a62',
				subject: 'How do I add a new product?',
				content: 'Go to My Page, open Add Product, fill in the details and upload photos.',
			},
			{
				id: '00f5a45ed8897f8090116a63',
				subject: 'Why is gender required when I add a pet?',
				content: 'Buyers need to know the gender of a pet. For food, toys and accessories, gender is not needed.',
			},
			{
				id: '00f5a45ed8897f8090116a64',
				subject: 'How many photos can I upload?',
				content: 'Up to 5 photos per product, in JPEG or PNG format.',
			},
			{
				id: '00f5a45ed8897f8090116a65',
				subject: 'How do I mark a product as sold?',
				content: 'Open My Products on My Page and change the product status to sold.',
			},
			{
				id: '00f5a45ed8897f8090116a66',
				subject: 'How can I get more buyers?',
				content: 'Use clear photos, write a detailed description and set a fair price.',
			},
			{
				id: '00f5a45ed8897f8090116a67',
				subject: 'How is the seller rank calculated?',
				content: 'Rank grows with your products, articles, likes and views.',
			},
			{
				id: '00f5a45ed8897f8090116a68',
				subject: 'Can I edit a product after publishing it?',
				content: 'Yes, open My Products and choose edit.',
			},
			{
				id: '00f5a45ed8897f8090116a69',
				subject: 'How do I handle difficult buyers?',
				content: 'Stay polite and professional. If there is abuse, contact the admin.',
			},
			{
				id: '00f5a45ed8897f8090116a70',
				subject: 'What should I do to sell pets responsibly?',
				content: 'Give honest health information, accurate species and gender, and only sell healthy animals.',
			},
		],
		membership: [
			{
				id: '00f5a45ed8897f8090116a05',
				subject: 'Do you have a membership service on your site?',
				content: 'membership service is not available on our site yet!',
			},
			{
				id: '00f5a45ed8897f8090116a60',
				subject: 'What are the benefits of becoming a member on your website?',
				content: 'We currently do not offer membership benefits, but stay tuned for updates on any future offerings.',
			},
			{
				id: '00f5a45ed8897f8090116a59',
				subject: 'Is there a fee associated with becoming a member?',
				content: 'As membership services are not available, there are no associated fees at this time.',
			},
			{
				id: '00f5a45ed8897f8090116a58',
				subject: 'Will membership provide access to exclusive content or features?',
				content: "We don't currently have membership-exclusive content or features.",
			},
			{
				id: '00f5a45ed8897f8090116a57',
				subject: 'How can I sign up for a membership on your site?',
				content: 'As of now, we do not have a sign-up process for memberships.',
			},
			{
				id: '00f5a45ed8897f8090116a56',
				subject: 'Do members receive discounts on products or services?',
				content: 'Membership discounts are not part of our current offerings.',
			},
			{
				id: '00f5a45ed8897f8090116a55',
				subject: 'Are there plans to introduce a membership program in the future?',
				content:
					"While we can't confirm any plans at this time, we're always exploring ways to enhance our services for users.",
			},
			{
				id: '00f5a45ed8897f8090116a54',
				subject: 'What kind of content or benefits can members expect if a membership program is introduced?',
				content: "We're evaluating potential benefits and features, but specifics are not available yet.",
			},
			{
				id: '00f5a45ed8897f8090116a33',
				subject: 'Do you offer a premium membership option on your platform?',
				content: 'Currently, we do not provide a premium membership option.',
			},
			{
				id: '00f5a45ed8897f8090116a32',
				subject: 'Will membership grant access to exclusive deals or discounts?',
				content: 'Membership perks, including deals or discounts, are not available at this time.',
			},
		],
		community: [
			{
				id: '00f5a45ed8897f8090116a06',
				subject: 'What should I do if there is abusive or criminal behavior in the community section?',
				content: 'If you encounter this situation, please report it immediately or contact the admin!',
			},
			{
				id: '00f5a45ed8897f8090116a44',
				subject: 'How can I participate in the community section of your website?',
				content: 'Create an account and engage in discussions.',
			},
			{
				id: '00f5a45ed8897f8090116a45',
				subject: 'Are there guidelines for posting?',
				content: 'Yes, follow our community guidelines.',
			},
			{
				id: '00f5a45ed8897f8090116a46',
				subject: 'What should I do if I encounter spam or irrelevant posts?',
				content: 'Report them to the admin.',
			},
			{
				id: '00f5a45ed8897f8090116a47',
				subject: 'Can I connect with other members outside of the community section?',
				content: 'Currently, no.',
			},
			{
				id: '00f5a45ed8897f8090116a48',
				subject: 'Can I share personal experiences or recommendations?',
				content: 'Yes, if relevant you can share personal experiences and recommendations.',
			},
			{
				id: '00f5a45ed8897f8090116a49',
				subject: 'How can I ensure privacy?',
				content: 'Avoid sharing sensitive information.',
			},
			{
				id: '00f5a45ed8897f8090116a50',
				subject: 'How can I contribute positively?',
				content: 'Respect others and engage constructively.',
			},
			{
				id: '00f5a45ed8897f8090116a51',
				subject: 'What if I notice misinformation?',
				content: 'Provide correct information or report to the admin.',
			},
			{
				id: '00f5a45ed8897f8090116a52',
				subject: 'Are there moderators?',
				content: 'Yes, we have moderators.',
			},
		],
		other: [
			{
				id: '00f5a45ed8897f8090116a40',
				subject: 'Who should I contact if I want to buy your site?',
				content: 'We have no plans to sell the site at this time!',
			},
			{
				id: '00f5a45ed8897f8090116a39',
				subject: 'Can I advertise my services on your website?',
				content: 'We currently do not offer advertising opportunities on our site.',
			},
			{
				id: '00f5a45ed8897f8090116a38',
				subject: 'Are there sponsorship opportunities available on your platform?',
				content: 'At this time, we do not have sponsorship opportunities.',
			},
			{
				id: '00f5a45ed8897f8090116a36',
				subject: 'Can I contribute guest posts or articles to your website?',
				content: "We're not accepting guest posts or articles at the moment.",
			},
			{
				id: '00f5a45ed8897f8090116a35',
				subject: 'Is there a referral program for recommending your website to others?',
				content: "We don't have a referral program in place currently.",
			},
			{
				id: '00f5a45ed8897f8090116a34',
				subject: 'Do you offer affiliate partnerships for promoting your services?',
				content: 'Affiliate partnerships are not available at this time.',
			},
			{
				id: '00f5a45ed8897f8090116a33',
				subject: 'Can I purchase merchandise related to your website?',
				content: "We don't have merchandise available for purchase.",
			},
			{
				id: '00f5a45ed8897f8090116a32',
				subject: 'Are there any job openings or opportunities to work with your team?',
				content: 'Currently, we do not have any job openings or opportunities available.',
			},
			{
				id: '00f5a45ed8897f8090116a31',
				subject: 'Do you host events or webinars about pet care?',
				content: "We're not hosting events or webinars at this time.",
			},
			{
				id: '00f5a45ed8897f8090116a30',
				subject: 'Can I request custom features or functionalities for your website?',
				content: "We're not accepting requests for custom features or functionalities.",
			},
		],
	};

	return (
		<Stack className={'faq-content'}>
			<Box className={'categories'} component={'div'}>
				<div
					className={category === 'product' ? 'active' : ''}
					onClick={() => {
						changeCategoryHandler('product');
					}}
				>
					{t('Product')}
				</div>
				<div
					className={category === 'payment' ? 'active' : ''}
					onClick={() => {
						changeCategoryHandler('payment');
					}}
				>
					{t('Payment')}
				</div>
				<div
					className={category === 'buyers' ? 'active' : ''}
					onClick={() => {
						changeCategoryHandler('buyers');
					}}
				>
					{t('For Buyers')}
				</div>
				<div
					className={category === 'agents' ? 'active' : ''}
					onClick={() => {
						changeCategoryHandler('agents');
					}}
				>
					{t('For Sellers')}
				</div>
				<div
					className={category === 'membership' ? 'active' : ''}
					onClick={() => {
						changeCategoryHandler('membership');
					}}
				>
					{t('Membership')}
				</div>
				<div
					className={category === 'community' ? 'active' : ''}
					onClick={() => {
						changeCategoryHandler('community');
					}}
				>
					{t('Community')}
				</div>
				<div
					className={category === 'other' ? 'active' : ''}
					onClick={() => {
						changeCategoryHandler('other');
					}}
				>
					{t('Other')}
				</div>
			</Box>
			<Box className={'wrap'} component={'div'}>
				{data[category] &&
					data[category].map((ele: any) => (
						<Accordion expanded={expanded === ele?.id} onChange={handleChange(ele?.id)} key={ele?.subject}>
							<AccordionSummary id="panel1d-header" className="question" aria-controls="panel1d-content">
								<Typography className="badge" variant={'h4'}>
									Q
								</Typography>
								<Typography> {ele?.subject}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Stack className={'answer flex-box'}>
									<Typography className="badge" variant={'h4'} color={'primary'}>
										A
									</Typography>
									<Typography> {ele?.content}</Typography>
								</Stack>
							</AccordionDetails>
						</Accordion>
					))}
			</Box>
		</Stack>
	);
};

export default Faq;
