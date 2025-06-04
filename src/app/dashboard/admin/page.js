import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Ad from "@/models/Ad";
import User from "@/models/User";
import AdminPage from "@/template/dashboard/AdminPage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (user.role !== "ADMIN") redirect("/dashboard");

  const ads = await Ad.find({ published: false });
  if (!ads) return <h3>موردی یافت نشد!</h3>;

  return <AdminPage ads={ads} />;
}

export default Admin;
