import { useState, useEffect } from 'react'
import {v4 as uuid} from 'uuid'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import './Pagination_master.css'

import { generateArray } from '../../utilities/utilityFunctions'

const Pagination = ({paginator, itemsLength, maxNavDisplay=10}) => {

	const [pageTransition, setPageTransition] = useState({
		start: 0,
		end: maxNavDisplay < Math.ceil(itemsLength / paginator.ITEMS_PER_PAGE) ? maxNavDisplay : Math.ceil(itemsLength / paginator.ITEMS_PER_PAGE) 
	})

	const handlePageNumClick = (pageNum) => {
		paginator.setMark(pageNum * paginator.ITEMS_PER_PAGE)
	}

	useEffect(() => {
		paginator.setMark(pageTransition.start * paginator.ITEMS_PER_PAGE)
	}, [pageTransition])

	useEffect(() => {
		setPageTransition({
			start: 0,
			end: maxNavDisplay < Math.ceil(itemsLength / paginator.ITEMS_PER_PAGE) ? maxNavDisplay : Math.ceil(itemsLength / paginator.ITEMS_PER_PAGE)
		})
	}, [itemsLength, paginator.ITEMS_PER_PAGE])
	

	const changePageTransition = (dir) => {

		switch(dir){
			case "LEFT":
				if(pageTransition.start - maxNavDisplay < 0) return

				const startToEndDiff = Math.abs(pageTransition.start - pageTransition.end)

				if(startToEndDiff !== maxNavDisplay){
					setPageTransition((prevState) => ({
						start: prevState.start - maxNavDisplay,
						end: prevState.end - startToEndDiff
					}))
					return
				}

				setPageTransition((prevState) => ({
					start: prevState.start - maxNavDisplay, 
					end: prevState.end - maxNavDisplay
				}))
				break;

			case "RIGHT":
				const maxToGo = Math.ceil(itemsLength / paginator.ITEMS_PER_PAGE)

				if(maxToGo === pageTransition.end) return
				
				if(pageTransition.end + maxNavDisplay >= maxToGo){
					setPageTransition((prevState) => ({
						start: prevState.end,
						end: maxToGo
					}))
					return
				}

				setPageTransition((prevState) => ({
					start: prevState.start + maxNavDisplay, 
					end: prevState.end + maxNavDisplay
				}))
				break;
			default:
				throw new Error("You provided an invalid direction. Parameter must be either \"LEFT\" or \"RIGHT\"")
		}
	}

	return (
		<>
			{itemsLength > paginator.ITEMS_PER_PAGE &&
				<div className="pagination-container">
					{Math.ceil(itemsLength / paginator.ITEMS_PER_PAGE) > maxNavDisplay &&
						<button type="button" className="pagination-navigation" onClick={() => changePageTransition("LEFT")}>
							<FaArrowLeft/>
						</button>	
					}
					<ul className="pagination-list-wrapper">
						{generateArray(pageTransition.start, pageTransition.end).map((item) => (
							<li className={`${item === Math.ceil(paginator.mark / paginator.ITEMS_PER_PAGE) && "active-page-num"} page-num`} 
							key={uuid()}
							onClick={() => handlePageNumClick(item)}
							>
								{item + 1}
							</li>
						))}
					</ul>
					{Math.ceil(itemsLength / paginator.ITEMS_PER_PAGE) > maxNavDisplay &&
						<button type="button" className="pagination-navigation" onClick={() => changePageTransition("RIGHT")}>
							<FaArrowRight/>
						</button>
					}
				</div>
			}
		</>
	)
}

export default Pagination