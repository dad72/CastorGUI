class GUITexture extends GUIManager {
	
    constructor(id, imageUrl, options, guimanager, callback, append = true) {

	    super();
		
		this.id = id;
		this.imageUrl = imageUrl;
		this.textureClicked = callback || false;
		this.imageSize = {width:options.w, height:options.h};
		this.imagePosition = {x:options.x, y:options.y};
		this.imageVisible = true;
		this.zIndex = options.zIndex || 1;
		this.html = document.body || document.getElementsByTagName('body')[0];

		if(append == true) {
			this.addElement(append);
		}
	}

	addElement(append, element = null)  {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		let img = document.createElement("img");
		img.src = this.imageUrl;
		img.style.width = this.imageSize.width+"px";
		img.style.height = this.imageSize.height+"px";
		if(GUIManager.getConvertPixelToPercent() == true) {			
			if(append == true) {
				img.style.top = this.convertPixelToPercentHeight(this.imagePosition.y + this.getCanvasOrigine().top)+"%";
				img.style.left = this.convertPixelToPercentWidth(this.imagePosition.x + this.getCanvasOrigine().left)+"%";
			} else {
				img.style.top = (this.imagePosition.y)+"px";
				img.style.left = (this.imagePosition.x)+"px";
			}
		} else {
			if(append == true) {
				img.style.top = (this.imagePosition.y + this.getCanvasOrigine().top)+signe;
				img.style.left = (this.imagePosition.x + this.getCanvasOrigine().left)+signe;
			} else {
				img.style.top = this.imagePosition.y+signe;
				img.style.left = this.imagePosition.x+signe;
			}
		}
		img.style.position = "absolute";
		img.style.zIndex = this.zIndex;
		img.id = this.id;
		img.name = this.id;
		img.className = "GUITexture";
		if(this.textureClicked) {
			let that = this;
			img.addEventListener('click', that.textureClicked, false);
        }

		if(append == true) {
			this.html.appendChild(img);
		} else {
			element.appendChild(img);
		}
		this.addGuiElements(img);
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
			this.imageVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.imageVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    }

    isVisible() {
		return this.imageVisible;
    }

}