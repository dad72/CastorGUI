var guiElements = [], GUIstyle = null, GUItheme = null;

class GUIManager {
	
	constructor(canvas, css, options) {
		this.canvasCss = css;
		this.canvas = canvas;
		this.groups = [];
		this.pixelToPercent = false;
		this.guiVisible = true;		
		if(options) {
			this.pixel = options.pixel;
			this.themeRoot = options.themeRoot || "";
			this.theme = options.themeGUI || "default";
		} else {
			this.pixel = true;
			this.themeRoot = "";
			this.theme = "default";
		}			
		this.head = document.head || document.getElementsByTagName('head')[0] || null;
		this.html = document.body || document.getElementsByTagName('body')[0];
		if(this.head == null) {
			this.header = document.createElement('head');
			this.head.appendChild(this.header);
		}
		this.addStyle(this.canvasCss, options, this.theme);
    }
	
	makeContainerSVG() {	
		let ns = "http:\/\/www.w3.org/2000/svg";
		this.svgElement = document.createElement("svg");		
		this.svgElement.xmlns = ns;
		this.svgElement.style.width = this.getCanvasSize().width;
		this.svgElement.style.height = this.getCanvasSize().height;		
		this.html.appendChild(this.svgElement);			
		this.foreignObjectElement = document.createElementNS(ns, "foreignObject");
		this.foreignObjectElement.style.width = "100%";
		this.foreignObjectElement.style.height = "100%";
		this.foreignObjectElement.setAttribute("height", 300);
		this.foreignObjectElement.setAttribute("width", 300);
		this.foreignObjectElement.id = "GUISVG";		
		this.svgElement.appendChild(this.foreignObjectElement);		
	}
	
	addGUIContainerOnSVG(element) {
		let ctx = this.canvas.getContext("2d");
		let DOMURL = self.URL || self.webkitURL || self;
		let img = new Image();		
		this.elementSVG = this.getElementById("GUISVG");
		this.elementSVG.appendChild(element.textElement);		
		this.data = this.elementSVG.childNodes;
		let svg = new Blob([this.data], {type: "image/svg+xml;charset=utf-8"});
		let url = DOMURL.createObjectURL(svg);
		img.onload = function() {
			ctx.drawImage(img, 0, 0);
			DOMURL.revokeObjectURL(url);
		};
		img.src = url;		
	}	

	addGuiElements(elem) {
		guiElements.push(elem);
	}
	
	static setConvertPixelToPercent(value) {
		this.pixelToPercent = value;
	}
	
	static getConvertPixelToPercent() {
		return this.pixelToPercent;
	}
	
	convertPixelToPercentWidth(pixel)
	{
		let screenWidth = window.innerWidth;
		let valueWidth = (pixel / screenWidth) * 100;
		return valueWidth;
	}
	
	convertPixelToPercentHeight(pixel)
	{
		let screenHeight = window.innerHeight;		
		let valueHeight = (pixel / screenHeight) * 100;
		return valueHeight;
	}
	
	addStyle(css, options, theme)
	{
		if(css) {
			// CSS
			if(GUIstyle == null) {				
				GUIstyle = document.createElement('style');
				GUIstyle.type = 'text/css';
				GUIstyle.media = 'screen';
				GUIstyle.id = "styleGUI";		
				if (GUIstyle.styleSheet){
					GUIstyle.styleSheet.cssText = this.canvasCss;
				} else {
					GUIstyle.appendChild(document.createTextNode(this.canvasCss));
				}
				this.head.appendChild(GUIstyle);
			}
		}
		if(theme && options) {
			//Theme
			if(GUItheme == null) {				
				GUItheme = document.createElement('link');
				GUItheme.type = 'text/css';
				GUItheme.rel = 'stylesheet';
				GUItheme.media = 'screen';
				GUItheme.id = "themeGUI";
				GUItheme.href = this.themeRoot+"themesGUI/"+theme+".css";
				this.head.appendChild(GUItheme);
			}
		}
	}
	
	fadeOut(el) {
		if(el) {
			el.style.opacity = 1;
			(function fade_moin() {
				if ((el.style.opacity -= 0.1) < 0.1) {
					el.style.display = "none";
					el.style.opacity = 0;
				} else if(el.style.opacity > 0) {
					requestAnimationFrame(fade_moin);
				}
			})();
		}
	}

	fadeIn(el){
		if(el) {
			el.style.opacity = 0;
			el.style.display = "block";
			(function fade_plus() {
				let val = parseFloat(el.style.opacity);
				if (!((val += 0.1) > 0.9)) {
					el.style.opacity = 1;
					requestAnimationFrame(fade_plus);
				}
			})();
		}
	}

	getElementById(id) {
		return document.getElementById(id);
    }

	getCanvasOrigine() {
		let canvas = document.getElementsByTagName('canvas')[0];		
        let offsets = canvas.getBoundingClientRect();
		let offsetsTop = offsets.top || 0;
		let offsetsLeft = offsets.left || 0;
		return {top:offsetsTop, left:offsetsLeft};
    }

	getCanvasSize() {
		let canvas = document.getElementsByTagName('canvas')[0];
		let offsets = canvas.getBoundingClientRect();
		let offsetsWidth = offsets.width || 0;
		let offsetsHeight = offsets.height || 0;
		return {width:offsetsWidth, height:offsetsHeight};
	}

    dispose() {
		guiElements.forEach((e) => {
			if(this.getElementById(e.id)) {
				this.html.removeChild(this.getElementById(e.id));
			}
		});
		return;
    }

    setVisible(bool, fade) {
		let display = null;
		if(fade == undefined) fade = true;
		let element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.guiVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.guiVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) {
			guiElements.forEach((e) => {
				this.getElementById(e.id).style.display = display;
			});
		}
    }

	isVisible() {
		return this.guiVisible;
    }

}