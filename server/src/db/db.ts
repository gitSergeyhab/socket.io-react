import { rooms } from "../controllers/test-controller";



export const Tables = {
    Users: 'users',
    Messages: 'messages'
};

// export const db = new Map([
//     [rooms[0].id, new Map([
//         [Tables.Users, new Map()],
//         ['rooms', new Map()]
//     ])]
//     // [Tables.Messages, new Map()],
//     // [Tables.Users, new Map()],
// ]);

export const db = {
    Rooms: {
        '1': {
            Messages: [],
            Users: []
        },
        '2': {
            Messages: [],
            Users: []
        }
    }
} 