import MyGoals from "../components/MyGoals/MyGoals";
import Header from "../components/Header/Header";
import Result from "../components/Result/Result";

export default function Training() {
  const handleIconClick = () => {};
  return (
    <div>
      <Header onIconClick={handleIconClick} />
      <MyGoals />
      <Result />
    </div>
  );
}
