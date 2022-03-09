export const MultiMarks = ({ data, x, y, innerHeight, subgroups, xSubgroup, color }) =>
	data.map((d) => (
		<g key={d['Year']} transform={`translate(${x(d['Year'])}, 0)`}>
			{subgroups.map((key) => {
				return (
					<rect
						key={d['Year'] + ' ' + key}
						x={xSubgroup(key)}
						y={y(d[key])}
						width={xSubgroup.bandwidth()}
						height={innerHeight - y(d[key])}
						fill={color(key)}
					>
						<title>{key}</title>
					</rect>
				);
			})}
		</g>
	));
