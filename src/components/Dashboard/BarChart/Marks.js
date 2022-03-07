export const Marks = ({ data, xScale, yScale, innerHeight }) =>
	data.map((d) => (
		<rect
			className="mark"
			// key={yValue(d)}
			x={xScale(d['Year'])}
			y={yScale(d['TB B2-L3 (+Gatehouse)'])}
			width={xScale.bandwidth()}
			height={innerHeight - yScale(d['TB B2-L3 (+Gatehouse)'])}
		>
			<title>{d['TB B2-L3 (+Gatehouse)']}</title>
		</rect>
	));
