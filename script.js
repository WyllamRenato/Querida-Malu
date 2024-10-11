// Carregar as mensagens salvas ao carregar a página
window.onload = function() {
    loadMessages();
};

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageArea = document.getElementById('messageArea');

    if (messageInput.value.trim() !== "") {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();

        const messageData = { message: messageInput.value, date: formattedDate };
        appendMessage(messageData);

        saveMessage(messageData);  // Salva a mensagem no LocalStorage
        messageInput.value = '';  // Limpa o campo de entrada
    }
}

function saveMessage(messageData) {
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(messageData);
    localStorage.setItem('messages', JSON.stringify(messages));
}

function loadMessages() {
    const messageArea = document.getElementById('messageArea');
    let messages = JSON.parse(localStorage.getItem('messages')) || [];

    messages.forEach(msg => {
        appendMessage(msg);
    });
}

function appendMessage(messageData) {
    const messageArea = document.getElementById('messageArea');

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';

    const messageText = document.createElement('p');
    messageText.textContent = messageData.message;

    const dateDiv = document.createElement('div');
    dateDiv.className = 'date';
    dateDiv.textContent = messageData.date;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Apagar';
    deleteButton.onclick = function() {
        deleteMessage(messageData);
    };

    messageDiv.appendChild(messageText);
    messageDiv.appendChild(dateDiv);
    messageDiv.appendChild(deleteButton);
    messageArea.appendChild(messageDiv);
}

function deleteMessage(messageData) {
    const password = document.getElementById('adminPassword').value;

    // Verifique a senha antes de permitir a exclusão
    if (password === 'principessa1407') {  // Substitua 'minhaSenhaSecreta' pela sua senha
        let messages = JSON.parse(localStorage.getItem('messages')) || [];

        // Remove a mensagem específica
        messages = messages.filter(msg => !(msg.message === messageData.message && msg.date === messageData.date));
        localStorage.setItem('messages', JSON.stringify(messages));

        // Recarrega as mensagens após exclusão
        document.getElementById('messageArea').innerHTML = '';
        loadMessages();
    } else {
        alert('Senha incorreta! Apenas o administrador pode apagar mensagens.');
    }
}
