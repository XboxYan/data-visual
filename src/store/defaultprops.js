export const defaultprops = {
	Text:{
		atype:'text',
		style:{
			width: 200,
			height: 50,
			opacity: 1,
			color: '#333333',
			fontSize: 16,
			alignX: 'center',
		},
		props:{
			muti: false
		},
		data:{
			text:"This is a text"
		}
	},
	Marquee:{
		atype:'text',
		style:{
			width: 200,
			height: 50,
			opacity: 1,
			color: '#333333',
			fontSize: 16,
		},
		props:{
			marquee: true,
			speed: 100
		},
		data:{
			text:"This is a marquee"
		}
	},
}