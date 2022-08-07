const { nanoid } = require("nanoid")
const fs = require("fs/promises");
const path = require("path");


const contactsPath = path.join(__dirname, "db", "contacts.json");
 
const listContacts = async() => {
    try {
        const data = await fs.readFile(contactsPath)
        return JSON.parse(data)
    } catch (error) {
        console.error(error)
    }
}

const getContactById = async(contactId) => {
    try {
        const contacts = await listContacts();
        const result = contacts.find((item) => item.id === contactId);
        return result || null;
    } catch (error) {
        console.error(error);
    }
 
};

const addContact = async(name, email, phone) => {
    try {
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
    } catch (error) {
        console.error(error)
    }
    
}

const removeContact = async(contactId) => {
    try {
        const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if(idx === -1) {
        return null;
    }
  const [result] = contacts.splice(idx,  1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
    } catch (error) {
       console.error(error) 
    }
 }


module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}
