class GUIFieldset extends GUIManager {

   constructor(id, options, guimanager, append = true) {
		
		super(canvas);
		
		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.fieldsetPosition = {x:options.x, y:options.y};
		this.fieldsetSize = {width:options.w, height:options.h};
		this.legend = options.legend;
		this.zIndex = options.zIndex || 1;
		this.fieldsetVisible = true;

		if(append == true) {
			this.addElement(append);
		}
	}

	addElement(append, element = null)  {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		let fieldset = document.createElement("fieldset");
		fieldset.style.width = this.fieldsetSize.width+"px";
		fieldset.style.height = this.fieldsetSize.height+"px";		
		if(GUIManager.getConvertPixelToPercent() == true) {
			if(append == true) {
				fieldset.style.top = this.convertPixelToPercentHeight(this.fieldsetPosition.y + this.getCanvasOrigine().top)+"%";
				fieldset.style.left = this.convertPixelToPercentWidth(this.fieldsetPosition.x + this.getCanvasOrigine().left)+"%";
			} else {
				fieldset.style.top = (this.fieldsetPosition.y)+"px";
				fieldset.style.left = (this.fieldsetPosition.x)+"px";
			}
		} else {
			if(append == true) {
				fieldset.style.top = (this.fieldsetPosition.y + this.getCanvasOrigine().top)+signe;
				fieldset.style.left = (this.fieldsetPosition.x + this.getCanvasOrigine().left)+signe;
			} else {
				fieldset.style.top = (this.fieldsetPosition.y)+signe;
				fieldset.style.left = (this.fieldsetPosition.x)+signe;
			}
		}		
		fieldset.style.position = "absolute";
		fieldset.id = this.id;
		fieldset.name = this.id;
		fieldset.className = "GUIFieldset";
		fieldset.style.zIndex = this.zIndex;
		this.html.appendChild(fieldset);
		let legend = document.createElement("legend");
		legend.innerHTML = this.legend;

		if(append == true) {
			this.getElementById(this.id).appendChild(legend);
		} else {
			element.appendChild(legend);
		}
		this.addGuiElements(fieldset);
    }

	add(element)
	{
		let contentFieldSet = this.getElementById(this.id);
		element.addElement(false, contentFieldSet);
	}

	dispose() {
		return this.html.removeChild(this.getElementById(this.id));
    }

    setVisible(bool, fade) {
		let display = null;
		if(fade == undefined) fade = true;
		let element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.fieldsetVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.fieldsetVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    }

    isVisible() {
		return this.fieldsetVisible;
    }

}