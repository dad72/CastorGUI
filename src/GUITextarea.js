class GUITextarea extends GUIManager {

    constructor(id, options, guimanager, callback, append = true) {
		
		super();
		
		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.textareaPosition = {x:options.x, y:options.y};
		this.textareaSize = {width:options.w, height:options.h};
		this.value = options.value || "";
		this.placeholder = options.placeholder || "";
		this.background = options.background || null;
		this.color = options.color || null;
		this.zIndex = options.zIndex || 2;
		this.textareaVisible = true;
		this.onchangeTextarea = callback || "";
		this.tabindex = options.tabindex || 0;		
		
		if(append == true) {
			this.addElement(this.append);
		}
	}

	addElement(append, element = null)  {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		let textarea = document.createElement("textarea");
		textarea.cols = this.textareaSize.width;
		textarea.rows = this.textareaSize.height;
		if(GUIManager.getConvertPixelToPercent() == true) {
			if(append == true) {
				textarea.style.top = this.convertPixelToPercentHeight(this.textareaPosition.y + this.getCanvasOrigine().top)+"%";
				textarea.style.left = this.convertPixelToPercentWidth(this.textareaPosition.x + this.getCanvasOrigine().left)+"%";
			} else {
				textarea.style.top = (this.textareaPosition.y)+"px";
				textarea.style.left = (this.textareaPosition.x)+"ox";
			}
		} else {
			if(append == true) {
				textarea.style.top = (this.textareaPosition.y + this.getCanvasOrigine().top)+signe;
				textarea.style.left = (this.textareaPosition.x + this.getCanvasOrigine().left)+signe;
			} else {
				textarea.style.top = this.textareaPosition.y+signe;
				textarea.style.left = this.textareaPosition.x+signe;
			}
		}
		textarea.style.position = "absolute";
		textarea.style.display = "block";
		textarea.placeholder = this.placeholder;
		textarea.id = this.id;
		textarea.name = this.id;
		textarea.className = "GUITextarea";
		textarea.tabindex = this.tabindex;
		textarea.innerHTML = this.value;
		textarea.style.zIndex = this.zIndex;
		if(this.background != null) {
			textarea.style.background = this.background;
		}
		if(this.color != null) {
			textarea.style.color = this.color;
		}
		textarea.onchange = this.onchangeTextarea;

		if(append == true) {
			this.html.appendChild(textarea);
		} else {
			element.appendChild(textarea);
		}
		this.addGuiElements(textarea);
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
			this.textareaVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.textareaVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    }

    isVisible() {
		return this.textareaVisible;
    }

}