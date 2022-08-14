import { useState, useEffect } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import Cookies from 'js-cookie'
import axios from 'axios'
import { v4 as uuid } from 'uuid'

import "./FriendsPage_master.scss"

import FriendHolder from '../../components/FriendHolder/FriendHolder'
import SearchInput from '../../components/SearchInput/SearchInput'
import EmptyBanner from '../../components/EmptyBanner'

import customAxios from '../../utilities/customAxios'

const PAGE = {
	FRIENDS: "friends",
	DISCOVER: "discover"
}

const FriendsPage = () => {

	const [page, setPage] = useState(PAGE.FRIENDS)
	const [requestsList, setRequestsList] = useState([])
	const [friendsList, setFriendsList] = useState([])
	const [discoverFriends, setDiscoverFriends] = useState(null)

	useEffect(() => {
		axios.all([
			customAxios({
				method: "GET",
				url: "/users/getRequests",
				headers: {
					"Authorization": `Bearer ${Cookies.get("authToken")}`
				}
			}),
			customAxios({
				method: "GET",
				url: "/users/getFriends",
				headers: {
					"Authorization": `Bearer ${Cookies.get("authToken")}`
				}
			})
		])
		.then(axios.spread((resultRequest, resultFriends) => {
			if([resultRequest, resultFriends].every((item) => item.status === 200)){
				setRequestsList(resultRequest.data.requestList)
				setFriendsList(resultFriends.data.friendsList)

				console.log(resultFriends)
			}
		}))
	}, [])

	const handleUsersSearch = (keyword) => {
		console.log(keyword)
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
				{requestsList.length > 0 &&
				<div className="incoming-requests">
					<h2>Incoming Requests</h2>
					<div className="users-container">
						{requestsList.map((request) => (
							<FriendHolder key={uuid()} user={request}/>
						))}
					</div>
				</div>
				}
				<div className="friends-list">
					<SearchInput placeholder="Search your friend!"/>
					<div className="users-container">
						{friendsList.length > 0 ?
							friendsList.map((friend) => (
								<FriendHolder key={uuid()} user={friend}/>
							))
						:
							<EmptyBanner>
								<p>Oops! No friends yet</p>
								<p>Meet new people in the discover menu above!</p>
							</EmptyBanner>
						}
					</div>
				</div>
				</>
				:
				<>
				<div className="discover-friends">
					<SearchInput placeholder="Search a friend!" onSearch={handleUsersSearch}/>
					{discoverFriends !== null &&(
						discoverFriends.length > 0 ?
						<div className="users-container">
							{discoverFriends.map((user) => (
								<FriendHolder key={uuid()} user={user}/>
							))}
						</div>
						:
						<EmptyBanner>
							<p>No friends to be found!</p>
							<p>Try to look for another username</p>
						</EmptyBanner>
					)}
				</div>
				</>
			}
		</div>
	)
}

export default FriendsPage