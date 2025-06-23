import { Text, View, StyleSheet } from "react-native";
import ReviewBox from "../components/Review/ReviewBox";

const TestComponentScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ReviewBox
          avatar={""}
          fullname={"Nguyễn Sỹ Đức"}
          email={"ducns@gmail.com"}
          createdAt={"2023-06-22"}
          numStar={4}
          maxStar={5}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
          }
        />
        <ReviewBox
          avatar={""}
          fullname={"Nguyễn Sỹ Đức"}
          email={"ducns@gmail.com"}
          createdAt={"2023-06-22"}
          numStar={4}
          maxStar={5}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
          }
        />
      </View>
    </View>
  );
};

export default TestComponentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  innerContainer: {
    flex: 1,
    maxHeight: 700,
    backgroundColor: "#fff",
    padding: 10,
    gap: 5,
  },
});
