export const AxisLeft = ({ yScale }) =>
	yScale.domain().map((tickValue) => (
		<g key={tickValue} className="tick">
			<text y={yScale(tickValue) + yScale.bandwidth() / 2} style={{ textAnchor: 'end' }} x={-3} dy=".32em">
				{tickValue}
			</text>
		</g>
	));
