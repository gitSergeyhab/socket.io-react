import { Request, Response } from "express";


const data = {
    CommonRoom: 'CommonRoom',
    PrivateRoom: 'PrivateRoom',
}



class TestController {
    async getRooms(req: Request, res: Response) {

        

        try {
            res.status(200).json(data)

            
        } catch(err) {
            console.log(err)
            return res.status(500).json({message: 'TestController'})
        }
    }
}


export const testController = new TestController()