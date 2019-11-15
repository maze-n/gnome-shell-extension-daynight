// Adapted from caffeine@patapon.info

/* prefs.js
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

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const GObject = imports.gi.GObject;
const Config = imports.misc.config;

const Gettext = imports.gettext.domain('gnome-shell-extension-daynight');
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const Columns = {
    APPINFO: 0,
    DISPLAY_NAME: 1,
    ICON: 2
};

const daynightWidget = new Lang.Class({
    Name: 'daynightWidget',

    _init: function(params) {
        this.w = new Gtk.Grid(params);
        this.w.set_orientation(Gtk.Orientation.VERTICAL);
    }
});

function init() {
}

function buildPrefsWidget() {
    let widget = new daynightWidget();
    widget.w.show_all();

    return widget.w;
}
