const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const GObject = imports.gi.GObject;
const Config = imports.misc.config;

const Gettext = imports.gettext.domain('gnome-shell-extension-caffeine');
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const ThemetogglerWidget = new Lang.Class({
    Name: 'ThemetogglerWidget',

    _init: function() {
        this.outbox = new Gtk.Box();
        this.outbox.set_orientation(Gtk.Orientation.VERTICAL);
        this.outbox.spacing = 50;
        this.outbox.xalign = Gtk.Align.CENTER;

        this.listbox = new Gtk.ListBox();
        this.listbox.padding = 10;
        this.listbox.xalign = Gtk.Align.CENTER;
        this.listbox.set_selection_mode(Gtk.SelectionMode.NONE);
        this.outbox.pack_start(this.listbox, true, true, 0);

        this.row = new Gtk.ListBoxRow();
        this.hbox = new Gtk.Box();
        this.hbox.set_orientation(Gtk.Orientation.HORIZONTAL);
        this.hbox.spacing = 10;
        this.modelabel1 = new Gtk.Label();
        this.modelabel1.label = "Light Mode:";
        this.modelabel1.xalign = Gtk.Align.CENTER;
        this.vbox1 = new Gtk.Box();
        this.vbox1.set_orientation(Gtk.Orientation.VERTICAL);
        this.vbox1.spacing = 5;
        this.label1 = new Gtk.Label();
        this.label1.label = "GTK Theme";
        this.label1.xalign = Gtk.Align.CENTER;
        this.combo1 = new Gtk.ComboBoxText();
        this.combo1.insert(0, "0", "Adwaita");
        this.combo1.insert(1, "1", "Adwaita-dark");
        this.vbox1.pack_start(this.label1, true, true, 0);
        this.vbox1.pack_start(this.combo1, false, true, 0);
        this.vbox2 = new Gtk.Box();
        this.vbox2.set_orientation(Gtk.Orientation.VERTICAL);
        this.vbox2.spacing = 5;
        this.label2 = new Gtk.Label();
        this.label2.label = "Shell Theme";
        this.label2.xalign = Gtk.Align.CENTER;
        this.combo2 = new Gtk.ComboBoxText();
        this.combo2.insert(0, "0", "Adwaita");
        this.combo2.insert(1, "1", "Adwaita-dark");
        this.vbox2.pack_start(this.label2, true, true, 0);
        this.vbox2.pack_start(this.combo2, false, true, 0);
        this.hbox.pack_start(this.modelabel1, true, true, 0);
        this.hbox.pack_start(this.vbox1, true, true, 0);
        this.hbox.pack_start(this.vbox2, true, true, 0);
        this.row.add(this.hbox);

        this.listbox.add(this.row);

        this.row = new Gtk.ListBoxRow();
        this.hbox = new Gtk.Box();
        this.hbox.set_orientation(Gtk.Orientation.HORIZONTAL);
        this.hbox.spacing = 10;
        this.modelabel1 = new Gtk.Label();
        this.modelabel1.label = "Dark Mode:";
        this.modelabel1.xalign = Gtk.Align.CENTER;
        this.vbox1 = new Gtk.Box();
        this.vbox1.set_orientation(Gtk.Orientation.VERTICAL);
        this.vbox1.spacing = 5;
        this.combo1 = new Gtk.ComboBoxText();
        this.combo1.insert(0, "0", "Adwaita");
        this.combo1.insert(1, "1", "Adwaita-dark");
        this.vbox1.pack_start(this.combo1, false, true, 0);
        this.vbox2 = new Gtk.Box();
        this.vbox2.set_orientation(Gtk.Orientation.VERTICAL);
        this.vbox2.spacing = 5;
        this.combo2 = new Gtk.ComboBoxText();
        this.combo2.insert(0, "0", "Adwaita");
        this.combo2.insert(1, "1", "Adwaita-dark");
        this.vbox2.pack_start(this.combo2, false, true, 0);
        this.hbox.pack_start(this.modelabel1, true, true, 0);
        this.hbox.pack_start(this.vbox1, true, true, 0);
        this.hbox.pack_start(this.vbox2, true, true, 0);
        this.row.add(this.hbox);

        this.listbox.add(this.row);

    }
});

function init() {

}

function buildPrefsWidget() {
    let widget = new ThemetogglerWidget();
    widget.outbox.show_all();

    return widget.outbox;
}