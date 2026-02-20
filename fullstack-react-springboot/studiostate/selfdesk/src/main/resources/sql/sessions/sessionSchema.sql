CREATE TABLE IF NOT EXISTS sessions
(
    session_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT                                  DEFAULT NULL,
    pass_id     BIGINT                                  DEFAULT NULL,
    pass_type   VARCHAR(10)                             DEFAULT NULL,
    user_name   VARCHAR(40)                            DEFAULT NULL,
    server_start_time  TIMESTAMP                        DEFAULT CURRENT_TIMESTAMP,
    server_end_time    TIMESTAMP                        DEFAULT NULL,
    client_start_time  TIMESTAMP                        DEFAULT NULL,
    client_end_time    TIMESTAMP                        DEFAULT NULL,
    session_comment VARCHAR(200)                        DEFAULT NULL,
    paid        TINYINT                                    DEFAULT 0,
    open        TINYINT                                     DEFAULT 1,
    created_by      VARCHAR(40) DEFAULT NULL,
    created_at   	TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,

    updated_by      VARCHAR(40) DEFAULT NULL,
    updated_at      TIMESTAMP   DEFAULT NULL
    );