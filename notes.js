const fs = require('fs')
const chalk = require('chalk')


//Defining log and error message color consts.
const log = console.log
const errorMsg = chalk.red.inverse.bold
const successMsg = chalk.green.inverse.bold
const infoMsg = chalk.magenta.inverse.bold

const getNotes = () => {
    const notes = loadNotes()

    notes.forEach((note) => log(infoMsg(`Title: ${note.title} Body: ${note.body}\nID: ${note.id}\n`)))
}

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const id = notes.length
    const duplicateNotes = notes.find((note) => note.title === title)

    if(!duplicateNotes) {
        notes.push({
            id: id,
            title: title,
            body: body
        })
        saveNotes(notes)
        log(successMsg('Note has been saved successfully'))
    }
    else
        log(errorMsg(`A note with the title (${title}) already exists.`))
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)

    fs.writeFileSync('notes.json', notesJSON)
}

const removeNote = (id) => {
    const notes = loadNotes()

    const filteredNotes = notes.filter((note) => note.id !== id)

    if(filteredNotes.length >= 0) {
        saveNotes(filteredNotes)
        log(successMsg(`Note with ID (${id}) has been removed!`))
    }
    else
        log(errorMsg('Could not find such a note. Make sure you typed the ID correctly'))
}

const readNote = (id) => {
    const notes = loadNotes()
    const matchingNote = notes.find((note) => note.id === id)

    if(matchingNote) {
        log(infoMsg(`Title: ${matchingNote.title}\nBody: ${matchingNote.body}\nID: ${matchingNote.id}`))
    } else 
        log(errorMsg(`Could not find a note with ID (${id})`))
}

module.exports = {
    'getNotes': getNotes,
    'addNote': addNote,
    'removeNote': removeNote,
    'readNote': readNote
}