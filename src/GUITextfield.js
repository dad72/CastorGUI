class GUITextfield extends GUIManager {

    constructor(id, options, guimanager, callback, append = true) {
		
		super();
		
		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.textfieldPosition = {x:options.x, y:options.y};
		this.textfieldSize = {width:options.w, height:options.h};
		this.value = options.value || "";
		this.background = options.background || null;
		this.border	= options.border || null;
		this.color = options.color || null;
		this.placeholder = options.placeholder || "";
		this.zIndex = options.zIndex || 2;
		this.textfieldVisible = true;
		this.onchangeTextfield = callback || "";
		this.tabindex = options.tabindex || 0;

		if(append == true) {
			this.addElement(append);
		}
	}

	addElement(append, element = null)  {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		let textfield = document.createElement("input");
		textfield.type = "text";
		textfield.style.width = this.textfieldSize.width+"px";
		textfield.style.height = this.textfieldSize.height+"px";
		if(GUIManager.getConvertPixelToPercent() == true) {			
			if(append == true) {
				textfield.style.top = this.convertPixelToPercentHeight(this.textfieldPosition.y + this.getCanvasOrigine().top)+"%";
				textfield.style.left = this.convertPixelToPercentWidth(this.textfieldPosition.x + this.getCanvasOrigine().left)+"%";
			} else{
				textfield.style.top = (this.textfieldPosition.y)+"px";
				textfield.style.left = (this.textfieldPosition.x)+"px";
			}
		} else {
			if(append == true) {
				textfield.style.top = (this.textfieldPosition.y + this.getCanvasOrigine().top)+signe;
				textfield.style.left = (this.textfieldPosition.x + this.getCanvasOrigine().left)+signe;
			} else{
				textfield.style.top = this.textfieldPosition.y+signe;
				textfield.style.left = this.textfieldPosition.x+signe;
			}
		}		
		textfield.style.position = "absolute";
		textfield.style.display = "block";
		textfield.id = this.id;
		textfield.name = this.id;
		textfield.className = "GUITextfield";
		textfield.tabindex = this.tabindex;
		textfield.value = this.value;
		textfield.placeholder = this.placeholder;
		textfield.style.zIndex = this.zIndex;
		if(this.background != null) {
			textfield.style.background = this.background;
		}
		textfield.style.border = this.border;
		if(this.color != null) {
			textfield.style.color = this.color;
		}
		textfield.onchange = this.onchangeTextfield;

		if(append == true) {
			this.html.appendChild(textfield);
		} else {
			element.appendChild(textfield);
		}
		this.addGuiElements(textfield);
    }

	getValue() {
		return this.getElementById(this.id).value;
	}

	setValue(val) {
		this.value = val;
		this.getElementById(this.id).value = val;
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
			this.textfieldVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.textfieldVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    }

    isVisible() {
		return this.textfieldVisible;
    }

}