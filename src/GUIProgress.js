class GUIProgress extends GUIManager {

	constructor(id, options, guimanager, callback, append = true) {
		
		super();
		
		this.progress = null;
		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.progressPosition = {x:options.x, y:options.y};
		this.progressSize = {width:options.w, height:options.h};
		this.min = options.min || 0;
		this.max = options.max || 100;
		this.value = options.value || 0;		
		this.background = options.background || null;
		this.backgroundValue = options.backgroundValue || null;		
		this.zIndex = options.zIndex || 1;
		this.orient = options.orient || "horizontal"; // or "vertical"
		this.progressVisible = true;
		this.onchangeProgress = callback || "";
		this.tabindex = options.tabindex || 0;

		if(append == true) {
			this.addElement(append);
		}
	}

	addElement(append, element = null)  {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		this.progress = document.createElement("progress");
		this.progress.min = this.min;
		this.progress.max = this.max;
		this.progress.value = this.value;
		this.progress.style.width = this.progressSize.width+"px";
		this.progress.style.height = this.progressSize.height+"px";
		if(GUIManager.getConvertPixelToPercent() == true) {			
			if(append == true) {				
				this.progress.style.top = this.convertPixelToPercentHeight(this.progressPosition.y + this.getCanvasOrigine().top)+"%";
				this.progress.style.left = this.convertPixelToPercentWidth(this.progressPosition.x + this.getCanvasOrigine().left)+"%";
			} else {
				this.progress.style.top = (this.progressPosition.y)+"px";
				this.progress.style.left = (this.progressPosition.x)+"px";
			}
		} else {
			if(append == true) {
				this.progress.style.top = (this.progressPosition.y + this.getCanvasOrigine().top)+signe;
				this.progress.style.left = (this.progressPosition.x + this.getCanvasOrigine().left)+signe;
			} else {
				this.progress.style.top = (this.progressPosition.y)+signe;
				this.progress.style.left = (this.progressPosition.x)+signe;
			}
		}
		this.progress.style.position = "absolute";
		this.progress.id = this.id;
		this.progress.className = "GUIProgress";
		this.progress.tabindex = this.tabindex;
		this.progress.name = this.id;
		this.progress.style.zIndex = this.zIndex;
		if(this.orient == "vertical" || this.orient == "Vertical") {
			this.progress.style.writingMode = "bt-lr";
			this.progress.style.WebkitAppearance = "progress-vertical";
		}

		let cssProgress = "#"+this.id+" {"+			
			"background-color:"+this.background+";"+
		"} #"+this.id+"::after {"+			
			"background-color:"+this.backgroundValue+";"+
		"} #"+this.id+"::-webkit-progress-bar {"+			
			"background-color:"+this.background+";"+
		"} #"+this.id+"::-webkit-progress-value {"+			
			"background-color:"+this.backgroundValue+";"+
		"} #"+this.id+"::-moz-progress-bar {"+			
			"background-color:"+this.background+";"+
		"}";
		this.addStyle(cssProgress);		
		
		this.progress.onchange = this.onchangeProgress;

		if(append == true) {
			this.html.appendChild(this.progress);
		} else {
			element.appendChild(this.progress);
		}
		this.addGuiElements(this.progress);
    }

	updateValue(value) {
		this.progress.value = value;
	}

	getValue() {
		return this.progress.value;
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
			this.progressVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.progressVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    }

    isVisible() {
		return this.progressVisible;
    }

}