import React from 'react';

interface PetoriaLogoProps {
	className?: string;
}

/**
 * Inline version of /img/logo/logoWhite.svg so its parts can be animated on hover (see scss/logo.scss).
 * Geometry is copied from that file; every animated part is wrapped in its own <g>, because a CSS transform
 * would replace the element's own transform attribute.
 */
const PetoriaLogo = ({ className }: PetoriaLogoProps) => {
	return (
		<svg
			className={className ? `petoria-logo ${className}` : 'petoria-logo'}
			width="129"
			height="52"
			viewBox="0 0 129 52"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Petoria"
		>
			<g className="pl-mark">
				<circle className="pl-badge" cx="26" cy="26" r="25.5" fill="#EB6753" />
				<circle className="pl-ring" cx="26" cy="26" r="23.2" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="0.8" />
				<g className="pl-paw">
					<g transform="translate(11 10.5) scale(0.3)" fill="none" stroke="#FFFFFF" strokeWidth="5.2" strokeLinejoin="round">
						<path className="pl-pad" d="M50 50C38 50 25 62 22.5 73C20 84 28 92 37.5 89.5C43 88 46 86 50 86C54 86 57 88 62.5 89.5C72 92 80 84 77.5 73C75 62 62 50 50 50Z" />
						<g className="pl-toe">
							<ellipse cx="24" cy="44" rx="8.5" ry="11" transform="rotate(-22 24 44)" />
						</g>
						<g className="pl-toe">
							<ellipse cx="40" cy="25" rx="8.5" ry="12" transform="rotate(-8 40 25)" />
						</g>
						<g className="pl-toe">
							<ellipse cx="60" cy="25" rx="8.5" ry="12" transform="rotate(8 60 25)" />
						</g>
						<g className="pl-toe">
							<ellipse cx="76" cy="44" rx="8.5" ry="11" transform="rotate(22 76 44)" />
						</g>
					</g>
				</g>
			</g>
			<g className="pl-word">
				<path
					transform="translate(58.06 31.82) scale(0.15081)"
					fill="#FFFFFF"
					d="M59.7-47.6Q59.7-41.5 56.9-36.5Q54.1-31.4 48.3-28.3Q42.5-25.2 33.9-25.2L33.9-25.2L23.3-25.2L23.3 0L6.2 0L6.2-70.2L33.9-70.2Q42.3-70.2 48.1-67.3Q53.9-64.4 56.8-59.3Q59.7-54.2 59.7-47.6L59.7-47.6ZM32.6-38.8Q37.5-38.8 39.9-41.1Q42.3-43.4 42.3-47.6L42.3-47.6Q42.3-51.8 39.9-54.1Q37.5-56.4 32.6-56.4L32.6-56.4L23.3-56.4L23.3-38.8L32.6-38.8ZM117.6-56.5L91.7-56.5L91.7-42.3L114.6-42.3L114.6-29.1L91.7-29.1L91.7-13.7L117.6-13.7L117.6 0L74.6 0L74.6-70.2L117.6-70.2L117.6-56.5ZM130.9-70.2L185.2-70.2L185.2-56.5L166.6-56.5L166.6 0L149.5 0L149.5-56.5L130.9-56.5L130.9-70.2ZM233 0.7Q223.1 0.7 214.8-3.9Q206.6-8.5 201.8-16.8Q196.9-25 196.9-35.3L196.9-35.3Q196.9-45.6 201.8-53.8Q206.6-62 214.8-66.6Q223.1-71.2 233-71.2L233-71.2Q242.9-71.2 251.2-66.6Q259.4-62 264.1-53.8Q268.9-45.6 268.9-35.3L268.9-35.3Q268.9-25 264.1-16.8Q259.3-8.5 251.1-3.9Q242.9 0.7 233 0.7L233 0.7ZM233-14.9Q241.4-14.9 246.4-20.5Q251.5-26.1 251.5-35.3L251.5-35.3Q251.5-44.6 246.4-50.2Q241.4-55.7 233-55.7L233-55.7Q224.5-55.7 219.4-50.2Q214.4-44.7 214.4-35.3L214.4-35.3Q214.4-26 219.4-20.5Q224.5-14.9 233-14.9L233-14.9ZM339.5 0L320.2 0L305.6-26.5L301.5-26.5L301.5 0L284.4 0L284.4-70.2L313.1-70.2Q321.4-70.2 327.3-67.3Q333.1-64.4 336-59.4Q338.9-54.3 338.9-48.1L338.9-48.1Q338.9-41.1 334.9-35.6Q331-30.1 323.3-27.8L323.3-27.8L339.5 0ZM301.5-56L301.5-38.6L312.1-38.6Q316.8-38.6 319.1-40.9Q321.5-43.2 321.5-47.4L321.5-47.4Q321.5-51.4 319.1-53.7Q316.8-56 312.1-56L312.1-56L301.5-56ZM355.6-70.2L372.7-70.2L372.7 0L355.6 0L355.6-70.2ZM439 0L434.8-12.4L408.6-12.4L404.4 0L386.5 0L411.9-70.2L431.7-70.2L457.1 0L439 0ZM413.1-25.6L430.4-25.6L421.7-51.3L413.1-25.6Z"
				/>
			</g>
		</svg>
	);
};

export default PetoriaLogo;
