import { useState } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'

import "./FriendsPage_master.scss"

import FriendHolder from '../../components/FriendHolder/FriendHolder'
import SearchInput from '../../components/SearchInput/SearchInput'
import EmptyBanner from '../../components/EmptyBanner'

const PAGE = {
	FRIENDS: "friends",
	DISCOVER: "discover"
}

const FriendsPage = () => {

	const [page, setPage] = useState(PAGE.FRIENDS)

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
				<div className="incoming-requests">
					<h2>Incoming Requests</h2>
					<div className="users-container">
						<FriendHolder username='Becky and the prisoner of Azkaban' avatarName="Avatar1"/>
						<FriendHolder username='Becky and another name' avatarName="Avatar1"/>
						<FriendHolder username='Becky' avatarName="Avatar1"/>
						<FriendHolder username='Becky' avatarName="Avatar1"/>
						<FriendHolder username='Becky' avatarName="Avatar1"/>
						<FriendHolder username='Becky' avatarName="Avatar1"/>
						<FriendHolder username='Becky' avatarName="Avatar1"/>
						<FriendHolder username='Becky' avatarName="Avatar1"/>
						<FriendHolder username='Becky' avatarName="Avatar1"/>
					</div>
				</div>
				<div className="friends-list">
					<SearchInput placeholder="Search your friend!"/>
					<div className="users-container">
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
						<FriendHolder username='Hello World' avatarName="Avatar5"/>
					</div>
				</div>
				</>
				:
				<>
				<div className="discover-friends">
					<SearchInput placeholder="Search a friend!"/>
					<div className="users-container">
						<FriendHolder username="Sample" avatarName="Avatar2"/>
						<FriendHolder username="Sample" avatarName="Avatar3"/>
						<FriendHolder username="Sample" avatarName="Avatar4"/>
						<FriendHolder username="Sample" avatarName="Avatar2"/>
						<FriendHolder username="Sample" avatarName="Avatar3"/>
						<FriendHolder username="Sample" avatarName="Avatar4"/>
						<FriendHolder username="Sample" avatarName="Avatar2"/>
						<FriendHolder username="Sample" avatarName="Avatar3"/>
						<FriendHolder username="Sample" avatarName="Avatar4"/>
						<FriendHolder username="Sample" avatarName="Avatar2"/>
						<FriendHolder username="Sample" avatarName="Avatar3"/>
						<FriendHolder username="Sample" avatarName="Avatar4"/>
					</div>
					<EmptyBanner>
						<p>No user to be found!</p>
						<p>Please try to look for another user</p>
					</EmptyBanner>
				</div>
				</>
			}
		</div>
	)
}

export default FriendsPage