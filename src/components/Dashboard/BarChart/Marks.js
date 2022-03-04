export const Marks = ({ data, xScale, yScale, xValue, yValue, innerHeight }) =>
	data.map((d) => (
		<rect
			className="mark"
			key={yValue(d)}
			x={xScale(d['Year'])}
			y={yScale(yValue(d))}
			width={xScale(xValue(d))}
			height={innerHeight - yScale(d['Year'])}
		>
			<title>{xValue(d)}</title>
		</rect>
	));
