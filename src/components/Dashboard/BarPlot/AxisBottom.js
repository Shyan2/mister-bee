export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 200 }) =>
	xScale.domain().map((tickValue) => (
		<g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
			<line y2={innerHeight} />
			<text
				transform={'translate(-400,0)rotate(-45)'}
				y={innerHeight + tickOffset}
				style={{ textAnchor: 'end' }}
				// dy="0.71em"
			>
				{tickValue}
			</text>
		</g>
	));
