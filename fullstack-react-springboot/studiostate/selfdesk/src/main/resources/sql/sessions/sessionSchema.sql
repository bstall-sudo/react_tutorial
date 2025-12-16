CREATE TABLE IF NOT EXISTS sessions
(
    session_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT                                NOT NULL,
    user_name   VARCHAR(100)                          NOT NULL,
    checkin_at  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
    checkout_at TIMESTAMP   DEFAULT NULL,
    pass_type   VARCHAR(20),
    paid        BIT         DEFAULT 0,

    );