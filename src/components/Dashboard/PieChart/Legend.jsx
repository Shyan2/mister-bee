export const Legend = ({ colorScale, tickSpacing = 20, tickSize = 10, tickTextOffset = 15 }) => {
	const returnObject = colorScale.domain().map((domainValue, i) => {
		// const returnObject = colorScale.map((domainValue, i) => {
		console.log(domainValue);
		return (
			<g key={domainValue} className="tick" transform={`translate(0,${i * tickSpacing})`}>
				<circle fill={colorScale(domainValue)} r={tickSize} />
				<text x={tickTextOffset} dy=".32em">
					{domainValue}
				</text>
			</g>
		);
	});

	return returnObject;
};
