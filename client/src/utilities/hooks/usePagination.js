import { useState, useEffect } from 'react'

const usePagination = (items, displayedItemsPerPage=5, indexStart=0) => {
	const ITEMS_PER_PAGE = displayedItemsPerPage
	const [mark, setMark] = useState(indexStart)
	const [paginatedItems, setPaginatedItems] = useState(items?.slice(mark, mark + ITEMS_PER_PAGE))

	useEffect(() => {
		updatePaginatedItems()
	}, [mark, items])

	const updatePaginatedItems = () => {
		setPaginatedItems(items?.slice(mark, mark + ITEMS_PER_PAGE))
	}
	
	return({
		ITEMS_PER_PAGE,
		mark, setMark,
		paginatedItems, updatePaginatedItems
	})
}

export default usePagination