import Ad from "@/models/Ad";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const ads = await Ad.find({published:true}).select("-userId");

    return NextResponse.json({ data: ads }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || "مشکلی در سرور رخ داده است!" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      description,
      location,
      phone,
      price,
      realEstate,
      constructionDate,
      category,
      rules,
      amenities,
    } = body;

    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد!" },
        { status: 404 }
      );
    }

    if (
      !title ||
      !description ||
      !location ||
      !phone ||
      !price ||
      !realEstate ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید!" },
        { status: 400 }
      );
    }
    const newAd = await Ad.create({
      title,
      description,
      location,
      phone,
      price: +price,
      realEstate,
      constructionDate,
      category,
      rules,
      amenities,
      userId: new Types.ObjectId(user._id),
    });
    console.log(newAd);
    return NextResponse.json(
      { message: "آگهی جدید اضافه شد." },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || "مشکلی در سرور رخ داده است!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      _id,
      title,
      description,
      location,
      phone,
      price,
      realEstate,
      constructionDate,
      category,
      rules,
      amenities,
    } = body;

    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد!" },
        { status: 404 }
      );
    }

    if (
      !_id ||
      !title ||
      !description ||
      !location ||
      !phone ||
      !price ||
      !realEstate ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید!" },
        { status: 400 }
      );
    }

    const ad = await Ad.findOne({ _id });

    if (!ad) {
      return NextResponse.json({ error: "آگهی یافت نشد!" }, { status: 404 });
    }

    if (!user._id.equals(ad.userId)) {
      return NextResponse.json(
        { error: "دسترسی شما به این آگهی محدود شده است!" },
        { status: 403 }
      );
    }

    ad.title = title;
    ad.description = description;
    ad.location = location;
    ad.phone = phone;
    ad.price = price;
    ad.realEstate = realEstate;
    ad.constructionDate = constructionDate;
    ad.category = category;
    ad.rules = rules || [];
    ad.amenities = amenities || [];
    await ad.save();

    return NextResponse.json(
      { message: "آگهی با موفقیت ویرایش شد." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || "مشکلی در سرور رخ داده است!" },
      { status: 500 }
    );
  }
}
