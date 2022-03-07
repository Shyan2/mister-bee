export const AxisBottom = ({ xScale, innerHeight, tickOffset = 3 }) =>
	xScale.domain().map((tickValue) => (
		<g className="tick" key={tickValue} transform={`translate(${xScale(tickValue) + 50}, 0)`}>
			<line y2={innerHeight} />
			<text y={innerHeight + tickOffset} style={{ textAnchor: 'middle' }} dy="0.71em">
				{tickValue}
			</text>
		</g>
	));
