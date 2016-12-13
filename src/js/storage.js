const NOTES = 'notes';
const LAST_ID = 'last_id';
let storage = {};

/**
 * Retrieves all of the current notes saved in local storage
 * @type public
 * @return {Array} notes all of the saved notes
 */
storage.getNotes = function() {
  return JSON.parse(localStorage.getItem(NOTES));
};

/**
 * Retrieves a specific note
 * @type public
 * @param  {Int} id   The ID of the note you want
 * @return {Object}   the found note or undefined
 */
storage.getNote = function( id ) {
  const notes = storage.getNotes();

  // find the note we're looking for
  if(notes) {
    return notes.find( note => parseInt(note.id) === parseInt(id) );
  }

  return;
};

/**
 * Saves a note object to local storage
 * @type public
 * @param  {Object} note The note you wish to save
 * @return {Object}      the note you just saved
 */
storage.saveNote = function( note ) {
  let notes = storage.getNotes();
  let lastId = JSON.parse( localStorage.getItem(LAST_ID) );

  if(note) {
    let existingNote = this.getNote( note.id );

    // check to see if this is an existing note
    if( existingNote ) {
      const notesIdArray = notes.map(note => note.id);
      const indx = notesIdArray.indexOf(existingNote.id);

      // update existing note
      notes[indx] = note;
      localStorage.setItem( NOTES, JSON.stringify(notes) );
    }else{

      // save the new note
      if(notes && notes.length) {
        notes.push(note);
      }else{
        notes = [note];
      }

      localStorage.setItem( NOTES, JSON.stringify(notes) );

      // update the last id
      localStorage.setItem( LAST_ID, lastId + 1 );
    }
  }

  return note;
};

/**
 * Retrieves a new ID
 * @return {Number} ID
 */
storage.getNewId = function() {
  let lastId = JSON.parse( localStorage.getItem(LAST_ID) );
  return lastId + 1;
}

export default storage;
