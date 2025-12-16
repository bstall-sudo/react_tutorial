CREATE TABLE IF NOT EXISTS passes
(
    pass_id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT                                  NOT NULL,
    creation_date   TIMESTAMP   DEFAULT CURRENT_TIMESTAMP   NOT NULL,
    time_remaining  TIME,
    pass_type       VARCHAR(20)                             NOT NULL,
    active          BIT         DEFAULT 1,
    );