import React,{ PureComponent } from 'react';
import styles from './index.module.css';

const img = new Image();
img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E";


class View extends PureComponent {

	constructor(props) {
	    super(props);
	    this.view = React.createRef();
	    this.dragData = {
	    	left:0,
	    	top:0
	    }
	}

 
	dragstart = (ev) => {

		if(this.resizing){
            ev.preventDefault();
            return false;
        }
        if(this.props.draggable){
			ev.dataTransfer.setDragImage(img,0,0);
			this.startLeft = this.props.style.left;
			this.startTop = this.props.style.top;
			this.startX = ev.clientX;
	        this.startY = ev.clientY;
	        this.dragging = true;
	        this.dragData.left = this.startLeft;
	        this.dragData.top = this.startTop;
	        this.props.onDragStart &&　this.props.onDragStart(this.dragData);
		}
	}

	drag = (ev) => {
		if( this.dragging && this.props.draggable && ev.clientX && ev.clientY){
			const grid = this.props.grid || 1;
			const zoom = this.props.zoom || 1;
            let left = parseInt((this.startLeft + (ev.clientX - this.startX)/zoom)/grid)*grid;
            let top = parseInt((this.startTop + (ev.clientY - this.startY)/zoom)/grid)*grid;
            this.view.current.style.transform = `translate( ${parseInt(left)}px,${parseInt(top)}px)`;
            this.view.current.setAttribute('dragging','');
            this.dragData.left = left;
            this.dragData.top = top;
            this.props.onDrag &&　this.props.onDrag(this.dragData)
		}
	}

	dragend = () => {
		if(this.dragging && this.props.draggable){
            const { left, top } = this.props.style;
            const reset = this.view.current.animate(
                [
                    { transform: `translate3d( ${left}px ,${top}px,0)` }
                ],
                {
                    duration: 200,
                    easing:"ease-in-out",
                }
            )
            reset.onfinish = () => {
                this.view.current.removeAttribute('dragging');
                this.view.current.style.transform = `translate( ${parseInt(left)}px,${parseInt(top)}px)`;
                this.dragData.left = left;
            	this.dragData.top = top;
            	this.dragging = false;
                this.props.onDragEnd &&　this.props.onDragEnd(this.dragData);
            }
        }
	}

	resizestart = (ev) => {
		if(!this.props.resizeable){
			return;
		}
		ev.stopPropagation();
        if(ev.target.tagName === 'I'){
            this.resizing = true;
            this.startX = ev.pageX;
            this.startY = ev.pageY;
            this.mode = ev.target.dataset.type;
            this.width = this.view.current.offsetWidth;
            this.height = this.view.current.offsetHeight;
            this.offsetX = 0;
            this.offsetY = 0;
        }
	}


	mousemove = (ev)=>{
        if(this.resizing && this.props.resizeable){
            ev.stopPropagation();
            window.getSelection().removeAllRanges();
            const zoom = this.props.zoom || 1;
            this.offsetX = (ev.pageX - this.startX)/zoom;
            this.offsetY = (ev.pageY - this.startY)/zoom;
            let $width = this.width;
            let $height = this.height;
            switch (this.mode) {
                case 'tl':
                	$width = this.width - this.offsetX;
                	$height = this.height - this.offsetY;
                    break;
                case 't':
                	$height = this.height - this.offsetY;
                    break;
                case 'tr':
                	$width = this.width + this.offsetX;
                	$height = this.height - this.offsetY;
                    break;
                case 'l':
                	$width = this.width - this.offsetX;
                    break;
                case 'r':
                	$width = this.width + this.offsetX;
                    break;
                case 'bl':
                	$width = this.width - this.offsetX;
                	$height = this.height + this.offsetY;
                    break;
                case 'b':
                	$height = this.height + this.offsetY;
                    break;
                case 'br':
                	$width = this.width + this.offsetX;
                	$height = this.height + this.offsetY;
                    break;
                default:
                    break;
            }
            const grid = this.props.grid || 1;
            const { left, top } = this.props.style;
            $width = parseInt($width/grid)*grid;
            $height = parseInt($height/grid)*grid;
            this.offsetX = parseInt((this.mode.includes('l')?this.offsetX:0)/grid)*grid;
            this.offsetY = parseInt((this.mode.includes('t')?this.offsetY:0)/grid)*grid;
            this.view.current.style.width = $width + 'px';
            this.view.current.style.height = $height + 'px';
            this.view.current.style.transform = `translate3d(${left+this.offsetX}px,${top+this.offsetY}px,0)`
            this.props.onResize &&　this.props.onResize({
            	offsetX: this.offsetX,
                offsetY: this.offsetY,
                width:$width,
                height:$height,
            })
        }
    }

    mouseup = (ev)=>{
		if(this.resizing){
	        this.resizing = false;
	        this.props.onResizeEnd &&　this.props.onResizeEnd({
	        	offsetX: this.offsetX,
                offsetY: this.offsetY,
	            width:this.view.current.offsetWidth,
	            height:this.view.current.offsetHeight,
	        })
		}
        
    }
	

    componentDidMount = () => {
    	document.addEventListener('mousemove',this.mousemove);
    	document.addEventListener('mouseup',this.mouseup);
    }

    componentWillUnmount = () => {
    	document.removeEventListener('mousemove',this.mousemove);
    	document.removeEventListener('mouseup',this.mouseup);
    }

	render(){
		const { className='',style:{left, top, width, height, opacity}, resizeable, draggable, children, zoom, select, onClick } = this.props;

		return (
			<div className={`${styles.view} ${className}`} 
				data-type="element"
				data-select={select}
				style={{transform:`translate3d(${left}px,${top}px,0)`,width,height,'--zoom':zoom}} 
				//tabIndex="-1"
				ref={this.view} 
				draggable={draggable}
				onClick={onClick}
				onDragStart={this.dragstart} 
				onDrag={this.drag}
				onDragEnd={this.dragend}>
				<div className={styles.view_inner} style={{opacity}}>
					{children}
				</div>
				{
					resizeable?
					<div onMouseDown={this.resizestart} className={styles.resize} >
						<i className={styles.tl} data-type="tl"></i>
						<i className={styles.t} data-type="t"></i>
						<i className={styles.tr} data-type="tr"></i>
						<i className={styles.l} data-type="l"></i>
						<i className={styles.r} data-type="r"></i>
						<i className={styles.bl} data-type="bl"></i>
						<i className={styles.b} data-type="b"></i>
						<i className={styles.br} data-type="br"></i>
					</div>
					:
					null
				}
			</div>
		)
	}

}

export default View;