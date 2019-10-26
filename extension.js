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

/* exported init */
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

let path = GLib.build_filenamev([Me.path + "/src/",  'mode.txt']);
let file = Gio.File.new_for_path(path);
let [success, contents] = file.load_contents(null);

var icon_name = (contents == 1) ? "weather-clear-symbolic" : "weather-clear-night-symbolic";

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

function enable() {
    let panelToggleButton = new toggleButton();
    Main.panel.addToStatusArea("should-be-a-unique-string", panelToggleButton);
    Main.panel.statusArea["should-be-a-unique-string"].actor.visible = false;
    Main.panel.statusArea["should-be-a-unique-string"].icon.icon_name = icon_name;
    Main.panel.statusArea["should-be-a-unique-string"].actor.visible = true;
}

function disable() {
    Main.panel.statusArea["should-be-a-unique-string"].destroy();
}

function init() {
}

function toggler() {
    let [success, contents] = file.load_contents(null);
    if (contents == 0) {
        settheme("Adwaita");
        if (GLib.mkdir_with_parents(file.get_parent().get_path(), PERMISSIONS_MODE) === 0) {
            let [success, tag] = file.replace_contents("1", null, false, Gio.FileCreateFlags.REPLACE_DESTINATION, null);
        }
        Main.panel.statusArea["should-be-a-unique-string"].icon.icon_name = "weather-clear-symbolic";
    }
    else {
        settheme("Adwaita-dark");
        if (GLib.mkdir_with_parents(file.get_parent().get_path(), PERMISSIONS_MODE) === 0) {
            let [success, tag] = file.replace_contents("0", null, false, Gio.FileCreateFlags.REPLACE_DESTINATION, null);
        }
        Main.panel.statusArea["should-be-a-unique-string"].icon.icon_name = "weather-clear-night-symbolic";
    }
}

function settheme(theme) {
    syscommand("gsettings set org.gnome.desktop.interface gtk-theme " + theme);
}

function syscommand(cmd) {
    GLib.spawn_command_line_sync( cmd, null, null, null, null );
}