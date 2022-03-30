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
}) =>
	data.map((d) => (
		<rect
			className="mark"
			key={yValue(d)}
			x={0}
			y={yScale(yValue(d))}
			width={xScale(xValue(d))}
			height={yScale.bandwidth()}
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
