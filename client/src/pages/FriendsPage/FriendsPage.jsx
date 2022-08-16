import { useState } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { v4 as uuid } from 'uuid'

import "./FriendsPage_master.scss"

import FriendHolder from '../../components/FriendHolder/FriendHolder'
import SearchInput from '../../components/SearchInput/SearchInput'
import EmptyBanner from '../../components/EmptyBanner'
import Pagination from '../../components/Pagination/Pagination'

import customAxios from '../../utilities/customAxios'
import usePagination from '../../utilities/hooks/usePagination'

const PAGE = {
	FRIENDS: "friends",
	DISCOVER: "discover"
}

const FriendsPage = () => {

	const [page, setPage] = useState(PAGE.FRIENDS)
	const [discoverFriends, setDiscoverFriends] = useState(null)
	const discoverPaginator = usePagination(discoverFriends, 50)

	const userSelector = useSelector((state) => state.user)
	const friendPaginator = usePagination(userSelector.friendsList, 50)

	const handleUsersSearch = (keyword) => {

		//TODO: Validate user's input

		customAxios({
			method: "GET",
			url: "/users/findUsers",
			headers: {
				"Authorization": `Bearer ${Cookies.get("authToken")}`,
			},
			params: {keyword}
		})
		.then((res) => {
			if(res.status === 200){
				setDiscoverFriends(res.data.users)
				console.log(res.data)
			}
		})
		.catch((err) => {
			if(err.response){
				console.error(err.response.data)
			}else{
				console.error(err)
			}
		})
	}

	return (
		<div className="friends-page-container">
			<div className="tab-navigations">
				<button type="button"><MdOutlineArrowBackIosNew/></button>
				<p>
					<button className={`${page === PAGE.FRIENDS && "active"}`}
					onClick={() => setPage(PAGE.FRIENDS)}
					>
						Your friends
					</button>
					/
					<button className={`${page === PAGE.DISCOVER && "active"}`}
					onClick={() => setPage(PAGE.DISCOVER)}
					>
						Discover
					</button>
				</p>
			</div>
			{
				page === PAGE.FRIENDS ? 
				<>
				{userSelector.requestList.length > 0 &&
				<div className="incoming-requests">
					<h2>Incoming Requests</h2>
					<div className="users-container">
						{userSelector.requestList.map((request) => (
							<FriendHolder key={uuid()} user={request}/>
						))}
					</div>
				</div>
				}
				<div className="friends-list">
					<SearchInput placeholder="Search your friend!"/>
					<div className="users-container">
						{userSelector.friendsList.length > 0 ?
							friendPaginator.paginatedItems.map((friend) => (
								<FriendHolder key={uuid()} user={friend}/>
							))
						:
							<EmptyBanner>
								<p>Oops! No friends yet</p>
								<p>Meet new people in the discover menu above!</p>
							</EmptyBanner>
						}
					</div>
					<Pagination paginator={friendPaginator} itemsLength={userSelector.friendsList.length}/>
				</div>
				</>
				:
				<>
				<div className="discover-friends">
					<SearchInput placeholder="Search a friend!" onSearch={handleUsersSearch}/>
					{discoverFriends !== null &&(
						discoverFriends.length > 0 ?
						<div className="users-container">
							{discoverPaginator.paginatedItems?.map((user) => (
								<FriendHolder key={uuid()} user={user}/>
							))}
						</div>
						:
						<EmptyBanner>
							<p>No friends to be found!</p>
							<p>Try to look for another username</p>
						</EmptyBanner>
					)}
					<Pagination paginator={discoverPaginator} itemsLength={discoverFriends?.length}/>
				</div>
				</>
			}
		</div>
	)
}

export default FriendsPage