class GUIButton extends GUIManager {

    constructor(id, options, guimanager, callback, append = true) {
		
		super();
		
		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.buttonPosition = {x:options.x, y:options.y};
		this.buttonSize = {width:options.w, height:options.h};
		this.value = options.value || "Ok";
		this.buttonVisible = true;
		this.onClickButton = callback || false;
		this.imageButton = options.backgroundImage || null;
		this.colorButton = options.backgroundColor || null;
		this.borderRadiusButton = options.borderRadiusButton || null;
		this.borderButton = options.borderButton || null;
		this.colorText = options.colorText || null;
		this.zIndex = options.zIndex || 1;
		this.tabindex = options.tabindex || 0;

		if(append == true) {
			this.addElement(append);
		}
	}

	addElement(append, element = null)  {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		let button = document.createElement("button");
		button.style.width = this.buttonSize.width+"px";
		button.style.height = this.buttonSize.height+"px";
		if(GUIManager.getConvertPixelToPercent() == true) {			
			if(append == true) {
				button.style.top = this.convertPixelToPercentHeight(this.buttonPosition.y + this.getCanvasOrigine().top)+"%";
				button.style.left = this.convertPixelToPercentWidth(this.buttonPosition.x + this.getCanvasOrigine().left)+"%";
			} else {
				button.style.top = (this.buttonPosition.y)+"px";
				button.style.left = (this.buttonPosition.x)+"px";
			}
		} else {
			if(append == true) {
				button.style.top = (this.buttonPosition.y + this.getCanvasOrigine().top)+signe;
				button.style.left = (this.buttonPosition.x + this.getCanvasOrigine().left)+signe;
			} else {
				button.style.top = this.buttonPosition.y+signe;
				button.style.left = this.buttonPosition.x+signe;
			}
		}
		button.innerHTML = this.value;
		button.style.position = "absolute";
		button.id = this.id;
		button.name = this.id;
		button.style.zIndex = this.zIndex;
		button.className = "GUIButton";
		button.tabindex = this.tabindex;		
		button.style.borderRadius = this.borderRadiusButton;
		if(this.imageButton != null) {
			button.style.backgroundImage = "url("+this.imageButton+")";
		} else {
			button.style.background = this.colorButton;
		}
		button.style.border = this.borderButton;
		button.style.color = this.colorText;
		button.onclick = this.onClickButton;

		if(append == true) {
			this.html.appendChild(button);
		} else {
			element.appendChild(button);
		}
		this.addGuiElements(button);
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
			this.buttonVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.buttonVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    }

    isVisible() {
		return this.buttonVisible;
    }

}