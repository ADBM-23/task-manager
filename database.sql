create database task_manager;
use task_manager;

CREATE TABLE tasks (
    id INT auto_increment primary key,
    titulo VARCHAR(150) not null,
    descripcion text not null,
    estado enum("pendiente","en progreso","completada") not null,
    fecha_creacion DATETIME not null DEFAULT CURRENT_TIMESTAMP 
);

insert into tasks (titulo, descripcion, estado)
values ("Hacer ejercicio","Hacer series de 3 minutos en casa","pendiente"),
("Limpiar ventanas","Limpiar las ventanas de casa con liquidos para ventas","en progreso"),
("Pasear perro","Sacar a pasear a perro por 40 minutos","completada");

select * from tasks;