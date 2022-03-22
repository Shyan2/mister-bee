export const Circles = ({ data }) => {
	data.map((d) => (
		<circle r={(d) => d.radius} cx={(d) => d.x} cy={(d) => d.y}>
			Circle
		</circle>
	));
};
