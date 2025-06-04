"use client";

import { useState } from "react";
import Card from "@/module/Card";
import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/module/Loader";
import styles from "@/module/DashboardCard.module.css";

function DashboardCard({ data }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const editHandler = () => {
    router.push(`/dashboard/my-ads/${data._id}`);
  };

  const deleteHandler = async () => {
    setLoading(true);
    const res = await fetch(`/api/ad/${data._id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    setLoading(false);
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
        <Card data={data} />
        <div className={styles.main}>
          <button onClick={editHandler}>
            ویرایش
            <FiEdit />
          </button>
          {loading ? (
            <div style={{ textAlign: "center", width: "30%" }}>
              <Loader />
            </div>
          ) : (
            <button onClick={deleteHandler}>
              حذف آگهی
              <AiOutlineDelete />
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default DashboardCard;
