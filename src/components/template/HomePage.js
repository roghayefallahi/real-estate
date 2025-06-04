import { FiCircle } from "react-icons/fi";
import { FaCity } from "react-icons/fa";
import { categories, cities, services } from "@/constants/strings";
import CategoryCard from "@/module/CategoryCard";
import styles from "@/template/HomePage.module.css";
import Link from "next/link";

function HomePage() {
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.desc}>
          <h1>سامانه خرید و اجاره ملک</h1>
          <ul>
            {services.map((i) => (
              <li key={i}>
                <FiCircle />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.categories}>
        {Object.keys(categories).map((i) => (
          <CategoryCard title={categories[i]} name={i} key={i} />
        ))}
      </div>
      <div className={styles.city}>
        <h3>شهر های پر بازدید</h3>
        <ul>
          {cities.map((i) => (
            <Link href="/" key={i}>
              <li>
                <FaCity />
                <span>{i}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
