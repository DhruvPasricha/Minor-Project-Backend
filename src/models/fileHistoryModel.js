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
};

export default FILE_HISTORY;
