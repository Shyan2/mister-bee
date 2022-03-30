import React, { useState, useEffect, useRef } from 'react';
import {
	scaleOrdinal,
	select,
	forceSimulation,
	forceManyBody,
	forceX,
	forceY,
	forceCenter,
	forceCollide,
	drag,
	pointer,
} from 'd3';

import { nodes, links, MANY_BODY_STRENGTH } from './data';

import * as d3 from 'd3';

const sizeDivisor = 5;
const nodePadding = 4.5;

const CirclePacking = ({ data, width, height }) => {
	data = data.sort(function (a, b) {
		return b.size - a.size;
	});
	// console.log(data);

	useEffect(() => {
		const svg = select('#container-svg');

		let circles = svg
			.selectAll('circle')
			.data(data)
			// .enter()
			// .append('circle')
			.join('circle')
			.attr('class', 'circlePack')
			.style('fill-opacity', 0.8)
			.attr('stroke', 'black')
			.style('stroke-width', 0.5)
			.attr('fill', (d) => color(d['DELIVER_LETTER_TYPE']) || 'gray')
			.attr('r', (d) => d.radius)
			.attr('cx', function (d) {
				return d.x;
			})
			.attr('cy', function (d) {
				return d.y;
			})
			.on('mouseover', mouseover) // What to do when hovered
			.on('mousemove', mousemove)
			.on('mouseleave', mouseleave)
			.on('click', mouseclick)
			.call(dragInteraction);

		simulation
			.nodes(data)
			.force(
				'collide',
				forceCollide()
					.strength(0.5)
					.radius(function (d) {
						return d.radius + nodePadding;
					})
					.iterations(1),
			)
			.on('tick', (d) => {
				circles.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
			});
	}, [data]);

	var color = scaleOrdinal(['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3']);

	const simulation = forceSimulation(data)
		.force(
			'forceX',
			forceX()
				.strength(0.1)
				.x(width * 0.5),
		)
		.force(
			'forceY',
			forceY()
				.strength(0.1)
				.y(height * 0.5),
		)
		.force(
			'center',
			forceCenter()
				.x(width * 0.5)
				.y(height * 0.5),
		)
		.force('charge', forceManyBody().strength(-15));

	const dragstarted = (event, d) => {
		if (event.active) simulation.alphaTarget(0.5).restart();
		d.fx = d.x;
		d.fy = d.y;
	};

	const dragged = (event, d) => {
		d.fx = event.x;
		d.fy = event.y;
		simulation.alphaTarget(0.5);
		simulation.restart();
	};

	const dragended = (event, d) => {
		if (event.active) simulation.alphaTarget(0.5);
		d.fx = null;
		d.fy = null;
	};

	const dragInteraction = drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);

	const mouseclick = (event, d) => {
		// console.log('clicked!');
	};

	const mouseover = (event, d) => {
		d3.select('#tooltip')
			.html('<u>' + d['DELIVER_LETTER_TYPE'] + '</u>' + '<br>' + d['Count'])
			.style('left', event.pageX + 20 + 'px')
			.style('top', event.pageY + 'px');
		Tooltip.style('opacity', 1);
	};
	const mousemove = (event, d) => {
		// Tooltip.html('<u>' + d['DELIVER_UNIT'] + '</u>' + '<br>' + d['Count']);
		// .style('left', pointer(event)[0] + 20 + 'px')
		// .style('top', pointer(event)[1] + 'px');
		d3.select('#tooltip')
			.html('<p>' + d['DELIVER_LETTER_TYPE'] + ':' + d['Count'] + '</p>')
			.style('left', event.pageX + 10 + 'px')
			.style('top', event.pageY - 20 + 'px');
	};
	const mouseleave = (d) => {
		Tooltip.style('opacity', 0);
	};

	var Tooltip = d3
		.select('#tooltip')
		.style('position', 'absolute')
		.style('opacity', 0)
		.attr('class', 'tooltip')
		.style('background-color', 'white')
		.style('border', 'solid')
		.style('border-width', '2px')
		.style('border-radius', '5px')
		.style('padding', '5px');

	// const dragInteraction = drag().on('drag', (event, d) => {
	// 	d.fx = event.x;
	// 	d.fy = event.y;
	// 	simulation.alphaTarget(1);
	// 	simulation.restart();
	// });

	return <></>;
};

export default CirclePacking;
