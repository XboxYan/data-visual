import React, { useContext,useState,useEffect,useRef } from 'react';
import './index.css';
import Text from '../../components/text';
import { LayoutContext } from '../../store';
import { defaultprops } from '../../store/defaultprops';


const MapView = {
	'Text':Text,
	'Marquee':Text
}



const useMove = (ref,zoom) => {
	const [ move,setMove ] = useState(false);
	const [ pos,setPos ] = useState([0,0]);
	useEffect(()=>{
		const desk = ref.current;
		let drag = false;
		let start = [0,0];
		let posStart = [0,0];
		let moverun = false;
		const moveruning = (ev)=>{
			if(moverun){
				setPos([posStart[0]+(ev.clientX-start[0])/zoom,posStart[1]+(ev.clientY-start[1])/zoom]);
			}
		}
		
		const moverunend = () => {
			moverun = false;
		}

		const moverunstart = (ev) => {
			if(drag){
				moverun = true;
				start = [ev.clientX,ev.clientY];
				setPos(v=>{
					posStart = v;
					return v
				})
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

		const wheelmove = (ev) => {
			if(!ev.altKey){
				const dir = ev.deltaY > 0 ? -50:50;
				if(ev.shiftKey){
					setPos(v=>[v[0]+dir,v[1]]);
				}else{
					setPos(v=>[v[0],v[1]+dir]);
				}
			}
		}
		desk.addEventListener('keydown',movestart);
		desk.addEventListener('keyup',moveend);
		desk.addEventListener('mousedown',moverunstart);
		desk.parentNode.addEventListener('wheel',wheelmove);
		document.addEventListener('mousemove',moveruning);
		document.addEventListener('mouseup',moverunend);
		return ()=>{
			desk.removeEventListener('keydown',movestart);
			desk.removeEventListener('keyup',moveend);
			desk.removeEventListener('mousedown',moverunstart);
			desk.parentNode.removeEventListener('wheel',wheelmove);
			document.removeEventListener('mousemove',moveruning)
			document.removeEventListener('mouseup',moverunend)
		}
	},[ref,zoom])
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

	const {move,pos} = useMove(desk,config.zoom);

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

	const gradientColor = Array.isArray(config.backgroundColor)?`,linear-gradient(${config.backgroundColor[0]}deg, ${config.backgroundColor[1]}, ${config.backgroundColor[2]})`:'';

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
				backgroundImage:`url(${config.backgroundTempURL||config.backgroundImage})${gradientColor}`,
				'--grid':config.grid,
				'--zoom':config.zoom,
				'--x':pos[0],
				'--y':pos[1],
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