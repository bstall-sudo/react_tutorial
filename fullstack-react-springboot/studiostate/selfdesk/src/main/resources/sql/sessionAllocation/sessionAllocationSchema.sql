CREATE TABLE IF NOT EXISTS session_allocations (
    allocation_id BIGINT NOT NULL AUTO_INCREMENT,

    session_id BIGINT NOT NULL,
    allocation_type VARCHAR(40) NOT NULL,

    payment_status VARCHAR(40) NOT NULL,

    pass_id BIGINT NULL,

    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NOT NULL,

    seconds BIGINT NOT NULL,

    amount_cents BIGINT DEFAULT 0,

    created_by      	VARCHAR(40) DEFAULT NULL,

    updated_by      	VARCHAR(40) DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (allocation_id),

    CONSTRAINT fk_session_allocations_session
        FOREIGN KEY (session_id)
        REFERENCES sessions(session_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_session_allocations_pass
        FOREIGN KEY (pass_id)
        REFERENCES passes(pass_id)
        ON DELETE SET NULL
)