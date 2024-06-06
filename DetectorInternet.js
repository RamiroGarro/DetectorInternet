//Función para mostrar el toast cuando sea necesario por unos segundos.
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

//Esta función sirve para detectar si está conectado a la red y activar o desactivar los objetos.
function updateUI(isOnline) {
    //Aquí obtiene todos los objetos link, button, audio y video y los almacena.
    const links = document.querySelectorAll('.link');
    const buttons = document.querySelectorAll('button[type="submit"]');
    const audios = document.querySelectorAll('audio');
    const videos = document.querySelectorAll('video');

    //Aquí valida si la página está online y activa o desactiva los objetos.
    links.forEach(link => link.style.pointerEvents = isOnline ? 'auto' : 'none');
    buttons.forEach(button => button.disabled = !isOnline);
    audios.forEach(audio => isOnline ? audio.play() : audio.pause());
    videos.forEach(video => isOnline ? video.play() : video.pause());
}

//Esta función lo que hace es establecer en la variable isOnline true o false si está o no conectado.
//Además muestra o no el toast activando la función que corresponde con el mensaje que deba mostrar.
//Por último llama a la función updateUI para activar o desactivar los objetos, pasandole la variable isOnline.
function handleConnectionChange() {
    const isOnline = navigator.onLine;
    if (isOnline) {
        showToast('Conexión restaurada');
    } else {
        showToast('Conexión perdida');
    }
    updateUI(isOnline);
}

//Aquí agregamos los EventListener para detectar si se carga la página, si está online y si está offline y ejecutar
//la función correspondiente.
window.addEventListener('load', handleConnectionChange);
window.addEventListener('online', handleConnectionChange);
window.addEventListener('offline', handleConnectionChange);
