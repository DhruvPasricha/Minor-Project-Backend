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
            action_done_by as actionDoneBy,
            action_done_for as actionDoneFor,
            action_done_at as actionDoneAt
        from
            file_history
        where
            file_id = ?
    `,
};

export default FILE_HISTORY;
