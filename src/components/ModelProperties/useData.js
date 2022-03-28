import { useState, useEffect } from 'react';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_API_ROUTE;

export const useData = () => {
	const [modelProperties, setModelProperties] = useState(null);

	const fetchModelProperties = async () => {
		const result = await axios.get(`${SERVER_URL}/api/forge/modelproperties/getModelProperties`, {
			withCredentials: true,
		});
		// console.log(result.data);
		let returnArrray = [];

		const splitData = result.data.split('\n').slice(0, -1);

		// !!! data process here !!!
		// Think of what data is necessary to display
		// Decide what props to display.

		splitData.forEach((item) => {
			const parsedItem = JSON.parse(item);
			let returnItem = {
				svf2Id: parsedItem?.svf2Id,
				databaseId: parsedItem?.databaseId,
				externalId: parsedItem?.externalId,
				lineageId: parsedItem?.lineageId,
				bboxMax: parsedItem?.bboxMax,
				bboxMin: parsedItem?.bboxMin,
				views: parsedItem?.views,
				// props: parsedItem.props,
				revitCategory: parsedItem?.props?.p20d8441e,
				materialOne: parsedItem?.props?.pa710a8ab,
				materialTwo: parsedItem?.props?.pf0bbe2b2,
				materialThree: parsedItem?.props?.p49f731cb,
				phase: parsedItem?.props?.p4f4f4f0e,
				category: parsedItem?.props?.p5eddc473.replace('Revit ', ''),
				revitFamily: parsedItem?.props?.p30db51f9,
				type: parsedItem?.props?.p2057c408,
				name: parsedItem?.props?.p153cb174,
			};

			// Revit Category: {"key":"p20d8441e","category":"__category__","type":"String","name":"_RC","uom":null}
			// Material 1: {"key":"pa710a8ab","category":"識別資料","type":"String","name":"工作集","uom":null}
			// Phase: {"key":"p4f4f4f0e","category":"階段","type":"String","name":"建立階段","uom":null}
			// Category: {"key":"p5eddc473","category":"__category__","type":"String","name":"Category","uom":null}
			// Revit Family Name: {"key":"p30db51f9","category":"__category__","type":"String","name":"_RFN","uom":null}
			// Material 2: {"key":"pf0bbe2b2","category":"材料及飾面","type":"String","name":"結構材料","uom":null}
			// Type: {"key":"p2057c408","category":"識別資料","type":"String","name":"類型名稱","uom":null}
			// Name: {"key":"p153cb174","category":"__name__","type":"String","name":"name","uom":null}
			// Material 3: {"key":"p49f731cb","category":"機械","type":"String","name":"材料","uom":null}
			returnArrray.push(returnItem);
		});
		setModelProperties(returnArrray);
	};

	useEffect(() => {
		fetchModelProperties();
	}, []);

	return modelProperties;
};
