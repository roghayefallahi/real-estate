"use client";
import { sp } from "@/utils/replaceNumber";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { BiShare } from "react-icons/bi";
import styles from "@/module/AdminCard.module.css";

function AdminCard({ data: { _id, title, description, location, price } }) {
  const router = useRouter();

  const showHandler = () => {
    router.push(`/ads/${_id}`);
  };
  const publishHandler = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/ad/${_id}`,
      {
        method: "PATCH",
      }
    );
    const result = await res.json();

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message);
      router.refresh();
    }
  };
  const deleteHandler = async () => {
    const res = await fetch(`/api/ad/${_id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message);
      router.refresh();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.properties}>
          <span>{location}</span>
          <span>{sp(price)}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={showHandler}>
            مشاهده
            <FaEye />
          </button>

          <button onClick={publishHandler}>
            انتشار
            <BiShare />
          </button>
          <button onClick={deleteHandler}>
            حذف
            <AiOutlineDelete />
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default AdminCard;
