import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log(body);

    const { email, password } = body;
    console.log({ email, password });

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "لطفا اطلاعات معتبر وارد کنید!",
        },
        {
          status: 422,
        }
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "این حساب کاربری از قبل وجود دارد!",
        },
        {
          status: 422,
        }
      );
    }

    const hashedPass = await hashPassword(password);

    const newUser = await User.create({
      email: email,
      password: hashedPass,
    });
    console.log(newUser);

    return NextResponse.json(
      {
        message: "حساب کاربری ایجاد شد.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "!مشکلی در سرور رخ داده است",
      },
      {
        status: 500,
      }
    );
  }
}
