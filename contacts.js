const { nanoid } = require("nanoid")
const fs = require("fs/promises");
const path = require("path");
const { fchmod } = require("fs");

const contactsPath = path.join(__dirname, "db", "contacts.json");
 
const listContacts = async() => {
    try {
        const data = await fs.readFile(contactsPath)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

const getContactById = async(contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const addContact = async(name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if(idx === -1) {
        return null;
    }
  const [result] = contacts.splice(idx,  1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
 }

// function addContact(name, email, phone) {
//   // ...твій код
// }
module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}
