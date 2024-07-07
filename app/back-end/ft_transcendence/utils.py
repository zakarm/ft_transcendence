signup_response_schema = {
    "type": "object",
    "properties": {
        "email": {"type": "string"},
        "is_2fa_enabled": {"type": "boolean"},
        "refresh": {"type": "string", "nullable": True},
        "access": {"type": "string", "nullable": True},
        "url_code": {"type": "string", "nullable": True},
    },
}

signin_response_schema = {
    "type": "object",
    "properties": {
        "refresh": {"type": "string", "nullable": True},
        "access": {"type": "string", "nullable": True},
    },
}

error_response_schema = {
    "type": "object",
    "properties": {
        "error": [{"type": "string"}]
    },
}
