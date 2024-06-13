const request = require("supertest");
const app = require("../app");
const authClient = require("../helpers/authRpc");
const playerService = require("../services/PlayerService");
describe("test create player", () => {
    const requestValid = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112",
        "age": 20,
        "password": "Password1!"
    }

    const requestEmptyPassword = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112",
        "age": 20
    }

    const requestWeakPassword = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112",
        "age": 20,
        "password": "password"
    }

    const requestEmptyAge = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112",
        "password": "Password1!"
    }

    const requestInvalidAge = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112",
        "age": 16,
        "password": "Password1!"
    }

    const requestEmptyEmail = {
        "name": "Dedi 112",
        "age": 20,
        "password": "Password1!"
    }

    const requestInvalidEmail = {
        "email": "dedi112",
        "name": "Dedi 112",
        "age": 20,
        "password": "Password1!"
    }

    const requestEmptyName = {
        "email": "dedi112@gmail.com",
        "age": 20,
        "password": "Password1!"
    }

    const requestInvalidNameToShort = {
        "email": "dedi112@gmail.com",
        "name": "de",
        "age": 20,
        "password": "Password1!"
    }

    const requestInvalidNameToLong = {
        "email": "dedi112@gmail.com",
        "name": "asdasdadsasdasdasd",
        "age": 20,
        "password": "Password1!"
    }

    const player = {
        "email": "dedi112@gmail.com",
        "name": "Dedi 112",
        "age": 20
    }

    const auth = {
        result: {
            success: true,
            message: "successfully registered"
        }
    }

    
    test("should success create player ", async () => {
        const mockCreatePlayer = jest.fn(() => player);
        const mockCreateAuth = jest.fn(() => auth);

        jest.spyOn(playerService, "registerPlayer").mockImplementation(() => mockCreatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockCreateAuth())

        const res = await request(app).post("/").send(requestValid);

        expect(mockCreateAuth).toHaveBeenCalledTimes(1)
        expect(mockCreatePlayer).toHaveBeenCalledTimes(1)
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.statusCode).toBe(201);
        expect(res.body.data).toEqual({ email: 'dedi112@gmail.com', name: 'Dedi 112', age: 20 });
    });

    test("should failed while  password not entry when create player ", async () => {
        const mockCreatePlayer = jest.fn(() => player);
        const mockCreateAuth = jest.fn(() => auth);

        jest.spyOn(playerService, "registerPlayer").mockImplementation(() => mockCreatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockCreateAuth())

        const res = await request(app).post("/").send(requestEmptyPassword);

        expect(mockCreateAuth).toHaveBeenCalledTimes(0)
        expect(mockCreatePlayer).toHaveBeenCalledTimes(0)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'password is required, password is weak' });
    });

    test("should failed while password is weak when create player ", async () => {
        const mockCreatePlayer = jest.fn(() => player);
        const mockCreateAuth = jest.fn(() => auth);
        
        jest.spyOn(playerService, "registerPlayer").mockImplementation(() => mockCreatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockCreateAuth())

        const res = await request(app).post("/").send(requestWeakPassword);

        expect(mockCreateAuth).toHaveBeenCalledTimes(0)
        expect(mockCreatePlayer).toHaveBeenCalledTimes(0)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'password is weak' });
    });

    test("should failed while age less than 17 when create player ", async () => {
        const mockCreatePlayer = jest.fn(() => player);
        const mockCreateAuth = jest.fn(() => auth);
        
        jest.spyOn(playerService, "registerPlayer").mockImplementation(() => mockCreatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockCreateAuth())

        const res = await request(app).post("/").send(requestInvalidAge);

        expect(mockCreateAuth).toHaveBeenCalledTimes(0)
        expect(mockCreatePlayer).toHaveBeenCalledTimes(0)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'too young' });
    });
    test("should failed while age empty when create player ", async () => {
        const mockCreatePlayer = jest.fn(() => player);
        const mockCreateAuth = jest.fn(() => auth);
        
        jest.spyOn(playerService, "registerPlayer").mockImplementation(() => mockCreatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockCreateAuth())

        const res = await request(app).post("/").send(requestEmptyAge);

        expect(mockCreateAuth).toHaveBeenCalledTimes(0)
        expect(mockCreatePlayer).toHaveBeenCalledTimes(0)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'age is required, too young' });
    });

    test("should failed while email empty  when create player ", async () => {
        const mockCreatePlayer = jest.fn(() => player);
        const mockCreateAuth = jest.fn(() => auth);
        
        jest.spyOn(playerService, "registerPlayer").mockImplementation(() => mockCreatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockCreateAuth())

        const res = await request(app).post("/").send(requestEmptyEmail);

        expect(mockCreateAuth).toHaveBeenCalledTimes(0)
        expect(mockCreatePlayer).toHaveBeenCalledTimes(0)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'email is required, invalid email format' });
    });

    test("should failed while email no valid email format when create player ", async () => {
        const mockCreatePlayer = jest.fn(() => player);
        const mockCreateAuth = jest.fn(() => auth);
        
        jest.spyOn(playerService, "registerPlayer").mockImplementation(() => mockCreatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockCreateAuth())

        const res = await request(app).post("/").send(requestInvalidEmail);

        expect(mockCreateAuth).toHaveBeenCalledTimes(0)
        expect(mockCreatePlayer).toHaveBeenCalledTimes(0)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'invalid email format' });
    });

    test("should failed while name empty when create player ", async () => {
        const mockCreatePlayer = jest.fn(() => player);
        const mockCreateAuth = jest.fn(() => auth);
        
        jest.spyOn(playerService, "registerPlayer").mockImplementation(() => mockCreatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockCreateAuth())

        const res = await request(app).post("/").send(requestEmptyName);

        expect(mockCreateAuth).toHaveBeenCalledTimes(0)
        expect(mockCreatePlayer).toHaveBeenCalledTimes(0)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'name is required, too short name' });
    });

    test("should failed while length of name less than 3 when create player ", async () => {
        const mockCreatePlayer = jest.fn(() => player);
        const mockCreateAuth = jest.fn(() => auth);
        
        jest.spyOn(playerService, "registerPlayer").mockImplementation(() => mockCreatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockCreateAuth())

        const res = await request(app).post("/").send(requestInvalidNameToShort);

        expect(mockCreateAuth).toHaveBeenCalledTimes(0)
        expect(mockCreatePlayer).toHaveBeenCalledTimes(0)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'too short name' });
    });

    test("should failed while length of name greater than 16 when create player ", async () => {
        const mockCreatePlayer = jest.fn(() => player);
        const mockCreateAuth = jest.fn(() => auth);
        
        jest.spyOn(playerService, "registerPlayer").mockImplementation(() => mockCreatePlayer())
        jest.spyOn(authClient, "request").mockImplementation(() => mockCreateAuth())

        const res = await request(app).post("/").send(requestInvalidNameToLong);

        expect(mockCreateAuth).toHaveBeenCalledTimes(0)
        expect(mockCreatePlayer).toHaveBeenCalledTimes(0)
        expect(res.body).toHaveProperty("errors");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ errors: 'too long name' });
    });
});