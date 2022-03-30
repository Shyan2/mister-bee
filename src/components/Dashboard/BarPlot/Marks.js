export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat, innerHeight }) =>
	data.map((d) => (
		<rect
			className="mark"
			key={yValue(d)}
			x={xScale(d.Country)}
			y={yScale(d.Value)}
			width={xScale.bandwidth()}
			height={innerHeight - yScale(d.Value)}
		>
			<title>{tooltipFormat(d.Value)}</title>
		</rect>
	));
