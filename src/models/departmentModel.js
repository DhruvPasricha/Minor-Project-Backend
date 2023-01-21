const DEPARTMENT = {
    CREATE_DEPARTMENT: 'insert into departments (name) values (?)',
    GET_DEPARTMENT_NAME_FROM_ID: 'select * from departments where id = ?',
    GET_DEPARTMENT_ID_FROM_NAME : 'select id from departments where name = ?'
};

export default DEPARTMENT;
