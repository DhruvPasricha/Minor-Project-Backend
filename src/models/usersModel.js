const USER = {
    CREATE_USER: 'insert into users (name, email, password, dept_id) values (?, ?, ?, ?)',
    GET_USER_INFO_FROM_USER_ID: `
        select
            users.id as userId,
            users.name as userName,
            users.email as email,
            departments.name as deptName
        from
            users 
            inner join
            departments 
            on departments.id = users.dept_id 
        where
            users.id = ?
    `,
    GET_USER_INFO_FROM_EMAIL_ID: `
        select
            users.id as userId,
            users.name as userName,
            users.email as email,
            departments.name as deptName 
        from
            users 
            inner join
            departments 
            on departments.id = users.dept_id 
        where
            email = ?
    `,
};

export default USER;
