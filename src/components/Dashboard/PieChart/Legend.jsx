import { Typography } from '@mui/material';
export const Legend = ({
	colorScale,
	tickSpacing = 20,
	tickSize = 10,
	tickTextOffset = 15,
	fadeOpacity,
	hoveredValue,
	onHover,
}) => {
	const returnObject = colorScale.domain().map((domainValue, i) => {
		// const returnObject = colorScale.map((domainValue, i) => {

		return (
			<g
				key={domainValue}
				className="tick"
				transform={`translate(0,${i * tickSpacing})`}
				opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
				onMouseEnter={() => {
					onHover(domainValue);
				}}
				onMouseOut={() => {
					onHover(null);
				}}
			>
				<circle fill={colorScale(domainValue)} r={tickSize} />
				<text x={tickTextOffset} dy=".32em">
					{domainValue}
				</text>
			</g>
		);
	});

	return returnObject;
};
