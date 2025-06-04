import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import MyAdsPage from "@/template/dashboard/MyAdsPage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";

async function MyAds() {
  await connectDB();
  const session =await getServerSession(authOptions);
 

  const [user] = await User.aggregate([
    { $match: { email: session?.user.email } },
    {
      $lookup: {
        from: "ads",
        foreignField: "userId",
        localField: "_id",
        as: "ads",
      },
    },
  ]);

  return <MyAdsPage ads={user.ads} />;
}

export default MyAds;
