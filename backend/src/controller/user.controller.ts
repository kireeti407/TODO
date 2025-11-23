import USER from "../model/user.model";

export const singup = async (req: any, res: any) => {
  try {
    let d: any = req.body;
    let data = await USER.find();
    let email: any = data.find((e) => e.email == d.email);
    if (!email) {
      let response = await USER.create(d);
      res
        .status(202)
        .json({ msg: "successfully singn-up", response: response });
    } else {
      res.status(200).json({ msg: "account is already exist please login" });
    }
  } catch (err) {
    res.status(400).json({ msg: "somthing went wrong" });
  }
};

export const login = async (req: any, res: any) => {
  try {
    let d: any = req.body;
    let data = await USER.find();
    let user: any = data.find(
      (e) => e.email == d.email && e.password == d.password
    );
    if (user) {
      res.status(202).json({ msg: "successfully login", response: user });
    } else {
      res
        .status(200)
        .json({ msg: "account is not exist or password incorrect" });
    }
  } catch (err) {
    res.status(200).json({ msg: "account is already exist please login" });
  }
};
