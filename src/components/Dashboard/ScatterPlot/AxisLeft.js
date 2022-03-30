export const AxisLeft = ({ yScale, innerWidth, tickoffset = 3 }) =>
	yScale.ticks().map((tickValue) => (
		<g key={tickValue} className="tick" transform={`translate(0,${yScale(tickValue)})`}>
			<line x2={innerWidth} />
			<text key={tickValue} style={{ textAnchor: 'end' }} x={-tickoffset} dy=".32em">
				{tickValue}
			</text>
		</g>
	));
