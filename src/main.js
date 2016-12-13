/* eslint-disable no-unused-vars */

import NotesList from './components/NotesList.html';
import NoteEditor from './components/NoteEditor.html';
import storage from './js/storage.js';

const notesList = new NotesList({
  target: document.querySelector('#notes-list'),
  data: {
    notes: storage.getNotes()
  }
});

const noteEditor = new NoteEditor({
  target: document.querySelector('#note-editor')
});

/**
 * Triggered when a note is selected from the NotesList component
 * @type {EventListener}
 */
notesList.on('select', function({ note }) {
  noteEditor.set({note: note});
});

/**
 * Triggered when the new button is clicked from the NotesList component
 * @type {EventListener}
 */
notesList.on('new', function() {
  noteEditor.set({
    note: {
      id: storage.getNewId(),
      title: 'Untitled',
      body: ''
    }
  });
});

/**
 * Triggered when the save button is clicked from the NoteEditor component
 * @type {EventListener}
 */
noteEditor.on('saved', function({ note }) {
  storage.saveNote(note); // saves the new note to local storage
  notesList.set({ notes: storage.getNotes() }); // resets the notes list
});
