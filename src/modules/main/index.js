import React, { useContext,useState,useEffect,useRef,useCallback } from 'react';
import './index.css';
import Text from '../../components/text';
import { LayoutContext } from '../../store';
import { defaultprops } from '../../store/defaultprops';


const MapView = {
	'Text':Text,
	'Marquee':Text
}

let ipos = [0,0]

const useMove = (zoom) => {
	const [ move,setMove ] = useState(false);
	const [ pos,setPos ] = useState([0,0]);
	
	useEffect(()=>{
		const desk = document.getElementById('desk-top');
		let drag = false;
		let start = [0,0];
		let posStart = ipos;
		let moverun = false;
		const moveruning = (ev)=>{
			if(moverun){
				ipos = [posStart[0]+(ev.clientX-start[0])/zoom,posStart[1]+(ev.clientY-start[1])/zoom];
				setPos(ipos);
			}
		}
		
		const moverunend = () => {
			console.log('moverunend')
			moverun = false;
		}
		const moverunstart = (ev) => {
			if(drag){
				moverun = true;
				start = [ev.clientX,ev.clientY];
				posStart = ipos;
			}
		}
		
		const movestart = (ev) => {
			if(ev.altKey){
				ev.preventDefault();
			}
			if(ev.keyCode===32){
				setMove(true);
				drag = true;
				ev.target.focus();
				
			}
		}
		const moveend = (ev) => {
			setMove(false);
			drag = false;
		}

		console.log(desk)
		desk.addEventListener('keydown',movestart);
		desk.addEventListener('keyup',moveend);
		desk.addEventListener('mousedown',moverunstart);
		document.addEventListener('mousemove',moveruning);
		document.addEventListener('mouseup',moverunend);
		return ()=>{
			desk.removeEventListener('keydown',movestart);
			desk.removeEventListener('keyup',moveend);
			desk.removeEventListener('mousedown',moverunstart);
			document.removeEventListener('mousemove',moveruning)
			document.removeEventListener('mouseup',moverunend)
		}
	},[zoom])
	
	return {move,pos}
}

const Main = () => {

	let dragData = null;

	const { layout, dispatch, config, setConfig, focusIndex, setFocusIndex } = useContext(LayoutContext);

	const dragstart = (target,i) => {
		dragData = target;
		dragData.index = i;
	}

	const desk = useRef(null);

	const {move,pos} = useMove(config.zoom);

	const dragover = (ev) => {
		ev.preventDefault();
	}

	const drop = (ev) => {
		ev.preventDefault();
		if(ev.dataTransfer.getData('type')){
			const type = ev.dataTransfer.getData('type');
			const target = ev.target.closest('.desk-top');
			const { left, top } = target.getBoundingClientRect();
			const offsetX = ev.dataTransfer.getData('offsetX');
			const offsetY = ev.dataTransfer.getData('offsetY');
			dispatch({
				type:'ADD',
				props: defaultprops[type],
				position: [(ev.clientX-left-offsetX)/config.zoom,(ev.clientY-top-offsetY)/config.zoom],
				components: type
			})
			setFocusIndex([layout.length]);
			ev.dataTransfer.clearData();
		}
		if(ev.dataTransfer.files[0]){
			console.log(ev.dataTransfer.files[0])
		}
		if(dragData){
			dispatch({
				type:'UPDATA',
				source: {
					left: dragData.left,
					top: dragData.top,
				},
				path:'style',
				index:dragData.index
			})
		}
	}

	const dragend = (ev) => {
		dragData = null;
	}

	const resize = (data) => {
		
	}

	const resizeend = (data,i,left,top) => {
		dispatch({
			type:'UPDATA',
			source: {
				left: left + data.offsetX,
				top: top + data.offsetY,
				width: data.width,
				height: data.height,
			},
			path:'style',
			index:i
		})
	}

	const zoom = (ev) => {
		if(ev.altKey){
			const dir = ev.deltaY > 0 ? -0.1:0.1;
			setConfig({
				...config,
				zoom: Math.min(Math.max(config.zoom + dir,.5),2) 
			})
		}
	}

	const wheelmove = (ev) => {
		console.log(ev)
		const dir = ev.deltaY > 0 ? -50:50;
		const newPos = [...pos];
		if(ev.shiftKey){
			newPos[0] += dir;
		}else{
			newPos[1] += dir;
		}
		//setPos(newPos);
	}

	const select = (ev,i) => {
		ev.stopPropagation();
		if(!move){
			if(!focusIndex.includes(i)){
				setFocusIndex([i]);
			}
		}
	}

	const onChange = (data,path,index) => {
		dispatch({
			type:'UPDATA',
			source: data,
			path:path,
			index:index
		})
	}

	return (
		<div className="desk-top" 
			data-move={move}
			data-grid={config.gridvisible&&config.grid>=5}
			onWheel={zoom}
			id="desk-top"
			ref={desk}
			//onMouseDown={moverunstart}
			onClick={(ev)=>select(ev,-1)} 
			data-select={focusIndex.includes(-1)} 
			//onKeyDown={movestart} 
			//onKeyUp={moveend} 
			tabIndex={-2}
			style={{
				width:config.width,
				height:config.height,
				backgroundColor:config.backgroundColor,
				backgroundImage:config.backgroundImage&&`url(${config.backgroundImage})`,
				'--grid':config.grid,
				'--zoom':config.zoom,
				'--x':pos[0],
				'--y':pos[1]
			}} 
			onDragOver={dragover} 
			onDrop={drop}
		>
			{
				layout.map((el,i)=>{
					const { left, top} = el.style;
					const View = MapView[el.type];
					return (
						<View 
							key={i} 
							draggable={true} 
							resizeable={true}
							grid={config.grid}
							zoom={config.zoom}
							style={el.style}
							props={el.props}
							data={el.data}
							select={focusIndex.includes(i)}
							onChange={(data,path)=>onChange(data,path,i)}
							onClick={(ev)=>select(ev,i)}
							onDragStart={(dragData)=>dragstart(dragData,i)} 
							onDragEnd={dragend} 
							onResize={resize}  
							onResizeEnd={(resizeData)=>resizeend(resizeData,i,left,top)} />
					)
				})
			}
		</div>
	)
}

export default Main;