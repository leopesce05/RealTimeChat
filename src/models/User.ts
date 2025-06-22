export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
}

export interface UpdateUserRequest {
    username?: string;
    email?: string;
    password?: string;
}

export interface UserResponse {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

// Simulación de base de datos en memoria
class UserDatabase {
    private users: Map<string, User> = new Map();
    private nextId: number = 1;

    // Crear usuario
    createUser(userData: CreateUserRequest): User {
        const id = this.nextId.toString();
        this.nextId++;

        const user: User = {
            id,
            username: userData.username,
            email: userData.email,
            password: userData.password, // En producción, esto debería estar hasheado
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.users.set(id, user);
        return user;
    }

    // Obtener usuario por ID
    getUserById(id: string): User | undefined {
        return this.users.get(id);
    }

    // Obtener usuario por email
    getUserByEmail(email: string): User | undefined {
        return Array.from(this.users.values()).find(user => user.email === email);
    }

    // Obtener usuario por username
    getUserByUsername(username: string): User | undefined {
        return Array.from(this.users.values()).find(user => user.username === username);
    }

    // Obtener todos los usuarios
    getAllUsers(): User[] {
        return Array.from(this.users.values());
    }

    // Actualizar usuario
    updateUser(id: string, updateData: UpdateUserRequest): User | undefined {
        const user = this.users.get(id);
        if (!user) return undefined;

        const updatedUser: User = {
            ...user,
            ...updateData,
            updatedAt: new Date()
        };

        this.users.set(id, updatedUser);
        return updatedUser;
    }

    // Eliminar usuario
    deleteUser(id: string): boolean {
        return this.users.delete(id);
    }

    // Verificar si el email ya existe
    emailExists(email: string): boolean {
        return this.getUserByEmail(email) !== undefined;
    }

    // Verificar si el username ya existe
    usernameExists(username: string): boolean {
        return this.getUserByUsername(username) !== undefined;
    }
}

export const userDB = new UserDatabase();