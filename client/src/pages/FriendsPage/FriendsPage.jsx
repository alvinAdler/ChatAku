import { MdOutlineArrowBackIosNew } from 'react-icons/md'

import "./FriendsPage_master.scss"

import FriendHolder from '../../components/FriendHolder/FriendHolder'
import SearchInput from '../../components/SearchInput/SearchInput'

const FriendsPage = () => {
	return (
		<div className="friends-page-container">
			<div className="tab-navigations">
				<button type="button"><MdOutlineArrowBackIosNew/></button>
				<p>
					<button className='active' role="button" tabIndex={0}>Your friends</button>
					/
					<button role="button">Discover</button>
				</p>
			</div>
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
				<SearchInput className="friend-search"/>
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
				</div>
			</div>
		</div>
	)
}

export default FriendsPage