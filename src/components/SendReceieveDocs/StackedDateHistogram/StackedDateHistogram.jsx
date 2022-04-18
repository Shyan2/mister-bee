import { useRef, useEffect, useMemo, useContext } from 'react';
import { DateRangeContext } from '../Context';
import { useWindowSize } from '../useWindowSize';

import {
	scaleLinear,
	scaleTime,
	max,
	timeFormat,
	extent,
	bin,
	timeMonths,
	timeDays,
	timeWeeks,
	sum,
	brushX,
	select,
	map,
	stack,
	schemeSet3,
	scaleOrdinal,
} from 'd3';

import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const margin = { top: 0, right: 40, bottom: 20, left: 40 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;

const xAxisLabel = 'Date';

const yValue = (d) => 1;

const yAxisLabel = 'Count';

const xAxisTickFormat = timeFormat('%m/%d/%Y');

const DateHistogram = ({ data, width, height, xValue, setBrushExtent }) => {
	const brushRef = useRef();

	const { setSelectedDateRange } = useContext(DateRangeContext);

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	// WORK ON STACK
	const subgroups = ['收文', '發文'];
	const groups = map(data, function (d) {
		return d.docType;
	});
	const stackedData = stack()
		.keys(['收文', '發文'])
		.value((obj, key) => obj.docType[key])(data);
	// console.log(stackedData);
	// END WORK ON STACK

	const xScale = useMemo(
		() => scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice(),
		[data, xValue, innerWidth],
	);

	useEffect(() => {
		const timeRange = xScale.domain();
		setSelectedDateRange([xAxisTickFormat(timeRange[0]), xAxisTickFormat(timeRange[1])]);
	}, []);

	const binnedData = useMemo(() => {
		const [start, stop] = xScale.domain();

		return bin()
			.value(xValue)
			.domain(xScale.domain())
			.thresholds(timeWeeks(start, stop))(data)
			.map((array) => {
				// console.log(array);
				// separate here by docType
				let sendCount = 0;
				let receiveCount = 0;
				array.forEach((item) => {
					if (item.docType === '發文') {
						sendCount++;
					} else {
						receiveCount++;
					}
				});
				const returnItem = {
					send: sendCount,
					receive: receiveCount,
					x0: array.x0,
					x1: array.x1,
				};

				return returnItem;
			});
	}, [xValue, xScale, data]);
	// console.log(binnedData);

	const yScale = useMemo(
		() =>
			scaleLinear()
				.domain([0, max(binnedData, (d) => d.send + d.receive) + 1])
				.range([innerHeight, 0])
				.nice(),
		[binnedData, innerHeight],
	);

	useEffect(() => {
		const brush = brushX().extent([
			[0, 0],
			[innerWidth, innerHeight],
		]);
		brush(select(brushRef.current));
		brush.on('brush end', (event) => {
			setBrushExtent(event.selection && event.selection.map(xScale.invert)); // invert returns dates
		});
	}, [innerWidth, innerHeight]);

	const colorScale = scaleOrdinal()
		.domain(['send', 'receieve'])
		// .range(['#f9423a', '#d9d9d6', '#343e48', '#efecea', '#d8e6f0', '#1e252b', '#5B6BAA', '#AEE233']);
		.range(schemeSet3);

	return (
		<>
			{/* <rect width={width} height={height} fill="white" /> */}
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left},${margin.top})`}>
					<AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} tickOffset={5} />
					{/* <text
					className="axis-label"
					textAnchor="middle"
					transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
				>
					{yAxisLabel}
				</text> */}
					<AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
					<text className="axis-label" x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} textAnchor="middle">
						{xAxisLabel}
					</text>
					<Marks data={binnedData} xScale={xScale} yScale={yScale} innerHeight={innerHeight} colorScale={colorScale} />
					<g ref={brushRef} />
				</g>
			</svg>
		</>
	);
};

export default DateHistogram;
