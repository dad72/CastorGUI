# CastorGUI Theme

To add a theme you must add the folder (themesGUI) in your project, either in the same folder where the libraries, or another folder. You will need to add options to reference the path of the theme and the theme file to use.

## Quick overview of use

```javascript
var canvasGame = document.getElementById("game");
var cssGUI = "button {cursor:pointer;}";
var optionsGUI = {themeRoot: "../style/", themeGUI: "default"};
var guisystem = new CASTORGUI.GUIManager(canvasGame, cssGUI, optionsGUI);
```