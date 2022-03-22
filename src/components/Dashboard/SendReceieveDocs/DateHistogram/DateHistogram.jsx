import { useRef, useEffect, useMemo, useContext } from 'react';
import { DateRangeContext } from '../Context';

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

	const xScale = useMemo(
		() => scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice(),
		[data, xValue, innerWidth],
	);
	useEffect(() => {
		const timeRange = xScale.domain();
		setSelectedDateRange([xAxisTickFormat(timeRange[0]), xAxisTickFormat(timeRange[1])]);
	}, []);

	const binnedData = useMemo(() => {
		const [start, stop] = xScale.domain(); //ES6 destructuring

		return bin()
			.value(xValue)
			.domain(xScale.domain())
			.thresholds(timeWeeks(start, stop))(data)
			.map((array) => ({
				y: sum(array, yValue),
				x0: array.x0,
				x1: array.x1,
			}));
	}, [xValue, xScale, data]);

	const yScale = useMemo(
		() =>
			scaleLinear()
				.domain([0, max(binnedData, (d) => d.y) + 1])
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
					<Marks data={binnedData} xScale={xScale} yScale={yScale} innerHeight={innerHeight} />
					<g ref={brushRef} />
				</g>
			</svg>
		</>
	);
};

export default DateHistogram;
