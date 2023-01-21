const FILE = {
    CREATE_FILE: `insert into files (subject, created_by) values (?, ?)`,
    GET_FILES_CREATED_BY_USER: `select * from files where created_by = ?`,
    GET_FILES_SENT_BY_USER: `
        select
            files.id as id,
            files.subject as subject,
            file_history.action_done_by as sender,
            file_history.action_done_for as receiver,
            file_history.action_done_at as receivedAt
        from
            file_history
        inner join
            files on files.id = file_history.file_id
        where
            file_history.action = 'DISPATCHED' and
            action_done_by = ?
        order by
            file_history.action_done_at desc
    `,
    GET_FILES_RECEIVED_BY_USER: `
        select
            files.id as id,
            files.subject as subject,
            file_history.action_done_by as receiver,
            file_history.action_done_for as sender,
            file_history.action_done_at as receivedAt
        from
            file_history
        inner join
            files on files.id = file_history.file_id
        where
            file_history.action = 'RECEIVED' and
            action_done_by = ?
        order by
            file_history.action_done_at desc
    `,
    GET_FILES_CURRENTLY_WITH_USER: `
        select
            files.id as id,
            subject,
            action_done_by as currentlyWith,
            action_done_at as WithUserSince
        from (
                select *,
                    dense_rank() over (partition by file_id
                order by
                    action_done_at desc) as group_position
                from
                    file_history
            )
            as file_history_partitioned 
        inner join
                files on files.id = file_history_partitioned.file_id 
        where
            action_done_by = ? and
            group_position = 1 and
            action <> 'DISPATCHED'
        order by
            action_done_at desc
    `,
    GET_INCOMING_FILES_FOR_USER: `
        select
            files.id as id,
            subject,
            action_done_by as currentlyWith,
            action_done_at as WithUserSince
        from (
                select *,
                    dense_rank() over (partition by file_id
                order by
                    action_done_at desc) as group_position
                from
                    file_history
            )
            as file_history_partitioned
        inner join
                files on files.id = file_history_partitioned.file_id 
        where
            action_done_for = ? and
            group_position = 1 and
            action = 'DISPATCHED'
        order by
            action_done_at desc
    `,
};

export default FILE;
