var formulario = document.getElementById('formulario');
var haceres = document.getElementById('haceres');
var listaTareas = [];

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    var tareas = document.getElementById('tareas').value.trim();
    if (tareas !== '') {
        listaTareas.push(tareas);
        var elementoDiv = document.createElement('div');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                elementoDiv.classList.add('completada');
            } else {
                elementoDiv.classList.remove('completada');
            }
        });
        elementoDiv.appendChild(checkbox);
        var label = document.createElement('label');
        label.textContent = tareas;
        elementoDiv.appendChild(label);
        var botonBorrar = document.createElement('button');
        botonBorrar.setAttribute('class', 'borrar')
        botonBorrar.addEventListener('click', function() {
            var index = listaTareas.indexOf(tareas);
            if (index !== -1) {
                listaTareas.splice(index, 1);
            }
            haceres.removeChild(elementoDiv);
        });
        elementoDiv.appendChild(botonBorrar);
        haceres.appendChild(elementoDiv);
        formulario.reset(); 
    }
});

function cargarTareasGuardadas() {
    if (localStorage.getItem('listaTareas')) {
        listaTareas = JSON.parse(localStorage.getItem('listaTareas'));
        listaTareas.forEach(function(tarea) {
            var elementoDiv = document.createElement('div');
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    elementoDiv.classList.add('completada');
                } else {
                    elementoDiv.classList.remove('completada');
                }
            });
            elementoDiv.appendChild(checkbox);
            var label = document.createElement('label');
            label.textContent = tarea;
            elementoDiv.appendChild(label);
            var botonBorrar = document.createElement('button');
            botonBorrar.textContent = 'Borrar';
            botonBorrar.addEventListener('click', function() {
                var index = listaTareas.indexOf(tarea);
                if (index !== -1) {
                    listaTareas.splice(index, 1);
                    localStorage.setItem('listaTareas', JSON.stringify(listaTareas));
                }
                haceres.removeChild(elementoDiv);
            });
            elementoDiv.appendChild(botonBorrar);
            haceres.appendChild(elementoDiv);
        });
    }
}

function guardarTareas() {
    localStorage.setItem('listaTareas', JSON.stringify(listaTareas));
}

cargarTareasGuardadas();
window.addEventListener('beforeunload', function() {
    guardarTareas();
});