CREATE TABLE IF NOT EXISTS users
(
    user_id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_name      VARCHAR(40)                          NOT NULL,
    email      		VARCHAR(30)                          NOT NULL,
    mobile_number   VARCHAR(20)                         DEFAULT NULL,
    street			VARCHAR(30) 						DEFAULT NULL,
    postal_code		VARCHAR(7) 							DEFAULT NULL,
    city			VARCHAR(20) 							DEFAULT NULL,
    country			VARCHAR(20) 						DEFAULT NULL,
    password        VARCHAR(200),
    comments		VARCHAR(500) 						DEFAULT NULL,
    created_by      VARCHAR(40) DEFAULT NULL,
    created_at   	TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
    category        VARCHAR(10) 					DEFAULT "GUEST",
    updated_by      VARCHAR(40) DEFAULT NULL,
    updated_at      TIMESTAMP   DEFAULT NULL
    );