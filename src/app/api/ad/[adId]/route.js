import Ad from "@/models/Ad";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, { params: { adId } }) {
  try {
    await connectDB();
    const ad = await Ad.findById(adId);
    if (!ad) {
      return NextResponse.json(
        { error: "آگهی مورد نظر یافت نشد!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: ad }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params: { adId } }) {
  try {
    await connectDB();
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد!" },
        { status: 404 }
      );
    }

    const ad = await Ad.findOne({ _id: adId });

    if (!ad) {
      return NextResponse.json({ error: "آگهی یافت نشد!" }, { status: 404 });
    }

    const isAdmin = user.role === "ADMIN";
    const isOwner = user._id.equals(ad.userId);

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { error: "شما اجازه حذف این آگهی را ندارید!" },
        { status: 403 }
      );
    }

    await Ad.deleteOne({ _id: adId });

    return NextResponse.json(
      { message: "آگهی موردنظر حذف شد." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params: { adId } }) {
  try {
    await connectDB();
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد!" },
        { status: 404 }
      );
    }
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "دسترسی محدود" }, { status: 403 });
    }

    const ad = await Ad.findOne({ _id: adId });
    if (!ad) {
      return NextResponse.json({ error: "آگهی یافت نشد!" }, { status: 404 });
    }
    ad.published = true;
    await ad.save();
    return NextResponse.json({ message: "آگهی منتشر شد. !" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است!" },
      { status: 500 }
    );
  }
}
