import React, { useContext,useState,useEffect } from 'react';
import './index.css';
import Text, { TextConfig } from '../../components/text';
import { LayoutContext } from '../../store';

const MapView = {
	'Text':Text
}

const Main = () => {

	let dragData = null;

	let moverun = false;

	let posStart = [0,0]; 

	const { layout, dispatch, config, setConfig, focusIndex, setFocusIndex } = useContext(LayoutContext);

	const [ move,setMove ] = useState(false);

	const [ pos,setPos ] = useState([0,0]);

	const dragstart = (target,i) => {
		dragData = target;
		dragData.index = i;
	}

	const dragover = (ev) => {
		ev.preventDefault();
	}

	const drop = (ev) => {
		ev.preventDefault();
		if(dragData){
			dispatch({
				type:'UPDATA',
				layout: {
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
			layout: {
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

	const select = (ev,i) => {
		ev.stopPropagation();
		if(!move){
			setFocusIndex([i]);
		}
	}

	const movestart = (ev) => {
		if(ev.altKey){
			ev.preventDefault();
		}
		if(ev.keyCode===32){
			setMove(true);
			ev.target.focus();
		}
	}

	const moveend = (ev) => {
		setMove(false);
	}

	const moverunstart = (ev) => {
		if(move){
			moverun = true;
			posStart = [ev.clientX,ev.clientY];
		}
	}

	const moverunend = () => {
		if(moverun){
			moverun = false;
		}
	}

	const moveruning = (ev)=>{
		if(moverun){
			setPos([pos[0]+(ev.clientX-posStart[0])/config.zoom,pos[1]+(ev.clientY-posStart[1])/config.zoom]);
		}
	}

	useEffect(()=>{
		document.addEventListener('mousemove',moveruning);
		document.addEventListener('mouseup',moverunend);
	})

	return (
		<div className="desk-top" 
			data-move={move}
			data-grid={config.gridvisible&&config.grid>=5}
			onWheel={zoom}
			onMouseDown={moverunstart}
			onClick={(ev)=>select(ev,-1)} 
			data-select={focusIndex.includes(-1)} 
			onKeyDown={movestart} 
			onKeyUp={moveend} 
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
							select={focusIndex.includes(i)}
							onClick={(ev)=>select(ev,i)}
							onDragStart={(dragData)=>dragstart(dragData,i)} 
							onDragEnd={dragend} 
							onResize={resize}  
							onResizeEnd={(resizeData)=>resizeend(resizeData,i,left,top)}>
								<p>drag me</p>
						</View>
					)
				})
			}
		</div>
	)
}

export default Main;