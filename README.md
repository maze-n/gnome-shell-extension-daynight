<h2 align="center">daynight</h2>
<p align="center" size=44px><img src="https://raw.githubusercontent.com/maze-n/gnome-shell-extension-daynight/master/src/logo.png" width="130"></p>

<p align="center">A simple gnome-extension button on the GNOME's top panel to toggle between light / dark themes.</p>


 - The extension requires 'user themes' extension to change shell themes.

Get:
 - From https://extensions.gnome.org/extension/2302/daynight/

 Or
 
 - Create a folder in ~/.local/share/gnome-shell/extensions/ named "daynight@maze-n.github.com"
 - Download the repository
 - Extract the downloaded file to the created directory

Note: This extension currently assumes that your current theme's dark version is already installed and the dark theme's name is "-dark" appended to the original theme name (for example if the light theme is named 'Pop', the dark themes name is taken as 'Pop-dark').The theme is changed to Adwaita by gnome itself in case the dark theme is not found.