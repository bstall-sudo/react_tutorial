CREATE TABLE IF NOT EXISTS users
(
    user_id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_name       VARCHAR(100)                          NOT NULL,
    user_email      VARCHAR(100)                          NOT NULL,
    password        VARCHAR(200),
    registered_at   TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
    category        VARCHAR(20),
    updated_at      TIMESTAMP   DEFAULT NULL,
    updated_by      VARCHAR(20) DEFAULT NULL

    );