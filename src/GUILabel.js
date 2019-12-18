class GUILabel extends GUIManager {

    constructor(id, options, guimanager, append = true) {
		
		super();
		
		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.labelPosition = {x:options.x, y:options.y};
		this.labelSize = {width:options.w, height:options.h};
		this.textLabel = options.text;
		this.zIndex = options.zIndex || 1;
		this.labelVisible = true;

		if(append == true) {
			this.addElement(append);
		}
	}

	addElement(append, element = null)  {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		let label = document.createElement("label");
		if(GUIManager.getConvertPixelToPercent() == true) {
			if(append == true) {
				label.style.top = this.convertPixelToPercentHeight(this.labelPosition.y + this.getCanvasOrigine().top)+"%";
				label.style.left = this.convertPixelToPercentWidth(this.labelPosition.x + this.getCanvasOrigine().left)+"%";
			} else {
				label.style.top = (this.labelPosition.y)+"px";
				label.style.left = (this.labelPosition.x)+"px";
			}
		} else {
			if(append == true) {
				label.style.top = (this.labelPosition.y + this.getCanvasOrigine().top)+signe;
				label.style.left = (this.labelPosition.x + this.getCanvasOrigine().left)+signe;
			} else {
				label.style.top = this.labelPosition.y+signe;
				label.style.left = this.labelPosition.x+signe;
			}
		}
		label.style.position = "absolute";
		label.id = this.id;
		label.name = this.id;
		label.className = "GUILabel";
		label.innerHTML = this.textLabel;
		label.style.zIndex = this.zIndex;

		if(append == true) {
			this.html.appendChild(label);
		} else {
			element.appendChild(label);
		}
		this.addGuiElements(label);
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
			this.labelVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.labelVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    }

    isVisible() {
		return this.labelVisible;
    }

}