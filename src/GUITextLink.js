class GUITextLink extends GUIManager {

    GUITextLink(id, options, guimanager, append = true) {
			
		//super();
		
		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.textPosition = {x:options.x, y:options.y};
		this.textSize = options.size || 30;
		this.color = options.color || null;
		this.background = options.background || null;
		this.police = options.police || null;
		this.texte = options.text || "google.com";
		this.zIndex = options.zIndex || 1;
		this.bold = options.bold || null; // bold
		this.italic = options.italic || null; //italic
		this.position = options.position || "absolute";
		this.centerVertical = options.centerVertical || false;
		this.centerHorizontal = options.centerHorizontal || false;
		this.inline = options.inline || false;
		this.textVisible = true;
		this.textElement = null;
		this.font = null;
		this.href = options.href || "https:\/\/www.google.com";

		if(append == true) {
			this.addElement(append);
		}
	}

	addElement(append, element = null) {
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		this.font = this.textSize+"px "+this.police;
		this.textElement = document.createElement("a");
		if(this.inline == false) {
			this.textElement.style.width = "auto";
		} else {
			this.textElement.style.width = GUITextLink.getTextWidth(this.texte, this.font).w+"px";			
		}
		this.textElement.style.height = GUITextLink.getTextWidth(this.texte, this.font).h+"px";
		if(GUIManager.getConvertPixelToPercent() == true) {			
			if(append == true) {
				this.textElement.style.top = this.convertPixelToPercentHeight(this.textPosition.y + this.getCanvasOrigine().top)+"%";
				this.textElement.style.left = this.convertPixelToPercentWidth(this.textPosition.x + this.getCanvasOrigine().left)+"%";
			} else {
				this.textElement.style.top = (this.textPosition.y)+"px";
				this.textElement.style.left = (this.textPosition.x)+"px";
			}
		} else {
			if(append == true) {
				this.textElement.style.top = (this.textPosition.y + this.getCanvasOrigine().top)+signe;
				this.textElement.style.left = (this.textPosition.x + this.getCanvasOrigine().left)+signe;
			} else {
				this.textElement.style.top = this.textPosition.y+signe;
				this.textElement.style.left = this.textPosition.x+signe;
			}
		}			
		this.textElement.style.display = "block";
		this.textElement.style.position = this.position;
		this.textElement.style.font = this.font;
		this.textElement.style.color = this.color;
		this.textElement.style.background = this.background;
		this.textElement.style.fontStyle = this.italic;
		this.textElement.style.fontWeight = this.bold;
		this.textElement.innerHTML = this.texte;
		this.textElement.id = this.id;
		this.textElement.name = this.id;
		this.textElement.className = "GUITextLink";
		this.textElement.style.zIndex = this.zIndex;
		this.textElement.setAttribute('href', this.href);

		if(append == true) {
			if(this.centerVertical) {
				let marginTop = ((this.getCanvasSize().height / 2) - (GUITextLink.getTextWidth(this.texte, this.font).h / 2));
				this.textElement.style.top = (marginTop + this.getCanvasOrigine().top)+signe;
			}
			if(this.centerHorizontal) {
				let marginTotal = (this.getCanvasSize().width - GUITextLink.getTextWidth(this.texte, this.font).w);
				let marginLeft = (marginTotal / 2);
				this.textElement.style.left = (marginLeft + this.getCanvasOrigine().left)+signe;
			}
			this.html.appendChild(this.textElement);
		} else {
			if(this.centerVertical) {
				this.textElement.style.top = "calc(50% - "+(GUITextLink.getTextWidth(this.texte, this.font).h / 2)+"px)";
			}
			if(this.centerHorizontal == "true") {
				this.textElement.style.width = "100%";
				this.textElement.style.textAlign = "center";
			}
			element.appendChild(this.textElement);
		}
		this.addGuiElements(this.textElement);
    }

	updateText(texte){
		let signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		if(this.append == true) {
			this.textElement.style.width = GUITextLink.getTextWidth(texte, this.font).w+signe;
			this.textElement.style.height = GUITextLink.getTextWidth(texte, this.font).h+signe;
			this.textElement.style.top = (this.textPosition.y + this.getCanvasOrigine().top)+signe;
			this.textElement.style.left = (this.textPosition.x + this.getCanvasOrigine().left)+signe;
		} else {
			this.textElement.style.top = this.textPosition.y+signe;
			this.textElement.style.left = this.textPosition.x+signe;
		}
		if(this.centerVertical == "true") {
			let marginTop = ((this.getCanvasSize().height / 2) - (GUITextLink.getTextWidth(texte, this.font).h / 2));
			this.textElement.style.top = (marginTop + this.getCanvasOrigine().top)+signe;
		}
		if(this.centerHorizontal == "true") {
			let marginTotal = (this.getCanvasSize().width - GUITextLink.getTextWidth(texte, this.font).w);
			let marginLeft = (marginTotal / 2);
			this.textElement.style.left = (marginLeft + this.getCanvasOrigine().left)+signe;
		}
		this.textElement.innerHTML = texte;
	}

	static getTextWidth(texte, font){
		let tag = document.createElement("div");
		tag.style.position = "absolute";
		tag.style.left = "-999em";
		tag.style.display = "block";
		tag.style.whiteSpace = "nowrap";
		tag.style.font = font || this.textSize+"px "+this.police;
		tag.innerHTML = texte;
		document.body.appendChild(tag);
		let result = {w:tag.clientWidth+10,h:tag.clientHeight};
		document.body.removeChild(tag);
		return result;
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
			this.textVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.textVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    }

    isVisible() {
		return this.textVisible;
    }

}