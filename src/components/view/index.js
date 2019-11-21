import React,{ PureComponent } from 'react';
import { Icon,Tooltip } from 'antd';
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
        	ev.dataTransfer.setData('text','');
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
            let left = Math.round((this.startLeft + (ev.clientX - this.startX)/zoom)/grid)*grid;
            let top = Math.round((this.startTop + (ev.clientY - this.startY)/zoom)/grid)*grid;
            this.view.current.style.setProperty('--x', Math.round(left));
            this.view.current.style.setProperty('--y', Math.round(top));
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
                this.view.current.style.setProperty('--x', left);
            	this.view.current.style.setProperty('--y', top);
                this.dragData.left = left;
            	this.dragData.top = top;
            	this.dragging = false;
                this.props.onDragEnd &&　this.props.onDragEnd(this.dragData);
                setTimeout(()=>{
                	this.view.current.removeAttribute('dragging');
                },50)
            }
        }
	}

	keydown = (ev) => {
		if(this.props.draggable && [37,38,39,40].includes(ev.keyCode)){
			const left = parseInt(getComputedStyle(this.view.current).getPropertyValue('--x'));
			const top = parseInt(getComputedStyle(this.view.current).getPropertyValue('--y'));
			const {grid} = this.props;
			switch(ev.keyCode){
				case 38:
            		this.view.current.style.setProperty('--y', top-grid);
					this.props.onKeyMove &&　this.props.onKeyMove([left,top-grid]);
					break;
				case 39:
					this.view.current.style.setProperty('--x', left+grid);
					this.props.onKeyMove &&　this.props.onKeyMove([left+grid,top]);
					break;
				case 40:
					this.view.current.style.setProperty('--y', top+grid);
					this.props.onKeyMove &&　this.props.onKeyMove([left,top+grid]);
					break;
				case 37:
					this.view.current.style.setProperty('--x', left-grid);
					this.props.onKeyMove &&　this.props.onKeyMove([left-grid,top]);
					break;
				default:
					break;
			}
		}
		if(ev.keyCode === 46 && ev.target.tagName!=='TEXTAREA'){
			this.onDelete();
		}
		if(ev.keyCode === 67 && ev.ctrlKey && ev.target.tagName!=='TEXTAREA'){
			this.onCopy();
		}
	}

	onDelete = () => {
		const { left, top } = this.props.style;
		const reset = this.view.current.animate(
            [
                { 
                	transform: `translate3d( ${left}px ,${top}px,0) scale(0.5)`,
                	opacity:0
                }
            ],
            {
                duration: 200,
                easing:"ease-in-out",
                fill:"forwards"
            }
        )
        reset.onfinish = () => {
            this.props.onDelete &&　this.props.onDelete();
        }
	}

	onCopy = () => {
		this.props.onCopy &&　this.props.onCopy();
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
            const { style:{ left, top }, props:{lockRatio},grid=1,zoom=1 } = this.props;
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

            $width = Math.round($width/grid)*grid;
            $height = Math.round($height/grid)*grid;

            if(lockRatio){
            	if(this.mode==='t'||this.mode==='b'){
					$width = $height*this.width/this.height;
            	}else{
	        		$height = $width*this.height/this.width;
            	}
	        }
            
            
            this.offsetX = Math.round((this.mode.includes('l')?this.offsetX:0)/grid)*grid;
            this.offsetY = Math.round((this.mode.includes('t')?this.offsetY:0)/grid)*grid;
            this.view.current.style.width = $width + 'px';
            this.view.current.style.height = $height + 'px';
            this.view.current.style.setProperty('--x', left+this.offsetX);
            this.view.current.style.setProperty('--y', top+this.offsetY);
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
		const { className='',style:{left, top, width, height, opacity}, resizeable, draggable, children, zoom, select, onClick, onBlur, action=[] } = this.props;

		return (
			<div className={`${styles.view} ${className}`} 
				data-type="element"
				data-select={select}
				autoFocus={true}
				style={{'--x':left,'--y':top,width,height,'--zoom':zoom}} 
				tabIndex="-1"
				ref={this.view} 
				draggable={draggable}
				onClick={onClick}
				onDragStart={this.dragstart} 
				onDrag={this.drag}
				onBlur={onBlur}
				onKeyDown={this.keydown}
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
				<div className={styles.actions}>
					<Tooltip placement="right" title="删除"><Icon className={`${styles.action_btn} ${styles.action_del}`} type="close" onClick={this.onDelete} /></Tooltip>
					<Tooltip placement="right" title="复制"><Icon className={styles.action_btn} type="copy" onClick={this.onCopy} /></Tooltip>
					{
						action.map((el,i)=>(<Tooltip key={i} placement="right" title={el.tips}><Icon className={styles.action_btn} type={el.icon} onClick={el.onClick} /></Tooltip>))
					}
				</div>
			</div>
		)
	}

}

export default View;