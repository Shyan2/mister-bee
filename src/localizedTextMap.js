export const localizedTextsMap = {
	// Root
	noRowsLabel: '沒有資料',
	noResultsOverlayLabel: '未找到資料',
	errorOverlayDefaultLabel: 'An error occurred.',

	// Density selector toolbar button text
	toolbarDensity: '表格密度',
	toolbarDensityLabel: '表格密度',
	toolbarDensityCompact: '緊密',
	toolbarDensityStandard: '標準',
	toolbarDensityComfortable: '稀疏',

	// Columns selector toolbar button text
	toolbarColumns: '列',
	toolbarColumnsLabel: 'Select columns',

	// Filters toolbar button text
	toolbarFilters: '篩選器',
	toolbarFiltersLabel: 'Show filters',
	toolbarFiltersTooltipHide: 'Hide filters',
	toolbarFiltersTooltipShow: 'Show filters',
	toolbarFiltersTooltipActive: (count) => (count !== 1 ? `${count} active filters` : `${count} active filter`),

	// Export selector toolbar button text
	toolbarExport: '導出',
	toolbarExportLabel: '導出',
	toolbarExportCSV: '導出至 CSV',
	toolbarExportPrint: '列印',

	// Filter panel text
	filterPanelAddFilter: 'Add filter',
	filterPanelDeleteIconLabel: 'Delete',
	filterPanelOperators: '操作器',
	filterPanelOperatorAnd: 'And',
	filterPanelOperatorOr: 'Or',
	filterPanelColumns: '列',
	filterPanelInputLabel: '值',
	filterPanelInputPlaceholder: '篩選值',

	// Filter operators text
	filterOperatorContains: '包含',
	filterOperatorEquals: '等於',
	filterOperatorStartsWith: '開始於',
	filterOperatorEndsWith: '結束於',
	filterOperatorIs: 'is',
	filterOperatorNot: 'is not',
	filterOperatorAfter: 'is after',
	filterOperatorOnOrAfter: 'is on or after',
	filterOperatorBefore: 'is before',
	filterOperatorOnOrBefore: 'is on or before',
	filterOperatorIsEmpty: '爲空',
	filterOperatorIsNotEmpty: '不爲空',

	// Filter values text
	filterValueAny: 'any',
	filterValueTrue: 'true',
	filterValueFalse: 'false',

	// Columns panel text
	columnsPanelTextFieldLabel: '搜尋列',
	columnsPanelTextFieldPlaceholder: '列名',
	columnsPanelDragIconLabel: 'Reorder column',
	columnsPanelShowAllButton: '顯示所有',
	columnsPanelHideAllButton: '隱藏所有',

	// Column menu text
	columnMenuLabel: 'Menu',
	columnMenuShowColumns: '顯示',
	columnMenuFilter: '篩選器',
	columnMenuHideColumn: '隱藏',
	columnMenuUnsort: '恢復默認',
	columnMenuSortAsc: '升序',
	columnMenuSortDesc: '降序',

	// Column header text
	columnHeaderFiltersTooltipActive: (count) => (count !== 1 ? `${count} active filters` : `${count} active filter`),
	columnHeaderFiltersLabel: 'Show filters',
	columnHeaderSortIconLabel: 'Sort',

	// Rows selected footer text
	footerRowSelected: (count) =>
		count !== 1 ? `${count.toLocaleString()} rows selected` : `${count.toLocaleString()} row selected`,

	// Total rows footer text
	footerTotalRows: 'Total Rows:',

	// Total visible rows footer text
	footerTotalVisibleRows: (visibleCount, totalCount) =>
		`${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

	// Checkbox selection text
	checkboxSelectionHeaderName: 'Checkbox selection',

	// Boolean cell text
	booleanCellTrueLabel: 'true',
	booleanCellFalseLabel: 'false',

	// Actions cell more text
	actionsCellMore: 'more',

	// Column pinning text
	pinToLeft: 'Pin to left',
	pinToRight: 'Pin to right',
	unpin: 'Unpin',

	// Tree Data
	treeDataGroupingHeaderName: 'Group',
	treeDataExpand: 'see children',
	treeDataCollapse: 'hide children',
};
