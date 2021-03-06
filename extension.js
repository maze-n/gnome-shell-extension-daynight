/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

 'use strict';

const ByteArray = imports.byteArray;
const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const PanelMenu = imports.ui.panelMenu;

const PERMISSIONS_MODE = 0o744;
const Me = imports.misc.extensionUtils.getCurrentExtension();

const GTKSCHEMA_KEY = "org.gnome.desktop.interface";
const SHELLSCHEMA_KEY = "org.gnome.shell.extensions.user-theme";

let path = GLib.build_filenamev([Me.path + "/src/",  'mode.txt']);
let file = Gio.File.new_for_path(path);
let [success, contents] = file.load_contents(null);

let gtk_settings = new Gio.Settings({ schema: GTKSCHEMA_KEY });
let shell_settings = new Gio.Settings({ schema: SHELLSCHEMA_KEY });

let cur_theme = gtk_settings.get_string("gtk-theme");
let gtk_lightTheme = toLight(gtk_settings.get_string("gtk-theme"));
let gtk_darkTheme = toDark(gtk_settings.get_string("gtk-theme"));
let shell_lightTheme = toLight(shell_settings.get_string("name"));
let shell_darkTheme = toDark(shell_settings.get_string("name"));

if (cur_theme == gtk_lightTheme) {
    var icon_name = "weather-clear-symbolic";
} else {
    var icon_name = "weather-clear-night-symbolic";
}

const toggleButton = new Lang.Class({
    Name: "toggleButton",
    Extends: PanelMenu.Button,
        
    _init: function () {
    this.parent(null, "toggleButton");
        
    this.icon = new St.Icon({
        icon_name: "togglerIcon",
        style_class: "system-status-icon"
    });
    this.actor.add_actor(this.icon);
    this.actor.connect('button-press-event', toggler);    
    }
});

function isDark(themeName) {
    return themeName.indexOf('-dark') !== -1;
}
  
function toLight(themeName) {
  return themeName.replace("-dark", "");
}

function toDark(themeName) {
  return isDark(themeName) ? themeName : themeName + "-dark";
}

function enable() {
    let panelToggleButton = new toggleButton();
    Main.panel.addToStatusArea("daynight@maze-n.github.com", panelToggleButton);
    Main.panel.statusArea["daynight@maze-n.github.com"].actor.visible = false;
    Main.panel.statusArea["daynight@maze-n.github.com"].icon.icon_name = icon_name;
    Main.panel.statusArea["daynight@maze-n.github.com"].actor.visible = true;
}

function disable() {
    Main.panel.statusArea["daynight@maze-n.github.com"].destroy();
}

function init() {
}

function toggler() {

    let [success, contents] = file.load_contents(null);

    gtk_lightTheme = toLight(gtk_settings.get_string("gtk-theme"));
    gtk_darkTheme = toDark(gtk_settings.get_string("gtk-theme"));
    shell_lightTheme = toLight(shell_settings.get_string("name"));
    shell_darkTheme = toDark(shell_settings.get_string("name"));
    
    if (contents == 0) {
        settheme(gtk_lightTheme, shell_lightTheme);
        if (GLib.mkdir_with_parents(file.get_parent().get_path(), PERMISSIONS_MODE) === 0) {
            let [success, tag] = file.replace_contents("1", null, false, Gio.FileCreateFlags.REPLACE_DESTINATION, null);
        }
        Main.panel.statusArea["daynight@maze-n.github.com"].icon.icon_name = "weather-clear-symbolic";
    } else {
        settheme(gtk_darkTheme, shell_darkTheme);
        if (GLib.mkdir_with_parents(file.get_parent().get_path(), PERMISSIONS_MODE) === 0) {
            let [success, tag] = file.replace_contents("0", null, false, Gio.FileCreateFlags.REPLACE_DESTINATION, null);
        }
        Main.panel.statusArea["daynight@maze-n.github.com"].icon.icon_name = "weather-clear-night-symbolic";
    }
}

function settheme(gtk_theme, shell_theme) {
    syscommand("gsettings set org.gnome.desktop.interface gtk-theme " + gtk_theme);
    syscommand("gsettings set org.gnome.shell.extensions.user-theme name " + shell_theme);
}

function syscommand(cmd) {
    GLib.spawn_command_line_sync( cmd, null, null, null, null );
}