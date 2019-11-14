// Adapted from caffeine@patapon.info

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
