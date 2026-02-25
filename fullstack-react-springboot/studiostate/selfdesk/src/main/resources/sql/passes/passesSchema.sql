CREATE TABLE IF NOT EXISTS passes
(
    pass_id         	BIGINT AUTO_INCREMENT 					PRIMARY KEY,
    user_id         	BIGINT                                  NOT NULL,
    user_name      		VARCHAR(40)                          	NOT NULL,
    comments			VARCHAR(100) 							DEFAULT NULL,
    remaining_seconds  	BIGINT 									NOT NULL,
    pass_type       	VARCHAR(20)                             NOT NULL,
    expiry_date_time   	TIMESTAMP                        		DEFAULT NULL,
    paid          		TINYINT          						DEFAULT 0,
    active          	TINYINT          						DEFAULT 1,
    created_by      	VARCHAR(40) 							DEFAULT NULL,
    created_at   		TIMESTAMP   							DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by      	VARCHAR(40) 							DEFAULT NULL,
    updated_at      	TIMESTAMP   							DEFAULT NULL
    );