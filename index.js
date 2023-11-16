const { getContacts, saveContacts } = require('./contacts');
const { program } = require('commander');

program.version('1.0.0');

// Comando para listar los contactos
program
    .command('list')
    .description('Listar todos los contactos')
    .action(() => {
        getContacts()
            .then((contacts) => console.log('Contactos actuales:', contacts))
            .catch((error) => console.error('Error:', error));
    });

// Comando para agregar un nuevo contacto
program
    .command('add')
    .description('Agregar un nuevo contacto')
    .requiredOption('--id <id>', 'ID del contacto')
    .requiredOption('--name <name>', 'Nombre del contacto')
    .requiredOption('--email <email>', 'Email del contacto')
    .requiredOption('--phone <phone>', 'Teléfono del contacto')
    .action(({ id, name, email, phone }) => {
        const newContact = {
            id,
            name,
            email,
            phone,
        };
        getContacts()
            .then((contacts) => {
                contacts.push(newContact);
                return saveContacts(contacts);
            })
            .then(() => console.log('Contacto agregado correctamente.'))
            .catch((error) => console.error('Error:', error));
    });

// Comando para obtener un contacto por su ID
program
    .command('get')
    .description('Obtener un contacto por su ID')
    .requiredOption('--id <id>', 'ID del contacto')
    .action(({ id }) => {
        getContacts()
            .then((contacts) => {
                const contact = contacts.find((c) => c.id === id);
                if (contact) {
                    console.log('Contacto encontrado:', contact);
                } else {
                    console.log('No se encontró ningún contacto con ese ID.');
                }
            })
            .catch((error) => console.error('Error:', error));
    });

// Comando para eliminar un contacto por su ID
program
    .command('delete <id>')
    .description('Eliminar un contacto por su ID')
    .action((id) => {
        getContacts()
            .then((contacts) => {
                const filteredContacts = contacts.filter((c) => c.id !== id);
                if (filteredContacts.length === contacts.length) {
                    console.log('No se encontró ningún contacto con ese ID.');
                } else {
                    return saveContacts(filteredContacts);
                }
            })
            .then(() => console.log('Contacto eliminado correctamente.'))
            .catch((error) => console.error('Error:', error));
    });

program.parse(process.argv);