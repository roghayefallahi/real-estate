import Ad from "@/models/Ad";
import AdsPage from "@/template/AdsPage";
import connectDB from "@/utils/connectDB";

async function Ads({ searchParams }) {
  await connectDB();
  const ads = await Ad.find({ published: true }).select("-userId");
  if (!ads) {
    return <h3>آگهی یافت نشد یا خطایی رخ داده است!</h3>;
  }

  let finalData = ads;
  if (searchParams?.category) {
    finalData = finalData.filter((i) => i.category === searchParams?.category);
  }

  return <AdsPage data={finalData} />;
}

export default Ads;
