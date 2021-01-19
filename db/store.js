const util = require("util");
const fs = require("fs");

const idGenerator = require('uuid');

const readUserFile = util.promisify(fs.readFile);
const postUserFile = util.promisify(fs.writeFile);

class Store {

    read(){
        return readUserFile("db/db.json","utf8");
    }

    write(note){
        return postUserFile("db/db.json", JSON.stringify(note));
    }

    getNotes() {        
        return this.read().then((notes) => {
        let parsedNotes;

        try {
            parsedNotes = [].concat(JSON.parse(notes));
        }
        catch (err) {
            parsedNotes = [];
        }

        return parsedNotes;
    });
    }

    addNotes(note) {
        const {title,text} = note;

        if(!title || !text) {
            throw new Error ("Add 'title' and 'text' to save note");
        }

        const newNote = {title, text, id: idGenerator.v4()};

        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }

    removeNotes (id) {
        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !==id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Store ();