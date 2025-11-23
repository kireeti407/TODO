

import { addtask, deletetask, gettask, updatetask } from "../../src/controller/tododb.controller";

import TODO from '../../src/model/TODO.model'

jest.mock("../../src/model/TODO.model")

describe("gettask", () => {
  let req: any;
  let res: any;
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks()
  });

  test("success", async () => {
    const mockData = [{ id:1,complete:false,email:"ki@gmail.com", task: "study" }];
    (TODO.find as jest.Mock).mockResolvedValue(mockData)
    await gettask(req, res);
    expect(TODO.find).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({msg: "success",data: mockData});
  });

  test("handle error", async () => {
    const mockError = new Error("DB error");
    (TODO.find as jest.Mock).mockRejectedValue(mockError)
    await gettask(req, res)
    expect(TODO.find).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      msg: "somthing went wrong",
      err: mockError
    });
  });
});


describe("addtask",()=>{
  let req:any={}
  let res:any={}
  beforeEach(()=>{
    req={body:{email:"ki@gmail.com",task:"run"}}
    res={
      status:jest.fn().mockReturnThis(),
      json:jest.fn()
    }
    jest.clearAllMocks()
  })

  test("if not a task",async()=>{
     const mockData:any = [];
     const createtask={...req.body,complete:false,id:1};
    (TODO.find as jest.Mock).mockResolvedValue(mockData);
    (TODO.create as jest.Mock).mockResolvedValue({id:1,task:"run",email:"ki@gmail.com",complete:false})
    await addtask(req,res)
    expect(TODO.find).toHaveBeenCalled()
    expect(TODO.create).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({msg:"successully add",response:createtask})
  })
  test("if task",async()=>{
     const mockData:any = [{id:2,task:"run",email:"ki@gmail.com",complete:false}];
    (TODO.find as jest.Mock).mockResolvedValue(mockData);
    await addtask(req,res)
    expect(TODO.find).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({msg:"task is already exist"})
  })

  test("error handling",async()=>{
    const err= new Error("Error");
    (TODO.find as jest.Mock).mockRejectedValue(err)

    await addtask(req,res)
    expect(TODO.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({msg:"somthing went wrong",err:err})
  })
})

describe("updatetask",()=>{
  let req:any={}
  let res:any={}
  beforeEach(()=>{
    req={params:{id:1},body:{complete:true}}
    res={
      status:jest.fn().mockReturnThis(),
      json:jest.fn()
    }
    jest.clearAllMocks()
  })

  test("update task",async()=>{
    let mockData={_doc:{id:1,task:"run",complete:true,email:'ki@gmail.com'}};
    let updatask={id:1,task:"run",complete:true,email:"ki@gmail.com"};
    (TODO.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockData)
    await updatetask(req,res)
    let id=req.params.id
    let data=req.body
    expect(TODO.findByIdAndUpdate).toHaveBeenCalledWith(id,data)
    expect(res.status).toHaveBeenCalledWith(202)
    expect(res.json).toHaveBeenCalledWith({msg:"successully updated",response:updatask})
  })

  test("handling error",async()=>{
    let err=new Error("DB Error");
    (TODO.findByIdAndUpdate as jest.Mock).mockRejectedValue(err)
    await updatetask(req,res)
    expect(TODO.findByIdAndUpdate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({msg:"somthing went wrong",err:err})
  })
})


describe("delete",()=>{
  let req:any={}
  let res:any={}
  beforeEach(()=>{
    req={params:{id:1}}
    res={
      status:jest.fn().mockReturnThis(),
      json:jest.fn()
    }
    jest.clearAllMocks()
  })
  test("sucess",async()=>{
    let mockdata={id:1,task:"run",complete:true,email:'ki@gmail.com'};
    (TODO.findByIdAndDelete as jest.Mock).mockResolvedValue(mockdata)
    await deletetask(req,res)

    expect(TODO.findByIdAndDelete).toHaveBeenCalledWith(1)
    expect(res.status).toHaveBeenCalledWith(203)
    expect(res.json).toHaveBeenCalledWith({msg:"successully deleted",response:mockdata})
    
  })

  test("error",async()=>{
    const error:String="somthing went wrong";
    (TODO.findByIdAndDelete as jest.Mock).mockRejectedValue(error)

    await deletetask(req,res)

    expect(TODO.findByIdAndDelete).toHaveBeenCalledWith(1)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({msg:"somthing went wrong",err:error})
  })

})


