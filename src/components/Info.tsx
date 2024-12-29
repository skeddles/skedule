
import '../css/Info.css'
import BlueskyIcon from '../assets/bluesky.svg?react'
import YoutubeIcon from '../assets/youtube.svg?react'
import ItchIoIcon from '../assets/itchio.svg?react'

interface InfoProps {
	isOpen: boolean;
}

export default function Info({isOpen}: InfoProps) {
	return (				
	<div className="Info" style={{height: isOpen?'auto':0}}>
		<p>
			<strong>skedule</strong> is a free tool that helps you plan out a daily schedule,
			then displays the task you should be currently working on. This tool is ideal for 
			helping you stay on your current task, but avoiding hyperfixation distracting you 
			from others. skedule picks your current task based on the current time, and therefore cannot be paused - similar to a work day. 
		</p>
		<p>
			Add time blocks for each block of time you want to dedicate to a single thing. You can either keep it generic such as "Work" or "Clean", or you can update these with specific tasks at the beginning of each day. I recommend including breaks in your schedule, as well as time for meals and other activities, as the clock waits for no one. 
		</p>

		<p className="social">
			Created by <strong>skeddles</strong> 
			<a href="https://bsky.app/profile/skeddles.com" target="_blank"><BlueskyIcon/></a>
			<a href="https://www.youtube.com/@skeddless" target="_blank"><YoutubeIcon/></a>
			<a href="https://skeddles.itch.io/" target="_blank"><ItchIoIcon/></a>
		</p>
	
		<div className="tipping">
			<p>Like this tool?</p>
			<a href='https://ko-fi.com/skeddles' target='_blank'><img height='36' style={{border: '0px', height: '36px'}} src='https://storage.ko-fi.com/cdn/kofi1.png?v=6'  alt='Buy Me a Coffee at ko-fi.com' /></a>
			<p>Tip via Ko-Fi</p>
		</div>
	
	</div>)
}