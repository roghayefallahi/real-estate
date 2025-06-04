import Ad from "@/models/Ad";
import AdDetailsPage from "@/template/AdDetailsPage";
import connectDB from "@/utils/connectDB";

async function AdDetails({ params: { adId } }) {
  await connectDB();
  const ad = await Ad.findOne({ _id: adId });
  if (!ad) {
    return <h3>آگهی یافت نشد یا خطایی رخ داده است!</h3>;
  }

  return <AdDetailsPage data={ad} />;
}

export default AdDetails;

export const generateMetadata = async ({ params: { adId } }) => {
  await connectDB();
  const ad = await Ad.findOne({ _id: adId });

  return { title: ad?.title, description: ad?.description };
};
