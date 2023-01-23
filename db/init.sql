create database fileio;

use fileio;

create table departments (
    id      int unsigned not null AUTO_INCREMENT,
    name    varchar(500) default null,
    primary key (id)
);

create table users (
    id              bigint unsigned not null AUTO_INCREMENT,
    name            varchar(255) default null,
    email           varchar(255) default null,
    password        varchar(255) default null,
    dept_id         int unsigned default null,
    created_at      timestamp default CURRENT_TIMESTAMP,
    primary key (id),
    constraint UQ_Users_Email unique (email),
    foreign key (dept_id) references departments(id)
);

create table files (
    id                  bigint unsigned not null AUTO_INCREMENT,
    subject             varchar(1000),
    created_by          bigint unsigned not null,
    created_at          timestamp default CURRENT_TIMESTAMP,
    status              enum('CREATED', 'DISPATCHED', 'RECEIVED', 'CLOSED') default 'CREATED',
    primary key (id),
    foreign key (created_by) references users(id)
);

create table file_history (
    file_id            bigint unsigned not null,
    action             enum('CREATED', 'DISPATCHED', 'RECEIVED', 'CLOSED'),
    action_done_by     bigint unsigned not null,
    action_done_for    bigint unsigned default null,
    action_done_at     timestamp default CURRENT_TIMESTAMP,
    foreign key (file_id) references files(id),
    foreign key (action_done_by) references users(id),
    foreign key (action_done_for) references users(id)
);
