"use client";

import { useEffect, useState } from "react";
import Loader from "@/module/Loader";
import TextList from "@/module/TextList";
import RadioList from "@/module/RadioList";
import TextInput from "@/module/TextInput";
import toast, { Toaster } from "react-hot-toast";
import CustomDatePicker from "@/module/CustomDatePicker";
import styles from "@/template/dashboard/PostAdPage.module.css";
import { useRouter } from "next/navigation";

function PostAdPage({ data }) {
  const initialAdData = {
    title: "",
    description: "",
    location: "",
    phone: "",
    price: "",
    realEstate: "",
    constructionDate: new Date(),
    category: "",
    rules: [],
    amenities: [],
  };
  const [adData, setAdData] = useState(initialAdData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) setAdData(data);
  }, []);

  const router = useRouter();

  const submitHandler = async () => {
    setLoading(true);
    const res = await fetch("/api/ad", {
      method: "POST",
      body: JSON.stringify(adData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
      setAdData(initialAdData);
      router.refresh();
    }
  };

  const editHandler = async () => {
    setLoading(true);
    const res = await fetch("/api/ad", {
      method: "PATCH",
      body: JSON.stringify(adData),
      headers: { "Content-Type": "application/json" },
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
        <h3>{data ? "ویرایش آگهی" : "ثبت آگهی"}</h3>

        <TextInput
          title="عنوان آگهی"
          name="title"
          adData={adData}
          setAdData={setAdData}
        />
        <TextInput
          title="توضیحات"
          name="description"
          adData={adData}
          setAdData={setAdData}
          textarea={true}
        />
        <TextInput
          title="آدرس"
          name="location"
          adData={adData}
          setAdData={setAdData}
        />
        <TextInput
          title="شماره تماس"
          name="phone"
          adData={adData}
          setAdData={setAdData}
        />
        <TextInput
          title="قیمت (تومان)"
          name="price"
          adData={adData}
          setAdData={setAdData}
        />
        <TextInput
          title="بنگاه"
          name="realEstate"
          adData={adData}
          setAdData={setAdData}
        />
        <RadioList adData={adData} setAdData={setAdData} />
        <TextList
          title="امکانات رفاهی"
          adData={adData}
          setAdData={setAdData}
          type="amenities"
        />
        <TextList
          title="قوانین"
          adData={adData}
          setAdData={setAdData}
          type="rules"
        />
        <CustomDatePicker adData={adData} setAdData={setAdData} />
        {loading ? (
          <Loader />
        ) : data ? (
          <button className={styles.submit} onClick={editHandler}>
            ویرایش آگهی
          </button>
        ) : (
          <button className={styles.submit} onClick={submitHandler}>
            ثبت آگهی
          </button>
        )}
      </div>
      <Toaster />
    </>
  );
}

export default PostAdPage;
