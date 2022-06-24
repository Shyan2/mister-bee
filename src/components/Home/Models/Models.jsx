import React, { useState, useMemo } from 'react';
import ModelTable from './ModelTable';
import { Box } from '@mui/material';

import { SelectedObjectContext, ModelPropertiesContext } from '../Context';

const Models = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [items, setItems] = useState([]);
	// for context
	const [selectedObject, setSelectedObject] = useState({});
	const [selectedModelProps, setSelectedModelProps] = useState({});

	const selectedObjectValue = useMemo(
		() => ({ selectedObject, setSelectedObject }),
		[selectedObject, setSelectedObject],
	);

	const selectedModelPropsValue = useMemo(
		() => ({ selectedModelProps, setSelectedModelProps }),
		[selectedModelProps, setSelectedModelProps],
	);

	return (
		<>
			<SelectedObjectContext.Provider value={selectedObjectValue}>
				<ModelPropertiesContext.Provider value={selectedModelPropsValue}>
					<Box
						sx={{ m: 0 }}
						style={{
							height: '75vh',
							display: !selectedObject.id && !selectedModelProps.indexId ? 'flex' : 'none',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<ModelTable items={items} isLoading={isLoading} />
					</Box>
				</ModelPropertiesContext.Provider>
			</SelectedObjectContext.Provider>
		</>
	);
};

export default Models;
