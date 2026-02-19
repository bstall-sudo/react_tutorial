CREATE TABLE IF NOT EXISTS sessions
(
    session_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT                                  DEFAULT NULL,
    pass_id     BIGINT                                  DEFAULT NULL,
    pass_type   VARCHAR(50)                             DEFAULT NULL,
    user_name   VARCHAR(100)                            DEFAULT NULL,
    server_start_time  TIMESTAMP                        DEFAULT CURRENT_TIMESTAMP,
    server_end_time    TIMESTAMP                        DEFAULT NULL,
    client_start_time  TIMESTAMP                        DEFAULT NULL,
    client_end_time    TIMESTAMP                        DEFAULT NULL,
    session_comment VARCHAR(200)                        DEFAULT NULL,
    paid        TINYINT                                    DEFAULT 0,
    open        TINYINT                                     DEFAULT 1,
    created_by      VARCHAR(20) DEFAULT NULL,
    created_at   	TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
    category        VARCHAR(20),
    updated_by      VARCHAR(20) DEFAULT NULL,
    updated_at      TIMESTAMP   DEFAULT NULL
    );