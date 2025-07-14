import { OpenAPIObject } from "@nestjs/swagger";

export const swaggerOptions:OpenAPIObject = {
    "info":{
        "title": "Control Finance V3",
        "description": "Welcome! This is the Control Finance API documentation. Control Finance V2 is a full-scale monetary management application.",
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
        },
        {
            "name": 'Transactions',
            "description": 'Transaction management endpoints'
        },
        {
            "name": "Goal",
            "description": "Goal management endpoints"
        },
        {
            "name": "Category",
            "description": "Category management endpoints"
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
            },
            "get": {
                "tags": ["Account"],
                "summary": "List accounts with filters",
                "description": "Fetches a list of accounts based on optional filters (query, type, min/max value) with pagination. Requires a valid bearer token.",
                "operationId": "listAccounts",
                "security": [
                {
                    "bearerAuth": []
                }
                ],
                "parameters": [
                {
                    "name": "query",
                    "in": "query",
                    "schema": { "type": "string" }
                },
                {
                    "name": "type",
                    "in": "query",
                    "schema": { "type": "string" }
                },
                {
                    "name": "minValue",
                    "in": "query",
                    "schema": { "type": "number", "format": "float" }
                },
                {
                    "name": "maxValue",
                    "in": "query",
                    "schema": { "type": "number", "format": "float" }
                },
                {
                    "name": "page",
                    "in": "query",
                    "schema": { "type": "integer" }
                },
                {
                    "name": "pageSize",
                    "in": "query",
                    "schema": { "type": "integer" }
                }
                ],
                "responses": {
                "200": {
                    "description": "Accounts retrieved successfully",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": { "type": "integer", "example": 200 },
                            "params": {
                            "type": "object",
                            "properties": {
                                "query": { "type": "string" },
                                "type": { "type": "string" },
                                "minValue": { "type": "string" },
                                "maxValue": { "type": "string" },
                                "page": { "type": "string" },
                                "pageSize": { "type": "string" }
                            }
                            },
                            "data": {
                            "type": "object",
                            "properties": {
                                "filteredAccounts": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/AccountWithResume"
                                }
                                },
                                "totalAccounts": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/AccountWithResume"
                                }
                                },
                                "data": {
                                "type": "object",
                                "properties": {
                                    "value": { "type": "number" },
                                    "income": { "type": "number" },
                                    "outcome": { "type": "number" }
                                }
                                },
                                "transactions": {
                                "type": "object",
                                "properties": {
                                    "size": { "type": "integer" },
                                    "income": { "type": "number" },
                                    "outcome": { "type": "number" },
                                    "list": {
                                    "type": "array",
                                    "items": { "$ref": "#/components/schemas/Transaction" }
                                    }
                                }
                                }
                            }
                            },
                            "meta": {
                            "type": "object",
                            "properties": {
                                "maxPage": { "type": "integer" },
                                "page": { "type": "integer" },
                                "pageSize": { "type": "integer" },
                                "totalCount": { "type": "integer" },
                                "links": {
                                "$ref": "#/components/schemas/PaginationLinks"
                                }
                            }
                            },
                            "date": { "type": "string", "format": "date-time" },
                            "links": {
                            "$ref": "#/components/schemas/PaginationLinks"
                            }
                        }
                        }
                    }
                    }
                }
                }
            },
            "delete": {
                "tags": ["Account"],
                "summary": "Delete an account by ID",
                "description": "Deletes an account identified by the given ID. Returns deleted account data in the response.",
                "operationId": "deleteAccount",
                "parameters": [
                    {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "Unique identifier of the account",
                    "schema": {
                        "type": "string"
                    }
                    }
                ],
                "responses": {
                    "200": {
                    "description": "Account deleted successfully",
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "status": {
                                "type": "integer",
                                "example": 200
                            },
                            "params": {
                                "type": "object",
                                "properties": {
                                "id": { "type": "string" }
                                }
                            },
                            "meta": {
                                "type": "object",
                                "properties": {
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "description": { "type": "string" },
                                "initialBalace": { "type": "number", "format": "float" }
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
                    "description": "Account not found",
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "status": {
                                "type": "integer",
                                "example": 404
                            },
                            "params": {
                                "type": "object",
                                "properties": {
                                "id": { "type": "string" }
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
                            "status": {
                                "type": "integer",
                                "example": 500
                            },
                            "params": {
                                "type": "object",
                                "properties": {
                                "id": { "type": "string" }
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
            },
            "put": {
                "tags": ["Account"],
                "summary": "Update an account by ID",
                "description": "Updates a financial account with new data provided in the request body. Returns the updated data and metadata.",
                "operationId": "updateAccount",
                "parameters": [
                    {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "Unique identifier of the account to update",
                    "schema": {
                        "type": "string"
                    }
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
                            "value": { "type": "number", "format": "float" }
                        },
                        "required": ["title", "type", "description", "value"]
                        }
                    }
                    }
                },
                "responses": {
                    "200": {
                    "description": "Account updated successfully",
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "status": { "type": "integer", "example": 200 },
                            "params": {
                                "type": "object",
                                "properties": {
                                "id": { "type": "string" }
                                }
                            },
                            "body": {
                                "type": "object",
                                "properties": {
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "description": { "type": "string" },
                                "value": { "type": "number", "format": "float" }
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
                    "description": "Account not found",
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "status": { "type": "integer", "example": 404 },
                            "params": {
                                "type": "object",
                                "properties": {
                                "id": { "type": "string" }
                                }
                            },
                            "body": {
                                "type": "object",
                                "properties": {
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "description": { "type": "string" },
                                "value": { "type": "number", "format": "float" }
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
                            "params": {
                                "type": "object",
                                "properties": {
                                "id": { "type": "string" }
                                }
                            },
                            "body": {
                                "type": "object",
                                "properties": {
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "description": { "type": "string" },
                                "value": { "type": "number", "format": "float" }
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
        },
        "/transaction":{
             "post": {
                "tags": ["Transactions"],
                "summary": "Create a new transaction",
                "description": "Creates a new financial transaction linked to an account and a category.",
                "operationId": "createTransaction",
                "requestBody": {
                    "required": true,
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "accountId": {
                            "type": "string",
                            "description": "ID of the associated account"
                            },
                            "categoryId": {
                            "type": "string",
                            "description": "ID of the category for the transaction"
                            },
                            "title": {
                            "type": "string",
                            "description": "Title of the transaction"
                            },
                            "type": {
                            "type": "enum",
                            "examples":["income","outcome"],
                            "description": "Transaction type (e.g., income, expense)"
                            },
                            "value": {
                            "type": "number",
                            "format": "float",
                            "description": "Value of the transaction"
                            }
                        },
                        "required": ["accountId", "categoryId", "title", "type", "value"]
                        }
                    }
                    }
                },
                "responses": {
                    "200": {
                    "description": "Transaction created successfully",
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "status": {
                                "type": "integer",
                                "example": 200
                            },
                            "body": {
                                "type": "object",
                                "properties": {
                                "accountId": { "type": "string" },
                                "categoryId": { "type": "string" },
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "value": { "type": "number", "format": "float" }
                                }
                            },
                            "data": {
                                "type": "object",
                                "description": "Transaction data returned from the service",
                                "properties": {
                                "id": { "type": "string" },
                                "accountId": { "type": "string" },
                                "categoryId": { "type": "string" },
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "value": { "type": "number", "format": "float" },
                                "createdAt": { "type": "string", "format": "date-time" }
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
                    "description": "Related entity (e.g., account or category) not found",
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "status": { "type": "integer", "example": 404 },
                            "body": {
                                "type": "object",
                                "properties": {
                                "accountId": { "type": "string" },
                                "categoryId": { "type": "string" },
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "value": { "type": "number", "format": "float" }
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
                                "accountId": { "type": "string" },
                                "categoryId": { "type": "string" },
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "value": { "type": "number", "format": "float" }
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
             },
             "put": {
                "tags": ["Transactions"],
                "summary": "Update a transaction by ID",
                "description": "Partially updates a transaction by its ID. You can provide any subset of the transaction fields.",
                "operationId": "updateTransaction",
                "parameters": [
                    {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "Unique identifier of the transaction to update",
                    "schema": {
                        "type": "string"
                    }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "accountId": { "type": "string" },
                            "categoryId": { "type": "string" },
                            "title": { "type": "string" },
                            "type": { "type": "string" },
                            "value": { "type": "number", "format": "float" }
                        },
                        "description": "Partial fields to update"
                        }
                    }
                    }
                },
                "responses": {
                    "200": {
                    "description": "Transaction updated successfully",
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "status": { "type": "integer", "example": 200 },
                            "body": {
                                "type": "object",
                                "description": "Request body sent",
                                "properties": {
                                "accountId": { "type": "string" },
                                "categoryId": { "type": "string" },
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "value": { "type": "number", "format": "float" }
                                }
                            },
                            "data": {
                                "type": "object",
                                "description": "Updated transaction object",
                                "properties": {
                                "id": { "type": "string" },
                                "accountId": { "type": "string" },
                                "categoryId": { "type": "string" },
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "value": { "type": "number", "format": "float" },
                                "updatedAt": { "type": "string", "format": "date-time" }
                                }
                            },
                            "date": { "type": "string", "format": "date-time" }
                            }
                        }
                        }
                    }
                    },
                    "404": {
                    "description": "Transaction not found",
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "status": { "type": "integer", "example": 404 },
                            "body": {
                                "type": "object",
                                "properties": {
                                "accountId": { "type": "string" },
                                "categoryId": { "type": "string" },
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "value": { "type": "number", "format": "float" }
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
                            "date": { "type": "string", "format": "date-time" }
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
                                "accountId": { "type": "string" },
                                "categoryId": { "type": "string" },
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "value": { "type": "number", "format": "float" }
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
                            "date": { "type": "string", "format": "date-time" }
                            }
                        }
                        }
                    }
                    }
                }
             },
             "delete": {
                "tags": ["Transactions"],
                "summary": "Delete a transaction by ID",
                "description": "Deletes a transaction identified by its ID.",
                "operationId": "deleteTransaction",
                "parameters": [
                    {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "Unique identifier of the transaction to delete",
                    "schema": {
                        "type": "string"
                    }
                    }
                ],
                "responses": {
                    "200": {
                    "description": "Transaction deleted successfully",
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "status": { "type": "integer", "example": 200 },
                            "data": {
                                "type": "object",
                                "description": "Deleted transaction data",
                                "properties": {
                                "id": { "type": "string" },
                                "accountId": { "type": "string" },
                                "categoryId": { "type": "string" },
                                "title": { "type": "string" },
                                "type": { "type": "string" },
                                "value": { "type": "number", "format": "float" },
                                "deletedAt": { "type": "string", "format": "date-time" }
                                }
                            },
                            "date": { "type": "string", "format": "date-time" }
                            }
                        }
                        }
                    }
                    },
                    "404": {
                    "description": "Transaction not found",
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "status": { "type": "integer", "example": 404 },
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
                            "date": { "type": "string", "format": "date-time" }
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
                            "date": { "type": "string", "format": "date-time" }
                            }
                        }
                        }
                    }
                    }
                }
             },
             "get": {
                "tags": ["Transactions"],
                "summary": "List transactions with filters",
                "description": "Returns a filtered and paginated list of transactions. Filters include account, category, date range, title, type, and value limits.",
                "operationId": "findManyByFilter",
                "parameters": [
                    { "name": "accountId", "in": "query", "required": true, "schema": { "type": "string" } },
                    { "name": "categoryId", "in": "query", "schema": { "type": "string" } },
                    { "name": "title", "in": "query", "schema": { "type": "string" } },
                    { "name": "type", "in": "query", "schema": { "type": "string" } },
                    { "name": "createdAfter", "in": "query", "schema": { "type": "string", "format": "date-time" } },
                    { "name": "createdBefore", "in": "query", "schema": { "type": "string", "format": "date-time" } },
                    { "name": "minValue", "in": "query", "schema": { "type": "number", "format": "float" } },
                    { "name": "maxValue", "in": "query", "schema": { "type": "number", "format": "float" } },
                    { "name": "page", "in": "query", "schema": { "type": "integer", "default": 1 } },
                    { "name": "pageSize", "in": "query", "schema": { "type": "integer", "default": 10 } }
                ],
                "responses": {
                    "200": {
                    "description": "Filtered transaction list retrieved successfully",
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "status": { "type": "integer", "example": 200 },
                            "data": {
                                "type": "array",
                                "items": {
                                "type": "object",
                                "properties": {
                                    "id": { "type": "string" },
                                    "accountId": { "type": "string" },
                                    "categoryId": { "type": "string" },
                                    "title": { "type": "string" },
                                    "type": { "type": "string" },
                                    "value": { "type": "number", "format": "float" },
                                    "createdAt": { "type": "string", "format": "date-time" }
                                }
                                }
                            },
                            "meta": {
                                "type": "object",
                                "properties": {
                                "maxPage": { "type": "integer" },
                                "page": { "type": "integer" },
                                "pageSize": { "type": "integer" },
                                "totalCount": { "type": "integer" },
                                "links": {
                                    "type": "object",
                                    "properties": {
                                    "first": { "type": "string", "format": "uri" },
                                    "last": { "type": "string", "format": "uri" },
                                    "next": { "type": "string","format": "uri" },
                                    "prev": { "type": "string", "format": "uri" }
                                    }
                                }
                                }
                            },
                            "date": { "type": "string", "format": "date-time" },
                            "links": {
                                "type": "object",
                                "properties": {
                                "first": { "type": "string", "format": "uri" },
                                "last": { "type": "string", "format": "uri" },
                                "next": { "type": "string", "format": "uri" },
                                "prev": { "type": "string", "format": "uri" }
                                }
                            },
                            "body": {
                                "type": "object",
                                "description": "Query params received"
                            }
                            }
                        }
                        }
                    }
                    },
                    "404": {
                    "description": "No transactions found for given filters",
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "status": { "type": "integer", "example": 404 },
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
                            "date": { "type": "string", "format": "date-time" }
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
                            "date": { "type": "string", "format": "date-time" }
                            }
                        }
                        }
                    }
                    }
                }
             }
        },
        "/category": {
            "post": {
            "tags": ["Category"],
            "summary": "Create a new category",
            "description": "Creates a new category with name, iconId and isCustom flag.",
            "operationId": "createCategory",
            "requestBody": {
                "required": true,
                "content": {
                "application/json": {
                    "schema": {
                    "type": "object",
                    "properties": {
                        "name": { "type": "string" },
                        "iconId": { "type": "string" },
                        "isCustom": { "type": "boolean" }
                    },
                    "required": ["name", "iconId", "isCustom"]
                    }
                }
                }
            },
            "responses": {
                "201": {
                "description": "Category created successfully",
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "status": { "type": "integer", "example": 201 },
                        "data": { "type": "object", "properties":{
                            "icon": {"type":"string","example":"Home"},
                            "title": {"type":"string","example":"Home"},
                            "id": {"type":"string","example":"dcba7160-a7f1-424f-a913-ec877764f32b"} 
                        } },
                        "body": { "type": "object", "properties":{
                            "name": {"type":"string","example":"Home"},
                            "iconId": {"type":"string","example":"Home"},
                            "isCustom": {"type":"boolean","example":false}
                        } },
                        "date": { "type": "string", "format": "date-time" }
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
                        "error": { "type": "string" },
                        "message": { "type": "string" }
                        }
                    }
                    }
                }
                }
            }
            }
        },
        "/category/{id}": {
            "get": {
            "tags": ["Category"],
            "summary": "Get category by ID",
            "description": "Retrieves a specific category by its ID.",
            "operationId": "getCategoryById",
            "parameters": [
                { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
            ],
            "responses": {
                "200": {
                "description": "Category found",
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "status": { "type": "integer", "example": 200 },
                        "data": { "type": "object" },
                        "date": { "type": "string", "format": "date-time" }
                        }
                    }
                    }
                }
                },
                "404": { "description": "Category not found" },
                "500": { "description": "Internal server error" }
            }
            },
            "put": {
            "tags": ["Category"],
            "summary": "Update category by ID",
            "description": "Updates an existing category.",
            "operationId": "updateCategory",
            "parameters": [
                { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
            ],
            "requestBody": {
                "required": true,
                "content": {
                "application/json": {
                    "schema": {
                    "type": "object",
                    "properties": {
                        "name": { "type": "string" },
                        "iconId": { "type": "string" },
                        "isCustom": { "type": "boolean" }
                    }
                    }
                }
                }
            },
            "responses": {
                "200": { "description": "Category updated successfully" },
                "404": { "description": "Category not found" },
                "500": { "description": "Internal server error" }
            }
            },
            "delete": {
            "tags": ["Category"],
            "summary": "Delete category by ID",
            "description": "Deletes a category by its ID.",
            "operationId": "deleteCategory",
            "parameters": [
                { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
            ],
            "responses": {
                "200": { "description": "Category deleted successfully" },
                "404": { "description": "Category not found" },
                "500": { "description": "Internal server error" }
            }
            }
        },
        "/category/all": {
            "get": {
            "tags": ["Category"],
            "summary": "Get all categories",
            "description": "Retrieves all available categories.",
            "operationId": "getAllCategories",
            "responses": {
                "200": {
                "description": "All categories retrieved successfully",
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "status": { "type": "integer", "example": 200 },
                        "data": { "type": "array", "items": { "type": "object" } },
                        "date": { "type": "string", "format": "date-time" }
                        }
                    }
                    }
                }
                },
                "500": { "description": "Internal server error" }
            }
            }
        },
        "/goal": {
            "post": {
                "tags": ["Goal"],
                "summary": "Create a new goal",
                "description": "Creates a new financial goal for the authenticated user.",
                "operationId": "createGoal",
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
                        "$ref": "#/components/schemas/CreateGoalBody"
                    }
                    }
                }
                },
                "responses": {
                "201": {
                    "description": "Goal created successfully",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 201
                            },
                            "data": {
                            "$ref": "#/components/schemas/Goal"
                            },
                            "date": {
                            "type": "string",
                            "format": "date-time"
                            },
                            "body": {
                            "$ref": "#/components/schemas/CreateGoalBody"
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
                        "$ref": "#/components/schemas/ErrorResponse"
                        }
                    }
                    }
                },
                "500": {
                    "description": "Internal server error",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/ErrorResponse"
                        }
                    }
                    }
                }
                }
            }
        },
        "/goal/{id}": {
            "get": {
                "tags": ["Goal"],
                "summary": "Get goal by ID",
                "description": "Retrieve a single financial goal by its ID.",
                "operationId": "getSingleGoal",
                "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": { "type": "string" }
                }
                ],
                "responses": {
                "200": {
                    "description": "Goal retrieved successfully",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": { "type": "integer", "example": 200 },
                            "data": { "$ref": "#/components/schemas/Goal" },
                            "params": {
                            "type": "object",
                            "properties": {
                                "id": { "type": "string" }
                            }
                            },
                            "date": { "type": "string", "format": "date-time" }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Goal not found",
                    "content": {
                    "application/json": {
                        "schema": { "$ref": "#/components/schemas/ErrorResponse" }
                    }
                    }
                },
                "500": {
                    "description": "Internal server error",
                    "content": {
                    "application/json": {
                        "schema": { "$ref": "#/components/schemas/ErrorResponse" }
                    }
                    }
                }
                }
            },
            "delete": {
                "tags": ["Goal"],
                "summary": "Delete a goal",
                "description": "Deletes a financial goal by its ID.",
                "operationId": "deleteGoal",
                "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                    "type": "string"
                    }
                }
                ],
                "responses": {
                "200": {
                    "description": "Goal deleted successfully",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": { "type": "integer", "example": 200 },
                            "data": { "$ref": "#/components/schemas/Goal" },
                            "params": {
                            "type": "object",
                            "properties": {
                                "id": { "type": "string" }
                            }
                            },
                            "date": { "type": "string", "format": "date-time" }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Goal not found",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/ErrorResponse"
                        }
                    }
                    }
                },
                "500": {
                    "description": "Internal server error",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/ErrorResponse"
                        }
                    }
                    }
                }
                }
            },
            "put": {
                "tags": ["Goal"],
                "summary": "Update a goal",
                "description": "Update the properties of an existing goal by ID.",
                "operationId": "updateGoal",
                "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": { "type": "string" }
                }
                ],
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": { "$ref": "#/components/schemas/GoalUpdateBody" }
                    }
                }
                },
                "responses": {
                "201": {
                    "description": "Goal updated successfully",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": { "type": "integer", "example": 201 },
                            "body": { "$ref": "#/components/schemas/GoalUpdateBody" },
                            "data": { "$ref": "#/components/schemas/Goal" },
                            "date": { "type": "string", "format": "date-time" }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Goal not found",
                    "content": {
                    "application/json": {
                        "schema": { "$ref": "#/components/schemas/ErrorResponse" }
                    }
                    }
                },
                "500": {
                    "description": "Internal server error",
                    "content": {
                    "application/json": {
                        "schema": { "$ref": "#/components/schemas/ErrorResponse" }
                    }
                    }
                }
                }
            },

        },
        "/goal/complete/{id}": {
            "put": {
                "summary": "Mark goal as completed",
                "description": "Marca uma meta como concluída atribuindo a data atual ao campo `completedAt`.",
                "tags": ["Goal"],
                "operationId": "markGoalAsCompleted",
                "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "ID da meta a ser marcada como concluída",
                    "schema": {
                    "type": "string"
                    }
                }
                ],
                "responses": {
                "201": {
                    "description": "Meta marcada como concluída com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 201
                            },
                            "param": {
                            "type": "object",
                            "properties": {
                                "id": {
                                "type": "string"
                                }
                            }
                            },
                            "data": {
                            "$ref": "#/components/schemas/Goal"
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
                    "description": "Meta não encontrada",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/ErrorNotFound"
                        }
                    }
                    }
                },
                "500": {
                    "description": "Erro interno no servidor",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/ErrorInternal"
                        }
                    }
                    }
                }
                }
            }
        },
        "/auth/email": {
            "post": {
                "summary": "Enviar email de recuperação",
                "description": "Envia um email de recuperação para o usuário autenticado. O email é obtido do perfil do usuário.",
                "tags": ["Auth"],
                "operationId": "sendRecoveryEmail",
                "security": [
                {
                    "bearerAuth": []
                }
                ],
                "responses": {
                "200": {
                    "description": "Email enviado com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 200
                            },
                            "params": {
                            "type": "object",
                            "properties": {
                                "email": {
                                "type": "string",
                                "format": "email",
                                "example": "usuario@email.com"
                                }
                            }
                            },
                            "data": {
                            "type": "object",
                            "properties": {
                                "codeString": {
                                "type": "string",
                                "description": "Código de recuperação enviado por email"
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
                "550": {
                    "description": "Erro ao enviar o email (mailbox rejeitada ou insegura)",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 550
                            },
                            "Description": {
                            "type": "string",
                            "example": "Message not taken or rejected. Issue in nodemailer execution likely means that the mailbox is unsafe or unusable"
                            },
                            "error": {
                            "type": "object",
                            "properties": {
                                "message": {
                                "type": "string"
                                },
                                "name": {
                                "type": "string"
                                },
                                "class": {
                                "type": "string"
                                },
                                "classType": {
                                "type": "string",
                                "example": "COULDNOTSENDEMAILERROR"
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
                    "description": "Erro interno no servidor",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/ErrorInternal"
                        }
                    }
                    }
                }
                }
            },
            "put": {
                "summary": "Atualizar senha via recuperação por email",
                "description": "Atualiza a senha do usuário com base em uma string de recuperação, um passaporte (identificador) e a nova senha. Essa operação é usada após o envio de um email de recuperação.",
                "tags": ["Auth"],
                "operationId": "updateUserPassword",
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "required": ["refString", "passport", "newPassword"],
                        "properties": {
                        "refString": {
                            "type": "string",
                            "example": "recovery-code-abc123"
                        },
                        "passport": {
                            "type": "string",
                            "example": "user@email.com"
                        },
                        "newPassword": {
                            "type": "string",
                            "example": "novasenhaSegura@123"
                        }
                        }
                    }
                    }
                }
                },
                "responses": {
                "200": {
                    "description": "Senha atualizada com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "status": {
                            "type": "integer",
                            "example": 200
                            },
                            "params": {
                            "type": "object",
                            "properties": {
                                "refString": {
                                "type": "string"
                                },
                                "passport": {
                                "type": "string"
                                },
                                "newPassword": {
                                "type": "string"
                                }
                            }
                            },
                            "data": {
                            "type": "object",
                            "description": "Resposta retornada após atualização",
                            "example": {
                                "userId": "clx5...",
                                "message": "Senha atualizada com sucesso"
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
                    "description": "Informações fornecidas são inválidas",
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
                                "refString": { "type": "string" },
                                "passport": { "type": "string" },
                                "newPassword": { "type": "string" }
                            }
                            },
                            "error": {
                            "type": "object",
                            "properties": {
                                "message": { "type": "string" },
                                "name": { "type": "string" },
                                "classtype": {
                                "type": "string",
                                "example": "INVALIDINFORMATIONPROVIDED"
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
                    "description": "Referência de recuperação não encontrada",
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
                    "description": "Erro interno ao atualizar a senha",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/ErrorInternal"
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
    },
    "schemas": {
      "Category": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "iconId": { "type": "string" },
          "isCustom": { "type": "boolean" },
          "createdAt": { "type": "string", "format": "date-time" },
          "updatedAt": { "type": "string", "format": "date-time" }
        }
      },
      "CreateCategoryBody": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "iconId": { "type": "string" },
          "isCustom": { "type": "boolean" }
        },
        "required": ["name", "iconId", "isCustom"]
      },
      "ErrorResponse": {
        "type": "object",
        "properties": {
          "status": { "type": "integer" },
          "error": { "type": "string" },
          "message": { "type": "string" },
          "date": { "type": "string", "format": "date-time" }
        }
      },
      "SuccessResponse": {
        "type": "object",
        "properties": {
          "status": { "type": "integer" },
          "data": { "type": "object" },
          "date": { "type": "string", "format": "date-time" }
        }
      },
      "CreateGoalBody": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "targetDate": { "type": "string", "format": "date" },
          "currentValue": { "type": "number" },
          "targetValue": { "type": "number" }
        },
        "required": ["title", "targetDate", "currentValue", "targetValue"]
      },
      "Goal": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "title": { "type": "string" },
          "currentValue": { "type": "number" },
          "targetValue": { "type": "number" },
          "dueDate": { "type": "string", "format": "date" },
          "userId": { "type": "string" },
          "createdAt": { "type": "string", "format": "date-time" },
          "updatedAt": { "type": "string", "format": "date-time" }
        }
      },
      "AccountWithResume": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "format": "uuid" },
          "title": { "type": "string" },
          "type": { "type": "string" },
          "description": { "type": "string",},
          "userId": { "type": "string", "format": "uuid" },
          "value": { "type": "number" },
          "resume": {
            "type": "object",
            "properties": {
              "income": { "type": "number" },
              "outcome": { "type": "number" },
              "per_income": { "type": "number",  },
              "per_outcome": { "type": "number",  },
              "transactions": { "type": "integer" }
            }
          }
        }
      },
      "Transaction": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "format": "uuid" },
          "title": { "type": "string" },
          "value": { "type": "number" },
          "type": { "type": "string", "enum": ["income", "outcome"] },
          "createdAt": { "type": "string", "format": "date-time" },
          "accountId": { "type": "string", "format": "uuid" },
          "categoryId": { "type": "string", "format": "uuid" }
        }
      },
      "PaginationLinks": {
        "type": "object",
        "properties": {
          "first": { "type": "string", "format": "uri" },
          "last": { "type": "string", "format": "uri" },
          "next": { "type": "string", "format": "uri" },
          "prev": { "type": "string", "format": "uri" }
        }
      }
    }
  }
}