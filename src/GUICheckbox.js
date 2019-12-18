class GUICheckbox extends GUIManager {

    constructor(id, options, guimanager, callback, append = true) {
		
		super();
		
		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.checkboxPosition = {x:options.x, y:options.y};
		this.checkboxSize = options.size || 1.0;
		this.zIndex = options.zIndex || 1.0;
		this.checkboxVisible = true;
		this.onClickCheckbox = callback || "";
		this.tabindex = options.tabindex || 0;

		if(append == true) {
			this.addElement(append);
		}
	}

	addElement(append, element = null)  {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		let checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.style.width = (this.checkboxSize * 16)+"px";
		checkbox.style.height = (this.checkboxSize * 16)+"px";
		if(GUIManager.getConvertPixelToPercent() == true) {			
			if(append == true) {
				checkbox.style.top = this.convertPixelToPercentHeight(this.checkboxPosition.y + this.getCanvasOrigine().top)+"%";
				checkbox.style.left = this.convertPixelToPercentWidth(this.checkboxPosition.x + this.getCanvasOrigine().left)+"%";
			} else {
				checkbox.style.top = (this.checkboxPosition.y)+"px";
				checkbox.style.left = (this.checkboxPosition.x)+"px";
			}
		} else {
			if(append == true) {
				checkbox.style.top = (this.checkboxPosition.y + this.getCanvasOrigine().top)+signe;
				checkbox.style.left = (this.checkboxPosition.x + this.getCanvasOrigine().left)+signe;
			} else {
				checkbox.style.top = this.checkboxPosition.y+signe;
				checkbox.style.left = this.checkboxPosition.x+signe;
			}
		}
		checkbox.style.position = "absolute";
		checkbox.style.padding = "0px";
		checkbox.style.margin = "0px";
		checkbox.id = this.id;
		checkbox.name = this.id;
		checkbox.className = "GUICheckbox";
		checkbox.tabindex = this.tabindex;
		checkbox.style.zIndex = this.zIndex;
		checkbox.onclick = this.onClickCheckbox;

		if(append == true) {
			this.html.appendChild(checkbox);
		} else {
			element.appendChild(checkbox);
		}
		this.addGuiElements(checkbox);
    }

	isChecked()  {
		if(this.getElementById(this.id).checked) {
			return true;
		} else {
			return false;
		}
	}

	setChecked(value)  {
		this.getElementById(this.id).checked = value;		
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
			this.checkboxVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.checkboxVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    }

    isVisible() {
		return this.checkboxVisible;
    }

}