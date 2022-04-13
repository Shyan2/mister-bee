export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 10 }) =>
	xScale.domain().map((tickValue) => {
		return (
			<>
				<g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
					<line y2={innerHeight} />
				</g>
				<g>
					<text
						transform={`translate(${xScale(tickValue)}, ${innerHeight + tickOffset})rotate(-45)`}
						// y={innerHeight + tickOffset}
						style={{ textAnchor: 'end' }}
						dy="0.71em"
						dx="0.85em"
					>
						{tickValue}
					</text>
				</g>
			</>
		);
	});
