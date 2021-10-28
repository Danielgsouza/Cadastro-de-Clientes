'use strict'

const openModal = () =>{
    document.getElementById('modal').classList.add('active')
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dataClient')) ?? []

const setLocalStorage = (client) => localStorage.setItem('dataClient', JSON.stringify(client))

//CRUD
const deleteClient = (index) => {
    const dClient = readClient()
    dClient.splice(index, 1)
    setLocalStorage(dClient)
}
const updateClient = (index, client) => {
    const dClient = readClient()
    dClient[index] = client
    setLocalStorage(dClient)
}
const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dClient = getLocalStorage()
    dClient.push(client)
    setLocalStorage(dClient)
}

const isValidFields = () => {
    /*
    const nome = document.getElementById('nome').value
    const sobrenome =  document.getElementById('sobrenome').value
    const email = document.getElementById('email').value
    const celular = document.getElementById('celular').value

    if (nome != '' && sobrenome != '' && email != '' && celular != '') {
        return true
    }*/
    return document.getElementById('form').reportValidity()
}

//Interation Screen
const clearFields = () => {
     const fields = document.querySelectorAll('.modal-field')
     fields.forEach(field => field.value = '')
     document.getElementById('nome').dataset.index = 'new'
}

 const saveClient = () => {

    
    if (isValidFields()) {
        
        const client = {
              
            nome: document.getElementById('nome').value,
            sobrenome: document.getElementById('sobrenome').value, 
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value
            
        } 
            const index = document.getElementById('nome').dataset.index
        
            if (index == 'new') {
              createClient(client)
              updateTable()
              clearFields()
              closeModal()
            }else{
              updateClient(index, client)
              updateTable()
              clearFields()
              closeModal()
            }
    }     
       
 }

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
                        <td>${client.nome}</td>
                        <td>${client.sobrenome}</td>
                        <td>${client.email}</td>
                        <td>${client.celular}</td>
                        <td><button type="button" class="button green" id="edit-${index}" style="width: 50px; height: 50px; display:block; margin: 5px 10px "><i class="fas fa-edit"/></button></td>
                        <td><button type="button" class="button red" id="delete-${index}" style="width: 50px;height: 50px;"><i class="fas fa-trash"/></button></td>`

    document.querySelector('#myTable>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#myTable>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dClient = readClient()
    clearTable()
    dClient.forEach(createRow)
}

 const fillFields = (client) => {
     
     document.getElementById('nome').value = client.nome
     document.getElementById('sobrenome').value = client.sobrenome
     document.getElementById('email').value = client.email
     document.getElementById('celular').value = client.celular
     document.getElementById('nome').dataset.index = client.index
        
 }

const editClient = (index) => {

        const client = readClient()[index]
        client.index = index
        fillFields(client)
        openModal()
} 

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')
        
        if (action == 'edit') {
            editClient(index)

        }else{
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            } 
        }
    }  
}

updateTable()

//Events
 document.getElementById('btnOpenModal').addEventListener('click', openModal)

 document.getElementById('cancel').addEventListener('click', closeModal)

 document.getElementById('modalClose').addEventListener('click', closeModal)

 document.getElementById('btnSave').addEventListener('click', saveClient)

 document.querySelector('#myTable>tbody').addEventListener('click', editDelete)


 