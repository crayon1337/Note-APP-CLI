//Importing necessary modules.
const notes = require('./notes')
const yargs = require('yargs')

/**
 * Register Yargs Commands
 * 
 * Add, Remove, Read and List
*/
yargs.command({
    command: 'add',
    describe: 'Adds a new note.',
    builder: {
        'title': {
            describe: 'Every note needs a title, right?',
            demandOption: true,
            type: 'string'
        },
        'body': {
            describe: 'Every note needs a body as well!',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body)
})

yargs.command({
    command: 'remove',
    describe: 'Removes a note by ID.',
    builder: {
        'id': {
            describe: 'In order to remove a note you have to provide an ID.',
            demandOption: true,
            type: 'int'
        }
    },
    handler: (argv) => notes.removeNote(argv.id)
})

yargs.command({
    command: 'read',
    describe: 'Reads a note by ID.',
    builder: {
        'id': {
            describe: 'In order to list a note you have to provide an ID.',
            demandOption: true,
            type: 'int'
        }
    },
    handler: (argv) => notes.readNote(argv.id)
})

yargs.command({
    command: 'list',
    describe: 'Lists all available notes.',
    handler: () => notes.getNotes()
})

//Init yargs.
yargs.parse()