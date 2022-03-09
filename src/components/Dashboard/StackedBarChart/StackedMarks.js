export const StackedMarks = ({ data, x, y, innerHeight, subgroups, color }) =>
	data.map((d) => {
		// console.log(d);
		return (
			<g key={d['Year']} transform={`translate(${x(d)}, 0)`}>
				{d.map((key) => {
					// console.log(key);
					return (
						<rect
							x={x(key.data.docType)}
							y={y(key[1])}
							width={x.bandwidth()}
							height={y(key[0]) - y(key[1])}
							fill={color(key)}
						>
							<title>{key.data[d.key]}</title>
						</rect>
					);
				})}
			</g>
		);
	});
