class GUIGroup extends GUIManager {

   constructor(name, options, guimanager) {

		super();
		
		this.html = document.body || document.getElementsByTagName('body')[0];
		if(options) { this.groupPosition = {x:options.x, y:options.y} }
		this.guiManager = guimanager;
        this.name = name;
        this.elementsGoup = [];
        this.guiManager.groups.push(this);
		this.groupVisible = true;
    }

	add(guiElement) {
        this.elementsGoup.push(guiElement);
    }

    dispose() {
       this.elementsGoup.forEach((e) => {
			if(that.getElementById(e.id)) {
				this.html.removeChild(this.getElementById(e.id));
			}
		});
		return;
    }

	setVisible(bool) {
		let display = null;		
		if(bool == true) {
			display = "block";
			this.groupVisible = true;
		} else {
			display = "none";
			this.groupVisible = false;
		}
		this.elementsGoup.forEach((e) => {
			this.getElementById(e.id).style.display = display;
		});
		return;
    }

    isVisible() {
		return this.groupVisible;
    }

}
