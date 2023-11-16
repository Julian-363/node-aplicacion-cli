const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function getContacts() {
    return fs.readFile(contactsPath, 'utf8')
        .then(data => JSON.parse(data))
        .catch(error => {
            console.error(error);
            throw error;
        });
}

function saveContacts(contacts) {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8')
        .catch(error => {
            console.error(error);
            throw error;
        });
}

function addContact(name, email, phone) {
    return getContacts()
        .then(contacts => {
            const newContact = {
                id: Date.now().toString(),
                name,
                email,
                phone
            };
            contacts.push(newContact);
            return saveContacts(contacts);
        });
}

function removeContact(contactId) {
    return getContacts()
        .then(contacts => {
            const updatedContacts = contacts.filter(c => c.id !== contactId);
            if (contacts.length === updatedContacts.length) {
                console.log(`Contact with ID ${contactId} not found.`);
                return;
            }
            return saveContacts(updatedContacts);
        });
}

module.exports = {
    getContacts,
    saveContacts,
    addContact,
    removeContact
};
