export const Marks = ({
	data,
	xScale,
	yScale,
	xValue,
	yValue,
	onHover,
	hoveredValue,
	fadeOpacity,
	onSelect,
	selectedValue,
	innerHeight,
}) =>
	data.map((d) => (
		<rect
			className="mark"
			key={yValue(d)}
			x={xScale(d.revitCategory)}
			y={yScale(d.Count)}
			width={xScale.bandwidth()}
			height={innerHeight - yScale(d.Count)}
			opacity={selectedValue && d.revitCategory !== selectedValue ? fadeOpacity : 1}
			// onMouseEnter={() => {
			// 	onHover(d.revitCategory);
			// }}
			// onMouseOut={() => {
			// 	onHover(null);
			// }}
			onClick={(event) => {
				onSelect(d.revitCategory);
			}}
		>
			<title>{d.revitCategory + ': ' + xValue(d)}</title>
		</rect>
	));
