export const AxisBottom = ({ xScale, innerHeight, tickOffset = 3 }) =>
	xScale.ticks().map((tickValue) => (
		<g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
			<line y2={innerHeight} />
			<text y={innerHeight + tickOffset} style={{ textAnchor: 'middle' }} dy="0.71em">
				{tickValue}
			</text>
		</g>
	));
