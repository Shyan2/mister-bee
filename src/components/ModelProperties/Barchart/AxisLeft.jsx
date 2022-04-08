export const AxisLeft = ({ yScale, innerWidth }) =>
	yScale.ticks().map((tickValue) => (
		<g key={tickValue} className="tick" transform={`translate(0,${yScale(tickValue)})`}>
			<line x2={innerWidth} />
			<text style={{ textAnchor: 'end' }} x={-3} dy=".32em">
				{tickValue}
			</text>
		</g>
	));
