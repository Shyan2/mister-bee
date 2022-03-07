export const MultiMarks = ({ data, x, y, innerHeight, subgroups, xSubgroup, color }) =>
	data.map((d) => (
		<g transform={`translate(${x(d['Year'])}, 0)`}>
			{subgroups.map((key) => {
				let value = d[key];
				// console.log(xSubgroup(key));
				console.log(y(d[key]));
				return (
					<rect
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
