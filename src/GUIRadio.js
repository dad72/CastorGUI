class GUIRadio extends GUIManager {

    constructor(id, options, guimanager, callback, append = true) {
		
		super();
		
		this.id = id;
		this.name = options.name || "NameRadio"+id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.radioPosition = {x:options.x, y:options.y};
		this.radioSize = options.size || 1.0;
		this.zIndex = options.zIndex || 1;
		this.radioVisible = true;
		this.onClickRadio = callback || false;
		this.tabindex = options.tabindex || 0;

		if(append == true) {
			this.addElement(append);
		}
	}

	addElement(append, element = null)  {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		let radio = document.createElement("input");
		radio.type = "radio";
		radio.style.width = (this.radioSize * 16)+"px";
		radio.style.height = (this.radioSize * 16)+"px";
		if(GUIManager.getConvertPixelToPercent() == true) {			
			if(append == true) {
				radio.style.top = this.convertPixelToPercentHeight(this.radioPosition.y + this.getCanvasOrigine().top)+"%";
				radio.style.left = this.convertPixelToPercentWidth(this.radioPosition.x + this.getCanvasOrigine().left)+"%";
			} else {
				radio.style.top = (this.radioPosition.y)+"px";
				radio.style.left = (this.radioPosition.x)+"px";
			}
		} else {
			if(append == true) {
				radio.style.top = (this.radioPosition.y + this.getCanvasOrigine().top)+signe;
				radio.style.left = (this.radioPosition.x + this.getCanvasOrigine().left)+signe;
			} else {
				radio.style.top = this.radioPosition.y+signe;
				radio.style.left = this.radioPosition.x+signe;
			}
		}
		radio.style.position = "absolute";
		radio.style.padding = "0px";
		radio.style.margin = "0px";
		radio.id = this.id;
		radio.tabindex = this.tabindex;
		radio.className = "GUIRadio";
		radio.name = this.name;
		radio.style.zIndex = this.zIndex;
		radio.onclick = this.onClickRadio;

		if(append == true) {
			this.html.appendChild(radio);
		} else {
			element.appendChild(radio);
		}

		this.addGuiElements(radio);
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
			this.radioVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.radioVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    }

    isVisible() {
		return this.radioVisible;
    }
}