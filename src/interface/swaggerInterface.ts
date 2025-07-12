import { OpenAPIObject } from "@nestjs/swagger";

export const swaggerOptions:OpenAPIObject = {
    "info":{
        "title": 'Control Finance V3',
        "description": 'Welcome! This is the Control Finance API documentation. Control Finance V2 is a full-scale monetary management application.',
        "version": '1.2',
        "contact":{
            "name": 'Control Finance',
            "email": 'cibatechcorp@gmail.com'
        },
        "license":{
            "name": 'MIT'
        }
    },
    "servers":[
        {
            "url": 'http://localhost:3445',
            "description": 'Local server'
        }
    ],
    "tags":[
        {
            "name": 'Auth',
            "description": 'Authentication related endpoints'
        },
        {
            "name": 'User',
            "description": 'User management endpoints'
        },
        {
            "name": 'Account',
            "description": 'Account management endpoints'
        }
    ],   
    "openapi":"3.0.0",
    "paths":{
        "/auth": {
            "patch": {
                "tags": ["Auth"],
                
                "summary": "Sign in with email and password",
                "description": "Authenticate a user and return a JWT token",
                "operationId": "signin",
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "email": {
                            "type": "string",
                            "format": "email"
                        },
                        "password": {
                            "type": "string",
                            "format": "password"
                        }
                        },
                        "required": ["email", "password"]
                    }
                    }
                }
                },
                "responses": {
                "201": {
                    "description": "Login successful",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 201
                            },
                            "meta": {
                            "type": "object",
                            "properties": {
                                "token": {
                                "type": "string"
                                }
                            }
                            },
                            "body": {
                            "type": "object",
                            "properties": {
                                "email": {
                                "type": "string",
                                "format": "email"
                                }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "User not found",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 404
                            },
                            "body": {
                            "type": "object",
                            "properties": {
                                "email": { "type": "string" },
                                "password": { "type": "string" }
                            }
                            },
                            "error": {
                            "type": "object",
                            "properties": {
                                "message": { "type": "string" },
                                "name": { "type": "string" },
                                "classtype": { "type": "string", "example": "ENTITYDOESNOTEXISTSERROR" }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                },
                "400": {
                    "description": "Validation error",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 400
                            },
                            "body": {
                            "type": "object",
                            "properties": {
                                "email": { "type": "string" },
                                "password": { "type": "string" }
                            }
                            },
                            "error": {
                            "type": "object",
                            "properties": {
                                "message": { "type": "string" },
                                "name": { "type": "string" },
                                "classtype": { "type": "string", "example": "VALIDATIONERROR" }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Internal server error",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 500
                            },
                            "body": {
                            "type": "object",
                            "properties": {
                                "email": { "type": "string" },
                                "password": { "type": "string" }
                            }
                            },
                            "error": {
                            "type": "object",
                            "properties": {
                                "message": { "type": "string" },
                                "name": { "type": "string" },
                                "classtype": { "type": "string", "example": "INTERNAL_SERVER_ERROR" },
                                "class": { "type": "string" }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
        },
        "/user":{
            "post": {
            "tags": ["User"],
            "summary": "Create new user",
            "description": "Creates a new user account",
            "operationId": "createUser",
            "requestBody": {
            "required": true,
            "content": {
                "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                    "email": {
                        "type": "string",
                        "format": "email"
                    },
                    "password": {
                        "type": "string",
                        "format": "password"
                    },
                    "userName": {
                        "type": "string"
                    },
                    "imageUrl": {
                        "type": "string",
                        "format": "uri"
                    }
                    },
                    "required": ["email", "password", "userName"]
                }
                }
            }
            },
            "responses": {
            "201": {
                "description": "User created successfully",
                "content": {
                "application/json": {
                    "schema": {
                    "type": "object",
                    "properties": {
                        "status": {
                        "type": "integer",
                        "example": 201
                        },
                        "meta": {
                        "type": "object",
                        "properties": {
                            "name": {
                            "type": "string"
                            },
                            "email": {
                            "type": "string",
                            "format": "email"
                            }
                        }
                        },
                        "body": {
                        "type": "object",
                        "properties": {
                            "email": { "type": "string" },
                            "password": { "type": "string" },
                            "username": { "type": "string" },
                            "profileUrl": { "type": "string", "format": "uri" }
                        }
                        },
                        "date": {
                        "type": "string",
                        "format": "date-time"
                        }
                    }
                    }
                }
                }
            },
            "404": {
                "description": "User already exists",
                "content": {
                "application/json": {
                    "schema": {
                    "type": "object",
                    "properties": {
                        "status": {
                        "type": "integer",
                        "example": 404
                        },
                        "body": {
                        "type": "object",
                        "properties": {
                            "email": { "type": "string" },
                            "password": { "type": "string" },
                            "username": { "type": "string" },
                            "profileUrl": { "type": "string", "format": "uri" }
                        }
                        },
                        "error": {
                        "type": "object",
                        "properties": {
                            "message": { "type": "string" },
                            "name": { "type": "string" },
                            "classtype": { "type": "string", "example": "ENTITYALREADYEXISTS" }
                        }
                        },
                        "date": {
                        "type": "string",
                        "format": "date-time"
                        }
                    }
                    }
                }
                }
            },
            "500": {
                "description": "Internal server error",
                "content": {
                "application/json": {
                    "schema": {
                    "type": "object",
                    "properties": {
                        "status": {
                        "type": "integer",
                        "example": 500
                        },
                        "body": {
                        "type": "object",
                        "properties": {
                            "email": { "type": "string" },
                            "password": { "type": "string" },
                            "username": { "type": "string" },
                            "profileUrl": { "type": "string", "format": "uri" }
                        }
                        },
                        "error": {
                        "type": "object",
                        "properties": {
                            "message": { "type": "string" },
                            "name": { "type": "string" },
                            "classtype": { "type": "string", "example": "INTERNAL_SERVER_ERROR" },
                            "class": { "type": "string" }
                        }
                        },
                        "date": {
                        "type": "string",
                        "format": "date-time"
                        }
                    }
                    }
                }
                }
            }
            }
             },
             "get": {
                "summary": "Get user profile",
                "description": "Fetches the profile of the authenticated user using bearer token",
                "operationId": "getProfile",
                "tags": ["User"],
                "security": [
                {
                    "bearerAuth": []
                }
                ],
                "responses": {
                "200": {
                    "description": "User profile fetched successfully",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 200
                            },
                            "meta": {
                            "type": "object",
                            "description": "User profile data"
                            },
                            "bearer": {
                            "type": "object",
                            "description": "Decoded bearer token",
                            "properties": {
                                "sub": { "type": "string" },
                                "iat": { "type": "integer" },
                                "exp": { "type": "integer" }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "User not found",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 404
                            },
                            "bearer": {
                            "type": "object"
                            },
                            "error": {
                            "type": "object",
                            "properties": {
                                "message": { "type": "string" },
                                "name": { "type": "string" },
                                "classtype": {
                                "type": "string",
                                "example": "ENTITYDOESNOTEXISTSERROR"
                                }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Internal server error",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 500
                            },
                            "bearer": {
                            "type": "object"
                            },
                            "error": {
                            "type": "object",
                            "properties": {
                                "message": { "type": "string" },
                                "name": { "type": "string" },
                                "classtype": {
                                "type": "string",
                                "example": "INTERNAL_SERVER_ERROR"
                                },
                                "class": { "type": "string" }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                }
                }
             },
             "delete": {
                "summary": "Delete authenticated user",
                "description": "Deletes the account of the authenticated user using bearer token",
                "operationId": "deleteUser",
                "security": [
                {
                    "bearerAuth": []
                }
                ],
                "tags": ["User"],
                "responses": {
                "200": {
                    "description": "User deleted successfully",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 200
                            },
                            "meta": {
                            "type": "object",
                            "properties": {
                                "username": { "type": "string" },
                                "email": { "type": "string", "format": "email" }
                            }
                            },
                            "bearer": {
                            "type": "object",
                            "description": "Decoded JWT token",
                            "properties": {
                                "sub": { "type": "string" },
                                "iat": { "type": "integer" },
                                "exp": { "type": "integer" }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "User not found",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 404
                            },
                            "bearer": {
                            "type": "object"
                            },
                            "error": {
                            "type": "object",
                            "properties": {
                                "message": { "type": "string" },
                                "name": { "type": "string" },
                                "classtype": {
                                "type": "string",
                                "example": "ENTITYDOESNOTEXISTSERROR"
                                }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Internal server error",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 500
                            },
                            "bearer": {
                            "type": "object"
                            },
                            "error": {
                            "type": "object",
                            "properties": {
                                "message": { "type": "string" },
                                "name": { "type": "string" },
                                "classtype": {
                                "type": "string",
                                "example": "INTERNAL_SERVER_ERROR"
                                },
                                "class": { "type": "string" }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                }
                }
             }
        },
        "/account": {
            "post": {
                "tags":["Account"],
                "summary": "Create a new account",
                "description": "Creates a financial account for the authenticated user",
                "operationId": "createAccount",
                "security": [
                {
                    "bearerAuth": []
                }
                ],
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "title": { "type": "string" },
                        "type": { "type": "string" },
                        "description": { "type": "string" },
                        "initialBalace": {
                            "type": "number",
                            "format": "float"
                        }
                        },
                        "required": ["title", "type", "description", "initialBalace"]
                    }
                    }
                }
                },
                "responses": {
                "201": {
                    "description": "Account created successfully",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 201
                            },
                            "body": {
                            "type": "object",
                            "properties": {
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "description": { "type": "string" },
                                "initialBalace": {
                                "type": "number",
                                "format": "float"
                                }
                            }
                            },
                            "meta": {
                            "type": "object",
                            "properties": {
                                "title": { "type": "string" },
                                "description": { "type": "string" }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "User not found (entity does not exist)",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": { "type": "integer", "example": 404 },
                            "body": {
                            "type": "object",
                            "properties": {
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "description": { "type": "string" },
                                "initialBalace": { "type": "number", "format": "float" }
                            }
                            },
                            "error": {
                            "type": "object",
                            "properties": {
                                "message": { "type": "string" },
                                "name": { "type": "string" },
                                "classtype": {
                                "type": "string",
                                "example": "ENTITYDOESNOTEXISTSERROR"
                                }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Internal server error",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": { "type": "integer", "example": 500 },
                            "body": {
                            "type": "object",
                            "properties": {
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "description": { "type": "string" },
                                "initialBalace": { "type": "number", "format": "float" }
                            }
                            },
                            "error": {
                            "type": "object",
                            "properties": {
                                "message": { "type": "string" },
                                "name": { "type": "string" },
                                "classtype": {
                                "type": "string",
                                "example": "INTERNAL_SERVER_ERROR"
                                },
                                "class": { "type": "string" }
                            }
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
        }
    },
    "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }
}