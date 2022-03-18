export const StackedMarks = ({ data, x, y, innerHeight, subgroups, colorScale }) =>
	data.map((d) => {
		return (
			<g key={d.key} transform={`translate(-25, 0)`}>
				{d.map((key) => {
					return (
						<rect
							x={x(key.data.docType)}
							y={y(key[1])}
							width={x.bandwidth()}
							height={y(key[0]) - y(key[1])}
							fill={colorScale(d.key)}
						>
							<title>
								{d.key}: {key.data[d.key]}
							</title>
						</rect>
					);
				})}
			</g>
		);
	});
