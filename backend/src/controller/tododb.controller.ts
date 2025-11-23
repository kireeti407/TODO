//todocontroller
import { Request, Response } from "express";
import TODO from "../model/TODO.model";

export const gettask = async (req: Request, res: Response) => {
  try {
    const {email} = req.query
    const data = await TODO.find({email});
    res.status(200).json({ msg: "success", data });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong" });
  }
};

export const addtask = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, complete: false, date: new Date() };
    const taskExists = await TODO.findOne({
      task: data.task,
      email: data.email,
    });

    if (!taskExists) {
      const response = await TODO.create(data);
      return res.status(201).json({ msg: "Successfully added", response });
    } else {
      return res.status(200).json({ msg: "Task already exists" });
    }
  } catch (err) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
};

export const updatetask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await TODO.findByIdAndUpdate(id, data, { new: true });
    return res.status(202).json({
      msg: "Successfully updated",
      response,
    });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong" });
  }
};

export const deletetask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await TODO.findByIdAndDelete(id);
    res.status(203).json({ msg: "Successfully deleted" });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong" });
  }
};

export const updatetasktext = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await TODO.findByIdAndUpdate(id, data, { new: true });
    return res.status(202).json({
      msg: "Successfully updated",
      response,
    });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong" });
  }
};
