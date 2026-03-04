CREATE TABLE IF NOT EXISTS sessions
(
    session_id  		BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     		BIGINT                                  NOT NULL,
    user_name   		VARCHAR(40)                            NOT NULL,
    check_in_at       	TIMESTAMP                        DEFAULT CURRENT_TIMESTAMP,
    check_out_at    	TIMESTAMP                        DEFAULT NULL,

    session_comment 	VARCHAR(200)                        DEFAULT NULL,

	open        		TINYINT                                     DEFAULT 1,
    created_by      	VARCHAR(40) DEFAULT NULL,
    created_at   		TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,

    updated_by      	VARCHAR(40) DEFAULT NULL,
    updated_at      	TIMESTAMP   DEFAULT NULL
    );