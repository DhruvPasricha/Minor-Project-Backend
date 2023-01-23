
const FILE = {
    CREATE_FILE: `insert into files (subject, created_by) values (?, ?);`,
    GET_FILE: `
        select
            id as fileId,
            subject as subjectId,
            created_by as createdBy,
            created_at as createdAt,
            status
        from
            files
        where
            id = ?
    `,
    GET_FILES_CREATED_BY_USER: `
        select
            id as fileId,
            subject as fileSubject,
            created_at as createdAt,
            status
        from 
            files
        where
            created_by = ?
        order by 
            id desc
    `,
    GET_FILES_SENT_BY_USER: `
        select
            files.id as fileId,
            files.subject as fileSubject,
            files.created_at as createdAt,
            files.created_by as createdBy,
            files.status as status
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
    GET_FILES_CURRENTLY_WITH_USER: `
        select
            files.id as fileId,
            subject as fileSubject,
            files.created_at as createdAt,
            files.created_by as createdBy,
            action_done_for as assignedBy,
            action_done_at as assignedAt,
            status
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
            files.id as fileId,
            subject as fileSubject,
            files.created_at as createdAt,
            files.created_by as createdBy,
            file_history_partitioned.action_done_by as assignedBy,
            file_history_partitioned.action_done_at as assignedAt,
            files.status as status
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
    UPDATE_FILE_STATUS: 'update files set status = ? where id = ?',
};

export default FILE;
