//todoroutes

import express from 'express'


import { gettask,addtask,updatetask,deletetask, updatetasktext} from '../controller/tododb.controller'

const todoRouter=express.Router()

todoRouter.get('/gettask',gettask)

todoRouter.post('/addtask',addtask)

todoRouter.patch('/updatetask/:id',updatetask)

todoRouter.delete('/deletetask/:id',deletetask)

todoRouter.patch('/updatetasktext/:id',updatetasktext)

export default todoRouter