class GUIPanel extends GUIManager {

    constructor(id, options, guimanager, callback, append = true) {
		
		super();
		
		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.divPosition = {x:options.x, y:options.y};
		this.divSize = {width:options.w, height:options.h};
		this.divVisible = false;
		this.overflow = options.overflow || "auto";
		this.borderRadiusDiv = options.borderRadiusPanel || "10px";
		this.imageDiv = options.backgroundImage || null;
		this.colorDiv = options.backgroundColor || null;
		this.borderDiv = options.borderPanel || null;
		this.position = options.position || "absolute";
		this.zIndex = options.zIndex || 1;

		if(append == true) {
			this.addElement(append);
		}
	}

	addElement(append, element = null)  {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		let div = document.createElement("div");
		if(this.divSize.width > 0 || this.divSize.height > 0) {
			div.style.width = this.divSize.width+"px";
			div.style.height = this.divSize.height+"px";
		}
		if(GUIManager.getConvertPixelToPercent() == true) {
			if(append == true) {
				if(this.divPosition.x > 0) {
					div.style.left = this.convertPixelToPercentWidth(this.divPosition.x + this.getCanvasOrigine().left)+"%";
				}
				if(this.divPosition.y > 0) {
					div.style.top = this.convertPixelToPercentHeight(this.divPosition.y + this.getCanvasOrigine().top)+"%";
				}
			} else {
				if(this.divPosition.x > 0) {
					div.style.marginLeft = this.convertPixelToPercentWidth(this.divPosition.x)+"%";
				}
				if(this.divPosition.y > 0) {
					div.style.marginTop = this.convertPixelToPercentHeight(this.divPosition.y)+"%";
				}
			}
		} else {			
			if(append == true) {
				if(this.divPosition.x > 0) {
					div.style.left = (this.divPosition.x + this.getCanvasOrigine().left)+signe;
				}
				if(this.divPosition.y > 0) {
					div.style.top = (this.divPosition.y + this.getCanvasOrigine().top)+signe;
				}
			} else {
				if(this.divPosition.x > 0) {
					div.style.marginLeft = this.divPosition.x+signe;
				}
				if(this.divPosition.y > 0) {
					div.style.marginTop = this.divPosition.y+signe;
				}
			}
		}
		div.id = this.id;
		div.name = this.id;
		div.className = "GUIPanel";
		div.style.position = this.position;
		div.style.overflow = this.overflow;
		div.style.zIndex = this.zIndex;
		div.style.backgroundImage = "url("+this.imageDiv+")";
		div.style.backgroundColor = this.colorDiv;
		div.style.borderRadius = this.borderRadiusDiv;
		div.style.border = this.borderDiv;
		div.style.display = "none";

		if(append == true) {
			this.html.appendChild(div);
		} else {
			element.appendChild(div);
		}
		this.addGuiElements(div);
    }

	add(element)
	{
		let contentPanel = this.getElementById(this.id);
		contentPanel.style.zIndex = this.zIndex + 1;
		element.addElement(false, contentPanel);
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
			this.divVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.divVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display;}
    }

    isVisible() {
		return this.divVisible;
    }
	
}