import { CustomButton, MenuButton } from "grape-custom-components";
import { ICalendarConfig } from "./interfaces";

function Header({ config }: { config: ICalendarConfig }) {
  const { currentDate, mode, changeMode, goPrev, goNext, goToday } = config;

  const getMonthName = (date: Date) => {
    let monthName = date.toLocaleDateString("pt-BR", { month: "long" });
    monthName = monthName.replace(".", "");
    monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    return monthName;
  };

  const getInitialMonth = (currentDate: Date) => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    return getMonthName(firstDay);
  };

  const getNextMonth = (currentDate: Date) => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const lastDay = new Date(currentDate);
    lastDay.setDate(currentDate.getDate() + 6);
    if (lastDay.getMonth() !== firstDay.getMonth()) {
      return " - " + getMonthName(lastDay);
    }
    return "";
  };

  const getYear = () => {
    if (mode === "week") {
      const lastDay = new Date(currentDate);
      lastDay.setDate(currentDate.getDate() + 6);
      return lastDay.getFullYear();
    } else {
      return currentDate.getFullYear();
    }
  };

  const translateMode = (
    selectedMode: string
  ): "week" | "month" | "Semana" | "Mês" => {
    switch (selectedMode) {
      case "Semana":
        return "week";
      case "Mês":
        return "month";
      case "week":
        return "Semana";
      case "month":
        return "Mês";
      default:
        return "week";
    }
  };

  return (
    <div className="flex flex-row select-none gap-3 justify-center items-center m-4 flex-wrap">
      <CustomButton variant="white" onClick={goToday}>
        Hoje
      </CustomButton>

      <div className="flex gap-1">
        <CustomButton
          variant="white"
          className="cursor-pointer"
          onClick={goPrev}
        >
          {"<"}
        </CustomButton>
        <CustomButton variant="white" className="w-56">
          {getInitialMonth(currentDate) +
            getNextMonth(currentDate) +
            " " +
            getYear()}
        </CustomButton>
        <CustomButton
          variant="white"
          className="cursor-pointer"
          onClick={goNext}
        >
          {">"}
        </CustomButton>
      </div>

      <MenuButton
        mode={translateMode(mode)}
        changeMode={(e) => changeMode(translateMode(e) as "week" | "month")}
        options={["Semana", "Mês"]}
      />
    </div>
  );
}

export default Header;
