import Ad from "@/models/Ad";
import PostAdPage from "@/template/dashboard/PostAdPage";
import connectDB from "@/utils/connectDB";

async function EditAd({ params: { adId } }) {
  await connectDB();
  const ad = await Ad.findOne({ _id: adId });
  if (!ad) return <h3>مشکلی پیش آمده است . لطفا دوباره امتحان کنید.</h3>;

  return <PostAdPage data={JSON.parse(JSON.stringify(ad))} />;
}

export default EditAd;
