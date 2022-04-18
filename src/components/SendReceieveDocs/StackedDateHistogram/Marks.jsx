export const Marks = ({ data, xScale, yScale, innerHeight }) =>
	data.map((d, i) => {
		// i++;
		const sendPercent = (d.send / (d.send + d.receive)) * 100 ? (d.send / (d.send + d.receive)) * 100 : 0;
		const receivePercent = (d.receive / (d.send + d.receive)) * 100 ? (d.receive / (d.send + d.receive)) * 100 : 0;
		return (
			<g key={i}>
				<defs>
					<linearGradient id={'MyGradient' + i} x2="0%" y2="100%">
						<stop offset={sendPercent + '%'} stopColor="#f9423a" />
						<stop offset={'0% ' + receivePercent + '%'} stopColor="#1e252b" />
					</linearGradient>
				</defs>
				{/* send rect */}
				<rect
					key={i}
					x={xScale(d.x0)}
					y={yScale(d.send + d.receive)}
					width={xScale(d.x1) - xScale(d.x0)}
					height={innerHeight - yScale(d.send) + (innerHeight - yScale(d.receive))}
					fill={'url(#MyGradient' + i + ')'}
				/>
			</g>
		);
	});
