import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import styles from "@/module/CustomDatePicker.module.css";

function CustomDatePicker({ adData, setAdData }) {
  const changeHandler = (e) => {
    const date = new Date(e);
    console.log(date);
    setAdData({ ...adData, constructionDate: date });
  };

  return (
    <div className={styles.container}>
      <p>تاریخ ساخت </p>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={adData.constructionDate}
        onChange={changeHandler}
        calendarPosition="bottom-right"
      />
    </div>
  );
}

export default CustomDatePicker;
