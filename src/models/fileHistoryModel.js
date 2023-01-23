const FILE_HISTORY = {
    CREATE_FILE: `
        insert into
        file_history 
        (file_id, action, action_done_by)
        values ((select max(id) from files where created_by = ?), 'CREATED', ?)
    `,
    DISPATCH_FILE: `
        insert into
        file_history (file_id, action, action_done_by, action_done_for)
        values (?, 'DISPATCHED', ?, ?)
    `,
    RECEIVE_FILE: `
        insert into
        file_history (file_id, action, action_done_by, action_done_for)
        values (?, 'RECEIVED', ?, ?)
    `,
    CLOSE_FILE: `
        insert into
        file_history (file_id, action, action_done_by)
        values (?, 'CLOSED', ?)
    `,
    GET_FILE_HISTORY: `
        select
            file_id as fileId,
            action,
            u1.name as actionDoneBy,
            u2.name as actionDoneFor,
            action_done_at as actionDoneAt
        from
            file_history
        inner join
            users u1 on u1.id = action_done_by
        left join
            users u2 on u2.id = action_done_for
        where
            file_id = ?
        order by
            action_done_at
    `,
};

export default FILE_HISTORY;
