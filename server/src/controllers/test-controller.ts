import { Request, Response } from "express";


export const rooms = [
    {id: '1', name: 'Болталка'}, 
    {id: '2', name: 'Поддержка'}
];

export const users = [
    {id: '1', name: 'First'}, 
    {id: '2', name: 'Second'}, 
    {id: '3', name: 'Third'}
];



class TestController {
    async getRooms(req: Request, res: Response) {
        try {
            res.status(200).json(rooms)
        } catch(err) {
            return res.status(500).json({message: 'getRooms Error'})
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            res.status(200).json(users)
        } catch(err) {
            return res.status(500).json({message: 'getRooms Error'})
        }
    }
}


export const testController = new TestController()