import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import ItemsList from "@/module/ItemsList";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { icons } from "@/constants/icons";
import { categories } from "@/constants/strings";
import { BiCalendarCheck } from "react-icons/bi";
import { e2p, sp } from "@/utils/replaceNumber";
import styles from "@/template/AdDetailsPage.module.css";
import ShareBtn from "@/module/ShareBtn";

function AdDetailsPage({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>{data.title}</h1>
        <span>
          <HiOutlineLocationMarker />
          {data.location}
        </span>
        <h3 className={styles.title}>توضیحات</h3>
        <p>{data.description}</p>
        <h3 className={styles.title}>امکانات</h3>
        <ItemsList data={data.amenities} />
        <h3 className={styles.title}>قوانین</h3>
        <ItemsList data={data.rules} />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.realState}>
          <SiHomebridge />
          <p>املاک {data.realEstate}</p>
          <span>
            <AiOutlinePhone />
            {e2p(data.phone)}
          </span>
        </div>
        <ShareBtn />
        <div className={styles.price}>
          <p>
            {icons[data.category]}
            {categories[data.category]}
          </p>
          <p>{sp(data.price)} تومان</p>
          <p>
            <BiCalendarCheck />
            {new Date(data.constructionDate).toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdDetailsPage;
